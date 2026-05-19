import { NextRequest, NextResponse } from 'next/server';
import { toFile } from 'openai/uploads';
import OpenAI from 'openai';
import { verifyToken } from '@/lib/auth/jwt';
import { getActiveConfig } from '@/lib/chat/getActiveConfig';

/**
 * Speech-to-text endpoint backed by OpenAI Whisper / gpt-4o-transcribe.
 *
 * Why this exists at all: browsers' built-in Web Speech API depends on
 * vendor cloud services (Microsoft for Edge, Google for Chrome) whose
 * language coverage and regional availability are inconsistent — Bulgarian,
 * Russian, Persian etc. routinely fail with `network` errors on Edge. To make
 * voice input reliable for our refugee learners we record audio on the client
 * and send it here, then forward the blob to OpenAI which we already use for
 * the chat itself (same API key, same SDK).
 *
 * Cost ballpark (Nov 2025 pricing):
 *   - gpt-4o-mini-transcribe: $0.003/min  ← default
 *   - whisper-1:              $0.006/min  ← fallback if mini is unavailable
 *
 * Auth: same JWT cookie as `/api/chat`.
 * Rate limit: 60 transcriptions per hour per user (separate from chat limit
 * because each chat turn typically takes 1-2 transcriptions).
 */

const STT_MODEL = process.env.OPENAI_STT_MODEL ?? 'gpt-4o-mini-transcribe';
const RATE_LIMIT_PER_HOUR = parseInt(process.env.STT_RATE_LIMIT_PER_HOUR ?? '60', 10);
// 25 MB is OpenAI's hard limit; we reject anything bigger here so a runaway
// recording doesn't try to upload 100 MB before getting a 4xx back.
const MAX_AUDIO_BYTES = 25 * 1024 * 1024;
// Whisper accepts an ISO-639-1 code (`bg`, `en`, `ru`, ...). We only pass it
// when it's one of the languages we explicitly support, otherwise we let the
// model auto-detect.
const SUPPORTED_LANG_HINTS = new Set(['bg', 'ar', 'en', 'fr', 'fa', 'uk', 'ru']);

const rateLimitMap = new Map<number, { count: number; resetAt: number }>();

function checkRateLimit(userId: number): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(userId);
  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(userId, { count: 1, resetAt: now + 3_600_000 });
    return true;
  }
  if (entry.count >= RATE_LIMIT_PER_HOUR) return false;
  entry.count++;
  return true;
}

/** Pick a sensible filename + extension for the uploaded blob based on its
 * MIME type. OpenAI uses the extension to pick a decoder, so an audio/webm
 * blob saved as "audio.bin" is rejected. */
function filenameForMime(mime: string): string {
  if (mime.includes('webm')) return 'audio.webm';
  if (mime.includes('ogg')) return 'audio.ogg';
  if (mime.includes('mp4')) return 'audio.mp4';
  if (mime.includes('mpeg') || mime.includes('mp3')) return 'audio.mp3';
  if (mime.includes('wav')) return 'audio.wav';
  if (mime.includes('m4a')) return 'audio.m4a';
  if (mime.includes('flac')) return 'audio.flac';
  return 'audio.webm';
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value;
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const payload = await verifyToken(token);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  if (!checkRateLimit(payload.userId)) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Please wait an hour.' },
      { status: 429 },
    );
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
  }

  const audio = formData.get('audio');
  if (!(audio instanceof Blob) || audio.size === 0) {
    return NextResponse.json({ error: 'No audio provided' }, { status: 400 });
  }
  if (audio.size > MAX_AUDIO_BYTES) {
    return NextResponse.json({ error: 'Audio file is too large (max 25 MB)' }, { status: 413 });
  }

  const rawLang = (formData.get('language') as string | null)?.trim().toLowerCase();
  const languageHint = rawLang && SUPPORTED_LANG_HINTS.has(rawLang) ? rawLang : undefined;

  // We reuse the same OpenAI key as the chat — stored encrypted in the admin
  // DB (admin_api_keys table) with an env-var fallback. No DB call needed for
  // the auth side of things; getActiveConfig already returns the resolved key.
  const config = await getActiveConfig();
  if (!config.apiKey) {
    return NextResponse.json(
      { error: 'No OpenAI API key configured. Please add one in the admin panel.' },
      { status: 503 },
    );
  }

  const client = new OpenAI({ apiKey: config.apiKey });

  try {
    const mime = audio.type || 'audio/webm';
    const file = await toFile(audio, filenameForMime(mime), { type: mime });

    const startedAt = Date.now();
    const result = await client.audio.transcriptions.create({
      file,
      model: STT_MODEL,
      // Hint helps accuracy & latency. Omitting it makes Whisper auto-detect
      // — fine, but slightly slower and occasionally guesses wrong for short
      // utterances.
      language: languageHint,
      response_format: 'json',
    });
    const elapsedMs = Date.now() - startedAt;

    const text = (result.text ?? '').trim();
    console.log('[transcribe]', {
      userId: payload.userId,
      model: STT_MODEL,
      languageHint: languageHint ?? '(auto)',
      bytes: audio.size,
      mime,
      elapsedMs,
      textLen: text.length,
    });

    return NextResponse.json({
      text,
      language: languageHint ?? null,
      model: STT_MODEL,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[transcribe] OpenAI error:', message, err);
    return NextResponse.json(
      { error: 'Transcription failed. Please try again.' },
      { status: 502 },
    );
  }
}

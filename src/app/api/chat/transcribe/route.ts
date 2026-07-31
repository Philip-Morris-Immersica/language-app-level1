import { NextRequest, NextResponse } from 'next/server';
import { toFile } from 'openai/uploads';
import OpenAI from 'openai';
import { verifyToken } from '@/lib/auth/jwt';
import { getActiveConfig } from '@/lib/chat/getActiveConfig';

/**
 * Speech-to-text endpoint backed by OpenAI gpt-4o-transcribe, with an
 * automatic Whisper fallback.
 *
 * Why this exists at all: browsers' built-in Web Speech API depends on
 * vendor cloud services (Microsoft for Edge, Google for Chrome) whose
 * language coverage and regional availability are inconsistent — Bulgarian,
 * Russian, Persian etc. routinely fail with `network` errors on Edge. To make
 * voice input reliable for our refugee learners we record audio on the client
 * and send it here, then forward the blob to OpenAI which we already use for
 * the chat itself (same API key, same SDK).
 *
 * Model strategy (A1 feedback, Фаза 3): `gpt-4o-transcribe` is the primary
 * model — better multilingual accuracy than Whisper for our short, accented
 * utterances (BG/AR/FA/UK/RU/FR/EN). If the primary request throws (model
 * hiccup, transient 5xx, unsupported audio edge case, etc.) we automatically
 * retry once with `whisper-1`, which is battle-tested and has been running
 * in production so far. The learner never sees the retry — only a slightly
 * longer wait on the rare occasion it kicks in.
 *
 * Cost ballpark (2026 pricing):
 *   - gpt-4o-transcribe: $0.006/min  ← primary
 *   - whisper-1:         $0.006/min  ← automatic fallback on primary error
 *
 * Auth: same JWT cookie as `/api/chat`.
 * Rate limit: 60 transcriptions per hour per user (separate from chat limit
 * because each chat turn typically takes 1-2 transcriptions).
 */

const STT_MODEL = process.env.OPENAI_STT_MODEL ?? 'gpt-4o-transcribe';
const STT_FALLBACK_MODEL = process.env.OPENAI_STT_FALLBACK_MODEL ?? 'whisper-1';
const RATE_LIMIT_PER_HOUR = parseInt(process.env.STT_RATE_LIMIT_PER_HOUR ?? '60', 10);
// 25 MB is OpenAI's hard limit; we reject anything bigger here so a runaway
// recording doesn't try to upload 100 MB before getting a 4xx back.
const MAX_AUDIO_BYTES = 25 * 1024 * 1024;
// Whisper accepts an ISO-639-1 code (`bg`, `en`, `ru`, ...). We only pass it
// when it's one of the languages we explicitly support, otherwise we let the
// model auto-detect.
const SUPPORTED_LANG_HINTS = new Set(['bg', 'ar', 'en', 'fr', 'fa', 'uk', 'ru']);

// Empirically (tested against real BG TTS audio while wiring this up),
// gpt-4o-transcribe occasionally hallucinates the WRONG SCRIPT on short,
// context-poor clips even with a correct `language` hint — e.g. Cyrillic
// "автобус" comes back as Greek "Αυτόμπους", or "Да, моля" comes back
// transliterated as Latin "Da, mola." It doesn't throw in these cases, so
// the try/catch fallback below never fires. We add this cheap script sanity
// check to catch that class of silent failure too and retry with Whisper,
// which did not reproduce the issue in the same tests.
const EXPECTED_SCRIPT: Partial<Record<string, RegExp>> = {
  bg: /[\u0400-\u04FF]/,
  ru: /[\u0400-\u04FF]/,
  uk: /[\u0400-\u04FF]/,
  ar: /[\u0600-\u06FF]/,
  fa: /[\u0600-\u06FF]/,
};
const ANY_LETTERS = /[A-Za-zÀ-ÖØ-öø-ÿ\u0370-\u03FF\u0400-\u04FF\u0600-\u06FF]/;

function looksWrongScript(text: string, languageHint: string | undefined): boolean {
  if (!languageHint) return false;
  const expected = EXPECTED_SCRIPT[languageHint];
  if (!expected) return false; // en/fr expect Latin — no reliable check needed
  if (!ANY_LETTERS.test(text)) return false; // empty/numeric — not a script issue
  return !expected.test(text);
}

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

  const mime = audio.type || 'audio/webm';

  // Small helper so we can call the same request twice (primary model, then
  // fallback) without duplicating the toFile/transcribe/logging plumbing.
  // `toFile` is called fresh each attempt because the SDK reads the Blob's
  // stream — reusing a consumed file object would upload an empty body.
  const attemptTranscription = async (model: string) => {
    const file = await toFile(audio, filenameForMime(mime), { type: mime });
    const startedAt = Date.now();
    const result = await client.audio.transcriptions.create({
      file,
      model,
      // Hint helps accuracy & latency. Omitting it makes the model
      // auto-detect — fine, but slightly slower and occasionally guesses
      // wrong for short utterances.
      language: languageHint,
      response_format: 'json',
    });
    const elapsedMs = Date.now() - startedAt;
    return { text: (result.text ?? '').trim(), elapsedMs };
  };

  try {
    let usedModel = STT_MODEL;
    let outcome;
    try {
      outcome = await attemptTranscription(STT_MODEL);
      if (looksWrongScript(outcome.text, languageHint)) {
        console.warn(
          `[transcribe] primary model "${STT_MODEL}" returned unexpected script for language "${languageHint}" ("${outcome.text}"), retrying with fallback "${STT_FALLBACK_MODEL}"`,
        );
        usedModel = STT_FALLBACK_MODEL;
        outcome = await attemptTranscription(STT_FALLBACK_MODEL);
      }
    } catch (primaryErr) {
      const message = primaryErr instanceof Error ? primaryErr.message : String(primaryErr);
      console.warn(
        `[transcribe] primary model "${STT_MODEL}" failed, retrying with fallback "${STT_FALLBACK_MODEL}":`,
        message,
      );
      usedModel = STT_FALLBACK_MODEL;
      outcome = await attemptTranscription(STT_FALLBACK_MODEL);
    }

    const { text, elapsedMs } = outcome;
    console.log('[transcribe]', {
      userId: payload.userId,
      model: usedModel,
      fellBack: usedModel !== STT_MODEL,
      languageHint: languageHint ?? '(auto)',
      bytes: audio.size,
      mime,
      elapsedMs,
      textLen: text.length,
    });

    return NextResponse.json({
      text,
      language: languageHint ?? null,
      model: usedModel,
    });
  } catch (err) {
    // Both the primary model and the fallback failed — genuinely give up.
    const message = err instanceof Error ? err.message : String(err);
    console.error('[transcribe] OpenAI error (primary + fallback both failed):', message, err);
    return NextResponse.json(
      { error: 'Transcription failed. Please try again.' },
      { status: 502 },
    );
  }
}

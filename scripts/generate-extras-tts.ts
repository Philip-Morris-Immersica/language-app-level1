/**
 * generate-extras-tts.ts
 *
 * Generates two groups of dedicated TTS audio files:
 *
 * 1) Alphabet maze letters (Lesson 00)
 *    30 short clips — one per Bulgarian letter — using Flash model.
 *    Output: public/assets/lesson-00/audio/tts/maze/l00-maze-letter-{index}.mp3
 *    (index 0=А, 1=Б, … 29=Я)
 *    Й → "и кратко", Ь → "ер малък" (same workaround as grammar table)
 *
 * 2) Number "единадесет" for Connect Dots exercise (Lesson 02)
 *    Output: public/assets/lesson-02/audio/tts/words/n11.mp3
 *
 * Usage:
 *   npx dotenv-cli -e .env.local -- tsx scripts/generate-extras-tts.ts
 */

import fs from 'fs';
import path from 'path';

const PROJECT_ROOT = path.resolve(__dirname, '..');
const FEMALE_VOICE = 'Achernar';
const FLASH_MODEL = 'gemini-2.5-flash-tts';
const PRO_MODEL = 'gemini-2.5-pro-tts';
const WORD_PROMPT = 'make sure the word is clearly in Bulgarian with the right pronunciation';
const PRO_PROMPT = 'Read aloud in a warm, welcoming tone, in clear standard Bulgarian with natural native pronunciation and correct stress. Do not use any Russian, Arabic, English or other foreign accent.';
const DELAY_MS = 6500; // ~10 req/min Gemini rate limit
const MAX_RETRIES = 3;
/**
 * Regenerate these letters even if the file already exists (client feedback: mispronounced).
 * Round 1 (Д, Ж, М, П, Р, Ф, Х, Ч, Ш, Ъ) was accepted. Round 2: Т, У, Х still weren't
 * good enough — retry with Flash (У was Pro; switched back to Flash below).
 */
const FORCE_REGENERATE = new Set(['Т', 'У', 'Х']);

// ---------------------------------------------------------------------------
// Alphabet letters — index mirrors grammar table row order (А=0 … Я=29)
// ---------------------------------------------------------------------------
const LETTER_ORDER = [
  'А', 'Б', 'В', 'Г', 'Д', 'Е',
  'Ж', 'З', 'И', 'Й', 'К', 'Л',
  'М', 'Н', 'О', 'П', 'Р', 'С',
  'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч',
  'Ш', 'Щ', 'Ъ', 'Ь', 'Ю', 'Я',
] as const;

// Special pronunciation overrides for letters that TTS reads incorrectly.
// Consonants are spoken as "letter + ъ" (дъ, жъ, мъ...) — the natural Bulgarian
// consonant-name convention — instead of the bare letter, which some TTS
// takes reads oddly in isolation. Й/Ь/Ъ use their actual letter names.
const LETTER_TTS_TEXT: Record<string, string> = {
  'Й': 'и кратко',
  'Ь': 'ер малък',
  'Ъ': 'ер голям',
  'Д': 'дъ',
  'Ж': 'жъ',
  'М': 'мъ',
  'П': 'пъ',
  'Р': 'ръ',
  'Т': 'тъ',
  'Ф': 'фъ',
  'Х': 'хъ',
  'Ч': 'чъ',
  'Ш': 'шъ',
};

// Letters that need the more robust Pro model instead of Flash (client
// feedback: Flash mispronounced them even as a bare vowel/letter).
// У tried Pro in round 1 — still not good, back to Flash for round 2.
const LETTER_TTS_MODEL: Record<string, string> = {};

// ---------------------------------------------------------------------------
// Jobs list
// ---------------------------------------------------------------------------
interface TtsJob {
  outputPath: string;
  text: string;
  model: string;
  prompt: string;
}

function buildJobs(): TtsJob[] {
  const jobs: TtsJob[] = [];

  // Maze letters
  const mazeDir = path.join(PROJECT_ROOT, 'public/assets/lesson-00/audio/tts/maze');
  fs.mkdirSync(mazeDir, { recursive: true });

  LETTER_ORDER.forEach((letter, index) => {
    const outputPath = path.join(mazeDir, `l00-maze-letter-${index}.mp3`);
    const forceRegen = FORCE_REGENERATE.has(letter);
    if (fs.existsSync(outputPath) && !forceRegen) {
      console.log(`  skip (exists): l00-maze-letter-${index}.mp3`);
      return;
    }
    const text = LETTER_TTS_TEXT[letter] ?? letter;
    const model = LETTER_TTS_MODEL[letter] ?? FLASH_MODEL;
    const prompt = model === PRO_MODEL ? PRO_PROMPT : WORD_PROMPT;
    jobs.push({ outputPath, text, model, prompt });
  });

  // единадесет (n11)
  const wordsDir = path.join(PROJECT_ROOT, 'public/assets/lesson-02/audio/tts/words');
  fs.mkdirSync(wordsDir, { recursive: true });
  const n11Path = path.join(wordsDir, 'n11.mp3');
  if (!fs.existsSync(n11Path)) {
    jobs.push({ outputPath: n11Path, text: 'единадесет', model: FLASH_MODEL, prompt: WORD_PROMPT });
  } else {
    console.log('  skip (exists): n11.mp3');
  }

  return jobs;
}

// ---------------------------------------------------------------------------
// Auth + Synthesize (Gemini Flash via OAuth)
// ---------------------------------------------------------------------------
let cachedToken: { token: string; expiry: number } | null = null;

async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiry - 60_000) {
    return cachedToken.token;
  }
  const { GoogleAuth } = await import('google-auth-library');
  const auth = new GoogleAuth({
    keyFile: path.join(PROJECT_ROOT, 'service-account.json'),
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  });
  const client = await auth.getClient();
  const res = await client.getAccessToken();
  if (!res.token) throw new Error('Failed to get access token');
  cachedToken = { token: res.token, expiry: Date.now() + 3_500_000 };
  return res.token;
}

async function synthesizeOnce(text: string, model: string, prompt: string): Promise<Buffer> {
  const token = await getAccessToken();
  const saJson = JSON.parse(fs.readFileSync(path.join(PROJECT_ROOT, 'service-account.json'), 'utf8'));
  const body = {
    input: { text, prompt },
    voice: { languageCode: 'bg-BG', name: FEMALE_VOICE, modelName: model },
    audioConfig: { audioEncoding: 'MP3' },
  };
  const res = await fetch('https://texttospeech.googleapis.com/v1/text:synthesize', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'x-goog-user-project': saJson.project_id,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const errText = await res.text();
    if (res.status === 429) {
      const m = errText.match(/retry.{0,5}([\d.]+)\s*s/i);
      const wait = m ? Math.ceil(parseFloat(m[1])) + 2 : 65;
      throw { retryable: true, waitMs: wait * 1000, message: `Rate limited, wait ${wait}s` };
    }
    throw new Error(`API ${res.status}: ${errText.slice(0, 300)}`);
  }
  const json = (await res.json()) as { audioContent: string };
  return Buffer.from(json.audioContent, 'base64');
}

async function synthesize(text: string, model: string, prompt: string): Promise<Buffer> {
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      return await synthesizeOnce(text, model, prompt);
    } catch (err: unknown) {
      const isRetryable = typeof err === 'object' && err !== null && 'retryable' in err;
      if (isRetryable && attempt < MAX_RETRIES - 1) {
        const waitMs = (err as { waitMs: number }).waitMs;
        process.stdout.write(` [rate-limited, waiting ${Math.round(waitMs / 1000)}s]`);
        await new Promise(r => setTimeout(r, waitMs));
        continue;
      }
      throw err instanceof Error ? err : new Error(String((err as { message?: string }).message ?? err));
    }
  }
  throw new Error('Max retries exceeded');
}

function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)); }

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const jobs = buildJobs();
  if (jobs.length === 0) {
    console.log('All files already exist — nothing to generate.');
    return;
  }

  console.log(`\nGenerating ${jobs.length} file(s) with Gemini TTS...\n`);

  for (let i = 0; i < jobs.length; i++) {
    const { outputPath, text, model, prompt } = jobs[i];
    const filename = path.basename(outputPath);
    const modelLabel = model === PRO_MODEL ? 'Pro' : 'Flash';
    process.stdout.write(`[${i + 1}/${jobs.length}] "${text}" (${modelLabel}) → ${filename} ...`);
    try {
      const buf = await synthesize(text, model, prompt);
      fs.writeFileSync(outputPath, buf);
      process.stdout.write(` ✓ (${buf.length} bytes)\n`);
    } catch (err) {
      process.stdout.write(` ✗ ERROR: ${err instanceof Error ? err.message : err}\n`);
    }
    if (i < jobs.length - 1) await sleep(DELAY_MS);
  }

  console.log('\nDone! Run `npm run check:audio` before committing.');
}

main().catch(e => { console.error(e); process.exit(1); });

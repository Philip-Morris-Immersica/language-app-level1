/**
 * Generates TTS MP3 files for Bulgarian digits 0–9.
 * Output: public/assets/lesson-00/audio/tts/digits/{n}.mp3
 *
 * Usage:
 *   npm run tts:digits
 * or:
 *   npx tsx scripts/generate-digit-tts.ts [--model gemini|chirp]
 *
 * Requires:
 *   - Gemini model: service-account.json in project root
 *   - Chirp model: GOOGLE_TTS_API_KEY in .env.local
 */

import fs from 'fs';
import path from 'path';
import { GoogleAuth } from 'google-auth-library';

const PROJECT_ROOT = path.resolve(__dirname, '..');

function parseArg(name: string): string | undefined {
  const flag = process.argv.find(a => a.startsWith(`--${name}`));
  if (!flag) return undefined;
  if (flag.includes('=')) return flag.split('=')[1];
  const idx = process.argv.indexOf(flag);
  return process.argv[idx + 1];
}

const modelFlag = parseArg('model') || 'gemini';
const USE_GEMINI = modelFlag !== 'chirp';

const DIGITS: { digit: number; text: string }[] = [
  { digit: 0, text: 'нула' },
  { digit: 1, text: 'едно' },
  { digit: 2, text: 'две' },
  { digit: 3, text: 'три' },
  { digit: 4, text: 'четири' },
  { digit: 5, text: 'пет' },
  { digit: 6, text: 'шест' },
  { digit: 7, text: 'седем' },
  { digit: 8, text: 'осем' },
  { digit: 9, text: 'девет' },
];

const OUT_DIR = path.join(PROJECT_ROOT, 'public', 'assets', 'lesson-00', 'audio', 'tts', 'digits');

const GEMINI_FLASH_MODEL = 'gemini-2.5-flash-tts';
const GEMINI_WORD_PROMPT = 'make sure the word is clearly in Bulgarian with the right pronunciation';
const FEMALE_VOICE = USE_GEMINI ? 'Achernar' : 'bg-BG-Chirp3-HD-Achernar';

async function getAccessToken(): Promise<string> {
  const saPath = path.join(PROJECT_ROOT, 'service-account.json');
  const auth = new GoogleAuth({
    keyFile: saPath,
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  });
  const client = await auth.getClient();
  const tokenResponse = await client.getAccessToken();
  const token = tokenResponse.token;
  if (!token) throw new Error('Could not get access token');
  return token;
}

async function synthesizeGemini(text: string): Promise<Buffer> {
  const token = await getAccessToken();
  const saJson = JSON.parse(fs.readFileSync(path.join(PROJECT_ROOT, 'service-account.json'), 'utf8'));
  const body = {
    input: { text, prompt: GEMINI_WORD_PROMPT },
    voice: { languageCode: 'bg-BG', name: FEMALE_VOICE, modelName: GEMINI_FLASH_MODEL },
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
  if (!res.ok) throw new Error(`API error ${res.status}: ${await res.text()}`);
  const json = (await res.json()) as { audioContent: string };
  return Buffer.from(json.audioContent, 'base64');
}

async function synthesizeChirp(text: string): Promise<Buffer> {
  const API_KEY = process.env.GOOGLE_TTS_API_KEY;
  if (!API_KEY) throw new Error('Missing GOOGLE_TTS_API_KEY env var');
  const body = {
    input: { text },
    voice: { languageCode: 'bg-BG', name: FEMALE_VOICE },
    audioConfig: { audioEncoding: 'MP3', speakingRate: 0.85 },
  };
  const res = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`API error ${res.status}: ${await res.text()}`);
  const json = (await res.json()) as { audioContent: string };
  return Buffer.from(json.audioContent, 'base64');
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  console.log(`Generating digit TTS files using ${USE_GEMINI ? 'Gemini Flash' : 'Chirp'} model...`);
  console.log(`Output directory: ${OUT_DIR}\n`);

  let generated = 0;
  let skipped = 0;

  for (const { digit, text } of DIGITS) {
    const outPath = path.join(OUT_DIR, `${digit}.mp3`);
    if (fs.existsSync(outPath)) {
      console.log(`  ${digit} (${text}) — SKIP (already exists)`);
      skipped++;
      continue;
    }
    process.stdout.write(`  ${digit} (${text}) — generating...`);
    try {
      const mp3 = USE_GEMINI ? await synthesizeGemini(text) : await synthesizeChirp(text);
      fs.writeFileSync(outPath, mp3);
      process.stdout.write(` OK (${mp3.length} bytes)\n`);
      generated++;
      // Rate limiting: 6.5s between requests
      if (generated < DIGITS.length) await new Promise(r => setTimeout(r, 6500));
    } catch (err) {
      process.stdout.write(` FAILED\n`);
      console.error(`    Error: ${err instanceof Error ? err.message : err}`);
    }
  }

  console.log(`\nDone: ${generated} generated, ${skipped} skipped.`);
  if (generated > 0) {
    console.log('\nNext steps:');
    console.log('  npm run check:audio');
    console.log('  git add -A && git commit -m "feat(lesson-00): digit TTS audio (0–9)"');
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});

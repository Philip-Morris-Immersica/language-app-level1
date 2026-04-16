import fs from 'fs';
import path from 'path';
import { cleanForTTS } from '@/lib/tts';

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const PROJECT_ROOT = path.resolve(__dirname, '..');

// ---------------------------------------------------------------------------
// Parse CLI arguments
// ---------------------------------------------------------------------------
function parseArg(name: string): string | undefined {
  const flag = process.argv.find(a => a.startsWith(`--${name}`));
  if (!flag) return undefined;
  if (flag.includes('=')) return flag.split('=')[1];
  const idx = process.argv.indexOf(flag);
  return process.argv[idx + 1];
}

const lessonNum = parseArg('lesson');
const testNum = parseArg('test');
if (!lessonNum && !testNum) {
  console.error('Usage: tsx scripts/generate-tts.ts --lesson 04 [--model gemini|chirp]');
  console.error('       tsx scripts/generate-tts.ts --test 4 [--model gemini|chirp]');
  process.exit(1);
}
const IS_TEST = !!testNum;
// --test accepts the folder suffix: e.g. --test 4 → test-lessons-4, --test 1-2-3 → test-lessons-1-2-3

const modelFlag = parseArg('model') || 'gemini';
const USE_GEMINI = modelFlag === 'gemini';

const FEMALE_VOICE = USE_GEMINI ? 'Achernar' : 'bg-BG-Chirp3-HD-Achernar';
/** Second female voice for dialogues with two women (Gemini only; Chirp reuses Achernar). */
const FEMALE_VOICE_ALT = USE_GEMINI ? 'Despina' : 'bg-BG-Chirp3-HD-Achernar';
const MALE_VOICE = USE_GEMINI ? 'Charon' : 'bg-BG-Chirp3-HD-Charon';
/** Second male voice for dialogues with two men (Gemini only; Chirp reuses Charon). */
const MALE_VOICE_ALT = USE_GEMINI ? 'Achird' : 'bg-BG-Chirp3-HD-Charon';
const GEMINI_MODEL = 'gemini-2.5-pro-tts';
const GEMINI_PROMPT = 'Read aloud in a warm, welcoming tone.';
const GEMINI_FLASH_MODEL = 'gemini-2.5-flash-tts';
const GEMINI_WORD_PROMPT = 'make sure the word is clearly in Bulgarian with the right pronunciation';

// Grammar table row files that need Pro model instead of Flash (e.g. multi-syllable numbers, tricky pronunciation)
const GRAMMAR_TABLE_PRO_ROWS = new Set([
  'l04-gramatika-02-row-9', // хиляда
  'l05-gramatika-07-row-0', // хиляда (l05)
  'l05-gramatika-07-row-4', // един милиард (l05)
  'l06-gramatika-04-row-3', // тя / й (KPM table – "й" needs Pro for correct pronunciation)
  'l06-gramatika-08-row-6', // вие работите / не работите
  'l08-gramatika-02-row-0', // хубав → хубавият, малък → малкият, зелен → зеленият
  'l08-gramatika-02-row-1', // хубава → хубавата, малка → малката, зелена → зелената
  'l08-gramatika-02-row-2', // хубаво → хубавото, малко → малкото, зелено → зеленото
  'l08-gramatika-02-row-3', // хубави → хубавите, малки → малките, зелени → зелените
]);

// Grammar table note files that need Pro model instead of Flash (full sentences, not isolated words)
const GRAMMAR_TABLE_PRO_NOTES = new Set([
  'l07-gramatika-01-note-0', // "Дата: 10 август 2023 г. = десети август две хиляди двайсет и трета година" — full sentence
]);
const SPEAKING_RATE = 0.85; // Chirp only

// Chirp: 10 req/s; Gemini: 10 req/min
const REQUEST_DELAY_MS = USE_GEMINI ? 6500 : 110;
const MAX_RETRIES = 3;

const CONTENT_ID = IS_TEST
  ? `test-lessons-${testNum}`
  : `lesson-${lessonNum!.padStart(2, '0')}`;
// ASSET_DIR is resolved at runtime after loading metadata for tests
let OUTPUT_BASE = '';

// Per-lesson exclude lists
const READING_TEXT_EXCLUDE = new Set(
  lessonNum === '05' ? ['l05-ex-10', 'l05-wb-00', 'l05-wb-04'] : [],
);
const SKIP_FULL_TEXT = new Set(
  lessonNum === '05' ? ['l05-ex-25'] : [],
);

const GRAMMAR_LABELS = new Set([
  'мъжки род', 'женски род', 'среден род', 'множествено число',
  'м.р.', 'ж.р.', 'ср.р.', 'мн.ч.',
]);

// ---------------------------------------------------------------------------
// Text cleaning
// ---------------------------------------------------------------------------
function cleanForGeminiTTS(raw: string): string {
  return raw
    .replace(/\*\*/g, '')          // strip markdown bold markers (e.g. **това**)
    .replace(/^[–—]\s*/gm, '')
    .replace(/\s*\([^)]*\)\s*/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const clean = USE_GEMINI ? cleanForGeminiTTS : cleanForTTS;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface VocabularyItem { id: string; bulgarian: string; }
interface DialogueSpeaker { name: string; text: string; }
interface Dialogue { id: string; speakers: DialogueSpeaker[]; }
interface LessonContent { vocabulary: VocabularyItem[]; dialogues: Dialogue[]; }

interface Exercise {
  id: string;
  type: string;
  disableTts?: boolean;
  audioUrl?: string;
  listeningText?: string;
  voiceGender?: 'male' | 'female';
  textTitle?: string;
  paragraphs?: string[];
  rows?: { pronoun: string; cells: string[] }[];
  examples?: { text: string; subtext?: string; lines?: string[] }[];
  sections?: { id: string; lines: { text: string; speaker?: string; voiceGender?: 'male' | 'female' }[] }[];
  notes?: string[];
  model?: { question: string; positiveAnswer: string; negativeAnswer: string };
  cards?: { id: string; label: string; sublabels?: string[] }[];
  pronouns?: { pronoun: string }[];
}

interface TtsJob {
  category: string;
  filename: string;
  text: string;
  voice: string;
  model: string;
  prompt: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function ensureDir(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise(r => setTimeout(r, ms));
}

// ---------------------------------------------------------------------------
// Auth + Synthesize
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
  cachedToken = { token: res.token, expiry: Date.now() + 3500_000 };
  return res.token;
}

async function synthesizeGeminiOnce(text: string, voice: string, model: string, prompt: string): Promise<Buffer> {
  const token = await getAccessToken();
  const saJson = JSON.parse(fs.readFileSync(path.join(PROJECT_ROOT, 'service-account.json'), 'utf8'));
  const body = {
    input: { text, prompt },
    voice: { languageCode: 'bg-BG', name: voice, modelName: model },
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
      const retryMatch = errText.match(/retry.{0,5}([\d.]+)\s*s/i);
      const waitSec = retryMatch ? Math.ceil(parseFloat(retryMatch[1])) + 2 : 60;
      throw { retryable: true, waitMs: waitSec * 1000, message: `Rate limited, wait ${waitSec}s` };
    }
    throw new Error(`Cloud TTS API error ${res.status}: ${errText.slice(0, 300)}`);
  }
  const json = (await res.json()) as { audioContent: string };
  return Buffer.from(json.audioContent, 'base64');
}

async function synthesizeGemini(text: string, voice: string, model: string, prompt: string): Promise<Buffer> {
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      return await synthesizeGeminiOnce(text, voice, model, prompt);
    } catch (err: unknown) {
      const isRetryable = typeof err === 'object' && err !== null && 'retryable' in err;
      if (isRetryable && attempt < MAX_RETRIES - 1) {
        const waitMs = (err as { waitMs: number }).waitMs;
        process.stdout.write(` [rate-limited, waiting ${Math.round(waitMs / 1000)}s]`);
        await sleep(waitMs);
        continue;
      }
      throw err instanceof Error ? err : new Error(String((err as { message?: string }).message || err));
    }
  }
  throw new Error('Max retries exceeded');
}

async function synthesizeChirp(text: string, voice: string): Promise<Buffer> {
  const API_KEY = process.env.GOOGLE_TTS_API_KEY;
  if (!API_KEY) throw new Error('Missing GOOGLE_TTS_API_KEY');
  const body = {
    input: { text },
    voice: { languageCode: 'bg-BG', name: voice },
    audioConfig: { audioEncoding: 'MP3', speakingRate: SPEAKING_RATE },
  };
  const res = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Cloud TTS API error ${res.status}: ${await res.text()}`);
  const json = (await res.json()) as { audioContent: string };
  return Buffer.from(json.audioContent, 'base64');
}

const synthesize = USE_GEMINI
  ? (text: string, voice: string, model: string, prompt: string) => synthesizeGemini(text, voice, model, prompt)
  : (text: string, voice: string, _model: string, _prompt: string) => synthesizeChirp(text, voice);

// ---------------------------------------------------------------------------
// Dialogue voice mapping
// ---------------------------------------------------------------------------
const SPEAKER_VOICE_MAP: Record<string, string> = {
  'клиент': FEMALE_VOICE,
  'продавач': MALE_VOICE,
  'сервитьор': MALE_VOICE,
  'господин': MALE_VOICE,
  'госпожа': FEMALE_VOICE,
};

function getDialogueVoice(speaker: string | undefined, lineIndex: number): string {
  if (speaker) {
    const mapped = SPEAKER_VOICE_MAP[speaker.toLowerCase()];
    if (mapped) return mapped;
  }
  return lineIndex % 2 === 0 ? FEMALE_VOICE : MALE_VOICE;
}

/** Per-section counters so consecutive same-gender lines get voice alternation. */
function dialogueLineVoice(
  line: { text: string; speaker?: string; voiceGender?: 'male' | 'female' },
  lineIndex: number,
  maleTurn: { n: number },
  femaleTurn: { n: number },
): string {
  if (line.voiceGender === 'female') {
    const v = femaleTurn.n % 2 === 0 ? FEMALE_VOICE : FEMALE_VOICE_ALT;
    femaleTurn.n++;
    return v;
  }
  if (line.voiceGender === 'male') {
    const v = maleTurn.n % 2 === 0 ? MALE_VOICE : MALE_VOICE_ALT;
    maleTurn.n++;
    return v;
  }
  return getDialogueVoice(line.speaker, lineIndex);
}

function stripGrammarLabels(subtext: string): string {
  return subtext.split('\n').filter(line => !GRAMMAR_LABELS.has(line.trim())).join('\n');
}

// ---------------------------------------------------------------------------
// Collect jobs
// ---------------------------------------------------------------------------
function collectVocabularyJobs(content: LessonContent): TtsJob[] {
  return content.vocabulary.map(item => ({
    category: 'words',
    filename: `${item.id}.mp3`,
    text: clean(item.bulgarian),
    voice: FEMALE_VOICE,
    model: GEMINI_FLASH_MODEL,
    prompt: GEMINI_WORD_PROMPT,
  }));
}

/** Illustrated cards use `words/{card.id}.mp3` — may differ from vocabulary ids (e.g. lesson 01). */
function collectIllustratedCardJobs(exercises: Exercise[]): TtsJob[] {
  const jobs: TtsJob[] = [];
  for (const ex of exercises.filter(e => e.type === 'illustrated_cards' && e.cards)) {
    for (const card of ex.cards!) {
      const parts = [card.label, ...(card.sublabels || [])];
      jobs.push({
        category: 'words',
        filename: `${card.id}.mp3`,
        text: clean(parts.join('. ')),
        voice: FEMALE_VOICE,
        model: GEMINI_FLASH_MODEL,
        prompt: GEMINI_WORD_PROMPT,
      });
    }
  }
  return jobs;
}

/** grammar_visual — one MP3 per pronoun tile (same convention as other grammar clips). */
function collectGrammarVisualJobs(exercises: Exercise[]): TtsJob[] {
  const jobs: TtsJob[] = [];
  for (const ex of exercises.filter(e => e.type === 'grammar_visual' && e.pronouns)) {
    for (let i = 0; i < ex.pronouns!.length; i++) {
      jobs.push({
        category: 'grammar',
        filename: `${ex.id}-pronoun-${i}.mp3`,
        text: clean(ex.pronouns![i].pronoun),
        voice: FEMALE_VOICE,
        model: GEMINI_FLASH_MODEL,
        prompt: GEMINI_WORD_PROMPT,
      });
    }
  }
  return jobs;
}

function collectDialogueJobs(exercises: Exercise[]): TtsJob[] {
  const jobs: TtsJob[] = [];
  for (const ex of exercises.filter(e => e.type === 'dialogues' && e.sections)) {
    for (const section of ex.sections!) {
      const maleTurn = { n: 0 };
      const femaleTurn = { n: 0 };
      for (let i = 0; i < section.lines.length; i++) {
        const line = section.lines[i];
        const rawText = line.text.replace(/^—\s*/, '');
        jobs.push({
          category: 'dialogues',
          filename: `${ex.id}-${section.id}-line-${i}.mp3`,
          text: clean(rawText),
          voice: dialogueLineVoice(line, i, maleTurn, femaleTurn),
          model: GEMINI_MODEL,
          prompt: GEMINI_PROMPT,
        });
      }
    }
  }
  return jobs;
}

function collectGrammarTableJobs(exercises: Exercise[]): TtsJob[] {
  const jobs: TtsJob[] = [];
  for (const ex of exercises.filter(e => e.type === 'grammar_table' && e.rows)) {
    for (let i = 0; i < ex.rows!.length; i++) {
      const row = ex.rows![i];
      const isNumericPronoun = /^\d[\d\s]*$/.test(row.pronoun.trim());
      const speakableCells = row.cells.filter(c => !c.trim().startsWith('-'));
      const parts = isNumericPronoun ? speakableCells : [row.pronoun, ...speakableCells];
      const rowKey = `${ex.id}-row-${i}`;
      const useProForRow = GRAMMAR_TABLE_PRO_ROWS.has(rowKey);
      jobs.push({
        category: 'grammar',
        filename: `${rowKey}.mp3`,
        text: clean(parts.join('. ')),
        voice: FEMALE_VOICE,
        model: useProForRow ? GEMINI_MODEL : GEMINI_FLASH_MODEL,
        prompt: useProForRow ? GEMINI_PROMPT : GEMINI_WORD_PROMPT,
      });
    }
    if (ex.notes) {
      ex.notes.forEach((note, ni) => {
        const noteKey = `${ex.id}-note-${ni}`;
        const useProForNote = GRAMMAR_TABLE_PRO_NOTES.has(noteKey);
        jobs.push({
          category: 'grammar',
          filename: `${noteKey}.mp3`,
          text: clean(note),
          voice: FEMALE_VOICE,
          model: useProForNote ? GEMINI_MODEL : GEMINI_FLASH_MODEL,
          prompt: useProForNote ? GEMINI_PROMPT : GEMINI_WORD_PROMPT,
        });
      });
    }
  }
  return jobs;
}

function collectGrammarExampleJobs(exercises: Exercise[]): TtsJob[] {
  const jobs: TtsJob[] = [];
  for (const ex of exercises.filter(e => e.type === 'grammar_examples' && !e.disableTts && e.examples)) {
    for (let i = 0; i < ex.examples!.length; i++) {
      const card = ex.examples![i];
      let parts: string;
      if (card.lines) {
        // Strip speaker labels like "Вие:" / "Ти:" at line start before joining for TTS
        parts = card.lines.map(l => l.replace(/^\s*\S+:\s+/, '')).join(' ');
      } else {
        const cleanedSubtext = card.subtext ? stripGrammarLabels(card.subtext) : '';
        parts = [card.text, cleanedSubtext].filter(Boolean).join(' ');
      }
      jobs.push({
        category: 'grammar',
        filename: `${ex.id}-card-${i}.mp3`,
        text: clean(parts),
        voice: FEMALE_VOICE,
        model: GEMINI_MODEL,
        prompt: GEMINI_PROMPT,
      });
    }
  }
  return jobs;
}

function collectReadingTextJobs(exercises: Exercise[]): TtsJob[] {
  const jobs: TtsJob[] = [];
  for (const ex of exercises.filter(e => e.type === 'reading_text' && e.paragraphs && !READING_TEXT_EXCLUDE.has(e.id))) {
    const paragraphs = ex.paragraphs!;
    const voice = ex.voiceGender === 'male' ? MALE_VOICE : FEMALE_VOICE;
    for (let i = 0; i < paragraphs.length; i++) {
      if (!paragraphs[i].trim()) continue;
      jobs.push({ category: 'texts', filename: `${ex.id}-p-${i}.mp3`, text: clean(paragraphs[i]), voice, model: GEMINI_MODEL, prompt: GEMINI_PROMPT });
    }
    // Prepend textTitle (if present) to the full reading for TTS continuity
    const titlePrefix = ex.textTitle ? `${clean(ex.textTitle)}.\n` : '';
    const fullText = clean(titlePrefix + paragraphs.join('\n'));
    if (paragraphs.length > 0 && fullText.length < 2000 && !SKIP_FULL_TEXT.has(ex.id)) {
      jobs.push({ category: 'texts', filename: `${ex.id}-full.mp3`, text: fullText, voice, model: GEMINI_MODEL, prompt: GEMINI_PROMPT });
    }
  }
  return jobs;
}

function collectListeningJobs(exercises: Exercise[]): TtsJob[] {
  return exercises
    .filter(e => e.listeningText)
    .map(e => ({ category: 'listening', filename: `${e.id}.mp3`, text: clean(e.listeningText!), voice: FEMALE_VOICE, model: GEMINI_MODEL, prompt: GEMINI_PROMPT }));
}

function collectPersonalChoiceJobs(exercises: Exercise[]): TtsJob[] {
  const jobs: TtsJob[] = [];
  for (const ex of exercises.filter(e => e.type === 'personal_choice' && e.model)) {
    const { question, positiveAnswer, negativeAnswer } = ex.model!;
    const modelText = clean(`${question} ${positiveAnswer} ${negativeAnswer}`);
    jobs.push({
      category: 'texts',
      filename: `${ex.id}-model.mp3`,
      text: modelText,
      voice: FEMALE_VOICE,
      model: GEMINI_MODEL,
      prompt: GEMINI_PROMPT,
    });
  }
  return jobs;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const modelLabel = USE_GEMINI ? 'Gemini TTS (Pro + Flash)' : 'Chirp3-HD';
  console.log(`\nGenerating TTS audio for ${CONTENT_ID} [model: ${modelLabel}]\n`);

  let content: LessonContent | null = null;
  let exercises: Exercise[];

  if (IS_TEST) {
    const metaModule = await import(`../src/content/tests/${CONTENT_ID}/metadata`);
    const testModule = await import(`../src/content/tests/${CONTENT_ID}/exercises`);
    exercises = testModule.exercises as Exercise[];
    OUTPUT_BASE = path.join(PROJECT_ROOT, 'public', 'assets', metaModule.metadata.id, 'audio', 'tts');
  } else {
    const contentModule = await import(`../src/content/lessons/${CONTENT_ID}/content`);
    const exercisesModule = await import(`../src/content/lessons/${CONTENT_ID}/exercises`);
    content = contentModule.content as LessonContent;
    exercises = exercisesModule.exercises as Exercise[];
    OUTPUT_BASE = path.join(PROJECT_ROOT, 'public', 'assets', CONTENT_ID, 'audio', 'tts');
  }

  const jobs: TtsJob[] = [
    ...(content ? collectVocabularyJobs(content) : []),
    ...collectIllustratedCardJobs(exercises),
    ...collectDialogueJobs(exercises),
    ...collectGrammarVisualJobs(exercises),
    ...collectGrammarTableJobs(exercises),
    ...collectGrammarExampleJobs(exercises),
    ...collectReadingTextJobs(exercises),
    ...collectListeningJobs(exercises),
    ...collectPersonalChoiceJobs(exercises),
  ];

  console.log(`Total jobs: ${jobs.length}\n`);

  const categories = [...new Set(jobs.map(j => j.category))];
  for (const cat of categories) {
    ensureDir(path.join(OUTPUT_BASE, cat));
  }

  let generated = 0;
  let skipped = 0;
  let failed = 0;
  let totalChars = 0;

  for (let i = 0; i < jobs.length; i++) {
    const job = jobs[i];
    const outPath = path.join(OUTPUT_BASE, job.category, job.filename);

    if (fs.existsSync(outPath)) {
      skipped++;
      continue;
    }

    const progress = `[${i + 1}/${jobs.length}]`;
    process.stdout.write(`${progress} ${job.category}/${job.filename} ...`);

    try {
      const mp3 = await synthesize(job.text, job.voice, job.model, job.prompt);
      fs.writeFileSync(outPath, mp3);
      totalChars += job.text.length;
      generated++;
      process.stdout.write(` OK (${mp3.length} bytes)\n`);
    } catch (err) {
      failed++;
      process.stdout.write(` FAILED\n`);
      console.error(`  Error: ${err instanceof Error ? err.message : err}`);
    }

    await sleep(REQUEST_DELAY_MS);
  }

  console.log(`\n--- Summary ---`);
  console.log(`Model: ${modelLabel}`);
  console.log(`Generated: ${generated}`);
  console.log(`Skipped (already exist): ${skipped}`);
  console.log(`Failed: ${failed}`);
  console.log(`Total characters sent: ${totalChars}`);
  console.log(`Output: ${OUTPUT_BASE}\n`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});

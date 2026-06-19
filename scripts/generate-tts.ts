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
const GEMINI_PROMPT = 'Read aloud in a warm, welcoming tone, in clear standard Bulgarian with natural native pronunciation and correct stress. Do not use any Russian, Arabic, English or other foreign accent.';
/** Calmer Pro prompt for reading texts that should have minimal intonation (per-id opt-in below). */
const GEMINI_BG_CALM_PROMPT =
  'Read calmly and neutrally in clear standard Bulgarian with correct native stress, with minimal intonation and without any foreign accent.';
/** reading_text ids that should use the calmer, low-intonation Pro prompt. */
const READING_TEXT_CALM_PROMPT_IDS = new Set<string>(['a2-l08-ex-19']);
/** Per-exercise custom prompt override for reading_text paragraphs (overrides CALM_PROMPT_IDS). */
const READING_TEXT_CUSTOM_PROMPTS: Record<string, string> = {
  'a2-l08-tekst-vakantsia':
    'Read calmly in clear standard Bulgarian with correct native stress. ' +
    'Stress rules for this text: „гра́да" — stress on first syllable (ГРА-да, NOT гра-ДА); ' +
    '„са́ндвич" — stress on first syllable (СА-ндвич); ' +
    '„кафе́" — stress on last syllable (ка-ФЕ, NOT КА-фе); ' +
    '„по́вече" — stress on first syllable (ПО-вече, NOT по-ВЕ-че). ' +
    'Do not use Russian, Arabic or any other foreign accent.',
};
const GEMINI_FLASH_MODEL = 'gemini-2.5-flash-tts';
const GEMINI_WORD_PROMPT = 'make sure the word is clearly in Bulgarian with the right pronunciation';
/** Isolated words where Flash mis-stresses; Pro + explicit stress hint (l03 tekstove flip cards). */
const GEMINI_BG_WORD_STRESS_PROMPT =
  'Bulgarian food name. Speak with native word stress (ударение) on the correct syllable in each word.';

// Grammar table row files that need Pro model instead of Flash (e.g. multi-syllable numbers, tricky pronunciation)
const GRAMMAR_TABLE_PRO_ROWS = new Set([
  // Lesson 00 — Alphabet letters with tricky pronunciation
  'l00-gramatika-01-row-0',  // А — Ана
  'l00-gramatika-01-row-4',  // Д — Дилма
  'l00-gramatika-01-row-11', // Л — Лейла (soft Л)
  'l00-gramatika-01-row-12', // М — Мохамед
  'l00-gramatika-01-row-19', // У — Уляна
  'l00-gramatika-01-row-22', // Ц — Цветелина
  'l03-gramatika-04-row-0', // сандвич, сок — Flash mispronounces loanwords
  'l04-gramatika-02-row-9', // хиляда
  'l05-gramatika-07-row-0', // хиляда (l05)
  'l05-gramatika-07-row-1', // две хиляди (l05)
  'l05-gramatika-07-row-2', // един милион (l05)
  'l05-gramatika-07-row-3', // два милиона (l05)
  'l05-gramatika-07-row-4', // един милиард (l05)
  'l06-gramatika-04-row-3', // тя / й (KPM table – "й" needs Pro for correct pronunciation)
  'l06-gramatika-08-row-6', // Вие работите / не работите
  'a2-l01-gramatika-01-row-5', // ние → ни: Flash expands clitic "ни" as "ние"; Pro handles it correctly
  'a2-l02-gramatika-03-row-3', // тя → й: Flash mispronounces clitic "й"
  'a2-l02-gramatika-05-row-0', // аз → Трябва ми един лев: Flash mispronounces "лев" as "лъев"
  'a2-l02-gramatika-05-row-1', // ти → Трябва ти един лев: Flash mispronounces "лев" as "лъев"
  'a2-l02-gramatika-05-row-2', // той → Трябва му един лев: Flash mispronounces "лев" as "лъев"
  'a2-l02-gramatika-05-row-3', // тя → Трябва й: Flash mispronounces clitic "й"
  'a2-l02-gramatika-05-row-4', // то → Трябва му един лев: Flash mispronounces "лев" as "лъев"
  'a2-l02-gramatika-05-row-5', // ние → Трябва ни един лев: Flash mispronounces "лев" as "лъев"
  'a2-l02-gramatika-05-row-6', // Вие → Трябва ви един лев: Flash mispronounces "лев" as "лъев"
  'a2-l02-gramatika-05-row-7', // те → Трябва им един лев: Flash mispronounces "лев" as "лъев"
  'a2-l02-gramatika-07-row-0', // аз → Топло ми е: Flash sounds robotic on short clitic sentences
  'a2-l02-gramatika-07-row-1', // ти → Топло ти е
  'a2-l02-gramatika-07-row-2', // той → Топло му е
  'a2-l02-gramatika-07-row-3', // тя → Топло й е: Flash mispronounces clitic "й"
  'a2-l02-gramatika-07-row-4', // то → Топло му е
  'a2-l02-gramatika-07-row-5', // ние → Топло ни е
  'a2-l02-gramatika-07-row-6', // Вие → Топло Ви е
  'a2-l02-gramatika-07-row-7', // те → Топло им е
  'l08-gramatika-02-row-0', // хубав → хубавият, малък → малкият, зелен → зеленият
  'l08-gramatika-02-row-1', // хубава → хубавата, малка → малката, зелена → зелената
  'l08-gramatika-02-row-2', // хубаво → хубавото, малко → малкото, зелено → зеленото
  'l08-gramatika-02-row-3', // хубави → хубавите, малки → малките, зелени → зелените
  'l09-gramatika-01-row-3', // четвърти — "четвърт" root, known Flash mispronunciation
]);

// Grammar table note files that need Pro model instead of Flash (full sentences, not isolated words)
const GRAMMAR_TABLE_PRO_NOTES = new Set([
  'l07-gramatika-01-note-0',  // "Дата: 10 август 2023 г. = десети август две хиляди двайсет и трета година" — full sentence
  'l04-gramatika-02-note-0',  // "двеста шестдесет и пет"
  'l04-gramatika-02-note-1',  // "хиляда триста осемдесет и девет"
  'l05-gramatika-07-note-0',  // "След 2–4 използвайте „милиона/милиарда"..."
  'l09-gramatika-01-note-0',  // "Понеделник е първият ден от седмицата." — full sentence
  'l09-gramatika-02-note-0',  // "Пловдив е голям град. София е по-голям…" — full sentences
  'a2-l02-gramatika-02-note-0', // "Боли ме главата. Единствено число: глава, крак, зъб." — full sentence
  'a2-l02-gramatika-02-note-1', // "Болят ме очите. Множествено число: очи, уши, ръце, зъби, крака." — full sentence
  'a2-l02-gramatika-02-note-2', // "Боли ме коремът. Имам болки в корема." — full sentence
  'a2-l02-gramatika-07-note-0', // "Топло ми е. Не ми е топло. Топло ли ми е?" — full expressive sentences
  'a2-l02-gramatika-07-note-1', // "Замени топло с: студено, трудно, лошо..." — list sentence
]);

/** Grammar row: exact TTS string when `clean()` would keep the книжовна форма but разговорна is preferred (като другите -найсет). */
const GRAMMAR_TABLE_ROW_TTS_TEXT: Record<string, string> = {
  'l03-gramatika-01-row-6': 'шестнайсет', // 16 — иначе след махане на скобите остава „шестнадесет“

  'l00-gramatika-01-row-9':  'и кратко',   // Й — буквата се произнася „и кратко"
  'l00-gramatika-01-row-27': 'ер малък',   // Ь — буквата се произнася „ер малък"

  // a2-lesson-02 — ГРАМАТИКА 3: дателни местоимения — „їй" (U+045D) → „й"
  'a2-l02-gramatika-03-row-3': 'тя. й. Пиша й.',

  // a2-lesson-02 — ГРАМАТИКА 5: „1 лев" → „един лев"
  'a2-l02-gramatika-05-row-0': 'аз. Трябва ми. Трябва ми един лев.',
  'a2-l02-gramatika-05-row-1': 'ти. Трябва ти. Трябва ти един лев.',
  'a2-l02-gramatika-05-row-2': 'той. Трябва му. Трябва му един лев.',
  'a2-l02-gramatika-05-row-3': 'тя. Трябва й. Трябва й един лев.',
  'a2-l02-gramatika-05-row-4': 'то. Трябва му. Трябва му един лев.',
  'a2-l02-gramatika-05-row-5': 'ние. Трябва ни. Трябва ни един лев.',
  'a2-l02-gramatika-05-row-6': 'Вие. Трябва ви. Трябва ви един лев.',
  'a2-l02-gramatika-05-row-7': 'те. Трябва им. Трябва им един лев.',

  // a2-lesson-02 — ГРАМАТИКА 7: безлични изречения
  // „То." с главна буква отделя ясно местоимението от „Топло" (иначе TTS слива „то" с началото на „Топло").
  // „їй" (U+045D) → „й" за реда на „тя".
  'a2-l02-gramatika-07-row-0': 'аз. Топло ми - е.',
  'a2-l02-gramatika-07-row-1': 'ти. Топло ти - е.',
  'a2-l02-gramatika-07-row-2': 'той. Топло му - е.',
  'a2-l02-gramatika-07-row-3': 'тя. Топло й - е.',
  'a2-l02-gramatika-07-row-4': 'Топло му - е.',  // „то" се пропуска — TTS го разчита като „топло" в тази позиция
  'a2-l02-gramatika-07-row-5': 'ние. Топло ни - е.',
  'a2-l02-gramatika-07-row-6': 'Вие. Топло Ви - е.',
  'a2-l02-gramatika-07-row-7': 'те. Топло им - е.',
};
const SPEAKING_RATE = 0.85; // Chirp only

// Chirp: 10 req/s; Gemini: 10 req/min
const REQUEST_DELAY_MS = USE_GEMINI ? 6500 : 110;
const MAX_RETRIES = 3;

const CONTENT_ID = IS_TEST
  ? `test-lessons-${testNum}`
  : /^\d+$/.test(lessonNum!)
    ? `lesson-${lessonNum!.padStart(2, '0')}`
    : lessonNum!;
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

/** Vocabulary `words/{id}.mp3` where Flash mispronounces; use Pro + word prompt. */
const VOCAB_USE_PRO_IDS = new Set([
  'kiselo-mlyako', 'otset',
  'smartfon',        // смартфон — Flash adds soft ь at end
  'palen-raboten-den', // пълен работен ден — Flash distorts ъл cluster
  'internet',        // интернет — needs explicit stress on first syllable (custom prompt below)
]);

/** Per-vocabulary custom TTS prompt when generic word prompt is not enough (Pro model). */
const VOCAB_CUSTOM_PROMPTS: Record<string, string> = {
  internet: 'Stress on the first syllable: ИН-тернет.',
};

/** Illustrated card `words/{id}.mp3` where Pro + warm prompt misplaces stress; keep Pro, use word pronunciation prompt. */
const ILLUSTRATED_CARD_PRO_WORD_PROMPT_IDS = new Set([
  'pushene',     // lesson 3 — Пушенето забранено!
  'bob',         // lesson 4 — боб (single short word, word prompt gives clearer stress)
  // a2-lesson-01 verbs — warm tone causes consonant distortion or trailing sounds on single verbs
  'tarsya',      // търся — needs custom stress prompt (see ILLUSTRATED_CARD_CUSTOM_PROMPTS)
  'vklyuchvam',  // включвам — лю cluster mispronounced as ру
  'namiram',     // намирам — р dropped
  'zaklyuchvam', // заключвам — trailing аа
  'zatvaryam',   // затварям — trailing яя
]);

/** Per illustrated-card id: Pro + this custom stress prompt (overrides generic word prompt). */
const ILLUSTRATED_CARD_CUSTOM_PROMPTS: Record<string, string> = {
  tarsya: 'Bulgarian verb. Stress on the first syllable only: ТЪР-ся.',
};

/** reading_text flip-card `words/{ttsWordId}.mp3` — regenerate with Pro + stress prompt when accent is wrong. */
const READING_TEXT_IMAGE_STRESS_IDS = new Set<string>(['shopska-salata', 'sarmi', 'baklava']);

/** Optional per-id prompt override (Pro) when generic stress prompt is not enough. */
const READING_TEXT_IMAGE_STRESS_PROMPT_BY_ID: Record<string, string> = {
  baklava:
    'Bulgarian word баклава (layered pastry dessert). Stress must fall on the first syllable: БА — кла — ва.',
};

/** Illustrated cards where Flash + word prompt gives clearer stress than Pro (isolated words). */
const ILLUSTRATED_CARD_FLASH_IDS = new Set([
  'tsigari', // lesson 3 — цигари (ударение на -га-)
  'shishche', // lesson 3 НОВИ ДУМИ 3 — шишче
  '200-euro', // lesson 3 НОВИ ДУМИ 2 — двеста евро
  '20-cent', // lesson 3 НОВИ ДУМИ 2 — двадесет евроцента
  // lesson 1 — НОВИ ДУМИ 1 (greetings); Pro + „warm" sounds overexcited for short phrases
  'morning',
  'day',
  'evening',
  'night',
  'hello',
  'hello_formal',
  'goodbye',
  'izklyuchvam', // a2-lesson-01 — Pro adds trailing мм; Flash cleaner for this verb
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
interface VocabularyItem {
  id: string;
  bulgarian: string;
  /** TTS-only override: text spoken instead of `bulgarian`. */
  ttsText?: string;
  /** TTS-only override: force Gemini Pro or Flash. */
  ttsModel?: 'flash' | 'pro';
  /** TTS-only override: custom prompt passed to Gemini. */
  ttsPrompt?: string;
}
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
  paragraphs?: string[] | { text: string; speaker?: string }[];
  /** TTS-friendly text per paragraph (overrides `paragraphs` for audio only). */
  ttsParagraphs?: string[];
  paragraphVoiceGenders?: ('male' | 'female')[];
  rows?: {
    pronoun: string;
    cells: string[];
    /** TTS-only override: force Gemini Pro or Flash for this row. */
    ttsModel?: 'flash' | 'pro';
    /** TTS-only override: custom prompt passed to Gemini. */
    ttsPrompt?: string;
    /** TTS-only override: exact text spoken instead of joining pronoun + cells. */
    ttsText?: string;
  }[];
  ttsFlash?: boolean;
  examples?: { text: string; ttsText?: string; subtext?: string; lines?: string[]; voiceGender?: 'male' | 'female' }[];
  sections?: { id: string; lines: { text: string; ttsText?: string; speaker?: string; voiceGender?: 'male' | 'female' }[] }[];
  notes?: string[];
  ttsNotes?: string[];
  /** TTS-only override per note index: force Gemini Pro or Flash. */
  ttsNoteModels?: ('flash' | 'pro')[];
  model?: { question: string; positiveAnswer: string; negativeAnswer: string };
  cards?: {
    id: string;
    label: string;
    sublabels?: string[];
    ttsIncludeSublabels?: boolean;
    ttsLabel?: string;
    /** TTS-only override: force Gemini Pro or Flash for this card. */
    ttsModel?: 'flash' | 'pro';
    /** TTS-only override: custom prompt passed to Gemini. */
    ttsPrompt?: string;
  }[];
  images?: {
    id: string;
    correctLabel: string;
    /** TTS-only override: force Gemini Pro or Flash for this image. */
    ttsModel?: 'flash' | 'pro';
    /** TTS-only override: custom prompt passed to Gemini. */
    ttsPrompt?: string;
  }[];
  pronouns?: { pronoun: string; description?: string }[];
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
  prevGender: { g: 'male' | 'female' | null },
): string {
  if (line.voiceGender === 'female') {
    // Reset alt counter when gender changes so non-consecutive female lines
    // (e.g. f, m, f) use the same primary voice — avoids accidental voice switches
    // for the same character. Alt only engages for truly consecutive f-f lines.
    if (prevGender.g !== 'female') femaleTurn.n = 0;
    const v = femaleTurn.n % 2 === 0 ? FEMALE_VOICE : FEMALE_VOICE_ALT;
    femaleTurn.n++;
    prevGender.g = 'female';
    return v;
  }
  if (line.voiceGender === 'male') {
    // Same logic for male: m, f, m → Charon, Achernar, Charon (not Charon, Achernar, Achird)
    if (prevGender.g !== 'male') maleTurn.n = 0;
    const v = maleTurn.n % 2 === 0 ? MALE_VOICE : MALE_VOICE_ALT;
    maleTurn.n++;
    prevGender.g = 'male';
    return v;
  }
  prevGender.g = null;
  return getDialogueVoice(line.speaker, lineIndex);
}

function stripGrammarLabels(subtext: string): string {
  return subtext.split('\n').filter(line => !GRAMMAR_LABELS.has(line.trim())).join('\n');
}

// ---------------------------------------------------------------------------
// Collect jobs
// ---------------------------------------------------------------------------
function collectVocabularyJobs(content: LessonContent): TtsJob[] {
  return content.vocabulary.map(item => {
    // Content-level override has priority; falls back to hardcoded A1 sets for backward compat.
    const usePro = item.ttsModel ? item.ttsModel === 'pro' : VOCAB_USE_PRO_IDS.has(item.id);
    const customPrompt = item.ttsPrompt ?? VOCAB_CUSTOM_PROMPTS[item.id];
    return {
      category: 'words',
      filename: `${item.id}.mp3`,
      text: clean(item.ttsText ?? item.bulgarian),
      voice: FEMALE_VOICE,
      model: usePro ? GEMINI_MODEL : GEMINI_FLASH_MODEL,
      prompt: customPrompt ?? (usePro ? GEMINI_PROMPT : GEMINI_WORD_PROMPT),
    };
  });
}

/**
 * Illustrated cards use `words/{card.id}.mp3` — may differ from vocabulary ids (e.g. lesson 01).
 * Pro + warm prompt: short phrases sound more natural than Flash (stress/intonation on e.g. „Добър ден!“).
 */
function collectIllustratedCardJobs(exercises: Exercise[]): TtsJob[] {
  const jobs: TtsJob[] = [];
  for (const ex of exercises.filter(e => e.type === 'illustrated_cards' && e.cards)) {
    for (const card of ex.cards!) {
      let joined: string;
      if (card.ttsLabel) {
        joined = card.ttsLabel;
      } else {
        const parts = card.ttsIncludeSublabels
          ? [card.label, ...(card.sublabels || [])]
          : [card.label];
        joined = parts.join('. ').replace(/\s*=\s*/g, ', ');
      }
      // Content-level overrides have priority; fall back to hardcoded A1 sets for backward compat.
      const useFlash = card.ttsModel ? card.ttsModel === 'flash' : ILLUSTRATED_CARD_FLASH_IDS.has(card.id);
      const useProWordPrompt = ILLUSTRATED_CARD_PRO_WORD_PROMPT_IDS.has(card.id);
      const customPrompt = card.ttsPrompt ?? ILLUSTRATED_CARD_CUSTOM_PROMPTS[card.id];
      const model = useFlash ? GEMINI_FLASH_MODEL : GEMINI_MODEL;
      const prompt = customPrompt ?? (useFlash || useProWordPrompt ? GEMINI_WORD_PROMPT : GEMINI_PROMPT);
            jobs.push({
        category: 'words',
        filename: `${card.id}.mp3`,
        text: clean(joined),
        voice: FEMALE_VOICE,
        model,
        prompt,
      });
    }
  }
  return jobs;
}

/**
 * Image labeling: `words/{image.id}.mp3` unless `displayType === 'flags'` — then
 * `words/{exerciseId}-flag-{image.id}.mp3` (country name / correctLabel only; Flash; no collision with НОВИ ДУМИ).
 * For non-flags, skip ids already covered by illustrated_cards; those use `words/{id}.mp3` from card jobs.
 */
/** reading_text — optional `images[].ttsWordId` + `label` for flip-card word clips (`words/{ttsWordId}.mp3`). */
function collectReadingTextImageWordJobs(exercises: Exercise[]): TtsJob[] {
  const jobs: TtsJob[] = [];
  for (const ex of exercises.filter(e => e.type === 'reading_text' && e.images)) {
    for (const img of ex.images!) {
      const raw = img as {
        label?: string;
        ttsWordId?: string;
        ttsModel?: 'flash' | 'pro';
        ttsPrompt?: string;
      };
      const id = raw.ttsWordId?.trim();
      const label = raw.label?.trim();
      if (!id || !label) continue;
      // Content-level overrides have priority; fall back to hardcoded A1 sets for backward compat.
      const useProStress = raw.ttsModel ? raw.ttsModel === 'pro' : READING_TEXT_IMAGE_STRESS_IDS.has(id);
      const fallbackPrompt =
        useProStress && READING_TEXT_IMAGE_STRESS_PROMPT_BY_ID[id]
          ? READING_TEXT_IMAGE_STRESS_PROMPT_BY_ID[id]
          : GEMINI_BG_WORD_STRESS_PROMPT;
      jobs.push({
        category: 'words',
        filename: `${id}.mp3`,
        text: clean(label),
        voice: FEMALE_VOICE,
        model: useProStress ? GEMINI_MODEL : GEMINI_FLASH_MODEL,
        prompt: raw.ttsPrompt ?? (useProStress ? fallbackPrompt : GEMINI_WORD_PROMPT),
      });
    }
  }
  return jobs;
}

function collectImageLabelingJobs(exercises: Exercise[]): TtsJob[] {
  const illustratedIds = new Set<string>();
  for (const ex of exercises.filter(e => e.type === 'illustrated_cards' && e.cards)) {
    for (const c of ex.cards!) illustratedIds.add(c.id);
  }
  const jobs: TtsJob[] = [];
  for (const ex of exercises.filter(e => (e.type === 'image_labeling' || e.type === 'a2-image-labeling') && e.images)) {
    const isFlags = ex.displayType === 'flags';
    for (const img of ex.images!) {
      // Flag exercises use a dedicated filename so TTS is only correctLabel (country name),
      // not words/{id}.mp3 from НОВИ ДУМИ (e.g. country + demonyms when ttsIncludeSublabels is true).
      if (isFlags) {
        jobs.push({
          category: 'words',
          filename: `${ex.id}-flag-${img.id}.mp3`,
          text: clean(img.correctLabel),
          voice: FEMALE_VOICE,
          model: GEMINI_FLASH_MODEL,
          prompt: GEMINI_WORD_PROMPT,
        });
        continue;
      }
      if (illustratedIds.has(img.id)) continue;
      jobs.push({
        category: 'words',
        filename: `${img.id}.mp3`,
        text: clean(img.correctLabel),
        voice: FEMALE_VOICE,
        model: GEMINI_FLASH_MODEL,
        prompt: GEMINI_WORD_PROMPT,
      });
    }
  }
  return jobs;
}

/** grammar_visual — one MP3 per pronoun tile. If `description` is set, speak question + answer (Pro); else isolated pronoun (Flash). */
function collectGrammarVisualJobs(exercises: Exercise[]): TtsJob[] {
  const jobs: TtsJob[] = [];
  for (const ex of exercises.filter(e => e.type === 'grammar_visual' && e.pronouns)) {
    for (let i = 0; i < ex.pronouns!.length; i++) {
      const tile = ex.pronouns![i];
      const desc = tile.description?.trim();
      const parts = desc ? [tile.pronoun, desc] : [tile.pronoun];
      const fullText = parts.join(' ');
      const usePro = !!desc;
      jobs.push({
        category: 'grammar',
        filename: `${ex.id}-pronoun-${i}.mp3`,
        text: clean(fullText),
        voice: FEMALE_VOICE,
        model: usePro ? GEMINI_MODEL : GEMINI_FLASH_MODEL,
        prompt: usePro ? GEMINI_PROMPT : GEMINI_WORD_PROMPT,
      });
    }
  }
  return jobs;
}

function collectWideCardJobs(exercises: Exercise[]): TtsJob[] {
  const jobs: TtsJob[] = [];
  for (const ex of exercises.filter(e => e.type === 'a2-wide-cards' && e.cards)) {
    for (const card of ex.cards!) {
      const text = (card as { ttsLabel?: string; label: string }).ttsLabel ?? card.label;
      jobs.push({
        category: 'words',
        filename: `${card.id}.mp3`,
        text: clean(text),
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
  for (const ex of exercises.filter(e => (e.type === 'dialogues' || e.type === 'a2-dialogues') && e.sections)) {
    for (const section of ex.sections!) {
      const maleTurn = { n: 0 };
      const femaleTurn = { n: 0 };
      const prevGender = { g: null as 'male' | 'female' | null };
      for (let i = 0; i < section.lines.length; i++) {
        const line = section.lines[i];
        // Use ttsText override when set (e.g. to expand abbreviations); display text stays unchanged
        const rawText = (line.ttsText ?? line.text).replace(/^—\s*/, '');
        jobs.push({
          category: 'dialogues',
          filename: `${ex.id}-${section.id}-line-${i}.mp3`,
          text: clean(rawText),
          voice: dialogueLineVoice(line, i, maleTurn, femaleTurn, prevGender),
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
      // Content-level overrides have priority; fall back to hardcoded A1 sets for backward compat.
      const useProForRow = row.ttsModel ? row.ttsModel === 'pro' : GRAMMAR_TABLE_PRO_ROWS.has(rowKey);
      const rowSource = row.ttsText ?? GRAMMAR_TABLE_ROW_TTS_TEXT[rowKey] ?? parts.join('. ');
      jobs.push({
        category: 'grammar',
        filename: `${rowKey}.mp3`,
        text: clean(rowSource),
        voice: FEMALE_VOICE,
        model: useProForRow ? GEMINI_MODEL : GEMINI_FLASH_MODEL,
        prompt: row.ttsPrompt ?? (useProForRow ? GEMINI_PROMPT : GEMINI_WORD_PROMPT),
      });
    }
    if (ex.notes) {
      ex.notes.forEach((note, ni) => {
        const noteKey = `${ex.id}-note-${ni}`;
        const noteModel = ex.ttsNoteModels?.[ni];
        const useProForNote = noteModel ? noteModel === 'pro' : GRAMMAR_TABLE_PRO_NOTES.has(noteKey);
        const ttsText = ex.ttsNotes?.[ni] ?? note;
        jobs.push({
          category: 'grammar',
          filename: `${noteKey}.mp3`,
          text: clean(ttsText),
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
  for (const ex of exercises.filter(e => (e.type === 'grammar_examples' || e.type === 'a2-grammar-examples') && !e.disableTts && e.examples)) {
    const useFlash = !!ex.ttsFlash;
    for (let i = 0; i < ex.examples!.length; i++) {
      const card = ex.examples![i];
      let parts: string;
      if (card.ttsText) {
        // Use explicit TTS-only text (e.g. full word without abbreviation)
        parts = card.ttsText;
      } else if (card.lines) {
        // Strip speaker labels, ✓/✗ markers, skip blank spacer lines
        parts = card.lines
          .filter(l => l.trim() !== '')
          .map(l => l.replace(/^\s*\S+:\s+/, '').replace(/^\s*[✓✗]\s*/, ''))
          .join(' ');
      } else {
        const cleanedSubtext = card.subtext ? stripGrammarLabels(card.subtext) : '';
        parts = [card.text, cleanedSubtext].filter(Boolean).join(' ');
      }
      const voice = card.voiceGender === 'male' ? MALE_VOICE : FEMALE_VOICE;
      jobs.push({
        category: 'grammar',
        filename: `${ex.id}-card-${i}.mp3`,
        text: clean(parts),
        voice,
        model: useFlash ? GEMINI_FLASH_MODEL : GEMINI_MODEL,
        prompt: card.ttsPrompt ?? (useFlash ? GEMINI_WORD_PROMPT : GEMINI_PROMPT),
      });
    }
  }
  return jobs;
}

function collectTableFillParagraphJobs(exercises: Exercise[]): TtsJob[] {
  const jobs: TtsJob[] = [];
  for (const ex of exercises.filter(e => e.type === 'table_fill')) {
    const paras = (ex as Exercise & { paragraphs?: { text: string }[] }).paragraphs;
    if (!paras?.length) continue;
    const genders = (ex as Exercise).paragraphVoiceGenders;
    for (let i = 0; i < paras.length; i++) {
      const t = paras[i].text?.trim();
      if (!t) continue;
      const voice = genders?.[i] === 'male' ? MALE_VOICE : FEMALE_VOICE;
      jobs.push({
        category: 'texts',
        filename: `${ex.id}-p-${i}.mp3`,
        text: clean(t),
        voice,
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
    const paragraphs = ex.paragraphs as string[];
    // Use ttsParagraphs for audio when provided (display text stays unchanged)
    const ttsParagraphs = ex.ttsParagraphs && ex.ttsParagraphs.length === paragraphs.length
      ? ex.ttsParagraphs
      : paragraphs;
    const perPara = ex.paragraphVoiceGenders;
    const defaultVoice = ex.voiceGender === 'male' ? MALE_VOICE : FEMALE_VOICE;
    const usePerPara = perPara && perPara.length === paragraphs.length;
    const readingPrompt = READING_TEXT_CUSTOM_PROMPTS[ex.id]
      ?? (READING_TEXT_CALM_PROMPT_IDS.has(ex.id) ? GEMINI_BG_CALM_PROMPT : GEMINI_PROMPT);
    for (let i = 0; i < paragraphs.length; i++) {
      if (!ttsParagraphs[i].trim()) continue;
      const voice = usePerPara
        ? (perPara![i] === 'male' ? MALE_VOICE : FEMALE_VOICE)
        : defaultVoice;
      jobs.push({ category: 'texts', filename: `${ex.id}-p-${i}.mp3`, text: clean(ttsParagraphs[i]), voice, model: GEMINI_MODEL, prompt: readingPrompt });
    }
    // No `-full.mp3` when per-paragraph voices are set (mixed or explicit) or ttsParagraphs is used; UI uses sequential listen instead
    const skipFull = SKIP_FULL_TEXT.has(ex.id) || !!usePerPara || !!ex.ttsParagraphs;
    if (!skipFull) {
      const voice = defaultVoice;
      const titlePrefix = ex.textTitle ? `${clean(ex.textTitle)}.\n` : '';
      const fullText = clean(titlePrefix + paragraphs.join('\n'));
      if (paragraphs.length > 0 && fullText.length < 2000) {
        jobs.push({ category: 'texts', filename: `${ex.id}-full.mp3`, text: fullText, voice, model: GEMINI_MODEL, prompt: readingPrompt });
      }
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

  // Resolve which level (a1/a2/b1/b2) hosts the requested folder. The script
  // accepts the bare folder name (e.g. `lesson-04` / `test-lessons-4`); we
  // search every level for a matching folder under `lessons/` or `tests/`.
  function findLevelForFolder(kind: 'lessons' | 'tests', folder: string): string {
    const levels = ['a1', 'a2', 'b1', 'b2'];
    for (const lvl of levels) {
      const dir = path.join(PROJECT_ROOT, 'src', 'content', lvl, kind, folder);
      if (fs.existsSync(dir)) return lvl;
    }
    throw new Error(
      `Could not find ${kind}/${folder} under any of src/content/{${levels.join(',')}}/`,
    );
  }

  if (IS_TEST) {
    const lvl = findLevelForFolder('tests', CONTENT_ID);
    const metaModule = await import(`../src/content/${lvl}/tests/${CONTENT_ID}/metadata`);
    const testModule = await import(`../src/content/${lvl}/tests/${CONTENT_ID}/exercises`);
    exercises = testModule.exercises as Exercise[];
    OUTPUT_BASE = path.join(PROJECT_ROOT, 'public', 'assets', metaModule.metadata.id, 'audio', 'tts');
  } else {
    const lvl = findLevelForFolder('lessons', CONTENT_ID);
    const contentModule = await import(`../src/content/${lvl}/lessons/${CONTENT_ID}/content`);
    const exercisesModule = await import(`../src/content/${lvl}/lessons/${CONTENT_ID}/exercises`);
    content = contentModule.content as LessonContent;
    exercises = exercisesModule.exercises as Exercise[];
    OUTPUT_BASE = path.join(PROJECT_ROOT, 'public', 'assets', CONTENT_ID, 'audio', 'tts');
  }

  const jobs: TtsJob[] = [
    ...(content ? collectVocabularyJobs(content) : []),
    ...collectIllustratedCardJobs(exercises),
    ...collectWideCardJobs(exercises),
    ...collectReadingTextImageWordJobs(exercises),
    ...collectImageLabelingJobs(exercises),
    ...collectDialogueJobs(exercises),
    ...collectGrammarVisualJobs(exercises),
    ...collectGrammarTableJobs(exercises),
    ...collectGrammarExampleJobs(exercises),
    ...collectReadingTextJobs(exercises),
    ...collectTableFillParagraphJobs(exercises),
    ...collectListeningJobs(exercises),
    ...collectPersonalChoiceJobs(exercises),
  ];

  // Deduplicate: if two jobs target the same output file, the later one wins.
  // This ensures image_labeling "България, София" overrides vocabulary "България"
  // for ids shared between vocabulary and image_labeling exercises.
  const jobMap = new Map<string, TtsJob>();
  for (const job of jobs) jobMap.set(`${job.category}/${job.filename}`, job);
  const uniqueJobs = [...jobMap.values()];

  console.log(`Total jobs: ${uniqueJobs.length}\n`);

  const categories = [...new Set(uniqueJobs.map(j => j.category))];
  for (const cat of categories) {
    ensureDir(path.join(OUTPUT_BASE, cat));
  }

  let generated = 0;
  let skipped = 0;
  let failed = 0;
  let totalChars = 0;

  for (let i = 0; i < uniqueJobs.length; i++) {
    const job = uniqueJobs[i];
    const outPath = path.join(OUTPUT_BASE, job.category, job.filename);

    if (fs.existsSync(outPath)) {
      skipped++;
      continue;
    }

    const progress = `[${i + 1}/${uniqueJobs.length}]`;
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

/**
 * Build-time pre-translation for А1 (Фаза 4Б, docs/A1-feedback-implementation-plan.md §9).
 *
 * Walks every A1 lesson + test through `src/content/registry.ts`, collects every
 * Bulgarian string that the app currently sends to `useTranslate()` live (see the
 * component audit below), and asks GPT-5.5 to translate each one into all 6 target
 * languages (en, ar, fr, fa, uk, ru) — ONCE, with full lesson context and a shared
 * grammar glossary, instead of isolated live Google Translate calls per sentence.
 *
 * Output: `src/i18n/generated/translations.json` — a flat map
 *   { "<exact Bulgarian source string>": { en, ar, fr, fa, uk, ru } }
 * consumed by `src/i18n/useTranslate.ts` as a layer BELOW `TRANSLATION_OVERRIDES`
 * and ABOVE the live-GT emergency fallback.
 *
 * ── Field coverage (component audit — useTranslate() call sites) ──────────────
 *   ExerciseRenderer.tsx   → exercise.title (custom label, number stripped),
 *                            exercise.instruction (only when no instructionKey),
 *                            exercise.subtitle
 *   GrammarHighlight.tsx   → grammarHighlight.text (only when no textKey)
 *   GrammarTable.tsx       → tableTitle, columns[], notes[],
 *                            rows[].pronoun / rows[].cells[] (only rows WITHOUT
 *                            a pre-filled `pronunciations` map)
 *   TableFill.tsx          → tables[].name, tables[].columns[], paragraphs[].text
 *   MultipleChoice.tsx     → questions[].options[] (emoji/parenthetical stripped,
 *                            same transform the component applies at render time)
 *   GrammarWithExamples.tsx→ examples[].text / .subtext / .label / .lines[]
 *                            (lines cleaned of **bold** + leading ✓/✗ marker,
 *                            matching the component's own transform)
 *   GrammarVisual.tsx      → pronouns[].pronoun, pronouns[].description
 *   Dialogues.tsx          → sections[].lines[].text
 *   ReadingText.tsx        → textTitle, paragraphs[], images[].label,
 *                            checklist.instruction
 *   IllustratedCards.tsx   → cards[].label, cards[].sublabels[], headerCaption
 *   PersonalChoice.tsx     → model.question / .positiveAnswer / .negativeAnswer,
 *                            items[].question
 *   CultureSection.tsx     → culturalNotes[].title / .content (only when they are
 *                            plain strings, not already-pre-filled per-lang Records)
 *   LessonHeaderClient.tsx → lesson.title, lesson.description, grammarTopics[]
 *   LessonIntroText.tsx    → content.introduction
 *   VocabularyDrawer.tsx   → content.vocabulary[].bulgarian
 *   TestScoreSummary /
 *   TestPageClient.tsx     → test.title, test.introText, section.name,
 *                            section.instructions
 *
 * Excluded on purpose: exercise `sentences`/`correctAnswers`/`options` used for
 * SCORING (never translated — project rule), anything already covered by
 * `instructionKey` (ui.ts) or `TRANSLATION_OVERRIDES` (full 6-language coverage),
 * and dynamic template strings built at render time with interpolated numbers
 * (e.g. "Максимум: N точки") — those stay on the live-GT emergency layer.
 *
 * Usage:
 *   npm run pretranslate -- --glossary-only                # Step 0 only, all lessons
 *   npm run pretranslate -- --lesson 05                     # pilot: single lesson (A1)
 *   npm run pretranslate -- --level a2 --lesson 05          # pilot: single lesson (A2)
 *   npm run pretranslate -- --test 3                        # pilot: single test (test-a1-3)
 *   npm run pretranslate -- --level a2 --all                # full A2 run
 *   npm run pretranslate -- --level a2 --all --dry-run      # preview scope/cost, no API calls
 *   npm run pretranslate -- --lesson 05 --force             # re-translate even if cached
 *
 * `--level` defaults to `a1` (backward-compatible). Accepted values: a1, a2, b1, b2.
 */

import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';
import { loadLesson, loadTest } from '@/content/registry';
import { A1_LESSONS_METADATA, A1_TEST_LOADERS } from '@/content/a1';
import { A2_LESSONS_METADATA, A2_TEST_LOADERS } from '@/content/a2';
import { B1_LESSONS_METADATA, B1_TEST_LOADERS } from '@/content/b1';
import { B2_LESSONS_METADATA, B2_TEST_LOADERS } from '@/content/b2';
import { TRANSLATION_OVERRIDES } from '@/i18n/translationOverrides';
import { getModelCost } from '@/lib/chat/availableModels';
import { extractLesson, extractTest, type ExtractedUnit } from './lib/translation-fields';

// ---------------------------------------------------------------------------
// Level selection — generic across A1/A2/B1/B2. All four level registries
// (`src/content/<level>/index.ts`) share the same shape:
// `<LEVEL>_LESSONS_METADATA` + `<LEVEL>_TEST_LOADERS`.
// ---------------------------------------------------------------------------
type Level = 'a1' | 'a2' | 'b1' | 'b2';
const VALID_LEVELS: readonly Level[] = ['a1', 'a2', 'b1', 'b2'];

type LessonMeta = { id: string; number: number; title: string; hasTest: boolean; testId?: string };

const LEVEL_LESSONS_METADATA: Record<Level, LessonMeta[]> = {
  a1: A1_LESSONS_METADATA,
  a2: A2_LESSONS_METADATA,
  b1: B1_LESSONS_METADATA,
  b2: B2_LESSONS_METADATA,
};

const LEVEL_TEST_LOADERS: Record<Level, Record<string, unknown>> = {
  a1: A1_TEST_LOADERS,
  a2: A2_TEST_LOADERS,
  b1: B1_TEST_LOADERS,
  b2: B2_TEST_LOADERS,
};

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const MODEL = 'gpt-5.5';
const TARGET_LANGS = ['en', 'ar', 'fr', 'fa', 'uk', 'ru'] as const;
type TargetLang = (typeof TARGET_LANGS)[number];

const OUTPUT_PATH = path.resolve(__dirname, '../src/i18n/generated/translations.json');
const CHUNK_SIZE = 40; // strings per API call (keeps prompts + JSON responses manageable)
const GLOSSARY_CHUNK_SIZE = 60;

type TranslationEntry = Partial<Record<TargetLang, string>>;
type TranslationMap = Record<string, TranslationEntry>;

// ---------------------------------------------------------------------------
// CLI args
// ---------------------------------------------------------------------------
function parseArg(name: string): string | undefined {
  const flag = process.argv.find((a) => a === `--${name}` || a.startsWith(`--${name}=`));
  if (!flag) return undefined;
  if (flag.includes('=')) return flag.split('=')[1];
  const idx = process.argv.indexOf(flag);
  const next = process.argv[idx + 1];
  return next && !next.startsWith('--') ? next : 'true';
}

const levelArgRaw = parseArg('level');
if (levelArgRaw && !VALID_LEVELS.includes(levelArgRaw as Level)) {
  console.error(`Invalid --level "${levelArgRaw}". Accepted values: ${VALID_LEVELS.join(', ')}.`);
  process.exit(1);
}
const level: Level = (levelArgRaw as Level | undefined) ?? 'a1'; // default a1 — backward-compatible

const lessonArg = parseArg('lesson');
const testArg = parseArg('test');
const runAll = parseArg('all') === 'true';
const glossaryOnly = parseArg('glossary-only') === 'true';
const dryRun = parseArg('dry-run') === 'true';
const force = parseArg('force') === 'true';

if (!lessonArg && !testArg && !runAll && !glossaryOnly) {
  console.error('Usage: npm run pretranslate -- [--level a1|a2|b1|b2] --lesson 05 | --test 3 | --all | --glossary-only [--dry-run] [--force]');
  process.exit(1);
}

// ---------------------------------------------------------------------------
// OpenAI client (skipped entirely in --dry-run)
// ---------------------------------------------------------------------------
const client = dryRun ? null : new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

let totalPromptTokens = 0;
let totalCompletionTokens = 0;


// ---------------------------------------------------------------------------
// Overrides / output-cache lookups
// ---------------------------------------------------------------------------
/** True when TRANSLATION_OVERRIDES already covers ALL 6 target languages for this string. */
function fullyCoveredByOverrides(text: string): boolean {
  const entry = TRANSLATION_OVERRIDES[text];
  if (!entry) return false;
  return TARGET_LANGS.every((lang) => !!entry[lang]);
}

function loadExistingOutput(): TranslationMap {
  try {
    const raw = fs.readFileSync(OUTPUT_PATH, 'utf8');
    return JSON.parse(raw) as TranslationMap;
  } catch {
    return {};
  }
}

function saveOutput(data: TranslationMap) {
  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  const sorted: TranslationMap = {};
  for (const key of Object.keys(data).sort()) sorted[key] = data[key];
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(sorted, null, 2) + '\n', 'utf8');
}

// ---------------------------------------------------------------------------
// OpenAI call
// ---------------------------------------------------------------------------
const LEVEL_LABEL: Record<Level, string> = { a1: 'A1', a2: 'A2', b1: 'B1', b2: 'B2' };

/** A2/B1/B2 rules: clean translations (client feedback round 2 on B1, 29.09.2026). */
const ADVANCED_RULES = `- Превеждай ЧИСТО и естествено. НЕ повтаряй българската дума до превода във формат „дума (превод)" и не оставяй български думи в превода — само чист превод на езика-цел. Единствено когато клетката е САМО окончание/наставка (напр. „-ах", „-ях"), запиши я като „-ах (ending)" на езика-цел.
- ИЗКЛЮЧЕНИЕ: когато текстът говори ЗА българска дума/форма/конструкция (в кавички, напр. конструкциите „Трябва ми" и „Харесва ми", глаголи с „се", „ти" или „Вие", думата „зимнина", поздравът „Здравейте"), остави я НА КИРИЛИЦА в кавички и добави кратък превод в скоби: “Трябва ми” (I need). НИКОГА не я транслитерирай с латиница или арабска писменост („Tryabva mi", „Vie", „زدرافي" са грешни). Транслитерират се само имена на хора, места и заведения.
- НЕ използвай markdown (**удебеляване**) в превода — върни обикновен текст.
- Запази точно времето, вида и лицето на глагола от оригинала (минало свършено/несвършено, бъдеще, повелително, 1/2/3 лице, ед./мн.ч.). Не превеждай „беше/бях/бяха" като сегашно време. Използвай естествени форми на езика-цел (напр. на английски: past simple / past continuous / used to / present perfect според смисъла).
- Единни термини: „обичам" → love (не like); „говоря" → speak, „разговарям/приказвам" → talk; взаимно „си/се" (помагаме си) → each other; „той" → he; „те" → they. Не превеждай „участие/причастие" с други граматични термини.
- „ДАБ" (Държавна агенция за бежанците): на en/fr/ar/fa пиши съкращението „SAR" (State Agency for Refugees и т.н.), а на uk/ru остави „ДАБ". Когато низът е бележка/обяснение и споменава агенцията за пръв път, добави пълното име на езика-цел и „(SAR; in Bulgarian: ДАБ)" на съответния език.
- Ако низът е граматичен термин/клетка/кратка фраза без контекст — преведи го по най-вероятния смисъл в граматиката на български език, не буквално дума по дума.`;

const A1_RULES = `- Единствено в граматичните таблици/примери, където конкретна българска дума/окончание е предмет на урока (напр. клетка с „пазар, студент" в таблица за членуване), запази българската дума в оригинал и добави превод/пояснение до нея — тук НЕ се транслитерира, а се обяснява.
- Пази markdown **удебеляване** точно около съответната дума/окончание в превода (не го премахвай, не го местиш).
- Когато текстът говори ЗА българска дума/поздрав/конструкция в кавички (напр. „ти" или „Вие", „Здравейте"), остави я НА КИРИЛИЦА и добави превод в скоби — НИКОГА не я транслитерирай с латиница или арабска писменост.`;

function buildSystemPrompt(lvl: Level): string {
  return `Ти си професионален преводач, локализиращ „Български език за бежанци ${LEVEL_LABEL[lvl]}" — интерактивен курс по български език за възрастни бежанци (проект на ВКБООН/UNHCR).

Задача: преведи всеки подаден български низ на ВСИЧКИТЕ 6 езика: en, ar, fr, fa, uk, ru.

Правила:
- Имена на хора и населени места (в диалози, разкази, примерни изречения) — ТРАНСЛИТЕРИРАЙ ги на съответната писменост/език (напр. „Виталий" → „Vitaliy", „Бургас" → „Burgas", „Пловдив" → „Plovdiv"), никога не ги оставяй на кирилица в превод, чиято останала част е на друга писменост.
${lvl === 'a1' ? A1_RULES : ADVANCED_RULES}
- Тон: неутрален, учтив, подходящ за възрастен обучаем на ниво ${LEVEL_LABEL[lvl]} — кратко и ясно, без сложни конструкции.
- Речник (glossary) с граматична терминология — ако даден низ или част от него присъства в речника, ползвай ТОЧНО подадения превод, никога не измисляй алтернативен превод на речникови термини.
- Контекстът от урока/теста е само за ориентация — превеждай единствено низовете, поискани в "stringsToTranslate", не превеждай нищо извън тях.
- Отговори САМО с валиден JSON obekt във формат: { "<точния low на български>": { "en": "...", "ar": "...", "fr": "...", "fa": "...", "uk": "...", "ru": "..." }, ... } — по един запис на всеки подаден низ, ключът трябва да е ТОЧНО същия текст като в "stringsToTranslate".`;
}

const SYSTEM_PROMPT = buildSystemPrompt(level);

async function translateBatch(
  strings: string[],
  opts: { outline?: string; glossary?: TranslationMap; isGlossaryPass?: boolean },
): Promise<TranslationMap> {
  if (!client) return {}; // dry-run
  if (strings.length === 0) return {};

  const userPayload = {
    ...(opts.isGlossaryPass
      ? { note: 'Това са повтарящи се граматични термини от таблиците в целия учебник — преведи ги консистентно, все едно градиш терминологичен речник.' }
      : {}),
    glossary: opts.glossary && Object.keys(opts.glossary).length > 0 ? opts.glossary : undefined,
    lessonContext: opts.outline,
    stringsToTranslate: strings,
  };

  const res = await client.chat.completions.create({
    model: MODEL,
    // GPT-5.5 only supports the default temperature (1) — no custom sampling knobs.
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: JSON.stringify(userPayload) },
    ],
  });

  if (res.usage) {
    totalPromptTokens += res.usage.prompt_tokens ?? 0;
    totalCompletionTokens += res.usage.completion_tokens ?? 0;
  }

  const raw = res.choices[0]?.message?.content ?? '{}';
  let parsed: Record<string, Partial<Record<TargetLang, string>>>;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    console.error('  ⚠ Failed to parse model JSON response — skipping this batch.', err);
    return {};
  }

  const result: TranslationMap = {};
  for (const src of strings) {
    const entry = parsed[src];
    if (!entry) {
      console.warn(`  ⚠ Model did not return a translation for: "${src.slice(0, 60)}${src.length > 60 ? '…' : ''}"`);
      continue;
    }
    result[src] = entry;
  }
  return result;
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

// ---------------------------------------------------------------------------
// Step 0 — Glossary pass (grammar terminology, consistent across all lessons)
// ---------------------------------------------------------------------------
async function buildGlossary(output: TranslationMap): Promise<TranslationMap> {
  const levelMeta = LEVEL_LESSONS_METADATA[level];
  console.log(`\n── Step 0: Glossary extraction (grammar terminology, all ${levelMeta.length} ${level.toUpperCase()} lessons) ──`);

  const glossarySeen = new Set<string>();
  const glossaryAll: string[] = [];
  for (const meta of levelMeta) {
    const lesson = await loadLesson(meta.id);
    if (!lesson) continue;
    const unit = extractLesson(meta.id, lesson);
    for (const text of unit.glossaryTexts) {
      if (glossarySeen.has(text)) continue;
      glossarySeen.add(text);
      glossaryAll.push(text);
    }
  }

  const alreadyResolved = glossaryAll.filter(
    (text) => fullyCoveredByOverrides(text) || (!force && output[text]),
  );
  const pending = glossaryAll.filter((text) => !alreadyResolved.includes(text));

  console.log(`  Уникални граматични термини: ${glossaryAll.length} (вече покрити: ${alreadyResolved.length}, за превод: ${pending.length})`);

  if (dryRun) {
    console.log(`  [dry-run] Ще преведе ${pending.length} термина — пропуска реалните API повиквания.`);
  } else if (pending.length > 0) {
    for (const batch of chunk(pending, GLOSSARY_CHUNK_SIZE)) {
      console.log(`  → превод на партида от ${batch.length} термина…`);
      const translated = await translateBatch(batch, { isGlossaryPass: true });
      Object.assign(output, translated);
      saveOutput(output); // incremental save — safe against interruption
    }
  }

  // Build the in-memory glossary reference (overrides ∪ output) for Step 1 context.
  const glossaryMap: TranslationMap = {};
  for (const text of glossaryAll) {
    const overrideEntry = TRANSLATION_OVERRIDES[text];
    const outputEntry = output[text];
    const merged: TranslationEntry = { ...outputEntry, ...overrideEntry };
    if (Object.keys(merged).length > 0) glossaryMap[text] = merged;
  }
  return glossaryMap;
}

// ---------------------------------------------------------------------------
// Step 1 — Per-unit translation (context-aware, whole lesson/test at a time)
// ---------------------------------------------------------------------------
async function processUnit(unit: ExtractedUnit, output: TranslationMap, glossary: TranslationMap) {
  const pending = unit.allTexts.filter((text) => !fullyCoveredByOverrides(text) && (force || !output[text]));

  console.log(`\n── ${unit.id} — ${unit.allTexts.length} низа общо, ${pending.length} за превод ──`);

  if (pending.length === 0) {
    console.log('  (нищо ново — вече покрито)');
    return;
  }

  if (dryRun) {
    console.log(`  [dry-run] Ще преведе ${pending.length} низа с ${unit.allTexts.length}-редов контекст.`);
    return;
  }

  // Only pass the glossary entries that actually appear in THIS unit (not the
  // whole 500+ term corpus) — keeps prompts small while still giving the model
  // the exact reference translations it needs for consistency in this lesson/test.
  const localGlossary: TranslationMap = {};
  for (const term of unit.glossaryTexts) {
    if (glossary[term]) localGlossary[term] = glossary[term];
  }

  for (const batch of chunk(pending, CHUNK_SIZE)) {
    console.log(`  → партида от ${batch.length} низа…`);
    const translated = await translateBatch(batch, { outline: unit.outline, glossary: localGlossary });
    Object.assign(output, translated);
    saveOutput(output); // incremental save after every batch
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  if (!dryRun && !process.env.OPENAI_API_KEY) {
    console.error('OPENAI_API_KEY is not set (expected in .env.local). Run via `npm run pretranslate -- ...`.');
    process.exit(1);
  }

  const output = loadExistingOutput();
  console.log(`Зареден кеш: ${Object.keys(output).length} вече преведени низа.`);

  const glossary = await buildGlossary(output);

  if (glossaryOnly) {
    saveOutput(output);
    printSummary();
    return;
  }

  const units: ExtractedUnit[] = [];

  if (runAll) {
    for (const meta of LEVEL_LESSONS_METADATA[level]) {
      const lesson = await loadLesson(meta.id);
      if (lesson) units.push(extractLesson(meta.id, lesson));
    }
    const testCount = Object.keys(LEVEL_TEST_LOADERS[level]).length;
    for (let n = 1; n <= testCount; n++) {
      const testId = `test-${level}-${n}`;
      const test = await loadTest(testId);
      if (test) units.push(extractTest(testId, test));
    }
  } else if (lessonArg) {
    // If the arg already contains `lesson-` (e.g. `a2-lesson-03`, or a
    // full A1 id like `lesson-05`), don't slap a second level prefix on it.
    const lessonId = lessonArg.includes('lesson-')
      ? lessonArg
      : level === 'a1'
        ? `lesson-${lessonArg.padStart(2, '0')}`
        : `${level}-lesson-${lessonArg.padStart(2, '0')}`;
    const lesson = await loadLesson(lessonId);
    if (!lesson) {
      console.error(`Lesson not found: ${lessonId}`);
      process.exit(1);
    }
    units.push(extractLesson(lessonId, lesson));
  } else if (testArg) {
    const testId = testArg.startsWith('test-') ? testArg : `test-${level}-${testArg}`;
    const test = await loadTest(testId);
    if (!test) {
      console.error(`Test not found: ${testId}`);
      process.exit(1);
    }
    units.push(extractTest(testId, test));
  }

  for (const unit of units) {
    await processUnit(unit, output, glossary);
  }

  saveOutput(output);
  printSummary();
}

function printSummary() {
  const { inputPer1M, outputPer1M } = getModelCost(MODEL);
  const costUsd = (totalPromptTokens * inputPer1M + totalCompletionTokens * outputPer1M) / 1_000_000;
  console.log('\n── Готово ──');
  console.log(`Модел: ${MODEL}`);
  console.log(`Токени: ${totalPromptTokens} вход + ${totalCompletionTokens} изход`);
  console.log(`Реален разход: $${costUsd.toFixed(4)}`);
  console.log(`Изходен файл: ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

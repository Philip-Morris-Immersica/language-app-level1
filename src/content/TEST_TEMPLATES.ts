/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║  TEST TEMPLATES — Copy-paste starters for new tests                        ║
 * ║                                                                             ║
 * ║  How to use:                                                                ║
 * ║  1. Create folder:  src/content/tests/test-lessons-X-Y/                     ║
 * ║  2. Copy relevant sections below into metadata.ts, exercises.ts, index.ts   ║
 * ║  3. Replace all "// REPLACE" comments with real content                     ║
 * ║  4. Copy images to public/assets/test-a1-N/                                 ║
 * ║  5. Register in src/content/index.ts (testFolderMap + navItems)             ║
 * ║                                                                             ║
 * ║  Rules:                                                                     ║
 * ║  • See .cursor/rules/content-tests.mdc for full conventions                 ║
 * ║  • Tests have only 3 files: metadata.ts, exercises.ts, index.ts             ║
 * ║  • No content.ts or workbook.ts — all exercises live in exercises.ts        ║
 * ║  • 4 sections: СЛУШАНЕ → ЧЕТЕНЕ → ГРАМАТИКА → ПИСАНЕ                        ║
 * ║  • ГОВОРЕНЕ is excluded from digital tests                                  ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

// ─────────────────────────────────────────────────────────────────────────────
// ██  TEMPLATE 1 — metadata.ts
// ─────────────────────────────────────────────────────────────────────────────

export const TEMPLATE_METADATA = `
export const metadata = {
  id: 'test-a1-N',                                 // REPLACE: test-a1-1 … test-a1-6
  number: N,                                        // REPLACE: 1–6
  afterLesson: N,                                   // REPLACE: lesson number after which this test appears
  title: 'Тест – уроци X, Y и Z',                  // REPLACE: human-readable Bulgarian title
  totalPoints: 0,                                   // REPLACE: must equal sum of all section maxPoints
  introText: 'Това е тест върху материала от уроци X, Y и Z. В тях учихме ... . Тестът включва компоненти: слушане, четене, граматика и писане.',
  // REPLACE: 2–3 sentences — what the test covers, which lessons, what components
};
`;

// ─────────────────────────────────────────────────────────────────────────────
// ██  TEMPLATE 2 — index.ts
// ─────────────────────────────────────────────────────────────────────────────

export const TEMPLATE_INDEX = `
import type { TestData } from '@/content/types';
import { metadata } from './metadata';
import {
  listeningExercises,
  readingExercises,
  grammarExercises,
  writingExercises,
} from './exercises';

export const testData: TestData = {
  ...metadata,
  sections: [
    { id: 'listening', name: 'КОМПОНЕНТ СЛУШАНЕ',   maxPoints: 0,  exercises: listeningExercises },   // REPLACE maxPoints
    { id: 'reading',   name: 'КОМПОНЕНТ ЧЕТЕНЕ',    maxPoints: 0,  exercises: readingExercises },     // REPLACE maxPoints
    { id: 'grammar',   name: 'КОМПОНЕНТ ГРАМАТИКА', maxPoints: 0,  exercises: grammarExercises },     // REPLACE maxPoints
    { id: 'writing',   name: 'КОМПОНЕНТ ПИСАНЕ',    maxPoints: 0,  exercises: writingExercises },     // REPLACE maxPoints
  ],
};

export default testData;
`;

// ─────────────────────────────────────────────────────────────────────────────
// ██  TEMPLATE 3 — exercises.ts  (full skeleton)
// ─────────────────────────────────────────────────────────────────────────────

export const TEMPLATE_EXERCISES_HEADER = `
import type {
  Exercise,
  ReadingTextExercise,
  TrueFalseExercise,
  WorkbookFillBlankExercise,
  WordOrderExercise,
  MultipleChoiceExercise,
  SyllableBlocksExercise,
} from '@/content/types';
`;

// ─── 3a. СЛУШАНЕ: reading_text (hidden) + true_false ────────────────────────

export const TEMPLATE_LISTENING = `
// ═══════════════════════════════════════════════════════════════════════════════
// КОМПОНЕНТ СЛУШАНЕ (N т.)
// hideText: true → текстът НЕ се вижда, има Play бутон под всяка картинка.
//
// ВАРИАНТ А (с говорители и снимки):
//   images[] + paragraphs[] → всяка снимка получава собствен TTS бутон.
//   Индексите съответстват: paragraphs[i] → images[i].
//
// ВАРИАНТ Б (без снимки — диалог между неназовани говорители):
//   Пропуснете images[] изцяло; добавете целия текст в paragraphs[0].
//   Компонентът ще покаже един глобален TTS бутон.
// ═══════════════════════════════════════════════════════════════════════════════

export const listeningExercises: Exercise[] = [

  // ─── ВАРИАНТ А: Текст за слушане СЪС снимки на говорителите ─────────────
  {
    id: 't0N-sl-text',                              // REPLACE N = test number
    type: 'reading_text',
    title: 'КОМПОНЕНТ СЛУШАНЕ',
    instruction: 'Слушайте текста и отговорете на въпросите с ДА или НЕ.',
    order: 1,
    hideText: true,                                  // ← задължително за слушане
    images: [
      // REPLACE: една картинка за всеки говорител; paragraphs[i] се чете от бутон под images[i]
      { imageUrl: '/assets/test-a1-N/slushane/speaker1.jpg', label: 'Име — Страна' },
      { imageUrl: '/assets/test-a1-N/slushane/speaker2.jpg', label: 'Име — Страна' },
    ],
    paragraphs: [
      // REPLACE: текст за всеки говорител — съответства на images индексите
      'Здравейте, аз съм ... .',
      'Здравейте, аз съм ... .',
    ],
  } as ReadingTextExercise,

  // ─── ВАРИАНТ Б: Текст за слушане БЕЗ снимки (диалог / разказ) ────────────
  // {
  //   id: 't0N-sl-text',
  //   type: 'reading_text',
  //   title: 'КОМПОНЕНТ СЛУШАНЕ',
  //   instruction: 'Слушайте текста и отговорете на въпросите с ДА или НЕ.',
  //   order: 1,
  //   hideText: true,
  //   paragraphs: [
  //     'Целият текст за слушане е тук — един параграф, един TTS бутон.',
  //   ],
  // } as ReadingTextExercise,

  // ─── Вярно / Невярно ─────────────────────────────────────────────────────
  {
    id: 't0N-sl-tf',                                // REPLACE N
    type: 'true_false',
    instruction: 'Слушайте текста и отговорете на въпросите с ДА или НЕ.',
    order: 2,
    points: 8,                                       // REPLACE: брой изречения
    model: { text: 'Примерно изречение.', isTrue: true },  // REPLACE: модел/пример
    sentences: [
      // REPLACE: всяко изречение = 1 точка
      { id: 's1', text: 'Изречение 1.', isTrue: true },
      { id: 's2', text: 'Изречение 2.', isTrue: false },
      // ... добавете още
    ],
  } as TrueFalseExercise,
];
`;

// ─── 3b. ЧЕТЕНЕ: reading_text (no translate) + workbook_fill_blank (dropdown)

export const TEMPLATE_READING = `
// ═══════════════════════════════════════════════════════════════════════════════
// КОМПОНЕНТ ЧЕТЕНЕ (N т.)
// noTranslation: true → без превод, без click-to-speak.
// Всички workbook_fill_blank ЗАДЪЛЖИТЕЛНО имат options (падащо меню).
// ═══════════════════════════════════════════════════════════════════════════════

export const readingExercises: Exercise[] = [
  // ─── Текст за четене ──────────────────────────────────────────────────────
  {
    id: 't0N-ch-text',                              // REPLACE N
    type: 'reading_text',
    title: 'КОМПОНЕНТ ЧЕТЕНЕ',
    instruction: 'Прочетете текста и попълнете празните места.',
    order: 3,                                        // REPLACE: глобален order
    noTranslation: true,                             // ← задължително за четене
    images: [
      // REPLACE: снимки за текста (опционални)
      { imageUrl: '/assets/test-a1-N/chetene/image1.jpg', label: 'Описание' },
    ],
    paragraphs: [
      // REPLACE: текст за четене
      'Параграф 1 ... .',
      'Параграф 2 ... .',
    ],
  } as ReadingTextExercise,

  // ─── Попълване с падащо меню ──────────────────────────────────────────────
  {
    id: 't0N-ch-fill',                              // REPLACE N
    type: 'workbook_fill_blank',
    instruction: 'Прочетете текста и попълнете празните места.',
    order: 4,
    points: 11,                                      // REPLACE: брой празни места
    layout: 'single',
    sentences: [
      // Примерен ред (не се брои в точките):
      { text: 'Пример изречение.', blanks: [], correctAnswers: [], isExample: true },

      // REPLACE: реални изречения — ЗАДЪЛЖИТЕЛНО с options за падащо меню
      { text: 'Тя е от _______.', blanks: [3], correctAnswers: ['Алепо'], options: ['Алепо', 'Багдад', 'София', 'Дамаск'] },

      // За изречение с 2 празни места — options е масив от масиви:
      // { text: 'Той _______ X и _______.', blanks: [1, 5], correctAnswers: ['закусва', 'кафе'],
      //   options: [['закусва', 'обядва', 'вечеря'], ['кафе', 'чай', 'мляко']] },
    ],
  } as WorkbookFillBlankExercise,
];
`;

// ─── 3c. ГРАМАТИКА: fill_blank / word_order / multiple_choice ───────────────

export const TEMPLATE_GRAMMAR = `
// ═══════════════════════════════════════════════════════════════════════════════
// КОМПОНЕНТ ГРАМАТИКА (N т.)
// Всички workbook_fill_blank ЗАДЪЛЖИТЕЛНО имат options (падащо меню).
// ═══════════════════════════════════════════════════════════════════════════════

export const grammarExercises: Exercise[] = [

  // ─── Упражнение: Глагол „съм" (workbook_fill_blank с options) ─────────────
  {
    id: 't0N-gr-1',                                 // REPLACE N
    type: 'workbook_fill_blank',
    instruction: 'Поставете глагола „съм" в правилната форма.',
    order: 5,
    points: 8,                                       // REPLACE
    layout: 'two-column',
    sentences: [
      { text: 'Той е от Дамаск.', blanks: [], correctAnswers: [], isExample: true },
      // REPLACE: глагол „съм" — options винаги = ['съм', 'си', 'е', 'сме', 'сте', 'са']
      { text: 'Ние _______ от София.', blanks: [1], correctAnswers: ['сме'], options: ['съм', 'си', 'е', 'сме', 'сте', 'са'] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── Упражнение: Подредете думите (word_order) ────────────────────────────
  {
    id: 't0N-gr-2',
    type: 'word_order',
    instruction: 'Подредете думите в изречения.',
    order: 6,
    points: 15,                                      // REPLACE: 1 точка на изречение
    questions: [
      // REPLACE: words = разбъркани; correctSentence = правилен ред с интервали
      { words: ['е', 'тя', 'учителка', '?', 'ли'], correctSentence: 'Тя учителка ли е ?' },
    ],
  } as WordOrderExercise,

  // ─── Упражнение: Подчертайте правилната форма (multiple_choice) ────────────
  {
    id: 't0N-gr-3',
    type: 'multiple_choice',
    instruction: 'Подчертайте правилната форма.',
    order: 7,
    points: 12,                                      // REPLACE: 1 точка на въпрос
    questions: [
      // REPLACE: question = дума; options = възможни отговори; correctIndex = индекс
      { question: 'закуска', options: ['една', 'един'], correctIndex: 0 },
    ],
  } as MultipleChoiceExercise,

  // ─── Упражнение: Глаголи в правилната форма (workbook_fill_blank с options)
  {
    id: 't0N-gr-4',
    type: 'workbook_fill_blank',
    instruction: 'Поставете глаголите в правилната форма.',
    order: 8,
    points: 13,                                      // REPLACE
    layout: 'single',
    sentences: [
      { text: 'Пример: Те обичат кафе. (обичам)', blanks: [], correctAnswers: [], isExample: true },
      // REPLACE: options = всички 6 форми на глагола
      { text: 'Ти _______ ли сок? (обичам)', blanks: [1], correctAnswers: ['обичаш'],
        options: ['обичам', 'обичаш', 'обича', 'обичаме', 'обичате', 'обичат'] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── Упражнение: Числа (workbook_fill_blank с options) ────────────────────
  {
    id: 't0N-gr-5',
    type: 'workbook_fill_blank',
    instruction: 'Напишете числото с цифри.',
    order: 9,
    points: 15,                                      // REPLACE
    layout: 'two-column',
    sentences: [
      { text: 'две _______', blanks: [1], correctAnswers: ['2'], isExample: true },
      // REPLACE: options = 4 числа (правилно + 3 дистрактора — обърнати цифри, грешен порядък)
      { text: 'пет _______', blanks: [1], correctAnswers: ['5'], options: ['3', '5', '7', '9'] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── PATTERN: Контекстна картинка (2+ изображения над упражнението) ──────
  //
  // workbook_fill_blank поддържа само ЕДНО imageUrl.
  // Ако имате 2+ картинки (напр. ЯМ + ПИЯ), вмъкнете reading_text ПРЕДИ упражнението:
  //
  // {
  //   id: 't0N-gr-ctx',
  //   type: 'reading_text',
  //   order: 9,
  //   noTranslation: true,
  //   paragraphs: [],                                // ← няма текст, само картинки
  //   images: [
  //     { imageUrl: '/assets/test-a1-N/gramatika/image1.jpg', label: '' },
  //     { imageUrl: '/assets/test-a1-N/gramatika/image2.jpg', label: '' },
  //   ],
  // } as ReadingTextExercise,
  //
  // После workbook_fill_blank НЕ получава imageUrl — снимките идват от контекста горе.

  // ─── PATTERN: Подреди диалога (dialogue ordering) ────────────────────────
  //
  // НЕ използвайте dialogue_builder (не е scoreable).
  // Използвайте workbook_fill_blank: студентите пишат номер в падащо меню.
  // Първият ред е isExample: true (номер 1, даден).
  //
  // {
  //   id: 't0N-gr-dialog',
  //   type: 'workbook_fill_blank',
  //   instruction: 'Подредете диалога. Напишете номера на репликите в правилен ред.',
  //   order: 10,
  //   points: 5,                                     // брой редове без примера
  //   layout: 'single',
  //   imageUrl: '/assets/test-a1-N/gramatika/context.jpg',
  //   sentences: [
  //     { text: '1. — Добър ден! (Примерен ред)', blanks: [], correctAnswers: [], isExample: true },
  //     { text: '_______ — Добър ден! Имате ли ...?', blanks: [0], correctAnswers: ['2'], options: ['2','3','4','5','6'] },
  //     { text: '_______ — Да, имаме.', blanks: [0], correctAnswers: ['3'], options: ['2','3','4','5','6'] },
  //     // ... продължете за всеки ред
  //   ],
  // } as WorkbookFillBlankExercise,
];
`;

// ─── 3d. ПИСАНЕ: syllable_blocks ─────────────────────────────────────────────
//
// ВАРИАНТ А — отделна картинка за всяка дума (default, test-a1-1 стил)
// ВАРИАНТ Б — една споделена сцена отгоре, без imageUrl в пъзелите (test-a1-2 стил)
//   Когато е налична само обща сцена (напр. кошница с продукти):
//   1. Вмъкнете reading_text (noTranslation: true, images: [...], paragraphs: []) преди syllable_blocks.
//   2. Премахнете imageUrl от всички puzzles.
//   3. Буквите/сричките ТРЯБВА да са детерминирано разбъркани (НЕ random shuffle):
//      → Преместете ПЪРВАТА буква/сричка в КРАЯ.
//      Пример: 'домат' ['д','о','м','а','т'] → ['о','м','а','т','д']

export const TEMPLATE_WRITING = `
// ═══════════════════════════════════════════════════════════════════════════════
// КОМПОНЕНТ ПИСАНЕ (N т.)
// syllable_blocks с columns: 3.
// Едносрични думи → отделни букви. Многосрични → срички.
// ═══════════════════════════════════════════════════════════════════════════════

export const writingExercises: Exercise[] = [

  // ─── ВАРИАНТ А: Индивидуална картинка за всяка дума ──────────────────────
  {
    id: 't0N-pi-spell',                             // REPLACE N
    type: 'syllable_blocks',
    instruction: 'Подредете буквите, за да получите думата на картинката.',
    order: 10,
    points: 17,                                      // REPLACE: 1 точка на puzzle
    columns: 3,
    puzzles: [
      // Едносрична дума (отделни букви):
      { id: 'p-chay', imageUrl: '/assets/test-a1-N/pisane/chay.jpg',
        syllables: ['й', 'а', 'ч'], correctWord: 'чай' },

      // Многосрична дума (срички):
      { id: 'p-kiselo-mlyako', imageUrl: '/assets/test-a1-N/pisane/kiselo-mlyako.jpg',
        syllables: ['мля', 'ко', 'ки', 'се', 'ло'], correctWord: 'кисело мляко' },
    ],
  } as SyllableBlocksExercise,

  // ─── ВАРИАНТ Б: Споделена сцена отгоре, без индивидуални картинки ─────────
  // 1. Показва голяма снимка на сцената (напр. кошница с продукти):
  // {
  //   id: 't0N-pi-img',
  //   type: 'reading_text',
  //   order: 10,
  //   noTranslation: true,
  //   paragraphs: [],
  //   images: [{ imageUrl: '/assets/test-a1-N/pisane/scene.jpg', label: '' }],
  // } as ReadingTextExercise,
  //
  // 2. Само блокчета с букви/срички, БЕЗ imageUrl:
  // {
  //   id: 't0N-pi-spell',
  //   type: 'syllable_blocks',
  //   instruction: 'Намерете продуктите в кошницата и наредете буквите, за да получите думата.',
  //   order: 11,
  //   points: 10,
  //   columns: 3,
  //   puzzles: [
  //     // Детерминирано разбъркване: ПЪРВАТА буква/сричка → КЪМ КРАЯ
  //     // 'домат' → ['д','о','м','а','т'] → scrambled: ['о','м','а','т','д']
  //     { id: 'p-domat', syllables: ['о','м','а','т','д'], correctWord: 'домат' },
  //     { id: 'p-limon', syllables: ['и','м','о','н','л'], correctWord: 'лимон' },
  //   ],
  // } as SyllableBlocksExercise,
];
`;

// ─── 3e. Flat export в края на exercises.ts ─────────────────────────────────

export const TEMPLATE_EXERCISES_FOOTER = `
// ═══════════════════════════════════════════════════════════════════════════════
// Всички упражнения (плосък масив)
// ═══════════════════════════════════════════════════════════════════════════════

export const exercises: Exercise[] = [
  ...listeningExercises,
  ...readingExercises,
  ...grammarExercises,
  ...writingExercises,
];
`;

// ─────────────────────────────────────────────────────────────────────────────
// ██  TEMPLATE 4 — Registration in src/content/index.ts
// ─────────────────────────────────────────────────────────────────────────────

export const TEMPLATE_REGISTRATION = `
// Add to testFolderMap:
const testFolderMap: Record<string, string> = {
  'test-a1-1': 'test-lessons-1-2-3',
  'test-a1-N': 'test-lessons-X-Y',                  // REPLACE
};

// Add to navItems (after the corresponding lesson):
{ type: 'test', id: 'test-a1-N', label: 'уроци X и Y' },  // REPLACE: translatable label
`;

// ─────────────────────────────────────────────────────────────────────────────
// ██  TEMPLATE 5 — TestScoreSummary Behavior (automatic — no config needed)
// ─────────────────────────────────────────────────────────────────────────────
//
// TestScoreSummary renders automatically at the bottom of every test page.
// NO manual configuration is needed per test — it reads from testData.
//
// Behavior:
// • Appears as soon as ANY exercise state is saved (not just after submission)
// • Summary is EXPANDED by default — students see the breakdown immediately
// • Per-section progress bars update in real time as answers are entered
// • Sections below 50% are highlighted in red
//
// Tier messages are DYNAMIC — extracted from testData.title via buildTierMessages():
// • low  (0–50%):   "Нужна е още практика. Прегледайте [label] отново ..."
// • mid  (51–75%):  "Добро начало! Имате основни познания ..."
// • high (76–100%): "Отлично! Справяте се много добре с материала от [label]."
//
// Score calculation per exercise type:
// ┌─────────────────────┬────────────────────────────────────────────────────┐
// │ true_false           │ Count (answer === 'true') === sentence.isTrue     │
// │ workbook_fill_blank  │ Count validation[key] === true                    │
// │ multiple_choice      │ Count selectedAnswers[i] === correctIndex         │
// │ word_order           │ Count built.join(' ') === correctSentence         │
// │ syllable_blocks      │ Count completed[id] === true                      │
// └─────────────────────┴────────────────────────────────────────────────────┘

export {};

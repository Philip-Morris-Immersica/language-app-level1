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
// ═══════════════════════════════════════════════════════════════════════════════

export const listeningExercises: Exercise[] = [
  // ─── Текст за слушане (скрит) ─────────────────────────────────────────────
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
];
`;

// ─── 3d. ПИСАНЕ: syllable_blocks с imageUrl per puzzle ──────────────────────

export const TEMPLATE_WRITING = `
// ═══════════════════════════════════════════════════════════════════════════════
// КОМПОНЕНТ ПИСАНЕ (N т.)
// syllable_blocks с columns: 3 и imageUrl за всеки puzzle.
// Едносрични думи → отделни букви. Многосрични → срички.
// ═══════════════════════════════════════════════════════════════════════════════

export const writingExercises: Exercise[] = [
  {
    id: 't0N-pi-spell',                             // REPLACE N
    type: 'syllable_blocks',
    instruction: 'Подредете буквите, за да получите думата на картинката.',
    order: 10,
    points: 17,                                      // REPLACE: 1 точка на puzzle
    columns: 3,                                      // 3 колони × N реда
    puzzles: [
      // REPLACE: за всяка дума — imageUrl + разбъркани syllables + correctWord

      // Примери за едносрична дума (отделни букви):
      { id: 'p-chay', imageUrl: '/assets/test-a1-N/pisane/chay.jpg',
        syllables: ['й', 'а', 'ч'], correctWord: 'чай' },

      // Примери за многосрична дума (срички):
      { id: 'p-kiselo-mlyako', imageUrl: '/assets/test-a1-N/pisane/kiselo-mlyako.jpg',
        syllables: ['ки', 'се', 'ло', 'мля', 'ко'], correctWord: 'кисело мляко' },
    ],
  } as SyllableBlocksExercise,
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
// ██  TEMPLATE 5 — Score Tier Messages (for customization per test)
// ─────────────────────────────────────────────────────────────────────────────
//
// By default TestScoreSummary uses hardcoded messages referencing "уроци 1, 2 и 3".
// For new tests, update the tierMessages object in TestScoreSummary.tsx or
// make it dynamic based on testData. Current messages:
//
// low  (0–50%):  "Нужна е още практика. Прегледайте уроци X отново и обърнете внимание на по-слабите компоненти."
// mid  (51–75%): "Добро начало! Имате основни познания, но трябва да упражнявате повече някои компоненти."
// high (76–100%): "Отлично! Справяте се много добре с материала от уроци X. Продължавайте напред!"
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

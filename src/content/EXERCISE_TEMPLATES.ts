/**
 * EXERCISE TEMPLATES — Copy-paste templates for all 19 implemented exercise types.
 *
 * HOW TO USE:
 * 1. Find the template for the type you need (use Ctrl+F on the type name)
 * 2. Copy the entire object (from { to } as XxxExercise)
 * 3. Paste into your exercises.ts or workbook.ts
 * 4. Replace all REPLACE comments with actual content
 * 5. Update the `order` field to match the PDF sequence
 *
 * CATEGORIES:
 *   Section 1 — НОВИ ДУМИ       (illustrated_cards) ⭐ FREQUENT
 *   Section 2 — ГРАМАТИКА        (grammar_visual, grammar_examples, grammar_table) ⭐ FREQUENT
 *   Section 3 — ДИАЛОЗИ / ТЕКСТ  (dialogues, reading_text) ⭐ FREQUENT
 *   Section 4 — УПРАЖНЕНИЯ ЧЕСТИ (fill_in_blank, workbook_fill_blank, multiple_choice, dropdown_match, word_order) ⭐ FREQUENT
 *   Section 5 — УПРАЖНЕНИЯ РЕДКИ (match_pairs, letter_choice, image_labeling, syllable_blocks, word_search, true_false, dialogue_builder, fill_with_images)
 *
 * ID CONVENTIONS:
 *   Lesson exercises:  l0X-ex-NN        (e.g. l02-ex-01)
 *   Workbook:          l0X-wb-NN        (e.g. l02-wb-01)
 *   Нови думи:         l0X-novi-dumi-NN (e.g. l02-novi-dumi-01)
 *   Граматика:         l0X-gramatika-NN (e.g. l02-gramatika-01)
 *   Диалози:           l0X-dialozi-NN   (e.g. l02-dialozi-01)
 */

import type {
  IllustratedCardsExercise,
  GrammarVisualExercise,
  GrammarExamplesExercise,
  GrammarTableExercise,
  DialoguesExercise,
  ReadingTextExercise,
  FillInBlankExercise,
  WorkbookFillBlankExercise,
  MultipleChoiceExercise,
  DropdownMatchExercise,
  WordOrderExercise,
  MatchPairsExercise,
  LetterChoiceExercise,
  ImageLabelingExercise,
  SyllableBlocksExercise,
  WordSearchExercise,
  TrueFalseExercise,
  DialogueBuilderExercise,
  FillWithImagesExercise,
} from '@/content/types';

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 1 — НОВИ ДУМИ ⭐ FREQUENT
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * illustrated_cards — НОВИ ДУМИ секция с картинки и аудио.
 * Не е упражнение — няма points. Показва речникови карти.
 *
 * VARIANTS:
 *   - Without sublabels: simple word + image (greetings, objects)
 *   - With sublabels:    word + grammatical forms (countries: м./ж./мн.ч.)
 *   - Without audioUrl:  uses browser TTS on card click
 *   - With audioUrl:     plays MP3/WAV file
 */
export const TEMPLATE_illustrated_cards = {
  id: 'l0X-novi-dumi-NN',    // REPLACE: e.g. 'l02-novi-dumi-01'
  type: 'illustrated_cards' as const,
  title: 'НОВИ ДУМИ 1',      // REPLACE: 'НОВИ ДУМИ 2' etc.
  instruction: 'Запознайте се с новите думи и изрази',  // REPLACE if needed
  audioUrl: '/assets/lesson-0X/audio/new-words-NN.mp3', // REPLACE or remove if using TTS
  order: 1,                  // REPLACE: PDF sequence number
  cards: [
    // Simple card (no sublabels):
    { id: 'card1', imageUrl: '/assets/lesson-0X/novi-dumi-N-name/01-word.jpg', label: 'Дума' },
    // Card with sublabels (grammatical forms):
    { id: 'card2', imageUrl: '/assets/lesson-0X/novi-dumi-N-name/02-word.jpg', label: 'България', sublabels: ['българин', 'българка', 'българи'] },
    // Add more cards...
  ],
} as IllustratedCardsExercise;


// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 2 — ГРАМАТИКА ⭐ FREQUENT
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * grammar_visual — Граматика с местоимения/персонажи в решетка.
 * Не е упражнение — няма points. Показва pronouns с картинки.
 */
export const TEMPLATE_grammar_visual = {
  id: 'l0X-gramatika-NN',    // REPLACE
  type: 'grammar_visual' as const,
  title: 'ГРАМАТИКА 1',       // REPLACE
  subtitle: 'Граматика – Лични местоимения (8)', // REPLACE or remove
  instruction: 'Запознайте се с личните местоимения', // REPLACE
  order: 1,                   // REPLACE
  pronouns: [
    { pronoun: 'аз',  imageUrl: '/assets/lesson-0X/gramatika-N/1.az.jpg' },
    { pronoun: 'ти',  imageUrl: '/assets/lesson-0X/gramatika-N/2.ti.jpg' },
    { pronoun: 'той', imageUrl: '/assets/lesson-0X/gramatika-N/3.toi.jpg' },
    { pronoun: 'тя',  imageUrl: '/assets/lesson-0X/gramatika-N/4.tia.jpg' },
    // Add more pronouns or use description instead of imageUrl:
    // { pronoun: 'ние', description: 'Група хора' },
  ],
} as GrammarVisualExercise;

/**
 * grammar_examples — Граматика с изречения и картинки.
 * Не е упражнение — няма points.
 *
 * VARIANTS:
 *   - text + subtext: две отделни реда под картинката
 *   - lines[]:        масив от равнопоставени редове (препоръчително за 3+ реда)
 */
export const TEMPLATE_grammar_examples = {
  id: 'l0X-gramatika-NN',    // REPLACE
  type: 'grammar_examples' as const,
  title: 'ГРАМАТИКА 2',       // REPLACE
  subtitle: 'Глагол СЪМ',     // REPLACE or remove
  instruction: 'Запознайте се с формите на глагола', // REPLACE
  order: 1,                   // REPLACE
  examples: [
    // Variant A — text + subtext (2 lines):
    {
      imageUrl: '/assets/lesson-0X/gramatika-N/image1.jpg',
      text: 'Аз съм Мохамед.',
      subtext: 'Аз съм от Сирия.',
    },
    // Variant B — lines[] (3+ equal lines):
    {
      imageUrl: '/assets/lesson-0X/gramatika-N/image2.jpg',
      text: 'Аз съм Хасан.',   // used as alt text; lines[] shown instead
      lines: [
        'Аз съм Хасан.',
        'Аз съм арабин.',
        'Аз съм бежанец от Сирия.',
      ],
    },
    // Add more examples...
  ],
} as GrammarExamplesExercise;

/**
 * grammar_table — Таблица за спрежение/склонение.
 * Не е упражнение — няма points.
 */
export const TEMPLATE_grammar_table = {
  id: 'l0X-gramatika-NN',    // REPLACE
  type: 'grammar_table' as const,
  title: 'ГРАМАТИКА 5',       // REPLACE
  subtitle: 'Граматика – Сегашно време (12)', // REPLACE or remove
  instruction: 'Запознайте се с глагол съм – сегашно време', // REPLACE
  order: 1,                   // REPLACE
  tableTitle: 'Сегашно време – съм',  // REPLACE or remove
  columns: ['(+)', '(–)', '(?)'],     // REPLACE column headers
  rows: [
    { pronoun: 'аз',  cells: ['съм', 'не съм', 'ли съм'] },
    { pronoun: 'ти',  cells: ['си',  'не си',  'ли си']  },
    { pronoun: 'той', cells: ['е',   'не е',   'ли е']   },
    { pronoun: 'тя',  cells: ['е',   'не е',   'ли е']   },
    { pronoun: 'то',  cells: ['е',   'не е',   'ли е']   },
    { pronoun: 'ние', cells: ['сме', 'не сме', 'ли сме'] },
    { pronoun: 'вие', cells: ['сте', 'не сте', 'ли сте'] },
    { pronoun: 'те',  cells: ['са',  'не са',  'ли са']  },
  ],
  notes: [  // REPLACE or remove
    'Аз съм българин. = Българин съм.',
  ],
} as GrammarTableExercise;


// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 3 — ДИАЛОЗИ И ТЕКСТОВЕ ⭐ FREQUENT
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * dialogues — Диалог за четене с аудио или TTS.
 * Не е упражнение — няма points.
 *
 * VARIANTS:
 *   - With audioUrl: plays file on Listen button
 *   - Without audioUrl: click on section triggers browser TTS
 *   - With speaker: shows speaker name before each line
 */
export const TEMPLATE_dialogues = {
  id: 'l0X-dialozi-NN',      // REPLACE
  type: 'dialogues' as const,
  title: 'ДИАЛОЗИ 1',         // REPLACE
  instruction: 'Изслушайте диалозите и се опитайте да ги прочетете.', // REPLACE
  audioUrl: '/assets/lesson-0X/audio/dialogues-NN.wav', // REPLACE or remove for TTS
  order: 1,                   // REPLACE
  sections: [
    {
      id: 'а.',               // REPLACE: 'а.', 'б.', 'в.', 'г.' etc.
      lines: [
        { text: 'Здравейте, аз съм Хасан.' },   // REPLACE
        { text: 'Здравейте, аз съм Иван.' },
        // With speaker name:
        // { speaker: 'Хасан', text: 'Здравейте!' },
      ],
    },
    {
      id: 'б.',
      lines: [
        { text: 'Откъде сте?' },
        { text: 'Аз съм от България. А Вие?' },
        { text: 'Аз съм от Мароко.' },
      ],
    },
    // Add more sections...
  ],
} as DialoguesExercise;

/**
 * reading_text — Текст за четене с параграфи и аудио.
 * Не е упражнение — няма points.
 */
export const TEMPLATE_reading_text = {
  id: 'l0X-ex-NN',           // REPLACE
  type: 'reading_text' as const,
  title: 'ТЕКСТОВЕ',          // REPLACE or remove
  instruction: 'Слушайте и прочетете текста. Непознатите думи потърсете в речника.', // REPLACE
  audioUrl: '/assets/lesson-0X/audio/text-NN.wav', // REPLACE or remove
  order: 1,                   // REPLACE
  paragraphs: [
    'Аз съм Мохамед от Сирия. Аз съм сириец.', // REPLACE
    'Те са Лейла и Исам. Те са бежанци от Ливан.',
    // Add more paragraphs...
  ],
} as ReadingTextExercise;


// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 4 — УПРАЖНЕНИЯ ЧЕСТИ ⭐ FREQUENT
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * fill_in_blank — Попълване на пропуски с текстов вход.
 *
 * VARIANTS:
 *   - Standard: blanks[] с позиции на думите в изречението
 *   - freeText: true — едно свободно текстово поле на ред (за свободен отговор)
 *   - acceptableAnswers: масив от алтернативни верни отговори за всяка пропуска
 */
export const TEMPLATE_fill_in_blank = {
  id: 'l0X-ex-NN',           // REPLACE
  type: 'fill_in_blank' as const,
  instruction: 'Попълнете празните места.',  // REPLACE
  order: 1,                   // REPLACE
  points: 5,                  // REPLACE
  sentences: [
    // Standard blank — blanks[0] means first word is blank:
    {
      text: 'Аз _______ от България.',
      blanks: [1],            // position of blank word (0-indexed)
      correctAnswers: ['съм'],
      // Optional — multiple accepted answers per blank:
      // acceptableAnswers: [['съм', 'Съм']],
    },
    // Multiple blanks in one sentence:
    {
      text: 'Ти _______ Халед и _______ от Ирак.',
      blanks: [1, 4],
      correctAnswers: ['си', 'си'],
    },
    // Add more sentences...
  ],
} as FillInBlankExercise;

/**
 * workbook_fill_blank — Тетрадкови попълвания с layout опции.
 * Използва се в workbook.ts. Поддържа dropdown options.
 *
 * LAYOUTS:
 *   'two-column'  — два стълба (лява/дясна колона)
 *   'qa-split'    — въпрос | отговор на един ред, разделени с |
 *   'qa-stacked'  — въпрос горе, отговор долу, разделени с |
 *   'single'      — едноколонен (default)
 *
 * isExample: true — показва реда като пример (без попълване)
 */
export const TEMPLATE_workbook_fill_blank = {
  id: 'l0X-wb-NN',            // REPLACE
  type: 'workbook_fill_blank' as const,
  instruction: 'Напишете правилната форма.',  // REPLACE
  order: 1,                    // REPLACE
  points: 5,                   // REPLACE
  layout: 'two-column',        // REPLACE: 'two-column' | 'qa-split' | 'qa-stacked' | 'single'
  sentences: [
    // Example row (no blanks, shown greyed out):
    {
      text: 'Той е българин.',
      blanks: [],
      correctAnswers: [],
      isExample: true,
    },
    // Row with dropdown options:
    {
      text: 'Аз _______ сириец.',
      blanks: [1],
      correctAnswers: ['съм'],
      options: ['съм', 'си', 'е', 'сме', 'сте', 'са'],  // shown as dropdown
      // acceptableAnswers: [['съм', 'Съм']],
    },
    // qa-split / qa-stacked: use | to separate question from answer part:
    // { text: 'Ти от Ирак ли си? | Да, _______.',  blanks: [1], correctAnswers: ['аз съм от Ирак.'] },
  ],
} as WorkbookFillBlankExercise;

/**
 * multiple_choice — Избери верния отговор (радио бутони).
 */
export const TEMPLATE_multiple_choice = {
  id: 'l0X-ex-NN',           // REPLACE
  type: 'multiple_choice' as const,
  instruction: 'Изберете правилния отговор.',  // REPLACE
  order: 1,                   // REPLACE
  points: 4,                  // REPLACE
  questions: [
    {
      question: 'Как се казва поздравът сутринта?',  // REPLACE
      options: ['Добро утро!', 'Добър ден!', 'Добър вечер!', 'Лека нощ!'],
      correctIndex: 0,        // 0-indexed position of correct answer
    },
    // Add more questions...
  ],
} as MultipleChoiceExercise;

/**
 * dropdown_match — Свързване с dropdown (ляво → dropdown дясно).
 * Най-универсалният тип — ползва се за свързване, въпроси/отговори, спрежения.
 */
export const TEMPLATE_dropdown_match = {
  id: 'l0X-ex-NN',           // REPLACE
  type: 'dropdown_match' as const,
  instruction: 'Свържете думите от колонките.',  // REPLACE
  order: 1,                   // REPLACE
  points: 4,                  // REPLACE
  questions: [
    { id: 'q1', left: 'Добро',  options: ['утро!', 'ден!', 'нощ!', 'вечер!'], correctAnswer: 'утро!'  },
    { id: 'q2', left: 'Добър',  options: ['утро!', 'ден!', 'нощ!', 'вечер!'], correctAnswer: 'ден!'   },
    { id: 'q3', left: 'Лека',   options: ['утро!', 'ден!', 'нощ!', 'вечер!'], correctAnswer: 'нощ!'   },
    { id: 'q4', left: 'Добър',  options: ['утро!', 'ден!', 'нощ!', 'вечер!'], correctAnswer: 'вечер!' },
    // Add more pairs...
  ],
} as DropdownMatchExercise;

/**
 * word_order — Наредба на думи в изречение (tap to add/remove).
 */
export const TEMPLATE_word_order = {
  id: 'l0X-wb-NN',           // REPLACE
  type: 'word_order' as const,
  instruction: 'Наредете думите в правилен ред.',  // REPLACE
  order: 1,                   // REPLACE
  points: 4,                  // REPLACE
  questions: [
    {
      words: ['Откъде', 'е', 'Хасан', '?'],     // REPLACE — shuffled words shown to user
      correctSentence: 'Откъде е Хасан ?',       // REPLACE — correct order (spaces around ?)
      hint: 'Хасан е от Сирия.',                 // REPLACE or remove
    },
    // Add more sentences...
  ],
} as WordOrderExercise;


// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 5 — УПРАЖНЕНИЯ РЕДКИ
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * match_pairs — Свързване чрез tap (ляво → дясно, без dropdown).
 * По-визуален от dropdown_match, но по-рядко използван.
 */
export const TEMPLATE_match_pairs = {
  id: 'l0X-ex-NN',           // REPLACE
  type: 'match_pairs' as const,
  instruction: 'Свържете думите от двете колони.',  // REPLACE
  order: 1,                   // REPLACE
  points: 4,                  // REPLACE
  pairs: [
    { id: 'p1', left: 'Добро', correctRight: 'утро!'  },
    { id: 'p2', left: 'Добър', correctRight: 'ден!'   },
    { id: 'p3', left: 'Лека',  correctRight: 'нощ!'   },
    { id: 'p4', left: 'Добър', correctRight: 'вечер!' },
    // Add more pairs...
  ],
} as MatchPairsExercise;

/**
 * letter_choice — Попълни липсващи букви (само верните букви са налични).
 * Буквите са показани като бутони, потребителят ги поставя на местата.
 */
export const TEMPLATE_letter_choice = {
  id: 'l0X-ex-NN',           // REPLACE
  type: 'letter_choice' as const,
  instruction: 'Попълнете липсващите букви.',  // REPLACE
  order: 1,                   // REPLACE
  points: 7,                  // REPLACE
  puzzles: [
    // _ marks a missing letter slot:
    { id: 'p1', word: 'Д_Б_Р Д_Н', correctLetters: ['О', 'Ъ', 'Е'] },  // REPLACE
    { id: 'p2', word: 'ЛЕ_А НО_',  correctLetters: ['К', 'Щ'] },
    // Add more puzzles...
  ],
} as LetterChoiceExercise;

/**
 * image_labeling — Надпиши изображения с dropdown.
 * Използва се за знамена, предмети, хора.
 *
 * displayType: 'flags' — специален стил за знамена
 * displayType: 'default' — стандартен стил
 */
export const TEMPLATE_image_labeling = {
  id: 'l0X-ex-NN',           // REPLACE
  type: 'image_labeling' as const,
  instruction: 'Напишете имената под снимките.',  // REPLACE
  order: 1,                   // REPLACE
  points: 7,                  // REPLACE
  displayType: 'flags',       // REPLACE: 'flags' | 'default'
  images: [
    { id: 'bulgaria', imageUrl: '/assets/lesson-0X/exercise-NN-name/flag-bulgaria.jpg', correctLabel: 'България' },
    { id: 'syria',    imageUrl: '/assets/lesson-0X/exercise-NN-name/flag-syria.jpg',    correctLabel: 'Сирия'    },
    // Add more images...
  ],
  options: ['България', 'Сирия', 'Украйна'],  // REPLACE — all possible labels shown as dropdown
} as ImageLabelingExercise;

/**
 * syllable_blocks — Наредба на срички за съставяне на дума.
 * Потребителят tap-ва сричките в правилен ред.
 */
export const TEMPLATE_syllable_blocks = {
  id: 'l0X-ex-NN',           // REPLACE
  type: 'syllable_blocks' as const,
  instruction: 'Подредете блокчетата в думи.',  // REPLACE
  order: 1,                   // REPLACE
  points: 8,                  // REPLACE
  puzzles: [
    { id: 'puzzle1', syllables: ['Я', 'РИ', 'БЪЛ', 'ГА'], correctWord: 'БЪЛГАРИЯ' },  // REPLACE
    { id: 'puzzle2', syllables: ['ВАН', 'ЛИ'],             correctWord: 'ЛИВАН'    },
    // Add more puzzles...
  ],
} as SyllableBlocksExercise;

/**
 * word_search — Намери думи в буквен низ.
 * Потребителят избира думите, които вижда скрити в редицата.
 */
export const TEMPLATE_word_search = {
  id: 'l0X-ex-NN',           // REPLACE
  type: 'word_search' as const,
  instruction: 'Намерете думите в текста.',  // REPLACE
  order: 1,                   // REPLACE
  points: 7,                  // REPLACE
  letterString: 'ниетевиеазтойтоти',  // REPLACE — all letters in one string (no spaces)
  correctWords: ['ние', 'те', 'вие', 'аз', 'той', 'то', 'ти'],  // REPLACE
  distractorWords: ['тя', 'нея', 'ви'],  // REPLACE or remove — words shown but not correct
} as WordSearchExercise;

/**
 * true_false — Вярно / Невярно за всяко твърдение.
 */
export const TEMPLATE_true_false = {
  id: 'l0X-ex-NN',           // REPLACE
  type: 'true_false' as const,
  instruction: 'Определете дали твърденията са верни или не.',  // REPLACE
  order: 1,                   // REPLACE
  points: 5,                  // REPLACE
  sentences: [
    { id: 's1', text: 'Мохамед е от Сирия.',  isTrue: true  },  // REPLACE
    { id: 's2', text: 'Кадир не е сириец.',    isTrue: false },
    // Add more sentences...
  ],
} as TrueFalseExercise;

/**
 * dialogue_builder — Наредба на разбъркани изречения в диалог.
 * Първото изречение е заключено (дадено). Останалите са разбъркани.
 */
export const TEMPLATE_dialogue_builder = {
  id: 'l0X-ex-NN',           // REPLACE
  type: 'dialogue_builder' as const,
  title: 'УПРАЖНЕНИЕ 17',     // REPLACE or remove
  instruction: 'Подредете фразите, за да получите диалози.',  // REPLACE
  order: 1,                   // REPLACE
  sections: [
    {
      id: 'а.',               // REPLACE
      givenFirstLine: 'Добър ден!',  // REPLACE — this line is locked/shown first
      sentences: [            // REPLACE — ALL sentences in correct order (first = givenFirstLine)
        'Добър ден!',
        'Как сте?',
        'Благодаря, добре. А Вие?',
        'Аз също.',
        'Приятен ден!',
      ],
    },
    // Add more dialogue sections...
  ],
} as DialogueBuilderExercise;

/**
 * fill_with_images — Попълване с знамена + глагол (специфичен за урок 1).
 * Потребителят избира глагола и страната за всяко изречение.
 */
export const TEMPLATE_fill_with_images = {
  id: 'l0X-ex-NN',           // REPLACE
  type: 'fill_with_images' as const,
  instruction: 'Попълнете празните места.',  // REPLACE
  order: 1,                   // REPLACE
  points: 12,                 // REPLACE
  modelText: 'Аз съм Петър. Аз съм от България.',  // REPLACE or remove
  modelFlag: '/assets/lesson-0X/flags/flag-bulgaria.jpg',  // REPLACE or remove
  sentences: [
    {
      id: '1',
      pronoun: 'Ти',           // REPLACE
      name: 'Елена',           // REPLACE
      country: 'България',     // REPLACE
      flagUrl: '/assets/lesson-0X/flags/flag-bulgaria.jpg',  // REPLACE
      correctVerb1: 'си',      // REPLACE — verb for "Ти ___ Елена"
      correctVerb2: 'си',      // REPLACE — verb for "Ти ___ от България"
    },
    // Add more sentences...
  ],
  verbOptions: ['съм', 'си', 'е', 'сме', 'сте', 'са'],  // REPLACE
  countryOptions: ['България', 'Сирия', 'Украйна'],       // REPLACE
} as FillWithImagesExercise;

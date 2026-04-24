/**
 * EXERCISE TEMPLATES — Copy-paste templates for all 25 implemented exercise types/variants.
 *
 * HOW TO USE:
 * 1. Find the template for the type you need (use Ctrl+F on the type name)
 * 2. Copy the entire object (from { to } as XxxExercise)
 * 3. Paste into your exercises.ts or workbook.ts
 * 4. Replace all REPLACE comments with actual content
 * 5. Update the `order` field to match the PDF sequence
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * ВСИЧКИ ИНСТРУКЦИИ СА СТАНДАРТИЗИРАНИ — виж таблицата по-долу и
 * content-quality-checklist.mdc §A3. НЕ измисляй нови инструкции за стандартни типове.
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * СТАНДАРТНИ ИНСТРУКЦИИ ПО ТИП (задължителни):
 *   reading_text (урок 0–2)  → „Изслушайте текста и се опитайте да го прочетете."
 *   reading_text (урок 3+)   → „Изслушайте текста и след това го прочетете сами."
 *   reading_text + НОВИ ДУМИ → „Кликнете върху картинките, за да се запознаете с думите, и изслушайте текста. Прочетете го сами."
 *   word_search               → „Колко думи можете да откриете?"
 *   drag_to_columns           → „Поставете думите в правилната колона."
 *   syllable_blocks           → „Подредете буквите/сричките, за да съставите дума или израз."
 *   illustrated_cards (0–1)  → „Натиснете за произношение."
 *   illustrated_cards (2+)   → (без инструкция)
 *   word_order                → „Поставете думите в правилния ред."
 *   true_false                → „Прочетете текста и определете дали твърденията са верни (✓) или неверни (✗)."
 *   Listening в тест          → „Изслушайте текста."
 *   Reading в тест            → „Прочетете текста."
 *
 * ИНСТРУКЦИИ (ВАЖНО):
 * - Винаги завършвайте instruction текста с точка.
 * - Описвайте и функционалността (какво да натисне), и задачата (какво се очаква).
 *   Пример: „Подредете фразите, за да получите диалог. Първата фраза е в зелено."
 * - За граматични дисплеи в уроци 0–1: добавяйте „Натиснете за произношение."
 * - За граматични дисплеи в уроци 2+: НЕ пишете инструкция за произношение.
 * - Използвайте instructionKey + ui.ts за предварително превеждане на 7 езика.
 * - НЕ добавяйте „Непознатите думи потърсете в речника." — вече е премахнато навсякъде.
 * - „евроцента" (не „евроцент") за всички суми завършващи на 1 (освен самото „1 евроцент").
 * - Бланките в текста ВИНАГИ с минимум 3 underscores: _______ (7 е стандарт).
 *   Regex в WorkbookFillBlank е /(_{3,})/ — по-малко от 3 underscores няма да се разпознае.
 * - Подточки и идентификатори на диалози — ВИНАГИ на кирилица: а., б., в., г. (НЕ a., b., c.).
 * - Учтива форма „Вашата", „Вие" — с главна буква. Запетая пред „за да" е задължителна.
 * - „Вие" в grammar_table спрежения (мн.ч. учтива форма) — с ГЛАВНА буква в pronoun поле.
 * - Термини в инструкции — с болд (**съм**), не с CAPS (СЪМ).
 * - В тестове: title: 'УПРАЖНЕНИЕ N' (НЕ 'КОМПОНЕНТ СЛУШАНЕ' и подобни).
 * - Без PDF остатъци: без „речник — урок X", без „(стр. N)" в subtitle, без „(8)" суфикси.
 *
 * КАЧЕСТВО НА СЪДЪРЖАНИЕТО (от обратна връзка уроци 0–6):
 *
 * ИНСТРУКЦИИ — АДАПТИРАНИ ЗА ДИГИТАЛЕН ФОРМАТ (КРИТИЧНО):
 * - НЕ копирай дословно от учебника. Учебникът е хартиен — нашата платформа е интерактивна.
 * - Глаголът ТРЯБВА да съвпада с интеракцията: dropdown → „Изберете", text → „Напишете",
 *   drag → „Подредете"/„Плъзнете", click → „Натиснете", listen → „Слушайте".
 * - НЕ пиши: „по двойки", „на хартия", „в тетрадката" — това са хартиени указания.
 *
 * ПРЕДВАРИТЕЛЕН ПРЕВОД (instructionKey):
 * - Граматически инструкции → ЗАДЪЛЖИТЕЛНО instructionKey + ui.ts (7 езика).
 * - Сложни инструкции с нова интеракция → ЗАДЪЛЖИТЕЛНО instructionKey.
 * - Прости повтарящи се инструкции → допустимо автоматично (useTranslate).
 *
 * РАЗБЪРКВАНЕ — НЯМА АВТОМАТИЧЕН SHUFFLE:
 * - word_order.words[] / syllable_blocks.syllables[] — МАКСИМАЛНО РАЗБЪРКАНИ в масива.
 * - Компонентите показват елементите ТОЧНО в реда от масива.
 * - Карти: ако има категории (напитки/храни), НЕ ги групирай — разреди ги.
 * - Верни/грешни в true_false — СМЕСЕНИ (не всички верни първо, после грешните).
 *
 * ДРУГИ ПРАВИЛА:
 * - Числа в listeningText → ИЗПИСВАЙ С ДУМИ (76 → „седемдесет и шест") за правилно TTS.
 * - Първа дума във ВСЯКО изречение — с ГЛАВНА буква (включително в options, true_false, таблици).
 * - Определителен член при притежателни — „баба" (НЕ „бабата") когато е с притежателно.
 * - Двусмислени отговори — ако 2 отговора са технически верни, добави alternateCorrectAnswers.
 * - voiceGender на dialogue lines — задавай винаги, когато полът е ясен.
 * - Секция Преговор: НЕ „от работната тетрадка". Подзаглавие: „Упражнения за затвърждаване."
 * - НОВИ ДУМИ ПРЕДИ упражненията, които ги ползват. Граматика ПРЕДИ упражнение.
 * - textTitle за reading_text — удебелено заглавие, когато текстът го има.
 * - showDictionary: true за reading_text с реални думи (не за тестове с noTranslation).
 *
 * НОВО (от обратна връзка урок 7):
 * - Text ↔ TTS съгласуване на числа: когато в UI пише „двадесет", TTS не бива да
 *   чете „двайсет" (и обратно). Избери една форма и я спазвай в ЦЕЛИЯ урок.
 * - Чужди имена на български — използвай утвърдената форма: „Алепо" (НЕ „Халеб"),
 *   „София" (НЕ „Sofia"). Проверявай спрямо общоприетия български превод.
 * - Две равностойни форми — когато и двете са верни (двайсет/двадесет, полвина/
 *   половин), ЗАДЪЛЖИТЕЛНО добавяй алтернативата в `alternateCorrectAnswers` или
 *   `acceptableAnswers` и отбелязвай в grammar note: „И двете форми са верни."
 * - points винаги = броят на blanks (а не броят на correctAnswers). Когато един blank
 *   приема няколко синоними, те отиват в същия correctAnswers масив — не броиш двойно.
 *
 * ДИАЛОЗИ — КИРИЛИЦА В ID (ЧЕСТА ГРЕШКА):
 * - `dialogues.sections[].id` и `dialogue_builder.sections[].id` ТРЯБВА да са на
 *   кирилица: 'а.', 'б.', 'в.', 'г.', НЕ 'a.', 'b.', 'c.', 'd.' (латиница).
 *   Линтерът (`npm run content:lint`) ще ги флагира като ERROR.
 *
 * АВТОМАТИЧНА ПРОВЕРКА:
 *   `npm run content:lint`                    # проверява всички уроци
 *   `npm run content:lint -- --lesson 07`     # само един урок
 *   `npm run content:lint -- --strict`        # exit 1 при warnings (за CI)
 *   Хваща автоматично: дублирани id/order, латиница в dialogue id, грешни глаголи
 *   в инструкции (dropdown → „Напишете"), несъответствие points ↔ blanks, липсващи
 *   картинки, „по двойки"/„на хартия"/„в тетрадката" в инструкции, неразбъркани
 *   syllable_blocks, групирани true/false, цифри в listeningText, алignment на
 *   grammar_table и още. За suppress на правило: `// content-lint-disable rule-id`.
 *
 * - Пълен checklist → виж .cursor/rules/content-quality-checklist.mdc
 *
 * CATEGORIES:
 *   Section 1 — НОВИ ДУМИ       (illustrated_cards, illustrated_cards_text_only) ⭐ FREQUENT
 *   Section 2 — ГРАМАТИКА        (grammar_visual, grammar_examples, grammar_table) ⭐ FREQUENT
 *   Section 3 — ДИАЛОЗИ / ТЕКСТ  (dialogues, reading_text) ⭐ FREQUENT
 *   Section 4 — УПРАЖНЕНИЯ ЧЕСТИ (fill_in_blank, workbook_fill_blank, workbook_fill_blank_listening, multiple_choice, dropdown_match, word_order, drag_to_columns) ⭐ FREQUENT
 *   Section 5 — УПРАЖНЕНИЯ РЕДКИ (match_pairs, letter_choice, image_labeling, syllable_blocks, word_search, true_false, dialogue_builder, fill_with_images, personal_choice)
 *   Section 6 — ИНТЕРАКТИВНИ / АЗБУКА (connect_dots, alphabet_maze)
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
  DragToColumnsExercise,
  MatchPairsExercise,
  LetterChoiceExercise,
  ImageLabelingExercise,
  SyllableBlocksExercise,
  WordSearchExercise,
  TrueFalseExercise,
  DialogueBuilderExercise,
  FillWithImagesExercise,
  PersonalChoiceExercise,
  ConnectDotsExercise,
  AlphabetMazeExercise,
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

/**
 * illustrated_cards (TEXT-ONLY) — НОВИ ДУМИ без картинки.
 * Ползва се когато нямаме изображения за новите думи.
 * Картите показват само думата (+ превод при клик + TTS произношение).
 * Кликнатите карти се оцветяват леко в зелено, за да знае ученикът кои е разгледал.
 *
 * КОГА ДА ПОЛЗВАШ:
 *   - Международни думи, абстрактни понятия, думи без подходящи картинки
 *   - Временно решение докато се набавят картинки (после добави imageUrl)
 *
 * БЕЛЕЖКИ:
 *   - imageUrl: '' за всяка карта (компонентът скрива празните изображения)
 *   - Без audioUrl → TTS произношение при клик
 *   - sublabels работят нормално (за граматически форми)
 */
export const TEMPLATE_illustrated_cards_text_only = {
  id: 'l0X-novi-dumi-NN',    // REPLACE: e.g. 'l00-novi-dumi-02'
  type: 'illustrated_cards' as const,
  title: 'НОВИ ДУМИ 1',      // REPLACE: 'НОВИ ДУМИ 2' etc.
  instruction: 'Натиснете за произношение.',
  order: 1,                  // REPLACE: PDF sequence number
  cards: [
    { id: 'card1', imageUrl: '', label: 'футбол' },
    { id: 'card2', imageUrl: '', label: 'банан' },
    { id: 'card3', imageUrl: '', label: 'кафе' },
    { id: 'card4', imageUrl: '', label: 'такси' },
    // With sublabels (grammatical forms):
    // { id: 'card5', imageUrl: '', label: 'телефон', sublabels: ['телефони'] },
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
 *
 * ⚠️ columns.length MUST equal cells.length per row!
 *   `pronoun` = first column (auto-rendered, NO header needed).
 *   `columns` = headers for the DATA columns only.
 *   Do NOT put the pronoun label in columns — causes header misalignment.
 *
 * УДЕБЕЛЯВАНЕ НА КЛЕТКИ — две средства, използвай правилното:
 *   - `boldColumns: [1]`            → удебелява ЦЯЛАТА колона 1 (и заглавие, и всички клетки).
 *                                      Пример: „два/две" (цялата колона е акцент).
 *   - Inline `**word**` в cells[]   → удебелява САМО избрана дума/окончание в клетката.
 *                                      Пример: за окончания на думи — „пазар**ът**",
 *                                      „два лимон**а**", „две ябълк**и**".
 *   Markdown в cells се рендира от GrammarTable.tsx; премахва се автоматично преди TTS.
 *   НЕ слагай `boldColumns` когато искаш само окончания — таблицата става нечетлива.
 */
export const TEMPLATE_grammar_table = {
  id: 'l0X-gramatika-NN',    // REPLACE
  type: 'grammar_table' as const,
  title: 'ГРАМАТИКА 5',       // REPLACE
  subtitle: 'Граматика – Сегашно време (12)', // REPLACE or remove
  instruction: 'Запознайте се с глагол съм – сегашно време', // REPLACE
  order: 1,                   // REPLACE
  tableTitle: 'Сегашно време – съм',  // REPLACE or remove
  columns: ['(+)', '(–)', '(?)'],     // REPLACE — must match cells.length per row!
  rows: [
    { pronoun: 'аз',  cells: ['съм', 'не съм', 'ли съм'] },
    { pronoun: 'ти',  cells: ['си',  'не си',  'ли си']  },
    { pronoun: 'той', cells: ['е',   'не е',   'ли е']   },
    { pronoun: 'тя',  cells: ['е',   'не е',   'ли е']   },
    { pronoun: 'то',  cells: ['е',   'не е',   'ли е']   },
    { pronoun: 'ние', cells: ['сме', 'не сме', 'ли сме'] },
    { pronoun: 'Вие', cells: ['сте', 'не сте', 'ли сте'] },
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
 * dialogues — Диалог за четене по секции (а., б., в., …).
 * Не е упражнение — няма points.
 *
 * AUDIO / TTS:
 *   - Per-line MP3s are generated by scripts/generate-tts.ts into
 *     public/assets/lesson-XX/audio/tts/dialogues/{exerciseId}-{sectionId}-line-{i}.mp3
 *   - The `Dialogues.tsx` component renders TWO playback modes out of the box:
 *       1. Click a single line → plays that line only
 *       2. "Слушай/Listen" button on each section → plays all lines in order
 *          (350 ms gap between lines; red "Спри/Stop" while active)
 *   - No `audioUrl` is needed; do NOT add one for dialogues — paths are convention-based.
 *
 * VOICES (per line):
 *   - `voiceGender: 'male'` → Charon (two men in a row alternate Charon/Achird)
 *   - `voiceGender: 'female'` → Achernar (two women in a row alternate Achernar/Despina)
 *   - Without `voiceGender`: fallback alternates female (even index) / male (odd index)
 *
 * SPEAKER NAMES:
 *   - Optional `speaker` field shows the speaker before the line in the UI.
 *   - Speaker also feeds SPEAKER_VOICE_MAP in generate-tts.ts if `voiceGender` is missing.
 */
export const TEMPLATE_dialogues = {
  id: 'l0X-dialozi-NN',      // REPLACE
  type: 'dialogues' as const,
  title: 'ДИАЛОЗИ 1',         // REPLACE
  instruction: 'Изслушайте диалозите и се опитайте да ги прочетете.', // REPLACE
  order: 1,                   // REPLACE
  sections: [
    {
      id: 'а.',               // REPLACE: 'а.', 'б.', 'в.', 'г.' etc.
      lines: [
        { text: 'Здравейте, аз съм Хасан.', voiceGender: 'male' },   // REPLACE
        { text: 'Здравейте, аз съм Иван.',  voiceGender: 'male' },
        // With speaker name:
        // { speaker: 'Хасан', text: 'Здравейте!', voiceGender: 'male' },
      ],
    },
    {
      id: 'б.',
      lines: [
        { text: 'Откъде сте?',                 voiceGender: 'female' },
        { text: 'Аз съм от България. А Вие?',  voiceGender: 'male' },
        { text: 'Аз съм от Мароко.',           voiceGender: 'male' },
      ],
    },
    // Add more sections...
  ],
} as DialoguesExercise;

/**
 * reading_text — Текст за четене с параграфи и TTS.
 * Не е упражнение — няма points.
 *
 * AUDIO:
 *   - Per paragraph: `texts/{id}-p-{i}.mp3` (Gemini Pro, Charon or Achernar)
 *   - Optional single file: `audioUrl` → `texts/{id}-full.mp3` (green Listen plays one file)
 *   - If `paragraphVoiceGenders` has the same length as `paragraphs`:
 *       - each paragraph is generated with that voice; `-full.mp3` is NOT created
 *       - omit `audioUrl`; [ReadingText.tsx](mdc:src/components/exercises/ReadingText.tsx) shows
 *         „Слушай“ that plays p-0, then p-1, … in order (like dialogues)
 *   - Otherwise: optional `audioUrl` for one-shot full listen + click paragraph for `-p-{i}`
 *
 * COMBINED EXERCISE (НОВИ ДУМИ + ТЕКСТ):
 *   - Used for урок 3 упр. 33, урок 4 упр. 34/37/39/41, etc. — where flip-card
 *     illustrations precede a reading text introducing the same vocabulary.
 *   - STANDARD INSTRUCTION: „Кликнете върху картинките, за да се запознаете с думите, и изслушайте текста. Прочетете го сами."
 *   - EVERY image in `images[]` MUST have `ttsWordId` + `label` so it gets its
 *     own `words/{ttsWordId}.mp3`. Without `ttsWordId` the flip-card is silent.
 *   - Set `imageFlashcards: true` to render the images as flip cards.
 */
export const TEMPLATE_reading_text = {
  id: 'l0X-ex-NN',           // REPLACE
  type: 'reading_text' as const,
  title: 'ТЕКСТОВЕ',          // REPLACE or remove
  instruction: 'Слушайте и прочетете текста.', // REPLACE — НЕ добавяйте "Непознатите думи потърсете в речника."
  // audioUrl: '/assets/lesson-0X/audio/tts/texts/l0X-ex-NN-full.mp3', // optional: one MP3 for whole text
  order: 1,                   // REPLACE
  paragraphs: [
    'Аз съм Мохамед от Сирия. Аз съм сириец.', // REPLACE
    'Те са Лейла и Исам. Те са бежанци от Ливан.',
    // Add more paragraphs...
  ],
  // Optional: male/female per paragraph (same length as paragraphs). Then no `-full`, UI uses sequential Listen.
  // paragraphVoiceGenders: ['male', 'female'],
  // Optional: image flip-cards with TTS — EVERY image MUST have ttsWordId for audio.
  // imageFlashcards: true,
  // images: [
  //   { imageUrl: '/assets/lesson-0X/novi-dumi-N/01-shopska.jpg', label: 'шопска салата', ttsWordId: 'shopska-salata' },
  //   { imageUrl: '/assets/lesson-0X/novi-dumi-N/02-sarmi.jpg',   label: 'сарми',          ttsWordId: 'sarmi'          },
  // ],
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
 * workbook_fill_blank (listening) — Слушай текста и попълни пропуските.
 * Вариант на workbook_fill_blank с listeningText — текстът не се вижда,
 * а се чува чрез TTS бутон. Студентът попълва бланките от dropdown.
 *
 * КОГА ДА ПОЛЗВАШ:
 *   - Диктовка / слушане с разбиране
 *   - Текст, който не трябва да се вижда — само да се чува
 *   - Попълване от контекст (по 2–4 опции на бланка)
 *
 * БЕЛЕЖКИ:
 *   - listeningText: пълният текст, който TTS чете на глас
 *   - options може да е string[] (еднакви за всички бланки)
 *     или string[][] (различни опции за всяка бланка поотделно)
 *   - При 2+ бланки в едно изречение: options: [['опция1а', 'опция1б'], ['опция2а', 'опция2б']]
 *   - layout: 'single' е препоръчителен за слушане
 *   - points = брой изречения (всяко изречение се оценява като цяло)
 */
export const TEMPLATE_workbook_fill_blank_listening = {
  id: 'l0X-ex-NN',              // REPLACE
  type: 'workbook_fill_blank' as const,
  title: 'УПРАЖНЕНИЕ NN',        // REPLACE
  instruction: 'Слушайте текста и попълнете празните места.',  // REPLACE
  order: 1,                      // REPLACE
  points: 7,                     // REPLACE (= брой изречения, не бланки)
  layout: 'single' as const,
  listeningText: 'Иван и Мария са от България. За закуска те обичат кафе с мляко и малко захар.',  // REPLACE — целият текст за TTS
  sentences: [
    // Изречение с 1 бланка и dropdown опции:
    {
      text: 'Иван и Мария са от _______.',
      blanks: [5],
      correctAnswers: ['България'],
      options: ['България', 'Ирак', 'Украйна'],
    },
    // Изречение с 2 бланки и РАЗЛИЧНИ опции за всяка:
    {
      text: 'Не обича _______ и _______.',
      blanks: [2, 4],
      correctAnswers: ['хляб', 'салам'],
      options: [
        ['хляб', 'баница', 'филия'],      // опции за 1-ва бланка
        ['салам', 'сирене', 'кашкавал'],   // опции за 2-ра бланка
      ],
    },
    // Add more sentences...
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
    { id: 'q2', left: 'Добър',  options: ['утро!', 'ден!', 'нощ!', 'вечер!'], correctAnswer: 'ден!', alternateCorrectAnswers: ['вечер!'] },
    { id: 'q3', left: 'Лека',   options: ['утро!', 'ден!', 'нощ!', 'вечер!'], correctAnswer: 'нощ!'   },
    { id: 'q4', left: 'Добър',  options: ['утро!', 'ден!', 'нощ!', 'вечер!'], correctAnswer: 'вечер!', alternateCorrectAnswers: ['ден!'] },
    // alternateCorrectAnswers: use when multiple answers are valid for the same left text
  ],
} as DropdownMatchExercise;

/**
 * word_order — Наредба на думи в изречение (tap to add/remove).
 * ВАЖНО: Думите в `words` трябва да са максимално разбъркани —
 * компонентът ги показва ТОЧНО в реда от масива (без shuffle).
 * Ако има повече от един верен ред, добавете `alternateCorrectSentences`.
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
      alternateCorrectSentences: ['Хасан откъде е ?'],  // REPLACE or remove — other valid orderings
      hint: 'Хасан е от Сирия.',                 // REPLACE or remove
    },
    // Add more sentences...
  ],
} as WordOrderExercise;

/**
 * drag_to_columns — Плъзни дума в правилната колона (swipe-based).
 * Поддържа 2 или 3 колони. При 2: swipe ляво/дясно. При 3: swipe ляво/дясно/надолу.
 *
 * VARIANTS:
 *   - 2 columns: ляво ⬅️ / дясно ➡️ (напр. ИМА / НЯМА, ДА / НЕ)
 *   - 3 columns: ляво ⬅️ / дясно ➡️ / надолу ⬇️ (напр. ЕДИН / ЕДНА / ЕДНО)
 *   - imageUrl: референтна картинка отгоре (напр. маса с храна за "какво има")
 *
 * SWIPE МЕХАНИЗЪМ:
 *   - Threshold: 30px (ниско за по-добра чувствителност)
 *   - Ляво = колона 0, Дясно = колона 1, Надолу = колона 2
 *   - На мобилно контейнерите за колона 0 и 1 са до стрелките,
 *     колона 2 е центрирана отдолу
 *
 * БЕЛЕЖКИ:
 *   - items[] се разбъркват автоматично от компонента
 *   - Въпреки shuffle-а, подреждайте items[] предварително смесени между категориите
 *     (НЕ всички от група А, после всички от група Б — чай, хляб, кафе, сирене...)
 *   - Всяка дума от items[] трябва да е в точно един correctItems[]
 *   - icon е по избор (emoji пред заглавието на колоната)
 *   - При 3 колони инструкцията автоматично казва "наляво, надясно или надолу"
 */
export const TEMPLATE_drag_to_columns_2col = {
  id: 'l0X-ex-NN',             // REPLACE
  type: 'drag_to_columns' as const,
  instruction: 'Какво има и какво няма на масата?',  // REPLACE
  order: 1,                     // REPLACE
  points: 10,                   // REPLACE (= number of items)
  imageUrl: '/assets/lesson-0X/exercise-NN/image.jpg',  // REPLACE or remove
  items: [                      // REPLACE — all words to sort
    'чай', 'кафе', 'мляко', 'захар', 'хляб',
    'масло', 'мед', 'сирене', 'кашкавал', 'сок',
  ],
  columns: [
    {
      id: 'ima',                // REPLACE
      title: 'ИМА',            // REPLACE
      icon: '✓',               // REPLACE or remove
      correctItems: ['чай', 'кафе', 'мляко', 'захар', 'хляб'],  // REPLACE
    },
    {
      id: 'niama',
      title: 'НЯМА',
      icon: '✗',
      correctItems: ['масло', 'мед', 'сирене', 'кашкавал', 'сок'],
    },
  ],
} as DragToColumnsExercise;

export const TEMPLATE_drag_to_columns_3col = {
  id: 'l0X-ex-NN',             // REPLACE
  type: 'drag_to_columns' as const,
  instruction: 'Изберете правилната форма: един, една или едно?',  // REPLACE
  order: 1,                     // REPLACE
  points: 18,                   // REPLACE (= number of items)
  items: [                      // REPLACE — all words to sort
    'баница', 'вода', 'дюнер', 'капучино', 'кафе',
    'кашкавал', 'кроасан', 'масло', 'мед', 'мляко',
    'пица', 'салам', 'сирене', 'сок', 'филия', 'хляб',
    'чай', 'шоколад',
  ],
  columns: [
    {
      id: 'edin',              // ⬅️ swipe LEFT = колона 0
      title: 'ЕДИН (мъжки род)',
      icon: '♂',
      correctItems: ['дюнер', 'кашкавал', 'кроасан', 'мед', 'салам', 'сок', 'хляб', 'чай', 'шоколад'],
    },
    {
      id: 'edna',              // ➡️ swipe RIGHT = колона 1
      title: 'ЕДНА (женски род)',
      icon: '♀',
      correctItems: ['баница', 'вода', 'пица', 'филия'],
    },
    {
      id: 'edno',              // ⬇️ swipe DOWN = колона 2
      title: 'ЕДНО (среден род)',
      icon: '⚬',
      correctItems: ['капучино', 'кафе', 'масло', 'мляко', 'сирене'],
    },
  ],
} as DragToColumnsExercise;


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
 * Потребителят влачи сричките в правилен ред.
 * ВАЖНО: Сричките в `syllables` трябва да са максимално разбъркани —
 * компонентът ги показва ТОЧНО в реда от масива (без shuffle).
 */
export const TEMPLATE_syllable_blocks = {
  id: 'l0X-ex-NN',           // REPLACE
  type: 'syllable_blocks' as const,
  instruction: 'Влачете сричките и ги подредете, за да съставите думи.',  // REPLACE
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
 * БЕЛЕЖКА: При checklist (reading_text с checklist.items) и true_false упражнения,
 * подреждайте верните и грешните СМЕСЕНИ (не първо всички верни, после всички грешни).
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
      // alternateOrders: use when dialogue can be validly arranged in more than one way
      // alternateOrders: [['Добър ден!', 'Как сте?', ...], ['Добър ден!', ...]],
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

/**
 * personal_choice — Двуфазово упражнение: личен избор + граматическа проверка.
 * Фаза 1: Студентът избира Да/Не (лично предпочитание, без грешен отговор).
 * Фаза 2: Въз основа на избора попълва бланка (с правилен/грешен отговор).
 *
 * ИДЕАЛЕН ЗА:
 *   - Предлози с/без (кафе с мляко / без мляко)
 *   - Ситуации в кафене/магазин/ресторант
 *   - Всяко упражнение, комбиниращо лично мнение с граматика
 *
 * СТРУКТУРА НА ITEM:
 *   question:         Въпросът (показан горе, с произношение)
 *   positiveTemplate: Шаблон за отговор при "Да" (с ___ за бланка)
 *   negativeTemplate: Шаблон за отговор при "Не" (с ___ за бланка)
 *   positiveBlank:    Правилната дума за бланката при "Да"
 *   negativeBlank:    Правилната дума за бланката при "Не"
 *
 * model: Показва се отгоре като пример (не е задължителен).
 * blankOptions: Опциите, от които студентът избира (показани като бутони).
 */
export const TEMPLATE_personal_choice = {
  id: 'l0X-ex-NN',             // REPLACE
  type: 'personal_choice' as const,
  title: 'УПРАЖНЕНИЕ 14',       // REPLACE
  instruction: 'Вие сте в кафене. Сервитьорът пита — отговорете и попълнете правилния предлог.', // REPLACE
  order: 1,                     // REPLACE
  points: 5,                    // REPLACE (= number of items)
  model: {                      // REPLACE or remove — optional reference model
    question: 'Искате ли мед в чая?',
    positiveAnswer: 'Да, пия чай с мед.',
    negativeAnswer: 'Не, пия чай без мед.',
  },
  blankOptions: ['с', 'без'],   // REPLACE — the buttons shown for phase 2
  items: [
    {
      id: 'item1',                                       // REPLACE
      question: 'Искате ли захар в кафето?',             // REPLACE
      positiveTemplate: 'Да, пия кафе ___ захар.',       // REPLACE — ___ marks the blank
      negativeTemplate: 'Не, пия кафе ___ захар.',       // REPLACE
      positiveBlank: 'с',                                // REPLACE — correct answer when "Да"
      negativeBlank: 'без',                              // REPLACE — correct answer when "Не"
    },
    {
      id: 'item2',
      question: 'Искате ли мляко в кафето?',
      positiveTemplate: 'Да, пия кафе ___ мляко.',
      negativeTemplate: 'Не, пия кафе ___ мляко.',
      positiveBlank: 'с',
      negativeBlank: 'без',
    },
    // Add more items...
  ],
} as PersonalChoiceExercise;


// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 6 — ИНТЕРАКТИВНИ / АЗБУКА
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * connect_dots — Змия: проследи буквите по азбучен ред.
 * Интерактивно упражнение: ученикът натиска буквите в правилен ред.
 * Буквите са наредени като змия — зигзагообразен път с глава, тяло и опашка.
 *
 * ВИЗУАЛЕН ДИЗАЙН:
 *   - Зелено тяло (дебела SVG линия) с глава (очи + език) и опашка
 *   - Мобилно: 3 колони (вертикална змия, слиза надолу)
 *   - Десктоп: 10 колони (хоризонтална змия)
 *   - Кликнатите букви стават тъмнозелени, следващата пулсира в жълто
 *   - Грешен клик → тресене (animate-shake)
 *
 * КОГА ДА ПОЛЗВАШ:
 *   - Урок 0: Азбука — проследяване на буквите по ред
 *   - Номера по ред (1→2→3→...)
 *   - Всяка последователност, която трябва да се проследи
 *
 * БЕЛЕЖКИ:
 *   - position определя реда (1-based)
 *   - label е текстът, показван в кръгчето
 *   - dots[] се сортират автоматично по position
 *   - Няма points (информативно упражнение)
 */
export const TEMPLATE_connect_dots = {
  id: 'l0X-ex-NN',            // REPLACE
  type: 'connect_dots' as const,
  instruction: 'Проследете змията! Натиснете буквите по азбучен ред.', // REPLACE
  order: 1,                    // REPLACE
  points: 0,
  dots: [
    { id: 'A', label: 'А', position: 1 },
    { id: 'B', label: 'Б', position: 2 },
    { id: 'V', label: 'В', position: 3 },
    { id: 'G', label: 'Г', position: 4 },
    { id: 'D', label: 'Д', position: 5 },
    { id: 'E', label: 'Е', position: 6 },
    // ... continue for all letters/items in the sequence
    // Full Bulgarian alphabet has 30 letters (А→Я)
  ],
} as ConnectDotsExercise;

/**
 * alphabet_maze — Интерактивен лабиринт: намери пътя по азбучен ред.
 * Решетка N×M с букви. Правилният път минава през 30 клетки (азбуката).
 * Останалите клетки са „капани" — грешни букви.
 *
 * ВИЗУАЛЕН ДИЗАЙН:
 *   - Пунктирана линия със стрелки показва общата посока на пътя
 *   - Подсказва коя буква е следваща (пулсира в жълто)
 *   - Верните клетки стават зелени, грешните се тресят
 *   - Зелена линия следва прогреса
 *   - Картинки отгоре (старт) и отдолу (финал) — опционални
 *
 * КОГА ДА ПОЛЗВАШ:
 *   - Урок 0: Азбука — лабиринт с букви
 *   - Всяка решетка, където ученикът трябва да следва път
 *
 * ДИЗАЙН НА РЕШЕТКАТА:
 *   - 6×6 (36 клетки: 30 път + 6 капана) е добър баланс
 *   - Пътят зигзагообразно минава през редовете
 *   - Капаните са на „завоите" — букви, които приличат на верните
 *   - correctPath[] трябва да съдържа само клетки, които са на пътя
 *
 * БЕЛЕЖКИ:
 *   - grid[row][col] = буквата в тази клетка
 *   - correctPath = масив от {row, col} в реда на натискане
 *   - Клетки, които НЕ са в correctPath, се показват по-бледо (капани)
 */
export const TEMPLATE_alphabet_maze = {
  id: 'l0X-ex-NN',            // REPLACE
  type: 'alphabet_maze' as const,
  title: 'УПРАЖНЕНИЕ NN',      // REPLACE
  instruction: 'Намерете пътя в лабиринта.', // REPLACE
  order: 1,                    // REPLACE
  startImageUrl: '/assets/lesson-0X/exercise-NN/start.jpg',  // REPLACE or remove
  endImageUrl: '/assets/lesson-0X/exercise-NN/end.jpg',      // REPLACE or remove
  grid: [
    // 6×6 example: path snakes through, 6 cells are traps
    //               Col0   Col1   Col2   Col3   Col4   Col5
    /* Row 0 → */ ['А',  'Б',  'В',  'Г',  'Д',  'Е'],
    /* Row 1 ← */ ['В',  'К',  'Й',  'И',  'З',  'Ж'],   // (0)=trap
    /* Row 2 → */ ['Г',  'Л',  'М',  'Н',  'О',  'П'],   // (0)=trap
    /* Row 3 ← */ ['Х',  'Ф',  'У',  'Т',  'С',  'Р'],
    /* Row 4 → */ ['Ц',  'Ч',  'Ш',  'Щ',  'Ъ',  'Я'],  // (5)=trap
    /* Row 5 ← */ ['Л',  'О',  'Я',  'Ю',  'Ь',  'Р'],   // (0,1,5)=traps
  ],
  correctPath: [
    // Row 0 → : А Б В Г Д Е
    { row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 },
    { row: 0, col: 3 }, { row: 0, col: 4 }, { row: 0, col: 5 },
    // Row 1 ← : Ж З И Й К
    { row: 1, col: 5 }, { row: 1, col: 4 }, { row: 1, col: 3 },
    { row: 1, col: 2 }, { row: 1, col: 1 },
    // Row 2 → : Л М Н О П
    { row: 2, col: 1 }, { row: 2, col: 2 }, { row: 2, col: 3 },
    { row: 2, col: 4 }, { row: 2, col: 5 },
    // Row 3 ← : Р С Т У Ф Х
    { row: 3, col: 5 }, { row: 3, col: 4 }, { row: 3, col: 3 },
    { row: 3, col: 2 }, { row: 3, col: 1 }, { row: 3, col: 0 },
    // Row 4 → : Ц Ч Ш Щ Ъ
    { row: 4, col: 0 }, { row: 4, col: 1 }, { row: 4, col: 2 },
    { row: 4, col: 3 }, { row: 4, col: 4 },
    // Row 5 ← : Ь Ю Я
    { row: 5, col: 4 }, { row: 5, col: 3 }, { row: 5, col: 2 },
  ],
} as AlphabetMazeExercise;

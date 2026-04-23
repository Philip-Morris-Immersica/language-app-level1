import type {
  Exercise,
  ReadingTextExercise,
  TrueFalseExercise,
  WorkbookFillBlankExercise,
  WordOrderExercise,
  MultipleChoiceExercise,
  SyllableBlocksExercise,
  DialogueBuilderExercise,
} from '@/content/types';

// ═══════════════════════════════════════════════════════════════════════════════
// УПРАЖНЕНИЕ 1 — Слушане (8 т.)
// hideText: true → текстът НЕ се вижда, има Play бутон.
// Без картинки на говорители — текстът е диалог в ресторант.
// ═══════════════════════════════════════════════════════════════════════════════

export const listeningExercises: Exercise[] = [
  {
    id: 't02-sl-text',
    type: 'reading_text',
    title: 'УПРАЖНЕНИЕ 1',
    instruction: 'Изслушайте текста.',
    order: 1,
    hideText: true,
    audioUrl: '/assets/test-a1-2/audio/tts/texts/t02-sl-text-full.mp3',
    images: [{ imageUrl: '/assets/lesson-03/dialogues-2/restorant-finikiya.jpg', label: '' }],
    paragraphs: [
      'Надя, Невена и Адриан са в ресторант „София". Те обядват. Надя яде шопска салата и риба. Тя пие минерална вода. Надя не иска десерт. Невена яде мусака и таратор и пие сок от грозде. Тя много обича сладолед и иска сладолед за десерт. Адриан яде пица и пие айран. За десерт иска плодова салата. Адриан плаща 60 евро. Сметката е 55 евро и 5 евро за бакшиш. Надя, Невена и Адриан много обичат ресторант „София".',
    ],
  } as ReadingTextExercise,

  {
    id: 't02-sl-tf',
    type: 'true_false',
    instruction: 'Прочетете текста и определете дали твърденията са верни (✓) или неверни (✗).',
    order: 2,
    points: 8,
    model: { text: 'Надя, Невена и Адриан са в ресторант „София".', isTrue: true },
    sentences: [
      { id: 's1', text: 'Надя яде шопска салата и мусака.', isTrue: false },
      { id: 's2', text: 'Надя пие минерална вода.', isTrue: true },
      { id: 's3', text: 'Невена пие сок от портокал.', isTrue: false },
      { id: 's4', text: 'Невена иска сладолед за десерт.', isTrue: true },
      { id: 's5', text: 'Адриан иска за десерт плодова салата.', isTrue: true },
      { id: 's6', text: 'Адриан плаща 60 евро.', isTrue: true },
      { id: 's7', text: 'Сметката е 60 евро.', isTrue: false },
      { id: 's8', text: 'Надя, Невена и Адриан много обичат ресторант „София".', isTrue: true },
    ],
  } as TrueFalseExercise,
];

// ═══════════════════════════════════════════════════════════════════════════════
// УПРАЖНЕНИЕ 3 — Четене (7 т.)
// noTranslation: true → без превод, без click-to-speak.
// ═══════════════════════════════════════════════════════════════════════════════

export const readingExercises: Exercise[] = [
  // ─── Текст 1: Мохамед ────────────────────────────────────────────────────
  {
    id: 't02-ch-text1',
    type: 'reading_text',
    title: 'УПРАЖНЕНИЕ 3',
    instruction: 'Прочетете текста.',
    order: 3,
    noTranslation: true,
    paragraphs: [
      'Мохамед е сириец. Той е бежанец и живее в град Пловдив в апартамент до голям пазар. Той купува много плодове. Обича малини, череши, праскови, круши, ягоди и ябълки. Предпочита български плодове. Купува също зеленчуци – краставици, домати, гъби, чушки, тиквички и картофи. Не обича спанак. Мохамед пазарува месо, ориз, сирене, леща, боб, маслини и други продукти от „Лидл".',
    ],
  } as ReadingTextExercise,

  // ─── Упражнение 1: Multiple choice (5 т.) ────────────────────────────────
  {
    id: 't02-ch-mc',
    type: 'multiple_choice',
    instruction: 'Прочетете текста и изберете верния отговор.',
    order: 4,
    points: 5,
    questions: [
      { question: 'Той живее в град', options: ['София', 'Бургас', 'Пловдив'], correctIndex: 2 },
      { question: 'Той обича', options: ['малини', 'банани', 'лимони'], correctIndex: 0 },
      { question: 'Мохамед предпочита', options: ['италиански плодове', 'турски плодове', 'български плодове'], correctIndex: 2 },
      { question: 'Мохамед не обича', options: ['спанак', 'броколи', 'карфиол'], correctIndex: 0 },
      { question: 'Той пазарува от', options: ['„Била"', '„Метро"', '„Лидл"'], correctIndex: 2 },
    ],
  } as MultipleChoiceExercise,

  // ─── Текст 2: Диалог — плодове на пазара ─────────────────────────────────
  {
    id: 't02-ch-text2',
    type: 'reading_text',
    instruction: 'Прочетете диалога и отговорете на въпросите.',
    order: 5,
    noTranslation: true,
    images: [
      { imageUrl: '/assets/test-a1-2/chetene/praskovi-i-limon.jpg', label: 'Праскови и лимон' },
    ],
    paragraphs: [
      '– Здравейте, колко струва един килограм лимони?\n– 2,50 €.\n– Един килограм лимони и два килограма праскови, моля.\n– Заповядайте. Сметката е 8,50 €. Искате ли торбичка?\n– Не, благодаря, имам. Ето 10 евро.\n– Благодаря, ето рестото.',
    ],
  } as ReadingTextExercise,

  // ─── Упражнение 2: Попълнете с верния отговор (2 т.) ─────────────────────
  {
    id: 't02-ch-fill',
    type: 'workbook_fill_blank',
    instruction: 'Прочетете диалога и отговорете на въпросите.',
    order: 6,
    points: 2,
    layout: 'single',
    sentences: [
      {
        text: 'Колко струва един килограм праскови? — _______',
        blanks: [6],
        correctAnswers: ['3,00 €'],
        options: ['3,00 €', '2,50 €', '1,50 €', '4,00 €'],
      },
      {
        text: 'Колко е рестото? — _______',
        blanks: [4],
        correctAnswers: ['1,50 €'],
        options: ['1,50 €', '0,50 €', '2,00 €', '3,00 €'],
      },
    ],
  } as WorkbookFillBlankExercise,
];

// ═══════════════════════════════════════════════════════════════════════════════
// УПРАЖНЕНИЯ 7–12 — Граматика (52 т.)
// Всички workbook_fill_blank ЗАДЪЛЖИТЕЛНО имат options (падащо меню).
// ═══════════════════════════════════════════════════════════════════════════════

export const grammarExercises: Exercise[] = [

  // ─── Визуален контекст: ЯМ / ПИЯ (двете картинки) ───────────────────────
  {
    id: 't02-gr-ctx1',
    type: 'reading_text',
    title: 'УПРАЖНЕНИЕ 7',
    instruction: '',
    order: 7,
    noTranslation: true,
    images: [
      { imageUrl: '/assets/test-a1-2/gramatika/momche-yade.jpg', label: 'ям' },
      { imageUrl: '/assets/test-a1-2/gramatika/momche-pie.jpg', label: 'пия' },
    ],
    paragraphs: [],
  } as ReadingTextExercise,

  // ─── Упражнение 1: Глаголи ЯМ и ПИЯ (10 т.) ─────────────────────────────
  {
    id: 't02-gr-1',
    type: 'workbook_fill_blank',
    instruction: 'Поставете глаголите ЯМ и ПИЯ в правилната форма.',
    order: 8,
    points: 10,
    layout: 'single',
    sentences: [
      { text: 'Той яде пиле с ориз.', blanks: [], correctAnswers: [], isExample: true },
      {
        text: 'Ние _______ сок.',
        blanks: [1],
        correctAnswers: ['пием'],
        options: ['ям', 'ядеш', 'яде', 'ядем', 'ядете', 'ядат', 'пия', 'пиеш', 'пие', 'пием', 'пиете', 'пият'],
      },
      {
        text: 'Вие _______ пилешко месо.',
        blanks: [1],
        correctAnswers: ['ядете'],
        options: ['ям', 'ядеш', 'яде', 'ядем', 'ядете', 'ядат', 'пия', 'пиеш', 'пие', 'пием', 'пиете', 'пият'],
      },
      {
        text: 'Анета _______ кафе с мляко.',
        blanks: [1],
        correctAnswers: ['пие'],
        options: ['ям', 'ядеш', 'яде', 'ядем', 'ядете', 'ядат', 'пия', 'пиеш', 'пие', 'пием', 'пиете', 'пият'],
      },
      {
        text: 'Аз _______ черен чай.',
        blanks: [1],
        correctAnswers: ['пия'],
        options: ['ям', 'ядеш', 'яде', 'ядем', 'ядете', 'ядат', 'пия', 'пиеш', 'пие', 'пием', 'пиете', 'пият'],
      },
      {
        text: 'Те _______ пържени картофи.',
        blanks: [1],
        correctAnswers: ['ядат'],
        options: ['ям', 'ядеш', 'яде', 'ядем', 'ядете', 'ядат', 'пия', 'пиеш', 'пие', 'пием', 'пиете', 'пият'],
      },
      {
        text: 'Ние не _______ телешко месо.',
        blanks: [2],
        correctAnswers: ['ядем'],
        options: ['ям', 'ядеш', 'яде', 'ядем', 'ядете', 'ядат', 'пия', 'пиеш', 'пие', 'пием', 'пиете', 'пият'],
      },
      {
        text: 'Вие не _______ кока-кола.',
        blanks: [2],
        correctAnswers: ['пиете'],
        options: ['ям', 'ядеш', 'яде', 'ядем', 'ядете', 'ядат', 'пия', 'пиеш', 'пие', 'пием', 'пиете', 'пият'],
      },
      {
        text: 'Те не _______ билков чай.',
        blanks: [2],
        correctAnswers: ['пият'],
        options: ['ям', 'ядеш', 'яде', 'ядем', 'ядете', 'ядат', 'пия', 'пиеш', 'пие', 'пием', 'пиете', 'пият'],
      },
      {
        text: 'Тя не _______ агнешко месо.',
        blanks: [2],
        correctAnswers: ['яде'],
        options: ['ям', 'ядеш', 'яде', 'ядем', 'ядете', 'ядат', 'пия', 'пиеш', 'пие', 'пием', 'пиете', 'пият'],
      },
      {
        text: 'Ти _______ лимонада.',
        blanks: [1],
        correctAnswers: ['пиеш'],
        options: ['ям', 'ядеш', 'яде', 'ядем', 'ядете', 'ядат', 'пия', 'пиеш', 'пие', 'пием', 'пиете', 'пият'],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ─── Упражнение 2: Попълнете колоните (22 т.) ────────────────────────────
  {
    id: 't02-gr-2',
    type: 'workbook_fill_blank',
    instruction: 'Попълнете колоните.',
    order: 9,
    points: 22,
    layout: 'two-column',
    imageUrl: '/assets/test-a1-2/gramatika/yabalka.jpg',
    sentences: [
      { text: 'една краставица — много краставици', blanks: [], correctAnswers: [], isExample: true }, // model already has "много"
      {
        text: '_____ домат — _____',
        blanks: [0, 3],
        correctAnswers: ['един', 'домати'],
        options: [['един', 'една', 'едно'], ['домати', 'домата', 'доматки', 'домате']],
      },
      {
        text: '_____ _____ — чушки',
        blanks: [0, 1],
        correctAnswers: ['една', 'чушка'],
        options: [['един', 'една', 'едно'], ['чушка', 'чушко', 'чушки', 'чушкa']],
      },
      {
        text: '_____ салата — _____',
        blanks: [0, 3],
        correctAnswers: ['една', 'салати'],
        options: [['един', 'една', 'едно'], ['салати', 'салата', 'салатки', 'салатa']],
      },
      {
        text: '_____ килограм — _____',
        blanks: [0, 3],
        correctAnswers: ['един', 'килограми'],
        options: [['един', 'една', 'едно'], ['килограми', 'килограма', 'килограмки', 'килограмa']],
      },
      {
        text: '_____ пиле — _____',
        blanks: [0, 3],
        correctAnswers: ['едно', 'пилета'],
        options: [['един', 'една', 'едно'], ['пилета', 'пилето', 'пиленца', 'пилеса']],
      },
      {
        text: '_____ _____ — картофи',
        blanks: [0, 1],
        correctAnswers: ['един', 'картоф'],
        options: [['един', 'една', 'едно'], ['картоф', 'картофа', 'картофи', 'картофки']],
      },
      {
        text: '_____ пакет — _____',
        blanks: [0, 3],
        correctAnswers: ['един', 'пакети'],
        options: [['един', 'една', 'едно'], ['пакети', 'пакета', 'пакетки', 'пакете']],
      },
      {
        text: '_____ _____ — шишчета',
        blanks: [0, 1],
        correctAnswers: ['едно', 'шишче'],
        options: [['един', 'една', 'едно'], ['шишче', 'шишчи', 'шишча', 'шишчета']],
      },
      {
        text: '_____ лимон — _____',
        blanks: [0, 3],
        correctAnswers: ['един', 'лимони'],
        options: [['един', 'една', 'едно'], ['лимони', 'лимона', 'лимоне', 'лимонки']],
      },
      {
        text: '_____ кюфте — _____',
        blanks: [0, 3],
        correctAnswers: ['едно', 'кюфтета'],
        options: [['един', 'една', 'едно'], ['кюфтета', 'кюфте', 'кюфтени', 'кюфтенца']],
      },
      {
        text: '_____ яйце — _____',
        blanks: [0, 3],
        correctAnswers: ['едно', 'яйца'],
        options: [['един', 'една', 'едно'], ['яйца', 'яйцата', 'яйцe', 'яйченца']],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ─── Упражнение 3: КАКЪВ / КАКВА / КАКВО / КАКВИ (8 т.) ──────────────────
  {
    id: 't02-gr-3',
    type: 'workbook_fill_blank',
    instruction: 'Изберете правилната въпросителна дума – какъв, каква, какво или какви.',
    order: 10,
    points: 8,
    layout: 'single',
    imageUrl: '/assets/test-a1-2/gramatika/chashi-sok.jpg',
    sentences: [
      { text: '_____ сок искате?', blanks: [0], correctAnswers: ['Какъв'], isExample: true },
      {
        text: '_____ плодове купувате?',
        blanks: [0],
        correctAnswers: ['Какви'],
        options: ['Какъв', 'Каква', 'Какво', 'Какви'],
      },
      {
        text: '_____ месо ядете?',
        blanks: [0],
        correctAnswers: ['Какво'],
        options: ['Какъв', 'Каква', 'Какво', 'Какви'],
      },
      {
        text: '_____ чай предпочитате?',
        blanks: [0],
        correctAnswers: ['Какъв'],
        options: ['Какъв', 'Каква', 'Какво', 'Какви'],
      },
      {
        text: '_____ супа искаш?',
        blanks: [0],
        correctAnswers: ['Каква'],
        options: ['Какъв', 'Каква', 'Какво', 'Какви'],
      },
      {
        text: '_____ зеленчуци не ядете?',
        blanks: [0],
        correctAnswers: ['Какви'],
        options: ['Какъв', 'Каква', 'Какво', 'Какви'],
      },
      {
        text: '_____ сирене купуваш?',
        blanks: [0],
        correctAnswers: ['Какво'],
        options: ['Какъв', 'Каква', 'Какво', 'Какви'],
      },
      {
        text: '_____ кафе иска Симона?',
        blanks: [0],
        correctAnswers: ['Какво'],
        options: ['Какъв', 'Каква', 'Какво', 'Какви'],
      },
      {
        text: '_____ пица обичаш?',
        blanks: [0],
        correctAnswers: ['Каква'],
        options: ['Какъв', 'Каква', 'Какво', 'Какви'],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ─── Упражнение 4: Подредете диалога (6 т.) ──────────────────────────────
  {
    id: 't02-gr-4',
    type: 'dialogue_builder',
    title: 'УПРАЖНЕНИЕ 11',
    instruction: 'Наредете репликите в правилен ред.',
    order: 11,
    points: 6,
    imageUrl: '/assets/test-a1-2/gramatika/palachinki.jpg',
    sections: [
      {
        id: 'а',
        givenFirstLine: '– Здравейте, едно капучино без захар, моля.',
        sentences: [
          '– Здравейте, едно капучино без захар, моля.',
          '– Нещо за ядене?',
          '– Да. Има ли палачинки?',
          '– Да, има палачинки с шоколад.',
          '– Чудесно, една палачинка.',
          '– Нещо друго?',
          '– Не, благодаря. Това е всичко.',
        ],
      },
    ],
  } as DialogueBuilderExercise,

  // ─── Упражнение 5: Подредете думите в изречения (6 т.) ───────────────────
  {
    id: 't02-gr-5',
    type: 'word_order',
    instruction: 'Подредете думите в изречения.',
    order: 12,
    points: 6,
    questions: [
      {
        words: ['меню', 'ли', 'едно', 'Може', '?'],
        correctSentence: 'Може ли едно меню ?',
      },
      {
        words: ['струва', 'пица', 'Колко', '„Маргарита"', '?'],
        correctSentence: 'Колко струва пица „Маргарита" ?',
      },
      {
        words: ['е', 'Съжалявам,', 'заето', '.'],
        correctSentence: 'Съжалявам, заето е .',
      },
      {
        words: ['за', 'Нещо', 'пиене', '?'],
        correctSentence: 'Нещо за пиене ?',
      },
      {
        words: ['евро', '5', 'Сметката', 'е', '.'],
        correctSentence: 'Сметката е 5 евро .',
      },
      {
        words: ['Ето', 'точно', 'парите', '.'],
        correctSentence: 'Ето точно парите .',
      },
    ],
  } as WordOrderExercise,
];

// ═══════════════════════════════════════════════════════════════════════════════
// УПРАЖНЕНИЕ 13–14 — Писане (10 т.)
// reading_text показва кошницата голяма веднъж в началото.
// syllable_blocks — без imageUrl per puzzle (само буквени блокчета).
// Буквите са в фиксиран ред (не случаен шъфъл): 1-вата буква/сричка накрая.
// ═══════════════════════════════════════════════════════════════════════════════

export const writingExercises: Exercise[] = [
  // ─── Кошницата — показва се веднъж голяма преди пъзелите ─────────────────
  {
    id: 't02-pi-img',
    type: 'reading_text',
    title: 'УПРАЖНЕНИЕ 13',
    instruction: '',
    order: 13,
    noTranslation: true,
    images: [
      { imageUrl: '/assets/test-a1-2/pisane/koshnica.jpg', label: '' },
    ],
    paragraphs: [],
  } as ReadingTextExercise,

  // ─── Пъзели: само буквени блокчета, без снимки ────────────────────────────
  {
    id: 't02-pi-spell',
    type: 'syllable_blocks',
    instruction: 'Подредете буквите/сричките, за да съставите дума или израз.',
    order: 14,
    points: 10,
    columns: 3,
    puzzles: [
      { id: 'p-yaytsa',      syllables: ['ц', 'я', 'а', 'й'],           correctWord: 'яйца' },
      { id: 'p-hlyab',       syllables: ['я', 'б', 'х', 'л'],           correctWord: 'хляб' },
      { id: 'p-banani',      syllables: ['ни', 'ба', 'на'],             correctWord: 'банани' },
      { id: 'p-mlyako',      syllables: ['к', 'о', 'м', 'л', 'я'],     correctWord: 'мляко' },
      { id: 'p-patladjan',   syllables: ['жан', 'пат', 'лад'],          correctWord: 'патладжан' },
      { id: 'p-marulya',     syllables: ['ля', 'ма', 'ру'],             correctWord: 'маруля' },
      { id: 'p-krastavitsa', syllables: ['ви', 'ца', 'крас', 'та'],     correctWord: 'краставица' },
      { id: 'p-domat',       syllables: ['м', 'т', 'а', 'д', 'о'],     correctWord: 'домат' },
      { id: 'p-limon',       syllables: ['о', 'л', 'н', 'м', 'и'],     correctWord: 'лимон' },
      { id: 'p-yabylka',     syllables: ['ка', 'я', 'бъл'],             correctWord: 'ябълка' },
    ],
  } as SyllableBlocksExercise,
];

// ═══════════════════════════════════════════════════════════════════════════════
// Всички упражнения (плосък масив)
// ═══════════════════════════════════════════════════════════════════════════════

export const exercises: Exercise[] = [
  ...listeningExercises,
  ...readingExercises,
  ...grammarExercises,
  ...writingExercises,
];

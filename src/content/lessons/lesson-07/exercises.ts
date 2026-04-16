import type {
  Exercise,
  ImageLabelingExercise,
  IllustratedCardsExercise,
  WorkbookFillBlankExercise,
  MatchPairsExercise,
  SyllableBlocksExercise,
  GrammarTableExercise,
  DialoguesExercise,
  GrammarExamplesExercise,
  TableFillExercise,
  PersonalChoiceExercise,
  FillInBlankExercise,
  DropdownMatchExercise,
  TrueFalseExercise,
  ReadingTextExercise,
} from '@/content/types';

// Урок 7 — по клиент НЕ се дигитализират:
// Упр. 8, 9 (по двойки — диалози), 16 (по двойки — времето),
// Упр. 20, 21 (по двойки — диалози 2), Упр. 24, 25 (по двойки — диалози 3),
// Упр. 29, 30 (по двойки — диалози 4)

export const exercises: Exercise[] = [

  // ──────────────────────────────────────────────────────────
  // СТРАНИЦА 65
  // ──────────────────────────────────────────────────────────

  // ORDER 1: Упр. 1 — Напишете поздравите под картинките
  {
    id: 'l07-ex-01',
    type: 'image_labeling',
    title: 'УПРАЖНЕНИЕ 1',
    instruction: 'Изберете правилния поздрав под всяка картинка.',
    order: 1,
    points: 4,
    displayType: 'default',
    images: [
      { id: 'utro',   imageUrl: '/assets/lesson-07/01-upr-01-pozdravi-pod-kartinki/01-dobro-utro.jpg',   correctLabel: 'Добро утро!'  },
      { id: 'den',    imageUrl: '/assets/lesson-07/01-upr-01-pozdravi-pod-kartinki/02-dobru-den.jpg',    correctLabel: 'Добър ден!'   },
      { id: 'vecher', imageUrl: '/assets/lesson-07/01-upr-01-pozdravi-pod-kartinki/03-dobru-vecher.jpg', correctLabel: 'Добър вечер!' },
      { id: 'nosht',  imageUrl: '/assets/lesson-07/01-upr-01-pozdravi-pod-kartinki/04-leka-nosht.jpg',   correctLabel: 'Лека нощ!'    },
    ],
    options: ['Добро утро!', 'Добър ден!', 'Добър вечер!', 'Лека нощ!'],
  } as ImageLabelingExercise,

  // ORDER 2: НОВИ ДУМИ 1 — Календар: ден, седмица, месец, година
  {
    id: 'l07-novi-dumi-01',
    type: 'illustrated_cards',
    title: 'НОВИ ДУМИ 1',
    instruction: 'Натиснете за произношение.',
    order: 2,
    cards: [
      { id: 'kalendar', imageUrl: '/assets/lesson-07/02-novi-dumi-1-kalendar-dni/01-kalendar-yanuari.jpg', label: 'календар' },
      { id: 'den-nd1',  imageUrl: '', label: 'ден' },
      { id: 'sedmitsa', imageUrl: '', label: 'седмица' },
      { id: 'mesets',   imageUrl: '', label: 'месец' },
      { id: 'godina',   imageUrl: '', label: 'година' },
    ],
  } as IllustratedCardsExercise,

  // ORDER 3: Упр. 2 — Отговорете на въпросите
  {
    id: 'l07-ex-02',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 2',
    instruction: 'Напишете отговорите на въпросите.',
    order: 3,
    points: 4,
    layout: 'single',
    sentences: [
      {
        text: 'Колко дни има една седмица? | Една седмица има _______ дни.',
        blanks: [1],
        correctAnswers: ['седем'],
        isExample: true,
      },
      {
        text: 'Колко седмици има един месец? | Един месец има _______ седмици.',
        blanks: [1],
        correctAnswers: ['четири'],
      },
      {
        text: 'Колко месеца има една година? | Една година има _______ месеца.',
        blanks: [1],
        correctAnswers: ['дванайсет', 'дванадесет'],
      },
      {
        text: 'Колко дни има един месец? | Един месец има _______ дни.',
        blanks: [1],
        correctAnswers: ['тридесет', 'трийсет'],
      },
      {
        text: 'Колко дни има една година? | Една година има _______ дни.',
        blanks: [1],
        correctAnswers: ['триста шейсет и пет', '365'],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ORDER 4: НОВИ ДУМИ 2 — Дни на седмицата
  {
    id: 'l07-novi-dumi-02',
    type: 'illustrated_cards',
    title: 'НОВИ ДУМИ 2',
    subtitle: 'Кой ден е днес?',
    instruction: 'Натиснете за произношение.',
    order: 4,
    cards: [
      { id: 'ponedelnik', imageUrl: '', label: 'понеделник' },
      { id: 'vtornik',    imageUrl: '', label: 'вторник'    },
      { id: 'sryada',     imageUrl: '', label: 'сряда'      },
      { id: 'chetvartuk', imageUrl: '', label: 'четвъртък'  },
      { id: 'petuk',      imageUrl: '', label: 'петък'      },
      { id: 'sabota',     imageUrl: '', label: 'събота'     },
      { id: 'nedelya',    imageUrl: '', label: 'неделя'     },
    ],
  } as IllustratedCardsExercise,

  // ORDER 5: Упр. 3 — Свържете колонките (числа 1–7 → дни на седмицата)
  {
    id: 'l07-ex-03',
    type: 'match_pairs',
    title: 'УПРАЖНЕНИЕ 3',
    instruction: 'Свържете числата с дните на седмицата.',
    order: 5,
    points: 7,
    pairs: [
      { id: 'p1', left: '1', correctRight: 'понеделник' },
      { id: 'p2', left: '2', correctRight: 'вторник'    },
      { id: 'p3', left: '3', correctRight: 'сряда'      },
      { id: 'p4', left: '4', correctRight: 'четвъртък'  },
      { id: 'p5', left: '5', correctRight: 'петък'      },
      { id: 'p6', left: '6', correctRight: 'събота'     },
      { id: 'p7', left: '7', correctRight: 'неделя'     },
    ],
  } as MatchPairsExercise,

  // ORDER 6: Упр. 4 — Подредете сричките в думи (дни на седмицата)
  {
    id: 'l07-ex-04',
    type: 'syllable_blocks',
    title: 'УПРАЖНЕНИЕ 4',
    instruction: 'Влачете сричките и ги подредете, за да съставите дните на седмицата.',
    order: 6,
    points: 7,
    puzzles: [
      { id: 'ponedelnik', syllables: ['НИК', 'ДЕ', 'ПО', 'НЕ', 'ЛЪ'],     correctWord: 'ПОНЕДЕЛНИК' },
      { id: 'vtornik',    syllables: ['НИК', 'ТОР', 'ВЪ'],                  correctWord: 'ВТОРНИК'    },
      { id: 'sryada',     syllables: ['ДА', 'СРЯ'],                          correctWord: 'СРЯДА'      },
      { id: 'chetvartuk', syllables: ['ТЪК', 'ЧЕТ', 'ВЪР'],                correctWord: 'ЧЕТВЪРТЪК'  },
      { id: 'petuk',      syllables: ['ТЪК', 'ПЕ'],                          correctWord: 'ПЕТЪК'      },
      { id: 'sabota',     syllables: ['ТА', 'БО', 'СЪ'],                    correctWord: 'СЪБОТА'     },
      { id: 'nedelya',    syllables: ['ЛЯ', 'НЕ', 'ДЕ'],                    correctWord: 'НЕДЕЛЯ'     },
    ],
  } as SyllableBlocksExercise,

  // ──────────────────────────────────────────────────────────
  // СТРАНИЦА 66
  // ──────────────────────────────────────────────────────────

  // ORDER 7: НОВИ ДУМИ 3 — Месеците
  {
    id: 'l07-novi-dumi-03',
    type: 'illustrated_cards',
    title: 'НОВИ ДУМИ 3',
    instruction: 'Натиснете за произношение.',
    order: 7,
    cards: [
      { id: 'yanuari',  imageUrl: '/assets/lesson-07/07-novi-dumi-3-mesetsi/01-lenta-mesetsi.jpg', label: 'януари'   },
      { id: 'fevruari', imageUrl: '', label: 'февруари'  },
      { id: 'mart',     imageUrl: '', label: 'март'      },
      { id: 'april',    imageUrl: '', label: 'април'     },
      { id: 'may',      imageUrl: '', label: 'май'       },
      { id: 'yuni',     imageUrl: '', label: 'юни'       },
      { id: 'yuli',     imageUrl: '', label: 'юли'       },
      { id: 'avgust',   imageUrl: '', label: 'август'    },
      { id: 'septemvri',imageUrl: '', label: 'септември' },
      { id: 'oktomvri', imageUrl: '', label: 'октомври'  },
      { id: 'noemvri',  imageUrl: '', label: 'ноември'   },
      { id: 'dekemvri', imageUrl: '', label: 'декември'  },
    ],
  } as IllustratedCardsExercise,

  // ORDER 8: Упр. 5 — Подредете месеците (свържете номер → месец)
  {
    id: 'l07-ex-05',
    type: 'match_pairs',
    title: 'УПРАЖНЕНИЕ 5',
    instruction: 'Свържете числото с правилния месец.',
    order: 8,
    points: 11,
    pairs: [
      { id: 'p01', left: '1',  correctRight: 'януари'   },
      { id: 'p02', left: '2',  correctRight: 'февруари' },
      // 3 март е модел в учебника
      { id: 'p04', left: '4',  correctRight: 'април'    },
      { id: 'p05', left: '5',  correctRight: 'май'      },
      { id: 'p06', left: '6',  correctRight: 'юни'      },
      { id: 'p07', left: '7',  correctRight: 'юли'      },
      { id: 'p08', left: '8',  correctRight: 'август'   },
      { id: 'p09', left: '9',  correctRight: 'септември'},
      { id: 'p10', left: '10', correctRight: 'октомври' },
      { id: 'p11', left: '11', correctRight: 'ноември'  },
      { id: 'p12', left: '12', correctRight: 'декември' },
    ],
  } as MatchPairsExercise,

  // ORDER 9: ГРАМАТИКА 1 — Редни числителни 1–10
  {
    id: 'l07-gramatika-01',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 1',
    subtitle: 'Редни числителни имена',
    instruction: 'Запознайте се с редните числителни. Натиснете върху ред за произношение.',
    instructionKey: 'grammar.l07.g1.instruction',
    order: 9,
    tableTitle: 'Редни числителни',
    columns: ['м.р.', 'ж.р.', 'ср.р.', 'мн.ч.'],
    rows: [
      { pronoun: '1', cells: ['първи',    'първа',    'първо',    'първи'    ] },
      { pronoun: '2', cells: ['втори',    'втора',    'второ',    'втори'    ] },
      { pronoun: '3', cells: ['трети',    'трета',    'трето',    'трети'    ] },
      { pronoun: '4', cells: ['четвърти', 'четвърта', 'четвърто', 'четвърти' ] },
      { pronoun: '5', cells: ['пети',     'пета',     'пето',     'пети'     ] },
      { pronoun: '6', cells: ['шести',    'шеста',    'шесто',    'шести'    ] },
      { pronoun: '7', cells: ['седми',    'седма',    'седмо',    'седми'    ] },
      { pronoun: '8', cells: ['осми',     'осма',     'осмо',     'осми'     ] },
      { pronoun: '9', cells: ['девети',   'девета',   'девето',   'девети'   ] },
      { pronoun: '10',cells: ['десети',   'десета',   'десето',   'десети'   ] },
    ],
    notes: [
      'Дата: 10 август 2023 г. = десети август две хиляди двайсет и трета година',
    ],
  } as GrammarTableExercise,

  // ORDER 10: Упр. 6 — Свържете думите с числата
  {
    id: 'l07-ex-06',
    type: 'match_pairs',
    title: 'УПРАЖНЕНИЕ 6',
    instruction: 'Свържете редните числителни с цифрите.',
    order: 10,
    points: 10,
    pairs: [
      { id: 'p1', left: 'осми',     correctRight: '8'  },
      { id: 'p2', left: 'пети',     correctRight: '5'  },
      { id: 'p3', left: 'първи',    correctRight: '1'  },
      { id: 'p4', left: 'десети',   correctRight: '10' },
      { id: 'p5', left: 'втори',    correctRight: '2'  },
      { id: 'p6', left: 'четвърти', correctRight: '4'  },
      { id: 'p7', left: 'трети',    correctRight: '3'  },
      { id: 'p8', left: 'седми',    correctRight: '7'  },
      { id: 'p9', left: 'девети',   correctRight: '9'  },
      { id: 'p10',left: 'шести',    correctRight: '6'  },
    ],
  } as MatchPairsExercise,

  // ORDER 11: Упр. 7 — Напишете думите в правилната редна форма
  {
    id: 'l07-ex-07',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 7',
    instruction: 'Напишете редното числително в правилната форма.',
    order: 11,
    points: 9,
    layout: 'two-column',
    sentences: [
      {
        text: 'Модел: _______ кафе (1)',
        blanks: [0],
        correctAnswers: ['първо'],
        isExample: true,
      },
      {
        text: '_______ чай (4)',
        blanks: [0],
        correctAnswers: ['четвърти'],
      },
      {
        text: '_______ сладолед (3)',
        blanks: [0],
        correctAnswers: ['трети'],
      },
      {
        text: '_______ салата (2)',
        blanks: [0],
        correctAnswers: ['втора'],
      },
      {
        text: '_______ ден (10)',
        blanks: [0],
        correctAnswers: ['десети'],
      },
      {
        text: '_______ седмица (8)',
        blanks: [0],
        correctAnswers: ['осма'],
      },
      {
        text: '_______ дете (6)',
        blanks: [0],
        correctAnswers: ['шесто'],
      },
      {
        text: '_______ сандвич (5)',
        blanks: [0],
        correctAnswers: ['пети'],
      },
      {
        text: '_______ месец (7)',
        blanks: [0],
        correctAnswers: ['седми'],
      },
      {
        text: '_______ година (9)',
        blanks: [0],
        correctAnswers: ['девета'],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ORDER 12: ДИАЛОЗИ 1 — Ден и дата
  {
    id: 'l07-dialozi-01',
    type: 'dialogues',
    title: 'ДИАЛОЗИ 1',
    instruction: 'Натиснете реплика, за да чуете произношението. После повторете на глас.',
    instructionKey: 'exercise.clickLineToListen',
    order: 12,
    sections: [
      {
        id: 'а.',
        lines: [
          { text: '– Кой ден е днес?',       voiceGender: 'female' },
          { text: '– Днес е понеделник.',     voiceGender: 'male'   },
          { text: '– А утре?',                voiceGender: 'female' },
          { text: '– Утре е вторник.',        voiceGender: 'male'   },
        ],
      },
      {
        id: 'б.',
        lines: [
          { text: '– Коя дата е днес?',                                voiceGender: 'female' },
          { text: '– Днес е девети декември. Имам рожден ден.', voiceGender: 'male'   },
          { text: '– Честит рожден ден!',                              voiceGender: 'female' },
        ],
      },
    ],
  } as DialoguesExercise,

  // SKIP Упр. 8 — Прочетете диалозите по двойки (клиент)
  // SKIP Упр. 9 — Работете по двойки (клиент)

  // ──────────────────────────────────────────────────────────
  // СТРАНИЦА 67
  // ──────────────────────────────────────────────────────────

  // ORDER 13: НОВИ ДУМИ 4 — Какво е времето днес?
  {
    id: 'l07-novi-dumi-04',
    type: 'illustrated_cards',
    title: 'НОВИ ДУМИ 4',
    subtitle: 'Какво е времето днес?',
    instruction: 'Натиснете за произношение.',
    order: 13,
    cards: [
      { id: 'studeno',   imageUrl: '', label: 'Студено е.',  sublabels: ['0°C'] },
      { id: 'hladno',    imageUrl: '', label: 'Хладно е.',   sublabels: ['10°C'] },
      { id: 'toplo',     imageUrl: '', label: 'Топло е.',    sublabels: ['20°C'] },
      { id: 'goreshto',  imageUrl: '', label: 'Горещо е.',   sublabels: ['30°C'] },
      { id: 'slanchevo', imageUrl: '', label: 'Слънчево е.', sublabels: ['Има слънце.'] },
      { id: 'oblachno',  imageUrl: '', label: 'Облачно е.',  sublabels: ['Има облаци.'] },
      { id: 'dazhd',     imageUrl: '', label: 'Дъждовно е.', sublabels: ['Вали дъжд.'] },
      { id: 'snyag',     imageUrl: '', label: 'Вали сняг.',  sublabels: [] },
      { id: 'vetrovito', imageUrl: '', label: 'Ветровито е.',sublabels: ['Има вятър.'] },
      { id: 'magliovo',  imageUrl: '/assets/lesson-07/15-novi-dumi-4-vreme-gradus/01-ikona-magla.jpg', label: 'Мъгливо е.', sublabels: ['Има мъгла.'] },
    ],
  } as IllustratedCardsExercise,

  // ORDER 14: Упр. 10 — Свържете колонките (Има облаци → Облачно е.)
  {
    id: 'l07-ex-10',
    type: 'match_pairs',
    title: 'УПРАЖНЕНИЕ 10',
    instruction: 'Свържете изразите от двете колони.',
    order: 14,
    points: 5,
    pairs: [
      { id: 'p1', left: 'Има облаци.', correctRight: 'Облачно е.'  },
      { id: 'p2', left: 'Има мъгла.',  correctRight: 'Мъгливо е.'  },
      { id: 'p3', left: 'Има слънце.', correctRight: 'Слънчево е.' },
      { id: 'p4', left: 'Има вятър.',  correctRight: 'Ветровито е.'},
      { id: 'p5', left: 'Има дъжд.',   correctRight: 'Дъждовно е.' },
    ],
  } as MatchPairsExercise,

  // ORDER 15: Упр. 11 — Напишете какво е времето на картинките
  {
    id: 'l07-ex-11',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 11',
    instruction: 'Попълнете празните места с думи от списъка: вятър, дъжд, мъгла, облаци, слънце, сняг.',
    order: 15,
    points: 6,
    layout: 'single',
    sentences: [
      {
        images: ['/assets/lesson-07/17-upr-11-kartinki-vreme/01-slantse-pateka.jpg'],
        text: 'Грее _______ и има _______.',
        blanks: [1, 4],
        correctAnswers: ['слънце', 'облаци'],
        options: ['вятър', 'дъжд', 'мъгла', 'облаци', 'слънце', 'сняг'],
      },
      {
        images: ['/assets/lesson-07/17-upr-11-kartinki-vreme/02-dazhd-vyatur.jpg'],
        text: 'Духа _______ и вали _______.',
        blanks: [1, 4],
        correctAnswers: ['вятър', 'дъжд'],
        options: ['вятър', 'дъжд', 'мъгла', 'облаци', 'слънце', 'сняг'],
      },
      {
        images: ['/assets/lesson-07/17-upr-11-kartinki-vreme/03-snyag-snezhen-chovek.jpg'],
        text: 'Вали _______ и има _______.',
        blanks: [1, 4],
        correctAnswers: ['сняг', 'мъгла'],
        options: ['вятър', 'дъжд', 'мъгла', 'облаци', 'слънце', 'сняг'],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ORDER 16: НОВИ ДУМИ 5 — Сезони
  {
    id: 'l07-novi-dumi-05',
    type: 'illustrated_cards',
    title: 'НОВИ ДУМИ 5',
    subtitle: 'В България има четири сезона.',
    instruction: 'Натиснете за произношение.',
    order: 16,
    cards: [
      { id: 'prolet', imageUrl: '/assets/lesson-07/18-novi-dumi-5-sezoni-darva/01-prolet-darvo.jpg', label: 'пролет' },
      { id: 'lyato',  imageUrl: '/assets/lesson-07/18-novi-dumi-5-sezoni-darva/02-lyato-darvo.jpg',  label: 'лято'   },
      { id: 'esen',   imageUrl: '/assets/lesson-07/18-novi-dumi-5-sezoni-darva/03-esen-darvo.jpg',   label: 'есен'   },
      { id: 'zima',   imageUrl: '/assets/lesson-07/18-novi-dumi-5-sezoni-darva/04-zima-darvo.jpg',   label: 'зима'   },
    ],
  } as IllustratedCardsExercise,

  // ──────────────────────────────────────────────────────────
  // СТРАНИЦА 68
  // ──────────────────────────────────────────────────────────

  // ORDER 17: Упр. 12 — Попълнете месеците в таблицата по сезони
  {
    id: 'l07-ex-12',
    type: 'table_fill',
    title: 'УПРАЖНЕНИЕ 12',
    instruction: 'Попълнете празните места в таблицата.',
    order: 17,
    points: 8,
    paragraphs: [],
    tables: [
      {
        name: '',
        columns: ['зима', 'пролет', 'лято', 'есен'],
        rows: [
          {
            label: '1',
            cells: [
              { correctAnswers: ['декември'],  options: ['декември', 'януари', 'февруари', 'март', 'юни', 'септември'] },
              { correctAnswers: ['март'],      options: ['март', 'април', 'май', 'юни', 'декември'] },
              { correctAnswers: ['юни'],       options: ['юни', 'юли', 'август', 'март', 'декември'] },
              { correctAnswers: ['септември'], options: ['септември', 'октомври', 'ноември', 'март', 'юни'] },
            ],
          },
          {
            label: '2',
            cells: [
              { correctAnswers: ['януари'],   options: ['януари', 'февруари', 'декември', 'март', 'юни'] },
              { correctAnswers: ['април'],    options: ['март', 'април', 'май', 'юни', 'януари'] },
              { correctAnswers: ['юли'],      options: ['юни', 'юли', 'август', 'март', 'декември'] },
              { correctAnswers: ['октомври'], options: ['септември', 'октомври', 'ноември', 'март', 'юни'] },
            ],
          },
          {
            label: '3',
            cells: [
              { correctAnswers: ['февруари'], options: ['януари', 'февруари', 'декември', 'март', 'юни'] },
              { correctAnswers: ['май'],      options: ['март', 'април', 'май', 'юни', 'декември'] },
              { correctAnswers: ['август'],   options: ['юни', 'юли', 'август', 'март', 'декември'] },
              { correctAnswers: ['ноември'],  options: ['септември', 'октомври', 'ноември', 'март', 'юни'] },
            ],
          },
        ],
      },
    ],
  } as TableFillExercise,

  // ORDER 18: Упр. 13 — Колко сезона има в страната Ви?
  {
    id: 'l07-ex-13',
    type: 'personal_choice',
    title: 'УПРАЖНЕНИЕ 13',
    instruction: 'Отговорете на въпроса за Вашата страна.',
    order: 18,
    points: 0,
    model: {
      question: 'Колко сезона има в страната Ви?',
      positiveAnswer: 'В _____ има _____ сезона. Те са: _____.',
      negativeAnswer: 'В _____ има _____ сезона. Те са: _____.',
    },
    blankOptions: [],
    items: [],
  } as PersonalChoiceExercise,

  // ORDER 19: ГРАМАТИКА 2 — Предлози за време
  {
    id: 'l07-gramatika-02',
    type: 'grammar_examples',
    title: 'ГРАМАТИКА 2',
    subtitle: 'Предлози за време',
    instruction: 'Запознайте се с предлозите за време. Натиснете за произношение.',
    instructionKey: 'grammar.l07.g2.instruction',
    order: 19,
    examples: [
      {
        imageUrl: '',
        text: 'в понеделник, във вторник, в сряда',
        subtext: 'на 5 септември 2024 г.',
      },
      {
        imageUrl: '',
        text: 'през януари, февруари, март',
        subtext: 'през 2024 година',
      },
      {
        imageUrl: '',
        text: 'през пролетта, лятото, есента, зимата',
        subtext: '',
      },
    ],
  } as GrammarExamplesExercise,

  // ORDER 20: Упр. 14 — Отговорете на въпросите (лично)
  {
    id: 'l07-ex-14',
    type: 'personal_choice',
    title: 'УПРАЖНЕНИЕ 14',
    instruction: 'Отговорете на въпросите.',
    order: 20,
    points: 0,
    model: {
      question: 'Кога учите български език?',
      positiveAnswer: 'Уча български в понеделник и сряда.',
      negativeAnswer: 'Уча български в понеделник и сряда.',
    },
    blankOptions: [],
    items: [],
  } as PersonalChoiceExercise,

  // ORDER 21: Упр. 15 — Отговорете за времето в градовете
  {
    id: 'l07-ex-15',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 15',
    instruction: 'Отговорете на въпросите по модела, като използвате таблицата.',
    imageUrl: '/assets/lesson-07/23-upr-15-gradove-vreme/01-tablitsa-gradove.jpg',
    order: 21,
    points: 7,
    layout: 'qa-stacked',
    sentences: [
      {
        text: 'Какво е времето в София през зимата? | През зимата е студено и вали сняг.',
        blanks: [],
        correctAnswers: [],
        isExample: true,
      },
      {
        text: 'Какво е времето в Киев през пролетта? | _______',
        blanks: [1],
        correctAnswers: ['През пролетта е хладно и вали дъжд.'],
        acceptableAnswers: [['Хладно е и вали дъжд.', 'В Киев през пролетта е хладно.']],
      },
      {
        text: 'Какво е времето в Кайро през лятото? | _______',
        blanks: [1],
        correctAnswers: ['През лятото е горещо и слънчево.'],
        acceptableAnswers: [['Горещо е и слънчево.', 'В Кайро през лятото е горещо.']],
      },
      {
        text: 'Какво е времето в Бейрут през есента? | _______',
        blanks: [1],
        correctAnswers: ['През есента е топло и облачно.'],
        acceptableAnswers: [['Топло е и облачно.']],
      },
      {
        text: 'Какво е времето в Дамаск през зимата? | _______',
        blanks: [1],
        correctAnswers: ['През зимата е хладно и облачно.'],
        acceptableAnswers: [['Хладно е и облачно.']],
      },
      {
        text: 'Какво е времето в Кабул през пролетта? | _______',
        blanks: [1],
        correctAnswers: ['През пролетта е хладно и вали дъжд.'],
        acceptableAnswers: [['Хладно е и вали дъжд.']],
      },
      {
        text: 'Какво е времето в Техеран през лятото? | _______',
        blanks: [1],
        correctAnswers: ['През лятото е горещо и слънчево.'],
        acceptableAnswers: [['Горещо е и слънчево.']],
      },
      {
        text: 'Какво е времето в Багдад през есента? | _______',
        blanks: [1],
        correctAnswers: ['През есента е топло и слънчево.'],
        acceptableAnswers: [['Топло е и слънчево.']],
      },
    ],
  } as WorkbookFillBlankExercise,

  // SKIP Упр. 16 — Работете по двойки (клиент)

  // ──────────────────────────────────────────────────────────
  // СТРАНИЦА 69
  // ──────────────────────────────────────────────────────────

  // ORDER 22: ГРАМАТИКА 3 — Колко е часът?
  {
    id: 'l07-gramatika-03',
    type: 'grammar_examples',
    title: 'ГРАМАТИКА 3',
    subtitle: 'Колко е часът?',
    instruction: 'Запознайте се с часовника. Натиснете за произношение.',
    instructionKey: 'grammar.l07.g3.instruction',
    order: 22,
    examples: [
      {
        imageUrl: '/assets/lesson-07/25-gramatika-3-chasovnik/01-dvanadeset-chasa.jpg',
        text: 'Дванайсет часа.',
        subtext: '12:00',
      },
      {
        imageUrl: '/assets/lesson-07/25-gramatika-3-chasovnik/02-bez-i.jpg',
        text: 'БЕЗ / И',
        subtext: 'минути преди / след часа',
      },
      {
        imageUrl: '/assets/lesson-07/25-gramatika-3-chasovnik/03-polovina.jpg',
        text: '30 минути = половина',
        subtext: 'Един и половина.',
      },
      {
        imageUrl: '/assets/lesson-07/25-gramatika-3-chasovnik/04-chetvurt.jpg',
        text: '15 минути = четвърт',
        subtext: 'Един и четвърт.',
      },
    ],
  } as GrammarExamplesExercise,

  // ORDER 23: Упр. 17 — Напишете колко е часът
  {
    id: 'l07-ex-17',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 17',
    instruction: 'Напишете колко е часът.',
    order: 23,
    points: 6,
    layout: 'single',
    sentences: [
      {
        images: ['/assets/lesson-07/26-upr-17-napishite-chasa/12-chas-01-00.jpg'],
        text: 'Един.',
        blanks: [],
        correctAnswers: [],
        isExample: true,
      },
      {
        images: ['/assets/lesson-07/26-upr-17-napishite-chasa/11-chas-01-05.jpg'],
        text: 'Един и пет.',
        blanks: [],
        correctAnswers: [],
        isExample: true,
      },
      {
        images: ['/assets/lesson-07/26-upr-17-napishite-chasa/10-chas-01-10.jpg'],
        text: '_______',
        blanks: [0],
        correctAnswers: ['Един и десет.'],
      },
      {
        images: ['/assets/lesson-07/26-upr-17-napishite-chasa/09-chas-01-15.jpg'],
        text: 'Един и петнайсет. = Един и четвърт.',
        blanks: [],
        correctAnswers: [],
        isExample: true,
      },
      {
        images: ['/assets/lesson-07/26-upr-17-napishite-chasa/08-chas-01-20.jpg'],
        text: '_______',
        blanks: [0],
        correctAnswers: ['Един и двайсет.'],
      },
      {
        images: ['/assets/lesson-07/26-upr-17-napishite-chasa/07-chas-01-25.jpg'],
        text: '_______',
        blanks: [0],
        correctAnswers: ['Един и двайсет и пет.'],
      },
      {
        images: ['/assets/lesson-07/26-upr-17-napishite-chasa/06-chas-01-30.jpg'],
        text: 'Един и трийсет. = Един и половина.',
        blanks: [],
        correctAnswers: [],
        isExample: true,
      },
      {
        images: ['/assets/lesson-07/26-upr-17-napishite-chasa/05-chas-01-35.jpg'],
        text: '_______',
        blanks: [0],
        correctAnswers: ['Два без двайсет и пет.'],
      },
      {
        images: ['/assets/lesson-07/26-upr-17-napishite-chasa/04-chas-01-40.jpg'],
        text: '_______',
        blanks: [0],
        correctAnswers: ['Два без двайсет.'],
      },
      {
        images: ['/assets/lesson-07/26-upr-17-napishite-chasa/03-chas-01-45.jpg'],
        text: '_______',
        blanks: [0],
        correctAnswers: ['Два без петнайсет.', 'Два без четвърт.'],
      },
      {
        images: ['/assets/lesson-07/26-upr-17-napishite-chasa/02-chas-01-50.jpg'],
        text: '_______',
        blanks: [0],
        correctAnswers: ['Два без десет.'],
      },
      {
        images: ['/assets/lesson-07/26-upr-17-napishite-chasa/01-chas-01-55.jpg'],
        text: 'Два без двайсет и пет.',
        blanks: [],
        correctAnswers: [],
        isExample: true,
      },
    ],
  } as WorkbookFillBlankExercise,

  // ORDER 24: ГРАМАТИКА 4 — Части на денонощието
  {
    id: 'l07-gramatika-04',
    type: 'grammar_examples',
    title: 'ГРАМАТИКА 4',
    subtitle: 'Части на денонощието',
    instruction: 'Запознайте се с частите на денонощието. Натиснете за произношение.',
    instructionKey: 'grammar.l07.g4.instruction',
    order: 24,
    examples: [
      {
        imageUrl: '/assets/lesson-07/27-gramatika-4-den-sutrin-obed/03-sutrinta-zakuska.jpg',
        text: 'сутринта',
        subtext: '8:00 ч. = осем часа сутринта',
      },
      {
        imageUrl: '/assets/lesson-07/27-gramatika-4-den-sutrin-obed/04-na-obed-salata.jpg',
        text: 'на обед',
        subtext: '11:00 ч. = единайсет часа преди обед',
      },
      {
        imageUrl: '/assets/lesson-07/27-gramatika-4-den-sutrin-obed/01-prez-denya-rabotnik.jpg',
        text: 'следобед',
        subtext: '15:00 ч. = три часа следобед',
      },
      {
        imageUrl: '/assets/lesson-07/27-gramatika-4-den-sutrin-obed/05-vecher-tv.jpg',
        text: 'вечерта',
        subtext: '20:00 ч. = осем часа вечерта',
      },
      {
        imageUrl: '/assets/lesson-07/27-gramatika-4-den-sutrin-obed/02-prez-noshta-syam.jpg',
        text: 'през нощта',
        subtext: '23:00 ч. = единайсет часа през нощта',
      },
      {
        imageUrl: '/assets/lesson-07/27-gramatika-4-den-sutrin-obed/06-den-peyzazh.jpg',
        text: 'през деня',
        subtext: 'денят е от сутринта до вечерта',
      },
      {
        imageUrl: '/assets/lesson-07/27-gramatika-4-den-sutrin-obed/07-nosht-peyzazh.jpg',
        text: 'нощта',
        subtext: 'нощта е след вечерта',
      },
    ],
  } as GrammarExamplesExercise,

  // ──────────────────────────────────────────────────────────
  // СТРАНИЦА 70
  // ──────────────────────────────────────────────────────────

  // ORDER 25: Упр. 18 — Нарисувайте стрелките (адаптирано: свържете часа с описанието)
  // TODO: В учебника задачата изисква рисуване на стрелки. Дигитално адаптирано като match_pairs.
  {
    id: 'l07-ex-18',
    type: 'match_pairs',
    title: 'УПРАЖНЕНИЕ 18',
    instruction: 'Свържете часа с правилното описание.',
    order: 25,
    points: 6,
    pairs: [
      { id: 'p1', left: 'Два часа.',             correctRight: '2:00'  },
      { id: 'p2', left: 'Десет и половина.',      correctRight: '10:30' },
      { id: 'p3', left: 'Петнайсет и десет.',     correctRight: '15:10' },
      { id: 'p4', left: 'Тринайсет и четвърт.',   correctRight: '13:15' },
      { id: 'p5', left: 'Десет без петнайсет.',   correctRight: '9:45'  },
      { id: 'p6', left: 'Два без двайсет и пет.', correctRight: '1:35'  },
    ],
  } as MatchPairsExercise,

  // ORDER 26: Упр. 19 — Напишете часа с думи
  {
    id: 'l07-ex-19',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 19',
    instruction: 'Напишете часа с думи по модела.',
    order: 26,
    points: 6,
    layout: 'two-column',
    sentences: [
      {
        text: '21:30 | Девет и половина вечерта.',
        blanks: [],
        correctAnswers: [],
        isExample: true,
      },
      {
        text: '08:15 | _______',
        blanks: [1],
        correctAnswers: ['Осем и четвърт сутринта.'],
        acceptableAnswers: [['Осем и петнайсет сутринта.']],
      },
      {
        text: '12:30 | _______',
        blanks: [1],
        correctAnswers: ['Дванайсет и половина.'],
        acceptableAnswers: [['Дванайсет и тридесет.']],
      },
      {
        text: '23:25 | _______',
        blanks: [1],
        correctAnswers: ['Единайсет и двайсет и пет през нощта.'],
        acceptableAnswers: [['Дванайсет без тридесет и пет.']],
      },
      {
        text: '16:45 | _______',
        blanks: [1],
        correctAnswers: ['Пет без четвърт следобед.'],
        acceptableAnswers: [['Пет без петнайсет следобед.']],
      },
      {
        text: '11:05 | _______',
        blanks: [1],
        correctAnswers: ['Единайсет и пет преди обед.'],
        acceptableAnswers: [['Единайсет и пет.']],
      },
      {
        text: '20:35 | _______',
        blanks: [1],
        correctAnswers: ['Девет без двайсет и пет вечерта.'],
        acceptableAnswers: [['Осем и трийсет и пет вечерта.']],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ORDER 27: ДИАЛОЗИ 2 — Колко е часът?
  {
    id: 'l07-dialozi-02',
    type: 'dialogues',
    title: 'ДИАЛОЗИ 2',
    instruction: 'Натиснете реплика, за да чуете произношението. После повторете на глас.',
    instructionKey: 'exercise.clickLineToListen',
    order: 27,
    sections: [
      {
        id: 'а.',
        lines: [
          { text: '– Извинете, колко е часът?', voiceGender: 'female' },
          { text: '– Два и петнайсет.',          voiceGender: 'male'   },
          { text: '– Благодаря.',                voiceGender: 'female' },
          { text: '– Моля.',                     voiceGender: 'male'   },
        ],
      },
      {
        id: 'б.',
        lines: [
          { text: '– В колко часа вечеряте?', voiceGender: 'female' },
          { text: '– В седем часа.',           voiceGender: 'male'   },
        ],
      },
    ],
  } as DialoguesExercise,

  // SKIP Упр. 20 — Прочетете диалозите по двойки (клиент)
  // SKIP Упр. 21 — Работете по двойки (клиент)

  // ORDER 28: Упр. 22 — Слушайте и напишете отговорите
  {
    id: 'l07-ex-22',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 22',
    instruction: 'Слушайте и напишете отговорите на въпросите.',
    order: 28,
    points: 3,
    layout: 'qa-stacked',
    listeningText: 'Мартин обядва в един часа след обяд. Галя вечеря в седем и половина вечерта. Светла и Ани пият кафе в десет часа преди обед.',
    sentences: [
      {
        text: 'В колко часа закусва Петър? | Петър закусва в седем и тридесет сутринта.',
        blanks: [],
        correctAnswers: [],
        isExample: true,
      },
      {
        text: 'В колко часа обядва Мартин? | _______',
        blanks: [1],
        correctAnswers: ['Мартин обядва в един часа след обяд.'],
        acceptableAnswers: [['В един часа след обяд.', 'Обядва в един часа.']],
      },
      {
        text: 'В колко часа вечеря Галя? | _______',
        blanks: [1],
        correctAnswers: ['Галя вечеря в седем и половина вечерта.'],
        acceptableAnswers: [['В седем и половина вечерта.', 'Вечеря в седем и половина.']],
      },
      {
        text: 'В колко часа пият кафе Светла и Ани? | _______',
        blanks: [1],
        correctAnswers: ['Светла и Ани пият кафе в десет часа преди обед.'],
        acceptableAnswers: [['В десет часа преди обед.', 'Пият кафе в десет часа.']],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ORDER 29: ГРАМАТИКА 5 — от, до, преди, след
  {
    id: 'l07-gramatika-05',
    type: 'grammar_examples',
    title: 'ГРАМАТИКА 5',
    subtitle: 'Предлози: от, до, преди, след',
    instruction: 'Запознайте се с предлозите за начало и край на действие. Натиснете за произношение.',
    instructionKey: 'grammar.l07.g5.instruction',
    order: 29,
    examples: [
      {
        imageUrl: '/assets/lesson-07/34-gramatika-5-ot-do-predi-sled/01-ot-do-chasove.jpg',
        text: 'Учим български от 10:00 до 12:00 часа.',
        subtext: 'от … до … = от кога до кога',
      },
      {
        imageUrl: '/assets/lesson-07/34-gramatika-5-ot-do-predi-sled/02-predi-chas.jpg',
        text: 'Закусвам преди 10:00 часа.',
        subtext: 'преди = по-рано от',
      },
      {
        imageUrl: '/assets/lesson-07/34-gramatika-5-ot-do-predi-sled/03-sled-chas.jpg',
        text: 'Обядвам след 12:00 часа.',
        subtext: 'след = по-късно от',
      },
      {
        imageUrl: '',
        text: 'от понеделник до петък = през седмицата',
        subtext: 'в събота и неделя = през уикенда',
      },
    ],
  } as GrammarExamplesExercise,

  // ──────────────────────────────────────────────────────────
  // СТРАНИЦА 71
  // ──────────────────────────────────────────────────────────

  // ORDER 30: Упр. 23 — Изберете подходящите предлози
  {
    id: 'l07-ex-23',
    type: 'dropdown_match',
    title: 'УПРАЖНЕНИЕ 23',
    instruction: 'Изберете подходящия предлог от списъка.',
    order: 30,
    points: 8,
    questions: [
      {
        id: 'q1',
        left: 'Закусвам _______ 8:30.',
        options: ['в', 'до', 'от', 'преди', 'през', 'след'],
        correctAnswer: 'в',
      },
      {
        id: 'q2',
        left: 'Имам време _______ 19:30.',
        options: ['в', 'до', 'от', 'преди', 'през', 'след'],
        correctAnswer: 'до',
      },
      {
        id: 'q3',
        left: '_______ уикенда има много хора тук.',
        options: ['В', 'До', 'От', 'Преди', 'През', 'След'],
        correctAnswer: 'През',
      },
      {
        id: 'q4a',
        left: 'Тя работи _______ 9:00',
        options: ['в', 'до', 'от', 'преди', 'през', 'след'],
        correctAnswer: 'от',
      },
      {
        id: 'q4b',
        left: '_______ 17:30.',
        options: ['в', 'до', 'от', 'преди', 'през', 'след'],
        correctAnswer: 'до',
      },
      {
        id: 'q5',
        left: 'Ние учим _______ 12:30.',
        options: ['в', 'до', 'от', 'преди', 'през', 'след'],
        correctAnswer: 'до',
        alternateCorrectAnswers: ['след'],
      },
      {
        id: 'q6',
        left: 'Той няма време _______ седмицата.',
        options: ['в', 'до', 'от', 'преди', 'през', 'след'],
        correctAnswer: 'през',
      },
      {
        id: 'q7',
        left: 'Обядвам _______ 12:00.',
        options: ['в', 'до', 'от', 'преди', 'през', 'след'],
        correctAnswer: 'след',
        alternateCorrectAnswers: ['в'],
      },
    ],
  } as DropdownMatchExercise,

  // ORDER 31: ДИАЛОЗИ 3 — Кафе, чай, рожден ден
  {
    id: 'l07-dialozi-03',
    type: 'dialogues',
    title: 'ДИАЛОЗИ 3',
    instruction: 'Натиснете реплика, за да чуете произношението. После повторете на глас.',
    instructionKey: 'exercise.clickLineToListen',
    order: 31,
    sections: [
      {
        id: 'а.',
        lines: [
          { text: '– Кога пиеш кафе?',                              voiceGender: 'female' },
          { text: '– Сутрин. А ти?',                                voiceGender: 'male'   },
          { text: '– Сутрин, на обяд и следобед. Обичам кафе!',     voiceGender: 'female' },
        ],
      },
      {
        id: 'б.',
        lines: [
          { text: '– Кога пиеш чай?',                               voiceGender: 'male'   },
          { text: '– Сутрин и вечер. А ти?',                        voiceGender: 'female' },
          { text: '– Аз пия един чай на обяд.',                     voiceGender: 'male'   },
        ],
      },
      {
        id: 'в.',
        lines: [
          { text: '– Кога си роден?',                                                               voiceGender: 'female' },
          { text: '– Роден съм на първи март хиляда деветстотин осемдесет и втора година. А ти?',  voiceGender: 'male'   },
          { text: '– Аз съм родена на двайсет и пети май хиляда деветстотин деветдесет и четвърта година.', voiceGender: 'female' },
        ],
      },
    ],
  } as DialoguesExercise,

  // SKIP Упр. 24 — Прочетете диалозите по двойки (клиент)
  // SKIP Упр. 25 — Работете по двойки (клиент)

  // ORDER 32: НОВИ ДУМИ 6 — Посоки на света
  {
    id: 'l07-novi-dumi-06',
    type: 'illustrated_cards',
    title: 'НОВИ ДУМИ 6',
    subtitle: 'Посоки на света',
    instruction: 'Натиснете за произношение.',
    order: 32,
    cards: [
      { id: 'sever',       imageUrl: '', label: 'север'      },
      { id: 'severoiztok', imageUrl: '', label: 'североизток'},
      { id: 'iztok',       imageUrl: '', label: 'изток'      },
      { id: 'yugoiztok',   imageUrl: '', label: 'югоизток'   },
      { id: 'yug',         imageUrl: '', label: 'юг'         },
      { id: 'yugozapad',   imageUrl: '', label: 'югозапад'   },
      { id: 'zapad',       imageUrl: '', label: 'запад'      },
      { id: 'severozapad', imageUrl: '', label: 'северозапад'},
    ],
  } as IllustratedCardsExercise,

  // ORDER 33: Упр. 26 — Свържете картинките и посоките на света
  {
    id: 'l07-ex-26',
    type: 'image_labeling',
    title: 'УПРАЖНЕНИЕ 26',
    instruction: 'Изберете правилната посока за всяка картинка.',
    order: 33,
    points: 4,
    displayType: 'default',
    images: [
      { id: 'iglu',   imageUrl: '/assets/lesson-07/39-upr-26-posoki-kartinki/01-sever-iglu.jpg',   correctLabel: 'север' },
      { id: 'plazh',  imageUrl: '/assets/lesson-07/39-upr-26-posoki-kartinki/02-yug-plazh.jpg',    correctLabel: 'юг'    },
      { id: 'izgrev', imageUrl: '/assets/lesson-07/39-upr-26-posoki-kartinki/03-iztok-izgrev.jpg', correctLabel: 'изток' },
      { id: 'zalez',  imageUrl: '/assets/lesson-07/39-upr-26-posoki-kartinki/04-zapad-zalez.jpg',  correctLabel: 'запад' },
    ],
    options: ['изток', 'запад', 'север', 'юг'],
  } as ImageLabelingExercise,

  // ORDER 34: Упр. 27 — Довършете изреченията (посоки от България)
  {
    id: 'l07-ex-27',
    type: 'dropdown_match',
    title: 'УПРАЖНЕНИЕ 27',
    instruction: 'Изберете правилната посока, за да довършите изречението.',
    order: 34,
    points: 5,
    questions: [
      {
        id: 'q1',
        left: 'Гърция е на _______ от България.',
        options: ['север', 'юг', 'изток', 'запад', 'югоизток', 'югозапад'],
        correctAnswer: 'юг',
        alternateCorrectAnswers: ['югоизток', 'югозапад'],
      },
      {
        id: 'q2',
        left: 'Сърбия е на _______ от България.',
        options: ['север', 'юг', 'изток', 'запад', 'югоизток', 'югозапад'],
        correctAnswer: 'запад',
      },
      {
        id: 'q3',
        left: 'Турция е на _______ от България.',
        options: ['север', 'юг', 'изток', 'запад', 'югоизток', 'югозапад'],
        correctAnswer: 'югоизток',
        alternateCorrectAnswers: ['юг', 'изток'],
      },
      {
        id: 'q4',
        left: 'Северна Македония е на _______ от България.',
        options: ['север', 'юг', 'изток', 'запад', 'югоизток', 'югозапад'],
        correctAnswer: 'запад',
        alternateCorrectAnswers: ['югозапад'],
      },
      {
        id: 'q5',
        left: 'Черно море е на _______ от България.',
        options: ['север', 'юг', 'изток', 'запад', 'югоизток', 'югозапад'],
        correctAnswer: 'изток',
      },
    ],
  } as DropdownMatchExercise,

  // ORDER 35: ГРАМАТИКА 6 — на планина / на море
  {
    id: 'l07-gramatika-06',
    type: 'grammar_examples',
    title: 'ГРАМАТИКА 6',
    subtitle: 'На планина. На море.',
    instruction: 'Запознайте се с изразите. Натиснете за произношение.',
    instructionKey: 'grammar.l07.g6.instruction',
    order: 35,
    examples: [
      {
        imageUrl: '/assets/lesson-07/41-gramatika-6-planina-more/01-planina-zima.jpg',
        text: 'Зима е. Вали сняг. Отивам на планина.',
        subtext: '',
      },
      {
        imageUrl: '/assets/lesson-07/41-gramatika-6-planina-more/02-more-lyato.jpg',
        text: 'Лято е. Горещо е. Отивам на море.',
        subtext: '',
      },
    ],
  } as GrammarExamplesExercise,

  // ──────────────────────────────────────────────────────────
  // СТРАНИЦА 72
  // ──────────────────────────────────────────────────────────

  // ORDER 36: Упр. 28 — Поставете глагола ОТИВАМ в правилната форма
  {
    id: 'l07-ex-28',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 28',
    instruction: 'Напишете глагола ОТИВАМ в правилната форма.',
    order: 36,
    points: 5,
    layout: 'single',
    sentences: [
      {
        text: 'Отивам на работа. (аз)',
        blanks: [],
        correctAnswers: [],
        isExample: true,
      },
      {
        text: '_______ на пазара. (ние)',
        blanks: [0],
        correctAnswers: ['Отиваме'],
      },
      {
        text: 'Къде _______? (ти)',
        blanks: [1],
        correctAnswers: ['отиваш'],
      },
      {
        text: '_______ в магазина. (те)',
        blanks: [0],
        correctAnswers: ['Отиват'],
      },
      {
        text: '_______ в Пловдив. (вие)',
        blanks: [0],
        correctAnswers: ['Отивате'],
      },
      {
        text: '_______ на работа преди осем и половина. (той)',
        blanks: [0],
        correctAnswers: ['Отива'],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ORDER 37: ДИАЛОЗИ 4 — Довиждане и уикенд
  {
    id: 'l07-dialozi-04',
    type: 'dialogues',
    title: 'ДИАЛОЗИ 4',
    instruction: 'Натиснете реплика, за да чуете произношението. После повторете на глас.',
    instructionKey: 'exercise.clickLineToListen',
    order: 37,
    sections: [
      {
        id: 'а.',
        lines: [
          { text: '– Довиждане, Ани! Приятна вечер!', voiceGender: 'male'   },
          { text: '– Благодаря, подобно.',             voiceGender: 'female' },
          { text: '– До утре!',                        voiceGender: 'male'   },
          { text: '– До утре!',                        voiceGender: 'female' },
        ],
      },
      {
        id: 'б.',
        lines: [
          { text: '– Приятен уикенд!',      voiceGender: 'female' },
          { text: '– Подобно! До понеделник!', voiceGender: 'male' },
        ],
      },
      {
        id: 'в.',
        lines: [
          { text: '– Здравей! Как си?',                     voiceGender: 'female' },
          { text: '– Много добре. А ти?',                   voiceGender: 'male'   },
          { text: '– Аз също. Къде отиваш?',                voiceGender: 'female' },
          { text: '– Отивам на кино. А ти?',                voiceGender: 'male'   },
          { text: '– Имам среща с приятели. До скоро!',     voiceGender: 'female' },
          { text: '– До скоро!',                            voiceGender: 'male'   },
        ],
      },
    ],
  } as DialoguesExercise,

  // SKIP Упр. 29 — Прочетете диалозите по двойки (клиент)
  // SKIP Упр. 30 — Работете по двойки (клиент)

  // ORDER 38: ДОПЪЛНИТЕЛНИ УПРАЖНЕНИЯ — Упр. 31: Напишете числата с думи
  {
    id: 'l07-ex-31',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 31',
    subtitle: 'ДОПЪЛНИТЕЛНИ УПРАЖНЕНИЯ',
    instruction: 'Напишете редното числително с думи.',
    order: 38,
    points: 6,
    layout: 'single',
    sentences: [
      {
        text: '_______ (1) януари – Нова година',
        blanks: [0],
        correctAnswers: ['Първи'],
      },
      {
        text: '_______ (1) март – Баба Марта',
        blanks: [0],
        correctAnswers: ['Първи'],
      },
      {
        text: '_______ (3) март – Национален празник на България',
        blanks: [0],
        correctAnswers: ['Трети'],
      },
      {
        text: '_______ (8) март – Ден на жената',
        blanks: [0],
        correctAnswers: ['Осми'],
      },
      {
        text: '_______ (24) май – Ден на азбуката',
        blanks: [0],
        correctAnswers: ['Двайсет и четвърти'],
        acceptableAnswers: [['Двадесет и четвърти']],
      },
      {
        text: '_______ (25) декември – Коледа',
        blanks: [0],
        correctAnswers: ['Двайсет и пети'],
        acceptableAnswers: [['Двадесет и пети']],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ORDER 39: Упр. 32 — Напишете поздрав за всеки празник
  {
    id: 'l07-ex-32',
    type: 'dropdown_match',
    title: 'УПРАЖНЕНИЕ 32',
    instruction: 'Изберете правилния поздрав за всеки празник.',
    order: 39,
    points: 5,
    questions: [
      {
        id: 'q0',
        left: 'Днес е 1 януари.',
        options: ['Честита Нова година!', 'Честита Баба Марта!', 'Честит празник!', 'Честита Коледа!', 'Честит рожден ден!'],
        correctAnswer: 'Честита Нова година!',
        isExample: true,
      },
      {
        id: 'q1',
        left: 'Днес е 1 март.',
        options: ['Честита Нова година!', 'Честита Баба Марта!', 'Честит празник!', 'Честита Коледа!', 'Честит рожден ден!'],
        correctAnswer: 'Честита Баба Марта!',
      },
      {
        id: 'q2',
        left: 'Днес е 8 март.',
        options: ['Честита Нова година!', 'Честита Баба Марта!', 'Честит празник!', 'Честита Коледа!', 'Честит рожден ден!'],
        correctAnswer: 'Честит празник!',
      },
      {
        id: 'q3',
        left: 'Днес е 24 май.',
        options: ['Честита Нова година!', 'Честита Баба Марта!', 'Честит празник!', 'Честита Коледа!', 'Честит рожден ден!'],
        correctAnswer: 'Честит празник!',
      },
      {
        id: 'q4',
        left: 'Днес е 25 декември.',
        options: ['Честита Нова година!', 'Честита Баба Марта!', 'Честит празник!', 'Честита Коледа!', 'Честит рожден ден!'],
        correctAnswer: 'Честита Коледа!',
      },
      {
        id: 'q5',
        left: 'Днес имам рожден ден.',
        options: ['Честита Нова година!', 'Честита Баба Марта!', 'Честит празник!', 'Честита Коледа!', 'Честит рожден ден!'],
        correctAnswer: 'Честит рожден ден!',
      },
    ],
  } as DropdownMatchExercise,

  // ORDER 40: Упр. 33 — Напишете какво е времето в България по сезони
  {
    id: 'l07-ex-33',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 33',
    instruction: 'Напишете какво е времето в България през различните сезони.',
    order: 40,
    points: 10,
    layout: 'single',
    sentences: [
      {
        images: ['/assets/lesson-07/48-upr-33-vreme-sezoni/04-prez-zimata.jpg'],
        text: 'През зимата: Времето е студено. Вали _______ и _______, има _______.',
        blanks: [4, 6, 8],
        correctAnswers: ['сняг', 'дъжд', 'вятър'],
        options: ['сняг', 'дъжд', 'вятър', 'слънце', 'мъгла', 'облаци'],
      },
      {
        images: ['/assets/lesson-07/48-upr-33-vreme-sezoni/02-prez-lyatoto.jpg'],
        text: 'През лятото: Времето е _______ и _______. Няма _______ и _______.',
        blanks: [3, 5, 7, 9],
        correctAnswers: ['горещо', 'слънчево', 'дъжд', 'вятър'],
        options: ['горещо', 'слънчево', 'студено', 'дъжд', 'вятър', 'облаци'],
      },
      {
        images: ['/assets/lesson-07/48-upr-33-vreme-sezoni/03-prez-esenta.jpg'],
        text: 'През есента: Времето е _______ и _______. Вали _______ и духа _______.',
        blanks: [3, 5, 7, 9],
        correctAnswers: ['хладно', 'облачно', 'дъжд', 'вятър'],
        options: ['хладно', 'облачно', 'горещо', 'дъжд', 'вятър', 'сняг'],
      },
      {
        images: ['/assets/lesson-07/48-upr-33-vreme-sezoni/01-prez-proletta.jpg'],
        text: 'През пролетта: Времето е _______. Грее _______ и вали _______.',
        blanks: [3, 5, 7],
        correctAnswers: ['топло', 'слънце', 'дъжд'],
        options: ['топло', 'студено', 'слънце', 'дъжд', 'вятър', 'сняг'],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ──────────────────────────────────────────────────────────
  // СТРАНИЦА 73
  // ──────────────────────────────────────────────────────────

  // ORDER 41: Упр. 34 — Прочетете текста (Ибрахим)
  {
    id: 'l07-ex-34',
    type: 'reading_text',
    title: 'ТЕКСТ',
    textTitle: 'Ибрахим',
    instruction: 'Прочетете текста. Извадете непознатите думи и проверете превода им в речника.',
    order: 41,
    showDictionary: true,
    imageUrl: '/assets/lesson-07/49-tekst-ibrahim-vitosha/01-gora-esen.jpg',
    paragraphs: [
      'Ибрахим е бежанец от Сирия. Той живее в София в малък апартамент.',
      'Ибрахим е учител в арабско училище и работи от понеделник до петък. Той отива в училището в осем и тридесет сутринта. Има почивка за обяд от дванайсет и тридесет до тринайсет и тридесет. Обядва сандвич и кафе. Работи до шестнайсет и тридесет.',
      'В сряда и петък Ибрахим учи английски от осемнайсет до деветнайсет и тридесет. Той е зает през седмицата от сутрин до вечер и няма много свободно време.',
      'В събота и неделя не работи и отива на Витоша. Витоша е красива планина, близо до София. Ибрахим много обича планината през всички сезони.',
      'Сега е есен, месец септември. Днес е неделя и времето е чудесно! Не е горещо, не е студено. Двайсет и два градуса. Не вали дъжд и не е облачно. Ибрахим има среща с приятели и отива на разходка в планината. Времето е прекрасно за разходка.',
    ],
    audioUrl: '/assets/lesson-07/audio/tts/texts/l07-ex-34-full.mp3',
  } as ReadingTextExercise,

  // ORDER 42: Упр. 35 — Вярно или не?
  {
    id: 'l07-ex-35',
    type: 'true_false',
    title: 'УПРАЖНЕНИЕ 35',
    instruction: 'Определете дали твърденията за текста са верни или не.',
    order: 42,
    points: 7,
    sentences: [
      { id: 's1', text: 'Ибрахим е бежанец от Сирия.',                        isTrue: true,  isExample: true },
      { id: 's2', text: 'Той живее в голям апартамент.',                       isTrue: false },
      { id: 's3', text: 'Ибрахим е учител.',                                   isTrue: true  },
      { id: 's4', text: 'Ибрахим работи в събота и неделя.',                  isTrue: false },
      { id: 's5', text: 'Той учи английски.',                                  isTrue: true  },
      { id: 's6', text: 'Витоша е красива планина.',                           isTrue: true  },
      { id: 's7', text: 'Ибрахим е зает от сутрин до вечер през седмицата.',  isTrue: true  },
      { id: 's8', text: 'Ибрахим не обича планината.',                         isTrue: false },
    ],
  } as TrueFalseExercise,

  // ORDER 43: Упр. 36 — Отговорете на въпросите (Ибрахим)
  {
    id: 'l07-ex-36',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 36',
    instruction: 'Отговорете на въпросите за текста.',
    order: 43,
    points: 8,
    layout: 'qa-stacked',
    sentences: [
      {
        text: 'Къде живее Ибрахим? | _______',
        blanks: [1],
        correctAnswers: ['Ибрахим живее в София в малък апартамент.'],
        acceptableAnswers: [['В София.', 'В малък апартамент в София.']],
      },
      {
        text: 'Къде работи? | _______',
        blanks: [1],
        correctAnswers: ['Работи в арабско училище.'],
        acceptableAnswers: [['В арабско училище.']],
      },
      {
        text: 'В колко часа отива в училище сутрин? | _______',
        blanks: [1],
        correctAnswers: ['Отива в осем и тридесет сутринта.'],
        acceptableAnswers: [['В осем и тридесет.', 'В 8:30.']],
      },
      {
        text: 'Има ли обедна почивка? | _______',
        blanks: [1],
        correctAnswers: ['Да, има почивка от дванайсет и тридесет до тринайсет и тридесет.'],
        acceptableAnswers: [['Да, от 12:30 до 13:30.', 'Да, от дванайсет и тридесет.']],
      },
      {
        text: 'Какво обядва? | _______',
        blanks: [1],
        correctAnswers: ['Обядва сандвич и кафе.'],
        acceptableAnswers: [['Сандвич и кафе.']],
      },
      {
        text: 'До колко часа работи? | _______',
        blanks: [1],
        correctAnswers: ['Работи до шестнайсет и тридесет.'],
        acceptableAnswers: [['До 16:30.', 'До шестнайсет тридесет.']],
      },
      {
        text: 'Кога учи английски? | _______',
        blanks: [1],
        correctAnswers: ['В сряда и петък учи английски от осемнайсет до деветнайсет и тридесет.'],
        acceptableAnswers: [['В сряда и петък.', 'От 18:00 до 19:30.']],
      },
      {
        text: 'Как се казва планината близо до София? | _______',
        blanks: [1],
        correctAnswers: ['Планината се казва Витоша.'],
        acceptableAnswers: [['Витоша.']],
      },
    ],
  } as WorkbookFillBlankExercise,

];


import type {
  Exercise,
  ImageLabelingExercise,
  IllustratedCardsExercise,
  GrammarTableExercise,
  GrammarExamplesExercise,
  DialoguesExercise,
  WorkbookFillBlankExercise,
  DropdownMatchExercise,
  SyllableBlocksExercise,
  WordSearchExercise,
  TrueFalseExercise,
  ReadingTextExercise,
} from '@/content/types';
import type { A2GroupedDropdownExercise } from '../../types';

// ⚠️ Order follows the A2 textbook „Как се чувствате?" (стр. 24–33).
// Пропуснати по желание на клиента: упр. 4, 5, 10, 11, 20, 21, 23, 24, 31.

export const exercises: Exercise[] = [

  // ─── ORDER 1 — Упр. 1 (стр. 24): думи под картинките (мъж, жена, момиче, момче) ────────────
  {
    id: 'a2-l02-ex-01',
    type: 'image_labeling',
    instruction: 'Изберете правилната дума под всяка картинка.',
    order: 1,
    points: 4,
    hideHeader: true,
    displayType: 'row',
    images: [
      { id: 'mazh',    imageUrl: '/assets/a2-lesson-02/01-upr-01-hora/01-mazh.jpg',    correctLabel: 'мъж'     },
      { id: 'jena',    imageUrl: '/assets/a2-lesson-02/01-upr-01-hora/02-jena.jpg',    correctLabel: 'жена'    },
      { id: 'momiche', imageUrl: '/assets/a2-lesson-02/01-upr-01-hora/03-momiche.jpg', correctLabel: 'момиче'  },
      { id: 'momche',  imageUrl: '/assets/a2-lesson-02/01-upr-01-hora/04-momche.jpg',  correctLabel: 'момче'   },
    ],
    options: ['мъж', 'жена', 'момиче', 'момче'],
  } as ImageLabelingExercise,

  // ─── ORDER 2 — НОВИ ДУМИ 1 (стр. 24): ЧАСТИ НА ТЯЛОТО ──────────────────────────────────────
  {
    id: 'a2-l02-novi-dumi-01',
    type: 'illustrated_cards',
    title: 'НОВИ ДУМИ 1',
    subtitle: 'Части на тялото',
    instruction: '',
    order: 2,
    displayMode: 'body_diagram',
    disableAudio: true,
    headerImageUrl: '/assets/a2-lesson-02/02-novi-dumi-1-chasti-na-tyaloto/01-chovek-diagrama-textbook.png',
    cards: [],
  } as IllustratedCardsExercise,

  // ─── ORDER 3 — ГРАМАТИКА 1 (стр. 24): неправилно мн.ч. ─────────────────────────────────────
  {
    id: 'a2-l02-gramatika-01',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 1',
    subtitle: 'Неправилно множествено число',
    instruction: 'Запознайте се с неправилното множествено число на думите за части на тялото.',
    instructionKey: 'grammar.a2l02.g1.instruction',
    order: 3,
    tableTitle: 'Неправилно мн.ч.',
    columns: ['мн.ч.', 'два / две…'],
    rows: [
      { pronoun: 'крак',  cells: ['крака',  'крака']  },
      { pronoun: 'зъб',   cells: ['зъби',   'зъба']   },
      { pronoun: 'око',   cells: ['очи',    '—']       },
      { pronoun: 'ухо',   cells: ['уши',    '—']       },
      { pronoun: 'ръка',  cells: ['ръце',   '—']       },
    ],
    notes: [
      'крак → два крака; зъб → два зъба (бройна форма при мъжки род)',
    ],
    ttsNotes: [
      'крак, два крака. зъб, два зъба. бройна форма при мъжки род.',
    ],
  } as GrammarTableExercise,

  // ─── ORDER 4 — Упр. 2 (стр. 25): части на тялото (image labeling) ──────────────────────────
  {
    id: 'a2-l02-ex-02',
    type: 'image_labeling',
    instruction: 'Изберете правилната дума под всяка картинка.',
    order: 4,
    points: 9,
    displayType: 'default',
    images: [
      { id: 'oko2',     imageUrl: '/assets/a2-lesson-02/03-upr-02-chasti-na-tyaloto/01-oko.jpg',           correctLabel: 'око'    },
      { id: 'usta2',    imageUrl: '/assets/a2-lesson-02/03-upr-02-chasti-na-tyaloto/02-usta.jpg',          correctLabel: 'уста'   },
      { id: 'prsti2',   imageUrl: '/assets/a2-lesson-02/03-upr-02-chasti-na-tyaloto/03-raka.jpg',          correctLabel: 'пръсти' },
      { id: 'uho2',     imageUrl: '/assets/a2-lesson-02/03-upr-02-chasti-na-tyaloto/04-uho.jpg',           correctLabel: 'ухо'    },
      { id: 'nos2',     imageUrl: '/assets/a2-lesson-02/03-upr-02-chasti-na-tyaloto/05-nos.jpg',           correctLabel: 'нос'    },
      { id: 'raka2',    imageUrl: '/assets/a2-lesson-02/03-upr-02-chasti-na-tyaloto/06-raka-ramo.jpg',     correctLabel: 'ръка'   },
      { id: 'sartse2',  imageUrl: '/assets/a2-lesson-02/03-upr-02-chasti-na-tyaloto/07-gardi-sartse.jpg',  correctLabel: 'сърце'  },
      { id: 'glava2',   imageUrl: '/assets/a2-lesson-02/03-upr-02-chasti-na-tyaloto/08-glava.jpg',         correctLabel: 'глава'  },
      { id: 'krak2',    imageUrl: '/assets/a2-lesson-02/03-upr-02-chasti-na-tyaloto/09-krak.jpg',          correctLabel: 'крак'   },
    ],
    options: ['око', 'уста', 'пръсти', 'ухо', 'нос', 'ръка', 'сърце', 'глава', 'крак'],
  } as ImageLabelingExercise,

  // ─── ORDER 5 — Упр. 3 (стр. 25): подредете буквите в думи ──────────────────────────────────
  {
    id: 'a2-l02-ex-03',
    type: 'syllable_blocks',
    instruction: 'Подредете буквите, за да съставите думи.',
    order: 5,
    points: 12,
    puzzles: [
      // Ляво
      { id: 'glava-p',  syllables: ['А', 'В', 'Г', 'Л', 'А'],          correctWord: 'ГЛАВА'   },
      { id: 'oko-p',    syllables: ['К', 'О', 'О'],                     correctWord: 'ОКО'     },
      { id: 'uho-p',    syllables: ['Х', 'У', 'О'],                     correctWord: 'УХО'     },
      { id: 'krak-p',   syllables: ['А', 'К', 'К', 'Р'],                correctWord: 'КРАК'    },
      { id: 'grdi-p',   syllables: ['Д', 'И', 'Г', 'Р', 'Ъ'],          correctWord: 'ГЪРДИ'   },
      { id: 'grlo-p',   syllables: ['Л', 'О', 'Г', 'Р', 'Ъ'],          correctWord: 'ГЪРЛО'   },
      // Дясно
      { id: 'nos-p',    syllables: ['О', 'С', 'Н'],                     correctWord: 'НОС'     },
      { id: 'zab-p',    syllables: ['Б', 'Ъ', 'З'],                     correctWord: 'ЗЪБ'     },
      { id: 'stomah-p', syllables: ['М', 'А', 'Х', 'С', 'Т', 'О'],     correctWord: 'СТОМАХ'  },
      { id: 'prst-p',   syllables: ['Р', 'С', 'Т', 'Ъ', 'П'],          correctWord: 'ПРЪСТ'   },
      { id: 'raka-p',   syllables: ['А', 'К', 'Ъ', 'Р'],                correctWord: 'РЪКА'    },
      { id: 'sartse-p', syllables: ['Ц', 'Е', 'Р', 'С', 'Ъ'],          correctWord: 'СЪРЦЕ'   },
    ],
  } as SyllableBlocksExercise,

  // ─── ORDER 6 — ДИАЛОЗИ 1 (стр. 25): Боли ме окото ──────────────────────────────────────────
  {
    id: 'a2-l02-dialozi-01',
    type: 'dialogues',
    title: 'ДИАЛОЗИ 1',
    instruction: 'Натиснете всяка реплика, за да чуете произношението. После повторете на глас.',
    order: 6,
    imageUrl: '/assets/a2-lesson-02/04-dialozi-1-boli-oko/01-boli-oko.jpg',
    sections: [
      {
        id: 'а.',
        lines: [
          { text: 'Какво те боли?',     voiceGender: 'female' },
          { text: 'Боли ме окото.',     voiceGender: 'male'   },
        ],
      },
      {
        id: 'б.',
        bubbleSide: 'right',
        lines: [
          { text: 'Как си?',                        voiceGender: 'female' },
          { text: 'Не съм добре. Болят ме очите.', voiceGender: 'male'   },
        ],
      },
    ],
  } as DialoguesExercise,

  // SKIP — Упр. 4 „Прочетете диалозите по двойки" (по желание на клиента)
  // SKIP — Упр. 5 „Практикувайте диалозите по двойки" (по желание на клиента)

  // ─── ORDER 7 — Упр. 6 (стр. 25): преобразувайте „Боли ме" → „Болят ме" ────────────────────
  {
    id: 'a2-l02-ex-06',
    type: 'workbook_fill_blank',
    instruction: 'Преобразувайте изреченията по модела „Боли ме ухото. → Болят ме ушите."',
    order: 7,
    points: 4,
    layout: 'qa-split',
    sentences: [
      { text: 'Боли ме ухото. | Болят ме ушите.', blanks: [], correctAnswers: [], isExample: true },
      { text: 'Боли ме окото. | _______',     blanks: [1], correctAnswers: ['Болят ме очите.'],  acceptableAnswers: [['болят ме очите.', 'болят ме очите']] },
      { text: 'Боли ме кракът. | _______',    blanks: [1], correctAnswers: ['Болят ме краката.'], acceptableAnswers: [['болят ме краката.', 'болят ме краката']] },
      { text: 'Боли ме ръката. | _______',    blanks: [1], correctAnswers: ['Болят ме ръцете.'],  acceptableAnswers: [['болят ме ръцете.', 'болят ме ръцете']] },
      { text: 'Боли ме зъбът. | _______',     blanks: [1], correctAnswers: ['Болят ме зъбите.'],  acceptableAnswers: [['болят ме зъбите.', 'болят ме зъбите']] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 8 — Упр. 7 (стр. 25): напишете боли или болят ───────────────────────────────────
  {
    id: 'a2-l02-ex-07',
    type: 'dropdown_match',
    instruction: 'Изберете **боли** или **болят** по модела „Боли ме окото."',
    order: 8,
    points: 7,
    questions: [
      { id: 'q1', left: '_______ ме ушите.',   options: ['Боли', 'Болят'], correctAnswer: 'Болят' },
      { id: 'q2', left: '_______ ме стомахът.', options: ['Боли', 'Болят'], correctAnswer: 'Боли'  },
      { id: 'q3', left: '_______ ме гърлото.',  options: ['Боли', 'Болят'], correctAnswer: 'Боли'  },
      { id: 'q4', left: '_______ ме ръцете.',   options: ['Боли', 'Болят'], correctAnswer: 'Болят' },
      { id: 'q5', left: '_______ ме зъбите.',   options: ['Боли', 'Болят'], correctAnswer: 'Болят' },
      { id: 'q6', left: '_______ ме главата.',  options: ['Боли', 'Болят'], correctAnswer: 'Боли'  },
      { id: 'q7', left: '_______ ме краката.',  options: ['Боли', 'Болят'], correctAnswer: 'Болят' },
    ],
  } as DropdownMatchExercise,

  // ─── ORDER 9 — ГРАМАТИКА 2 (стр. 25): Боли ме / Болят ме ───────────────────────────────────
  {
    id: 'a2-l02-gramatika-02',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 2',
    subtitle: 'Боли ме / Болят ме',
    instruction: 'Запознайте се с конструкциите „боли ме" и „болят ме".',
    instructionKey: 'grammar.a2l02.g2.instruction',
    order: 9,
    tableTitle: 'Боли ме / Болят ме',
    columns: ['Боли … (единствено число)', 'Болят … (множествено число)'],
    rows: [
      { pronoun: 'аз',  cells: ['Боли **ме**',  'Болят **ме**']  },
      { pronoun: 'ти',  cells: ['Боли **те**',  'Болят **те**']  },
      { pronoun: 'той', cells: ['Боли **го**',  'Болят **го**']  },
      { pronoun: 'тя',  cells: ['Боли **я**',   'Болят **я**']   },
      { pronoun: 'Вие', cells: ['Боли **Ви**',  'Болят **Ви**']  },
      { pronoun: 'ние', cells: ['—',            'Болят **ни**']  },
      { pronoun: 'вие', cells: ['—',            'Болят **ви**']  },
      { pronoun: 'те',  cells: ['—',            'Болят **ги**']  },
    ],
    notes: [
      'Боли ме главата. (единствено число — глава, крак, зъб...)',
      'Болят ме очите. (множествено число — очи, уши, ръце, зъби, крака...)',
      'Боли ме коремът. = Имам болки в корема.',
    ],
    ttsNotes: [
      'Боли ме главата. Единствено число: глава, крак, зъб.',
      'Болят ме очите. Множествено число: очи, уши, ръце, зъби, крака.',
      'Боли ме коремът. Имам болки в корема.',
    ],
  } as GrammarTableExercise,

  // ─── ORDER 10 — Упр. 8 (стр. 26): правилното местоимение ───────────────────────────────────
  {
    id: 'a2-l02-ex-08',
    type: 'dropdown_match',
    instruction: 'Изберете правилното местоимение по модела „Аз не съм добре. Боли **ме** главата."',
    order: 10,
    points: 6,
    questions: [
      { id: 'q1', left: 'Той не е добре. Боли _______ кракът.',  options: ['ме', 'те', 'го', 'я', 'ни', 'ви', 'ги'], correctAnswer: 'го' },
      { id: 'q2', left: 'Те не са добре. Болят _______ зъбите.', options: ['ме', 'те', 'го', 'я', 'ни', 'ви', 'ги'], correctAnswer: 'ги' },
      { id: 'q3', left: 'Тя не е добре. Боли _______ коремът.',  options: ['ме', 'те', 'го', 'я', 'ни', 'ви', 'ги'], correctAnswer: 'я'  },
      { id: 'q4', left: 'Ние не сме добре. Болят _______ очите.', options: ['ме', 'те', 'го', 'я', 'ни', 'ви', 'ги'], correctAnswer: 'ни' },
      { id: 'q5', left: 'Ти не си добре. Боли _______ ухото.',   options: ['ме', 'те', 'го', 'я', 'ни', 'ви', 'ги'], correctAnswer: 'те' },
      { id: 'q6', left: 'Вие не сте добре. Болят _______ гърдите.', options: ['ме', 'те', 'го', 'я', 'ни', 'ви', 'ги'], correctAnswer: 'ви' },
    ],
  } as DropdownMatchExercise,

  // ─── ORDER 11 — НОВИ ДУМИ 2 (стр. 26): болести и симптоми ──────────────────────────────────
  {
    id: 'a2-l02-novi-dumi-02',
    type: 'illustrated_cards',
    title: 'НОВИ ДУМИ 2',
    subtitle: 'Болести и симптоми',
    instruction: '',
    order: 11,
    cards: [
      { id: 'nd2-grip',          imageUrl: '/assets/a2-lesson-02/05-novi-dumi-2-bolesti/01-grip.jpg',         label: 'Имам грип.',             ttsLabel: 'Имам грип.'              },
      { id: 'nd2-temperatura',   imageUrl: '/assets/a2-lesson-02/05-novi-dumi-2-bolesti/02-temperatura.jpg',  label: 'Имам температура.',      ttsLabel: 'Имам температура.'       },
      { id: 'nd2-hrema',         imageUrl: '/assets/a2-lesson-02/05-novi-dumi-2-bolesti/03-hrema.jpg',         label: 'Имам хрема.',            ttsLabel: 'Имам хрема.'             },
      { id: 'nd2-kashlitsa',     imageUrl: '/assets/a2-lesson-02/05-novi-dumi-2-bolesti/04-kashlitsa.jpg',    label: 'Имам кашлица.',          ttsLabel: 'Имам кашлица.'           },
      { id: 'nd2-alergiya',      imageUrl: '/assets/a2-lesson-02/05-novi-dumi-2-bolesti/05-alergiya.jpg',     label: 'Имам алергия.',          ttsLabel: 'Имам алергия.'           },
      { id: 'nd2-bronhit',       imageUrl: '/assets/a2-lesson-02/05-novi-dumi-2-bolesti/06-bronhit.jpg',      label: 'Имам бронхит.',          ttsLabel: 'Имам бронхит.'           },
      { id: 'nd2-visoko-kravno', imageUrl: '/assets/a2-lesson-02/05-novi-dumi-2-bolesti/07-visoko-kravno.jpg', label: 'Имам високо кръвно.',  ttsLabel: 'Имам високо кръвно.'  },
      { id: 'nd2-nisko-kravno',  imageUrl: '/assets/a2-lesson-02/05-novi-dumi-2-bolesti/08-nisko-kravno.jpg', label: 'Имам ниско кръвно.',   ttsLabel: 'Имам ниско КРЪВНО.'   },
    ],
  } as IllustratedCardsExercise,

  // ─── ORDER 12 — Упр. 9 (стр. 26): свържете картинката с думата (същите картинки като в НОВИ ДУМИ 2) ──
  {
    id: 'a2-l02-ex-09',
    type: 'image_labeling',
    instruction: 'Изберете правилната дума под всяка картинка. Картинките са същите като в НОВИ ДУМИ 2 по-горе.',
    order: 12,
    points: 4,
    displayType: 'row',
    images: [
      { id: 'bol-temperatura', imageUrl: '/assets/a2-lesson-02/05-novi-dumi-2-bolesti/02-temperatura.jpg',   correctLabel: 'температура'    },
      { id: 'bol-hrema',       imageUrl: '/assets/a2-lesson-02/05-novi-dumi-2-bolesti/03-hrema.jpg',         correctLabel: 'хрема'          },
      { id: 'bol-visoko',      imageUrl: '/assets/a2-lesson-02/05-novi-dumi-2-bolesti/07-visoko-kravno.jpg', correctLabel: 'високо кръвно'  },
      { id: 'bol-kashlitsa',   imageUrl: '/assets/a2-lesson-02/05-novi-dumi-2-bolesti/04-kashlitsa.jpg',     correctLabel: 'кашлица'        },
    ],
    options: ['температура', 'хрема', 'високо кръвно', 'кашлица'],
  } as ImageLabelingExercise,

  // ─── ORDER 13 — ДИАЛОЗИ 2 (стр. 26): кихане и симптоми ─────────────────────────────────────
  {
    id: 'a2-l02-dialozi-02',
    type: 'dialogues',
    title: 'ДИАЛОЗИ 2',
    instruction: 'Натиснете всяка реплика, за да чуете произношението. После повторете на глас.',
    order: 13,
    imageUrl: '/assets/a2-lesson-02/06-dialozi-2-kihane/01-kihane.jpg',
    sections: [
      {
        id: 'а.',
        bubbleSide: 'left',
        lines: [
          { text: 'Имате ли високо кръвно?',                                 voiceGender: 'female' },
          { text: 'Не, кръвното ми е нормално – 120 на 80.',                voiceGender: 'male', ttsText: 'Не, кръвното ми е нормално. Сто и двадесет на осемдесет.' },
        ],
      },
      {
        id: 'б.',
        bubbleSide: 'right',
        lines: [
          { text: 'Имам температура и кашлица и ме боли главата.', voiceGender: 'male'   },
          { text: 'Може би е грип.',                                voiceGender: 'female', ttsText: 'Може би е ГриП?' },
        ],
      },
      {
        id: 'в.',
        bubbleSide: 'left',
        lines: [
          { text: 'Как сте?',                                         voiceGender: 'female', ttsText: 'КАК сте?' },
          { text: 'Имам хрема, кихам, но нямам температура.',        voiceGender: 'male'   },
          { text: 'Това е алергия.',                                  voiceGender: 'female' },
        ],
      },
    ],
  } as DialoguesExercise,

  // SKIP — Упр. 10 „Прочетете диалозите по двойки" (по желание на клиента)
  // SKIP — Упр. 11 „Практикувайте диалозите по двойки" (по желание на клиента)

  // ─── ORDER 14 — ГРАМАТИКА 3 (стр. 27): Дателни местоимения ─────────────────────────────────
  {
    id: 'a2-l02-gramatika-03',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 3',
    subtitle: 'Дателни форми на личните местоимения',
    instruction: 'Запознайте се с кратките дателни форми на личните местоимения.',
    instructionKey: 'grammar.a2l02.g3.instruction',
    order: 14,
    tableTitle: 'Кратки дателни местоимения',
    columns: ['Кратка форма', 'Пример'],
    rows: [
      { pronoun: 'аз',  cells: ['**ми**', 'Пиша **ми**.']   },
      { pronoun: 'ти',  cells: ['**ти**', 'Пиша **ти**.']   },
      { pronoun: 'той', cells: ['**му**', 'Пиша **му**.']   },
      { pronoun: 'тя',  cells: ['**ѝ**',  'Пиша **ѝ**.']    },
      { pronoun: 'то',  cells: ['**му**', 'Пиша **му**.']   },
      { pronoun: 'ние', cells: ['**ни**', 'Пиша **ни**.']   },
      { pronoun: 'Вие', cells: ['**ви**', 'Пиша **ви**.']   },
      { pronoun: 'те',  cells: ['**им**', 'Пиша **им**.']   },
    ],
    notes: [
      'Пиша на Иван. → Пиша **му**.',
      'Пиша на Мария. → Пиша **ѝ**.',
      'Внимание! Обаждам се на Васил. → Обаждам **му** се.',
    ],
    ttsNotes: [
      'Пиша на Иван. Пиша му.',
      'Пиша на Мария. Пиша и.',
      'Внимание. Обаждам се на Васил. Обаждам му се.',
    ],
  } as GrammarTableExercise,

  // ─── ORDER 15 — Упр. 12 (стр. 27): преобразувайте с дателни ────────────────────────────────
  {
    id: 'a2-l02-ex-12',
    type: 'workbook_fill_blank',
    instruction: 'Преобразувайте изреченията по модела „Аз помагам на мама. → Аз ѝ помагам."',
    order: 15,
    points: 5,
    layout: 'qa-split',
    imageUrl: '/assets/a2-lesson-02/07-upr-12-kuhnya/01-maika-dushterya-gotvyat.jpg',
    sentences: [
      { text: 'Аз помагам на мама. | Аз ѝ помагам.', blanks: [], correctAnswers: [], isExample: true },
      { text: 'Аз давам на Емил вода. | _______',                      blanks: [1], correctAnswers: ['Аз му давам вода.'],                       acceptableAnswers: [['аз му давам вода.', 'аз му давам вода', 'му давам вода.', 'му давам вода']] },
      { text: 'Аз казвам на Иман „Добро утро". | _______',             blanks: [1], correctAnswers: ['Аз ѝ казвам „Добро утро".'],               acceptableAnswers: [['аз ѝ казвам „добро утро".', 'аз й казвам „добро утро".', 'аз и казвам „добро утро".', 'ѝ казвам „добро утро"', 'й казвам „добро утро"', 'и казвам добро утро', 'ѝ казвам добро утро', 'й казвам добро утро']] },
      { text: 'Аз отговарям на децата. | _______',                     blanks: [1], correctAnswers: ['Аз им отговарям.'],                         acceptableAnswers: [['аз им отговарям.', 'аз им отговарям', 'им отговарям.', 'им отговарям']] },
      { text: 'Аз пиша на Иван и Мария. | _______',                    blanks: [1], correctAnswers: ['Аз им пиша.'],                              acceptableAnswers: [['аз им пиша.', 'аз им пиша', 'им пиша.', 'им пиша']] },
      { text: 'Аз се обаждам на Таня по телефона. | _______',         blanks: [1], correctAnswers: ['Аз ѝ се обаждам по телефона.'],             acceptableAnswers: [['аз ѝ се обаждам по телефона.', 'аз й се обаждам по телефона.', 'аз и се обаждам по телефона.', 'аз ѝ се обаждам по телефона', 'ѝ се обаждам по телефона', 'й се обаждам по телефона', 'и се обаждам по телефона']] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 16 — ГРАМАТИКА 4 (стр. 27): отрицание и въпрос с дателни ─────────────────────────
  {
    id: 'a2-l02-gramatika-04',
    type: 'grammar_examples',
    title: 'ГРАМАТИКА 4',
    subtitle: 'Отрицание и въпрос с дателни местоимения',
    instruction: 'Запознайте се с дателните местоимения в положителни, отрицателни и въпросителни изречения.',
    instructionKey: 'grammar.a2l02.g4.instruction',
    order: 16,
    layout: 'centered',
    examples: [
      {
        imageUrl: '',
        text: '(+)',
        lines: [
          'Те благодарят на Иван.',
          'Те **му** благодарят.',
          'Благодарят **му**.',
        ],
        ttsText: 'Те благодарят на Иван. Те му благодарят. Благодарят му.',
        voiceGender: 'female',
      },
      {
        imageUrl: '',
        text: '(−)',
        lines: [
          'Те **не** благодарят на Иван.',
          'Те **не му** благодарят.',
          '**Не му** благодарят.',
        ],
        ttsText: 'Те не благодарят на Иван. Те не му благодарят. Не му благодарят.',
        voiceGender: 'female',
      },
      {
        imageUrl: '',
        text: '(?)',
        lines: [
          'Те благодарят **ли** на Иван?',
          'Те благодарят **ли му**?',
          'Благодарят **ли му**?',
        ],
        ttsText: 'Те благодарят ли на Иван? Те благодарят ли му? Благодарят ли му?',
        voiceGender: 'female',
      },
    ],
  } as GrammarExamplesExercise,

  // ─── ORDER 17 — Упр. 13 (стр. 27): преобразувайте по модела (+/−/?) ──────────────────────────
  {
    id: 'a2-l02-ex-13',
    type: 'a2-grouped-dropdown-match',
    instruction: 'Изберете правилното изречение. Всяка група е в реда: положително (+), отрицателно (−), въпросително (?). Модел: „Ани казва всичко на Мери. → Ани ѝ казва всичко. → Ани не ѝ казва всичко. → Ани казва ли ѝ всичко?"',
    order: 17,
    points: 15,
    groupSize: 3,
    questions: [
      // помага → + / − / ?
      { id: 'q01', left: 'Ани помага на Мери. (+) _______', options: ['Ани ѝ помага.', 'Ани помага ли ѝ?', 'Ани не ѝ помага.'], correctAnswer: 'Ани ѝ помага.' },
      { id: 'q02', left: 'Ани помага на Мери. (−) _______', options: ['Ани ѝ помага.', 'Ани помага ли ѝ?', 'Ани не ѝ помага.'], correctAnswer: 'Ани не ѝ помага.' },
      { id: 'q03', left: 'Ани помага на Мери. (?) _______', options: ['Ани ѝ помага.', 'Ани помага ли ѝ?', 'Ани не ѝ помага.'], correctAnswer: 'Ани помага ли ѝ?' },
      // говори → + / − / ?
      { id: 'q04', left: 'Ани говори на Мери. (+) _______', options: ['Ани ѝ говори.', 'Ани говори ли ѝ?', 'Ани не ѝ говори.'], correctAnswer: 'Ани ѝ говори.' },
      { id: 'q05', left: 'Ани говори на Мери. (−) _______', options: ['Ани ѝ говори.', 'Ани говори ли ѝ?', 'Ани не ѝ говори.'], correctAnswer: 'Ани не ѝ говори.' },
      { id: 'q06', left: 'Ани говори на Мери. (?) _______', options: ['Ани ѝ говори.', 'Ани говори ли ѝ?', 'Ани не ѝ говори.'], correctAnswer: 'Ани говори ли ѝ?' },
      // пише → + / − / ?
      { id: 'q07', left: 'Ани пише на Мери. (+) _______', options: ['Ани ѝ пише.', 'Ани пише ли ѝ?', 'Ани не ѝ пише.'], correctAnswer: 'Ани ѝ пише.' },
      { id: 'q08', left: 'Ани пише на Мери. (−) _______', options: ['Ани ѝ пише.', 'Ани пише ли ѝ?', 'Ани не ѝ пише.'], correctAnswer: 'Ани не ѝ пише.' },
      { id: 'q09', left: 'Ани пише на Мери. (?) _______', options: ['Ани ѝ пише.', 'Ани пише ли ѝ?', 'Ани не ѝ пише.'], correctAnswer: 'Ани пише ли ѝ?' },
      // купува рокля → + / − / ?
      { id: 'q10', left: 'Ани купува на Мери рокля. (+) _______', options: ['Ани ѝ купува рокля.', 'Ани купува ли ѝ рокля?', 'Ани не ѝ купува рокля.'], correctAnswer: 'Ани ѝ купува рокля.' },
      { id: 'q11', left: 'Ани купува на Мери рокля. (−) _______', options: ['Ани ѝ купува рокля.', 'Ани купува ли ѝ рокля?', 'Ани не ѝ купува рокля.'], correctAnswer: 'Ани не ѝ купува рокля.' },
      { id: 'q12', left: 'Ани купува на Мери рокля. (?) _______', options: ['Ани ѝ купува рокля.', 'Ани купува ли ѝ рокля?', 'Ани не ѝ купува рокля.'], correctAnswer: 'Ани купува ли ѝ рокля?' },
      // дава химикалка → + / − / ?
      { id: 'q13', left: 'Ани дава на Мери химикалка. (+) _______', options: ['Ани ѝ дава химикалка.', 'Ани дава ли ѝ химикалка?', 'Ани не ѝ дава химикалка.'], correctAnswer: 'Ани ѝ дава химикалка.' },
      { id: 'q14', left: 'Ани дава на Мери химикалка. (−) _______', options: ['Ани ѝ дава химикалка.', 'Ани дава ли ѝ химикалка?', 'Ани не ѝ дава химикалка.'], correctAnswer: 'Ани не ѝ дава химикалка.' },
      { id: 'q15', left: 'Ани дава на Мери химикалка. (?) _______', options: ['Ани ѝ дава химикалка.', 'Ани дава ли ѝ химикалка?', 'Ани не ѝ дава химикалка.'], correctAnswer: 'Ани дава ли ѝ химикалка?' },
    ],
  } as A2GroupedDropdownExercise,

  // ─── ORDER 18 — ГРАМАТИКА 5 (стр. 28): Трябва ми ────────────────────────────────────────────
  {
    id: 'a2-l02-gramatika-05',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 5',
    subtitle: 'Трябва ми',
    instruction: 'Запознайте се с конструкцията „Трябва ми" — изразяваме нужда.',
    instructionKey: 'grammar.a2l02.g5.instruction',
    order: 18,
    tableTitle: 'Трябва ми…',
    columns: ['Форма', 'Пример'],
    rows: [
      { pronoun: 'аз',  cells: ['Трябва **ми**', 'Трябва **ми** един лев.']   },
      { pronoun: 'ти',  cells: ['Трябва **ти**', 'Трябва **ти** един лев.']   },
      { pronoun: 'той', cells: ['Трябва **му**', 'Трябва **му** един лев.']   },
      { pronoun: 'тя',  cells: ['Трябва **ѝ**',  'Трябва **ѝ** един лев.']    },
      { pronoun: 'то',  cells: ['Трябва **му**', 'Трябва **му** един лев.']   },
      { pronoun: 'ние', cells: ['Трябва **ни**', 'Трябва **ни** един лев.']   },
      { pronoun: 'Вие', cells: ['Трябва **ви**', 'Трябва **ви** един лев.']   },
      { pronoun: 'те',  cells: ['Трябва **им**', 'Трябва **им** един лев.']   },
    ],
    notes: [
      'Трябват **ми** два лева. (мн.ч.: трябват)',
      'Трябва ти един лев. | Не ти трябва един лев. | Трябва ли ти един лев?',
    ],
    ttsNotes: [
      'Трябват ми два лева. Множествено число: трябват.',
      'Трябва ти един лев. Не ти трябва един лев. Трябва ли ти един лев?',
    ],
  } as GrammarTableExercise,

  // ─── ORDER 19 — Упр. 14 (стр. 28): трябва ми ─────────────────────────────────────────────────
  {
    id: 'a2-l02-ex-14',
    type: 'workbook_fill_blank',
    instruction: 'Попълнете по модела „Нямам молив. → Трябва ми молив."',
    order: 19,
    points: 6,
    layout: 'qa-split',
    sentences: [
      { text: 'Нямам молив. | Трябва ми молив.', blanks: [], correctAnswers: [], isExample: true },
      { text: 'Нямам пари. | _______',           blanks: [1], correctAnswers: ['Трябват ми пари.'],         acceptableAnswers: [['трябват ми пари.', 'трябват ми пари']] },
      { text: 'Нямам бяла блуза. | _______',     blanks: [1], correctAnswers: ['Трябва ми бяла блуза.'],    acceptableAnswers: [['трябва ми бяла блуза.', 'трябва ми бяла блуза']] },
      { text: 'Нямам компютър. | _______',       blanks: [1], correctAnswers: ['Трябва ми компютър.'],      acceptableAnswers: [['трябва ми компютър.', 'трябва ми компютър']] },
      { text: 'Нямам маратонки. | _______',      blanks: [1], correctAnswers: ['Трябват ми маратонки.'],    acceptableAnswers: [['трябват ми маратонки.', 'трябват ми маратонки']] },
      { text: 'Нямам голям куфар. | _______',    blanks: [1], correctAnswers: ['Трябва ми голям куфар.'],   acceptableAnswers: [['трябва ми голям куфар.', 'трябва ми голям куфар']] },
      { text: 'Нямам химикалки. | _______',      blanks: [1], correctAnswers: ['Трябват ми химикалки.'],    acceptableAnswers: [['трябват ми химикалки.', 'трябват ми химикалки']] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 20 — ГРАМАТИКА 6 (стр. 28): безлични изречения (Топло ми е / Трудно ми е) ────────
  {
    id: 'a2-l02-gramatika-06',
    type: 'grammar_examples',
    title: 'ГРАМАТИКА 6',
    subtitle: 'Безлични изречения',
    instruction: 'Запознайте се с безличните изречения.',
    instructionKey: 'grammar.a2l02.g6.instruction',
    order: 20,
    layout: 'default',
    examples: [
      {
        imageUrl: '/assets/a2-lesson-02/08-gramatika-4-toplo-studeno/01-plazh-chadyr.jpg',
        text: 'През лятото е топло.',
        lines: ['Топло **ми** е.'],
        ttsText: 'През лятото е топло. Топло ми е.',
        voiceGender: 'male',
      },
      {
        imageUrl: '/assets/a2-lesson-02/08-gramatika-4-toplo-studeno/02-toplo-mi-e.jpg',
        text: 'Топло ми е.',
        lines: [],
        ttsText: 'Топло ми е.',
        voiceGender: 'male',
      },
      {
        imageUrl: '/assets/a2-lesson-02/08-gramatika-4-toplo-studeno/03-zima-snezhanka.jpg',
        text: 'През зимата е студено.',
        lines: ['Студено **ми** е.'],
        ttsText: 'През зимата е студено. Студено ми е.',
        voiceGender: 'female',
      },
      {
        imageUrl: '/assets/a2-lesson-02/08-gramatika-4-toplo-studeno/04-studeno-mi-e.jpg',
        text: 'Студено ми е.',
        lines: [],
        ttsText: 'Студено МИ е.',
        voiceGender: 'female',
      },
      {
        imageUrl: '/assets/a2-lesson-02/09-gramatika-5-trudno-interesno/01-trudno-angliyski.jpg',
        text: 'Уча английски. Трудно ми е.',
        lines: [],
        ttsText: 'Уча английски. Трудно ми е.',
        voiceGender: 'male',
      },
      {
        imageUrl: '/assets/a2-lesson-02/09-gramatika-5-trudno-interesno/02-interesno-balgarski.jpg',
        text: 'Уча български. Интересно ми е.',
        lines: [],
        ttsText: 'Уча български. Интересно ми е.',
        voiceGender: 'male',
      },
    ],
  } as GrammarExamplesExercise,

  // ─── ORDER 21 — Упр. 15 (стр. 28): изберете подходящото изречение ────────────────────────────
  {
    id: 'a2-l02-ex-15',
    type: 'dropdown_match',
    instruction: 'Изберете подходящото изречение.',
    order: 21,
    points: 7,
    questions: [
      { id: 'q1', left: 'Аз съм Мери.',                                     options: ['Приятно ми е.', 'Трудно ми е.', 'Студено ми е.', 'Интересно ми е.', 'Топло ми е.', 'Лесно ми е.', 'Лошо ми е.'], correctAnswer: 'Приятно ми е.' },
      { id: 'q2', left: 'Уча български.',                                   options: ['Приятно ми е.', 'Трудно ми е.', 'Студено ми е.', 'Интересно ми е.', 'Топло ми е.', 'Лесно ми е.', 'Лошо ми е.'], correctAnswer: 'Интересно ми е.', alternateCorrectAnswers: ['Трудно ми е.', 'Лесно ми е.'] },
      { id: 'q3', left: 'Тук е топло. Аз съм с пуловер и шал.',             options: ['Приятно ми е.', 'Трудно ми е.', 'Студено ми е.', 'Интересно ми е.', 'Топло ми е.', 'Лесно ми е.', 'Лошо ми е.'], correctAnswer: 'Топло ми е.' },
      { id: 'q4', left: 'Навън е студено. Нямам палто.',                    options: ['Приятно ми е.', 'Трудно ми е.', 'Студено ми е.', 'Интересно ми е.', 'Топло ми е.', 'Лесно ми е.', 'Лошо ми е.'], correctAnswer: 'Студено ми е.' },
      { id: 'q5', left: 'Уча математика.',                                  options: ['Приятно ми е.', 'Трудно ми е.', 'Студено ми е.', 'Интересно ми е.', 'Топло ми е.', 'Лесно ми е.', 'Лошо ми е.'], correctAnswer: 'Трудно ми е.', alternateCorrectAnswers: ['Лесно ми е.', 'Интересно ми е.'] },
      { id: 'q6', left: 'Имам нова работа.',                                options: ['Приятно ми е.', 'Трудно ми е.', 'Студено ми е.', 'Интересно ми е.', 'Топло ми е.', 'Лесно ми е.', 'Лошо ми е.'], correctAnswer: 'Приятно ми е.', alternateCorrectAnswers: ['Интересно ми е.'] },
      { id: 'q7', left: 'Не съм добре.',                                    options: ['Приятно ми е.', 'Трудно ми е.', 'Студено ми е.', 'Интересно ми е.', 'Топло ми е.', 'Лесно ми е.', 'Лошо ми е.'], correctAnswer: 'Лошо ми е.' },
    ],
  } as DropdownMatchExercise,

  // ─── ORDER 22 — ГРАМАТИКА 7 (стр. 29): пълна таблица безлични изречения ─────────────────────
  {
    id: 'a2-l02-gramatika-07',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 7',
    subtitle: 'Безлични изречения — пълна таблица',
    instruction: 'Запознайте се с безличните изречения с дателни местоимения.',
    instructionKey: 'grammar.a2l02.g7.instruction',
    order: 22,
    tableTitle: 'Топло/Студено/Трудно/Лошо/Приятно/Интересно … е.',
    columns: ['Форма'],
    rows: [
      { pronoun: 'аз',  cells: ['Топло **ми** е.'],  ttsModel: 'flash', ttsText: 'аз. Топло ми е.',  ttsPrompt: 'Bulgarian sentence. Read the final word „е" (the verb „is") as a clear short vowel E, never as „йе" or „ye".' },
      { pronoun: 'ти',  cells: ['Топло **ти** е.'],  ttsModel: 'flash', ttsText: 'ти. Топло ти е.',  ttsPrompt: 'Bulgarian sentence. Read the final word „е" (the verb „is") as a clear short vowel E, never as „йе" or „ye".' },
      { pronoun: 'той', cells: ['Топло **му** е.'],  ttsModel: 'flash', ttsText: 'той. Топло му е.', ttsPrompt: 'Bulgarian sentence. Read the final word „е" (the verb „is") as a clear short vowel E, never as „йе" or „ye".' },
      { pronoun: 'тя',  cells: ['Топло **ѝ** е.'],   ttsModel: 'flash', ttsText: 'тя. Топло й е.',   ttsPrompt: 'Bulgarian sentence. Read the final word „е" (the verb „is") as a clear short vowel E, never as „йе" or „ye".' },
      { pronoun: 'то',  cells: ['Топло **му** е.'],  ttsModel: 'flash', ttsText: 'То. Топло му е.',  ttsPrompt: 'Bulgarian sentence. Read the final word „е" (the verb „is") as a clear short vowel E, never as „йе" or „ye".' },
      { pronoun: 'ние', cells: ['Топло **ни** е.'],  ttsModel: 'flash', ttsText: 'ние. Топло ни е.', ttsPrompt: 'Bulgarian sentence. Read the final word „е" (the verb „is") as a clear short vowel E, never as „йе" or „ye".' },
      { pronoun: 'Вие', cells: ['Топло **ви** е.'],  ttsModel: 'flash', ttsText: 'Вие. Топло Ви е.', ttsPrompt: 'Bulgarian sentence. Read the final word „е" (the verb „is") as a clear short vowel E, never as „йе" or „ye".' },
      { pronoun: 'те',  cells: ['Топло **им** е.'],  ttsModel: 'flash', ttsText: 'те. Топло им е.',  ttsPrompt: 'Bulgarian sentence. Read the final word „е" (the verb „is") as a clear short vowel E, never as „йе" or „ye".' },
    ],
    notes: [
      'Топло ми е. | Не ми е топло. | Топло ли ми е?',
      'Замени „топло" с: студено, трудно, лошо, приятно, интересно, лесно.',
    ],
    ttsNotes: [
      'Топло ми е. Не ми е топло. Топло ли ми е?',
      'Замени топло с: студено, трудно, лошо, приятно, интересно, лесно.',
    ],
    ttsNoteModels: ['flash', 'flash'],
  } as GrammarTableExercise,

  // ─── ORDER 23 — Упр. 16 (стр. 29): попълнете правилното местоимение ─────────────────────────
  {
    id: 'a2-l02-ex-16',
    type: 'dropdown_match',
    instruction: 'Изберете правилното местоимение по модела „Той няма палто. Студено **му** е."',
    order: 23,
    points: 7,
    questions: [
      { id: 'q1', left: 'Аз съм Мария. Приятно _______ е.',                        options: ['ми', 'ти', 'му', 'ѝ', 'ни', 'ви', 'им'], correctAnswer: 'ми' },
      { id: 'q2', left: 'Прозорецът е затворен. Топло ли _______ е?',              options: ['ми', 'ти', 'му', 'ѝ', 'ни', 'ви', 'им'], correctAnswer: 'ти' },
      { id: 'q3', left: 'Той няма палто. Студено ли _______ е?',                   options: ['ми', 'ти', 'му', 'ѝ', 'ни', 'ви', 'им'], correctAnswer: 'му' },
      { id: 'q4', left: 'Ние сме в един музей. Интересно _______ е.',              options: ['ми', 'ти', 'му', 'ѝ', 'ни', 'ви', 'им'], correctAnswer: 'ни' },
      { id: 'q5', left: 'Тя има пет деца. Трудно _______ е.',                      options: ['ми', 'ти', 'му', 'ѝ', 'ни', 'ви', 'им'], correctAnswer: 'ѝ'  },
      { id: 'q6', left: 'Боли ме стомахът. Лошо _______ е.',                       options: ['ми', 'ти', 'му', 'ѝ', 'ни', 'ви', 'им'], correctAnswer: 'ми' },
      { id: 'q7', left: 'Вие вечерят с приятели. Приятно ли _______ е?',           options: ['ми', 'ти', 'му', 'ѝ', 'ни', 'ви', 'им'], correctAnswer: 'ви' },
    ],
  } as DropdownMatchExercise,

  // ─── ORDER 24 — НОВИ ДУМИ 3 (стр. 29): състояния и емоции ──────────────────────────────────
  {
    id: 'a2-l02-novi-dumi-03',
    type: 'illustrated_cards',
    title: 'НОВИ ДУМИ 3',
    subtitle: 'Състояния и емоции',
    instruction: '',
    order: 24,
    cards: [
      { id: 'zdrav',    imageUrl: '/assets/a2-lesson-02/10-novi-dumi-3-sastoyanie/01-zdrav.jpg',    label: 'здрав',    ttsLabel: 'здрав'    },
      { id: 'bolen',    imageUrl: '/assets/a2-lesson-02/10-novi-dumi-3-sastoyanie/02-bolen.jpg',    label: 'болен',    ttsLabel: 'болен'    },
      { id: 'gladen',   imageUrl: '/assets/a2-lesson-02/10-novi-dumi-3-sastoyanie/03-gladen.jpg',   label: 'гладен',   ttsLabel: 'гладен'   },
      { id: 'zhaden',   imageUrl: '/assets/a2-lesson-02/10-novi-dumi-3-sastoyanie/04-zhaden.jpg',   label: 'жаден',    ttsLabel: 'жаден',    ttsModel: 'flash' },
      { id: 'tazhen',   imageUrl: '/assets/a2-lesson-02/10-novi-dumi-3-sastoyanie/05-tazhen.jpg',   label: 'тъжен',    ttsLabel: 'тъжен'    },
      { id: 'vesel',    imageUrl: '/assets/a2-lesson-02/10-novi-dumi-3-sastoyanie/06-vesel.jpg',    label: 'весел',    ttsLabel: 'весел'    },
      { id: 'umoren',   imageUrl: '/assets/a2-lesson-02/10-novi-dumi-3-sastoyanie/07-umoren.jpg',   label: 'уморен',   ttsLabel: 'уморен',   ttsModel: 'flash' },
      { id: 'dovolen',  imageUrl: '/assets/a2-lesson-02/10-novi-dumi-3-sastoyanie/08-dovolen.jpg',  label: 'доволен',  ttsLabel: 'доволен'  },
    ],
  } as IllustratedCardsExercise,

  // ─── ORDER 25 — Упр. 17 (стр. 29): открийте скритите думи ──────────────────────────────────
  {
    id: 'a2-l02-ex-17',
    type: 'word_search',
    instruction: 'Колко думи можете да откриете?',
    order: 25,
    points: 8,
    letterString: 'веселгладниздравожаднаболниуморенадоволнатъжно',
    correctWords: ['весел', 'гладни', 'здраво', 'жадна', 'болни', 'уморена', 'доволна', 'тъжно'],
  } as WordSearchExercise,

  // ─── ORDER 26 — ГРАМАТИКА 8 (стр. 29): съм здрав/болен ─────────────────────────────────────
  {
    id: 'a2-l02-gramatika-08',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 8',
    subtitle: 'Съм здрав / болен',
    instruction: 'Запознайте се с глагола „съм" в конструкции за здравословно и емоционално състояние.',
    instructionKey: 'grammar.a2l02.g8.instruction',
    order: 26,
    tableTitle: 'Съм здрав / здрава',
    columns: ['съм', 'здрав / здрава'],
    rows: [
      { pronoun: 'Аз',  cells: ['**съм**', 'здрав / здрава.'] },
      { pronoun: 'Ти',  cells: ['**си**',  'здрав / здрава.'] },
      { pronoun: 'Той', cells: ['**е**',   'здрав.']          },
      { pronoun: 'Тя',  cells: ['**е**',   'здрава.']         },
      { pronoun: 'То',  cells: ['**е**',   'здраво.']         },
      { pronoun: 'Ние', cells: ['**сме**', 'здрави.']         },
      { pronoun: 'Вие', cells: ['**сте**', 'здрави.']         },
      { pronoun: 'Те',  cells: ['**са**',  'здрави.']         },
    ],
    notes: [
      'Здрав **съм**. Не **си** здрав. Здрав ли **си**?',
      'Здрав съм. = Аз съм здрав.',
    ],
    ttsNotes: [
      'Здрав съм. Не си здрав. Здрав ли си?',
      'Здрав съм. Аз съм здрав.',
    ],
  } as GrammarTableExercise,

  // ─── ORDER 27 — Упр. 18 (стр. 30): изберете подходящото изречение ───────────────────────────
  {
    id: 'a2-l02-ex-18',
    type: 'dropdown_match',
    instruction: 'Изберете подходящото изречение от кутията.',
    order: 27,
    points: 8,
    questions: [
      { id: 'q1', left: 'Работя много всеки ден.',                options: ['Жадна съм.', 'Гладно е.', 'Уморен съм.', 'Тъжни са.', 'Весел е.', 'Болен сте.', 'Здрава е.', 'Доволен си.'], correctAnswer: 'Уморен съм.' },
      { id: 'q2', left: 'Детето иска три кюфтета и салата.',     options: ['Жадна съм.', 'Гладно е.', 'Уморен съм.', 'Тъжни са.', 'Весел е.', 'Болен сте.', 'Здрава е.', 'Доволен си.'], correctAnswer: 'Гладно е.' },
      { id: 'q3', left: 'Искам една минерална вода.',             options: ['Жадна съм.', 'Гладно е.', 'Уморен съм.', 'Тъжни са.', 'Весел е.', 'Болен сте.', 'Здрава е.', 'Доволен си.'], correctAnswer: 'Жадна съм.' },
      { id: 'q4', left: 'Те нямат работа, нямат пари.',          options: ['Жадна съм.', 'Гладно е.', 'Уморен съм.', 'Тъжни са.', 'Весел е.', 'Болен сте.', 'Здрава е.', 'Доволен си.'], correctAnswer: 'Тъжни са.' },
      { id: 'q5', left: 'Петър има рожден ден и много гости.',   options: ['Жадна съм.', 'Гладно е.', 'Уморен съм.', 'Тъжни са.', 'Весел е.', 'Болен сте.', 'Здрава е.', 'Доволен си.'], correctAnswer: 'Весел е.' },
      { id: 'q6', left: 'Вие имате високо кръвно.',              options: ['Жадна съм.', 'Гладно е.', 'Уморен съм.', 'Тъжни са.', 'Весел е.', 'Болен сте.', 'Здрава е.', 'Доволен си.'], correctAnswer: 'Болен сте.' },
      { id: 'q7', left: 'Нямаш проблеми.',                       options: ['Жадна съм.', 'Гладно е.', 'Уморен съм.', 'Тъжни са.', 'Весел е.', 'Болен сте.', 'Здрава е.', 'Доволен си.'], correctAnswer: 'Доволен си.' },
      { id: 'q8', left: 'Мариам няма температура.',              options: ['Жадна съм.', 'Гладно е.', 'Уморен съм.', 'Тъжни са.', 'Весел е.', 'Болен сте.', 'Здрава е.', 'Доволен си.'], correctAnswer: 'Здрава е.' },
    ],
  } as DropdownMatchExercise,

  // ─── ORDER 28 — Упр. 19 (стр. 30): преобразуване болен/здрав (+/−/?) ────────────────────────
  {
    id: 'a2-l02-ex-19',
    type: 'workbook_fill_blank',
    instruction: 'Преобразувайте по модела „Болен си. → Не си болен. → Болен ли си?"',
    order: 28,
    points: 10,
    layout: 'single',
    sentences: [
      { text: 'Болен си. → Не си болен. → Болен ли си?', blanks: [], correctAnswers: [], isExample: true },
      { text: 'Болна съм. (−) _______',               blanks: [1], correctAnswers: ['Не съм болна.'],            acceptableAnswers: [['не съм болна.', 'не съм болна']] },
      { text: 'Болна съм. (?) _______',               blanks: [1], correctAnswers: ['Болна ли съм?'],            acceptableAnswers: [['болна ли съм?', 'болна ли съм']] },
      { text: 'Здрав си. (−) _______',                blanks: [1], correctAnswers: ['Не си здрав.'],             acceptableAnswers: [['не си здрав.', 'не си здрав']] },
      { text: 'Здрав си. (?) _______',                blanks: [1], correctAnswers: ['Здрав ли си?'],             acceptableAnswers: [['здрав ли си?', 'здрав ли си']] },
      { text: 'Момчето е здраво. (−) _______',        blanks: [1], correctAnswers: ['Момчето не е здраво.'],     acceptableAnswers: [['момчето не е здраво.', 'момчето не е здраво']] },
      { text: 'Момчето е здраво. (?) _______',        blanks: [1], correctAnswers: ['Момчето здраво ли е?'],     acceptableAnswers: [['момчето здраво ли е?', 'момчето здраво ли е', 'здраво ли е момчето?']] },
      { text: 'Павел и Стела са болни. (−) _______',  blanks: [1], correctAnswers: ['Павел и Стела не са болни.'], acceptableAnswers: [['павел и стела не са болни.', 'павел и стела не са болни']] },
      { text: 'Павел и Стела са болни. (?) _______',  blanks: [1], correctAnswers: ['Павел и Стела болни ли са?'], acceptableAnswers: [['павел и стела болни ли са?', 'павел и стела болни ли са']] },
      { text: 'Елена и Стефан са здрави. (−) _______', blanks: [1], correctAnswers: ['Елена и Стефан не са здрави.'], acceptableAnswers: [['елена и стефан не са здрави.', 'елена и стефан не са здрави']] },
      { text: 'Елена и Стефан са здрави. (?) _______', blanks: [1], correctAnswers: ['Елена и Стефан здрави ли са?'], acceptableAnswers: [['елена и стефан здрави ли са?', 'елена и стефан здрави ли са']] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 29 — ГРАМАТИКА 9 (стр. 30): Какво Ви е? / Как се чувствате? ────────────────────────
  {
    id: 'a2-l02-gramatika-09',
    type: 'grammar_examples',
    title: 'ГРАМАТИКА 9',
    subtitle: 'Какво Ви е? / Как се чувствате?',
    instruction: 'Запознайте се с начините да питаме за и описваме здравословното си състояние.',
    instructionKey: 'grammar.a2l02.g9.instruction',
    order: 29,
    layout: 'centered',
    examples: [
      {
        imageUrl: '',
        text: 'Питаме:',
        lines: [
          '**Какво Ви е?**',
          '**Как се чувствате?** = Как сте?',
        ],
        ttsText: 'Питаме: Какво Ви е? Как се чувствате? Как сте?',
        voiceGender: 'female',
      },
      {
        imageUrl: '',
        text: 'Отговаряме:',
        lines: [
          'Лошо ми е. Боли ме гърлото. Имам температура. Имам хрема.',
          'Аз се чувствам добре. = Чувствам се добре.',
        ],
        ttsText: 'Отговаряме: Лошо ми е. Боли ме гърлото. Имам температура. Имам хрема. Аз се чувствам добре. Чувствам се добре.',
        voiceGender: 'male',
      },
    ],
  } as GrammarExamplesExercise,

  // ─── ORDER 30 — ДИАЛОЗИ 3 (стр. 30): как се чувстваш? ──────────────────────────────────────
  {
    id: 'a2-l02-dialozi-03',
    type: 'dialogues',
    title: 'ДИАЛОЗИ 3',
    instruction: 'Натиснете всяка реплика, за да чуете произношението. После повторете на глас.',
    order: 30,
    sections: [
      {
        id: 'а.',
        lines: [
          { text: 'Добър ден. Как си?',                                       voiceGender: 'male'   },
          { text: 'Благодаря, добре. А ти?',                                  voiceGender: 'female' },
          { text: 'Чувствам се чудесно. Имам нова работа и съм много доволен.', voiceGender: 'male' },
          { text: 'Честито! А жена ти и децата как са?',                      voiceGender: 'female' },
          { text: 'И те са добре. Всички сме здрави.',                        voiceGender: 'male'   },
        ],
      },
      {
        id: 'б.',
        lines: [
          { text: 'Здравей, Мария! Как е Сашо?', ttsText: 'Здравей, Мария. Как е Сашоо?', voiceGender: 'male'   },
          { text: 'Не е добре.',                                               voiceGender: 'female' },
          { text: 'Какво му е?',                                               voiceGender: 'male'   },
          { text: 'Болен е. Има температура и го боли гърлото.',              voiceGender: 'female' },
          { text: 'А ти как се чувстваш?',                                    voiceGender: 'male'   },
          { text: 'Горе-долу, благодаря. Малко съм уморена.',                 voiceGender: 'female' },
        ],
      },
    ],
  } as DialoguesExercise,

  // SKIP — Упр. 20 „Прочетете диалозите по двойки" (по желание на клиента)
  // SKIP — Упр. 21 „Практикувайте диалозите" (по желание на клиента)

  // ─── ORDER 31 — НОВИ ДУМИ 4 (стр. 30–31): В ПОЛИКЛИНИКАТА ──────────────────────────────────
  {
    id: 'a2-l02-novi-dumi-04',
    type: 'illustrated_cards',
    title: 'НОВИ ДУМИ 4',
    subtitle: 'В поликлиниката',
    instruction: '',
    order: 31,
    cards: [
      { id: 'poliklinika',    imageUrl: '/assets/a2-lesson-02/11-novi-dumi-4-poliklinika/01-poliklinika.jpg',    label: 'поликлиника',                ttsLabel: 'поликлиника'   },
      { id: 'registratura',   imageUrl: '/assets/a2-lesson-02/11-novi-dumi-4-poliklinika/02-registratura.jpg',   label: 'регистратура',               ttsLabel: 'регистратура'  },
      { id: 'nd4-lichen-lekar', imageUrl: '/assets/a2-lesson-02/11-novi-dumi-4-poliklinika/03-lichen-lekar.jpg',   label: 'личен лекар = джипи',        ttsLabel: 'Личен лекар. Джи Пи.'   },
      { id: 'lek-kabinet',    imageUrl: '/assets/a2-lesson-02/11-novi-dumi-4-poliklinika/04-lekarski-kabinet.jpg', label: 'лекарски кабинет',         ttsLabel: 'лекарски кабинет', ttsPrompt: 'Speak in clear, neutral standard Bulgarian. Pronounce every sound from the first letter to the last, without dropping or adding any sounds. Calm, neutral tone, no emotional emphasis.' },
      // Лекарски специалности
      { id: 'nd4-pediatar',   imageUrl: '/assets/a2-lesson-02/12-lekarski-specialnosti/01-pediatar.jpg',         label: 'детски лекар = педиатър',    ttsLabel: 'Детски лекар. Педиатър.', ttsPrompt: 'Speak in clear, neutral standard Bulgarian. Pronounce every sound from the first letter to the last, without dropping or adding any sounds. Calm, neutral tone, no emotional emphasis.'      },
      { id: 'nd4-ung',        imageUrl: '/assets/a2-lesson-02/12-lekarski-specialnosti/02-ung.jpg',              label: 'уши-нос-гърло = УНГ',        ttsLabel: 'Уши, нос, гърло. У Н Ге.', ttsPrompt: 'Speak in clear, neutral standard Bulgarian. Pronounce every sound from the first letter to the last, without dropping or adding any sounds. Calm, neutral tone, no emotional emphasis.'           },
      { id: 'kardiolog',      imageUrl: '/assets/a2-lesson-02/12-lekarski-specialnosti/03-kardiolog.jpg',        label: 'кардиолог',                  ttsLabel: 'кардиолог', ttsPrompt: 'Speak in clear, neutral standard Bulgarian. Pronounce every sound from the first letter to the last, without dropping or adding any sounds. Calm, neutral tone, no emotional emphasis.'     },
      { id: 'nevrolog',       imageUrl: '/assets/a2-lesson-02/12-lekarski-specialnosti/04-nevrolog.jpg',         label: 'невролог',                   ttsLabel: 'невролог', ttsPrompt: 'Speak in clear, neutral standard Bulgarian. Pronounce every sound from the first letter to the last, without dropping or adding any sounds. Calm, neutral tone, no emotional emphasis.'      },
      { id: 'hirurg',         imageUrl: '/assets/a2-lesson-02/12-lekarski-specialnosti/05-hirurg.jpg',           label: 'хирург',                     ttsLabel: 'хирург', ttsPrompt: 'Speak in clear, neutral standard Bulgarian. Pronounce every sound from the first letter to the last, without dropping or adding any sounds. Calm, neutral tone, no emotional emphasis.'        },
      { id: 'zabolakar',      imageUrl: '/assets/a2-lesson-02/12-lekarski-specialnosti/06-zabolakar.jpg',        label: 'зъболекар',                  ttsLabel: 'зъболекар', ttsPrompt: 'Speak in clear, neutral standard Bulgarian. Pronounce every sound from the first letter to the last, without dropping or adding any sounds. Calm, neutral tone, no emotional emphasis.'     },
      // Документи и процедури
      { id: 'napravlenie',    imageUrl: '/assets/a2-lesson-02/12-lekarski-specialnosti/07-napravlenie.jpg',        label: 'направление',                ttsLabel: 'направление', ttsPrompt: 'Speak in clear, neutral standard Bulgarian. Pronounce every sound from the first letter to the last, without dropping or adding any sounds. Calm, neutral tone, no emotional emphasis.'             },
      { id: 'izsledvane',     imageUrl: '/assets/a2-lesson-02/12-lekarski-specialnosti/08-izsledvane-krav-urina.jpg', label: 'изследване на кръв и урина', ttsLabel: 'изследване на кръв и урина', ttsPrompt: 'Speak in clear, neutral standard Bulgarian. Pronounce every sound from the first letter to the last, without dropping or adding any sounds. Calm, neutral tone, no emotional emphasis.' },
      { id: 'kravna-kartina', imageUrl: '/assets/a2-lesson-02/12-lekarski-specialnosti/09-kravna-kartina.jpg',     label: 'кръвна картина',             ttsLabel: 'кръвна картина', ttsPrompt: 'Speak in clear, neutral standard Bulgarian. Pronounce every sound from the first letter to the last, without dropping or adding any sounds. Calm, neutral tone, no emotional emphasis.'          },
      { id: 'imunizatsiya',   imageUrl: '/assets/a2-lesson-02/12-lekarski-specialnosti/10-imunizatsiya.jpg',       label: 'имунизация',                 ttsLabel: 'имунизация', ttsPrompt: 'Speak in clear, neutral standard Bulgarian. Pronounce every sound from the first letter to the last, without dropping or adding any sounds. Calm, neutral tone, no emotional emphasis.'              },
      { id: 'operatsiya',     imageUrl: '/assets/a2-lesson-02/12-lekarski-specialnosti/11-operatsiya.jpg',         label: 'операция',                   ttsLabel: 'операция', ttsPrompt: 'Speak in clear, neutral standard Bulgarian. Pronounce every sound from the first letter to the last, without dropping or adding any sounds. Calm, neutral tone, no emotional emphasis.'                },
    ],
  } as IllustratedCardsExercise,

  // ─── ORDER 32 — Упр. 22 (стр. 31): съпоставете специалист към проблем ────────────────────────
  {
    id: 'a2-l02-ex-22',
    type: 'dropdown_match',
    instruction: 'Изберете правилния специалист по модела „Детето има нужда от имунизация. – Трябва Ви педиатър."',
    order: 32,
    points: 6,
    questions: [
      { id: 'q1', left: 'Детето има нужда от имунизация.',   options: ['педиатър', 'кардиолог', 'невролог', 'зъболекар', 'УНГ', 'личен лекар', 'хирург'], correctAnswer: 'педиатър',    isExample: true },
      { id: 'q2', left: 'Имам проблем със сърцето.',         options: ['педиатър', 'кардиолог', 'невролог', 'зъболекар', 'УНГ', 'личен лекар', 'хирург'], correctAnswer: 'кардиолог'   },
      { id: 'q3', left: 'Боли ме кръстът.',                  options: ['педиатър', 'кардиолог', 'невролог', 'зъболекар', 'УНГ', 'личен лекар', 'хирург'], correctAnswer: 'невролог'    },
      { id: 'q4', left: 'Болят ме зъбите.',                  options: ['педиатър', 'кардиолог', 'невролог', 'зъболекар', 'УНГ', 'личен лекар', 'хирург'], correctAnswer: 'зъболекар'   },
      { id: 'q5', left: 'Имам хрема и кашлица.',             options: ['педиатър', 'кардиолог', 'невролог', 'зъболекар', 'УНГ', 'личен лекар', 'хирург'], correctAnswer: 'УНГ'         },
      { id: 'q6', left: 'Имам нужда от направление.',        options: ['педиатър', 'кардиолог', 'невролог', 'зъболекар', 'УНГ', 'личен лекар', 'хирург'], correctAnswer: 'личен лекар' },
      { id: 'q7', left: 'Имам нужда от операция.',           options: ['педиатър', 'кардиолог', 'невролог', 'зъболекар', 'УНГ', 'личен лекар', 'хирург'], correctAnswer: 'хирург'      },
    ],
  } as DropdownMatchExercise,

  // ─── ORDER 33 — ДИАЛОЗИ 4 (стр. 31): в лекарския кабинет ───────────────────────────────────
  {
    id: 'a2-l02-dialozi-04',
    type: 'dialogues',
    title: 'ДИАЛОЗИ 4',
    subtitle: 'В лекарския кабинет',
    instruction: 'Натиснете всяка реплика, за да чуете произношението. После повторете на глас.',
    order: 33,
    sections: [
      {
        id: 'а.',
        lines: [
          { text: 'Добър ден. Какво Ви е?',                                                              voiceGender: 'female' },
          { text: 'Лошо ми е. Кашлям много, болят ме гърдите.',                                         voiceGender: 'male'   },
          { text: 'Имате бронхит. Ето рецепта за лекарства. В поликлиниката има аптека.',               voiceGender: 'female' },
        ],
      },
      {
        id: 'б.',
        lines: [
          { text: 'Добър ден, д-р Димитров.', ttsText: 'Добър ден, доктор Димитров.',                  voiceGender: 'female' },
          { text: 'Добър ден. Как е детето?',                                                            voiceGender: 'male'   },
          { text: 'Боли го гърлото, главата, има температура.',                                          voiceGender: 'female' },
          { text: 'Трябва изследване на кръв и урина.',                                                  voiceGender: 'male'   },
        ],
      },
    ],
  } as DialoguesExercise,

  // SKIP — Упр. 23 „Прочетете диалозите по двойки" (по желание на клиента)
  // SKIP — Упр. 24 „Практикувайте диалозите" (по желание на клиента)

  // ─── ORDER 34 — НОВИ ДУМИ 5 (стр. 31): В АПТЕКАТА ──────────────────────────────────────────
  {
    id: 'a2-l02-novi-dumi-05',
    type: 'illustrated_cards',
    title: 'НОВИ ДУМИ 5',
    subtitle: 'В аптеката',
    instruction: '',
    order: 34,
    cards: [
      { id: 'recepta',       imageUrl: '/assets/a2-lesson-02/13-novi-dumi-5-apteka/01-recepta.jpg',          label: 'рецепта',               ttsLabel: 'рецепта',          ttsPrompt: 'Speak in clear, neutral standard Bulgarian. Pronounce every sound from the first letter to the last, without dropping or adding any sounds. Calm, neutral tone, no emotional emphasis.' },
      { id: 'lekarstva',     imageUrl: '/assets/a2-lesson-02/13-novi-dumi-5-apteka/02-lekarstva.jpg',        label: 'лекарства',             ttsLabel: 'лекарства',        ttsPrompt: 'Speak in clear, neutral standard Bulgarian. Pronounce every sound from the first letter to the last, without dropping or adding any sounds. Calm, neutral tone, no emotional emphasis.' },
      { id: 'sirop',         imageUrl: '/assets/a2-lesson-02/13-novi-dumi-5-apteka/03-sirop-za-kashlitsa.jpg', label: 'сироп за кашлица',    ttsLabel: 'сироп за кашлица', ttsPrompt: 'Speak in clear, neutral standard Bulgarian. Pronounce every sound from the first letter to the last, without dropping or adding any sounds. Calm, neutral tone, no emotional emphasis.' },
      { id: 'kapki',         imageUrl: '/assets/a2-lesson-02/13-novi-dumi-5-apteka/04-kapki.jpg',            label: 'капки за нос / очи / уши', ttsLabel: 'капки за нос, очи и уши', ttsPrompt: 'Speak in clear, neutral standard Bulgarian. Pronounce every sound from the first letter to the last, without dropping or adding any sounds. Calm, neutral tone, no emotional emphasis.' },
      { id: 'nd5-antibiotik', imageUrl: '/assets/a2-lesson-02/13-novi-dumi-5-apteka/05-antibiotik.jpg',       label: 'опаковка антибиотик',   ttsLabel: 'опаковка антибиотик',       ttsPrompt: 'Speak in clear, neutral standard Bulgarian. Pronounce every sound from the first letter to the last, without dropping or adding any sounds. Calm, neutral tone, no emotional emphasis. Stress the word „антибиотик" on the fourth syllable -О-: антиби-О-тик.' },
      { id: 'nd5-aspirin',    imageUrl: '/assets/a2-lesson-02/13-novi-dumi-5-apteka/06-blister-aspirin.jpg',  label: 'блистер аспирин',       ttsLabel: 'блистер аспирин',          ttsPrompt: 'Speak in clear, neutral standard Bulgarian. Pronounce every sound from the first letter to the last, without dropping or adding any sounds. Calm, neutral tone, no emotional emphasis.' },
      { id: 'nd5-prahche',    imageUrl: '/assets/a2-lesson-02/13-novi-dumi-5-apteka/07-prahche-za-grip.jpg',  label: 'прахче за грип',        ttsLabel: 'прахче за грип',   ttsPrompt: 'Speak in clear, neutral standard Bulgarian. Pronounce every sound from the first letter to the last, without dropping or adding any sounds. Calm, neutral tone, no emotional emphasis.' },
      { id: 'pamuk',         imageUrl: '/assets/a2-lesson-02/13-novi-dumi-5-apteka/08-pamuk.jpg',            label: 'памук',                 ttsLabel: 'памук',            ttsPrompt: 'Speak in clear, neutral standard Bulgarian. Pronounce every sound from the first letter to the last, without dropping or adding any sounds. Calm, neutral tone, no emotional emphasis. Stress the FIRST syllable: ПА-мук (stressed А).' },
      { id: 'bint',          imageUrl: '/assets/a2-lesson-02/13-novi-dumi-5-apteka/09-bint.jpg',             label: 'бинт',                  ttsLabel: 'бинт',             ttsPrompt: 'Speak in clear, neutral standard Bulgarian. Pronounce every sound from the first letter to the last, without dropping or adding any sounds. Calm, neutral tone, no emotional emphasis.' },
      { id: 'marlya',        imageUrl: '/assets/a2-lesson-02/13-novi-dumi-5-apteka/10-marlya.jpg',           label: 'марля',                 ttsLabel: 'марля',            ttsModel: 'flash', ttsPrompt: 'Read the single Bulgarian word „марля" (medical gauze). Two syllables: МАР-ля. Put the stress firmly on the FIRST syllable МАР. Do NOT stress the second syllable -ля. Clear, neutral standard Bulgarian, no extra sounds.' },
      { id: 'termometar',    imageUrl: '/assets/a2-lesson-02/13-novi-dumi-5-apteka/11-termometar.jpg',       label: 'термометър',            ttsLabel: 'термометър',       ttsModel: 'flash', ttsPrompt: 'Read the single Bulgarian word „термометър" (thermometer). Four syllables: тер-мо-ме-ТЪР. Put the stress firmly on the LAST syllable ТЪР. Do NOT stress -ме-. Clear, neutral standard Bulgarian, no extra sounds.' },
      { id: 'aparat-kravno', imageUrl: '/assets/a2-lesson-02/13-novi-dumi-5-apteka/12-aparat-za-kravno.jpg', label: 'апарат за кръвно',     ttsLabel: 'апарат за кръвно', ttsPrompt: 'Speak in clear, neutral standard Bulgarian. Pronounce every sound from the first letter to the last, without dropping or adding any sounds. Calm, neutral tone, no emotional emphasis.' },
    ],
  } as IllustratedCardsExercise,

  // ─── ORDER 35 — Упр. 25 (стр. 31): съпоставете симптом → лекарство ──────────────────────────
  {
    id: 'a2-l02-ex-25',
    type: 'dropdown_match',
    instruction: 'Изберете правилното лекарство по модела „Имам хрема. – Имате нужда от капки за нос."',
    order: 35,
    points: 5,
    questions: [
      { id: 'q1', left: 'Имам хрема.',        options: ['антибиотик', 'капки за нос', 'капки за уши', 'сироп за кашлица', 'прахче за грип', 'капки за очи'], correctAnswer: 'капки за нос', isExample: true },
      { id: 'q2', left: 'Болят ме очите.',    options: ['антибиотик', 'капки за нос', 'капки за уши', 'сироп за кашлица', 'прахче за грип', 'капки за очи'], correctAnswer: 'капки за очи'      },
      { id: 'q3', left: 'Имам бронхит.',      options: ['антибиотик', 'капки за нос', 'капки за уши', 'сироп за кашлица', 'прахче за грип', 'капки за очи'], correctAnswer: 'антибиотик'        },
      { id: 'q4', left: 'Имам кашлица.',      options: ['антибиотик', 'капки за нос', 'капки за уши', 'сироп за кашлица', 'прахче за грип', 'капки за очи'], correctAnswer: 'сироп за кашлица'  },
      { id: 'q5', left: 'Боли ме ухото.',     options: ['антибиотик', 'капки за нос', 'капки за уши', 'сироп за кашлица', 'прахче за грип', 'капки за очи'], correctAnswer: 'капки за уши'      },
      { id: 'q6', left: 'Имам грип.',         options: ['антибиотик', 'капки за нос', 'капки за уши', 'сироп за кашлица', 'прахче за грип', 'капки за очи'], correctAnswer: 'прахче за грип'    },
    ],
  } as DropdownMatchExercise,

  // ─── ORDER 36 — ТЕКСТОВЕ / Упр. 26 (стр. 32): Антон при лекар ──────────────────────────────
  {
    id: 'a2-l02-tekst-anton',
    type: 'reading_text',
    title: 'ТЕКСТОВЕ',
    textTitle: 'Антон при лекар',
    instruction: 'Изслушайте текста и се опитайте да го прочетете.',
    order: 36,
    showDictionary: true,
    images: [
      { imageUrl: '/assets/a2-lesson-02/14-tekstove-anton/01-anton-pri-lekar.jpg', label: 'Антон при лекар' },
    ],
    paragraphs: [
      'Антон е полицай. Обикновено има много работа. Тази вечер той се връща вкъщи уморен. Не се чувства добре – боли го главата, вие му се свят, гади му се, но личният му лекар работи само до обяд.',
      'Жена му се обажда на Бърза помощ. След половин час идва лекар. Той казва, че Антон има много високо кръвно – 180 на 100. Пише му рецепта с лекарства за кръвното и му казва:',
      '– Повече плодове и зеленчуци, почивка и разходка през уикенда, 10 минути гимнастика всяка сутрин. Имате нужда от спокойствие и по-малко стрес.',
    ],
    ttsParagraphs: [
      'Антон е полицай. Обикновено има много работа. Тази вечер той се връща вкъщи уморен. Не се чувства добре, боли го главата, вие му се свят, гади му се, но личният му лекар работи само до обяд.',
      'Жена му се обажда на Бърза помощ. След половин час идва лекар. Той казва, че Антон има много високо кръвно. Сто и осемдесет на сто. Пише му рецепта с лекарства за кръвното и му казва:',
      'Повече плодове и зеленчуци, почивка и разходка през уикенда, десет минути гимнастика всяка сутрин. Имате нужда от спокойствие и по-малко стрес.',
    ],
    paragraphVoiceGenders: ['male', 'male', 'male'],
  } as ReadingTextExercise,

  // ─── ORDER 37 — Упр. 27 (стр. 32): вярно или грешно (текста за Антон) ───────────────────────
  {
    id: 'a2-l02-ex-27',
    type: 'true_false',
    instruction: 'Прочетете текста и определете дали твърденията са верни (✓) или неверни (✗).',
    order: 37,
    points: 10,
    sentences: [
      { id: 's01', text: 'Антон е лекар.',                                                               isTrue: false },
      { id: 's06', text: 'Жена му се обажда на личния лекар.',                                          isTrue: false },
      { id: 's02', text: 'Той работи много.',                                                            isTrue: true  },
      { id: 's03', text: 'Тази вечер се връща вкъщи весел.',                                            isTrue: false },
      { id: 's05', text: 'Личният му лекар работи само след обяд.',                                     isTrue: false },
      { id: 's04', text: 'Боли го главата, вие му се свят, гади му се.',                               isTrue: true  },
      { id: 's07', text: 'Бърза помощ идва след един час.',                                             isTrue: false },
      { id: 's09', text: 'Лекарят пише рецепта.',                                                       isTrue: true  },
      { id: 's08', text: 'Кръвното на Антон е 120 на 80.',                                              isTrue: false },
      { id: 's10', text: 'Лекарят казва на Антон: „По-малко плодове и зеленчуци и повече стрес."',     isTrue: false },
    ],
  } as TrueFalseExercise,

  // ─── ORDER 38 — Упр. 28 (стр. 32): полезно / не е полезно за здравето ───────────────────────
  {
    id: 'a2-l02-ex-28',
    type: 'true_false',
    title: 'УПРАЖНЕНИЕ 28',
    subtitle: 'Какво е полезно за здравето ни?',
    instruction: 'Прочетете и определете кое е полезно (✓) и кое не е полезно (✗) за здравето.',
    order: 38,
    points: 14,
    sentences: [
      { id: 'h01', text: 'Гимнастика',                      isTrue: true  },
      { id: 'h02', text: 'Стрес',                           isTrue: false },
      { id: 'h03', text: 'Два литра вода всеки ден',        isTrue: true  },
      { id: 'h04', text: 'Цигари',                          isTrue: false },
      { id: 'h05', text: 'Разходки в парка',                isTrue: true  },
      { id: 'h06', text: 'Много захар и сладко',            isTrue: false },
      { id: 'h07', text: 'Спокойствие',                     isTrue: true  },
      { id: 'h08', text: 'Много хляб',                      isTrue: false },
      { id: 'h09', text: 'Много плодове и зеленчуци',       isTrue: true  },
      { id: 'h10', text: 'Проблеми в работата',             isTrue: false },
      { id: 'h11', text: 'Почивка',                         isTrue: true  },
      { id: 'h12', text: 'Много сол',                       isTrue: false },
      { id: 'h13', text: 'Добри приятели',                  isTrue: true  },
      { id: 'h14', text: 'Студено време, дъжд и вятър',    isTrue: false },
    ],
  } as TrueFalseExercise,

  // ─── ORDER 39 — Упр. 29 (стр. 33): текст за Али ─────────────────────────────────────────────
  {
    id: 'a2-l02-tekst-ali',
    type: 'reading_text',
    title: 'ТЕКСТОВЕ',
    textTitle: 'Али на пазара',
    instruction: 'Изслушайте текста и се опитайте да го прочетете.',
    order: 39,
    showDictionary: true,
    paragraphs: [
      'Али работи на пазара – продава плодове и зеленчуци. Понякога има проблеми със здравето, защото работи навън.',
      'Днес времето е студено, духа вятър, вали дъжд, има мъгла. Студено му е, гладен е, боли го гърлото и кашля.',
      'На обяд купува топъл чай и вкусен дюнер. После отива в аптеката и иска една опаковка аспирин и сироп за кашлица. Пие лекарства и до вечерта се чувства по-добре.',
    ],
    paragraphVoiceGenders: ['male', 'male', 'male'],
  } as ReadingTextExercise,

  // ─── ORDER 40 — Упр. 30 (стр. 33): отговорете на въпросите за Али ───────────────────────────
  {
    id: 'a2-l02-ex-30',
    type: 'dropdown_match',
    instruction: 'Изберете правилния отговор на въпросите.',
    order: 40,
    points: 8,
    questions: [
      { id: 'q1', left: 'Къде работи Али?',                  options: ['На пазара', 'В офис', 'В аптека', 'В болница'],                                                              correctAnswer: 'На пазара'                   },
      { id: 'q2', left: 'Какво работи?',                     options: ['Продава плодове и зеленчуци', 'Продава лекарства', 'Работи в офис', 'Учи'],                                 correctAnswer: 'Продава плодове и зеленчуци' },
      { id: 'q3', left: 'Защо понякога е болен?',            options: ['Защото работи навън', 'Защото яде лошо', 'Защото не спи', 'Защото пуши'],                                   correctAnswer: 'Защото работи навън'         },
      { id: 'q4', left: 'Какво е времето днес?',             options: ['Студено, духа вятър, вали дъжд', 'Топло и слънчево', 'Топло, но вали', 'Студено и слънчево'],               correctAnswer: 'Студено, духа вятър, вали дъжд' },
      { id: 'q5', left: 'Как се чувства Али?',               options: ['Студено му е, гладен е, боли го гърлото', 'Добре е, само малко уморен', 'Боли го главата и има температура', 'Здрав е'], correctAnswer: 'Студено му е, гладен е, боли го гърлото' },
      { id: 'q6', left: 'Какво купува на обяд?',             options: ['Топъл чай и дюнер', 'Сандвич и кафе', 'Минерална вода', 'Плодове'],                                         correctAnswer: 'Топъл чай и дюнер'           },
      { id: 'q7', left: 'Какво иска от аптеката?',           options: ['Аспирин и сироп за кашлица', 'Капки за нос', 'Антибиотик', 'Прахче за грип'],                              correctAnswer: 'Аспирин и сироп за кашлица' },
      { id: 'q8', left: 'Как се чувства Али вечерта?',       options: ['По-добре', 'По-зле', 'Също', 'Много зле'],                                                                  correctAnswer: 'По-добре'                   },
    ],
  } as DropdownMatchExercise,

  // SKIP — Упр. 31 „Прочетете рецептите на баба. Добавете още рецепти от Вашите баби." (свободно писане — по желание на клиента)

  // ─── ORDER 41 — Култура и начин на живот (стр. 33): билки и народна медицина ─────────────────
  {
    id: 'a2-l02-kultura',
    type: 'reading_text',
    title: 'Култура и начин на живот',
    textTitle: 'Билки и домашни лекове',
    instruction: 'Прочетете и разгледайте снимките.',
    order: 41,
    images: [
      { imageUrl: '/assets/a2-lesson-02/15-kultura-bilki-snimki/01-chay-bilki.jpg',        label: 'Билков чай' },
      { imageUrl: '/assets/a2-lesson-02/15-kultura-bilki-snimki/02-podpravki-kesove.jpg',  label: 'Билки и подправки' },
      { imageUrl: '/assets/a2-lesson-02/15-kultura-bilki-snimki/03-med-limon.jpg',         label: 'Мед и лимон' },
      { imageUrl: '/assets/a2-lesson-02/15-kultura-bilki-snimki/04-rozmarin.jpg',          label: 'Розмарин' },
      { imageUrl: '/assets/a2-lesson-02/15-kultura-bilki-snimki/05-bilki-v-kupa.jpg',      label: 'Свежи билки' },
      { imageUrl: '/assets/a2-lesson-02/15-kultura-bilki-snimki/06-susheni-bilki.jpg',     label: 'Сушени билки' },
      { imageUrl: '/assets/a2-lesson-02/15-kultura-bilki-snimki/07-havanche.jpg',          label: 'Хаванче с билки' },
      { imageUrl: '/assets/a2-lesson-02/15-kultura-bilki-snimki/08-burkani-podpravki.jpg', label: 'Буркани с подправки' },
      { imageUrl: '/assets/a2-lesson-02/15-kultura-bilki-snimki/09-chay-lapa.jpg',         label: 'Чай от лапа' },
    ],
    paragraphs: [
      'В България хората обичат билките и домашните лекове. Когато имат хрема или кашлица, пият билков чай с мед и лимон. Когато ги боли гърлото – правят гаргара. Когато имат висока температура – пият много течности.',
      'Популярни билки: лайка, мента, липа, розмарин, жълт кантарион. Продават се в аптеките и на пазара.',
    ],
    paragraphVoiceGenders: ['female', 'female'],
  } as ReadingTextExercise,
];

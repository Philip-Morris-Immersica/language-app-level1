import type {
  Exercise,
  ImageLabelingExercise,
  IllustratedCardsExercise,
  GrammarTableExercise,
  GrammarExamplesExercise,
  DialoguesExercise,
  DropdownMatchExercise,
  SyllableBlocksExercise,
  WordSearchExercise,
  TrueFalseExercise,
  ReadingTextExercise,
} from '@/content/types';
import type { A2ImageLabelingExercise } from '../../types';

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
    instruction: 'Запознайте се с неправилното множествено число на думите за части на тялото.',
    instructionKey: 'grammar.a2l02.g1.instruction',
    order: 3,
    tableTitle: 'Неправилно мн.ч.',
    columns: ['мн.ч.', 'два / две…'],
    rows: [
      { pronoun: 'крак',  cells: ['крака́',  'два кра́ка'], ttsModel: 'pro', ttsText: 'крак. крака́. два кра́ка.', ttsPrompt: 'Bulgarian noun stress lesson. Read „крак". Then the plural „крака" stressed on the LAST syllable: кра-КА. Then „два крака" where the counting form „крака" is stressed on the FIRST syllable: два КРА-ка. Keep the two stresses clearly different. Neutral standard Bulgarian.' },
      { pronoun: 'зъб',   cells: ['зъ́би',   'два зъ́ба'],  ttsModel: 'pro', ttsText: 'зъб. зъби. два зъба.', ttsPrompt: 'Bulgarian noun stress lesson. Read „зъб", then „зъби" and „два зъба", both stressed on the FIRST syllable ЗЪ. Neutral standard Bulgarian, pronounce every sound clearly.' },
      { pronoun: 'око',   cells: ['очи',    'две очи'],   ttsModel: 'pro', ttsText: 'око. очи. две очи.' },
      { pronoun: 'ухо',   cells: ['уши',    'две уши'],   ttsModel: 'pro', ttsText: 'ухо. уши. две уши.' },
      { pronoun: 'ръка',  cells: ['ръце',   'две ръце'],  ttsModel: 'pro', ttsText: 'ръка. ръце. две ръце.' },
    ],
  } as GrammarTableExercise,

  // ─── ORDER 4 — Упр. 2 (стр. 25): части на тялото (image labeling) ──────────────────────────
  {
    id: 'a2-l02-ex-02',
    type: 'a2-image-labeling',
    instruction: 'Изберете правилната дума под всяка картинка.',
    order: 4,
    points: 9,
    images: [
      { id: 'oko2',     imageUrl: '/assets/a2-lesson-02/03-upr-02-chasti-na-tyaloto/01-oko.jpg',           correctLabel: 'око',    options: ['око', 'ухо', 'нос', 'уста', 'глава'] },
      { id: 'usta2',    imageUrl: '/assets/a2-lesson-02/03-upr-02-chasti-na-tyaloto/02-usta.jpg',          correctLabel: 'уста',   options: ['уста', 'нос', 'ухо', 'око', 'глава'] },
      { id: 'prsti2',   imageUrl: '/assets/a2-lesson-02/03-upr-02-chasti-na-tyaloto/03-raka.jpg',          correctLabel: 'пръсти', options: ['пръсти', 'ръка', 'крак', 'нос', 'ухо'] },
      { id: 'uho2',     imageUrl: '/assets/a2-lesson-02/03-upr-02-chasti-na-tyaloto/04-uho.jpg',           correctLabel: 'ухо',    options: ['ухо', 'око', 'нос', 'уста', 'глава'] },
      { id: 'nos2',     imageUrl: '/assets/a2-lesson-02/03-upr-02-chasti-na-tyaloto/05-nos.jpg',           correctLabel: 'нос',    options: ['нос', 'уста', 'ухо', 'око', 'глава'] },
      { id: 'raka2',    imageUrl: '/assets/a2-lesson-02/03-upr-02-chasti-na-tyaloto/06-raka-ramo.jpg',     correctLabel: 'ръка',   options: ['ръка', 'крак', 'пръсти', 'сърце', 'глава'] },
      { id: 'sartse2',  imageUrl: '/assets/a2-lesson-02/03-upr-02-chasti-na-tyaloto/07-gardi-sartse.jpg',  correctLabel: 'сърце',  options: ['сърце', 'глава', 'ръка', 'крак', 'корем'] },
      { id: 'glava2',   imageUrl: '/assets/a2-lesson-02/03-upr-02-chasti-na-tyaloto/08-glava.jpg',         correctLabel: 'глава',  options: ['глава', 'ухо', 'око', 'нос', 'уста'] },
      { id: 'krak2',    imageUrl: '/assets/a2-lesson-02/03-upr-02-chasti-na-tyaloto/09-krak.jpg',          correctLabel: 'крак',   options: ['крак', 'ръка', 'пръсти', 'сърце', 'глава'] },
    ],
  } as A2ImageLabelingExercise,

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

  // ─── ГРАМАТИКА 2 (стр. 25): Боли ме / Болят ме — преместена ПРЕДИ упр. 6 (правилото идва преди практиката) ──
  {
    id: 'a2-l02-gramatika-02',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 2',
    instruction: 'Запознайте се с конструкциите „боли ме" и „болят ме".',
    instructionKey: 'grammar.a2l02.g2.instruction',
    order: 9,
    tableTitle: 'Боли ме / Болят ме',
    columns: ['Боли … (единствено число)', 'Болят … (множествено число)'],
    rows: [
      { pronoun: 'аз',     cells: ['Боли **ме**',              'Болят **ме**'],                ttsText: 'аз. Боли ме. Болят ме.'   },
      { pronoun: 'ти',     cells: ['Боли **те**',              'Болят **те**'],                ttsText: 'ти. Боли те. Болят те.'   },
      { pronoun: 'той',    cells: ['Боли **го**',              'Болят **го**'],                ttsText: 'той. Боли го. Болят го.'  },
      { pronoun: 'тя',     cells: ['Боли **я**',               'Болят **я**'],                 ttsText: 'тя. Боли я. Болят я.'     },
      { pronoun: 'то',     cells: ['Боли **го**',              'Болят **го**'],                ttsText: 'то. Боли го. Болят го.'   },
      { pronoun: 'ние',    cells: ['Боли **ни**',              'Болят **ни**'],                ttsText: 'ние. Боли ни. Болят ни.'  },
      { pronoun: 'вие/Ви', cells: ['Боли **ви** / Боли **Ви**', 'Болят **ви** / Болят **Ви**'], ttsText: 'вие. Боли ви. Боли Ви. Болят ви. Болят Ви.' },
      { pronoun: 'те',     cells: ['Боли **ги**',              'Болят **ги**'],                ttsText: 'те. Боли ги. Болят ги.'   },
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

  // SKIP — Упр. 4 „Прочетете диалозите по двойки" (по желание на клиента)
  // SKIP — Упр. 5 „Практикувайте диалозите по двойки" (по желание на клиента)

  // ─── ORDER 7 — Упр. 6 (стр. 25): преобразувайте „Боли ме" → „Болят ме" (дропдаун) ────────────
  {
    id: 'a2-l02-ex-06',
    type: 'dropdown_match',
    instruction: 'Изберете правилната форма за множествено число.',
    order: 7,
    points: 4,
    questions: [
      { id: 'q0', left: 'Боли ме ухото. →', options: [], correctAnswer: 'Болят ме ушите.', isExample: true },
      { id: 'q1', left: 'Боли ме окото. →',  options: ['Болят ме очите.', 'Болят ме ушите.', 'Болят ме краката.'], correctAnswer: 'Болят ме очите.' },
      { id: 'q2', left: 'Боли ме кракът. →', options: ['Болят ме краката.', 'Болят ме ръцете.', 'Болят ме очите.'], correctAnswer: 'Болят ме краката.' },
      { id: 'q3', left: 'Боли ме ръката. →', options: ['Болят ме ръцете.', 'Болят ме краката.', 'Болят ме зъбите.'], correctAnswer: 'Болят ме ръцете.' },
      { id: 'q4', left: 'Боли ме зъбът. →',  options: ['Болят ме зъбите.', 'Болят ме очите.', 'Болят ме ушите.'], correctAnswer: 'Болят ме зъбите.' },
    ],
  } as DropdownMatchExercise,

  // ─── ORDER 8 — Упр. 7 (стр. 25): напишете боли или болят ───────────────────────────────────
  {
    id: 'a2-l02-ex-07',
    type: 'dropdown_match',
    instruction: 'Изберете **боли** или **болят**.',
    order: 8,
    points: 7,
    questions: [
      { id: 'q0', left: '… ме окото.', options: [], correctAnswer: 'Боли', isExample: true },
      { id: 'q1', left: '… ме ушите.',   options: ['Боли', 'Болят'], correctAnswer: 'Болят' },
      { id: 'q2', left: '… ме стомахът.', options: ['Боли', 'Болят'], correctAnswer: 'Боли'  },
      { id: 'q3', left: '… ме гърлото.',  options: ['Боли', 'Болят'], correctAnswer: 'Боли'  },
      { id: 'q4', left: '… ме ръцете.',   options: ['Боли', 'Болят'], correctAnswer: 'Болят' },
      { id: 'q5', left: '… ме зъбите.',   options: ['Боли', 'Болят'], correctAnswer: 'Болят' },
      { id: 'q6', left: '… ме главата.',  options: ['Боли', 'Болят'], correctAnswer: 'Боли'  },
      { id: 'q7', left: '… ме краката.',  options: ['Боли', 'Болят'], correctAnswer: 'Болят' },
    ],
  } as DropdownMatchExercise,

  // ─── ORDER 10 — Упр. 8 (стр. 26): правилното местоимение ───────────────────────────────────
  {
    id: 'a2-l02-ex-08',
    type: 'dropdown_match',
    instruction: 'Изберете правилното кратко местоимение (ме, те, го, я, ни, ви, ги).',
    order: 10,
    points: 6,
    questions: [
      { id: 'q0', left: 'Аз не съм добре. Боли … главата.', options: [], correctAnswer: 'ме', isExample: true },
      { id: 'q1', left: 'Той не е добре. Боли … кракът.',  options: ['го', 'ме', 'те', 'я'], correctAnswer: 'го' },
      { id: 'q2', left: 'Те не са добре. Болят … зъбите.', options: ['ги', 'го', 'ни', 'ви'], correctAnswer: 'ги' },
      { id: 'q3', left: 'Тя не е добре. Боли … коремът.',  options: ['я', 'го', 'ме', 'те'], correctAnswer: 'я'  },
      { id: 'q4', left: 'Ние не сме добре. Болят … очите.', options: ['ни', 'ви', 'ги', 'ме'], correctAnswer: 'ни' },
      { id: 'q5', left: 'Ти не си добре. Боли … ухото.',   options: ['те', 'ме', 'го', 'я'], correctAnswer: 'те' },
      { id: 'q6', left: 'Вие не сте добре. Болят … гърдите.', options: ['ви', 'ни', 'ги', 'те'], correctAnswer: 'ви' },
    ],
  } as DropdownMatchExercise,

  // ─── ORDER 11 — НОВИ ДУМИ 2 (стр. 26): болести и симптоми ──────────────────────────────────
  {
    id: 'a2-l02-novi-dumi-02',
    type: 'illustrated_cards',
    title: 'НОВИ ДУМИ 2',
    subtitle: 'Болести и симптоми',
    prominentSubtitle: true,
    instruction: '',
    order: 11,
    cards: [
      { id: 'nd2-grip',          imageUrl: '/assets/a2-lesson-02/05-novi-dumi-2-bolesti/01-grip.jpg',         label: 'Имам грип.',             ttsLabel: 'Имам грип.'              },
      { id: 'nd2-temperatura',   imageUrl: '/assets/a2-lesson-02/05-novi-dumi-2-bolesti/02-temperatura.jpg',  label: 'Имам температура.',      ttsLabel: 'Имам температура.'       },
      { id: 'nd2-hrema',         imageUrl: '/assets/a2-lesson-02/05-novi-dumi-2-bolesti/03-hrema.jpg',         label: 'Имам хрема.',            ttsLabel: 'Имам хрема.'             },
      { id: 'nd2-kashlitsa',     imageUrl: '/assets/a2-lesson-02/05-novi-dumi-2-bolesti/04-kashlitsa.jpg',    label: 'Имам кашлица.',          ttsLabel: 'Имам кашлица.'           },
      { id: 'nd2-alergiya',      imageUrl: '/assets/a2-lesson-02/05-novi-dumi-2-bolesti/05-alergiya.jpg',     label: 'Имам алергия.',          ttsLabel: 'Имам алергия.'           },
      { id: 'nd2-bronhit',       imageUrl: '/assets/a2-lesson-02/05-novi-dumi-2-bolesti/06-bronhit.jpg',      label: 'Имам бронхит.',          ttsLabel: 'Имам бронхит.'           },
      { id: 'nd2-visoko-kravno', imageUrl: '/assets/a2-lesson-02/05-novi-dumi-2-bolesti/07-visoko-kravno.jpg', label: 'Имам високо кръвно.',  ttsLabel: 'Имам високо кръвно.', ttsModel: 'pro', ttsPrompt: 'Read the Bulgarian sentence „Имам високо кръвно." at a normal, natural pace. Articulate the word „кръвно" clearly: КРЪВ-но — hard К, the vowel Ъ, a clear В, then -но. It is NOT „пръзно". Neutral standard Bulgarian, calm tone, no extra sounds.'  },
      { id: 'nd2-nisko-kravno',  imageUrl: '/assets/a2-lesson-02/05-novi-dumi-2-bolesti/08-nisko-kravno.jpg', label: 'Имам ниско кръвно.',   ttsLabel: 'Имам ниско кръвно.',  ttsModel: 'pro', ttsPrompt: 'Read the Bulgarian sentence „Имам ниско кръвно." at a normal, natural pace. Articulate the word „кръвно" clearly: КРЪВ-но — hard К, the vowel Ъ, a clear В, then -но. It is NOT „пръзно". Neutral standard Bulgarian, calm tone, no extra sounds.'   },
    ],
  } as IllustratedCardsExercise,

  // ─── ORDER 12 — Упр. 9 (стр. 26): свържете картинката с думата (същите картинки като в НОВИ ДУМИ 2) ──
  {
    id: 'a2-l02-ex-09',
    type: 'image_labeling',
    instruction: 'Изберете правилната дума под всяка картинка.',
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
          { text: 'Не, кръвното ми е нормално – 120 на 80.',                voiceGender: 'male', ttsText: 'Не, КРЪВНОТО ми е нормално. Сто и двадесет на осемдесет.' },
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
    instruction: 'Запознайте се с кратките дателни форми на личните местоимения.',
    instructionKey: 'grammar.a2l02.g3.instruction',
    order: 14,
    tableTitle: 'Кратки дателни местоимения',
    columns: ['Кратка форма', 'Пример'],
    rows: [
      { pronoun: 'аз',  cells: ['**ми**', 'Пиша **ми**.']   },
      { pronoun: 'ти',  cells: ['**ти**', 'Пиша **ти**.']   },
      { pronoun: 'той', cells: ['**му**', 'Пиша **му**.']   },
      { pronoun: 'тя',  cells: ['**ѝ**',  'Пиша **ѝ**.'], ttsModel: 'pro', ttsText: 'тя. и. Пиша и.', ttsPrompt: 'Bulgarian dative pronoun. Read the word „ѝ" and „Пиша ѝ" pronouncing „ѝ" exactly like the vowel „и" (ee), a short clear EE sound. Neutral standard Bulgarian.' },
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
    type: 'dropdown_match',
    instruction: 'Изберете правилното изречение с кратко дателно местоимение по модела „Аз помагам на мама. → Аз ѝ помагам."',
    order: 15,
    points: 5,
    imageUrl: '/assets/a2-lesson-02/07-upr-12-kuhnya/01-maika-dushterya-gotvyat.jpg',
    questions: [
      { id: 'q0', left: 'Аз помагам на мама. →',              options: [], correctAnswer: 'Аз ѝ помагам.', isExample: true },
      { id: 'q1', left: 'Аз давам на Емил вода. →',            options: ['Аз ѝ давам вода.', 'Аз му давам вода.', 'Аз им давам вода.'],                                                 correctAnswer: 'Аз му давам вода.'                 },
      { id: 'q2', left: 'Аз казвам на Иман „Добро утро". →',   options: ['Аз ѝ казвам „Добро утро".', 'Аз му казвам „Добро утро".', 'Аз им казвам „Добро утро".'],                        correctAnswer: 'Аз ѝ казвам „Добро утро".'         },
      { id: 'q3', left: 'Аз отговарям на децата. →',           options: ['Аз му отговарям.', 'Аз им отговарям.', 'Аз ѝ отговарям.'],                                                     correctAnswer: 'Аз им отговарям.'                  },
      { id: 'q4', left: 'Аз пиша на Иван и Мария. →',          options: ['Аз им пиша.', 'Аз му пиша.', 'Аз ѝ пиша.'],                                                                   correctAnswer: 'Аз им пиша.'                       },
      { id: 'q5', left: 'Аз се обаждам на Таня по телефона. →', options: ['Аз му се обаждам по телефона.', 'Аз ѝ се обаждам по телефона.', 'Аз им се обаждам по телефона.'],             correctAnswer: 'Аз ѝ се обаждам по телефона.'      },
    ],
  } as DropdownMatchExercise,

  // ─── ORDER 16 — ГРАМАТИКА 4 (стр. 27): отрицание и въпрос с дателни ─────────────────────────
  {
    id: 'a2-l02-gramatika-04',
    type: 'grammar_examples',
    title: 'ГРАМАТИКА 4',
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

  // ─── ORDER 17 — Упр. 13 (стр. 27): преобразувайте по модела (+/−/?) — дропдаун с модел ────────
  {
    id: 'a2-l02-ex-13',
    type: 'dropdown_match',
    instruction: 'Изберете правилната форма според знака: (+) положително, (−) отрицателно, (?) въпрос.',
    order: 17,
    points: 15,
    questions: [
      { id: 'q00', left: 'Ани казва на Мери. →', options: [], correctAnswer: 'Ани ѝ казва. (+) / Ани не ѝ казва. (−) / Ани казва ли ѝ? (?)', isExample: true },
      // помага → + / − / ?
      { id: 'q01', left: 'Ани помага на Мери. (+) →', options: ['Ани ѝ помага.', 'Ани не ѝ помага.', 'Ани помага ли ѝ?'], correctAnswer: 'Ани ѝ помага.' },
      { id: 'q02', left: 'Ани помага на Мери. (−) →', options: ['Ани не ѝ помага.', 'Ани ѝ помага.', 'Ани помага ли ѝ?'], correctAnswer: 'Ани не ѝ помага.' },
      { id: 'q03', left: 'Ани помага на Мери. (?) →', options: ['Ани помага ли ѝ?', 'Ани ѝ помага.', 'Ани не ѝ помага.'], correctAnswer: 'Ани помага ли ѝ?' },
      // говори → + / − / ?
      { id: 'q04', left: 'Ани говори на Мери. (+) →', options: ['Ани ѝ говори.', 'Ани не ѝ говори.', 'Ани говори ли ѝ?'], correctAnswer: 'Ани ѝ говори.' },
      { id: 'q05', left: 'Ани говори на Мери. (−) →', options: ['Ани не ѝ говори.', 'Ани ѝ говори.', 'Ани говори ли ѝ?'], correctAnswer: 'Ани не ѝ говори.' },
      { id: 'q06', left: 'Ани говори на Мери. (?) →', options: ['Ани говори ли ѝ?', 'Ани ѝ говори.', 'Ани не ѝ говори.'], correctAnswer: 'Ани говори ли ѝ?' },
      // пише → + / − / ?
      { id: 'q07', left: 'Ани пише на Мери. (+) →', options: ['Ани ѝ пише.', 'Ани не ѝ пише.', 'Ани пише ли ѝ?'], correctAnswer: 'Ани ѝ пише.' },
      { id: 'q08', left: 'Ани пише на Мери. (−) →', options: ['Ани не ѝ пише.', 'Ани ѝ пише.', 'Ани пише ли ѝ?'], correctAnswer: 'Ани не ѝ пише.' },
      { id: 'q09', left: 'Ани пише на Мери. (?) →', options: ['Ани пише ли ѝ?', 'Ани ѝ пише.', 'Ани не ѝ пише.'], correctAnswer: 'Ани пише ли ѝ?' },
      // купува рокля → + / − / ?
      { id: 'q10', left: 'Ани купува рокля на Мери. (+) →', options: ['Ани ѝ купува рокля.', 'Ани не ѝ купува рокля.', 'Ани купува ли ѝ рокля?'], correctAnswer: 'Ани ѝ купува рокля.' },
      { id: 'q11', left: 'Ани купува рокля на Мери. (−) →', options: ['Ани не ѝ купува рокля.', 'Ани ѝ купува рокля.', 'Ани купува ли ѝ рокля?'], correctAnswer: 'Ани не ѝ купува рокля.' },
      { id: 'q12', left: 'Ани купува рокля на Мери. (?) →', options: ['Ани купува ли ѝ рокля?', 'Ани ѝ купува рокля.', 'Ани не ѝ купува рокля.'], correctAnswer: 'Ани купува ли ѝ рокля?' },
      // дава химикалка → + / − / ?
      { id: 'q13', left: 'Ани дава химикалка на Мери. (+) →', options: ['Ани ѝ дава химикалка.', 'Ани не ѝ дава химикалка.', 'Ани дава ли ѝ химикалка?'], correctAnswer: 'Ани ѝ дава химикалка.' },
      { id: 'q14', left: 'Ани дава химикалка на Мери. (−) →', options: ['Ани не ѝ дава химикалка.', 'Ани ѝ дава химикалка.', 'Ани дава ли ѝ химикалка?'], correctAnswer: 'Ани не ѝ дава химикалка.' },
      { id: 'q15', left: 'Ани дава химикалка на Мери. (?) →', options: ['Ани дава ли ѝ химикалка?', 'Ани ѝ дава химикалка.', 'Ани не ѝ дава химикалка.'], correctAnswer: 'Ани дава ли ѝ химикалка?' },
    ],
  } as DropdownMatchExercise,

  // ─── ORDER 18 — ГРАМАТИКА 5 (стр. 28): Трябва ми ────────────────────────────────────────────
  {
    id: 'a2-l02-gramatika-05',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 5',
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

  // ─── ORDER 19 — Упр. 14 (стр. 28): трябва ми / трябват ми (дропдаун) ──────────────────────────
  {
    id: 'a2-l02-ex-14',
    type: 'dropdown_match',
    instruction: 'Изберете правилната форма: трябва ми (ед.ч.) или трябват ми (мн.ч.).',
    order: 19,
    points: 6,
    questions: [
      { id: 'q0', left: 'Нямам молив. →',       options: [], correctAnswer: 'Трябва ми молив.', isExample: true },
      { id: 'q1', left: 'Нямам пари. →',        options: ['Трябват ми пари.', 'Трябва ми пари.', 'Трябват ти пари.'],            correctAnswer: 'Трябват ми пари.' },
      { id: 'q2', left: 'Нямам бяла блуза. →',  options: ['Трябва ми бяла блуза.', 'Трябват ми бяла блуза.', 'Трябва ти бяла блуза.'], correctAnswer: 'Трябва ми бяла блуза.' },
      { id: 'q3', left: 'Нямам компютър. →',    options: ['Трябва ми компютър.', 'Трябват ми компютър.', 'Трябва ти компютър.'],   correctAnswer: 'Трябва ми компютър.' },
      { id: 'q4', left: 'Нямам маратонки. →',   options: ['Трябват ми маратонки.', 'Трябва ми маратонки.', 'Трябват ти маратонки.'], correctAnswer: 'Трябват ми маратонки.' },
      { id: 'q5', left: 'Нямам голям куфар. →', options: ['Трябва ми голям куфар.', 'Трябват ми голям куфар.', 'Трябва ти голям куфар.'], correctAnswer: 'Трябва ми голям куфар.' },
      { id: 'q6', left: 'Нямам химикалки. →',   options: ['Трябват ми химикалки.', 'Трябва ми химикалки.', 'Трябват ти химикалки.'], correctAnswer: 'Трябват ми химикалки.' },
    ],
  } as DropdownMatchExercise,

  // ─── ORDER 20 — ГРАМАТИКА 6 (стр. 28): безлични изречения (Топло ми е / Трудно ми е) ────────
  {
    id: 'a2-l02-gramatika-06',
    type: 'a2-grammar-examples',
    title: 'ГРАМАТИКА 6',
    instruction: 'Запознайте се с безличните изречения.',
    instructionKey: 'grammar.a2l02.g6.instruction',
    order: 20,
    layout: 'image-rows',
    examples: [
      // Ред 1 — уча
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
      // Ред 2 — топло
      {
        imageUrl: '/assets/a2-lesson-02/08-gramatika-4-toplo-studeno/01-plazh-chadyr.jpg',
        text: 'През лятото е топло.',
        lines: [],
        ttsText: 'През лятото е топло.',
        voiceGender: 'male',
      },
      {
        imageUrl: '/assets/a2-lesson-02/08-gramatika-4-toplo-studeno/02-toplo-mi-e.jpg',
        text: 'Топло ми е.',
        lines: [],
        ttsText: 'Топло ми е.',
        voiceGender: 'male',
      },
      // Ред 3 — студено
      {
        imageUrl: '/assets/a2-lesson-02/08-gramatika-4-toplo-studeno/03-zima-snezhanka.jpg',
        text: 'През зимата е студено.',
        lines: [],
        ttsText: 'През зимата е студено.',
        ttsPrompt: 'Read the Bulgarian sentence „През зимата е студено." naturally in standard Bulgarian, at a calm, even pace. Read every word exactly as written, without adding or dropping any sounds. Neutral tone.',
        voiceGender: 'female',
      },
      {
        imageUrl: '/assets/a2-lesson-02/08-gramatika-4-toplo-studeno/04-studeno-mi-e.jpg',
        text: 'Студено ми е.',
        lines: [],
        ttsText: 'Студено ми е.',
        voiceGender: 'female',
      },
    ],
  } as unknown as GrammarExamplesExercise,

  // ─── ORDER 21 — Упр. 15 (стр. 28): изберете подходящото изречение (модел + 5 опции) ────────────
  {
    id: 'a2-l02-ex-15',
    type: 'dropdown_match',
    instruction: 'Изберете подходящото изречение за всяка ситуация.',
    order: 21,
    points: 7,
    questions: [
      { id: 'q0', left: 'Аз съм Мери. →', options: [], correctAnswer: 'Приятно ми е.', isExample: true },
      { id: 'q1', left: 'Навън е студено. Нямам палто. →', options: ['Студено ми е.', 'Топло ми е.', 'Приятно ми е.', 'Трудно ми е.'], correctAnswer: 'Студено ми е.' },
      { id: 'q2', left: 'Лятото е. Слънцето е силно. →',   options: ['Топло ми е.', 'Студено ми е.', 'Трудно ми е.', 'Лошо ми е.'], correctAnswer: 'Топло ми е.' },
      { id: 'q3', left: 'Гледам интересен филм. →',        options: ['Интересно ми е.', 'Студено ми е.', 'Топло ми е.', 'Лошо ми е.'], correctAnswer: 'Интересно ми е.' },
      { id: 'q4', left: 'Имам температура и кашлица. →',   options: ['Лошо ми е.', 'Приятно ми е.', 'Топло ми е.', 'Лесно ми е.'], correctAnswer: 'Лошо ми е.' },
      { id: 'q5', left: 'Уча трудна математика. →',        options: ['Трудно ми е.', 'Лесно ми е.', 'Приятно ми е.', 'Студено ми е.'], correctAnswer: 'Трудно ми е.' },
      { id: 'q6', left: 'Срещам стар приятел. →',          options: ['Приятно ми е.', 'Лошо ми е.', 'Студено ми е.', 'Трудно ми е.'], correctAnswer: 'Приятно ми е.' },
      { id: 'q7', left: 'Задачата е много лесна. →',       options: ['Лесно ми е.', 'Трудно ми е.', 'Лошо ми е.', 'Студено ми е.'], correctAnswer: 'Лесно ми е.' },
    ],
  } as DropdownMatchExercise,

  // ─── ORDER 22 — ГРАМАТИКА 7 (стр. 29): пълна таблица безлични изречения ─────────────────────
  {
    id: 'a2-l02-gramatika-07',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 7',
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

  // ─── ORDER 23 — Упр. 16 (стр. 29): попълнете правилното местоимение (модел + inline + 5 опции) ──
  {
    id: 'a2-l02-ex-16',
    type: 'dropdown_match',
    instruction: 'Изберете правилното кратко местоимение.',
    order: 23,
    points: 7,
    questions: [
      { id: 'q0', left: 'Той няма палто. Студено … е.', options: [], correctAnswer: 'му', isExample: true },
      { id: 'q1', left: 'Аз съм Мария. Приятно … е.',                options: ['ми', 'ти', 'му', 'ѝ'], correctAnswer: 'ми' },
      { id: 'q2', left: 'Прозорецът е затворен. Топло ли … е?',      options: ['ти', 'ми', 'му', 'ѝ'], correctAnswer: 'ти' },
      { id: 'q3', left: 'Той е без яке навън. Студено ли … е?',      options: ['му', 'ми', 'ти', 'ѝ'], correctAnswer: 'му' },
      { id: 'q4', left: 'Ние сме в един музей. Интересно … е.',      options: ['ни', 'ми', 'ви', 'им'], correctAnswer: 'ни' },
      { id: 'q5', left: 'Тя има пет деца. Трудно … е.',              options: ['ѝ', 'ми', 'му', 'ти'], correctAnswer: 'ѝ'  },
      { id: 'q6', left: 'Боли ме стомахът. Лошо … е.',               options: ['ми', 'ти', 'му', 'ѝ'], correctAnswer: 'ми' },
      { id: 'q7', left: 'Вие вечеряте с приятели. Приятно ли … е?',  options: ['ви', 'ми', 'ти', 'му'], correctAnswer: 'ви' },
    ],
  } as DropdownMatchExercise,

  // ─── ORDER 24 — НОВИ ДУМИ 3 (стр. 29): състояния и емоции ──────────────────────────────────
  {
    id: 'a2-l02-novi-dumi-03',
    type: 'illustrated_cards',
    title: 'НОВИ ДУМИ 3',
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

  // ─── ORDER 25 — Упр. 17 (стр. 29): открийте скритите думи (таблица / grid) ───────────────────
  {
    id: 'a2-l02-ex-17',
    type: 'word_search',
    instruction: 'Открийте скритите думи в таблицата. Колко думи можете да намерите?',
    order: 25,
    points: 8,
    letterString: 'веселгладниздравожаднаболниуморенадоволнатъжно',
    correctWords: ['весел', 'гладни', 'здраво', 'жадна', 'болни', 'уморена', 'доволна', 'тъжно'],
    hiddenWords: ['ВЕСЕЛ', 'ГЛАДНИ', 'ЗДРАВО', 'ЖАДНА', 'БОЛНИ', 'УМОРЕНА', 'ДОВОЛНА', 'ТЪЖНО'],
  } as WordSearchExercise,

  // ─── ORDER 26 — ГРАМАТИКА 8 (стр. 29): съм здрав/болен ─────────────────────────────────────
  {
    id: 'a2-l02-gramatika-08',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 8',
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

  // ─── ORDER 27 — Упр. 18 (стр. 30): изберете подходящата реакция (модел + 5 опции) ─────────────
  {
    id: 'a2-l02-ex-18',
    type: 'dropdown_match',
    instruction: 'Изберете подходящата реакция за всяка ситуация.',
    order: 27,
    points: 8,
    questions: [
      { id: 'q0', left: 'Не съм ял цял ден. →', options: [], correctAnswer: 'Гладен съм.', isExample: true },
      { id: 'q1', left: 'Работя много всеки ден. →',              options: ['Уморен съм.', 'Жадна съм.', 'Весел е.', 'Доволен си.'], correctAnswer: 'Уморен съм.' },
      { id: 'q2', left: 'Детето иска три кюфтета и салата. →',    options: ['Гладно е.', 'Жадна съм.', 'Здрава е.', 'Весел е.'], correctAnswer: 'Гладно е.' },
      { id: 'q3', left: 'Искам една минерална вода. →',           options: ['Жадна съм.', 'Гладно е.', 'Уморен съм.', 'Доволен си.'], correctAnswer: 'Жадна съм.' },
      { id: 'q4', left: 'Те нямат работа, нямат пари. →',         options: ['Тъжни са.', 'Весел е.', 'Доволен си.', 'Болен сте.'], correctAnswer: 'Тъжни са.' },
      { id: 'q5', left: 'Петър има рожден ден и много гости. →',  options: ['Весел е.', 'Тъжни са.', 'Уморен съм.', 'Гладно е.'], correctAnswer: 'Весел е.' },
      { id: 'q6', left: 'Вие имате високо кръвно. →',             options: ['Болен сте.', 'Здрава е.', 'Уморен съм.', 'Тъжни са.'], correctAnswer: 'Болен сте.' },
      { id: 'q7', left: 'Нямаш проблеми. →',                      options: ['Доволен си.', 'Весел е.', 'Уморен съм.', 'Тъжни са.'], correctAnswer: 'Доволен си.' },
      { id: 'q8', left: 'Мариам няма температура. →',             options: ['Здрава е.', 'Болен сте.', 'Весел е.', 'Доволен си.'], correctAnswer: 'Здрава е.' },
    ],
  } as DropdownMatchExercise,

  // ─── ORDER 28 — Упр. 19 (стр. 30): преобразуване болен/здрав (+/−/?) — дропдаун ───────────────
  {
    id: 'a2-l02-ex-19',
    type: 'dropdown_match',
    instruction: 'Изберете правилното отрицателно (−) или въпросително (?) изречение.',
    order: 28,
    points: 10,
    questions: [
      { id: 'q0',  left: 'Болен си. (−/?) →', options: [], correctAnswer: 'Не си болен. / Болен ли си?', isExample: true },
      { id: 'q1',  left: 'Болна съм. (−) →',                options: ['Не съм болна.', 'Болна ли съм?', 'Не си болна.'],                       correctAnswer: 'Не съм болна.' },
      { id: 'q2',  left: 'Болна съм. (?) →',                options: ['Болна ли съм?', 'Не съм болна.', 'Болна ли си?'],                       correctAnswer: 'Болна ли съм?' },
      { id: 'q3',  left: 'Здрав си. (−) →',                 options: ['Не си здрав.', 'Здрав ли си?', 'Не съм здрав.'],                        correctAnswer: 'Не си здрав.' },
      { id: 'q4',  left: 'Здрав си. (?) →',                 options: ['Здрав ли си?', 'Не си здрав.', 'Здрав ли съм?'],                        correctAnswer: 'Здрав ли си?' },
      { id: 'q5',  left: 'Момчето е здраво. (−) →',         options: ['Момчето не е здраво.', 'Момчето здраво ли е?', 'Момчето не са здраво.'], correctAnswer: 'Момчето не е здраво.' },
      { id: 'q6',  left: 'Момчето е здраво. (?) →',         options: ['Момчето здраво ли е?', 'Момчето не е здраво.', 'Момчето здрави ли е?'],  correctAnswer: 'Момчето здраво ли е?' },
      { id: 'q7',  left: 'Павел и Стела са болни. (−) →',   options: ['Павел и Стела не са болни.', 'Павел и Стела болни ли са?', 'Павел и Стела не е болни.'], correctAnswer: 'Павел и Стела не са болни.' },
      { id: 'q8',  left: 'Павел и Стела са болни. (?) →',   options: ['Павел и Стела болни ли са?', 'Павел и Стела не са болни.', 'Павел и Стела болен ли са?'], correctAnswer: 'Павел и Стела болни ли са?' },
      { id: 'q9',  left: 'Елена и Стефан са здрави. (−) →', options: ['Елена и Стефан не са здрави.', 'Елена и Стефан здрави ли са?', 'Елена и Стефан не е здрави.'], correctAnswer: 'Елена и Стефан не са здрави.' },
      { id: 'q10', left: 'Елена и Стефан са здрави. (?) →', options: ['Елена и Стефан здрави ли са?', 'Елена и Стефан не са здрави.', 'Елена и Стефан здрав ли са?'], correctAnswer: 'Елена и Стефан здрави ли са?' },
    ],
  } as DropdownMatchExercise,

  // ─── ORDER 29 — ГРАМАТИКА 9 (стр. 30): Какво Ви е? / Как се чувствате? ────────────────────────
  {
    id: 'a2-l02-gramatika-09',
    type: 'grammar_examples',
    title: 'ГРАМАТИКА 9',
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
    prominentSubtitle: true,
    instruction: '',
    order: 31,
    cards: [
      { id: 'poliklinika',    imageUrl: '/assets/a2-lesson-02/11-novi-dumi-4-poliklinika/01-poliklinika.jpg',    label: 'поликлиника',                ttsLabel: 'поликлиника'   },
      { id: 'registratura',   imageUrl: '/assets/a2-lesson-02/11-novi-dumi-4-poliklinika/02-registratura.jpg',   label: 'регистратура',               ttsLabel: 'регистратура'  },
      { id: 'nd4-lichen-lekar', imageUrl: '/assets/a2-lesson-02/11-novi-dumi-4-poliklinika/03-lichen-lekar.jpg',   label: 'личен лекар = джипи',        ttsLabel: 'Личен лекар. Джи Пи.'   },
      { id: 'lek-kabinet',    imageUrl: '/assets/a2-lesson-02/11-novi-dumi-4-poliklinika/04-lekarski-kabinet.jpg', label: 'лекарски кабинет',         ttsLabel: 'лекарски кабинет', ttsPrompt: 'Speak in clear, neutral standard Bulgarian. Pronounce every sound from the first letter to the last, without dropping or adding any sounds. Calm, neutral tone, no emotional emphasis.' },
      // Лекарски специалности
      { id: 'nd4-pediatar',   imageUrl: '/assets/a2-lesson-02/12-lekarski-specialnosti/01-pediatar.png',         label: 'детски лекар = педиатър',    ttsLabel: 'Детски лекар. Педиатър.', ttsPrompt: 'Speak in clear, neutral standard Bulgarian. Pronounce every sound from the first letter to the last, without dropping or adding any sounds. Calm, neutral tone, no emotional emphasis.'      },
      { id: 'nd4-ung',        imageUrl: '/assets/a2-lesson-02/12-lekarski-specialnosti/02-ung.png',              label: 'уши-нос-гърло = УНГ',        ttsLabel: 'Уши, нос, гърло. У Н Ге.', ttsPrompt: 'Speak in clear, neutral standard Bulgarian. Pronounce every sound from the first letter to the last, without dropping or adding any sounds. Calm, neutral tone, no emotional emphasis.'           },
      { id: 'kardiolog',      imageUrl: '/assets/a2-lesson-02/12-lekarski-specialnosti/03-kardiolog.png',        label: 'кардиолог',                  ttsLabel: 'кардиолог', ttsPrompt: 'Speak in clear, neutral standard Bulgarian. Pronounce every sound from the first letter to the last, without dropping or adding any sounds. Calm, neutral tone, no emotional emphasis.'     },
      { id: 'nevrolog',       imageUrl: '/assets/a2-lesson-02/12-lekarski-specialnosti/04-nevrolog.png',         label: 'невролог',                   ttsLabel: 'невролог', ttsPrompt: 'Speak in clear, neutral standard Bulgarian. Pronounce every sound from the first letter to the last, without dropping or adding any sounds. Calm, neutral tone, no emotional emphasis.'      },
      { id: 'hirurg',         imageUrl: '/assets/a2-lesson-02/12-lekarski-specialnosti/05-hirurg.png',           label: 'хирург',                     ttsLabel: 'хирург', ttsPrompt: 'Speak in clear, neutral standard Bulgarian. Pronounce every sound from the first letter to the last, without dropping or adding any sounds. Calm, neutral tone, no emotional emphasis.'        },
      { id: 'zabolakar',      imageUrl: '/assets/a2-lesson-02/12-lekarski-specialnosti/06-zabolakar.png',        label: 'зъболекар',                  ttsLabel: 'зъболекар', ttsPrompt: 'Speak in clear, neutral standard Bulgarian. Pronounce every sound from the first letter to the last, without dropping or adding any sounds. Calm, neutral tone, no emotional emphasis.'     },
      // Документи и процедури
      { id: 'napravlenie',    imageUrl: '/assets/a2-lesson-02/12-lekarski-specialnosti/07-napravlenie.jpg',        label: 'направление',                ttsLabel: 'направление', ttsPrompt: 'Speak in clear, neutral standard Bulgarian. Pronounce every sound from the first letter to the last, without dropping or adding any sounds. Calm, neutral tone, no emotional emphasis.'             },
      { id: 'izsledvane',     imageUrl: '/assets/a2-lesson-02/12-lekarski-specialnosti/08-izsledvane-krav-urina.jpg', label: 'изследване на кръв и урина', ttsLabel: 'изследване на кръв и урина', ttsPrompt: 'Speak in clear, neutral standard Bulgarian. Pronounce every sound from the first letter to the last, without dropping or adding any sounds. Calm, neutral tone, no emotional emphasis.' },
      { id: 'kravna-kartina', imageUrl: '/assets/a2-lesson-02/12-lekarski-specialnosti/09-kravna-kartina.jpg',     label: 'кръвна картина',             ttsLabel: 'кръвна картина', ttsPrompt: 'Speak in clear, neutral standard Bulgarian. Pronounce every sound from the first letter to the last, without dropping or adding any sounds. Calm, neutral tone, no emotional emphasis.'          },
      { id: 'imunizatsiya',   imageUrl: '/assets/a2-lesson-02/12-lekarski-specialnosti/10-imunizatsiya.jpg',       label: 'имунизация',                 ttsLabel: 'имунизация', ttsPrompt: 'Speak in clear, neutral standard Bulgarian. Pronounce every sound from the first letter to the last, without dropping or adding any sounds. Calm, neutral tone, no emotional emphasis.'              },
      { id: 'operatsiya',     imageUrl: '/assets/a2-lesson-02/12-lekarski-specialnosti/11-operatsiya.jpg',         label: 'операция',                   ttsLabel: 'операция', ttsPrompt: 'Speak in clear, neutral standard Bulgarian. Pronounce every sound from the first letter to the last, without dropping or adding any sounds. Calm, neutral tone, no emotional emphasis.'                },
    ],
  } as IllustratedCardsExercise,

  // ─── ORDER 32 — Упр. 22 (стр. 31): съпоставете специалист към проблем (модел + 2 кол. + 4 опции) ──
  {
    id: 'a2-l02-ex-22',
    type: 'dropdown_match',
    instruction: 'Изберете подходящия лекар за всеки здравословен проблем.',
    order: 32,
    points: 6,
    questions: [
      { id: 'q1', left: 'Детето има нужда от имунизация. →', options: ['педиатър', 'кардиолог', 'хирург', 'зъболекар'], correctAnswer: 'педиатър', isExample: true },
      { id: 'q2', left: 'Имам проблем със сърцето. →',       options: ['кардиолог', 'невролог', 'хирург', 'педиатър'],   correctAnswer: 'кардиолог'   },
      { id: 'q3', left: 'Боли ме кръстът. →',                options: ['невролог', 'кардиолог', 'зъболекар', 'УНГ'],     correctAnswer: 'невролог'    },
      { id: 'q4', left: 'Болят ме зъбите. →',                options: ['зъболекар', 'УНГ', 'хирург', 'педиатър'],        correctAnswer: 'зъболекар'   },
      { id: 'q5', left: 'Имам хрема и кашлица. →',           options: ['УНГ', 'зъболекар', 'кардиолог', 'невролог'],     correctAnswer: 'УНГ'         },
      { id: 'q6', left: 'Имам нужда от направление. →',      options: ['личен лекар', 'педиатър', 'хирург', 'кардиолог'], correctAnswer: 'личен лекар' },
      { id: 'q7', left: 'Имам нужда от операция. →',         options: ['хирург', 'невролог', 'личен лекар', 'УНГ'],       correctAnswer: 'хирург'      },
    ],
  } as DropdownMatchExercise,

  // ─── ORDER 33 — ДИАЛОЗИ 4 (стр. 31): в лекарския кабинет ───────────────────────────────────
  {
    id: 'a2-l02-dialozi-04',
    type: 'dialogues',
    title: 'ДИАЛОЗИ 4',
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
    prominentSubtitle: true,
    instruction: '',
    order: 34,
    cards: [
      { id: 'recepta',       imageUrl: '/assets/a2-lesson-02/13-novi-dumi-5-apteka/01-recepta.jpg',          label: 'рецепта',               ttsLabel: 'рецепта',          ttsPrompt: 'Speak in clear, neutral standard Bulgarian. Pronounce every sound from the first letter to the last, without dropping or adding any sounds. Calm, neutral tone, no emotional emphasis.' },
      { id: 'lekarstva',     imageUrl: '/assets/a2-lesson-02/13-novi-dumi-5-apteka/02-lekarstva.jpg',        label: 'лекарства',             ttsLabel: 'лекарства',        ttsPrompt: 'Speak in clear, neutral standard Bulgarian. Pronounce every sound from the first letter to the last, without dropping or adding any sounds. Calm, neutral tone, no emotional emphasis.' },
      { id: 'sirop',         imageUrl: '/assets/a2-lesson-02/13-novi-dumi-5-apteka/03-sirop-za-kashlitsa.jpg', label: 'сироп за кашлица',    ttsLabel: 'сироп за кашлица', ttsPrompt: 'Speak in clear, neutral standard Bulgarian. Pronounce every sound from the first letter to the last, without dropping or adding any sounds. Calm, neutral tone, no emotional emphasis.' },
      { id: 'kapki',         imageUrl: '/assets/a2-lesson-02/13-novi-dumi-5-apteka/04-kapki.jpg',            label: 'капки за нос / очи / уши', ttsLabel: 'капки за нос, очи и уши', ttsPrompt: 'Speak in clear, neutral standard Bulgarian. Pronounce every sound from the first letter to the last, without dropping or adding any sounds. Calm, neutral tone, no emotional emphasis.' },
      { id: 'nd5-antibiotik', imageUrl: '/assets/a2-lesson-02/13-novi-dumi-5-apteka/05-antibiotik.jpg',       label: 'опаковка антибиотик',   ttsLabel: 'опаковка антибиотик',       ttsPrompt: 'Speak in clear, neutral standard Bulgarian. Pronounce every sound from the first letter to the last, without dropping or adding any sounds. Calm, neutral tone, no emotional emphasis. Stress the word „антибиотик" on the fourth syllable -О-: антиби-О-тик.' },
      { id: 'nd5-aspirin',    imageUrl: '/assets/a2-lesson-02/13-novi-dumi-5-apteka/06-blister-aspirin.jpg',  label: 'блистер аспирин',       ttsLabel: 'блистер аспирин',          ttsPrompt: 'Speak in clear, neutral standard Bulgarian. Pronounce every sound from the first letter to the last, without dropping or adding any sounds. Calm, neutral tone, no emotional emphasis.' },
      { id: 'nd5-prahche',    imageUrl: '/assets/a2-lesson-02/13-novi-dumi-5-apteka/07-prahche-za-grip.jpg',  label: 'прахче за грип',        ttsLabel: 'прахче за грип',   ttsModel: 'pro', ttsPrompt: 'Read the Bulgarian phrase „прахче за грип" in clear, neutral standard Bulgarian. Articulate the last word „грип" very clearly: a hard voiced Г (as in „go"), then „рип" — ГРИП. It is NOT „чип" and NOT „чипс". Pronounce every sound from first to last, calm neutral tone, no emotional emphasis.' },
      { id: 'pamuk',         imageUrl: '/assets/a2-lesson-02/13-novi-dumi-5-apteka/08-pamuk.jpg',            label: 'памук',                 ttsLabel: 'памук',            ttsPrompt: 'Speak in clear, neutral standard Bulgarian. Pronounce every sound from the first letter to the last, without dropping or adding any sounds. Calm, neutral tone, no emotional emphasis. Stress the FIRST syllable: ПА-мук (stressed А).' },
      { id: 'bint',          imageUrl: '/assets/a2-lesson-02/13-novi-dumi-5-apteka/09-bint.jpg',             label: 'бинт',                  ttsLabel: 'бинт',             ttsPrompt: 'Speak in clear, neutral standard Bulgarian. Pronounce every sound from the first letter to the last, without dropping or adding any sounds. Calm, neutral tone, no emotional emphasis.' },
      { id: 'marlya',        imageUrl: '/assets/a2-lesson-02/13-novi-dumi-5-apteka/10-marlya.jpg',           label: 'марля',                 ttsLabel: 'марля',            ttsModel: 'flash', ttsPrompt: 'Read the single Bulgarian word „марля" (medical gauze). Two syllables: МАР-ля. Put the stress firmly on the FIRST syllable МАР. Do NOT stress the second syllable -ля. Clear, neutral standard Bulgarian, no extra sounds.' },
      { id: 'termometar',    imageUrl: '/assets/a2-lesson-02/13-novi-dumi-5-apteka/11-termometar.jpg',       label: 'термометър',            ttsLabel: 'термометър',       ttsModel: 'flash', ttsPrompt: 'Read the single Bulgarian word „термометър" (thermometer). Four syllables: тер-мо-ме-ТЪР. Put the stress firmly on the LAST syllable ТЪР. Do NOT stress -ме-. Clear, neutral standard Bulgarian, no extra sounds.' },
      { id: 'aparat-kravno', imageUrl: '/assets/a2-lesson-02/13-novi-dumi-5-apteka/12-aparat-za-kravno.jpg', label: 'апарат за кръвно',     ttsLabel: 'апарат за кръвно', ttsModel: 'pro', ttsPrompt: 'Read the Bulgarian phrase „апарат за кръвно" in clear, neutral standard Bulgarian. The last word is „кръвно", two syllables: КРЪВ-НО. Pronounce it fully: hard К, the vowel Ъ, a clear В, then the second syllable -НО with a clear hard N (as in „no") followed by O. Do NOT drop the N — it is NOT „кръво". It is also NOT „кръвльо" — there is NO soft L or Y sound. Pronounce every single sound from first to last, calm neutral tone, no emotional emphasis.' },
    ],
  } as IllustratedCardsExercise,

  // ─── ORDER 35 — Упр. 25 (стр. 31): съпоставете симптом → лекарство (модел + 2 кол. + 4 опции) ──
  {
    id: 'a2-l02-ex-25',
    type: 'dropdown_match',
    instruction: 'Изберете подходящото лекарство за всеки симптом.',
    order: 35,
    points: 5,
    questions: [
      { id: 'q1', left: 'Имам хрема. →',     options: ['капки за нос', 'капки за очи', 'капки за уши', 'антибиотик'],      correctAnswer: 'капки за нос', isExample: true },
      { id: 'q2', left: 'Болят ме очите. →', options: ['капки за очи', 'капки за нос', 'капки за уши', 'сироп за кашлица'], correctAnswer: 'капки за очи'     },
      { id: 'q3', left: 'Имам бронхит. →',   options: ['антибиотик', 'прахче за грип', 'сироп за кашлица', 'капки за нос'], correctAnswer: 'антибиотик'       },
      { id: 'q4', left: 'Имам кашлица. →',   options: ['сироп за кашлица', 'прахче за грип', 'антибиотик', 'капки за уши'], correctAnswer: 'сироп за кашлица' },
      { id: 'q5', left: 'Боли ме ухото. →',  options: ['капки за уши', 'капки за очи', 'капки за нос', 'антибиотик'],      correctAnswer: 'капки за уши'     },
      { id: 'q6', left: 'Имам грип. →',      options: ['прахче за грип', 'антибиотик', 'сироп за кашлица', 'капки за нос'], correctAnswer: 'прахче за грип'   },
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
      { imageUrl: '/assets/a2-lesson-02/14-tekstove-anton/01-anton-pri-lekar.jpg', label: '' },
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
    instruction: 'Кликнете върху картинките, за да чуете думите. После изслушайте текста за билките и го прочетете.',
    order: 41,
    imageFlashcards: true,
    images: [
      { imageUrl: '/assets/a2-lesson-02/15-kultura-bilki-snimki/01-chay-bilki.jpg',        label: 'Билков чай',          ttsWordId: 'bilkov-chay' },
      { imageUrl: '/assets/a2-lesson-02/15-kultura-bilki-snimki/02-podpravki-kesove.jpg',  label: 'Билки и подправки',   ttsWordId: 'bilki-podpravki' },
      { imageUrl: '/assets/a2-lesson-02/15-kultura-bilki-snimki/03-med-limon.jpg',         label: 'Мед и лимон',         ttsWordId: 'med-limon' },
      { imageUrl: '/assets/a2-lesson-02/15-kultura-bilki-snimki/04-rozmarin.jpg',          label: 'Розмарин',            ttsWordId: 'rozmarin', ttsModel: 'pro', ttsPrompt: 'Bulgarian herb name. Stress on the first syllable only: РОЗ-марин.' },
      { imageUrl: '/assets/a2-lesson-02/15-kultura-bilki-snimki/05-bilki-v-kupa.jpg',      label: 'Свежи билки',         ttsWordId: 'svezhi-bilki' },
      { imageUrl: '/assets/a2-lesson-02/15-kultura-bilki-snimki/06-susheni-bilki.jpg',     label: 'Сушени билки',        ttsWordId: 'susheni-bilki' },
      { imageUrl: '/assets/a2-lesson-02/15-kultura-bilki-snimki/07-havanche.jpg',          label: 'Хаванче с билки',     ttsWordId: 'havanche' },
      { imageUrl: '/assets/a2-lesson-02/15-kultura-bilki-snimki/08-burkani-podpravki.jpg', label: 'Буркани с подправки', ttsWordId: 'burkani-podpravki' },
      { imageUrl: '/assets/a2-lesson-02/15-kultura-bilki-snimki/09-chay-lapa.jpg',         label: 'Насипен чай',         ttsWordId: 'chay-lapa', ttsModel: 'pro', ttsPrompt: 'Bulgarian phrase „насипен чай". The word „насипен" has stress ONLY on the second syllable, on the vowel и: на-СИ-пен (rhymes with „see"). Do NOT stress the first or last syllable. Then pronounce „чай" cleanly and clearly: a crisp „ч" sound followed by a clear „ай" diphthong, not slurred or muffled.' },
    ],
    paragraphs: [
      'В България хората обичат билките и домашните лекове. Когато имат хрема или кашлица, пият билков чай с мед и лимон. Когато ги боли гърлото – правят гаргара. Когато имат висока температура – пият много течности.',
      'Популярни билки: лайка, мента, липа, розмарин, жълт кантарион. Продават се в аптеките и на пазара.',
    ],
    ttsParagraphs: [
      'В България хората обичат билките и домашните лекове. Когато имат хрема или кашлица, пият билков чай с мед и лимон. Когато ги боли гърлото – правят гаргара. Когато имат висока температура – пият много течности.',
      'Популярни билки: лайка, мента, липа, ròзмарин, жълт кантарион. Продават се в аптеките и на пазара.',
    ],
    paragraphVoiceGenders: ['female', 'female'],
  } as ReadingTextExercise,
];

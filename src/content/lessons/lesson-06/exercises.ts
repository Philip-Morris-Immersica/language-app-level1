import type {
  Exercise,
  DragToColumnsExercise,
  IllustratedCardsExercise,
  WordSearchExercise,
  SyllableBlocksExercise,
  DialoguesExercise,
  WorkbookFillBlankExercise,
  GrammarTableExercise,
  PersonalChoiceExercise,
  GrammarExamplesExercise,
  DropdownMatchExercise,
  MatchPairsExercise,
  TableFillExercise,
  ReadingTextExercise,
  TrueFalseExercise,
  MultipleChoiceExercise,
} from '@/content/types';

// Урок 6 — по клиент НЕ се дигитализират:
// Упр. 4, 9, 13, 14, 18, 19, 28, 29, 30, 32, 40, 41, 43, 44

export const exercises: Exercise[] = [

  // ──────────────────────────────────────────────────────────
  // СТРАНИЦА 55
  // ──────────────────────────────────────────────────────────

  // ORDER 1: Упр. 1 – Подредете имената в две групи (Page 55)
  {
    id: 'l06-ex-01',
    type: 'drag_to_columns',
    title: 'УПРАЖНЕНИЕ 1',
    instruction: 'Подредете имената в две групи – мъжки и женски.',
    imageUrl: '/assets/lesson-06/01-upr-01-imena/01-oblak-imena.jpg',
    order: 1,
    points: 39,
    items: [
      'Жана', 'Красимир', 'Вероника', 'Борис', 'Джоана', 'Анастасия',
      'Ивана', 'Мария', 'Иван', 'Георги', 'Милена', 'Мохамед', 'Ахмед',
      'Силва', 'Диана', 'Петко', 'Али', 'Ездар', 'Ана', 'Джуди', 'Амира',
      'Расул', 'Набил', 'Таня', 'Иман', 'Илаф', 'Латифа', 'Максим',
      'Нили', 'Мустафа', 'Христо', 'Санди', 'Петя', 'Полина',
      'Димитър', 'Мариам', 'Юсеф', 'Дмитро', 'Сара',
    ],
    columns: [
      {
        id: 'mazhki',
        title: 'МЪЖКИ ИМЕНА',
        correctItems: [
          'Красимир', 'Борис', 'Иван', 'Георги', 'Мохамед', 'Ахмед',
          'Петко', 'Али', 'Ездар', 'Расул', 'Набил', 'Иман',
          'Максим', 'Мустафа', 'Христо', 'Димитър', 'Юсеф', 'Дмитро',
        ],
      },
      {
        id: 'zhenski',
        title: 'ЖЕНСКИ ИМЕНА',
        correctItems: [
          'Жана', 'Вероника', 'Джоана', 'Анастасия', 'Ивана', 'Мария',
          'Милена', 'Силва', 'Диана', 'Ана', 'Джуди', 'Амира',
          'Таня', 'Илаф', 'Латифа', 'Нили', 'Санди', 'Петя',
          'Полина', 'Мариам', 'Сара',
        ],
      },
    ],
  } as DragToColumnsExercise,

  // ORDER 2: НОВИ ДУМИ 1 – Членове на семейството (Page 55)
  {
    id: 'l06-novi-dumi-01',
    type: 'illustrated_cards',
    title: 'НОВИ ДУМИ 1',
    instruction: 'Натиснете за произношение.',
    order: 2,
    cards: [
      { id: 'semeystvo', imageUrl: '/assets/lesson-06/02-semeystvo-grupa/01-semeystvo-shest-dushi.jpg', label: 'Семейство' },
      { id: 'mazh',      imageUrl: '/assets/lesson-06/03-novi-dumi-1/01-mazh.jpg',           label: 'мъж' },
      { id: 'zhena',     imageUrl: '/assets/lesson-06/03-novi-dumi-1/02-zhena.jpg',          label: 'жена' },
      { id: 'dete',      imageUrl: '/assets/lesson-06/03-novi-dumi-1/03-dete.jpg',           label: 'дете' },
      { id: 'momche',    imageUrl: '/assets/lesson-06/03-novi-dumi-1/04-momche-topka.jpg',   label: 'момче' },
      { id: 'momiche',   imageUrl: '/assets/lesson-06/03-novi-dumi-1/05-momiche-tsvete.jpg', label: 'момиче' },
    ],
  } as IllustratedCardsExercise,

  // ORDER 3: Упр. 2 – Колко думи можете да откриете? / Кръстословица (Page 55)
  // TODO: Word_search uses a linear string; vertical words are encoded by appending columns.
  // Grid (7×7): Row0=ВЕБАБАД Row1=ДЯДОЮСЪ Row2=ЕОЖМЗЕЩ Row3=ТМЕАБСЕ Row4=ЕЪНЬРТР Row5=ЦЖАКАРЯ Row6=БАЩАТАШ
  // Horizontal: БАБА(row0), ДЯДО(row1), БАЩА(row6)
  // Vertical: ДЕТЕ(col0 rows1-4), МАЙКА(col3 rows2-6), БРАТ(col4 rows3-6), СЕСТРА(col5 rows1-6), ДЪЩЕРЯ(col6 rows0-5)
  {
    id: 'l06-ex-02',
    type: 'word_search',
    title: 'УПРАЖНЕНИЕ 2',
    instruction: 'Колко думи можете да откриете?',
    order: 3,
    points: 8,
    letterString: 'ВЕБАБАДДЯДОЮСЪЕОЖМЗЕЩТМЕАБСЕЕЪНЬРТРЦЖАКАРЯБАЩАТАШВДЕТЕЦБЕЯОМЪЖАБДЖЕНАЩАОМАЙКАБЮЗБРАТАСЕСТРАДЪЩЕРЯШ',
    correctWords: ['БАБА', 'ДЯДО', 'БАЩА', 'ДЕТЕ', 'МАЙКА', 'БРАТ', 'СЕСТРА', 'ДЪЩЕРЯ'],
  } as WordSearchExercise,

  // ORDER 4: Упр. 3 – Подредете буквите в думи (Page 56)
  {
    id: 'l06-ex-03',
    type: 'syllable_blocks',
    title: 'УПРАЖНЕНИЕ 3',
    instruction: 'Влачете буквите и ги подредете, за да съставите думи.',
    order: 4,
    points: 8,
    puzzles: [
      { id: 'деца',   syllables: ['Е', 'Ц', 'А', 'Д'],          correctWord: 'ДЕЦА'   },
      { id: 'баща',   syllables: ['А', 'Щ', 'А', 'Б'],          correctWord: 'БАЩА'  },
      { id: 'сестра', syllables: ['Е', 'С', 'Т', 'Р', 'А', 'С'], correctWord: 'СЕСТРА' },
      { id: 'баба',   syllables: ['А', 'Б', 'А', 'Б'],          correctWord: 'БАБА'  },
      { id: 'майка',  syllables: ['А', 'Й', 'К', 'А', 'М'],     correctWord: 'МАЙКА' },
      { id: 'дядо',   syllables: ['Я', 'Д', 'О', 'Д'],          correctWord: 'ДЯДО'  },
      { id: 'брат',   syllables: ['Р', 'А', 'Т', 'Б'],          correctWord: 'БРАТ'  },
      { id: 'син',    syllables: ['И', 'Н', 'С'],               correctWord: 'СИН'   },
    ],
  } as SyllableBlocksExercise,

  // ──────────────────────────────────────────────────────────
  // СТРАНИЦА 56
  // ──────────────────────────────────────────────────────────

  // ORDER 5: ДИАЛОЗИ 1 (a, б, в) (Page 56)
  {
    id: 'l06-dialozi-01',
    type: 'dialogues',
    title: 'ДИАЛОЗИ 1',
    instruction: 'Изслушайте диалозите и се опитайте да ги прочетете.',
    order: 5,
    sections: [
      {
        id: 'а.',
        lines: [
          { text: '– Как се казваш?' },
          { text: '– Аз се казвам Али.' },
          { text: '– Имаш ли голямо семейство?' },
          { text: '– Да, в Сирия имам голямо семейство.' },
        ],
      },
      {
        id: 'б.',
        lines: [
          { text: '– Женен ли си?' },
          { text: '– Да, женен съм.' },
          { text: '– Имаш ли деца?' },
          { text: '– Да, имам четири деца.' },
        ],
      },
      {
        id: 'в.',
        lines: [
          { text: '– Имаш ли брат?' },
          { text: '– Да, имам.' },
          { text: '– Имаш ли сестра?' },
          { text: '– Не, нямам.' },
        ],
      },
    ],
  } as DialoguesExercise,

  // SKIP Упр. 4 — Прочетете диалозите по двойки (по клиент)

  // ORDER 6: Упр. 5 – Направете диалозите в учтива форма (Page 56)
  {
    id: 'l06-ex-05',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 5',
    instruction: 'Направете диалозите в учтива форма.',
    order: 6,
    points: 3,
    layout: 'qa-split',
    sentences: [
      {
        text: 'Как се казваш? | Как се казвате?',
        blanks: [],
        correctAnswers: [],
        isExample: true,
      },
      {
        text: 'Имаш ли голямо семейство? | _______',
        blanks: [0],
        correctAnswers: ['Имате ли голямо семейство?'],
        options: ['Имате ли голямо семейство?', 'Имаш ли голямо семейство?', 'Имам ли голямо семейство?'],
      },
      {
        text: 'Женен ли си? | _______',
        blanks: [0],
        correctAnswers: ['Женен ли сте?'],
        options: ['Женен ли сте?', 'Женен ли е?', 'Женен ли си?'],
      },
      {
        text: 'Имаш ли деца? | _______',
        blanks: [0],
        correctAnswers: ['Имате ли деца?'],
        options: ['Имате ли деца?', 'Имаш ли деца?', 'Има ли деца?'],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ORDER 7: ГРАМАТИКА 1 – Имам / Нямам (Page 56)
  {
    id: 'l06-gramatika-01',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 1',
    subtitle: 'Граматика – Сегашно време (12)',
    instruction: 'Запознайте се с глаголите ИМАМ и НЯМАМ.',
    order: 7,
    tableTitle: 'ИМАМ / НЯМАМ',
    columns: ['(+)', '(–)'],
    rows: [
      { pronoun: 'аз',  cells: ['имам',  'нямам']  },
      { pronoun: 'ти',  cells: ['имаш',  'нямаш']  },
      { pronoun: 'той', cells: ['има',   'няма']   },
      { pronoun: 'тя',  cells: ['има',   'няма']   },
      { pronoun: 'то',  cells: ['има',   'няма']   },
      { pronoun: 'ние', cells: ['имаме', 'нямаме'] },
      { pronoun: 'вие', cells: ['имате', 'нямате'] },
      { pronoun: 'те',  cells: ['имат',  'нямат']  },
    ],
  } as GrammarTableExercise,

  // ORDER 8: Упр. 6 – Работете по двойки (имаш ли брат?) (Page 56)
  {
    id: 'l06-ex-06',
    type: 'personal_choice',
    title: 'УПРАЖНЕНИЕ 6',
    instruction: 'Работете по двойки. Питайте и отговаряйте по модела.',
    order: 8,
    points: 0,
    model: {
      question: 'Имаш ли брат?',
      positiveAnswer: 'Да, имам.',
      negativeAnswer: 'Не, нямам.',
    },
    blankOptions: ['имам', 'нямам'],
    items: [
      { id: 'brat',     question: 'Имаш ли брат?',             positiveTemplate: 'Да, ___.', negativeTemplate: 'Не, ___.', positiveBlank: 'имам', negativeBlank: 'нямам' },
      { id: 'sestra',   question: 'Имаш ли сестра?',           positiveTemplate: 'Да, ___.', negativeTemplate: 'Не, ___.', positiveBlank: 'имам', negativeBlank: 'нямам' },
      { id: 'deca',     question: 'Имаш ли деца?',             positiveTemplate: 'Да, ___.', negativeTemplate: 'Не, ___.', positiveBlank: 'имам', negativeBlank: 'нямам' },
      { id: 'semeystvo', question: 'Имаш ли голямо семейство?', positiveTemplate: 'Да, ___.', negativeTemplate: 'Не, ___.', positiveBlank: 'имам', negativeBlank: 'нямам' },
    ],
  } as PersonalChoiceExercise,

  // ORDER 9: ГРАМАТИКА 2 – Двама, трима, четирима (Page 56)
  {
    id: 'l06-gramatika-02',
    type: 'grammar_examples',
    title: 'ГРАМАТИКА 2',
    subtitle: 'Граматика – Бройни числителни (1)',
    instruction: 'Запознайте се с бройните числителни за хора.',
    order: 9,
    examples: [
      {
        imageUrl: '',
        text: 'За хора',
        lines: [
          'двама синове',
          'трима синове',
          'четирима синове',
          '',
          'Аз имам двама синове.',
        ],
      },
      {
        imageUrl: '',
        text: 'За предмети',
        lines: [
          'два апартамента',
          'три апартамента',
          'четири апартамента',
          '',
          'Аз имам два апартамента.',
        ],
      },
    ],
  } as GrammarExamplesExercise,

  // ORDER 10: Упр. 7 – Напишете числата с думи (Page 56)
  {
    id: 'l06-ex-07',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 7',
    instruction: 'Напишете числата с думи.',
    order: 10,
    points: 8,
    layout: 'single',
    sentences: [
      {
        text: 'Имам (2) две сестри.',
        blanks: [],
        correctAnswers: [],
        isExample: true,
      },
      {
        text: 'Мустафа има (3) _______ синове и (3) _______ дъщери.',
        blanks: [0, 1],
        correctAnswers: ['трима', 'три'],
        options: [['трима', 'три', 'двама', 'два'], ['три', 'трима', 'две', 'двама']],
      },
      {
        text: 'Тя има (2) _______ сестри.',
        blanks: [0],
        correctAnswers: ['две'],
        options: ['две', 'двама', 'два', 'трима'],
      },
      {
        text: 'В ресторанта има (4) _______ души.',
        blanks: [0],
        correctAnswers: ['четирима'],
        options: ['четирима', 'четири', 'трима', 'двама'],
      },
      {
        text: 'Тук има (7) _______ души от Украйна и (2) _______ от България.',
        blanks: [0, 1],
        correctAnswers: ['седем', 'двама'],
        options: [['седем', 'шест', 'осем', 'пет'], ['двама', 'два', 'три', 'трима']],
      },
      {
        text: 'Те имат (2) _______ апартамента и (3) _______ къщи.',
        blanks: [0, 1],
        correctAnswers: ['два', 'три'],
        options: [['два', 'двама', 'три', 'трима'], ['три', 'трима', 'две', 'двама']],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ORDER 11: ГРАМАТИКА 3 – Множествено число на съществителните (Page 56)
  {
    id: 'l06-gramatika-03',
    type: 'grammar_examples',
    title: 'ГРАМАТИКА 3',
    subtitle: 'Граматика – Число на съществителните (3)',
    instruction: 'Запознайте се с множественото число на семейните думи.',
    order: 11,
    examples: [
      {
        imageUrl: '',
        text: 'Множествено число',
        lines: [
          'мъж – мъже',
          'дядо – дядовци',
          'брат – братя',
          'дете – деца',
        ],
      },
      {
        imageUrl: '',
        text: 'Примери',
        lines: [
          'Имам двама дядовци.',
          'Имам две деца.',
        ],
      },
    ],
  } as GrammarExamplesExercise,

  // ──────────────────────────────────────────────────────────
  // СТРАНИЦА 57
  // ──────────────────────────────────────────────────────────

  // ORDER 12: Упр. 8 – Напишете думите в множествено число (Page 57)
  {
    id: 'l06-ex-08',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 8',
    instruction: 'Напишете думите за членовете на семейството в множествено число.',
    order: 12,
    points: 3,
    layout: 'single',
    sentences: [
      {
        text: 'Имам един брат. Ти имаш много братя.',
        blanks: [],
        correctAnswers: [],
        isExample: true,
      },
      {
        text: 'Милена има един дядо. Яна има двама _______.',
        blanks: [0],
        correctAnswers: ['дядовци'],
        options: ['дядовци', 'дядота', 'дядове', 'дяди'],
      },
      {
        text: 'Иван има едно дете. Мария има много _______.',
        blanks: [0],
        correctAnswers: ['деца'],
        options: ['деца', 'дете', 'детета', 'дети'],
      },
      {
        text: 'В киното има един мъж. В кафето има много _______.',
        blanks: [0],
        correctAnswers: ['мъже'],
        options: ['мъже', 'мъжа', 'мъжи', 'мъжове'],
      },
    ],
  } as WorkbookFillBlankExercise,

  // SKIP Упр. 9 — Разкажете за семейството си по модела (по клиент)

  // ORDER 13: ГРАМАТИКА 4 – Кратки притежателни местоимения (таблица) (Page 57)
  {
    id: 'l06-gramatika-04',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 4',
    instruction: 'Запознайте се с кратките притежателни местоимения.',
    order: 13,
    tableTitle: 'Кратки притежателни местоимения',
    columns: ['Кратко притежателно'],
    rows: [
      { pronoun: 'аз',  cells: ['ми'] },
      { pronoun: 'ти',  cells: ['ти'] },
      { pronoun: 'той', cells: ['му'] },
      { pronoun: 'тя',  cells: ['й']  },
      { pronoun: 'то',  cells: ['му'] },
      { pronoun: 'ние', cells: ['ни'] },
      { pronoun: 'вие', cells: ['ви'] },
      { pronoun: 'те',  cells: ['им'] },
    ],
    notes: [
      'Аз имам семейство. Семейството ми е в България.',
    ],
  } as GrammarTableExercise,

  // ORDER 14: ГРАМАТИКА 4б – Примери и Внимание! (Page 57)
  {
    id: 'l06-gramatika-04b',
    type: 'grammar_examples',
    title: 'ГРАМАТИКА 4',
    subtitle: 'Граматика – Кратки притежателни местоимения (9)',
    instruction: 'Употреба на кратките притежателни местоимения.',
    order: 14,
    examples: [
      {
        imageUrl: '',
        text: 'С определителен член',
        lines: [
          '• семейство**то** ми',
          '• дете**то** ми',
          '• синъ**т** ми / сина ми',
          '• мъж**ът** ми / мъжа ми',
          '• родителите ми',
        ],
      },
      {
        imageUrl: '',
        text: '⚠️ Внимание!',
        lines: [
          'майка ми, баща ми',
          'брат ми, сестра ми',
          'баба ми, дядо ми',
          'жена ми, дъщеря ми',
        ],
      },
    ],
  } as GrammarExamplesExercise,

  // ORDER 15: Упр. 10 – Притежателно местоимение (Page 57)
  {
    id: 'l06-ex-10',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 10',
    instruction: 'Напишете подходящото притежателно местоимение – ми, ти, му, й, ни, ви, им.',
    order: 15,
    points: 6,
    layout: 'single',
    sentences: [
      {
        text: 'Аз имам сестра. Сестрата ми е в Ирак.',
        blanks: [],
        correctAnswers: [],
        isExample: true,
      },
      {
        text: 'Ивана има брат. Брат ___ е студент.',
        blanks: [0],
        correctAnswers: ['й'],
        options: ['й', 'му', 'ти', 'им', 'ни'],
      },
      {
        text: 'Ала е женен. Жена ___ е българка.',
        blanks: [0],
        correctAnswers: ['му'],
        options: ['му', 'й', 'ти', 'им', 'ни'],
      },
      {
        text: 'Семейство Петрови имат едно дете. Детето ___ се казва Димитър.',
        blanks: [0],
        correctAnswers: ['им'],
        options: ['им', 'му', 'й', 'ти', 'ни'],
      },
      {
        text: 'Диана, как е баща ___ ?',
        blanks: [0],
        correctAnswers: ['ти'],
        options: ['ти', 'ви', 'му', 'й', 'им'],
      },
      {
        text: 'Вие имате един син. Синът ___ в София ли е?',
        blanks: [0],
        correctAnswers: ['ви'],
        options: ['ви', 'ти', 'им', 'му', 'ни'],
      },
      {
        text: 'Моника е в София. Семейството ___ е в Пловдив.',
        blanks: [0],
        correctAnswers: ['й'],
        options: ['й', 'му', 'им', 'ти', 'ни'],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ORDER 16: Упр. 11 – Определителен член (Page 57)
  {
    id: 'l06-ex-11',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 11',
    instruction: 'Напишете определителен член, където е нужно.',
    order: 16,
    points: 7,
    layout: 'single',
    sentences: [
      {
        text: 'Как се казва синът ви?',
        blanks: [],
        correctAnswers: [],
        isExample: true,
      },
      {
        text: 'Това е _______ ми.',
        blanks: [0],
        correctAnswers: ['баба'],
        options: ['баба', 'бабата', 'бабата ми', 'бабе'],
      },
      {
        text: 'Къде е _______ ти?',
        blanks: [0],
        correctAnswers: ['семейството'],
        options: ['семейството', 'семейство', 'семействто', 'семействата'],
      },
      {
        text: '_______ й е в Украйна.',
        blanks: [0],
        correctAnswers: ['Мъжът'],
        options: ['Мъжът', 'Мъжа', 'Мъж', 'Мъжете'],
      },
      {
        text: '_______ му е учителка.',
        blanks: [0],
        correctAnswers: ['Жена'],
        options: ['Жена', 'Жената', 'Жени', 'Женките'],
      },
      {
        text: '_______ й са в Бургас.',
        blanks: [0],
        correctAnswers: ['Родителите'],
        options: ['Родителите', 'Родители', 'Родителя', 'Родителят'],
      },
      {
        text: '_______ им живее във Варна.',
        blanks: [0],
        correctAnswers: ['Синът'],
        options: ['Синът', 'Сина', 'Синове', 'Синовете'],
      },
      {
        text: '_______ му е тук.',
        blanks: [0],
        correctAnswers: ['Дядо'],
        options: ['Дядо', 'Дядото', 'Дядовци', 'Дяда'],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ORDER 17: ГРАМАТИКА 5 – На колко години (Page 57)
  {
    id: 'l06-gramatika-05',
    type: 'grammar_examples',
    title: 'ГРАМАТИКА 5',
    instruction: 'Запознайте се с изразяването на възраст.',
    order: 17,
    examples: [
      {
        imageUrl: '',
        text: 'Диалог',
        lines: [
          '– На колко години си?',
          '– Аз съм на двайсет и една години.',
        ],
      },
      {
        imageUrl: '',
        text: 'Формула',
        lines: [
          'Аз съм на 21 години.',
          '= На 21 години съм.',
        ],
      },
    ],
  } as GrammarExamplesExercise,

  // ORDER 18: Упр. 12 – Попълнете с формата на глагола съм (Page 57)
  {
    id: 'l06-ex-12',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 12',
    instruction: 'Попълнете с подходящата форма на глагола съм.',
    order: 18,
    points: 5,
    layout: 'single',
    sentences: [
      {
        text: 'На колко години сте Вие?',
        blanks: [],
        correctAnswers: [],
        isExample: true,
      },
      {
        text: 'На колко години _______ тя?',
        blanks: [0],
        correctAnswers: ['е'],
        options: ['е', 'съм', 'си', 'са', 'сме'],
      },
      {
        text: 'На колко години _______ аз?',
        blanks: [0],
        correctAnswers: ['съм'],
        options: ['съм', 'е', 'си', 'са', 'сме'],
      },
      {
        text: 'На колко години _______ той?',
        blanks: [0],
        correctAnswers: ['е'],
        options: ['е', 'съм', 'си', 'са', 'сте'],
      },
      {
        text: 'На колко години _______ те?',
        blanks: [0],
        correctAnswers: ['са'],
        options: ['са', 'е', 'съм', 'сме', 'сте'],
      },
      {
        text: 'На колко години _______ то?',
        blanks: [0],
        correctAnswers: ['е'],
        options: ['е', 'съм', 'са', 'сме', 'сте'],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ──────────────────────────────────────────────────────────
  // СТРАНИЦА 58
  // ──────────────────────────────────────────────────────────

  // ORDER 19: ДИАЛОЗИ 2 (а, б) (Page 58)
  {
    id: 'l06-dialozi-02',
    type: 'dialogues',
    title: 'ДИАЛОЗИ 2',
    instruction: 'Изслушайте диалозите и се опитайте да ги прочетете.',
    order: 19,
    sections: [
      {
        id: 'а.',
        lines: [
          { text: '– Колко души има в семейството ти?' },
          { text: '– Имам майка, баща, двама братя и три сестри.' },
          { text: '– Къде са родителите ти?' },
          { text: '– Те са в България.' },
          { text: '– Къде са братята ти и сестрите ти?' },
          { text: '– Те са в Ирак.' },
        ],
      },
      {
        id: 'б.',
        lines: [
          { text: '– На колко години си?' },
          { text: '– На 40.' },
          { text: '– На колко години е жена ти?' },
          { text: '– Жена ми е на 37 години.' },
          { text: '– Къде е тя сега?' },
          { text: '– Тя е вкъщи с децата.' },
        ],
      },
    ],
  } as DialoguesExercise,

  // SKIP Упр. 13 — Прочетете диалозите по двойки (по клиент)
  // SKIP Упр. 14 — Работете по двойки, прочетете диалозите и отговаряйте за себе си (по клиент)

  // ORDER 20: НОВИ ДУМИ 2 – Съпруг, леля, чичо, внук (Page 58)
  {
    id: 'l06-novi-dumi-02',
    type: 'illustrated_cards',
    title: 'НОВИ ДУМИ 2',
    instruction: 'Натиснете за произношение.',
    order: 20,
    cards: [
      { id: 'saprug',   imageUrl: '', label: 'съпруг',   sublabels: ['= мъж'] },
      { id: 'sapruga',  imageUrl: '', label: 'съпруга',  sublabels: ['= жена'] },
      { id: 'saprouzi', imageUrl: '', label: 'съпрузи',  sublabels: ['= мъж и жена'] },
      { id: 'chicho',   imageUrl: '', label: 'чичо',     sublabels: ['чичовци'] },
      { id: 'lelya',    imageUrl: '', label: 'леля',     sublabels: ['лели'] },
      { id: 'vnuk',     imageUrl: '', label: 'внук',     sublabels: ['внуци'] },
      { id: 'vnuchka',  imageUrl: '', label: 'внучка',   sublabels: ['внучки'] },
    ],
  } as IllustratedCardsExercise,

  // ORDER 21: ГРАМАТИКА 6 – Семейно дърво (Page 58)
  {
    id: 'l06-gramatika-06',
    type: 'grammar_examples',
    title: 'ГРАМАТИКА 6',
    instruction: 'Запознайте се с родословното дърво. Кликнете върху снимката, за да се увеличи.',
    order: 21,
    examples: [
      {
        imageUrl: '/assets/lesson-06/05-gramatika-6-semeino-darvo/01-semeino-darvo.png',
        zoomable: true,
        text: 'Родословно дърво',
        lines: [
          'Саид е баща на Расул и Санди.',
          'Саид е дядо на Джоана и Мустафа.',
        ],
      },
    ],
  } as GrammarExamplesExercise,

  // ORDER 22: Упр. 15 – Попълнете семейни връзки (Page 58)
  {
    id: 'l06-ex-15',
    type: 'dropdown_match',
    title: 'УПРАЖНЕНИЕ 15',
    instruction: 'Попълнете празните места. Използвайте родословното дърво. Модел: Латифа е съпруга на Саид.',
    order: 22,
    points: 8,
    questions: [
      { id: 'q1', left: 'Латифа е … на Расул.', options: ['майка', 'баба', 'леля', 'съпруга', 'дядо', 'внучка'], correctAnswer: 'майка' },
      { id: 'q2', left: 'Расул е … на Мариам.', options: ['съпруг', 'брат', 'баща', 'чичо', 'дядо', 'внук'], correctAnswer: 'съпруг' },
      { id: 'q3', left: 'Саид е … на Санди.', options: ['баща', 'дядо', 'чичо', 'брат', 'съпруг', 'внук'], correctAnswer: 'баща' },
      { id: 'q4', left: 'Санди е … на Амира.', options: ['леля', 'майка', 'баба', 'съпруга', 'сестра', 'внучка'], correctAnswer: 'майка', alternateCorrectAnswers: ['леля'] },
      { id: 'q5', left: 'Расул е … на Ахмед.', options: ['брат', 'баща', 'чичо', 'дядо', 'съпруг', 'внук'], correctAnswer: 'брат' },
      { id: 'q6', left: 'Джоана е … на Латифа.', options: ['внучка', 'внук', 'дъщеря', 'леля', 'баба', 'сестра'], correctAnswer: 'внучка' },
      { id: 'q7', left: 'Саид е … на Сара.', options: ['дядо', 'баща', 'чичо', 'брат', 'съпруг', 'внук'], correctAnswer: 'дядо' },
      { id: 'q8', left: 'Ездар е … на Саид и Латифа.', options: ['внук', 'внучка', 'дете', 'чичо', 'брат', 'баща'], correctAnswer: 'внук' },
    ],
  } as DropdownMatchExercise,

  // ORDER 23: Упр. 16 – Довършете изреченията (семейни двойки) (Page 58)
  {
    id: 'l06-ex-16',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 16',
    instruction: 'Довършете изреченията. Използвайте родословното дърво.',
    order: 23,
    points: 8,
    layout: 'single',
    sentences: [
      {
        text: 'Саид и Латифа са мъж и жена.',
        blanks: [],
        correctAnswers: [],
        isExample: true,
      },
      {
        text: 'Саид и Расул са _______.',
        blanks: [0],
        correctAnswers: ['баща и син'],
        options: ['баща и син', 'майка и дъщеря', 'братя', 'дядо и внук'],
      },
      {
        text: 'Санди и Силва са _______.',
        blanks: [0],
        correctAnswers: ['майка и дъщеря'],
        options: ['майка и дъщеря', 'баща и син', 'сестри', 'леля и племенница'],
      },
      {
        text: 'Амира и Сара са _______.',
        blanks: [0],
        correctAnswers: ['сестри'],
        options: ['сестри', 'братя', 'майка и дъщеря', 'баща и дъщеря'],
      },
      {
        text: 'Джоана и Мустафа са _______.',
        blanks: [0],
        correctAnswers: ['брат и сестра'],
        options: ['брат и сестра', 'сестри', 'майка и дъщеря', 'дядо и внук'],
      },
      {
        text: 'Латифа и Миран са _______.',
        blanks: [0],
        correctAnswers: ['баба и внук'],
        options: ['баба и внук', 'дядо и внучка', 'майка и син', 'леля и племенник'],
      },
      {
        text: 'Расул и Санди са _______.',
        blanks: [0],
        correctAnswers: ['брат и сестра'],
        options: ['брат и сестра', 'мъж и жена', 'сестри', 'братя'],
      },
      {
        text: 'Саид и Ездар са _______.',
        blanks: [0],
        correctAnswers: ['дядо и внук'],
        options: ['дядо и внук', 'дядо и внучка', 'баща и син', 'брат и сестра'],
      },
      {
        text: 'Саид и Джоана са _______.',
        blanks: [0],
        correctAnswers: ['дядо и внучка'],
        options: ['дядо и внучка', 'дядо и внук', 'баща и дъщеря', 'баба и внучка'],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ──────────────────────────────────────────────────────────
  // СТРАНИЦА 59
  // ──────────────────────────────────────────────────────────

  // ORDER 24: Упр. 17 – Трансформирайте изреченията (Page 59)
  {
    id: 'l06-ex-17',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 17',
    instruction: 'Трансформирайте изреченията според модела.',
    order: 24,
    points: 6,
    layout: 'qa-split',
    sentences: [
      {
        text: 'Латифа е майка на Расул. | Майката на Расул се казва Латифа.',
        blanks: [],
        correctAnswers: [],
        isExample: true,
      },
      {
        text: 'Саид е баща на Расул. | _______',
        blanks: [0],
        correctAnswers: ['Бащата на Расул се казва Саид.'],
        options: ['Бащата на Расул се казва Саид.', 'Синът на Расул се казва Саид.', 'Расул е баща на Саид.'],
      },
      {
        text: 'Расул е син на Саид. | _______',
        blanks: [0],
        correctAnswers: ['Синът на Саид се казва Расул.'],
        options: ['Синът на Саид се казва Расул.', 'Бащата на Саид се казва Расул.', 'Дядото на Саид се казва Расул.'],
      },
      {
        text: 'Саид и Латифа са родители на Расул. | _______',
        blanks: [0],
        correctAnswers: ['Родителите на Расул се казват Саид и Латифа.'],
        options: ['Родителите на Расул се казват Саид и Латифа.', 'Децата на Расул се казват Саид и Латифа.', 'Саид и Латифа са деца на Расул.'],
      },
      {
        text: 'Миран е внук на Латифа. | _______',
        blanks: [0],
        correctAnswers: ['Внукът на Латифа се казва Миран.'],
        options: ['Внукът на Латифа се казва Миран.', 'Внучката на Латифа се казва Миран.', 'Синът на Латифа се казва Миран.'],
      },
      {
        text: 'Санди е съпруга на Расул. | _______',
        blanks: [0],
        correctAnswers: ['Съпругата на Расул се казва Санди.'],
        options: ['Съпругата на Расул се казва Санди.', 'Дъщерята на Расул се казва Санди.', 'Сестрата на Расул се казва Санди.'],
      },
      {
        text: 'Санди е леля на Сара. | _______',
        blanks: [0],
        correctAnswers: ['Лелята на Сара се казва Санди.'],
        options: ['Лелята на Сара се казва Санди.', 'Майката на Сара се казва Санди.', 'Сестрата на Сара се казва Санди.'],
      },
    ],
  } as WorkbookFillBlankExercise,

  // SKIP Упр. 18 — Работете по двойки за родословното дърво (по клиент)
  // SKIP Упр. 19 — Нарисувайте родословното дърво на семейството си (по клиент)

  // ORDER 25: НОВИ ДУМИ 3 – Антоними (Page 59)
  {
    id: 'l06-novi-dumi-03',
    type: 'illustrated_cards',
    title: 'НОВИ ДУМИ 3',
    instruction: 'Натиснете за произношение.',
    order: 25,
    cards: [
      { id: 'mlad-star',         imageUrl: '/assets/lesson-06/06-novi-dumi-3-antonimi/01-mlad-star.jpg',        label: 'млад – стар'           },
      { id: 'dobar-losh',        imageUrl: '/assets/lesson-06/06-novi-dumi-3-antonimi/02-dobar-losh.jpg',       label: 'добър – лош'           },
      { id: 'visok-nisak',       imageUrl: '/assets/lesson-06/06-novi-dumi-3-antonimi/03-visok-nisak.jpg',      label: 'висок – нисък'         },
      { id: 'slab-pulen',        imageUrl: '/assets/lesson-06/06-novi-dumi-3-antonimi/04-slab-palen.jpg',       label: 'слаб – пълен'          },
      { id: 'rabotliv-marzeliv', imageUrl: '/assets/lesson-06/06-novi-dumi-3-antonimi/05-rabotliv-marzeliv.jpg', label: 'работлив – мързелив'  },
      { id: 'golyam-malak',      imageUrl: '/assets/lesson-06/06-novi-dumi-3-antonimi/06-golyam-malak.jpg',     label: 'голям – малък'         },
      { id: 'umen-glupav',       imageUrl: '/assets/lesson-06/06-novi-dumi-3-antonimi/07-umen-glupav.jpg',      label: 'умен – глупав'         },
      { id: 'krasiv-grozen',     imageUrl: '/assets/lesson-06/06-novi-dumi-3-antonimi/08-krasiv-grozen.jpg',    label: 'красив – грозен'       },
    ],
  } as IllustratedCardsExercise,

  // ORDER 26: Упр. 20 – Свържете антонимите (Page 59)
  {
    id: 'l06-ex-20',
    type: 'match_pairs',
    title: 'УПРАЖНЕНИЕ 20',
    instruction: 'Свържете антонимите.',
    order: 26,
    points: 7,
    pairs: [
      { id: 'p1', left: 'млад',      correctRight: 'стар'      },
      { id: 'p2', left: 'красив',    correctRight: 'грозен'    },
      { id: 'p3', left: 'умен',      correctRight: 'глупав'    },
      { id: 'p4', left: 'добър',     correctRight: 'лош'       },
      { id: 'p5', left: 'висок',     correctRight: 'нисък'     },
      { id: 'p6', left: 'слаб',      correctRight: 'пълен'     },
      { id: 'p7', left: 'работлив',  correctRight: 'мързелив'  },
    ],
  } as MatchPairsExercise,

  // ──────────────────────────────────────────────────────────
  // СТРАНИЦА 60
  // ──────────────────────────────────────────────────────────

  // ORDER 27: ГРАМАТИКА 7 – Род на прилагателните (Page 60)
  {
    id: 'l06-gramatika-07',
    type: 'grammar_examples',
    title: 'ГРАМАТИКА 7',
    subtitle: 'Граматика – Род и число на прилагателните (5)',
    instruction: 'Запознайте се с рода на прилагателните.',
    order: 27,
    examples: [
      {
        imageUrl: '/assets/lesson-06/07-gramatika-7-prilagatelni-roda/01-hubav-mazh.jpg',
        text: 'хубав мъж',
        subtext: '(мъжки род)',
      },
      {
        imageUrl: '/assets/lesson-06/07-gramatika-7-prilagatelni-roda/02-hubava-zhena.jpg',
        text: 'хубава жена',
        subtext: '(женски род)',
      },
      {
        imageUrl: '/assets/lesson-06/07-gramatika-7-prilagatelni-roda/03-hubavo-dete.jpg',
        text: 'хубаво дете',
        subtext: '(среден род)',
      },
      {
        imageUrl: '',
        text: 'хубави хора',
        lines: [
          'умен / умна / умно / умни',
          'добър / добра / добро / добри',
          'малък / малка / малко / малки',
          'голям / голяма / голямо / големи',
        ],
      },
    ],
  } as GrammarExamplesExercise,

  // ORDER 28: Упр. 21+22 – Попълнете таблицата (прилагателни, родове) (Page 60) — обединени
  {
    id: 'l06-ex-21',
    type: 'table_fill',
    title: 'УПРАЖНЕНИЕ 21',
    instruction: 'Попълнете формите на прилагателните.',
    order: 28,
    points: 10,
    paragraphs: [],
    tables: [
      {
        name: 'Модел: стар, стара, старо, стари',
        columns: ['мъжки род', 'женски род', 'среден род', 'множествено число'],
        rows: [
          {
            label: 'хубав__',
            cells: [
              { correctAnswers: ['хубав'],  options: ['хубав', 'хубава', 'хубаво'] },
              { correctAnswers: ['хубава'], options: ['хубав', 'хубава', 'хубаво'] },
              { correctAnswers: ['хубаво'], options: ['хубав', 'хубава', 'хубаво', 'хубави'] },
              { correctAnswers: ['хубави'], options: ['хубав', 'хубаво', 'хубави'] },
            ],
          },
          {
            label: 'глупав__',
            cells: [
              { correctAnswers: ['глупав'],  options: ['глупав', 'глупава', 'глупаво'] },
              { correctAnswers: ['глупава'], options: ['глупав', 'глупава', 'глупаво'] },
              { correctAnswers: ['глупаво'], options: ['глупав', 'глупаво', 'глупави'] },
              { correctAnswers: ['глупави'], options: ['глупав', 'глупаво', 'глупави'] },
            ],
          },
          {
            label: 'лош',
            cells: [
              { correctAnswers: ['лош'],  options: ['лош', 'лоша', 'лошо'] },
              { correctAnswers: ['лоша'], options: ['лош', 'лоша', 'лошо'] },
              { correctAnswers: ['лошо'], options: ['лоша', 'лошо', 'лоши'] },
              { correctAnswers: ['лоши'], options: ['лоша', 'лошо', 'лоши'] },
            ],
          },
          {
            label: 'висок__',
            cells: [
              { correctAnswers: ['висок'],  options: ['висок', 'висока', 'високо'] },
              { correctAnswers: ['висока'], options: ['висок', 'висока', 'високо'] },
              { correctAnswers: ['високо'], options: ['висока', 'високо', 'високи'] },
              { correctAnswers: ['високи'], options: ['висока', 'високо', 'високи'] },
            ],
          },
          {
            label: 'слаб__',
            cells: [
              { correctAnswers: ['слаб'],  options: ['слаб', 'слаба', 'слабо'] },
              { correctAnswers: ['слаба'], options: ['слаб', 'слаба', 'слабо'] },
              { correctAnswers: ['слабо'], options: ['слаба', 'слабо', 'слаби'] },
              { correctAnswers: ['слаби'], options: ['слаба', 'слабо', 'слаби'] },
            ],
          },
          {
            label: 'грозен',
            cells: [
              { correctAnswers: ['грозен'],  options: ['грозен', 'грозна', 'грозно', 'грозни'] },
              { correctAnswers: ['грозна'],  options: ['грозен', 'грозна', 'грозно', 'грозни'] },
              { correctAnswers: ['грозно'],  options: ['грозен', 'грозна', 'грозно', 'грозни'] },
              { correctAnswers: ['грозни'],  options: ['грозен', 'грозна', 'грозно', 'грозни'] },
            ],
          },
          {
            label: 'нисък',
            cells: [
              { correctAnswers: ['нисък'],  options: ['нисък', 'ниска', 'ниско', 'ниски'] },
              { correctAnswers: ['ниска'],  options: ['нисък', 'ниска', 'ниско', 'ниски'] },
              { correctAnswers: ['ниско'],  options: ['нисък', 'ниска', 'ниско', 'ниски'] },
              { correctAnswers: ['ниски'],  options: ['нисък', 'ниска', 'ниско', 'ниски'] },
            ],
          },
          {
            label: 'пълен',
            cells: [
              { correctAnswers: ['пълен'],  options: ['пълен', 'пълна', 'пълно', 'пълни'] },
              { correctAnswers: ['пълна'],  options: ['пълен', 'пълна', 'пълно', 'пълни'] },
              { correctAnswers: ['пълно'],  options: ['пълен', 'пълна', 'пълно', 'пълни'] },
              { correctAnswers: ['пълни'],  options: ['пълен', 'пълна', 'пълно', 'пълни'] },
            ],
          },
          {
            label: 'малък',
            cells: [
              { correctAnswers: ['малък'],   options: ['малък', 'малка', 'малко', 'малки'] },
              { correctAnswers: ['малка'],   options: ['малък', 'малка', 'малко', 'малки'] },
              { correctAnswers: ['малко'],   options: ['малък', 'малка', 'малко', 'малки'] },
              { correctAnswers: ['малки'],   options: ['малък', 'малка', 'малко', 'малки'] },
            ],
          },
          {
            label: 'голям',
            cells: [
              { correctAnswers: ['голям'],   options: ['голям', 'голяма', 'голямо', 'големи'] },
              { correctAnswers: ['голяма'],  options: ['голям', 'голяма', 'голямо', 'големи'] },
              { correctAnswers: ['голямо'],  options: ['голям', 'голяма', 'голямо', 'големи'] },
              { correctAnswers: ['големи'],  options: ['голям', 'голяма', 'голямо', 'големи'] },
            ],
          },
        ],
      },
    ],
  } as TableFillExercise,

  // ORDER 29: Упр. 23 – Подчертайте правилната форма на прилагателните (Page 60)
  {
    id: 'l06-ex-23',
    type: 'dropdown_match',
    title: 'УПРАЖНЕНИЕ 23',
    instruction: 'Изберете правилната форма на прилагателните.',
    order: 29,
    points: 7,
    // Модел: Милена е (хубав, хубава, хубаво, хубави). → хубава
    questions: [
      { id: 'q1', left: 'Петя и Христо са',   options: ['млад', 'млада', 'младо', 'млади'],    correctAnswer: 'млади'  },
      { id: 'q2', left: 'Георги е',            options: ['висок', 'висока', 'високо', 'високи'], correctAnswer: 'висок'  },
      { id: 'q3', left: 'Петко и Таня са',     options: ['умен', 'умна', 'умно', 'умни'],       correctAnswer: 'умни'   },
      { id: 'q4', left: 'Ана е',               options: ['нисък', 'ниска', 'ниско', 'ниски'],   correctAnswer: 'ниска'  },
      { id: 'q5', left: 'Детето е',            options: ['малък', 'малка', 'малко', 'малки'],   correctAnswer: 'малко'  },
      { id: 'q6', left: 'Синовете ми са',      options: ['добър', 'добра', 'добро', 'добри'],   correctAnswer: 'добри'  },
      { id: 'q7', left: 'Мария и Жана са',     options: ['голям', 'голяма', 'голямо', 'големи'], correctAnswer: 'големи' },
    ],
  } as DropdownMatchExercise,

  // ORDER 30: Упр. 24 – Довършете изреченията (прилагателни, антоними) (Page 60)
  {
    id: 'l06-ex-24',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 24',
    instruction: 'Довършете изреченията.',
    order: 30,
    points: 7,
    layout: 'single',
    sentences: [
      {
        text: 'Баща ми е добър и майка ми е добра.',
        blanks: [],
        correctAnswers: [],
        isExample: true,
      },
      {
        text: 'Брат ми е малък и сестра ми е _______.',
        blanks: [0],
        correctAnswers: ['малка'],
        options: ['малка', 'малко', 'малки', 'малък'],
      },
      {
        text: 'Дядо ми е стар и баба ми е _______.',
        blanks: [0],
        correctAnswers: ['стара'],
        options: ['стара', 'старо', 'стари', 'стар'],
      },
      {
        text: 'Синът ми е умен и дъщеря ми е _______.',
        blanks: [0],
        correctAnswers: ['умна'],
        options: ['умна', 'умно', 'умни', 'умен'],
      },
      {
        text: 'Чичо ми е нисък и леля ми е _______.',
        blanks: [0],
        correctAnswers: ['ниска'],
        options: ['ниска', 'ниско', 'ниски', 'нисък'],
      },
      {
        text: 'Внукът ми е голям и внучката ми е _______.',
        blanks: [0],
        correctAnswers: ['голяма'],
        options: ['голяма', 'голямо', 'големи', 'голям'],
      },
      {
        text: 'Баща ми е пълен и майка ми е _______.',
        blanks: [0],
        correctAnswers: ['пълна'],
        options: ['пълна', 'пълно', 'пълни', 'пълен'],
      },
      {
        text: 'Брат ми е висок и сестра ми е _______.',
        blanks: [0],
        correctAnswers: ['висока'],
        options: ['висока', 'високо', 'високи', 'висок'],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ORDER 31: Упр. 25 – Опишете хората от картинките (Page 60)
  {
    id: 'l06-ex-25',
    type: 'dropdown_match',
    title: 'УПРАЖНЕНИЕ 25',
    instruction: 'Изберете правилните прилагателни. Модел: Георги е стар, висок и слаб.',
    order: 31,
    points: 3,
    images: [
      { imageUrl: '/assets/lesson-06/08-upr-25-chetiri-personazha/01-georgi-i-ivo.jpg', label: 'Георги и Иво' },
      { imageUrl: '/assets/lesson-06/08-upr-25-chetiri-personazha/02-vasil-i-nikolay.jpg', label: 'Васил и Николай' },
    ],
    questions: [
      { id: 'q1', left: 'Иво е',    options: ['млад', 'стар', 'висок', 'нисък', 'слаб', 'пълен'],   correctAnswer: 'млад'   },
      { id: 'q2', left: 'Васил е',  options: ['висок', 'нисък', 'млад', 'стар', 'слаб', 'пълен'],   correctAnswer: 'висок'  },
      { id: 'q3', left: 'Николай е', options: ['пълен', 'слаб', 'млад', 'стар', 'висок', 'нисък'],  correctAnswer: 'пълен'  },
    ],
  } as DropdownMatchExercise,

  // ──────────────────────────────────────────────────────────
  // СТРАНИЦА 61
  // ──────────────────────────────────────────────────────────

  // ORDER 32: ГРАМАТИКА 8 – Работя (И-група) + Уча (Page 61)
  {
    id: 'l06-gramatika-08',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 8',
    subtitle: 'Граматика – Сегашно време (12)',
    instruction: 'Запознайте се с глагола РАБОТЯ — И-група.',
    order: 32,
    tableTitle: 'Сегашно време — И група',
    columns: ['(+)', '(–)'],
    rows: [
      { pronoun: 'аз',  cells: ['работя',    'не работя']    },
      { pronoun: 'ти',  cells: ['работиш',   'не работиш']   },
      { pronoun: 'той', cells: ['работи',    'не работи']    },
      { pronoun: 'тя',  cells: ['работи',    'не работи']    },
      { pronoun: 'то',  cells: ['работи',    'не работи']    },
      { pronoun: 'ние', cells: ['работим',   'не работим']   },
      { pronoun: 'вие', cells: ['работите',  'не работите']  },
      { pronoun: 'те',  cells: ['работят',   'не работят']   },
    ],
    notes: [
      '⚠️ Внимание! Аз уча — особена форма:',
      'Аз уча, Ти учиш, Той/тя/то учи, Ние учим, Вие учите, Те учат',
    ],
  } as GrammarTableExercise,

  // ORDER 33: Упр. 26 – Сложете глагола РАБОТЯ в правилната форма (Page 61)
  {
    id: 'l06-ex-26',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 26',
    instruction: 'Сложете глагола РАБОТЯ в правилната форма.',
    order: 33,
    points: 6,
    layout: 'single',
    sentences: [
      {
        text: 'Баща ми работи в офис.',
        blanks: [],
        correctAnswers: [],
        isExample: true,
      },
      {
        text: 'Сестра ми _______ в банка.',
        blanks: [0],
        correctAnswers: ['работи'],
        options: ['работи', 'работя', 'работиш', 'работят', 'работим'],
      },
      {
        text: 'Ти _______ ли?',
        blanks: [0],
        correctAnswers: ['работиш'],
        options: ['работиш', 'работи', 'работя', 'работите', 'работят'],
      },
      {
        text: 'Родителите ми не _______ в хотел.',
        blanks: [0],
        correctAnswers: ['работят'],
        options: ['работят', 'работи', 'работиш', 'работя', 'работим'],
      },
      {
        text: 'Аз _______ много.',
        blanks: [0],
        correctAnswers: ['работя'],
        options: ['работя', 'работи', 'работиш', 'работят', 'работим'],
      },
      {
        text: 'Ние не _______ в училище.',
        blanks: [0],
        correctAnswers: ['работим'],
        options: ['работим', 'работите', 'работя', 'работят', 'работи'],
      },
      {
        text: 'Вие _______ в центъра на града.',
        blanks: [0],
        correctAnswers: ['работите'],
        options: ['работите', 'работим', 'работят', 'работя', 'работи'],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ORDER 34: Упр. 27 – Сложете глагола УЧА в правилната форма (Page 61)
  {
    id: 'l06-ex-27',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 27',
    instruction: 'Сложете глагола УЧА в правилната форма.',
    order: 34,
    points: 6,
    layout: 'single',
    sentences: [
      {
        text: 'Аз уча в София.',
        blanks: [],
        correctAnswers: [],
        isExample: true,
      },
      {
        text: 'Красимир _______ в Пловдив.',
        blanks: [0],
        correctAnswers: ['учи'],
        options: ['учи', 'уча', 'учиш', 'учат', 'учим'],
      },
      {
        text: 'Набил и Кима _______ в Йордания.',
        blanks: [0],
        correctAnswers: ['учат'],
        options: ['учат', 'учи', 'учиш', 'уча', 'учим'],
      },
      {
        text: 'Ние _______ български език.',
        blanks: [0],
        correctAnswers: ['учим'],
        options: ['учим', 'учите', 'учат', 'уча', 'учи'],
      },
      {
        text: 'Аз и ти _______ арабски език.',
        blanks: [0],
        correctAnswers: ['учим'],
        options: ['учим', 'учите', 'учат', 'учи', 'уча'],
      },
      {
        text: 'Ти _______ ли английски език?',
        blanks: [0],
        correctAnswers: ['учиш'],
        options: ['учиш', 'учи', 'уча', 'учат', 'учим'],
      },
      {
        text: 'Вие не _______ в университет.',
        blanks: [0],
        correctAnswers: ['учите'],
        options: ['учите', 'учим', 'учат', 'учи', 'уча'],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ORDER 35: ДИАЛОГ 3 (а) (Page 61)
  {
    id: 'l06-dialozi-03',
    type: 'dialogues',
    title: 'ДИАЛОГ 3',
    instruction: 'Изслушайте диалога и се опитайте да го прочетете.',
    order: 35,
    sections: [
      {
        id: 'а.',
        lines: [
          { text: '– Аз работя в ресторант. А ти работиш ли?' },
          { text: '– Не, не работя. Сега уча в университет.' },
        ],
      },
    ],
  } as DialoguesExercise,

  // SKIP Упр. 28 — Прочетете диалога по двойки (по клиент)
  // SKIP Упр. 29 — Работете по двойки по модела (по клиент)

  // ORDER 36: ГРАМАТИКА 9 – Кой е това? (Page 61)
  {
    id: 'l06-gramatika-09',
    type: 'grammar_examples',
    title: 'ГРАМАТИКА 9',
    subtitle: 'Граматика – Показателни местоимения (10)',
    instruction: 'Запознайте се с показателните местоимения.',
    order: 36,
    examples: [
      {
        imageUrl: '',
        text: 'Въпрос',
        lines: [
          '– Кой е **това**?',
        ],
      },
      {
        imageUrl: '',
        text: 'Отговори',
        lines: [
          '– Това е баща ми.',
          '– Това е майка ми.',
          '– Това е детето ми.',
          '– Това са братята ми.',
        ],
      },
    ],
  } as GrammarExamplesExercise,

  // SKIP Упр. 30 — Работете по двойки, питайте и отговаряйте за другите (по клиент)

  // ──────────────────────────────────────────────────────────
  // СТРАНИЦА 62 — ДОПЪЛНИТЕЛНИ УПРАЖНЕНИЯ
  // ──────────────────────────────────────────────────────────

  // ORDER 37: Упр. 31+33 – Прочетете текстовете (Мохамед + Бана) (Page 62) — обединени
  {
    id: 'l06-ex-31',
    type: 'reading_text',
    title: 'ДОПЪЛНИТЕЛНИ УПРАЖНЕНИЯ',
    instruction: 'Прочетете текстовете.',
    order: 37,
    images: [
      { imageUrl: '/assets/lesson-06/09-dopalnitelni-upr-31-34/01-semeystvo-tekst-mohamed.jpg', label: 'Мохамед' },
      { imageUrl: '/assets/lesson-06/09-dopalnitelni-upr-31-34/02-bana-i-detsa.jpg', label: 'Бана' },
    ],
    paragraphs: [
      'Това е брат ми. Казва се Ибрахим. Той е на 42 години. Бизнесмен е. Има фурна за арабски хляб в София. Женен е. Има шест деца. Жена му не работи.',
      'Това е сестра ми. Казва се Сара. Тя е на 26 години. Студентка е по икономика в един голям университет в Ирак. Не е омъжена, но има годеник.',
      'Това е майка ми. Тя се казва Джуди. На 63 години е. Живее в София със семейството на брат ми. Тя има много внуци.',
      'Това е баща ми. Казва се Юсеф. Той е на 70 години. Сега е в Ирак, живее със сестра ми в Багдад.',
      'Това съм аз. Името ми е Мохамед. В България съм от една година. Сега уча български език.',
      'Казвам се Бана. От Сирия съм. На 28 години съм. Омъжена съм. Имам 2 деца. Не работя, гледам децата вкъщи. Ходя на курс по български език.',
    ],
  } as ReadingTextExercise,

  // SKIP Упр. 32 — Опишете семейството си по модела на текста (по клиент)

  // ORDER 38: Упр. 34 – Слушайте текста и попълнете (Мустафа) (Page 62)
  {
    id: 'l06-ex-34',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 34',
    instruction: 'Слушайте текста и попълнете празните места. Разкажете за друг човек по модела.',
    order: 38,
    points: 7,
    layout: 'single',
    imageUrl: '/assets/lesson-06/09-dopalnitelni-upr-31-34/03-worn-mazh-portret.jpg',
    listeningText: 'Казва се Мустафа. От Сирия е. На 25 години е. Не е женен. Няма деца. Работи на пазара. Учи английски език.',
    sentences: [
      {
        text: 'Казва се _______.',
        blanks: [0],
        correctAnswers: ['Мустафа'],
        options: ['Мустафа', 'Ибрахим', 'Мохамед', 'Расул'],
      },
      {
        text: 'От _______ е.',
        blanks: [0],
        correctAnswers: ['Сирия'],
        options: ['Сирия', 'Ирак', 'Украйна', 'България'],
      },
      {
        text: 'На _______ години е.',
        blanks: [0],
        correctAnswers: ['двайсет и пет'],
        options: ['двайсет и пет', 'четирийсет и две', 'двайсет и осем', 'тридесет', 'седемдесет'],
      },
      {
        text: 'Не е _______.',
        blanks: [0],
        correctAnswers: ['женен'],
        options: ['женен', 'омъжена', 'студент', 'бизнесмен'],
      },
      {
        text: '_______ деца.',
        blanks: [0],
        correctAnswers: ['Няма'],
        options: ['Няма', 'Имам', 'Има', 'Имаш'],
      },
      {
        text: 'Работи на _______.',
        blanks: [0],
        correctAnswers: ['пазара'],
        options: ['пазара', 'банката', 'ресторанта', 'университета'],
      },
      {
        text: 'Учи _______ език.',
        blanks: [0],
        correctAnswers: ['английски'],
        options: ['английски', 'арабски', 'български', 'руски'],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ──────────────────────────────────────────────────────────
  // СТРАНИЦА 63 — ТЕКСТОВЕ
  // ──────────────────────────────────────────────────────────

  // ORDER 39: Упр. 35 – „България е хубава страна" (Page 63)
  {
    id: 'l06-ex-35',
    type: 'reading_text',
    title: 'ТЕКСТОВЕ',
    instruction: 'Прочетете текста.',
    order: 39,
    textTitle: 'България е хубава страна',
    images: [{ imageUrl: '/assets/lesson-06/10-tekstove-upr-35/01-semeystvo-park-pet-chlena.jpg', label: '' }],
    paragraphs: [
      'Аз съм Виталий, а жена ми е Ирина. Ние сме украинци. Имаме три деца. Сега сме в България, в Украйна има война. Родителите ми не са тук. Те са в Украйна. Сестра ми и семейството й са в Полша. Много ми липсват.',
      'Живеем в София на квартира. Близо до града е планината Витоша, тя е висока и красива.',
    ],
  } as ReadingTextExercise,

  // ORDER 40: Упр. 36 – Вярно или не? (Page 63)
  {
    id: 'l06-ex-36',
    type: 'true_false',
    title: 'УПРАЖНЕНИЕ 36',
    instruction: 'Вярно или не?',
    order: 40,
    points: 5,
    model: { text: 'Виталий и Ирина са от Украйна.', isTrue: true },
    sentences: [
      { id: 's1', text: 'Те имат три деца.',                       isTrue: true  },
      { id: 's2', text: 'Те живеят на квартира.',                  isTrue: true  },
      { id: 's3', text: 'Родителите на Виталий са в София.',       isTrue: false },
      { id: 's4', text: 'Сестрата на Виталий е в Полша.',          isTrue: true  },
      { id: 's5', text: 'Витоша е висока и красива.',              isTrue: true  },
    ],
  } as TrueFalseExercise,

  // ORDER 41: Упр. 37 – „Аз работя в „Каритас"" (Page 63)
  {
    id: 'l06-ex-37',
    type: 'reading_text',
    title: 'УПРАЖНЕНИЕ 37',
    instruction: 'Прочетете текста.',
    order: 41,
    textTitle: 'Аз работя в „Каритас"',
    paragraphs: [
      'Казвам се Борис. Аз съм от София, женен съм и имам две малки деца – едно момче и едно момиче. На 30 години съм. Жена ми е учителка по български език в голямо училище.',
      'Работя в „Каритас". Обичам работата с бежанци. Вече имам много приятели от различни страни: Сирия, Иран, Ирак, Палестина, Афганистан, Украйна.',
    ],
  } as ReadingTextExercise,

  // ORDER 42: Упр. 38 – Отговорете на въпросите (Page 63)
  {
    id: 'l06-ex-38',
    type: 'dropdown_match',
    title: 'УПРАЖНЕНИЕ 38',
    instruction: 'Отговорете на въпросите.',
    order: 42,
    points: 6,
    questions: [
      {
        id: 'q1',
        left: 'Колко деца има Борис?',
        options: ['Две малки деца.', 'Едно дете.', 'Три деца.', 'Няма деца.'],
        correctAnswer: 'Две малки деца.',
      },
      {
        id: 'q2',
        left: 'На колко години е Борис?',
        options: ['На 30 години.', 'На 25 години.', 'На 40 години.', 'На 37 години.'],
        correctAnswer: 'На 30 години.',
      },
      {
        id: 'q3',
        left: 'Женен ли е Борис?',
        options: ['Да, женен е.', 'Не, не е женен.', 'Не знам.', 'Не е споменато.'],
        correctAnswer: 'Да, женен е.',
      },
      {
        id: 'q4',
        left: 'Какво работи жена му?',
        options: ['Учителка по български.', 'Работи в „Каритас".', 'Студентка.', 'Не работи.'],
        correctAnswer: 'Учителка по български.',
      },
      {
        id: 'q5',
        left: 'Където работи Борис?',
        options: ['В „Каритас".', 'В ресторант.', 'В банка.', 'В училище.'],
        correctAnswer: 'В „Каритас".',
      },
      {
        id: 'q6',
        left: 'Откъде са приятелите му?',
        options: ['От различни страни.', 'От България.', 'От Сирия.', 'От Украйна.'],
        correctAnswer: 'От различни страни.',
      },
    ],
  } as DropdownMatchExercise,

  // ──────────────────────────────────────────────────────────
  // СТРАНИЦА 64 — ОТ ПЪРВО ЛИЦЕ
  // ──────────────────────────────────────────────────────────

  // ORDER 43: Упр. 39 – „Кусай и Мохамед" (Page 64)
  {
    id: 'l06-ex-39',
    type: 'reading_text',
    title: 'ОТ ПЪРВО ЛИЦЕ',
    instruction: 'Прочетете текста.',
    order: 43,
    images: [{ imageUrl: '/assets/lesson-06/11-ot-parvo-litse/01-uchenitsi-v-klas.jpg', label: '' }],
    paragraphs: [
      'Ние сме две момчета от Сирия. Казваме се Кусай и Мохамед. Учим в Ливанското училище в София, а през лятото ходим на курс по български език.',
      'Ние сме бежанци и живеем в България от 2022 година. Харесваме България, защото има добри хора и хубави празници. Големите празници са Баба Марта, Коледа и Великден. Тук празнуваме също сирийските празници Рамазан Байрам и Курбан Байрам.',
    ],
  } as ReadingTextExercise,

  // SKIP Упр. 40 — Разкажете за Кусай и Мохамед (по клиент)
  // SKIP Упр. 41 — Отговорете на въпросите (по клиент)

  // ORDER 44: NEW – Въпроси за Кусай и Мохамед
  {
    id: 'l06-ex-39b',
    type: 'multiple_choice',
    title: 'УПРАЖНЕНИЕ',
    instruction: 'Отговорете на въпросите.',
    order: 44,
    points: 4,
    questions: [
      {
        question: 'Откъде са Кусай и Мохамед?',
        options: ['От Сирия', 'От Ирак', 'От Афганистан', 'От Палестина'],
        correctIndex: 0,
      },
      {
        question: 'Къде учат в София?',
        options: ['В иракското училище', 'В ливанското училище', 'В българско училище', 'Не учат в училище'],
        correctIndex: 1,
      },
      {
        question: 'На какъв курс ходят през лятото?',
        options: ['По английски език', 'По арабски език', 'По български език', 'По немски език'],
        correctIndex: 2,
      },
      {
        question: 'Кой празник не е сред големите празници в България?',
        options: ['Баба Марта', 'Коледа', 'Великден', 'Хелоуин'],
        correctIndex: 3,
      },
    ],
  } as MultipleChoiceExercise,

  // ORDER 45: Упр. 42 – „Илаф Хабаба" (Page 64)
  {
    id: 'l06-ex-42',
    type: 'reading_text',
    title: 'УПРАЖНЕНИЕ 42',
    instruction: 'Прочетете текста.',
    order: 45,
    paragraphs: [
      'Аз съм едно сирийско момиче. Казвам се Илаф Хабаба. В България съм от две години и вече знам каква е разликата между сирийското и българското семейство.',
      'Сирийското семейство има много деца – от три до осем, а българското семейство обикновено има едно или две. Българските родители дават голяма свобода на децата си.',
      'Всички деца обичат родителите си.',
    ],
  } as ReadingTextExercise,

  // SKIP Упр. 43 — Разкажете за Илаф (по клиент)
  // SKIP Упр. 44 — Съгласни ли сте с Илаф? (по клиент)

  // ORDER 46: NEW – Въпроси за Илаф Хабаба
  {
    id: 'l06-ex-42b',
    type: 'multiple_choice',
    title: 'УПРАЖНЕНИЕ',
    instruction: 'Отговорете на въпросите.',
    order: 46,
    points: 4,
    questions: [
      {
        question: 'Откъде е Илаф Хабаба?',
        options: ['От Германия', 'От Франция', 'От Ирак', 'От Сирия'],
        correctIndex: 3,
      },
      {
        question: 'От колко време е в България?',
        options: ['От две години', 'От десет години', 'От пет години', 'От осем години'],
        correctIndex: 0,
      },
      {
        question: 'Колко деца има обикновено в българското семейство?',
        options: ['Едно или две', 'От три до осем', 'От пет до десет', 'Много'],
        correctIndex: 0,
      },
      {
        question: 'Какво дават българските родители на децата си?',
        options: ['Свобода', 'Зеленчуци', 'Риба', 'Приятели'],
        correctIndex: 0,
      },
    ],
  } as MultipleChoiceExercise,

];

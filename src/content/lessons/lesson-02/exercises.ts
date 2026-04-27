import type {
  Exercise,
  ImageLabelingExercise,
  IllustratedCardsExercise,
  DragToColumnsExercise,
  WordSearchExercise,
  WordOrderExercise,
  GrammarVisualExercise,
  GrammarExamplesExercise,
  GrammarTableExercise,
  MatchPairsExercise,
  WorkbookFillBlankExercise,
  DialoguesExercise,
  PersonalChoiceExercise,
  ConnectDotsExercise,
} from '@/content/types';

// ⚠️ IMPORTANT: Follow the exact order from Main-Book-Lesson-2.pdf (see LESSON_STRUCTURE_02.md)
// The 'order' property must match the sequence in the textbook

export const exercises: Exercise[] = [

  // ─────────────────────────────────────────────────────────────────────────
  // СТРАНИЦА 17
  // ─────────────────────────────────────────────────────────────────────────

  // ORDER 1: Упражнение 1 – Напишете думите под картинките
  {
    id: 'l02-ex-01',
    type: 'image_labeling',
    instruction: 'Изберете думите под картинките.',
    order: 1,
    points: 4,
    images: [
      { id: 'pizza',     imageUrl: '/assets/lesson-02/exercise-01-write-words/02-pizza.jpg',     correctLabel: 'пица' },
      { id: 'sandwich',  imageUrl: '/assets/lesson-02/exercise-01-write-words/01-sandwich.jpg',  correctLabel: 'сандвич' },
      { id: 'duner',     imageUrl: '/assets/lesson-02/exercise-01-write-words/03-duner.jpg',     correctLabel: 'дюнер' },
      { id: 'croissant', imageUrl: '/assets/lesson-02/exercise-01-write-words/04-croissant.jpg', correctLabel: 'кроасан' },
    ],
    options: ['дюнер', 'кроасан', 'пица', 'сандвич'],
  } as ImageLabelingExercise,

  // ORDER 2: НОВИ ДУМИ – Храни и напитки (NOT AN EXERCISE!)
  {
    id: 'l02-novi-dumi-01',
    type: 'illustrated_cards',
    title: 'НОВИ ДУМИ',
    instruction: '',
    order: 2,
    cards: [
      { id: 'voda',          imageUrl: '/assets/lesson-02/novi-dumi-1-food/01-voda.jpg',          label: 'вода' },
      { id: 'chay',          imageUrl: '/assets/lesson-02/novi-dumi-1-food/02-chay.jpg',          label: 'чай' },
      { id: 'kafe',          imageUrl: '/assets/lesson-02/novi-dumi-1-food/03-kafe.jpg',          label: 'кафе' },
      { id: 'kapuchino',     imageUrl: '/assets/lesson-02/novi-dumi-1-food/04-kapuchino.jpg',     label: 'капучино' },
      { id: 'sok',           imageUrl: '/assets/lesson-02/novi-dumi-1-food/05-sok.jpg',           label: 'сок' },
      { id: 'pryasno-mlyako', imageUrl: '/assets/lesson-02/novi-dumi-1-food/06-pryasno-mlyako.jpg', label: 'прясно мляко' },
      { id: 'kiselo-mlyako', imageUrl: '/assets/lesson-02/novi-dumi-1-food/07-kiselo-mlyako.jpg', label: 'кисело мляко' },
      { id: 'sirene',        imageUrl: '/assets/lesson-02/novi-dumi-1-food/08-sirene.jpg',        label: 'сирене' },
      { id: 'kashkaval',     imageUrl: '/assets/lesson-02/novi-dumi-1-food/09-kashkaval.jpg',     label: 'кашкавал' },
      { id: 'maslo',         imageUrl: '/assets/lesson-02/novi-dumi-1-food/10-maslo.jpg',         label: 'масло' },
      { id: 'hlyab',         imageUrl: '/assets/lesson-02/novi-dumi-1-food/11-hlyab.jpg',         label: 'хляб' },
      { id: 'filiya',        imageUrl: '/assets/lesson-02/novi-dumi-1-food/12-filiya.jpg',        label: 'филия' },
      { id: 'banitsa',       imageUrl: '/assets/lesson-02/novi-dumi-1-food/13-banitsa.jpg',       label: 'баница' },
      { id: 'yaytse',        imageUrl: '/assets/lesson-02/novi-dumi-1-food/14-yaytse.jpg',        label: 'яйце' },
      { id: 'salam',         imageUrl: '/assets/lesson-02/novi-dumi-1-food/15-salam.jpg',         label: 'салам' },
      { id: 'zahar',         imageUrl: '/assets/lesson-02/novi-dumi-1-food/16-zahar.jpg',         label: 'захар' },
      { id: 'med',           imageUrl: '/assets/lesson-02/novi-dumi-1-food/17-med.jpg',           label: 'мед' },
    ],
  } as IllustratedCardsExercise,

  // ─────────────────────────────────────────────────────────────────────────
  // СТРАНИЦА 18
  // ─────────────────────────────────────────────────────────────────────────

  // ORDER 3: Упражнение 2 – Подредете думите в двете колонки
  // TESTING: Click-based version with 8 items
  {
    id: 'l02-ex-02',
    type: 'drag_to_columns',
    instruction: 'Поставете думите в правилната колона.',
    order: 3,
    points: 8,
    items: [
      'хляб', 'чай', 'сирене', 'кафе',
      'масло', 'сок', 'яйце', 'мляко',
    ],
    columns: [
      {
        id: 'drinks',
        title: 'НАПИТКИ',
        icon: '🥤',
        correctItems: ['чай', 'кафе', 'сок', 'мляко'],
      },
      {
        id: 'food',
        title: 'ХРАНИ',
        icon: '🍽️',
        correctItems: ['хляб', 'сирене', 'масло', 'яйце'],
      },
    ],
  } as DragToColumnsExercise,

  // ORDER 4: Упражнение 3 – Намерете думите в матрицата
  {
    id: 'l02-ex-03',
    type: 'word_search',
    instruction: 'Намерете скритите думи в таблицата.',
    order: 4,
    points: 7,
    letterString: 'СИРЕНЕММАСЛОПЛХПФИЛИЯЛЧАЙЯЦКЯМЕДЙАОБАНИЦАСИКАФЕКР',
    correctWords: ['СИРЕНЕ', 'МАСЛО', 'ФИЛИЯ', 'ЧАЙ', 'МЕД', 'БАНИЦА', 'КАФЕ'],
    hiddenWords: ['СИРЕНЕ', 'МАСЛО', 'ФИЛИЯ', 'ЧАЙ', 'МЕД', 'БАНИЦА', 'КАФЕ'],
  } as WordSearchExercise,

  // ORDER 5: ГРАМАТИКА 1 – Какво е това? (NOT AN EXERCISE!)
  {
    id: 'l02-gramatika-01',
    instructionKey: 'grammar.l02.g1.instruction',
    type: 'grammar_visual',
    title: 'ГРАМАТИКА 1',
    instruction: 'Запознайте се с въпроса и отговора. Натиснете за произношение.',
    order: 5,
    pronouns: [
      {
        pronoun: 'Какво е това?',
        imageUrl: '/assets/lesson-02/gramatika-1-kakvo-e-tova/kakvo-e-tova-banitsa.jpg',
        description: 'Това е баница.',
      },
    ],
  } as GrammarVisualExercise,

  // ORDER 6: Упражнение 4 – Какво е това? (8 храни)
  {
    id: 'l02-ex-04',
    type: 'image_labeling',
    instruction: 'Какво е това? Изберете правилната дума.',
    subtitle: 'Под всяка картинка: „Това е ___."',
    order: 6,
    points: 8,
    images: [
      { id: 'pizza',     imageUrl: '/assets/lesson-02/exercise-04-kakvo-e-tova/01-pizza.jpg',     correctLabel: 'пица' },
      { id: 'croissant', imageUrl: '/assets/lesson-02/exercise-04-kakvo-e-tova/02-croissant.jpg', correctLabel: 'кроасан' },
      { id: 'banitsa',   imageUrl: '/assets/lesson-02/exercise-04-kakvo-e-tova/03-banitsa.jpg',   correctLabel: 'баница' },
      { id: 'hlyab',     imageUrl: '/assets/lesson-02/exercise-04-kakvo-e-tova/04-hlyab.jpg',     correctLabel: 'хляб' },
      { id: 'salam',     imageUrl: '/assets/lesson-02/exercise-04-kakvo-e-tova/05-salam.jpg',     correctLabel: 'салам' },
      { id: 'yaytse',    imageUrl: '/assets/lesson-02/exercise-04-kakvo-e-tova/06-yaytse.jpg',    correctLabel: 'яйце' },
      { id: 'zahar',     imageUrl: '/assets/lesson-02/exercise-04-kakvo-e-tova/07-zahar.jpg',     correctLabel: 'захар' },
      { id: 'med',       imageUrl: '/assets/lesson-02/exercise-04-kakvo-e-tova/08-med.jpg',       correctLabel: 'мед' },
    ],
    options: ['баница', 'захар', 'кроасан', 'мед', 'пица', 'салам', 'хляб', 'яйце'],
  } as ImageLabelingExercise,

  // ORDER 7: ГРАМАТИКА 2 – Обичам / не обичам (NOT AN EXERCISE!)
  {
    id: 'l02-gramatika-02',
    instructionKey: 'grammar.l02.g2.instruction',
    type: 'grammar_examples',
    title: 'ГРАМАТИКА 2',
    subtitle: 'Обичам / не обичам',
    instruction: 'Запознайте се с глагола ОБИЧАМ.',
    order: 7,
    showLikeDislike: true,
    examples: [
      {
        imageUrl: '/assets/lesson-02/gramatika-2-obicham/az-kafe-chay.jpg',
        text: 'Аз обичам кафе.',
        subtext: 'Аз не обичам чай.',
      },
      {
        imageUrl: '/assets/lesson-02/gramatika-2-obicham/ti-voda-mlyako.jpg',
        text: 'Ти обичаш вода.',
        subtext: 'Ти не обичаш прясно мляко.',
      },
      {
        imageUrl: '/assets/lesson-02/gramatika-2-obicham/toy-sok-kapuchino.jpg',
        text: 'Той обича сок.',
        subtext: 'Той не обича капучино.',
      },
      {
        imageUrl: '/assets/lesson-02/gramatika-2-obicham/tya-maslo-sirene.jpg',
        text: 'Тя обича масло.',
        subtext: 'Тя не обича сирене.',
      },
      {
        imageUrl: '/assets/lesson-02/gramatika-2-obicham/to-kiselo-mlyako-salam.jpg',
        text: 'То обича кисело мляко.',
        subtext: 'То не обича салам.',
      },
      {
        imageUrl: '/assets/lesson-02/gramatika-2-obicham/nie-banitsa-kashkaval.jpg',
        text: 'Ние обичаме баница.',
        subtext: 'Ние не обичаме кашкавал.',
      },
      {
        imageUrl: '/assets/lesson-02/gramatika-2-obicham/vye-hlyab-pitza.jpg',
        text: 'Вие обичате хляб.',
        subtext: 'Вие не обичате пица.',
      },
      {
        imageUrl: '/assets/lesson-02/gramatika-2-obicham/te-med-zahar.jpg',
        text: 'Те обичат мед.',
        subtext: 'Те не обичат захар.',
      },
    ],
  } as GrammarExamplesExercise,

  // ─────────────────────────────────────────────────────────────────────────
  // ФАЗА 2 (стр. 19-21)
  // ─────────────────────────────────────────────────────────────────────────
  // ORDER 8:  l02-gramatika-table-01  grammar_table    Сегашно време А група
  // ORDER 9:  l02-ex-05               fill_with_images  Следвайте модела
  // ORDER 10: l02-ex-06               word_order        Подредете думите  ✓ implemented below
  // ORDER 11: l02-ex-07               workbook_fill_blank  Ева и Ангел     ✓ implemented below
  // ORDER 12: SKIPPED — l02-ex-08 was pair work ("Ангел обича ли баница?"), not feasible solo

  // ORDER 10: Упражнение 6 – Подредете думите (Page 19)
  {
    id: 'l02-ex-06',
    type: 'word_order',
    instruction: 'Подредете думите в изречение по модела.',
    order: 10,
    points: 4,
    grammarHighlight: { text: 'Модел: Ние обичаме сирене.' },
    questions: [
      {
        words: ['Ти', 'не', 'хляб', 'обичаш'],
        correctSentence: 'Ти не обичаш хляб.',
        alternateCorrectSentences: ['Ти не обичаш хляб'],
      },
      {
        words: ['Тя', 'кафе', 'обича'],
        correctSentence: 'Тя обича кафе.',
        alternateCorrectSentences: ['Тя обича кафе'],
      },
      {
        words: ['Те', 'не', 'масло', 'обичат'],
        correctSentence: 'Те не обичат масло.',
        alternateCorrectSentences: ['Те не обичат масло'],
      },
      {
        words: ['Вие', 'мед', 'обичате'],
        correctSentence: 'Вие обичате мед.',
        alternateCorrectSentences: ['Вие обичате мед'],
      },
    ],
  } as WordOrderExercise,

  // ORDER 11: Упражнение 7 – Какво обичат Ева и Ангел? (Page 19)
  {
    id: 'l02-ex-07',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 7',
    instruction: 'Прочетете и попълнете изреченията за Ева и Ангел.',
    order: 11,
    points: 6,
    layout: 'single',
    grammarHighlight: {
      text: '😊 = обича   😞 = не обича\n🧃 сок  ☕ кафе  🍵 чай  🥪 сандвич  🍞 хляб  🍫 шоколад',
    },
    sentences: [
      {
        text: 'Модел: Ева обича кафе. Тя не обича сок.',
        blanks: [],
        correctAnswers: [],
        isExample: true,
      },
      {
        text: 'Ангел обича _______.',
        blanks: [0],
        correctAnswers: ['сандвич'],
        acceptableAnswers: [['сок', 'кафе', 'чай', 'сандвич', 'хляб', 'шоколад']],
        options: ['сок', 'кафе', 'чай', 'сандвич', 'хляб', 'шоколад'],
      },
      {
        text: 'Той не обича _______.',
        blanks: [0],
        correctAnswers: ['шоколад'],
        acceptableAnswers: [['сок', 'кафе', 'чай', 'сандвич', 'хляб', 'шоколад']],
        options: ['сок', 'кафе', 'чай', 'сандвич', 'хляб', 'шоколад'],
      },
      {
        text: 'Ева обича _______.',
        blanks: [0],
        correctAnswers: ['чай'],
        acceptableAnswers: [['сок', 'кафе', 'чай', 'сандвич', 'хляб', 'шоколад']],
        options: ['сок', 'кафе', 'чай', 'сандвич', 'хляб', 'шоколад'],
      },
      {
        text: 'Тя не обича _______.',
        blanks: [0],
        correctAnswers: ['кафе'],
        acceptableAnswers: [['сок', 'кафе', 'чай', 'сандвич', 'хляб', 'шоколад']],
        options: ['сок', 'кафе', 'чай', 'сандвич', 'хляб', 'шоколад'],
      },
      {
        text: 'Ангел и Ева обичат _______.',
        blanks: [0],
        correctAnswers: ['хляб'],
        acceptableAnswers: [['сок', 'кафе', 'чай', 'сандвич', 'хляб', 'шоколад']],
        options: ['сок', 'кафе', 'чай', 'сандвич', 'хляб', 'шоколад'],
      },
      {
        text: 'Те не обичат _______.',
        blanks: [0],
        correctAnswers: ['сок'],
        acceptableAnswers: [['сок', 'кафе', 'чай', 'сандвич', 'хляб', 'шоколад']],
        options: ['сок', 'кафе', 'чай', 'сандвич', 'хляб', 'шоколад'],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ORDER 13: ГРАМАТИКА 3 – Глагол ИСКАМ – Сегашно време
  {
    id: 'l02-gramatika-03',
    instructionKey: 'grammar.l02.g3.instruction',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 3',
    instruction: 'Запознайте се с глагола ИСКАМ – сегашно време.',
    subtitle: 'Граматика – Сегашно време',
    order: 13,
    tableTitle: 'Сегашно време – искам',
    columns: [],
    rows: [
      { pronoun: 'Аз',           cells: ['искам'] },
      { pronoun: 'Ти',           cells: ['искаш'] },
      { pronoun: 'Той, тя, то',  cells: ['иска'] },
      { pronoun: 'Ние',          cells: ['искаме'] },
      { pronoun: 'Вие',          cells: ['искате'] },
      { pronoun: 'Те',           cells: ['искат'] },
    ],
    notes: [
      'Аз искам вода.',
      'Аз не искам сок.',
    ],
  } as GrammarTableExercise,

  // ORDER 14: Упражнение 9 – Свържете думите по модела
  {
    id: 'l02-ex-09',
    type: 'match_pairs',
    instruction: 'Свържете думите по модела.',
    order: 14,
    points: 8,
    pairs: [
      { id: 'az',  left: 'аз',  correctRight: 'искам' },
      { id: 'ti',  left: 'ти',  correctRight: 'искаш' },
      { id: 'toy', left: 'той', correctRight: 'иска' },
      { id: 'tya', left: 'тя',  correctRight: 'иска' },
      { id: 'to',  left: 'то',  correctRight: 'иска' },
      { id: 'nie', left: 'ние', correctRight: 'искаме' },
      { id: 'vie', left: 'вие', correctRight: 'искате' },
      { id: 'te',  left: 'те',  correctRight: 'искат' },
    ],
    shuffledRights: ['иска', 'искаш', 'искаме', 'искат', 'иска', 'искам', 'искате', 'иска'],
  } as MatchPairsExercise,

  // ORDER 15: SKIPPED — l02-ex-10 was pair work ("Искаш ли вода?"), not feasible solo

  // ORDER 16a: Упражнение 11 – Какво искат Али и Сара? (visual reference)
  {
    id: 'l02-ex-11-ref',
    type: 'grammar_examples',
    title: 'УПРАЖНЕНИЕ 11',
    subtitle: 'Какво искат и какво не искат Али и Сара?',
    instruction: 'Разгледайте какво искат и какво не искат Али и Сара. Кликнете за произношение.',
    order: 16,
    examples: [
      {
        imageUrl: '/assets/lesson-02/exercise-11/ali.jpg',
        voiceGender: 'male',
        lines: [
          '✓ Искам вода.',
          '✓ Искам баница.',
          '✓ Искам хляб.',
          '✓ Искам салам.',
          '✓ Искам кроасан.',
          '',
          '✗ Не искам прясно мляко.',
          '✗ Не искам кафе.',
          '✗ Не искам кисело мляко.',
        ],
      },
      {
        imageUrl: '/assets/lesson-02/exercise-11/sara.jpg',
        voiceGender: 'female',
        lines: [
          '✓ Искам прясно мляко.',
          '✓ Искам баница.',
          '✓ Искам хляб.',
          '✓ Искам кафе.',
          '',
          '✗ Не искам вода.',
          '✗ Не искам салам.',
          '✗ Не искам кисело мляко.',
          '✗ Не искам кроасан.',
        ],
      },
    ],
  } as GrammarExamplesExercise,

  // ORDER 16b: Упражнение 11 – Попълнете изреченията
  {
    id: 'l02-ex-11',
    type: 'workbook_fill_blank',
    instruction: 'Попълнете с правилната форма на глагола „искам".',
    order: 17,
    points: 6,
    layout: 'single',
    sentences: [
      { text: 'Али ___ вода, баница, хляб, салам и кроасан.', blanks: [1], correctAnswers: ['иска'], options: ['иска', 'не иска', 'искат', 'не искат'] },
      { text: 'Той ___ прясно мляко, кафе и кисело мляко.', blanks: [1], correctAnswers: ['не иска'], options: ['иска', 'не иска', 'искат', 'не искат'] },
      { text: 'Сара ___ прясно мляко, баница, хляб и кафе.', blanks: [1], correctAnswers: ['иска'], options: ['иска', 'не иска', 'искат', 'не искат'] },
      { text: 'Тя ___ вода, салам, кисело мляко и кроасан.', blanks: [1], correctAnswers: ['не иска'], options: ['иска', 'не иска', 'искат', 'не искат'] },
      { text: 'Али и Сара ___ баница и хляб.', blanks: [3], correctAnswers: ['искат'], options: ['иска', 'не иска', 'искат', 'не искат'] },
      { text: 'Те ___ кисело мляко.', blanks: [1], correctAnswers: ['не искат'], options: ['иска', 'не иска', 'искат', 'не искат'] },
    ],
  } as WorkbookFillBlankExercise,

  // ORDER 18: SKIPPED — l02-ex-12 was pair work, not feasible solo

  // ORDER 19: ГРАМАТИКА 4 – С / Без (предлози)
  {
    id: 'l02-gramatika-04',
    instructionKey: 'grammar.l02.g4.instruction',
    type: 'grammar_examples',
    title: 'ГРАМАТИКА 4',
    instruction: 'Запознайте се с предлозите „с" и „без".',
    order: 19,
    grammarHighlight: {
      text: 'Когато думата след „с" също започва със „с" или „з", предлогът става „със" за благозвучие.',
      examples: [
        'Искам кафе с мляко.',
        'Искам кафе със захар.',
        'Искам омлет със сол.',
      ],
    },
    examples: [
      {
        imageUrl: '/assets/lesson-02/gramatika-4/kafe-bez-zahar.jpg',
        text: 'кафе без захар',
        subtext: 'Обичам кафе без захар.',
      },
      {
        imageUrl: '/assets/lesson-02/gramatika-4/kafe-sas-zahar.jpg',
        text: 'кафе със захар',
        subtext: 'Обичам чай с мед.',
      },
    ],
  } as GrammarExamplesExercise,

  // ORDER 20: ДИАЛОЗИ а–д
  {
    id: 'l02-dialozi-01',
    type: 'dialogues',
    title: 'ДИАЛОЗИ',
    instruction: 'Натиснете всяка реплика, за да чуете произношението. После повторете на глас.',
    order: 20,
    sections: [
      {
        id: 'а.',
        lines: [
          { text: '– Обичате ли шоколад?', voiceGender: 'female' },
          { text: '– Да, обичам. А Вие?', voiceGender: 'male' },
          { text: '– Аз също.', voiceGender: 'female' },
        ],
      },
      {
        id: 'б.',
        lines: [
          { text: '– Обичаш ли баница?', voiceGender: 'female' },
          { text: '– Да, много. А ти?', voiceGender: 'male' },
          { text: '– Аз също.', voiceGender: 'female' },
        ],
      },
      {
        id: 'в.',
        lines: [
          { text: '– Обичате ли чай?', voiceGender: 'female' },
          { text: '– Да, обичам.', voiceGender: 'male' },
          { text: '– А мляко?', voiceGender: 'female' },
          { text: '– Не, не обичам.', voiceGender: 'male' },
        ],
      },
      {
        id: 'г.',
        lines: [
          { text: '– Искате ли кафе?', voiceGender: 'female' },
          { text: '– Да.', voiceGender: 'male' },
          { text: '– С мляко?', voiceGender: 'female' },
          { text: '– Не, без мляко.', voiceGender: 'male' },
        ],
      },
      {
        id: 'д.',
        lines: [
          { text: '– Искаш ли сок?', voiceGender: 'female' },
          { text: '– Да, искам.', voiceGender: 'male' },
          { text: '– А кроасан?', voiceGender: 'female' },
          { text: '– Не, не искам.', voiceGender: 'male' },
        ],
      },
    ],
  } as DialoguesExercise,

  // ORDER 21: Упражнение 14 – В кафенето (двуфазов личен избор + граматика с/без)
  {
    id: 'l02-ex-14',
    type: 'personal_choice',
    title: 'УПРАЖНЕНИЕ 14',
    instruction: 'Вие сте в кафене. Сервитьорът пита — отговорете и попълнете правилния предлог.',
    order: 21,
    points: 5,
    model: {
      question: 'Искате ли мед в чая?',
      positiveAnswer: 'Да, пия чай с мед.',
      negativeAnswer: 'Не, пия чай без мед.',
    },
    blankOptions: ['с', 'със', 'без'],
    items: [
      {
        id: 'sugar-coffee',
        question: 'Искате ли захар в кафето?',
        positiveTemplate: 'Да, пия кафе ___ захар.',
        negativeTemplate: 'Не, пия кафе ___ захар.',
        positiveBlank: 'със',
        negativeBlank: 'без',
      },
      {
        id: 'milk-coffee',
        question: 'Искате ли мляко в кафето?',
        positiveTemplate: 'Да, пия кафе ___ мляко.',
        negativeTemplate: 'Не, пия кафе ___ мляко.',
        positiveBlank: 'с',
        negativeBlank: 'без',
      },
      {
        id: 'chocolate-croissant',
        question: 'Искате ли шоколад в кроасана?',
        positiveTemplate: 'Да, обичам кроасан ___ шоколад.',
        negativeTemplate: 'Не, не обичам кроасан ___ шоколад.',
        positiveBlank: 'с',
        negativeBlank: 'без',
      },
      {
        id: 'cheese-sandwich',
        question: 'Искате ли кашкавал в сандвича?',
        positiveTemplate: 'Да, обичам сандвич ___ кашкавал.',
        negativeTemplate: 'Не, не обичам сандвич ___ кашкавал.',
        positiveBlank: 'с',
        negativeBlank: 'без',
      },
      {
        id: 'honey-tea',
        question: 'Искате ли мед в чая?',
        positiveTemplate: 'Да, обичам чай ___ мед.',
        negativeTemplate: 'Не, не обичам чай ___ мед.',
        positiveBlank: 'с',
        negativeBlank: 'без',
      },
    ],
  } as PersonalChoiceExercise,

  // ORDER 22: SKIPPED — l02-ex-15 was pair work

  // ORDER 23: ГРАМАТИКА 5 – Има / Няма
  {
    id: 'l02-gramatika-05',
    instructionKey: 'grammar.l02.g5.instruction',
    type: 'grammar_examples',
    title: 'ГРАМАТИКА 5',
    subtitle: 'Има / Няма',
    instruction: 'Запознайте се с „има" и „няма". Натиснете за произношение.',
    order: 23,
    examples: [
      {
        imageUrl: '/assets/lesson-02/gramatika-5/masa-detail-01.jpg',
        text: 'Има кроасан и кафе.',
      },
      {
        imageUrl: '/assets/lesson-02/gramatika-5/masa-prazna.jpg',
        text: 'Няма кроасан и кафе.',
      },
    ],
  } as GrammarExamplesExercise,

  // ORDER 24: Упражнение 16 – Какво има и какво няма на масата?
  {
    id: 'l02-ex-16',
    type: 'drag_to_columns',
    instruction: 'Разгледайте масата. Какво има и какво няма? Подредете думите в двете колонки.',
    order: 24,
    points: 10,
    imageUrl: '/assets/lesson-02/exercise-16/masa-s-zakuska.jpg',
    items: ['хляб', 'масло', 'мед', 'чай', 'яйце', 'пица', 'салам', 'баница', 'кисело мляко', 'захар'],
    columns: [
      {
        id: 'ima',
        title: 'ИМА',
        icon: '✓',
        correctItems: ['хляб', 'масло', 'мед', 'чай', 'салам'],
      },
      {
        id: 'nyama',
        title: 'НЯМА',
        icon: '✗',
        correctItems: ['пица', 'яйце', 'баница', 'кисело мляко', 'захар'],
      },
    ],
  } as DragToColumnsExercise,

  // ─────────────────────────────────────────────────────────────────────────
  // ФАЗА 3 (стр. 22-24)
  // ─────────────────────────────────────────────────────────────────────────

  // ORDER 25: SKIPPED — l02-ex-17 рисуване кошница (не е приложимо в апп)

  // ORDER 26: ГРАМАТИКА 6 – Род на съществителните (един/една/едно)
  {
    id: 'l02-gramatika-06',
    instructionKey: 'grammar.l02.g6.instruction',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 6',
    subtitle: 'Граматика – Род на съществителните (2)',
    instruction: 'Запознайте се с рода на съществителните.',
    order: 26,
    tableTitle: 'Род на съществителните',
    columns: ['', 'Примери'],
    rows: [
      { pronoun: 'мъжки род', cells: ['един', 'хляб, чай'] },
      { pronoun: 'женски род', cells: ['една', 'пица, филия'] },
      { pronoun: 'среден род', cells: ['едно', 'кафе, масло'] },
    ],
    notes: [
      'Искам един хляб.',
      'Искам една пица.',
      'Искам едно кафе.',
      'Внимание! захар – женски род.',
    ],
  } as GrammarTableExercise,

  // ORDER 27: Упражнение 18 – Свържете думите по модела
  {
    id: 'l02-ex-18',
    type: 'match_pairs',
    instruction: 'Свържете думите по модела: един (мъжки род), една (женски род) или едно (среден род)?',
    order: 27,
    points: 6,
    pairs: [
      { id: 'hlyab',  left: 'един',  correctRight: 'хляб' },
      { id: 'chay',   left: 'един',  correctRight: 'чай' },
      { id: 'pica',   left: 'една',  correctRight: 'пица' },
      { id: 'filiya', left: 'една',  correctRight: 'филия' },
      { id: 'kafe',   left: 'едно',  correctRight: 'кафе' },
      { id: 'maslo',  left: 'едно',  correctRight: 'масло' },
    ],
    shuffledRights: ['пица', 'кафе', 'хляб', 'масло', 'филия', 'чай'],
  } as MatchPairsExercise,

  // ORDER 28: Упражнение 19 – Поставете думите в правилната колона
  {
    id: 'l02-ex-19',
    type: 'drag_to_columns',
    instruction: 'Изберете правилната форма: един (мъжки род), една (женски род) или едно (среден род)?',
    order: 28,
    points: 18,
    items: [
      'баница', 'вода', 'дюнер', 'капучино', 'кафе',
      'кашкавал', 'кроасан', 'масло', 'мед', 'мляко',
      'пица', 'салам', 'сирене', 'сок', 'филия', 'хляб',
      'чай', 'шоколад',
    ],
    columns: [
      {
        id: 'edin',
        title: 'ЕДИН (мъжки род)',
        icon: '♂',
        correctItems: ['дюнер', 'кашкавал', 'кроасан', 'мед', 'салам', 'сок', 'хляб', 'чай', 'шоколад'],
      },
      {
        id: 'edna',
        title: 'ЕДНА (женски род)',
        icon: '♀',
        correctItems: ['баница', 'вода', 'пица', 'филия'],
      },
      {
        id: 'edno',
        title: 'ЕДНО (среден род)',
        icon: '⚬',
        correctItems: ['капучино', 'кафе', 'масло', 'мляко', 'сирене'],
      },
    ],
  } as DragToColumnsExercise,

  // ORDER 29: ГРАМАТИКА 7 – Бройни числителни 0–10
  {
    id: 'l02-gramatika-07',
    instructionKey: 'grammar.l02.g7.instruction',
    type: 'illustrated_cards',
    title: 'ГРАМАТИКА 7',
    instruction: '',
    order: 29,
    cards: [
      { id: 'n1',  imageUrl: '/assets/lesson-02/gramatika-7/chislo-01.jpg', label: 'едно' },
      { id: 'n2',  imageUrl: '/assets/lesson-02/gramatika-7/chislo-02.jpg', label: 'две' },
      { id: 'n3',  imageUrl: '/assets/lesson-02/gramatika-7/chislo-03.jpg', label: 'три' },
      { id: 'n4',  imageUrl: '/assets/lesson-02/gramatika-7/chislo-04.jpg', label: 'четири' },
      { id: 'n5',  imageUrl: '/assets/lesson-02/gramatika-7/chislo-05.jpg', label: 'пет' },
      { id: 'n6',  imageUrl: '/assets/lesson-02/gramatika-7/chislo-06.jpg', label: 'шест' },
      { id: 'n7',  imageUrl: '/assets/lesson-02/gramatika-7/chislo-07.jpg', label: 'седем' },
      { id: 'n8',  imageUrl: '/assets/lesson-02/gramatika-7/chislo-08.jpg', label: 'осем' },
      { id: 'n9',  imageUrl: '/assets/lesson-02/gramatika-7/chislo-09.jpg', label: 'девет' },
      { id: 'n10', imageUrl: '/assets/lesson-02/gramatika-7/chislo-10.jpg', label: 'десет' },
      { id: 'n0',  imageUrl: '/assets/lesson-02/gramatika-7/chislo-0.JPG',  label: 'нула' },
    ],
  } as IllustratedCardsExercise,

  // ORDER 30: Упражнение 20 – Свържете точките
  {
    id: 'l02-ex-20',
    type: 'connect_dots',
    title: 'УПРАЖНЕНИЕ 20',
    instruction: 'Натиснете числата по ред, като на часовник.',
    order: 30,
    points: 12,
    dots: [
      { id: 'd0',  label: 'нула',       position: 0,  audioUrl: '/assets/lesson-02/audio/tts/words/n0.mp3'  },
      { id: 'd1',  label: 'едно',       position: 1,  audioUrl: '/assets/lesson-02/audio/tts/words/n1.mp3'  },
      { id: 'd2',  label: 'две',        position: 2,  audioUrl: '/assets/lesson-02/audio/tts/words/n2.mp3'  },
      { id: 'd3',  label: 'три',        position: 3,  audioUrl: '/assets/lesson-02/audio/tts/words/n3.mp3'  },
      { id: 'd4',  label: 'четири',     position: 4,  audioUrl: '/assets/lesson-02/audio/tts/words/n4.mp3'  },
      { id: 'd5',  label: 'пет',        position: 5,  audioUrl: '/assets/lesson-02/audio/tts/words/n5.mp3'  },
      { id: 'd6',  label: 'шест',       position: 6,  audioUrl: '/assets/lesson-02/audio/tts/words/n6.mp3'  },
      { id: 'd7',  label: 'седем',      position: 7,  audioUrl: '/assets/lesson-02/audio/tts/words/n7.mp3'  },
      { id: 'd8',  label: 'осем',       position: 8,  audioUrl: '/assets/lesson-02/audio/tts/words/n8.mp3'  },
      { id: 'd9',  label: 'девет',      position: 9,  audioUrl: '/assets/lesson-02/audio/tts/words/n9.mp3'  },
      { id: 'd10', label: 'десет',      position: 10, audioUrl: '/assets/lesson-02/audio/tts/words/n10.mp3' },
      { id: 'd11', label: 'единадесет', position: 11, audioUrl: '/assets/lesson-02/audio/tts/words/n11.mp3' },
    ],
  } as ConnectDotsExercise,

  // ORDER 31: Упражнение 21 – Напишете числото пред думата
  {
    id: 'l02-ex-21',
    type: 'dropdown_match',
    title: 'УПРАЖНЕНИЕ 21',
    instruction: 'Напишете числото пред думата.',
    order: 31,
    points: 11,
    questions: [
      { id: 'q-edno',    left: 'едно',        options: [],                                                                    correctAnswer: '1'  },
      { id: 'q-dve',     left: 'две',         options: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],       correctAnswer: '2'  },
      { id: 'q-tri',     left: 'три',         options: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],       correctAnswer: '3'  },
      { id: 'q-chetiri', left: 'четири',      options: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],       correctAnswer: '4'  },
      { id: 'q-pet',     left: 'пет',         options: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],       correctAnswer: '5'  },
      { id: 'q-shest',   left: 'шест',        options: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],       correctAnswer: '6'  },
      { id: 'q-sedem',   left: 'седем',       options: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],       correctAnswer: '7'  },
      { id: 'q-osem',    left: 'осем',        options: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],       correctAnswer: '8'  },
      { id: 'q-devet',   left: 'девет',       options: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],       correctAnswer: '9'  },
      { id: 'q-deset',   left: 'десет',       options: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],       correctAnswer: '10' },
      { id: 'q-nula',    left: 'нула',        options: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],       correctAnswer: '0'  },
    ],
  },

  // ORDER 32: SKIPPED — кръстословица (изисква кирилица на клавиатурата)

  // ORDER 33: Упражнение 23 – Оградете излишната дума
  {
    id: 'l02-ex-23',
    type: 'multiple_choice',
    title: 'УПРАЖНЕНИЕ 23',
    instruction: 'Коя дума НЕ принадлежи на групата? Маркирайте излишната дума.',
    order: 33,
    points: 4,
    questions: [
      {
        question: '🥤 Напитки (ПРИМЕР)',
        options: ['вода', 'кафе', 'хляб', 'чай', 'капучино'],
        correctIndex: 2,
      },
      {
        question: '🥐 Тестени изделия',
        options: ['баница', 'яйце', 'филия', 'хляб', 'кроасан'],
        correctIndex: 1,
      },
      {
        question: '🧀 Млечни продукти',
        options: ['сирене', 'кашкавал', 'мляко', 'салам', 'масло'],
        correctIndex: 3,
      },
      {
        question: '🍖 Солени храни',
        options: ['хляб', 'салам', 'шоколад', 'кашкавал', 'сандвич'],
        correctIndex: 2,
      },
    ],
  },
  // ORDER 34: Упражнение 24 – Попълнете диалозите
  {
    id: 'l02-ex-24',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 24',
    instruction: 'Попълнете диалозите с думите от списъка.',
    order: 34,
    points: 10,
    layout: 'single',
    sentences: [
      // — а. —
      { text: 'а.', blanks: [], correctAnswers: [], isExample: true },
      { text: '– Добро _______.', blanks: [1], correctAnswers: ['утро'], options: ['без', 'е', 'здравейте', 'има', 'ли', 'няма', 'с', 'това', 'утро'] },
      { text: '– Добро утро!', blanks: [], correctAnswers: [], isExample: true },
      { text: '– Има _______ чай?', blanks: [1], correctAnswers: ['ли'], options: ['без', 'е', 'здравейте', 'има', 'ли', 'няма', 'с', 'това', 'утро'] },
      { text: '– Да, _______.', blanks: [1], correctAnswers: ['има'], options: ['без', 'е', 'здравейте', 'има', 'ли', 'няма', 'с', 'това', 'утро'] },
      { text: '– Искам един чай.', blanks: [], correctAnswers: [], isExample: true },
      { text: '– _______ мед?', blanks: [0], correctAnswers: ['С'], options: ['без', 'е', 'здравейте', 'има', 'ли', 'няма', 'с', 'това', 'утро'], acceptableAnswers: [['с', 'С']] },
      { text: '– Не, _______ мед.', blanks: [1], correctAnswers: ['без'], options: ['без', 'е', 'здравейте', 'има', 'ли', 'няма', 'с', 'това', 'утро'] },
      // — б. —
      { text: 'б.', blanks: [], correctAnswers: [], isExample: true },
      { text: '– Здравейте.', blanks: [], correctAnswers: [], isExample: true },
      { text: '– _______.', blanks: [0], correctAnswers: ['Здравейте'], options: ['без', 'е', 'Здравейте', 'има', 'ли', 'няма', 'с', 'това', 'утро'] },
      { text: '– _______ ли капучино?', blanks: [0], correctAnswers: ['Има'], options: ['без', 'е', 'здравейте', 'има', 'ли', 'няма', 'с', 'това', 'утро'], acceptableAnswers: [['има', 'Има']] },
      { text: '– Не, _______.', blanks: [1], correctAnswers: ['няма'], options: ['без', 'е', 'здравейте', 'има', 'ли', 'няма', 'с', 'това', 'утро'] },
      // — в. —
      { text: 'в.', blanks: [], correctAnswers: [], isExample: true },
      { text: '– Какво _______ _______?', blanks: [1, 2], correctAnswers: ['е', 'това'], options: ['без', 'е', 'здравейте', 'има', 'ли', 'няма', 'с', 'това', 'утро'] },
      { text: '– Това _______ баница.', blanks: [1], correctAnswers: ['е'], options: ['без', 'е', 'здравейте', 'има', 'ли', 'няма', 'с', 'това', 'утро'] },
    ],
  } as WorkbookFillBlankExercise,
  // ORDER 35: Упражнение 25 – Слушайте текста + чеклист
  {
    id: 'l02-ex-25',
    type: 'reading_text',
    title: 'УПРАЖНЕНИЕ 25',
    instruction: 'Изслушайте текста и се опитайте да го прочетете.',
    order: 35,
    points: 10,
    audioUrl: '/assets/lesson-02/audio/tts/texts/l02-ex-25-full.mp3',
    paragraphs: [
      'Има един кроасан и едно кафе със захар.',
      'Има един чай с мед, един сандвич със салам и сирене и един сандвич с кашкавал.',
    ],
    checklist: {
      instruction: 'Какво има на масата? Маркирайте с ✓ или ✗.',
      items: [
        { id: 'tf1',  text: 'кроасан',                    isTrue: true },
        { id: 'tf6',  text: 'баница',                      isTrue: false },
        { id: 'tf2',  text: 'кафе със захар',             isTrue: true },
        { id: 'tf7',  text: 'кафе с мляко',               isTrue: false },
        { id: 'tf3',  text: 'чай с мед',                  isTrue: true },
        { id: 'tf8',  text: 'чай без захар',              isTrue: false },
        { id: 'tf4',  text: 'сандвич със салам и сирене',  isTrue: true },
        { id: 'tf9',  text: 'филия с масло',              isTrue: false },
        { id: 'tf5',  text: 'сандвич с кашкавал',          isTrue: true },
        { id: 'tf10', text: 'сок',                         isTrue: false },
      ],
    },
  },

  // ORDER 36: Упражнение 26 – ТЕКСТОВЕ: Амал и Наталия + Вярно или грешно?
  {
    id: 'l02-ex-26',
    type: 'reading_text',
    title: 'ТЕКСТОВЕ',
    instruction: 'Изслушайте текста и се опитайте да го прочетете.',
    order: 36,
    points: 5,
    showDictionary: true,
    audioUrl: '/assets/lesson-02/audio/tts/texts/l02-ex-26-full.mp3',
    paragraphs: [
      'Амал е от Ирак. За закуска тя много обича чай със захар, сок от портокал, сандвич с масло, сирене и домат. Не обича мед, салам и кашкавал.',
      'Наталия е от Украйна. За закуска тя обича мляко с кафе и плодове. Не обича сирене и кашкавал.',
      'Амал и Наталия обичат баница.',
    ],
    paragraphTranslations: [
      {
        en: 'Amal is from Iraq. For breakfast she really likes tea with sugar, orange juice, a sandwich with butter, cheese and tomato. She doesn\'t like honey, salami and yellow cheese.',
        ar: 'أمل من العراق. على الفطور هي تحب كثيرًا الشاي بالسكر وعصير البرتقال وساندويتش بالزبدة والجبن والطماطم. لا تحب العسل والسلامي والقشقوان.',
        fr: 'Amal est d\'Irak. Pour le petit-déjeuner, elle aime beaucoup le thé avec du sucre, le jus d\'orange, un sandwich avec du beurre, du fromage et de la tomate. Elle n\'aime pas le miel, le salami et le fromage jaune.',
        fa: 'امل از عراق است. برای صبحانه او خیلی چای با شکر، آب پرتقال، ساندویچ با کره، پنیر و گوجه‌فرنگی دوست دارد. عسل، سالامی و پنیر زرد دوست ندارد.',
        uk: 'Амаль з Іраку. На сніданок вона дуже любить чай з цукром, апельсиновий сік, сандвіч з маслом, сиром і помідором. Не любить мед, салямі та кашкавал.',
        ru: 'Амаль из Ирака. На завтрак она очень любит чай с сахаром, апельсиновый сок, бутерброд с маслом, сыром и помидором. Не любит мёд, салями и кашкавал.',
      },
      {
        en: 'Natalia is from Ukraine. For breakfast she likes milk with coffee and fruit. She doesn\'t like cheese and yellow cheese.',
        ar: 'ناتاليا من أوكرانيا. على الفطور هي تحب الحليب مع القهوة والفواكه. لا تحب الجبن والقشقوان.',
        fr: 'Natalia est d\'Ukraine. Pour le petit-déjeuner, elle aime le lait avec du café et des fruits. Elle n\'aime pas le fromage et le fromage jaune.',
        fa: 'ناتالیا از اوکراین است. برای صبحانه شیر با قهوه و میوه دوست دارد. پنیر و پنیر زرد دوست ندارد.',
        uk: 'Наталія з України. На сніданок вона любить молоко з кавою та фрукти. Не любить сирене та кашкавал.',
        ru: 'Наталия из Украины. На завтрак она любит молоко с кофе и фрукты. Не любит сыр и кашкавал.',
      },
      {
        en: 'Amal and Natalia like banitsa.',
        ar: 'أمل وناتاليا تحبان البانيتسا.',
        fr: 'Amal et Natalia aiment la banitsa.',
        fa: 'امل و ناتالیا بانیتسا دوست دارند.',
        uk: 'Амаль і Наталія люблять баницю.',
        ru: 'Амаль и Наталия любят баницу.',
      },
    ],
    checklist: {
      instruction: 'Прочетете текста и определете дали твърденията са верни (✓) или неверни (✗).',
      items: [
        { id: 'tf1', text: 'Амал обича чай със захар.',          isTrue: true },
        { id: 'tf2', text: 'Амал обича сок от портокал.',        isTrue: true },
        { id: 'tf3', text: 'Амал обича мед.',                     isTrue: false },
        { id: 'tf4', text: 'Наталия не обича мляко с кафе.',     isTrue: false },
        { id: 'tf5', text: 'Амал и Наталия обичат кашкавал.',    isTrue: false },
      ],
    },
  },

  // ORDER 38: Упражнение 29 – Слушайте текста и попълнете празните места
  {
    id: 'l02-ex-29',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 29',
    instruction: 'Изслушайте текста и попълнете празните места.',
    order: 38,
    points: 7,
    layout: 'single',
    listeningText: 'Иван и Мария са от България. За закуска те обичат кафе с мляко и малко захар. За закуска Иван обича баница със сирене. Не обича кисело мляко с плодове. За закуска Мария обича кроасан с шоколад. Не обича хляб и салам.',
    sentences: [
      { text: 'Иван и Мария са от _______.', blanks: [5], correctAnswers: ['България'], options: ['България', 'Ирак', 'Украйна'] },
      { text: 'За закуска те обичат кафе с _______ ...', blanks: [6], correctAnswers: ['мляко'], options: ['мляко', 'сок', 'чай'] },
      { text: '... и малко _______.', blanks: [2], correctAnswers: ['захар'], options: ['захар', 'мед', 'масло'] },
      { text: 'За закуска Иван обича баница със _______.', blanks: [5], correctAnswers: ['сирене'], options: ['сирене', 'салам', 'кашкавал'] },
      { text: 'Не обича _______ с плодове.', blanks: [2], correctAnswers: ['кисело мляко'], options: ['кисело мляко', 'прясно мляко', 'сок'] },
      { text: 'За закуска Мария обича кроасан с _______.', blanks: [5], correctAnswers: ['шоколад'], options: ['шоколад', 'масло', 'мед'] },
      { text: 'Не обича _______ и _______.', blanks: [2, 4], correctAnswers: ['хляб', 'салам'], options: [['хляб', 'баница', 'филия'], ['салам', 'сирене', 'кашкавал']] },
    ],
  } as WorkbookFillBlankExercise,

];

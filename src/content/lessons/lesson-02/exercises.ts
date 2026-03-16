import type {
  Exercise,
  ImageLabelingExercise,
  IllustratedCardsExercise,
  DragToColumnsExercise,
  WordSearchExercise,
  GrammarVisualExercise,
  GrammarExamplesExercise,
  GrammarTableExercise,
  MatchPairsExercise,
  WorkbookFillBlankExercise,
  DialoguesExercise,
  PersonalChoiceExercise,
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
    instruction: 'Напишете думите под картинките.',
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
    instruction: 'Запознайте се с новите думи',
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
    instruction: 'Подредете думите в двете колонки.',
    order: 3,
    points: 8,
    items: [
      'чай', 'кафе', 'сок', 'мляко',
      'хляб', 'сирене', 'масло', 'яйце',
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
    instruction: 'Колко думи можете да намерите?',
    order: 4,
    points: 7,
    letterString: 'СИРЕНЕММАСЛОПЛХПФИЛИЯЛЧАЙЯЦКЯМЕДЙАОБАНИЦАСИКАФЕКР',
    correctWords: ['СИРЕНЕ', 'МАСЛО', 'ФИЛИЯ', 'ЧАЙ', 'МЕД', 'БАНИЦА', 'КАФЕ'],
  } as WordSearchExercise,

  // ORDER 5: ГРАМАТИКА 1 – Какво е това? (NOT AN EXERCISE!)
  {
    id: 'l02-gramatika-01',
    type: 'grammar_visual',
    title: 'ГРАМАТИКА 1',
    instruction: 'Запознайте се с въпроса и отговора за предмети',
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
    instruction: 'Какво е това? Изберете правилната дума: „Това е ___."',
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
    type: 'grammar_examples',
    title: 'ГРАМАТИКА 2',
    subtitle: 'Обичам / не обичам',
    instruction: 'Запознайте се с глагола обичам – всички лица',
    order: 7,
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
  // ФАЗА 2 (стр. 19-21) — TODO
  // ─────────────────────────────────────────────────────────────────────────
  // ORDER 8:  l02-gramatika-table-01  grammar_table    Сегашно време А група
  // ORDER 9:  l02-ex-05               fill_with_images  Следвайте модела
  // ORDER 10: l02-ex-06               word_order        Подредете думите
  // ORDER 11: l02-ex-07               character_preferences  Ева и Ангел
  // ORDER 12: SKIPPED — l02-ex-08 was pair work ("Ангел обича ли баница?"), not feasible solo

  // ORDER 13: ГРАМАТИКА 3 – Глагол ИСКАМ – Сегашно време
  {
    id: 'l02-gramatika-03',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 3',
    instruction: 'Запознайте се с глагола ИСКАМ – сегашно време. Кликнете върху ред, за да чуете произношението.',
    subtitle: 'Граматика – Сегашно време (12)',
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
        lines: [
          '✓ вода, баница, хляб, салам, кроасан',
          '✗ прясно мляко, кафе, кисело мляко',
        ],
      },
      {
        imageUrl: '/assets/lesson-02/exercise-11/sara.jpg',
        lines: [
          '✓ прясно мляко, баница, хляб, кафе',
          '✗ вода, салам, кисело мляко, кроасан',
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
    type: 'grammar_examples',
    title: 'ГРАМАТИКА 4',
    subtitle: 'С / Без',
    instruction: 'Запознайте се с предлозите „с" и „без". Натиснете за произношение.',
    order: 19,
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
    instruction: 'Натиснете секцията за автоматично прочитане.',
    order: 20,
    sections: [
      {
        id: 'а.',
        lines: [
          { text: '– Обичате ли шоколад?' },
          { text: '– Да, обичам. А Вие?' },
          { text: '– Аз също.' },
        ],
      },
      {
        id: 'б.',
        lines: [
          { text: '– Обичаш ли баница?' },
          { text: '– Да, много. А ти?' },
          { text: '– Аз също.' },
        ],
      },
      {
        id: 'в.',
        lines: [
          { text: '– Обичате ли чай?' },
          { text: '– Да, обичам.' },
          { text: '– А мляко?' },
          { text: '– Не, не обичам.' },
        ],
      },
      {
        id: 'г.',
        lines: [
          { text: '– Искате ли кафе?' },
          { text: '– Да.' },
          { text: '– С мляко?' },
          { text: '– Не, без мляко.' },
        ],
      },
      {
        id: 'д.',
        lines: [
          { text: '– Искаш ли сок?' },
          { text: '– Да, искам.' },
          { text: '– А кроасан?' },
          { text: '– Не, не искам.' },
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
    blankOptions: ['с', 'без'],
    items: [
      {
        id: 'sugar-coffee',
        question: 'Искате ли захар в кафето?',
        positiveTemplate: 'Да, пия кафе ___ захар.',
        negativeTemplate: 'Не, пия кафе ___ захар.',
        positiveBlank: 'с',
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
    instruction: 'Разгледайте масата. Какво има и какво няма? Плъзнете думите в правилната колона.',
    order: 24,
    points: 10,
    imageUrl: '/assets/lesson-02/exercise-16/masa-s-zakuska.jpg',
    items: ['хляб', 'масло', 'мед', 'кафе', 'яйце', 'пица', 'салам', 'баница', 'кисело мляко', 'захар'],
    columns: [
      {
        id: 'ima',
        title: 'ИМА',
        icon: '✓',
        correctItems: ['хляб', 'масло', 'мед', 'кафе', 'яйце'],
      },
      {
        id: 'nyama',
        title: 'НЯМА',
        icon: '✗',
        correctItems: ['пица', 'салам', 'баница', 'кисело мляко', 'захар'],
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
    type: 'grammar_table',
    title: 'ГРАМАТИКА 6',
    subtitle: 'Граматика – Род на съществителните (2)',
    instruction: 'Запознайте се с рода на съществителните. Натиснете върху ред за произношение.',
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
    instruction: 'Свържете думите по модела: един, една или едно?',
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
    instruction: 'Изберете правилната форма: един, една или едно?',
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
    type: 'illustrated_cards',
    title: 'ГРАМАТИКА 7',
    instruction: 'Запознайте се с числата от 0 до 10. Натиснете за произношение.',
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

  // ORDER 30: SKIPPED — l02-ex-20 свържи точките (не е приложимо в апп)
  // ORDER 31: l02-ex-21               fill_in_blank     Напишете числото
  // ORDER 32: l02-ex-22               reading_text (placeholder) кръстословица
  // ORDER 33: l02-ex-23               multiple_choice   Оградете излишната дума
  // ORDER 34: l02-ex-24               fill_in_blank     Попълнете диалозите
  // ORDER 35: l02-ex-25               reading_text (placeholder) слушай и рисувай
  // ORDER 36: l02-ex-26               reading_text      ТЕКСТОВЕ – Амал и Наталия
  // ORDER 37: l02-ex-27               true_false        Вярно или грешно?
  // ORDER 38: l02-ex-29               fill_in_blank     Слушайте и попълнете

];

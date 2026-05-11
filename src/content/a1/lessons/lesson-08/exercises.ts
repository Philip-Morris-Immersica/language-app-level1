import type {
  Exercise,
  IllustratedCardsExercise,
  PersonalChoiceExercise,
  MatchPairsExercise,
  WorkbookFillBlankExercise,
  DropdownMatchExercise,
  DragToColumnsExercise,
  ImageLabelingExercise,
  DialoguesExercise,
  GrammarTableExercise,
  ReadingTextExercise,
} from '@/content/types';

// Урок 8 — Цветове и дрехи
// По клиент НЕ се дигитализират: упр. 8, 9, 12, 13, 14, 16, 19, 21, 22, 26, 29
// Упр. 10 — специална заявка: картинки от НОВИ ДУМИ 2, потребителят изписва думите по сезони.

export const exercises: Exercise[] = [

  // ══════════════════════════════════════════════════════
  // НОВИ ДУМИ 1 — Цветове (стр. 74)
  // ══════════════════════════════════════════════════════
  {
    id: 'l08-novi-dumi-01',
    type: 'illustrated_cards',
    title: 'НОВИ ДУМИ 1',
    instruction: '',
    order: 1,
    cards: [
      { id: 'rozov',    imageUrl: '/assets/lesson-08/03-novi-dumi-1-tsvetove/01-rozov.svg',    label: 'розов',    sublabels: ['розова', 'розово', 'розови'] },
      { id: 'cherven',  imageUrl: '/assets/lesson-08/03-novi-dumi-1-tsvetove/02-cherven.svg',  label: 'червен',   sublabels: ['червена', 'червено', 'червени'] },
      { id: 'zhalt',    imageUrl: '/assets/lesson-08/03-novi-dumi-1-tsvetove/03-zhalt.svg',    label: 'жълт',     sublabels: ['жълта', 'жълто', 'жълти'] },
      { id: 'oranzhev', imageUrl: '/assets/lesson-08/03-novi-dumi-1-tsvetove/04-oranzhev.svg', label: 'оранжев',  sublabels: ['оранжева', 'оранжево', 'оранжеви'] },
      { id: 'lilav',    imageUrl: '/assets/lesson-08/03-novi-dumi-1-tsvetove/05-lilav.svg',    label: 'лилав',    sublabels: ['лилава', 'лилаво', 'лилави'] },
      { id: 'sin',      imageUrl: '/assets/lesson-08/03-novi-dumi-1-tsvetove/06-sin.svg',      label: 'син',      sublabels: ['синя', 'синьо', 'сини'] },
      { id: 'zelen',    imageUrl: '/assets/lesson-08/03-novi-dumi-1-tsvetove/07-zelen.svg',    label: 'зелен',    sublabels: ['зелена', 'зелено', 'зелени'] },
      { id: 'kafyav',   imageUrl: '/assets/lesson-08/03-novi-dumi-1-tsvetove/08-kafyav.svg',   label: 'кафяв',    sublabels: ['кафява', 'кафяво', 'кафяви'] },
      { id: 'cheren',   imageUrl: '/assets/lesson-08/03-novi-dumi-1-tsvetove/09-cheren.svg',   label: 'черен',    sublabels: ['черна', 'черно', 'черни'] },
      { id: 'siv',      imageUrl: '/assets/lesson-08/03-novi-dumi-1-tsvetove/10-siv.svg',      label: 'сив',      sublabels: ['сива', 'сиво', 'сиви'] },
      { id: 'byal',     imageUrl: '/assets/lesson-08/03-novi-dumi-1-tsvetove/11-byal.svg',     label: 'бял',      sublabels: ['бяла', 'бяло', 'бели'] },
    ],
  } as IllustratedCardsExercise,

  // ══════════════════════════════════════════════════════
  // Упр. 1 — Какви цветове обичате? (стр. 74) — personal_choice
  // ══════════════════════════════════════════════════════
  {
    id: 'l08-ex-03',
    type: 'personal_choice',
    title: 'УПРАЖНЕНИЕ 1',
    instruction: 'Попълнете таблицата. Какви цветове обичате? Какви цветове не обичате?',
    order: 2,
    points: 0,
    model: {
      question: 'Обичате ли синьо?',
      positiveAnswer: 'Да, обичам синьо.',
      negativeAnswer: 'Не, не обичам синьо.',
    },
    blankOptions: ['розово', 'червено', 'жълто', 'оранжево', 'лилаво', 'синьо', 'зелено', 'кафяво', 'черно', 'сиво', 'бяло'],
    items: [
      { id: 't1',  question: 'Обичате ли розово?',    positiveTemplate: 'Обичам ___.', negativeTemplate: 'Не обичам ___.', positiveBlank: 'розово',    negativeBlank: 'розово' },
      { id: 't2',  question: 'Обичате ли червено?',   positiveTemplate: 'Обичам ___.', negativeTemplate: 'Не обичам ___.', positiveBlank: 'червено',   negativeBlank: 'червено' },
      { id: 't3',  question: 'Обичате ли жълто?',     positiveTemplate: 'Обичам ___.', negativeTemplate: 'Не обичам ___.', positiveBlank: 'жълто',     negativeBlank: 'жълто' },
      { id: 't4',  question: 'Обичате ли оранжево?',  positiveTemplate: 'Обичам ___.', negativeTemplate: 'Не обичам ___.', positiveBlank: 'оранжево',  negativeBlank: 'оранжево' },
      { id: 't5',  question: 'Обичате ли лилаво?',    positiveTemplate: 'Обичам ___.', negativeTemplate: 'Не обичам ___.', positiveBlank: 'лилаво',    negativeBlank: 'лилаво' },
      { id: 't6',  question: 'Обичате ли зелено?',    positiveTemplate: 'Обичам ___.', negativeTemplate: 'Не обичам ___.', positiveBlank: 'зелено',    negativeBlank: 'зелено' },
      { id: 't7',  question: 'Обичате ли кафяво?',    positiveTemplate: 'Обичам ___.', negativeTemplate: 'Не обичам ___.', positiveBlank: 'кафяво',    negativeBlank: 'кафяво' },
      { id: 't8',  question: 'Обичате ли черно?',     positiveTemplate: 'Обичам ___.', negativeTemplate: 'Не обичам ___.', positiveBlank: 'черно',     negativeBlank: 'черно' },
      { id: 't9',  question: 'Обичате ли сиво?',      positiveTemplate: 'Обичам ___.', negativeTemplate: 'Не обичам ___.', positiveBlank: 'сиво',      negativeBlank: 'сиво' },
      { id: 't10', question: 'Обичате ли бяло?',      positiveTemplate: 'Обичам ___.', negativeTemplate: 'Не обичам ___.', positiveBlank: 'бяло',      negativeBlank: 'бяло' },
    ],
  } as PersonalChoiceExercise,

  // ══════════════════════════════════════════════════════
  // Упр. 2 — Свържете думите по модела (стр. 74) — match_pairs
  // ══════════════════════════════════════════════════════
  {
    id: 'l08-ex-02',
    type: 'match_pairs',
    title: 'УПРАЖНЕНИЕ 2',
    instruction: 'Свържете цвета с правилната храна. Модел: зелена → чушка.',
    order: 3,
    points: 9,
    pairs: [
      { id: 'p1', left: 'червен', correctRight: 'домат' },
      { id: 'p2', left: 'оранжев', correctRight: 'морков' },
      { id: 'p3', left: 'жълт', correctRight: 'лимон' },
      { id: 'p4', left: 'бял', correctRight: 'чесън' },
      { id: 'p5', left: 'жълти', correctRight: 'банани' },
      { id: 'p6', left: 'червени', correctRight: 'ягоди' },
      { id: 'p7', left: 'зелено', correctRight: 'зеле' },
      { id: 'p8', left: 'кафяви', correctRight: 'картофи' },
      { id: 'p9', left: 'оранжеви', correctRight: 'портокали' },
    ],
    shuffledRights: [
      'лимон', 'домат', 'картофи', 'портокали', 'банани',
      'чесън', 'зеле', 'морков', 'ягоди',
    ],
  } as MatchPairsExercise,

  // ══════════════════════════════════════════════════════
  // Упр. 3 — Знамена и цветове (стр. 75) — workbook_fill_blank
  // ══════════════════════════════════════════════════════
  {
    id: 'l08-ex-04',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 3',
    instruction: 'Довършете изреченията по модела. Изберете правилните цветове за всяко знаме.',
    order: 4,
    points: 8,
    layout: 'single',
    sentences: [
      {
        text: 'Модел: Знамето на България е бяло, зелено и червено.',
        blanks: [], correctAnswers: [], isExample: true,
        images: ['/assets/lesson-08/flags/flag-bg.png'],
      },
      {
        text: 'Знамето на Сирия е _______.',
        blanks: [0],
        correctAnswers: ['червено, бяло, черно и зелено'],
        options: ['червено, бяло, черно и зелено', 'синьо и жълто', 'черно, червено и жълто', 'червено, бяло и синьо'],
        images: ['/assets/lesson-08/flags/flag-de.png'],
      },
      {
        text: 'Знамето на Иран е _______.',
        blanks: [0],
        correctAnswers: ['зелено, бяло и червено'],
        options: ['зелено, бяло и червено', 'синьо и жълто', 'червено, бяло и черно', 'черно, червено и жълто'],
        images: ['/assets/lesson-08/flags/flag-fr.png'],
      },
      {
        text: 'Знамето на Германия е _______.',
        blanks: [0],
        correctAnswers: ['черно, червено и жълто'],
        options: ['черно, червено и жълто', 'синьо и жълто', 'червено, бяло и синьо', 'зелено, бяло и червено'],
        images: ['/assets/lesson-08/flags/flag-it.png'],
      },
      {
        text: 'Знамето на Ирак е _______.',
        blanks: [0],
        correctAnswers: ['червено, бяло, черно и зелено'],
        options: ['червено, бяло, черно и зелено', 'червено, бяло и синьо', 'синьо и жълто', 'черно, червено и жълто'],
        images: ['/assets/lesson-08/flags/flag-es.png'],
      },
      {
        text: 'Знамето на Украйна е _______.',
        blanks: [0],
        correctAnswers: ['синьо и жълто'],
        options: ['синьо и жълто', 'червено, бяло и синьо', 'черно, червено и жълто', 'зелено, бяло и червено'],
        images: ['/assets/lesson-08/flags/flag-ru.png'],
      },
      {
        text: 'Знамето на Великобритания е _______.',
        blanks: [0],
        correctAnswers: ['червено, бяло и синьо'],
        options: ['червено, бяло и синьо', 'синьо и жълто', 'черно, червено и жълто', 'зелено, бяло и червено'],
        images: ['/assets/lesson-08/flags/flag-ua.png'],
      },
      {
        text: 'Знамето на Франция е _______.',
        blanks: [0],
        correctAnswers: ['синьо, бяло и червено'],
        options: ['синьо, бяло и червено', 'червено, бяло и синьо', 'синьо и жълто', 'черно, червено и жълто'],
        images: ['/assets/lesson-08/flags/flag-uk.png'],
      },
      {
        text: 'Знамето на Европейския съюз е _______.',
        blanks: [0],
        correctAnswers: ['синьо и жълто'],
        options: ['синьо и жълто', 'червено, бяло и синьо', 'черно, червено и жълто', 'зелено, бяло и червено'],
        images: ['/assets/lesson-08/flags/flag-us.png'],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ══════════════════════════════════════════════════════
  // НОВИ ДУМИ 2 — Дрехи и аксесоари (стр. 75–76)
  // ══════════════════════════════════════════════════════
  {
    id: 'l08-novi-dumi-02',
    type: 'illustrated_cards',
    title: 'НОВИ ДУМИ 2',
    instruction: '',
    order: 5,
    cards: [
      { id: 'kostyum',          imageUrl: '/assets/lesson-08/06-novi-dumi-2-drehi-ilustratsii/15-kostyum.jpg',          label: 'костюм' },
      { id: 'pantalon',         imageUrl: '/assets/lesson-08/06-novi-dumi-2-drehi-ilustratsii/14-pantalon.jpg',         label: 'панталон' },
      { id: 'sako',             imageUrl: '/assets/lesson-08/06-novi-dumi-2-drehi-ilustratsii/13-sako.jpg',             label: 'сако' },
      { id: 'riza',             imageUrl: '/assets/lesson-08/06-novi-dumi-2-drehi-ilustratsii/12-riza.jpg',             label: 'риза' },
      { id: 'danki',            imageUrl: '/assets/lesson-08/06-novi-dumi-2-drehi-ilustratsii/11-danki.jpg',            label: 'дънки' },
      { id: 'roklya',           imageUrl: '/assets/lesson-08/06-novi-dumi-2-drehi-ilustratsii/10-roklya.jpg',           label: 'рокля' },
      { id: 'pola',             imageUrl: '/assets/lesson-08/06-novi-dumi-2-drehi-ilustratsii/04-pola.jpg',             label: 'пола' },
      { id: 'bluza',            imageUrl: '/assets/lesson-08/06-novi-dumi-2-drehi-ilustratsii/05-bluza.jpg',            label: 'блуза' },
      { id: 'palto',            imageUrl: '/assets/lesson-08/06-novi-dumi-2-drehi-ilustratsii/08-palto.jpg',            label: 'палто' },
      { id: 'yake',             imageUrl: '/assets/lesson-08/06-novi-dumi-2-drehi-ilustratsii/09-yake.jpg',             label: 'яке' },
      { id: 'obuvki',           imageUrl: '/assets/lesson-08/06-novi-dumi-2-drehi-ilustratsii/07-obuvki-visok-tok.jpg', label: 'обувки' },
      { id: 'sandali',          imageUrl: '/assets/lesson-08/06-novi-dumi-2-drehi-ilustratsii/06-sandali.jpg',          label: 'сандали' },
      { id: 'maratonki',        imageUrl: '/assets/lesson-08/06-novi-dumi-2-drehi-ilustratsii/03-maratonki.jpg',        label: 'маратонки' },
      { id: 'dzhapanki',        imageUrl: '/assets/lesson-08/06-novi-dumi-2-drehi-ilustratsii/02-dzhapanki.jpg',        label: 'джапанки' },
      { id: 'boti',             imageUrl: '/assets/lesson-08/06-novi-dumi-2-drehi-ilustratsii/01-botushi.jpg',          label: 'боти' },
      { id: 'pulover',          imageUrl: '/assets/lesson-08/06-novi-dumi-2-drehi-ilustratsii/29-pulover.jpg',          label: 'пуловер' },
      { id: 'teniska',          imageUrl: '/assets/lesson-08/06-novi-dumi-2-drehi-ilustratsii/27-teniska.jpg',          label: 'тениска' },
      { id: 'kasi-pantaloni',   imageUrl: '/assets/lesson-08/06-novi-dumi-2-drehi-ilustratsii/26-kasi-pantaloni.jpg',   label: 'къси панталони' },
      { id: 'shapka',           imageUrl: '/assets/lesson-08/06-novi-dumi-2-drehi-ilustratsii/17-shapka.jpg',           label: 'шапка' },
      { id: 'chorapi',          imageUrl: '/assets/lesson-08/06-novi-dumi-2-drehi-ilustratsii/25-chorapi.jpg',          label: 'чорапи' },
      { id: 'botushi',          imageUrl: '/assets/lesson-08/06-novi-dumi-2-drehi-ilustratsii/23-botushi-zimni.jpg',    label: 'ботуши' },
      { id: 'shal',             imageUrl: '/assets/lesson-08/06-novi-dumi-2-drehi-ilustratsii/28-shal.jpg',             label: 'шал' },
      { id: 'rakavitsi',        imageUrl: '/assets/lesson-08/06-novi-dumi-2-drehi-ilustratsii/24-rakavitsi.jpg',        label: 'ръкавици' },
      { id: 'noshtnitsa',       imageUrl: '/assets/lesson-08/06-novi-dumi-2-drehi-ilustratsii/21-roklya-noshtnitsa.jpg', label: 'нощница' },
      { id: 'pizhama',          imageUrl: '/assets/lesson-08/06-novi-dumi-2-drehi-ilustratsii/18-pizhama.jpg',          label: 'пижама' },
      { id: 'ochila',           imageUrl: '/assets/lesson-08/06-novi-dumi-2-drehi-ilustratsii/20-ochila.jpg',           label: 'очила' },
      { id: 'slanchevi-ochila', imageUrl: '/assets/lesson-08/06-novi-dumi-2-drehi-ilustratsii/19-slanchevi-ochila.jpg', label: 'слънчеви очила' },
      { id: 'kolan',            imageUrl: '/assets/lesson-08/06-novi-dumi-2-drehi-ilustratsii/22-kolan.jpg',            label: 'колан' },
    ],
  } as IllustratedCardsExercise,

  // ══════════════════════════════════════════════════════
  // Упр. 4 — Напишете правилните номера (стр. 76) — dropdown_match
  // ══════════════════════════════════════════════════════
  {
    id: 'l08-ex-05',
    type: 'dropdown_match',
    title: 'УПРАЖНЕНИЕ 4',
    instruction: 'Вижте картинката и изберете правилния номер за всяка дреха.',
    order: 6,
    points: 18,
    imageUrl: '/assets/lesson-08/07-upr-05-nomera-kragcheta-drehi/01-vitrina-drehi-kragcheta-s-cifri-v-krygovete.png',
    questions: [
      { id: 'q1',  left: 'панталон',       options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'], correctAnswer: '1' },
      { id: 'q2',  left: 'сако',            options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'], correctAnswer: '2' },
      { id: 'q3',  left: 'маратонки',       options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'], correctAnswer: '3' },
      { id: 'q4',  left: 'риза',            options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'], correctAnswer: '4' },
      { id: 'q5',  left: 'обувки',          options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'], correctAnswer: '5' },
      { id: 'q6',  left: 'колан',           options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'], correctAnswer: '6' },
      { id: 'q7',  left: 'пола',            options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'], correctAnswer: '7' },
      { id: 'q8',  left: 'блуза',           options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'], correctAnswer: '8' },
      { id: 'q9',  left: 'сандали',         options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'], correctAnswer: '9' },
      { id: 'q10', left: 'дънки',           options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'], correctAnswer: '10' },
      { id: 'q11', left: 'пуловер',         options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'], correctAnswer: '11' },
      { id: 'q12', left: 'яке',             options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'], correctAnswer: '12' },
      { id: 'q13', left: 'очила',           options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'], correctAnswer: '13' },
      { id: 'q14', left: 'палто',           options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'], correctAnswer: '14' },
      { id: 'q15', left: 'шал',             options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'], correctAnswer: '15' },
      { id: 'q16', left: 'ботуши',          options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'], correctAnswer: '16' },
      { id: 'q17', left: 'ръкавици',        options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'], correctAnswer: '17' },
      { id: 'q18', left: 'слънчеви очила',  options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'], correctAnswer: '18' },
    ],
  } as DropdownMatchExercise,

  // ══════════════════════════════════════════════════════
  // Упр. 5 — Подредете дрехите: мъже и жени (стр. 77) — drag_to_columns
  // ══════════════════════════════════════════════════════
  {
    id: 'l08-ex-06',
    type: 'drag_to_columns',
    title: 'УПРАЖНЕНИЕ 5',
    instruction: 'Плъзнете дрехите в правилната колона: за мъже или за жени.',
    order: 7,
    points: 9,
    items: [
      'рокля', 'костюм', 'панталон', 'пола', 'яке',
      'дънки', 'риза', 'обувки', 'палто',
    ],
    columns: [
      { id: 'mazhe', title: 'мъже', correctItems: ['костюм', 'панталон', 'риза', 'дънки', 'обувки', 'палто', 'яке'] },
      { id: 'zheni', title: 'жени', correctItems: ['рокля', 'пола', 'дънки', 'обувки', 'палто', 'яке'] },
    ],
  } as DragToColumnsExercise,

  // ══════════════════════════════════════════════════════
  // Упр. 6 — Напишете правилните номера (стр. 77) — dropdown_match
  // ══════════════════════════════════════════════════════
  {
    id: 'l08-ex-07',
    type: 'dropdown_match',
    title: 'УПРАЖНЕНИЕ 6',
    instruction: 'Вижте картинката и изберете правилния номер за всяка дреха.',
    order: 8,
    points: 7,
    imageUrl: '/assets/lesson-08/09-upr-07-napishi-nomera-kragcheta/01-dvama-deca-kragcheta-s-cifri.png',
    questions: [
      { id: 'q1', left: 'рокля',           options: ['1', '2', '3', '4', '5', '6', '7'], correctAnswer: '1' },
      { id: 'q2', left: 'тениска',          options: ['1', '2', '3', '4', '5', '6', '7'], correctAnswer: '2' },
      { id: 'q3', left: 'джапанки',         options: ['1', '2', '3', '4', '5', '6', '7'], correctAnswer: '3' },
      { id: 'q4', left: 'чорапи',           options: ['1', '2', '3', '4', '5', '6', '7'], correctAnswer: '4' },
      { id: 'q5', left: 'шапка',            options: ['1', '2', '3', '4', '5', '6', '7'], correctAnswer: '5' },
      { id: 'q6', left: 'маратонки',        options: ['1', '2', '3', '4', '5', '6', '7'], correctAnswer: '6' },
      { id: 'q7', left: 'къси панталони',   options: ['1', '2', '3', '4', '5', '6', '7'], correctAnswer: '7' },
    ],
  } as DropdownMatchExercise,

  // Упр. 8 — SKIP по клиент (по двойки — Какъв цвят е костюмът?)
  // Упр. 9 — SKIP по клиент (Продължете по модела)

  // ══════════════════════════════════════════════════════
  // Упр. 7 — Довършете изреченията (стр. 77) — image_labeling
  // По заявка на клиента: картинки от НОВИ ДУМИ 2,
  // потребителят изписва думите по сезони.
  // Разделено на 4 секции (пролет, лято, есен, зима).
  // ══════════════════════════════════════════════════════
  {
    id: 'l08-ex-10a',
    type: 'image_labeling',
    title: 'УПРАЖНЕНИЕ 7 — Пролет',
    instruction: 'Изберете подходящите дрехи за пролетта.',
    order: 9,
    points: 4,
    displayType: 'default',
    images: [
      { id: 'prolet-pantalon', imageUrl: '/assets/lesson-08/06-novi-dumi-2-drehi-ilustratsii/14-pantalon.jpg', correctLabel: 'панталон', acceptableLabels: ['панталон', 'панталони'] },
      { id: 'prolet-sako',     imageUrl: '/assets/lesson-08/06-novi-dumi-2-drehi-ilustratsii/13-sako.jpg',     correctLabel: 'сако' },
      { id: 'prolet-yake',     imageUrl: '/assets/lesson-08/06-novi-dumi-2-drehi-ilustratsii/09-yake.jpg',     correctLabel: 'яке' },
      { id: 'prolet-chorapi',  imageUrl: '/assets/lesson-08/06-novi-dumi-2-drehi-ilustratsii/25-chorapi.jpg',  correctLabel: 'чорапи' },
    ],
    options: ['панталон', 'сако', 'яке', 'чорапи'],
  } as ImageLabelingExercise,

  {
    id: 'l08-ex-10b',
    type: 'image_labeling',
    title: 'УПРАЖНЕНИЕ 7 — Лято',
    instruction: 'Изберете подходящите дрехи за лятото.',
    order: 10,
    points: 7,
    displayType: 'default',
    images: [
      { id: 'lyato-teniska',          imageUrl: '/assets/lesson-08/06-novi-dumi-2-drehi-ilustratsii/27-teniska.jpg',          correctLabel: 'тениска' },
      { id: 'lyato-slanchevi-ochila', imageUrl: '/assets/lesson-08/06-novi-dumi-2-drehi-ilustratsii/19-slanchevi-ochila.jpg', correctLabel: 'слънчеви очила' },
      { id: 'lyato-roklya',           imageUrl: '/assets/lesson-08/06-novi-dumi-2-drehi-ilustratsii/10-roklya.jpg',           correctLabel: 'рокля' },
      { id: 'lyato-sandali',          imageUrl: '/assets/lesson-08/06-novi-dumi-2-drehi-ilustratsii/06-sandali.jpg',          correctLabel: 'сандали' },
      { id: 'lyato-riza',             imageUrl: '/assets/lesson-08/06-novi-dumi-2-drehi-ilustratsii/12-riza.jpg',             correctLabel: 'риза' },
      { id: 'lyato-dzhapanki',        imageUrl: '/assets/lesson-08/06-novi-dumi-2-drehi-ilustratsii/02-dzhapanki.jpg',        correctLabel: 'джапанки' },
      { id: 'lyato-kasi-pantaloni',   imageUrl: '/assets/lesson-08/06-novi-dumi-2-drehi-ilustratsii/26-kasi-pantaloni.jpg',   correctLabel: 'къси панталони' },
    ],
    options: ['тениска', 'слънчеви очила', 'рокля', 'сандали', 'риза', 'джапанки', 'къси панталони'],
  } as ImageLabelingExercise,

  {
    id: 'l08-ex-10c',
    type: 'image_labeling',
    title: 'УПРАЖНЕНИЕ 7 — Есен',
    instruction: 'Изберете подходящите дрехи за есента.',
    order: 11,
    points: 7,
    displayType: 'default',
    images: [
      { id: 'esen-kostyum',    imageUrl: '/assets/lesson-08/06-novi-dumi-2-drehi-ilustratsii/15-kostyum.jpg',    correctLabel: 'костюм' },
      { id: 'esen-danki',      imageUrl: '/assets/lesson-08/06-novi-dumi-2-drehi-ilustratsii/11-danki.jpg',      correctLabel: 'дънки' },
      { id: 'esen-pola',       imageUrl: '/assets/lesson-08/06-novi-dumi-2-drehi-ilustratsii/04-pola.jpg',       correctLabel: 'пола' },
      { id: 'esen-bluza',      imageUrl: '/assets/lesson-08/06-novi-dumi-2-drehi-ilustratsii/05-bluza.jpg',      correctLabel: 'блуза' },
      { id: 'esen-obuvki',     imageUrl: '/assets/lesson-08/06-novi-dumi-2-drehi-ilustratsii/16-obuvki-brog.jpg', correctLabel: 'обувки' },
      { id: 'esen-maratonki',  imageUrl: '/assets/lesson-08/06-novi-dumi-2-drehi-ilustratsii/03-maratonki.jpg',  correctLabel: 'маратонки' },
      { id: 'esen-kolan',      imageUrl: '/assets/lesson-08/06-novi-dumi-2-drehi-ilustratsii/22-kolan.jpg',      correctLabel: 'колан' },
    ],
    options: ['костюм', 'дънки', 'пола', 'блуза', 'обувки', 'маратонки', 'колан'],
  } as ImageLabelingExercise,

  {
    id: 'l08-ex-10d',
    type: 'image_labeling',
    title: 'УПРАЖНЕНИЕ 7 — Зима',
    instruction: 'Изберете подходящите дрехи за зимата.',
    order: 12,
    points: 8,
    displayType: 'default',
    images: [
      { id: 'zima-palto',     imageUrl: '/assets/lesson-08/06-novi-dumi-2-drehi-ilustratsii/08-palto.jpg',            correctLabel: 'палто' },
      { id: 'zima-boti',      imageUrl: '/assets/lesson-08/06-novi-dumi-2-drehi-ilustratsii/01-botushi.jpg',          correctLabel: 'боти' },
      { id: 'zima-pulover',   imageUrl: '/assets/lesson-08/06-novi-dumi-2-drehi-ilustratsii/29-pulover.jpg',          correctLabel: 'пуловер' },
      { id: 'zima-shapka',    imageUrl: '/assets/lesson-08/06-novi-dumi-2-drehi-ilustratsii/17-shapka.jpg',           correctLabel: 'шапка' },
      { id: 'zima-chorapi',   imageUrl: '/assets/lesson-08/06-novi-dumi-2-drehi-ilustratsii/25-chorapi.jpg',          correctLabel: 'чорапи' },
      { id: 'zima-botushi',   imageUrl: '/assets/lesson-08/06-novi-dumi-2-drehi-ilustratsii/23-botushi-zimni.jpg',    correctLabel: 'ботуши' },
      { id: 'zima-shal',      imageUrl: '/assets/lesson-08/06-novi-dumi-2-drehi-ilustratsii/28-shal.jpg',             correctLabel: 'шал' },
      { id: 'zima-rakavitsi', imageUrl: '/assets/lesson-08/06-novi-dumi-2-drehi-ilustratsii/24-rakavitsi.jpg',        correctLabel: 'ръкавици' },
    ],
    options: ['палто', 'боти', 'пуловер', 'шапка', 'чорапи', 'ботуши', 'шал', 'ръкавици'],
  } as ImageLabelingExercise,

  // ══════════════════════════════════════════════════════
  // Упр. 8 — Подчертайте правилната форма на глагола (стр. 77)
  // ══════════════════════════════════════════════════════
  {
    id: 'l08-ex-11',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 8',
    instruction: 'Изберете правилната форма на глагола **нося**.',
    order: 13,
    points: 6,
    layout: 'two-column',
    sentences: [
      { text: 'Модел: Аз нося / носим блуза.', blanks: [], correctAnswers: [], isExample: true },
      { text: 'Ти _______ пуловер.',          blanks: [0], correctAnswers: ['носиш'],  options: ['носиш', 'носят', 'нося', 'носим'] },
      { text: 'Той _______ яке.',              blanks: [0], correctAnswers: ['носи'],   options: ['носи', 'носят', 'носиш', 'нося'] },
      { text: 'Тя _______ сако.',              blanks: [0], correctAnswers: ['носи'],   options: ['носи', 'носиш', 'носим', 'носят'] },
      { text: 'Ние _______ тениски.',          blanks: [0], correctAnswers: ['носим'],  options: ['носим', 'носят', 'нося', 'носите'] },
      { text: 'Вие _______ пола.',             blanks: [0], correctAnswers: ['носите'], options: ['носите', 'нося', 'носим', 'носят'] },
      { text: 'Те _______ дънки.',             blanks: [0], correctAnswers: ['носят'],  options: ['носят', 'носим', 'носиш', 'нося'] },
    ],
  } as WorkbookFillBlankExercise,

  // Упр. 12 — SKIP по клиент (Опишете какви дрехи носи учителят)

  // ══════════════════════════════════════════════════════
  // ДИАЛОЗИ 1 — Размери (стр. 78)
  // ══════════════════════════════════════════════════════
  {
    id: 'l08-dialozi-01',
    type: 'dialogues',
    title: 'ДИАЛОЗИ 1',
    instruction: 'Натиснете всяка реплика, за да чуете произношението. После повторете на глас.',
    order: 14,
    imageUrl: '/assets/lesson-08/16-dialozi-1-razmeri-drehi-obuvki/02-teniski-razmeri-s-m-l-xl.png',
    sections: [
      {
        id: 'а.',
        lines: [
          { text: '— Имате ли размер M от синята тениска?', voiceGender: 'female' as const },
          { text: '— Съжалявам, нямаме. Искате ли L?', voiceGender: 'male' as const },
          { text: '— Не, благодаря.', voiceGender: 'female' as const },
        ],
      },
      {
        id: 'б.',
        lines: [
          { text: '— Имате ли обувки номер 38?', voiceGender: 'female' as const },
          { text: '— Да, имаме, но само черни. Искате ли?', voiceGender: 'male' as const },
          { text: '— Да, благодаря.', voiceGender: 'female' as const },
        ],
      },
    ],
  } as DialoguesExercise,

  // Упр. 13 — SKIP по клиент (Прочетете диалозите по двойки)
  // Упр. 14 — SKIP по клиент (Попълнете таблицата за хората в групата)

  // ══════════════════════════════════════════════════════
  // ГРАМАТИКА 1 — Показателни местоимения (стр. 78)
  // ══════════════════════════════════════════════════════
  {
    id: 'l08-gramatika-01',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 1',
    subtitle: 'Показателни местоимения',
    instruction: 'Показателни местоимения — **този**, **тази**, **това**, **тези**.',
    instructionKey: 'grammar.l08.g1.instruction',
    order: 15,
    tableTitle: 'Показателни местоимения',
    columns: ['Форма', 'Пример'],
    rows: [
      { pronoun: 'м.р.', cells: ['този', 'този панталон'] },
      { pronoun: 'ж.р.', cells: ['тази', 'тази блуза'] },
      { pronoun: 'ср.р.', cells: ['това', 'това яке'] },
      { pronoun: 'мн.ч.', cells: ['тези', 'тези дрехи'] },
    ],
    notes: ['Искам този панталон.'],
  } as GrammarTableExercise,

  // ══════════════════════════════════════════════════════
  // Упр. 9 — Поставете правилната дума (стр. 78)
  // ══════════════════════════════════════════════════════
  {
    id: 'l08-ex-15',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 9',
    instruction: 'Изберете правилната дума: **този**, **тази**, **това** или **тези**.',
    order: 16,
    points: 14,
    layout: 'two-column',
    sentences: [
      { text: 'Модел: тази рокля', blanks: [], correctAnswers: [], isExample: true },
      { text: '_______ обувки', blanks: [0], correctAnswers: ['тези'],  options: ['този', 'тази', 'това', 'тези'] },
      { text: '_______ дрехи',  blanks: [0], correctAnswers: ['тези'],  options: ['този', 'тази', 'това', 'тези'] },
      { text: '_______ палто',  blanks: [0], correctAnswers: ['това'],  options: ['този', 'тази', 'това', 'тези'] },
      { text: '_______ сако',   blanks: [0], correctAnswers: ['това'],  options: ['този', 'тази', 'това', 'тези'] },
      { text: '_______ пола',   blanks: [0], correctAnswers: ['тази'],  options: ['този', 'тази', 'това', 'тези'] },
      { text: '_______ тениска', blanks: [0], correctAnswers: ['тази'], options: ['този', 'тази', 'това', 'тези'] },
      { text: '_______ чорапи', blanks: [0], correctAnswers: ['тези'],  options: ['този', 'тази', 'това', 'тези'] },
      { text: '_______ яке',    blanks: [0], correctAnswers: ['това'],  options: ['този', 'тази', 'това', 'тези'] },
      { text: '_______ панталон', blanks: [0], correctAnswers: ['този'], options: ['този', 'тази', 'това', 'тези'] },
      { text: '_______ шал',    blanks: [0], correctAnswers: ['този'],  options: ['този', 'тази', 'това', 'тези'] },
      { text: '_______ очила',  blanks: [0], correctAnswers: ['тези'],  options: ['този', 'тази', 'това', 'тези'] },
      { text: '_______ дънки',  blanks: [0], correctAnswers: ['тези'],  options: ['този', 'тази', 'това', 'тези'] },
      { text: '_______ пуловер', blanks: [0], correctAnswers: ['този'], options: ['този', 'тази', 'това', 'тези'] },
      { text: '_______ размер', blanks: [0], correctAnswers: ['този'],  options: ['този', 'тази', 'това', 'тези'] },
    ],
  } as WorkbookFillBlankExercise,

  // Упр. 16 — SKIP по клиент (по двойки — Искате ли тази рокля?)

  // ══════════════════════════════════════════════════════
  // ГРАМАТИКА 2 — Членуване на прилагателните (стр. 79)
  // ══════════════════════════════════════════════════════
  {
    id: 'l08-gramatika-02',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 2',
    subtitle: 'Членуване на прилагателните',
    instruction: 'Членуване на прилагателните имена.',
    instructionKey: 'grammar.l08.g2.instruction',
    order: 17,
    tableTitle: 'Членуване на прилагателните',
    columns: ['Окончание', 'Примери'],
    rows: [
      { pronoun: 'мъжки род', cells: ['-ИЯ(Т)', 'хубав → хубавият, малък → малкият, зелен → зеленият'] },
      { pronoun: 'женски род', cells: ['-ТА', 'хубава → хубавата, малка → малката, зелена → зелената'] },
      { pronoun: 'среден род', cells: ['-ТО', 'хубаво → хубавото, малко → малкото, зелено → зеленото'] },
      { pronoun: 'мн. ч.', cells: ['-ТЕ', 'хубави → хубавите, малки → малките, зелени → зелените'] },
    ],
    notes: ['Искам черния панталон.'],
  } as GrammarTableExercise,

  // ══════════════════════════════════════════════════════
  // Упр. 10 — Напишете правилната форма (стр. 79)
  // ══════════════════════════════════════════════════════
  {
    id: 'l08-ex-17',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 10',
    instruction: 'Изберете правилната форма на прилагателното.',
    order: 18,
    points: 4,
    layout: 'single',
    sentences: [
      {
        text: 'Модел: малкият апартамент (малък, малка, малко, малки)',
        blanks: [], correctAnswers: [], isExample: true,
      },
      {
        text: '_______ къща (голям, голяма, голямо, големи)',
        blanks: [0], correctAnswers: ['голямата'],
        options: ['голямата', 'големият', 'голямото', 'големите'],
      },
      {
        text: '_______ дете (умен, умна, умно, умни)',
        blanks: [0], correctAnswers: ['умното'],
        options: ['умното', 'умният', 'умната', 'умните'],
      },
      {
        text: '_______ жена (млад, млада, младо, млади)',
        blanks: [0], correctAnswers: ['младата'],
        options: ['младата', 'младият', 'младото', 'младите'],
      },
      {
        text: '_______ планини (висок, висока, високо, високи)',
        blanks: [0], correctAnswers: ['високите'],
        options: ['високите', 'високият', 'високата', 'високото'],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ══════════════════════════════════════════════════════
  // ДИАЛОЗИ 2 — В магазина (стр. 79)
  // ══════════════════════════════════════════════════════
  {
    id: 'l08-dialozi-02',
    type: 'dialogues',
    title: 'ДИАЛОЗИ 2',
    instruction: 'Натиснете всяка реплика, за да чуете произношението. После повторете на глас.',
    order: 19,
    imageUrl: '/assets/lesson-08/24-upr-18-prilagatelni-kartinki/02-magazin-dama-kupuva-cherevna-bluza.png',
    sections: [
      {
        id: 'а.',
        lines: [
          { text: '— Извинете, може ли тази тениска?', voiceGender: 'female' as const },
          { text: '— Бялата?', voiceGender: 'male' as const },
          { text: '— Не, червената.', voiceGender: 'female' as const },
          { text: '— Заповядайте!', voiceGender: 'male' as const },
          { text: '— Благодаря!', voiceGender: 'female' as const },
        ],
      },
      {
        id: 'б.',
        lines: [
          { text: '— Може ли зеленото яке?', voiceGender: 'female' as const },
          { text: '— Да, разбира се. Кой номер искате?', voiceGender: 'male' as const },
          { text: '— Номер 46.', voiceGender: 'female' as const, ttsText: '— Номер четиридесет и шест.' },
        ],
      },
      {
        id: 'в.',
        lines: [
          { text: '— Как е якето?', voiceGender: 'male' as const },
          { text: '— Малко е. Може ли номер 48?', voiceGender: 'female' as const, ttsText: '— Малко е. Може ли номер четиридесет и осем?' },
          { text: '— Да, разбира се.', voiceGender: 'male' as const },
        ],
      },
    ],
  } as DialoguesExercise,

  // ══════════════════════════════════════════════════════
  // Упр. 11 — Поставете правилната дума (стр. 79)
  // ══════════════════════════════════════════════════════
  {
    id: 'l08-ex-18',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 11',
    instruction: 'Изберете правилния член на прилагателното.',
    order: 20,
    points: 8,
    layout: 'single',
    sentences: [
      {
        text: 'Модел: Бялата къща е много красива.',
        blanks: [], correctAnswers: [], isExample: true,
      },
      {
        text: 'Синя_______ рокля е много скъпа.',
        blanks: [0], correctAnswers: ['та'],
        options: ['та', 'ят', 'то', 'те'],
      },
      {
        text: 'Може ли къси_______ панталони?',
        blanks: [0], correctAnswers: ['те'],
        options: ['те', 'та', 'ят', 'то'],
      },
      {
        text: 'Червено_______ яке е на Миро.',
        blanks: [0], correctAnswers: ['то'],
        options: ['то', 'та', 'ят', 'те'],
      },
      {
        text: 'Черни_______ обувки са на Вяра, а бели_______ са на Соня.',
        blanks: [0, 1], correctAnswers: ['те', 'те'],
        options: ['те', 'та', 'ят', 'то'],
      },
      {
        text: 'Зелена_______ тениска е голяма, а жълта_______ е малка.',
        blanks: [0, 1], correctAnswers: ['та', 'та'],
        options: ['та', 'ят', 'то', 'те'],
      },
      {
        text: 'Оранжева_______ тениска е евтина.',
        blanks: [0], correctAnswers: ['та'],
        options: ['та', 'ят', 'то', 'те'],
      },
    ],
  } as WorkbookFillBlankExercise,

  // Упр. 19 — SKIP по клиент (Прочетете диалозите по двойки)

  // ══════════════════════════════════════════════════════
  // Упр. 12 — Слушайте и попълнете липсващите думи (стр. 79)
  // ══════════════════════════════════════════════════════
  {
    id: 'l08-ex-20',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 12',
    instruction: 'Изслушайте диалозите и попълнете липсващите думи.',
    order: 21,
    points: 8,
    layout: 'single',
    listeningText: 'а. Извинете, може ли тази тениска? Бялата? Не, червената. Заповядайте! Благодаря! б. Може ли зеленото яке? Да, разбира се. Кой номер искате? Номер четиридесет и шест. в. Как е якето? Малко е. Може ли номер четиридесет и осем? Да, разбира се.',
    sentences: [
      {
        text: 'а. — Извинете, може ли тази _______? — _______? — Не, червената. — Заповядайте! — Благодаря!',
        blanks: [0, 1],
        correctAnswers: ['тениска', 'Бялата'],
        options: [
          ['тениска', 'рокля', 'блуза', 'пола'],
          ['Бялата', 'Черната', 'Синята', 'Зелената'],
        ] as string[][],
      },
      {
        text: 'б. — Може ли _______ яке? — Да, разбира се. Кой _______ искате? — Номер _______.',
        blanks: [0, 1, 2],
        correctAnswers: ['зеленото', 'номер', '46'],
        options: [
          ['зеленото', 'черното', 'бялото', 'синьото'],
          ['номер', 'размер', 'цвят', 'модел'],
          ['46', '48', '42', '50'],
        ] as string[][],
      },
      {
        text: 'в. — Как е _______? — _______ е. Може ли номер _______? — Да, разбира се.',
        blanks: [0, 1, 2],
        correctAnswers: ['якето', 'Малко', '48'],
        options: [
          ['якето', 'палтото', 'ризата', 'блузата'],
          ['Малко', 'Голямо', 'Хубаво', 'Скъпо'],
          ['48', '46', '50', '44'],
        ] as string[][],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ══════════════════════════════════════════════════════
  // НОВИ ДУМИ 3 — В чантата (стр. 80)
  // ══════════════════════════════════════════════════════
  {
    id: 'l08-novi-dumi-03',
    type: 'illustrated_cards',
    title: 'НОВИ ДУМИ 3',
    instruction: '',
    order: 22,
    textOnly: true,
    headerImageUrl: '/assets/lesson-08/27-novi-dumi-3-chanta-dokumenti/s-nomera.jpg',
    cards: [
      { id: 'chanta',          imageUrl: '/assets/lesson-08/27-novi-dumi-3-chanta-dokumenti/01-chanta-sastav-obekti.jpg', label: '① чанта',                       ttsLabel: 'чанта' },
      { id: 'pasport',         imageUrl: '',                                                                              label: '② паспорт',                      ttsLabel: 'паспорт' },
      { id: 'pari',            imageUrl: '/assets/lesson-08/27-novi-dumi-3-chanta-dokumenti/10-pari-leva.jpg',            label: '③ пари',                         ttsLabel: 'пари' },
      { id: 'zapalka',         imageUrl: '/assets/lesson-08/27-novi-dumi-3-chanta-dokumenti/03-zapalka.jpg',              label: '④ запалка',                      ttsLabel: 'запалка' },
      { id: 'ogledalo',        imageUrl: '',                                                                              label: '⑤ огледало',                     ttsLabel: 'огледало' },
      { id: 'portmone',        imageUrl: '/assets/lesson-08/27-novi-dumi-3-chanta-dokumenti/05-portmone.jpg',             label: '⑥ портмоне',                    ttsLabel: 'портмоне' },
      { id: 'klyuchove',       imageUrl: '/assets/lesson-08/27-novi-dumi-3-chanta-dokumenti/02-klyuchove.jpg',            label: '⑦ ключове',                     ttsLabel: 'ключове' },
      { id: 'himikalka',       imageUrl: '/assets/lesson-08/27-novi-dumi-3-chanta-dokumenti/04-himikalka.jpg',            label: '⑧ химикалка',                   ttsLabel: 'химикалка' },
      { id: 'chadar',          imageUrl: '/assets/lesson-08/27-novi-dumi-3-chanta-dokumenti/07-chadar.jpg',               label: '⑨ чадър',                       ttsLabel: 'чадър' },
      { id: 'telefon-gsm',     imageUrl: '/assets/lesson-08/27-novi-dumi-3-chanta-dokumenti/08-telefon.jpg',              label: '⑩ телефон (GSM)',               ttsLabel: 'телефон' },
      { id: 'lichna-karta',    imageUrl: '',                                                                              label: '⑪ лична карта',                 ttsLabel: 'лична карта' },
      { id: 'shofyorska-kn',   imageUrl: '',                                                                              label: '⑫ шофьорска книжка',            ttsLabel: 'шофьорска книжка' },
      { id: 'kreditna-karta',  imageUrl: '/assets/lesson-08/27-novi-dumi-3-chanta-dokumenti/06-kreditna-karta.jpg',       label: '⑬ кредитна / дебитна карта',   ttsLabel: 'кредитна карта' },
    ],
  } as IllustratedCardsExercise,

  // Упр. 21 — SKIP по клиент (Напишете какво има в чантата Ви днес)
  // Упр. 22 — SKIP по клиент (По двойки — Имаш ли телефон?)

  // ══════════════════════════════════════════════════════
  // ДОПЪЛНИТЕЛНИ УПРАЖНЕНИЯ (стр. 80)
  // ══════════════════════════════════════════════════════

  // ══════════════════════════════════════════════════════
  // Упр. 13 — Отговорете на въпросите (стр. 80)
  // ══════════════════════════════════════════════════════
  {
    id: 'l08-ex-23',
    type: 'workbook_fill_blank',
    title: 'ДОПЪЛНИТЕЛНИ УПРАЖНЕНИЯ',
    subtitle: 'Упражнение 13',
    instruction: 'Отговорете на въпросите по модела. Изберете правилния цвят.',
    order: 23,
    points: 9,
    layout: 'qa-split',
    sentences: [
      {
        text: 'Модел: Какъв цвят е сиренето? | Сиренето е бяло.',
        blanks: [], correctAnswers: [], isExample: true,
      },
      {
        text: 'Какъв цвят е млякото? | Млякото е _______.',
        blanks: [0], correctAnswers: ['бяло'],
        options: ['бяло', 'кафяво', 'червено', 'зелено'],
      },
      {
        text: 'Какъв цвят е кафето? | Кафето е _______.',
        blanks: [0], correctAnswers: ['кафяво'],
        options: ['кафяво', 'бяло', 'зелено', 'червено'],
      },
      {
        text: 'Какъв цвят е шоколадът? | Шоколадът е _______.',
        blanks: [0], correctAnswers: ['кафяв'],
        options: ['кафяв', 'бял', 'зелен', 'червен'],
      },
      {
        text: 'Какъв цвят са маслините? | Маслините са _______.',
        blanks: [0], correctAnswers: ['зелени'],
        options: ['зелени', 'червени', 'бели', 'кафяви'],
      },
      {
        text: 'Какъв цвят е яйцето? | Яйцето е _______.',
        blanks: [0], correctAnswers: ['бяло'],
        options: ['бяло', 'жълто', 'кафяво', 'зелено'],
      },
      {
        text: 'Какъв цвят е кашкавалът? | Кашкавалът е _______.',
        blanks: [0], correctAnswers: ['жълт'],
        options: ['жълт', 'бял', 'зелен', 'кафяв'],
      },
      {
        text: 'Какъв цвят е слънцето? | Слънцето е _______.',
        blanks: [0], correctAnswers: ['жълто'],
        options: ['жълто', 'бяло', 'червено', 'синьо'],
      },
      {
        text: 'Какъв цвят са морковите? | Морковите са _______.',
        blanks: [0], correctAnswers: ['оранжеви'],
        options: ['оранжеви', 'зелени', 'червени', 'жълти'],
      },
      {
        text: 'Какъв цвят са дърветата през пролетта? | Дърветата са _______.',
        blanks: [0], correctAnswers: ['зелени'],
        options: ['зелени', 'кафяви', 'жълти', 'червени'],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ══════════════════════════════════════════════════════
  // Упр. 14 — Напишете липсващите думи (стр. 80)
  // ══════════════════════════════════════════════════════
  {
    id: 'l08-ex-24',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 14',
    instruction: 'Попълнете липсващите думи.',
    order: 24,
    points: 9,
    layout: 'single',
    sentences: [
      {
        text: 'Вали дъжд и нося _______.',
        blanks: [0], correctAnswers: ['чадър'],
        options: ['чадър', 'шапка', 'очила', 'колан'],
        images: ['/assets/lesson-08/30-dopalnitelni-upr-24-lipsvashti-dumi/07-chadar.jpg'],
      },
      {
        text: 'Иван има голяма чанта, но няма много _______.',
        blanks: [0], correctAnswers: ['пари'],
        options: ['пари', 'дрехи', 'обувки', 'ключове'],
        images: ['/assets/lesson-08/30-dopalnitelni-upr-24-lipsvashti-dumi/10-pari-leva.jpg'],
      },
      {
        text: 'Мария има кола, но няма _______.',
        blanks: [0], correctAnswers: ['шофьорска книжка'],
        options: ['шофьорска книжка', 'лична карта', 'паспорт', 'кредитна карта'],
      },
      {
        text: 'Тя има скъп _______.',
        blanks: [0], correctAnswers: ['телефон'],
        options: ['телефон', 'чадър', 'колан', 'шал'],
        images: ['/assets/lesson-08/30-dopalnitelni-upr-24-lipsvashti-dumi/08-telefon.jpg'],
      },
      {
        text: '_______ са на вратата.',
        blanks: [0], correctAnswers: ['Ключовете'],
        options: ['Ключовете', 'Парите', 'Очилата', 'Чорапите'],
        images: ['/assets/lesson-08/30-dopalnitelni-upr-24-lipsvashti-dumi/02-klyuchove.jpg'],
      },
      {
        text: 'Тя има _______ и купува много дрехи.',
        blanks: [0], correctAnswers: ['кредитна карта'],
        options: ['кредитна карта', 'лична карта', 'шофьорска книжка', 'паспорт'],
        images: ['/assets/lesson-08/30-dopalnitelni-upr-24-lipsvashti-dumi/06-kreditna-karta.jpg'],
      },
      {
        text: 'Извинете, имате ли _______?',
        blanks: [0], correctAnswers: ['химикалка'],
        options: ['химикалка', 'запалка', 'огледало', 'портмоне'],
        images: ['/assets/lesson-08/30-dopalnitelni-upr-24-lipsvashti-dumi/04-himikalka.jpg'],
      },
      {
        text: 'Имам 20 евро в _______.',
        blanks: [0], correctAnswers: ['портмонето'],
        options: ['портмонето', 'чантата', 'джоба', 'кутията'],
        images: ['/assets/lesson-08/30-dopalnitelni-upr-24-lipsvashti-dumi/05-portmone.jpg'],
      },
      {
        text: '_______ е в чантата.',
        blanks: [0], correctAnswers: ['Паспортът'],
        options: ['Паспортът', 'Ключовете', 'Парите', 'Очилата'],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ══════════════════════════════════════════════════════
  // ТЕКСТОВЕ (стр. 81)
  // ══════════════════════════════════════════════════════

  // ══════════════════════════════════════════════════════
  // Упр. 15 — Прочетете текста: Милена (стр. 81)
  // ══════════════════════════════════════════════════════
  {
    id: 'l08-ex-25',
    type: 'reading_text',
    title: 'ТЕКСТОВЕ',
    subtitle: 'Упражнение 15',
    instruction: 'Изслушайте текста и след това го прочетете сами.',
    order: 25,
    audioUrl: '', // TODO: TTS Фаза 2
    images: [{ imageUrl: '/assets/lesson-08/32-tekst-upr-25-milena-ofis/01-milena-ofis.jpg', label: '' }],
    paragraphs: [
      'Милена работи в голям офис в София. Там тя носи официални дрехи и обувки.',
      'След работа и през уикенда предпочита спортни дрехи. Те са удобни и леки.',
      'Милена обича всички цветове, но най-много обича белия и червения цвят. Има много дрехи в тези цветове.',
      'Милена купува дрехи от моловете. За зимата предпочита вълнени дрехи, а за лятото — памучни.',
    ],
    showDictionary: true,
  } as ReadingTextExercise,

  // Упр. 26 — SKIP по клиент (Подчертайте непознатите думи)

  // ══════════════════════════════════════════════════════
  // Упр. 16 — Отговорете на въпросите (стр. 81)
  // ══════════════════════════════════════════════════════
  {
    id: 'l08-ex-27',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 16',
    instruction: 'Отговорете на въпросите за Милена.',
    order: 26,
    points: 5,
    layout: 'qa-split',
    sentences: [
      {
        text: 'Къде работи Милена? | _______',
        blanks: [0], correctAnswers: ['В голям офис в София.'],
        options: ['В голям офис в София.', 'В магазин за дрехи.', 'В университет.', 'В болница.'],
      },
      {
        text: 'Какви дрехи носи в офиса? | _______',
        blanks: [0], correctAnswers: ['Официални дрехи и обувки.'],
        options: ['Официални дрехи и обувки.', 'Спортни дрехи.', 'Дънки и тениска.', 'Само рокли.'],
      },
      {
        text: 'Защо носи спортни дрехи след работа? | _______',
        blanks: [0], correctAnswers: ['Защото са удобни и леки.'],
        options: ['Защото са удобни и леки.', 'Защото са евтини.', 'Защото са красиви.', 'Защото са нови.'],
      },
      {
        text: 'Какви дрехи предпочита за лятото? | _______',
        blanks: [0], correctAnswers: ['Памучни.'],
        options: ['Памучни.', 'Вълнени.', 'Официални.', 'Спортни.'],
      },
      {
        text: 'Какви дрехи предпочита за зимата? | _______',
        blanks: [0], correctAnswers: ['Вълнени.'],
        options: ['Вълнени.', 'Памучни.', 'Леки.', 'Спортни.'],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ══════════════════════════════════════════════════════
  // Упр. 17 — Песен „Оранжево" (стр. 81)
  // ══════════════════════════════════════════════════════
  {
    id: 'l08-ex-28',
    type: 'reading_text',
    title: 'УПРАЖНЕНИЕ 17',
    instruction: 'Изслушайте текста и след това го прочетете сами.',
    order: 27,
    textTitle: 'Оранжево',
    audioUrl: '', // TODO: TTS Фаза 2
    images: [{ imageUrl: '/assets/lesson-08/35-upr-28-pesen-oranjevo/01-ilustratsiya-pesen-oranjevo.jpg', label: '' }],
    paragraphs: [
      'Оранжево небето,',
      'оранжево морето,',
      'оранжева тревата,',
      'оранжев и градът.',
      '',
      'С оранжевите майки,',
      'оранжеви дечица,',
      'оранжеви китари,',
      'оранжево звънят.',
    ],
    showDictionary: true,
  } as ReadingTextExercise,

  // Упр. 29 — SKIP по клиент (Заменете оранжево с любимия цвят)

  // ══════════════════════════════════════════════════════
  // ПРЕГОВОР — Преговорни упражнения (Урок 8)
  // ══════════════════════════════════════════════════════

  // ══════════════════════════════════════════════════════
  // Преговор 4 — Глагол нося + цвят (fill_blank)
  // ══════════════════════════════════════════════════════
  {
    id: 'l08-wb-04',
    type: 'workbook_fill_blank',
    title: 'ПРЕГОВОР',
    subtitle: 'Упражнение 4',
    instruction: 'Попълнете с правилната форма на глагола и правилния цвят.',
    order: 28,
    points: 8,
    layout: 'single',
    sentences: [
      {
        text: 'Модел: Аз нося синя риза.',
        blanks: [], correctAnswers: [], isExample: true,
      },
      {
        text: 'Ти _______ бяла тениска.',
        blanks: [0], correctAnswers: ['носиш'],
        options: ['носиш', 'носи', 'носят', 'нося'],
      },
      {
        text: 'Той _______ черно яке.',
        blanks: [0], correctAnswers: ['носи'],
        options: ['носи', 'носиш', 'носим', 'носят'],
      },
      {
        text: 'Тя _______ зелена рокля.',
        blanks: [0], correctAnswers: ['носи'],
        options: ['носи', 'носиш', 'нося', 'носят'],
      },
      {
        text: 'Ние _______ червени пуловери.',
        blanks: [0], correctAnswers: ['носим'],
        options: ['носим', 'носиш', 'носят', 'носи'],
      },
      {
        text: 'Вие _______ жълти шалове.',
        blanks: [0], correctAnswers: ['носите'],
        options: ['носите', 'носим', 'нося', 'носят'],
      },
      {
        text: 'Те _______ кафяви обувки.',
        blanks: [0], correctAnswers: ['носят'],
        options: ['носят', 'носим', 'носите', 'носиш'],
      },
      {
        text: 'Аз _______ оранжев шал.',
        blanks: [0], correctAnswers: ['нося'],
        options: ['нося', 'носи', 'носите', 'носим'],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ══════════════════════════════════════════════════════
  // Преговор 5 — В магазина (personal_choice)
  // ══════════════════════════════════════════════════════
  {
    id: 'l08-wb-05',
    type: 'personal_choice',
    title: 'ПРЕГОВОР',
    subtitle: 'Упражнение 5',
    instruction: 'Какви дрехи харесвате? Отговорете по модела.',
    order: 29,
    points: 0,
    model: {
      question: 'Харесвате ли черни дрехи?',
      positiveAnswer: 'Да, харесвам черни дрехи.',
      negativeAnswer: 'Не, не харесвам черни дрехи.',
    },
    blankOptions: ['черни', 'бели', 'сини', 'червени', 'зелени', 'жълти', 'кафяви', 'лилави'],
    items: [
      { id: 'w1', question: 'Харесвате ли бели дрехи?',    positiveTemplate: 'Да, харесвам ___ дрехи.', negativeTemplate: 'Не, не харесвам ___ дрехи.', positiveBlank: 'бели',    negativeBlank: 'бели' },
      { id: 'w2', question: 'Харесвате ли сини дрехи?',    positiveTemplate: 'Да, харесвам ___ дрехи.', negativeTemplate: 'Не, не харесвам ___ дрехи.', positiveBlank: 'сини',    negativeBlank: 'сини' },
      { id: 'w3', question: 'Харесвате ли червени дрехи?', positiveTemplate: 'Да, харесвам ___ дрехи.', negativeTemplate: 'Не, не харесвам ___ дрехи.', positiveBlank: 'червени', negativeBlank: 'червени' },
      { id: 'w4', question: 'Харесвате ли зелени дрехи?',  positiveTemplate: 'Да, харесвам ___ дрехи.', negativeTemplate: 'Не, не харесвам ___ дрехи.', positiveBlank: 'зелени',  negativeBlank: 'зелени' },
      { id: 'w5', question: 'Харесвате ли жълти дрехи?',   positiveTemplate: 'Да, харесвам ___ дрехи.', negativeTemplate: 'Не, не харесвам ___ дрехи.', positiveBlank: 'жълти',   negativeBlank: 'жълти' },
    ],
  } as PersonalChoiceExercise,

];

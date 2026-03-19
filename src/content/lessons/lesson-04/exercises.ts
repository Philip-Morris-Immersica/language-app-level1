import type {
  Exercise,
  ImageLabelingExercise,
  IllustratedCardsExercise,
  LetterChoiceExercise,
  WordSearchExercise,
  WorkbookFillBlankExercise,
  DragToColumnsExercise,
  ReadingTextExercise,
  GrammarExamplesExercise,
  GrammarTableExercise,
  DropdownMatchExercise,
  MultipleChoiceExercise,
  DialoguesExercise,
  TrueFalseExercise,
  TableFillExercise,
  PersonalChoiceExercise,
} from '@/content/types';

export const exercises: Exercise[] = [

  // ─────────────────────────────────────────────────────────────────────────
  // СТРАНИЦА 34
  // ─────────────────────────────────────────────────────────────────────────

  // ORDER 1: Упр. 1 – Напишете думите под картинките (Page 34)
  {
    id: 'l04-ex-01',
    type: 'image_labeling',
    instruction: 'Напишете думите под картинките.',
    order: 1,
    points: 4,
    displayType: 'default',
    images: [
      { id: 'pazar',       imageUrl: '/assets/lesson-04/01-upr-01-magazini/01-pazar.jpg',       correctLabel: 'пазар' },
      { id: 'minimarket',  imageUrl: '/assets/lesson-04/01-upr-01-magazini/02-minimarket.jpg',  correctLabel: 'минимаркет' },
      { id: 'hipermarket', imageUrl: '/assets/lesson-04/01-upr-01-magazini/03-hipermarket.jpg', correctLabel: 'хипермаркет' },
      { id: 'supermarket', imageUrl: '/assets/lesson-04/01-upr-01-magazini/04-supermarket.jpg', correctLabel: 'супермаркет' },
    ],
    options: ['минимаркет', 'супермаркет', 'хипермаркет', 'пазар'],
  } as ImageLabelingExercise,

  // ORDER 2: НОВИ ДУМИ 1 – Месо и хранителни продукти (Page 34)
  {
    id: 'l04-novi-dumi-01',
    type: 'illustrated_cards',
    title: 'НОВИ ДУМИ 1',
    instruction: 'Запознайте се с новите думи. Натиснете за произношение.',
    order: 2,
    cards: [
      { id: 'riba',          imageUrl: '/assets/lesson-04/02-novi-dumi-1-meso-hrani/01-riba.jpg',          label: 'риба' },
      { id: 'pile',          imageUrl: '/assets/lesson-04/02-novi-dumi-1-meso-hrani/02-pile.jpg',          label: 'пиле' },
      { id: 'pileshko-meso', imageUrl: '/assets/lesson-04/02-novi-dumi-1-meso-hrani/03-pileshko-meso.jpg', label: 'пилешко месо' },
      { id: 'teleshko-meso', imageUrl: '/assets/lesson-04/02-novi-dumi-1-meso-hrani/04-teleshko-meso.jpg', label: 'телешко месо' },
      { id: 'svinsko-meso',  imageUrl: '/assets/lesson-04/02-novi-dumi-1-meso-hrani/05-svinsko-meso.jpg',  label: 'свинско месо' },
      { id: 'shunka',        imageUrl: '/assets/lesson-04/02-novi-dumi-1-meso-hrani/06-shunka.jpg',        label: 'шунка' },
      { id: 'bob',           imageUrl: '/assets/lesson-04/02-novi-dumi-1-meso-hrani/07-bob.jpg',           label: 'боб' },
      { id: 'oriz',          imageUrl: '/assets/lesson-04/02-novi-dumi-1-meso-hrani/08-oriz.jpg',          label: 'ориз' },
      { id: 'leshta',        imageUrl: '/assets/lesson-04/02-novi-dumi-1-meso-hrani/09-leshta.jpg',        label: 'леща' },
      { id: 'brashno',       imageUrl: '/assets/lesson-04/02-novi-dumi-1-meso-hrani/10-brashno.jpg',       label: 'брашно' },
      { id: 'grah',          imageUrl: '/assets/lesson-04/02-novi-dumi-1-meso-hrani/11-grah.jpg',          label: 'грах' },
      { id: 'maslini',       imageUrl: '/assets/lesson-04/02-novi-dumi-1-meso-hrani/12-maslini.jpg',       label: 'маслини' },
      { id: 'biskviti',      imageUrl: '/assets/lesson-04/02-novi-dumi-1-meso-hrani/13-biskviti.jpg',      label: 'бисквити' },
      { id: 'bonboni',       imageUrl: '/assets/lesson-04/02-novi-dumi-1-meso-hrani/14-bonboni.jpg',       label: 'бонбони' },
      { id: 'yadki',         imageUrl: '/assets/lesson-04/02-novi-dumi-1-meso-hrani/15-yadki.jpg',         label: 'ядки' },
      { id: 'sol',           imageUrl: '/assets/lesson-04/02-novi-dumi-1-meso-hrani/16-sol.jpg',           label: 'сол' },
      { id: 'olio',          imageUrl: '/assets/lesson-04/02-novi-dumi-1-meso-hrani/17-olio.jpg',          label: 'олио' },
      { id: 'otset',         imageUrl: '/assets/lesson-04/02-novi-dumi-1-meso-hrani/18-otset.jpg',         label: 'оцет' },
    ],
  } as IllustratedCardsExercise,

  // ─────────────────────────────────────────────────────────────────────────
  // СТРАНИЦА 35
  // ─────────────────────────────────────────────────────────────────────────

  // ORDER 3: Упр. 2 – Попълнете липсващите букви (Page 35)
  {
    id: 'l04-ex-02',
    type: 'letter_choice',
    instruction: 'Попълнете липсващите букви.',
    order: 3,
    points: 8,
    puzzles: [
      { id: 'p1', word: 'О_ИЗ',       correctLetters: ['Р'] },
      { id: 'p2', word: 'БО_БО_И',    correctLetters: ['Н', 'Н'] },
      { id: 'p3', word: 'БИСК_И_И',   correctLetters: ['В', 'Т'] },
      { id: 'p4', word: 'Б_Б',        correctLetters: ['О'] },
      { id: 'p5', word: 'С_Л',        correctLetters: ['О'] },
      { id: 'p6', word: 'РИ_А',       correctLetters: ['Б'] },
      { id: 'p7', word: 'МЕ_О',       correctLetters: ['С'] },
      { id: 'p8', word: 'ОЛ_О',       correctLetters: ['И'] },
    ],
  } as LetterChoiceExercise,

  // ORDER 4: Упр. 3 – Колко думи можете да намерите? (Page 35)
  {
    id: 'l04-ex-03',
    type: 'word_search',
    instruction: 'Колко думи можете да намерите? Напишете ги.',
    order: 4,
    points: 11,
    letterString: 'пилешкомесомаслинисолзахароцетлещабоббонбонишункаориз',
    correctWords: ['пилешко', 'месо', 'маслини', 'сол', 'захар', 'оцет', 'леща', 'боб', 'бонбони', 'шунка', 'ориз'],
  } as WordSearchExercise,

  // ORDER 5: Упр. 4 – Довършете изреченията (Page 35)
  {
    id: 'l04-ex-04',
    type: 'workbook_fill_blank',
    instruction: 'Довършете изреченията.',
    order: 5,
    points: 6,
    layout: 'single' as const,
    sentences: [
      {
        text: 'Аз ям сандвич с шунка.',
        blanks: [], correctAnswers: [], isExample: true,
        images: ['/assets/lesson-04/03-upr-04-model/01-shunka-thumb.jpg'],
      },
      {
        text: 'Той вечеря салата и _______.',
        blanks: [4], correctAnswers: ['риба'],
        options: ['риба', 'грах', 'маслини', 'шунка', 'леща', 'ориз'],
        images: ['/assets/lesson-04/03-upr-04-model/02-riba-thumb.jpg'],
      },
      {
        text: 'Ние обядваме супа от _______.',
        blanks: [4], correctAnswers: ['боб'],
        options: ['риба', 'боб', 'маслини', 'шунка', 'леща', 'ориз'],
        images: ['/assets/lesson-04/03-upr-04-model/04-bob-thumb.jpg'],
      },
      {
        text: 'Те закусват чай, хляб и _______.',
        blanks: [5], correctAnswers: ['маслини'],
        options: ['риба', 'грах', 'маслини', 'шунка', 'леща', 'ориз'],
        images: ['/assets/lesson-04/03-upr-04-model/03-maslini-thumb.jpg'],
      },
      {
        text: 'Не ям _______.',
        blanks: [2], correctAnswers: ['шунка'],
        options: ['риба', 'грах', 'маслини', 'шунка', 'леща', 'ориз'],
        images: ['/assets/lesson-04/03-upr-04-model/07-svinsko-thumb.jpg'],
      },
      {
        text: 'Тя обядва _______.',
        blanks: [2], correctAnswers: ['леща'],
        options: ['риба', 'грах', 'маслини', 'шунка', 'леща', 'ориз'],
        images: ['/assets/lesson-04/03-upr-04-model/06-leshta-thumb.jpg'],
      },
      {
        text: 'Тя не обича супа от _______.',
        blanks: [5], correctAnswers: ['ориз'],
        options: ['риба', 'грах', 'маслини', 'шунка', 'леща', 'ориз'],
        images: ['/assets/lesson-04/03-upr-04-model/05-oriz-thumb.jpg'],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ORDER 6: НОВИ ДУМИ 2 – ПЛОДОВЕ (Page 35)
  {
    id: 'l04-novi-dumi-02',
    type: 'illustrated_cards',
    title: 'НОВИ ДУМИ 2',
    instruction: 'Запознайте се с плодовете. Натиснете за произношение.',
    order: 6,
    cards: [
      { id: 'yabalka',   imageUrl: '/assets/lesson-04/04-novi-dumi-2-plodove/01-yabalka.jpg',   label: 'ябълка' },
      { id: 'krusha',    imageUrl: '/assets/lesson-04/04-novi-dumi-2-plodove/02-krusha.jpg',    label: 'круша' },
      { id: 'yagoda',    imageUrl: '/assets/lesson-04/04-novi-dumi-2-plodove/03-yagoda.jpg',    label: 'ягода' },
      { id: 'cheresha',  imageUrl: '/assets/lesson-04/04-novi-dumi-2-plodove/04-cheresha.jpg',  label: 'череша' },
      { id: 'sliva',     imageUrl: '/assets/lesson-04/04-novi-dumi-2-plodove/05-sliva.jpg',     label: 'слива' },
      { id: 'praskova',  imageUrl: '/assets/lesson-04/04-novi-dumi-2-plodove/06-praskova.jpg',  label: 'праскова' },
      { id: 'kaisiya',   imageUrl: '/assets/lesson-04/04-novi-dumi-2-plodove/07-kaisiya.jpg',   label: 'кайсия' },
      { id: 'grozde',    imageUrl: '/assets/lesson-04/04-novi-dumi-2-plodove/08-grozde.jpg',    label: 'грозде' },
      { id: 'papesh',    imageUrl: '/assets/lesson-04/04-novi-dumi-2-plodove/09-papesh.jpg',    label: 'пъпеш' },
      { id: 'dinya',     imageUrl: '/assets/lesson-04/04-novi-dumi-2-plodove/10-dinya.jpg',     label: 'диня' },
      { id: 'banan',     imageUrl: '/assets/lesson-04/04-novi-dumi-2-plodove/11-banan.jpg',     label: 'банан' },
      { id: 'limon',     imageUrl: '/assets/lesson-04/04-novi-dumi-2-plodove/12-limon.jpg',     label: 'лимон' },
      { id: 'portokal',  imageUrl: '/assets/lesson-04/04-novi-dumi-2-plodove/13-portokal.jpg',  label: 'портокал' },
      { id: 'greipfrut', imageUrl: '/assets/lesson-04/04-novi-dumi-2-plodove/14-greipfrut.jpg', label: 'грейпфрут' },
      { id: 'smokinya',  imageUrl: '/assets/lesson-04/04-novi-dumi-2-plodove/15-smokinya.jpg',  label: 'смокиня' },
    ],
  } as IllustratedCardsExercise,

  // ─────────────────────────────────────────────────────────────────────────
  // СТРАНИЦА 36
  // ─────────────────────────────────────────────────────────────────────────

  // ORDER 7: Упр. 5 – Попълнете колонките (един/една/много) – плодове (Page 36)
  {
    id: 'l04-ex-05',
    type: 'table_fill',
    title: 'УПРАЖНЕНИЕ 5',
    instruction: 'Попълнете колонките, като използвате думите от списъка. В третата колонка напишете думите в мн.ч.',
    order: 7,
    points: 13,
    paragraphs: [],
    tables: [
      {
        name: 'Плодове — род и множествено число',
        columns: ['един', 'една', 'много'],
        rows: [
          { label: 'банан',    cells: [{ correctAnswers: ['банан'], options: ['банан', '—'] }, { correctAnswers: ['—'], options: ['—', 'банан'] }, { correctAnswers: ['банани'], options: ['банани', 'банана', 'банане'] }] },
          { label: 'лимон',    cells: [{ correctAnswers: ['лимон'], options: ['лимон', '—'] }, { correctAnswers: ['—'], options: ['—', 'лимон'] }, { correctAnswers: ['лимони'], options: ['лимони', 'лимона', 'лимоне'] }] },
          { label: 'портокал', cells: [{ correctAnswers: ['портокал'], options: ['портокал', '—'] }, { correctAnswers: ['—'], options: ['—', 'портокал'] }, { correctAnswers: ['портокали'], options: ['портокали', 'портокала', 'портокале'] }] },
          { label: 'пъпеш',   cells: [{ correctAnswers: ['пъпеш'], options: ['пъпеш', '—'] }, { correctAnswers: ['—'], options: ['—', 'пъпеш'] }, { correctAnswers: ['пъпеши'], options: ['пъпеши', 'пъпеша', 'пъпеше'] }] },
          { label: 'плод',     cells: [{ correctAnswers: ['плод'], options: ['плод', '—'] }, { correctAnswers: ['—'], options: ['—', 'плод'] }, { correctAnswers: ['плодове'], options: ['плодове', 'плоди', 'плода'] }] },
          { label: 'диня',     cells: [{ correctAnswers: ['—'], options: ['—', 'диня'] }, { correctAnswers: ['диня'], options: ['диня', '—'] }, { correctAnswers: ['дини'], options: ['дини', 'динии', 'диние'] }] },
          { label: 'кайсия',   cells: [{ correctAnswers: ['—'], options: ['—', 'кайсия'] }, { correctAnswers: ['кайсия'], options: ['кайсия', '—'] }, { correctAnswers: ['кайсии'], options: ['кайсии', 'кайсие', 'кайсиа'] }] },
          { label: 'круша',    cells: [{ correctAnswers: ['—'], options: ['—', 'круша'] }, { correctAnswers: ['круша'], options: ['круша', '—'] }, { correctAnswers: ['круши'], options: ['круши', 'крушие', 'крушиа'] }] },
          { label: 'слива',    cells: [{ correctAnswers: ['—'], options: ['—', 'слива'] }, { correctAnswers: ['слива'], options: ['слива', '—'] }, { correctAnswers: ['сливи'], options: ['сливи', 'сливие', 'сливиа'] }] },
          { label: 'смокиня',  cells: [{ correctAnswers: ['—'], options: ['—', 'смокиня'] }, { correctAnswers: ['смокиня'], options: ['смокиня', '—'] }, { correctAnswers: ['смокини'], options: ['смокини', 'смокиние', 'смокиниа'] }] },
          { label: 'праскова', cells: [{ correctAnswers: ['—'], options: ['—', 'праскова'] }, { correctAnswers: ['праскова'], options: ['праскова', '—'] }, { correctAnswers: ['праскови'], options: ['праскови', 'прасковие', 'прасковиа'] }] },
          { label: 'ябълка',   cells: [{ correctAnswers: ['—'], options: ['—', 'ябълка'] }, { correctAnswers: ['ябълка'], options: ['ябълка', '—'] }, { correctAnswers: ['ябълки'], options: ['ябълки', 'ябълкие', 'ябълкиа'] }] },
          { label: 'череша',   cells: [{ correctAnswers: ['—'], options: ['—', 'череша'] }, { correctAnswers: ['череша'], options: ['череша', '—'] }, { correctAnswers: ['череши'], options: ['череши', 'черешие', 'черешиа'] }] },
        ],
      },
    ],
  } as TableFillExercise,

  // ORDER 8: Упр. 6 – Напишете какви плодове обичате (Page 36)
  {
    id: 'l04-ex-06',
    type: 'personal_choice',
    title: 'УПРАЖНЕНИЕ 6',
    instruction: 'Кажете какви плодове обичате.',
    order: 8,
    points: 0,
    model: {
      question: 'Обичате ли ябълки?',
      positiveAnswer: 'Да, обичам ябълки.',
      negativeAnswer: 'Не, не обичам ябълки.',
    },
    blankOptions: ['ябълки', 'банани', 'портокали', 'лимони', 'круши', 'праскови', 'череши', 'сливи', 'дини'],
    items: [
      { id: 'q1', question: 'Обичате ли банани?',     positiveTemplate: 'Да, обичам ___.', negativeTemplate: 'Не, не обичам ___.', positiveBlank: 'банани',     negativeBlank: 'банани' },
      { id: 'q2', question: 'Обичате ли портокали?',  positiveTemplate: 'Да, обичам ___.', negativeTemplate: 'Не, не обичам ___.', positiveBlank: 'портокали',  negativeBlank: 'портокали' },
      { id: 'q3', question: 'Обичате ли лимони?',     positiveTemplate: 'Да, обичам ___.', negativeTemplate: 'Не, не обичам ___.', positiveBlank: 'лимони',     negativeBlank: 'лимони' },
      { id: 'q4', question: 'Обичате ли круши?',      positiveTemplate: 'Да, обичам ___.', negativeTemplate: 'Не, не обичам ___.', positiveBlank: 'круши',      negativeBlank: 'круши' },
      { id: 'q5', question: 'Обичате ли праскови?',   positiveTemplate: 'Да, обичам ___.', negativeTemplate: 'Не, не обичам ___.', positiveBlank: 'праскови',   negativeBlank: 'праскови' },
      { id: 'q6', question: 'Обичате ли череши?',     positiveTemplate: 'Да, обичам ___.', negativeTemplate: 'Не, не обичам ___.', positiveBlank: 'череши',     negativeBlank: 'череши' },
    ],
  } as PersonalChoiceExercise,

  // Упр. 7 – SKIP (per client)

  // ORDER 9: НОВИ ДУМИ 3 – ЗЕЛЕНЧУЦИ (Page 36)
  {
    id: 'l04-novi-dumi-03',
    type: 'illustrated_cards',
    title: 'НОВИ ДУМИ 3',
    instruction: 'Запознайте се със зеленчуците. Натиснете за произношение.',
    order: 9,
    cards: [
      { id: 'domat',       imageUrl: '/assets/lesson-04/05-novi-dumi-3-zelenchutsi/01-domat.jpg',       label: 'домат' },
      { id: 'krastavitsa', imageUrl: '/assets/lesson-04/05-novi-dumi-3-zelenchutsi/02-krastavitsa.jpg', label: 'краставица' },
      { id: 'morkov',      imageUrl: '/assets/lesson-04/05-novi-dumi-3-zelenchutsi/03-morkov.jpg',      label: 'морков' },
      { id: 'zele',        imageUrl: '/assets/lesson-04/05-novi-dumi-3-zelenchutsi/04-zele.jpg',        label: 'зеле' },
      { id: 'chushka',     imageUrl: '/assets/lesson-04/05-novi-dumi-3-zelenchutsi/05-chushka.jpg',     label: 'чушка' },
      { id: 'kartof',      imageUrl: '/assets/lesson-04/05-novi-dumi-3-zelenchutsi/06-kartof.jpg',      label: 'картоф' },
      { id: 'tikvichka',   imageUrl: '/assets/lesson-04/05-novi-dumi-3-zelenchutsi/07-tikvichka.jpg',   label: 'тиквичка' },
      { id: 'gaba',        imageUrl: '/assets/lesson-04/05-novi-dumi-3-zelenchutsi/08-gaba.jpg',        label: 'гъба' },
      { id: 'spanak',      imageUrl: '/assets/lesson-04/05-novi-dumi-3-zelenchutsi/09-spanak.jpg',      label: 'спанак' },
      { id: 'marulya',     imageUrl: '/assets/lesson-04/05-novi-dumi-3-zelenchutsi/10-marulya.jpg',     label: 'маруля' },
      { id: 'luk',         imageUrl: '/assets/lesson-04/05-novi-dumi-3-zelenchutsi/11-luk.jpg',         label: 'лук' },
      { id: 'chesun',      imageUrl: '/assets/lesson-04/05-novi-dumi-3-zelenchutsi/12-chesun.jpg',      label: 'чесън' },
    ],
  } as IllustratedCardsExercise,

  // ─────────────────────────────────────────────────────────────────────────
  // СТРАНИЦА 37
  // ─────────────────────────────────────────────────────────────────────────

  // ORDER 10: Упр. 8 – Попълнете колонките (един/една/много) – зеленчуци (Page 37)
  {
    id: 'l04-ex-08',
    type: 'table_fill',
    title: 'УПРАЖНЕНИЕ 8',
    instruction: 'Попълнете колонките, като използвате думите от списъка. В третата колонка напишете думите в мн.ч.',
    order: 10,
    points: 8,
    paragraphs: [],
    tables: [
      {
        name: 'Зеленчуци — род и множествено число',
        columns: ['един', 'една', 'много'],
        rows: [
          { label: 'гъба',        cells: [{ correctAnswers: ['—'], options: ['—', 'гъба'] }, { correctAnswers: ['гъба'], options: ['гъба', '—'] }, { correctAnswers: ['гъби'], options: ['гъби', 'гъбе', 'гъба'] }] },
          { label: 'домат',       cells: [{ correctAnswers: ['домат'], options: ['домат', '—'] }, { correctAnswers: ['—'], options: ['—', 'домат'] }, { correctAnswers: ['домати'], options: ['домати', 'домата', 'домате'] }] },
          { label: 'картоф',      cells: [{ correctAnswers: ['картоф'], options: ['картоф', '—'] }, { correctAnswers: ['—'], options: ['—', 'картоф'] }, { correctAnswers: ['картофи'], options: ['картофи', 'картофа', 'картофе'] }] },
          { label: 'краставица',   cells: [{ correctAnswers: ['—'], options: ['—', 'краставица'] }, { correctAnswers: ['краставица'], options: ['краставица', '—'] }, { correctAnswers: ['краставици'], options: ['краставици', 'краставице', 'краставициа'] }] },
          { label: 'маруля',      cells: [{ correctAnswers: ['—'], options: ['—', 'маруля'] }, { correctAnswers: ['маруля'], options: ['маруля', '—'] }, { correctAnswers: ['марули'], options: ['марули', 'марулие', 'марулиа'] }] },
          { label: 'морков',      cells: [{ correctAnswers: ['морков'], options: ['морков', '—'] }, { correctAnswers: ['—'], options: ['—', 'морков'] }, { correctAnswers: ['моркови'], options: ['моркови', 'моркова', 'морковe'] }] },
          { label: 'тиквичка',    cells: [{ correctAnswers: ['—'], options: ['—', 'тиквичка'] }, { correctAnswers: ['тиквичка'], options: ['тиквичка', '—'] }, { correctAnswers: ['тиквички'], options: ['тиквички', 'тиквичке', 'тиквичкиа'] }] },
          { label: 'чушка',       cells: [{ correctAnswers: ['—'], options: ['—', 'чушка'] }, { correctAnswers: ['чушка'], options: ['чушка', '—'] }, { correctAnswers: ['чушки'], options: ['чушки', 'чушке', 'чушкиа'] }] },
        ],
      },
    ],
  } as TableFillExercise,

  // ORDER 11: Упр. 9 – Напишете какви зеленчуци обичате (Page 37)
  {
    id: 'l04-ex-09',
    type: 'personal_choice',
    title: 'УПРАЖНЕНИЕ 9',
    instruction: 'Кажете какви зеленчуци обичате.',
    order: 11,
    points: 0,
    model: {
      question: 'Обичате ли домати?',
      positiveAnswer: 'Да, обичам домати.',
      negativeAnswer: 'Не, не обичам домати.',
    },
    blankOptions: ['домати', 'краставици', 'моркови', 'картофи', 'чушки', 'тиквички', 'гъби', 'зеле', 'спанак'],
    items: [
      { id: 'q1', question: 'Обичате ли краставици?', positiveTemplate: 'Да, обичам ___.', negativeTemplate: 'Не, не обичам ___.', positiveBlank: 'краставици', negativeBlank: 'краставици' },
      { id: 'q2', question: 'Обичате ли моркови?',    positiveTemplate: 'Да, обичам ___.', negativeTemplate: 'Не, не обичам ___.', positiveBlank: 'моркови',    negativeBlank: 'моркови' },
      { id: 'q3', question: 'Обичате ли картофи?',    positiveTemplate: 'Да, обичам ___.', negativeTemplate: 'Не, не обичам ___.', positiveBlank: 'картофи',    negativeBlank: 'картофи' },
      { id: 'q4', question: 'Обичате ли чушки?',      positiveTemplate: 'Да, обичам ___.', negativeTemplate: 'Не, не обичам ___.', positiveBlank: 'чушки',      negativeBlank: 'чушки' },
      { id: 'q5', question: 'Обичате ли гъби?',       positiveTemplate: 'Да, обичам ___.', negativeTemplate: 'Не, не обичам ___.', positiveBlank: 'гъби',       negativeBlank: 'гъби' },
      { id: 'q6', question: 'Обичате ли спанак?',     positiveTemplate: 'Да, обичам ___.', negativeTemplate: 'Не, не обичам ___.', positiveBlank: 'спанак',     negativeBlank: 'спанак' },
    ],
  } as PersonalChoiceExercise,

  // Упр. 10 – SKIP (per client)

  // ORDER 12: Упр. 11 – Подредете думите в правилните колони (Page 37)
  {
    id: 'l04-ex-11',
    type: 'drag_to_columns',
    instruction: 'Подредете думите в правилните колони.',
    order: 12,
    points: 15,
    items: ['гъби', 'зеле', 'краставици', 'лимони', 'лук', 'моркови', 'портокали', 'праскови', 'сливи', 'смокини', 'спанак', 'тиквички', 'чесън', 'ябълки', 'ягоди'],
    columns: [
      { id: 'plodove',     title: 'ПЛОДОВЕ',    icon: '🍎', correctItems: ['лимони', 'портокали', 'праскови', 'сливи', 'смокини', 'ябълки', 'ягоди'] },
      { id: 'zelenchutsi', title: 'ЗЕЛЕНЧУЦИ',  icon: '🥕', correctItems: ['гъби', 'зеле', 'краставици', 'лук', 'моркови', 'спанак', 'тиквички', 'чесън'] },
    ],
  } as DragToColumnsExercise,

  // ORDER 13: ГРАМАТИКА 1 – какъв/каква/какво/какви (Page 37)
  {
    id: 'l04-gramatika-01',
    type: 'grammar_examples',
    title: 'ГРАМАТИКА 1',
    subtitle: 'Граматика – Видове въпроси (14)',
    instruction: 'Запознайте се с въпросителните думи какъв, каква, какво, какви.',
    order: 13,
    examples: [
      { imageUrl: '', text: '– Какъв чай обичате?', subtext: '– Черен чай. (м.р.)' },
      { imageUrl: '', text: '– Каква пица обичате?', subtext: '– Пица с домати и гъби. (ж.р.)' },
      { imageUrl: '', text: '– Какво месо обичате?', subtext: '– Пилешко и телешко. (ср.р.)' },
      { imageUrl: '', text: '– Какви плодове обичате?', subtext: '– Ябълки и портокали. (мн.ч.)' },
    ],
  } as GrammarExamplesExercise,

  // ORDER 14: Упр. 12 – Отговорете на въпросите (Page 37)
  // Client: user writes a sentence; model "Обичам..." / "Искам..."
  {
    id: 'l04-ex-12',
    type: 'workbook_fill_blank',
    instruction: 'Отговорете на въпросите.',
    order: 14,
    points: 4,
    layout: 'single' as const,
    sentences: [
      {
        text: 'Какво кафе обичате? (късо)\nОбичам _______ кафе.',
        blanks: [1], correctAnswers: ['късо'],
        options: ['късо', 'дълго', 'черно', 'бяло'],
      },
      {
        text: 'Какъв сок обичаш? (от портокал)\nОбичам сок от _______.',
        blanks: [3], correctAnswers: ['портокал'],
        options: ['портокал', 'ябълка', 'домат', 'лимон'],
      },
      {
        text: 'Каква салата искате? (от домати)\nИскам салата от _______.',
        blanks: [3], correctAnswers: ['домати'],
        options: ['домати', 'краставици', 'зеле', 'маруля'],
      },
      {
        text: 'Каква пържола искаш? (пилешка)\nИскам _______ пържола.',
        blanks: [1], correctAnswers: ['пилешка'],
        options: ['пилешка', 'свинска', 'телешка', 'агнешка'],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ─────────────────────────────────────────────────────────────────────────
  // СТРАНИЦА 38
  // ─────────────────────────────────────────────────────────────────────────

  // ORDER 15: Упр. 13 – Разгледайте продуктите в супермаркета (Page 38)
  {
    id: 'l04-ex-13',
    type: 'reading_text',
    title: 'УПРАЖНЕНИЕ 13',
    instruction: 'Разгледайте продуктите в супермаркета и техните цени.',
    order: 15,
    images: [
      { imageUrl: '/assets/lesson-04/06-upr-13-supermarket/supermarket-illustration.jpg', label: 'Супермаркет' },
    ],
    paragraphs: [
      '1. ябълки — 2,00 €/кг\n2. банани — 2,20 €/кг\n3. лимони — 3,00 €/кг\n4. диня — 1,00 €/кг\n5. грозде — 2,50 €/кг',
      '6. краставици — 1,50 €/кг\n7. домати — 1,80 €/кг\n8. лук — 0,80 €/кг\n9. зеле — 0,80 €/кг\n10. картофи — 0,80 €/кг\n11. чушки — 3,00 €/кг',
      '12. хляб — 1,20 €\n13. пиле — 4,00 €/кг\n14. салам — 7,00 €/кг\n15. масло — 3,50 €\n16. сирене — 10,00 €/кг\n17. кашкавал — 12,00 €/кг',
      '18. кисело мляко — 0,90 €\n19. брашно — 0,80 €/кг\n20. олио — 1,60 €/л\n21. оцет — 1,20 €\n22. сладолед — 3,00 €\n23. бисквити — 2,00 €\n24. кока-кола — 1,80 €/л\n25. минерална вода — 0,60 €/л',
    ],
  } as ReadingTextExercise,

  // ORDER 16: ГРАМАТИКА 2 – Бройни числителни 100–1000 (Page 38)
  {
    id: 'l04-gramatika-02',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 2',
    subtitle: 'Граматика – Бройни числителни (1)',
    instruction: 'Запознайте се с числата от 100 до 1000. Натиснете върху ред за произношение.',
    order: 16,
    tableTitle: 'Бройни числителни 100–1000',
    columns: [],
    rows: [
      { pronoun: '100',  cells: ['сто'] },
      { pronoun: '200',  cells: ['двеста'] },
      { pronoun: '300',  cells: ['триста'] },
      { pronoun: '400',  cells: ['четиристотин'] },
      { pronoun: '500',  cells: ['петстотин'] },
      { pronoun: '600',  cells: ['шестстотин'] },
      { pronoun: '700',  cells: ['седемстотин'] },
      { pronoun: '800',  cells: ['осемстотин'] },
      { pronoun: '900',  cells: ['деветстотин'] },
      { pronoun: '1000', cells: ['хиляда'] },
    ],
    notes: [
      '265 – двеста шестдесет и пет',
      '1389 – хиляда триста осемдесет и девет',
    ],
  } as GrammarTableExercise,

  // ORDER 17: Упр. 14 – Свържете числата с думите (Page 38)
  {
    id: 'l04-ex-14',
    type: 'dropdown_match',
    instruction: 'Свържете числата с думите.',
    order: 17,
    points: 6,
    questions: [
      { id: 'q1', left: '105', options: ['сто и пет', 'сто и осемнадесет', 'двеста петдесет и три', 'триста шестдесет и осем', 'петстотин двадесет и две', 'осемстотин тридесет и три'], correctAnswer: 'сто и пет' },
      { id: 'q2', left: '118', options: ['сто и пет', 'сто и осемнадесет', 'двеста петдесет и три', 'триста шестдесет и осем', 'петстотин двадесет и две', 'осемстотин тридесет и три'], correctAnswer: 'сто и осемнадесет' },
      { id: 'q3', left: '368', options: ['сто и пет', 'сто и осемнадесет', 'двеста петдесет и три', 'триста шестдесет и осем', 'петстотин двадесет и две', 'осемстотин тридесет и три'], correctAnswer: 'триста шестдесет и осем' },
      { id: 'q4', left: '253', options: ['сто и пет', 'сто и осемнадесет', 'двеста петдесет и три', 'триста шестдесет и осем', 'петстотин двадесет и две', 'осемстотин тридесет и три'], correctAnswer: 'двеста петдесет и три' },
      { id: 'q5', left: '833', options: ['сто и пет', 'сто и осемнадесет', 'двеста петдесет и три', 'триста шестдесет и осем', 'петстотин двадесет и две', 'осемстотин тридесет и три'], correctAnswer: 'осемстотин тридесет и три' },
      { id: 'q6', left: '522', options: ['сто и пет', 'сто и осемнадесет', 'двеста петдесет и три', 'триста шестдесет и осем', 'петстотин двадесет и две', 'осемстотин тридесет и три'], correctAnswer: 'петстотин двадесет и две' },
    ],
  } as DropdownMatchExercise,

  // ORDER 18: Упр. 15 – Слушайте и напишете числата (Page 38)
  // TODO: needs audio file
  {
    id: 'l04-ex-15',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 15',
    instruction: 'Слушайте и напишете числата.',
    order: 18,
    points: 5,
    layout: 'two-column' as const,
    sentences: [
      { text: '102', blanks: [], correctAnswers: [], isExample: true },
      { text: '_______', blanks: [0], correctAnswers: ['215'], options: ['215', '315', '150', '512', '710'] },
      { text: '_______', blanks: [0], correctAnswers: ['315'], options: ['215', '315', '150', '512', '710'] },
      { text: '_______', blanks: [0], correctAnswers: ['150'], options: ['215', '315', '150', '512', '710'] },
      { text: '_______', blanks: [0], correctAnswers: ['512'], options: ['215', '315', '150', '512', '710'] },
      { text: '_______', blanks: [0], correctAnswers: ['710'], options: ['215', '315', '150', '512', '710'] },
    ],
  } as WorkbookFillBlankExercise,

  // ─────────────────────────────────────────────────────────────────────────
  // СТРАНИЦА 39
  // ─────────────────────────────────────────────────────────────────────────

  // ORDER 19: НОВИ ДУМИ 4 – Мерки и тегла (Page 39)
  {
    id: 'l04-novi-dumi-04',
    type: 'illustrated_cards',
    title: 'НОВИ ДУМИ 4',
    instruction: 'Запознайте се с мерките и теглата. Натиснете за произношение.',
    order: 19,
    cards: [
      { id: '1kg',      imageUrl: '', label: '1 кг = един килограм = едно кило' },
      { id: '05kg',     imageUrl: '', label: '0,5 кг = половин килограм = половин кило' },
      { id: '15kg',     imageUrl: '', label: '1,5 кг = едно кило и половина' },
      { id: '250g',     imageUrl: '', label: '250 гр = четвърт кило = 250 грама' },
      { id: '1l',       imageUrl: '', label: '1 л = един литър' },
      { id: '2l',       imageUrl: '', label: '2 л = два литра' },
      { id: 'butilka',  imageUrl: '/assets/lesson-04/07-novi-dumi-4-merki/01-butilka.jpg', label: 'бутилка' },
      { id: 'paket',    imageUrl: '/assets/lesson-04/07-novi-dumi-4-merki/02-paket.jpg',   label: 'пакет' },
    ],
  } as IllustratedCardsExercise,

  // ORDER 20: Упр. 16 – Отговорете на въпросите (цени от упр. 13) (Page 39)
  {
    id: 'l04-ex-16',
    type: 'dropdown_match',
    instruction: 'Отговорете на въпросите, като използвате информацията от упр. 13.',
    order: 20,
    points: 7,
    questions: [
      { id: 'q1', left: 'Колко струва един пакет бисквити?',      options: ['2,00 €', '0,60 €', '3,00 €', '1,60 €', '0,40 €'], correctAnswer: '2,00 €' },
      { id: 'q2', left: 'Колко струва един литър минерална вода?', options: ['0,60 €', '2,00 €', '3,00 €', '1,60 €', '0,40 €'], correctAnswer: '0,60 €' },
      { id: 'q3', left: 'Колко струва едно кило чушки?',          options: ['3,00 €', '0,60 €', '2,00 €', '1,60 €', '0,40 €'], correctAnswer: '3,00 €' },
      { id: 'q4', left: 'Колко струва една бутилка олио?',        options: ['1,60 €', '0,60 €', '2,00 €', '3,00 €', '0,40 €'], correctAnswer: '1,60 €' },
      { id: 'q5', left: 'Колко струва половин кило картофи?',     options: ['0,40 €', '0,60 €', '2,00 €', '3,00 €', '1,60 €'], correctAnswer: '0,40 €' },
      { id: 'q6', left: 'Колко струва 200 грама сирене?',         options: ['2,00 €', '0,60 €', '0,40 €', '3,00 €', '1,60 €'], correctAnswer: '2,00 €' },
      { id: 'q7', left: 'Колко струва 250 грама кашкавал?',       options: ['3,00 €', '0,60 €', '2,00 €', '0,40 €', '1,60 €'], correctAnswer: '3,00 €' },
    ],
  } as DropdownMatchExercise,

  // ORDER 21: ГРАМАТИКА 3 – Числителното два/две (Page 39)
  {
    id: 'l04-gramatika-03',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 3',
    subtitle: 'Граматика – Число на съществителните (3)',
    instruction: 'Запознайте се с формите два и две.',
    order: 21,
    tableTitle: 'Числителното два / две',
    columns: ['един / една / едно', 'два / две'],
    rows: [
      { pronoun: 'м.р.', cells: ['един лимон',  'два лимона'] },
      { pronoun: 'ж.р.', cells: ['една ябълка', 'две ябълки'] },
      { pronoun: 'ср.р.', cells: ['едно кафе',  'две кафета'] },
    ],
    notes: ['два лимона (бройна форма) ≠ много лимони (мн.ч.)'],
  } as GrammarTableExercise,

  // ORDER 22: Упр. 17 – Подчертайте правилната форма: два или две (Page 39)
  {
    id: 'l04-ex-17',
    type: 'workbook_fill_blank',
    instruction: 'Подчертайте правилната форма: два или две.',
    order: 22,
    points: 12,
    layout: 'two-column' as const,
    sentences: [
      { text: '_______ килограма',  blanks: [0], correctAnswers: ['два'],  options: ['два', 'две'] },
      { text: '_______ портокала',  blanks: [0], correctAnswers: ['два'],  options: ['два', 'две'] },
      { text: '_______ лева',       blanks: [0], correctAnswers: ['два'],  options: ['два', 'две'] },
      { text: '_______ бутилки',    blanks: [0], correctAnswers: ['две'],  options: ['два', 'две'] },
      { text: '_______ дини',       blanks: [0], correctAnswers: ['две'],  options: ['два', 'две'] },
      { text: '_______ картофа',    blanks: [0], correctAnswers: ['два'],  options: ['два', 'две'] },
      { text: '_______ пакета',     blanks: [0], correctAnswers: ['два'],  options: ['два', 'две'] },
      { text: '_______ череши',     blanks: [0], correctAnswers: ['две'],  options: ['два', 'две'] },
      { text: '_______ евроцента',  blanks: [0], correctAnswers: ['два'],  options: ['два', 'две'] },
      { text: '_______ пилета',     blanks: [0], correctAnswers: ['две'],  options: ['два', 'две'] },
      { text: '_______ пъпеша',     blanks: [0], correctAnswers: ['два'],  options: ['два', 'две'] },
      { text: '_______ пици',       blanks: [0], correctAnswers: ['две'],  options: ['два', 'две'] },
    ],
  } as WorkbookFillBlankExercise,

  // ORDER 23: Упр. 18 – Изберете правилната форма: два или две (Page 39)
  {
    id: 'l04-ex-18',
    type: 'workbook_fill_blank',
    instruction: 'Изберете правилната форма: два или две.',
    order: 23,
    points: 13,
    layout: 'two-column' as const,
    sentences: [
      { text: 'два лимона', blanks: [], correctAnswers: [], isExample: true },
      { text: '_______ сладоледа', blanks: [0], correctAnswers: ['два'],  options: ['два', 'две'] },
      { text: '_______ кюфтета',   blanks: [0], correctAnswers: ['две'],  options: ['два', 'две'] },
      { text: '_______ торти',     blanks: [0], correctAnswers: ['две'],  options: ['два', 'две'] },
      { text: '_______ омлета',    blanks: [0], correctAnswers: ['два'],  options: ['два', 'две'] },
      { text: '_______ салати',    blanks: [0], correctAnswers: ['две'],  options: ['два', 'две'] },
      { text: '_______ таратора',  blanks: [0], correctAnswers: ['два'],  options: ['два', 'две'] },
      { text: '_______ шишчета',   blanks: [0], correctAnswers: ['две'],  options: ['два', 'две'] },
      { text: '_______ ябълки',    blanks: [0], correctAnswers: ['две'],  options: ['два', 'две'] },
      { text: '_______ сока',      blanks: [0], correctAnswers: ['два'],  options: ['два', 'две'] },
      { text: '_______ супи',      blanks: [0], correctAnswers: ['две'],  options: ['два', 'две'] },
      { text: '_______ кебапчета', blanks: [0], correctAnswers: ['две'],  options: ['два', 'две'] },
      { text: '_______ млека',     blanks: [0], correctAnswers: ['две'],  options: ['два', 'две'] },
      { text: '_______ хляба',     blanks: [0], correctAnswers: ['два'],  options: ['два', 'две'] },
    ],
  } as WorkbookFillBlankExercise,

  // ORDER 24: Упр. 19 – Свържете колонките (купувам) (Page 39)
  {
    id: 'l04-ex-19',
    type: 'dropdown_match',
    instruction: 'Свържете колонките.',
    order: 24,
    points: 8,
    questions: [
      { id: 'q1', left: 'Аз',  options: ['купувам', 'купуваш', 'купува', 'купуваме', 'купувате', 'купуват'], correctAnswer: 'купувам' },
      { id: 'q2', left: 'Ти',  options: ['купувам', 'купуваш', 'купува', 'купуваме', 'купувате', 'купуват'], correctAnswer: 'купуваш' },
      { id: 'q3', left: 'Той', options: ['купувам', 'купуваш', 'купува', 'купуваме', 'купувате', 'купуват'], correctAnswer: 'купува' },
      { id: 'q4', left: 'Тя',  options: ['купувам', 'купуваш', 'купува', 'купуваме', 'купувате', 'купуват'], correctAnswer: 'купува' },
      { id: 'q5', left: 'То',  options: ['купувам', 'купуваш', 'купува', 'купуваме', 'купувате', 'купуват'], correctAnswer: 'купува' },
      { id: 'q6', left: 'Ние', options: ['купувам', 'купуваш', 'купува', 'купуваме', 'купувате', 'купуват'], correctAnswer: 'купуваме' },
      { id: 'q7', left: 'Вие', options: ['купувам', 'купуваш', 'купува', 'купуваме', 'купувате', 'купуват'], correctAnswer: 'купувате' },
      { id: 'q8', left: 'Те',  options: ['купувам', 'купуваш', 'купува', 'купуваме', 'купувате', 'купуват'], correctAnswer: 'купуват' },
    ],
  } as DropdownMatchExercise,

  // ─────────────────────────────────────────────────────────────────────────
  // СТРАНИЦА 40
  // ─────────────────────────────────────────────────────────────────────────

  // ORDER 25: Упр. 20 – Поставете глагола купувам в правилната форма (Page 40)
  {
    id: 'l04-ex-20',
    type: 'workbook_fill_blank',
    instruction: 'Поставете глагола купувам в правилната форма.',
    order: 25,
    points: 5,
    layout: 'single' as const,
    sentences: [
      { text: 'Тя купува плодове.', blanks: [], correctAnswers: [], isExample: true },
      { text: 'Те _______ банани. (–)',        blanks: [1], correctAnswers: ['не купуват'],  options: ['купувам', 'купуваш', 'купува', 'купуваме', 'купувате', 'купуват', 'не купувам', 'не купуваш', 'не купува', 'не купуваме', 'не купувате', 'не купуват'] },
      { text: 'Ти _______ картофи? (?)',       blanks: [1], correctAnswers: ['купуваш ли'], options: ['купувам ли', 'купуваш ли', 'купува ли', 'купуваме ли', 'купувате ли', 'купуват ли'] },
      { text: 'Аз _______ зеленчуци. (+)',     blanks: [1], correctAnswers: ['купувам'],     options: ['купувам', 'купуваш', 'купува', 'купуваме', 'купувате', 'купуват'] },
      { text: 'Вие _______ телешко месо? (?)', blanks: [1], correctAnswers: ['купувате ли'], options: ['купувам ли', 'купуваш ли', 'купува ли', 'купуваме ли', 'купувате ли', 'купуват ли'] },
      { text: 'Ние _______ смокини. (–)',      blanks: [1], correctAnswers: ['не купуваме'], options: ['купувам', 'купуваш', 'купува', 'купуваме', 'купувате', 'купуват', 'не купувам', 'не купуваш', 'не купува', 'не купуваме', 'не купувате', 'не купуват'] },
    ],
  } as WorkbookFillBlankExercise,

  // ORDER 26: ГРАМАТИКА 4 – Наречия евтино/скъпо (Page 40)
  {
    id: 'l04-gramatika-04',
    type: 'grammar_examples',
    title: 'ГРАМАТИКА 4',
    subtitle: 'Граматика – Наречия (13)',
    instruction: 'Запознайте се с наречията евтино и скъпо.',
    order: 26,
    examples: [
      { imageUrl: '/assets/lesson-04/09-gramatika-4-evtino-skupo/01-kafe-evtino.jpg', text: '1,00 € – Евтино е.', subtext: 'Не е скъпо.' },
      { imageUrl: '/assets/lesson-04/09-gramatika-4-evtino-skupo/02-kafe-skupo.jpg',  text: '2,50 € – Скъпо е.', subtext: 'Не е евтино.' },
      { imageUrl: '/assets/lesson-04/09-gramatika-4-evtino-skupo/03-sirene-skupo.jpg', text: '– Евтино ли е?', subtext: '– Не, не е евтино.' },
      { imageUrl: '/assets/lesson-04/09-gramatika-4-evtino-skupo/04-sirene-ne-skupo.jpg', text: '– Скъпо ли е?', subtext: '– Не, не е скъпо.' },
    ],
  } as GrammarExamplesExercise,

  // ORDER 27: Упр. 21 – Отговорете: да или не (скъпо/евтино) (Page 40)
  // Client: true_false format with (да/не)
  {
    id: 'l04-ex-21',
    type: 'true_false',
    instruction: 'Отговорете на въпросите: да или не.',
    order: 27,
    points: 5,
    sentences: [
      { id: 'model', text: 'Един литър минерална вода — 1,20 €. Скъпо ли е?',   isTrue: true },
      { id: 'q1',    text: 'Един килограм кашкавал — 14 €. Евтино ли е?',        isTrue: false },
      { id: 'q2',    text: 'Една пица — 9 €. Евтино ли е?',                      isTrue: false },
      { id: 'q3',    text: 'Един хляб — 1,80 €. Скъпо ли е?',                    isTrue: true },
      { id: 'q4',    text: 'Едно кисело мляко — 0,70 €. Евтино ли е?',           isTrue: true },
      { id: 'q5',    text: 'Едно кафе — 1 €. Скъпо ли е?',                       isTrue: false },
    ],
  } as TrueFalseExercise,

  // ORDER 28: ДИАЛОЗИ 1 – На пазара (а, б, в, г) (Page 40)
  {
    id: 'l04-dialozi-01',
    type: 'dialogues',
    title: 'ДИАЛОЗИ 1',
    instruction: 'Прочетете диалозите. Натиснете за произношение.',
    audioUrl: '/assets/lesson-04/audio/17-urok-4-dialozi.mp3',
    imageUrl: '/assets/lesson-04/10-dialozi/kartofi-1-50lv.jpg',
    order: 28,
    sections: [
      {
        id: 'а',
        lines: [
          { speaker: 'Клиент',   text: 'Дайте ми едно кило картофи.' },
          { speaker: 'Продавач', text: 'Заповядайте.' },
          { speaker: 'Клиент',   text: 'Колко струва?' },
          { speaker: 'Продавач', text: 'Осемдесет евроцента.' },
          { speaker: 'Клиент',   text: 'Ето, заповядайте.' },
          { speaker: 'Продавач', text: 'Рестото — двадесет евроцента. Благодаря!' },
        ],
      },
      {
        id: 'б',
        lines: [
          { speaker: 'Клиент',   text: 'Искам две кила лимони, моля.' },
          { speaker: 'Продавач', text: 'Заповядайте. Шест евро.' },
          { speaker: 'Клиент',   text: 'Мога ли да платя с карта?' },
          { speaker: 'Продавач', text: 'Да, разбира се.' },
        ],
      },
      {
        id: 'в',
        lines: [
          { speaker: 'Клиент',   text: 'Дайте ми едно кило краставици и две кила праскови.' },
          { speaker: 'Продавач', text: 'Искате ли торбичка?' },
          { speaker: 'Клиент',   text: 'Да, моля.' },
          { speaker: 'Продавач', text: 'Пет евро и двадесет евроцента.' },
          { speaker: 'Клиент',   text: 'Заповядайте, точно.' },
        ],
      },
      {
        id: 'г',
        lines: [
          { speaker: 'Клиент',   text: 'Имате ли ябълки?' },
          { speaker: 'Продавач', text: 'Да, имам. Колко искате?' },
          { speaker: 'Клиент',   text: 'Три кила.' },
          { speaker: 'Продавач', text: 'Искате ли торбичка?' },
          { speaker: 'Клиент',   text: 'Да, моля. Колко е?' },
          { speaker: 'Продавач', text: 'Шест евро.' },
          { speaker: 'Клиент',   text: 'Ето, десет евро.' },
          { speaker: 'Продавач', text: 'Нямате ли дребни?' },
          { speaker: 'Клиент',   text: 'Не, нямам.' },
          { speaker: 'Продавач', text: 'Рестото — четири евро.' },
        ],
      },
    ],
  } as DialoguesExercise,

  // Упр. 22 – SKIP (per client)
  // Упр. 23 – SKIP (per client)

  // ─────────────────────────────────────────────────────────────────────────
  // СТРАНИЦА 41 – ДОПЪЛНИТЕЛНИ УПРАЖНЕНИЯ
  // ─────────────────────────────────────────────────────────────────────────

  // ORDER 29: Упр. 24 – Оградете числата, които чуете (Page 41)
  // TODO: needs audio file — shown as "not yet implemented" until audio is available
  {
    id: 'l04-ex-24',
    type: 'listening',
    title: 'УПРАЖНЕНИЕ 24',
    instruction: 'Оградете числата, които чуете. Ако ги оградите правилно, ще получите буква от азбуката. Коя е тя?',
    order: 29,
    points: 0,
  } as Exercise,

  // Упр. 25 – SKIP (per client)

  // ORDER 30: Упр. 26 – Направете изречения с купувам (Page 41)
  {
    id: 'l04-ex-26',
    type: 'workbook_fill_blank',
    instruction: 'Направете изречения с думите, като поставите глагола купувам в правилната форма.',
    order: 30,
    points: 7,
    layout: 'single' as const,
    sentences: [
      { text: 'Аз купувам ябълки.', blanks: [], correctAnswers: [], isExample: true },
      { text: 'Ти _______ плодове.',    blanks: [1], correctAnswers: ['купуваш'],   options: ['купувам', 'купуваш', 'купува', 'купуваме', 'купувате', 'купуват'] },
      { text: 'Той _______ зеленчуци.', blanks: [1], correctAnswers: ['купува'],    options: ['купувам', 'купуваш', 'купува', 'купуваме', 'купувате', 'купуват'] },
      { text: 'Тя _______ месо.',       blanks: [1], correctAnswers: ['купува'],    options: ['купувам', 'купуваш', 'купува', 'купуваме', 'купувате', 'купуват'] },
      { text: 'То _______ риба.',       blanks: [1], correctAnswers: ['купува'],    options: ['купувам', 'купуваш', 'купува', 'купуваме', 'купувате', 'купуват'] },
      { text: 'Ние _______ домати.',    blanks: [1], correctAnswers: ['купуваме'],  options: ['купувам', 'купуваш', 'купува', 'купуваме', 'купувате', 'купуват'] },
      { text: 'Вие _______ хляб.',      blanks: [1], correctAnswers: ['купувате'],  options: ['купувам', 'купуваш', 'купува', 'купуваме', 'купувате', 'купуват'] },
      { text: 'Те _______ картофи.',    blanks: [1], correctAnswers: ['купуват'],   options: ['купувам', 'купуваш', 'купува', 'купуваме', 'купувате', 'купуват'] },
    ],
  } as WorkbookFillBlankExercise,

  // ORDER 31: Упр. 27 – Какво има в една шопска салата? (Page 41)
  {
    id: 'l04-ex-27',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 27',
    instruction: 'Какво има в една шопска салата?',
    order: 31,
    points: 3,
    layout: 'single' as const,
    sentences: [
      {
        text: 'домати, _______, _______, _______',
        blanks: [1, 2, 3],
        correctAnswers: ['краставици', 'чушки', 'сирене'],
        options: [['краставици', 'моркови', 'картофи', 'гъби'], ['чушки', 'тиквички', 'маслини', 'зеле'], ['сирене', 'кашкавал', 'масло', 'шунка']],
        images: ['/assets/lesson-04/11-upr-27-shopska-salata/shopska-salata.jpg'],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ORDER 32: Упр. 28 – Какво има в едно табуле? (Page 41)
  {
    id: 'l04-ex-28',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 28',
    instruction: 'Какво има в едно табуле?',
    order: 32,
    points: 2,
    layout: 'single' as const,
    sentences: [
      {
        text: 'магданоз, булгур, _______, _______',
        blanks: [2, 3],
        correctAnswers: ['домати', 'лимон'],
        options: [['домати', 'краставици', 'чушки', 'моркови'], ['лимон', 'оцет', 'олио', 'сол']],
        images: ['/assets/lesson-04/12-upr-28-tabule/tabule.jpg'],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ORDER 33: Упр. 29 – Какво има в един борш? (Page 41)
  {
    id: 'l04-ex-29',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 29',
    instruction: 'Какво има в един борш?',
    order: 33,
    points: 3,
    layout: 'single' as const,
    sentences: [
      {
        text: 'зеле, _______, _______, _______',
        blanks: [1, 2, 3],
        correctAnswers: ['картофи', 'моркови', 'домати'],
        options: [['картофи', 'ориз', 'леща', 'боб'], ['моркови', 'краставици', 'чушки', 'тиквички'], ['домати', 'лук', 'чесън', 'спанак']],
        images: ['/assets/lesson-04/13-upr-29-borsh/borsh.jpg'],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ─────────────────────────────────────────────────────────────────────────
  // СТРАНИЦА 42 – ТЕКСТОВЕ
  // ─────────────────────────────────────────────────────────────────────────

  // ORDER 34: Упр. 30 – Прочетете текста (Елена) (Page 42)
  {
    id: 'l04-ex-30',
    type: 'reading_text',
    title: 'ТЕКСТОВЕ',
    instruction: 'Прочетете текста. Извадете непознатите думи и проверете превода им в речника.',
    audioUrl: '/assets/lesson-04/audio/18-urok-4-30.mp3',
    showDictionary: true,
    order: 34,
    images: [
      { imageUrl: '/assets/lesson-04/14-tekstove-snimki/07-yabalki.jpg', label: 'ябълки' },
      { imageUrl: '/assets/lesson-04/14-tekstove-snimki/08-dini.jpg',    label: 'дини' },
      { imageUrl: '/assets/lesson-04/14-tekstove-snimki/09-grozde.jpg',  label: 'грозде' },
    ],
    paragraphs: [
      'Елена купува от супермаркета хляб, кисело и прясно мляко, месо, яйца, маслини, сирене, кашкавал и риба. От пазара купува плодове и зеленчуци. Тя много обича ябълки, праскови, череши, банани. Не обича ягоди. Обича всички зеленчуци без зеле и гъби. Тя яде много плодове и зеленчуци.',
    ],
  } as ReadingTextExercise,

  // ORDER 35: Упр. 31 – Вярно или грешно? (Елена) (Page 42)
  {
    id: 'l04-ex-31',
    type: 'true_false',
    instruction: 'Вярно или грешно?',
    order: 35,
    points: 5,
    sentences: [
      { id: 's1', text: 'Елена купува хляб от супермаркета.',       isTrue: true },
      { id: 's2', text: 'Елена обича ябълки.',                    isTrue: true },
      { id: 's3', text: 'Тя обича всички плодове.',               isTrue: false },
      { id: 's4', text: 'Елена обича зеле и гъби.',               isTrue: false },
      { id: 's5', text: 'Тя яде много плодове и зеленчуци.',     isTrue: true },
    ],
  } as TrueFalseExercise,

  // ORDER 36: Упр. 32 – Отговорете на въпросите (Елена) (Page 42)
  {
    id: 'l04-ex-32',
    type: 'dropdown_match',
    instruction: 'Отговорете на въпросите.',
    order: 36,
    points: 3,
    questions: [
      { id: 'q1', left: 'Откъде купува Елена храна?', options: ['От супермаркета и от пазара.', 'Само от супермаркета.', 'Само от пазара.', 'От ресторанта.'], correctAnswer: 'От супермаркета и от пазара.' },
      { id: 'q2', left: 'Какво купува от пазара?',     options: ['Плодове и зеленчуци.', 'Хляб и мляко.', 'Месо и риба.', 'Сирене и кашкавал.'], correctAnswer: 'Плодове и зеленчуци.' },
      { id: 'q3', left: 'Какви зеленчуци не обича?',   options: ['Зеле и гъби.', 'Домати и краставици.', 'Моркови и картофи.', 'Чушки и лук.'], correctAnswer: 'Зеле и гъби.' },
    ],
  } as DropdownMatchExercise,

  // ORDER 37: Упр. 33 – Прочетете текста (Юлия) (Page 42)
  {
    id: 'l04-ex-33',
    type: 'reading_text',
    instruction: 'Прочетете текста. Извадете непознатите думи и проверете превода им в речника.',
    audioUrl: '/assets/lesson-04/audio/19-urok-4-33.mp3',
    showDictionary: true,
    order: 37,
    images: [
      { imageUrl: '/assets/lesson-04/14-tekstove-snimki/01-domati.jpg',     label: 'домати' },
      { imageUrl: '/assets/lesson-04/14-tekstove-snimki/02-morkovi.jpg',    label: 'моркови' },
      { imageUrl: '/assets/lesson-04/14-tekstove-snimki/03-krastavitsi.jpg', label: 'краставици' },
    ],
    paragraphs: [
      'За закуска Юлия яде плодове, сандвич със сирене, домати и маслини или филия с масло и сладко от череши. Пие кафе с мляко без захар. Тя обядва салата и супа или спагети със зеленчуци. Пие минерална вода или сок от портокал. Юлия вечеря риба с пържени картофи или пица със зеленчуци и пие газирана вода.',
    ],
  } as ReadingTextExercise,

  // ORDER 38: Упр. 34 – Довършете изреченията (Юлия) (Page 42)
  {
    id: 'l04-ex-34',
    type: 'workbook_fill_blank',
    instruction: 'Довършете изреченията.',
    order: 38,
    points: 6,
    layout: 'single' as const,
    sentences: [
      { text: 'За закуска Юлия пие _______.',  blanks: [4], correctAnswers: ['кафе с мляко без захар'],                      options: ['кафе с мляко без захар', 'минерална вода или сок от портокал', 'газирана вода'] },
      { text: 'Юлия закусва _______.',          blanks: [2], correctAnswers: ['плодове, сандвич със сирене, домати и маслини'], options: ['плодове, сандвич със сирене, домати и маслини', 'салата и супа', 'риба с пържени картофи'] },
      { text: 'За обяд Юлия пие _______.',      blanks: [4], correctAnswers: ['минерална вода или сок от портокал'],            options: ['кафе с мляко без захар', 'минерална вода или сок от портокал', 'газирана вода'] },
      { text: 'Юлия обядва _______.',            blanks: [2], correctAnswers: ['салата и супа или спагети със зеленчуци'],       options: ['салата и супа или спагети със зеленчуци', 'плодове, сандвич със сирене', 'риба с пържени картофи или пица'] },
      { text: 'За вечеря Юлия пие _______.',    blanks: [4], correctAnswers: ['газирана вода'],                                options: ['кафе с мляко без захар', 'минерална вода или сок от портокал', 'газирана вода'] },
      { text: 'Юлия вечеря _______.',            blanks: [2], correctAnswers: ['риба с пържени картофи или пица със зеленчуци'], options: ['риба с пържени картофи или пица със зеленчуци', 'салата и супа', 'плодове, сандвич със сирене'] },
    ],
  } as WorkbookFillBlankExercise,

  // ─────────────────────────────────────────────────────────────────────────
  // СТРАНИЦА 43 – ОТ ПЪРВО ЛИЦЕ
  // ─────────────────────────────────────────────────────────────────────────

  // ORDER 39: Упр. 35 – Прочетете текста (Карим) (Page 43)
  {
    id: 'l04-ex-35',
    type: 'reading_text',
    title: 'ОТ ПЪРВО ЛИЦЕ',
    instruction: 'Прочетете текста. Извадете непознатите думи и проверете превода им в речника.',
    audioUrl: '/assets/lesson-04/audio/20-urok-4-35.mp3',
    showDictionary: true,
    order: 39,
    images: [
      { imageUrl: '/assets/lesson-04/14-tekstove-snimki/04-chesun.jpg',   label: 'чесън' },
      { imageUrl: '/assets/lesson-04/14-tekstove-snimki/05-magdanoz.jpg', label: 'магданоз' },
      { imageUrl: '/assets/lesson-04/14-tekstove-snimki/06-luk.jpg',      label: 'лук' },
    ],
    paragraphs: [
      'Аз съм Карим от Ирак. Обичам арабска храна. Ние ядем много месо – агнешко, пилешко и риба. Не ядем свинско месо. Обичаме също много ориз, нахут, боб, леща и яхнии от различни зеленчуци със или без месо. Имаме едно много вкусно арабско ядене. Казва се долма, а на български – сарми или пълнени зеленчуци с ориз и кайма. Често след ядене пием кафе или черен чай със захар.',
    ],
  } as ReadingTextExercise,

  // ORDER 40: Упр. 36 – Вярно или грешно? (Карим) (Page 43)
  {
    id: 'l04-ex-36',
    type: 'true_false',
    instruction: 'Вярно или грешно?',
    order: 40,
    points: 7,
    sentences: [
      { id: 's1', text: 'Карим е от Ирак.',                          isTrue: true },
      { id: 's2', text: 'Той обича арабска храна.',                    isTrue: true },
      { id: 's3', text: 'Арабите не ядат много месо.',                 isTrue: false },
      { id: 's4', text: 'Те не ядат свинско месо.',                    isTrue: true },
      { id: 's5', text: 'Арабите ядат много ориз и нахут.',            isTrue: true },
      { id: 's6', text: 'Няма яхнии без месо.',                        isTrue: false },
      { id: 's7', text: 'Арабите пият кафе или черен чай след ядене.', isTrue: true },
    ],
  } as TrueFalseExercise,

  // ORDER 41: Упр. 37 – Прочетете текста (арабски ресторанти) (Page 43)
  {
    id: 'l04-ex-37',
    type: 'reading_text',
    instruction: 'Прочетете текста. Извадете непознатите думи и проверете превода им в речника.',
    audioUrl: '/assets/lesson-04/audio/21-urok-4-37.mp3',
    showDictionary: true,
    order: 41,
    images: [
      { imageUrl: '/assets/lesson-04/15-ot-parvo-litse-upr-37/dyuner-maker.jpg', label: 'дюнер' },
    ],
    paragraphs: [
      'В България има арабски ресторанти. Там има вкусна арабска храна – салата табуле, супа леща, шиш, арабски хляб. Българите много обичат дюнери – от пилешко и телешко месо, с пържени картофи, салата и сос. Обичат и арабски десерти – баклава, локум, курабии. В България и Ирак ядат печено агнешко и пилешко със зеленчуци. Пият много чай, кафе и айрян, но в България има боза, а в Ирак няма.',
    ],
  } as ReadingTextExercise,

  // ORDER 42: Упр. 38 – Отговорете на въпросите (арабски ресторанти) (Page 43)
  {
    id: 'l04-ex-38',
    type: 'dropdown_match',
    instruction: 'Отговорете на въпросите.',
    order: 42,
    points: 7,
    questions: [
      { id: 'q1', left: 'Има ли арабски ресторанти в България?', options: ['Да, има.', 'Не, няма.'], correctAnswer: 'Да, има.' },
      { id: 'q2', left: 'Каква храна има там?',                 options: ['Салата табуле, супа леща, шиш, арабски хляб.', 'Шопска салата и баница.', 'Пица и макарони.'], correctAnswer: 'Салата табуле, супа леща, шиш, арабски хляб.' },
      { id: 'q3', left: 'Обичат ли българите дюнери?',           options: ['Да, много обичат.', 'Не, не обичат.'], correctAnswer: 'Да, много обичат.' },
      { id: 'q4', left: 'Обичат ли арабски десерти?',            options: ['Да, обичат баклава, локум, курабии.', 'Не, не обичат.'], correctAnswer: 'Да, обичат баклава, локум, курабии.' },
      { id: 'q5', left: 'Какво ядат в България и Ирак?',         options: ['Печено агнешко и пилешко със зеленчуци.', 'Свинско месо.', 'Само зеленчуци.'], correctAnswer: 'Печено агнешко и пилешко със зеленчуци.' },
      { id: 'q6', left: 'В България има ли айрян?',              options: ['Да, има.', 'Не, няма.'], correctAnswer: 'Да, има.' },
      { id: 'q7', left: 'В Ирак има ли боза?',                  options: ['Не, няма.', 'Да, има.'], correctAnswer: 'Не, няма.' },
    ],
  } as DropdownMatchExercise,

];

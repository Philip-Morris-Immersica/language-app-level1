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
    instruction: 'Изберете думите под картинките.',
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
    instruction: '',
    order: 2,
    cards: [
      { id: 'riba',          imageUrl: '/assets/lesson-04/02-novi-dumi-1-meso-hrani/01-riba.jpg',          label: 'риба',          translations: { en: 'fish', ar: 'سمك', fr: 'poisson', fa: 'ماهی', uk: 'риба', ru: 'рыба' } },
      { id: 'pile',          imageUrl: '/assets/lesson-04/02-novi-dumi-1-meso-hrani/02-pile.jpg',          label: 'пиле',          translations: { en: 'chicken', ar: 'دجاج', fr: 'poulet', fa: 'مرغ', uk: 'курка', ru: 'курица' } },
      { id: 'pileshko-meso', imageUrl: '/assets/lesson-04/02-novi-dumi-1-meso-hrani/03-pileshko-meso.jpg', label: 'пилешко месо',  translations: { en: 'chicken meat', ar: 'لحم دجاج', fr: 'viande de poulet', fa: 'گوشت مرغ', uk: 'куряче м\'ясо', ru: 'куриное мясо' } },
      { id: 'teleshko-meso', imageUrl: '/assets/lesson-04/02-novi-dumi-1-meso-hrani/04-teleshko-meso.jpg', label: 'телешко месо',  translations: { en: 'veal', ar: 'لحم عجل', fr: 'viande de veau', fa: 'گوشت گوساله', uk: 'теляче м\'ясо', ru: 'телятина' } },
      { id: 'svinsko-meso',  imageUrl: '/assets/lesson-04/02-novi-dumi-1-meso-hrani/05-svinsko-meso.jpg',  label: 'свинско месо',  translations: { en: 'pork', ar: 'لحم خنزير', fr: 'viande de porc', fa: 'گوشت خوک', uk: 'свинина', ru: 'свинина' } },
      { id: 'shunka',        imageUrl: '/assets/lesson-04/02-novi-dumi-1-meso-hrani/06-shunka.jpg',        label: 'шунка',         translations: { en: 'ham', ar: 'لحم مقدد', fr: 'jambon', fa: 'ژامبون', uk: 'шинка', ru: 'ветчина' } },
      { id: 'bob',           imageUrl: '/assets/lesson-04/exercise-05-nov-images/bob.png',           label: 'боб',           translations: { en: 'beans', ar: 'فاصوليا', fr: 'haricots', fa: 'لوبیا', uk: 'квасоля', ru: 'фасоль' } },
      { id: 'oriz',          imageUrl: '/assets/lesson-04/exercise-05-nov-images/oriz.png',          label: 'ориз',          translations: { en: 'rice', ar: 'أرز', fr: 'riz', fa: 'برنج', uk: 'рис', ru: 'рис' } },
      { id: 'leshta',        imageUrl: '/assets/lesson-04/exercise-05-nov-images/leshta.png',        label: 'леща',          translations: { en: 'lentils', ar: 'عدس', fr: 'lentilles', fa: 'عدس', uk: 'сочевиця', ru: 'чечевица' } },
      { id: 'brashno',       imageUrl: '/assets/lesson-04/02-novi-dumi-1-meso-hrani/10-brashno.jpg',       label: 'брашно',        translations: { en: 'flour', ar: 'دقيق', fr: 'farine', fa: 'آرد', uk: 'борошно', ru: 'мука' } },
      { id: 'grah',          imageUrl: '/assets/lesson-04/02-novi-dumi-1-meso-hrani/11-grah.jpg',          label: 'грах',          translations: { en: 'peas', ar: 'بازلاء', fr: 'pois', fa: 'نخود فرنگی', uk: 'горох', ru: 'горох' } },
      { id: 'maslini',       imageUrl: '/assets/lesson-04/02-novi-dumi-1-meso-hrani/12-maslini.jpg',       label: 'маслини',       translations: { en: 'olives', ar: 'زيتون', fr: 'olives', fa: 'زیتون', uk: 'маслини', ru: 'оливки' } },
      { id: 'biskviti',      imageUrl: '/assets/lesson-04/02-novi-dumi-1-meso-hrani/13-biskviti.jpg',      label: 'бисквити',      translations: { en: 'biscuits', ar: 'بسكويت', fr: 'biscuits', fa: 'بیسکویت', uk: 'печиво', ru: 'печенье' } },
      { id: 'bonboni',       imageUrl: '/assets/lesson-04/02-novi-dumi-1-meso-hrani/14-bonboni.jpg',       label: 'бонбони',       translations: { en: 'candies', ar: 'حلوى', fr: 'bonbons', fa: 'آبنبات', uk: 'цукерки', ru: 'конфеты' } },
      { id: 'yadki',         imageUrl: '/assets/lesson-04/02-novi-dumi-1-meso-hrani/15-yadki.jpg',         label: 'ядки',          translations: { en: 'nuts', ar: 'مكسرات', fr: 'noix', fa: 'آجیل', uk: 'горіхи', ru: 'орехи' } },
      { id: 'sol',           imageUrl: '/assets/lesson-04/02-novi-dumi-1-meso-hrani/16-sol.jpg',           label: 'сол',           translations: { en: 'salt', ar: 'ملح', fr: 'sel', fa: 'نمک', uk: 'сіль', ru: 'соль' } },
      { id: 'olio',          imageUrl: '/assets/lesson-04/02-novi-dumi-1-meso-hrani/17-olio.jpg',          label: 'олио',          translations: { en: 'sunflower oil', ar: 'زيت', fr: 'huile', fa: 'روغن', uk: 'олія', ru: 'масло растительное' } },
      { id: 'otset',         imageUrl: '/assets/lesson-04/02-novi-dumi-1-meso-hrani/18-otset.jpg',         label: 'оцет',          translations: { en: 'vinegar', ar: 'خل', fr: 'vinaigre', fa: 'سرکه', uk: 'оцет', ru: 'уксус' } },
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
    instruction: 'Намерете скритите думи в таблицата.',
    order: 4,
    points: 11,
    letterString: 'пилешкомесомаслинисолзахароцетлещабоббонбонишункаориз',
    correctWords: ['пилешко', 'месо', 'маслини', 'сол', 'захар', 'оцет', 'леща', 'боб', 'бонбони', 'шунка', 'ориз'],
    hiddenWords: ['ПИЛЕШКО', 'МЕСО', 'МАСЛИНИ', 'СОЛ', 'ЗАХАР', 'ОЦЕТ', 'ЛЕЩА', 'БОБ', 'БОНБОНИ', 'ШУНКА', 'ОРИЗ'],
    allowDiagonal: true,
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
        images: ['/assets/lesson-04/exercise-05-nov-images/bob.png'],
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
        images: ['/assets/lesson-04/03-upr-04-model/01-shunka-thumb.jpg'],
      },
      {
        text: 'Тя обядва _______.',
        blanks: [2], correctAnswers: ['леща'],
        options: ['риба', 'грах', 'маслини', 'шунка', 'леща', 'ориз'],
        images: ['/assets/lesson-04/exercise-05-nov-images/leshta.png'],
      },
      {
        text: 'Тя не обича супа от _______.',
        blanks: [5], correctAnswers: ['ориз'],
        options: ['риба', 'грах', 'маслини', 'шунка', 'леща', 'ориз'],
        images: ['/assets/lesson-04/exercise-05-nov-images/oriz.png'],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ORDER 6: НОВИ ДУМИ 2 – ПЛОДОВЕ (Page 35)
  {
    id: 'l04-novi-dumi-02',
    type: 'illustrated_cards',
    title: 'НОВИ ДУМИ 2',
    instruction: '',
    order: 6,
    cards: [
      { id: 'yabalka',   imageUrl: '/assets/lesson-04/04-novi-dumi-2-plodove/01-yabalka.jpg',   label: 'ябълка',    translations: { en: 'apple', ar: 'تفاحة', fr: 'pomme', fa: 'سیب', uk: 'яблуко', ru: 'яблоко' } },
      { id: 'krusha',    imageUrl: '/assets/lesson-04/04-novi-dumi-2-plodove/02-krusha.jpg',    label: 'круша',     translations: { en: 'pear', ar: 'كمثرى', fr: 'poire', fa: 'گلابی', uk: 'груша', ru: 'груша' } },
      { id: 'yagoda',    imageUrl: '/assets/lesson-04/04-novi-dumi-2-plodove/03-yagoda.jpg',    label: 'ягода',     translations: { en: 'strawberry', ar: 'فراولة', fr: 'fraise', fa: 'توت‌فرنگی', uk: 'полуниця', ru: 'клубника' } },
      { id: 'cheresha',  imageUrl: '/assets/lesson-04/04-novi-dumi-2-plodove/04-cheresha.jpg',  label: 'череша',    translations: { en: 'cherry', ar: 'كرز', fr: 'cerise', fa: 'گیلاس', uk: 'черешня', ru: 'черешня' } },
      { id: 'sliva',     imageUrl: '/assets/lesson-04/04-novi-dumi-2-plodove/05-sliva.jpg',     label: 'слива',     translations: { en: 'plum', ar: 'برقوق', fr: 'prune', fa: 'آلو', uk: 'слива', ru: 'слива' } },
      { id: 'praskova',  imageUrl: '/assets/lesson-04/04-novi-dumi-2-plodove/06-praskova.jpg',  label: 'праскова',  translations: { en: 'peach', ar: 'خوخ', fr: 'pêche', fa: 'هلو', uk: 'персик', ru: 'персик' } },
      { id: 'kaysiya',   imageUrl: '/assets/lesson-04/04-novi-dumi-2-plodove/07-kaisiya.jpg',   label: 'кайсия',    translations: { en: 'apricot', ar: 'مشمش', fr: 'abricot', fa: 'زردآلو', uk: 'абрикос', ru: 'абрикос' } },
      { id: 'grozde',    imageUrl: '/assets/lesson-04/04-novi-dumi-2-plodove/08-grozde.jpg',    label: 'грозде',    translations: { en: 'grapes', ar: 'عنب', fr: 'raisin', fa: 'انگور', uk: 'виноград', ru: 'виноград' } },
      { id: 'papesh',    imageUrl: '/assets/lesson-04/04-novi-dumi-2-plodove/09-papesh.jpg',    label: 'пъпеш',     translations: { en: 'melon', ar: 'شمام', fr: 'melon', fa: 'طالبی', uk: 'диня', ru: 'дыня' } },
      { id: 'dinya',     imageUrl: '/assets/lesson-04/04-novi-dumi-2-plodove/10-dinya.jpg',     label: 'диня',      translations: { en: 'watermelon', ar: 'بطيخ', fr: 'pastèque', fa: 'هندوانه', uk: 'кавун', ru: 'арбуз' } },
      { id: 'banan',     imageUrl: '/assets/lesson-04/04-novi-dumi-2-plodove/11-banan.jpg',     label: 'банан',     translations: { en: 'banana', ar: 'موز', fr: 'banane', fa: 'موز', uk: 'банан', ru: 'банан' } },
      { id: 'limon',     imageUrl: '/assets/lesson-04/04-novi-dumi-2-plodove/12-limon.jpg',     label: 'лимон',     translations: { en: 'lemon', ar: 'ليمون', fr: 'citron', fa: 'لیمو', uk: 'лимон', ru: 'лимон' } },
      { id: 'portokal',  imageUrl: '/assets/lesson-04/04-novi-dumi-2-plodove/13-portokal.jpg',  label: 'портокал',  translations: { en: 'orange', ar: 'برتقال', fr: 'orange', fa: 'پرتقال', uk: 'апельсин', ru: 'апельсин' } },
      { id: 'greypfrut', imageUrl: '/assets/lesson-04/04-novi-dumi-2-plodove/14-greipfrut.jpg', label: 'грейпфрут', translations: { en: 'grapefruit', ar: 'جريب فروت', fr: 'pamplemousse', fa: 'گریپ‌فروت', uk: 'грейпфрут', ru: 'грейпфрут' } },
      { id: 'smokinya',  imageUrl: '/assets/lesson-04/04-novi-dumi-2-plodove/15-smokinya.jpg',  label: 'смокиня',   translations: { en: 'fig', ar: 'تين', fr: 'figue', fa: 'انجیر', uk: 'інжір', ru: 'инжир' } },
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
    instruction: 'Изберете "един" или "една" и попълнете множественото число на думата.',
    order: 7,
    points: 13,
    paragraphs: [],
    tables: [
      {
        name: 'Плодове — род и множествено число',
        columns: ['един', 'една', 'много'],
        rows: [
          { label: 'банан',    cells: [{ correctAnswers: ['банан'], options: ['банан', '—'] }, { correctAnswers: ['—'], options: ['—', 'банан'] }, { correctAnswers: ['банани'], options: ['банани', 'банана', 'банане'] }] },
          { label: 'кайсия',   cells: [{ correctAnswers: ['—'], options: ['—', 'кайсия'] }, { correctAnswers: ['кайсия'], options: ['кайсия', '—'] }, { correctAnswers: ['кайсии'], options: ['кайсии', 'кайсие', 'кайсиа'] }] },
          { label: 'лимон',    cells: [{ correctAnswers: ['лимон'], options: ['лимон', '—'] }, { correctAnswers: ['—'], options: ['—', 'лимон'] }, { correctAnswers: ['лимони'], options: ['лимони', 'лимона', 'лимоне'] }] },
          { label: 'круша',    cells: [{ correctAnswers: ['—'], options: ['—', 'круша'] }, { correctAnswers: ['круша'], options: ['круша', '—'] }, { correctAnswers: ['круши'], options: ['круши', 'крушие', 'крушиа'] }] },
          { label: 'портокал', cells: [{ correctAnswers: ['портокал'], options: ['портокал', '—'] }, { correctAnswers: ['—'], options: ['—', 'портокал'] }, { correctAnswers: ['портокали'], options: ['портокали', 'портокала', 'портокале'] }] },
          { label: 'слива',    cells: [{ correctAnswers: ['—'], options: ['—', 'слива'] }, { correctAnswers: ['слива'], options: ['слива', '—'] }, { correctAnswers: ['сливи'], options: ['сливи', 'сливие', 'сливиа'] }] },
          { label: 'пъпеш',   cells: [{ correctAnswers: ['пъпеш'], options: ['пъпеш', '—'] }, { correctAnswers: ['—'], options: ['—', 'пъпеш'] }, { correctAnswers: ['пъпеши'], options: ['пъпеши', 'пъпеша', 'пъпеше'] }] },
          { label: 'диня',     cells: [{ correctAnswers: ['—'], options: ['—', 'диня'] }, { correctAnswers: ['диня'], options: ['диня', '—'] }, { correctAnswers: ['дини'], options: ['дини', 'динии', 'диние'] }] },
          { label: 'плод',     cells: [{ correctAnswers: ['плод'], options: ['плод', '—'] }, { correctAnswers: ['—'], options: ['—', 'плод'] }, { correctAnswers: ['плодове'], options: ['плодове', 'плоди', 'плода'] }] },
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
    instruction: '',
    order: 9,
    cards: [
      { id: 'domat',       imageUrl: '/assets/lesson-04/05-novi-dumi-3-zelenchutsi/01-domat.jpg',       label: 'домат',       translations: { en: 'tomato', ar: 'طماطم', fr: 'tomate', fa: 'گوجه‌فرنگی', uk: 'помідор', ru: 'помидор' } },
      { id: 'krastavitsa', imageUrl: '/assets/lesson-04/05-novi-dumi-3-zelenchutsi/02-krastavitsa.jpg', label: 'краставица',  translations: { en: 'cucumber', ar: 'خيار', fr: 'concombre', fa: 'خیار', uk: 'огірок', ru: 'огурец' } },
      { id: 'morkov',      imageUrl: '/assets/lesson-04/05-novi-dumi-3-zelenchutsi/03-morkov.jpg',      label: 'морков',      translations: { en: 'carrot', ar: 'جزر', fr: 'carotte', fa: 'هویج', uk: 'морква', ru: 'морковь' } },
      { id: 'zele',        imageUrl: '/assets/lesson-04/05-novi-dumi-3-zelenchutsi/04-zele.jpg',        label: 'зеле',        translations: { en: 'cabbage', ar: 'ملفوف', fr: 'chou', fa: 'کلم', uk: 'капуста', ru: 'капуста' } },
      { id: 'chushka',     imageUrl: '/assets/lesson-04/05-novi-dumi-3-zelenchutsi/05-chushka.jpg',     label: 'чушка',       translations: { en: 'pepper', ar: 'فلفل', fr: 'poivron', fa: 'فلفل دلمه‌ای', uk: 'перець', ru: 'перец' } },
      { id: 'kartof',      imageUrl: '/assets/lesson-04/05-novi-dumi-3-zelenchutsi/06-kartof.jpg',      label: 'картоф',      translations: { en: 'potato', ar: 'بطاطس', fr: 'pomme de terre', fa: 'سیب‌زمینی', uk: 'картопля', ru: 'картофель' } },
      { id: 'tikvichka',   imageUrl: '/assets/lesson-04/05-novi-dumi-3-zelenchutsi/07-tikvichka.jpg',   label: 'тиквичка',    translations: { en: 'zucchini', ar: 'كوسا', fr: 'courgette', fa: 'کدو سبز', uk: 'кабачок', ru: 'кабачок' } },
      { id: 'gaba',        imageUrl: '/assets/lesson-04/05-novi-dumi-3-zelenchutsi/08-gaba.jpg',        label: 'гъба',        translations: { en: 'mushroom', ar: 'فطر', fr: 'champignon', fa: 'قارچ', uk: 'гриб', ru: 'гриб' } },
      { id: 'spanak',      imageUrl: '/assets/lesson-04/05-novi-dumi-3-zelenchutsi/09-spanak.jpg',      label: 'спанак',      translations: { en: 'spinach', ar: 'سبانخ', fr: 'épinard', fa: 'اسفناج', uk: 'шпинат', ru: 'шпинат' } },
      { id: 'marulya',     imageUrl: '/assets/lesson-04/05-novi-dumi-3-zelenchutsi/10-marulya.jpg',     label: 'маруля',      translations: { en: 'lettuce', ar: 'خس', fr: 'laitue', fa: 'کاهو', uk: 'салат', ru: 'салат' } },
      { id: 'luk',         imageUrl: '/assets/lesson-04/05-novi-dumi-3-zelenchutsi/11-luk.jpg',         label: 'лук',         translations: { en: 'onion', ar: 'بصل', fr: 'oignon', fa: 'پیاز', uk: 'цибуля', ru: 'лук' } },
      { id: 'chesan',      imageUrl: '/assets/lesson-04/05-novi-dumi-3-zelenchutsi/12-chesun.jpg',      label: 'чесън',       translations: { en: 'garlic', ar: 'ثوم', fr: 'ail', fa: 'سیر', uk: 'часник', ru: 'чеснок' } },
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
    instruction: 'Изберете "един" или "една" и попълнете множественото число на думата.',
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
    instruction: 'Поставете думите в правилната колона.',
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
    instructionKey: 'grammar.l04.g1.instruction',
    type: 'grammar_examples',
    title: 'ГРАМАТИКА 1',
    subtitle: 'Граматика – Видове въпроси (14)',
    instruction: 'Запознайте се с въпросителните думи какъв, каква, какво, какви.',
    order: 13,
    examples: [
      { imageUrl: '', text: 'Какъв чай обичате?', subtext: 'Черен чай.', label: 'Какъв — мъжки род' },
      { imageUrl: '', text: 'Каква пица обичате?', subtext: 'Пица с домати и гъби.', label: 'Каква — женски род' },
      { imageUrl: '', text: 'Какво месо обичате?', subtext: 'Пилешко и телешко.', label: 'Какво — среден род' },
      { imageUrl: '', text: 'Какви плодове обичате?', subtext: 'Ябълки и портокали.', label: 'Какви — множествено число' },
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

  // ORDER 19: Упр. 13 – Разгледайте продуктите в супермаркета (Page 38)
  {
    id: 'l04-ex-13',
    type: 'reading_text',
    title: 'УПРАЖНЕНИЕ 13',
    instruction: 'Разгледайте продуктите в супермаркета и техните цени. Натиснете върху абзац, за да чуете произношението.',
    order: 19,
    images: [
      { imageUrl: '/assets/lesson-04/06-upr-13-supermarket/supermarket-illustration.jpg', label: 'Супермаркет' },
    ],
    paragraphs: [
      'ябълки — 2,00 €/кг. банани — 2,20 €/кг. лимони — 3,00 €/кг. диня — 1,00 €/кг. грозде — 2,50 €/кг.',
      'краставици — 1,50 €/кг. домати — 1,80 €/кг. лук — 0,80 €/кг. зеле — 0,80 €/кг. картофи — 0,80 €/кг. чушки — 3,00 €/кг.',
      'хляб — 1,20 €. пиле — 4,00 €/кг. салам — 7,00 €/кг. масло — 3,50 €. сирене — 10,00 €/кг. кашкавал — 12,00 €/кг.',
      'кисело мляко — 0,90 €. брашно — 0,80 €/кг. олио — 1,60 €/л. оцет — 1,20 €. сладолед — 3,00 €. бисквити — 2,00 €. кока-кола — 1,80 €/л. минерална вода — 0,60 €/л.',
    ],
    ttsParagraphs: [
      'ябълки — две евро за килограм. банани — две евро и двадесет цента за килограм. лимони — три евро за килограм. диня — едно евро за килограм. грозде — две евро и петдесет цента за килограм.',
      'краставици — едно евро и петдесет цента за килограм. домати — едно евро и осемдесет цента за килограм. лук — осемдесет цента за килограм. зеле — осемдесет цента за килограм. картофи — осемдесет цента за килограм. чушки — три евро за килограм.',
      'хляб — едно евро и двадесет цента. пиле — четири евро за килограм. салам — седем евро за килограм. масло — три евро и петдесет цента. сирене — десет евро за килограм. кашкавал — дванадесет евро за килограм.',
      'кисело мляко — деветдесет цента. брашно — осемдесет цента за килограм. олио — едно евро и шестдесет цента за литър. оцет — едно евро и двадесет цента. сладолед — три евро. бисквити — две евро. кока-кола — едно евро и осемдесет цента за литър. минерална вода — шестдесет цента за литър.',
    ],
  } as ReadingTextExercise,

  // ORDER 15: ГРАМАТИКА 2 – Бройни числителни 100–1000 (Page 38)
  {
    id: 'l04-gramatika-02',
    instructionKey: 'grammar.l04.g2.instruction',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 2',
    subtitle: 'Граматика – Бройни числителни (1)',
    instruction: 'Запознайте се с числата от 100 до 1000.',
    order: 15,
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
    ttsNotes: [
      'двеста шестдесет и пет',
      'хиляда триста осемдесет и девет',
    ],
  } as GrammarTableExercise,

  // ORDER 16: Упр. 14 – Свържете числата с думите (Page 38)
  {
    id: 'l04-ex-14',
    type: 'dropdown_match',
    instruction: 'Свържете числата с думите.',
    order: 16,
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

  // ORDER 24.5: Упр. 15 – Кое число е изписано с букви? (Page 38) — moved after Упр. 19
  {
    id: 'l04-ex-15',
    type: 'multiple_choice',
    title: 'УПРАЖНЕНИЕ 15',
    instruction: 'Кое число е изписано с букви? Изберете правилния отговор.',
    order: 24.5,
    points: 5,
    questions: [
      { question: 'двеста и петнадесет',       options: ['215', '315', '150', '512', '710'], correctIndex: 0 },
      { question: 'триста и петнадесет',        options: ['215', '315', '150', '512', '710'], correctIndex: 1 },
      { question: 'сто и петдесет',             options: ['215', '315', '150', '512', '710'], correctIndex: 2 },
      { question: 'петстотин и дванадесет',     options: ['215', '315', '150', '512', '710'], correctIndex: 3 },
      { question: 'седемстотин и десет',        options: ['215', '315', '150', '512', '710'], correctIndex: 4 },
    ],
  } as MultipleChoiceExercise,

  // ─────────────────────────────────────────────────────────────────────────
  // СТРАНИЦА 39
  // ─────────────────────────────────────────────────────────────────────────

  // ORDER 18: НОВИ ДУМИ 4 – Мерки и тегла (Page 39)
  {
    id: 'l04-novi-dumi-04',
    type: 'illustrated_cards',
    title: 'НОВИ ДУМИ 4',
    instruction: '',
    order: 18,
    cards: [
      { id: '1kg',     imageUrl: '', label: '1 кг — Един килограм/едно кило',              ttsLabel: 'един килограм, едно кило.',              translations: { en: '1 kg — one kilogram / one kilo', ar: '1 كجم — كيلوغرام واحد', fr: '1 kg — un kilogramme / un kilo', fa: '۱ کیلوگرم — یک کیلوگرم', uk: '1 кг — один кілограм / одне кіло', ru: '1 кг — один килограмм / одно кило' } },
      { id: '05kg',    imageUrl: '', label: '0,5 кг — Половин килограм/половин кило',      ttsLabel: 'половин килограм, половин кило.',        translations: { en: '0.5 kg — half a kilogram / half a kilo', ar: '0.5 كجم — نصف كيلوغرام', fr: '0,5 kg — un demi-kilogramme', fa: '۰٫۵ کیلوگرم — نیم کیلو', uk: '0,5 кг — пів кілограма / пів кіло', ru: '0,5 кг — полкилограмма / полкило' } },
      { id: '15kg',    imageUrl: '', label: '1,5 кг — Един килограм и половина/едно кило и половина', ttsLabel: 'един килограм и половина, едно кило и половина.', translations: { en: '1.5 kg — one and a half kilos', ar: '1.5 كجم — كيلو ونصف', fr: '1,5 kg — un kilo et demi', fa: '۱٫۵ کیلوگرم — یک و نیم کیلو', uk: '1,5 кг — півтора кіло', ru: '1,5 кг — полтора кило' } },
      { id: '250g',    imageUrl: '', label: '250 гр — Четвърт килограм/кило. Двеста и петдесет грама', ttsLabel: 'четвърт килограм. двеста и петдесет грама.', translations: { en: '250 g — a quarter kilo. 250 grams', ar: '250 غ — ربع كيلو. مئتان وخمسون غراماً', fr: '250 g — un quart de kilo. 250 grammes', fa: '۲۵۰ گرم — یک چهارم کیلو', uk: '250 г — чверть кіло. 250 грамів', ru: '250 г — четверть кило. 250 граммов' } },
      { id: '1l',      imageUrl: '', label: '1 л. — Един литър',                            ttsLabel: 'един литър.',                            translations: { en: '1 l — one litre', ar: '1 لتر — لتر واحد', fr: '1 l — un litre', fa: '۱ لیتر — یک لیتر', uk: '1 л — один літр', ru: '1 л — один литр' } },
      { id: '2l',      imageUrl: '', label: '2 л. — Два литра',                             ttsLabel: 'два литра.',                             translations: { en: '2 l — two litres', ar: '2 لتر — لتران', fr: '2 l — deux litres', fa: '۲ لیتر — دو لیتر', uk: '2 л — два літри', ru: '2 л — два литра' } },
      { id: 'butilka', imageUrl: '', label: 'бутилка', translations: { en: 'bottle', ar: 'زجاجة', fr: 'bouteille', fa: 'بطری', uk: 'пляшка', ru: 'бутылка' } },
      { id: 'paket',   imageUrl: '', label: 'пакет',   translations: { en: 'package', ar: 'عبوة', fr: 'paquet', fa: 'بسته', uk: 'пакет', ru: 'пакет' } },
    ],
  } as IllustratedCardsExercise,

  // ORDER 20: Упр. 16 – Отговорете на въпросите (цени от упр. 13) (Page 39)
  {
    id: 'l04-ex-16',
    type: 'dropdown_match',
    instruction: 'Отговорете на въпросите, като използвате информацията от предишното упражнение.',
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
    instructionKey: 'grammar.l04.g3.instruction',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 3',
    subtitle: 'Граматика – Число на съществителните (3)',
    instruction: 'Запознайте се с формите два и две.',
    order: 21,
    tableTitle: 'Числителното два / две',
    columns: ['един / една / едно', 'два / две'],
    rows: [
      { pronoun: 'мъжки род', cells: ['един лимон',  '**два** лимона'] },
      { pronoun: 'женски род', cells: ['една ябълка', '**две** ябълки'] },
      { pronoun: 'среден род', cells: ['едно кафе',  '**две** кафета'] },
    ],
    notes: ['два лимона (бройна форма) ≠ много лимони (множествено число)'],
  } as GrammarTableExercise,

  // ORDER 22: Упр. 17 – Подчертайте правилната форма: два или две (Page 39)
  {
    id: 'l04-ex-17',
    type: 'workbook_fill_blank',
    instruction: 'Изберете правилната форма: два (мъжки род) или две (женски род / среден род).',
    order: 22,
    points: 12,
    layout: 'two-column' as const,
    sentences: [
      { text: '_______ килограма',  blanks: [0], correctAnswers: ['два'],  options: ['два', 'две'] },
      { text: '_______ портокала',  blanks: [0], correctAnswers: ['два'],  options: ['два', 'две'] },
      { text: '_______ евро',       blanks: [0], correctAnswers: ['две'],  options: ['два', 'две'] },
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
    instruction: 'Изберете правилната форма: два (мъжки род) или две (женски род / среден род).',
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

  // ORDER 24: Упр. 19 – Свържете лицата с формата на купувам (Page 39)
  {
    id: 'l04-ex-19',
    type: 'dropdown_match',
    instruction: 'Свържете лицата с правилната форма на глагола.',
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
    instructionKey: 'grammar.l04.g4.instruction',
    type: 'grammar_examples',
    title: 'ГРАМАТИКА 4',
    subtitle: 'Граматика – Наречия (13)',
    instruction: 'Запознайте се с наречията евтино и скъпо.',
    order: 26,
    examples: [
      { imageUrl: '/assets/lesson-04/09-gramatika-4-evtino-skupo/01-kafe-evtino.jpg', text: 'Едно евро. Евтино е.', subtext: 'Не е скъпо.' },
      { imageUrl: '/assets/lesson-04/09-gramatika-4-evtino-skupo/02-kafe-skupo.jpg',  text: 'Две евро и петдесет цента. Скъпо е.', subtext: 'Не е евтино.' },
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
    instruction: 'Натиснете всяка реплика, за да чуете произношението. После повторете на глас.',
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
          { speaker: 'Клиент',   text: 'Мога ли да платя с карта?', ttsText: 'Мога ли да платя с банкова карта?' },
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
          { speaker: 'Клиент',   text: 'Заповядайте, имам точната сума.' },
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
          { speaker: 'Продавач', text: 'Рестото. Четири евро.' },
        ],
      },
    ],
  } as DialoguesExercise,

  // Упр. 22 – SKIP (per client)
  // Упр. 23 – SKIP (per client)

  // ─────────────────────────────────────────────────────────────────────────
  // СТРАНИЦА 41 – ДОПЪЛНИТЕЛНИ УПРАЖНЕНИЯ
  // ─────────────────────────────────────────────────────────────────────────

  // ORDER 29: Упр. 24 – Чуйте числото и изберете верния отговор (Page 41)
  {
    id: 'l04-ex-24',
    type: 'multiple_choice',
    title: 'УПРАЖНЕНИЕ 24',
    instruction: 'Кое число е изписано с букви? Изберете правилния отговор.',
    order: 29,
    points: 6,
    questions: [
      { question: 'триста и двадесет', options: ['320', '230', '302', '220'], correctIndex: 0 },
      { question: 'четиристотин и петдесет', options: ['540', '450', '415', '405'], correctIndex: 1 },
      { question: 'шестстотин и седемнадесет', options: ['670', '617', '716', '607'], correctIndex: 1 },
      { question: 'осемстотин и тридесет и три', options: ['803', '833', '383', '830'], correctIndex: 1 },
      { question: 'сто и четиридесет и пет', options: ['154', '415', '145', '514'], correctIndex: 2 },
      { question: 'деветстотин и деветдесет и девет', options: ['990', '909', '999', '899'], correctIndex: 2 },
    ],
  } as MultipleChoiceExercise,

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
    instruction: 'Изслушайте и прочетете текста. Кликнете върху картите, за да чуете произношението им.',
    audioUrl: '/assets/lesson-04/audio/tts/texts/l04-ex-30-full.mp3',
    imageFlashcards: true,
    order: 34,
    images: [
      { imageUrl: '/assets/lesson-04/14-tekstove-snimki/07-yabalki.jpg', label: 'ябълки',   ttsWordId: 'yabalki' },
      { imageUrl: '/assets/lesson-04/14-tekstove-snimki/08-dini.jpg',    label: 'дини',     ttsWordId: 'dini' },
      { imageUrl: '/assets/lesson-04/14-tekstove-snimki/09-grozde.jpg',  label: 'грозде',   ttsWordId: 'grozde' },
    ],
    paragraphs: [
      'Елена купува от супермаркета хляб, кисело и прясно мляко, месо, яйца, маслини, сирене, кашкавал и риба. От пазара купува плодове и зеленчуци. Тя много обича ябълки, праскови, череши, банани. Не обича ягоди. Обича всички зеленчуци без зеле и гъби. Тя яде много плодове и зеленчуци.',
    ],
  } as ReadingTextExercise,

  // ORDER 35: Упр. 31 – Вярно или грешно? (Елена) (Page 42)
  {
    id: 'l04-ex-31',
    type: 'true_false',
    instruction: 'Прочетете текста и определете дали твърденията са верни (✓) или неверни (✗).',
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

  // ORDER 37: Упр. 33 – Прочетете текста (Елена) (Page 42)
  {
    id: 'l04-ex-33',
    type: 'reading_text',
    instruction: 'Кликнете върху картинките, за да се запознаете с думите, и изслушайте текста. Прочетете го сами.',
    audioUrl: '/assets/lesson-04/audio/tts/texts/l04-ex-33-full.mp3',
    imageFlashcards: true,
    order: 37,
    images: [
      { imageUrl: '/assets/lesson-04/14-tekstove-snimki/01-domati.jpg',      label: 'домати',     ttsWordId: 'domati' },
      { imageUrl: '/assets/lesson-04/14-tekstove-snimki/02-morkovi.jpg',     label: 'моркови',    ttsWordId: 'morkovi' },
      { imageUrl: '/assets/lesson-04/14-tekstove-snimki/03-krastavitsi.jpg', label: 'краставици', ttsWordId: 'krastavitsi' },
    ],
    paragraphs: [
      'За закуска Елена яде плодове, сандвич със сирене, домати и маслини или филия с масло и сладко от череши. Пие кафе с мляко без захар. Тя обядва салата и супа или спагети със зеленчуци. Пие минерална вода или сок от портокал. Елена вечеря риба с пържени картофи или пица със зеленчуци и пие газирана вода.',
    ],
  } as ReadingTextExercise,

  // ORDER 38: Упр. 34 – Довършете изреченията (Елена) (Page 42)
  {
    id: 'l04-ex-34',
    type: 'workbook_fill_blank',
    instruction: 'Довършете изреченията.',
    order: 38,
    points: 6,
    layout: 'single' as const,
    sentences: [
      { text: 'За закуска Елена пие _______.',  blanks: [4], correctAnswers: ['кафе с мляко без захар'],                      options: ['кафе с мляко без захар', 'минерална вода или сок от портокал', 'газирана вода'] },
      { text: 'Елена закусва _______.',          blanks: [2], correctAnswers: ['плодове, сандвич със сирене, домати и маслини'], options: ['плодове, сандвич със сирене, домати и маслини', 'салата и супа', 'риба с пържени картофи'] },
      { text: 'За обяд Елена пие _______.',      blanks: [4], correctAnswers: ['минерална вода или сок от портокал'],            options: ['кафе с мляко без захар', 'минерална вода или сок от портокал', 'газирана вода'] },
      { text: 'Елена обядва _______.',            blanks: [2], correctAnswers: ['салата и супа или спагети със зеленчуци'],       options: ['салата и супа или спагети със зеленчуци', 'плодове, сандвич със сирене', 'риба с пържени картофи или пица'] },
      { text: 'За вечеря Елена пие _______.',    blanks: [4], correctAnswers: ['газирана вода'],                                options: ['кафе с мляко без захар', 'минерална вода или сок от портокал', 'газирана вода'] },
      { text: 'Елена вечеря _______.',            blanks: [2], correctAnswers: ['риба с пържени картофи или пица със зеленчуци'], options: ['риба с пържени картофи или пица със зеленчуци', 'салата и супа', 'плодове, сандвич със сирене'] },
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
    instruction: 'Кликнете върху картинките, за да се запознаете с думите, и изслушайте текста. Прочетете го сами.',
    audioUrl: '/assets/lesson-04/audio/tts/texts/l04-ex-35-full.mp3',
    voiceGender: 'male',
    imageFlashcards: true,
    order: 39,
    images: [
      { imageUrl: '/assets/lesson-04/14-tekstove-snimki/04-chesun.jpg',   label: 'чесън',    ttsWordId: 'chesan' },
      { imageUrl: '/assets/lesson-04/14-tekstove-snimki/05-magdanoz.jpg', label: 'магданоз', ttsWordId: 'magdanoz' },
      { imageUrl: '/assets/lesson-04/14-tekstove-snimki/06-luk.jpg',      label: 'лук',      ttsWordId: 'luk' },
    ],
    paragraphs: [
      'Аз съм Карим от Ирак. Обичам арабска храна. Ние ядем много месо – агнешко, пилешко и риба. Не ядем свинско месо. Обичаме също много ориз, нахут, боб, леща и яхнии от различни зеленчуци със или без месо. Имаме едно много вкусно арабско ядене. Казва се долма, а на български – сарми или пълнени зеленчуци с ориз и кайма. Често след ядене пием кафе или черен чай със захар.',
    ],
  } as ReadingTextExercise,

  // ORDER 40: Упр. 36 – Вярно или грешно? (Карим) (Page 43)
  {
    id: 'l04-ex-36',
    type: 'true_false',
    instruction: 'Прочетете текста и определете дали твърденията са верни (✓) или неверни (✗).',
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
    instruction: 'Кликнете върху картинките, за да се запознаете с думите, и изслушайте текста. Прочетете го сами.',
    audioUrl: '/assets/lesson-04/audio/tts/texts/l04-ex-37-full.mp3',
    imageFlashcards: true,
    order: 41,
    images: [
      { imageUrl: '/assets/lesson-04/15-ot-parvo-litse-upr-37/dyuner-maker.jpg', label: 'дюнер', ttsWordId: 'dyuner' },
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

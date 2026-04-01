import type {
  Exercise,
  IllustratedCardsExercise,
  SyllableBlocksExercise,
  GrammarTableExercise,
  WorkbookFillBlankExercise,
  WordSearchExercise,
  DialogueBuilderExercise,
  DialoguesExercise,
  ReadingTextExercise,
  TrueFalseExercise,
  DropdownMatchExercise,
  MultipleChoiceExercise,
  TableFillExercise,
} from '@/content/types';

export const exercises: Exercise[] = [

  // ─────────────────────────────────────────────────────────────────────────
  // СТРАНИЦА 25
  // ─────────────────────────────────────────────────────────────────────────

  // ORDER 1: Упр. 1 – Решете кръстословицата (Page 25)
  // TODO: Needs crossword component or food/drink images
  {
    id: 'l03-ex-01',
    type: 'word_search',
    instruction: 'Намерете скритите думи.',
    order: 1,
    points: 8,
    letterString: 'КРОАСАНБВВОДАШОКХЛЯБОСОКЧАЙМЕДЯЙЦЕБАНИЦАЗ',
    correctWords: ['КРОАСАН', 'ВОДА', 'СОК', 'ЧАЙ', 'МЕД', 'ЯЙЦЕ', 'БАНИЦА', 'ХЛЯБ'],
  } as WordSearchExercise,

  // ORDER 2: НОВИ ДУМИ 1 – Кафе и чай (Page 25)
  {
    id: 'l03-novi-dumi-01',
    type: 'illustrated_cards',
    title: 'НОВИ ДУМИ 1',
    instruction: 'Запознайте се с новите думи. Натиснете за произношение.',
    order: 2,
    cards: [
      { id: 'kuso-kafe',   imageUrl: '/assets/lesson-03/novi-dumi-1/kyso-kafe.jpg',         label: 'късо кафе' },
      { id: 'dalgo-kafe',  imageUrl: '/assets/lesson-03/novi-dumi-1/dalgo-kafe.jpg',        label: 'дълго кафе' },
      { id: 'cheren-chay', imageUrl: '/assets/lesson-03/novi-dumi-1/cheren-chay.jpg',       label: 'черен чай' },
      { id: 'bilkov-chay', imageUrl: '/assets/lesson-03/novi-dumi-1/bilkov-chay.jpg',       label: 'билков чай' },
      { id: 'smetana',     imageUrl: '/assets/lesson-03/novi-dumi-1/smetana.jpg',           label: 'сметана' },
      { id: 'tsigari',     imageUrl: '/assets/lesson-03/novi-dumi-1/cigari.jpg',            label: 'цигари' },
      { id: 'pushene',     imageUrl: '/assets/lesson-03/novi-dumi-1/pushene-zabraneno.jpg', label: 'Пушенето забранено!' },
    ],
  } as IllustratedCardsExercise,

  // ORDER 3: Упр. 2 – Подредете буквите в думи (Page 25)
  {
    id: 'l03-ex-02',
    type: 'syllable_blocks',
    instruction: 'Влачете буквите и ги подредете, за да получите думи.',
    order: 3,
    points: 7,
    puzzles: [
      { id: 'p1', syllables: ['Е', 'Ф', 'А', 'К'], correctWord: 'КАФЕ' },
      { id: 'p2', syllables: ['Р', 'А', 'И', 'Ц', 'Г', 'И'], correctWord: 'ЦИГАРИ' },
      { id: 'p3', syllables: ['Й', 'Ч', 'А'], correctWord: 'ЧАЙ' },
      { id: 'p4', syllables: ['Ъ', 'К', 'О', 'С'], correctWord: 'КЪСО' },
      { id: 'p5', syllables: ['А', 'Н', 'Т', 'Е', 'А', 'С', 'М'], correctWord: 'СМЕТАНА' },
      { id: 'p6', syllables: ['Н', 'Р', 'Е', 'Ч', 'Е'], correctWord: 'ЧЕРЕН' },
      { id: 'p7', syllables: ['О', 'К', 'В', 'Б', 'Л', 'И'], correctWord: 'БИЛКОВ' },
    ],
  } as SyllableBlocksExercise,

  // Упр. 3 – SKIP (per client)

  // ORDER 4: Упр. 4 – Какво пише на табелата? (Page 25)
  {
    id: 'l03-ex-04',
    type: 'multiple_choice',
    instruction: 'Какво пише на табелата?',
    order: 4,
    points: 1,
    questions: [
      {
        question: 'Какво пише на табелата?',
        imageUrl: '/assets/lesson-03/novi-dumi-1/pushene-zabraneno.jpg',
        options: ['Пушенето забранено!', 'Добре дошли!', 'Отворено', 'Затворено'],
        correctIndex: 0,
      },
    ],
  } as MultipleChoiceExercise,

  // ─────────────────────────────────────────────────────────────────────────
  // СТРАНИЦА 26
  // ─────────────────────────────────────────────────────────────────────────

  // ORDER 5: ГРАМАТИКА 1 – Бройни числителни 10–100 (Page 26)
  {
    id: 'l03-gramatika-01',
    instructionKey: 'grammar.l03.g1.instruction',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 1',
    subtitle: 'Граматика – Бройни числителни (1)',
    instruction: 'Запознайте се с числата от 10 до 100. Натиснете върху ред за произношение.',
    order: 5,
    tableTitle: 'Бройни числителни 10–100',
    columns: [],
    rows: [
      { pronoun: '10',  cells: ['десет'] },
      { pronoun: '11',  cells: ['единадесет (единайсет)'] },
      { pronoun: '12',  cells: ['дванадесет (дванайсет)'] },
      { pronoun: '13',  cells: ['тринадесет (тринайсет)'] },
      { pronoun: '14',  cells: ['четиринадесет (четиринайсет)'] },
      { pronoun: '15',  cells: ['петнадесет (петнайсет)'] },
      { pronoun: '16',  cells: ['шестнадесет (шестнайсет)'] },
      { pronoun: '17',  cells: ['седемнадесет (седемнайсет)'] },
      { pronoun: '18',  cells: ['осемнадесет (осемнайсет)'] },
      { pronoun: '19',  cells: ['деветнадесет (деветнайсет)'] },
      { pronoun: '20',  cells: ['двадесет (двайсет)'] },
      { pronoun: '30',  cells: ['тридесет (трийсет)'] },
      { pronoun: '40',  cells: ['четиридесет (четиресет)'] },
      { pronoun: '50',  cells: ['петдесет'] },
      { pronoun: '60',  cells: ['шестдесет (шейсет)'] },
      { pronoun: '70',  cells: ['седемдесет'] },
      { pronoun: '80',  cells: ['осемдесет'] },
      { pronoun: '90',  cells: ['деветдесет'] },
      { pronoun: '100', cells: ['сто'] },
    ],
    notes: [
      'Там, където има две форми, и двете са правилни и се използват.',
      '21 – двадесет и едно',
      '121 – сто двадесет и едно',
    ],
  } as GrammarTableExercise,

  // ORDER 6: НОВИ ДУМИ 2 – Пари (Page 26)
  {
    id: 'l03-novi-dumi-02',
    type: 'illustrated_cards',
    title: 'НОВИ ДУМИ 2',
    instruction: 'Запознайте се с парите в евро.\n\n1 € = едно евро · 2 € = две евро\n1 ¢ = един евроцент · 2 ¢ = два евроцента\n\n0,50 € = петдесет евроцента\n5,50 € = пет евро и петдесет евроцента (пет и петдесет)\n0,51 € = петдесет и един евроцента\n51,00 € = петдесет и едно евро',
    order: 6,
    cards: [
      { id: '1-euro',    imageUrl: '/assets/lesson-03/novi-dumi-2-currency/1-euro.png',   label: 'едно евро' },
      { id: '2-euro',    imageUrl: '/assets/lesson-03/novi-dumi-2-currency/2-euro.png',   label: 'две евро' },
      { id: '5-euro',    imageUrl: '/assets/lesson-03/novi-dumi-2-currency/5-euro.jpg',   label: 'пет евро' },
      { id: '10-euro',   imageUrl: '/assets/lesson-03/novi-dumi-2-currency/10-euro.jpg',  label: 'десет евро' },
      { id: '20-euro',   imageUrl: '/assets/lesson-03/novi-dumi-2-currency/20-euro.gif',  label: 'двадесет евро' },
      { id: '50-euro',   imageUrl: '/assets/lesson-03/novi-dumi-2-currency/50-euro.jpg',  label: 'петдесет евро' },
      { id: '100-euro',  imageUrl: '/assets/lesson-03/novi-dumi-2-currency/100-euro.jpg', label: 'сто евро' },
      { id: '200-euro',  imageUrl: '/assets/lesson-03/novi-dumi-2-currency/200-euro.jpg', label: 'двеста евро' },
      { id: '500-euro',  imageUrl: '/assets/lesson-03/novi-dumi-2-currency/500-euro.jpg', label: 'петстотин евро' },
      { id: '1-cent',    imageUrl: '/assets/lesson-03/novi-dumi-2-currency/1-cent.png',   label: 'един евроцент' },
      { id: '5-cent',    imageUrl: '/assets/lesson-03/novi-dumi-2-currency/5-cent.png',   label: 'пет евроцента' },
      { id: '10-cent',   imageUrl: '/assets/lesson-03/novi-dumi-2-currency/10-cent.png',  label: 'десет евроцента' },
      { id: '20-cent',   imageUrl: '/assets/lesson-03/novi-dumi-2-currency/20-cent.png',  label: 'двадесет евроцента' },
      { id: '50-cent',   imageUrl: '/assets/lesson-03/novi-dumi-2-currency/50-cent.png',  label: 'петдесет евроцента' },
    ],
  } as IllustratedCardsExercise,

  // ORDER 7: Упр. 5 – Напишете числата с цифри (Page 26)
  {
    id: 'l03-ex-05',
    type: 'workbook_fill_blank',
    instruction: 'Напишете числата с цифри.',
    order: 7,
    points: 8,
    layout: 'two-column',
    sentences: [
      { text: 'осемнайсет — _______',  blanks: [1], correctAnswers: ['18'], options: ['18', '25', '38', '42', '53', '67', '79', '91'] },
      { text: 'двайсет и пет — _______', blanks: [2], correctAnswers: ['25'], options: ['18', '25', '38', '42', '53', '67', '79', '91'] },
      { text: 'трийсет и осем — _______', blanks: [2], correctAnswers: ['38'], options: ['18', '25', '38', '42', '53', '67', '79', '91'] },
      { text: 'четиресет и две — _______', blanks: [2], correctAnswers: ['42'], options: ['18', '25', '38', '42', '53', '67', '79', '91'] },
      { text: 'шейсет и седем — _______', blanks: [2], correctAnswers: ['67'], options: ['18', '25', '38', '42', '53', '67', '79', '91'] },
      { text: 'петдесет и три — _______', blanks: [2], correctAnswers: ['53'], options: ['18', '25', '38', '42', '53', '67', '79', '91'] },
      { text: 'седемдесет и девет — _______', blanks: [2], correctAnswers: ['79'], options: ['18', '25', '38', '42', '53', '67', '79', '91'] },
      { text: 'деветдесет и едно — _______', blanks: [2], correctAnswers: ['91'], options: ['18', '25', '38', '42', '53', '67', '79', '91'] },
    ],
  } as WorkbookFillBlankExercise,

  // ORDER 8: Упр. 6 – Слушайте и оградете правилните числа (Page 26)
  {
    id: 'l03-ex-06',
    type: 'multiple_choice',
    instructionKey: 'exercise.l03.ex06.instruction',
    instruction: 'Кое число е изписано с букви? Изберете правилния отговор.',
    order: 8,
    points: 6,
    questions: [
      { question: 'двадесет и три',           options: ['13', '23', '32', '33'],  correctIndex: 1 },
      { question: 'петдесет и седем',          options: ['47', '57', '67', '75'],  correctIndex: 1 },
      { question: 'осемнадесет',               options: ['8',  '18', '80', '28'],  correctIndex: 1 },
      { question: 'четиридесет и едно',        options: ['14', '41', '44', '31'],  correctIndex: 1 },
      { question: 'седемдесет и шест',         options: ['66', '67', '76', '77'],  correctIndex: 2 },
      { question: 'деветдесет и девет',        options: ['90', '91', '96', '99'],  correctIndex: 3 },
    ],
  } as MultipleChoiceExercise,

  // ORDER 9: Упр. 7 – Напишете с думи (парични суми) (Page 26)
  {
    id: 'l03-ex-07',
    type: 'workbook_fill_blank',
    instruction: 'Напишете сумите с думи.',
    order: 9,
    points: 3,
    layout: 'single',
    sentences: [
      {
        text: '15,30 € — петнадесет евро и тридесет евроцента',
        blanks: [], correctAnswers: [], isExample: true,
      },
      {
        text: '31,93 € — _______',
        blanks: [1], correctAnswers: ['тридесет и едно евро и деветдесет и три евроцента'],
        options: ['тридесет и едно евро и деветдесет и три евроцента', 'тридесет и три евро и деветдесет и един евроцента', 'тридесет и девет евро и тринадесет евроцента'],
      },
      {
        text: '105,41 € — _______',
        blanks: [1], correctAnswers: ['сто и пет евро и четиридесет и един евроцента'],
        options: ['сто и пет евро и четиридесет и един евроцента', 'сто четиридесет и едно евро и пет евроцента', 'сто и четири евро и петдесет и един евроцента'],
      },
      {
        text: '159,57 € — _______',
        blanks: [1], correctAnswers: ['сто петдесет и девет евро и петдесет и седем евроцента'],
        options: ['сто петдесет и девет евро и петдесет и седем евроцента', 'сто и петдесет евро и деветдесет и седем евроцента', 'сто петдесет и седем евро и петдесет и девет евроцента'],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ─────────────────────────────────────────────────────────────────────────
  // СТРАНИЦА 27
  // ─────────────────────────────────────────────────────────────────────────

  // ORDER 10: Упр. 8 – Напишете парите с думи (Page 27)
  {
    id: 'l03-ex-08',
    type: 'workbook_fill_blank',
    instruction: 'Напишете парите с думи.',
    order: 10,
    points: 3,
    layout: 'single',
    sentences: [
      {
        text: 'Модел: [10 €] + [5 €] + [2 €] + [50 ¢] + [5 ¢] + [1 ¢]\nИма седемнадесет евро и петдесет и шест евроцента.',
        blanks: [], correctAnswers: [], isExample: true,
        images: [
          '/assets/lesson-03/novi-dumi-2-currency/10-euro.jpg',
          '/assets/lesson-03/novi-dumi-2-currency/5-euro.jpg',
          '/assets/lesson-03/novi-dumi-2-currency/2-euro.png',
          '/assets/lesson-03/novi-dumi-2-currency/50-cent.png',
          '/assets/lesson-03/novi-dumi-2-currency/5-cent.png',
          '/assets/lesson-03/novi-dumi-2-currency/1-cent.png',
        ],
      },
      {
        text: '[20 €] + [5 €] + [1 €] + [20 ¢] + [5 ¢]\nИма _______',
        blanks: [1], correctAnswers: ['двадесет и шест евро и двадесет и пет евроцента'],
        options: ['двадесет и шест евро и двадесет и пет евроцента', 'двадесет и пет евро и двадесет и шест евроцента', 'двадесет и едно евро и петдесет евроцента'],
        images: [
          '/assets/lesson-03/novi-dumi-2-currency/20-euro.gif',
          '/assets/lesson-03/novi-dumi-2-currency/5-euro.jpg',
          '/assets/lesson-03/novi-dumi-2-currency/1-euro.png',
          '/assets/lesson-03/novi-dumi-2-currency/20-cent.png',
          '/assets/lesson-03/novi-dumi-2-currency/5-cent.png',
        ],
      },
      {
        text: '[50 €] + [10 €] + [2 €] + [50 ¢] + [10 ¢] + [5 ¢]\nИма _______',
        blanks: [1], correctAnswers: ['шестдесет и две евро и шестдесет и пет евроцента'],
        options: ['шестдесет и две евро и шестдесет и пет евроцента', 'шестдесет и пет евро и шестдесет и две евроцента', 'шестдесет и две евро и петдесет и пет евроцента'],
        images: [
          '/assets/lesson-03/novi-dumi-2-currency/50-euro.jpg',
          '/assets/lesson-03/novi-dumi-2-currency/10-euro.jpg',
          '/assets/lesson-03/novi-dumi-2-currency/2-euro.png',
          '/assets/lesson-03/novi-dumi-2-currency/50-cent.png',
          '/assets/lesson-03/novi-dumi-2-currency/10-cent.png',
          '/assets/lesson-03/novi-dumi-2-currency/5-cent.png',
        ],
      },
      {
        text: '[100 €] + [20 €] + [5 €] + [1 €] + [50 ¢] + [20 ¢] + [1 ¢]\nИма _______',
        blanks: [1], correctAnswers: ['сто двадесет и шест евро и седемдесет и един евроцента'],
        options: ['сто двадесет и шест евро и седемдесет и един евроцента', 'сто и седемдесет евро и двадесет и шест евроцента', 'сто двадесет и един евро и седемдесет и шест евроцента'],
        images: [
          '/assets/lesson-03/novi-dumi-2-currency/100-euro.jpg',
          '/assets/lesson-03/novi-dumi-2-currency/20-euro.gif',
          '/assets/lesson-03/novi-dumi-2-currency/5-euro.jpg',
          '/assets/lesson-03/novi-dumi-2-currency/1-euro.png',
          '/assets/lesson-03/novi-dumi-2-currency/50-cent.png',
          '/assets/lesson-03/novi-dumi-2-currency/20-cent.png',
          '/assets/lesson-03/novi-dumi-2-currency/1-cent.png',
        ],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ORDER 11: НОВИ ДУМИ 3 – Храни в ресторанта (Page 27)
  {
    id: 'l03-novi-dumi-03',
    type: 'illustrated_cards',
    title: 'НОВИ ДУМИ 3',
    instruction: 'Запознайте се с храните в ресторанта. Натиснете за произношение.',
    order: 11,
    cards: [
      { id: 'supa',      imageUrl: '/assets/lesson-03/novi-dumi-3-food/supa.jpg',      label: 'супа' },
      { id: 'salata',    imageUrl: '/assets/lesson-03/novi-dumi-3-food/salata.jpg',    label: 'салата' },
      { id: 'musaka',    imageUrl: '/assets/lesson-03/novi-dumi-3-food/musaka.jpg',    label: 'мусака' },
      { id: 'riba',      imageUrl: '/assets/lesson-03/novi-dumi-3-food/riba.jpg',      label: 'риба' },
      { id: 'makaroni',  imageUrl: '/assets/lesson-03/novi-dumi-3-food/makaroni.jpg',  label: 'макарони' },
      { id: 'kebap',     imageUrl: '/assets/lesson-03/novi-dumi-3-food/kebap.jpg',     label: 'кебап' },
      { id: 'shishche',  imageUrl: '/assets/lesson-03/novi-dumi-3-food/shishche.jpg',  label: 'шишче' },
      { id: 'kebapche',  imageUrl: '/assets/lesson-03/novi-dumi-3-food/kebapche.jpg',  label: 'кебапче' },
      { id: 'kyufte',    imageUrl: '/assets/lesson-03/novi-dumi-3-food/kyufte.jpg',    label: 'кюфте' },
      { id: 'omlet',     imageUrl: '/assets/lesson-03/novi-dumi-3-food/omlet.jpg',     label: 'омлет' },
      { id: 'desert',    imageUrl: '/assets/lesson-03/novi-dumi-3-food/desert.jpg',    label: 'десерт' },
      { id: 'sladoled',  imageUrl: '/assets/lesson-03/novi-dumi-3-food/sladoled.jpg',  label: 'сладолед' },
    ],
  } as IllustratedCardsExercise,

  // ORDER 12: ДИАЛОЗИ 1 – а., б. (Page 27)
  {
    id: 'l03-dialozi-01',
    type: 'dialogues',
    title: 'ДИАЛОЗИ 1',
    instruction: 'Прочетете диалозите. Натиснете за произношение.',
    imageUrl: '/assets/lesson-03/dialogues-1/kafene-braziliya.jpg',
    order: 12,
    sections: [
      {
        id: 'a',
        lines: [
          { speaker: 'Сервитьор', text: 'Добър ден. Какво обичате?', translations: { en: 'Good day. What would you like?', ar: 'مرحبًا. ماذا تحب أن تطلب؟', fr: 'Bonjour. Que désirez-vous ?', fa: 'روز بخیر. چه میل دارید؟', uk: 'Добрий день. Що бажаєте?', ru: 'Добрый день. Что желаете?' } },
          { speaker: 'Клиент',    text: 'Едно кафе, моля.', translations: { en: 'A coffee, please.', ar: 'قهوة، من فضلك.', fr: 'Un café, s\'il vous plaît.', fa: 'یک قهوه، لطفاً.', uk: 'Каву, будь ласка.', ru: 'Кофе, пожалуйста.' } },
          { speaker: 'Сервитьор', text: 'Късо или дълго?', translations: { en: 'Short or long?', ar: 'قصير أم طويل؟', fr: 'Court ou long ?', fa: 'کوتاه یا بلند؟', uk: 'Коротке чи довге?', ru: 'Короткое или длинное?' } },
          { speaker: 'Клиент',    text: 'Дълго със захар и сметана.', translations: { en: 'Long with sugar and cream.', ar: 'طويل بالسكر والقشدة.', fr: 'Long avec sucre et crème.', fa: 'بلند با شکر و خامه.', uk: 'Довге з цукром і вершками.', ru: 'Длинное с сахаром и сливками.' } },
          { speaker: 'Сервитьор', text: 'Нещо за ядене?', translations: { en: 'Something to eat?', ar: 'هل تريد شيئًا للأكل؟', fr: 'Quelque chose à manger ?', fa: 'چیزی برای خوردن؟', uk: 'Щось поїсти?', ru: 'Что-нибудь поесть?' } },
          { speaker: 'Клиент',    text: 'Да, един кроасан.', translations: { en: 'Yes, a croissant.', ar: 'نعم، كرواسان.', fr: 'Oui, un croissant.', fa: 'بله، یک کروسان.', uk: 'Так, круасан.', ru: 'Да, круассан.' } },
        ],
      },
      {
        id: 'b',
        lines: [
          { speaker: 'Клиент',    text: 'Извинете, колко струва един билков чай с мед?', translations: { en: 'Excuse me, how much is a herbal tea with honey?', ar: 'عفوًا، كم يكلف شاي الأعشاب بالعسل؟', fr: 'Excusez-moi, combien coûte une tisane au miel ?', fa: 'ببخشید، یک چای گیاهی با عسل چقدر است؟', uk: 'Вибачте, скільки коштує трав\'яний чай з медом?', ru: 'Извините, сколько стоит травяной чай с мёдом?' } },
          { speaker: 'Сервитьор', text: '2,50 евро.', translations: { en: '2.50 euros.', ar: '٢٫٥٠ يورو.', fr: '2,50 euros.', fa: '۲٫۵۰ یورو.', uk: '2,50 євро.', ru: '2,50 евро.' } },
        ],
      },
    ],
  } as DialoguesExercise,

  // Упр. 9 – SKIP (per client)
  // Упр. 10 – SKIP (per client)

  // ORDER 13: Упр. 11 – Открийте скритите думи (Page 27)
  {
    id: 'l03-ex-11',
    type: 'word_search',
    instruction: 'Открийте скритите думи.',
    order: 13,
    points: 6,
    letterString: 'МАКАРОНИШУКЮФТЕОЯИСАЛАТАМДШАСУПАШЛЕЧКЕБАПЧЕНЕАДЕСЕРТЕЯ',
    correctWords: ['МАКАРОНИ', 'КЮФТЕ', 'САЛАТА', 'СУПА', 'КЕБАПЧЕ', 'ДЕСЕРТ'],
  } as WordSearchExercise,

  // ─────────────────────────────────────────────────────────────────────────
  // СТРАНИЦА 28
  // ─────────────────────────────────────────────────────────────────────────

  // ORDER 14: ДИАЛОЗИ 2 – а.–д. (Page 28)
  {
    id: 'l03-dialozi-02',
    type: 'dialogues',
    title: 'ДИАЛОЗИ 2',
    instruction: 'Прочетете диалозите. Натиснете за произношение.',
    order: 14,
    sections: [
      {
        id: 'a',
        lines: [
          { speaker: 'Клиент',    text: 'Добър ден, господине. Свободно ли е?', translations: { en: 'Good day, sir. Is this seat free?', ar: 'مرحبًا يا سيدي. هل المكان فارغ؟', fr: 'Bonjour, monsieur. C\'est libre ?', fa: 'روز بخیر، آقا. اینجا آزاد است؟', uk: 'Добрий день, пане. Вільно?', ru: 'Добрый день, господин. Свободно?' } },
          { speaker: 'Господин',  text: 'Да, заповядайте.', translations: { en: 'Yes, please sit down.', ar: 'نعم، تفضل.', fr: 'Oui, je vous en prie.', fa: 'بله، بفرمایید.', uk: 'Так, будь ласка.', ru: 'Да, пожалуйста.' } },
        ],
      },
      {
        id: 'b',
        lines: [
          { speaker: 'Клиент',   text: 'Извинете, свободно ли е?', translations: { en: 'Excuse me, is this seat free?', ar: 'عفوًا، هل المكان فارغ؟', fr: 'Excusez-moi, c\'est libre ?', fa: 'ببخشید، اینجا آزاد است؟', uk: 'Вибачте, вільно?', ru: 'Извините, свободно?' } },
          { speaker: 'Госпожа',  text: 'Не, съжалявам, заето е.', translations: { en: 'No, sorry, it\'s taken.', ar: 'لا، آسفة، المكان مشغول.', fr: 'Non, désolée, c\'est occupé.', fa: 'نه، متأسفم، اشغال است.', uk: 'Ні, вибачте, зайнято.', ru: 'Нет, извините, занято.' } },
        ],
      },
      {
        id: 'c',
        imageUrl: '/assets/lesson-03/dialogues-2/menu.jpg',
        lines: [
          { speaker: 'Клиент',    text: 'Едно меню, ако обичате.', translations: { en: 'A menu, please.', ar: 'قائمة الطعام، من فضلك.', fr: 'Un menu, s\'il vous plaît.', fa: 'یک منو، لطفاً.', uk: 'Меню, будь ласка.', ru: 'Меню, пожалуйста.' } },
          { speaker: 'Сервитьор', text: 'Да, разбира се.', translations: { en: 'Yes, of course.', ar: 'نعم، بالطبع.', fr: 'Oui, bien sûr.', fa: 'بله، البته.', uk: 'Так, звісно.', ru: 'Да, конечно.' } },
        ],
      },
      {
        id: 'd',
        imageUrl: '/assets/lesson-03/dialogues-2/restorant-finikiya.jpg',
        lines: [
          { speaker: 'Сервитьор', text: 'Какво обичате?', translations: { en: 'What would you like?', ar: 'ماذا تحب أن تطلب؟', fr: 'Que désirez-vous ?', fa: 'چه میل دارید؟', uk: 'Що бажаєте?', ru: 'Что желаете?' } },
          { speaker: 'Клиент',    text: 'Може ли една супа и една мусака?', translations: { en: 'Can I have a soup and a moussaka?', ar: 'هل يمكنني طلب حساء وموساكا؟', fr: 'Puis-je avoir une soupe et une moussaka ?', fa: 'می‌توانم یک سوپ و یک موساکا داشته باشم؟', uk: 'Можна суп і мусаку?', ru: 'Можно суп и мусаку?' } },
          { speaker: 'Сервитьор', text: 'Хляб искате ли?', translations: { en: 'Would you like bread?', ar: 'هل تريد خبزًا؟', fr: 'Voulez-vous du pain ?', fa: 'نان می‌خواهید؟', uk: 'Хліб бажаєте?', ru: 'Хлеб желаете?' } },
          { speaker: 'Клиент',    text: 'Не, благодаря.', translations: { en: 'No, thank you.', ar: 'لا، شكرًا.', fr: 'Non, merci.', fa: 'نه، ممنون.', uk: 'Ні, дякую.', ru: 'Нет, спасибо.' } },
          { speaker: 'Сервитьор', text: 'Нещо за пиене?', translations: { en: 'Something to drink?', ar: 'هل تريد شيئًا للشرب؟', fr: 'Quelque chose à boire ?', fa: 'چیزی برای نوشیدن؟', uk: 'Щось випити?', ru: 'Что-нибудь попить?' } },
          { speaker: 'Клиент',    text: 'Един айрян, моля.', translations: { en: 'An ayran, please.', ar: 'عيران واحد، من فضلك.', fr: 'Un ayran, s\'il vous plaît.', fa: 'یک دوغ، لطفاً.', uk: 'Айран, будь ласка.', ru: 'Айран, пожалуйста.' } },
          { speaker: 'Сервитьор', text: 'А десерт?', translations: { en: 'And dessert?', ar: 'وحلويات؟', fr: 'Et un dessert ?', fa: 'و دسر؟', uk: 'А десерт?', ru: 'А десерт?' } },
          { speaker: 'Клиент',    text: 'О, да, един сладолед.', translations: { en: 'Oh yes, an ice cream.', ar: 'أوه، نعم، آيس كريم.', fr: 'Oh oui, une glace.', fa: 'اوه، بله، یک بستنی.', uk: 'О, так, морозиво.', ru: 'О, да, мороженое.' } },
        ],
      },
      {
        id: 'e',
        imageUrl: '/assets/lesson-03/dialogues-2/smetka.jpg',
        lines: [
          { speaker: 'Клиент',    text: 'Може ли сметката?', translations: { en: 'Can I have the bill?', ar: 'هل يمكنني الحصول على الفاتورة؟', fr: 'L\'addition, s\'il vous plaît.', fa: 'می‌توانم صورتحساب را داشته باشم؟', uk: 'Можна рахунок?', ru: 'Можно счёт?' } },
          { speaker: 'Сервитьор', text: 'Да, заповядайте.', translations: { en: 'Yes, here you are.', ar: 'نعم، تفضل.', fr: 'Oui, voilà.', fa: 'بله، بفرمایید.', uk: 'Так, будь ласка.', ru: 'Да, пожалуйста.' } },
        ],
      },
    ],
  } as DialoguesExercise,

  // Упр. 12 – SKIP (per client)
  // Упр. 13 – SKIP (per client)

  // ORDER 15: Упр. 14 – Подредете фразите (Page 28)
  {
    id: 'l03-ex-14',
    type: 'dialogue_builder',
    title: 'УПРАЖНЕНИЕ 14',
    instruction: 'Подредете фразите, за да получите диалог.',
    order: 15,
    sections: [
      {
        id: 'а.',
        givenFirstLine: 'Добър ден.',
        sentences: [
          'Добър ден.',
          'Добър ден.',
          'Може ли едно меню?',
          'Да, заповядайте.',
          'Искам една салата и едно шишче.',
          'Искате ли хляб?',
          'Да, една филия.',
          'Нещо за пиене?',
          'Не, благодаря.',
          'Може ли сметката?',
          'Да, заповядайте сметката.',
        ],
        alternateOrders: [
          [
            'Добър ден.',
            'Добър ден.',
            'Може ли едно меню?',
            'Да, заповядайте.',
            'Искам една салата и едно шишче.',
            'Нещо за пиене?',
            'Не, благодаря.',
            'Искате ли хляб?',
            'Да, една филия.',
            'Може ли сметката?',
            'Да, заповядайте сметката.',
          ],
        ],
      },
    ],
  } as DialogueBuilderExercise,

  // ORDER 16: ГРАМАТИКА 2а – Сегашно време Е група: пия (Page 28)
  {
    id: 'l03-gramatika-02a',
    instructionKey: 'grammar.l03.g2a.instruction',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 2',
    subtitle: 'Граматика – Сегашно време (12)',
    instruction: 'Запознайте се с глагола ПИЯ в сегашно време. Натиснете върху ред за произношение.',
    order: 16,
    tableTitle: 'Сегашно време – Е група: пия',
    columns: ['(+)', '(–)', '(?)'],
    rows: [
      { pronoun: 'аз',           cells: ['пия',   'не пия',   'пия ли']   },
      { pronoun: 'ти',           cells: ['пиеш',  'не пиеш',  'пиеш ли']  },
      { pronoun: 'той, тя, то',  cells: ['пие',   'не пие',   'пие ли']   },
      { pronoun: 'ние',          cells: ['пием',  'не пием',  'пием ли']  },
      { pronoun: 'вие',          cells: ['пиете', 'не пиете', 'пиете ли'] },
      { pronoun: 'те',           cells: ['пият',  'не пият',  'пият ли']  },
    ],
  } as GrammarTableExercise,

  // ORDER 17: ГРАМАТИКА 2б – Сегашно време Е група: ям (Page 28)
  {
    id: 'l03-gramatika-02b',
    instructionKey: 'grammar.l03.g2b.instruction',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 2',
    instruction: 'Запознайте се с глагола ЯМ в сегашно време. Натиснете върху ред за произношение.',
    order: 17,
    tableTitle: 'Сегашно време – Е група: ям',
    columns: ['(+)', '(–)', '(?)'],
    rows: [
      { pronoun: 'аз',           cells: ['ям',    'не ям',    'ям ли']    },
      { pronoun: 'ти',           cells: ['ядеш',  'не ядеш',  'ядеш ли']  },
      { pronoun: 'той, тя, то',  cells: ['яде',   'не яде',   'яде ли']   },
      { pronoun: 'ние',          cells: ['ядем',  'не ядем',  'ядем ли']  },
      { pronoun: 'вие',          cells: ['ядете', 'не ядете', 'ядете ли'] },
      { pronoun: 'те',           cells: ['ядат',  'не ядат',  'ядат ли']  },
    ],
  } as GrammarTableExercise,

  // ─────────────────────────────────────────────────────────────────────────
  // СТРАНИЦА 29
  // ─────────────────────────────────────────────────────────────────────────

  // ORDER 18: Упр. 15 – Напишете окончанията на глаголите пия и ям (Page 29)
  {
    id: 'l03-ex-15',
    type: 'workbook_fill_blank',
    instruction: 'Напишете глаголите пия и ям в правилната форма.',
    order: 18,
    points: 12,
    layout: 'single',
    sentences: [
      {
        text: 'Тя пие айрян и яде дюнер.',
        blanks: [], correctAnswers: [], isExample: true,
      },
      {
        text: 'Аз _______ вода и _______ салата.',
        blanks: [1, 3],
        correctAnswers: ['пия', 'ям'],
        options: [
          ['пия', 'пиеш', 'пие', 'пием', 'пиете', 'пият'],
          ['ям', 'ядеш', 'яде', 'ядем', 'ядете', 'ядат'],
        ],
      },
      {
        text: 'Той _______ сок и _______ кебап.',
        blanks: [1, 3],
        correctAnswers: ['пие', 'яде'],
        options: [
          ['пия', 'пиеш', 'пие', 'пием', 'пиете', 'пият'],
          ['ям', 'ядеш', 'яде', 'ядем', 'ядете', 'ядат'],
        ],
      },
      {
        text: 'Ти _______ билков чай и _______ супа.',
        blanks: [1, 4],
        correctAnswers: ['пиеш', 'ядеш'],
        options: [
          ['пия', 'пиеш', 'пие', 'пием', 'пиете', 'пият'],
          ['ям', 'ядеш', 'яде', 'ядем', 'ядете', 'ядат'],
        ],
      },
      {
        text: 'Ние _______ кафе и _______ десерт.',
        blanks: [1, 3],
        correctAnswers: ['пием', 'ядем'],
        options: [
          ['пия', 'пиеш', 'пие', 'пием', 'пиете', 'пият'],
          ['ям', 'ядеш', 'яде', 'ядем', 'ядете', 'ядат'],
        ],
      },
      {
        text: 'Те _______ капучино и _______ сладолед.',
        blanks: [1, 3],
        correctAnswers: ['пият', 'ядат'],
        options: [
          ['пия', 'пиеш', 'пие', 'пием', 'пиете', 'пият'],
          ['ям', 'ядеш', 'яде', 'ядем', 'ядете', 'ядат'],
        ],
      },
      {
        text: 'Вие _______ кока-кола и _______ кроасан.',
        blanks: [1, 3],
        correctAnswers: ['пиете', 'ядете'],
        options: [
          ['пия', 'пиеш', 'пие', 'пием', 'пиете', 'пият'],
          ['ям', 'ядеш', 'яде', 'ядем', 'ядете', 'ядат'],
        ],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ORDER 19: Упр. 16 – Напишете глагола пия в правилната му форма (Page 29)
  {
    id: 'l03-ex-16',
    type: 'workbook_fill_blank',
    instruction: 'Попълнете глагола пия в правилната му форма.',
    order: 19,
    points: 8,
    layout: 'single',
    sentences: [
      {
        text: 'Аз _______ късо кафе. (+)',
        blanks: [1], correctAnswers: ['пия'],
        options: ['пия', 'пиеш', 'пие', 'пием', 'пиете', 'пият', 'не пия', 'не пиеш', 'не пие', 'пиеш ли', 'пиете ли', 'пие ли'],
      },
      {
        text: 'Аз _______ черен чай. (–)',
        blanks: [1], correctAnswers: ['не пия'],
        options: ['пия', 'пиеш', 'пие', 'пием', 'пиете', 'пият', 'не пия', 'не пиеш', 'не пие', 'пиеш ли', 'пиете ли', 'пие ли'],
      },
      {
        text: 'Ти _______ кафе със сметана? (?)',
        blanks: [1], correctAnswers: ['пиеш ли'],
        options: ['пия', 'пиеш', 'пие', 'пием', 'пиете', 'пият', 'не пия', 'не пиеш', 'не пие', 'пиеш ли', 'пиете ли', 'пие ли'],
      },
      {
        text: 'Ти _______ чай с мед. (+)',
        blanks: [1], correctAnswers: ['пиеш'],
        options: ['пия', 'пиеш', 'пие', 'пием', 'пиете', 'пият', 'не пия', 'не пиеш', 'не пие', 'пиеш ли', 'пиете ли', 'пие ли'],
      },
      {
        text: 'Вие _______ кафе без захар? (?)',
        blanks: [1], correctAnswers: ['пиете ли'],
        options: ['пия', 'пиеш', 'пие', 'пием', 'пиете', 'пият', 'не пия', 'не пиеш', 'не пие', 'пиеш ли', 'пиете ли', 'пие ли'],
      },
      {
        text: 'Вие _______ кафе с мляко? (?)',
        blanks: [1], correctAnswers: ['пиете ли'],
        options: ['пия', 'пиеш', 'пие', 'пием', 'пиете', 'пият', 'не пия', 'не пиеш', 'не пие', 'пиеш ли', 'пиете ли', 'пие ли'],
      },
      {
        text: 'Той _______ прясно мляко. (+)',
        blanks: [1], correctAnswers: ['пие'],
        options: ['пия', 'пиеш', 'пие', 'пием', 'пиете', 'пият', 'не пия', 'не пиеш', 'не пие', 'пиеш ли', 'пиете ли', 'пие ли'],
      },
      {
        text: 'Той _______ дълго кафе. (–)',
        blanks: [1], correctAnswers: ['не пие'],
        options: ['пия', 'пиеш', 'пие', 'пием', 'пиете', 'пият', 'не пия', 'не пиеш', 'не пие', 'пиеш ли', 'пиете ли', 'пие ли'],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ORDER 20: Упр. 17 – Напишете глагола ям в правилната му форма (Page 29)
  {
    id: 'l03-ex-17',
    type: 'workbook_fill_blank',
    instruction: 'Попълнете глагола ям в правилната му форма.',
    order: 20,
    points: 8,
    layout: 'single',
    sentences: [
      {
        text: 'Аз _______ мусака. (–)',
        blanks: [1], correctAnswers: ['не ям'],
        options: ['ям', 'ядеш', 'яде', 'ядем', 'ядете', 'ядат', 'не ям', 'не ядеш', 'не яде', 'ядеш ли', 'ядете ли', 'яде ли'],
      },
      {
        text: 'Аз _______ кебапче. (+)',
        blanks: [1], correctAnswers: ['ям'],
        options: ['ям', 'ядеш', 'яде', 'ядем', 'ядете', 'ядат', 'не ям', 'не ядеш', 'не яде', 'ядеш ли', 'ядете ли', 'яде ли'],
      },
      {
        text: 'Вие _______ макарони. (+)',
        blanks: [1], correctAnswers: ['ядете'],
        options: ['ям', 'ядеш', 'яде', 'ядем', 'ядете', 'ядат', 'не ям', 'не ядеш', 'не яде', 'ядеш ли', 'ядете ли', 'яде ли'],
      },
      {
        text: 'Вие _______ риба? (?)',
        blanks: [1], correctAnswers: ['ядете ли'],
        options: ['ям', 'ядеш', 'яде', 'ядем', 'ядете', 'ядат', 'не ям', 'не ядеш', 'не яде', 'ядеш ли', 'ядете ли', 'яде ли'],
      },
      {
        text: 'Ти _______ супа? (?)',
        blanks: [1], correctAnswers: ['ядеш ли'],
        options: ['ям', 'ядеш', 'яде', 'ядем', 'ядете', 'ядат', 'не ям', 'не ядеш', 'не яде', 'ядеш ли', 'ядете ли', 'яде ли'],
      },
      {
        text: 'Ти _______ сладолед. (+)',
        blanks: [1], correctAnswers: ['ядеш'],
        options: ['ям', 'ядеш', 'яде', 'ядем', 'ядете', 'ядат', 'не ям', 'не ядеш', 'не яде', 'ядеш ли', 'ядете ли', 'яде ли'],
      },
      {
        text: 'Той _______ шишче. (–)',
        blanks: [1], correctAnswers: ['не яде'],
        options: ['ям', 'ядеш', 'яде', 'ядем', 'ядете', 'ядат', 'не ям', 'не ядеш', 'не яде', 'ядеш ли', 'ядете ли', 'яде ли'],
      },
      {
        text: 'Той _______ кюфте? (?)',
        blanks: [1], correctAnswers: ['яде ли'],
        options: ['ям', 'ядеш', 'яде', 'ядем', 'ядете', 'ядат', 'не ям', 'не ядеш', 'не яде', 'ядеш ли', 'ядете ли', 'яде ли'],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ORDER 21: НОВИ ДУМИ 4 – Хранения (Page 29)
  {
    id: 'l03-novi-dumi-04',
    type: 'illustrated_cards',
    title: 'НОВИ ДУМИ 4',
    instruction: 'Запознайте се с храненията през деня. Натиснете за произношение.',
    order: 21,
    cards: [
      { id: 'sutrin',   imageUrl: '/assets/lesson-03/novi-dumi-4-meals/sutrin.jpg',   label: 'сутрин', sublabels: ['ям сутрин = закусвам', 'закуска'] },
      { id: 'na-obqd',  imageUrl: '/assets/lesson-03/novi-dumi-4-meals/na-obyd.jpg',  label: 'на обяд', sublabels: ['ям на обяд = обядвам', 'обяд'] },
      { id: 'vecher',   imageUrl: '/assets/lesson-03/novi-dumi-4-meals/vecher.jpg',   label: 'вечер', sublabels: ['ям вечер = вечерям', 'вечеря'] },
    ],
  } as IllustratedCardsExercise,

  // ORDER 22: ДИАЛОГ 3 – а. (Page 29)
  {
    id: 'l03-dialog-03',
    type: 'dialogues',
    title: 'ДИАЛОГ 3',
    instruction: 'Прочетете диалога. Натиснете за произношение.',
    order: 22,
    sections: [
      {
        id: 'a',
        lines: [
          { speaker: 'A', text: 'Какво закусваш?', translations: { en: 'What do you have for breakfast?', ar: 'ماذا تتناول على الفطور؟', fr: 'Qu\'est-ce que tu prends au petit-déjeuner ?', fa: 'صبحانه چه می‌خوری؟', uk: 'Що ти снідаєш?', ru: 'Что ты ешь на завтрак?' } },
          { speaker: 'Б', text: 'Сутрин ям сандвич и пия кафе.', translations: { en: 'In the morning I eat a sandwich and drink coffee.', ar: 'في الصباح آكل ساندويتش وأشرب قهوة.', fr: 'Le matin, je mange un sandwich et je bois du café.', fa: 'صبح ساندویچ می‌خورم و قهوه می‌نوشم.', uk: 'Вранці я їм сандвіч і п\'ю каву.', ru: 'Утром я ем сэндвич и пью кофе.' } },
          { speaker: 'A', text: 'Какво обядваш?', translations: { en: 'What do you have for lunch?', ar: 'ماذا تتناول على الغداء؟', fr: 'Qu\'est-ce que tu manges à midi ?', fa: 'ناهار چه می‌خوری؟', uk: 'Що ти обідаєш?', ru: 'Что ты ешь на обед?' } },
          { speaker: 'Б', text: 'На обяд ям риба и салата и пия сок.', translations: { en: 'For lunch I eat fish and salad and drink juice.', ar: 'على الغداء آكل سمكًا وسلطة وأشرب عصيرًا.', fr: 'À midi, je mange du poisson et de la salade et je bois du jus.', fa: 'ناهار ماهی و سالاد می‌خورم و آبمیوه می‌نوشم.', uk: 'На обід я їм рибу і салат і п\'ю сік.', ru: 'На обед я ем рыбу и салат и пью сок.' } },
          { speaker: 'A', text: 'Какво вечеряш?', translations: { en: 'What do you have for dinner?', ar: 'ماذا تتناول على العشاء؟', fr: 'Qu\'est-ce que tu manges le soir ?', fa: 'شام چه می‌خوری؟', uk: 'Що ти вечеряєш?', ru: 'Что ты ешь на ужин?' } },
          { speaker: 'Б', text: 'Вечер ям макарони и пия айрян.', translations: { en: 'In the evening I eat pasta and drink ayran.', ar: 'في المساء آكل معكرونة وأشرب عيران.', fr: 'Le soir, je mange des pâtes et je bois de l\'ayran.', fa: 'عصر ماکارونی می‌خورم و دوغ می‌نوشم.', uk: 'Увечері я їм макарони і п\'ю айран.', ru: 'Вечером я ем макароны и пью айран.' } },
        ],
      },
    ],
  } as DialoguesExercise,

  // ORDER 23: Упр. 18 – Какво закусвате, обядвате и вечеряте? (Page 29)
  // TODO: Needs new scroll/picker component — using workbook_fill_blank as placeholder
  {
    id: 'l03-ex-18',
    type: 'workbook_fill_blank',
    instruction: 'Какво закусвате, обядвате и вечеряте? Попълнете по модела.',
    order: 23,
    points: 4,
    layout: 'single',
    sentences: [
      {
        text: 'Аз закусвам кроасан и кафе.',
        blanks: [], correctAnswers: [], isExample: true,
      },
      {
        text: 'Аз обядвам _______ и _______.',
        blanks: [2, 4],
        correctAnswers: ['макарони', 'портокалов сок'],
        acceptableAnswers: [
          ['макарони', 'супа', 'мусака', 'риба', 'салата'],
          ['портокалов сок', 'айрян', 'вода', 'кока-кола', 'минерална вода'],
        ],
        options: [
          ['макарони', 'супа', 'мусака', 'риба', 'салата'],
          ['портокалов сок', 'айрян', 'вода', 'кока-кола', 'минерална вода'],
        ],
      },
      {
        text: 'Аз вечерям _______ и _______.',
        blanks: [2, 4],
        correctAnswers: ['салата', 'вода'],
        acceptableAnswers: [
          ['салата', 'шишче', 'кебапче', 'риба', 'пица'],
          ['вода', 'айрян', 'сок', 'чай', 'кафе'],
        ],
        options: [
          ['салата', 'шишче', 'кебапче', 'риба', 'пица'],
          ['вода', 'айрян', 'сок', 'чай', 'кафе'],
        ],
      },
    ],
  } as WorkbookFillBlankExercise,

  // Упр. 19 – SKIP (per client)
  // Упр. 20 – SKIP (per client)

  // ─────────────────────────────────────────────────────────────────────────
  // СТРАНИЦА 30
  // ─────────────────────────────────────────────────────────────────────────

  // Упр. 21 – SKIP (per client)
  // Упр. 22 – SKIP (per client)

  // ORDER 24: ГРАМАТИКА 3 – Глагол → Съществително (Page 30)
  {
    id: 'l03-gramatika-03',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 3',
    instruction: '',
    order: 24,
    tableTitle: 'Глагол → Съществително',
    columns: [],
    rows: [
      { pronoun: '1', cells: ['закусвам', 'закуска'] },
      { pronoun: '2', cells: ['обядвам',  'обяд'] },
      { pronoun: '3', cells: ['вечерям',  'вечеря'] },
      { pronoun: '4', cells: ['пия',      'пиене'] },
      { pronoun: '5', cells: ['ям',       'ядене'] },
    ],
  } as GrammarTableExercise,

  // ORDER 25: Упр. 23 – Отговорете на въпросите (Page 30)
  // TODO: Needs food images for each answer (супа, мусака, вода, шишче, сладолед)
  {
    id: 'l03-ex-23',
    type: 'dropdown_match',
    instruction: 'Отговорете на въпросите по модела. Модел: Какво искате за закуска? – За закуска искам филия с масло.',
    order: 25,
    points: 5,
    questions: [
      { id: 'q1', left: 'Какво искате за обяд?',    options: ['Искам супа.', 'Искам мусака.', 'Искам шишче.', 'Искам сладолед.', 'Искам вода.'], correctAnswer: 'Искам супа.', alternateCorrectAnswers: ['Искам мусака.', 'Искам шишче.'] },
      { id: 'q2', left: 'Какво искате за вечеря?',   options: ['Искам супа.', 'Искам мусака.', 'Искам шишче.', 'Искам сладолед.', 'Искам вода.'], correctAnswer: 'Искам мусака.', alternateCorrectAnswers: ['Искам супа.', 'Искам шишче.'] },
      { id: 'q3', left: 'Какво искате за пиене?',    options: ['Искам супа.', 'Искам мусака.', 'Искам шишче.', 'Искам сладолед.', 'Искам вода.'], correctAnswer: 'Искам вода.' },
      { id: 'q4', left: 'Какво искате за ядене?',    options: ['Искам супа.', 'Искам мусака.', 'Искам шишче.', 'Искам сладолед.', 'Искам вода.'], correctAnswer: 'Искам шишче.', alternateCorrectAnswers: ['Искам супа.', 'Искам мусака.'] },
      { id: 'q5', left: 'Какво искате за десерт?',   options: ['Искам супа.', 'Искам мусака.', 'Искам шишче.', 'Искам сладолед.', 'Искам вода.'], correctAnswer: 'Искам сладолед.' },
    ],
  } as DropdownMatchExercise,

  // ORDER 26: ГРАМАТИКА 4 – Число на съществителните (Page 30)
  {
    id: 'l03-gramatika-04',
    instructionKey: 'grammar.l03.g4.instruction',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 4',
    subtitle: 'Граматика – Число на съществителните (3)',
    instruction: 'Запознайте се с множественото число на съществителните.',
    order: 26,
    illustrations: [
      { imageUrl: '/assets/lesson-03/gramatika-4/sandvich.jpg', singularLabel: 'един',  pluralLabel: 'много', pluralCount: 3 },
      { imageUrl: '/assets/lesson-03/gramatika-4/supa.jpg',     singularLabel: 'една',  pluralLabel: 'много', pluralCount: 3 },
      { imageUrl: '/assets/lesson-03/gramatika-4/kafe.jpg',     singularLabel: 'едно',  pluralLabel: 'много', pluralCount: 3 },
    ],
    tableTitle: 'Число на съществителните',
    columns: ['един / една / едно', 'много'],
    rows: [
      { pronoun: 'мъжки род', cells: ['сандвич, сок',  'сандвичи, сокове'] },
      { pronoun: 'женски род', cells: ['супа, филия',   'супи, филии'] },
      { pronoun: 'среден род', cells: ['кафе, масло',  'кафета, масла'] },
    ],
    notes: [
      'Внимание! яйце – яйца',
      'мляко – млека',
    ],
  } as GrammarTableExercise,

  // ORDER 27: Упр. 24 – Напишете думите от м.р. в мн.ч. (Page 30)
  {
    id: 'l03-ex-24',
    type: 'workbook_fill_blank',
    instruction: 'Напишете думите от мъжки род в множествено число.',
    order: 27,
    points: 6,
    layout: 'two-column',
    sentences: [
      { text: 'сок — сокове', blanks: [], correctAnswers: [], isExample: true },
      { text: 'сладолед — _______', blanks: [1], correctAnswers: ['сладоледи'], options: ['сладоледи', 'сладоледа', 'сладоледе', 'сладоледове'] },
      { text: 'кроасан — _______',  blanks: [1], correctAnswers: ['кроасани'],  options: ['кроасани', 'кроасана', 'кроасане', 'кроасанове'] },
      { text: 'десерт — _______',   blanks: [1], correctAnswers: ['десерти'],   options: ['десерти', 'десерта', 'десерте', 'десертове'] },
      { text: 'шоколад — _______',  blanks: [1], correctAnswers: ['шоколади'],  options: ['шоколади', 'шоколада', 'шоколаде', 'шоколадове'] },
      { text: 'омлет — _______',    blanks: [1], correctAnswers: ['омлети'],    options: ['омлети', 'омлета', 'омлете', 'омлетове'] },
      { text: 'дюнер — _______',    blanks: [1], correctAnswers: ['дюнери'],    options: ['дюнери', 'дюнера', 'дюнере', 'дюнерове'] },
    ],
  } as WorkbookFillBlankExercise,

  // ORDER 28: Упр. 25 – Напишете думите от ж.р. в мн.ч. (Page 30)
  {
    id: 'l03-ex-25',
    type: 'workbook_fill_blank',
    instruction: 'Напишете думите от женски род в множествено число.',
    order: 28,
    points: 6,
    layout: 'two-column',
    sentences: [
      { text: 'баница — баници', blanks: [], correctAnswers: [], isExample: true },
      { text: 'мусака — _______', blanks: [1], correctAnswers: ['мусаки'], options: ['мусаки', 'мусаке', 'мусака', 'мусакита'] },
      { text: 'супа — _______',   blanks: [1], correctAnswers: ['супи'],   options: ['супи', 'супе', 'супа', 'супите'] },
      { text: 'салата — _______',  blanks: [1], correctAnswers: ['салати'], options: ['салати', 'салате', 'салата', 'салатите'] },
      { text: 'риба — _______',    blanks: [1], correctAnswers: ['риби'],   options: ['риби', 'рибе', 'риба', 'рибите'] },
      { text: 'филия — _______',   blanks: [1], correctAnswers: ['филии'], options: ['филии', 'филие', 'филия', 'филиите'] },
      { text: 'пица — _______',    blanks: [1], correctAnswers: ['пици'],   options: ['пици', 'пице', 'пица', 'пиците'] },
    ],
  } as WorkbookFillBlankExercise,

  // ─────────────────────────────────────────────────────────────────────────
  // СТРАНИЦА 31
  // ─────────────────────────────────────────────────────────────────────────

  // ORDER 29: Упр. 26 – Напишете думите от ср.р. в мн.ч. (Page 31)
  {
    id: 'l03-ex-26',
    type: 'workbook_fill_blank',
    instruction: 'Напишете думите от среден род в множествено число.',
    order: 29,
    points: 6,
    layout: 'two-column',
    sentences: [
      { text: 'шишче — шишчета', blanks: [], correctAnswers: [], isExample: true },
      { text: 'кебапче — _______', blanks: [1], correctAnswers: ['кебапчета'], options: ['кебапчета', 'кебапчи', 'кебапча', 'кебапчове'] },
      { text: 'кюфте — _______',   blanks: [1], correctAnswers: ['кюфтета'],   options: ['кюфтета', 'кюфти', 'кюфта', 'кюфтове'] },
      { text: 'кафе — _______',    blanks: [1], correctAnswers: ['кафета'],    options: ['кафета', 'кафи', 'кафа', 'кафове'] },
      { text: 'масло — _______',   blanks: [1], correctAnswers: ['масла'],     options: ['масла', 'маслета', 'маслове', 'масли'] },
      { text: 'яйце — _______',    blanks: [1], correctAnswers: ['яйца'],     options: ['яйца', 'яйцета', 'яйцове', 'яйци'] },
      { text: 'мляко — _______',   blanks: [1], correctAnswers: ['млека'],     options: ['млека', 'млякота', 'млекове', 'мляки'] },
    ],
  } as WorkbookFillBlankExercise,

  // ORDER 30: Упр. 27 – Напишете един, една, едно или много (Page 31)
  {
    id: 'l03-ex-27',
    type: 'workbook_fill_blank',
    instruction: 'Напишете един (мъжки род), една (женски род), едно (среден род) или много пред думите.',
    order: 30,
    points: 14,
    layout: 'two-column',
    sentences: [
      { text: '_______ цигара',    blanks: [0], correctAnswers: ['една'],  options: ['един', 'една', 'едно', 'много'] },
      { text: '_______ кафета',    blanks: [0], correctAnswers: ['много'], options: ['един', 'една', 'едно', 'много'] },
      { text: '_______ шишче',     blanks: [0], correctAnswers: ['едно'],  options: ['един', 'една', 'едно', 'много'] },
      { text: '_______ мусака',    blanks: [0], correctAnswers: ['една'],  options: ['един', 'една', 'едно', 'много'] },
      { text: '_______ масла',     blanks: [0], correctAnswers: ['много'], options: ['един', 'една', 'едно', 'много'] },
      { text: '_______ сокове',    blanks: [0], correctAnswers: ['много'], options: ['един', 'една', 'едно', 'много'] },
      { text: '_______ салата',    blanks: [0], correctAnswers: ['една'],  options: ['един', 'една', 'едно', 'много'] },
      { text: '_______ сандвичи',  blanks: [0], correctAnswers: ['много'], options: ['един', 'една', 'едно', 'много'] },
      { text: '_______ супи',      blanks: [0], correctAnswers: ['много'], options: ['един', 'една', 'едно', 'много'] },
      { text: '_______ омлет',     blanks: [0], correctAnswers: ['един'],  options: ['един', 'една', 'едно', 'много'] },
      { text: '_______ кебапчета', blanks: [0], correctAnswers: ['много'], options: ['един', 'една', 'едно', 'много'] },
      { text: '_______ сладолед',  blanks: [0], correctAnswers: ['един'],  options: ['един', 'една', 'едно', 'много'] },
      { text: '_______ филии',     blanks: [0], correctAnswers: ['много'], options: ['един', 'една', 'едно', 'много'] },
      { text: '_______ айрян',     blanks: [0], correctAnswers: ['един'],  options: ['един', 'една', 'едно', 'много'] },
    ],
  } as WorkbookFillBlankExercise,

  // ORDER 31: Упр. 28 – Напишете храните в множествено число (Page 31)
  {
    id: 'l03-ex-28',
    type: 'workbook_fill_blank',
    instruction: 'Напишете храните в множествено число по модела.',
    order: 31,
    points: 15,
    layout: 'single',
    sentences: [
      {
        text: 'Ани иска една салата, едно кюфте и един сок. | Ние искаме много салати, кюфтета и сокове.',
        blanks: [], correctAnswers: [], isExample: true,
      },
      {
        text: 'Кирил иска един омлет, едно кафе и една цигара. | Вие искате много _______, _______ и _______.',
        blanks: [7, 8, 10],
        correctAnswers: ['омлети', 'кафета', 'цигари'],
        options: [
          ['омлети', 'омлета', 'омлетове', 'омлет'],
          ['кафета', 'кафе', 'кафи', 'кафове'],
          ['цигари', 'цигара', 'цигарета', 'цигаре'],
        ],
      },
      {
        text: 'Михаил иска една пица, една салата и един шоколад. | Те искат много _______, _______ и _______.',
        blanks: [7, 8, 10],
        correctAnswers: ['пици', 'салати', 'шоколади'],
        options: [
          ['пици', 'пица', 'пицета', 'пице'],
          ['салати', 'салата', 'салате', 'салатове'],
          ['шоколади', 'шоколада', 'шоколаде', 'шоколадове'],
        ],
      },
      {
        text: 'Иво иска една супа, едно шишче и един сладолед. | Ние искаме много _______, _______ и _______.',
        blanks: [7, 8, 10],
        correctAnswers: ['супи', 'шишчета', 'сладоледи'],
        options: [
          ['супи', 'супа', 'супе', 'супове'],
          ['шишчета', 'шишче', 'шишчи', 'шишчове'],
          ['сладоледи', 'сладолед', 'сладоледа', 'сладоледове'],
        ],
      },
      {
        text: 'Таня иска едно мляко, една баница и едно кафе. | Вие искате много _______, _______ и _______.',
        blanks: [7, 8, 10],
        correctAnswers: ['млека', 'баници', 'кафета'],
        options: [
          ['млека', 'мляко', 'мляки', 'млекове'],
          ['баници', 'баница', 'баницета', 'баниче'],
          ['кафета', 'кафе', 'кафи', 'кафове'],
        ],
      },
      {
        text: 'Петя иска една филия, едно кебапче и един кроасан. | Те искат много _______, _______ и _______.',
        blanks: [7, 8, 10],
        correctAnswers: ['филии', 'кебапчета', 'кроасани'],
        options: [
          ['филии', 'филия', 'филие', 'филиове'],
          ['кебапчета', 'кебапче', 'кебапчи', 'кебапчове'],
          ['кроасани', 'кроасан', 'кроасана', 'кроасанове'],
        ],
      },
    ],
  } as WorkbookFillBlankExercise,

  // Упр. 29а – SKIP (per client)
  // Упр. 29б – SKIP (per client)

  // ─────────────────────────────────────────────────────────────────────────
  // СТРАНИЦИ 32–33
  // ─────────────────────────────────────────────────────────────────────────

  // ORDER 32: Упр. 30 – Прочетете текста за Борис и Анастасия (Page 32)
  {
    id: 'l03-ex-30',
    type: 'table_fill',
    title: 'УПРАЖНЕНИЕ 30',
    instruction: 'Прочетете текста за Борис и Анастасия и попълнете таблицата.',
    order: 32,
    points: 11,
    paragraphs: [
      {
        speaker: 'Борис',
        text: 'Той е от България. Казва се Борис. Сутрин яде баница и пие чай със захар. На обяд яде супа, салата и шишче, а за десерт яде торта. Пие кока-кола. Вечер яде сандвич с кашкавал и пие сок.',
      },
      {
        speaker: 'Анастасия',
        text: 'Тя е от Украйна. Казва се Анастасия. Закусва сандвичи и чай. Обядва супа и пиле с ориз. Пие вода. Вечеря салата и риба с картофи.',
      },
    ],
    tables: [
      {
        name: 'Борис',
        columns: ['пие', 'яде'],
        rows: [
          {
            label: 'сутрин',
            cells: [
              { correctAnswers: ['чай със захар'], options: ['чай със захар', 'кока-кола', 'сок', 'чай', 'вода'] },
              { correctAnswers: ['баница'], options: ['баница', 'супа, салата, шишче, торта', 'сандвич с кашкавал', 'сандвичи', 'супа, пиле с ориз', 'салата, риба с картофи'] },
            ],
          },
          {
            label: 'на обяд',
            cells: [
              { correctAnswers: ['кока-кола'], options: ['чай със захар', 'кока-кола', 'сок', 'чай', 'вода'] },
              { correctAnswers: ['супа, салата, шишче, торта'], options: ['баница', 'супа, салата, шишче, торта', 'сандвич с кашкавал', 'сандвичи', 'супа, пиле с ориз', 'салата, риба с картофи'] },
            ],
          },
          {
            label: 'вечер',
            cells: [
              { correctAnswers: ['сок'], options: ['чай със захар', 'кока-кола', 'сок', 'чай', 'вода'] },
              { correctAnswers: ['сандвич с кашкавал'], options: ['баница', 'супа, салата, шишче, торта', 'сандвич с кашкавал', 'сандвичи', 'супа, пиле с ориз', 'салата, риба с картофи'] },
            ],
          },
        ],
      },
      {
        name: 'Анастасия',
        columns: ['пие', 'яде'],
        rows: [
          {
            label: 'сутрин',
            cells: [
              { correctAnswers: ['чай'], options: ['чай със захар', 'кока-кола', 'сок', 'чай', 'вода', '—'] },
              { correctAnswers: ['сандвичи'], options: ['баница', 'супа, салата, шишче, торта', 'сандвич с кашкавал', 'сандвичи', 'супа, пиле с ориз', 'салата, риба с картофи'] },
            ],
          },
          {
            label: 'на обяд',
            cells: [
              { correctAnswers: ['вода'], options: ['чай със захар', 'кока-кола', 'сок', 'чай', 'вода', '—'] },
              { correctAnswers: ['супа, пиле с ориз'], options: ['баница', 'супа, салата, шишче, торта', 'сандвич с кашкавал', 'сандвичи', 'супа, пиле с ориз', 'салата, риба с картофи'] },
            ],
          },
          {
            label: 'вечер',
            cells: [
              { correctAnswers: ['—'], options: ['чай със захар', 'кока-кола', 'сок', 'чай', 'вода', '—'] },
              { correctAnswers: ['салата, риба с картофи'], options: ['баница', 'супа, салата, шишче, торта', 'сандвич с кашкавал', 'сандвичи', 'супа, пиле с ориз', 'салата, риба с картофи'] },
            ],
          },
        ],
      },
    ],
  } as TableFillExercise,

  // ORDER 33: Упр. 31 – ТЕКСТОВЕ (Page 33)
  {
    id: 'l03-ex-31',
    type: 'reading_text',
    title: 'ТЕКСТОВЕ',
    instruction: 'Прочетете текстовете.',
    order: 33,
    showDictionary: true,
    images: [
      { imageUrl: '/assets/lesson-03/tekstove/tarator.png',        label: 'таратор' },
      { imageUrl: '/assets/lesson-03/tekstove/shopska-salata.png', label: 'шопска салата' },
      { imageUrl: '/assets/lesson-03/tekstove/humus.png',          label: 'хумус' },
      { imageUrl: '/assets/lesson-03/tekstove/sarmi.png',          label: 'сарми' },
      { imageUrl: '/assets/lesson-03/tekstove/agnesko-s-oriz.png', label: 'агнешко с ориз' },
      { imageUrl: '/assets/lesson-03/tekstove/kyufte.png',         label: 'кюфте' },
      { imageUrl: '/assets/lesson-03/tekstove/baklava.png',        label: 'баклава' },
      { imageUrl: '/assets/lesson-03/tekstove/banitsa.png',        label: 'баница' },
      { imageUrl: '/assets/lesson-03/tekstove/krem-karamel.png',   label: 'крем карамел' },
    ],
    paragraphs: [
      'Тихомир обядва в ресторант „Градина". Той яде таратор, печена риба с пържени картофи и шопска салата. За десерт яде крем карамел. Пие газирана вода. Плаща 28 евро. Сметката е 25 евро и три евро за бакшиш. Той обича ресторант „Градина".',
      'Ахмед е арабин. Той обича агнешко месо, не яде свинско. Сега вечеря в арабски ресторант. Той иска агнешки шишчета и хумус, за десерт – баклава. Пие айрян. Сметката е 29 евро.',
      'Санди е сирийка. Тя е в един ресторант с Амира и Стефан. Санди обядва пиле с картофи. Пие минерална вода. За десерт яде сладолед. Амира не яде месо. Тя е вегетарианка. Обядва таратор и пица. Тя пие газирана вода. Стефан също е вегетарианец. Той яде за обяд супа от леща, шопска салата и торта. Пие сок.',
    ],
  } as ReadingTextExercise,

  // ORDER 34: Упр. 32 – Вярно или грешно? (Page 33)
  {
    id: 'l03-ex-32',
    type: 'true_false',
    instruction: 'На база на текстовете по-горе, определете дали твърденията са верни или не.',
    order: 34,
    points: 6,
    sentences: [
      { id: 's1', text: 'Тихомир обядва в ресторант „Градина".',  isTrue: true },
      { id: 's2', text: 'Той не обича ресторант „Градина".',       isTrue: false },
      { id: 's3', text: 'Ахмед е българин.',                       isTrue: false },
      { id: 's4', text: 'Той обича агнешко месо.',                  isTrue: true },
      { id: 's5', text: 'Амира е вегетарианка.',                    isTrue: true },
      { id: 's6', text: 'Стефан не е вегетарианец.',                isTrue: false },
    ],
  } as TrueFalseExercise,

  // ORDER 35: Упр. 33 – Отговорете на въпросите (Page 33)
  {
    id: 'l03-ex-33',
    type: 'dropdown_match',
    instruction: 'Отговорете на въпросите на база на текстовете.',
    order: 35,
    points: 8,
    questions: [
      { id: 'q1', left: 'Какво обядва Тихомир?',             options: ['таратор, печена риба и шопска салата', 'пиле с картофи', 'супа от леща', 'агнешки шишчета'], correctAnswer: 'таратор, печена риба и шопска салата' },
      { id: 'q2', left: 'Колко евро плаща?',                  options: ['25 евро', '28 евро', '29 евро', '30 евро'], correctAnswer: '28 евро' },
      { id: 'q3', left: 'Какво иска Ахмед за вечеря?',       options: ['агнешки шишчета и хумус', 'таратор и пица', 'пиле с картофи', 'супа и салата'], correctAnswer: 'агнешки шишчета и хумус' },
      { id: 'q4', left: 'Колко евро е сметката на Ахмед?',   options: ['25 евро', '28 евро', '29 евро', '30 евро'], correctAnswer: '29 евро' },
      { id: 'q5', left: 'Откъде е Санди?',                    options: ['от Сирия', 'от България', 'от Ирак', 'от Украйна'], correctAnswer: 'от Сирия' },
      { id: 'q6', left: 'Какво обядва тя?',                   options: ['пиле с картофи', 'таратор и пица', 'супа от леща', 'печена риба'], correctAnswer: 'пиле с картофи' },
      { id: 'q7', left: 'Какво пие Амира?',                   options: ['газирана вода', 'сок', 'айрян', 'минерална вода'], correctAnswer: 'газирана вода' },
      { id: 'q8', left: 'Какво яде Стефан за обяд?',         options: ['супа от леща, шопска салата и торта', 'пиле с картофи', 'агнешки шишчета', 'таратор и пица'], correctAnswer: 'супа от леща, шопска салата и торта' },
    ],
  } as DropdownMatchExercise,

];

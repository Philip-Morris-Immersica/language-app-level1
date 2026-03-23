import type {
  Exercise,
  ReadingTextExercise,
  TrueFalseExercise,
  WorkbookFillBlankExercise,
  WordOrderExercise,
  MultipleChoiceExercise,
  SyllableBlocksExercise,
} from '@/content/types';

// ═══════════════════════════════════════════════════════════════════════════════
// КОМПОНЕНТ СЛУШАНЕ (8 т.)
// Текстът се показва визуално (reading_text) вместо аудио.
// TODO: добави audioUrl когато аудиото стане налично.
// ═══════════════════════════════════════════════════════════════════════════════

export const listeningExercises: Exercise[] = [
  {
    id: 't01-sl-text',
    type: 'reading_text',
    title: 'КОМПОНЕНТ СЛУШАНЕ',
    instruction: 'Слушайте текста и отговорете на въпросите с ДА или НЕ.',
    order: 1,
    hideText: true,
    images: [
      { imageUrl: '/assets/test-a1-1/slushane/yana-bulgaria.jpg', label: 'Яна — България' },
      { imageUrl: '/assets/test-a1-1/slushane/ahmed-siria.jpg', label: 'Ахмед — Сирия' },
    ],
    paragraphs: [
      'Здравейте, аз съм Яна. Аз съм българка. От София съм. Учителка съм по български език. Много обичам баница, кисело мляко, сирене и чай с мед. Не обичам прясно мляко и капучино.',
      'Здравейте, аз съм Ахмед. Аз съм бежанец от Сирия. Обичам българска и арабска храна. Не обичам кафе.',
    ],
  } as ReadingTextExercise,

  {
    id: 't01-sl-tf',
    type: 'true_false',
    instruction: 'Слушайте текста и отговорете на въпросите с ДА или НЕ.',
    order: 2,
    points: 8,
    model: { text: 'Яна е българка.', isTrue: true },
    sentences: [
      { id: 's1', text: 'Тя е от София.', isTrue: true },
      { id: 's2', text: 'Тя е учителка по арабски език.', isTrue: false },
      { id: 's3', text: 'Яна обича чай с мед.', isTrue: true },
      { id: 's4', text: 'Тя обича капучино.', isTrue: false },
      { id: 's5', text: 'Ахмед е бежанец.', isTrue: true },
      { id: 's6', text: 'Ахмед е иракчанин.', isTrue: false },
      { id: 's7', text: 'Той обича българска храна.', isTrue: true },
      { id: 's8', text: 'Той не обича кафе.', isTrue: true },
    ],
  } as TrueFalseExercise,
];

// ═══════════════════════════════════════════════════════════════════════════════
// КОМПОНЕНТ ЧЕТЕНЕ (11 т.)
// ═══════════════════════════════════════════════════════════════════════════════

export const readingExercises: Exercise[] = [
  {
    id: 't01-ch-text',
    type: 'reading_text',
    title: 'КОМПОНЕНТ ЧЕТЕНЕ',
    instruction: 'Прочетете текста и попълнете празните места.',
    order: 3,
    noTranslation: true,
    images: [
      { imageUrl: '/assets/test-a1-1/chetene/lin-siriya.jpg', label: 'Лин — Сирия' },
      { imageUrl: '/assets/test-a1-1/chetene/irak-dvama.jpg', label: 'Али — Ирак' },
    ],
    paragraphs: [
      'Лин е сирийка. Тя е от Алепо. За закуска обича яйца и кафе с мляко без захар. Не обича черен чай. Обядва салата и риба. Не обича супа. Лин вечеря омлет и филия хляб. За десерт яде торта или палачинка с шоколад.',
      'Али е иракчанин. Закусва сирене, хляб и кафе. Не обича капучино. За обяд предпочита супа и телешко месо. Не обича пържени картофи. За вечеря яде пиле с ориз.',
    ],
  } as ReadingTextExercise,

  {
    id: 't01-ch-fill',
    type: 'workbook_fill_blank',
    instruction: 'Прочетете текста и попълнете празните места.',
    order: 4,
    points: 11,
    layout: 'single',
    sentences: [
      { text: 'Лин е сирийка.', blanks: [], correctAnswers: [], isExample: true },
      { text: 'Тя е от _______.', blanks: [3], correctAnswers: ['Алепо'], options: ['Алепо', 'Багдад', 'София', 'Дамаск'] },
      { text: 'Тя обича яйца за _______.', blanks: [4], correctAnswers: ['закуска'], options: ['закуска', 'обяд', 'вечеря', 'десерт'] },
      { text: 'Лин не обича _______ чай.', blanks: [3], correctAnswers: ['черен'], options: ['черен', 'зелен', 'бял', 'студен'] },
      { text: 'Тя _______ салата и риба.', blanks: [1], correctAnswers: ['обядва'], options: ['обядва', 'закусва', 'вечеря', 'обича'] },
      { text: 'Лин не обича _______.', blanks: [3], correctAnswers: ['супа'], options: ['супа', 'риба', 'салата', 'торта'] },
      { text: 'Тя обича палачинка с _______.', blanks: [4], correctAnswers: ['шоколад'], options: ['шоколад', 'мед', 'захар', 'сирене'] },
      { text: '_______ е иракчанин.', blanks: [0], correctAnswers: ['Али'], options: ['Али', 'Лин', 'Яна', 'Ахмед'] },
      { text: 'Той _______ сирене, хляб и _______.', blanks: [1, 5], correctAnswers: ['закусва', 'кафе'], options: [['закусва', 'обядва', 'вечеря', 'обича'], ['кафе', 'чай', 'мляко', 'сок']] },
      { text: 'Не обича _______.', blanks: [2], correctAnswers: ['капучино'], options: ['капучино', 'кафе', 'чай', 'сирене'] },
      { text: 'Обядва супа и _______ месо.', blanks: [3], correctAnswers: ['телешко'], options: ['телешко', 'пилешко', 'пържено', 'месно'] },
      { text: 'Не обича _______ картофи.', blanks: [2], correctAnswers: ['пържени'], options: ['пържени', 'варени', 'печени', 'пресни'] },
      { text: 'Вечеря _______.', blanks: [1], correctAnswers: ['пиле с ориз'], options: ['пиле с ориз', 'супа', 'салата', 'омлет'] },
    ],
  } as WorkbookFillBlankExercise,
];

// ═══════════════════════════════════════════════════════════════════════════════
// КОМПОНЕНТ ГРАМАТИКА (63 т.)
// 5 упражнения: съм (8), наредба (15), един/една/едно (12), глаголи (13), числа (15)
// ═══════════════════════════════════════════════════════════════════════════════

export const grammarExercises: Exercise[] = [

  // ─── Упражнение 1: Глагол „съм" (8 т.) ──────────────────────────────────────
  {
    id: 't01-gr-1',
    type: 'workbook_fill_blank',
    instruction: 'Поставете глагола „съм" в правилната форма.',
    order: 5,
    points: 8,
    layout: 'two-column',
    sentences: [
      { text: 'Той е от Дамаск.', blanks: [], correctAnswers: [], isExample: true },
      { text: 'Ние _______ Салеха и Набил.', blanks: [1], correctAnswers: ['сме'], options: ['съм', 'си', 'е', 'сме', 'сте', 'са'] },
      { text: 'Вие _______ учители.', blanks: [1], correctAnswers: ['сте'], options: ['съм', 'си', 'е', 'сме', 'сте', 'са'] },
      { text: 'Силвия _______ от България.', blanks: [1], correctAnswers: ['е'], options: ['съм', 'си', 'е', 'сме', 'сте', 'са'] },
      { text: 'Аз _______ Несрин.', blanks: [1], correctAnswers: ['съм'], options: ['съм', 'си', 'е', 'сме', 'сте', 'са'] },
      { text: 'Мая и Христо _______ учители.', blanks: [3], correctAnswers: ['са'], options: ['съм', 'си', 'е', 'сме', 'сте', 'са'] },
      { text: 'Детето _______ от София.', blanks: [1], correctAnswers: ['е'], options: ['съм', 'си', 'е', 'сме', 'сте', 'са'] },
      { text: 'Слав _______ мениджър.', blanks: [1], correctAnswers: ['е'], options: ['съм', 'си', 'е', 'сме', 'сте', 'са'] },
      { text: 'Аз и ти _______ сирийци.', blanks: [3], correctAnswers: ['сме'], options: ['съм', 'си', 'е', 'сме', 'сте', 'са'] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── Упражнение 2: Подредете думите (15 т.) ─────────────────────────────────
  {
    id: 't01-gr-2',
    type: 'word_order',
    instruction: 'Подредете думите в изречения.',
    order: 6,
    points: 15,
    questions: [
      { words: ['българин', 'той', 'е', 'ли', '?'], correctSentence: 'Той българин ли е ?' },
      { words: ['ли', 'учителка', 'е', 'тя', '?'], correctSentence: 'Тя учителка ли е ?' },
      { words: ['не', 'Багдад', 'те', 'от', 'са', '.'], correctSentence: 'Те не са от Багдад .' },
      { words: ['сирийци', 'ли', 'вие', 'сте', '?'], correctSentence: 'Вие сирийци ли сте ?' },
      { words: ['са', 'не', 'те', 'бизнесмени', '.'], correctSentence: 'Те не са бизнесмени .' },
      { words: ['е', 'това', 'какво', '?'], correctSentence: 'Какво е това ?' },
      { words: ['сте', 'вие', 'откъде', '?'], correctSentence: 'Вие откъде сте ?' },
      { words: ['си', 'как', '?'], correctSentence: 'Как си ?' },
      { words: ['е', 'ми', 'приятно', '!'], correctSentence: 'Приятно ми е !' },
      { words: ['Али', 'е', 'откъде', '?'], correctSentence: 'Откъде е Али ?' },
      { words: ['добре', 'са', 'ли', 'те', '?'], correctSentence: 'Те добре ли са ?' },
      { words: ['ли', 'капучино', 'има', '?'], correctSentence: 'Има ли капучино ?' },
      { words: ['ли', 'са', 'бежанци', 'те', '?'], correctSentence: 'Те бежанци ли са ?' },
      { words: ['кафе', 'обичате', 'ли', '?'], correctSentence: 'Обичате ли кафе ?' },
      { words: ['капучино', 'той', 'иска', 'ли', '?'], correctSentence: 'Той иска ли капучино ?' },
    ],
  } as WordOrderExercise,

  // ─── Упражнение 3: Подчертайте правилната форма — един/една/едно (12 т.) ────
  {
    id: 't01-gr-3',
    type: 'multiple_choice',
    instruction: 'Подчертайте правилната форма.',
    order: 7,
    points: 12,
    questions: [
      { question: 'закуска', options: ['една', 'един'], correctIndex: 0 },
      { question: 'кисело мляко', options: ['един', 'едно'], correctIndex: 1 },
      { question: 'салата', options: ['един', 'една'], correctIndex: 1 },
      { question: 'шоколад', options: ['един', 'една'], correctIndex: 0 },
      { question: 'сладолед', options: ['една', 'един'], correctIndex: 1 },
      { question: 'иракчанин', options: ['едно', 'един'], correctIndex: 1 },
      { question: 'пица', options: ['една', 'един'], correctIndex: 0 },
      { question: 'масло', options: ['един', 'едно'], correctIndex: 1 },
      { question: 'кюфте', options: ['един', 'едно'], correctIndex: 1 },
      { question: 'вода', options: ['един', 'една'], correctIndex: 1 },
      { question: 'кебапче', options: ['едно', 'един'], correctIndex: 0 },
      { question: 'лев', options: ['един', 'едно'], correctIndex: 0 },
    ],
  } as MultipleChoiceExercise,

  // ─── Упражнение 4: Глаголи в правилната форма (13 т.) ───────────────────────
  {
    id: 't01-gr-4',
    type: 'workbook_fill_blank',
    instruction: 'Поставете глаголите в правилната форма.',
    order: 8,
    points: 13,
    layout: 'single',
    sentences: [
      { text: 'Лейла и Тамара обичат кафе със захар. (обичам)', blanks: [], correctAnswers: [], isExample: true },
      { text: 'Ти _______ ли сок от портокал? (обичам)', blanks: [1], correctAnswers: ['обичаш'], options: ['обичам', 'обичаш', 'обича', 'обичаме', 'обичате', 'обичат'] },
      { text: 'Ана _______ плодове и кафе с мляко. (закусвам)', blanks: [1], correctAnswers: ['закусва'], options: ['закусвам', 'закусваш', 'закусва', 'закусваме', 'закусвате', 'закусват'] },
      { text: 'Те _______ пиле с ориз. (вечерям)', blanks: [1], correctAnswers: ['вечерят'], options: ['вечерям', 'вечеряш', 'вечеря', 'вечеряме', 'вечеряте', 'вечерят'] },
      { text: 'Мария, какво _______ за обяд? (искам)', blanks: [2], correctAnswers: ['искаш'], options: ['искам', 'искаш', 'иска', 'искаме', 'искате', 'искат'] },
      { text: 'Ние _______ риба и пържени картофи. (обядвам)', blanks: [1], correctAnswers: ['обядваме'], options: ['обядвам', 'обядваш', 'обядва', 'обядваме', 'обядвате', 'обядват'] },
      { text: 'Вие _______ ли кока-кола? (искам)', blanks: [1], correctAnswers: ['искате'], options: ['искам', 'искаш', 'иска', 'искаме', 'искате', 'искат'] },
      { text: 'Тя не _______ сандвич с кашкавал и домат. (обичам)', blanks: [2], correctAnswers: ['обича'], options: ['обичам', 'обичаш', 'обича', 'обичаме', 'обичате', 'обичат'] },
      { text: 'Той _______ ли мусака за вечеря? (искам)', blanks: [1], correctAnswers: ['иска'], options: ['искам', 'искаш', 'иска', 'искаме', 'искате', 'искат'] },
      { text: 'Ти какво _______ ? (закусвам)', blanks: [2], correctAnswers: ['закусваш'], options: ['закусвам', 'закусваш', 'закусва', 'закусваме', 'закусвате', 'закусват'] },
      { text: 'Той _______ ли супа? (обядвам)', blanks: [1], correctAnswers: ['обядва'], options: ['обядвам', 'обядваш', 'обядва', 'обядваме', 'обядвате', 'обядват'] },
      { text: 'Какво _______ Ана и Алекс? (вечерям)', blanks: [1], correctAnswers: ['вечерят'], options: ['вечерям', 'вечеряш', 'вечеря', 'вечеряме', 'вечеряте', 'вечерят'] },
      { text: 'Ние не _______ таратор. (искам)', blanks: [2], correctAnswers: ['искаме'], options: ['искам', 'искаш', 'иска', 'искаме', 'искате', 'искат'] },
      { text: 'Тя не _______ капучино със захар. (обичам)', blanks: [2], correctAnswers: ['обича'], options: ['обичам', 'обичаш', 'обича', 'обичаме', 'обичате', 'обичат'] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── Упражнение 5: Напишете числото с цифри (15 т.) ─────────────────────────
  {
    id: 't01-gr-5',
    type: 'workbook_fill_blank',
    instruction: 'Напишете числото с цифри.',
    order: 9,
    points: 15,
    layout: 'two-column',
    sentences: [
      { text: 'две _______', blanks: [1], correctAnswers: ['2'], isExample: true },
      { text: 'пет _______', blanks: [1], correctAnswers: ['5'], options: ['3', '5', '7', '9'] },
      { text: 'петнайсет _______', blanks: [1], correctAnswers: ['15'], options: ['13', '15', '50', '17'] },
      { text: 'дванайсет _______', blanks: [1], correctAnswers: ['12'], options: ['2', '20', '12', '22'] },
      { text: 'двайсет и четири _______', blanks: [3], correctAnswers: ['24'], options: ['24', '42', '14', '34'] },
      { text: 'осемнайсет _______', blanks: [1], correctAnswers: ['18'], options: ['8', '80', '18', '28'] },
      { text: 'трийсет _______', blanks: [1], correctAnswers: ['30'], options: ['13', '30', '33', '3'] },
      { text: 'седемдесет и три _______', blanks: [3], correctAnswers: ['73'], options: ['37', '73', '63', '93'] },
      { text: 'шейсет и девет _______', blanks: [3], correctAnswers: ['69'], options: ['96', '59', '69', '79'] },
      { text: 'сто и тринайсет _______', blanks: [3], correctAnswers: ['113'], options: ['103', '113', '130', '131'] },
      { text: 'деветдесет и две _______', blanks: [3], correctAnswers: ['92'], options: ['29', '92', '82', '99'] },
      { text: 'петдесет и едно _______', blanks: [3], correctAnswers: ['51'], options: ['15', '50', '51', '55'] },
      { text: 'деветнайсет _______', blanks: [1], correctAnswers: ['19'], options: ['9', '90', '19', '91'] },
      { text: 'сто и десет _______', blanks: [3], correctAnswers: ['110'], options: ['100', '101', '110', '111'] },
      { text: 'осемдесет и шест _______', blanks: [3], correctAnswers: ['86'], options: ['68', '86', '78', '96'] },
      { text: 'сто трийсет и осем _______', blanks: [4], correctAnswers: ['138'], options: ['128', '138', '183', '130'] },
    ],
  } as WorkbookFillBlankExercise,
];

// ═══════════════════════════════════════════════════════════════════════════════
// КОМПОНЕНТ ПИСАНЕ (17 т.)
// Картинка + разбъркани букви за всяка храна в обща решетка 3 колони.
// ═══════════════════════════════════════════════════════════════════════════════

export const writingExercises: Exercise[] = [
  {
    id: 't01-pi-spell',
    type: 'syllable_blocks',
    instruction: 'Подредете буквите, за да получите думата на картинката.',
    order: 10,
    points: 17,
    columns: 3,
    puzzles: [
      { id: 'p-banitsa',   imageUrl: '/assets/test-a1-1/pisane/banitsa.jpg',       syllables: ['и', 'б', 'ц', 'а', 'н', 'а'],                     correctWord: 'баница' },
      { id: 'p-mlyako',    imageUrl: '/assets/test-a1-1/pisane/mlyako.jpg',        syllables: ['я', 'к', 'м', 'л', 'о'],                          correctWord: 'мляко' },
      { id: 'p-chay',      imageUrl: '/assets/test-a1-1/pisane/chay.jpg',          syllables: ['й', 'а', 'ч'],                                    correctWord: 'чай' },
      { id: 'p-sirene',    imageUrl: '/assets/test-a1-1/pisane/sirene.jpg',        syllables: ['р', 'е', 'с', 'н', 'и', 'е'],                     correctWord: 'сирене' },
      { id: 'p-pitsa',     imageUrl: '/assets/test-a1-1/pisane/pitsa.jpg',         syllables: ['ц', 'и', 'п', 'а'],                               correctWord: 'пица' },
      { id: 'p-hamburger', imageUrl: '/assets/test-a1-1/pisane/hamburger.jpg',     syllables: ['а', 'м', 'б', 'у', 'р', 'г', 'е', 'х', 'р'],      correctWord: 'хамбургер' },
      { id: 'p-zahar',     imageUrl: '/assets/test-a1-1/pisane/zahar.jpg',         syllables: ['х', 'а', 'з', 'а', 'р'],                          correctWord: 'захар' },
      { id: 'p-spageti',   imageUrl: '/assets/test-a1-1/pisane/spageti.jpg',       syllables: ['г', 'а', 'е', 'с', 'п', 'т', 'и'],                correctWord: 'спагети' },
      { id: 'p-salam',     imageUrl: '/assets/test-a1-1/pisane/salam.jpg',         syllables: ['л', 'а', 'с', 'а', 'м'],                          correctWord: 'салам' },
      { id: 'p-kafe',      imageUrl: '/assets/test-a1-1/pisane/kafe.jpg',          syllables: ['ф', 'а', 'к', 'е'],                               correctWord: 'кафе' },
      { id: 'p-maslo',     imageUrl: '/assets/test-a1-1/pisane/maslo.jpg',         syllables: ['л', 'с', 'о', 'м', 'а'],                          correctWord: 'масло' },
      { id: 'p-med',       imageUrl: '/assets/test-a1-1/pisane/med.jpg',           syllables: ['е', 'м', 'д'],                                    correctWord: 'мед' },
      { id: 'p-hlyab',     imageUrl: '/assets/test-a1-1/pisane/hlyab.jpg',         syllables: ['б', 'я', 'х', 'л'],                               correctWord: 'хляб' },
      { id: 'p-kiselo-mlyako',  imageUrl: '/assets/test-a1-1/pisane/kiselo-mlyako.jpg',  syllables: ['ки', 'се', 'ло', 'мля', 'ко'],              correctWord: 'кисело мляко' },
      { id: 'p-kashkaval', imageUrl: '/assets/test-a1-1/pisane/kashkaval.jpg',     syllables: ['к', 'а', 'ш', 'к', 'а', 'в', 'а', 'л'],           correctWord: 'кашкавал' },
      { id: 'p-portokalov-sok', imageUrl: '/assets/test-a1-1/pisane/portokalov-sok.jpg', syllables: ['пор', 'то', 'ка', 'лов', 'сок'],             correctWord: 'портокалов сок' },
      { id: 'p-sandvich',  imageUrl: '/assets/test-a1-1/pisane/sandvich.jpg',      syllables: ['в', 'д', 'а', 'н', 'с', 'и', 'ч'],                correctWord: 'сандвич' },
    ],
  } as SyllableBlocksExercise,
];

// ═══════════════════════════════════════════════════════════════════════════════
// Всички упражнения (плосък масив)
// ═══════════════════════════════════════════════════════════════════════════════

export const exercises: Exercise[] = [
  ...listeningExercises,
  ...readingExercises,
  ...grammarExercises,
  ...writingExercises,
];

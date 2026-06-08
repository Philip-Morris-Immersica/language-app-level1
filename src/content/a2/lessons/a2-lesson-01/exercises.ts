import type {
  Exercise,
  ImageLabelingExercise,
  DialoguesExercise,
  WorkbookFillBlankExercise,
  WordOrderExercise,
  DialogueBuilderExercise,
  GrammarTableExercise,
  DropdownMatchExercise,
  IllustratedCardsExercise,
  GrammarExamplesExercise,
  ReadingTextExercise,
} from '@/content/types';

// ⚠️ Order follows the A2 textbook „Ало, ало!" (стр. 16–23).
// Пропуснати по желание на клиента: упр. 4, 5, 10, 18 (работа по двойки / свободно лично писане).
// А2 урок 1 НЯМА секции „НОВИ ДУМИ"; новата лексика идва чрез глаголните карти и речника.

export const exercises: Exercise[] = [
  // ORDER 1 — Упр. 1 (стр. 16): думи под картинките (телефони)
  {
    id: 'a2-l01-ex-01',
    type: 'image_labeling',
    instruction: 'Изберете правилната дума под всяка картинка.',
    order: 1,
    points: 4,
    hideHeader: true,
    displayType: 'row',
    images: [
      { id: 'telefon',         imageUrl: '/assets/a2-lesson-01/01-upr-01-telefoni/01-telefon.jpg',         correctLabel: 'телефон' },
      { id: 'mobilen-telefon', imageUrl: '/assets/a2-lesson-01/01-upr-01-telefoni/02-mobilen-telefon.jpg', correctLabel: 'мобилен телефон' },
      { id: 'smartfon',        imageUrl: '/assets/a2-lesson-01/01-upr-01-telefoni/03-smartfon.jpg',        correctLabel: 'смартфон' },
      { id: 'sim-karta',       imageUrl: '/assets/a2-lesson-01/01-upr-01-telefoni/04-sim-karta.jpg',       correctLabel: 'SIM карта' },
    ],
    options: ['телефон', 'мобилен телефон', 'смартфон', 'SIM карта'],
  } as ImageLabelingExercise,

  // ORDER 2 — ДИАЛОЗИ 1 (стр. 16): телефонни мини-диалози — снимката е отгоре, диалозите отдолу
  {
    id: 'a2-l01-dialozi-01',
    type: 'dialogues',
    title: 'ДИАЛОЗИ 1',
    instruction: 'Натиснете всяка реплика, за да чуете произношението. После повторете на глас.',
    order: 2,
    imageUrl: '/assets/a2-lesson-01/02-dialozi-1/01-mazh-dialog.jpg',
    sections: [
      {
        id: 'а.',
        lines: [
          { text: 'Ало?', voiceGender: 'male' },
          { text: 'Да, моля.', ttsText: 'Да моля.', voiceGender: 'female' },
        ],
      },
      {
        id: 'б.',
        lines: [
          { text: 'Кой се обажда?', voiceGender: 'male' },
          { text: 'Обажда се Ани.', voiceGender: 'female' },
        ],
      },
      {
        id: 'в.',
        lines: [
          { text: 'Може ли г-жа Стоева?', ttsText: 'Може ли госпожа Стоева?', voiceGender: 'male' },
          { text: 'Да, момент, моля.', ttsText: 'Да, момент моля.', voiceGender: 'female' },
        ],
      },
      {
        id: 'г.',
        lines: [
          { text: 'Здравейте, Диана?', ttsText: 'Здравейте, Диана.', voiceGender: 'male' },
          { text: 'Имате грешка.', ttsText: 'Имате греш-ка.', voiceGender: 'female' },
          { text: 'Извинете.', voiceGender: 'male' },
        ],
      },
      {
        id: 'д.',
        lines: [
          { text: 'Може ли г-н Петров?', ttsText: 'Може ли господин Петров?', voiceGender: 'female' },
          { text: 'Съжалявам, няма го.', voiceGender: 'male' },
        ],
      },
      {
        id: 'е.',
        lines: [
          { text: 'Дочуване.', voiceGender: 'male' },
          { text: 'Дочуване. До скоро!', voiceGender: 'female' },
        ],
      },
    ],
  } as DialoguesExercise,

  // ORDER 3 — Упр. 2 (стр. 17): глаголът „обаждам се" в правилната форма — dropdown опции
  {
    id: 'a2-l01-ex-02',
    type: 'workbook_fill_blank',
    instruction: 'Изберете правилната форма на глагола **обаждам се**.',
    order: 3,
    points: 6,
    layout: 'single',
    sentences: [
      { text: 'Аз се обаждам на Мартин всеки ден.', blanks: [], correctAnswers: [], isExample: true },
      {
        text: 'Той _______ на децата често.',
        blanks: [1],
        correctAnswers: ['се обажда'],
        acceptableAnswers: [['се обажда']],
        options: ['се обажда', 'се обаждам', 'се обаждате'],
      },
      {
        text: 'Вие _______ на Марин?',
        blanks: [1],
        correctAnswers: ['се обаждате'],
        acceptableAnswers: [['се обаждате']],
        options: ['се обаждате', 'се обаждаме', 'се обажда'],
      },
      {
        text: 'Понякога ние _______ на Георги и Албена и ходим на кино.',
        blanks: [2],
        correctAnswers: ['се обаждаме'],
        acceptableAnswers: [['се обаждаме']],
        options: ['се обаждаме', 'се обажда', 'се обаждате'],
      },
      {
        text: 'Те _______ в офиса?',
        blanks: [1],
        correctAnswers: ['се обаждат'],
        acceptableAnswers: [['се обаждат']],
        options: ['се обаждат', 'се обаждате', 'се обаждам'],
      },
      {
        text: 'Ти никога не _______.',
        blanks: [3],
        correctAnswers: ['се обаждаш'],
        acceptableAnswers: [['се обаждаш']],
        options: ['се обаждаш', 'се обажда', 'се обаждаме'],
      },
      {
        text: 'Обикновено тя _______ в 7:00 часа сутринта.',
        blanks: [2],
        correctAnswers: ['се обажда'],
        acceptableAnswers: [['се обажда']],
        options: ['се обажда', 'се обаждам', 'се обаждат'],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ORDER 4 — Упр. 3 (стр. 17): подредете думите в изречения
  {
    id: 'a2-l01-ex-03',
    type: 'word_order',
    instruction: 'Поставете думите в правилния ред.',
    order: 4,
    points: 6,
    questions: [
      { words: ['обажда', 'Кой', 'се', '?'], correctSentence: 'Кой се обажда ?' },
      { words: ['момент', 'Да,', 'един', '.'], correctSentence: 'Да, един момент .', alternateCorrectSentences: ['Един момент, да .'] },
      { words: ['няма', 'го', 'Съжалявам,', '.'], correctSentence: 'Съжалявам, няма го .' },
      { words: ['грешка', 'имате', 'Съжалявам,', '.'], correctSentence: 'Съжалявам, имате грешка .' },
      { words: ['ли', '0899-921-690', 'е', '?'], correctSentence: '0899-921-690 ли е ?' },
      { words: ['скоро', 'До', '.'], correctSentence: 'До скоро .' },
    ],
  } as WordOrderExercise,

  // ORDER 5 — ДИАЛОЗИ 2 (стр. 17)
  {
    id: 'a2-l01-dialozi-02',
    type: 'dialogues',
    title: 'ДИАЛОЗИ 2',
    instruction: 'Натиснете всяка реплика, за да чуете произношението. После повторете на глас.',
    order: 5,
    sections: [
      {
        id: 'а.',
        lines: [
          { text: 'Ало! Здравей, Дани!', ttsText: 'Ало! Здравей, Дани!', voiceGender: 'female' },
          { text: 'Здравей, Фатима! Как си?', voiceGender: 'male' },
          { text: 'Много добре. А ти?', ttsText: 'Много добре. А т-и?', voiceGender: 'female' },
          { text: 'Благодаря, добре съм. Фатима, хайде на вечеря вкъщи.', ttsText: 'Благодаря, добре съм. Фатима, хайде на вечеря вкъщи!', voiceGender: 'male' },
          { text: 'Много благодаря. Кога?', voiceGender: 'female' },
          { text: 'Имаш ли време утре в 18:00 часа?', ttsText: 'Имаш ли врЕме утре в осемнайсет часа?', voiceGender: 'male' },
          { text: 'Да, свободна съм.', ttsText: 'Да, свободна съм.', voiceGender: 'female' },
          { text: 'Чудесно! До утре вечер!', ttsText: 'Чудесно. До утре вечер.', voiceGender: 'male' },
        ],
      },
      {
        id: 'б.',
        lines: [
          { text: 'Ало, обажда се Петър Василев. Може ли Ибрахим Хасан?', ttsText: 'Ало, обажда се Пе-тър Васи-лев. Може ли Иб-рахим Ха-сан?', voiceGender: 'male' },
          { text: 'Няма го, съжалявам. Обадете се по-късно.', ttsText: 'Няма го, съжалявам. Обадете се по-кас-но.', voiceGender: 'female' },
          { text: 'Благодаря, до чуване.', ttsText: 'Благодаря. До чу-ване.', voiceGender: 'male' },
        ],
      },
      {
        id: 'в.',
        lines: [
          { text: 'Добър ден, може ли Татяна?', ttsText: 'Добър ден, може ли Тат-яна?', voiceGender: 'male' },
          { text: 'Няма я. Обади се след един час.', ttsText: 'Няма я. Обади се след един ч-ас.', voiceGender: 'female' },
          { text: 'Благодаря, лек ден.', voiceGender: 'male' },
        ],
      },
      {
        id: 'г.',
        lines: [
          { text: 'Ало, автогарата ли е?', ttsText: 'Ало, автогарата ли е?', voiceGender: 'female' },
          { text: 'Съжалявам, имате грешка.', ttsText: 'Съжалявам. И-ма-те греш-ка.', voiceGender: 'male' },
          { text: 'Извинете.', ttsText: 'Из-ви-не-те.', voiceGender: 'female' },
        ],
      },
    ],
  } as DialoguesExercise,

  // SKIP — Упр. 4 „Прочетете диалозите по двойки" (по желание на клиента — работа по двойки)
  // SKIP — Упр. 5 „Работете по двойки, като променяте информацията" (по желание на клиента)

  // ORDER 6 — Упр. 6 (стр. 17): подредете фразите в диалози
  {
    id: 'a2-l01-ex-06',
    type: 'dialogue_builder',
    title: 'УПРАЖНЕНИЕ 6',
    instruction: 'Подредете фразите, за да получите диалози. Първата фраза е в зелено.',
    order: 6,
    sections: [
      {
        id: 'а.',
        givenFirstLine: 'Ало, Светла?',
        sentences: [
          'Ало, Светла?',
          'Да, кой се обажда?',
          'Обажда се Краси. Хайде на кафе.',
          'Добре, кога и къде?',
          'Днес в 5:00 часа, в кафето до офиса.',
          'До 5:00 часа.',
          'Добре.',
        ],
      },
      {
        id: 'б.',
        givenFirstLine: 'Ало, Вероника?',
        sentences: [
          'Ало, Вероника?',
          'Имате грешка.',
          'Извинете.',
        ],
      },
      {
        id: 'в.',
        givenFirstLine: 'Ало, може ли Елена?',
        sentences: [
          'Ало, може ли Елена?',
          'Няма я.',
          'Извинете.',
        ],
      },
      {
        id: 'г.',
        givenFirstLine: 'Ало, може ли Марин?',
        sentences: [
          'Ало, може ли Марин?',
          'Няма го.',
          'Извинете.',
        ],
      },
      {
        id: 'д.',
        givenFirstLine: 'Ало?',
        sentences: [
          'Ало?',
          'Да, моля.',
          'Извинете, кой се обажда?',
          'Иван.',
          'Иван! Имате грешка.',
          'Как си?',
          'Извинете.',
        ],
      },
      {
        id: 'е.',
        givenFirstLine: 'Ало?',
        sentences: [
          'Ало?',
          'Да, моля.',
          'Хотел „Плиска" ли е?',
          'Имате грешка.',
          'Извинете.',
        ],
      },
    ],
  } as DialogueBuilderExercise,

  // ORDER 7 — Упр. 7 (стр. 18): попълнете диалога с дадените изречения
  {
    id: 'a2-l01-ex-07',
    type: 'workbook_fill_blank',
    instruction: 'Изберете правилните изречения, за да попълните диалога.',
    order: 7,
    points: 4,
    layout: 'single',
    sentences: [
      {
        text: '– _______',
        blanks: [1],
        correctAnswers: ['Ало, Деси?'],
        options: ['Ало, Деси?', 'Деси, хайде на ресторант тази вечер.', 'Добре, в колко часа?', 'До скоро.'],
      },
      { text: '– Да. Как си, Алекс?', blanks: [], correctAnswers: [] },
      {
        text: '– Благодаря, добре. _______',
        blanks: [3],
        correctAnswers: ['Деси, хайде на ресторант тази вечер.'],
        options: ['Ало, Деси?', 'Деси, хайде на ресторант тази вечер.', 'Добре, в колко часа?', 'До скоро.'],
      },
      {
        text: '– На ресторант? _______',
        blanks: [2],
        correctAnswers: ['Добре, в колко часа?'],
        options: ['Ало, Деси?', 'Деси, хайде на ресторант тази вечер.', 'Добре, в колко часа?', 'До скоро.'],
      },
      { text: '– В 7:00 часа, в ресторант „България".', blanks: [], correctAnswers: [] },
      { text: '– Добре.', blanks: [], correctAnswers: [] },
      {
        text: '– _______',
        blanks: [1],
        correctAnswers: ['До скоро.'],
        options: ['Ало, Деси?', 'Деси, хайде на ресторант тази вечер.', 'Добре, в колко часа?', 'До скоро.'],
      },
      { text: '– До скоро.', blanks: [], correctAnswers: [] },
    ],
  } as WorkbookFillBlankExercise,

  // ORDER 8 — ГРАМАТИКА 1 (стр. 18): кратки винителни форми
  {
    id: 'a2-l01-gramatika-01',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 1',
    subtitle: 'Винителни форми на личните местоимения',
    instruction: 'Запознайте се с кратките винителни форми на личните местоимения.',
    instructionKey: 'grammar.a2l01.g1.instruction',
    order: 8,
    tableTitle: 'Кратки винителни местоимения',
    columns: ['Кратка форма', 'Ето', 'Няма'],
    rows: [
      { pronoun: 'аз',  cells: ['ме', 'Ето ме.', 'Няма ме.'] },
      { pronoun: 'ти',  cells: ['те', 'Ето те.', 'Няма те.'] },
      { pronoun: 'той', cells: ['го', 'Ето го.', 'Няма го.'] },
      { pronoun: 'тя',  cells: ['я',  'Ето я.',  'Няма я.']  },
      { pronoun: 'то',  cells: ['го', 'Ето го.', 'Няма го.'] },
      { pronoun: 'ние', cells: ['ни', 'Ето ни.', 'Няма ни.'] },
      { pronoun: 'вие', cells: ['ви', 'Ето ви.', 'Няма ви.'] },
      { pronoun: 'те',  cells: ['ги', 'Ето ги.', 'Няма ги.'] },
    ],
    notes: [
      'Кратката форма замества името: Виждам Иван. → Виждам го.',
      'В изречението кратката форма стои ПРЕД глагола: Харесвам **го**. Не **го** харесвам. Харесваш ли **го**?',
    ],
  } as GrammarTableExercise,

  // ORDER 9 — Упр. 8 (стр. 18): Ето я / Ето го / Ето ги
  {
    id: 'a2-l01-ex-08',
    type: 'dropdown_match',
    instruction: 'Изберете правилния отговор по модела „Къде е книгата? – Ето я."',
    order: 9,
    points: 12,
    questions: [
      { id: 'q1',  left: 'Къде е масата?',                 options: ['Ето го.', 'Ето я.', 'Ето ги.'], correctAnswer: 'Ето я.'  },
      { id: 'q2',  left: 'Къде е ябълката?',               options: ['Ето го.', 'Ето я.', 'Ето ги.'], correctAnswer: 'Ето я.'  },
      { id: 'q3',  left: 'Къде е кафето?',                  options: ['Ето го.', 'Ето я.', 'Ето ги.'], correctAnswer: 'Ето го.' },
      { id: 'q4',  left: 'Къде е Таня?',                    options: ['Ето го.', 'Ето я.', 'Ето ги.'], correctAnswer: 'Ето я.'  },
      { id: 'q5',  left: 'Къде е Румен?',                   options: ['Ето го.', 'Ето я.', 'Ето ги.'], correctAnswer: 'Ето го.' },
      { id: 'q6',  left: 'Къде са Свилен и Гергана?',       options: ['Ето го.', 'Ето я.', 'Ето ги.'], correctAnswer: 'Ето ги.' },
      { id: 'q7',  left: 'Къде е сандвичът?',               options: ['Ето го.', 'Ето я.', 'Ето ги.'], correctAnswer: 'Ето го.' },
      { id: 'q8',  left: 'Къде е автобусът?',               options: ['Ето го.', 'Ето я.', 'Ето ги.'], correctAnswer: 'Ето го.' },
      { id: 'q9',  left: 'Къде е банката?',                 options: ['Ето го.', 'Ето я.', 'Ето ги.'], correctAnswer: 'Ето я.'  },
      { id: 'q10', left: 'Къде е телефонът?',               options: ['Ето го.', 'Ето я.', 'Ето ги.'], correctAnswer: 'Ето го.' },
      { id: 'q11', left: 'Къде е мъжът ти?',                options: ['Ето го.', 'Ето я.', 'Ето ги.'], correctAnswer: 'Ето го.' },
      { id: 'q12', left: 'Къде са децата?',                 options: ['Ето го.', 'Ето я.', 'Ето ги.'], correctAnswer: 'Ето ги.' },
    ],
  } as DropdownMatchExercise,

  // ORDER 10 — НОВИ ДУМИ: глаголи с преки допълнения (стр. 18–19)
  {
    id: 'a2-l01-glagoli-01',
    type: 'illustrated_cards',
    title: 'НОВИ ДУМИ',
    subtitle: 'глаголи с преки допълнения',
    instruction: '',
    order: 10,
    cards: [
      { id: 'gledam',      imageUrl: '/assets/a2-lesson-01/03-glagoli-s-preki-dopulnienia/01-gledam-filma.jpg',                  label: 'Гледам филма.',      ttsLabel: 'гледам' },
      { id: 'vizhdam',     imageUrl: '/assets/a2-lesson-01/03-glagoli-s-preki-dopulnienia/02-vizhdam-momcheto.jpg',              label: 'Виждам момчето.',    ttsLabel: 'виждам' },
      { id: 'slusham',     imageUrl: '/assets/a2-lesson-01/03-glagoli-s-preki-dopulnienia/03-slusham-radioto.jpg',               label: 'Слушам радиото.',    ttsLabel: 'слушам' },
      { id: 'chuvam',      imageUrl: '/assets/a2-lesson-01/03-glagoli-s-preki-dopulnienia/04-chuvam-telefona.jpg',               label: 'Чувам телефона.',    ttsLabel: 'чувам' },
      { id: 'razbiram',    imageUrl: '/assets/a2-lesson-01/03-glagoli-s-preki-dopulnienia/05-razbiram-uchitelya.jpg',            label: 'Разбирам учителя.', ttsLabel: 'разбирам' },
      { id: 'pitam',       imageUrl: '/assets/a2-lesson-01/03-glagoli-s-preki-dopulnienia/06-pitam-uchitelya.jpg',               label: 'Питам учителя.',     ttsLabel: 'питам' },
      { id: 'poznavam',    imageUrl: '/assets/a2-lesson-01/03-glagoli-s-preki-dopulnienia/07-poznavam-bezhantsite.jpg',          label: 'Познавам бежанците.', ttsLabel: 'познавам' },
      { id: 'kanya',       imageUrl: '/assets/a2-lesson-01/03-glagoli-s-preki-dopulnienia/08-kanyam-decata.jpg',                 label: 'Каня децата на рожден ден.', ttsLabel: 'каня' },
      { id: 'obicham',     imageUrl: '/assets/a2-lesson-01/03-glagoli-s-preki-dopulnienia/09-obicham-tsvetyata.jpg',             label: 'Обичам цветята.',    ttsLabel: 'обичам' },
      { id: 'haresvam',    imageUrl: '/assets/a2-lesson-01/03-glagoli-s-preki-dopulnienia/10-haresvam-parka.jpg',                label: 'Харесвам парка.',    ttsLabel: 'харесвам' },
      { id: 'tseluvam',    imageUrl: '/assets/a2-lesson-01/03-glagoli-s-preki-dopulnienia/11-celuvam-bebe.jpg',                  label: 'Целувам бебето.',    ttsLabel: 'целувам' },
      { id: 'pregrashtam', imageUrl: '/assets/a2-lesson-01/03-glagoli-s-preki-dopulnienia/12-pregryashtam-deteto.jpg',          label: 'Прегръщам детето.', ttsLabel: 'прегръщам' },
      { id: 'pomnya',      imageUrl: '/assets/a2-lesson-01/04-gramatika-2-vinitelni-mestoimenia/01-pomnya-datata.jpg',           label: 'Помня датата.',      ttsLabel: 'помня' },
      { id: 'zabravyam',   imageUrl: '/assets/a2-lesson-01/04-gramatika-2-vinitelni-mestoimenia/02-zabravyam-klyuchovete.jpg',   label: 'Забравям ключовете.', ttsLabel: 'забравям' },
      { id: 'tarsya',      imageUrl: '/assets/a2-lesson-01/04-gramatika-2-vinitelni-mestoimenia/03-tarsya-telefona.jpg',         label: 'Търся телефона.',    ttsLabel: 'търся' },
      { id: 'namiram',     imageUrl: '/assets/a2-lesson-01/04-gramatika-2-vinitelni-mestoimenia/04-namiram-telefona.jpg',        label: 'Намирам телефона.', ttsLabel: 'намирам' },
      { id: 'iskam',       imageUrl: '/assets/a2-lesson-01/04-gramatika-2-vinitelni-mestoimenia/05-iskam-igrachkata.jpg',        label: 'Искам играчката.',  ttsLabel: 'искам' },
      { id: 'chakam',      imageUrl: '/assets/a2-lesson-01/04-gramatika-2-vinitelni-mestoimenia/06-chakam-avtobusa.jpg',         label: 'Чакам автобуса.',   ttsLabel: 'чакам' },
      { id: 'vklyuchvam',  imageUrl: '/assets/a2-lesson-01/04-gramatika-2-vinitelni-mestoimenia/07-vklyuchvam-lampata.jpg',      label: 'Включвам лампата.', ttsLabel: 'включвам' },
      { id: 'izklyuchvam', imageUrl: '/assets/a2-lesson-01/04-gramatika-2-vinitelni-mestoimenia/08-izklyuchvam-lampata.jpg',     label: 'Изключвам лампата.', ttsLabel: 'изключвам' },
      { id: 'otvaryam',    imageUrl: '/assets/a2-lesson-01/04-gramatika-2-vinitelni-mestoimenia/09-otvaryam-prozoretsa.jpg',     label: 'Отварям прозореца.', ttsLabel: 'отварям' },
      { id: 'zatvaryam',   imageUrl: '/assets/a2-lesson-01/04-gramatika-2-vinitelni-mestoimenia/10-zatvaryam-prozoretsa.jpg',    label: 'Затварям прозореца.', ttsLabel: 'затварям.' },
      { id: 'otklyuchvam', imageUrl: '/assets/a2-lesson-01/04-gramatika-2-vinitelni-mestoimenia/11-otklyuchvam-vratata.jpg',     label: 'Отключвам вратата.', ttsLabel: 'отключвам' },
      { id: 'zaklyuchvam', imageUrl: '/assets/a2-lesson-01/04-gramatika-2-vinitelni-mestoimenia/12-zaklyuchvam-vratata.jpg',     label: 'Заключвам вратата.', ttsLabel: 'заключвам.' },
    ],
  } as IllustratedCardsExercise,

  // ORDER 12 — ГРАМАТИКА 2 (стр. 19): винителни форми — заместване на допълнението
  {
    id: 'a2-l01-gramatika-02',
    type: 'grammar_examples',
    title: 'ГРАМАТИКА 2',
    instruction: 'Запознайте се с винителните форми на местоименията.',
    instructionKey: 'grammar.a2l01.g2.instruction',
    order: 12,
    layout: 'centered',
    examples: [
      {
        imageUrl: '',
        text: 'Иван обича Мария.',
        lines: [
          'Иван обича Мария.',
          'Той **я** обича. = Обича **я**.',
          'Иван обича ли Мария?',
          'Иван обича ли **я**? = Обича ли **я**?',
        ],
        ttsText: 'Иван обича Мария. Той я обича. Обича я. Иван обича ли Мария? Иван обича ли я? Обича ли я?',
        voiceGender: 'male',
      },
      {
        imageUrl: '',
        text: 'Мария не обича Иван.',
        lines: [
          'Мария не обича Иван.',
          'Тя не **го** обича. = Не **го** обича.',
          'Мария обича ли Иван?',
          'Мария обича ли **го**? = Обича ли **го**?',
        ],
        ttsText: 'Мария не обича Иван. Тя не го обича. Не го обича. Мария обича ли Иван? Мария обича ли го? Обича ли го?',
        voiceGender: 'female',
      },
    ],
  } as GrammarExamplesExercise,

  // ORDER 13 — Упр. 9 (стр. 19): замени допълнението с правилното местоимение — dropdown
  {
    id: 'a2-l01-ex-09',
    type: 'dropdown_match',
    instruction: 'Изберете правилното местоимение по модела „Каня Георги на кафе. → Каня **го** на кафе."',
    order: 13,
    points: 16,
    questions: [
      { id: 'q1',  left: 'Виждам книгата. →',                options: ['Виждам я.', 'Виждам го.', 'Виждам ги.'],               correctAnswer: 'Виждам я.' },
      { id: 'q2',  left: 'Виждаш ли Стоил? →',               options: ['Виждаш ли го?', 'Виждаш ли я?', 'Виждаш ли ги?'],      correctAnswer: 'Виждаш ли го?' },
      { id: 'q3',  left: 'Слушам учителката. →',             options: ['Слушам я.', 'Слушам го.', 'Слушам ги.'],               correctAnswer: 'Слушам я.' },
      { id: 'q4',  left: 'Искам пицата. →',                  options: ['Искам я.', 'Искам го.', 'Искам ги.'],                  correctAnswer: 'Искам я.' },
      { id: 'q5',  left: 'Искам кафето. →',                  options: ['Искам го.', 'Искам я.', 'Искам ги.'],                  correctAnswer: 'Искам го.' },
      { id: 'q6',  left: 'Искам сандвичите. →',              options: ['Искам ги.', 'Искам я.', 'Искам го.'],                  correctAnswer: 'Искам ги.' },
      { id: 'q7',  left: 'Разбирам Мони и Светла. →',        options: ['Разбирам ги.', 'Разбирам го.', 'Разбирам я.'],        correctAnswer: 'Разбирам ги.' },
      { id: 'q8',  left: 'Каня бежанците на гости. →',       options: ['Каня ги на гости.', 'Каня го на гости.', 'Каня я на гости.'], correctAnswer: 'Каня ги на гости.' },
      { id: 'q9',  left: 'Познаваш ли Асен? →',              options: ['Познаваш ли го?', 'Познаваш ли я?', 'Познаваш ли ги?'], correctAnswer: 'Познаваш ли го?' },
      { id: 'q10', left: 'Чакам учителката. →',              options: ['Чакам я.', 'Чакам го.', 'Чакам ги.'],                  correctAnswer: 'Чакам я.' },
      { id: 'q11', left: 'Отварят прозореца. →',             options: ['Отварят го.', 'Отварят я.', 'Отварят ги.'],            correctAnswer: 'Отварят го.' },
      { id: 'q12', left: 'Не заключвам вратата. →',          options: ['Не я заключвам.', 'Не го заключвам.', 'Не ги заключвам.'], correctAnswer: 'Не я заключвам.' },
      { id: 'q13', left: 'Изключвам телефона. →',            options: ['Изключвам го.', 'Изключвам я.', 'Изключвам ги.'],     correctAnswer: 'Изключвам го.' },
      { id: 'q14', left: 'Ана целува детето. →',             options: ['Ана го целува.', 'Ана я целува.', 'Ана ги целува.'],   correctAnswer: 'Ана го целува.' },
      { id: 'q15', left: 'Намирам нови приятели. →',         options: ['Намирам ги.', 'Намирам го.', 'Намирам я.'],            correctAnswer: 'Намирам ги.' },
      { id: 'q16', left: 'Затварям вратата. →',             options: ['Затварям я.', 'Затварям го.', 'Затварям ги.'],          correctAnswer: 'Затварям я.' },
    ],
  } as DropdownMatchExercise,

  // ORDER 14 — ДИАЛОЗИ 3 (стр. 20)
  {
    id: 'a2-l01-dialozi-03',
    type: 'dialogues',
    title: 'ДИАЛОЗИ 3',
    instruction: 'Натиснете всяка реплика, за да чуете произношението. После повторете на глас.',
    order: 14,
    sections: [
      {
        id: 'а.',
        lines: [
          { text: 'Ало, ало! Чувате ли ме?', voiceGender: 'male' },
          { text: 'Не, не Ви чувам добре.', voiceGender: 'female' },
          { text: 'Връзката е лоша, съжалявам.', ttsText: 'Връзката е лоша. Съжалявам!', voiceGender: 'male' },
        ],
      },
      {
        id: 'б.',
        lines: [
          { text: 'Здравейте. Казвам се Светла Маринова. Обаждам се във връзка с обявата за секретарка. Кога е интервюто?', voiceGender: 'female' },
          { text: 'Здравейте, аз съм Иванов. Заповядайте този петък в 10:00 часа в офиса. Адресът е бул. „Надежда" № 106, етаж 1.', ttsText: 'Здравейте, аз съм Иванов. Заповядайте този петък в десет часа в офиса. Адресът е булевард Надежда, номер сто и шест, е-таж едно.', voiceGender: 'male' },
          { text: 'Благодаря, до скоро.', voiceGender: 'female' },
          { text: 'Чакаме ви. Приятен ден!', ttsText: 'Чакаме ви. Приятен де-н.', voiceGender: 'male' },
        ],
      },
      {
        id: 'в.',
        lines: [
          { text: 'Ало, търся тристаен апартамент под наем до 500 евро.', ttsText: 'Ало, търся тристаен апартамент под наем до петстотин евро.', voiceGender: 'female' },
          { text: 'Да, имаме тристаен апартамент в жк „Люлин", близо до метрото.', ttsText: 'Да, имаме тристаен апартамент в же ка Люлин, близо до метрото.', voiceGender: 'male' },
          { text: 'Има ли магазини и училище близо до апартамента?', voiceGender: 'female' },
          { text: 'Да, има и детска градина.', ttsText: 'Да, има и детска градина.', voiceGender: 'male' },
          { text: 'Много добре.', voiceGender: 'female' },
          { text: 'Кога искате оглед на апартамента?', voiceGender: 'male' },
          { text: 'Може ли утре в 12:30?', ttsText: 'Може ли утре в дванайсет и трийсет?', voiceGender: 'female' },
          { text: 'Да, чакаме Ви пред агенцията.', voiceGender: 'male' },
          { text: 'Благодаря, дочуване.', voiceGender: 'female' },
        ],
      },
    ],
  } as DialoguesExercise,

  // ORDER 15 — Обява за работа (модел от ДИАЛОЗИ 3)
  {
    id: 'a2-l01-obyava-rabota',
    type: 'reading_text',
    title: 'ОБЯВА ЗА РАБОТА',
    instruction: 'Прочетете обявата.',
    order: 15,
    paragraphs: [
      'Фирма търси секретарка за офис в София.',
      'Работно време: пълен работен ден.',
      'Почивни дни: събота и неделя.',
      'Езици: английски и арабски.',
      'Заплата: 2000 евро.',
      'Телефон за връзка: 0875-486352.',
    ],
    ttsParagraphs: [
      'Фирма търси секретарка за офис в София.',
      'Работно време: пълен работен ден.',
      'Почивни дни: сЪ-бота и не-деля.',
      'Езици: английски и арабски.',
      'Заплата: две хиляди евро.',
      'Телефон за връзка: нула, осем, седем, пет, четири, осем, шест, три, пет, две.',
    ],
    paragraphVoiceGenders: ['female', 'female', 'female', 'female', 'female', 'female'],
  } as ReadingTextExercise,

  // ORDER 16 — Упр. 11а: разбиране на обявата за работа
  {
    id: 'a2-l01-ex-11a',
    type: 'dropdown_match',
    instruction: 'Отговорете на въпросите за обявата.',
    order: 16,
    points: 4,
    questions: [
      { id: 'q1', left: 'Каква позиция търси фирмата?',    options: ['секретарка', 'счетоводителка', 'учителка'],           correctAnswer: 'секретарка' },
      { id: 'q2', left: 'Какво е работното място?',         options: ['офис в София', 'офис в Пловдив', 'у дома'],            correctAnswer: 'офис в София' },
      { id: 'q3', left: 'Кои езици се изискват?',           options: ['английски и арабски', 'английски и руски', 'само български'], correctAnswer: 'английски и арабски' },
      { id: 'q4', left: 'Колко е заплатата?',               options: ['2000 евро', '1200 евро', '500 евро'],                 correctAnswer: '2000 евро' },
    ],
  } as DropdownMatchExercise,

  // ORDER 17 — Обява за апартамент под наем (модел от ДИАЛОЗИ 3)
  {
    id: 'a2-l01-obyava-naem',
    type: 'reading_text',
    title: 'ОБЯВА ЗА АПАРТАМЕНТ ПОД НАЕМ',
    instruction: 'Прочетете обявата.',
    order: 17,
    paragraphs: [
      'Агенция „Нов дом".',
      'Давам под наем тристаен апартамент в жк „Люлин" до метростанция.',
      'Наем: 500 евро на месец.',
    ],
    ttsParagraphs: [
      'Агенция Нов дом.',
      'Давам под наем тристаен апартамент, в же ка Люлин, до метростанция.',
      'Наем: пет стотин евро на месец.',
    ],
    paragraphVoiceGenders: ['female', 'female', 'female'],
  } as ReadingTextExercise,

  // ORDER 18 — Упр. 11б: разбиране на обявата за апартамент
  {
    id: 'a2-l01-ex-11b',
    type: 'dropdown_match',
    instruction: 'Отговорете на въпросите за обявата.',
    order: 18,
    points: 3,
    questions: [
      { id: 'q1', left: 'Какъв е апартаментът?',            options: ['тристаен', 'двустаен', 'едностаен'],                  correctAnswer: 'тристаен' },
      { id: 'q2', left: 'В кой квартал е?',                 options: ['жк „Люлин"', 'жк „Лозенец"', 'жк „Надежда"'],        correctAnswer: 'жк „Люлин"' },
      { id: 'q3', left: 'Колко е наемът на месец?',         options: ['500 евро', '1000 евро', '2000 евро'],                 correctAnswer: '500 евро' },
    ],
  } as DropdownMatchExercise,

  // ORDER 19 — Упр. 12 (стр. 21): направете въпросителни изречения
  {
    id: 'a2-l01-ex-12',
    type: 'word_order',
    instruction: 'Поставете думите в правилния ред, за да получите въпроси.',
    order: 19,
    points: 6,
    questions: [
      { words: ['ли', 'ме', 'Чуваш', '?'],     correctSentence: 'Чуваш ли ме ?' },
      { words: ['го', 'ли', 'Каните', '?'],     correctSentence: 'Каните ли го ?' },
      { words: ['ли', 'я', 'Чакаш', '?'],       correctSentence: 'Чакаш ли я ?' },
      { words: ['ни', 'Разбирате', 'ли', '?'],  correctSentence: 'Разбирате ли ни ?' },
      { words: ['ли', 'ги', 'Виждаш', '?'],     correctSentence: 'Виждаш ли ги ?' },
      { words: ['те', 'ли', 'Обичаш', '?'],     correctSentence: 'Обичаш ли те ?' },
    ],
  } as WordOrderExercise,

  // ORDER 20 — Упр. 13 (стр. 21): преобразувайте по модела — dropdown
  {
    id: 'a2-l01-ex-13',
    type: 'workbook_fill_blank',
    instruction: 'Изберете правилния вариант по модела „Аз я обичам. → Обичам я."',
    order: 20,
    points: 8,
    layout: 'qa-split',
    sentences: [
      { text: 'Аз я обичам. | Обичам я.', blanks: [], correctAnswers: [], isExample: true },
      {
        text: 'Тя ме прегръща. | _______',
        blanks: [1], correctAnswers: ['Прегръща ме.'],
        acceptableAnswers: [['прегръща ме.', 'прегръща ме']],
        options: ['Прегръща ме.', 'Прегръщам те.', 'Тя прегръща ме.'],
      },
      {
        text: 'Той ги целува. | _______',
        blanks: [1], correctAnswers: ['Целува ги.'],
        acceptableAnswers: [['целува ги.', 'целува ги']],
        options: ['Целува ги.', 'Целувам ги.', 'Ги целува той.'],
      },
      {
        text: 'Ние ви слушаме. | _______',
        blanks: [1], correctAnswers: ['Слушаме ви.'],
        acceptableAnswers: [['слушаме ви.', 'слушаме ви']],
        options: ['Слушаме ви.', 'Слушате ни.', 'Слушам ви.'],
      },
      {
        text: 'Той я помни. | _______',
        blanks: [1], correctAnswers: ['Помни я.'],
        acceptableAnswers: [['помни я.', 'помни я']],
        options: ['Помни я.', 'Помни го.', 'Помня я.'],
      },
      {
        text: 'Тя го харесва. | _______',
        blanks: [1], correctAnswers: ['Харесва го.'],
        acceptableAnswers: [['харесва го.', 'харесва го']],
        options: ['Харесва го.', 'Харесва я.', 'Харесвам го.'],
      },
      {
        text: 'Ние я търсим. | _______',
        blanks: [1], correctAnswers: ['Търсим я.'],
        acceptableAnswers: [['търсим я.', 'търсим я']],
        options: ['Търсим я.', 'Търсим го.', 'Търся я.'],
      },
      {
        text: 'Те я питат. | _______',
        blanks: [1], correctAnswers: ['Питат я.'],
        acceptableAnswers: [['питат я.', 'питат я']],
        options: ['Питат я.', 'Питат го.', 'Питам я.'],
      },
      {
        text: 'Аз те познавам. | _______',
        blanks: [1], correctAnswers: ['Познавам те.'],
        acceptableAnswers: [['познавам те.', 'познавам те']],
        options: ['Познавам те.', 'Познаваш ме.', 'Познавам го.'],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ORDER 21 — Упр. 21 (стр. 21): попълнете местоименията в телефонния диалог
  // Снимката е отгоре, диалогът е отдолу — без image-bubbles layout
  {
    id: 'a2-l01-ex-14',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 21',
    subtitle: '„Обича ме, не ме обича" е популярна детска игра за гадаене. Децата намислят име на някой, който харесват и късат листенцата на маргаритка едно по едно, като редуват фразите „Обича ме" и „Не ме обича". Думите, изречени при последното откъснато листенце, показват крайния отговор на играта.',
    instruction: 'Попълнете празните места с подходящите местоимения.',
    order: 21,
    points: 11,
    layout: 'single',
    imageUrl: '/assets/a2-lesson-01/05-dopalnitelni-upr-14-telefon-dialog/01-telefonen-razgovor.jpg',
    sentences: [
      { text: 'Ало, ало, скъпа! Чуваш ли _______?', blanks: [3], correctAnswers: ['ме'], options: ['ме', 'те', 'го', 'я'] },
      { text: 'Обичаш ли _______?',                  blanks: [2], correctAnswers: ['ме'], options: ['ме', 'те', 'го', 'я'] },
      { text: 'Връзката е много лоша. Ало! Питам _______.', blanks: [5], correctAnswers: ['те'], options: ['ме', 'те', 'го', 'я'] },
      { text: 'Обичаш ли _______?',                  blanks: [2], correctAnswers: ['ме'], options: ['ме', 'те', 'го', 'я'] },
      { text: 'Чакам _______ всеки ден!',            blanks: [1], correctAnswers: ['те'], options: ['ме', 'те', 'го', 'я'] },
      { text: 'Търся _______ навсякъде!',            blanks: [1], correctAnswers: ['те'], options: ['ме', 'те', 'го', 'я'] },
      { text: 'Разбираш ли _______?',                blanks: [2], correctAnswers: ['ме'], options: ['ме', 'те', 'го', 'я'] },
      { text: 'Да, да, чувам _______.',              blanks: [3], correctAnswers: ['те'], options: ['ме', 'те', 'го', 'я'] },
      { text: 'Не _______ обичам!',                  blanks: [1], correctAnswers: ['те'], options: ['ме', 'те', 'го', 'я'] },
      { text: 'Не _______ харесвам.',                blanks: [1], correctAnswers: ['те'], options: ['ме', 'те', 'го', 'я'] },
      { text: 'Съжалявам, не _______ разбирам. Изключвам телефона.', blanks: [3], correctAnswers: ['те'], options: ['ме', 'те', 'го', 'я'] },
    ],
  } as WorkbookFillBlankExercise,

  // ORDER 22 — Упр. 15 (стр. 21): маргаритка „Обича ме / Не ме обича"
  {
    id: 'a2-l01-ex-15',
    type: 'grammar_examples',
    title: 'УПРАЖНЕНИЕ 15',
    subtitle: 'Маргаритка — обича ли ви той или тя?',
    instruction: '„Обича ме, не ме обича" е популярна игра с маргаритка. Намисляш си име на човек и започваш да късаш листенцата едно по едно. При всяко листенце редуваш думите „Обича ме" и „Не ме обича". Това, което кажеш на последното листенце, е крайният отговор в играта.',
    order: 22,
    showLikeDislike: true,
    examples: [
      {
        imageUrl: '/assets/a2-lesson-01/06-dopalnitelni-upr-15-margaritka/01-margaritka-obicha-me.jpg',
        text: 'Обича ме!',
        subtext: 'Не ме обича!',
        zoomable: true,
      },
    ],
  } as GrammarExamplesExercise,

  // ORDER 23 — Упр. 16 (стр. 21): маргаритка с „разбира"
  {
    id: 'a2-l01-ex-16',
    type: 'grammar_examples',
    title: 'УПРАЖНЕНИЕ 16',
    subtitle: 'Маргаритка — разбира ли ви той или тя?',
    instruction: 'Играйте с маргаритката, като редувате „Разбира ме" и „Не ме разбира". Думите при последното листенце показват крайния отговор.',
    order: 23,
    showLikeDislike: true,
    examples: [
      {
        imageUrl: '/assets/a2-lesson-01/07-dopalnitelni-upr-16-margaritka-prazna/01-margaritka-prazna.jpg',
        text: 'Разбира ме!',
        subtext: 'Не ме разбира!',
        zoomable: true,
      },
    ],
  } as GrammarExamplesExercise,

  // ORDER 24 — Упр. 17 (стр. 22): профили + телефонни номера — изберете чутия номер
  {
    id: 'a2-l01-ex-17',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 17',
    instruction: 'Прочетете отговорите на въпроса „Колко често и за какво използвате телефона?" Изслушайте телефонните номера и изберете правилния.',
    order: 24,
    points: 7,
    layout: 'single',
    headerImages: [
      { imageUrl: '/assets/a2-lesson-01/08-upr-17-18-telefoni/01-tri-dushi-telefoni.jpg', label: 'Млади хора с телефони' },
      { imageUrl: '/assets/a2-lesson-01/08-upr-17-18-telefoni/02-biznesmen-kufar.jpg',    label: 'Бизнесмен с куфар' },
    ],
    listeningText: 'Телефонните номера на седемте души са следните. Милена: нула, осем, осем, шест, три, девет, две, седем, пет, четири. Катя: нула, осем, девет, четири, едно, две, четири, седем, шест, едно. Иво: нула, осем, девет, нула, нула, нула, седем, четири, три. Симона: нула, осем, девет, девет, едно, четири, четири, седем, две, осем, едно. Стефан: нула, осем, девет, пет, седем, пет, три, три, осем, нула. Диана: нула, осем, четири, осем, девет, пет, две, три, три, три. Симеон: нула, осем, осем, седем, едно, пет, две, три, девет, девет.',
    sentences: [
      {
        text: 'Милена, 24 години (тел. _______)',
        contextText: 'Колко често използвам телефона? Много, много често! Проверявам и отговарям на имейлите, влизам във Фейсбук и Инстаграм. Телефонът ми е за работа и за удоволствие.',
        blanks: [1], correctAnswers: ['0886/392-754'],
        acceptableAnswers: [['0886/392-754', '0886392754', '0886 392 754']],
        options: ['0886/392-754', '0886/392-745', '0886/329-754'],
      },
      {
        text: 'Катя, 33 години (тел. _______)',
        contextText: 'Много често говоря с мъжа ми, децата, приятелите. Използвам го като часовник, календар. Нямам интернет на телефона и не искам. Имам интернет вкъщи.',
        blanks: [1], correctAnswers: ['0894/124-761'],
        acceptableAnswers: [['0894/124-761', '0894124761', '0894 124 761']],
        options: ['0894/124-761', '0894/142-761', '0894/124-716'],
      },
      {
        text: 'Иво, 17 години (тел. _______)',
        contextText: 'Не излизам без телефона. Не излизам от Дискорд и Инстаграм, спя с телефона. Няма телефон, няма живот!',
        blanks: [1], correctAnswers: ['089000743'],
        acceptableAnswers: [['089000743', '0890 00 743']],
        options: ['089000743', '089000734', '089000473'],
      },
      {
        text: 'Симона, 48 години (тел. _______)',
        contextText: 'Не много често. Обаждам се на приятели, но използвам повече Вайбър. Безплатно е. Децата ми не са в България и говорим само по Скайп.',
        blanks: [1], correctAnswers: ['0899/1447281'],
        acceptableAnswers: [['0899/1447281', '08991447281', '0899 1447281']],
        options: ['0899/1447281', '0899/1474281', '0899/1447218'],
      },
      {
        text: 'Стефан, 29 години (тел. _______)',
        contextText: 'Използвам го през цялото време. Обаждам се, правя снимки, пращам ги на приятели, пращам SMS-и. Никога не изключвам телефона, само в самолета.',
        blanks: [1], correctAnswers: ['0895/753380'],
        acceptableAnswers: [['0895/753380', '0895753380', '0895 753 380']],
        options: ['0895/753380', '0895/735380', '0895/753308'],
      },
      {
        text: 'Диана, 55 години (тел. _______)',
        contextText: 'Не говоря много по телефона. Забравям го често вкъщи.',
        blanks: [1], correctAnswers: ['0848/952333'],
        acceptableAnswers: [['0848/952333', '0848952333', '0848 952 333']],
        options: ['0848/952333', '0848/952323', '0848/925333'],
      },
      {
        text: 'Симеон, 88 години (тел. _______)',
        contextText: 'Имам телефон от дъщеря ми, но имам проблем — не виждам числата добре и не чувам добре. Децата и внуците се обаждат често.',
        blanks: [1], correctAnswers: ['0887/152399'],
        acceptableAnswers: [['0887/152399', '0887152399', '0887 152 399']],
        options: ['0887/152399', '0887/152939', '0887/125399'],
      },
    ],
  } as WorkbookFillBlankExercise,

  // SKIP — Упр. 18 „А Вие колко често и за какво използвате телефона?" (свободно писане — пропуснато)

  // ORDER 26 — ТЕКСТ + Упр. 19 (стр. 23): Мария и нейният телефон
  {
    id: 'a2-l01-ex-19',
    type: 'reading_text',
    title: 'ТЕКСТ',
    instruction: 'Изслушайте текста и след това го прочетете сами.',
    order: 26,
    showDictionary: true,
    images: [
      { imageUrl: '/assets/a2-lesson-01/09-tekst-maria/01-maria-telefon.jpg', label: 'Мария по телефона' },
    ],
    paragraphs: [
      'Мария има нов и скъп телефон Нокиа. Тя го харесва много. Всеки ден говори дълго по телефона. Обажда се на приятели, но най-често говори със семейството си. Семейството ѝ живее в Пловдив, а Мария живее в София. Тя е студентка и учи арабски език в Софийския университет. През деня е много заета и затова рано сутрин или късно вечер тя се обажда на сестра си, майка си, баща си и баба си. Обича ги много.',
      'Мария има много приятели. Най-добрата ѝ приятелка се казва Петя. Тя работи като учителка в София. Мария и Петя се срещат в центъра, ходят на кафе или ресторант. Понякога Мария кани Петя вкъщи и те правят вечеря заедно, после слушат хубава музика или гледат филми.',
      'Мария говори английски и арабски език и има приятели от различни страни. Тя познава също много бежанци, защото често ходи в Български Червен кръст и помага там.',
      'Мария има интернет на телефона и търси и намира информация бързо за всичко, пише имейли, чете новини. Телефонът е връзката ѝ със семейството и приятелите.',
    ],
    paragraphVoiceGenders: ['female', 'female', 'female', 'female'],
  } as ReadingTextExercise,

  // ORDER 27 — Упр. 20 (стр. 23): отговорете на въпросите към текста
  {
    id: 'a2-l01-ex-20',
    type: 'dropdown_match',
    instruction: 'Изберете правилния отговор на въпросите към текста.',
    order: 27,
    points: 13,
    questions: [
      { id: 'q1',  left: 'Какъв телефон има Мария?',                    options: ['Нокиа', 'Самсунг', 'Айфон', 'Хуавей'], correctAnswer: 'Нокиа' },
      { id: 'q2',  left: 'Къде живее семейството ѝ?',                    options: ['В София', 'В Пловдив', 'Във Варна', 'В Бургас'], correctAnswer: 'В Пловдив' },
      { id: 'q3',  left: 'Какво прави Мария в София?',                   options: ['Учи в университет', 'Работи в офис', 'Лекар е', 'Учителка е'], correctAnswer: 'Учи в университет' },
      { id: 'q4',  left: 'Кога се обажда на семейството си?',            options: ['Рано сутрин или късно вечер', 'По обяд', 'Никога', 'Само в събота'], correctAnswer: 'Рано сутрин или късно вечер' },
      { id: 'q5',  left: 'Как се казва най-добрата ѝ приятелка?',        options: ['Петя', 'Мария', 'Катя', 'Диана'], correctAnswer: 'Петя' },
      { id: 'q6',  left: 'Каква е и къде работи Петя?',                  options: ['Учителка в София', 'Студентка в Пловдив', 'Лекарка във Варна', 'Секретарка в офис'], correctAnswer: 'Учителка в София' },
      { id: 'q7',  left: 'Къде се срещат Мария и Петя?',                 options: ['В центъра', 'В университета', 'В Червен кръст', 'На гарата'], correctAnswer: 'В центъра' },
      { id: 'q8',  left: 'Какво правят Мария и Петя заедно?',            options: ['Ходят на кафе или ресторант', 'Учат арабски', 'Работят в офис', 'Пътуват в чужбина'], correctAnswer: 'Ходят на кафе или ресторант' },
      { id: 'q9',  left: 'Какви езици говори Мария?',                    options: ['Английски и арабски', 'Френски и руски', 'Немски и арабски', 'Само български'], correctAnswer: 'Английски и арабски' },
      { id: 'q10', left: 'Откъде са приятелите на Мария?',              options: ['От различни страни', 'Само от България', 'Само от Сирия', 'Само от София'], correctAnswer: 'От различни страни' },
      { id: 'q11', left: 'Защо ходи в Български Червен кръст?',          options: ['За да помага', 'За да учи', 'За да работи', 'За да си почива'], correctAnswer: 'За да помага' },
      { id: 'q12', left: 'Има ли Мария интернет на телефона си?',        options: ['Да', 'Не'], correctAnswer: 'Да' },
      { id: 'q13', left: 'За какво използва телефона си?',               options: ['Търси информация, пише имейли, чете новини', 'Само за игри', 'Само за снимки', 'Не го използва'], correctAnswer: 'Търси информация, пише имейли, чете новини' },
    ],
  } as DropdownMatchExercise,
];

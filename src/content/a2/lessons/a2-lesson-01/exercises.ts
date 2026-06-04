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
  FillInBlankExercise,
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

  // ORDER 2 — ДИАЛОЗИ 1 (стр. 16): телефонни мини-диалози
  {
    id: 'a2-l01-dialozi-01',
    type: 'dialogues',
    title: 'ДИАЛОЗИ 1',
    instruction: 'Натиснете всяка реплика, за да чуете произношението. После повторете на глас.',
    order: 2,
    imageUrl: '/assets/a2-lesson-01/02-dialozi-1/01-mazh-dialog.jpg',
    displayLayout: 'scene',
    sections: [
      {
        id: 'а.',
        bubbleSide: 'left',
        lines: [
          { text: 'Ало?', voiceGender: 'male' },
          { text: 'Да, моля.', voiceGender: 'female' },
        ],
      },
      {
        id: 'б.',
        bubbleSide: 'right',
        lines: [
          { text: 'Кой се обажда?', voiceGender: 'male' },
          { text: 'Обажда се Ани.', voiceGender: 'female' },
        ],
      },
      {
        id: 'в.',
        bubbleSide: 'left',
        lines: [
          { text: 'Може ли г-жа Стоева?', ttsText: 'Може ли госпожа Стоева?', voiceGender: 'male' },
          { text: 'Да. Момент, моля.', voiceGender: 'female' },
        ],
      },
      {
        id: 'г.',
        bubbleSide: 'right',
        lines: [
          { text: 'Здравейте! Диана?', voiceGender: 'male' },
          { text: 'Имате грешка.', voiceGender: 'female' },
          { text: 'Извинете.', voiceGender: 'male' },
        ],
      },
      {
        id: 'д.',
        bubbleSide: 'left',
        lines: [
          { text: 'Може ли г-н Петров?', ttsText: 'Може ли господин Петров?', voiceGender: 'female' },
          { text: 'Съжалявам, няма го.', voiceGender: 'male' },
        ],
      },
      {
        id: 'е.',
        bubbleSide: 'right',
        lines: [
          { text: 'Дочуване.', voiceGender: 'male' },
          { text: 'Дочуване. До скоро!', voiceGender: 'female' },
        ],
      },
    ],
  } as DialoguesExercise,

  // ORDER 3 — Упр. 2 (стр. 17): глаголът „обаждам се" в правилната форма
  {
    id: 'a2-l01-ex-02',
    type: 'workbook_fill_blank',
    instruction: 'Попълнете глагола **обаждам се** в правилната форма.',
    order: 3,
    points: 8,
    layout: 'single',
    sentences: [
      { text: 'Аз се обаждам на Мартин всеки ден.', blanks: [], correctAnswers: [], isExample: true },
      {
        text: 'Той _______ на децата често.',
        blanks: [1],
        correctAnswers: ['се обажда'],
        acceptableAnswers: [['се обажда']],
      },
      {
        text: 'Вие _______ ли _______ на Марин?',
        blanks: [1, 3],
        correctAnswers: ['обаждате', 'се'],
        acceptableAnswers: [['обаждате'], ['се']],
      },
      {
        text: 'Понякога ние _______ на Георги и Албена и ходим на кино.',
        blanks: [2],
        correctAnswers: ['се обаждаме'],
        acceptableAnswers: [['се обаждаме']],
      },
      {
        text: 'Те _______ ли _______ в офиса?',
        blanks: [1, 3],
        correctAnswers: ['обаждат', 'се'],
        acceptableAnswers: [['обаждат'], ['се']],
      },
      {
        text: 'Ти никога не _______ .',
        blanks: [3],
        correctAnswers: ['се обаждаш'],
        acceptableAnswers: [['се обаждаш']],
      },
      {
        text: 'Обикновено тя _______ в 7:00 часа сутринта.',
        blanks: [2],
        correctAnswers: ['се обажда'],
        acceptableAnswers: [['се обажда']],
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
      // TODO: източникът „един да момент" е двусмислен — приет е „Да, един момент."
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
          { text: 'Ало! Здравей, Дани!', voiceGender: 'female' },
          { text: 'Здравей, Фатима! Как си?', voiceGender: 'male' },
          { text: 'Много добре. А ти?', voiceGender: 'female' },
          { text: 'Благодаря, добре съм. Фатима, хайде на вечеря вкъщи.', voiceGender: 'male' },
          { text: 'Много благодаря. Кога?', voiceGender: 'female' },
          { text: 'Имаш ли време утре в 18:00 часа?', ttsText: 'Имаш ли време утре в осемнайсет часа?', voiceGender: 'male' },
          { text: 'Да, свободна съм.', voiceGender: 'female' },
          { text: 'Чудесно! До утре вечер!', voiceGender: 'male' },
        ],
      },
      {
        id: 'б.',
        lines: [
          { text: 'Ало! Обажда се Петър Василев. Може ли Ибрахим Хасан?', voiceGender: 'male' },
          { text: 'Няма го, съжалявам. Обадете се по-късно.', voiceGender: 'female' },
          { text: 'Благодаря. Дочуване.', voiceGender: 'male' },
        ],
      },
      {
        id: 'в.',
        lines: [
          { text: 'Добър ден, може ли Татяна?', voiceGender: 'male' },
          { text: 'Няма я. Обади се след един час.', voiceGender: 'female' },
          { text: 'Благодаря. Лек ден!', voiceGender: 'male' },
        ],
      },
      {
        id: 'г.',
        lines: [
          { text: 'Ало, автогарата ли е?', voiceGender: 'female' },
          { text: 'Съжалявам, имате грешка.', voiceGender: 'male' },
          { text: 'Извинете.', voiceGender: 'female' },
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
        // Sentences are maximally scrambled — component does NOT shuffle.
        id: 'а.',
        givenFirstLine: 'Ало, Светла?',
        sentences: [
          'Ало, Светла?',
          'Обажда се Краси. Хайде на кафе.',
          'До 5:00 часа.',
          'Да, кой се обажда?',
          'Добре.',
          'Днес в 5:00 часа, в кафето до офиса.',
          'Добре, кога и къде?',
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
        // TODO: подредбата на „д." в учебника е двусмислена — приета е логична версия.
        // Sentences are maximally scrambled — component does NOT shuffle.
        id: 'д.',
        givenFirstLine: 'Ало?',
        sentences: [
          'Ало?',
          'Иван.',
          'Как си?',
          'Иван! Имате грешка.',
          'Да, моля.',
          'Извинете.',
          'Извинете, кой се обажда?',
        ],
      },
      {
        // Sentences are maximally scrambled — component does NOT shuffle.
        id: 'е.',
        givenFirstLine: 'Ало?',
        sentences: [
          'Ало?',
          'Хотел „Плиска" ли е?',
          'Извинете.',
          'Да, моля.',
          'Имате грешка.',
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

  // ORDER 10 — ГЛАГОЛИ С ПРЕКИ ДОПЪЛНЕНИЯ (стр. 18–19): всички картинки в едно
  {
    id: 'a2-l01-glagoli-01',
    type: 'illustrated_cards',
    title: 'ГЛАГОЛИ С ПРЕКИ ДОПЪЛНЕНИЯ',
    instruction: '',
    order: 10,
    cards: [
      { id: 'gledam',      imageUrl: '/assets/a2-lesson-01/03-glagoli-s-preki-dopulnienia/01-gledam-filma.jpg',                  label: 'Гледам филма.' },
      { id: 'vizhdam',     imageUrl: '/assets/a2-lesson-01/03-glagoli-s-preki-dopulnienia/02-vizhdam-momcheto.jpg',              label: 'Виждам момчето.' },
      { id: 'slusham',     imageUrl: '/assets/a2-lesson-01/03-glagoli-s-preki-dopulnienia/03-slusham-radioto.jpg',               label: 'Слушам радиото.' },
      { id: 'chuvam',      imageUrl: '/assets/a2-lesson-01/03-glagoli-s-preki-dopulnienia/04-chuvam-telefona.jpg',               label: 'Чувам телефона.' },
      { id: 'razbiram',    imageUrl: '/assets/a2-lesson-01/03-glagoli-s-preki-dopulnienia/05-razbiram-uchitelya.jpg',            label: 'Разбирам учителя.' },
      { id: 'pitam',       imageUrl: '/assets/a2-lesson-01/03-glagoli-s-preki-dopulnienia/06-pitam-uchitelya.jpg',               label: 'Питам учителя.' },
      { id: 'poznavam',    imageUrl: '/assets/a2-lesson-01/03-glagoli-s-preki-dopulnienia/07-poznavam-bezhantsite.jpg',          label: 'Познавам бежанците.' },
      { id: 'kanya',       imageUrl: '/assets/a2-lesson-01/03-glagoli-s-preki-dopulnienia/08-kanyam-decata.jpg',                 label: 'Каня децата на рожден ден.' },
      { id: 'obicham',     imageUrl: '/assets/a2-lesson-01/03-glagoli-s-preki-dopulnienia/09-obicham-tsvetyata.jpg',             label: 'Обичам цветята.' },
      { id: 'haresvam',    imageUrl: '/assets/a2-lesson-01/03-glagoli-s-preki-dopulnienia/10-haresvam-parka.jpg',                label: 'Харесвам парка.' },
      { id: 'tseluvam',    imageUrl: '/assets/a2-lesson-01/03-glagoli-s-preki-dopulnienia/11-celuvam-bebe.jpg',                  label: 'Целувам бебето.' },
      { id: 'pregrashtam', imageUrl: '/assets/a2-lesson-01/03-glagoli-s-preki-dopulnienia/12-pregryashtam-deteto.jpg',          label: 'Прегръщам детето.' },
      { id: 'pomnya',      imageUrl: '/assets/a2-lesson-01/04-gramatika-2-vinitelni-mestoimenia/01-pomnya-datata.jpg',           label: 'Помня датата.' },
      { id: 'zabravyam',   imageUrl: '/assets/a2-lesson-01/04-gramatika-2-vinitelni-mestoimenia/02-zabravyam-klyuchovete.jpg',   label: 'Забравям ключовете.' },
      { id: 'tarsya',      imageUrl: '/assets/a2-lesson-01/04-gramatika-2-vinitelni-mestoimenia/03-tarsya-telefona.jpg',         label: 'Търся телефона.' },
      { id: 'namiram',     imageUrl: '/assets/a2-lesson-01/04-gramatika-2-vinitelni-mestoimenia/04-namiram-telefona.jpg',        label: 'Намирам телефона.' },
      { id: 'iskam',       imageUrl: '/assets/a2-lesson-01/04-gramatika-2-vinitelni-mestoimenia/05-iskam-igrachkata.jpg',        label: 'Искам играчката.' },
      { id: 'chakam',      imageUrl: '/assets/a2-lesson-01/04-gramatika-2-vinitelni-mestoimenia/06-chakam-avtobusa.jpg',         label: 'Чакам автобуса.' },
      { id: 'vklyuchvam',  imageUrl: '/assets/a2-lesson-01/04-gramatika-2-vinitelni-mestoimenia/07-vklyuchvam-lampata.jpg',      label: 'Включвам лампата.' },
      { id: 'izklyuchvam', imageUrl: '/assets/a2-lesson-01/04-gramatika-2-vinitelni-mestoimenia/08-izklyuchvam-lampata.jpg',     label: 'Изключвам лампата.' },
      { id: 'otvaryam',    imageUrl: '/assets/a2-lesson-01/04-gramatika-2-vinitelni-mestoimenia/09-otvaryam-prozoretsa.jpg',     label: 'Отварям прозореца.' },
      { id: 'zatvaryam',   imageUrl: '/assets/a2-lesson-01/04-gramatika-2-vinitelni-mestoimenia/10-zatvaryam-prozoretsa.jpg',    label: 'Затварям прозореца.' },
      { id: 'otklyuchvam', imageUrl: '/assets/a2-lesson-01/04-gramatika-2-vinitelni-mestoimenia/11-otklyuchvam-vratata.jpg',     label: 'Отключвам вратата.' },
      { id: 'zaklyuchvam', imageUrl: '/assets/a2-lesson-01/04-gramatika-2-vinitelni-mestoimenia/12-zaklyuchvam-vratata.jpg',     label: 'Заключвам вратата.' },
    ],
  } as IllustratedCardsExercise,

  // ORDER 11 — (без упражнение — пропуснато съзнателно: в учебника между ГЛАГОЛИ и ГРАМАТИКА 2 няма отделна секция)

  // ORDER 12 — ГРАМАТИКА 2 (стр. 19): винителни форми — заместване на допълнението
  {
    id: 'a2-l01-gramatika-02',
    type: 'grammar_examples',
    title: 'ГРАМАТИКА 2',
    subtitle: 'Заместване на прякото допълнение с местоимение',
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
        voiceGender: 'female',
      },
    ],
  } as GrammarExamplesExercise,

  // ORDER 13 — Упр. 9 (стр. 19): преобразувайте изреченията по модела
  {
    id: 'a2-l01-ex-09',
    type: 'workbook_fill_blank',
    instruction: 'Преобразувайте изреченията по модела „Каня Георги на кафе. → Каня го на кафе."',
    order: 13,
    points: 29,
    layout: 'qa-split',
    sentences: [
      { text: 'Каня Георги на кафе. | Каня го на кафе.', blanks: [], correctAnswers: [], isExample: true },
      { text: 'Виждам книгата. | _______',        blanks: [1], correctAnswers: ['Виждам я.'],        acceptableAnswers: [['виждам я.', 'виждам я']] },
      { text: 'Виждаш ли Стоил? | _______',        blanks: [1], correctAnswers: ['Виждаш ли го?'],    acceptableAnswers: [['виждаш ли го?', 'виждаш ли го']] },
      { text: 'Слушам учителката. | _______',      blanks: [1], correctAnswers: ['Слушам я.'],        acceptableAnswers: [['слушам я.', 'слушам я']] },
      { text: 'Чувам музиката. | _______',         blanks: [1], correctAnswers: ['Чувам я.'],         acceptableAnswers: [['чувам я.', 'чувам я']] },
      { text: 'Искам пицата. | _______',           blanks: [1], correctAnswers: ['Искам я.'],         acceptableAnswers: [['искам я.', 'искам я']] },
      { text: 'Искам кафето. | _______',           blanks: [1], correctAnswers: ['Искам го.'],        acceptableAnswers: [['искам го.', 'искам го']] },
      { text: 'Искам сандвичите. | _______',       blanks: [1], correctAnswers: ['Искам ги.'],        acceptableAnswers: [['искам ги.', 'искам ги']] },
      { text: 'Искаш ли ябълката? | _______',      blanks: [1], correctAnswers: ['Искаш ли я?'],      acceptableAnswers: [['искаш ли я?', 'искаш ли я']] },
      { text: 'Разбирам Мони и Светла. | _______', blanks: [1], correctAnswers: ['Разбирам ги.'],     acceptableAnswers: [['разбирам ги.', 'разбирам ги']] },
      { text: 'Каня бежанците на гости. | _______', blanks: [1], correctAnswers: ['Каня ги на гости.'], acceptableAnswers: [['каня ги на гости.', 'каня ги на гости']] },
      { text: 'Познаваш ли Асен? | _______',       blanks: [1], correctAnswers: ['Познаваш ли го?'],  acceptableAnswers: [['познаваш ли го?', 'познаваш ли го']] },
      { text: 'Търся парите. | _______',           blanks: [1], correctAnswers: ['Търся ги.'],        acceptableAnswers: [['търся ги.', 'търся ги']] },
      { text: 'Чакам учителите. | _______',        blanks: [1], correctAnswers: ['Чакам ги.'],        acceptableAnswers: [['чакам ги.', 'чакам ги']] },
      { text: 'Обичам Елена. | _______',           blanks: [1], correctAnswers: ['Обичам я.'],        acceptableAnswers: [['обичам я.', 'обичам я']] },
      { text: 'Ана целува детето. | _______',      blanks: [1], correctAnswers: ['Ана го целува.'],   acceptableAnswers: [['ана го целува.', 'ана го целува']] },
      { text: 'Не харесвам града. | _______',      blanks: [1], correctAnswers: ['Не го харесвам.'],  acceptableAnswers: [['не го харесвам.', 'не го харесвам']] },
      { text: 'Отварят прозореца. | _______',      blanks: [1], correctAnswers: ['Отварят го.'],      acceptableAnswers: [['отварят го.', 'отварят го']] },
      { text: 'Не заключвам вратата. | _______',   blanks: [1], correctAnswers: ['Не я заключвам.'],  acceptableAnswers: [['не я заключвам.', 'не я заключвам']] },
      { text: 'Затваряме магазина. | _______',     blanks: [1], correctAnswers: ['Затваряме го.'],    acceptableAnswers: [['затваряме го.', 'затваряме го']] },
      { text: 'Изключвам телефона. | _______',     blanks: [1], correctAnswers: ['Изключвам го.'],    acceptableAnswers: [['изключвам го.', 'изключвам го']] },
      { text: 'Те питат учителката. | _______',    blanks: [1], correctAnswers: ['Те я питат.'],      acceptableAnswers: [['те я питат.', 'те я питат']] },
      { text: 'Помниш ли това момче? | _______',   blanks: [1], correctAnswers: ['Помниш ли го?'],    acceptableAnswers: [['помниш ли го?', 'помниш ли го']] },
      { text: 'Тя включва компютъра. | _______',   blanks: [1], correctAnswers: ['Тя го включва.'],   acceptableAnswers: [['тя го включва.', 'тя го включва']] },
      { text: 'Аз гледам децата. | _______',       blanks: [1], correctAnswers: ['Аз ги гледам.'],    acceptableAnswers: [['аз ги гледам.', 'аз ги гледам']] },
      // TODO: „Амал" може да е мъжко или женско име — приети са и го, и я.
      { text: 'Разбираш ли Амал? | _______',       blanks: [1], correctAnswers: ['Разбираш ли го?'],  acceptableAnswers: [['разбираш ли го?', 'разбираш ли го', 'разбираш ли я?', 'разбираш ли я']] },
      { text: 'Те прегръщат момичето. | _______',  blanks: [1], correctAnswers: ['Те го прегръщат.'], acceptableAnswers: [['те го прегръщат.', 'те го прегръщат']] },
      { text: 'Той забравя ключа често. | _______', blanks: [1], correctAnswers: ['Той го забравя често.'], acceptableAnswers: [['той го забравя често.', 'той го забравя често']] },
      { text: 'Заключвам офиса в 6:00 часа. | _______', blanks: [1], correctAnswers: ['Заключвам го в 6:00 часа.'], acceptableAnswers: [['заключвам го в 6:00 часа.', 'заключвам го в 6:00 часа']] },
      { text: 'Намирам нови приятели във Фейсбук. | _______', blanks: [1], correctAnswers: ['Намирам ги във Фейсбук.'], acceptableAnswers: [['намирам ги във фейсбук.', 'намирам ги във фейсбук']] },
    ],
  } as WorkbookFillBlankExercise,

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
          { text: 'Връзката е лоша, съжалявам.', voiceGender: 'male' },
        ],
      },
      {
        id: 'б.',
        lines: [
          { text: 'Здравейте. Казвам се Светла Маринова. Обаждам се във връзка с обявата за секретарка. Кога е интервюто?', voiceGender: 'female' },
          { text: 'Здравейте, аз съм Иванов. Заповядайте този петък в 10:00 часа в офиса. Адресът е бул. „Надежда" № 106, етаж 1.', ttsText: 'Здравейте, аз съм Иванов. Заповядайте този петък в десет часа в офиса. Адресът е булевард Надежда номер сто и шест, етаж едно.', voiceGender: 'male' },
          { text: 'Благодаря, до скоро.', voiceGender: 'female' },
          { text: 'Чакаме Ви! Приятен ден!', voiceGender: 'male' },
        ],
      },
      {
        id: 'в.',
        lines: [
          { text: 'Ало, търся тристаен апартамент под наем до 500 евро.', ttsText: 'Ало, търся тристаен апартамент под наем до петстотин евро.', voiceGender: 'female' },
          { text: 'Да, имаме тристаен апартамент в жк „Люлин", близо до метрото.', ttsText: 'Да, имаме тристаен апартамент в комплекс Люлин, близо до метрото.', voiceGender: 'male' },
          { text: 'Има ли магазини и училище близо до апартамента?', voiceGender: 'female' },
          { text: 'Да, има и детска градина.', voiceGender: 'male' },
          { text: 'Много добре.', voiceGender: 'female' },
          { text: 'Кога искате оглед на апартамента?', voiceGender: 'male' },
          { text: 'Може ли утре в 12:30?', ttsText: 'Може ли утре в дванайсет и трийсет?', voiceGender: 'female' },
          { text: 'Да, чакаме Ви пред агенцията.', voiceGender: 'male' },
          { text: 'Благодаря, дочуване.', voiceGender: 'female' },
        ],
      },
    ],
  } as DialoguesExercise,

  // ORDER 15 — Обява за работа (модел от ДИАЛОЗИ 3, за Упр. 17) — лева → евро
  {
    id: 'a2-l01-obyava-rabota',
    type: 'reading_text',
    title: 'ОБЯВА ЗА РАБОТА',
    instruction: 'Прочетете обявата. Тя е модел за следващото упражнение.',
    order: 15,
    audioUrl: '/assets/a2-lesson-01/audio/tts/texts/a2-l01-obyava-rabota-full.mp3',
    paragraphs: [
      'Фирма търси секретарка за офис в София.',
      'Работно време: пълен работен ден.',
      'Почивни дни: събота и неделя.',
      'Езици: английски и арабски.',
      'Заплата: 2000 евро.',
      'Телефон за връзка: 0875-486352.',
    ],
  } as ReadingTextExercise,

  // ORDER 16 — Обява за апартамент под наем (модел от ДИАЛОЗИ 3, за Упр. 17) — лева → евро
  {
    id: 'a2-l01-obyava-naem',
    type: 'reading_text',
    title: 'ОБЯВА ЗА АПАРТАМЕНТ ПОД НАЕМ',
    instruction: 'Прочетете обявата. Тя е модел за следващото упражнение.',
    order: 16,
    audioUrl: '/assets/a2-lesson-01/audio/tts/texts/a2-l01-obyava-naem-full.mp3',
    paragraphs: [
      'Агенция „Нов дом".',
      'Давам под наем тристаен апартамент в София, жк „Люлин", до метростанция.',
      'Наем: 500 евро на месец.',
    ],
  } as ReadingTextExercise,

  // SKIP — Упр. 10 „Прочетете диалозите по двойки" (по желание на клиента)

  // ORDER 17 — Упр. 11 (стр. 20): напишете две обяви по модел от ДИАЛОЗИ 3
  // content-lint-disable example-points-mismatch — 2 free-text обяви (freeTextBlocks), не blanks
  {
    id: 'a2-l01-ex-11',
    type: 'fill_in_blank',
    title: 'УПРАЖНЕНИЕ 11',
    instruction: 'Напишете двете обяви по моделите по-горе. Натиснете „Провери отговорите" — при грешка ще видите правилния вариант.',
    order: 17,
    points: 2,
    sentences: [],
    freeTextBlocks: [
      {
        prompt:
          'ОБЯВА ЗА РАБОТА: Напишете обява за работа по модел в Диалог 3. Нека обявата да е за счетоводител в Пловдив, на четири-часов работен ден и работа на смени, с изискване да говори български и руски, заплата от 1200 евро и телефон за връзка: 00359 878459369.',
        modelAnswer:
          'Фирма търси счетоводител за офис в Пловдив.\nРаботно време: четиричасов работен ден.\nРабота на смени.\nЕзици: български и руски.\nЗаплата: 1200 евро.\nТелефон за връзка: 00359 878459369.',
        keywordGroups: [
          ['счетоводител'],
          ['пловдив'],
          ['четири', '4-часов', 'четиричасов'],
          ['смени'],
          ['руски'],
          ['1200'],
          ['878459369', '00359'],
        ],
      },
      {
        prompt:
          'ОБЯВА ЗА АПАРТАМЕНТ ПОД НАЕМ: Напишете обява за апартамент под наем. Нека обявата да е за къща на два етажа с двор в гр. Варна, кв. „Чайка", на метри от Морската градина и с наем от 500 евро на месец.',
        modelAnswer:
          'Давам под наем къща на два етажа с двор в гр. Варна, кв. „Чайка", на метри от Морската градина.\nНаем: 500 евро на месец.',
        keywordGroups: [
          ['къща', 'двуетаж'],
          ['варна'],
          ['чайка'],
          ['морската', 'морска градина'],
          ['500'],
        ],
      },
    ],
  } as FillInBlankExercise,

  // ORDER 19 — Упр. 12 (стр. 21, допълнително): направете въпросителни изречения
  // TODO: учебникът дава комбинативна таблица; адаптирано до 5 фиксирани въпроса.
  {
    id: 'a2-l01-ex-12',
    type: 'word_order',
    instruction: 'Поставете думите в правилния ред, за да получите въпроси.',
    order: 19,
    points: 5,
    questions: [
      { words: ['ли', 'ме', 'Чуваш', '?'],     correctSentence: 'Чуваш ли ме ?' },
      { words: ['го', 'ли', 'Каните', '?'],     correctSentence: 'Каните ли го ?' },
      { words: ['ли', 'я', 'Чакаш', '?'],       correctSentence: 'Чакаш ли я ?' },
      { words: ['ни', 'Разбирате', 'ли', '?'],  correctSentence: 'Разбирате ли ни ?' },
      { words: ['ли', 'ги', 'Виждаш', '?'],     correctSentence: 'Виждаш ли ги ?' },
    ],
  } as WordOrderExercise,

  // ORDER 20 — Упр. 13 (стр. 21, допълнително): преобразувайте по модела
  {
    id: 'a2-l01-ex-13',
    type: 'workbook_fill_blank',
    instruction: 'Преобразувайте изреченията по модела „Аз я обичам. → Обичам я."',
    order: 20,
    points: 8,
    layout: 'qa-split',
    sentences: [
      { text: 'Тя ме прегръща. | _______',  blanks: [1], correctAnswers: ['Прегръща ме.'], acceptableAnswers: [['прегръща ме.', 'прегръща ме']] },
      { text: 'Той ги целува. | _______',    blanks: [1], correctAnswers: ['Целува ги.'],   acceptableAnswers: [['целува ги.', 'целува ги']] },
      { text: 'Ние ви слушаме. | _______',   blanks: [1], correctAnswers: ['Слушаме ви.'],  acceptableAnswers: [['слушаме ви.', 'слушаме ви']] },
      { text: 'Той я помни. | _______',      blanks: [1], correctAnswers: ['Помни я.'],     acceptableAnswers: [['помни я.', 'помни я']] },
      { text: 'Тя го харесва. | _______',    blanks: [1], correctAnswers: ['Харесва го.'],  acceptableAnswers: [['харесва го.', 'харесва го']] },
      { text: 'Ние я търсим. | _______',     blanks: [1], correctAnswers: ['Търсим я.'],    acceptableAnswers: [['търсим я.', 'търсим я']] },
      { text: 'Те я питат. | _______',       blanks: [1], correctAnswers: ['Питат я.'],     acceptableAnswers: [['питат я.', 'питат я']] },
      { text: 'Аз те познавам. | _______',   blanks: [1], correctAnswers: ['Познавам те.'], acceptableAnswers: [['познавам те.', 'познавам те']] },
    ],
  } as WorkbookFillBlankExercise,

  // ORDER 21 — Упр. 21 (стр. 21, допълнително): попълнете местоименията в телефонния диалог (балони около снимката)
  {
    id: 'a2-l01-ex-14',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 21',
    instruction: 'Изберете правилните местоимения, за да попълните диалога.',
    order: 21,
    points: 11,
    layout: 'image-bubbles',
    imageUrl: '/assets/a2-lesson-01/05-dopalnitelni-upr-14-telefon-dialog/01-telefonen-razgovor.jpg',
    sentences: [
      { text: 'Ало, ало, скъпа! Чуваш ли _______?', blanks: [3], correctAnswers: ['ме'], options: ['ме', 'те', 'го', 'я'], bubbleSide: 'left' },
      { text: 'Обичаш ли _______?',                  blanks: [2], correctAnswers: ['ме'], options: ['ме', 'те', 'го', 'я'], bubbleSide: 'right' },
      { text: 'Връзката е много лоша. Ало! Питам _______.', blanks: [5], correctAnswers: ['те'], options: ['ме', 'те', 'го', 'я'], bubbleSide: 'left' },
      { text: 'Обичаш ли _______?',                  blanks: [2], correctAnswers: ['ме'], options: ['ме', 'те', 'го', 'я'], bubbleSide: 'right' },
      { text: 'Чакам _______ всеки ден!',            blanks: [1], correctAnswers: ['те'], options: ['ме', 'те', 'го', 'я'], bubbleSide: 'left' },
      { text: 'Търся _______ навсякъде!',            blanks: [1], correctAnswers: ['те'], options: ['ме', 'те', 'го', 'я'], bubbleSide: 'right' },
      { text: 'Разбираш ли _______?',                blanks: [2], correctAnswers: ['ме'], options: ['ме', 'те', 'го', 'я'], bubbleSide: 'left' },
      { text: 'Да, да, чувам _______.',              blanks: [3], correctAnswers: ['те'], options: ['ме', 'те', 'го', 'я'], bubbleSide: 'right' },
      { text: 'Не _______ обичам!',                  blanks: [1], correctAnswers: ['те'], options: ['ме', 'те', 'го', 'я'], bubbleSide: 'left' },
      { text: 'Не _______ харесвам.',                blanks: [1], correctAnswers: ['те'], options: ['ме', 'те', 'го', 'я'], bubbleSide: 'right' },
      { text: 'Съжалявам, не _______ разбирам. Изключвам телефона.', blanks: [3], correctAnswers: ['те'], options: ['ме', 'те', 'го', 'я'], bubbleSide: 'left' },
    ],
  } as WorkbookFillBlankExercise,

  // ORDER 22 — Упр. 15 (стр. 21, допълнително): маргаритка „Обича ме / Не ме обича"
  // TODO: няма точен интерактивен тип за „откъсване на листенца" — показано информативно.
  {
    id: 'a2-l01-ex-15',
    type: 'grammar_examples',
    title: 'УПРАЖНЕНИЕ 15',
    subtitle: 'Маргаритка — обича ли Ви той или тя?',
    instruction: 'Прочетете листенцата на маргаритката и разберете: обича ли Ви той или тя?',
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

  // ORDER 23 — Упр. 16 (стр. 21, допълнително): маргаритка с „разбира" (по желание на клиента)
  // TODO: като Упр. 15 — „обича" е заменено с „разбира" по указание на клиента.
  {
    id: 'a2-l01-ex-16',
    type: 'grammar_examples',
    title: 'УПРАЖНЕНИЕ 16',
    subtitle: 'Маргаритка — разбира ли Ви той или тя?',
    instruction: 'Заменете „обича" с „разбира" и прочетете листенцата: разбира ли Ви той или тя?',
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

  // ORDER 24 — Упр. 17 (стр. 22): профили + телефонни номера в едно упражнение
  // Прочети профила → слушай номерата → напиши номера в полето до всяко лице.
  {
    id: 'a2-l01-ex-17',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 17',
    instruction: 'Прочетете отговорите на въпроса „Колко често и за какво използвате телефона?" Изслушайте телефонните номера и ги напишете в полетата.',
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
        blanks: [1], correctAnswers: ['0886/392-754'], acceptableAnswers: [['0886/392-754', '0886392754', '0886 392 754']],
      },
      {
        text: 'Катя, 33 години (тел. _______)',
        contextText: 'Много често говоря с мъжа ми, децата, приятелите. Използвам го като часовник, календар. Нямам интернет на телефона и не искам. Имам интернет вкъщи.',
        blanks: [1], correctAnswers: ['0894/124-761'], acceptableAnswers: [['0894/124-761', '0894124761', '0894 124 761']],
      },
      {
        text: 'Иво, 17 години (тел. _______)',
        contextText: 'Не излизам без телефона. Не излизам от Дискорд и Инстаграм, спя с телефона. Няма телефон, няма живот!',
        blanks: [1], correctAnswers: ['089000743'], acceptableAnswers: [['089000743', '0890 00 743']],
      },
      {
        text: 'Симона, 48 години (тел. _______)',
        contextText: 'Не много често. Обаждам се на приятели, но използвам повече Вайбър. Безплатно е. Децата ми не са в България и говорим само по Скайп.',
        blanks: [1], correctAnswers: ['0899/1447281'], acceptableAnswers: [['0899/1447281', '08991447281', '0899 1447281']],
      },
      {
        text: 'Стефан, 29 години (тел. _______)',
        contextText: 'Използвам го през цялото време. Обаждам се, правя снимки, пращам ги на приятели, пращам SMS-и. Никога не изключвам телефона, само в самолета.',
        blanks: [1], correctAnswers: ['0895/753380'], acceptableAnswers: [['0895/753380', '0895753380', '0895 753 380']],
      },
      {
        text: 'Диана, 55 години (тел. _______)',
        contextText: 'Не говоря много по телефона. Забравям го често вкъщи.',
        blanks: [1], correctAnswers: ['0848/952333'], acceptableAnswers: [['0848/952333', '0848952333', '0848 952 333']],
      },
      {
        text: 'Симеон, 88 години (тел. _______)',
        contextText: 'Имам телефон от дъщеря ми, но имам проблем — не виждам числата добре и не чувам добре. Децата и внуците се обаждат често.',
        blanks: [1], correctAnswers: ['0887/152399'], acceptableAnswers: [['0887/152399', '0887152399', '0887 152 399']],
      },
    ],
  } as WorkbookFillBlankExercise,

  // SKIP — Упр. 18 „А Вие колко често и за какво използвате телефона?" (по желание на клиента — свободно писане)

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

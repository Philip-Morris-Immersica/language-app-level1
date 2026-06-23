import type {
  Exercise,
  ImageLabelingExercise,
  GrammarTableExercise,
  GrammarExamplesExercise,
  DialoguesExercise,
  WorkbookFillBlankExercise,
  DropdownMatchExercise,
  TrueFalseExercise,
  ReadingTextExercise,
  IllustratedCardsExercise,
} from '@/content/types';

// ⚠️ Order follows the A2 textbook „Услуги" (стр. 51–59).
// Пропуснати по желание на клиента: упр. 2, 3, 7, 9, 10, 11, 13, 18, 19, 24, 25, 26, 27, 28, 29, 33, 36.

const ASSET = '/assets/a2-lesson-05';

export const exercises: Exercise[] = [

  // ─── ORDER 1 — Упр. 1 (стр. 51): хотели и стаи ────────────────────────────
  {
    id: 'a2-l05-ex-01',
    type: 'image_labeling',
    title: 'УПРАЖНЕНИЕ 1',
    instruction: 'Изберете подходящата дума под всяка картинка.',
    order: 1,
    points: 6,
    displayType: 'default',
    columns: 3,
    images: [
      { id: 'hostel',        imageUrl: `${ASSET}/01-upr-01-uslugi-hoteli-stai/01-hostel.jpg`,                    correctLabel: 'хостел',                      isExample: true },
      { id: 'motel',         imageUrl: `${ASSET}/01-upr-01-uslugi-hoteli-stai/02-motel.jpg`,                    correctLabel: 'мотел',                       imageOptions: ['хостел', 'мотел', 'единична стая', 'хотел'] },
      { id: 'hotel',         imageUrl: `${ASSET}/01-upr-01-uslugi-hoteli-stai/03-hotel.jpg`,                    correctLabel: 'хотел',                       imageOptions: ['двойна стая (с две легла)', 'хостел', 'хотел', 'мотел'] },
      { id: 'dvoyna-dvoyno', imageUrl: `${ASSET}/01-upr-01-uslugi-hoteli-stai/04-dvoyna-staya-dvoyno-leglo.jpg`, correctLabel: 'двойна стая (с двойно легло)', imageOptions: ['двойна стая (с две легла)', 'двойна стая (с двойно легло)', 'единична стая', 'хостел'] },
      { id: 'dvoyna-dve',    imageUrl: `${ASSET}/01-upr-01-uslugi-hoteli-stai/05-dvoyna-staya-dve-legla.jpg`,   correctLabel: 'двойна стая (с две легла)',    imageOptions: ['единична стая', 'мотел', 'двойна стая (с две легла)', 'двойна стая (с двойно легло)'] },
      { id: 'edinichna',     imageUrl: `${ASSET}/01-upr-01-uslugi-hoteli-stai/06-edinichna-staya.jpg`,          correctLabel: 'единична стая',               imageOptions: ['двойна стая (с двойно легло)', 'двойна стая (с две легла)', 'единична стая', 'хотел'] },
    ],
    options: [
      'хостел',
      'мотел',
      'хотел',
      'двойна стая (с двойно легло)',
      'двойна стая (с две легла)',
      'единична стая',
    ],
  } as ImageLabelingExercise,

  // ─── ORDER 2 — ДИАЛОЗИ 1 (стр. 51) ────────────────────────────────────────
  {
    id: 'a2-l05-dialozi-01',
    type: 'dialogues',
    title: 'ДИАЛОЗИ 1',
    instruction: 'Натиснете всяка реплика, за да чуете произношението. После повторете на глас.',
    order: 2,
    sections: [
      {
        id: 'а.',
        lines: [
          { text: 'Добър ден. Имате ли свободни стаи?', voiceGender: 'female', ttsText: 'Добър ден. Имате ли свободни стаи?' },
          { text: 'Да, имаме. Една единична стая и две двойни – една с две легла и една с двойно легло.', voiceGender: 'male' },
          { text: 'Може ли стая с две легла?', voiceGender: 'female', ttsText: 'Може ли стая с две легла?' },
          { text: 'За колко дни?', voiceGender: 'male' },
          { text: 'За три.', voiceGender: 'female', ttsText: 'За трри.' },
        ],
      },
      {
        id: 'б.',
        bubbleSide: 'right',
        lines: [
          { text: 'Окей такси. Добро утро.', voiceGender: 'male' },
          { text: 'Добро утро. Може ли такси за 9:00 часа до болница „Токуда"? Обаждам се от адрес жк „Обеля", бл. 153, вх. А.', voiceGender: 'female', ttsText: 'Добро утро. Може ли такси за девет часа до болница Токуда? Обаждам се от адрес же ка Обеля, блок сто петдесет и три, вход А.' },
          { text: 'Добре. Таксито ще дойде след 10 минути.', voiceGender: 'male', ttsText: 'Добре. Таксито ще дойде след десет минути.' },
        ],
      },
      {
        id: 'в.',
        imageUrl: `${ASSET}/02-dialozi-1-kopiren-centar/01-kseroks.jpg`,
        lines: [
          { text: 'Искам едно копие на този документ.', voiceGender: 'male' },
          { text: 'Двустранно или едностранно?', voiceGender: 'female' },
          { text: 'Двустранно, моля. Колко струва?', voiceGender: 'male' },
          { text: '20 стотинки на страница.', voiceGender: 'female', ttsText: 'Двадесет стотинки на страница.' },
        ],
      },
    ],
  } as DialoguesExercise,

  // ─── ORDER 3 — ГРАМАТИКА 1 (стр. 51): искам да ─────────────────────────────
  {
    id: 'a2-l05-gramatika-01',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 1',
    instruction: 'Запознайте се со спрежението на „искам да" в положителна, отрицателна и въпросителна форма.',
    instructionKey: 'a2.gr.l05.iskamDa',
    order: 3,
    tableTitle: 'Искам да + глагол (уча)',
    columns: ['(+)', '(−)', '(?)'],
    rows: [
      { pronoun: 'аз',        cells: ['искам да уча',    'не искам да уча',    'искам ли да уча'],    ttsText: 'аз. Искам да уча. Не искам да уча. Искам ли да уча?' },
      { pronoun: 'ти',        cells: ['искаш да учиш',   'не искаш да учиш',   'искаш ли да учиш'],   ttsText: 'ти. Искаш да учиш. Не искаш да учиш. Искаш ли да учиш?' },
      { pronoun: 'той/тя/то', cells: ['иска да учи',     'не иска да учи',     'иска ли да учи'],     ttsText: 'той, тя, то. Иска да учи. Не иска да учи. Иска ли да учи?' },
      { pronoun: 'ние',       cells: ['искаме да учим',  'не искаме да учим',  'искаме ли да учим'],  ttsText: 'ние. Искаме да учим. Не искаме да учим. Искаме ли да учим?' },
      { pronoun: 'Вие',       cells: ['искате да учите', 'не искате да учите', 'искате ли да учите'], ttsText: 'Вие. Искате да учите. Не искате да учите. Искате ли да учите?' },
      { pronoun: 'те',        cells: ['искат да учат',   'не искат да учат',   'искат ли да учат'],   ttsText: 'те. Искат да учат. Не искат да учат. Искат ли да учат?' },
    ],
    notes: [
      'Глаголът след „да" е в сегашно време, спрегнат по лице и число.',
    ],
    ttsNoteModels: ['pro'],
  } as GrammarTableExercise,

  // ─── ORDER 4 — ГРАМАТИКА 2 (стр. 52): мога да / трябва да ─────────────────
  {
    id: 'a2-l05-gramatika-02',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 2',
    instruction: 'Запознайте се со спрежението на глаголите „мога да" и „трябва да".',
    instructionKey: 'a2.gr.l05.mogaTryabva',
    order: 4,
    tableTitle: 'Мога да и трябва да + глагол',
    columns: ['мога да', 'трябва да'],
    rows: [
      { pronoun: 'аз',        cells: ['мога да пиша',    'трябва да работя'],    ttsText: 'аз. Мога да пиша. Трябва да работя.' },
      { pronoun: 'ти',        cells: ['можеш да пишеш',  'трябва да работиш'],   ttsText: 'ти. Можеш да пишеш. Трябва да работиш.' },
      { pronoun: 'той/тя/то', cells: ['може да пише',    'трябва да работи'],    ttsText: 'той, тя, то. Може да пише. Трябва да работи.' },
      { pronoun: 'ние',       cells: ['можем да пишем',  'трябва да работим'],   ttsText: 'ние. Можем да пишем. Трябва да работим.' },
      { pronoun: 'Вие',       cells: ['можете да пишете','трябва да работите'],  ttsText: 'Вие. Можете да пишете. Трябва да работите.' },
      { pronoun: 'те',        cells: ['могат да пишат',  'трябва да работят'],   ttsText: 'те. Могат да пишат. Трябва да работят.' },
    ],
    notes: [
      '„Трябва" е неизменяемо — еднаква форма за всички лица. Само глаголът след „да" се спряга.',
      '„Не мога да пиша." / „Можеш ли да пишеш?" — отрицание с „не", въпрос с „ли".',
    ],
    ttsNoteModels: ['pro', 'pro'],
  } as GrammarTableExercise,

  // ─── ORDER 5 — ГРАМАТИКА 3 (стр. 52): много пъти / един път ────────────────
  {
    id: 'a2-l05-gramatika-03',
    type: 'grammar_examples',
    title: 'ГРАМАТИКА 3',
    instruction: 'Запознайте се с разликата: несвършен вид (много пъти) срещу свършен вид (един път).',
    instructionKey: 'a2.gr.l05.vidNaGlagola',
    order: 5,
    layout: 'centered',
    examples: [
      {
        imageUrl: '',
        text: 'МНОГО ПЪТИ — несвършен вид',
        lines: [
          'Всеки ден: искам да **купувам** плодове.',
          'Всеки ден: мога да **купувам** плодове.',
          'Всеки ден: трябва да **купувам** плодове.',
        ],
        ttsText: 'Много пъти — несвършен вид. Всеки ден искам да купувам плодове. Всеки ден мога да купувам плодове. Всеки ден трябва да купувам плодове.',
        voiceGender: 'female',
      },
      {
        imageUrl: '',
        text: 'ЕДИН ПЪТ — свършен вид',
        lines: [
          'Сега: искам да **купя** плодове.',
          'Сега: мога да **купя** плодове.',
          'Сега: трябва да **купя** плодове.',
          '',
          'Винаги трябва да **идвам** на работа рано.',
          'Днес искам да **дойда** на работа по-късно.',
        ],
        ttsText: 'Един път — свършен вид. Сега искам да купя плодове. Сега мога да купя плодове. Сега трябва да купя плодове. Винаги трябва да идвам на работа рано. Днес искам да дойда на работа по-късно.',
        voiceGender: 'female',
      },
    ],
  } as GrammarExamplesExercise,

  // ─── ORDER 6 — Упр. 4 (стр. 52): подчертайте правилната форма ─────────────
  {
    id: 'a2-l05-ex-04',
    type: 'workbook_fill_blank',
    instruction: 'Изберете правилната глаголна форма по модела.',
    order: 6,
    points: 4,
    layout: 'single',
    sentences: [
      { text: 'Искам да **идвам / дойда** тази вечер на гости.', blanks: [], correctAnswers: [], isExample: true },
      { text: 'Искат да _______ на гости тази неделя.', blanks: [1], correctAnswers: ['дойдат'], options: ['отидат', 'идват', 'дойдат'], acceptableAnswers: [['дойдат']] },
      { text: 'Сега той иска да _______ душ.', blanks: [1], correctAnswers: ['вземе'], options: ['взема', 'вземе', 'вземат'], acceptableAnswers: [['вземе']] },
      { text: 'Утре сутринта те искат да _______ рано.', blanks: [1], correctAnswers: ['станат'], options: ['стане', 'станат', 'стават'], acceptableAnswers: [['станат']] },
      { text: 'Аз искам да _______ на Мария всеки уикенд.', blanks: [1], correctAnswers: ['помагам'], options: ['помогна', 'помага', 'помагам'], acceptableAnswers: [['помагам']] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 7 — Упр. 5 (стр. 52): отговорете по модела ─────────────────────
  {
    id: 'a2-l05-ex-05',
    type: 'workbook_fill_blank',
    instruction: 'Изберете положителен и отрицателен отговор по модела.',
    order: 7,
    points: 8,
    layout: 'single',
    sentences: [
      { text: 'Искаш ли да пиеш черен чай? | Да, искам да пия. Не, не искам да пия.', blanks: [], correctAnswers: [], isExample: true },
      { text: 'Искаш ли да вечеряш в ресторант „Хепи" с приятели? | Да, искам да _______ . Не, не искам да _______ .', blanks: [1, 2], correctAnswers: ['вечерям', 'вечерям'], options: [['вечерям', 'вечеряш', 'вечерят'], ['вечерям', 'вечеряш', 'вечерят']], acceptableAnswers: [['вечерям'], ['вечерям']] },
      { text: 'Искаш ли да отидеш на планина през уикенда? | Да, искам да _______ . Не, не искам да _______ .', blanks: [1, 2], correctAnswers: ['отида', 'отида'], options: [['отида', 'отидеш', 'отидат'], ['отида', 'отидеш', 'отидат']], acceptableAnswers: [['отида'], ['отида']] },
      { text: 'Искаш ли да гледаш телевизия тази вечер? | Да, искам да _______ . Не, не искам да _______ .', blanks: [1, 2], correctAnswers: ['гледам', 'гледам'], options: [['гледам', 'гледаш', 'гледат'], ['гледам', 'гледаш', 'гледат']], acceptableAnswers: [['гледам'], ['гледам']] },
      { text: 'Искаш ли да дойдеш вкъщи? | Да, искам да _______ . Не, не искам да _______ .', blanks: [1, 2], correctAnswers: ['дойда', 'дойда'], options: [['дойда', 'дойдеш', 'дойдат'], ['дойда', 'дойдеш', 'дойдат']], acceptableAnswers: [['дойда'], ['дойда']] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 8 — Упр. 6 (стр. 52): попълнете окончанията ────────────────────
  {
    id: 'a2-l05-ex-06',
    type: 'workbook_fill_blank',
    instruction: 'Изберете правилната форма на глагола по модела „Вие трябва да учите много."',
    order: 8,
    points: 5,
    layout: 'single',
    sentences: [
      { text: 'Вие трябва да учите много.', blanks: [], correctAnswers: [], isExample: true },
      { text: 'Аз трябва да _______ на лекар.', blanks: [1], correctAnswers: ['отида'], options: ['отиде', 'отида', 'отидат'], acceptableAnswers: [['отида']] },
      { text: 'Ние трябва да _______ топъл чай.', blanks: [1], correctAnswers: ['пием'], options: ['пия', 'пие', 'пием'], acceptableAnswers: [['пием']] },
      { text: 'Те трябва да _______ книги на английски.', blanks: [1], correctAnswers: ['четат'], options: ['чете', 'четат', 'четеш'], acceptableAnswers: [['четат']] },
      { text: 'Ти трябва да _______ много зеленчуци.', blanks: [1], correctAnswers: ['ядеш'], options: ['яде', 'ядат', 'ядеш'], acceptableAnswers: [['ядеш']] },
      { text: 'Той трябва да _______ български.', blanks: [1], correctAnswers: ['учи'], options: ['уча', 'учат', 'учи'], acceptableAnswers: [['учи']] },
    ],
  } as WorkbookFillBlankExercise,

  // SKIP — Упр. 7 „Отговорете на въпроса" (по желание на клиента)

  // ─── ORDER 9 — Упр. 8 (стр. 53): направете въпроси ─────────────────────────
  {
    id: 'a2-l05-ex-08',
    type: 'workbook_fill_blank',
    instruction: 'Изберете правилния въпрос по модела: „Аз мога да пиша на арабски. → А ти можеш ли да пишеш на арабски?"',
    order: 9,
    points: 5,
    layout: 'two-column',
    sentences: [
      { text: 'Аз мога да пиша на арабски. | А ти можеш ли да пишеш на арабски?', blanks: [], correctAnswers: [], isExample: true },
      { text: 'Аз мога да говоря български. | А ти можеш ли да _______ български?', blanks: [1], correctAnswers: ['говориш'], options: ['говори', 'говориш', 'говорим'], acceptableAnswers: [['говориш']] },
      { text: 'Христо може да прави баница. | А ти можеш ли да _______ баница?', blanks: [1], correctAnswers: ['правиш'], options: ['правим', 'прави', 'правиш'], acceptableAnswers: [['правиш']] },
      { text: 'Ахмед може да танцува сирийски танци. | А ти можеш ли да _______ сирийски танци?', blanks: [1], correctAnswers: ['танцуваш'], options: ['танцуват', 'танцувам', 'танцуваш'], acceptableAnswers: [['танцуваш']] },
      { text: 'Ширин и Ханан могат да готвят иракска храна. | А ти можеш ли да _______ иракска храна?', blanks: [1], correctAnswers: ['готвиш'], options: ['готвиш', 'готви', 'готвим'], acceptableAnswers: [['готвиш']] },
      { text: 'Ние можем да тичаме бързо. | А ти можеш ли да _______ бързо?', blanks: [1], correctAnswers: ['тичаш'], options: ['тичам', 'тичат', 'тичаш'], acceptableAnswers: [['тичаш']] },
    ],
  } as WorkbookFillBlankExercise,

  // SKIP — Упр. 9 „Прочетете информацията за Марин" (по желание на клиента)

  // ─── ORDER 10 — ДИАЛОЗИ 2 (стр. 53) ───────────────────────────────────────
  {
    id: 'a2-l05-dialozi-02',
    type: 'dialogues',
    title: 'ДИАЛОЗИ 2',
    instruction: 'Натиснете всяка реплика, за да чуете произношението. После повторете на глас.',
    order: 10,
    sections: [
      {
        id: 'а.',
        lines: [
          { text: 'Здравейте! Ресторант „Старата къща".', voiceGender: 'female' },
          { text: 'Добър ден, може ли да резервирам маса за двама за утре вечер?', voiceGender: 'male' },
          { text: 'За колко часа?', voiceGender: 'female', ttsText: 'За колко часЪ?' },
          { text: 'За 19:00.', voiceGender: 'male', ttsText: 'За деветнайсет часЪ.' },
          { text: 'Добре, ще Ви чакаме.', voiceGender: 'female' },
          { text: 'Благодаря.', voiceGender: 'male', ttsText: 'Благодаария.' },
        ],
      },
      {
        id: 'б.',
        bubbleSide: 'right',
        lines: [
          { text: 'Здравейте, пицария „Италия" ли е?', voiceGender: 'male', ttsText: 'Здравейте, пицарѝя Италия ли е?' },
          { text: 'Да, слушам Ви.', voiceGender: 'female' },
          { text: 'Искам да поръчам три пици – една малка „Маргарита", една средна „Вегетариана" и една голяма „Капричоза".', voiceGender: 'male' },
          { text: 'Може ли адреса и телефона Ви?', voiceGender: 'female' },
          { text: 'Да, улица „Хан Крум" 15, тел. 0887-43-62-09.', voiceGender: 'male', ttsText: 'Да, улица Хан Крум петнайсет, телефон нула, осем, осем, седем, четиридесет и три, шестдесет и две, нула девет.' },
          { text: 'За колко часа?', voiceGender: 'female', ttsText: 'За колко часЪ?' },
          { text: 'За 13:00 часа, моля.', voiceGender: 'male', ttsText: 'За тринайсет часЪ, моля.' },
        ],
      },
    ],
  } as DialoguesExercise,

  // SKIP — Упр. 10, 11 „Прочетете диалозите по двойки / Работете по двойки" (по желание на клиента)

  // ─── ORDER 11 — Упр. 12 текст (стр. 53–54): Анелия ─────────────────────────
  {
    id: 'a2-l05-tekst-aneliya',
    type: 'reading_text',
    title: 'УПРАЖНЕНИЕ 12',
    textTitle: 'Анелия',
    instruction: 'Изслушайте текста и след това го прочетете сами.',
    order: 11,
    showDictionary: true,
    paragraphs: [
      'Анелия не обича да готви. Обикновено тя обядва в ресторанта близо до офиса. Там не е скъпо и храната е вкусна. Всеки ден има различно обедно меню.',
      'За вечеря тя прави сандвич и салата или поръчва пица от близката пицария. Доставката е бърза и безплатна.',
      'Често Анелия и приятелите й се срещат в петък вечера и вечерят заедно в ресторант „Добре дошли". Те правят резервация в четвъртък, защото много хора харесват този ресторант и често няма свободни места.',
    ],
    ttsParagraphs: [
      'Анелия не обича да готви. Обикновено тя обядва в ресторанта близо до офиса. Там не е скъпо и храната е вкусна. Всеки ден има различно обедно меню.',
      'За вечеря тя прави сандвич и салата или поръчва пица от близката пицария. Доставката е бърза и безплатна.',
      'Често Анелия и приятелите й се срещат в петък вечера и вечерят заедно в ресторант Добре дошли. Те правят резервация в четвъртък, защото много хора харесват този ресторант и често няма свободни места.',
    ],
    paragraphVoiceGenders: ['female', 'female', 'female'],
  } as ReadingTextExercise,

  // ─── ORDER 12 — Упр. 12 вярно/грешно (стр. 54) ────────────────────────────
  {
    id: 'a2-l05-ex-12',
    type: 'true_false',
    instruction: 'Прочетете текста и определете дали твърденията са верни (✓) или неверни (✗).',
    order: 12,
    points: 5,
    sentences: [
      { id: 's01', text: 'Анелия обядва в ресторант близо до офиса.',                 isTrue: true  },
      { id: 's02', text: 'Анелия обича да готви.',                                      isTrue: false },
      { id: 's03', text: 'В петък Анелия и приятелите й вечерят заедно.',              isTrue: true  },
      { id: 's04', text: 'Доставката от пицарията е скъпа.',                           isTrue: false },
      { id: 's05', text: 'Ресторант „Добре дошли" винаги има свободни места.',          isTrue: false },
    ],
  } as TrueFalseExercise,

  // SKIP — Упр. 13 „Отговорете на въпросите" (по желание на клиента)

  // ─── ORDER 13 — ГРАМАТИКА 4 (стр. 54): може ли ────────────────────────────
  {
    id: 'a2-l05-gramatika-04',
    type: 'grammar_examples',
    title: 'ГРАМАТИКА 4',
    instruction: 'Запознайте се с израза „може ли" за учтива молба.',
    instructionKey: 'a2.gr.l05.mozheLi',
    order: 13,
    layout: 'centered',
    examples: [
      {
        imageUrl: '',
        text: 'Може ли + съществително (без да)',
        lines: [
          'Може ли **едно кафе**?',
          'Може ли **един билет**?',
          'Може ли **сметката**?',
          'Може ли **рестото**?',
        ],
        ttsText: 'Може ли едно кафе? Може ли един билет? Може ли сметката? Може ли рестото?',
        voiceGender: 'female',
      },
      {
        imageUrl: '',
        text: 'Може ли + да + глагол в свършен вид',
        lines: [
          'Влизам в стаята. → Може ли да **вляза**?',
          'Плащам сметката. → Може ли да **платя**?',
        ],
        ttsText: 'Влизам в стаята. Може ли да вляза? Плащам сметката. Може ли да платя?',
        voiceGender: 'female',
      },
    ],
  } as GrammarExamplesExercise,

  // ─── ORDER 14 — Упр. 14 (стр. 54): Къде може да чуете тези въпроси? ───────
  {
    id: 'a2-l05-ex-14',
    type: 'dropdown_match',
    title: 'УПРАЖНЕНИЕ 14',
    instruction: 'Изберете подходящото място от списъка, където може да чуете всеки въпрос.',
    order: 14,
    points: 5,
    questions: [
      { id: 'q1', left: '1. Може ли една единична стая?',               options: ['в ресторанта', 'в таксито', 'в кафето', 'в хотела', 'в копирния център'], correctAnswer: 'в хотела' },
      { id: 'q2', left: '2. Може ли копие на този документ?',            options: ['в ресторанта', 'в таксито', 'в кафето', 'в хотела', 'в копирния център'], correctAnswer: 'в копирния център' },
      { id: 'q3', left: '3. Може ли до Централна гара?',                 options: ['в ресторанта', 'в таксито', 'в кафето', 'в хотела', 'в копирния център'], correctAnswer: 'в таксито' },
      { id: 'q4', left: '4. Може ли една шопска салата?',                options: ['в ресторанта', 'в таксито', 'в кафето', 'в хотела', 'в копирния център'], correctAnswer: 'в ресторанта', alternateCorrectAnswers: ['в кафето'] },
      { id: 'q5', left: '5. Може ли едно кафе със сметана?',             options: ['в ресторанта', 'в таксито', 'в кафето', 'в хотела', 'в копирния център'], correctAnswer: 'в кафето', alternateCorrectAnswers: ['в ресторанта'] },
    ],
  } as DropdownMatchExercise,

  // ─── ORDER 15 — Упр. 15 (стр. 54): попълнете с ли / да / пия / ли да ──────
  {
    id: 'a2-l05-ex-15',
    type: 'workbook_fill_blank',
    instruction: 'Попълнете с подходящата дума или израз: ли, да, ли да.',
    order: 15,
    points: 5,
    layout: 'single',
    sentences: [
      { text: 'Може ли да говоря с г-н Иванов?', blanks: [], correctAnswers: [], isExample: true },
      { text: 'Може _______ да слушам радио?', blanks: [1], correctAnswers: ['ли'], options: ['ли', 'да', 'ли да'], acceptableAnswers: [['ли']] },
      { text: 'Може _______ гледам телевизия?', blanks: [1], correctAnswers: ['ли да'], options: ['ли', 'да', 'ли да'], acceptableAnswers: [['ли да']] },
      { text: 'Може _______ едно кафе?', blanks: [1], correctAnswers: ['ли'], options: ['ли', 'да', 'ли да'], acceptableAnswers: [['ли']] },
      { text: 'Може _______ да пия вода?', blanks: [1], correctAnswers: ['ли'], options: ['ли', 'да', 'ли да'], acceptableAnswers: [['ли']] },
      { text: 'Може _______ едно кафе, моля?', blanks: [1], correctAnswers: ['ли'], options: ['ли', 'да', 'ли да'], acceptableAnswers: [['ли']] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 16 — Упр. 16 (стр. 54): подчертайте правилната форма ────────────
  {
    id: 'a2-l05-ex-16',
    type: 'workbook_fill_blank',
    instruction: 'Изберете правилната глаголна форма по модела.',
    order: 16,
    points: 4,
    layout: 'single',
    sentences: [
      { text: 'Може ли да **затварям** / **затворя** вратата?', blanks: [], correctAnswers: [], isExample: true },
      { text: 'Може ли да _______ това цвете?', blanks: [1], correctAnswers: ['купя'], options: ['купувам', 'купя'], acceptableAnswers: [['купя']] },
      { text: 'Може ли да _______ на кино довечера?', blanks: [1], correctAnswers: ['отида'], options: ['отивам', 'отида'], acceptableAnswers: [['отида']] },
      { text: 'Може ли да ми _______ за домашното днес?', blanks: [1], correctAnswers: ['помогнеш'], options: ['помагаш', 'помогнеш'], acceptableAnswers: [['помогнеш']] },
      { text: 'Може ли да _______ прозореца сега?', blanks: [1], correctAnswers: ['отворя'], options: ['отварям', 'отворя'], acceptableAnswers: [['отворя']] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 17 — Упр. 17 (стр. 54): трансформирайте по модела ──────────────
  {
    id: 'a2-l05-ex-17',
    type: 'workbook_fill_blank',
    instruction: 'Изберете правилната трансформация по модела „Аз отивам на концерт. → Може ли да отида на концерт?"',
    order: 17,
    points: 4,
    layout: 'two-column',
    sentences: [
      { text: 'Аз отивам на концерт. | Може ли да отида на концерт?', blanks: [], correctAnswers: [], isExample: true },
      { text: 'Ние плащаме сметката. | Може ли да _______ сметката?', blanks: [1], correctAnswers: ['платим'], options: ['платят', 'платиш', 'платим'], acceptableAnswers: [['платим']] },
      { text: 'Те идват тук. | Може ли да _______ тук?', blanks: [1], correctAnswers: ['дойдат'], options: ['дойде', 'дойдат', 'дойда'], acceptableAnswers: [['дойдат']] },
      { text: 'Вие купувате шоколадови бонбони. | Може ли да _______ шоколадови бонбони?', blanks: [1], correctAnswers: ['купите'], options: ['купят', 'купим', 'купите'], acceptableAnswers: [['купите']] },
      { text: 'Ти затваряш вратата. | Може ли да _______ вратата?', blanks: [1], correctAnswers: ['затвориш'], options: ['затворим', 'затвори', 'затвориш'], acceptableAnswers: [['затвориш']] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 18 — ДИАЛОЗИ 3 (стр. 54–55): банка, банкомат, обменно бюро ─────
  {
    id: 'a2-l05-dialozi-03',
    type: 'dialogues',
    title: 'ДИАЛОЗИ 3',
    instruction: 'Натиснете всяка реплика, за да чуете произношението. После повторете на глас.',
    order: 18,
    sections: [
      {
        id: 'а.',
        imageUrl: `${ASSET}/04-dialozi-3-banka-obmen/01-v-bankata.jpg`,
        lines: [
          { text: 'Може ли да открия сметка?', voiceGender: 'male' },
          { text: 'Каква сметка?', voiceGender: 'female', ttsText: 'Каква сметка?' },
          { text: 'Лична – за превод на пари от Ирак в България.', voiceGender: 'male' },
        ],
      },
      {
        id: 'б.',
        bubbleSide: 'right',
        lines: [
          { text: 'Искам да внеса пари.', voiceGender: 'female', ttsText: 'Искам да внеса пари.' },
          { text: 'Колко евро?', voiceGender: 'male' },
          { text: '500 евро.', voiceGender: 'female', ttsText: 'Петстотин евро.' },
        ],
      },
      {
        id: 'в.',
        imageUrl: `${ASSET}/04-dialozi-3-banka-obmen/02-bankomat.jpg`,
        lines: [
          { text: 'Искам да тегля пари. Къде има банкомат?', voiceGender: 'male' },
          { text: 'До банката.', voiceGender: 'female' },
        ],
      },
      {
        id: 'г.',
        bubbleSide: 'right',
        imageUrl: `${ASSET}/04-dialozi-3-banka-obmen/03-obmenno-byuro.jpg`,
        lines: [
          { text: 'Добър ден. Може ли да обменя долари и евро?', voiceGender: 'male' },
          { text: 'Да, може.', voiceGender: 'female' },
          { text: 'Какъв е курсът днес?', voiceGender: 'male', ttsText: 'Какъв е курсът днес?' },
          { text: '1,76 лв. за долар и 1,95 лв. за евро.', voiceGender: 'female', ttsText: 'Едно цяло седемдесет и шест лева за долар и едно цяло деветдесет и пет лева за евро.' },
          { text: 'Има ли комисиона?', voiceGender: 'male', ttsText: 'Има ли комисионна?' },
          { text: 'Не, няма.', voiceGender: 'female' },
        ],
      },
    ],
  } as DialoguesExercise,

  // SKIP — Упр. 18 „Прочетете диалозите по двойки" (по желание на клиента)
  // SKIP — Упр. 19 „Работете по двойки" (по желание на клиента)

  // ─── ORDER 19 — Упр. 20 (стр. 55): довършете изреченията ──────────────────
  {
    id: 'a2-l05-ex-20',
    type: 'workbook_fill_blank',
    instruction: 'Изберете правилното попълнение според информацията от диалозите.',
    order: 19,
    points: 4,
    layout: 'single',
    sentences: [
      { text: 'Искам да внеса ________________.', blanks: [1], correctAnswers: ['пари'], options: ['сметка', 'пари', 'трансфер'], acceptableAnswers: [['пари', '500 евро', 'петстотин евро']] },
      { text: 'Може ли да открия ________________?', blanks: [1], correctAnswers: ['сметка'], options: ['пари', 'депозит', 'сметка'], acceptableAnswers: [['сметка', 'лична сметка']] },
      { text: 'Искам трансфер ________________.', blanks: [1], correctAnswers: ['от Ирак в България'], options: ['от България в Ирак', 'от Германия в България', 'от Ирак в България'], acceptableAnswers: [['от Ирак в България', 'от ирак в българия']] },
      { text: 'Може ли да обменя ________________?', blanks: [1], correctAnswers: ['долари и евро'], options: ['лева и евро', 'долари и евро', 'евро и лева'], acceptableAnswers: [['долари и евро', 'долари', 'евро']] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 20 — ГРАМАТИКА 5 (стр. 55): предлог + пълна форма ──────────────
  {
    id: 'a2-l05-gramatika-05',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 5',
    instruction: 'Запознайте се с пълните форми на личните местоимения след предлог.',
    instructionKey: 'a2.gr.l05.mestoimenia',
    order: 20,
    tableTitle: 'Предлог + пълна форма (за, от, с, до, на, ...)',
    columns: ['Пълна форма'],
    rows: [
      { pronoun: 'аз',      cells: ['мене / мен'],  ttsText: 'аз — мене, мен.' },
      { pronoun: 'ти',      cells: ['тебе / теб'],  ttsText: 'ти — тебе, теб.' },
      { pronoun: 'той',     cells: ['него'],         ttsText: 'той — него.' },
      { pronoun: 'тя',      cells: ['нея'],          ttsText: 'тя — нея.' },
      { pronoun: 'то',      cells: ['него'],         ttsText: 'то — него.' },
      { pronoun: 'ние',     cells: ['нас'],          ttsText: 'ние — нас.' },
      { pronoun: 'вие/Вие', cells: ['вас / Вас'],   ttsText: 'вие, Вие — вас, Вас.' },
      { pronoun: 'те',      cells: ['тях'],          ttsText: 'те — тях.' },
    ],
    notes: [
      'Цветето е за теб.',
      'Книгата е от него.',
      'Ще танцуваш ли с мен?',
      'Дана е до мен.',
      'Ще дам адреса на нея, а не на теб.',
    ],
    ttsNotes: [
      'Цветето е за теб.',
      'Книгата е от него.',
      'Ще танцуваш ли със мен?',
      'Дана е до мен.',
      'Ще дам адреса на нея, а не на теб.',
    ],
    ttsNoteModels: ['flash', 'pro', 'pro', 'pro', 'pro'],
  } as GrammarTableExercise,

  // ─── ORDER 21 — Упр. 21 (стр. 55): напишете подходящ предлог ──────────────
  {
    id: 'a2-l05-ex-21',
    type: 'workbook_fill_blank',
    instruction: 'Изберете правилния предлог (за, от, с, до) за всяко изречение според смисъла.',
    order: 21,
    points: 6,
    layout: 'single',
    sentences: [
      { text: 'Ще дойдеш ли с мене на екскурзия?', blanks: [], correctAnswers: [], isExample: true },
      { text: 'Имам подарък _______ тях, защото имат празник.', blanks: [1], correctAnswers: ['за'], options: ['от', 'за', 'с'], acceptableAnswers: [['за']] },
      { text: 'Розата е _______ градината и е подарък _______ тебе.', blanks: [1, 2], correctAnswers: ['от', 'за'], options: [['за', 'от', 'с'], ['за', 'до', 'от']], acceptableAnswers: [['от'], ['за']] },
      { text: 'Децата ще купят цветя _______ нея за рождения ѝ ден.', blanks: [1], correctAnswers: ['за'], options: ['до', 'от', 'за'], acceptableAnswers: [['за']] },
      { text: 'Спирката на автобуса е _______ вас.', blanks: [1], correctAnswers: ['до'], options: ['за', 'до', 'от'], acceptableAnswers: [['до']] },
      { text: 'Имате ли нужда _______ нас?', blanks: [1], correctAnswers: ['от'], options: ['до', 'за', 'от'], acceptableAnswers: [['от']] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 22 — Упр. 22 (стр. 55): форма на местоимението ─────────────────
  {
    id: 'a2-l05-ex-22',
    type: 'workbook_fill_blank',
    instruction: 'Изберете подходящата пълна форма на местоимението по модела.',
    order: 22,
    points: 5,
    layout: 'single',
    sentences: [
      { text: 'Те нямат храна. Сандвичите са за тях.', blanks: [], correctAnswers: [], isExample: true },
      { text: 'Мария е на гости вкъщи. Тези цветя са от _______. (тя)', blanks: [1], correctAnswers: ['нея'], options: ['него', 'тях', 'нея'], acceptableAnswers: [['нея']] },
      { text: 'Аз отивам на разходка. Ще дойдеш ли с _______? (аз)', blanks: [1], correctAnswers: ['мен'], options: ['нас', 'мен', 'тебе'], acceptableAnswers: [['мен', 'мене']] },
      { text: 'Вие сте гладни, нали? Пицата е за _______. (вие)', blanks: [1], correctAnswers: ['вас'], options: ['нас', 'вас', 'тях'], acceptableAnswers: [['вас', 'Вас']] },
      { text: 'Обичам много приятелите си. Не мога да живея без _______. (те)', blanks: [1], correctAnswers: ['тях'], options: ['него', 'нея', 'тях'], acceptableAnswers: [['тях']] },
      { text: 'Ти имаш рожден ден. Тази книга е за _______. (ти)', blanks: [1], correctAnswers: ['тебе'], options: ['мен', 'него', 'тебе'], acceptableAnswers: [['тебе', 'теб']] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 23 — Упр. 23 (стр. 56): Ще обядвам с него (той) ────────────────
  {
    id: 'a2-l05-ex-23',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 23',
    instruction: 'Изберете пълната форма на местоимението в скобите по модела „Ще обядвам с него. (той)".',
    order: 23,
    points: 10,
    layout: 'single',
    images: [{ imageUrl: `${ASSET}/05-upr-23-mestoimenia/01-dve-zheni-razgovor.jpg`, label: '' }],
    sentences: [
      { text: 'Ще обядвам с него. (той)', blanks: [], correctAnswers: [], isExample: true },
      { text: '1. Това кафе за _______ ли е? (ти)',                         blanks: [1], correctAnswers: ['тебе'], options: ['него', 'тебе', 'нея'],    acceptableAnswers: [['тебе', 'теб']] },
      { text: '2. Тя отива на кино с _______. (той)',                       blanks: [1], correctAnswers: ['него'], options: ['нея', 'тях', 'него'],    acceptableAnswers: [['него']] },
      { text: '3. Вие имате имейл от _______. (тя)',                        blanks: [1], correctAnswers: ['нея'], options: ['него', 'нея', 'тях'],    acceptableAnswers: [['нея']] },
      { text: '4. Майка ми е до _______. (аз)',                             blanks: [1], correctAnswers: ['мен'], options: ['мен', 'нас', 'тебе'],   acceptableAnswers: [['мен', 'мене']] },
      { text: '5. Шефът иска да говори с _______ след работа. (ти)',        blanks: [1], correctAnswers: ['тебе'], options: ['него', 'мен', 'тебе'],   acceptableAnswers: [['тебе', 'теб']] },
      { text: '6. Ще вечерям с _______ в един италиански ресторант. (те)',  blanks: [1], correctAnswers: ['тях'], options: ['нас', 'него', 'тях'],    acceptableAnswers: [['тях']] },
      { text: '7. Те ще излязат без _______ тази вечер. (тя)',              blanks: [1], correctAnswers: ['нея'], options: ['него', 'мен', 'нея'],    acceptableAnswers: [['нея']] },
      { text: '8. Работя с _______ от една година. (той)',                  blanks: [1], correctAnswers: ['него'], options: ['нея', 'него', 'тях'],   acceptableAnswers: [['него']] },
      { text: '9. Ние ще дойдем с _______ на разходка. (вие)',              blanks: [1], correctAnswers: ['вас'], options: ['нас', 'тях', 'вас'],    acceptableAnswers: [['вас', 'Вас']] },
      { text: '10. Ще обядвам с _______ в пицарията? (аз)',                 blanks: [1], correctAnswers: ['мен'], options: ['мен', 'тебе', 'нас'],   acceptableAnswers: [['мен', 'мене']] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 24 — НОВИ ДУМИ 2 (стр. 56): фризьорски услуги ──────────────────
  {
    id: 'a2-l05-novi-dumi-02',
    type: 'illustrated_cards',
    title: 'НОВИ ДУМИ 2',
    instruction: 'Запознайте се с новите думи.',
    order: 24,
    cards: [
      { id: 'podstrigvane', imageUrl: `${ASSET}/06-novi-dumi-2-frizyor/01-podstrizvane.jpg`, label: 'подстригване' },
      { id: 'boyadisvane',  imageUrl: `${ASSET}/06-novi-dumi-2-frizyor/02-boyadisvane.jpg`,  label: 'боядисване' },
      { id: 'kadрene',      imageUrl: `${ASSET}/06-novi-dumi-2-frizyor/03-kudrene.jpg`,      label: 'къдрене',     ttsPrompt: 'Bulgarian word. Stress on the first syllable: КЪ-дре-не.' },
      { id: 'seshoar',      imageUrl: `${ASSET}/06-novi-dumi-2-frizyor/04-seshoar.jpg`,      label: 'сешоар',      ttsPrompt: 'Bulgarian word. Stress on the final syllable.' },
    ],
  } as IllustratedCardsExercise,

  // ─── ORDER 25 — ДИАЛОЗИ 4 (стр. 56): фризьорски салон ─────────────────────
  {
    id: 'a2-l05-dialozi-04',
    type: 'dialogues',
    title: 'ДИАЛОЗИ 4',
    instruction: 'Натиснете всяка реплика, за да чуете произношението. После повторете на глас.',
    order: 25,
    sections: [
      {
        id: 'а.',
        lines: [
          { text: 'Добър ден. Искам подстригване, моля.', voiceGender: 'male', ttsText: 'Добър ден. Искам подстригване, моля.' },
          { text: 'Заповядайте. Как искате да Ви подстрижа?', voiceGender: 'female' },
          { text: 'Два сантиметра по-късо.', voiceGender: 'male', ttsText: 'Два сантиметра по-късо.' },
        ],
      },
      {
        id: 'б.',
        bubbleSide: 'right',
        lines: [
          { text: 'О, имаш нова прическа. Честито!', voiceGender: 'female' },
          { text: 'Благодаря. Утре ще ходя на сватба и искам да съм хубава.', voiceGender: 'female' },
        ],
      },
    ],
  } as DialoguesExercise,

  // SKIP — Упр. 24, 25 „Прочетете/Работете по двойки" (по желание на клиента)

  // ─── ORDER 26 — ДИАЛОЗИ 5 (стр. 56): плащане на сметки ────────────────────
  {
    id: 'a2-l05-dialozi-05',
    type: 'dialogues',
    title: 'ДИАЛОЗИ 5',
    instruction: 'Натиснете всяка реплика, за да чуете произношението. После повторете на глас.',
    order: 26,
    sections: [
      {
        id: 'а. Плащане на сметки',
        imageUrl: `${ASSET}/07-dialozi-5-plashtane-smetki/01-easypay-smetki.jpg`,
        lines: [
          { text: 'Добър ден. Искам да платя тока, парното, студената и топлата вода.', voiceGender: 'male' },
          { text: 'Добре. Кажете ми абонатен номер или телефон.', voiceGender: 'female' },
          { text: 'Телефонът ми е 0875-342-918.', voiceGender: 'male', ttsText: 'Телефонът ми е нула, осем, седем, пет, три, четири, две, девет, едно, осем.' },
          { text: 'Али Хабаба?', voiceGender: 'female' },
          { text: 'Да.', voiceGender: 'male' },
        ],
      },
    ],
  } as DialoguesExercise,

  // SKIP — Упр. 26, 27 „Прочетете/Работете по двойки" (по желание на клиента)
  // SKIP — Упр. 28 „Попълнете анкетата" (по желание на клиента)
  // SKIP — Упр. 29 „Работете в група" (по желание на клиента)

  // ─── ORDER 27 — Упр. 30 (стр. 57): слушайте и попълнете ───────────────────
  // TODO: Listening exercise — имплементиран като fill-in-blank.
  // Предложение: нов тип a2-listening-fill (аудио плейър + текст с празни места)
  // ще позволи: audioUrl → аудио горе, после текст с 7 blanks.
  {
    id: 'a2-l05-ex-30',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 30',
    instruction: 'Изберете правилния глагол за всяко изречение.',
    order: 27,
    points: 7,
    layout: 'single',
    // TODO: audioUrl: '' — добавете TTS аудио в Фаза 2
    sentences: [
      { text: 'Днес имам много работа. Първо ще _______ в банката. (аз)', blanks: [1], correctAnswers: ['отида'], options: ['отидем', 'отиде', 'отида'], acceptableAnswers: [['отида']] },
      { text: 'Трябва да _______ пари. (аз)', blanks: [1], correctAnswers: ['изтегля'], options: ['изтегли', 'изтегля', 'изтеглим'], acceptableAnswers: [['изтегля']] },
      { text: 'След това искам да _______ в супермаркета. (аз)', blanks: [1], correctAnswers: ['отида'], options: ['отидат', 'отида', 'отидем'], acceptableAnswers: [['отида']] },
      { text: 'Трябва да _______ мляко, яйца, хляб, месо. (аз)', blanks: [1], correctAnswers: ['купя'], options: ['купи', 'купим', 'купя'], acceptableAnswers: [['купя']] },
      { text: 'Мога да _______ също и плодове. (аз)', blanks: [1], correctAnswers: ['взема'], options: ['вземе', 'взема', 'вземат'], acceptableAnswers: [['взема']] },
      { text: 'После искам да _______ тока и парното. (аз)', blanks: [1], correctAnswers: ['платя'], options: ['плати', 'платя', 'платим'], acceptableAnswers: [['платя']] },
      { text: 'Накрая ще се _______ вкъщи – спокойна, но без пари. (аз)', blanks: [1], correctAnswers: ['върна'], options: ['върне', 'върнем', 'върна'], acceptableAnswers: [['върна']] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 28 — ТЕКСТОВЕ Упр. 31 (стр. 58): Васил и Снежана ───────────────
  {
    id: 'a2-l05-tekst-vasil-snezhana',
    type: 'reading_text',
    title: 'ТЕКСТОВЕ',
    textTitle: 'Васил и Снежана',
    instruction: 'Изслушайте текста и след това го прочетете сами.',
    order: 28,
    showDictionary: true,
    images: [
      { imageUrl: `${ASSET}/10-tekstove-vasil-snezhana/01-frizyor-salon.jpg`, label: 'Фризьорски салон' },
    ],
    paragraphs: [
      'Васил и Снежана са младо семейство. Имат две деца. Васил работи в банка. Винаги има много клиенти – от България и от чужбина. Те внасят пари, правят трансфери от други страни в България и обменят валута.',
      'Снежана има малък, но хубав фризьорски салон. Тя може да прави всичко – подстригване, боядисване, къдрене. В салона идват много хора – млади и стари. Всички искат да имат хубави прически.',
      'След работа Васил и Снежана трябва да правят още много неща. Васил пазарува, а Снежана готви и помага на децата за училище. В началото на всеки месец Васил плаща сметките за ток, вода, парно, интернет, телефон и кабелна телевизия.',
      'През уикенда обичат да пътуват в България и в чужбина. Правят резервации по интернет в малки хотели. Посещават интересни места. Връщат се вкъщи доволни и щастливи.',
    ],
    ttsParagraphs: [
      'Васил и Снежана са младо семейство. Имат две деца. Васил работи в банка. Винаги има много клиенти от България и от чужбина. Те внасят пари, правят трансфери от други страни в България и обменят валута.',
      'Снежана има малък, но хубав фризьорски салон. Тя може да прави всичко — подстригване, боядисване, къдрене. В салона идват много хора — млади и стари. Всички искат да имат хубави прически.',
      'След работа Васил и Снежана трябва да правят още много неща. Васил пазарува, а Снежана готви и помага на децата за училище. В началото на всеки месец Васил плаща сметките за ток, вода, парно, интернет, телефон и кабелна телевизия.',
      'През уикенда обичат да пътуват в България и в чужбина. Правят резервации по интернет в малки хотели. Посещават интересни места. Връщат се вкъщи доволни и щастливи.',
    ],
    paragraphVoiceGenders: ['female', 'female', 'female', 'female'],
  } as ReadingTextExercise,

  // ─── ORDER 29 — Упр. 32 (стр. 58): вярно или грешно? ─────────────────────
  {
    id: 'a2-l05-ex-32',
    type: 'true_false',
    instruction: 'Прочетете текста и определете дали твърденията са верни (✓) или неверни (✗).',
    order: 29,
    points: 10,
    sentences: [
      { id: 's01', text: 'Васил и Снежана са младо семейство.',           isTrue: true  },
      { id: 's02', text: 'Те имат три деца.',                               isTrue: false },
      { id: 's03', text: 'Васил има много клиенти в банката.',              isTrue: true  },
      { id: 's04', text: 'Васил работи в обменно бюро.',                   isTrue: false },
      { id: 's05', text: 'Снежана може да прави подстригване и боядисване.', isTrue: true  },
      { id: 's06', text: 'В салона идват само млади хора.',                 isTrue: false },
      { id: 's07', text: 'Снежана плаща сметките всеки месец.',            isTrue: false },
      { id: 's08', text: 'Васил пазарува след работа.',                    isTrue: true  },
      { id: 's09', text: 'Снежана готви и помага на децата.',              isTrue: true  },
      { id: 's10', text: 'През уикенда обичат да спят вкъщи.',             isTrue: false },
    ],
  } as TrueFalseExercise,

  // SKIP — Упр. 33 „Задайте въпроси към текста" (по желание на клиента)

  // ─── ORDER 30 — ПРАКТИЧЕСКИ ЗАДАЧИ Упр. 34 (стр. 59): Касим ───────────────
  {
    id: 'a2-l05-tekst-kasim',
    type: 'reading_text',
    title: 'ПРАКТИЧЕСКИ ЗАДАЧИ',
    textTitle: 'Касим търси апартамент',
    instruction: 'Изслушайте текста и след това го прочетете сами.',
    order: 30,
    showDictionary: true,
    images: [
      { imageUrl: `${ASSET}/11-prakticheski-upr-34-naem/01-kasim-hazyain.jpg`, label: 'Касим и хазяинът' },
    ],
    paragraphs: [
      'Касим и семейството му са в България от една година. Живеят на квартира, но тя е малка за тях, защото имат две деца. Трябва им по-голямо жилище. Касим намира в интернет обява за двустаен апартамент под наем. Обажда се по телефона и на следващия ден отива да види апартамента и да говори с хазяина.',
      'Хазяин: – Добър ден. Ето апартамента. Вдясно е кухнята, вляво е холът, до него е банята, срещу нея е спалнята.\nКасим: – Има ли парно?\nХазяин: – Да, има парно и топла вода.\nКасим: – Има ли интернет?\nХазяин: – Да, има. Таксата е 30 евро на месец.\nКасим: – Добре. Няма проблем. Апартаментът е хубав. Колко е наемът?\nХазяин: – 800 евро на месец с един наем предплата.',
    ],
    ttsParagraphs: [
      'Касим и семейството му са в България от една година. Живеят на квартира, но тя е малка за тях, защото имат две деца. Трябва им по-голямо жилище. Касим намира в интернет обява за двустаен апартамент под наем. Обажда се по телефона и на следващия ден отива да види апартамента и да говори с хазяина.',
      'Добър ден. Ето апартамента. Вдясно е кухнята, вляво е холът, до него е банята, срещу нея е спалнята. Има ли парно? Да, има парно и топла вода. Има ли интернет? Да, има. Таксата е тридесет евро на месец. Добре. Няма проблем. Апартаментът е хубав. Колко е наемът? Осемстотин евро на месец с един наем предплата.',
    ],
    paragraphVoiceGenders: ['male', 'male'],
  } as ReadingTextExercise,

  // ─── ORDER 31 — Упр. 35 (стр. 59): отговорете на въпросите ────────────────
  {
    id: 'a2-l05-ex-35',
    type: 'dropdown_match',
    title: 'УПРАЖНЕНИЕ 35',
    instruction: 'Изберете правилния отговор на въпросите за текста.',
    order: 31,
    points: 8,
    questions: [
      { id: 'q1', left: '1. От колко време Касим и семейството му са в България?',    options: ['От една година', 'От две години', 'От шест месеца', 'От три години'], correctAnswer: 'От една година' },
      { id: 'q2', left: '2. Защо искат по-голямо жилище?',                            options: ['Защото имат две деца', 'Защото е скъпо', 'Защото е далеч', 'Защото нямат работа'], correctAnswer: 'Защото имат две деца' },
      { id: 'q3', left: '3. Откъде Касим намери обявата за апартамента?',             options: ['От интернет', 'От вестника', 'От приятел', 'От хазяина'], correctAnswer: 'От интернет' },
      { id: 'q4', left: '4. Какви стаи има в апартамента?',                           options: ['Кухня, хол, баня и спалня', 'Само хол и спалня', 'Три спални и баня', 'Хол, кухня и две спални'], correctAnswer: 'Кухня, хол, баня и спалня' },
      { id: 'q5', left: '5. Има ли парно и топла вода?',                              options: ['Да, има', 'Не, няма', 'Само парно', 'Само топла вода'], correctAnswer: 'Да, има' },
      { id: 'q6', left: '6. Колко е таксата за интернет?',                            options: ['30 евро на месец', '50 евро на месец', '15 евро на месец', '100 евро на месец'], correctAnswer: '30 евро на месец' },
      { id: 'q7', left: '7. Касим харесва ли апартамента?',                          options: ['Да, апартаментът е хубав', 'Не, малък е', 'Не знае', 'Не, скъп е'], correctAnswer: 'Да, апартаментът е хубав' },
      { id: 'q8', left: '8. Колко е наемът на месец?',                               options: ['800 евро с предплата', '500 евро', '300 евро', '1000 евро'], correctAnswer: '800 евро с предплата' },
    ],
  } as DropdownMatchExercise,

  // SKIP — Упр. 36 „Нарисувайте схема на апартамента" (по желание на клиента)

];

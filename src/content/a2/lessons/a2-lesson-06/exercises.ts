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
  WordOrderExercise,
  TableFillExercise,
} from '@/content/types';

// ⚠️ Order follows the A2 textbook „Честит празник!" (стр. 60–70).
// Пропуснати по желание на клиента: упр. 2, 3, 12, 18, 19, 20, 21, 30, 37.

const ASSET = '/assets/a2-lesson-06';

export const exercises: Exercise[] = [

  // ─── ORDER 1 — Упр. 1 (стр. 60): поздрави под картинките ──────────────────
  {
    id: 'a2-l06-ex-01',
    type: 'image_labeling',
    title: 'УПРАЖНЕНИЕ 1',
    instruction: 'Изберете подходящия поздрав под всяка картинка.',
    order: 1,
    sectionStart: {
      title: 'Поздрави и именни дни',
      subtitle: 'Поздрави за празници, рожден ден и именни дни в България',
      titleI18n: {
        en: 'Greetings and name days',
        fr: 'Souhaits et fêtes du prénom',
        ar: 'التهاني وأعياد الاسم',
        fa: 'تبریک‌ها و روزهای نام',
        uk: 'Привітання та іменини',
        ru: 'Поздравления и именины',
      },
      subtitleI18n: {
        en: 'Holiday greetings, birthdays and name days in Bulgaria',
        fr: 'Souhaits de fêtes, anniversaires et fêtes du prénom en Bulgarie',
        ar: 'تهاني الأعياد وأعياد الميلاد وأعياد الاسم في بلغاريا',
        fa: 'تبریک جشن‌ها، تولد و روز نام در بلغارستان',
        uk: 'Святкові привітання, дні народження та іменини в Болгарії',
        ru: 'Праздничные поздравления, дни рождения и именины в Болгарии',
      },
      theme: 'vocabulary',
    },
    points: 6,
    displayType: 'default',
    columns: 3,
    images: [
      { id: 'torta',        imageUrl: `${ASSET}/01-upr-01-pozdravi-praznitsi/01-torta.jpg`,         correctLabel: 'Честит рожден ден!',    imageOptions: ['Честит рожден ден!', 'Честит Рамазан Байрам!', 'Честита Нова година!', 'Честита Баба Марта!'] },
      { id: 'sladki',       imageUrl: `${ASSET}/01-upr-01-pozdravi-praznitsi/02-sladki.jpg`,        correctLabel: 'Честит Рамазан Байрам!', imageOptions: ['Честит рожден ден!', 'Честит Рамазан Байрам!', 'Честита Коледа!', 'Честит Великден!'] },
      { id: 'shampansko',   imageUrl: `${ASSET}/01-upr-01-pozdravi-praznitsi/03-shampansko.jpg`,    correctLabel: 'Честита Нова година!',  imageOptions: ['Честита Нова година!', 'Честит рожден ден!', 'Честита Коледа!', 'Честита Баба Марта!'] },
      { id: 'koleda',       imageUrl: `${ASSET}/01-upr-01-pozdravi-praznitsi/04-koledna-elha.jpg`,  correctLabel: 'Честита Коледа!',       imageOptions: ['Честита Коледа!', 'Честита Нова година!', 'Честит Великден!', 'Честита Баба Марта!'] },
      { id: 'velikden',     imageUrl: `${ASSET}/01-upr-01-pozdravi-praznitsi/05-yaytsa-velikden.jpg`, correctLabel: 'Честит Великден!',   imageOptions: ['Честит Великден!', 'Честита Коледа!', 'Честит рожден ден!', 'Честита Баба Марта!'] },
      { id: 'martenitsa',   imageUrl: `${ASSET}/01-upr-01-pozdravi-praznitsi/06-martenitsa.jpg`,    correctLabel: 'Честита Баба Марта!',   imageOptions: ['Честита Баба Марта!', 'Честита Нова година!', 'Честит Великден!', 'Честит рожден ден!'] },
    ],
    options: [
      'Честит рожден ден!',
      'Честит Рамазан Байрам!',
      'Честита Нова година!',
      'Честита Коледа!',
      'Честит Великден!',
      'Честита Баба Марта!',
    ],
  } as ImageLabelingExercise,

  // ─── ORDER 2 — ДИАЛОЗИ 1 (стр. 60): Рожден ден и Имен ден ─────────────────
  {
    id: 'a2-l06-dialozi-01',
    type: 'dialogues',
    title: 'ДИАЛОЗИ 1',
    instruction: 'Натиснете всяка реплика, за да чуете произношението. После повторете на глас.',
    order: 2,
    sections: [
      {
        id: 'а. Рожден ден',
        lines: [
          { text: '– Ало, Ани. Честит рожден ден! Да си жива и здрава! Желая ти много щастие.', voiceGender: 'male' },
          { text: '– Благодаря! Каня те довечера на гости. Ще има торта и хубава музика.', voiceGender: 'female' },
        ],
      },
      {
        id: 'б. Имен ден',
        imageUrl: `${ASSET}/02-dialozi-1-imenni-den/01-chestit-imenni-den.jpg`,
        lines: [
          { text: '– Здравей, Андрей. Къде беше снощи?', voiceGender: 'male' },
          { text: '– Добър ден, Али. Бях на имен ден на братовчед ми. Той се казва Димитър. Вчера беше Димитровден.', voiceGender: 'female' },
          { text: '– Беше ли интересно?', voiceGender: 'male' },
          { text: '– Да, беше хубаво. Всички бяхме много доволни.', voiceGender: 'female' },
          { text: '– Всички българи ли имат имен ден?', voiceGender: 'male' },
          { text: '– Не, не всички, но много от нас имат. Ние обичаме тези дни. Идват много гости, носят цветя и е весело.', voiceGender: 'female' },
        ],
      },
    ],
  } as DialoguesExercise,

  // ─── ORDER 3 — Именни дни в България (стр. 60): справочна таблица ──────────
  {
    id: 'a2-l06-imenni-dni',
    type: 'grammar_table',
    title: 'ИМЕННИ ДНИ В БЪЛГАРИЯ',
    instruction: 'Запознайте се с именните дни и датите в България.',
    order: 3,
    tableTitle: 'Именни дни в България',
    columns: ['Имен ден на:'],
    rows: [
      { pronoun: 'Йордановден (6 януари)',    cells: ['Йордан, Йорданка'],          ttsText: 'Йордановден, шести януари. Йордан, Йорданка.' },
      { pronoun: 'Ивановден (7 януари)',       cells: ['Иван, Иванка'],              ttsText: 'Ивановден, седми януари. Иван, Иванка.', ttsModel: 'pro', ttsPrompt: 'Bulgarian. The word Ivanovden: stress on the second syllable — i-VA-nov-den.' },
      { pronoun: 'Антоновден (17 януари)',     cells: ['Антон, Антоанета'],          ttsText: 'Антоновден, седемнайсти януари. Антон, Антоанета.' },
      { pronoun: 'Атанасовден (18 януари)',    cells: ['Атанас, Атанаска'],          ttsText: 'Атанасовден, осемнайсти януари. Атанас, Атанаска.' },
      { pronoun: 'Цветница (м. март / м. април)', cells: ['всички с имена на цветя'], ttsText: 'Цветница, през март или април. Всички с имена на цветя.', ttsModel: 'pro', ttsPrompt: 'Bulgarian. The word Цветница: stress on the first syllable — TSVET-ni-tsa, never tsvet-NI-tsa.' },
      { pronoun: 'Гергьовден (6 май)',         cells: ['Георги, Гергана'],           ttsText: 'Гергьовден, шести май. Георги, Гергана.' },
      { pronoun: 'Петровден (29 юни)',         cells: ['Петър, Петра'],              ttsText: 'Петровден, двадесет и девети юни. Петър, Петра.', ttsModel: 'pro', ttsPrompt: 'Bulgarian. The word Petrovden: stress on the second syllable — pet-RO-vden.' },
      { pronoun: 'Петковден (14 октомври)',    cells: ['Петко, Петя'],               ttsText: 'Петковден, четринайсти октомври. Петко, Петя.' },
      { pronoun: 'Димитровден (26 октомври)',  cells: ['Димитър, Димитрина'],        ttsText: 'Димитровден, двадесет и шести октомври. Димитър, Димитрина.' },
      { pronoun: 'Никулден (6 декември)',      cells: ['Николай, Николина'],         ttsText: 'Никулден, шести декември. Николай, Николина.' },
    ],
    ttsNoteModels: [],
  } as GrammarTableExercise,

  // SKIP — Упр. 2 „Намерете някой, който…" — по желание на клиента
  // SKIP — Упр. 3 „Кога са именните дни?" — по желание на клиента

  // ─── ORDER 4 — Упр. 4 (стр. 61): отговорете по модела ─────────────────────
  {
    id: 'a2-l06-ex-04',
    type: 'dropdown_match',
    title: 'УПРАЖНЕНИЕ 4',
    instruction: 'Отговорете на въпросите по модела. Използвайте таблицата с именните дни.',
    order: 4,
    points: 7,
    questions: [
      { id: 'model', left: 'Кога има имен ден Иван? Иван има имен ден на …', options: [], correctAnswer: '7 януари.', isExample: true },
      { id: 'q1', left: 'Кога има имен ден Димитър? Димитър има имен ден на …', options: ['26 октомври.', '29 юни.', '6 май.', '6 декември.'],   correctAnswer: '26 октомври.' },
      { id: 'q2', left: 'Кога има имен ден Петър? Петър има имен ден на …',     options: ['29 юни.', '14 октомври.', '26 октомври.', '6 май.'],   correctAnswer: '29 юни.' },
      { id: 'q3', left: 'Кога има имен ден Георги? Георги има имен ден на …',   options: ['6 май.', '29 юни.', '17 януари.', '6 декември.'],       correctAnswer: '6 май.' },
      { id: 'q4', left: 'Кога има имен ден Йордан? Йордан има имен ден на …',   options: ['6 януари.', '7 януари.', '17 януари.', '18 януари.'],   correctAnswer: '6 януари.' },
      { id: 'q5', left: 'Кога има имен ден Атанас? Атанас има имен ден на …',   options: ['18 януари.', '17 януари.', '6 януари.', '7 януари.'],   correctAnswer: '18 януари.' },
      { id: 'q6', left: 'Кога има имен ден Антон? Антон има имен ден на …',     options: ['17 януари.', '18 януари.', '26 октомври.', '6 декември.'], correctAnswer: '17 януари.' },
      { id: 'q7', left: 'Кога има имен ден Николай? Николай има имен ден на …', options: ['6 декември.', '26 октомври.', '14 октомври.', '6 май.'], correctAnswer: '6 декември.' },
    ],
  } as DropdownMatchExercise,

  // ─── ORDER 5 — ГРАМАТИКА 1 (стр. 61): минало на съм ────────────────────────
  {
    id: 'a2-l06-gramatika-01',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 1',
    instruction: 'Запознайте се с формите на глагола съм в минало свършено.',
    instructionKey: 'a2.gr.l06.minaloSum',
    order: 5,
    sectionStart: {
      title: 'Минало свършено на „съм", АХ група и „имам"',
      subtitle: 'Форми на „съм", глаголи от АХ група, времеви изрази и „имам" / „имаше"',
      titleI18n: {
        en: 'The aorist of "съм" (to be), the АХ group and "имам" (to have)',
        fr: 'L\'aoriste de «съм» (être), le groupe АХ et «имам» (avoir)',
        ar: 'الماضي التام لـ «съм» (يكون) ومجموعة АХ و«имам» (يملك)',
        fa: 'گذشته کامل «съм» (بودن)، گروه АХ و «имам» (داشتن)',
        uk: 'Минулий доконаний час «съм» (бути), група АХ і «имам» (мати)',
        ru: 'Прошедшее совершенное «съм» (быть), группа АХ и «имам» (иметь)',
      },
      subtitleI18n: {
        en: 'Forms of "съм" (to be), АХ-group verbs, time expressions, and "имам" / "имаше" (have / had)',
        fr: 'Formes de «съм» (être), verbes du groupe АХ, expressions de temps et «имам» / «имаше» (avoir / avait)',
        ar: 'صيغ «съм» (يكون) وأفعال مجموعة АХ وتعبيرات الزمن و«имам» / «имаше» (يوجد / كان يوجد)',
        fa: 'شکل‌های «съм» (بودن)، فعل‌های گروه АХ، عبارت‌های زمانی و «имам» / «имаше» (هست / بود)',
        uk: 'Форми «съм» (бути), дієслова групи АХ, часові вирази та «имам» / «имаше» (є / було)',
        ru: 'Формы «съм» (быть), глаголы группы АХ, выражения времени и «имам» / «имаше» (есть / было)',
      },
      theme: 'grammar',
    },
    tableTitle: 'Минало свършено на глагола съм',
    columns: ['(+)', '(−)', '(?)'],
    rows: [
      { pronoun: 'аз',        cells: ['бях',    'не бях',    'бях ли?'],    ttsText: 'аз. Бях. Не бях. Бях ли?' },
      { pronoun: 'ти',        cells: ['беше',   'не беше',   'беше ли?'],   ttsText: 'ти. Беше. Не беше. Беше ли?' },
      { pronoun: 'той/тя/то', cells: ['беше',   'не беше',   'беше ли?'],   ttsText: 'той, тя, то. Беше. Не беше. Беше ли?' },
      { pronoun: 'ние',       cells: ['бяхме',  'не бяхме',  'бяхме ли?'],  ttsText: 'ние. Бяхме. Не бяхме. Бяхме ли?' },
      { pronoun: 'Вие',       cells: ['бяхте',  'не бяхте',  'бяхте ли?'],  ttsText: 'Вие. Бяхте. Не бяхте. Бяхте ли?' },
      { pronoun: 'те',        cells: ['бяха',   'не бяха',   'бяха ли?'],   ttsText: 'те. Бяха. Не бяха. Бяха ли?' },
    ],
    notes: [
      'Вчера беше понеделник. Днес е вторник.',
      'снощи = вчера вечерта',
    ],
    ttsNotes: [
      'Вчера беше понеделник. Днес е вторник.',
      'Снощи е равно на вчера вечерта.',
    ],
    ttsNoteModels: ['pro', 'pro'],
  } as GrammarTableExercise,

  // ─── ORDER 6 — Упр. 5 (стр. 61): намерете формите на съм ──────────────────
  // TODO: Оригиналното упражнение е „Подчертайте формите на глагола съм в минало в диалог б".
  // Апроксимирано като workbook_fill_blank. Предложение: бъдещ тип a2-find-in-text.
  {
    id: 'a2-l06-ex-05',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 5',
    instruction: 'Изберете правилната форма на глагола **съм** в минало свършено от диалог б.',
    order: 6,
    points: 5,
    layout: 'single',
    sentences: [
      { text: 'Снощи аз **бях** вкъщи.', blanks: [], correctAnswers: [], isExample: true },
      { text: '– Добър ден, Али. _____ на имен ден на братовчед ми.',          blanks: [1], correctAnswers: ['Бях'],   options: ['Бях', 'Беше', 'Бяхме'],  acceptableAnswers: [['Бях', 'бях']] },
      { text: 'Вчера _____ Димитровден.',                                       blanks: [1], correctAnswers: ['беше'], options: ['бях', 'беше', 'бяхме'],  acceptableAnswers: [['беше']] },
      { text: '– _____ ли интересно?',                                          blanks: [1], correctAnswers: ['Беше'], options: ['Бях', 'Беше', 'Бяхме'],  acceptableAnswers: [['Беше', 'беше']] },
      { text: '– Да, _____ хубаво.',                                            blanks: [1], correctAnswers: ['беше'], options: ['бях', 'беше', 'бяха'],   acceptableAnswers: [['беше']] },
      { text: 'Всички _____ много доволни.',                                    blanks: [1], correctAnswers: ['бяхме'], options: ['бяха', 'бяхте', 'бяхме'], acceptableAnswers: [['бяхме']] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 7 — Упр. 6 (стр. 61): форми на съм ─────────────────────────────
  {
    id: 'a2-l06-ex-06',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 6',
    instruction: 'Изберете правилната форма на глагола **съм** в минало свършено по модела.',
    order: 7,
    points: 6,
    layout: 'single',
    sentences: [
      { text: 'Аз **бях** в парка.',            blanks: [], correctAnswers: [], isExample: true },
      { text: 'Той _____ на театър.',            blanks: [1], correctAnswers: ['беше'],  options: ['бях', 'беше', 'бяхме'],  acceptableAnswers: [['беше']] },
      { text: 'Ти _____ на разходка.',           blanks: [1], correctAnswers: ['беше'],  options: ['бях', 'беше', 'бяхте'],  acceptableAnswers: [['беше']] },
      { text: 'Тя _____ на гости.',              blanks: [1], correctAnswers: ['беше'],  options: ['бях', 'беше', 'бяха'],   acceptableAnswers: [['беше']] },
      { text: 'Ние _____ на концерт.',           blanks: [1], correctAnswers: ['бяхме'], options: ['бяхме', 'бяхте', 'бяха'], acceptableAnswers: [['бяхме']] },
      { text: 'Те _____ на кино.',               blanks: [1], correctAnswers: ['бяха'],  options: ['бяхме', 'бяхте', 'бяха'], acceptableAnswers: [['бяха']] },
      { text: 'Вие _____ на планина.',           blanks: [1], correctAnswers: ['бяхте'], options: ['бяхме', 'бяхте', 'бяха'], acceptableAnswers: [['бяхте']] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 8 — ГРАМАТИКА 2 (стр. 61): АХ група ─────────────────────────────
  {
    id: 'a2-l06-gramatika-02',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 2',
    instruction: 'Запознайте се с минало свършено на глаголите от АХ група.',
    instructionKey: 'a2.gr.l06.ahGrupa',
    order: 8,
    tableTitle: 'Минало свършено — АХ група (обядвам → обядвах)',
    columns: ['(+)', '(−)', '(?)'],
    rows: [
      { pronoun: 'аз',        cells: ['обядвах',   'не обядвах',   'обядвах ли?'],   ttsText: 'аз. Обядвах. Не обядвах. Обядвах ли?' },
      { pronoun: 'ти',        cells: ['обядва',    'не обядва',    'обядва ли?'],    ttsText: 'ти. Обядва. Не обядва. Обядва ли?' },
      { pronoun: 'той/тя/то', cells: ['обядва',    'не обядва',    'обядва ли?'],    ttsText: 'той, тя, то. Обядва. Не обядва. Обядва ли?' },
      { pronoun: 'ние',       cells: ['обядвахме', 'не обядвахме', 'обядвахме ли?'], ttsText: 'ние. Обядвахме. Не обядвахме. Обядвахме ли?' },
      { pronoun: 'Вие',       cells: ['обядвахте', 'не обядвахте', 'обядвахте ли?'], ttsText: 'Вие. Обядвахте. Не обядвахте. Обядвахте ли?' },
      { pronoun: 'те',        cells: ['обядваха',  'не обядваха',  'обядваха ли?'],  ttsText: 'те. Обядваха. Не обядваха. Обядваха ли?' },
    ],
    notes: [
      'Глаголи от АХ група: гледах, пазарувах, питах, пътувах, слушах, танцувах, тичах, чаках',
      '⚠️ Внимание: пиша → **писах** (не пишах); играя → **играх** (не играях)',
      'Аз не обядвах. / Ти обядва ли?',
    ],
    ttsNotes: [
      'Глаголи от ах група: гледах, пазарувах, питах, пътувах, слушах, танцувах, тичах, чаках',
      'Внимание. Пиша, писах, не пишах. Играя, играх, не играях.',
      'Аз не обядвах. Ти обядва ли?',
    ],
    ttsNoteModels: ['pro', 'pro', 'pro'],
  } as GrammarTableExercise,

  // ─── ORDER 9 — Упр. 7 (стр. 62): глаголи в 1 л. ед.ч. минало ──────────────
  {
    id: 'a2-l06-ex-07',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 7',
    instruction: 'Изберете глаголите в 1 л. ед.ч. минало свършено по модела.',
    order: 9,
    points: 10,
    layout: 'two-column',
    sentences: [
      { text: 'играя → **играх**',        blanks: [], correctAnswers: [], isExample: true },
      { text: 'тичам → _____',            blanks: [1], correctAnswers: ['тичах'],     options: ['тичах', 'тичаше', 'тичахме'],    acceptableAnswers: [['тичах']] },
      { text: 'чакам → _____',            blanks: [1], correctAnswers: ['чаках'],     options: ['чаках', 'чакаше', 'чакахме'],    acceptableAnswers: [['чаках']] },
      { text: 'пиша → _____',             blanks: [1], correctAnswers: ['писах'],     options: ['писах', 'пиших', 'пишах'],       acceptableAnswers: [['писах']] },
      { text: 'гледам → _____',           blanks: [1], correctAnswers: ['гледах'],    options: ['гледах', 'гледаше', 'гледахме'], acceptableAnswers: [['гледах']] },
      { text: 'питам → _____',            blanks: [1], correctAnswers: ['питах'],     options: ['питах', 'питаше', 'питахме'],    acceptableAnswers: [['питах']] },
      { text: 'пазарувам → _____',        blanks: [1], correctAnswers: ['пазарувах'], options: ['пазарувах', 'пазаруваше', 'пазарувахме'], acceptableAnswers: [['пазарувах']] },
      { text: 'обядвам → _____',          blanks: [1], correctAnswers: ['обядвах'],   options: ['обядвах', 'обядваше', 'обядвахме'], acceptableAnswers: [['обядвах']] },
      { text: 'пътувам → _____',          blanks: [1], correctAnswers: ['пътувах'],   options: ['пътувах', 'пътуваше', 'пътувахме'], acceptableAnswers: [['пътувах']] },
      { text: 'танцувам → _____',         blanks: [1], correctAnswers: ['танцувах'],  options: ['танцувах', 'танцуваше', 'танцувахме'], acceptableAnswers: [['танцувах']] },
      { text: 'слушам → _____',           blanks: [1], correctAnswers: ['слушах'],    options: ['слушах', 'слушаше', 'слушахме'],  acceptableAnswers: [['слушах']] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 10 — Упр. 8 (стр. 62): попълнете таблицата ─────────────────────
  {
    id: 'a2-l06-ex-08',
    type: 'table_fill',
    title: 'УПРАЖНЕНИЕ 8',
    instruction: 'Попълнете таблицата с правилните форми в минало свършено.',
    order: 10,
    points: 9,
    tables: [
      {
        name: 'Минало свършено — АХ група',
        columns: ['аз', 'ти', 'той/тя/то', 'ние', 'Вие', 'те'],
        rows: [
          { label: 'обядвам', cells: [{ correctAnswers: ['обядвах'],   options: ['обядвах']   }, { correctAnswers: ['обядва'],    options: ['обядва', 'обядвах', 'обядваха']    }, { correctAnswers: ['обядва'],    options: ['обядва', 'обядвах', 'обядваха']    }, { correctAnswers: ['обядвахме'], options: ['обядвахме', 'обядвахте', 'обядваха'] }, { correctAnswers: ['обядвахте'], options: ['обядвахте', 'обядвахме', 'обядваха'] }, { correctAnswers: ['обядваха'],  options: ['обядваха', 'обядвахме', 'обядвахте'] }] },
          { label: 'гледам',  cells: [{ correctAnswers: ['гледах'],    options: ['гледах', 'гледа', 'гледахме']    }, { correctAnswers: ['гледа'],    options: ['гледа']    }, { correctAnswers: ['гледа'],    options: ['гледа', 'гледах', 'гледаха']    }, { correctAnswers: ['гледахме'],  options: ['гледахме', 'гледахте', 'гледаха']   }, { correctAnswers: ['гледахте'],  options: ['гледахте', 'гледахме', 'гледаха']  }, { correctAnswers: ['гледаха'],   options: ['гледаха', 'гледахме', 'гледахте']  }] },
          { label: 'пътувам', cells: [{ correctAnswers: ['пътувах'],   options: ['пътувах', 'пътува', 'пътувахме'] }, { correctAnswers: ['пътува'],   options: ['пътува', 'пътувах', 'пътуваха']   }, { correctAnswers: ['пътува'],   options: ['пътува']   }, { correctAnswers: ['пътувахме'], options: ['пътувахме', 'пътувахте', 'пътуваха'] }, { correctAnswers: ['пътувахте'], options: ['пътувахте', 'пътувахме', 'пътуваха'] }, { correctAnswers: ['пътуваха'],  options: ['пътуваха', 'пътувахме', 'пътувахте'] }] },
          { label: 'тичам',   cells: [{ correctAnswers: ['тичах'],    options: ['тичах', 'тича', 'тичахме']    }, { correctAnswers: ['тича'],    options: ['тича', 'тичах', 'тичаха']    }, { correctAnswers: ['тича'],    options: ['тича', 'тичах', 'тичаха']    }, { correctAnswers: ['тичахме'],  options: ['тичахме']  }, { correctAnswers: ['тичахте'],  options: ['тичахте', 'тичахме', 'тичаха']  }, { correctAnswers: ['тичаха'],   options: ['тичаха', 'тичахме', 'тичахте']  }] },
          { label: 'питам',   cells: [{ correctAnswers: ['питах'],    options: ['питах', 'пита', 'питахме']    }, { correctAnswers: ['пита'],    options: ['пита', 'питах', 'питаха']    }, { correctAnswers: ['пита'],    options: ['пита', 'питах', 'питаха']    }, { correctAnswers: ['питахме'],  options: ['питахме', 'питахте', 'питаха']  }, { correctAnswers: ['питахте'],  options: ['питахте']  }, { correctAnswers: ['питаха'],   options: ['питаха', 'питахме', 'питахте']  }] },
          { label: 'чакам',   cells: [{ correctAnswers: ['чаках'],    options: ['чаках']    }, { correctAnswers: ['чака'],    options: ['чака', 'чаках', 'чакаха']    }, { correctAnswers: ['чака'],    options: ['чака', 'чаках', 'чакаха']    }, { correctAnswers: ['чакахме'],  options: ['чакахме', 'чакахте', 'чакаха']  }, { correctAnswers: ['чакахте'],  options: ['чакахте', 'чакахме', 'чакаха']  }, { correctAnswers: ['чакаха'],   options: ['чакаха', 'чакахме', 'чакахте']  }] },
          { label: 'играя',   cells: [{ correctAnswers: ['играх'],    options: ['играх', 'игра', 'играхме']    }, { correctAnswers: ['игра'],    options: ['игра']    }, { correctAnswers: ['игра'],    options: ['игра', 'играх', 'играха']    }, { correctAnswers: ['играхме'],  options: ['играхме', 'играхте', 'играха']  }, { correctAnswers: ['играхте'],  options: ['играхте', 'играхме', 'играха']  }, { correctAnswers: ['играха'],   options: ['играха', 'играхме', 'играхте']  }] },
          { label: 'пиша',    cells: [{ correctAnswers: ['писах'],    options: ['писах', 'писа', 'писахме']    }, { correctAnswers: ['писа'],    options: ['писа', 'писах', 'писаха']    }, { correctAnswers: ['писа'],    options: ['писа']    }, { correctAnswers: ['писахме'],  options: ['писахме', 'писахте', 'писаха']  }, { correctAnswers: ['писахте'],  options: ['писахте', 'писахме', 'писаха']  }, { correctAnswers: ['писаха'],   options: ['писаха', 'писахме', 'писахте']  }] },
          { label: 'танцувам', cells: [{ correctAnswers: ['танцувах'],  options: ['танцувах', 'танцува', 'танцувахме'] }, { correctAnswers: ['танцува'],  options: ['танцува', 'танцувах', 'танцуваха']  }, { correctAnswers: ['танцува'],  options: ['танцува', 'танцувах', 'танцуваха']  }, { correctAnswers: ['танцувахме'], options: ['танцувахме', 'танцувахте', 'танцуваха'] }, { correctAnswers: ['танцувахте'], options: ['танцувахте', 'танцувахме', 'танцуваха'] }, { correctAnswers: ['танцуваха'], options: ['танцуваха'] }] },
        ],
      },
    ],
  } as TableFillExercise,

  // ─── ORDER 11 — ГРАМАТИКА 3 (стр. 62): времеви изрази ──────────────────────
  {
    id: 'a2-l06-gramatika-03',
    type: 'grammar_examples',
    title: 'ГРАМАТИКА 3',
    instruction: 'Запознайте се с времевите изрази, с които се употребява минало свършено.',
    instructionKey: 'a2.gr.l06.vremeviIzrazi',
    order: 11,
    layout: 'centered',
    examples: [
      {
        imageUrl: '',
        text: 'ПРЕДИ + период',
        lines: [
          '**преди малко**',
          '**преди два дни**',
          '**преди две години**',
          '**онзи ден** (= преди два дни)',
        ],
        ttsText: 'Преди малко. Преди два дни. Преди две години. Онзи ден е преди два дни.',
        voiceGender: 'female',
      },
      {
        imageUrl: '',
        text: 'МИНАЛИЯ / МИНАЛАТА / МИНАЛОТО',
        lines: [
          '**миналия** месец',
          '**миналата** седмица',
          '**миналото** лято',
        ],
        ttsText: 'Миналия месец. Миналата седмица. Миналото лято.',
        voiceGender: 'female',
      },
    ],
  } as GrammarExamplesExercise,

  // ─── ORDER 12 — Упр. 9 (стр. 62): подредете думите ─────────────────────────
  {
    id: 'a2-l06-ex-09',
    type: 'word_order',
    title: 'УПРАЖНЕНИЕ 9',
    instruction: 'Подредете думите, за да получите изречение в минало свършено.',
    order: 12,
    points: 6,
    questions: [
      { words: ['с', 'Онзи', 'ден', 'пътувах', 'влак', '.'],                               correctSentence: 'Онзи ден пътувах с влак .', isExample: true },
      { words: ['ме', 'Снощи', 'той', 'пита', 'за', 'децата', '.'],                         correctSentence: 'Снощи той ме пита за децата .',            alternateCorrectSentences: ['Той ме пита снощи за децата .', 'Той ме пита за децата снощи .'] },
      { words: ['пазарувах', 'Вчера', 'от', 'супера', 'плодове', 'и', 'зеленчуци', '.'],    correctSentence: 'Вчера пазарувах от супера плодове и зеленчуци .',  alternateCorrectSentences: ['Вчера пазарувах плодове и зеленчуци от супера .'] },
      { words: ['малко', 'Преди', 'писах', 'имейл', 'на', 'сестра', 'ми', '.'],             correctSentence: 'Преди малко писах имейл на сестра ми .' },
      { words: ['Михаил', 'Миналата', 'седмица', 'игра', 'футбол', '.'],                    correctSentence: 'Миналата седмица Михаил игра футбол .' },
      { words: ['два', 'Преди', 'дни', 'танцувах', 'с', 'приятели', '.'],                   correctSentence: 'Преди два дни танцувах с приятели .' },
      { words: ['месец', 'Миналия', 'те', 'пътуваха', 'до', 'Ливан', '.'],                  correctSentence: 'Миналия месец те пътуваха до Ливан .' },
    ],
  } as WordOrderExercise,

  // ─── ORDER 13 — ГРАМАТИКА 4 (стр. 62): минало на имам ──────────────────────
  {
    id: 'a2-l06-gramatika-04',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 4',
    instruction: 'Запознайте се с минало свършено на глагола имам.',
    instructionKey: 'a2.gr.l06.imamMinalo',
    order: 13,
    tableTitle: 'Минало свършено на имам',
    columns: ['(+)', '(−)'],
    rows: [
      { pronoun: 'аз',        cells: ['имах',   'нямах'],   ttsText: 'аз. Имах. Нямах.' },
      { pronoun: 'ти',        cells: ['имаше',  'нямаше'],  ttsText: 'ти. Имаше. Нямаше.' },
      { pronoun: 'той/тя/то', cells: ['имаше',  'нямаше'],  ttsText: 'той, тя, то. Имаше. Нямаше.' },
      { pronoun: 'ние',       cells: ['имахме', 'нямахме'], ttsText: 'ние. Имахме. Нямахме.' },
      { pronoun: 'Вие',       cells: ['имахте', 'нямахте'], ttsText: 'Вие. Имахте. Нямахте.' },
      { pronoun: 'те',        cells: ['имаха',  'нямаха'],  ttsText: 'те. Имаха. Нямаха.' },
    ],
    notes: [
      'Също: аз обичах / ти обичаше; аз исках / ти искаше; аз можах / ти можеше.',
    ],
    ttsNoteModels: ['pro'],
  } as GrammarTableExercise,

  // ─── ORDER 14 — Упр. 10 (стр. 63): форми на имам ───────────────────────────
  {
    id: 'a2-l06-ex-10',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 10',
    instruction: 'Попълнете изреченията с подходящите форми на глагола **имам** в минало свършено.',
    order: 14,
    points: 6,
    layout: 'single',
    sentences: [
      { text: 'Вчера аз **имах** много работа.',                                               blanks: [], correctAnswers: [], isExample: true },
      { text: 'Онзи ден Григор _____ рожден ден.',                                             blanks: [1], correctAnswers: ['имаше'],  options: ['имах', 'имаше', 'имахме'],  acceptableAnswers: [['имаше']] },
      { text: 'Преди 10 минути ние _____ почивка.',                                            blanks: [1], correctAnswers: ['имахме'], options: ['имахме', 'имаше', 'имаха'],  acceptableAnswers: [['имахме']] },
      { text: 'Снощи Мохамед и Санди _____ гости.',                                           blanks: [1], correctAnswers: ['имаха'],  options: ['имаше', 'имаха', 'имахте'], acceptableAnswers: [['имаха']] },
      { text: 'Сутринта вие _____ ли топла вода?',                                            blanks: [1], correctAnswers: ['имахте'], options: ['имахте', 'имахме', 'имаха'], acceptableAnswers: [['имахте']] },
      { text: 'Вчера беше Цветница. Кой _____ имен ден?',                                     blanks: [1], correctAnswers: ['имаше'],  options: ['имах', 'имаше', 'имахме'],  acceptableAnswers: [['имаше']] },
      { text: 'Миналата неделя Нина _____ свободно време и пътува с приятели.',               blanks: [1], correctAnswers: ['имаше'],  options: ['имах', 'имаше', 'имаха'],   acceptableAnswers: [['имаше']] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 15 — Упр. 11 (стр. 63): има/имаше/няма/нямаше ──────────────────
  {
    id: 'a2-l06-ex-11',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 11',
    instruction: 'Попълнете изреченията с глаголните форми **има**, **имаше**, **няма**, **нямаше**.',
    order: 15,
    points: 7,
    layout: 'single',
    sentences: [
      { text: 'Сега в България _____ много бежанци.',                                        blanks: [1], correctAnswers: ['има'],     options: ['има', 'имаше', 'няма', 'нямаше'], acceptableAnswers: [['има']] },
      { text: 'Преди 15 години в България _____ малко бежанци.',                             blanks: [1], correctAnswers: ['имаше'],   options: ['има', 'имаше', 'няма', 'нямаше'], acceptableAnswers: [['имаше']] },
      { text: 'Сега не мога да пиша имейли – _____ интернет.',                              blanks: [1], correctAnswers: ['няма'],    options: ['има', 'имаше', 'няма', 'нямаше'], acceptableAnswers: [['няма']] },
      { text: 'Вчера не писах имейли – _____ интернет.',                                    blanks: [1], correctAnswers: ['нямаше'], options: ['има', 'имаше', 'няма', 'нямаше'], acceptableAnswers: [['нямаше']] },
      { text: 'В къщата _____ много стаи.',                                                   blanks: [1], correctAnswers: ['има'],     options: ['има', 'имаше', 'няма', 'нямаше'], acceptableAnswers: [['има']] },
      { text: '_____ вода, не мога да взема душ.',                                           blanks: [1], correctAnswers: ['Няма'],   options: ['Има', 'Имаше', 'Няма', 'Нямаше'], acceptableAnswers: [['Няма', 'няма']] },
      { text: 'Снощи _____ билети за театър и ние гледахме филм.',                          blanks: [1], correctAnswers: ['нямаше'], options: ['има', 'имаше', 'няма', 'нямаше'], acceptableAnswers: [['нямаше']] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 16 — ГРАМАТИКА 5 (стр. 63): има–имаше ───────────────────────────
  {
    id: 'a2-l06-gramatika-05',
    type: 'grammar_examples',
    title: 'ГРАМАТИКА 5',
    instruction: 'Запознайте се с разликата между има (сега) и имаше (в миналото).',
    instructionKey: 'a2.gr.l06.imaImashe',
    order: 16,
    layout: 'centered',
    examples: [
      {
        imageUrl: '',
        text: 'СЕГА → ПРЕДИ',
        lines: [
          'Сега тук **има** блок.',
          'Преди две години тук **имаше** къща.',
          '',
          '**има** → **имаше**',
          '**няма** → **нямаше**',
        ],
        ttsText: 'Сега тук има блок. Преди две години тук имаше къща. Има — имаше. Няма — нямаше.',
        voiceGender: 'female',
      },
    ],
  } as GrammarExamplesExercise,

  // ─── ORDER 17 — ДИАЛОЗИ 2 (стр. 63): 3 март — Шипка ────────────────────────
  {
    id: 'a2-l06-dialozi-02',
    type: 'dialogues',
    title: 'ДИАЛОЗИ 2',
    instruction: 'Натиснете всяка реплика, за да чуете произношението. После повторете на глас.',
    order: 17,
    sectionStart: {
      title: 'Празници през март',
      subtitle: 'Диалози за 3 март, Баба Марта и 8 март; исках, трябваше и НАХ група',
      titleI18n: {
        en: 'Holidays in March',
        fr: 'Fêtes en mars',
        ar: 'أعياد شهر مارس',
        fa: 'جشن‌های ماه مارس',
        uk: 'Свята в березні',
        ru: 'Праздники в марте',
      },
      subtitleI18n: {
        en: 'Dialogues about 3 March, Baba Marta and 8 March; "исках" (I wanted), "трябваше" (I had to) and the НАХ group',
        fr: 'Dialogues sur le 3 mars, Baba Marta et le 8 mars ; «исках» (je voulais), «трябваше» (je devais) et le groupe НАХ',
        ar: 'حوارات عن 3 مارس وبابا مارتا و8 مارس؛ «исках» (أردت) و«трябваше» (كان عليّ) ومجموعة НАХ',
        fa: 'گفت‌وگوها درباره ۳ مارس، بابا مارتا و ۸ مارس؛ «исках» (می‌خواستم)، «трябваше» (باید می‌کردم) و گروه НАХ',
        uk: 'Діалоги про 3 березня, Баба Марта і 8 березня; «исках» (я хотів), «трябваше» (треба було) і група НАХ',
        ru: 'Диалоги о 3 марта, Баба Марта и 8 марта; «исках» (я хотел), «трябваше» (нужно было) и группа НАХ',
      },
      theme: 'dialogue',
    },
    sections: [
      {
        id: '3 март — Национален празник',
        imageUrl: `${ASSET}/03-dialozi-2-shipka-3-mart/01-pametnik-shipka.jpg`,
        lines: [
          { text: '– Вчера беше националният празник на България. Как го празнувахте?', voiceGender: 'male' },
          { text: '– Бяхме на връх Шипка. На този ден българите празнуват свободата на България. Имаше много официални гости – президентът, министри, депутати, кметове. Пред паметника имаше много цветя. Вечерта имаше заря.', voiceGender: 'female' },
        ],
      },
    ],
  } as DialoguesExercise,

  // SKIP — Упр. 12 „Прочетете диалога и отговорете" — по желание на клиента

  // ─── ORDER 18 — ГРАМАТИКА 6 (стр. 63–64): исках/трябваше/не можах + да ─────
  {
    id: 'a2-l06-gramatika-06',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 6',
    instruction: 'Запознайте се с минало свършено на исках, трябваше и не можах + да + глагол.',
    instructionKey: 'a2.gr.l06.iskahTryabvashe',
    order: 18,
    tableTitle: 'Исках / Трябваше / Не можах + да + глагол',
    columns: ['исках + да', 'трябваше + да', 'не можах + да'],
    rows: [
      { pronoun: 'аз',        cells: ['исках да работя',    'трябваше да работя',    'не можах да работя'],    ttsText: 'аз. Исках да работя. Трябваше да работя. Не можах да работя.' },
      { pronoun: 'ти',        cells: ['искаше да работиш',  'трябваше да работиш',  'не можа да работиш'],   ttsText: 'ти. Искаше да работиш. Трябваше да работиш. Не можа да работиш.' },
      { pronoun: 'той/тя/то', cells: ['искаше да работи',   'трябваше да работи',   'не можа да работи'],    ttsText: 'той, тя, то. Искаше да работи. Трябваше да работи. Не можа да работи.' },
      { pronoun: 'ние',       cells: ['искахме да работим', 'трябваше да работим',  'не можахме да работим'], ttsText: 'ние. Искахме да работим. Трябваше да работим. Не можахме да работим.' },
      { pronoun: 'Вие',       cells: ['искахте да работите','трябваше да работите', 'не можахте да работите'], ttsText: 'Вие. Искахте да работите. Трябваше да работите. Не можахте да работите.' },
      { pronoun: 'те',        cells: ['искаха да работят',  'трябваше да работят',  'не можаха да работят'],  ttsText: 'те. Искаха да работят. Трябваше да работят. Не можаха да работят.' },
    ],
    notes: [
      '„Трябваше" е неизменяемо — еднаква форма за всички лица. Само глаголът след „да" се спряга.',
      'Вчера аз не исках да работя. / Вчера ти искаше ли да работиш?',
      'Вчера аз не трябваше да работя. / Вчера ти трябваше ли да работиш?',
    ],
    ttsNoteModels: ['pro', 'pro', 'pro'],
  } as GrammarTableExercise,

  // ─── ORDER 19 — Упр. 13 (стр. 64): трансформирайте ─────────────────────────
  {
    id: 'a2-l06-ex-13',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 13',
    instruction: 'Изберете правилната форма по модела.',
    order: 19,
    points: 3,
    layout: 'single',
    sentences: [
      { text: 'Аз искам да уча български. → Миналото лято аз **исках** да уча френски.',                 blanks: [], correctAnswers: [], isExample: true },
      { text: 'Той трябва да яде много плодове. → Миналия месец той _____ да яде много зеленчуци.',      blanks: [1], correctAnswers: ['трябваше'], options: ['трябваше', 'исках', 'можа'],     acceptableAnswers: [['трябваше']] },
      { text: 'Сега ти можеш да говориш с Иван. → Снощи ти не _____ да говориш с Иван.',                blanks: [1], correctAnswers: ['можа'],     options: ['трябваше', 'исках', 'можа'],     acceptableAnswers: [['можа']] },
      { text: 'Ние искаме да пътуваме до Пловдив. → Миналата седмица ние _____ да пътуваме до Стара Загора.', blanks: [1], correctAnswers: ['искахме'], options: ['искахме', 'трябваше', 'можахме'], acceptableAnswers: [['искахме']] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 20 — Упр. 14 (стр. 64): аз → ти ────────────────────────────────
  {
    id: 'a2-l06-ex-14',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 14',
    instruction: 'Попълнете по модела, като замените **аз** с **ти**.',
    order: 20,
    points: 4,
    layout: 'two-column',
    sentences: [
      { text: 'Вчера аз помогнах. | Вчера ти **помогна**.',                         blanks: [], correctAnswers: [], isExample: true },
      { text: 'Снощи аз легнах късно. | Снощи ти _____ късно.',                     blanks: [1], correctAnswers: ['легна'],     options: ['легнах', 'легна', 'легнаха'],     acceptableAnswers: [['легна']] },
      { text: 'Миналата седмица аз пристигнах в София. | Миналата седмица ти _____ в София.', blanks: [1], correctAnswers: ['пристигна'], options: ['пристигнах', 'пристигна', 'пристигнаха'], acceptableAnswers: [['пристигна']] },
      { text: 'Преди един месец аз се срещнах с колеги. | Преди един месец ти _____ с колеги.', blanks: [1], correctAnswers: ['се срещна'], options: ['се срещнах', 'се срещна', 'се срещнаха'], acceptableAnswers: [['се срещна', 'срещна се']] },
      { text: 'Сутринта аз тръгнах за работа с такси. | Сутринта ти _____ за работа с такси.', blanks: [1], correctAnswers: ['тръгна'],    options: ['тръгнах', 'тръгна', 'тръгнаха'],    acceptableAnswers: [['тръгна']] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 21 — Упр. 15 (стр. 64): ти → той/ние/Вие/те (табличка) ─────────
  {
    id: 'a2-l06-ex-15',
    type: 'table_fill',
    title: 'УПРАЖНЕНИЕ 15',
    instruction: 'Попълнете таблицата с правилните форми в минало свършено.',
    order: 21,
    points: 4,
    tables: [
      {
        name: 'Минало свършено — НАХ група',
        columns: ['той/тя/то', 'ние', 'Вие', 'те'],
        rows: [
          { label: 'лягам',     cells: [{ correctAnswers: ['легна'],        options: ['легна', 'легнах', 'легнаха'] },              { correctAnswers: ['легнахме'],        options: ['легнахме', 'легнахте', 'легнаха'] },              { correctAnswers: ['легнахте'],        options: ['легнахте', 'легнахме', 'легнаха'] },              { correctAnswers: ['легнаха'],        options: ['легнаха', 'легнахме', 'легнахте'] }] },
          { label: 'пристигам', cells: [{ correctAnswers: ['пристигна'],    options: ['пристигна', 'пристигнах', 'пристигнаха'] },  { correctAnswers: ['пристигнахме'],    options: ['пристигнахме', 'пристигнахте', 'пристигнаха'] },  { correctAnswers: ['пристигнахте'],    options: ['пристигнахте', 'пристигнахме', 'пристигнаха'] },  { correctAnswers: ['пристигнаха'],    options: ['пристигнаха', 'пристигнахме', 'пристигнахте'] }] },
          { label: 'срещам се', cells: [{ correctAnswers: ['се срещна'],    options: ['се срещна', 'се срещнах', 'се срещнаха'] },  { correctAnswers: ['се срещнахме'],    options: ['се срещнахме', 'се срещнахте', 'се срещнаха'] },  { correctAnswers: ['се срещнахте'],    options: ['се срещнахте', 'се срещнахме', 'се срещнаха'] },  { correctAnswers: ['се срещнаха'],    options: ['се срещнаха', 'се срещнахме', 'се срещнахте'] }] },
          { label: 'тръгвам',   cells: [{ correctAnswers: ['тръгна'],        options: ['тръгна', 'тръгнах', 'тръгнаха'] },              { correctAnswers: ['тръгнахме'],        options: ['тръгнахме', 'тръгнахте', 'тръгнаха'] },              { correctAnswers: ['тръгнахте'],        options: ['тръгнахте', 'тръгнахме', 'тръгнаха'] },              { correctAnswers: ['тръгнаха'],        options: ['тръгнаха', 'тръгнахме', 'тръгнахте'] }] },
        ],
      },
    ],
  } as TableFillExercise,

  // ─── ORDER 22 — Упр. 16 (стр. 64): сегашно → минало свършено ───────────────
  {
    id: 'a2-l06-ex-16',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 16',
    instruction: 'Изберете правилната форма на глаголите от сегашно в минало свършено по модела.',
    order: 22,
    points: 4,
    layout: 'two-column',
    sentences: [
      { text: 'Всяка сутрин ти ставаш рано. | Тази сутрин ти **стана** късно.',                   blanks: [], correctAnswers: [], isExample: true },
      { text: 'Всяка вечер вие лягате около 22:00. | Снощи вие _____ по-късно.',                   blanks: [1], correctAnswers: ['легнахте'],    options: ['легнахте', 'легнахме', 'легнаха'],    acceptableAnswers: [['легнахте']] },
      { text: 'Всеки ден той се връща в 17:00. | Вчера той _____ от работа в 19:00.',              blanks: [1], correctAnswers: ['се върна'],     options: ['се върна', 'се върнах', 'се върнаха'], acceptableAnswers: [['се върна', 'върна се']] },
      { text: 'Всеки уикенд ние се срещаме. | Миналия уикенд ние не _____ с приятели.',           blanks: [1], correctAnswers: ['се срещнахме'], options: ['се срещнахме', 'се срещнах', 'се срещнаха'], acceptableAnswers: [['се срещнахме', 'срещнахме се']] },
      { text: 'Винаги тръгвам в 7:00. | Тази сутрин _____ в 8:00.',                               blanks: [1], correctAnswers: ['тръгнах'],     options: ['тръгнах', 'тръгна', 'тръгнахме'],    acceptableAnswers: [['тръгнах']] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 23 — ГРАМАТИКА 7 (стр. 64): станах — НАХ група ──────────────────
  {
    id: 'a2-l06-gramatika-07',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 7',
    instruction: 'Запознайте се с минало свършено на глаголите от НАХ група.',
    instructionKey: 'a2.gr.l06.stanah',
    order: 23,
    tableTitle: 'Минало свършено — НАХ група (ставам → станах)',
    columns: ['(+)', '(−)', '(?)'],
    rows: [
      { pronoun: 'аз',        cells: ['станах',   'не станах',   'станах ли?'],   ttsText: 'аз. Станах. Не станах. Станах ли?', ttsPrompt: 'Произнеси ясно местоимението „аз" (а-з), не „ъз".' },
      { pronoun: 'ти',        cells: ['стана',    'не стана',    'стана ли?'],    ttsText: 'ти. Стана. Не стана. Стана ли?' },
      { pronoun: 'той/тя/то', cells: ['стана',    'не стана',    'стана ли?'],    ttsText: 'той, тя, то. Стана. Не стана. Стана ли?' },
      { pronoun: 'ние',       cells: ['станахме', 'не станахме', 'станахме ли?'], ttsText: 'ние. Станахме. Не станахме. Станахме ли?' },
      { pronoun: 'Вие',       cells: ['станахте', 'не станахте', 'станахте ли?'], ttsText: 'Вие. Станахте. Не станахте. Станахте ли?' },
      { pronoun: 'те',        cells: ['станаха',  'не станаха',  'станаха ли?'],  ttsText: 'те. Станаха. Не станаха. Станаха ли?' },
    ],
    notes: [
      'Глаголи от НАХ група: върнах се, заминах, започнах, казах, легнах си, пристигнах, помогнах, разбрах, срещнах се, тръгнах, харесах',
      'Аз не станах. / Ти стана ли?',
    ],
    ttsNotes: [
      'Глаголи от нах група: върнах се, заминах, започнах, казах, легнах си, пристигнах, помогнах, разбрах, срещнах се, тръгнах, харесах',
      'Аз не станах. Ти стана ли?',
    ],
    ttsNoteModels: ['pro', 'pro'],
  } as GrammarTableExercise,

  // ─── ORDER 24 — Упр. 17 (стр. 65): попълнете НАХ форми ─────────────────────
  {
    id: 'a2-l06-ex-17',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 17',
    instruction: 'Попълнете празните места, като следвате модела.',
    order: 24,
    points: 6,
    layout: 'single',
    sentences: [
      { text: 'Сутринта **станах** рано. (ставам)',                                         blanks: [], correctAnswers: [], isExample: true },
      { text: 'Вчера ти _____ за Бургас. (заминавам)',                                      blanks: [1], correctAnswers: ['замина'],      options: ['заминах', 'замина', 'заминаха'],      acceptableAnswers: [['замина']] },
      { text: 'Този ден тя _____ в България. (пристигам)',                                  blanks: [1], correctAnswers: ['пристигна'],   options: ['пристигнах', 'пристигна', 'пристигнаха'], acceptableAnswers: [['пристигна']] },
      { text: 'Преди един час автобусът _____. (тръгвам)',                                  blanks: [1], correctAnswers: ['тръгна'],      options: ['тръгнах', 'тръгна', 'тръгнаха'],      acceptableAnswers: [['тръгна']] },
      { text: 'Миналата седмица детето _____ на учителката. (помагам)',                     blanks: [1], correctAnswers: ['помогна'],     options: ['помогнах', 'помогна', 'помогнаха'],    acceptableAnswers: [['помогна']] },
      { text: 'Вчера те _____ с приятели. (срещам се)',                                     blanks: [1], correctAnswers: ['се срещнаха'], options: ['се срещнах', 'се срещна', 'се срещнаха'], acceptableAnswers: [['се срещнаха', 'срещнаха се']] },
      { text: 'Преди два дни аз му _____ за срещата. (казвам)',                             blanks: [1], correctAnswers: ['казах'],       options: ['казах', 'каза', 'казаха'],             acceptableAnswers: [['казах']] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 25 — ДИАЛОЗИ 3 (стр. 65): 1 март — Баба Марта ──────────────────
  {
    id: 'a2-l06-dialozi-03',
    type: 'dialogues',
    title: 'ДИАЛОЗИ 3',
    instruction: 'Натиснете всяка реплика, за да чуете произношението. После повторете на глас.',
    order: 25,
    sections: [
      {
        id: '1 март — Баба Марта',
        imageUrl: `${ASSET}/04-dialozi-3-baba-marta/01-martenitsa-na-ryka.jpg`,
        lines: [
          { text: '– Честита Баба Марта, Ибрахим! Заповядай една мартеница. О, ти вече имаш мартеници на ръката.', voiceGender: 'female' },
          { text: '– Да, Мартина. Сутринта се срещнах с български приятели. Мартениците са от тях. Денят им е приятен. Много харесвам тази традиция. Откога е?', voiceGender: 'male' },
          { text: '– Това е много стара българска традиция. През март започва пролетта и с мартениците пожелаваме на роднини, приятели и колеги здраве и късмет. Белият цвят е символ на радостта и чистотата, а червеният – на живота и любовта.', voiceGender: 'female' },
        ],
      },
    ],
  } as DialoguesExercise,

  // SKIP — Упр. 18 „Разкажете за 1 март" — по желание на клиента
  // SKIP — Упр. 19 „Намерете мартеница" — по желание на клиента

  // ─── ORDER 26 — ДИАЛОЗИ 4 (стр. 65): 8 март ────────────────────────────────
  {
    id: 'a2-l06-dialozi-04',
    type: 'dialogues',
    title: 'ДИАЛОЗИ 4',
    instruction: 'Натиснете всяка реплика, за да чуете произношението. После повторете на глас.',
    order: 26,
    sections: [
      {
        id: '8 март — Международен ден на жената',
        imageUrl: `${ASSET}/05-dialozi-4-8-mart/01-rozi-za-mama.jpg`,
        lines: [
          { text: '– Честит Осми март, мила мамо! Тези цветя са за теб.', voiceGender: 'male' },
          { text: '– О, много са красиви! Благодаря ти!', voiceGender: 'female' },
          { text: '– Как прекара деня? Празнувахте ли с колегите?', voiceGender: 'male' },
          { text: '– Да, разбира се. Бяхме на работа до обед. После с колегите обядвахме в един ресторант. Всички жени бяха много хубави и усмихнати. Разговаряхме, слушахме музика, танцувахме. На масите имаше много цветя. Прекарахме чудесно!', voiceGender: 'female' },
        ],
      },
    ],
  } as DialoguesExercise,

  // SKIP — Упр. 20 „Поздравете колежката" — по желание на клиента
  // SKIP — Упр. 21 „Разкажете за 8 март" — по желание на клиента

  // ─── ORDER 27 — ГРАМАТИКА 8 (стр. 66): ЯХ група ────────────────────────────
  {
    id: 'a2-l06-gramatika-08',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 8',
    instruction: 'Запознайте се с минало свършено на глаголите от ЯХ група.',
    instructionKey: 'a2.gr.l06.yahGrupa',
    order: 27,
    sectionStart: {
      title: 'ЯХ група и преговор',
      subtitle: 'Минало свършено на ЯХ група, съкращения и слушане',
      titleI18n: {
        en: 'The ЯХ group and review',
        fr: 'Le groupe ЯХ et révision',
        ar: 'مجموعة ЯХ والمراجعة',
        fa: 'گروه ЯХ و مرور',
        uk: 'Група ЯХ і повторення',
        ru: 'Группа ЯХ и повторение',
      },
      subtitleI18n: {
        en: 'The aorist of ЯХ-group verbs, greeting abbreviations and listening',
        fr: 'L\'aoriste des verbes du groupe ЯХ, abréviations de souhaits et écoute',
        ar: 'الماضي التام لأفعال مجموعة ЯХ واختصارات التهاني والاستماع',
        fa: 'گذشته کامل فعل‌های گروه ЯХ، مخفف تبریک‌ها و شنیدن',
        uk: 'Минулий доконаний час дієслів групи ЯХ, скорочення привітань і аудіювання',
        ru: 'Прошедшее совершенное глаголов группы ЯХ, сокращения поздравлений и аудирование',
      },
      theme: 'grammar',
    },
    tableTitle: 'Минало свършено — ЯХ група (виждам → видях)',
    columns: ['(+)', '(−)', '(?)'],
    rows: [
      { pronoun: 'аз',        cells: ['видях',    'не видях',    'видях ли?'],    ttsText: 'аз. Видях. Не видях. Видях ли?', ttsPrompt: 'Чети „не видях" като две отделни думи — отрицание „не", после „видях"; не като „ние видях".' },
      { pronoun: 'ти',        cells: ['видя',     'не видя',     'видя ли?'],     ttsText: 'ти. Видя. Не видя. Видя ли?' },
      { pronoun: 'той/тя/то', cells: ['видя',     'не видя',     'видя ли?'],     ttsText: 'той, тя, то. Видя. Не видя. Видя ли?' },
      { pronoun: 'ние',       cells: ['видяхме',  'не видяхме',  'видяхме ли?'],  ttsText: 'ние. Видяхме. Не видяхме. Видяхме ли?', ttsPrompt: 'Произнеси „ние" слято като една дума (ни-е заедно), не „ни е".' },
      { pronoun: 'Вие',       cells: ['видяхте',  'не видяхте',  'видяхте ли?'],  ttsText: 'Вие. Видяхте. Не видяхте. Видяхте ли?' },
      { pronoun: 'те',        cells: ['видяха',   'не видяха',   'видяха ли?'],   ttsText: 'те. Видяха. Не видяха. Видяха ли?' },
    ],
    notes: [
      'Глаголи от ЯХ група: вечерях, вървях, живях, закъснях, разговарях',
      'Аз не видях. / Ти видя ли?',
      'Всеки ден виждам колегите. → Вчера видях колегите.',
    ],
    ttsNoteModels: ['pro', 'pro', 'pro'],
  } as GrammarTableExercise,

  // ─── ORDER 28 — Упр. 22 (стр. 66): окончанията ─────────────────────────────
  {
    id: 'a2-l06-ex-22',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 22',
    instruction: 'Изберете правилната форма на минало свършено (ЯХ група).',
    order: 28,
    points: 5,
    layout: 'single',
    sentences: [
      { text: 'Снощи **вечерях** вкъщи. (вечерям)',                                 blanks: [], correctAnswers: [], isExample: true },
      { text: 'Миналата година той _____ шест месеца в Турция. (живея)',            blanks: [1], correctAnswers: ['живя'],     options: ['живях', 'живя', 'живяха'],   acceptableAnswers: [['живя']] },
      { text: 'Вчера аз го _____ в един магазин. (виждам)',                          blanks: [1], correctAnswers: ['видях'],    options: ['видях', 'видя', 'видяха'],   acceptableAnswers: [['видях']] },
      { text: 'Снощи ние _____ пиле с ориз. (вечерям)',                              blanks: [1], correctAnswers: ['вечеряхме'], options: ['вечеряхме', 'вечеряхте', 'вечеряха'], acceptableAnswers: [['вечеряхме']] },
      { text: 'Вие _____ три години в тази къща. (живея)',                           blanks: [1], correctAnswers: ['живяхте'], options: ['живяхме', 'живяхте', 'живяха'], acceptableAnswers: [['живяхте']] },
      { text: 'Къде _____ Лора и Марин снощи? (вечерям)',                            blanks: [1], correctAnswers: ['вечеряха'], options: ['вечерях', 'вечеряхме', 'вечеряха'], acceptableAnswers: [['вечеряха']] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 29 — Упр. 23 (стр. 66): изберете правилната форма ───────────────
  {
    id: 'a2-l06-ex-23',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 23',
    instruction: 'Изберете правилната глаголна форма — сегашно или минало свършено.',
    order: 29,
    points: 4,
    layout: 'single',
    sentences: [
      { text: 'Сега не те **виждам** добре.',                                        blanks: [], correctAnswers: [], isExample: true },
      { text: 'Преди малко _____ учителката.',                                       blanks: [2], correctAnswers: ['видяхме'], options: ['виждаме', 'видяхме'], acceptableAnswers: [['видяхме']] },
      { text: 'Често _____ Петър в супера.',                                         blanks: [1], correctAnswers: ['виждам'],  options: ['виждам', 'видях'],   acceptableAnswers: [['виждам']] },
      { text: 'Вчера _____ ли новите колеги? (вие)',                                 blanks: [1], correctAnswers: ['видяхте'], options: ['виждате', 'видяхте'], acceptableAnswers: [['видяхте']] },
      { text: 'Снощи тя не ме _____ в метрото.',                                     blanks: [4], correctAnswers: ['видя'],    options: ['вижда', 'видя'],     acceptableAnswers: [['видя']] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 30 — ДОП. Упр. 24 (стр. 66): попълнете с дадените глаголи ───────
  {
    id: 'a2-l06-ex-24',
    type: 'workbook_fill_blank',
    title: 'ДОПЪЛНИТЕЛНО УПРАЖНЕНИЕ 24',
    instruction: 'Попълнете изреченията с дадените глаголи в минало свършено.',
    order: 30,
    points: 13,
    layout: 'single',
    sentences: [
      {
        text: 'Вчера аз _____ (пиша) имейл на Мохамед. След това _____ (гледам) телевизия, _____ (играя) футбол с приятели и _____ (слушам) музика.',
        blanks: [1, 2, 3, 4],
        correctAnswers: ['писах', 'гледах', 'играх', 'слушах'],
        options: [['писах', 'пиша', 'писаха'], ['гледах', 'гледа', 'гледаха'], ['играх', 'игра', 'играха'], ['слушах', 'слуша', 'слушаха']],
        acceptableAnswers: [['писах'], ['гледах'], ['играх'], ['слушах']],
      },
      {
        text: 'Тази сутрин _____ (чакам) половин час автобус. _____ (пътувам) пет спирки до парка. Там _____ (срещам се) с приятели и после _____ (тичам).',
        blanks: [1, 2, 3, 4],
        correctAnswers: ['чаках', 'пътувах', 'се срещнах', 'тичах'],
        options: [['чаках', 'чака', 'чакаха'], ['пътувах', 'пътува', 'пътуваха'], ['се срещнах', 'се срещна', 'се срещнаха'], ['тичах', 'тича', 'тичаха']],
        acceptableAnswers: [['чаках'], ['пътувах'], ['се срещнах', 'срещнах се'], ['тичах']],
      },
      {
        text: 'Вчера Мери _____ (заминавам) за Пловдив. Там _____ (срещам се) с приятелки на автогарата. После всички _____ (тръгвам) за Смолян с автобус. _____ (прекарвам) там много добре и _____ (връщам се) след два дни.',
        blanks: [1, 2, 3, 4, 5],
        correctAnswers: ['замина', 'се срещна', 'тръгнаха', 'прекараха', 'се върнаха'],
        options: [['замина', 'заминах', 'заминаха'], ['се срещна', 'се срещнах', 'се срещнаха'], ['тръгнаха', 'тръгна', 'тръгнах'], ['прекараха', 'прекара', 'прекарах'], ['се върнаха', 'се върна', 'се върнах']],
        acceptableAnswers: [['замина'], ['се срещна', 'срещна се'], ['тръгнаха'], ['прекараха'], ['се върнаха', 'върнаха се']],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 31 — Упр. 25 (стр. 66): съкращения ЧБМ/ЧНГ/ЧРД ─────────────────
  {
    id: 'a2-l06-ex-25',
    type: 'dropdown_match',
    title: 'УПРАЖНЕНИЕ 25',
    instruction: 'Запомнете тези съкращения и изберете пълния поздрав по модела.',
    order: 31,
    points: 2,
    questions: [
      { id: 'model', left: 'ЧБМ = …', options: [], correctAnswer: 'Честита Баба Марта!', isExample: true },
      { id: 'chng', left: 'ЧНГ = _____', options: ['Честита Нова година!', 'Честит Никулден!', 'Честит Народен Герой!', 'Честита Нова Гергьовица!'], correctAnswer: 'Честита Нова година!' },
      { id: 'chrd', left: 'ЧРД = _____', options: ['Честит рожден ден!', 'Честит Религиозен Ден!', 'Честит Роден Димитровден!', 'Честита Руска Дата!'], correctAnswer: 'Честит рожден ден!' },
    ],
  } as DropdownMatchExercise,

  // ─── ORDER 32 — Упр. 26 (стр. 66): слушайте и попълнете ────────────────────
  {
    id: 'a2-l06-ex-26',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 26',
    instruction: 'Слушайте и попълнете изреченията с правилните глаголни форми в минало свършено.',
    order: 32,
    points: 11,
    layout: 'single',
    audioUrl: '/assets/a2-lesson-06/audio/tts/listening/a2-l06-ex-26.mp3',
    // „пица-рия" — тирето държи ударението на „-рия" (TTS иначе чете „пицàря" / „пицèрия").
    listeningText: 'Вчера сутринта станах късно. Беше неделя и не бях на работа. Помогнах на майка ми в кухнята. На обяд пристигна на гости една приятелка. Обядвахме заедно супа, кюфтета и салата. Имаше и десерт. Вечерта се срещнах с колеги и вечеряхме в малка пица-рия. Върнах се вкъщи около единадесет часа и легнах да спя.',
    sentences: [
      {
        text: 'Вчера сутринта _____ (ставам) късно. _____ (съм) неделя и не _____ (съм) на работа. _____ (помагам) на майка ми в кухнята.',
        blanks: [1, 2, 3, 4],
        correctAnswers: ['станах', 'Беше', 'бях', 'Помогнах'],
        options: [
          ['станах', 'стана', 'станаха'],
          ['Беше', 'Бях', 'Бяхме'],
          ['бях', 'беше', 'бяхме'],
          ['Помогнах', 'Помогна', 'Помогнаха'],
        ],
        acceptableAnswers: [['станах'], ['Беше', 'беше'], ['бях'], ['Помогнах', 'помогнах']],
      },
      {
        text: 'На обяд _____ (пристигам) на гости една приятелка. _____ (обядвам) заедно супа, кюфтета и салата. _____ (имам) и десерт.',
        blanks: [1, 2, 3],
        correctAnswers: ['пристигна', 'Обядвахме', 'Имаше'],
        options: [
          ['пристигна', 'пристигнах', 'пристигнаха'],
          ['Обядвахме', 'Обядвах', 'Обядваха'],
          ['Имаше', 'Имах', 'Имаха'],
        ],
        acceptableAnswers: [['пристигна'], ['Обядвахме', 'обядвахме'], ['Имаше', 'имаше']],
      },
      {
        text: 'Вечерта _____ (срещам се) с колеги и _____ (вечерям) в малка пицария. _____ (връщам се) вкъщи около 11 часа и _____ (лягам) да спя.',
        blanks: [1, 2, 3, 4],
        correctAnswers: ['се срещнах', 'вечеряхме', 'Върнах се', 'легнах'],
        options: [
          ['се срещнах', 'се срещна', 'се срещнаха'],
          ['вечеряхме', 'вечерях', 'вечеряха'],
          ['Върнах се', 'Върна се', 'Върнаха се'],
          ['легнах', 'легна', 'легнаха'],
        ],
        acceptableAnswers: [['се срещнах', 'срещнах се'], ['вечеряхме'], ['Върнах се', 'върнах се', 'се върнах'], ['легнах']],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 33 — ТЕКСТ Упр. 27 (стр. 67): Коледа ────────────────────────────
  {
    id: 'a2-l06-tekst-koleda',
    type: 'reading_text',
    title: 'ТЕКСТОВЕ',
    textTitle: 'Коледа',
    instruction: 'Изслушайте текста и след това го прочетете сами.',
    order: 33,
    sectionStart: {
      title: 'Текстове за български празници',
      subtitle: 'Коледа, Великден, 24 май и Кирил и Методий',
      titleI18n: {
        en: 'Texts about Bulgarian holidays',
        fr: 'Textes sur les fêtes bulgares',
        ar: 'نصوص عن الأعياد البلغارية',
        fa: 'متن‌هایی درباره جشن‌های بلغاری',
        uk: 'Тексти про болгарські свята',
        ru: 'Тексты о болгарских праздниках',
      },
      subtitleI18n: {
        en: 'Christmas, Easter, 24 May and Cyril and Methodius',
        fr: 'Noël, Pâques, le 24 mai et Cyrille et Méthode',
        ar: 'عيد الميلاد وعيد الفصح و24 مايو وكيرلس وميثوديوس',
        fa: 'کریسمس، عید پاک، ۲۴ مه و سیریل و متودیوس',
        uk: 'Різдво, Великдень, 24 травня та Кирило і Методій',
        ru: 'Рождество, Пасха, 24 мая и Кирилл и Мефодий',
      },
      theme: 'reading',
    },
    showDictionary: true,
    images: [
      { imageUrl: `${ASSET}/06-tekstove-koleda/01-koledna-trapeza.jpg`, label: 'Коледна трапеза — Бъдни вечер' },
      { imageUrl: `${ASSET}/06-tekstove-koleda/02-dyado-koleda.jpg`,    label: 'Дядо Коледа' },
    ],
    paragraphs: [
      'Всички българи обичат коледните празници, защото в тях има много радост.',
      'Коледа е на 25 декември, но ние започваме да празнуваме на 24-ти вечерта – Бъдни вечер. На Бъдни вечер празнуваме раждането на Исус Христос. На Бъдни вечер цялото семейство сяда около масата. На нея има само постни ястия – сарми с ориз, боб, ошав, баница с тиква, мед, лук, чесън, орехи. Ястията трябва да са нечетен брой – седем, девет или единадесет.',
      'На 25-и сутринта много хора ходят на църква. Децата се радват на подаръците от Дядо Коледа. На обяд семейството пак е заедно около масата, където има пържоли, вино и добро настроение.',
    ],
    ttsParagraphs: [
      'Всички българи обичат коледните празници, защото в тях има много радост.',
      'Коледа е на двадесет и пети декември, но ние започваме да празнуваме на двадесет и четвърти вечерта — Бъдни вечер. На Бъдни вечер празнуваме раждането на Исус Христос. На Бъдни вечер цялото семейство сяда около масата. На нея има само постни ястия — сарми с ориз, боб, ошав, баница с тиква, мед, лук, чесън, орехи. Ястията трябва да са нечетен брой — седем, девет или единадесет.',
      'На двадесет и пети сутринта много хора ходят на църква. Децата се радват на подаръците от Дядо Коледа. На обяд семейството пак е заедно около масата, където има пържоли, вино и добро настроение.',
    ],
    paragraphVoiceGenders: ['female', 'female', 'female'],
  } as ReadingTextExercise,

  // ─── ORDER 34 — Упр. 28 (стр. 67): въпроси за Коледа ──────────────────────
  {
    id: 'a2-l06-ex-28',
    type: 'dropdown_match',
    title: 'УПРАЖНЕНИЕ 28',
    instruction: 'Изберете правилния отговор на въпросите за текста „Коледа".',
    order: 34,
    points: 4,
    questions: [
      { id: 'q2', left: 'Как се казва празникът на 24 декември вечерта?', options: ['Бъдни вечер.', 'Коледа.', 'Никулден.', 'Рождество Христово.'], correctAnswer: 'Бъдни вечер.' },
      { id: 'q3', left: 'Какви ястия има на масата на Бъдни вечер?', options: ['Само постни ястия.', 'Пържоли и вино.', 'Козунак и агнешко.', 'Всякакви ястия.'], correctAnswer: 'Само постни ястия.' },
      { id: 'q4', left: 'Какво правят много хора на 25 декември сутринта?', options: ['Ходят на църква.', 'Празнуват с приятели.', 'Пазаруват подаръци.', 'Стоят вкъщи.'], correctAnswer: 'Ходят на църква.' },
      { id: 'q5', left: 'Какво носи Дядо Коледа на децата?', options: ['Подаръци.', 'Коледни карти.', 'Сладкиши.', 'Пари.'], correctAnswer: 'Подаръци.' },
    ],
  } as DropdownMatchExercise,

  // ─── ORDER 35 — ТЕКСТ Упр. 29 (стр. 68): Великден ──────────────────────────
  {
    id: 'a2-l06-tekst-velikden',
    type: 'reading_text',
    title: 'ТЕКСТОВЕ',
    textTitle: 'Великден',
    instruction: 'Изслушайте текста и след това го прочетете сами.',
    order: 35,
    showDictionary: true,
    images: [
      { imageUrl: `${ASSET}/07-tekstove-velikden/01-velikdenski-yaytsa.jpg`, label: 'Великденски яйца' },
    ],
    paragraphs: [
      'Великден е един от най-големите християнски празници. Той винаги е в неделя, обикновено е през април и се празнува три дни.',
      'Седмицата преди Великден е много важна. В четвъртък боядисваме яйца, а в събота правим козунаци. В събота точно в полунощ християните, които са на църква, обикалят храма три пъти със запалени свещи и после ги носят вкъщи. Великден е ден на светлината и надеждата.',
      'В неделя, на Великден, всички се чукаме с яйца, ядем козунаци и печено агнешко. Ходим на гости и си подаряваме шарени яйца. Този празник носи радост на всички.',
    ],
    ttsParagraphs: [
      'Великден е един от най-големите християнски празници. Той винаги е в неделя, обикновено е през април и се празнува три дни.',
      'Седмицата преди Великден е много важна. В четвъртък боядисваме яйца, а в събота правим козунаци. В събота точно в полунощ християните, които са на църква, обикалят храма три пъти със запалени свещи и после ги носят вкъщи. Великден е ден на светлината и надеждата.',
      'В неделя, на Великден, всички се чукаме с яйца, ядем козунаци и печено агнешко. Ходим на гости и си подаряваме шарени яйца. Този празник носи радост на всички.',
    ],
    paragraphVoiceGenders: ['female', 'female', 'female'],
  } as ReadingTextExercise,

  // SKIP — Упр. 30 „Оцветете яйцето" — по желание на клиента (drawing exercise)

  // ─── ORDER 36 — Упр. 31 (стр. 68): въпроси за Великден ─────────────────────
  {
    id: 'a2-l06-ex-31',
    type: 'dropdown_match',
    title: 'УПРАЖНЕНИЕ 31',
    instruction: 'Изберете правилния отговор на въпросите за текста „Великден".',
    order: 36,
    points: 7,
    questions: [
      { id: 'q1', left: 'Кога е Великден и колко дни се празнува?', options: ['В неделя, обикновено през април, три дни.', 'В събота, февруари, два дни.', 'В понеделник, март, пет дни.', 'В петък, май, един ден.'], correctAnswer: 'В неделя, обикновено през април, три дни.' },
      { id: 'q2', left: 'Какво правят в четвъртък преди Великден?', options: ['Боядисват яйца.', 'Правят козунаци.', 'Ходят на черква.', 'Пазаруват.'], correctAnswer: 'Боядисват яйца.' },
      { id: 'q3', left: 'Какво правят в събота преди Великден?', options: ['Правят козунаци.', 'Боядисват яйца.', 'Отиват на гости.', 'Почиват.'], correctAnswer: 'Правят козунаци.' },
      { id: 'q4', left: 'Колко пъти хората обикалят храма в събота нощ?', options: ['Три пъти.', 'Два пъти.', 'Четири пъти.', 'Веднъж.'], correctAnswer: 'Три пъти.' },
      { id: 'q5', left: 'Ден на светлината и надеждата е:', options: ['Великден.', 'Коледа.', 'Бъдни вечер.', '3 март.'], correctAnswer: 'Великден.' },
      { id: 'q6', left: 'Какво ядат на Великден?', options: ['Козунаци и печено агнешко.', 'Баница с тиква и мед.', 'Сарми с ориз и боб.', 'Пица и салата.'], correctAnswer: 'Козунаци и печено агнешко.' },
      { id: 'q7', left: 'Какво си подаряват на Великден?', options: ['Шарени яйца.', 'Мартеници.', 'Цветя.', 'Книги.'], correctAnswer: 'Шарени яйца.' },
    ],
  } as DropdownMatchExercise,

  // ─── ORDER 37 — ТЕКСТ Упр. 32 (стр. 69): 24 май ────────────────────────────
  {
    id: 'a2-l06-tekst-24-may',
    type: 'reading_text',
    title: 'ТЕКСТОВЕ',
    textTitle: '24 май — Денят на буквите',
    instruction: 'Изслушайте текста и след това го прочетете сами.',
    order: 37,
    showDictionary: true,
    images: [
      { imageUrl: `${ASSET}/08-tekstove-24-may/01-narodna-biblioteka-kiril-metodiy.jpg`, label: 'Националната библиотека „Св.св. Кирил и Методий", София' },
    ],
    paragraphs: [
      '24 май е Денят на българските букви, на пролетните цветя, на детските усмивки.',
      'Спомням си един 24 май, когато бях малка. В градината на баба имаше много цветя. С един голям букет аз тръгнах за училището. Там имаше много деца и учители. Гледах красивите цветя, веселите деца, тичах с приятели из двора на училището.',
      'След това всички деца и учители пяхме песни и слушахме стихове пред паметника на братята Кирил и Методий.',
      'И сега, когато внуците ми празнуват този хубав празник, аз се вълнувам много.',
    ],
    ttsParagraphs: [
      'Двадесет и четвърти май е Денят на българските букви, на пролетните цветя, на детските усмивки.',
      'Спомням си един двадесет и четвърти май, когато бях малка. В градината на баба имаше много цветя. С един голям букет аз тръгнах за училището. Там имаше много деца и учители. Гледах красивите цветя, веселите деца, тичах с приятели из двора на училището.',
      'След това всички деца и учители пяхме песни и слушахме стихове пред паметника на братята Кирил и Методий.',
      'И сега, когато внуците ми празнуват този хубав празник, аз се вълнувам много.',
    ],
    paragraphVoiceGenders: ['female', 'female', 'female', 'female'],
  } as ReadingTextExercise,

  // ─── ORDER 38 — Упр. 33 (стр. 69): въпроси за 24 май (фактически) ──────────
  {
    id: 'a2-l06-ex-33',
    type: 'dropdown_match',
    title: 'УПРАЖНЕНИЕ 33',
    instruction: 'Изберете правилния отговор на въпросите за текста „24 май".',
    order: 38,
    points: 3,
    questions: [
      { id: 'q1', left: 'Какъв празник е 24 май?', options: ['Денят на българските букви.', 'Денят на труда.', 'Денят на свободата.', 'Денят на майката.'], correctAnswer: 'Денят на българските букви.' },
      { id: 'q2', left: 'Какво носи авторката в училище на 24 май?', options: ['Голям букет с цветя.', 'Книги и тетрадки.', 'Подаръци за учителите.', 'Знаме.'], correctAnswer: 'Голям букет с цветя.' },
      { id: 'q3', left: 'Какво правят учениците и учителите пред паметника на Кирил и Методий?', options: ['Пеят песни и слушат стихове.', 'Играят на хора.', 'Боядисват яйца.', 'Раздават мартеници.'], correctAnswer: 'Пеят песни и слушат стихове.' },
    ],
  } as DropdownMatchExercise,

  // ─── ORDER 39 — Упр. 34 (стр. 69): стихотворение „На Кирил и Методий" ──────
  {
    id: 'a2-l06-tekst-stih',
    type: 'reading_text',
    title: 'УПРАЖНЕНИЕ 34',
    textTitle: 'На Кирил и Методий',
    instruction: 'Прочетете стихотворението на глас и изслушайте произношението.',
    order: 39,
    showDictionary: false,
    images: [],
    paragraphs: [
      'Днес е празник най-велик,\nден на нашия език\nи на славянските народи,\nден на Кирил и Методий.',
      'С техни букви всеки ден\nние пишем и четем\nкнижки български, чудесни\nс приказки и родни песни.',
    ],
    ttsParagraphs: [
      'Днес е празник най-велик, ден на нашия език и на славянските народи, ден на Кирил и Методий.',
      'С техни букви всеки ден ние пишем и четем книжки български, чудесни с приказки и родни песни.',
    ],
    paragraphVoiceGenders: ['female', 'female'],
  } as ReadingTextExercise,

  // ─── ORDER 40 — ТЕКСТ Упр. 35 (стр. 70): Кирил и Методий ──────────────────
  {
    id: 'a2-l06-tekst-kiril-metodiy',
    type: 'reading_text',
    title: 'ТЕКСТОВЕ',
    textTitle: 'Кирил и Методий',
    instruction: 'Изслушайте текста и след това го прочетете сами.',
    order: 40,
    showDictionary: true,
    images: [
      { imageUrl: `${ASSET}/09-tekstove-kiril-i-metodiy/01-glagolitsa-kamen.jpg`, label: 'Глаголица — първата българска азбука' },
    ],
    paragraphs: [
      'Двамата братя Кирил и Методий са от Солун. През 855 г. Кирил пише първата славянобългарска азбука, която се казва глаголица. Методий му помага.',
      'По-късно е създадена кирилицата, на която пишем днес. Буквите на новата азбука са по-различни и по-лесни от старите. Използват ги и в други страни – Русия, Украйна, Сърбия, Босна и Херцеговина, Северна Македония, Монголия, Черна гора, Беларус и други. В Гърция използват гръцката азбука, а в другите страни на Европа – латиницата.',
      'На 24 май България празнува Деня на светите братя Кирил и Методий, на българската азбука, просвета и култура и на славянската книжовност. Ние, българите, обичаме и уважаваме много този ден.',
    ],
    ttsParagraphs: [
      'Двамата братя Кирил и Методий са от Солун. През осемстотин петдесет и пета година Кирил пише първата славянобългарска азбука, която се казва глаголица. Методий му помага.',
      'По-късно е създадена кирилицата, на която пишем днес. Буквите на новата азбука са по-различни и по-лесни от старите. Използват ги и в други страни — Русия, Украйна, Сърбия, Босна и Херцеговина и Северна Македония, Монголия, Черна гора, Беларус и други. В Гърция използват гръцката азбука, а в другите страни на Европа — латиницата.',
      'На двадесет и четвърти май България празнува Деня на светите братя Кирил и Методий, на българската азбука, просвета и култура и на славянската книжовност. Ние, българите, обичаме и уважаваме много този ден.',
    ],
    paragraphVoiceGenders: ['male', 'female', 'female'],
  } as ReadingTextExercise,

  // ─── ORDER 41 — Упр. 36 (стр. 70): вярно или грешно ───────────────────────
  {
    id: 'a2-l06-ex-36',
    type: 'true_false',
    title: 'УПРАЖНЕНИЕ 36',
    instruction: 'Прочетете текста „Кирил и Методий" и определете дали твърденията са верни (✓) или неверни (✗).',
    order: 41,
    points: 6,
    sentences: [
      { id: 's01', text: 'Кирил и Методий са братя.',                                         isTrue: true,  isExample: true },
      { id: 's02', text: 'Кирил и Методий са от София.',                                      isTrue: false },
      { id: 's03', text: 'Те пишат азбуката през 1855 година.',                               isTrue: false },
      { id: 's07', text: 'Българите обичат и уважават Деня на Кирил и Методий.',              isTrue: true  },
      { id: 's04', text: 'Азбуката ни се казва латиница.',                                    isTrue: false },
      { id: 's05', text: 'В Европа има само една официална азбука.',                          isTrue: false },
      { id: 's06', text: 'На кирилица пишат само българите.',                                 isTrue: false },
    ],
  } as TrueFalseExercise,

  // SKIP — Упр. 37 „Намерете друга информация за Кирил и Методий" — по желание на клиента

];

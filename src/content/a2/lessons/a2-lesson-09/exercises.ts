import type {
  Exercise,
  ImageLabelingExercise,
  IllustratedCardsExercise,
  GrammarTableExercise,
  WorkbookFillBlankExercise,
  MultipleChoiceExercise,
  ReadingTextExercise,
} from '@/content/types';

// ⚠️ Order follows the A2 textbook „Най-добрият приятел" (стр. 91–98).

const ASSET = '/assets/a2-lesson-09';

const GEMINI_BG_SMOOTH_PROMPT =
  'Read aloud clearly and smoothly in standard Bulgarian with correct Bulgarian stress. Do not split words into syllables and do not use any foreign or Russian accent.';

export const exercises: Exercise[] = [

  // ─── ORDER 1 — Упр. 1 (стр. 91): Напишете думите под картинките ─────────────
  {
    id: 'a2-l09-ex-01',
    type: 'image_labeling',
    title: 'УПРАЖНЕНИЕ 1',
    instruction: 'Изберете правилната дума под всяка картинка.',
    order: 1,
    points: 8,
    displayType: 'default',
    columns: 4,
    images: [
      { id: 'glupav',   imageUrl: `${ASSET}/01-upr-01-kachestva/01-glupav.jpg`,   correctLabel: 'глупав',   imageOptions: ['глупав', 'умен', 'тъжен', 'болен'] },
      { id: 'tazhen',   imageUrl: `${ASSET}/01-upr-01-kachestva/02-tujen.jpg`,    correctLabel: 'тъжен',    imageOptions: ['тъжен', 'уморен', 'гладен', 'жаден'] },
      { id: 'umoren',   imageUrl: `${ASSET}/01-upr-01-kachestva/03-umoren.jpg`,   correctLabel: 'уморен',   imageOptions: ['уморен', 'болен', 'тъжен', 'глупав'] },
      { id: 'umen',     imageUrl: `${ASSET}/01-upr-01-kachestva/04-umen.jpg`,     correctLabel: 'умен',     imageOptions: ['умен', 'работлив', 'гладен', 'жаден'] },
      { id: 'bolen',    imageUrl: `${ASSET}/01-upr-01-kachestva/05-bolen.jpg`,    correctLabel: 'болен',    imageOptions: ['болен', 'тъжен', 'глупав', 'уморен'] },
      { id: 'gladen',   imageUrl: `${ASSET}/01-upr-01-kachestva/06-gladen.jpg`,   correctLabel: 'гладен',   imageOptions: ['гладен', 'жаден', 'умен', 'работлив'] },
      { id: 'zhaden',   imageUrl: `${ASSET}/01-upr-01-kachestva/07-zhaden.jpg`,   correctLabel: 'жаден',    imageOptions: ['жаден', 'гладен', 'болен', 'тъжен'] },
      { id: 'rabotliv', imageUrl: `${ASSET}/01-upr-01-kachestva/08-rabotliv.jpg`, correctLabel: 'работлив', imageOptions: ['работлив', 'умен', 'уморен', 'болен'] },
    ],
    options: ['глупав', 'тъжен', 'уморен', 'умен', 'болен', 'гладен', 'жаден', 'работлив'],
  } as ImageLabelingExercise,

  // ─── ORDER 2 — НОВИ ДУМИ 1 (стр. 91): КАК СЕ ЧУВСТВАТЕ? ────────────────────
  {
    id: 'a2-l09-novi-dumi-1',
    type: 'illustrated_cards',
    title: 'НОВИ ДУМИ 1',
    instruction: 'КАК СЕ ЧУВСТВАТЕ?',
    order: 2,
    cards: [
      { id: 'spokoyen',    imageUrl: `${ASSET}/02-novi-dumi-1-chuvstva/01-spokoen.jpg`,    label: 'спокоен',              ttsLabel: 'споКОен',   ttsModel: 'pro', ttsPrompt: 'Pronounce the ordinary Bulgarian word „спокоен" (meaning calm) as one single fluent word — never spelled out or syllable by syllable. The uppercase letters only show the stressed syllable: spo-KO-en.' },
      { id: 'nespokoyen',  imageUrl: `${ASSET}/02-novi-dumi-1-chuvstva/02-nespokoen.jpg`,  label: 'неспокоен (притеснен)', ttsLabel: 'неспокоен, притеснен' },
      { id: 'dovolen',     imageUrl: `${ASSET}/02-novi-dumi-1-chuvstva/03-dovolen.jpg`,    label: 'доволен',              ttsLabel: 'доволЕН',   ttsModel: 'pro', ttsPrompt: 'Bulgarian adjective. Stress on the last syllable: до-во-ЛЕН. The uppercase Е marks the stressed vowel.' },
      { id: 'nedovolen',   imageUrl: `${ASSET}/02-novi-dumi-1-chuvstva/04-nedovolen.jpg`,  label: 'недоволен',            ttsLabel: 'недоволен' },
      { id: 'shchasliv',   imageUrl: `${ASSET}/02-novi-dumi-1-chuvstva/05-shtastliv.jpg`,  label: 'щастлив',              ttsLabel: 'щастлИВ',   ttsModel: 'pro', ttsPrompt: 'Bulgarian adjective. Stress on the second syllable: щаст-ЛИВ. The uppercase И marks the stressed vowel.' },
      { id: 'neshchasten', imageUrl: `${ASSET}/02-novi-dumi-1-chuvstva/06-neshtasten.jpg`, label: 'нещастен',             ttsLabel: 'нещастен' },
      { id: 'oburkan',     imageUrl: `${ASSET}/02-novi-dumi-1-chuvstva/07-oburkan.jpg`,    label: 'объркан',              ttsLabel: 'объркАН',   ttsModel: 'pro', ttsPrompt: 'Bulgarian adjective. Stress on the last syllable: об-ЪР-КАН. The uppercase А marks the stressed vowel.' },
      { id: 'samoten',     imageUrl: `${ASSET}/02-novi-dumi-1-chuvstva/08-samoten.jpg`,    label: 'самотен',              ttsLabel: 'самОтен',   ttsModel: 'pro', ttsPrompt: 'Bulgarian adjective. Stress on the second syllable: са-МО-тен. The uppercase О marks the stressed vowel.' },
      { id: 'iznenadan',   imageUrl: `${ASSET}/02-novi-dumi-1-chuvstva/09-iznenadan.jpg`,  label: 'изненадан',            ttsLabel: 'изненАдан', ttsModel: 'pro', ttsPrompt: 'Bulgarian adjective. Stress on the third syllable: из-не-НА-дан. The uppercase А marks the stressed vowel.' },
      { id: 'yadosan',     imageUrl: `${ASSET}/02-novi-dumi-1-chuvstva/10-yadosan.jpg`,    label: 'ядосан',               ttsLabel: 'ядосан' },
      { id: 'uplashen',    imageUrl: `${ASSET}/02-novi-dumi-1-chuvstva/11-uplashen.jpg`,   label: 'уплашен',              ttsLabel: 'уплашен' },
      { id: 'razstroen',   imageUrl: `${ASSET}/02-novi-dumi-1-chuvstva/12-razstroen.jpg`,  label: 'разстроен',            ttsLabel: 'разстроѐн', ttsModel: 'pro', ttsPrompt: 'Pronounce as one single fluent Bulgarian word. Do NOT spell it out or read it syllable by syllable, and do not pause between syllables. The grave accent only marks which vowel is stressed (раз-стро-ЕН).' },
    ],
  } as IllustratedCardsExercise,

  // ─── ORDER 3 — Упр. 2 (стр. 92): Свържете антонимите ────────────────────────
  {
    id: 'a2-l09-ex-02',
    type: 'a2-match-pairs',
    title: 'УПРАЖНЕНИЕ 2',
    instruction: 'Свържете думите с техните антоними.',
    model: 'добър – лош',
    order: 3,
    points: 4,
    pairs: [
      { id: 'p1', left: 'щастлив',  correctRight: 'нещастен' },
      { id: 'p2', left: 'весел',    correctRight: 'тъжен' },
      { id: 'p3', left: 'доволен',  correctRight: 'недоволен' },
      { id: 'p4', left: 'спокоен',  correctRight: 'неспокоен' },
    ],
    shuffledRights: ['тъжен', 'нещастен', 'недоволен', 'неспокоен'],
  } as unknown as Exercise,

  // Упр. 3 — ⏭ SKIP по клиент (напишете изречения с нови думи)

  // ─── ORDER 4 — ГРАМАТИКА 1 (стр. 92): когато / защото ───────────────────────
  {
    id: 'a2-l09-gramatika-01',
    type: 'a2-grammar-examples',
    title: 'ГРАМАТИКА 1',
    instruction: 'Запознайте се с употребата на когато и защото.',
    instructionKey: 'a2.gr.l09.kogatoZashtoto',
    order: 4,
    layout: 'centered',
    examples: [
      {
        lines: ['Кога се чувстваш нещастен?', 'Аз съм нещастен, **когато** съм болен.'],
        ttsText: 'Кога се чувстваш нещастен? Аз съм нещастен, когато съм болен.',
      },
      {
        lines: ['Защо той е тъжен?', 'Той е тъжен, **защото** няма работа.'],
        ttsText: 'Защо той е тъжен? Той е тъжен, защото няма работа.',
      },
    ],
  } as unknown as Exercise,

  // Упр. 4 — ⏭ SKIP по клиент (отговорете на въпросите)

  // ─── ORDER 5 — Упр. 5 (стр. 92): Изберете логичното продължение — защото ─────
  {
    id: 'a2-l09-ex-05',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 5',
    instruction: 'Изберете логичното продължение на изречението.',
    order: 5,
    points: 8,
    layout: 'single',
    sentences: [
      { text: 'Аз съм щастлив, защото **имам рожден ден**. (Модел)', blanks: [], correctAnswers: [], isExample: true },
      { text: 'Тя плаче, защото е _____.',
        blanks: [1], correctAnswers: ['тъжна'], options: ['тъжна', 'щастлива', 'весела', 'спокойна'], acceptableAnswers: [['тъжна']] },
      { text: 'Той е гладен, защото _____.',
        blanks: [1], correctAnswers: ['не е ял цял ден'], options: ['не е ял цял ден', 'яде много', 'обядва сега', 'е сит'], acceptableAnswers: [['не е ял цял ден']] },
      { text: 'Ние сме уморени, защото _____.',
        blanks: [1], correctAnswers: ['работихме цял ден'], options: ['работихме цял ден', 'спахме много', 'почивахме', 'не правихме нищо'], acceptableAnswers: [['работихме цял ден']] },
      { text: 'Те са ядосани, защото _____.',
        blanks: [1], correctAnswers: ['автобусът закъсня'], options: ['автобусът закъсня', 'всичко е наред', 'спечелиха награда', 'са на почивка'], acceptableAnswers: [['автобусът закъсня']] },
      { text: 'Аз съм неспокоен, защото _____.',
        blanks: [1], correctAnswers: ['утре имам важен изпит'], options: ['утре имам важен изпит', 'нямам никакви грижи', 'всичко е спокойно', 'си почивам у дома'], acceptableAnswers: [['утре имам важен изпит']] },
      { text: 'Детето е уплашено, защото _____.',
        blanks: [1], correctAnswers: ['чу силен шум'], options: ['чу силен шум', 'гледа любим филм', 'играе с приятели', 'яде сладолед'], acceptableAnswers: [['чу силен шум']] },
      { text: 'Тя е изненадана, защото _____.',
        blanks: [1], correctAnswers: ['получи неочакван подарък'], options: ['получи неочакван подарък', 'знаеше всичко', 'нищо не се случи', 'е отегчена'], acceptableAnswers: [['получи неочакван подарък']] },
      { text: 'Той е самотен, защото _____.',
        blanks: [1], correctAnswers: ['няма приятели в новия град'], options: ['няма приятели в новия град', 'има много приятели', 'винаги е с хора', 'ходи на купони'], acceptableAnswers: [['няма приятели в новия град']] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 6 — ДИАЛОЗИ 1 (стр. 92): Разговори за чувства ────────────────────
  {
    id: 'a2-l09-dialozi-01',
    type: 'a2-dialogues',
    title: 'ДИАЛОЗИ 1',
    instruction: 'Натиснете всяка реплика, за да чуете произношението. После прочетете диалозите на глас.',
    order: 6,
    sections: [
      {
        id: 'а. Щастлива двойка',
        imageUrl: `${ASSET}/03-dialozi-1/01-shtastliva-dvoika.jpg`,
        lines: [
          { text: '– Изглеждаш чудесно!', voiceGender: 'male' },
          { text: '– Много съм щастлива. Днес имам рожден ден и довечера ще празнувам с приятели. Заповядай в ресторант „Весела среща".', voiceGender: 'female' },
          { text: '– Благодаря, но не мога. Имам среща с Боряна.', voiceGender: 'male' },
          { text: '– Боряна?', voiceGender: 'female' },
          { text: '– Да, това е новата ми приятелка. Влюбен съм!', voiceGender: 'male' },
          { text: '– Изненадана съм. Миналата седмица беше с Краси и също беше много влюбен!', voiceGender: 'female' },
        ],
      },
      {
        id: 'б. Притеснена приятелка',
        imageUrl: `${ASSET}/04-upr-06-07/01-plachesh-ani.jpg`,
        lines: [
          { text: '– Не мога да намеря телефона си и не мога да работя без него. Много съм притеснена!', voiceGender: 'female' },
          { text: '– Съжалявам. Как да ти помогна?', ttsText: '– Съжалявам. Как да ти помòгна?', voiceGender: 'male' },
          { text: '– Имам нужда от шоколад и кафе. Помага ми много, когато съм разстроена.', ttsText: '– Имам нужда от шоколад и кафе. Помàга ми много, когато съм разстроена.', voiceGender: 'female' },
          { text: '– Веднага отивам да купя.', voiceGender: 'male' },
          { text: '– Благодаря.', voiceGender: 'female' },
        ],
      },
    ],
  } as unknown as Exercise,

  // Упр. 6 — ⏭ SKIP по клиент (четене по двойки)

  // ─── ORDER 7 — Упр. 7 (стр. 93): Изберете правилния съвет за Надя ───────────
  {
    id: 'a2-l09-ex-07',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 7',
    instruction: 'Изберете правилния съвет.',
    order: 7,
    points: 4,
    layout: 'single',
    sentences: [
      { text: '– Цял ден плача. Много съм тъжна.\n– Трябва да **излезеш на разходка**. (Модел)', blanks: [], correctAnswers: [], isExample: true },
      { text: '– Разстроена съм. Имам проблеми в работата.\n– Трябва да _____.',
        blanks: [1], correctAnswers: ['говориш с шефа'], options: ['говориш с шефа', 'мълчиш и не казваш нищо', 'плачеш цял ден', 'не правиш нищо'], acceptableAnswers: [['говориш с шефа']] },
      { text: '– Болна съм. Имам температура.\n– Трябва да _____.',
        blanks: [1], correctAnswers: ['отидеш на лекар'], options: ['отидеш на лекар', 'отидеш на работа', 'излезеш навън', 'не пиеш лекарства'], acceptableAnswers: [['отидеш на лекар']] },
      { text: '– Уморена съм. Имам много работа.\n– Трябва да _____.',
        blanks: [1], correctAnswers: ['си починеш'], options: ['си починеш', 'работиш повече', 'не спиш', 'излезеш на купон'], acceptableAnswers: [['си починеш']] },
      { text: '– Чувствам се самотна.\n– Трябва да _____.',
        blanks: [1], correctAnswers: ['излезеш с приятели'], options: ['излезеш с приятели', 'стоиш сама вкъщи', 'не говориш с никого', 'избягваш хората'], acceptableAnswers: [['излезеш с приятели']] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 8 — ГРАМАТИКА 2 (стр. 93): Повелително наклонение (правилни) ──────
  {
    id: 'a2-l09-gramatika-02',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 2',
    instruction: 'Запознайте се с повелителното наклонение на правилните глаголи.',
    instructionKey: 'a2.gr.l09.povelitelno',
    order: 8,
    tableTitle: 'Повелително наклонение — правилни глаголи',
    columns: ['Заповед (+) ти', 'Заповед (+) Вие', 'Забрана (–) ти', 'Забрана (–) Вие'],
    rows: [
      { pronoun: 'гледам',  cells: ['Гледай!',   'Гледайте!',  'Не гледай!',   'Не гледайте!'],   ttsText: 'гледам. Гледай! Гледайте! Не гледай! Не гледайте!',    ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'слушам',  cells: ['Слушай!',   'Слушайте!',  'Не слушай!',   'Не слушайте!'],   ttsText: 'слушам. Слушай! Слушайте! Не слушай! Не слушайте!',    ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'чакам',   cells: ['Чакай!',    'Чакайте!',   'Не чакай!',    'Не чакайте!'],    ttsText: 'чакам. Чакай! Чакайте! Не чакай! Не чакайте!',         ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'работя',  cells: ['Работи!',   'Работете!',  'Не работи!',   'Не работете!'],   ttsText: 'работя. Работи! Работете! Не работи! Не работете!',    ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'говоря',  cells: ['Говори!',   'Говорете!',  'Не говори!',   'Не говорете!'],   ttsText: 'говоря. Говори! Говорете! Не говори! Не говорете!',    ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'пиша',    cells: ['Пиши!',     'Пишете!',    'Не пиши!',     'Не пишете!'],     ttsText: 'пиша. Пиши! Пишете! Не пиши! Не пишете!',             ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'чета',    cells: ['Чети!',     'Четете!',    'Не чети!',     'Не четете!'],     ttsText: 'чета. Чети! Четете! Не чети! Не четете!',             ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'уча',     cells: ['Учи!',      'Учете!',     'Не учи!',      'Не учете!'],      ttsText: 'уча. Учи! Учете! Не учи! Не учете!',                  ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'мисля',   cells: ['Мисли!',    'Мислете!',   'Не мисли!',    'Не мислете!'],    ttsText: 'мисля. Мисли! Мислете! Не мисли! Не мислете!',        ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'купувам', cells: ['Купувай!',  'Купувайте!', 'Не купувай!',  'Не купувайте!'],  ttsText: 'купувам. Купувай! Купувайте! Не купувай! Не купувайте!', ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'купя',    cells: ['Купи!',     'Купете!',    '—',            '—'],              ttsText: 'купя. Купи! Купете!',                                  ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'ставам',  cells: ['Ставай!',   'Ставайте!',  'Не ставай!',   'Не ставайте!'],   ttsText: 'ставам. Ставай! Ставайте! Не ставай! Не ставайте!',   ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'стана',   cells: ['Стани!',    'Станете!',   '—',            '—'],              ttsText: 'стана. Стани! Станете!',                               ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'отварям', cells: ['Отваряй!',  'Отваряйте!', 'Не отваряй!',  'Не отваряйте!'],  ttsText: 'отварям. Отваряй! Отваряйте! Не отваряй! Не отваряйте!', ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'отворя',  cells: ['Отвори!',   'Отворете!',  '—',            '—'],              ttsText: 'отворя. Отвори! Отворете!',                            ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'казвам',  cells: ['Казвай!',   'Казвайте!',  'Не казвай!',   'Не казвайте!'],   ttsText: 'казвам. Казвай! Казвайте! Не казвай! Не казвайте!',   ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'кажа',    cells: ['Кажи!',     'Кажете!',    '—',            '—'],              ttsText: 'кажа. Кажи! Кажете!',                                  ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'давам',   cells: ['Давай!',    'Давайте!',   'Не давай!',    'Не давайте!'],    ttsText: 'ДАвам. ДАвай! ДАвайте! Не ДАвай! Не ДАвайте!',        ttsPrompt: 'Read aloud clearly and smoothly in standard Bulgarian. Stress is always on the FIRST syllable: ДА-вам, ДА-вай, ДА-вай-те. The uppercase letter marks the stressed vowel. Do not use Russian or foreign accent.' },
      { pronoun: 'дам',     cells: ['Дай!',      'Дайте!',     '—',            '—'],              ttsText: 'дам. Дай! Дайте!',                                     ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'правя',   cells: ['Прави!',    'Правете!',   'Не прави!',    'Не правете!'],    ttsText: 'правя. Прави! Правете! Не прави! Не правете!',         ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'направя', cells: ['Направи!',  'Направете!', '—',            '—'],              ttsText: 'направя. Направи! Направете!',                         ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
    ],
    notes: [
      '1. спрежение (гледам, купувам): Заповед → -й (гледай!, купувай!). Не + несвършен вид за забрана.',
      '2. спрежение (говоря, пиша): Заповед → -и (говори!, пиши!). Не + несвършен вид за забрана.',
    ],
    ttsNotes: [
      'Първо спрежение. Гледам, купувам. Заповед, окончание и кратко. Гледай, купувай. Не, плюс несвършен вид за забрана.',
      'Второ спрежение. Говоря, пиша. Заповед, окончание и. Говори, пиши. Не, плюс несвършен вид за забрана.',
    ],
    ttsNoteModels: ['pro', 'pro'],
  } as GrammarTableExercise,

  // ─── ORDER 9 — Упр. 8 (стр. 94): Работете по модела ─────────────────────────
  {
    id: 'a2-l09-ex-08',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 8',
    instruction: 'Изберете правилния отговор по модела.',
    order: 9,
    points: 6,
    layout: 'single',
    sentences: [
      { text: '– Може ли да обядвам?\n– Да, **обядвай**! (Модел)', blanks: [], correctAnswers: [], isExample: true },
      { text: '– Може ли да пия фанта?\n– Да, _____!',
        blanks: [1], correctAnswers: ['пий'], options: ['пий', 'пийте', 'пиеш'], acceptableAnswers: [['пий']] },
      { text: '– Може ли да купя плодове?\n– Да, _____!',
        blanks: [1], correctAnswers: ['купи'], options: ['купи', 'купете', 'купиш'], acceptableAnswers: [['купи']] },
      { text: '– Може ли да се обадя?\n– Да, _____!',
        blanks: [1], correctAnswers: ['обади се'], options: ['обади се', 'обадете се', 'обади'], acceptableAnswers: [['обади се']] },
      { text: '– Може ли да поканя Иван?\n– Да, _____!',
        blanks: [1], correctAnswers: ['покани го'], options: ['покани го', 'покани', 'поканете го'], acceptableAnswers: [['покани го', 'покани']] },
      { text: '– Може ли да взема книгата?\n– Да, _____!',
        blanks: [1], correctAnswers: ['вземи'], options: ['вземи', 'вземете', 'вземеш'], acceptableAnswers: [['вземи']] },
      { text: '– Може ли да платя сметката?\n– Да, _____!',
        blanks: [1], correctAnswers: ['плати'], options: ['плати', 'платете', 'платиш'], acceptableAnswers: [['плати']] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 10 — Упр. 9 (стр. 94): Поставете повелителните форми ──────────────
  {
    id: 'a2-l09-ex-09',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 9',
    instruction: 'Изберете правилната повелителна форма на глагола.',
    order: 10,
    points: 5,
    layout: 'single',
    sentences: [
      { text: 'Топло ми е! Моля те, **отвори** прозореца! (отворя) (Модел)', blanks: [], correctAnswers: [], isExample: true },
      { text: 'Студено ми е. Моля те, _____ вратата! (затворя)',
        blanks: [1], correctAnswers: ['затвори'], options: ['затвори', 'затваряй', 'затвори се'], acceptableAnswers: [['затвори']] },
      { text: 'Моля Ви, _____ тук! (спра)',
        blanks: [1], correctAnswers: ['спрете'], options: ['спрете', 'спри', 'спирайте'], acceptableAnswers: [['спрете', 'спри']] },
      { text: 'Тя не е в офиса, _____ по-късно. (обадя се)',
        blanks: [1], correctAnswers: ['обадете се'], options: ['обадете се', 'обади се', 'обаждайте се'], acceptableAnswers: [['обадете се', 'обади се']] },
      { text: '_____ с директора! (говоря)',
        blanks: [1], correctAnswers: ['Говорете'], options: ['Говорете', 'Говори', 'Говорете се'], acceptableAnswers: [['Говорете', 'Говори']] },
      { text: 'Моля те, _____ закуска за децата! (направя)',
        blanks: [1], correctAnswers: ['направи'], options: ['направи', 'правете', 'направете'], acceptableAnswers: [['направи']] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 11 — Упр. 10 (стр. 94): Напишете отрицателните форми ─────────────
  {
    id: 'a2-l09-ex-10',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 10',
    instruction: 'Изберете правилната отрицателна форма.',
    order: 11,
    points: 9,
    layout: 'two-column',
    sentences: [
      { text: 'Купете! → **Не купувайте!** (Модел)', blanks: [], correctAnswers: [], isExample: true },
      { text: 'Станете! → _____!',  blanks: [1], correctAnswers: ['Не ставайте'],   options: ['Не ставайте', 'Не стани', 'Не ставай'],     acceptableAnswers: [['Не ставайте']] },
      { text: 'Обадете се! → _____!', blanks: [1], correctAnswers: ['Не се обаждайте'], options: ['Не се обаждайте', 'Не се обади', 'Не обаждайте'], acceptableAnswers: [['Не се обаждайте', 'Не обаждайте се']] },
      { text: 'Вземете! → _____!',  blanks: [1], correctAnswers: ['Не вземайте'],   options: ['Не вземайте', 'Не взимай', 'Не вземи'],     acceptableAnswers: [['Не вземайте', 'Не взимайте']] },
      { text: 'Кажете! → _____!',   blanks: [1], correctAnswers: ['Не казвайте'],   options: ['Не казвайте', 'Не кажи', 'Не казвай'],      acceptableAnswers: [['Не казвайте']] },
      { text: 'Дайте! → _____!',    blanks: [1], correctAnswers: ['Не давайте'],    options: ['Не давайте', 'Не дай', 'Не давай'],         acceptableAnswers: [['Не давайте']] },
      { text: 'Отворете! → _____!', blanks: [1], correctAnswers: ['Не отваряйте'],  options: ['Не отваряйте', 'Не отваряй', 'Не отвори'],  acceptableAnswers: [['Не отваряйте']] },
      { text: 'Затворете! → _____!',blanks: [1], correctAnswers: ['Не затваряйте'], options: ['Не затваряйте', 'Не затваряй', 'Не затвори'], acceptableAnswers: [['Не затваряйте']] },
      { text: 'Спрете! → _____!',   blanks: [1], correctAnswers: ['Не спирайте'],   options: ['Не спирайте', 'Не спирай', 'Не спри'],      acceptableAnswers: [['Не спирайте']] },
      { text: 'Върнете се! → _____!', blanks: [1], correctAnswers: ['Не се връщайте'], options: ['Не се връщайте', 'Не се върни', 'Не връщайте се'], acceptableAnswers: [['Не се връщайте', 'Не връщайте се']] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 12 — ГРАМАТИКА 3 (стр. 94): Неправилни глаголи ────────────────────
  {
    id: 'a2-l09-gramatika-03',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 3',
    instruction: 'Запознайте се с неправилните форми на повелителното наклонение.',
    instructionKey: 'a2.gr.l09.nepravilniGlagoli',
    order: 12,
    tableTitle: 'Повелително наклонение — неправилни глаголи',
    columns: ['Заповед (+) ти', 'Заповед (+) Вие', 'Забрана (–)'],
    rows: [
      { pronoun: 'съм / бъда', cells: ['Бъди!',  'Бъдете!',  'Не бъди! / Не бъдете!'],  ttsText: 'съм, бъда. Бъди! Бъдете! Не бъди! Не бъдете!',           ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'ям',         cells: ['Яж!',    'Яжте!',    'Не яж! / Не яжте!'],       ttsText: 'ям. Яж! Яжте! Не яж! Не яжте!',                         ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'влизам / вляза', cells: ['Влез!',  'Влезте!',  'Не влизай! / Не влизайте!'], ttsText: 'влизам, вляза. Влез! Влезте! Не влизай! Не влизайте!', ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'излизам / изляза', cells: ['Излез!', 'Излезте!', 'Не излизай! / Не излизайте!'], ttsText: 'излизам, изляза. Излез! Излезте! Не излизай! Не излизайте!', ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'отивам / отида', cells: ['Отиди!', 'Отидете!', 'Не отивай! / Не отивайте!'], ttsText: 'отивам, отида. Отиди! Отидете! Не отивай! Не отивайте!', ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'идвам / дойда', cells: ['Ела!',   'Елате!',   'Не идвай! / Не идвайте!'],  ttsText: 'идвам, дойда. Ела! Елате! Не идвай! Не идвайте!',       ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'виждам / видя', cells: ['Виж!',   'Вижте!',   '—'],                         ttsText: 'виждам, видя. Виж! Вижте!',                             ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'чувам / чуя',   cells: ['Чуй!',   'Чуйте!',   '—'],                         ttsText: 'чувам, чуя. Чуй! Чуйте!',                              ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
    ],
    notes: [
      '⚠️ Внимание! Забраната се образува от несвършения вид: Не влизай! (НЕ: ~~Не влез!~~)',
      'Специална форма: идвам/дойда → Ела! / Елате! (много неправилна)',
    ],
    ttsNotes: [
      'Внимание! Забраната се образува от несвършения вид: Не влизай! НЕ: Не влез!',
      'Специална форма: идвам, дойда. Ела! Елате! Много неправилна.',
    ],
    ttsNoteModels: ['pro', 'pro'],
  } as GrammarTableExercise,

  // ─── ORDER 13 — Упр. 11 (стр. 94): Работете по модела от упр. 8 ──────────────
  {
    id: 'a2-l09-ex-11',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 11',
    instruction: 'Изберете правилната форма по модела.',
    order: 13,
    points: 3,
    layout: 'single',
    sentences: [
      { text: '– Може ли да отида на кино?\n– Да, **отиди**! (Модел)', blanks: [], correctAnswers: [], isExample: true },
      { text: '– Може ли да дойда с вас?\n– Да, _____!',
        blanks: [1], correctAnswers: ['Ела'], options: ['Ела', 'Идвай', 'Елате'], acceptableAnswers: [['Ела', 'ела']] },
      { text: '– Може ли да вляза?\n– Да, _____!',
        blanks: [1], correctAnswers: ['Влез'], options: ['Влез', 'Влизай', 'Влезте'], acceptableAnswers: [['Влез', 'влез']] },
      { text: '– Може ли да изляза?\n– Да, _____!',
        blanks: [1], correctAnswers: ['Излез'], options: ['Излез', 'Излизай', 'Излезте'], acceptableAnswers: [['Излез', 'излез']] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 14 — Упр. 12 (стр. 95): Работете по модела от упр. 10 ─────────────
  {
    id: 'a2-l09-ex-12',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 12',
    instruction: 'Изберете правилната отрицателна форма по модела.',
    order: 14,
    points: 4,
    layout: 'two-column',
    sentences: [
      { text: 'Елате! → **Не идвайте!** (Модел)', blanks: [], correctAnswers: [], isExample: true },
      { text: 'Влезте! → _____!',  blanks: [1], correctAnswers: ['Не влизайте'],  options: ['Не влизайте', 'Не влезте', 'Не влизай'],  acceptableAnswers: [['Не влизайте']] },
      { text: 'Излезте! → _____!', blanks: [1], correctAnswers: ['Не излизайте'], options: ['Не излизайте', 'Не излезте', 'Не излизай'], acceptableAnswers: [['Не излизайте']] },
      { text: 'Идете! → _____!',   blanks: [1], correctAnswers: ['Не отивайте'],  options: ['Не отивайте', 'Не отидете', 'Не отивай'], acceptableAnswers: [['Не отивайте']] },
      { text: 'Яжте! → _____!',    blanks: [1], correctAnswers: ['Не яжте'],      options: ['Не яжте', 'Не яждайте', 'Не яш'],        acceptableAnswers: [['Не яжте', 'Не яждайте']] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 15 — ДИАЛОГ 2 „В офиса" (стр. 95): Дамян и Мая ─────────────────
  {
    id: 'a2-l09-dialozi-02',
    type: 'a2-dialogues',
    title: 'ДИАЛОГ 2',
    subtitle: 'Дамян е директор на голяма фирма, а Мая работи като секретарка във фирмата. Сега е 8:00 часа сутринта.',
    prominentSubtitle: true,
    instruction: 'Натиснете всяка реплика, за да чуете произношението. После прочетете диалога на глас.',
    order: 15,
    sections: [
      {
        id: 'В ОФИСА',
        imageUrl: `${ASSET}/05-dialozi-2-ofis/01-damyan-maya-ofis.jpg`,
        lines: [
          { text: '– Добро утро, Мая. Днес имаме много работа. Първо се обадете на господин Петров и му кажете да дойде в 12:00 часа. След това веднага изпратете имейл на Димитър, пишете му, че не харесваме идеите му.', ttsText: '– Добро утро, Мая. Днес имаме много работа. Първо се обадете на господин Петров и му кажете да дойде в дванадесет часа. След това веднага изпратете имейл на Димитър, пишете му, че не харесваме идеите му.', voiceGender: 'male' },
          { text: '– Добре.', ttsText: '– добре.', voiceGender: 'female' },
          { text: '– После се срещнете с гостите от Италия и обядвайте с тях. Изберете хубав ресторант и платете сметката.', voiceGender: 'male' },
          { text: '– Добре.', voiceGender: 'female' },
          { text: '– Върнете се в офиса и питайте колко души искат да работят този уикенд.', voiceGender: 'male' },
          { text: '– Добре, но мисля...', voiceGender: 'female' },
          { text: '– Не мислете, Мая, а правете всичко бързо!', voiceGender: 'male' },
          { text: '– Да, добре.', voiceGender: 'female' },
          { text: '– Намерете по-добър шофьор. Този кара много бавно.', voiceGender: 'male' },
          { text: '– Добре.', voiceGender: 'female' },
          { text: '– Не забравяйте билетите за кино. Жена ми и аз ще ходим на кино. Купихте ли ги?', voiceGender: 'male' },
          { text: '– Да, разбира се.', voiceGender: 'female' },
          { text: '– Добре, сега имам важна среща. Влезте, господин Андреев. Мая, донесете кафе и бонбони!', voiceGender: 'male' },
          { text: '– Да, добре.', voiceGender: 'female' },
        ],
      },
    ],
  } as unknown as Exercise,

  // Упр. 13 — ⏭ SKIP по клиент (прочетете диалога по двойки)

  // ─── ORDER 16 — Упр. 14 (стр. 95): Отговорете на въпросите ─────────────────
  {
    id: 'a2-l09-ex-14',
    type: 'multiple_choice',
    title: 'УПРАЖНЕНИЕ 14',
    instruction: 'Изберете правилния отговор.',
    order: 16,
    points: 4,
    questions: [
      {
        question: 'Какъв е Дамян?',
        options: [
          'Учител',
          'Директор',
          'Шофьор',
          'Клиент',
        ],
        correctIndex: 1,
      },
      {
        question: 'Какво работи Мая?',
        options: [
          'Мениджър',
          'Секретарка',
          'Готвачка',
          'Продавачка',
        ],
        correctIndex: 1,
      },
      {
        question: 'Какво първо трябва да направи Мая?',
        options: [
          'Да купи билети за кино',
          'Да се срещне с гостите',
          'Да се обади на господин Петров',
          'Да намери нов шофьор',
        ],
        correctIndex: 2,
      },
      {
        question: 'Защо Мая трябва да намери по-добър шофьор?',
        options: [
          'Защото не идва на работа',
          'Защото е нов',
          'Защото кара много бавно',
          'Защото е скъп',
        ],
        correctIndex: 2,
      },
    ],
  } as MultipleChoiceExercise,

  // ─── ORDER 17 — ДИАЛОЗИ 3 (стр. 95–96): а. Мария, б. Диана, в. Дима ─────────
  {
    id: 'a2-l09-dialozi-03',
    type: 'a2-dialogues',
    title: 'ДИАЛОЗИ 3',
    instruction: 'Натиснете всяка реплика, за да чуете произношението. После прочетете диалозите на глас.',
    order: 17,
    sections: [
      {
        id: 'а. Мария — съпруг',
        imageUrl: `${ASSET}/06-dialozi-3/01-dve-zheni-smeh.jpg`,
        lines: [
          { text: '– Здравей, Мария! Как си?', voiceGender: 'female' },
          { text: '– Прекрасно! Омъжих се миналата седмица!', voiceGender: 'female' },
          { text: '– Наистина ли? Честито!', voiceGender: 'female' },
          { text: '– Благодаря, мъжът ми е интелигентен, забавен, мил, отговорен, щедър, смел. Има чувство за хумор. Ти как си? Знам, че и ти си омъжена, но не познавам мъжа ти.', voiceGender: 'female' },
          { text: '– Той не е много забавен, понякога е мил, понякога е малко груб, често е безотговорен, няма чувство за хумор, обикновено е скучен, но аз го обичам. За мен той е най-добрият човек.', voiceGender: 'female' },
        ],
      },
      {
        id: 'б. Диана — сестра',
        imageUrl: `${ASSET}/06-dialozi-3/02-dvama-mazhe-snimka.jpg`,
        lines: [
          { text: '– Виж, това е снимка на сестра ми. Казва се Диана.', voiceGender: 'male' },
          { text: '– Много е симпатична!', voiceGender: 'male' },
          { text: '– Да, тя е много красива, добра, търпелива и честна. Ние сме доста различни. Аз не обичам да уча, но тя е сериозна, учи много и иска да завърши медицина. Винаги е оптимист, не е песимист като мене.', voiceGender: 'male' },
          { text: '– Кога мога да видя сестра ти?', voiceGender: 'male' },
        ],
      },
      {
        id: 'в. Дима — парти в събота',
        imageUrl: `${ASSET}/06-dialozi-3/03-park-kuche.jpg`,
        lines: [
          { text: '– Здрасти, Дима. Ще ходиш ли на купона в събота?', voiceGender: 'female' },
          { text: '– Ако не съм уморена, ще отида. А ти?', voiceGender: 'female' },
          { text: '– Аз ще работя тази събота. Ако свърша рано, ще отида. Обади ми се. Знам, че ще има много хора. Ще е забавно и интересно. Ще прекараме добре.', voiceGender: 'female' },
          { text: '– Добре. Ако времето е хубаво, ще карам колело в парка и после ще ти се обадя за купона.', voiceGender: 'female' },
          { text: '– Лека вечер!', voiceGender: 'female' },
          { text: '– Подобно!', voiceGender: 'female', ttsText: '– Подобно.' },
        ],
      },
    ],
  } as unknown as Exercise,

  // Упр. 15 — ⏭ SKIP по клиент (прочетете диалозите по двойки)

  // ─── ORDER 18 — Упр. 16 (стр. 96): Отговорете на въпросите ──────────────────
  {
    id: 'a2-l09-ex-16',
    type: 'multiple_choice',
    title: 'УПРАЖНЕНИЕ 16',
    instruction: 'Изберете правилния отговор.',
    order: 18,
    points: 6,
    questions: [
      {
        question: 'Какъв е мъжът на Мария?',
        options: [
          'Скучен и груб',
          'Интелигентен, забавен и мил',
          'Безотговорен и песимист',
          'Строг и мълчалив',
        ],
        correctIndex: 1,
      },
      {
        question: 'Какъв е мъжът на приятелката на Мария?',
        options: [
          'Много весел и щедър',
          'Винаги мил и търпелив',
          'Често скучен и без чувство за хумор',
          'Смел и оптимист',
        ],
        correctIndex: 2,
      },
      {
        question: 'Защо приятелката на Мария обича мъжа си?',
        options: [
          'Защото е богат',
          'Защото е най-добрият човек за нея',
          'Защото е много забавен',
          'Защото пътува много',
        ],
        correctIndex: 1,
      },
      {
        question: 'Какво иска да завърши Диана?',
        options: [
          'Право',
          'Икономика',
          'Медицина',
          'Педагогика',
        ],
        correctIndex: 2,
      },
      {
        question: 'Какъв е братът на Диана?',
        options: [
          'Весел и общителен',
          'Строг и сериозен',
          'Лекар',
          'Няма информация за брат на Диана',
        ],
        correctIndex: 3,
      },
      {
        question: 'Какво ще правят Дима и приятелката й в събота?',
        options: [
          'Ще пътуват в чужбина',
          'Ще ходят на кино',
          'Може да отидат на купон',
          'Ще учат за изпити',
        ],
        correctIndex: 2,
      },
    ],
  } as MultipleChoiceExercise,

  // ─── ORDER 19 — ГРАМАТИКА 4 (стр. 96): ако / ще ──────────────────────────────
  {
    id: 'a2-l09-gramatika-04',
    type: 'a2-grammar-examples',
    title: 'ГРАМАТИКА 4',
    instruction: 'Запознайте се с условните изречения с ако и ще.',
    instructionKey: 'a2.gr.l09.akoShte',
    order: 19,
    layout: 'centered',
    examples: [
      {
        text: '**Ако** имам пари, **ще** купя красива къща.',
        ttsText: 'Ако имам пари, ще купя красива къща.',
      },
      {
        text: '**Ако** имам време, **ще** уча чужди езици.',
        ttsText: 'Ако имам време, ще уча чужди езици.',
      },
      {
        text: '**Ако** имам приятели от много страни, **ще** им отида на гости.',
        ttsText: 'Ако имам приятели от много страни, ще им отида на гости.',
      },
      {
        text: '**Ако** отида на гости при тях, **ще** видя много интересни неща.',
        ttsText: 'Ако отида на гости при тях, ще видя много интересни неща.',
        ttsPrompt: 'Read in clear, standard Bulgarian. No Russian accent. Natural Bulgarian intonation throughout.',
      },
    ],
  } as unknown as Exercise,

  // Упр. 17 — ⏭ SKIP по клиент (довършете изреченията)

  // ─── ORDER 20 — Упр. 18 (стр. 96): Довършете отговора — езици ───────────────
  {
    id: 'a2-l09-ex-18',
    type: 'reading_text',
    title: 'УПРАЖНЕНИЕ 18',
    instruction: 'Прочетете изреченията.',
    order: 20,
    showDictionary: true,
    images: [
      { imageUrl: `${ASSET}/07-upr-18-ezitsi/01-dvama-mazhe-ezitsi.jpg`, label: 'Езици и приятелство' },
    ],
    paragraphs: [
      'Ако имам време, ще уча чужди езици.\nАко уча езици, ще имам приятели от много страни.\nАко имам приятели от много страни, ще им отида на гости.\nАко отида на гости при тях, ще видя много интересни неща.\nАко видя интересни неща, ще ти разкажа за тях.\nАко ти разкажа за тях, ще учиш ли чужди езици?\n– Да, ако имам време …',
    ],
    ttsParagraphs: [
      'Ако имам време, ще уча чужди езици. Ако уча езици, ще имам приятели от много страни. Ако имам приятели от много страни, ще им отида на гости. Ако отида на гости при тях, ще видя много интересни неща. Ако видя интересни неща, ще ти разкажа за тях. Ако ти разкажа за тях, ще учиш ли чужди езици? Да, ако имам време…',
    ],
    paragraphVoiceGenders: ['male'],
  } as ReadingTextExercise,

  // ─── ORDER 20.5 — Една по-голяма обща снимка над двете части на упр. 19 ──────
  // Headerless (title: '' → не консумира номер, не рендира хедър/инструкция).
  // Заменя дублираните малки снимки в 19a и 19b с една голяма центрирана.
  {
    id: 'a2-l09-ex-19-image',
    type: 'reading_text',
    title: '',
    instruction: '',
    order: 20.5,
    noTranslation: true,
    hideText: false,
    images: [
      { imageUrl: `${ASSET}/08-dopalnitelni-upr-19-iva-vanya/01-iva-vanya.jpg`, label: 'Ива и Ваня' },
    ],
    paragraphs: [],
  } as unknown as Exercise,

  // ─── ORDER 21 — ДОП. Упр. (стр. 96): Бележка на Ива за Ваня — част а. ───────
  {
    id: 'a2-l09-ex-19a',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ',
    instruction: 'а. Попълнете бележката на Ива за Ваня.',
    order: 21,
    points: 8,
    layout: 'single',
    hideSentenceNumbers: true,
    sentences: [
      {
        text: 'Мила Ваня, утре не ставай рано.\n_____ телевизия.\nНе _____ апартамента.\nНе _____, има много храна в хладилника.\n_____ пица за обяд. Тя е във фризера.\n_____ на Иван за проекта.\n_____ гости.\n_____ на театър.\n_____ с приятели и вечеряй с тях навън.\nДо скоро и приятна почивка!',
        blanks: [1, 2, 3, 4, 5, 6, 7, 8],
        correctAnswers: ['Гледай', 'чисти', 'пазарувай', 'Яж', 'Помогни', 'Покани', 'Иди', 'Излез'],
        options: [
          ['Гледай', 'Гледайте', 'Виж'],
          ['чисти', 'чистиш', 'почисти'],
          ['пазарувай', 'пазаруваш', 'пазарувайте'],
          ['Яж', 'Яжте', 'Яде'],
          ['Помогни', 'Помагай', 'Помогнете'],
          ['Покани', 'Поканете', 'Покана'],
          ['Иди', 'Отиди', 'Отивай'],
          ['Излез', 'Излезте', 'Излизай'],
        ],
        acceptableAnswers: [['Гледай', 'гледай'], ['чисти', 'почисти'], ['пазарувай'], ['Яж', 'яж'], ['Помогни', 'помогни'], ['Покани', 'покани'], ['Иди', 'иди', 'Отиди', 'отиди'], ['Излез', 'излез']],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 22 — ДОП. Упр. (стр. 97): Бележка на Ива — част б. ───────────────
  {
    id: 'a2-l09-ex-19b',
    type: 'workbook_fill_blank',
    title: '',
    hideHeader: true,
    instruction: 'б. Ваня заминава за Италия за една седмица. Попълнете бележката.',
    order: 22,
    points: 9,
    layout: 'single',
    hideSentenceNumbers: true,
    sentences: [
      {
        text: 'Ива,\nМоля те, всеки ден ставай рано.\nНе _____ за работа. (закъснявам)\n_____ топла храна. (купувам)\n_____ плодове и зеленчуци. (купувам)\n_____ с приятели след работа в парка. (разхождам се)\n_____ рано вкъщи. (връщам се)\nНе _____ преди 11:00. (закъснявам)\nНе _____ ми имейли. (пиша)\n_____ ми по Скайп. (обаждам се)\n_____ след работа в парка. (обядвам)',
        blanks: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        correctAnswers: ['закъснявай', 'Купи', 'Купи', 'Разходи се', 'Върни се', 'закъснявай', 'пиши', 'Обади се', 'Обядвай'],
        options: [
          ['закъснявай', 'закъснее', 'закъсняваш'],
          ['Купи', 'Купувай', 'Купете'],
          ['Купи', 'Купувай', 'Купете'],
          ['Разходи се', 'Разхождай се', 'Разходете се'],
          ['Върни се', 'Връщай се', 'Върнете се'],
          ['закъснявай', 'закъснееш', 'закъснеете'],
          ['пиши', 'пишете', 'пишеш'],
          ['Обади се', 'Обаждай се', 'Обадете се'],
          ['Обядвай', 'Обяждай', 'Обядвайте'],
        ],
        acceptableAnswers: [
          ['закъснявай'],
          ['Купи', 'купи', 'Купувай', 'купувай'],
          ['Купи', 'купи', 'Купувай', 'купувай'],
          ['Разходи се', 'разходи се', 'Разхождай се', 'разхождай се'],
          ['Върни се', 'върни се', 'Връщай се', 'връщай се'],
          ['закъснявай'],
          ['пиши'],
          ['Обади се', 'обади се'],
          ['Обядвай', 'обядвай'],
        ],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 23 — Упр. 20 (стр. 97): „Кой е добър приятел?" ───────────────────
  {
    id: 'a2-l09-tekst-priyatel',
    type: 'reading_text',
    title: 'УПРАЖНЕНИЕ 20',
    textTitle: 'Кой е добър приятел?',
    instruction: 'Изслушайте текста и след това го прочетете сами.',
    order: 23,
    showDictionary: true,
    paragraphs: [
      'Силвия, 27 години\nЗа мен добрият приятел е винаги до теб, когато имаш нужда от него. Той е готов да говори с теб за проблемите ти, да ти даде съвет. Аз имам много приятели. С тях се чувствам чудесно и разчитам на тях. Обичам приятелите си!',
      'Калин, 22 години\nТрябва да имаме общи интереси, да правим различни неща заедно и да се чувстваме добре. За мен добрият приятел е отговорен, сериозен. Най-важното е винаги да ти казва истината. Ако разбера, че някой ме лъже, това е краят на приятелството ни.',
      'Пепа, 17 години\nДобрият приятел е този, който е богат. Ако няма пари, не е интересно. Нямам бедни приятели.',
      'Светла, 50 години\nС добрия приятел можеш да правиш всичко — да говориш и да мълчиш, да се смееш и да плачеш, да се чувстваш спокойна и свободна.',
      'Стефана, 45 години\nСветът се променя, променя се и идеята му за приятелство. Когато бях млада, добър приятел беше всеки, който е забавен, с чувство за хумор. Сега добър приятел за мен е толерантен, спокоен и сърдечен човек.',
    ],
    ttsParagraphs: [
      'Силвия, двадесет и седем години. За мен добрият приятел е винаги до теб, когато имаш нужда от него. Той е готов да говори с теб за проблемите ти, да ти даде съвет. Аз имам много приятели. С тях се чувствам чудесно и разчитам на тях. Обичам приятелите си!',
      'Калин, двадесет и две години. Трябва да имаме общи интереси, да правим различни неща заедно и да се чувстваме добре. За мен добрият приятел е отговорен, сериозен. Най-важното е винаги да ти казва истината. Ако разбера, че някой ме лъже, това е краят на приятелството ни.',
      'Пепа, седемнадесет години. Добрият приятел е този, който е богат. Ако няма пари, не е интересно. Нямам бедни приятели.',
      'Светла, петдесет години. С добрия приятел можеш да правиш всичко — да говориш и да мълчиш, да се смееш и да плачеш, да се чувстваш спокойна и свободна.',
      'Стефана, четиридесет и пет години. Светът се променя, променя се и идеята му за приятелство. Когато бях млада, добър приятел беше всеки, който е забавен, с чувство за хумор. Сега добър приятел за мен е толерантен, спокоен и сърдечен човек.',
    ],
    paragraphVoiceGenders: ['female', 'male', 'female', 'female', 'female'],
  } as ReadingTextExercise,

  // Упр. 21 — ⏭ SKIP по клиент (отговорете на въпроса „Кой е добър приятел?")

  // ─── ORDER 24 — Упр. 22 (стр. 97): Свържете думите по модела ────────────────
  {
    id: 'a2-l09-ex-22',
    type: 'a2-match-pairs',
    title: 'УПРАЖНЕНИЕ 22',
    instruction: 'Свържете антонимите от двете колони.',
    model: 'висок – нисък',
    order: 24,
    points: 9,
    pairs: [
      { id: 'p1', left: 'търпелив',    correctRight: 'нетърпелив' },
      { id: 'p2', left: 'интелигентен', correctRight: 'глупав' },
      { id: 'p3', left: 'оптимист',    correctRight: 'песимист' },
      { id: 'p4', left: 'честен',      correctRight: 'нечестен' },
      { id: 'p5', left: 'добър',       correctRight: 'лош' },
      { id: 'p6', left: 'забавен',     correctRight: 'скучен' },
      { id: 'p7', left: 'отговорен',   correctRight: 'безотговорен' },
      { id: 'p8', left: 'мил',         correctRight: 'груб' },
      { id: 'p9', left: 'сериозен',    correctRight: 'несериозен' },
    ],
    shuffledRights: ['нетърпелив', 'лош', 'глупав', 'безотговорен', 'нечестен', 'груб', 'несериозен', 'песимист', 'скучен'],
  } as unknown as Exercise,

  // ─── ORDER 25 — Упр. 23 (стр. 97): Напишете подходящата дума ────────────────
  {
    id: 'a2-l09-ex-23',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 23',
    instruction: 'Изберете подходящата дума, за да довършите изречението.',
    order: 25,
    points: 5,
    layout: 'single',
    sentences: [
      { text: 'Човек, който е на 80 години, е **стар**. (Модел)', blanks: [], correctAnswers: [], isExample: true },
      { text: 'Човек, който знае много, е _____.',
        blanks: [1], correctAnswers: ['умен'], options: ['умен', 'мързелив', 'уморен', 'гладен'], acceptableAnswers: [['умен']] },
      { text: 'Човек, който не иска да работи, е _____.',
        blanks: [1], correctAnswers: ['мързелив'], options: ['мързелив', 'уморен', 'болен', 'скучен'], acceptableAnswers: [['мързелив']] },
      { text: 'Човек, който работи много, е _____.',
        blanks: [1], correctAnswers: ['работлив'], options: ['работлив', 'умен', 'мързелив', 'гладен'], acceptableAnswers: [['работлив']] },
      { text: 'Човек, който има висока температура, е _____.',
        blanks: [1], correctAnswers: ['болен'], options: ['болен', 'уморен', 'тъжен', 'разстроен'], acceptableAnswers: [['болен']] },
      { text: 'Човек, който плаче, е _____.',
        blanks: [1], correctAnswers: ['тъжен'], options: ['тъжен', 'уморен', 'болен', 'гладен'], acceptableAnswers: [['тъжен']] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 26 — Упр. 24 (стр. 98): ТЕКСТ „Кой сезон предпочиташ?" ────────────
  {
    id: 'a2-l09-tekst-sezoni',
    type: 'reading_text',
    title: 'ТЕКСТ',
    textTitle: 'Кой сезон предпочиташ?',
    instruction: 'Изслушайте текста и след това го прочетете сами.',
    order: 26,
    showDictionary: true,
    images: [
      { imageUrl: `${ASSET}/09-tekst-sezoni/01-chetiri-sezona.jpg`, label: 'Четирите сезона' },
    ],
    paragraphs: [
      'Всеки има любим сезон. Сезонът, който обичате най-много, показва характера Ви. Така казват психолозите.',
      'Хората, които обичат зимата, са често затворени, със силен характер и винаги знаят какво точно искат. Имат успех във всичко. Те ценят много комфорта и парите. Готови са да направят всичко за хората, които обичат — семейството и приятелите си. Може да разчитате на тях, когато имате проблем.',
      'Хората, които обичат пролетта, са весели, с мек характер, забавни, обичат приключенията. Всички ги харесват, защото лесно се общува с тях, но не можеш да разчиташ на тях — те са непостоянни и често мислят само за себе си.',
      'Хората, които обичат лятото, са родени лидери. Имат много енергия, големи идеи и планове. Те са упорити, верни. Търсят интересен живот. Когато обичат, обичат много силно. Мразят лъжата. Рядко правят компромиси. Те са чудесни приятели.',
      'Хората, които предпочитат есента, са романтици, характерът им е променлив — като сезона, който обичат. Имат малко приятели, те нямат нужда от много хора, обичат спокойствието и тишината. Страхуват се от нови и непознати места. Те са много интересни, защото винаги имат оригинални идеи и никога не знаеш какво да очакваш от тях.',
    ],
    ttsParagraphs: [
      'Всеки има любим сезон. Сезонът, който обичате най-много, показва характера Ви. Така казват психолозите.',
      'Хората, които обичат зимата, са често затворени, със силен характер и винаги знаят какво точно искат. Имат успех във всичко. Те ценят много комфорта и парите. Готови са да направят всичко за хората, които обичат — семейството и приятелите си. Може да разчитате на тях, когато имате проблем.',
      'Хората, които обичат пролетта, са весели, с мек характер, забавни, обичат приключенията. Всички ги харесват, защото лесно се общува с тях, но не можеш да разчиташ на тях — те са непостоянни и често мислят само за себе си.',
      'Хората, които обичат лятото, са родени лидери. Имат много енергия, големи идеи и планове. Те са упорити, верни. Търсят интересен живот. Когато обичат, обичат много силно. Мразят лъжата. Рядко правят компромиси. Те са чудесни приятели.',
      'Хората, които предпочитат есента, са романтици, характерът им е променлив — като сезона, който обичат. Имат малко приятели, те нямат нужда от много хора, обичат спокойствието и тишината. Страхуват се от нови и непознати места. Те са много интересни, защото винаги имат оригинални идеи и никога не знаеш какво да очакваш от тях.',
    ],
    paragraphVoiceGenders: ['female', 'female', 'female', 'female', 'female'],
  } as ReadingTextExercise,

  // Упр. 25 — ⏭ SKIP по клиент (кой сезон обичате?)

  // ─── ORDER 27 — Упр. 26 (стр. 98): Сезон по описание ────────────────────────
  {
    id: 'a2-l09-ex-26',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 26',
    instruction: 'Изберете правилния сезон за всяко описание.',
    order: 27,
    points: 4,
    layout: 'single',
    sentences: [
      { text: 'романтик, с променлив характер, затворен, интересен → _____',
        blanks: [1], correctAnswers: ['есен'], options: ['есен', 'пролет', 'зима', 'лято'], acceptableAnswers: [['есен']] },
      { text: 'забавен, непостоянен, общителен, весел → _____',
        blanks: [1], correctAnswers: ['пролет'], options: ['пролет', 'лято', 'есен', 'зима'], acceptableAnswers: [['пролет']] },
      { text: 'затворен, със силен характер, знае какво иска, обича комфорта → _____',
        blanks: [1], correctAnswers: ['зима'], options: ['зима', 'лято', 'есен', 'пролет'], acceptableAnswers: [['зима']] },
      { text: 'лидер, енергичен, упорит, безкомпромисен → _____',
        blanks: [1], correctAnswers: ['лято'], options: ['лято', 'зима', 'пролет', 'есен'], acceptableAnswers: [['лято']] },
    ],
  } as WorkbookFillBlankExercise,

];

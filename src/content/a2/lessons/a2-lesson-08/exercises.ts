import type {
  Exercise,
  ImageLabelingExercise,
  DialoguesExercise,
  GrammarTableExercise,
  WorkbookFillBlankExercise,
  IllustratedCardsExercise,
  WordOrderExercise,
  TrueFalseExercise,
  MultipleChoiceExercise,
  ReadingTextExercise,
  DragToColumnsExercise,
} from '@/content/types';

// ⚠️ Order follows the A2 textbook „Хоби и свободно време" (стр. 81–90).

const ASSET = '/assets/a2-lesson-08';

const GEMINI_BG_SMOOTH_PROMPT =
  'Read aloud clearly and smoothly in standard Bulgarian with correct Bulgarian stress. Do not split words into syllables and do not use any foreign or Russian accent.';

export const exercises: Exercise[] = [

  // ─── ORDER 1 — Упр. 1 (стр. 81): Напишете подходящите фрази под картинките ──
  {
    id: 'a2-l08-ex-01',
    type: 'image_labeling',
    title: 'УПРАЖНЕНИЕ 1',
    instruction: 'Изберете правилната фраза под всяка картинка.',
    order: 1,
    points: 4,
    displayType: 'default',
    columns: 2,
    images: [
      { id: 'tenis-na-masa', imageUrl: `${ASSET}/01-upr-01-sport/01-tenis-na-masa.jpg`, correctLabel: 'играя тенис на маса', imageOptions: ['играя тенис на маса', 'играя волейбол', 'играя баскетбол', 'ходя на фитнес'] },
      { id: 'voleybol',      imageUrl: `${ASSET}/01-upr-01-sport/02-voleybol.jpg`,      correctLabel: 'играя волейбол',       imageOptions: ['играя волейбол', 'играя тенис на маса', 'играя баскетбол', 'ходя на фитнес'] },
      { id: 'fitnes',        imageUrl: `${ASSET}/01-upr-01-sport/03-fitnes.jpg`,        correctLabel: 'ходя на фитнес',       imageOptions: ['ходя на фитнес', 'играя баскетбол', 'играя волейбол', 'играя тенис на маса'] },
      { id: 'basketbol',     imageUrl: `${ASSET}/01-upr-01-sport/04-basketbol.jpg`,     correctLabel: 'играя баскетбол',      imageOptions: ['играя баскетбол', 'ходя на фитнес', 'играя волейбол', 'играя тенис на маса'] },
    ],
    options: ['играя баскетбол', 'играя волейбол', 'играя тенис на маса', 'ходя на фитнес'],
  } as ImageLabelingExercise,

  // ─── ORDER 2 — ДИАЛОЗИ 1 (стр. 81–82): Хоби и свободно време ───────────────
  {
    id: 'a2-l08-dialozi-01',
    type: 'dialogues',
    title: 'ДИАЛОЗИ 1',
    instruction: 'Натиснете всяка реплика, за да чуете произношението. После прочетете диалозите на глас.',
    order: 2,
    sections: [
      {
        id: 'а. Какво прави вчера',
        imageUrl: `${ASSET}/02-dialozi-1/01-dve-momicheta.jpg`,
        lines: [
          { text: '– Ана, какво прави вчера?', voiceGender: 'male' },
          { text: '– Сутринта отидох на училище. Следобед четох интересна книга и после се срещнах с приятели. Отидохме на ресторант. Там ядохме пица. Беше много приятно. А ти?', voiceGender: 'female',
            ttsText: '– Сутринта отидох на училище. Следобед четох интересна книга и после се сре́щнах с приятели. Отидохме на ресторант. Там ядохме пица. Беше много приятно. А ти?' },
          { text: '– Аз работих до късно. Нищо интересно.', voiceGender: 'male' },
        ],
      },
      {
        id: 'б. Как беше купонът снощи',
        imageUrl: `${ASSET}/02-dialozi-1/02-zhena-mazh-kupon.jpg`,
        lines: [
          { text: '– Здравей, как беше купонът снощи?', voiceGender: 'female' },
          { text: '– Беше много забавно. Запознах се с нови хора, храната беше страхотна. Ядохме много! Танцувахме, две момчета свириха на китара. Защо не дойде? Чакахме те.', voiceGender: 'male' },
          { text: '– Съжалявам, но бях заета. Трябваше да свърша един проект. Върнах се вкъщи в 10:00 часа и бях много уморена. Легнах си веднага.', voiceGender: 'female',
            ttsText: '– Съжалявам, но бях заета. Трябваше да свърша един проект. Върнах се вкъщи в десет часа и бях много уморена. Легнах си веднага.' },
          { text: '– Съжалявам. Следващата седмица пак ще има купон. Надявам се да дойдеш.', voiceGender: 'male' },
          { text: '– Ако нямам много работа, ще дойда.', voiceGender: 'female' },
          { text: '– Ти винаги мислиш за работа! Нямаш свободно време. Не се забавляваш, а си на 25 години!', voiceGender: 'male' },
          { text: '– Не е вярно, имам хоби — много обичам да рисувам и да чета.', voiceGender: 'female' },
          { text: '– Не знаех, че рисуваш. Аз също рисувам. Всяка събота ходя на курс. Курсът е безплатен. Искаш ли да дойдеш с мен?', voiceGender: 'male',
            ttsText: '– Не знаех, че рисуваш. Аз също рисувам. Всяка събота ходя на курс. Курсът е безпла́тен. Искаш ли да дойдеш с мен?' },
          { text: '– Да, разбира се. Миналата година ходих на курс. Беше много скъп. Дадох много пари. Много ти благодаря за поканата.', voiceGender: 'female' },
          { text: '– Няма защо, до скоро.', voiceGender: 'male' },
        ],
      },
      {
        id: 'в. Закъсняваш!',
        imageUrl: `${ASSET}/02-dialozi-1/04-simo-piti.jpg`,
        lines: [
          { text: '– Закъсняваш! Срещата беше в 5:30, а сега е 5:45. Защо не се обади?', voiceGender: 'female',
            ttsText: '– Закъсняваш! Срещата беше в пет и трийсет, а сега е пет и четирийсет и пет. Защо не се обади?' },
          { text: '– Съжалявам, но аз дойдох точно в 5:30. Ти не беше тук и аз влязох в мола за няколко минути, после излязох, чаках малко и пак влязох. Беше ми студено навън. Забравих телефона си вкъщи и затова не ти се обадих. Ти кога дойде?', voiceGender: 'male',
            ttsText: '– Съжалявам, но аз дойдох точно в пет и трийсет. Ти не беше тук и аз влязох в мола за няколко минути, после излязох, чаках малко и пак влязох. Беше ми студено навън. Забравих телефона си вкъщи и затова не ти се обадих. Ти кога дойде?' },
          { text: '– Дойдох в 5:40, видях, че те няма и също влязох в мола. Наистина е ужасно студено!', voiceGender: 'female',
            ttsText: '– Дойдох в пет и четирийсет, видях, че те няма и също влязох в мола. Наистина е ужасно студено!' },
          { text: '– Хайде да пием нещо топло! Аз черпя.', voiceGender: 'male' },
        ],
      },
      {
        id: 'г. Как беше почивката',
        imageUrl: `${ASSET}/02-dialozi-1/03-zima-na-zhivo.jpg`,
        lines: [
          { text: '– Здравей, Симо! Как беше почивката? Къде беше?', voiceGender: 'female' },
          { text: '– Бях в Созопол. Беше страхотно! Морето, хората, храната — всичко беше прекрасно. Разходих се, плувах, танцувах, спортувах. Как я прекара?', voiceGender: 'male' },
          { text: '– Останах вкъщи. Не отидох никъде. Четох за изпити.', voiceGender: 'female' },
          { text: '– Къде са Пламен и Ели?', voiceGender: 'male' },
          { text: '– На екскурзия в Испания. Заминаха вчера. Ще се върнат след две седмици.', voiceGender: 'female' },
        ],
      },
    ],
  } as DialoguesExercise,

  // Упр. 2 — ⏭ SKIP по клиент (четене по двойки)
  // Упр. 3 — ⏭ SKIP по клиент (разговор по двойки)

  // ─── ORDER 3 — ГРАМАТИКА 1 (стр. 82): Минало свършено — ОХ група ────────────
  {
    id: 'a2-l08-gramatika-01',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 1',
    instruction: 'Запознайте се с минало свършено на глаголите от ОХ група.',
    instructionKey: 'a2.gr.l08.minaloOh',
    order: 3,
    tableTitle: 'Минало свършено — ОХ група (отида → отидох)',
    columns: ['(+)'],
    rows: [
      { pronoun: 'аз',        cells: ['отидох'],   ttsText: 'аз — отидох',          ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'ти',        cells: ['отиде'],    ttsText: 'ти — отиде',           ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'той/тя/то', cells: ['отиде'],    ttsText: 'той, тя, то — отиде',  ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'ние',       cells: ['отидохме'], ttsText: 'ние — отидохме',       ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'Вие',       cells: ['отидохте'], ttsText: 'Вие — отидохте',       ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'те',        cells: ['отидоха'],  ttsText: 'те — отидоха',         ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
    ],
    notes: [
      'Глаголи от ОХ група: дойдох, дадох, четох, ядох, влязох, излязох, слязох',
      '⚠️ Внимание! Специални форми: аз **влязох** / аз **излязох**\nТи **влезе** / Ти **излезе**',
      'Аз **не** отидох. Ти отиде **ли**?',
    ],
    ttsNotes: [
      'Глаголи от ОХ група: дойдох, дадох, четох, ядох, влязох, излязох, слязох.',
      'Внимание! Специални форми: аз влязох / аз излязох. Ти влезе / Ти излезе.',
      'Аз не отидох. Ти отиде ли?',
    ],
    ttsNoteModels: ['pro', 'pro', 'pro'],
  } as GrammarTableExercise,

  // Упр. 4 — ⏭ SKIP по клиент (довършете изреченията по модела)

  // ─── ORDER 4 — Упр. 5 (стр. 83): Попълнете с правилната форма на глагола отида
  {
    id: 'a2-l08-ex-05',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 5',
    instruction: 'Изберете правилната форма на глагола **отида** в минало свършено.',
    order: 4,
    points: 6,
    layout: 'single',
    sentences: [
      { text: 'Аз **отидох** на кино. (Модел)', blanks: [], correctAnswers: [], isExample: true },
      { text: 'Ти _____ на планината.',   blanks: [1], correctAnswers: ['отиде'],    options: ['отидох', 'отиде', 'отидохте'], acceptableAnswers: [['отиде']] },
      { text: 'Той _____ на море.',        blanks: [1], correctAnswers: ['отиде'],    options: ['отидох', 'отиде', 'отидоха'],  acceptableAnswers: [['отиде']] },
      { text: 'Тя _____ на концерт.',      blanks: [1], correctAnswers: ['отиде'],    options: ['отидох', 'отиде', 'отидохме'], acceptableAnswers: [['отиде']] },
      { text: 'Ние _____ на екскурзия.',   blanks: [1], correctAnswers: ['отидохме'], options: ['отидох', 'отидохме', 'отидоха'], acceptableAnswers: [['отидохме']] },
      { text: 'Вие _____ на почивка.',     blanks: [1], correctAnswers: ['отидохте'], options: ['отидох', 'отидохте', 'отидоха'], acceptableAnswers: [['отидохте']] },
      { text: 'Те _____ на театър.',       blanks: [1], correctAnswers: ['отидоха'],  options: ['отидох', 'отидохте', 'отидоха'], acceptableAnswers: [['отидоха']] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 5 — Упр. 6 (стр. 83): Отговорете на въпросите ────────────────────
  // Упражнението е Q&A по модел — имплементирано като dropdown_match с отговор да/не
  {
    id: 'a2-l08-ex-06',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 6',
    instruction: 'Изберете правилния отговор по модела.',
    subtitle: 'Модел: – Ти отиде ли на кино? – Да, аз отидох на кино.',
    order: 5,
    points: 8,
    layout: 'single',
    sentences: [
      { text: '– Ти отиде ли на кино?\n– Да, аз **отидох** на кино. (Модел)', blanks: [], correctAnswers: [], isExample: true },
      { text: '– Той яде ли салатата?\n– Да, той _____.',
        blanks: [1], correctAnswers: ['яде салатата'], options: ['яде салатата', 'ядоха салатата', 'ядохме салатата'], acceptableAnswers: [['яде салатата']] },
      { text: '– Тя дойде ли в 6:00 часа?\n– Не, _____.',
        blanks: [1], correctAnswers: ['тя не дойде в 6:00 часа'], options: ['тя не дойде в 6:00 часа', 'тя не дойдохме', 'тя не дойдоха'], acceptableAnswers: [['тя не дойде в 6:00 часа', 'не дойде']] },
      { text: '– Вие дадохте ли книгите?\n– Да, _____.',
        blanks: [1], correctAnswers: ['ние дадохме книгите'], options: ['ние дадохме книгите', 'аз дадох книгите', 'те дадоха книгите'], acceptableAnswers: [['ние дадохме книгите', 'дадохме книгите']] },
      { text: '– Те отидоха ли в офиса?\n– Не, _____.',
        blanks: [1], correctAnswers: ['те не отидоха в офиса'], options: ['те не отидоха в офиса', 'те не отиде', 'те не отидох'], acceptableAnswers: [['те не отидоха в офиса', 'не отидоха']] },
      { text: '– Той излезе ли от пощата?\n– Не, _____.',
        blanks: [1], correctAnswers: ['той не излезе от пощата'], options: ['той не излезе от пощата', 'той не излязох', 'той не излязохме'], acceptableAnswers: [['той не излезе от пощата', 'не излезе']] },
      { text: '– Ти яде ли за вечеря?\n– Да, _____.',
        blanks: [1], correctAnswers: ['аз ядох за вечеря'], options: ['аз ядох за вечеря', 'аз яде за вечеря', 'аз ядохме за вечеря'], acceptableAnswers: [['аз ядох за вечеря', 'ядох за вечеря']] },
      { text: '– Той чете ли снощи?\n– Да, _____.',
        blanks: [1], correctAnswers: ['той чете снощи'], options: ['той чете снощи', 'той четох снощи', 'той четоха снощи'], acceptableAnswers: [['той чете снощи']] },
      { text: '– Те влязоха ли в банката?\n– Да, _____.',
        blanks: [1], correctAnswers: ['те влязоха в банката'], options: ['те влязоха в банката', 'те влезе в банката', 'те влязохме в банката'], acceptableAnswers: [['те влязоха в банката']] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 6 — НОВИ ДУМИ 1 (стр. 83–84): Хоби ─────────────────────────────
  {
    id: 'a2-l08-novi-dumi-1',
    type: 'illustrated_cards',
    title: 'НОВИ ДУМИ 1',
    order: 6,
    cards: [
      { id: 'futbol',         imageUrl: `${ASSET}/03-novi-dumi-1-hobi/01-futbol.jpg`,         label: 'играя футбол',        ttsLabel: 'играя футбол',        ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { id: 'tenis',          imageUrl: `${ASSET}/03-novi-dumi-1-hobi/02-tenis.jpg`,           label: 'играя тенис',         ttsLabel: 'играя тенис',         ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { id: 'basketbol',      imageUrl: `${ASSET}/03-novi-dumi-1-hobi/03-basketbol.jpg`,       label: 'играя баскетбол',     ttsLabel: 'играя баскетбол',     ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { id: 'voleybol',       imageUrl: `${ASSET}/03-novi-dumi-1-hobi/04-voleybol.jpg`,        label: 'играя волейбол',      ttsLabel: 'играя волейбол',      ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { id: 'shah',           imageUrl: `${ASSET}/03-novi-dumi-1-hobi/05-shah.jpg`,            label: 'играя шах',           ttsLabel: 'играя шах',           ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { id: 'karti',          imageUrl: `${ASSET}/03-novi-dumi-1-hobi/06-karti.jpg`,           label: 'играя карти',         ttsLabel: 'играя карти',         ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { id: 'ski',            imageUrl: `${ASSET}/03-novi-dumi-1-hobi/07-ski.jpg`,             label: 'карам ски',           ttsLabel: 'карам ски',           ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { id: 'kolelo',         imageUrl: `${ASSET}/03-novi-dumi-1-hobi/08-kolelo.jpg`,          label: 'карам колело',        ttsLabel: 'карам колело',        ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { id: 'sarf',           imageUrl: `${ASSET}/03-novi-dumi-1-hobi/09-sarf.jpg`,            label: 'карам сърф',          ttsLabel: 'карам сърф',          ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { id: 'knigi',          imageUrl: `${ASSET}/03-novi-dumi-1-hobi/10-knigi.jpg`,           label: 'чета книги',          ttsLabel: 'чета книги',          ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { id: 'vestnitsi',      imageUrl: `${ASSET}/03-novi-dumi-1-hobi/11-vestnitsi.jpg`,       label: 'чета вестници',       ttsLabel: 'чета вестници',       ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { id: 'spisania',       imageUrl: `${ASSET}/03-novi-dumi-1-hobi/12-spisania.jpg`,        label: 'чета списания',       ttsLabel: 'чета списания',       ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { id: 'filmi',          imageUrl: `${ASSET}/03-novi-dumi-1-hobi/13-filmi.jpg`,           label: 'гледам филми',        ttsLabel: 'гледам филми',        ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { id: 'televiziya',     imageUrl: `${ASSET}/03-novi-dumi-1-hobi/14-televiziya.jpg`,      label: 'гледам телевизия',    ttsLabel: 'гледам телевизия',    ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { id: 'mach',           imageUrl: `${ASSET}/03-novi-dumi-1-hobi/15-mach.jpg`,            label: 'гледам мач',          ttsLabel: 'гледам мач',          ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { id: 'radio',          imageUrl: `${ASSET}/03-novi-dumi-1-hobi/16-radio.jpg`,           label: 'слушам радио',        ttsLabel: 'слушам радио',        ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { id: 'muzika',         imageUrl: `${ASSET}/03-novi-dumi-1-hobi/17-muzika.jpg`,          label: 'слушам музика',       ttsLabel: 'слушам музика',       ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { id: 'gimnastika',     imageUrl: `${ASSET}/03-novi-dumi-1-hobi/18-gimnastika.jpg`,      label: 'правя гимнастика',    ttsLabel: 'правя гимнастика',    ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { id: 'snimki',         imageUrl: `${ASSET}/03-novi-dumi-1-hobi/19-snimki.jpg`,          label: 'правя снимки',        ttsLabel: 'правя снимки',        ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { id: 'narodni-tantsi', imageUrl: `${ASSET}/03-novi-dumi-1-hobi/20-narodni-tantsi.jpg`,  label: 'танцувам народни танци', ttsLabel: 'танцувам народни танци', ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { id: 'moderni-tantsi', imageUrl: `${ASSET}/03-novi-dumi-1-hobi/21-moderni-tantsi.jpg`,  label: 'танцувам модерни танци', ttsLabel: 'танцувам модерни танци', ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { id: 'planina',        imageUrl: `${ASSET}/03-novi-dumi-1-hobi/22-planina.jpg`,         label: 'ходя на планината',   ttsLabel: 'ходя на планината',   ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { id: 'teatar',         imageUrl: `${ASSET}/03-novi-dumi-1-hobi/23-teatar.jpg`,          label: 'ходя на театър',      ttsLabel: 'ходя на театър',      ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { id: 'kontsert',       imageUrl: `${ASSET}/03-novi-dumi-1-hobi/24-kontsert.jpg`,        label: 'ходя на концерт',     ttsLabel: 'ходя на концерт',     ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { id: 'balet',          imageUrl: `${ASSET}/03-novi-dumi-1-hobi/25-balet.jpg`,           label: 'ходя на балет',       ttsLabel: 'ходя на балет',       ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { id: 'fitnes',         imageUrl: `${ASSET}/03-novi-dumi-1-hobi/26-fitnes.jpg`,          label: 'ходя на фитнес',      ttsLabel: 'ходя на фитнес',      ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { id: 'piano',          imageUrl: `${ASSET}/03-novi-dumi-1-hobi/27-piano.jpg`,           label: 'свиря на пиано',      ttsLabel: 'свиря на пиано',      ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { id: 'kitara',         imageUrl: `${ASSET}/03-novi-dumi-1-hobi/28-kitara.jpg`,          label: 'свиря на китара',     ttsLabel: 'свиря на китара',     ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { id: 'baseyn',         imageUrl: `${ASSET}/03-novi-dumi-1-hobi/29-baseyn.jpg`,          label: 'плувам в басейна',    ttsLabel: 'плувам в басейна',    ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { id: 'reka',           imageUrl: `${ASSET}/03-novi-dumi-1-hobi/30-reka.jpg`,            label: 'плувам в реката',     ttsLabel: 'плувам в реката',     ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { id: 'more',           imageUrl: `${ASSET}/03-novi-dumi-1-hobi/31-more.jpg`,            label: 'плувам в морето',     ttsLabel: 'плувам в морето',     ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { id: 'ezero',          imageUrl: `${ASSET}/03-novi-dumi-1-hobi/32-ezero.jpg`,           label: 'плувам в езерото',    ttsLabel: 'плувам в езерото',    ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { id: 'peya',           imageUrl: `${ASSET}/03-novi-dumi-1-hobi/33-peya.jpg`,            label: 'пея',                 ttsLabel: 'пея',                 ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { id: 'risuvam',        imageUrl: `${ASSET}/03-novi-dumi-1-hobi/34-risuvam.jpg`,         label: 'рисувам',             ttsLabel: 'рисувам',             ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { id: 'sportuvam',      imageUrl: `${ASSET}/03-novi-dumi-1-hobi/35-sportuvam.jpg`,       label: 'спортувам',           ttsLabel: 'спортувам',           ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
    ],
  } as IllustratedCardsExercise,

  // Упр. 8 — ⏭ SKIP по клиент (намерете някой от групата, попълнете таблицата)

  // ─── ORDER 7 — Упр. 9 (стр. 84): Напишете подходящ глагол в минало свършено ─
  // Клиентът задава: избере подходящ глагол и го попълни в 1 л. ед.ч.
  // Пул: плувам→плувах, карам→карах, свиря→свирих, ходя→ходих,
  //       правя→правих, слушам→слушах, чета→четох, играя→играх,
  //       рисувам→рисувах, гледам→гледах
  {
    id: 'a2-l08-ex-09',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 9',
    instruction: 'Изберете подходящ глагол от списъка и го попълнете в минало свършено, 1 л. ед.ч.',
    subtitle: 'Плувам, карам, свиря, ходя, правя, слушам, чета, играя, рисувам, гледам',
    order: 7,
    points: 10,
    layout: 'single',
    sentences: [
      { text: '**Четох** вестник. (Модел)', blanks: [], correctAnswers: [], isExample: true },
      { text: '_____ в басейна.',       blanks: [1], correctAnswers: ['Плувах'],   options: ['Плувах', 'Карах', 'Ходих', 'Гледах'],   acceptableAnswers: [['Плувах', 'плувах']] },
      { text: '_____ на пиано.',        blanks: [1], correctAnswers: ['Свирих'],   options: ['Свирих', 'Слушах', 'Играх', 'Рисувах'], acceptableAnswers: [['Свирих', 'свирих']] },
      { text: '_____ на концерт.',      blanks: [1], correctAnswers: ['Ходих'],    options: ['Ходих', 'Гледах', 'Свирих', 'Карах'],   acceptableAnswers: [['Ходих', 'ходих']] },
      { text: '_____ телевизия.',       blanks: [1], correctAnswers: ['Гледах'],   options: ['Гледах', 'Слушах', 'Четох', 'Плувах'],  acceptableAnswers: [['Гледах', 'гледах']] },
      { text: '_____ ски.',             blanks: [1], correctAnswers: ['Карах'],    options: ['Карах', 'Плувах', 'Ходих', 'Играх'],    acceptableAnswers: [['Карах', 'карах']] },
      { text: '_____ картина.',         blanks: [1], correctAnswers: ['Рисувах'],  options: ['Рисувах', 'Правих', 'Четох', 'Свирих'], acceptableAnswers: [['Рисувах', 'рисувах']] },
      { text: '_____ снимки.',          blanks: [1], correctAnswers: ['Правих'],   options: ['Правих', 'Рисувах', 'Гледах', 'Карах'], acceptableAnswers: [['Правих', 'правих']] },
      { text: '_____ книга.',           blanks: [1], correctAnswers: ['Четох'],    options: ['Четох', 'Слушах', 'Рисувах', 'Гледах'], acceptableAnswers: [['Четох', 'четох']] },
      { text: '_____ радио.',           blanks: [1], correctAnswers: ['Слушах'],   options: ['Слушах', 'Гледах', 'Четох', 'Свирих'],  acceptableAnswers: [['Слушах', 'слушах']] },
      { text: '_____ шах.',             blanks: [1], correctAnswers: ['Играх'],    options: ['Играх', 'Карах', 'Плувах', 'Ходих'],    acceptableAnswers: [['Играх', 'играх']] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 8 — Упр. 10 (стр. 84): Подредете думите в изречения ──────────────
  {
    id: 'a2-l08-ex-10',
    type: 'word_order',
    title: 'УПРАЖНЕНИЕ 10',
    instruction: 'Поставете думите в правилния ред.',
    order: 8,
    points: 7,
    questions: [
      { words: ['плуваха', 'тази', 'в', 'морето', 'сутрин', 'те', '/'],           correctSentence: 'Тази сутрин те плуваха в морето.', alternateCorrectSentences: ['Те плуваха в морето тази сутрин.'] },
      { words: ['баскетбол', 'миналата', 'играхме', 'неделя', '/'],                correctSentence: 'Миналата неделя играхме баскетбол.', alternateCorrectSentences: ['Играхме баскетбол миналата неделя.'] },
      { words: ['зимата', 'ски', 'те', 'през', 'кара', '/'],                       correctSentence: 'Те кара ски през зимата.', alternateCorrectSentences: ['През зимата те кара ски.'] },
      { words: ['интересен', 'сряда', 'в', 'гледах', 'филм', 'приятели', 'с', '/'], correctSentence: 'В сряда гледах интересен филм с приятели.', alternateCorrectSentences: ['Гледах интересен филм с приятели в сряда.'] },
      { words: ['на', 'китара', 'свириха', 'снощи', 'те', '/'],                    correctSentence: 'Снощи те свириха на китара.', alternateCorrectSentences: ['Те свириха на китара снощи.'] },
      { words: ['снимки', 'те', 'правиха', 'много', '/'],                          correctSentence: 'Те правиха много снимки.', alternateCorrectSentences: ['Много снимки те правиха.'] },
      { words: ['ли', 'колело', 'кара', 'през', 'уикенда', '?'],                  correctSentence: 'Кара ли колело през уикенда ?', alternateCorrectSentences: ['Кара ли колело през уикенда?'] },
    ],
  } as WordOrderExercise,

  // ─── ORDER 9а — Упр. 11 (стр. 84): Текстовете за слушане преди въпросите ────
  {
    id: 'a2-l08-ex-11-tekst',
    type: 'reading_text',
    title: 'УПРАЖНЕНИЕ 11',
    instruction: 'Изслушайте текста и след това го прочетете сами.',
    order: 9,
    showDictionary: true,
    paragraphs: [
      'Аз съм Стефан. Миналата събота отидох в парка с приятели. Времето беше много приятно. Тичахме, играхме футбол, правихме снимки. За обяд ядохме сандвичи. После отидохме на кино. Беше чудесен ден!',
      'Аз съм Роза. Миналата седмица учих много, работих до късно. Не ходих на кафе с приятели, не отидох на фитнес, не гледах телевизия. Писах и четох имейли. Искам почивка, дълга почивка на море!',
    ],
    paragraphVoiceGenders: ['male', 'female'],
  } as ReadingTextExercise,

  // ─── ORDER 9б — Упр. 11 (стр. 84): Верни/грешни твърдения ───────────────────
  {
    id: 'a2-l08-ex-11',
    type: 'true_false',
    title: '',
    hideHeader: true,
    instruction: 'Определете дали твърденията са верни (✓) или неверни (✗).',
    order: 10,
    points: 10,
    sentences: [
      { id: 's1',  text: 'Стефан отиде на море.',                        isTrue: false },
      { id: 's2',  text: 'Времето беше приятно.',                         isTrue: true  },
      { id: 's3',  text: 'Стефан беше сам.',                              isTrue: false },
      { id: 's4',  text: 'За обяд ядоха сандвичи.',                       isTrue: true  },
      { id: 's5',  text: 'Те отидоха на кино.',                           isTrue: true  },
      { id: 's6',  text: 'Роза се казва Стефан.',                          isTrue: false },
      { id: 's7',  text: 'Миналата седмица Роза имаше много работа.',     isTrue: true  },
      { id: 's8',  text: 'Роза ходи на кафе с приятели.',                 isTrue: false },
      { id: 's9',  text: 'Роза писа и четеше имейли.',                    isTrue: true  },
      { id: 's10', text: 'Роза иска почивка на планината.',               isTrue: false },
    ],
  } as TrueFalseExercise,

  // ─── ORDER 10а — Упр. 12 (стр. 85): Текстовете за четене ────────────────────
  // 4-те кратки текста като цитати с по-голям шрифт + звук, преди свързването.
  {
    id: 'a2-l08-ex-12-tekstove',
    type: 'reading_text',
    title: 'УПРАЖНЕНИЕ 12',
    textTitle: 'Какво правиха миналото лято?',
    instruction: 'Изслушайте текстовете и след това ги прочетете сами.',
    order: 11,
    showDictionary: true,
    paragraphs: [
      'Калина: „Бях на екскурзия в Италия. Видях Рим. Посетих много музеи. Ядох спагети. Беше страхотно!"',
      'Иван: „Пътувах до Германия с приятели. Отидох на гости. Правих снимки. Беше невероятно."',
      'Силвия: „Миналото лято бях много заета. Работих, четох, нямах почивка. Не беше интересно."',
      'Емил: „Бях на планина с приятели. Ходихме много. Видяхме прекрасни места. Няма да забравя тази почивка."',
    ],
    ttsParagraphs: [
      'Калина. Бях на екскурзия в Италия. Видях Рим. Посетих много музеи. Ядох спагети. Беше страхотно!',
      'Иван. Пътувах до Германия с приятели. Отидох на гости. Правих снимки. Беше невероятно.',
      'Силвия. Миналото лято бях много заета. Работих, четох, нямах почивка. Не беше интересно.',
      'Емил. Бях на планина с приятели. Ходихме много. Видяхме прекрасни места. Няма да забравя тази почивка.',
    ],
    paragraphVoiceGenders: ['female', 'male', 'female', 'male'],
  } as ReadingTextExercise,

  // ─── ORDER 10б — Упр. 12 (стр. 85): Свържете името с правилната снимка ──────
  {
    id: 'a2-l08-ex-12',
    type: 'image_labeling',
    title: '',
    hideHeader: true,
    instruction: 'Изберете правилното име под всяка снимка.',
    order: 12,
    points: 4,
    displayType: 'default',
    columns: 2,
    images: [
      { id: 'emil',    imageUrl: `${ASSET}/04-upr-12-liato/01-emil.jpg`,    correctLabel: 'Емил',   imageOptions: ['Емил', 'Калина', 'Силвия', 'Иван'] },
      { id: 'kalina',  imageUrl: `${ASSET}/04-upr-12-liato/02-kalina.jpg`,  correctLabel: 'Калина', imageOptions: ['Калина', 'Иван', 'Емил', 'Силвия'] },
      { id: 'silviya', imageUrl: `${ASSET}/04-upr-12-liato/03-silviya.jpg`, correctLabel: 'Силвия', imageOptions: ['Силвия', 'Калина', 'Иван', 'Емил'] },
      { id: 'ivan',    imageUrl: `${ASSET}/04-upr-12-liato/04-ivan.jpg`,    correctLabel: 'Иван',   imageOptions: ['Иван', 'Емил', 'Калина', 'Силвия'] },
    ],
    options: ['Калина', 'Иван', 'Силвия', 'Емил'],
  } as ImageLabelingExercise,

  // ─── ORDER 11а — ГРАМАТИКА 2 (стр. 85): Минало свършено — ЕХ група ───────────
  {
    id: 'a2-l08-gramatika-02',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 2',
    instruction: 'Запознайте се с минало свършено на глаголите от ЕХ група.',
    instructionKey: 'a2.gr.l08.minaloEh',
    order: 13,
    tableTitle: 'Минало свършено — ЕХ група (взема → взех)',
    columns: ['(+)'],
    rows: [
      { pronoun: 'аз',        cells: ['взех'],   ttsText: 'аз — взех',          ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'ти',        cells: ['взе'],    ttsText: 'ти — взе.',           ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'той/тя/то', cells: ['взе'],    ttsText: 'той, тя, то — взе.',  ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'ние',       cells: ['взехме'], ttsText: 'ние — взехме',       ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'Вие',       cells: ['взехте'], ttsText: 'Вие — взехте',       ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'те',        cells: ['взеха'],  ttsText: 'те — взеха',         ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
    ],
    notes: [
      'Глаголи от ЕХ група: знаех',
      '⚠️ Внимание! аз **знаех**, ти **знаеше**, той/тя/то **знаеше**, ние **знаехме**, Вие **знаехте**, те **знаеха**',
      'Аз **не** взех. Ти взе **ли**?',
    ],
    ttsNotes: [
      'Глаголи от ех група: знаех.',
      'Внимание. аз знаех. ти знаеше. той, тя, то знаеше. ние знаехме. Вие знаехте. те знаеха.',
      'Аз не взех. Ти взе ли?',
    ],
    ttsNoteModels: ['pro', 'pro', 'pro'],
  } as GrammarTableExercise,

  // ─── ORDER 11б — ГРАМАТИКА 2б (стр. 85): Минало свършено — УХ група ──────────
  {
    id: 'a2-l08-gramatika-02b',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 2 (продължение)',
    instruction: 'Запознайте се с минало свършено на глаголите от УХ група.',
    instructionKey: 'a2.gr.l08.minaloUh',
    order: 14,
    tableTitle: 'Минало свършено — УХ група (чуя → чух)',
    columns: ['(+)'],
    rows: [
      { pronoun: 'аз',        cells: ['чух'],   ttsText: 'аз — чух',          ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'ти',        cells: ['чу'],    ttsText: 'ти — чу',           ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'той/тя/то', cells: ['чу'],    ttsText: 'той, тя, то — чу',  ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'ние',       cells: ['чухме'], ttsText: 'ние — чухме',       ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'Вие',       cells: ['чухте'], ttsText: 'Вие — чухте',       ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'те',        cells: ['чуха'],  ttsText: 'те — чуха',         ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
    ],
    notes: [
      'Глаголи от УХ група: събух (се), обух (се)',
      'Аз **не** чух. Ти чу **ли**?',
    ],
    ttsNotes: [
      'Глаголи от ух група: събух се, обух се.',
      'Аз не чух. Ти чу ли?',
    ],
    ttsNoteModels: ['pro', 'pro'],
  } as GrammarTableExercise,

  // ─── ORDER 12 — Упр. 13 (стр. 85): Задайте въпроси към подчертаните думи ────
  // Клиентът дефинира конкретните въпроси (Кога/Къде/Какво/Кой)
  {
    id: 'a2-l08-ex-13',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 13',
    instruction: 'Изберете правилния въпрос за всяка подчертана дума или фраза.',
    order: 15,
    points: 9,
    layout: 'single',
    sentences: [
      // Група 1: В петък отидохте на екскурзия в Пловдив.
      { text: 'В петък отидохте на екскурзия в Пловдив.\nа) Кога _____ на екскурзия?',
        blanks: [1], correctAnswers: ['отидохте'], options: ['отидохте', 'отиде', 'отидохме'], acceptableAnswers: [['отидохте', 'отиде']] },
      { text: 'Къде _____ на екскурзия?',
        blanks: [1], correctAnswers: ['отидохте'], options: ['отидохте', 'отиде', 'отидохме'], acceptableAnswers: [['отидохте', 'отиде']] },
      { text: 'Какво _____ в петък?',
        blanks: [1], correctAnswers: ['правихте'], options: ['правихте', 'прави', 'правихме'], acceptableAnswers: [['правихте', 'прави']] },
      // Група 2: Снощи ядохме в ресторант.
      { text: 'Снощи ядохме в ресторант.\nа) Кога _____ в ресторант?',
        blanks: [1], correctAnswers: ['ядохте'], options: ['ядохте', 'ядохме', 'яде'], acceptableAnswers: [['ядохте', 'ядохме']] },
      { text: 'Къде _____ снощи?',
        blanks: [1], correctAnswers: ['ядохте'], options: ['ядохте', 'ядохме', 'яде'], acceptableAnswers: [['ядохте', 'ядохме']] },
      { text: 'Какво _____ снощи?',
        blanks: [1], correctAnswers: ['правихте'], options: ['правихте', 'правихме', 'прави'], acceptableAnswers: [['правихте', 'правихме']] },
      // Група 3: Григор дойде в офиса късно.
      { text: 'Григор дойде в офиса късно.\nа) Кой _____ в офиса?',
        blanks: [1], correctAnswers: ['дойде'], options: ['дойде', 'дойдохте', 'дойдохме'], acceptableAnswers: [['дойде']] },
      { text: 'Къде _____ Григор?',
        blanks: [1], correctAnswers: ['дойде'], options: ['дойде', 'дойдохте', 'дойдохме'], acceptableAnswers: [['дойде']] },
      { text: 'Кога _____ Григор в офиса?',
        blanks: [1], correctAnswers: ['дойде'], options: ['дойде', 'дойдохте', 'дойдохме'], acceptableAnswers: [['дойде']] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 13 — Упр. 14 (стр. 85): Напишете правилната форма ───────────────
  {
    id: 'a2-l08-ex-14',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 14',
    instruction: 'Изберете правилната форма на глагола в минало свършено.',
    subtitle: 'Модел: Не чух телефона. (чуя)',
    order: 16,
    points: 4,
    layout: 'single',
    sentences: [
      { text: 'Не **чух** телефона. (чуя) (Модел)', blanks: [], correctAnswers: [], isExample: true },
      { text: 'Тя не _____ за купона в събота. (зная)',   blanks: [1], correctAnswers: ['знаеше'], options: ['знаех', 'знаеше', 'знаеха'],    acceptableAnswers: [['знаеше']] },
      { text: 'Те _____ цветя и картичка за учителката. (взема)', blanks: [1], correctAnswers: ['взеха'], options: ['взех', 'взе', 'взеха'], acceptableAnswers: [['взеха']] },
      { text: 'Детето _____ новите маратонки. (обуя)',     blanks: [1], correctAnswers: ['обу'],    options: ['обух', 'обу', 'обуха'],           acceptableAnswers: [['обу']] },
      { text: 'Ти _____, преди да влезеш в стаята. (събуя се)', blanks: [1], correctAnswers: ['събу се'], options: ['събух се', 'събу се', 'събуха се'], acceptableAnswers: [['събу се', 'се събу']] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 14 — ГРАМАТИКА 3 (стр. 86): Съюзи ────────────────────────────────
  {
    id: 'a2-l08-gramatika-03',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 3',
    instruction: 'Запознайте се с четирите основни съюза.',
    instructionKey: 'a2.gr.l08.sayuzi',
    order: 17,
    tableTitle: 'Съюзи',
    columns: ['Изречение'],
    rows: [
      { pronoun: 'а',   cells: ['Аз говоря български, **а** той говори арабски.'], ttsText: 'а. Аз говоря български, а той говори арабски.', ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'но',  cells: ['Имам баба, **но** нямам дядо.'],                   ttsText: 'но. Имам баба, но нямам дядо.',                  ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'или', cells: ['Какво искаш — чай **или** кафе?'],                 ttsText: 'или. Какво искаш — чай или кафе?',               ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'че',  cells: ['Мисля, **че** те са добре.'],                      ttsText: 'че. Мисля, че те са добрé.',                     ttsPrompt: 'Read aloud in standard Bulgarian. Pronounce „добрé" with stress on the last syllable „ré". Do not replace „б" with any other consonant.' },
    ],
    ttsNoteModels: [],
  } as GrammarTableExercise,

  // ─── ORDER 15 — Упр. 15 (стр. 86): Поставете подходящия съюз ───────────────
  {
    id: 'a2-l08-ex-15',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 15',
    instruction: 'Изберете подходящия съюз: **а**, **но**, **или** или **че**.',
    order: 18,
    points: 9,
    layout: 'single',
    sentences: [
      { text: 'Тя е учителка, **а** той е полицай. (Модел)', blanks: [], correctAnswers: [], isExample: true },
      { text: 'Снощи си легнах рано, _____ не спах добре.',      blanks: [1], correctAnswers: ['но'], options: ['а', 'но', 'или', 'че'], acceptableAnswers: [['но']] },
      { text: 'Аз съм българин, _____ той е арабин.',            blanks: [1], correctAnswers: ['а'],  options: ['а', 'но', 'или', 'че'], acceptableAnswers: [['а']] },
      { text: 'Ходих на море, _____ не плувах.',                 blanks: [1], correctAnswers: ['но'], options: ['а', 'но', 'или', 'че'], acceptableAnswers: [['но']] },
      { text: 'Тя каза, _____ не може да дойде утре.',           blanks: [1], correctAnswers: ['че'], options: ['а', 'но', 'или', 'че'], acceptableAnswers: [['че']] },
      { text: 'Всеки ден пътувам с автобус, _____ днес ще ходя пеша.', blanks: [1], correctAnswers: ['но'], options: ['а', 'но', 'или', 'че'], acceptableAnswers: [['но', 'а']] },
      { text: 'Мисля, _____ той е тук.',                         blanks: [1], correctAnswers: ['че'], options: ['а', 'но', 'или', 'че'], acceptableAnswers: [['че']] },
      { text: 'Какво ще правиш днес — ще работиш _____ ще почиваш?', blanks: [1], correctAnswers: ['или'], options: ['а', 'но', 'или', 'че'], acceptableAnswers: [['или']] },
      { text: 'Знам, _____ ще намериш работа скоро.',            blanks: [1], correctAnswers: ['че'], options: ['а', 'но', 'или', 'че'], acceptableAnswers: [['че']] },
      { text: 'Каква вода искате — топла _____ студена?',        blanks: [1], correctAnswers: ['или'], options: ['а', 'но', 'или', 'че'], acceptableAnswers: [['или']] },
    ],
  } as WorkbookFillBlankExercise,

  // Упр. 16 — ⏭ SKIP по клиент (довършете изреченията)

  // ─── ORDER 16а — Упр. 17 (стр. 86): Наредете глаголите — АХ, ЯХ, ИХ група ────
  // Разделено на 2 части, защото drag_to_columns поддържа максимум 3 колони.
  // Разпределението е по минало свършено (1 л. ед.ч.), сверено с граматиката:
  // АХ → -ах, ЯХ → -ях, ИХ → -их.
  {
    id: 'a2-l08-ex-17a',
    type: 'drag_to_columns',
    title: 'ДОПЪЛНИТЕЛНИ УПРАЖНЕНИЯ',
    subtitle: 'Поставете думите в правилната колона.',
    prominentSubtitle: true,
    instruction: 'АХ, ЯХ и ИХ група.',
    order: 19,
    points: 26,
    items: [
      'имам', 'вървя', 'говоря', 'замина', 'живея', 'забравя', 'играя',
      'закъснея', 'каня', 'кажа', 'намеря', 'легна си', 'видя', 'обадя се', 'мога',
      'платя', 'пиша', 'работя', 'пристигна', 'смени', 'спя', 'търся',
      'срещна се', 'чакам', 'стана', 'върна се',
    ],
    columns: [
      { id: 'ah',  title: 'АХ група',  correctItems: ['върна се', 'замина', 'играя', 'имам', 'кажа', 'легна си', 'мога', 'пиша', 'пристигна', 'спя', 'срещна се', 'стана', 'чакам'] },
      { id: 'yah', title: 'ЯХ група',  correctItems: ['вървя', 'видя', 'живея', 'закъснея'] },
      { id: 'ih',  title: 'ИХ група',  correctItems: ['говоря', 'забравя', 'каня', 'намеря', 'обадя се', 'платя', 'работя', 'смени', 'търся'] },
    ],
  } as DragToColumnsExercise,

  // ─── ORDER 16б — Упр. 17 (стр. 86): Наредете глаголите — ОХ, ЕХ, УХ група ────
  // ОХ → -ох (ГРАМАТИКА 1), ЕХ → взех/видях (ГРАМАТИКА 2), УХ → -ух (ГРАМАТИКА 2б).
  {
    id: 'a2-l08-ex-17b',
    type: 'drag_to_columns',
    title: '',
    hideHeader: true,
    instruction: 'Поставете думите в правилната колона. ОХ, ЕХ и УХ група.',
    order: 20,
    points: 9,
    items: [
      'вляза', 'взема', 'обуя се', 'дам', 'чуя', 'дойда', 'чета',
      'отида', 'ям',
    ],
    columns: [
      { id: 'oh', title: 'ОХ група', correctItems: ['вляза', 'дам', 'дойда', 'отида', 'чета', 'ям'] },
      { id: 'eh', title: 'ЕХ група', correctItems: ['взема'] },
      { id: 'uh', title: 'УХ група', correctItems: ['обуя се', 'чуя'] },
    ],
  } as DragToColumnsExercise,

  // ─── ORDER 17 — Упр. 18 (стр. 87): Справочна таблица с окончания ────────────
  // Упражнението е „изберете глагол и го спрегнете" — имплементираме като
  // референтна grammar_table с окончанията на 6-те групи. // TODO: обмислете
  // дали да се добави интерактивен компонент за спрежение в бъдеще.
  {
    id: 'a2-l08-gramatika-04',
    type: 'grammar_table',
    title: 'УПРАЖНЕНИЕ 18',
    subtitle: 'Изберете по един глагол от всяка група и го спрегнете, като гледате окончанията.',
    instruction: 'Запознайте се с окончанията на минало свършено по групи.',
    instructionKey: 'a2.gr.l08.vsichiGrupi',
    order: 21,
    tableTitle: 'Окончания — минало свършено (всички групи)',
    columns: ['АХ група', 'ЯХ група', 'ИХ група', 'ОХ група', 'ЕХ група', 'УХ група'],
    rows: [
      { pronoun: 'аз',        cells: ['-ах',    '-ях',    '-их',   '-ох',   '-ех',   '-ух'],   ttsText: 'аз. ах. ях. их. ох. ех. ух.',         ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'ти',        cells: ['-а',     '-я',     '-и',    '-е',    '-е',    '-у'],    ttsText: 'ти. а. я. и. е. е. у.',               ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'той/тя/то', cells: ['-а',     '-я',     '-и',    '-е',    '-е',    '-у'],    ttsText: 'той, тя, то. а. я. и. е. е. у.',      ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'ние',       cells: ['-ахме',  '-яхме',  '-ихме', '-охме', '-ехме', '-ухме'], ttsText: 'ние. ахме. яхме. ихме. охме. ехме. ухме.', ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'Вие',       cells: ['-ахте',  '-яхте',  '-ихте', '-охте', '-ехте', '-ухте'], ttsText: 'Вие. ахте. яхте. ихте. охте. ехте. ухте.', ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'те',        cells: ['-аха',   '-яха',   '-иха',  '-оха',  '-еха',  '-уха'],  ttsText: 'те. аха. яха. иха. оха. еха. уха.',   ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
    ],
    notes: [
      'Пример АХ: вечерях, вечеря, вечеря, вечеряхме, вечеряхте, вечеряха',
      'Пример ОХ: отидох, отиде, отиде, отидохме, отидохте, отидоха',
    ],
    ttsNotes: [
      'АХ група. Пример: вечерях, вечеря, вечеря, вечеряхме, вечеряхте, вечеряха.',
      'ОХ група. Пример: отидох, отиде, отиде, отидохме, отидохте, отидоха.',
    ],
    ttsNoteModels: ['pro', 'pro'],
  } as GrammarTableExercise,

  // ─── ORDER 18а — Упр. 19 (стр. 87): Модел — Явор беше в Италия (за слушане) ──
  {
    id: 'a2-l08-ex-19',
    type: 'reading_text',
    title: 'УПРАЖНЕНИЕ 19',
    textTitle: 'Явор беше в Италия',
    instruction: 'Изслушайте текста и след това го прочетете сами.',
    order: 22,
    showDictionary: true,
    images: [
      { imageUrl: `${ASSET}/06-upr-19-patuvane/01-yavor-italiya.jpg`, label: 'Явор — Италия' },
    ],
    paragraphs: [
      'Явор беше в Италия. Пътува с кола. Времето беше хубаво. Видя много стари сгради. Яде пица. Пи червено вино.',
    ],
    ttsParagraphs: [
      'Явор беше в Италия. Пътува с кола. Времето беше хубаво. Видя много стари сгради. Яде пица. Пи червено вино.',
    ],
    paragraphVoiceGenders: ['female'],
  } as ReadingTextExercise,

  // ─── ORDER 18б — Упр. 19: Марина — Париж (текст с дропдауни, ед.ч.) ──────────
  {
    id: 'a2-l08-ex-19b',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 19',
    subtitle: 'Марина — Париж',
    prominentSubtitle: true,
    instruction: 'Изслушайте текста и изберете правилната глаголна форма.',
    order: 23,
    points: 5,
    layout: 'single',
    hideSentenceNumbers: true,
    audioUrl: '/assets/a2-lesson-08/audio/tts/listening/a2-l08-ex-19b.mp3',
    images: [
      { imageUrl: `${ASSET}/06-upr-19-patuvane/02-marina-parizh.jpg`, label: 'Марина — Париж' },
    ],
    listeningText: 'Марина беше в Париж. Пътува със самолет. Времето беше слънчево. Видя Айфеловата кула. Яде кроасан. Пи кафе. Купи подарък за приятелката си.',
    sentences: [
      {
        text: 'Марина беше в Париж. _____ със самолет. Времето беше слънчево. _____ Айфеловата кула. _____ кроасан. _____ кафе. _____ подарък за приятелката си.',
        blanks: [1, 2, 3, 4, 5],
        correctAnswers: ['пътува', 'видя', 'яде', 'пи', 'купи'],
        options: [
          ['пътува', 'пътувах', 'пътуваха'],
          ['видя', 'видях', 'видяха'],
          ['яде', 'ядох', 'ядоха'],
          ['пи', 'пих', 'пиха'],
          ['купи', 'купих', 'купиха'],
        ],
        acceptableAnswers: [['пътува'], ['видя'], ['яде'], ['пи'], ['купи']],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 18в — Упр. 19: Спас и Снежа — Истанбул (текст с дропдауни, мн.ч.) ─
  {
    id: 'a2-l08-ex-19c',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 19',
    subtitle: 'Спас и Снежа — Истанбул',
    prominentSubtitle: true,
    instruction: 'Изслушайте текста и изберете правилната глаголна форма.',
    order: 24,
    points: 5,
    layout: 'single',
    hideSentenceNumbers: true,
    audioUrl: '/assets/a2-lesson-08/audio/tts/listening/a2-l08-ex-19c.mp3',
    images: [
      { imageUrl: `${ASSET}/06-upr-19-patuvane/03-spas-snezha-istanbul.jpg`, label: 'Спас и Снежа — Истанбул' },
    ],
    listeningText: 'Спас и Снежа бяха в Истанбул. Пътуваха с автобус. Времето беше топло. Видяха Синята джамия. Ядоха кебап. Пиха чай. Купиха подаръци.',
    sentences: [
      {
        text: 'Спас и Снежа бяха в Истанбул. _____ с автобус. Времето беше топло. _____ Синята джамия. _____ кебап. _____ чай. _____ подаръци.',
        blanks: [1, 2, 3, 4, 5],
        correctAnswers: ['пътуваха', 'видяха', 'ядоха', 'пиха', 'купиха'],
        options: [
          ['пътуваха', 'пътува', 'пътувах'],
          ['видяха', 'видя', 'видях'],
          ['ядоха', 'яде', 'ядох'],
          ['пиха', 'пи', 'пих'],
          ['купиха', 'купи', 'купих'],
        ],
        acceptableAnswers: [['пътуваха'], ['видяха'], ['ядоха'], ['пиха'], ['купиха']],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 19 — Упр. 20 (стр. 88): Прочетете отговорите — свободно време ────
  {
    id: 'a2-l08-ex-20',
    type: 'reading_text',
    title: 'УПРАЖНЕНИЕ 20',
    instruction: 'Изслушайте текста и след това го прочетете сами.',
    order: 25,
    showDictionary: true,
    imageColumns: 4,
    images: [
      { imageUrl: `${ASSET}/07-upr-20-svobodno-vreme/02-niya.jpg`,    label: 'Ния (30 год., от Варна)' },
      { imageUrl: `${ASSET}/07-upr-20-svobodno-vreme/01-pepi.jpg`,    label: 'Пепи (28 год., от Самоков)' },
      { imageUrl: `${ASSET}/07-upr-20-svobodno-vreme/03-vesi.jpg`,    label: 'Веси (26 год., от София)' },
      { imageUrl: `${ASSET}/07-upr-20-svobodno-vreme/04-monika.jpg`,  label: 'Моника (45 год., от Враца)' },
    ],
    paragraphs: [
      'Ния (30 год., от Варна)\nСвободно време? Имам две малки деца. Всяка свободна минута съм с тях. Ходим на разходка в морската градина, на плажа. Вкъщи гледаме филми, имаме гости или ходим на гости. Децата много обичат да спортуват. Дъщеря ми ходи на спортна гимнастика всяка сряда, а синът ми играе тенис два пъти седмично. Преди да се омъжа, пътувах много, имах време за себе си, но не съжалявам. Сега имам две прекрасни деца.',
      'Пепи (28 год., от Самоков)\nКарам ски от много време. Бях на четири години, когато за първи път се качих на ски. Хората не обичат зимата, защото е студено, мрачно и дните са къси. Аз чакам зимата с нетърпение. Ако има сняг, винаги съм в планината. Миналата година паднах лошо и имах проблеми с дясната ръка. Счупих я, но сега всичко е добре. Вие карате ли ски? Ако не — заповядайте, аз съм добра учителка.',
      'Веси (26 год., от София)\nНямам много свободно време. Работя и уча. Обичам да се срещам с приятели, ходим на кино или в планината. Помагам на родителите си, те не са млади и имат нужда от помощ. Ако имам пари, пътувам из България или Европа.',
      'Моника (45 год., от Враца)\nИмам малка къща близо до Враца и мога да ходя всеки ден там след работа. Хобито ми са цветята. Имам най-различни цветя. Всички съседи идват да ги гледат. Също отглеждам много зеленчуци и плодове, правя компоти, лютеница, кисело зеле. Обичам да готвя. За съжаление синът ми не е при нас. Сега учи във Виена, но често се връща и винаги се радва на домашна българска храна. Забравих да кажа, че много гледам телевизия — филми за природата и животните. Дискавъри е любимият ми канал.',
    ],
    ttsParagraphs: [
      'Ния, тридесет години, от Варна. Свободно време? Имам две малки деца. Всяка свободна минута съм с тях. Ходим на разходка в морската градина, на плажа. Вкъщи гледаме филми, имаме гости или ходим на гости. Децата много обичат да спортуват. Дъщеря ми ходи на спортна гимнастика всяка сряда, а синът ми играе тенис два пъти седмично. Преди да се омъжа, пътувах много, имах време за себе си, но не съжалявам. Сега имам две прекрасни деца.',
      'Пепи, двадесет и осем години, от Самоков. Карам ски от много време. Бях на четири години, когато за първи път се качих на ски. Хората не обичат зимата, защото е студено, мрачно и дните са къси. Аз чакам зимата с нетърпение. Ако има сняг, винаги съм в планината. Миналата година паднах лошо и имах проблеми с дясната ръка. Счупих я, но сега всичко е добре. Вие карате ли ски? Ако не — заповядайте, аз съм добра учителка.',
      'Веси, двадесет и шест години, от София. Нямам много свободно време. Работя и уча. Обичам да се срещам с приятели, ходим на кино или в планината. Помагам на родителите си, те не са млади и имат нужда от помощ. Ако имам пари, пътувам из България или Европа.',
      'Моника, четиридесет и пет години, от Враца. Имам малка къща близо до Враца и мога да ходя всеки ден там след работа. Хобито ми са цветята. Имам най-различни цветя. Всички съседи идват да ги гледат. Също отглеждам много зеленчуци и плодове, правя компоти, лютеница, кисело зеле. Обичам да готвя. За съжаление синът ми не е при нас. Сега учи във Виена, но често се връща и винаги се радва на домашна българска храна. Забравих да кажа, че много гледам телевизия — филми за природата и животните. Дискавъри е любимият ми канал.',
    ],
    paragraphVoiceGenders: ['female', 'female', 'female', 'female'],
  } as ReadingTextExercise,

  // ─── ORDER 20 — Упр. 21 (стр. 88): Отговорете на въпросите ─────────────────
  {
    id: 'a2-l08-ex-21',
    type: 'multiple_choice',
    title: 'УПРАЖНЕНИЕ 21',
    instruction: 'Изберете правилния отговор.',
    order: 26,
    points: 4,
    questions: [
      {
        question: 'Защо Пепи обича зимата?',
        options: [
          'Защото обича студеното време и кратките дни.',
          'Защото през зимата работи повече.',
          'Защото може да кара ски и да бъде в планината.',
          'Защото ходи на училище през зимата.',
        ],
        correctIndex: 2,
      },
      {
        question: 'Как Ния прекарва свободното си време?',
        options: [
          'Пътува често в чужбина и прекарва време сама.',
          'Работи допълнително и учи нови езици.',
          'Прекарва времето си с децата — разходки, филми и срещи с гости.',
          'Спортува активно всеки ден във фитнеса.',
        ],
        correctIndex: 2,
      },
      {
        question: 'Какво обича да прави Веси?',
        options: [
          'Да прекарва времето си сама у дома и да чете книги.',
          'Да се среща с приятели, да ходи на кино или в планината и да пътува.',
          'Да спортува професионално и да участва в състезания.',
          'Да играе компютърни игри през цялото си свободно време.',
        ],
        correctIndex: 1,
      },
      {
        question: 'Какво е хобито на Моника?',
        options: [
          'Да пътува често в чужбина.',
          'Да отглежда цветя и да се грижи за градина.',
          'Да играе спортове всеки ден.',
          'Да работи с компютри и интернет.',
        ],
        correctIndex: 1,
      },
    ],
  } as MultipleChoiceExercise,

  // ─── ORDER 21 — Упр. 22 (стр. 89): ТЕКСТ „НЕЗАБРАВИМА ВАКАНЦИЯ!" ────────────
  {
    id: 'a2-l08-tekst-vakantsia',
    type: 'reading_text',
    title: 'ТЕКСТОВЕ',
    textTitle: 'Незабравима ваканция!',
    instruction: 'Изслушайте текста и след това го прочетете сами.',
    order: 27,
    showDictionary: true,
    images: [
      { imageUrl: `${ASSET}/08-tekstove-upr-22-vakanciya/01-hristo-mayka-parizh.jpg`, label: 'Христо в Париж' },
    ],
    paragraphs: [
      'Лято е! Ваканция е! Христо замина за две седмици на екскурзия в Европа. Вчера пристигна в Париж. Това е петият ден от пътуването. Майката на Христо се обажда всеки ден. Сега е 6:30 сутринта.',
      '– Ало, ало, Христо!',
      '– Да, мамо! Добро утро! Как си?',
      '– Ти как си? В колко часа си легнал снощи?',
      '– 11:30.',
      '– В 11:30? Толкова късно!? Какво прави?',
      '– Разхождах се из града.',
      '– Спа ли добре? Къде е хотелът?',
      '– Да... но сега е много рано, може ли да говорим по-късно? Искам да спя още малко.',
      '– Вечерял ли? Какво яде?',
      '– Сандвич.',
      '– Какво пи?',
      '– Кафе с мляко.',
      '– Говори ли френски?',
      '– Да, говорих, в кафето. Разбрах всичко, но те не ме разбраха.',
      '– Трябва да учиш повече!',
      '– Мамо, купих ти подарък.',
      '– Благодаря, но нямам нужда от нищо.',
      '– Мамо, срещнах едно момиче и тя е много красива! Мисля, че съм влюбен!',
      '– Какво момиче? Как така си влюбен? Откъде е? Как се казва?',
      '– Мамо, не те чувам добре. Връзката не е добра. Ще ти се обадя по-късно.',
      '– Христо, Христо... Тръгвам веднага за Париж.',
    ],
    ttsParagraphs: [
      'Лято е! Ваканция е! Христо замина за две седмици на екскурзия в Европа. Вчера пристигна в Париж. Това е петият ден от пътуването. Майката на Христо се обажда всеки ден. Сега е шест и половина сутринта.',
      'Ало, ало, Христо!',
      'Да, мамо! Добро утро! Как си?',
      'Ти как си? В колко часа си легнал снощи?',
      'Единадесет и половина.',
      'В единадесет и половина? Толкова късно! Какво прави?',
      'Разхождах се из града.',
      'Спа ли добре? Къде е хотелът?',
      'Да, но сега е много рано, може ли да говорим по-късно? Искам да спя още малко.',
      'Вечерял ли? Какво яде?',
      'Сандвич.',
      'Какво пи?',
      'Кафе с мляко.',
      'Говори ли френски?',
      'Да, говорих, в кафето. Разбрах всичко, но те не ме разбраха.',
      'Трябва да учиш повече!',
      'Мамо, купих ти подарък.',
      'Благодаря, но нямам нужда от нищо.',
      'Мамо, срещнах едно момиче и тя е много красива! Мисля, че съм влюбен!',
      'Какво момиче? Как така си влюбен? Откъде е? Как се казва?',
      'Мамо, не те чувам добре. Връзката не е добра. Ще ти се обадя по-късно.',
      'Христо, Христо... Тръгвам веднага за Париж.',
    ],
    paragraphVoiceGenders: [
      'male',
      'female', 'male', 'female', 'male', 'female', 'male', 'female', 'male', 'female', 'male',
      'female', 'male', 'female', 'male', 'female', 'male', 'female', 'male', 'female', 'male',
      'female',
    ],
  } as ReadingTextExercise,

  // ─── ORDER 22 — Упр. 23 (стр. 89): Довършете изреченията ────────────────────
  {
    id: 'a2-l08-ex-23',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 23',
    instruction: 'Изберете правилния отговор, като използвате информацията от текста.',
    order: 28,
    points: 7,
    layout: 'single',
    sentences: [
      { text: 'Христо замина на _____ в Европа.',
        blanks: [1], correctAnswers: ['екскурзия'], options: ['екскурзия', 'почивка', 'работа', 'концерт'], acceptableAnswers: [['екскурзия']] },
      { text: 'Майката на Христо _____ всеки ден.',
        blanks: [1], correctAnswers: ['се обажда'], options: ['се обажда', 'пише', 'пратя', 'отива'], acceptableAnswers: [['се обажда']] },
      { text: 'Христо _____ сандвич и _____ кафе с мляко за вечеря.',
        blanks: [1, 2],
        correctAnswers: ['яде', 'пи'],
        options: [['яде', 'ядох', 'ядоха'], ['пи', 'пих', 'пиха']],
        acceptableAnswers: [['яде'], ['пи']] },
      { text: 'Той _____ подарък за майка си.',
        blanks: [1], correctAnswers: ['купи'], options: ['купи', 'купих', 'купиха'], acceptableAnswers: [['купи']] },
      { text: 'Той мисли, че е _____.',
        blanks: [1], correctAnswers: ['влюбен'], options: ['влюбен', 'уморен', 'болен', 'свободен'], acceptableAnswers: [['влюбен']] },
      // Въпрос 6 — текстът казва „Тръгвам веднага за Париж" т.е. майката тръгва за Париж
      { text: 'Майката на Христо _____ за Париж.',
        blanks: [1], correctAnswers: ['тръгна'], options: ['тръгна', 'замина', 'отиде', 'пристигна'], acceptableAnswers: [['тръгна', 'замина', 'отиде']] },
    ],
  } as WorkbookFillBlankExercise,

  // Упр. 24 — ⏭ SKIP по клиент (разкажете за интересно пътуване)

  // ─── ORDER 23 — Упр. 25 (стр. 90): Имейл от Брюксел ────────────────────────
  {
    id: 'a2-l08-tekst-bryuksel',
    type: 'reading_text',
    title: 'УПРАЖНЕНИЕ 25',
    textTitle: 'Имейл от Брюксел',
    instruction: 'Изслушайте текста и след това го прочетете сами.',
    order: 29,
    showDictionary: true,
    imageColumns: 2,
    images: [
      { imageUrl: `${ASSET}/09-upr-25-bryuksel-snimki/01-shokolatier.jpg`, label: 'Шоколатие в Брюксел' },
      { imageUrl: `${ASSET}/09-upr-25-bryuksel-snimki/02-atomium.jpg`,     label: 'Атомиум' },
    ],
    paragraphs: [
      'Здравей, Ваня!\n\nПиша ти от Брюксел. Чудесен град! Пристигнахме вчера на обяд. Самолетът имаше малко закъснение. Хотелът е в центъра. Намерихме го лесно. Излязохме и се разходихме. Ядохме пържени картофи с майонеза, но картофите в България са по-вкусни. Не харесвам майонезата, по-добре е със сирене. Разбира се, купихме шоколад. Тук има страхотни магазини за шоколад. После посетихме музея на шоколада и видяхме как се прави. След това отидохме на гости на приятели от България. Те работят тук от пет години. Всичко е хубаво, но е много скъпо.',
      'Времето е типично за Белгия — вали дъжд и е малко студено. Хората изглеждат приятни. Има много туристи. Ще се върнем след седмица. Може ли да ми изпратиш малко пари? Ще ти донеса шоколад!\n\nЛипсваш ми,\nМила',
    ],
    ttsParagraphs: [
      'Здравей, Ваня! Пиша ти от Брюксел. Чудесен град! Пристигнахме вчера на обяд. Самолетът имаше малко закъснение. Хотелът е в центъра. Намерихме го лесно. Излязохме и се разходихме. Ядохме пържени картофи с майонеза, но картофите в България са по-вкусни. Не харесвам майонезата, по-добре е със сирене. Разбира се, купихме шоколад. Тук има страхотни магазини за шоколад. После посетихме музея на шоколада и видяхме как се прави. След това отидохме на гости на приятели от България. Те работят тук от пет години. Всичко е хубаво, но е много скъпо.',
      'Времето е типично за Белгия — вали дъжд и е малко студено. Хората изглеждат приятни. Има много туристи. Ще се върнем след седмица. Може ли да ми изпратиш малко пари? Ще ти донеса шоколад! Липсваш ми, Мила.',
    ],
    paragraphVoiceGenders: ['female', 'female'],
  } as ReadingTextExercise,

  // ─── ORDER 24 — Упр. 26 (стр. 90): Отговорете на въпросите ─────────────────
  {
    id: 'a2-l08-ex-26',
    type: 'multiple_choice',
    title: 'УПРАЖНЕНИЕ 26',
    instruction: 'Изберете правилния отговор.',
    order: 30,
    points: 7,
    questions: [
      {
        question: 'Къде е Мила?',
        options: ['В Париж', 'В Брюксел', 'В Лондон', 'В София'],
        correctIndex: 1,
      },
      {
        question: 'Какво харесва Мила в Брюксел?',
        options: ['Ресторантите', 'Шоколада и магазините за шоколад', 'Морето', 'Планините'],
        correctIndex: 1,
      },
      {
        question: 'Какво не харесва Мила?',
        options: ['Шоколада', 'Хотела', 'Майонезата', 'Приятелите'],
        correctIndex: 2,
      },
      {
        question: 'Какво правят приятелите на Мила в Брюксел?',
        options: ['Учат в университет', 'Пътуват', 'Работят', 'Почиват'],
        correctIndex: 2,
      },
      {
        question: 'Какво е времето в Белгия?',
        options: ['Слънчево и топло', 'Вали дъжд и е малко студено', 'Много горещо', 'Сухо и ветровито'],
        correctIndex: 1,
      },
      {
        question: 'Кога ще се върне Мила?',
        options: ['Утре', 'След два дни', 'След седмица', 'След месец'],
        correctIndex: 2,
      },
      {
        question: 'Какво ще донесе на Ваня?',
        options: ['Подарък от приятелите', 'Сувенири', 'Шоколад', 'Книга'],
        correctIndex: 2,
      },
    ],
  } as MultipleChoiceExercise,

];

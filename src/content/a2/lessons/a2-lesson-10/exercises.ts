import type {
  Exercise,
  ImageLabelingExercise,
  IllustratedCardsExercise,
  MatchPairsExercise,
  WorkbookFillBlankExercise,
  MultipleChoiceExercise,
  ReadingTextExercise,
  GrammarTableExercise,
  TrueFalseExercise,
} from '@/content/types';

// ⚠️ Order follows the A2 textbook „Интервю за работа" (стр. 99–108).
// Пропуснати по клиент: Упр. 2, 4, 9, 10, 13, 14, 15, 20

const ASSET = '/assets/a2-lesson-10';

const GEMINI_BG_SMOOTH_PROMPT =
  'Read aloud clearly and smoothly in standard Bulgarian with correct Bulgarian stress. Do not split words into syllables and do not use any foreign or Russian accent.';

// Per-row stress fixes (Flash mis-stresses / doubles these). Used with ttsModel: 'pro'.
const GEMINI_BG_STRESS_HODYA =
  'Read these Bulgarian verb forms one by one, clearly, in a single calm female voice with correct native Bulgarian stress (ударение). The participles ходил, ходила, ходило, ходили are stressed on the first syllable "хо": "ходи́х, хо́дя, хо́дил, хо́дила, хо́дило, хо́дили". Read each word exactly once. Do not use any Russian or Arabic accent.';
const GEMINI_BG_STRESS_CHAKAM =
  'Read each Bulgarian word exactly once, clearly, in a single calm female voice with the stress on the first syllable: "ча́ках, ча́кам, ча́кал, ча́кала, ча́кало, ча́кали". Do not repeat any word. Do not use any foreign accent.';
const GEMINI_BG_STRESS_TANTSUVAM =
  'Read these Bulgarian verb forms clearly in a single calm female voice with the stress on the syllable "цу" in every word, never on the final vowel: "танцу́вах, танцу́вам, танцу́вал, танцу́вала, танцу́вало, танцу́вали". Read each word exactly once. Do not use any foreign accent.';
const GEMINI_BG_STRESS_CHUVAM =
  'Read these Bulgarian words clearly in a single calm female voice. The participle „чувал" is stressed on the first syllable „чу": чУвал (CHU-val), never чувАл. Read exactly: „чувам, чУвал". Read each word exactly once. Do not use any foreign accent.';

export const exercises: Exercise[] = [

  // ─── ORDER 1 — Упр. 1 (стр. 99): Напишете професиите под картинките ──────────
  {
    id: 'a2-l10-ex-01',
    type: 'image_labeling',
    title: 'УПРАЖНЕНИЕ 1',
    instruction: 'Изберете правилната дума под всяка картинка.',
    order: 1,
    points: 6,
    displayType: 'default',
    columns: 3,
    images: [
      {
        id: 'prevodach',
        imageUrl: `${ASSET}/01-upr-01-profesii/01-prevodach.jpg`,
        correctLabel: 'преводач',
        imageOptions: ['преводач', 'инженер', 'архитект', 'лекар'],
      },
      {
        id: 'inzhener',
        imageUrl: `${ASSET}/01-upr-01-profesii/02-inzhener.jpg`,
        correctLabel: 'инженер',
        imageOptions: ['инженер', 'готвач', 'лекар', 'преводач'],
      },
      {
        id: 'gotvach',
        imageUrl: `${ASSET}/01-upr-01-profesii/03-gotvach.jpg`,
        correctLabel: 'готвач',
        imageOptions: ['готвач', 'сервитьор', 'инженер', 'архитект'],
      },
      {
        id: 'servityor',
        imageUrl: `${ASSET}/01-upr-01-profesii/04-servityor.jpg`,
        correctLabel: 'сервитьор',
        imageOptions: ['сервитьор', 'готвач', 'преводач', 'лекар'],
      },
      {
        id: 'lekar',
        imageUrl: `${ASSET}/01-upr-01-profesii/05-lekar.jpg`,
        correctLabel: 'лекар',
        imageOptions: ['лекар', 'архитект', 'инженер', 'сервитьор'],
      },
      {
        id: 'arhitekt',
        imageUrl: `${ASSET}/01-upr-01-profesii/06-arhitekt.jpg`,
        correctLabel: 'архитект',
        imageOptions: ['архитект', 'лекар', 'готвач', 'инженер'],
      },
    ],
    options: ['готвач', 'преводач', 'архитект', 'лекар', 'инженер', 'сервитьор'],
  } as ImageLabelingExercise,

  // ─── ORDER 2 — ДИАЛОГ 1 „В Бюрото по труда" (стр. 99) ───────────────────────
  {
    id: 'a2-l10-dialozi-01',
    type: 'a2-dialogues',
    title: 'ДИАЛОГ 1',
    instruction: 'Натиснете всяка реплика, за да чуете произношението.',
    order: 2,
    imageUrl: `${ASSET}/02-dialog-1-byuro-truda/01-svobodni-rabotni-mesta.jpg`,
    sections: [
      {
        id: 'а. В БЮРОТО ПО ТРУДА',
        lines: [
          { text: '– Здравей, Али! Как си?', ttsText: 'Али. – Здравей, Али! Как си?', voiceGender: 'male' },
          { text: '– Не много добре. Нямам работа.', voiceGender: 'male' },
          { text: '– А търсиш ли?', voiceGender: 'male' },
          { text: '– Да, разбира се. Всяка седмица идвам в Бюрото по труда. След два дни ще имам интервю за работа.', voiceGender: 'male' },
          { text: '– Желая ти успех.', voiceGender: 'male' },
          { text: '– Благодаря!', voiceGender: 'male' },
        ],
      },
    ],
  } as unknown as Exercise,

  // Упр. 2 — ⏭ SKIP по клиент (прочетете диалога по двойки)

  // ─── ORDER 3 — Упр. 3 (стр. 99): Отговорете на въпросите ────────────────────
  {
    id: 'a2-l10-ex-03',
    type: 'multiple_choice',
    title: 'УПРАЖНЕНИЕ 3',
    instruction: 'Изберете правилния отговор.',
    order: 3,
    points: 3,
    questions: [
      {
        question: 'Защо Али не се чувства добре?',
        options: [
          'Защото е болен',
          'Защото няма работа',
          'Защото няма приятели',
          'Защото пътува много',
        ],
        correctIndex: 1,
      },
      {
        question: 'Къде ходи всяка седмица?',
        options: [
          'В училище',
          'В университета',
          'В Бюрото по труда',
          'В болницата',
        ],
        correctIndex: 2,
      },
      {
        question: 'Къде ще ходи след два дни?',
        options: [
          'На почивка',
          'На интервю за работа',
          'На кино',
          'На среща с приятели',
        ],
        correctIndex: 1,
      },
    ],
  } as MultipleChoiceExercise,

  // ─── ORDER 4 — ДИАЛОГ 2 „След два дни" (стр. 99) ────────────────────────────
  {
    id: 'a2-l10-dialozi-02',
    type: 'a2-dialogues',
    title: 'ДИАЛОГ 2',
    instruction: 'Натиснете всяка реплика, за да чуете произношението.',
    order: 4,
    imageUrl: `${ASSET}/03-dialog-2-sled-dva-dni/01-dvama-mazhe-kafe.jpg`,
    sections: [
      {
        id: 'а. СЛЕД ДВА ДНИ',
        lines: [
          { text: '– Как мина интервюто, Али?', ttsText: 'Как мина интервюто, Али?', voiceGender: 'male' },
          { text: '– Много добре. Вече имам работа. Следващата седмица ще започна почасово. Ще работя по четири-пет часа на ден.', voiceGender: 'male' },
          { text: '– Доволен ли си?', voiceGender: 'male' },
          { text: '– Да, защо не. Ще получавам заплата в края на всеки месец.', voiceGender: 'male' },
          { text: '– Добра ли е заплатата?', voiceGender: 'male' },
          { text: '– Не е много висока, но мога да вземам и аванс. Това е по-добре от помощите за безработни, които получавам от Бюрото по труда.', voiceGender: 'male' },
          { text: '– Какъв е новият ти шеф?', voiceGender: 'male' },
          { text: '– Изглежда добър. Каза, че ако има възможност, след време ще работи на пълно работно време, по осем часа на ден.', voiceGender: 'male' },
          { text: '– Браво, това наистина е добра новина!', voiceGender: 'male' },
        ],
      },
    ],
  } as unknown as Exercise,

  // Упр. 4 — ⏭ SKIP по клиент (прочетете диалога по двойки)

  // ─── ORDER 5 — Упр. 5 (стр. 100): Отговорете на въпросите ───────────────────
  {
    id: 'a2-l10-ex-05',
    type: 'multiple_choice',
    title: 'УПРАЖНЕНИЕ 5',
    instruction: 'Изберете правилния отговор.',
    order: 5,
    points: 4,
    questions: [
      {
        question: 'По колко часа на ден ще работи Али?',
        options: [
          '8 часа',
          '6–7 часа',
          '4–5 часа',
          '2–3 часа',
        ],
        correctIndex: 2,
      },
      {
        question: 'Защо е доволен от новата работа?',
        options: [
          'Защото работи близо до дома',
          'Защото ще получава заплата',
          'Защото не работи много',
          'Защото ще пътува',
        ],
        correctIndex: 1,
      },
      {
        question: 'Добра ли е заплатата му?',
        options: [
          'Да, много е висока',
          'Да, най-добрата възможна',
          'Не е много висока',
          'Не получава заплата',
        ],
        correctIndex: 2,
      },
      {
        question: 'Какъв е шефът му?',
        options: [
          'Строг и груб',
          'Неприятен',
          'Изглежда добър',
          'Не се споменава',
        ],
        correctIndex: 2,
      },
    ],
  } as MultipleChoiceExercise,

  // ─── ORDER 6 — НОВИ ДУМИ 1 (стр. 100): ПОЛУЧАВАМ / РАБОТЯ ───────────────────
  {
    id: 'a2-l10-novi-dumi-1',
    type: 'illustrated_cards',
    title: 'НОВИ ДУМИ 1',
    instruction: 'ПОЛУЧАВАМ / РАБОТЯ',
    textOnly: true,
    order: 6,
    cards: [
      { id: 'zaplata',             imageUrl: '', label: 'заплата',                   ttsLabel: 'заплата' },
      { id: 'avans',               imageUrl: '', label: 'аванс',                     ttsLabel: 'аванс' },
      { id: 'pomoshti-bezrabotni', imageUrl: '', label: 'помощи за безработни',      ttsLabel: 'помощи за безработни' },
      { id: 'pulno-rabotno',       imageUrl: '', label: 'на пълно работно време',    ttsLabel: 'на пълно работно време' },
      { id: 'pochassovo',          imageUrl: '', label: 'почасово',                   ttsLabel: 'почасово' },
    ],
  } as IllustratedCardsExercise,

  // ─── ORDER 7 — Упр. 6 (стр. 100): Попълнете с подходяща дума ─────────────────
  {
    id: 'a2-l10-ex-06',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 6',
    instruction: 'Изберете подходящата дума или фраза.',
    order: 7,
    points: 4,
    layout: 'single',
    sentences: [
      {
        text: 'Работя в ресторант. В края на всеки месец получавам _____.',
        blanks: [1],
        correctAnswers: ['заплата'],
        options: ['заплата', 'аванс', 'почасово', 'помощи за безработни'],
        acceptableAnswers: [['заплата']],
      },
      {
        text: 'Как работиш — на пълно работно време или _____?',
        blanks: [1],
        correctAnswers: ['почасово'],
        options: ['почасово', 'заплата', 'аванс', 'помощи за безработни'],
        acceptableAnswers: [['почасово']],
      },
      {
        text: 'От два месеца не работя. Всеки месец получавам _____.',
        blanks: [1],
        correctAnswers: ['помощи за безработни'],
        options: ['помощи за безработни', 'заплата', 'аванс', 'почасово'],
        acceptableAnswers: [['помощи за безработни']],
      },
      {
        text: 'Всеки месец вземам _____ преди заплата.',
        blanks: [1],
        correctAnswers: ['аванс'],
        options: ['аванс', 'заплата', 'почасово', 'помощи за безработни'],
        acceptableAnswers: [['аванс']],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 8 — Упр. 7 (стр. 100): Свържете антонимите ────────────────────────
  {
    id: 'a2-l10-ex-07',
    type: 'a2-match-pairs',
    title: 'УПРАЖНЕНИЕ 7',
    instruction: 'Свържете антонимите от двете колони.',
    model: 'голям – малък',
    order: 8,
    points: 5,
    pairs: [
      { id: 'p1', left: 'търся работа',         correctRight: 'имам работа' },
      { id: 'p2', left: 'безработен съм',        correctRight: 'намирам работа' },
      { id: 'p3', left: 'добър шеф',             correctRight: 'лош шеф' },
      { id: 'p4', left: 'работя почасово',        correctRight: 'работя на пълно работно време' },
      { id: 'p5', left: 'ниска заплата',          correctRight: 'висока заплата' },
    ],
    shuffledRights: ['имам работа', 'висока заплата', 'лош шеф', 'работя на пълно работно време', 'намирам работа'],
  } as unknown as Exercise,

  // ─── ORDER 9 — Упр. 8 (стр. 100): Слушайте и отбележете ─────────────────────
  // TODO: Учебникът описва „слушане" — учителят изрежда думи, учениците слушат.
  //       Предлагаме адаптация като match_pairs: определение ↔ дума.
  {
    id: 'a2-l10-ex-08',
    type: 'match_pairs',
    title: 'УПРАЖНЕНИЕ 8',
    instruction: 'Свържете всяко определение с правилната дума.',
    order: 9,
    points: 4,
    pairs: [
      { id: 'p1', left: 'Парите, които получаваме всеки месец, когато работим',     correctRight: 'заплата' },
      { id: 'p2', left: 'Работа по няколко часа на ден',                            correctRight: 'почасово' },
      { id: 'p3', left: 'Парите, които получаваме от Бюрото по труда, когато сме без работа', correctRight: 'помощи за безработни' },
      { id: 'p4', left: 'Работа по осем часа на ден',                               correctRight: 'пълно работно време' },
    ],
    shuffledRights: ['заплата', 'помощи за безработни', 'почасово', 'пълно работно време'],
  } as MatchPairsExercise,

  // Упр. 9 — ⏭ SKIP по клиент (прочетете диалозите по двойки)
  // Упр. 10 — ⏭ SKIP по клиент (работете по двойки — модели за пътуване)

  // ─── ORDER 10 — ДИАЛОЗИ 3 (стр. 100): а., б. ─────────────────────────────────
  {
    id: 'a2-l10-dialozi-03',
    type: 'a2-dialogues',
    title: 'ДИАЛОЗИ 3',
    instruction: 'Натиснете всяка реплика, за да чуете произношението.',
    order: 10,
    sections: [
      {
        id: 'а. Париж',
        imageUrl: `${ASSET}/04-dialozi-3/01-parizh-dvama-mazhe.jpg`,
        lines: [
          { text: '– Аз съм ходил в Париж. Ти ходил ли си?', voiceGender: 'male' },
          {
            text: '– Не, не съм ходил.',
            voiceGender: 'male',
            ttsPrompt:
              'Read aloud in a warm, welcoming tone, in clear standard Bulgarian with natural native pronunciation and correct stress. The last word is the masculine past participle „ходил" — it ends with Л. Say „ходил", never „ходила". Do not add a final а. Do not use any Russian, Arabic, English or other foreign accent.',
          },
        ],
      },
      {
        id: 'б. Пътували ли сте',
        imageUrl: `${ASSET}/04-dialozi-3/02-parizh-album-semeistvo.jpg`,
        lines: [
          { text: '– Ние сме пътували много. Вие пътували ли сте?', voiceGender: 'female' },
          { text: '– Не, не сме пътували много.', voiceGender: 'male' },
        ],
      },
    ],
  } as unknown as Exercise,

  // ─── ORDER 11 — ГРАМАТИКА 1 (стр. 101): Минало неопределено ─────────────────
  {
    id: 'a2-l10-gramatika-01',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 1',
    instruction: 'Запознайте се с миналото неопределено време.',
    instructionKey: 'a2.gr.l10.minaloBespredel',
    order: 11,
    tableTitle: 'Минало неопределено време',
    columns: ['(+)', '(–)', '(?)'],
    rows: [
      {
        pronoun: 'аз',
        cells: ['**съм** ходил(а)', 'не съм ходил(а)', 'ходил(а) **ли** съм'],
        ttsText: 'аз. Аз съм ходил. Аз не съм ходил. Ходил ли съм.',
        ttsPrompt: GEMINI_BG_SMOOTH_PROMPT,
      },
      {
        pronoun: 'ти',
        cells: ['**си** ходил(а)', 'не си ходил(а)', 'ходил(а) **ли** си'],
        ttsText: 'ти. Ти си ходил. Ти не си ходил. Ходил ли си.',
        ttsPrompt: GEMINI_BG_SMOOTH_PROMPT,
      },
      {
        pronoun: 'той',
        cells: ['**е** ходил', 'не е ходил', 'ходил **ли** е'],
        ttsText: 'той. Той е ходил. Той не е ходил. Ходил ли е.',
        ttsPrompt: GEMINI_BG_SMOOTH_PROMPT,
      },
      {
        pronoun: 'тя',
        cells: ['**е** ходила', 'не е ходила', 'ходила **ли** е'],
        ttsText: 'тя. Тя е ходила. Тя не е ходила. Ходила ли е.',
        ttsPrompt: GEMINI_BG_SMOOTH_PROMPT,
      },
      {
        pronoun: 'то',
        cells: ['**е** ходило', 'не е ходило', 'ходило **ли** е'],
        ttsText: 'то. То е ходило. То не е ходило. Ходило ли е.',
        ttsPrompt: GEMINI_BG_SMOOTH_PROMPT,
      },
      {
        pronoun: 'ние',
        cells: ['**сме** ходили', 'не сме ходили', 'ходили **ли** сме'],
        ttsText: 'ние. Ние сме ходили. Ние не сме ходили. Ходили ли сме.',
        ttsPrompt: GEMINI_BG_SMOOTH_PROMPT,
      },
      {
        pronoun: 'вие',
        cells: ['**сте** ходили', 'не сте ходили', 'ходили **ли** сте'],
        ttsText: 'вие. Вие сте ходили. Вие не сте ходили. Ходили ли сте.',
        ttsPrompt: GEMINI_BG_SMOOTH_PROMPT,
      },
      {
        pronoun: 'те',
        cells: ['**са** ходили', 'не са ходили', 'ходили **ли** са'],
        ttsText: 'те. Те са ходили. Те не са ходили. Ходили ли са.',
        ttsPrompt: GEMINI_BG_SMOOTH_PROMPT,
      },
    ],
    notes: [
      'Аз **съм** ходил в Париж. = Ходил **съм** в Париж.',
      'Ти ходил ли **си** в Париж? = Ходил ли **си** в Париж?',
    ],
    ttsNotes: [
      'Аз съм ходил в Париж. Равно на: Ходил съм в Париж.',
      'Ти ходил ли си в Париж? Равно на: Ходил ли си в Париж?',
    ],
    ttsNoteModels: ['pro', 'pro'],
  } as GrammarTableExercise,

  // ─── ORDER 12 — Упр. 11 (стр. 101): Причастия от двувидови глаголи ───────────
  {
    id: 'a2-l10-ex-11',
    type: 'grammar_table',
    title: 'УПРАЖНЕНИЕ 11',
    instruction: 'Запомнете формите на миналото свършено причастие.',
    order: 12,
    tableTitle: 'Минало свършено причастие',
    columns: ['м.р. ед.ч.', 'ж.р. ед.ч.', 'ср.р. ед.ч.', 'мн.ч.'],
    rows: [
      { pronoun: 'ходих (ходя)',      cells: ['ходил',    'ходила',    'ходило',    'ходили'],    ttsText: 'ходих, ходя. ходил, ходила, ходило, ходили', ttsModel: 'pro', ttsPrompt: GEMINI_BG_STRESS_HODYA },
      { pronoun: 'говорих (говоря)',  cells: ['говорил',  'говорила',  'говорило',  'говорили'],  ttsText: 'говорих, говоря. говорил, говорила, говорило, говорили', ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'работих (работя)',  cells: ['работил',  'работила',  'работило',  'работили'],  ttsText: 'работих, работя. работил, работила, работило, работили', ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'пих (пия)',         cells: ['пил',      'пила',      'пило',      'пили'],      ttsText: 'пих, пия. пил, пила, пило, пили', ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'исках (искам)',     cells: ['искал',    'искала',    'искало',    'искали'],    ttsText: 'исках, искам. искал, искала, искало, искали', ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'чаках (чакам)',     cells: ['чакал',    'чакала',    'чакало',    'чакали'],    ttsText: 'чаках, чакам. чакал, чакала, чакало, чакали', ttsModel: 'pro', ttsPrompt: GEMINI_BG_STRESS_CHAKAM },
      { pronoun: 'писах (пиша)',      cells: ['писал',    'писала',    'писало',    'писали'],    ttsText: 'писах, пиша. писал, писала, писало, писали', ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'играх (играя)',     cells: ['играл',    'играла',    'играло',    'играли'],    ttsText: 'играх, играя. играл, играла, играло, играли', ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'танцувах (танцувам)', cells: ['танцувал', 'танцувала', 'танцувало', 'танцували'], ttsText: 'танцувах, танцувам. танцувал, танцувала, танцувало, танцували', ttsModel: 'pro', ttsPrompt: GEMINI_BG_STRESS_TANTSUVAM },
      { pronoun: 'гледах (гледам)',   cells: ['гледал',   'гледала',   'гледало',   'гледали'],   ttsText: 'гледах, гледам. гледал, гледала, гледало, гледали', ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'бях (съм)',         cells: ['бил',      'била',      'било',      'били'],      ttsText: 'бях, съм. бил, била, било, били', ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'ядох (ям)',         cells: ['ял',       'яла',       'яло',       'яли'],       ttsText: 'ядох, ям. ял, яла, яло, яли', ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'четох (чета)',      cells: ['чел',      'чела',      'чело',      'чели'],      ttsText: 'четох, чета. чел, чела, чело, чели', ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'можах (мога)',      cells: ['могъл',    'могла',     'могло',     'могли'],     ttsText: 'можах, мога. могъл, могла, могло, могли', ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
    ],
  } as GrammarTableExercise,

  // ─── ORDER 13 — Упр. 12 (стр. 101): Работете по модела ─────────────────────
  {
    id: 'a2-l10-ex-12',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 12',
    instruction: 'Изберете правилния отговор по модела.',
    order: 13,
    points: 10,
    layout: 'single',
    sentences: [
      {
        text: '– Ходил ли си в Бургас?\n– Да, **ходил съм**. / – Не, **не съм ходил**. (Модел)',
        blanks: [],
        correctAnswers: [],
        isExample: true,
      },
      {
        text: '– Танцували ли сте български народни танци?\n– Да, _____.\n– Не, _____.',
        blanks: [1, 2],
        correctAnswers: ['танцували сме', 'не сме танцували'],
        options: [['танцували сме', 'сме танцували', 'танцували са'], ['не сме танцували', 'не са танцували', 'не сте танцували']],
        acceptableAnswers: [['танцували сме', 'сме танцували'], ['не сме танцували']],
      },
      {
        text: '– Ял ли си макарони на фурна?\n– Да, _____.\n– Не, _____.',
        blanks: [1, 2],
        correctAnswers: ['ял съм', 'не съм ял'],
        options: [['ял съм', 'съм ял', 'ял си'], ['не съм ял', 'не съм яла', 'не е ял']],
        acceptableAnswers: [['ял съм', 'съм ял', 'яла съм', 'съм яла'], ['не съм ял', 'не съм яла']],
      },
      {
        text: '– Те пили ли са боза?\n– Да, _____.\n– Не, _____.',
        blanks: [1, 2],
        correctAnswers: ['пили са', 'не са пили'],
        options: [['пили са', 'са пили', 'пили сме'], ['не са пили', 'не сме пили', 'не сте пили']],
        acceptableAnswers: [['пили са', 'са пили'], ['не са пили']],
      },
      {
        text: '– Фатима гледала ли е български филми?\n– Да, _____.\n– Не, _____.',
        blanks: [1, 2],
        correctAnswers: ['гледала е', 'не е гледала'],
        options: [['гледала е', 'е гледала', 'гледал е'], ['не е гледала', 'не е гледал', 'не е гледали']],
        acceptableAnswers: [['гледала е', 'е гледала'], ['не е гледала']],
      },
      {
        text: '– Брат ти играл ли е тенис?\n– Да, _____.\n– Не, _____.',
        blanks: [1, 2],
        correctAnswers: ['играл е', 'не е играл'],
        options: [['играл е', 'е играл', 'играла е'], ['не е играл', 'не е играла', 'не сме играли']],
        acceptableAnswers: [['играл е', 'е играл'], ['не е играл']],
      },
    ],
  } as WorkbookFillBlankExercise,

  // Упр. 13 — ⏭ SKIP по клиент (разкажете за себе си по модела)
  // Упр. 14 — ⏭ SKIP по клиент (разкажете за ваш приятел по модела)

  // ─── ORDER 14 — ДИАЛОЗИ 4 (стр. 102): а., б., в. ────────────────────────────
  {
    id: 'a2-l10-dialozi-04',
    type: 'a2-dialogues',
    title: 'ДИАЛОЗИ 4',
    instruction: 'Натиснете всяка реплика, за да чуете произношението.',
    order: 14,
    sections: [
      {
        id: 'а. Видял ли си Георги',
        imageUrl: `${ASSET}/05-dialozi-4/01-georgi-tarsi.jpg`,
        lines: [
          { text: '– Ти виждал ли си Георги този месец?', voiceGender: 'male' },
          { text: '– Не, не съм го виждал.', voiceGender: 'male' },
        ],
      },
      {
        id: 'б. Познаваш ли г-н Иванов',
        imageUrl: `${ASSET}/05-dialozi-4/02-zdravosvane-ivanov.jpg`,
        lines: [
          { text: '– Вие срещали ли сте се с г-н Иванов?', voiceGender: 'male', ttsText: '– Вие срещали ли сте се с господин Иванов?' },
          { text: '– Не, не сме се срещали.', voiceGender: 'male' },
        ],
      },
      {
        id: 'в. Обаждала ли се е Мария',
        imageUrl: `${ASSET}/05-dialozi-4/03-mariya-telefon.jpg`,
        lines: [
          { text: '– Мария обаждала ли се е?', voiceGender: 'male' },
          { text: '– Не, не се е обаждала.', voiceGender: 'male' },
        ],
      },
    ],
  } as unknown as Exercise,

  // Упр. 15 — ⏭ SKIP по клиент (прочетете диалозите по двойки)

  // ─── ORDER 15 — Упр. 16 (стр. 102): Причастие от несвършен вид ───────────────
  {
    id: 'a2-l10-ex-16',
    type: 'grammar_table',
    title: 'УПРАЖНЕНИЕ 16',
    instruction: 'Запомнете формите на миналото несвършено причастие.',
    order: 15,
    tableTitle: 'Минало несвършено причастие (несвършен вид)',
    columns: ['причастие (м.р./ж.р./ср.р./мн.ч.)'],
    rows: [
      { pronoun: 'виждам',     cells: ['виждал, -а, -о, -и'],    ttsText: 'виждам: виждал', ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'чувам',      cells: ['чувал, -а, -о, -и'],     ttsText: 'чувам: чУвал', ttsModel: 'pro', ttsPrompt: GEMINI_BG_STRESS_CHUVAM },
      { pronoun: 'казвам',     cells: ['казвал, -а, -о, -и'],    ttsText: 'казвам: казвал', ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'купувам',    cells: ['купувал, -а, -о, -и'],   ttsText: 'купувам: купувал', ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'идвам',      cells: ['идвал, -а, -о, -и'],     ttsText: 'идвам: идвал', ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'вземам',     cells: ['вземал, -а, -о, -и'],    ttsText: 'вземам: вземал', ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'влизам',     cells: ['влизал, -а, -о, -и'],    ttsText: 'влизам: влизал', ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'излизам',    cells: ['излизал, -а, -о, -и'],   ttsText: 'излизам: излизал', ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'плащам',     cells: ['плащал, -а, -о, -и'],    ttsText: 'плащам: плащал', ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'давам',      cells: ['давал, -а, -о, -и'],     ttsText: 'давам: давал', ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'помагам',    cells: ['помагал, -а, -о, -и'],   ttsText: 'помагам, помагал', ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'намирам',    cells: ['намирал, -а, -о, -и'],   ttsText: 'намирам: намирал', ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'срещам се',  cells: ['срещал се, -а, -о, -и'], ttsText: 'срещам се: срещал се', ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'връщам се',  cells: ['връщал се, -а, -о, -и'], ttsText: 'връщам се: връщал се', ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'обаждам се', cells: ['обаждал се, -а, -о, -и'], ttsText: 'обаждам се: обаждал се', ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
    ],
  } as GrammarTableExercise,

  // ─── ORDER 16 — ГРАМАТИКА 2 (стр. 102): Минало неопределено на възвратни ──────
  {
    id: 'a2-l10-gramatika-02',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 2',
    instruction: 'Запознайте се с миналото неопределено на възвратните глаголи.',
    instructionKey: 'a2.gr.l10.minaloBezpVuzvraten',
    order: 16,
    tableTitle: 'Минало неопределено — възвратни глаголи (+)',
    columns: ['(+)'],
    rows: [
      {
        pronoun: 'аз',
        cells: ['**съм** се срещал(а)'],
        ttsText: 'аз. Аз съм се срещал.',
        ttsPrompt: GEMINI_BG_SMOOTH_PROMPT,
      },
      {
        pronoun: 'ти',
        cells: ['**си** се срещал(а)'],
        ttsText: 'ти. Ти си се срещал.',
        ttsPrompt: GEMINI_BG_SMOOTH_PROMPT,
      },
      {
        pronoun: 'той',
        cells: ['**се** е срещал'],
        ttsText: 'той. Той се е срещал.',
        ttsPrompt: GEMINI_BG_SMOOTH_PROMPT,
      },
      {
        pronoun: 'тя',
        cells: ['**се** е срещала'],
        ttsText: 'тя. Тя се е срещала.',
        ttsPrompt: GEMINI_BG_SMOOTH_PROMPT,
      },
      {
        pronoun: 'то',
        cells: ['**се** е срещало'],
        ttsText: 'то. То се е срещало.',
        ttsPrompt: GEMINI_BG_SMOOTH_PROMPT,
      },
      {
        pronoun: 'ние',
        cells: ['**сме** се срещали'],
        ttsText: 'ние. Ние сме се срещали.',
        ttsPrompt: GEMINI_BG_SMOOTH_PROMPT,
      },
      {
        pronoun: 'вие',
        cells: ['**сте** се срещали'],
        ttsText: 'вие. Вие сте се срещали.',
        ttsPrompt: GEMINI_BG_SMOOTH_PROMPT,
      },
      {
        pronoun: 'те',
        cells: ['**са** се срещали'],
        ttsText: 'те. Те са се срещали.',
        ttsPrompt: GEMINI_BG_SMOOTH_PROMPT,
      },
    ],
    notes: [
      'Ти **си** се срещал с Иван. Ти **не** си се срещал с Иван. Ти срещал **ли** си се с Иван?',
      'Той **се** е срещал с Иван. Той **не** се е срещал с Иван. Той срещал **ли** се е с Иван?',
    ],
    ttsNotes: [
      'Ти си се срещал с Иван. Ти не си се срещал с Иван. Ти срещал ли си се с Иван?',
      'Той се е срещал с Иван. Той не се е срещал с Иван. Той срещал ли се е с Иван?',
    ],
    ttsNoteModels: ['pro', 'pro'],
  } as GrammarTableExercise,

  // ─── ORDER 17 — Упр. 17 (стр. 103): Работете по модела (се срещали) ───────────
  {
    id: 'a2-l10-ex-17',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 17',
    instruction: 'Изберете правилния отговор по модела.',
    order: 17,
    points: 6,
    layout: 'single',
    sentences: [
      {
        text: '– Вие срещали ли сте се със Стоян?\n– Да, **срещали сме се**. / – Не, **не сме се срещали**. (Модел)',
        blanks: [],
        correctAnswers: [],
        isExample: true,
      },
      {
        text: '– Чувал ли си нещо за новия шеф?\n– Да, _____.\n– Не, _____.',
        blanks: [1, 2],
        correctAnswers: ['чувал съм', 'не съм чувал'],
        options: [['чувал съм', 'съм чувал', 'чувала съм'], ['не съм чувал', 'не съм чувала', 'не е чувал']],
        acceptableAnswers: [['чувал съм', 'съм чувал', 'чувала съм', 'съм чувала'], ['не съм чувал', 'не съм чувала']],
      },
      {
        text: '– Те идвали ли са вкъщи?\n– Да, _____.\n– Не, _____.',
        blanks: [1, 2],
        correctAnswers: ['идвали са', 'не са идвали'],
        options: [['идвали са', 'са идвали', 'идвали сме'], ['не са идвали', 'не сме идвали', 'не сте идвали']],
        acceptableAnswers: [['идвали са', 'са идвали'], ['не са идвали']],
      },
      {
        text: '– Купувал ли си книги от интернет?\n– Да, _____.\n– Не, _____.',
        blanks: [1, 2],
        correctAnswers: ['купувал съм', 'не съм купувал'],
        options: [['купувал съм', 'съм купувал', 'купувала съм'], ['не съм купувал', 'не съм купувала', 'не е купувал']],
        acceptableAnswers: [['купувал съм', 'съм купувал', 'купувала съм', 'съм купувала'], ['не съм купувал', 'не съм купувала']],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 18 — Упр. 18 (стр. 103): го/я (виждал го, я) ─────────────────────
  {
    id: 'a2-l10-ex-18',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 18',
    instruction: 'Изберете правилния отговор по модела.',
    order: 18,
    points: 4,
    layout: 'single',
    sentences: [
      {
        text: '– Виждал ли си **Ахмед** днес?\n– Да, виждал съм **го**. / – Не, не съм **го** виждал. (Модел)',
        blanks: [],
        correctAnswers: [],
        isExample: true,
      },
      {
        text: '– Чувал ли си **Лейла** днес по телефона?\n– Да, _____.\n– Не, _____.',
        blanks: [1, 2],
        correctAnswers: ['чувал съм я', 'не съм я чувал'],
        options: [['чувал съм я', 'я чувал съм', 'чувала съм я'], ['не съм я чувал', 'не съм я чувала', 'не я съм чувал']],
        acceptableAnswers: [['чувал съм я', 'чувала съм я'], ['не съм я чувал', 'не съм я чувала']],
      },
      {
        text: '– Срещал ли си **Николай** и **Марина** днес?\n– Да, _____.\n– Не, _____.',
        blanks: [1, 2],
        correctAnswers: ['срещал съм ги', 'не съм ги срещал'],
        options: [['срещал съм ги', 'ги срещал съм', 'срещала съм ги'], ['не съм ги срещал', 'не съм ги срещала', 'не ги съм срещал']],
        acceptableAnswers: [['срещал съм ги', 'срещала съм ги'], ['не съм ги срещал', 'не съм ги срещала']],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 19 — ДИАЛОГ 5 „Коледно намаление" (стр. 103) ─────────────────────
  // Упр. 19 = четене на Диалог 5 → покрито чрез диалога
  // Упр. 20 — ⏭ SKIP по клиент (трансформирайте формите)
  {
    id: 'a2-l10-dialozi-05',
    type: 'a2-dialogues',
    title: 'ДИАЛОГ 5',
    instruction: 'Натиснете всяка реплика, за да чуете произношението.',
    order: 19,
    sections: [
      {
        id: 'а. КОЛЕДНО НАМАЛЕНИЕ',
        imageUrl: `${ASSET}/06-dialog-5-koledno-namalenie/01-koledno-namalenie.jpg`,
        lines: [
          { text: '– Аз вече съм купила подаръци за Коледа. Ти купила ли си?', voiceGender: 'female' },
          { text: '– Не, още не съм купила.', voiceGender: 'female' },
        ],
      },
    ],
  } as unknown as Exercise,

  // ─── ORDER 20 — ДИАЛОЗИ 6 (стр. 103–104): а., б., в. ────────────────────────
  {
    id: 'a2-l10-dialozi-06',
    type: 'a2-dialogues',
    title: 'ДИАЛОЗИ 6',
    instruction: 'Натиснете всяка реплика, за да чуете произношението.',
    order: 20,
    sections: [
      {
        id: 'а. Почивка в Турция',
        imageUrl: `${ASSET}/07-dialozi-6/01-pochivka-turciya.jpg`,
        lines: [
          { text: '– Мая, ходила ли си някога в Турция?', voiceGender: 'female' },
          { text: '– Да, ходила съм няколко пъти.', voiceGender: 'female' },
          { text: '– Кога беше там за последен път?', voiceGender: 'female' },
          { text: '– За последен път бях там на почивка миналото лято.', voiceGender: 'female' },
        ],
      },
      {
        id: 'б. Али и Иван в ресторант',
        imageUrl: `${ASSET}/07-dialozi-6/02-ali-ivan-kafe.jpg`,
        lines: [
          { text: '– Али, виждал ли си Иван тази седмица?', voiceGender: 'male' },
          { text: '– Не, отдавна не съм го виждал.', voiceGender: 'male' },
          { text: '– Кога го видя за последен път?', voiceGender: 'male' },
          { text: '– Преди един месец. Бяхме заедно на ресторант.', voiceGender: 'male' },
        ],
      },
      {
        id: 'в. Петя не е вкъщи',
        imageUrl: `${ASSET}/08-dialozi-6v/01-petya-balkon.jpg`,
        lines: [
          { text: '– Петя не е вкъщи. Сигурно още не се е върнала от работа.', voiceGender: 'female' },
          { text: '– Но колата й е пред блока!', ttsText: '– Но колата ѝ е пред блока!', voiceGender: 'female' },
          { text: '– Може би е отишла на работа с метро.', voiceGender: 'female' },
        ],
      },
    ],
  } as unknown as Exercise,

  // ─── ORDER 21 — Упр. 22 (стр. 104): Отговорете на въпросите ─────────────────
  // (Клиентът го изброява като „Упр. 21")
  {
    id: 'a2-l10-ex-22',
    type: 'multiple_choice',
    title: 'УПРАЖНЕНИЕ 22',
    instruction: 'Изберете правилния отговор.',
    order: 21,
    points: 5,
    questions: [
      {
        question: 'Колко пъти е ходила Мая в Турция?',
        options: [
          'Един път',
          'Два пъти',
          'Няколко пъти',
          'Никога',
        ],
        correctIndex: 2,
      },
      {
        question: 'Кога е ходила за последен път?',
        options: [
          'Тази зима',
          'Миналото лято',
          'Преди една седмица',
          'Преди една година',
        ],
        correctIndex: 1,
      },
      {
        question: 'Къде са били Али и Иван преди един месец?',
        options: [
          'В киното',
          'В парка',
          'В ресторант',
          'На работа',
        ],
        correctIndex: 2,
      },
      {
        question: 'Къде е колата на Петя?',
        options: [
          'В гаража',
          'Пред блока',
          'На паркинга на работа',
          'В друг град',
        ],
        correctIndex: 1,
      },
      {
        question: 'Как е отишла Петя на работа?',
        options: [
          'С кола',
          'С автобус',
          'С метро',
          'Пеша',
        ],
        correctIndex: 2,
      },
    ],
  } as MultipleChoiceExercise,

  // ─── ORDER 22 — ГРАМАТИКА 3 (стр. 104): Маркери мин.свършено/неопределено ────
  {
    id: 'a2-l10-gramatika-03',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 3',
    instruction: 'Запознайте се с маркерите за минало свършено и неопределено.',
    instructionKey: 'a2.gr.l10.markeriVreme',
    order: 22,
    tableTitle: 'Маркери за минало свършено / неопределено',
    columns: ['Минало свършено', 'Минало неопределено'],
    rows: [
      {
        pronoun: '',
        cells: ['вчера', 'никога, не'],
        ttsText: 'Минало свършено: вчера. Минало неопределено: никога, не.',
        ttsPrompt: GEMINI_BG_SMOOTH_PROMPT,
      },
      {
        pronoun: '',
        cells: ['снощи', 'още не'],
        ttsText: 'Минало свършено: снощи. Минало неопределено: още не.',
        ttsPrompt: GEMINI_BG_SMOOTH_PROMPT,
      },
      {
        pronoun: '',
        cells: ['от … до …', 'отдавна не'],
        ttsText: 'Минало свършено: от… до… Минало неопределено: отдавна не.',
        ttsPrompt: GEMINI_BG_SMOOTH_PROMPT,
      },
      {
        pronoun: '',
        cells: ['преди три дни, …', 'не много пъти'],
        ttsText: 'Минало свършено: преди три дни. Минало неопределено: не много пъти.',
        ttsPrompt: GEMINI_BG_SMOOTH_PROMPT,
      },
      {
        pronoun: '',
        cells: ['през 2015 година, …', 'някога'],
        ttsText: 'Минало свършено: през две хиляди и петнайста година. Минало неопределено: някога.',
        ttsModel: 'pro',
        ttsPrompt: GEMINI_BG_SMOOTH_PROMPT,
      },
      {
        pronoun: '',
        cells: ['в понеделник, …', 'може би'],
        ttsText: 'Минало свършено: в понеделник. Минало неопределено: може би.',
        ttsPrompt: GEMINI_BG_SMOOTH_PROMPT,
      },
      {
        pronoun: '',
        cells: ['за първи път', 'сигурно'],
        ttsText: 'Минало свършено: за първи път. Минало неопределено: сигурно.',
        ttsPrompt: GEMINI_BG_SMOOTH_PROMPT,
      },
      {
        pronoun: '',
        cells: ['за последен път', 'днес, този месец, …'],
        ttsText: 'Минало свършено: за последен път. Минало неопределено: днес, този месец.',
        ttsPrompt: GEMINI_BG_SMOOTH_PROMPT,
      },
      {
        pronoun: '',
        cells: ['', 'тази седмица, …'],
        ttsText: 'Минало неопределено: тази седмица.',
        ttsPrompt: GEMINI_BG_SMOOTH_PROMPT,
      },
      {
        pronoun: '',
        cells: ['', 'това лято, ….'],
        ttsText: 'Минало неопределено: това лято.',
        ttsPrompt: GEMINI_BG_SMOOTH_PROMPT,
      },
    ],
  } as GrammarTableExercise,

  // ─── ORDER 23 — Упр. 23 (стр. 104): Работете по модела (никога/много пъти) ───
  {
    id: 'a2-l10-ex-23',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 23',
    instruction: 'Изберете правилния отговор по модела.',
    order: 23,
    points: 8,
    layout: 'single',
    sentences: [
      {
        text: '– Той идвал ли е **някога** в София?\n– Да, идвал е **много пъти**.\n– Не, **никога** не е идвал. (Модел)',
        blanks: [],
        correctAnswers: [],
        isExample: true,
      },
      {
        text: '– Виждала ли си някога сняг?\n– Да, _____.\n– Не, _____.',
        blanks: [1, 2],
        correctAnswers: ['виждала съм много пъти', 'никога не съм виждала'],
        options: [['виждала съм много пъти', 'много пъти съм виждала', 'виждал съм много пъти'], ['никога не съм виждала', 'никога не съм виждал', 'никога не съм го виждала']],
        acceptableAnswers: [['виждала съм много пъти', 'много пъти съм виждала', 'виждал съм много пъти', 'много пъти съм виждал'], ['никога не съм виждала', 'никога не съм виждал']],
      },
      {
        text: '– Детето влизало ли е някога в мол?\n– Да, _____.\n– Не, _____.',
        blanks: [1, 2],
        correctAnswers: ['влизало е много пъти', 'никога не е влизало'],
        options: [['влизало е много пъти', 'много пъти е влизало', 'влизало е веднъж'], ['никога не е влизало', 'не е влизало', 'никога не е']],
        acceptableAnswers: [['влизало е много пъти', 'много пъти е влизало'], ['никога не е влизало']],
      },
      {
        text: '– Слушали ли сте някога тази песен?\n– Да, _____.\n– Не, _____.',
        blanks: [1, 2],
        correctAnswers: ['слушали сме много пъти', 'никога не сме слушали'],
        options: [['слушали сме много пъти', 'много пъти сме слушали', 'слушали сме веднъж'], ['никога не сме слушали', 'не сме слушали', 'никога не сте слушали']],
        acceptableAnswers: [['слушали сме много пъти', 'много пъти сме слушали'], ['никога не сме слушали']],
      },
      {
        text: '– Пътувал ли си някога със самолет?\n– Да, _____.\n– Не, _____.',
        blanks: [1, 2],
        correctAnswers: ['пътувал съм много пъти', 'никога не съм пътувал'],
        options: [['пътувал съм много пъти', 'много пъти съм пътувал', 'пътувала съм много пъти'], ['никога не съм пътувал', 'никога не съм пътувала', 'не съм пътувал']],
        acceptableAnswers: [['пътувал съм много пъти', 'много пъти съм пътувал', 'пътувала съм много пъти', 'много пъти съм пътувала'], ['никога не съм пътувал', 'никога не съм пътувала']],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 24 — Упр. 24 (стр. 104): Сигурно/може би + глагол ────────────────
  {
    id: 'a2-l10-ex-24',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 24',
    instruction: 'Изберете правилната форма на глагола по модела.',
    order: 24,
    points: 4,
    layout: 'single',
    sentences: [
      {
        text: '– Очилата на учителя са на масата.\n– Сигурно е **дошъл**. (дойда) (Модел)',
        blanks: [],
        correctAnswers: [],
        isExample: true,
      },
      {
        text: '– Любо не е в офиса.\n– Сигурно _____. (изляза)',
        blanks: [1],
        correctAnswers: ['е излязъл'],
        options: ['е излязъл', 'е излязла', 'е излязло', 'е излязли'],
        acceptableAnswers: [['е излязъл', 'е излязла']],
      },
      {
        text: '– Чантата на Рада е на стола.\n– Може би _____. (върна се)',
        blanks: [1],
        correctAnswers: ['се е върнала'],
        options: ['се е върнала', 'се е върнал', 'се е върнало', 'са се върнали'],
        acceptableAnswers: [['се е върнала']],
      },
      {
        text: '– Дъщеря ми не е вкъщи.\n– Сигурно _____ на кино. (отида)',
        blanks: [1],
        correctAnswers: ['е отишла'],
        options: ['е отишла', 'е отишъл', 'е отишло', 'са отишли'],
        acceptableAnswers: [['е отишла']],
      },
      {
        text: '– Сега е шест часа.\n– Може би те вече _____ в Пловдив. (пристигна)',
        blanks: [1],
        correctAnswers: ['са пристигнали'],
        options: ['са пристигнали', 'е пристигнал', 'е пристигнала', 'сме пристигнали'],
        acceptableAnswers: [['са пристигнали']],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 25 — Упр. 25 (стр. 104): Може би се е обадила ────────────────────
  {
    id: 'a2-l10-ex-25',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 25',
    instruction: 'Изберете правилния отговор по модела.',
    order: 25,
    points: 3,
    layout: 'single',
    sentences: [
      {
        text: '– Пепа обади ли се по телефона?\n– Не зная, **може би** се е **обадила**. (Модел)',
        blanks: [],
        correctAnswers: [],
        isExample: true,
      },
      {
        text: '– Ясер пи ли кафе?\n– _____.',
        blanks: [1],
        correctAnswers: ['Не зная, може би е пил'],
        options: ['Не зная, може би е пил', 'Не зная, може би е пила', 'Не зная, може би е пили'],
        acceptableAnswers: [['Не зная, може би е пил', 'не зная, може би е пил', 'Може би е пил', 'може би е пил']],
      },
      {
        text: '– Камен върна ли се от работа?\n– _____.',
        blanks: [1],
        correctAnswers: ['Не зная, може би се е върнал'],
        options: ['Не зная, може би се е върнал', 'Не зная, може би се е върнала', 'Не зная, може би са се върнали'],
        acceptableAnswers: [['Не зная, може би се е върнал', 'не зная, може би се е върнал', 'Може би се е върнал', 'може би се е върнал']],
      },
      {
        text: '– Вчера децата играха ли навън?\n– _____.',
        blanks: [1],
        correctAnswers: ['Не зная, може би са играли'],
        options: ['Не зная, може би са играли', 'Не зная, може би е играл', 'Не зная, може би е играла'],
        acceptableAnswers: [['Не зная, може би са играли', 'не зная, може би са играли', 'Може би са играли', 'може би са играли']],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 26 — Упр. 26 (стр. 105): Глагол в скоби ─────────────────────────
  {
    id: 'a2-l10-ex-26',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 26',
    instruction: 'Изберете правилната форма на глагола — минало свършено или минало неопределено.',
    order: 26,
    points: 4,
    layout: 'single',
    sentences: [
      {
        text: 'Никога не **съм бил** в Англия. (съм) (Модел)',
        blanks: [],
        correctAnswers: [],
        isExample: true,
      },
      {
        text: 'Още не _____ на опера. (ходя)',
        blanks: [1],
        correctAnswers: ['съм ходил'],
        options: ['съм ходил', 'ходих', 'ходя', 'съм ходила'],
        acceptableAnswers: [['съм ходил', 'съм ходила']],
      },
      {
        text: 'Миналото лято _____ на море в Гърция. (ходя)',
        blanks: [1],
        correctAnswers: ['ходих'],
        options: ['ходих', 'съм ходил', 'ходя', 'ходила съм'],
        acceptableAnswers: [['ходих']],
      },
      {
        text: 'Снощи _____ сарми за вечеря. (ям)',
        blanks: [1],
        correctAnswers: ['ядох'],
        options: ['ядох', 'съм ял', 'ям', 'яла съм'],
        acceptableAnswers: [['ядох']],
      },
      {
        text: 'Никога не _____ в този ресторант. (ям)',
        blanks: [1],
        correctAnswers: ['съм ял'],
        options: ['съм ял', 'ядох', 'ям', 'съм яла'],
        acceptableAnswers: [['съм ял', 'съм яла']],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 27 — Упр. 27 (стр. 105): Интервю за работа — Али Рамадан ─────────
  {
    id: 'a2-l10-tekst-ali-interview',
    type: 'reading_text',
    title: 'ДОПЪЛНИТЕЛНИ УПРАЖНЕНИЯ',
    textTitle: 'Интервю за работа',
    instruction: 'Изслушайте текста и след това го прочетете сами.',
    order: 27,
    showDictionary: true,
    paragraphs: [
      '– Добър ден. Заповядайте, седнете. Как се казвате?',
      '– Казвам се Али Рамадан. Кандидатствам по обявата за готвач. Изпратил съм автобиография.',
      '– Да, виждам. Вие сте от Сирия, нали?',
      '– Да, аз съм бежанец и от три години живея в България със семейството си.',
      '– Говорите добре български. Къде сте го учили?',
      '– Ходих на курс по български език и също имам много приятели българи.',
      '– Чудесно! В автобиографията Ви пише, че сте били главен готвач в Дамаск. Къде сте работили там?',
      '– Работил съм в ресторанти на големи хотели.',
      '– Също така сте работили в София. В кой ресторант?',
      '– В ресторант „Българска скара". Там работих две години като помощник главен готвач.',
      '– И какво стана? Защо сега не работите там?',
      '– Защото ресторантът вече не работи.',
      '– Да, разбирам. Ресторантът ни предлага традиционна българска кухня. Ще се справите ли?',
      '– Да, имам опит с българската кухня. Казах Ви, че съм работил в български ресторант.',
      '– Добре. Ще започнете на граждански договор за три месеца. Ако работите добре, ще подпишем трудов договор. Имате ли статут на бежанец?',
      '– Да, имам. Благодаря много. А каква е заплатата?',
      '– Сега ще говорим за това…',
    ],
    ttsParagraphs: [
      'Добър ден. Заповядайте, седнете. Как се казвате?',
      'Казвам се Али Рамадан. Кандидатствам по обявата за готвач. Изпратил съм автобиография.',
      'Да, виждам. Вие сте от Сирия, нали?',
      'Да, аз съм бежанец и от три години живея в България със семейството си.',
      'Говорите добре български. Къде сте го учили?',
      'Ходих на курс по български език и също имам много приятели българи.',
      'Чудесно! В автобиографията Ви пише, че сте били главен готвач в Дамаск. Къде сте работили там?',
      'Работил съм в ресторанти на големи хотели.',
      'Също така сте работили в София. В кой ресторант?',
      'В ресторант Българска скара. Там работих две години като помощник главен готвач.',
      'И какво стана? Защо сега не работите там?',
      'Защото ресторантът вече не работи.',
      'Да, разбирам. Ресторантът ни предлага традиционна българска кухня. Ще се справите ли?',
      'Да, имам опит с българската кухня. Казах Ви, че съм работил в български ресторант.',
      'Добре. Ще започнете на граждански договор за три месеца. Ако работите добре, ще подпишем трудов договор. Имате ли статут на бежанец?',
      'Да, имам. Благодаря много. А каква е заплатата?',
      'Сега ще говорим за това…',
    ],
    paragraphVoiceGenders: ['female', 'male', 'female', 'male', 'female', 'male', 'female', 'male', 'female', 'male', 'female', 'male', 'female', 'male', 'female', 'male', 'female'],
  } as ReadingTextExercise,

  // ─── ORDER 28 — Упр. 28 (стр. 105): Вярно или грешно? ───────────────────────
  {
    id: 'a2-l10-ex-28',
    type: 'true_false',
    title: 'УПРАЖНЕНИЕ 28',
    instruction: 'Прочетете текста и определете дали твърденията са верни (✓) или неверни (✗).',
    order: 28,
    points: 12,
    sentences: [
      { id: 'tf1',  text: 'Али кандидатства за работа като сервитьор.',        isTrue: false },
      { id: 'tf2',  text: 'Той е изпратил автобиография.',                     isTrue: true  },
      { id: 'tf3',  text: 'Той е от Иран.',                                    isTrue: false },
      { id: 'tf4',  text: 'Той е в България от три години без семейството си.', isTrue: false },
      { id: 'tf5',  text: 'Али е учил български на курс.',                     isTrue: true  },
      { id: 'tf6',  text: 'Той няма приятели българи.',                         isTrue: false },
      { id: 'tf7',  text: 'Той е работил като главен готвач в Дамаск.',         isTrue: true  },
      { id: 'tf8',  text: 'Той е работил в ресторант в Пловдив.',               isTrue: false },
      { id: 'tf9',  text: 'Али не може да готви българска храна.',              isTrue: false },
      { id: 'tf12', text: 'Шефът харесва Али за готвач в ресторанта.',          isTrue: true  },
      { id: 'tf10', text: 'Той ще започне работа на граждански договор за пет месеца.', isTrue: false },
      { id: 'tf11', text: 'Али няма статут на бежанец.',                        isTrue: false },
    ],
  } as TrueFalseExercise,

  // ─── ORDER 29 — Упр. 29 (стр. 105): Прочетете съветите ─────────────────────
  {
    id: 'a2-l10-ex-29',
    type: 'true_false',
    title: 'УПРАЖНЕНИЕ 29',
    instruction: 'Определете кои съвети преди интервю за работа са верни (✓) или неверни (✗).',
    order: 29,
    points: 6,
    sentences: [
      { id: 'c1', text: 'Добре е да изпратите добре написано CV.',                      isTrue: true  },
      { id: 'c2', text: 'Не е нужно да се подготвяте с въпроси и отговори.',             isTrue: false },
      { id: 'c3', text: 'Добре е да отидете пет минути по-рано.',                        isTrue: true  },
      { id: 'c4', text: 'На интервю трябва да се облечете много спортно.',               isTrue: false },
      { id: 'c5', text: 'Отговаряйте ясно и кратко на въпросите.',                       isTrue: true  },
      { id: 'c6', text: 'Добре е да закъснеете за интервюто.',                           isTrue: false },
    ],
  } as TrueFalseExercise,

  // ─── ORDER 30 — Упр. 30 (стр. 106): Текст — Елена от Сирия ─────────────────
  {
    id: 'a2-l10-tekst-elena',
    type: 'reading_text',
    title: 'ТЕКСТОВЕ',
    textTitle: 'История на една имигрантка в България',
    instruction: 'Изслушайте текста и след това го прочетете сами.',
    order: 30,
    showDictionary: true,
    images: [
      { imageUrl: `${ASSET}/09-tekst-elena/01-zhena-shapka-cherno.jpg`,        label: 'Имигрантка в България',     ttsWordId: 'elena-img-01' },
      { imageUrl: `${ASSET}/09-tekst-elena/02-zhena-skal-pamuk.jpg`,           label: 'Имигрантка в България',     ttsWordId: 'elena-img-02' },
      { imageUrl: `${ASSET}/09-tekst-elena/03-zhena-usmivka-hidzhab.jpg`,      label: 'Имигрантка в България',     ttsWordId: 'elena-img-03' },
      { imageUrl: `${ASSET}/09-tekst-elena/04-detsa-lyulka.jpg`,               label: 'Деца на люлка',             ttsWordId: 'elena-img-04' },
      { imageUrl: `${ASSET}/09-tekst-elena/05-zhena-dete-esen.jpg`,            label: 'Жена с дете',               ttsWordId: 'elena-img-05' },
      { imageUrl: `${ASSET}/09-tekst-elena/06-zhena-bebe-sinyo.jpg`,           label: 'Жена с бебе',               ttsWordId: 'elena-img-06' },
      { imageUrl: `${ASSET}/09-tekst-elena/07-zhena-doska-arabski.jpg`,        label: 'Учителка с дъска',          ttsWordId: 'elena-img-07' },
      { imageUrl: `${ASSET}/09-tekst-elena/08-zhena-profil-lilav-hidzhab.jpg`, label: 'Жена с хиджаб',             ttsWordId: 'elena-img-08' },
      { imageUrl: `${ASSET}/09-tekst-elena/09-dve-zheni-doska.jpg`,            label: 'Две жени пред дъска',       ttsWordId: 'elena-img-09' },
    ],
    paragraphs: [
      'Тя е Елена от Сирия. Преди единадесет години родителите й с четирите си деца идват в България. Намират квартира и посещават всички заедно курс по български език. Тогава Елена е на петнадесет години.',
      'След това тя става ученичка в девети клас в едно софийско училище. В същото време е доброволка в Бежанско-мигрантската служба в Червен кръст. Тя ходи в различни училища и офисите на СЖББ, разговаря с учениците и разказва как се чувстват тези хора в друга страна без дом, без да знаят езика, без работа, далече от близки и роднини.',
      'Заедно с други доброволци организира тържества за бежанците за празниците им.',
      'След като завършва училище, я канят да работи в Съвета на жените бежанки в България (СЖББ).',
      'Тя приема и вече осем години помага на бежанците в трудни ситуации. Среща се с тях в офисите на СЖББ, разговаря с тях за проблемите им и търси заедно решение.',
      'Елена участва в много семинари в страната и в чужбина за обмяна на опит и нови идеи, свързани с бежанците.',
      'Тя обича много работата си и всеки момент е готова да подаде ръка на хората в нужда.',
    ],
    ttsParagraphs: [
      'Тя е Елена от Сирия. Преди единадесет години родителите й с четирите си деца идват в България. Намират квартира и посещават всички заедно курс по български език. Тогава Елена е на петнадесет години.',
      'След това тя става ученичка в девети клас в едно софийско училище. В същото време е доброволка в Бежанско-мигрантската служба в Червен кръст. Тя ходи в различни училища и офисите на организацията, разговаря с учениците и разказва как се чувстват тези хора в друга страна без дом, без да знаят езика, без работа, далече от близки и роднини.',
      'Заедно с други доброволци организира тържества за бежанците за празниците им.',
      'След като завършва училище, я канят да работи в Съвета на жените бежанки в България.',
      'Тя приема и вече осем години помага на бежанците в трудни ситуации. Среща се с тях в офисите на организацията, разговаря с тях за проблемите им и търси заедно решение.',
      'Елена участва в много семинари в страната и в чужбина за обмяна на опит и нови идеи, свързани с бежанците.',
      'Тя обича много работата си и всеки момент е готова да подаде ръка на хората в нужда.',
    ],
    paragraphVoiceGenders: ['female', 'female', 'female', 'female', 'female', 'female', 'female'],
  } as ReadingTextExercise,

  // ─── ORDER 31 — Упр. 31 (стр. 106): Отговорете на въпросите — Елена ───────────
  // (Клиентът означава като „29 & 30")
  {
    id: 'a2-l10-ex-31',
    type: 'multiple_choice',
    title: 'УПРАЖНЕНИЕ 31',
    instruction: 'Изберете правилния отговор.',
    order: 31,
    points: 9,
    questions: [
      {
        question: 'На колко години е Елена, когато идва в България?',
        options: [
          'На десет години',
          'На дванадесет години',
          'На петнадесет години',
          'На осемнадесет години',
        ],
        correctIndex: 2,
      },
      {
        question: 'Къде учи, за да завърши средно образование?',
        options: [
          'В университет',
          'В софийско училище',
          'В чужбина',
          'В частна академия',
        ],
        correctIndex: 1,
      },
      {
        question: 'Къде е доброволка?',
        options: [
          'В училище',
          'В общината',
          'В Червения кръст',
          'В университет',
        ],
        correctIndex: 2,
      },
      {
        question: 'За какво разговаря с учениците?',
        options: [
          'За училищните предмети',
          'За живота на бежанците',
          'За спорт',
          'За пътувания',
        ],
        correctIndex: 1,
      },
      {
        question: 'Какво организира заедно с другите доброволци?',
        options: [
          'Курсове по езици',
          'Спортни състезания',
          'Тържества за бежанците',
          'Екскурзии',
        ],
        correctIndex: 2,
      },
      {
        question: 'Къде започва работа след училище?',
        options: [
          'В училище',
          'В Съвета на жените бежанки',
          'В болница',
          'В чужбина',
        ],
        correctIndex: 1,
      },
      {
        question: 'С какво помага на бежанците?',
        options: [
          'Преподава им математика',
          'Готви за тях',
          'Разговаря с тях и търси решения на проблемите им',
          'Играе с децата им',
        ],
        correctIndex: 2,
      },
      {
        question: 'В какви семинари участва?',
        options: [
          'Само в България',
          'Само в чужбина',
          'В страната и в чужбина',
          'Само онлайн',
        ],
        correctIndex: 2,
      },
      {
        question: 'Какъв човек е Елена?',
        options: [
          'Ленив и безразличен',
          'Помагащ и всеотдаен',
          'Строг и затворен',
          'Несериозен',
        ],
        correctIndex: 1,
      },
    ],
  } as MultipleChoiceExercise,

  // ─── ORDER 32 — Упр. 32 (стр. 107): Текст — Пулус (неврохирург) ──────────────
  // (Клиентът означава като „31 & 32")
  {
    id: 'a2-l10-tekst-pulus',
    type: 'reading_text',
    title: 'УПРАЖНЕНИЕ 32',
    textTitle: 'История на един имигрант в България',
    instruction: 'Изслушайте текста и след това го прочетете сами.',
    order: 32,
    showDictionary: true,
    voiceGender: 'male',
    audioUrl: '/assets/a2-lesson-10/audio/tts/texts/a2-l10-tekst-pulus-full.mp3',
    images: [
      { imageUrl: `${ASSET}/10-tekst-pulus/01-nevrohirurg.jpg`, label: 'Пулус — неврохирург', ttsWordId: 'pulus-img-01' },
    ],
    paragraphs: [
      'Пулус е иракчанин. Той учи пет години медицина в Багдад, но не завършва, защото идва в България като бежанец.',
      'Пулус пристига в България преди петнадесет години. Иска да продължи образованието си по медицина, но няма документи и трябва да започне всичко отначало. Учи сериозно български език. След три години успява да влезе в Медицинска академия и я завършва с отличен успех след упоритата работа.',
      'После специализира три години в една софийска болница, защото мечтата му е да стане хирург. И успява. Сега е неврохирург, прави операции, грижи се много за пациентите и обича работата си.',
      'През цялото време до него са двете му сестри, които го подкрепят и окуражават. Тримата са християни и в неделя ходят заедно на църква. Искат да живеят и да бъдат полезни в страната ни, която за тях и за сестрите му е втора родина.',
    ],
  } as ReadingTextExercise,

  // ─── ORDER 33 — Упр. 33 (стр. 107): Отговорете на въпросите — Пулус ───────────
  {
    id: 'a2-l10-ex-33',
    type: 'multiple_choice',
    title: 'УПРАЖНЕНИЕ 33',
    instruction: 'Изберете правилния отговор.',
    order: 33,
    points: 13,
    questions: [
      {
        question: 'Откъде е Пулус?',
        options: [
          'От Сирия',
          'От Ирак',
          'От България',
          'От Турция',
        ],
        correctIndex: 1,
      },
      {
        question: 'Защо не завършва висше образование в Ирак?',
        options: [
          'Защото не иска',
          'Защото няма пари',
          'Защото идва в България като бежанец',
          'Защото сменя специалността',
        ],
        correctIndex: 2,
      },
      {
        question: 'Кога пристига в България?',
        options: [
          'Преди пет години',
          'Преди десет години',
          'Преди петнадесет години',
          'Преди двадесет години',
        ],
        correctIndex: 2,
      },
      {
        question: 'Какво иска да прави, след като пристига в България?',
        options: [
          'Да започне работа веднага',
          'Да продължи образованието си',
          'Да се върне в Ирак',
          'Да пътува',
        ],
        correctIndex: 1,
      },
      {
        question: 'Защо не може да продължи образованието си?',
        options: [
          'Защото не знае езика',
          'Защото няма документи',
          'Защото няма време',
          'Защото не иска',
        ],
        correctIndex: 1,
      },
      {
        question: 'Кога успява да влезе в Медицинска академия?',
        options: [
          'След една година',
          'След три години',
          'След пет години',
          'Веднага',
        ],
        correctIndex: 1,
      },
      {
        question: 'С какъв успех завършва Академията?',
        options: [
          'Среден',
          'Добър',
          'Отличен',
          'Слаб',
        ],
        correctIndex: 2,
      },
      {
        question: 'Къде специализира, след като завършва медицина?',
        options: [
          'В чужбина',
          'В малък град',
          'В софийска болница',
          'В университет',
        ],
        correctIndex: 2,
      },
      {
        question: 'Каква е мечтата му?',
        options: [
          'Да стане учител',
          'Да стане хирург',
          'Да стане инженер',
          'Да стане бизнесмен',
        ],
        correctIndex: 1,
      },
      {
        question: 'Какво работи сега?',
        options: [
          'Общ лекар',
          'Медицинска сестра',
          'Неврохирург',
          'Фармацевт',
        ],
        correctIndex: 2,
      },
      {
        question: 'Кой го подкрепя в трудни моменти?',
        options: [
          'Родителите му',
          'Приятелите му',
          'Сестрите му',
          'Колегите му',
        ],
        correctIndex: 2,
      },
      {
        question: 'Къде ходят в неделя Пулус и сестрите му?',
        options: [
          'На пазар',
          'В парка',
          'На църква',
          'На работа',
        ],
        correctIndex: 2,
      },
      {
        question: 'Какво е България за него и за сестрите му?',
        options: [
          'Временен дом',
          'Втора родина',
          'Туристическа дестинация',
          'Работно място',
        ],
        correctIndex: 1,
      },
    ],
  } as MultipleChoiceExercise,

  // ─── ORDER 34 — Упр. 34 (стр. 108): Текст — Рамин (архитект) ────────────────
  {
    id: 'a2-l10-tekst-ramin',
    type: 'reading_text',
    title: 'УПРАЖНЕНИЕ 34',
    textTitle: 'История на един имигрант в България',
    instruction: 'Изслушайте текста и след това го прочетете сами.',
    order: 34,
    showDictionary: true,
    images: [
      { imageUrl: `${ASSET}/11-tekst-ramin/01-ramin-arhitekt.jpg`, label: 'Рамин — архитект', ttsWordId: 'ramin-img-01' },
    ],
    paragraphs: [
      'Рамин е бежанец от Афганистан. Той е на две години, когато семейството му идва в София. Баща му е известен поет, писател и преподавател.',
      'Мечтата на малкия син Рамин е да стане архитект — и тя се превръща в реалност. Рамин завършва Варненския свободен университет. Започва работа като архитект в София. Обича града дори повече от софиянци.',
      'Семейството му получава българско гражданство. Баща му, професор Райен, се връща в Афганистан и преподава персийска литература в Кабулския университет след двадесет години прекъсване.',
      'Случайно или не, но точно синът му — архитект Рамин Райен, дошъл в България като двегодишен бежанец, проектира вътрешното разпределение на офиса на Върховния комисариат по бежанците към ООН в България.',
    ],
    ttsParagraphs: [
      'Рамин е бежанец от Афганистан. Той е на две години, когато семейството му идва в София. Баща му е известен поет, писател и преподавател.',
      'Мечтата на малкия син Рамин е да стане архитект — и тя се превръща в реалност. Рамин завършва Варненския свободен университет. Започва работа като архитект в София. Обича града дори повече от софиянци.',
      'Семейството му получава българско гражданство. Баща му, професор Райен, се връща в Афганистан и преподава персийска литература в Кабулския университет след двадесет години прекъсване.',
      'Случайно или не, но точно синът му — архитект Рамин Райен, дошъл в България като двегодишен бежанец, проектира вътрешното разпределение на офиса на Върховния комисариат по бежанците към Организацията на обединените нации в България.',
    ],
    paragraphVoiceGenders: ['male', 'male', 'male', 'male'],
  } as ReadingTextExercise,

  // ─── ORDER 35 — Упр. 35 (стр. 108): Вярно или грешно? — Рамин ───────────────
  {
    id: 'a2-l10-ex-35',
    type: 'true_false',
    title: 'УПРАЖНЕНИЕ 35',
    instruction: 'Прочетете текста и определете дали твърденията са верни (✓) или неверни (✗).',
    order: 35,
    points: 7,
    sentences: [
      { id: 'r1', text: 'Рамин е бежанец от Ирак.',                                           isTrue: false },
      { id: 'r2', text: 'Когато семейството му идва в София, той не е роден.',                isTrue: false },
      { id: 'r3', text: 'Мечтата на момчето е да стане архитект.',                            isTrue: true  },
      { id: 'r4', text: 'Той завършва Бургаския свободен университет.',                       isTrue: false },
      { id: 'r5', text: 'Баща му е преподавател по история.',                                 isTrue: false },
      { id: 'r6', text: 'Професор Райен се връща в Афганистан след двадесет години прекъсване.', isTrue: true  },
      { id: 'r7', text: 'Рамин проектира вътрешното разпределение на офиса на Държавна агенция за бежанците.', isTrue: false },
    ],
  } as TrueFalseExercise,

  // ─── ORDER 36 — Упр. 36 (стр. 108): Какво е общото между тримата? ─────────────
  {
    id: 'a2-l10-ex-36',
    type: 'true_false',
    title: 'УПРАЖНЕНИЕ 36',
    instruction: 'Прочетете текстовете за Елена, Пулус и Рамин и определете дали твърденията са верни (✓) или неверни (✗).',
    order: 36,
    points: 5,
    sentences: [
      { id: 'p1', text: 'И тримата са бежанци, дошли в България.',                     isTrue: true  },
      { id: 'p2', text: 'Никой от тримата не е завършил образование.',                  isTrue: false },
      { id: 'p3', text: 'И тримата са постигнали важни неща в живота си.',               isTrue: true  },
      { id: 'p4', text: 'Тримата не искат да живеят в България.',                        isTrue: false },
      { id: 'p5', text: 'И тримата искат да бъдат полезни на хората.',                  isTrue: true  },
    ],
  } as TrueFalseExercise,

  // ─── ORDER 37 — Упр. 37 (стр. 108): За какво мечтаете Вие? ────────────────────
  {
    id: 'a2-l10-ex-37',
    type: 'true_false',
    title: 'УПРАЖНЕНИЕ 37',
    instruction: 'Прочетете текстовете и определете дали твърденията за героите са верни (✓) или неверни (✗).',
    order: 37,
    points: 6,
    sentences: [
      { id: 'dream1', text: 'Мечтата на Пулус беше да стане хирург.',                    isTrue: true  },
      { id: 'dream2', text: 'Рамин мечтаеше да стане лекар.',                            isTrue: false },
      { id: 'dream3', text: 'Пулус успя да завърши медицина в България.',                isTrue: true  },
      { id: 'dream4', text: 'Рамин не успя да стане архитект.',                          isTrue: false },
      { id: 'dream5', text: 'Елена помага на бежанците в трудни ситуации.',              isTrue: true  },
      { id: 'dream6', text: 'Рамин проектира офиса на ООН за бежанците в България.',     isTrue: true  },
    ],
  } as TrueFalseExercise,

];

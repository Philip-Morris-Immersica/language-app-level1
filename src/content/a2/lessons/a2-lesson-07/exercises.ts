import type {
  Exercise,
  ImageLabelingExercise,
  IllustratedCardsExercise,
  LetterChoiceExercise,
  DropdownMatchExercise,
  GrammarExamplesExercise,
  WorkbookFillBlankExercise,
  DialoguesExercise,
  MultipleChoiceExercise,
  GrammarTableExercise,
  ReadingTextExercise,
} from '@/content/types';

// ⚠️ Order follows the A2 textbook „Автобиография" (стр. 71–80).

const ASSET = '/assets/a2-lesson-07';

// TTS prompt за граматичните таблици: гладко четене на чист български с
// правилни ударения, без разделяне на срички и без чужд (руски) акцент.
const GEMINI_BG_SMOOTH_PROMPT =
  'Read aloud clearly and smoothly in standard Bulgarian with correct Bulgarian stress. Do not split words into syllables and do not use any foreign or Russian accent.';

export const exercises: Exercise[] = [

  // ─── ORDER 1 — Упр. 1 (стр. 71): Напишете професиите под картинките ──────────
  {
    id: 'a2-l07-ex-01',
    type: 'image_labeling',
    title: 'УПРАЖНЕНИЕ 1',
    instruction: 'Изберете правилната дума под всяка картинка.',
    order: 1,
    points: 6,
    displayType: 'default',
    columns: 3,
    images: [
      { id: 'lekar',      imageUrl: `${ASSET}/01-upr-01-profesii/01-lekar.jpg`,      correctLabel: 'лекар',      imageOptions: ['лекар', 'полицай', 'фризьор', 'бизнесмен', 'учител', 'бизнесдама'] },
      { id: 'policay',    imageUrl: `${ASSET}/01-upr-01-profesii/02-policay.jpg`,    correctLabel: 'полицай',    imageOptions: ['полицай', 'лекар', 'учител', 'шофьор'] },
      { id: 'frizyor',    imageUrl: `${ASSET}/01-upr-01-profesii/03-frizyor.jpg`,    correctLabel: 'фризьор',    imageOptions: ['фризьор', 'шивач', 'работник', 'готвач'] },
      { id: 'biznesmen',  imageUrl: `${ASSET}/01-upr-01-profesii/04-biznesmen.jpg`,  correctLabel: 'бизнесмен',  imageOptions: ['бизнесмен', 'директор', 'адвокат', 'инженер'] },
      { id: 'uchitel',    imageUrl: `${ASSET}/01-upr-01-profesii/05-uchitel.jpg`,    correctLabel: 'учител',     imageOptions: ['учител', 'лекар', 'директор', 'бизнесмен'] },
      { id: 'biznesdama', imageUrl: `${ASSET}/01-upr-01-profesii/06-biznesdama.jpg`, correctLabel: 'бизнесдама', imageOptions: ['бизнесдама', 'секретарка', 'учителка', 'лекарка'] },
    ],
    options: ['бизнесмен', 'бизнесдама', 'лекар', 'полицай', 'учител', 'фризьор'],
  } as ImageLabelingExercise,

  // ─── ORDER 2 — НОВИ ДУМИ 1 (стр. 71): Професии ───────────────────────────────
  {
    id: 'a2-l07-novi-dumi-1',
    type: 'illustrated_cards',
    title: 'НОВИ ДУМИ 1',
    order: 2,
    cards: [
      { id: 'direktor',   imageUrl: `${ASSET}/02-novi-dumi-1-profesii/01-direktor.jpg`,   label: 'директор',   ttsLabel: 'директор' },
      { id: 'advokat',    imageUrl: `${ASSET}/02-novi-dumi-1-profesii/02-advokat.jpg`,    label: 'адвокат',    ttsLabel: 'адвокат' },
      { id: 'inzhener',   imageUrl: `${ASSET}/02-novi-dumi-1-profesii/03-inzhener.jpg`,   label: 'инженер',    ttsLabel: 'инженер' },
      { id: 'prevodach',  imageUrl: `${ASSET}/02-novi-dumi-1-profesii/04-prevodach.jpg`,  label: 'преводач',   ttsLabel: 'преводач' },
      { id: 'sekretarka', imageUrl: `${ASSET}/02-novi-dumi-1-profesii/05-sekretarka.jpg`, label: 'секретарка', ttsLabel: 'секретарка' },
      { id: 'rabotnik',   imageUrl: `${ASSET}/02-novi-dumi-1-profesii/06-rabotnik.jpg`,   label: 'работник',   ttsLabel: 'работник' },
      { id: 'prodavach',  imageUrl: `${ASSET}/02-novi-dumi-1-profesii/07-prodavach.jpg`,  label: 'продавач',   ttsLabel: 'продавач' },
      { id: 'shofyor',    imageUrl: `${ASSET}/02-novi-dumi-1-profesii/08-shofyor.jpg`,    label: 'шофьор',     ttsLabel: 'шофьор' },
      { id: 'gotvach',    imageUrl: `${ASSET}/02-novi-dumi-1-profesii/09-gotvach.jpg`,    label: 'готвач',     ttsLabel: 'готвач' },
      { id: 'shivach',    imageUrl: `${ASSET}/02-novi-dumi-1-profesii/10-shivach.jpg`,    label: 'шивач',      ttsLabel: 'шивач' },
    ],
  } as IllustratedCardsExercise,

  // ─── ORDER 3 — Упр. 2 (стр. 71): Напишете липсващите букви ──────────────────
  {
    id: 'a2-l07-ex-02',
    type: 'letter_choice',
    title: 'УПРАЖНЕНИЕ 2',
    instruction: 'Попълнете липсващите букви в думите.',
    order: 3,
    points: 10,
    puzzles: [
      { id: 'rabotnik',   word: 'Р_Б_ТН_К',    correctLetters: ['А', 'О', 'И'] },
      { id: 'gotvach',    word: 'Г_ТВ_Ч',      correctLetters: ['О', 'А'] },
      { id: 'sekretarka', word: 'С_КР_Т_РК_',  correctLetters: ['Е', 'Е', 'А', 'А'] },
      { id: 'prevodach',  word: 'ПР_В_Д_Ч',    correctLetters: ['Е', 'О', 'А'] },
      { id: 'shofyor',    word: '_ОФЬ_Р',       correctLetters: ['Ш', 'О'] },
      { id: 'inzhener',   word: '_НЖ_Н_Р',      correctLetters: ['И', 'Е', 'Е'] },
      { id: 'direktor',   word: 'Д_Р_КТ_Р',    correctLetters: ['И', 'Е', 'О'] },
      { id: 'advokat',    word: '_ДВ_К_Т',      correctLetters: ['А', 'О', 'А'] },
      { id: 'prodavach',  word: 'ПР_Д_В_Ч',    correctLetters: ['О', 'А', 'А'] },
      { id: 'shivach',    word: 'Ш_В_Ч',       correctLetters: ['И', 'А'] },
    ],
  } as LetterChoiceExercise,

  // ─── ORDER 4 — Упр. 3 (стр. 71): Свържете професията с работното място ───────
  {
    id: 'a2-l07-ex-03',
    type: 'dropdown_match',
    title: 'УПРАЖНЕНИЕ 3',
    instruction: 'Изберете правилното работно място за всяка професия.',
    order: 4,
    points: 7,
    questions: [
      { id: 'q1', left: 'полицай',  options: ['полиция', 'болница', 'магазин', 'ресторант', 'офис', 'училище', 'фризьорски салон'], correctAnswer: 'полиция' },
      { id: 'q2', left: 'учител',   options: ['училище', 'болница', 'магазин', 'ресторант', 'полиция', 'офис', 'фризьорски салон'], correctAnswer: 'училище' },
      { id: 'q3', left: 'готвач',   options: ['ресторант', 'болница', 'магазин', 'полиция', 'офис', 'училище', 'фризьорски салон'], correctAnswer: 'ресторант' },
      { id: 'q4', left: 'фризьор',  options: ['фризьорски салон', 'болница', 'магазин', 'ресторант', 'полиция', 'офис', 'училище'], correctAnswer: 'фризьорски салон' },
      { id: 'q5', left: 'директор', options: ['офис', 'болница', 'магазин', 'ресторант', 'полиция', 'училище', 'фризьорски салон'], correctAnswer: 'офис', alternateCorrectAnswers: ['училище'] },
      { id: 'q6', left: 'продавач', options: ['магазин', 'болница', 'ресторант', 'полиция', 'офис', 'училище', 'фризьорски салон'], correctAnswer: 'магазин' },
      { id: 'q7', left: 'лекар',    options: ['болница', 'магазин', 'ресторант', 'полиция', 'офис', 'училище', 'фризьорски салон'], correctAnswer: 'болница' },
    ],
  } as DropdownMatchExercise,

  // ─── ORDER 5 — ГРАМАТИКА 1 (стр. 72): Род и число на професии ──────────────────
  {
    id: 'a2-l07-gramatika-01',
    type: 'grammar_examples',
    title: 'ГРАМАТИКА 1',
    instruction: 'Запознайте се с рода и множественото число на съществителните имена за професии.',
    instructionKey: 'a2.gr.l07.profesiiRod',
    order: 5,
    layout: 'centered',
    examples: [
      {
        imageUrl: '',
        text: 'Род и число',
        lines: [
          'Иво е **учител**. Иво и Милен са **учители**.',
          'Катя е **учителка**. Катя и Светла са **учителки**.',
          'Иво и Катя са **учители**.',
        ],
        ttsText: 'Род и число. Иво е учител. Иво и Милен са учители. Катя е учителка. Катя и Светла са учителки. Иво и Катя са учители.',
        voiceGender: 'female',
      },
      {
        imageUrl: '',
        text: 'Внимание!',
        lines: [
          'бизнесмен — **бизнесдама**',
          'работник — **работничка**',
        ],
        ttsText: 'Внимание. Бизнесмен. Бизнесдама. Работник. Работничка.',
        voiceGender: 'female',
      },
      {
        imageUrl: '',
        text: 'Той е / Тя е',
        lines: [
          'полицай',
          'инженер',
          'адвокат',
          'директор',
          'шофьор',
        ],
        ttsText: 'Той е, Тя е. Полицай. Инженер. Адвокат. Директор. Шофьор.',
        voiceGender: 'female',
      },
    ],
  } as GrammarExamplesExercise,

  // ─── ORDER 6 — Упр. 4 (стр. 72): Следвайте модела — форми на профессиите ─────
  {
    id: 'a2-l07-ex-04',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 4',
    instruction: 'Попълнете по модела: фризьор → **фризьорка, фризьори**.',
    order: 6,
    points: 6,
    layout: 'two-column',
    sentences: [
      { text: 'фризьор → **фризьорка, фризьори**',                     blanks: [], correctAnswers: [], isExample: true },
      { text: 'преводач → _____',                                        blanks: [1], correctAnswers: ['преводачка, преводачи'], options: ['преводачка, преводачи', 'преводачка, преводачки', 'преводач, преводачи'], acceptableAnswers: [['преводачка, преводачи']] },
      { text: 'работник → _____',                                        blanks: [1], correctAnswers: ['работничка, работници'], options: ['работничка, работници', 'работничка, работнички', 'работника, работници'], acceptableAnswers: [['работничка, работници']] },
      { text: 'продавач → _____',                                        blanks: [1], correctAnswers: ['продавачка, продавачи'], options: ['продавачка, продавачи', 'продавачка, продавачки', 'продавача, продавачи'], acceptableAnswers: [['продавачка, продавачи']] },
      { text: 'готвач → _____',                                          blanks: [1], correctAnswers: ['готвачка, готвачи'], options: ['готвачка, готвачи', 'готвачка, готвачки', 'готваче, готвачи'], acceptableAnswers: [['готвачка, готвачи']] },
      { text: 'шивач → _____',                                           blanks: [1], correctAnswers: ['шивачка, шивачи'], options: ['шивачка, шивачи', 'шивачка, шивачки', 'шивача, шивачи'], acceptableAnswers: [['шивачка, шивачи']] },
      { text: 'учител → _____',                                          blanks: [1], correctAnswers: ['учителка, учители'], options: ['учителка, учители', 'учителка, учителки', 'учителя, учители'], acceptableAnswers: [['учителка, учители']] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 7 — ДИАЛОГ 1 (стр. 72): В офиса ──────────────────────────────────
  {
    id: 'a2-l07-dialozi-01',
    type: 'dialogues',
    title: 'ДИАЛОГ 1',
    instruction: 'Натиснете всяка реплика, за да чуете произношението. После прочетете диалога на глас.',
    order: 7,
    sections: [
      {
        id: 'а. В офиса',
        imageUrl: `${ASSET}/03-dialozi-1-ofis/01-ofis.jpg`,
        lines: [
          { text: '– Какъв сте по професия?', voiceGender: 'female', ttsText: '– Какъв сте по професия?' },
          { text: '– Аз съм инженер. Бях директор на фирма. Сега съм пенсионер. А Вие каква сте?', voiceGender: 'male' },
          { text: '– Аз съм преводачка. Превеждам документи от английски на български.', voiceGender: 'female' },
        ],
      },
    ],
  } as DialoguesExercise,

  // ─── ORDER 8 — ГРАМАТИКА 2 (стр. 72): Минало свършено — ИХ група ──────────────
  {
    id: 'a2-l07-gramatika-02',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 2',
    instruction: 'Запознайте се с минало свършено на глаголите от ИХ група.',
    instructionKey: 'a2.gr.l07.minaloIh',
    order: 8,
    tableTitle: 'Минало свършено — ИХ група (работя → работих)',
    columns: ['(+)'],
    rows: [
      { pronoun: 'аз',        cells: ['работих'],   ttsText: 'аз — работих',        ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'ти',        cells: ['работи'],    ttsText: 'ти — работи',         ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'той/тя/то', cells: ['работи'],    ttsText: 'той, тя, то — работи', ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'ние',       cells: ['работихме'], ttsText: 'ние — работихме',     ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'Вие',       cells: ['работихте'], ttsText: 'Вие — работихте',     ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'те',        cells: ['работиха'],  ttsText: 'те — работиха',       ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
    ],
    notes: [
      'Глаголи от ИХ група: правих, ходих, говорих, готвих, благодарих, търсих, мислих, учих',
      '⚠️ Внимание: мия → **мих**; пия → **пих**',
      'Вчера аз не **работих**. Ти **работи** ли вчера?',
    ],
    ttsNotes: [
      'Глаголи от их група: правих, ходих, говорих, готвих, благодарих, търсих, мислих, учих.',
      'Внимание. Мия — мих. Пия — пих.',
      'Вчера аз не работих. Ти работи ли вчера?',
    ],
    ttsNoteModels: ['pro', 'pro', 'pro'],
  } as GrammarTableExercise,

  // ─── ORDER 9 — Упр. 7 (стр. 72): Попълнете с правилната форма на глагола правя
  {
    id: 'a2-l07-ex-07',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 7',
    instruction: 'Изберете правилната форма на глагола **правя** в минало свършено.',
    order: 9,
    points: 4,
    layout: 'single',
    sentences: [
      { text: 'Снощи аз **правих** сандвич. (Модел)',                                           blanks: [], correctAnswers: [], isExample: true },
      { text: 'Тази сутрин той _____ сандвичи.',        blanks: [1], correctAnswers: ['прави'],    options: ['правих', 'прави', 'правиха'],    acceptableAnswers: [['прави']] },
      { text: 'Преди една седмица ние _____ торта.',    blanks: [1], correctAnswers: ['правихме'], options: ['правих', 'правихме', 'правиха'], acceptableAnswers: [['правихме']] },
      { text: 'Вие какво _____ вчера?',                blanks: [1], correctAnswers: ['правихте'], options: ['правихте', 'правихме', 'правиха'], acceptableAnswers: [['правихте']] },
      { text: 'Ти какво _____ онзи ден?',              blanks: [1], correctAnswers: ['прави'],    options: ['правих', 'прави', 'правихме'],    acceptableAnswers: [['прави']] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 10 — Упр. 8 (стр. 73): Попълнете окончанията на глаголите ──────────
  {
    id: 'a2-l07-ex-08',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 8',
    instruction: 'Изберете правилната форма в минало свършено по модела.',
    order: 10,
    points: 7,
    layout: 'single',
    sentences: [
      { text: 'Вчера аз **благодарих** на колегите за подаръка за рождения ми ден. (Модел)', blanks: [], correctAnswers: [], isExample: true },
      { text: 'Снощи ти работ___ ли до късно?',                    blanks: [1], correctAnswers: ['и'],    options: ['их', 'и', 'ихме', 'ихте', 'иха'], acceptableAnswers: [['и']] },
      { text: 'Преди три дни той ход___ на концерт.',               blanks: [1], correctAnswers: ['и'],    options: ['их', 'и', 'ихме', 'ихте', 'иха'], acceptableAnswers: [['и']] },
      { text: 'Те какво прав___ миналия уикенд?',                   blanks: [1], correctAnswers: ['иха'],  options: ['их', 'и', 'ихме', 'ихте', 'иха'], acceptableAnswers: [['иха']] },
      { text: 'Миналата седмица ние мисл___ много за вас.',          blanks: [1], correctAnswers: ['ихме'], options: ['их', 'и', 'ихме', 'ихте', 'иха'], acceptableAnswers: [['ихме']] },
      { text: 'Снощи вие готв___ ли супа?',                         blanks: [1], correctAnswers: ['ихте'], options: ['их', 'и', 'ихме', 'ихте', 'иха'], acceptableAnswers: [['ихте']] },
      { text: 'Преди един месец те търс___ квартира.',               blanks: [1], correctAnswers: ['иха'],  options: ['их', 'и', 'ихме', 'ихте', 'иха'], acceptableAnswers: [['иха']] },
      { text: 'През уикенда децата уч___ по английски.',             blanks: [1], correctAnswers: ['иха'],  options: ['их', 'и', 'ихме', 'ихте', 'иха'], acceptableAnswers: [['иха']] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 11 — Упр. 9 (стр. 73): Попълнете с подходящ глагол от списъка ──────
  {
    id: 'a2-l07-ex-09',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 9',
    instruction: 'Изберете подходящия глагол от списъка в минало свършено.',
    order: 11,
    points: 5,
    layout: 'single',
    sentences: [
      { text: 'Снощи вие **ходихте** ли на кино? (Модел)',                                                     blanks: [], correctAnswers: [], isExample: true },
      { text: 'Миналото лято ние _____ в един магазин за обувки.',   blanks: [1], correctAnswers: ['работихме'], options: ['говорихме', 'готвихме', 'работихме', 'ходихме', 'благодарихме'], acceptableAnswers: [['работихме']] },
      { text: 'Миналия уикенд той _____ на фитнес.',                 blanks: [1], correctAnswers: ['ходи'],      options: ['говори', 'готви', 'работи', 'ходи', 'благодари'],               acceptableAnswers: [['ходи']] },
      { text: 'Вчера те _____ мусака.',                              blanks: [1], correctAnswers: ['готвиха'],   options: ['говориха', 'готвиха', 'работиха', 'ходиха', 'благодариха'],    acceptableAnswers: [['готвиха']] },
      { text: 'Тя _____ на Петър за хубавите цветя.',                blanks: [1], correctAnswers: ['благодари'], options: ['говори', 'готви', 'работи', 'ходи', 'благодари'],               acceptableAnswers: [['благодари']] },
      { text: 'Преди една седмица те _____ по телефона с директора.', blanks: [1], correctAnswers: ['говориха'],  options: ['говориха', 'готвиха', 'работиха', 'ходиха', 'благодариха'],    acceptableAnswers: [['говориха']] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 12 — Упр. 10 (стр. 73): Попълнете окончанията на пия и мия ─────────
  {
    id: 'a2-l07-ex-10',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 10',
    instruction: 'Изберете правилната форма на глаголите **пия** и **мия** в минало свършено.',
    order: 12,
    points: 5,
    layout: 'single',
    sentences: [
      { text: 'Вчера **мих** колата. (Модел)',                                                              blanks: [], correctAnswers: [], isExample: true },
      { text: 'Тази сутрин аз _____ черен чай, жена ми _____ кафе, а децата _____ мляко с какао.',
        blanks: [1, 2, 3],
        correctAnswers: ['пих', 'пи', 'пиха'],
        options: [['пих', 'пи', 'пихме'], ['пи', 'пих', 'пиха'], ['пиха', 'пи', 'пихте']],
        acceptableAnswers: [['пих'], ['пи'], ['пиха']] },
      { text: 'Снощи гостите _____ бира.',                            blanks: [1], correctAnswers: ['пиха'],  options: ['пих', 'пи', 'пиха'],   acceptableAnswers: [['пиха']] },
      { text: 'Онзи ден ние _____ прозорците на апартамента.',        blanks: [1], correctAnswers: ['михме'], options: ['мих', 'ми', 'михме'],   acceptableAnswers: [['михме']] },
      { text: 'Сутринта вие _____ ли кафе?',                          blanks: [1], correctAnswers: ['пихте'], options: ['пих', 'пихте', 'пиха'], acceptableAnswers: [['пихте']] },
      { text: 'Миналата седмица те _____ улиците в квартала.',         blanks: [1], correctAnswers: ['миха'],  options: ['мих', 'ми', 'миха'],    acceptableAnswers: [['миха']] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 13 — ДИАЛОЗИ 2 (стр. 73): Skype и ресторант ─────────────────────
  {
    id: 'a2-l07-dialozi-02',
    type: 'dialogues',
    title: 'ДИАЛОЗИ 2',
    instruction: 'Натиснете всяка реплика, за да чуете произношението. После прочетете диалозите на глас.',
    order: 13,
    sections: [
      {
        id: 'а. Разговор по Скайп',
        imageUrl: `${ASSET}/04-dialozi-2-skype-restorant/01-skype-arhitektura.jpg`,
        lines: [
          { text: '– Мони, какво прави снощи?', voiceGender: 'female' },
          { text: '– Говорих с един приятел по Скайп. Сега той е студент в Нидерлания и учи архитектура.', voiceGender: 'male' },
        ],
      },
      {
        id: 'б. Работа в ресторант',
        imageUrl: `${ASSET}/04-dialozi-2-skype-restorant/02-restorant-gotvach-servityor.jpg`,
        lines: [
          { text: '– Какво работихте в Сирия?', voiceGender: 'female' },
          { text: '– Аз работих в един ресторант като сервитьор, а жена ми — като готвачка.', voiceGender: 'male' },
        ],
      },
    ],
  } as DialoguesExercise,

  // ─── ORDER 14 — Упр. 13 (стр. 73): Попълнете с като или в ───────────────────
  {
    id: 'a2-l07-ex-13',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 13',
    instruction: 'Изберете **като** или **в** за всяко изречение.',
    order: 14,
    points: 2,
    layout: 'single',
    sentences: [
      { text: 'Преди три години работих **като** сервитьор **в** арабски ресторант. (Модел)', blanks: [], correctAnswers: [], isExample: true },
      { text: 'Миналата година баща ми работи _____ един офис _____ преводач.',
        blanks: [1, 2],
        correctAnswers: ['в', 'като'],
        options: [['в', 'като'], ['като', 'в']],
        acceptableAnswers: [['в'], ['като']] },
      { text: 'Миналото лято ние работихме _____ един малък ресторант _____ готвачи.',
        blanks: [1, 2],
        correctAnswers: ['в', 'като'],
        options: [['в', 'като'], ['като', 'в']],
        acceptableAnswers: [['в'], ['като']] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 15 — ГРАМАТИКА 3 (стр. 74): ИХ група — купих ─────────────────────
  {
    id: 'a2-l07-gramatika-03',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 3',
    instruction: 'Запознайте се с минало свършено на глаголите от ИХ група — купих тип.',
    instructionKey: 'a2.gr.l07.kupih',
    order: 15,
    tableTitle: 'Минало свършено — ИХ група (купувам → купих)',
    columns: ['(+)', '(−)', '(?)'],
    rows: [
      { pronoun: 'аз',        cells: ['купих',   'не купих',   'купих ли?'],   ttsText: 'аз. Купих. Не купих. Купих ли?' },
      { pronoun: 'ти',        cells: ['купи',    'не купи',    'купи ли?'],    ttsText: 'ти. Купи. Не купи. Купи ли?' },
      { pronoun: 'той/тя/то', cells: ['купи',    'не купи',    'купи ли?'],    ttsText: 'той, тя, то. Купи. Не купи. Купи ли?' },
      { pronoun: 'ние',       cells: ['купихме', 'не купихме', 'купихме ли?'], ttsText: 'ние. Купихме. Не купихме. Купихме ли?' },
      { pronoun: 'Вие',       cells: ['купихте', 'не купихте', 'купихте ли?'], ttsText: 'Вие. Купихте. Не купихте. Купихте ли?' },
      { pronoun: 'те',        cells: ['купиха',  'не купиха',  'купиха ли?'],  ttsText: 'те. Купиха. Не купиха. Купиха ли?' },
    ],
    notes: [
      'Глаголи от ИХ група (купих тип): изпратих, забравих, отворих, затворих, поканих, разходих се, обадих се, завърших, получих',
      'Аз не купих цветя. Ти купи ли цветя?',
    ],
    ttsNotes: [
      'Глаголи от их група, тип купих: изпратих, забравих, отворих, затворих, поканих, разходих се, обадих се, завърших, получих.',
      'Аз не купих цветя. Ти купи ли цветя?',
    ],
    ttsNoteModels: ['pro', 'pro'],
  } as GrammarTableExercise,

  // ─── ORDER 16 — Упр. 14 (стр. 74): Попълнете с правилната форма на глагола ───
  {
    id: 'a2-l07-ex-14',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 14',
    instruction: 'Изберете правилната форма на глагола в минало свършено.',
    order: 16,
    points: 8,
    layout: 'single',
    sentences: [
      { text: 'Вчера купих сладолед. (купя) (Модел)',                                           blanks: [], correctAnswers: [], isExample: true },
      { text: 'Онзи ден аз _____ на родителите ми. (обадя се)',   blanks: [1], correctAnswers: ['се обадих'],    options: ['се обадих', 'се обади', 'се обадиха'],    acceptableAnswers: [['се обадих', 'обадих се']] },
      { text: 'Вчера Даниел _____ имейл на Анета. (изпратя)',     blanks: [1], correctAnswers: ['изпрати'],      options: ['изпратих', 'изпрати', 'изпратиха'],       acceptableAnswers: [['изпрати']] },
      { text: 'Тази сутрин ти _____ документите в колата. (забравя)', blanks: [1], correctAnswers: ['забрави'],  options: ['забравих', 'забрави', 'забравиха'],       acceptableAnswers: [['забрави']] },
      { text: 'Сутринта ние _____ прозореца в кухнята. (отворя)', blanks: [1], correctAnswers: ['отворихме'],    options: ['отворих', 'отворихме', 'отвориха'],       acceptableAnswers: [['отворихме']] },
      { text: 'Снощи аз не _____ вратата на офиса. (затворя)',    blanks: [1], correctAnswers: ['затворих'],     options: ['затворих', 'затвори', 'затвориха'],       acceptableAnswers: [['затворих']] },
      { text: 'Преди малко той _____ Наталия на кафе. (поканя)',  blanks: [1], correctAnswers: ['покани'],       options: ['поканих', 'покани', 'поканиха'],          acceptableAnswers: [['покани']] },
      { text: 'В понеделник _____ имейл от Валентин. (получа)',   blanks: [1], correctAnswers: ['получих'],      options: ['получих', 'получи', 'получиха'],          acceptableAnswers: [['получих']] },
      { text: 'През 2021 година той _____ университет. (завърша)', blanks: [1], correctAnswers: ['завърши'],     options: ['завърших', 'завърши', 'завършиха'],       acceptableAnswers: [['завърши']] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 17 — Упр. 15 (стр. 74): Работете по модела ────────────────────────
  {
    id: 'a2-l07-ex-15',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 15',
    instruction: 'Изберете правилната форма в минало свършено по модела: „Обикновено купувам от пазара ябълки. Вчера **купих** круши."',
    order: 17,
    points: 3,
    layout: 'single',
    sentences: [
      { text: 'Обикновено купувам от пазара ябълки. | Вчера **купих** круши.',                                          blanks: [], correctAnswers: [], isExample: true },
      { text: 'Понякога след работа Миро се разхожда в парка вечер.\nСнощи не _____, защото беше много уморен.',         blanks: [1], correctAnswers: ['се разходи'],  options: ['се разходи', 'се разходих', 'се разходиха'],   acceptableAnswers: [['се разходи', 'разходи се']] },
      { text: 'Ние често се обаждаме по телефона на роднините в Германия.\nВчера нямахме време и не _____.',            blanks: [1], correctAnswers: ['се обадихме'], options: ['се обадихме', 'се обади', 'се обадиха'],       acceptableAnswers: [['се обадихме', 'обадихме се']] },
      { text: 'Всяка година каня приятелите си на рожден ден.\nМиналата година бях болен и не ги _____.',               blanks: [1], correctAnswers: ['поканих'],     options: ['поканих', 'покани', 'поканиха'],               acceptableAnswers: [['поканих']] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 18 — Упр. 16 (стр. 74): Рожден ден на Аиша ────────────────────────
  {
    id: 'a2-l07-ex-16',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 16',
    instruction: 'Попълнете изреченията с глаголните форми в минало свършено.',
    order: 18,
    points: 8,
    layout: 'single',
    sentences: [
      {
        text: 'Вчера Айша _____ (имам) рожден ден. Рано сутринта майка й и баща й _____ (съм) от Сирия и _____ (говоря) дълго по телефона.',
        blanks: [1, 2, 3],
        correctAnswers: ['имаше', 'бяха', 'говориха'],
        options: [['имаше', 'имах', 'имаха'], ['бяха', 'беше', 'бяхме'], ['говориха', 'говорих', 'говори']],
        acceptableAnswers: [['имаше'], ['бяха'], ['говориха']],
      },
      {
        text: 'Вечерта Айша _____ (имам) много приятели. _____ (получа) от тях цветя и подаръци. _____ (прекарвам) много весело.',
        blanks: [1, 2, 3],
        correctAnswers: ['имаше', 'Получи', 'Прекараха'],
        options: [['имаше', 'имах', 'имаха'], ['Получи', 'Получих', 'Получиха'], ['Прекараха', 'Прекарах', 'Прекарахме']],
        acceptableAnswers: [['имаше'], ['Получи', 'получи'], ['Прекараха', 'прекараха']],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 19 — ДИАЛОГ 3 (стр. 74): Майка, дъщеря и куче ───────────────────
  {
    id: 'a2-l07-dialozi-03',
    type: 'dialogues',
    title: 'ДИАЛОГ 3',
    instruction: 'Натиснете всяка реплика, за да чуете произношението. После прочетете диалога на глас.',
    order: 19,
    sections: [
      {
        id: 'а. Майка и дъщеря',
        imageUrl: `${ASSET}/05-dialozi-3-mayka-dete/01-mayka-dete-kuche.jpg`,
        lines: [
          { text: '– Руми, кой се обади преди малко по телефона?', voiceGender: 'female' },
          { text: '– Обади се един приятел. Ще дойде на гости след един час. Мамо, ти купи ли кафе?', voiceGender: 'male' },
          { text: '– Не, сутринта разходих кучето, после трябваше да отида в пощата и не можах да купя кафе.', voiceGender: 'female' },
          { text: '– Няма нищо, ще пием чай.', voiceGender: 'male' },
        ],
      },
    ],
  } as DialoguesExercise,

  // ─── ORDER 20 — НОВИ ДУМИ 2 (стр. 75): Нива на образование ─────────────────
  {
    id: 'a2-l07-novi-dumi-2',
    type: 'illustrated_cards',
    title: 'НОВИ ДУМИ 2',
    order: 20,
    cards: [
      { id: 'nachalno',     imageUrl: `${ASSET}/06-novi-dumi-2-obrazovanie/01-nachalno-obrazovanie.jpg`, label: 'Начално образование (1 – 4 клас)',                              ttsLabel: 'начално образование, от първи до четвърти клас' },
      { id: 'progimnaziya', imageUrl: `${ASSET}/06-novi-dumi-2-obrazovanie/04-progimnaziya.jpg`,         label: 'Прогимназия (5 – 7 клас)',                                      ttsLabel: 'прогимназия, от пети до седми клас' },
      { id: 'osnovno',      imageUrl: `${ASSET}/06-novi-dumi-2-obrazovanie/02-osnovno-obrazovanie.jpg`,  label: 'Основно образование = начално + прогимназия (1 – 7 клас)',     ttsLabel: 'основно образование — начално плюс прогимназия, от първи до седми клас' },
      { id: 'parvi-gim',    imageUrl: `${ASSET}/06-novi-dumi-2-obrazovanie/05-parvi-gim.jpg`,            label: 'Първи гимназиален етап (8 – 10 клас)',                          ttsLabel: 'първи гимназиален етап, от осми до десети клас' },
      { id: 'vtori-gim',    imageUrl: `${ASSET}/06-novi-dumi-2-obrazovanie/06-vtori-gim.jpg`,            label: 'Втори гимназиален етап (11 – 12 клас)',                         ttsLabel: 'втори гимназиален етап, от единадесети до дванайсти клас' },
      { id: 'sredno',       imageUrl: `${ASSET}/06-novi-dumi-2-obrazovanie/03-sredno-obrazovanie.jpg`,   label: 'Средно образование = първи + втори гимназиален етап (8 – 12 клас)', ttsLabel: 'средно образование — първи плюс втори гимназиален етап, от осми до дванайсти клас' },
      { id: 'visshe',       imageUrl: `${ASSET}/06-novi-dumi-2-obrazovanie/04-visshe-obrazovanie.jpg`,   label: 'Висше образование (университет)',                               ttsLabel: 'висше образование, университет' },
    ],
  } as IllustratedCardsExercise,

  // ─── ORDER 21 — ГРАМАТИКА 4 (стр. 75): Видове училища и специалности ────────
  {
    id: 'a2-l07-gramatika-04',
    type: 'grammar_examples',
    title: 'ГРАМАТИКА 4',
    instruction: 'Запознайте се с нивата на образование, видовете училища и специалностите в университет.',
    instructionKey: 'a2.gr.l07.obrazovanie',
    order: 21,
    layout: 'centered',
    examples: [
    {
      imageUrl: '',
      text: 'Видове училища',
      lines: [
        '**основно училище** (ОУ) — 1–7 клас',
        '**средно училище** (СУ) — 1–12 клас',
        '**профилирана гимназия** — 8–12 клас (езикова, математическа)',
        '**професионална гимназия** — 8–12 клас',
      ],
      ttsText: 'Видове училища. Основно училище — от първи до седми клас. Средно училище — от първи до дванайсти клас. Профилирана гимназия — от осми до дванайсти клас, езикова или математическа. Професионална гимназия — от осми до дванайсти клас.',
      voiceGender: 'female',
      ttsPrompt: GEMINI_BG_SMOOTH_PROMPT,
    },
    {
      imageUrl: '',
      text: 'Специалности в университет',
      lines: [
        'Филология (българска, английска и др.)',
        'История · Психология · Педагогика',
        'Физика · Информатика · Медицина',
        'Архитектура · Право',
      ],
      ttsText: 'Специалности в университет: Филология — българска, английска и други. История. Психология. Педагогика. Физика. Информатика. Медицина. Архитектура. Право.',
      voiceGender: 'female',
      ttsPrompt: GEMINI_BG_SMOOTH_PROMPT,
    },
    {
      imageUrl: `${ASSET}/07-bakalavar-magistar-stapali/01-stapali-bakalavar-magistar.jpg`,
      text: 'Бакалавър и Магистър',
      lines: [
        '**бакалавър** — 3–4 години университет',
        '**магистър** — 5 години университет',
        '',
        'инж. = **инженер**',
        'д-р = **доктор**',
      ],
      ttsText: 'Бакалавър и Магистър. Бакалавър — три или четири години университет. Магистър — пет години университет. инж. е съкращение за инженер. д-р е съкращение за доктор.',
      voiceGender: 'female',
      ttsPrompt: GEMINI_BG_SMOOTH_PROMPT,
    },
    ],
  } as GrammarExamplesExercise,

  // ─── ORDER 22 — Упр. 19 (стр. 75): Свържете професията със специалността ─────
  {
    id: 'a2-l07-ex-19',
    type: 'dropdown_match',
    title: 'УПРАЖНЕНИЕ 19',
    instruction: 'Изберете специалността, която отговаря на всяка професия.',
    order: 22,
    points: 8,
    questions: [
      { id: 'q1', left: 'лекар',               options: ['медицина', 'история', 'психология', 'физика', 'педагогика', 'архитектура', 'информатика', 'филология'],  correctAnswer: 'медицина' },
      { id: 'q2', left: 'учител',              options: ['педагогика', 'история', 'медицина', 'физика', 'психология', 'архитектура', 'информатика', 'филология'],  correctAnswer: 'педагогика', alternateCorrectAnswers: ['история', 'физика', 'информатика', 'филология'] },
      { id: 'q3', left: 'психолог',            options: ['психология', 'история', 'медицина', 'физика', 'педагогика', 'архитектура', 'информатика', 'филология'],  correctAnswer: 'психология' },
      { id: 'q4', left: 'архитект',            options: ['архитектура', 'история', 'медицина', 'физика', 'педагогика', 'психология', 'информатика', 'филология'],  correctAnswer: 'архитектура' },
      { id: 'q5', left: 'историк',             options: ['история', 'медицина', 'физика', 'педагогика', 'психология', 'архитектура', 'информатика', 'филология'],  correctAnswer: 'история' },
      { id: 'q6', left: 'физик',               options: ['физика', 'история', 'медицина', 'педагогика', 'психология', 'архитектура', 'информатика', 'филология'],  correctAnswer: 'физика' },
      { id: 'q7', left: 'преводач',            options: ['филология', 'история', 'медицина', 'физика', 'педагогика', 'психология', 'архитектура', 'информатика'],  correctAnswer: 'филология' },
      { id: 'q8', left: 'компютърен инженер',  options: ['информатика', 'история', 'медицина', 'физика', 'педагогика', 'психология', 'архитектура', 'филология'],  correctAnswer: 'информатика' },
    ],
  } as DropdownMatchExercise,

  // ─── ORDER 23 — ДИАЛОЗИ 4 (стр. 76): Образование ───────────────────────────
  {
    id: 'a2-l07-dialozi-04',
    type: 'dialogues',
    title: 'ДИАЛОЗИ 4',
    instruction: 'Натиснете всяка реплика, за да чуете произношението. После прочетете диалозите на глас.',
    order: 23,
    sections: [
      {
        id: 'а. Образование',
        imageUrl: `${ASSET}/08-dialozi-4-obrazovanie/01-dvama-mazhe-razgovor.jpg`,
        lines: [
          { text: '– Какво образование имаш?', voiceGender: 'male' },
          { text: '– Имам средно образование. Завърших професионална гимназия по туризъм. А ти?', voiceGender: 'female' },
          { text: '– Имам висше образование. Завърших университет, специалност Физика.', voiceGender: 'male' },
        ],
      },
      {
        id: 'б. Специалност и работа',
        imageUrl: `${ASSET}/08-dialozi-4-obrazovanie/02-abiturient-shapka.jpg`,
        lines: [
          { text: '– Кога завършихте университет?', voiceGender: 'female' },
          { text: '– През 2010 година.', voiceGender: 'male', ttsText: '– През две хиляди и десета година.' },
          { text: '– Каква специалност имате?', voiceGender: 'female' },
          { text: '– История.', voiceGender: 'male' },
          { text: '– Какво работихте след университета?', voiceGender: 'female' },
          { text: '– Една година работих в музей, а сега съм учител в езикова гимназия.', voiceGender: 'male' },
        ],
      },
    ],
  } as DialoguesExercise,

  // ─── ORDER 24 — Упр. 22 (стр. 76): Попълнете с думите основно, средно, висше ─
  {
    id: 'a2-l07-ex-22',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 22',
    instruction: 'Изберете правилната дума: **основно**, **средно** или **висше**.',
    order: 24,
    points: 3,
    layout: 'single',
    sentences: [
      { text: 'Завърших седми клас. Имам _____ образование.',     blanks: [1], correctAnswers: ['основно'], options: ['основно', 'средно', 'висше'], acceptableAnswers: [['основно']] },
      { text: 'Завърших дванайсети клас. Имам _____ образование.', blanks: [1], correctAnswers: ['средно'],  options: ['основно', 'средно', 'висше'], acceptableAnswers: [['средно']] },
      { text: 'Завърших университет. Имам _____ образование.',    blanks: [1], correctAnswers: ['висше'],   options: ['основно', 'средно', 'висше'], acceptableAnswers: [['висше']] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 25 — Упр. 23 (стр. 76): Попълнете окончанията — завърш- ────────────
  {
    id: 'a2-l07-ex-23',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 23',
    instruction: 'Изберете правилното окончание на глагола **завърша** в минало свършено.',
    order: 25,
    points: 5,
    layout: 'single',
    sentences: [
      { text: 'Миналата година **завърших** университет. (Модел)',                              blanks: [], correctAnswers: [], isExample: true },
      { text: 'Брат ми завърш___ университет преди две години.',         blanks: [1], correctAnswers: ['и'],    options: ['их', 'и', 'ихме', 'ихте', 'иха'], acceptableAnswers: [['и']] },
      { text: 'Приятелката ми завърш___ езикова гимназия преди един месец.', blanks: [1], correctAnswers: ['и'],    options: ['их', 'и', 'ихме', 'ихте', 'иха'], acceptableAnswers: [['и']] },
      { text: 'Ние завърш___ Информатика преди три години.',               blanks: [1], correctAnswers: ['ихме'], options: ['их', 'и', 'ихме', 'ихте', 'иха'], acceptableAnswers: [['ихме']] },
      { text: 'Вие кога завърш___ средно образование?',                   blanks: [1], correctAnswers: ['ихте'], options: ['их', 'и', 'ихме', 'ихте', 'иха'], acceptableAnswers: [['ихте']] },
      { text: 'Те завърш___ Английска филология през 2022 година.',        blanks: [1], correctAnswers: ['иха'],  options: ['их', 'и', 'ихме', 'ихте', 'иха'], acceptableAnswers: [['иха']] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 26 — ГРАМАТИКА 5 (стр. 76): Местоимения ──────────────────────────
  {
    id: 'a2-l07-gramatika-05',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 5',
    instruction: 'Запознайте се с неопределителните и отрицателните местоимения.',
    instructionKey: 'a2.gr.l07.mestoimeniya',
    order: 26,
    tableTitle: 'Местоимения',
    columns: ['Въпросителни', 'Неопределителни', 'Отрицателни'],
    rows: [
      { pronoun: '',  cells: ['кой',   'някой',   'никой'],   ttsText: 'кой, някой, никой',         ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: '',  cells: ['колко', 'няколко', 'николко'],  ttsText: 'колко, няколко, николко',    ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: '',  cells: ['къде',  'някъде',  'никъде'],   ttsText: 'къде, някъде, никъде',       ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: '',  cells: ['кога',  'някога',  'никога'],   ttsText: 'кога, някога, никога',       ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: '',  cells: ['нещо',  'нещо',    'нищо'],     ttsText: 'нещо, нищо',                 ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
    ],
    notes: [
      '⚠️ **Никой не** иска кафе. / **Никъде не** мога да намеря…',
    ],
    ttsNotes: [
      'Никой не иска кафе. Никъде не мога да намеря.',
    ],
    ttsNoteModels: ['pro'],
  } as GrammarTableExercise,

  // ─── ORDER 27 — Упр. 24 (стр. 76): Попълнете с някой или никой ───────────────
  {
    id: 'a2-l07-ex-24',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 24',
    instruction: 'Изберете **някой** или **никой** по модела.',
    order: 27,
    points: 5,
    layout: 'single',
    sentences: [
      { text: '– Някой иска ли кафе?\n– Не, никой не иска кафе. (Модел)', blanks: [], correctAnswers: [], isExample: true },
      { text: '– Има ли _____ в стаята?\n– Не, _____ няма.',
        blanks: [1, 2],
        correctAnswers: ['някой', 'никой'],
        options: [['някой', 'никой'], ['никой', 'някой']],
        acceptableAnswers: [['някой'], ['никой']] },
      { text: '– _____ помогна ли на Тодор?\n– Не, _____ не му помогна.',
        blanks: [1, 2],
        correctAnswers: ['Някой', 'никой'],
        options: [['Някой', 'Никой'], ['никой', 'някой']],
        acceptableAnswers: [['Някой', 'някой'], ['никой']] },
      { text: '– Знае ли _____ телефона на Сара?\n– Не, _____ не го знае.',
        blanks: [1, 2],
        correctAnswers: ['някой', 'никой'],
        options: [['някой', 'никой'], ['никой', 'някой']],
        acceptableAnswers: [['някой'], ['никой']] },
      { text: '– _____ иска ли да пие чай?\n– Не, _____ не иска.',
        blanks: [1, 2],
        correctAnswers: ['Някой', 'никой'],
        options: [['Някой', 'Никой'], ['никой', 'някой']],
        acceptableAnswers: [['Някой', 'някой'], ['никой']] },
      { text: '– Обади ли се _____ на Ина?\n– Не, _____ не й се обади.',
        blanks: [1, 2],
        correctAnswers: ['някой', 'никой'],
        options: [['някой', 'никой'], ['никой', 'някой']],
        acceptableAnswers: [['някой'], ['никой']] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 28 — Упр. 25 (стр. 77): Работете по модела — няколко ────────────
  {
    id: 'a2-l07-ex-25',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 25',
    instruction: 'Изберете **няколко** в правилното изречение по модела.',
    order: 28,
    points: 5,
    layout: 'single',
    sentences: [
      { text: '– Искаш ли бонбони?\n– Да, искам **няколко** бонбона. (Модел)', blanks: [], correctAnswers: [], isExample: true },
      { text: '– Искаш ли тетрадки?\n– Да, искам _____ тетрадки.',   blanks: [1], correctAnswers: ['няколко'], options: ['някой', 'никой', 'няколко', 'никъде'],  acceptableAnswers: [['няколко']] },
      { text: '– Искаш ли химикалки?\n– Да, искам _____.',           blanks: [1], correctAnswers: ['няколко'], options: ['някой', 'никой', 'няколко', 'никъде'],  acceptableAnswers: [['няколко']] },
      { text: '– Искаш ли моливи?\n– Да, искам _____ молива.',       blanks: [1], correctAnswers: ['няколко'], options: ['някой', 'никой', 'няколко', 'никъде'],  acceptableAnswers: [['няколко']] },
      { text: '– Искаш ли банани?\n– Да, искам _____ банана.',       blanks: [1], correctAnswers: ['няколко'], options: ['някой', 'никой', 'няколко', 'никъде'],  acceptableAnswers: [['няколко']] },
      { text: '– Искаш ли ябълки?\n– Да, искам _____ ябълки.',       blanks: [1], correctAnswers: ['няколко'], options: ['някой', 'никой', 'няколко', 'никъде'],  acceptableAnswers: [['няколко']] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 29 — Упр. 26 (стр. 77): Попълнете с някъде или никъде ─────────────
  {
    id: 'a2-l07-ex-26',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 26',
    instruction: 'Изберете **някъде** или **никъде** по модела.',
    order: 29,
    points: 4,
    layout: 'single',
    sentences: [
      { text: 'Видя ли **някъде** очилата ми? (Модел)', blanks: [], correctAnswers: [], isExample: true },
      { text: 'Хайде да отидем _____ този уикенд.',         blanks: [1], correctAnswers: ['някъде'],  options: ['някъде', 'никъде'],  acceptableAnswers: [['някъде']] },
      { text: '_____ не искам да ходя.',                    blanks: [1], correctAnswers: ['Никъде'],  options: ['Някъде', 'Никъде'],  acceptableAnswers: [['Никъде', 'никъде']] },
      { text: 'Не мога да намеря _____ магазин за риба.',   blanks: [1], correctAnswers: ['никъде'],  options: ['някъде', 'никъде'],  acceptableAnswers: [['никъде']] },
      { text: 'Забравих ключовете _____ и не мога да отворя вратата.', blanks: [1], correctAnswers: ['някъде'], options: ['някъде', 'никъде'], acceptableAnswers: [['някъде']] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 30 — Упр. 27 (стр. 77): Попълнете с някога или никога ─────────────
  {
    id: 'a2-l07-ex-27',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 27',
    instruction: 'Изберете **някога** или **никога** по модела.',
    order: 30,
    points: 4,
    layout: 'single',
    sentences: [
      { text: '**Никога** повече няма да ям в този ресторант. (Модел)', blanks: [], correctAnswers: [], isExample: true },
      { text: '_____ ще отида с децата в Италия.',                        blanks: [1], correctAnswers: ['Някога'],  options: ['Някога', 'Никога'],  acceptableAnswers: [['Някога', 'някога']] },
      { text: 'Не искам _____ повече да пия кафе без захар.',             blanks: [1], correctAnswers: ['никога'],  options: ['някога', 'никога'],  acceptableAnswers: [['никога']] },
      { text: '_____ ще те покана на театър.',                            blanks: [1], correctAnswers: ['Някога'],  options: ['Някога', 'Никога'],  acceptableAnswers: [['Някога', 'някога']] },
      { text: '_____ не трябва да казваш „никога".',                      blanks: [1], correctAnswers: ['Никога'],  options: ['Някога', 'Никога'],  acceptableAnswers: [['Никога', 'никога']] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 31 — Упр. 28 (стр. 77): Попълнете с нещо или нищо ────────────────
  {
    id: 'a2-l07-ex-28',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 28',
    instruction: 'Изберете **нещо** или **нищо** по модела.',
    order: 31,
    points: 4,
    layout: 'single',
    sentences: [
      { text: 'На масата няма **нищо**. (Модел)', blanks: [], correctAnswers: [], isExample: true },
      { text: 'Мария каза _____ на Петър.',                 blanks: [1], correctAnswers: ['нещо'],  options: ['нещо', 'нищо'],  acceptableAnswers: [['нещо']] },
      { text: 'Не искам _____ от тебе.',                    blanks: [1], correctAnswers: ['нищо'],  options: ['нещо', 'нищо'],  acceptableAnswers: [['нищо']] },
      { text: '_____ не зная за този човек.',               blanks: [1], correctAnswers: ['Нищо'],  options: ['Нещо', 'Нищо'],  acceptableAnswers: [['Нищо', 'нищо']] },
      { text: 'Искам да те питам _____.',                   blanks: [1], correctAnswers: ['нещо'],  options: ['нещо', 'нищо'],  acceptableAnswers: [['нещо']] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 32 — ГРАМАТИКА 6 (стр. 77–78): Глагол → Съществително ──────────
  {
    id: 'a2-l07-gramatika-06',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 6',
    instruction: 'Запознайте се с думите, образувани от глаголи.',
    instructionKey: 'a2.gr.l07.glagolSushtestvitelno',
    order: 32,
    tableTitle: 'Глагол → Съществително',
    columns: ['Съществително', 'Изречение'],
    rows: [
      { pronoun: 'разхождам се / разходя се', cells: ['разходка',              'Всеки ден ходя на разходка. Приятна разходка!'],     ttsText: 'разхождам се, разходя се. разходка. Всеки ден ходя на разходка. Приятна разходка!', ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'срещам се / срещна се',     cells: ['среща',                 'Имам среща с приятели.'],                            ttsText: 'срещам се, срещна се. среща. Имам среща с приятели.', ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'помагам / помогна',         cells: ['помощ',                 'Трябва ми помощ. = Имам нужда от помощ.'],           ttsText: 'помагам, помогна. помощ. Трябва ми помощ. Имам нужда от помощ.', ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'закъснявам / закъснея',     cells: ['закъснение',            'Влакът има десет минути закъснение.'],               ttsText: 'закъснявам, закъснея. закъснение. Влакът има десет минути закъснение.', ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'превеждам / преведа',       cells: ['преводач',              'Аз съм преводач от арабски на български.'],          ttsText: 'превеждам, преведа. преводач. Аз съм преводач от арабски на български.', ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'каня / поканя',             cells: ['покана',                'Благодаря за поканата!'],                            ttsText: 'каня, поканя. покана. Благодаря за поканата!', ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'работя',                    cells: ['работа / работник',     'Имам нова работа! Лека работа! Петър е добър работник.'], ttsText: 'работя. работа, работник. Имам нова работа! Лека работа! Петър е добър работник.', ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'играя',                     cells: ['игра / играчка',        'Учениците обичат видеоигри. Децата ми имат много играчки.'], ttsText: 'играя. игра, играчка. Учениците обичат видеоигри. Децата ми имат много играчки.', ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'ям',                        cells: ['ядене / ястие',         'Нещо за ядене? Това е любимото ми ястие.'],          ttsText: 'ям. ядене, ястие. Нещо за ядене? Това е любимото ми ястие.', ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'пия',                       cells: ['пиене / напитка',       'Какво искате за пиене? Има ли безалкохолни напитки?'], ttsText: 'пия. пиене, напитка. Какво искате за пиене? Има ли безалкохолни напитки?', ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'пуша',                      cells: ['пушене / пушач',        'Пушенето е забранено. Пушач ли сте?'],               ttsText: 'пуша. пушене, пушач. Пушенето е забранено. Пушач ли сте?', ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'пътувам',                   cells: ['пътуване / път',        'Приятно пътуване! Лек път!'],                        ttsText: 'пътувам. пътуване, път. Приятно пътуване! Лек път!', ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
      { pronoun: 'разговарям',                cells: ['разговор',              'Директорът има важен разговор с работниците.'],      ttsText: 'разговарям. разговор. Директорът има важен разговор с работниците.', ttsPrompt: GEMINI_BG_SMOOTH_PROMPT },
    ],
    ttsNoteModels: [],
  } as GrammarTableExercise,

  // ─── ORDER 33 — Упр. 30 (стр. 78): Слушайте и попълнете ───────────────────
  // 🎧 TODO Фаза 2: audioUrl ще се генерира с npm run tts:generate -- --lesson 07
  {
    id: 'a2-l07-ex-30',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 30',
    instruction: 'Изслушайте изреченията и изберете правилното съществително.',
    order: 33,
    points: 11,
    layout: 'single',
    audioUrl: '',  // TODO 🎧 Фаза 2
    listeningText: 'Обичам да ходя на разходка с приятели в парка през пролетта. Старите хора често имат нужда от помощ. Малките деца много обичат играчки, по-големите обичат видеоигри. Пътуването от България до Китай е много трудно. В хладилника няма нищо за ядене и пиене. Трябва да отида в супера. В момента търсят работници за сезонна работа във Франция през лятото. Автобусите от Бургас често пристигат на автогарата със закъснение. Тази вечер имам среща с приятели от училище. В Държавната агенция за бежанците търсят преводачи с добър арабски език. Утре имам разговор с учителката на сина ми. Имам две покани за концерт за утре вечер. Искаш ли да дойдеш с мен?',
    sentences: [
      { text: 'Обичам да ходя на _____ с приятели в парка през пролетта.', blanks: [1], correctAnswers: ['разходка'],   options: ['разходка', 'среща', 'работа', 'пътуване'],    acceptableAnswers: [['разходка']] },
      { text: 'Старите хора често имат нужда от _____.', blanks: [1], correctAnswers: ['помощ'],      options: ['помощ', 'работа', 'покана', 'разговор'],     acceptableAnswers: [['помощ']] },
      { text: 'Малките деца много обичат _____, по-големите обичат видеоигри.', blanks: [1], correctAnswers: ['играчки'],   options: ['играчки', 'игри', 'напитки', 'ястия'],        acceptableAnswers: [['играчки']] },
      { text: '_____ от България до Китай е много трудно.', blanks: [1], correctAnswers: ['Пътуването'], options: ['Пътуването', 'Работата', 'Разходката', 'Срещата'], acceptableAnswers: [['Пътуването', 'пътуването']] },
      { text: 'В хладилника няма нищо за _____ и _____. Трябва да отида в супера.', blanks: [1, 2], correctAnswers: ['ядене', 'пиене'], options: [['ядене', 'пиене', 'ястие', 'напитка'], ['пиене', 'ядене', 'разговор', 'пушене']], acceptableAnswers: [['ядене'], ['пиене']] },
      { text: 'В момента търсят _____ за сезонна _____ във Франция през лятото.', blanks: [1, 2], correctAnswers: ['работници', 'работа'], options: [['работници', 'преводачи', 'шофьори', 'готвачи'], ['работа', 'среща', 'разходка', 'покана']], acceptableAnswers: [['работници'], ['работа']] },
      { text: 'Автобусите от Бургас често пристигат на автогарата със _____.', blanks: [1], correctAnswers: ['закъснение'], options: ['закъснение', 'пушене', 'ядене', 'пиене'],   acceptableAnswers: [['закъснение']] },
      { text: 'Тази вечер имам _____ с приятели от училище.', blanks: [1], correctAnswers: ['среща'],      options: ['среща', 'разходка', 'покана', 'разговор'],    acceptableAnswers: [['среща']] },
      { text: 'В Държавната агенция за бежанците търсят _____ с добър арабски език.', blanks: [1], correctAnswers: ['преводачи'],  options: ['преводачи', 'работници', 'готвачи', 'шофьори'], acceptableAnswers: [['преводачи']] },
      { text: 'Утре имам _____ с учителката на сина ми.', blanks: [1], correctAnswers: ['разговор'],   options: ['разговор', 'среща', 'разходка', 'пътуване'],  acceptableAnswers: [['разговор', 'среща']] },
      { text: 'Имам две _____ за концерт за утре вечер. Искаш ли да дойдеш с мен?', blanks: [1], correctAnswers: ['покани'],     options: ['покани', 'срещи', 'разговори', 'разходки'],  acceptableAnswers: [['покани']] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 34 — ДОП. упражнения (стр. 79): CV на Васил ─────────────────────
  {
    id: 'a2-l07-tekst-vasil-cv',
    type: 'reading_text',
    title: 'ДОПЪЛНИТЕЛНИ УПРАЖНЕНИЯ',
    textTitle: 'Автобиография (CV) — Васил Иванов Петров',
    instruction: 'Изслушайте текста и след това го прочетете сами.',
    order: 34,
    showDictionary: true,
    images: [
      { imageUrl: `${ASSET}/09-dopalnitelni-upr-cv-vasil/01-vasil-portret.jpg`, label: 'Васил Иванов Петров' },
    ],
    paragraphs: [
      'Трите имена: Васил Иванов Петров\nАдрес: гр. София, жк „Младост" 3, бл. 307, вх. А, ет. 2, ап. 5\nТелефон: +359-897-990-205\nИмейл: vasiliv@abv.bg\nДата на раждане: 18.07.1990 г.\nНационалност: българин',
      'ТРУДОВ СТАЖ\n2009 – сега: Преводач с английски и френски в агенция за преводи и легализация на документи, София\n2005 – 2009: Учител по английски език в Първа частна английска гимназия „Уилям Шекспир", София',
      'ОБРАЗОВАНИЕ\n2016: Специализация в Англия – Преподаване на английски като чужд език\n2010 – 2015: Софийски университет „Климент Охридски", специалност Английска филология (втора специалност Френски език)\n2004 – 2009: Втора английска езикова гимназия, София',
      'ЛИЧНИ УМЕНИЯ И КОМПЕТЕНЦИИ\nМайчин език: български\nДруги езици: английски (ниво C2), френски (ниво C2)\nКомпютърни умения: Microsoft Office',
    ],
    ttsParagraphs: [
      'Трите имена: Васил Иванов Петров. Адрес: град София, же ка Младост три, блок триста и седем, вход А, етаж две, апартамент пет. Телефон: плюс триста петдесет и девет, осемстотин деветдесет и седем, деветстотин и деветдесет, двеста и пет. Имейл: василив маймунка а бе ве точка бе ге. Дата на раждане: осемнадесети юли хиляда деветстотин и деветдесета година. Националност: българин.',
      'Трудов стаж. От две хиляди и девета до сега: Преводач с английски и френски в агенция за преводи и легализация на документи, София. От две хиляди и пета до две хиляди и девета: Учител по английски език в Първа частна английска гимназия Уилям Шекспир, София.',
      'Образование. Две хиляди и шестнадесета: Специализация в Англия — преподаване на английски като чужд език. От две хиляди и десета до две хиляди и петнадесета: Софийски университет Климент Охридски, специалност Английска филология, втора специалност Френски език. От две хиляди и четвърта до две хиляди и девета: Втора английска езикова гимназия, София.',
      'Лични умения и компетенции. Майчин език: български. Други езици: английски, ниво це две; френски, ниво це две. Компютърни умения: Microsoft Office.',
    ],
    paragraphVoiceGenders: ['male', 'male', 'male', 'male'],
  } as ReadingTextExercise,

  // ─── ORDER 35 — Упр. 32 (стр. 79): Попълнете по автобиографията на Васил ────
  {
    id: 'a2-l07-ex-32',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 32',
    instruction: 'Попълнете изреченията, като използвате информацията от автобиографията на Васил.',
    order: 35,
    points: 9,
    layout: 'single',
    sentences: [
      {
        text: 'Той се казва Васил _____ . Роден е на _____ . Живее в _____ , в жк _____ .',
        blanks: [1, 2, 3, 4],
        correctAnswers: ['Иванов Петров', '18.07.1990 г.', 'гр. София', '„Младост" 3'],
        options: [
          ['Иванов Петров', 'Петров Иванов', 'Иванов'],
          ['18.07.1990 г.', '18.07.1999 г.', '18.07.1980 г.'],
          ['гр. София', 'гр. Пловдив', 'гр. Варна'],
          ['„Младост" 3', '„Надежда" 3', '„Люлин" 3'],
        ],
        acceptableAnswers: [['Иванов Петров'], ['18.07.1990 г.', '18 юли 1990 г.'], ['гр. София', 'София'], ['„Младост" 3', 'Младост 3']],
      },
      {
        text: 'Той е _____ по националност. Има _____ образование — _____ филология и втора специалност — _____.',
        blanks: [1, 2, 3, 4],
        correctAnswers: ['българин', 'висше', 'Английска', 'Френски език'],
        options: [
          ['българин', 'британец', 'французин'],
          ['висше', 'средно', 'основно'],
          ['Английска', 'Френска', 'Испанска'],
          ['Френски език', 'Немски език', 'Испански език'],
        ],
        acceptableAnswers: [['българин'], ['висше'], ['Английска', 'английска'], ['Френски език', 'Френски']],
      },
      {
        text: 'Сега работи в _____. Майчиният му език е _____. Говори отлично _____ и _____.',
        blanks: [1, 2, 3, 4],
        correctAnswers: ['агенция за преводи и легализация', 'български', 'английски', 'френски'],
        options: [
          ['агенция за преводи и легализация', 'езикова гимназия', 'университет'],
          ['български', 'английски', 'френски'],
          ['английски', 'френски', 'испански'],
          ['френски', 'немски', 'испански'],
        ],
        acceptableAnswers: [['агенция за преводи и легализация', 'агенция'], ['български'], ['английски'], ['френски']],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 36 — Упр. 33 (стр. 79): Разбиране на автобиографията на Васил ────
  {
    id: 'a2-l07-ex-33',
    type: 'multiple_choice',
    title: 'УПРАЖНЕНИЕ 33',
    instruction: 'Отговорете на въпросите.',
    order: 36,
    points: 8,
    questions: [
      {
        question: 'Къде работи Васил Петров в момента?',
        options: ['В университет', 'В гимназия', 'В агенция за преводи', 'В международна компания'],
        correctIndex: 2,
      },
      {
        question: 'От коя година Васил работи като преводач?',
        options: ['2005', '2006', '2009', '2010'],
        correctIndex: 2,
      },
      {
        question: 'Каква професия е имал преди да стане преводач?',
        options: ['Журналист', 'Учител', 'Мениджър', 'Програмист'],
        correctIndex: 1,
      },
      {
        question: 'Къде е учил висшето си образование?',
        options: ['В Англия', 'В САЩ', 'В Софийски университет', 'В технически университет'],
        correctIndex: 2,
      },
      {
        question: 'Кои езици владее на ниво C2?',
        options: ['Немски и испански', 'Английски и френски', 'Руски и английски', 'Само английски'],
        correctIndex: 1,
      },
      {
        question: 'Каква е била неговата специализация в Англия?',
        options: ['Превод на документи', 'Бизнес комуникация', 'Преподаване на английски като чужд език', 'Компютърни науки'],
        correctIndex: 2,
      },
      {
        question: 'В кой период е работил като учител?',
        options: ['2000–2005', '2005–2009', '2009–2015', '1999–2004'],
        correctIndex: 1,
      },
      {
        question: 'Кое от следните твърдения е вярно?',
        options: ['Васил живее извън България', 'Васил владее само един чужд език', 'Васил има опит в преподаването', 'Васил няма компютърни умения'],
        correctIndex: 2,
      },
    ],
  } as MultipleChoiceExercise,

  // ─── ORDER 37 — ТЕКСТ (стр. 80): Мустафа ────────────────────────────────────
  {
    id: 'a2-l07-tekst-mustafa',
    type: 'reading_text',
    title: 'ТЕКСТ',
    subtitle: 'Прочетете текста и попълнете автобиографията на Мустафа.',
    prominentSubtitle: true,
    textTitle: 'Мустафа',
    order: 37,
    showDictionary: true,
    images: [
      { imageUrl: `${ASSET}/10-tekst-mustafa/01-mustafa-laptop.jpg`, label: 'Мустафа работи от вкъщи' },
    ],
    paragraphs: [
      'Казвам се Мустафа. Роден съм в гр. Камишли, Сирия, на 17 април 1980 г. Телефонният ми номер е +4915779967413.',
      'Завърших средно образование през 1998 г. След това (от 1999 до 2004 г.) учих в университет в Дамаск, специалност Информатика.',
      'В Сирия получих много добро образование. От 2005 г. до сега работя в една известна фирма в Берлин, Германия, като компютърен специалист.',
      'Майчиният ми език е арабски, говоря отлично английски и малко испански.',
    ],
    ttsParagraphs: [
      'Казвам се Мустафа. Роден съм в град Камишли, Сирия, на седемнадесети април хиляда деветстотин и осемдесета година. Телефонният ми номер е плюс четири девет едно пет седем седем девет девет шест седем четири едно три.',
      'Завърших средно образование през хиляда деветстотин деветдесет и осма година. След това — от хиляда деветстотин деветдесет и девета до две хиляди и четвърта година — учих в университет в Дамаск, специалност Информатика.',
      'В Сирия получих много добро образование. От две хиляди и пета до сега работя в една известна фирма в Берлин, Германия, като компютърен специалист.',
      'Майчиният ми език е арабски, говоря отлично английски и малко испански.',
    ],
    paragraphVoiceGenders: ['male', 'male', 'male', 'male'],
  } as ReadingTextExercise,

  // ─── ORDER 38 — Упр. 36 (стр. 80): Попълнете автобиографията на Мустафа ──────
  {
    id: 'a2-l07-ex-36',
    type: 'dropdown_match',
    title: 'УПРАЖНЕНИЕ 36',
    subtitle: 'Прочетете текста и попълнете автобиографията на Мустафа.',
    prominentSubtitle: true,
    order: 38,
    points: 10,
    questions: [
      { id: 'q1',  left: 'Име',                       options: ['Мустафа', 'Васил', 'Ахмед'],                                                                          correctAnswer: 'Мустафа' },
      { id: 'q2',  left: 'Телефон',                    options: ['+4915779967413', '+359888123456', '+4915770000000'],                                                  correctAnswer: '+4915779967413' },
      { id: 'q3',  left: 'Дата на раждане',            options: ['17 април 1980 г.', '7 април 1980 г.', '17 април 1990 г.'],                                            correctAnswer: '17 април 1980 г.' },
      { id: 'q4',  left: 'Националност',               options: ['сириец', 'германец', 'иракчанин'],                                                                    correctAnswer: 'сириец' },
      { id: 'q5',  left: 'Трудов стаж (2005 – сега)',  options: ['компютърен специалист в Берлин', 'учител в София', 'преводач в Дамаск'],                              correctAnswer: 'компютърен специалист в Берлин' },
      { id: 'q6',  left: 'Образование (1999 – 2004)',  options: ['университет в Дамаск, Информатика', 'гимназия в Берлин', 'университет в София'],                      correctAnswer: 'университет в Дамаск, Информатика' },
      { id: 'q7',  left: 'Образование (до 1998 г.)',   options: ['средно образование', 'основно образование', 'висше образование'],                                     correctAnswer: 'средно образование' },
      { id: 'q8',  left: 'Майчин език',                options: ['арабски', 'английски', 'испански'],                                                                   correctAnswer: 'арабски' },
      { id: 'q9',  left: 'Други езици',                options: ['английски и испански', 'френски и немски', 'руски и турски'],                                         correctAnswer: 'английски и испански' },
      { id: 'q10', left: 'Компютърни умения',          options: ['отлични', 'основни', 'нямам'],                                                                        correctAnswer: 'отлични' },
    ],
  } as DropdownMatchExercise,

];

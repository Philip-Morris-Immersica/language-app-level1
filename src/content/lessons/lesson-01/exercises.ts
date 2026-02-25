import type { Exercise, IllustratedCardsExercise, MatchPairsExercise, ImageLabelingExercise, FillInBlankExercise, SyllableBlocksExercise, GrammarVisualExercise, WordSearchExercise, GrammarExamplesExercise, GrammarTableExercise, DialoguesExercise, DialogueBuilderExercise, DropdownMatchExercise, LetterChoiceExercise, FillWithImagesExercise, WorkbookFillBlankExercise } from '@/content/types';

// ⚠️ IMPORTANT: Follow the exact order from Main-Book-Lesson-1.pdf (see LESSON_STRUCTURE.md)
// The 'order' property must match the sequence in the textbook

export const exercises: Exercise[] = [
  // ORDER 1: Exercise 1 - Flags (Page 9, top)
  {
    id: 'l01-ex-01',
    type: 'image_labeling',
    instruction: 'Напишете имената на държавите под знамената.',
    order: 1,
    points: 7,
    displayType: 'flags',
    images: [
      { id: 'bulgaria', imageUrl: '/assets/lesson-01/exercise-01-flags/flag-bulgaria.jpg', correctLabel: 'България' },
      { id: 'syria', imageUrl: '/assets/lesson-01/exercise-01-flags/flag-syria.jpg', correctLabel: 'Сирия' },
      { id: 'lebanon', imageUrl: '/assets/lesson-01/exercise-01-flags/flag-lebanon.jpg', correctLabel: 'Ливан' },
      { id: 'ukraine', imageUrl: '/assets/lesson-01/exercise-01-flags/flag-ukraine.jpg', correctLabel: 'Украйна' },
      { id: 'iran', imageUrl: '/assets/lesson-01/exercise-01-flags/flag-iran.jpg', correctLabel: 'Иран' },
      { id: 'iraq', imageUrl: '/assets/lesson-01/exercise-01-flags/flag-iraq.jpg', correctLabel: 'Ирак' },
      { id: 'algeria', imageUrl: '/assets/lesson-01/exercise-01-flags/flag-algeria.jpg', correctLabel: 'Алжир' },
    ],
    options: ['Алжир', 'България', 'Ирак', 'Иран', 'Ливан', 'Сирия', 'Украйна'],
  } as ImageLabelingExercise,

  // ORDER 2: НОВИ ДУМИ 1 - Greetings vocabulary (Page 9, middle) - NOT AN EXERCISE!
  {
    id: 'l01-novi-dumi-01',
    type: 'illustrated_cards',
    title: 'НОВИ ДУМИ 1',
    instruction: 'Запознайте се с новите думи и изрази',
    audioUrl: '/assets/lesson-01/audio/new-words-01.mp3',
    order: 2,
    cards: [
      { id: 'morning', imageUrl: '/assets/lesson-01/novi-dumi-1-greetings/01-dobro-utro.jpg', label: 'Добро утро!' },
      { id: 'day', imageUrl: '/assets/lesson-01/novi-dumi-1-greetings/02-dobur-den.jpg', label: 'Добър ден!' },
      { id: 'evening', imageUrl: '/assets/lesson-01/novi-dumi-1-greetings/03-dobur-vecher.jpg', label: 'Добър вечер!' },
      { id: 'night', imageUrl: '/assets/lesson-01/novi-dumi-1-greetings/04-leka-nosht.jpg', label: 'Лека нощ!' },
      { id: 'hello', imageUrl: '/assets/lesson-01/novi-dumi-1-greetings/05-zdravey.jpg', label: 'Здравей!' },
      { id: 'hello_formal', imageUrl: '/assets/lesson-01/novi-dumi-1-greetings/06-zdraveyte.jpg', label: 'Здравейте!' },
      { id: 'goodbye', imageUrl: '/assets/lesson-01/novi-dumi-1-greetings/07-dovizhdane.jpg', label: 'Довиждане!' },
    ]
  } as IllustratedCardsExercise,

  // ORDER 3: Exercise 2 - Match word pairs (Page 9, bottom left)
  {
    id: 'l01-ex-02',
    type: 'dropdown_match',
    instruction: 'Свържете думите от колонките, за да получите фрази.',
    order: 3,
    points: 4,
    questions: [
      { id: 'q1', left: 'Добро', options: ['утро!', 'ден!', 'нощ!', 'вечер!'], correctAnswer: 'утро!' },
      { id: 'q2', left: 'Добър', options: ['утро!', 'ден!', 'нощ!', 'вечер!'], correctAnswer: 'ден!' },
      { id: 'q3', left: 'Лека', options: ['утро!', 'ден!', 'нощ!', 'вечер!'], correctAnswer: 'нощ!' },
      { id: 'q4', left: 'Добър', options: ['утро!', 'ден!', 'нощ!', 'вечер!'], correctAnswer: 'вечер!' },
    ],
  } as DropdownMatchExercise,

  // ORDER 4: Exercise 3 - Fill in missing letters (Page 9, bottom right)
  {
    id: 'l01-ex-03',
    type: 'letter_choice',
    instruction: 'Попълнете липсващите букви.',
    order: 4,
    points: 7,
    puzzles: [
      { id: 'p1', word: 'Д_Б_Р Д_Н', correctLetters: ['О', 'Ъ', 'Е'] },
      { id: 'p2', word: 'Д_ВИ_ДА_Е', correctLetters: ['О', 'Ж', 'Н'] },
      { id: 'p3', word: 'ДО_РО У_РО', correctLetters: ['Б', 'Т'] },
      { id: 'p4', word: 'ЗД_А__Й', correctLetters: ['Р', 'В', 'Е'] },
      { id: 'p5', word: 'Д_Б_Р ВЕ_Е_', correctLetters: ['О', 'Ъ', 'Ч', 'Р'] },
      { id: 'p6', word: 'ЛЕ_А НО_', correctLetters: ['К', 'Щ'] },
      { id: 'p7', word: 'З_Р_В_Й_Е', correctLetters: ['Д', 'А', 'Е', 'Т'] },
    ],
  } as LetterChoiceExercise,

  // ORDER 5: НОВИ ДУМИ 2 - Countries vocabulary (Page 10, top) - NOT AN EXERCISE!
  {
    id: 'l01-novi-dumi-02',
    type: 'illustrated_cards',
    title: 'НОВИ ДУМИ 2',
    instruction: 'Запознайте се с имената на държавите',
    audioUrl: '/assets/lesson-01/audio/new-words-02.wav?v=2',
    order: 5,
    cards: [
      { 
        id: 'bulgaria', 
        imageUrl: '/assets/lesson-01/novi-dumi-2-countries/bulgaria.jpg', 
        label: 'България',
        sublabels: ['българин', 'българка', 'българи']
      },
      { 
        id: 'iraq', 
        imageUrl: '/assets/lesson-01/novi-dumi-2-countries/iraq.jpg', 
        label: 'Ирак',
        sublabels: ['иракчанин', 'иракчанка', 'иракчани']
      },
      { 
        id: 'ukraine', 
        imageUrl: '/assets/lesson-01/novi-dumi-2-countries/ukraine.jpg', 
        label: 'Украйна',
        sublabels: ['украинец', 'украинка', 'украинци']
      },
      { 
        id: 'syria', 
        imageUrl: '/assets/lesson-01/novi-dumi-2-countries/syria.jpg', 
        label: 'Сирия',
        sublabels: ['сириец', 'сирийка', 'сирийци']
      },
      { 
        id: 'lebanon', 
        imageUrl: '/assets/lesson-01/novi-dumi-2-countries/lebanon.jpg', 
        label: 'Ливан',
        sublabels: ['ливанец', 'ливанка', 'ливанци']
      },
      { 
        id: 'iran', 
        imageUrl: '/assets/lesson-01/novi-dumi-2-countries/iran.jpg', 
        label: 'Иран',
        sublabels: ['иранец', 'иранка', 'иранци']
      },
      { 
        id: 'morocco', 
        imageUrl: '/assets/lesson-01/novi-dumi-2-countries/morocco.jpg', 
        label: 'Мароко',
        sublabels: ['мароканец', 'мароканка', 'мароканци']
      },
      { 
        id: 'afghanistan', 
        imageUrl: '/assets/lesson-01/novi-dumi-2-countries/afghanistan.jpg', 
        label: 'Афганистан',
        sublabels: ['афганистанец', 'афганистанка', 'афганистанци']
      },
      { 
        id: 'algeria', 
        imageUrl: '/assets/lesson-01/novi-dumi-2-countries/algeria.jpg', 
        label: 'Алжир',
        sublabels: ['алжирец', 'алжирка', 'алжирци']
      },
    ]
  } as IllustratedCardsExercise,

  // ORDER 6: Exercise 4 - Syllable blocks (Page 10, middle) - Custom component
  {
    id: 'l01-ex-04',
    type: 'syllable_blocks',
    instruction: 'Подредете блокчетата в думи.',
    order: 6,
    points: 8,
    puzzles: [
      { id: 'puzzle1', syllables: ['Я', 'РИ', 'БЪЛ', 'ГА'], correctWord: 'БЪЛГАРИЯ' },
      { id: 'puzzle2', syllables: ['ВАН', 'ЛИ'], correctWord: 'ЛИВАН' },
      { id: 'puzzle3', syllables: ['Я', 'СИ', 'РИ'], correctWord: 'СИРИЯ' },
      { id: 'puzzle4', syllables: ['НЕЦ', 'И', 'КРА', 'У'], correctWord: 'УКРАЙНЕЦ' },
      { id: 'puzzle5', syllables: ['ЖИР', 'АЛ'], correctWord: 'АЛЖИР' },
      { id: 'puzzle6', syllables: ['СТАН', 'ГА', 'АФ', 'НИ'], correctWord: 'АФГАНИСТАН' },
      { id: 'puzzle7', syllables: ['НИН', 'И', 'ЧА', 'РАК'], correctWord: 'ИРАКЧАНИН' },
      { id: 'puzzle8', syllables: ['И', 'КА', 'РАН'], correctWord: 'ИРАНКА' },
      { id: 'puzzle9', syllables: ['НЕЦ', 'ЛЕС', 'ПА', 'ТИ'], correctWord: 'ПАЛЕСТИНЕЦ' },
    ]
  } as SyllableBlocksExercise,

  // ORDER 7: Exercise 5 - Write country name (Page 10, bottom) - Simple text input
  {
    id: 'l01-ex-05',
    type: 'fill_in_blank',
    instruction: 'Напишете името на страната си.',
    order: 7,
    points: 1,
    sentences: [
      { text: '__________', blanks: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], correctAnswers: ['България', 'Сирия', 'Ливан', 'Украйна', 'Иран', 'Ирак', 'Алжир', 'Афганистан', 'Мароко'] },
    ],
  } as FillInBlankExercise,

  // ORDER 8: ГРАМАТИКА 1 - Personal pronouns (Page 11, top) - NOT AN EXERCISE!
  {
    id: 'l01-gramatika-01',
    type: 'grammar_visual',
    title: 'ГРАМАТИКА 1',
    subtitle: 'Граматика – Лични местоимения (8)',
    instruction: 'Запознайте се с личните местоимения',
    order: 8,
    pronouns: [
      { pronoun: 'аз', imageUrl: '/assets/lesson-01/gramatika-1-pronouns/1.az.jpg' },
      { pronoun: 'ти', imageUrl: '/assets/lesson-01/gramatika-1-pronouns/2.ti.jpg' },
      { pronoun: 'той', imageUrl: '/assets/lesson-01/gramatika-1-pronouns/3.toi.jpg' },
      { pronoun: 'тя', imageUrl: '/assets/lesson-01/gramatika-1-pronouns/4.tia.jpg' },
      { pronoun: 'то', imageUrl: '/assets/lesson-01/gramatika-1-pronouns/5.to.jpg' },
      { pronoun: 'ние', imageUrl: '/assets/lesson-01/gramatika-1-pronouns/6.nie.jpg' },
      { pronoun: 'вие', imageUrl: '/assets/lesson-01/gramatika-1-pronouns/7.vie.jpg' },
      { pronoun: 'те', imageUrl: '/assets/lesson-01/gramatika-1-pronouns/8.te.jpg' },
    ]
  } as GrammarVisualExercise,

  // ORDER 9: Exercise 6 - Word search (Page 11, middle)
  {
    id: 'l01-ex-06',
    type: 'word_search',
    instruction: 'Колко думи можете да намерите?',
    order: 9,
    points: 7,
    letterString: 'ниетевиеазтойтоти',
    correctWords: ['ние', 'те', 'вие', 'аз', 'той', 'то', 'ти'],
    distractorWords: ['тя', 'нея', 'ви'],
  } as WordSearchExercise,

  // ORDER 10: ГРАМАТИКА 2 - Verb СЪМ (Page 11, bottom) - NOT AN EXERCISE!
  {
    id: 'l01-gramatika-02',
    type: 'grammar_examples',
    title: 'ГРАМАТИКА 2',
    subtitle: 'Глагол СЪМ',
    instruction: 'Запознайте се с глагол СЪМ',
    order: 10,
    examples: [
      { 
        imageUrl: '/assets/lesson-01/gramatika-1-pronouns/az-sam-mohamed.jpg', 
        text: 'Аз съм Мохамед.', 
        subtext: 'Аз съм от Сирия.' 
      },
      { 
        imageUrl: '/assets/lesson-01/gramatika-1-pronouns/ti-si-haled.jpg', 
        text: 'Ти си Халед.', 
        subtext: 'Ти си от Ирак.' 
      },
      { 
        imageUrl: '/assets/lesson-01/gramatika-1-pronouns/toy-e-ivan.jpg', 
        text: 'Той е Иван.', 
        subtext: 'Той е от България.' 
      },
      { 
        imageUrl: '/assets/lesson-01/gramatika-1-pronouns/tya-e-ana.jpg', 
        text: 'Тя е Ана.', 
        subtext: 'Тя е от Украйна.' 
      },
      { 
        imageUrl: '/assets/lesson-01/gramatika-1-pronouns/nie-sme-mohamed-bana.jpg', 
        text: 'Ние сме Мохамед и Баня.', 
        subtext: 'Ние сме от Сирия.' 
      },
      { 
        imageUrl: '/assets/lesson-01/gramatika-1-pronouns/vye-ste-dzhamil-mariam.jpg', 
        text: 'Вие сте Джамил и Мариам.', 
        subtext: 'Вие сте от Ирак.' 
      },
      { 
        imageUrl: '/assets/lesson-01/gramatika-1-pronouns/te-sa-babur-ara-azar.jpg', 
        text: 'Те са Бабур, Ара и Азар.', 
        subtext: 'Те са от Афганистан.' 
      },
    ]
  } as GrammarExamplesExercise,

  // ORDER 11: Exercise 7 - Match pronouns with verb forms (Page 12, top left)
  {
    id: 'l01-ex-07',
    type: 'dropdown_match',
    instruction: 'Свържете личните местоимения с правилната форма на глагола съм.',
    order: 11,
    points: 8,
    questions: [
      { id: 'q1', left: 'аз', options: ['съм', 'си', 'е', 'сме', 'сте', 'са'], correctAnswer: 'съм' },
      { id: 'q2', left: 'ти', options: ['съм', 'си', 'е', 'сме', 'сте', 'са'], correctAnswer: 'си' },
      { id: 'q3', left: 'той', options: ['съм', 'си', 'е', 'сме', 'сте', 'са'], correctAnswer: 'е' },
      { id: 'q4', left: 'тя', options: ['съм', 'си', 'е', 'сме', 'сте', 'са'], correctAnswer: 'е' },
      { id: 'q5', left: 'то', options: ['съм', 'си', 'е', 'сме', 'сте', 'са'], correctAnswer: 'е' },
      { id: 'q6', left: 'ние', options: ['съм', 'си', 'е', 'сме', 'сте', 'са'], correctAnswer: 'сме' },
      { id: 'q7', left: 'вие', options: ['съм', 'си', 'е', 'сме', 'сте', 'са'], correctAnswer: 'сте' },
      { id: 'q8', left: 'те', options: ['съм', 'си', 'е', 'сме', 'сте', 'са'], correctAnswer: 'са' },
    ],
  } as DropdownMatchExercise,

  // ORDER 12: Exercise 8 - Fill with flags (Page 12, top right)
  {
    id: 'l01-ex-08',
    type: 'fill_with_images',
    instruction: 'Попълнете празните места.',
    order: 12,
    points: 18,
    modelText: 'Аз съм Петър. Аз съм от България.',
    modelFlag: '/assets/lesson-01/exercise-01-flags/flag-bulgaria.jpg',
    sentences: [
      { id: '1', pronoun: 'Ти', name: 'Елена', country: 'България', flagUrl: '/assets/lesson-01/exercise-01-flags/flag-bulgaria.jpg', correctVerb1: 'си', correctVerb2: 'си' },
      { id: '2', pronoun: 'Той', name: 'Омар', country: 'Сирия', flagUrl: '/assets/lesson-01/exercise-01-flags/flag-syria.jpg', correctVerb1: 'е', correctVerb2: 'е' },
      { id: '3', pronoun: 'Тя', name: 'Ирина', country: 'Украйна', flagUrl: '/assets/lesson-01/exercise-01-flags/flag-ukraine.jpg', correctVerb1: 'е', correctVerb2: 'е' },
      { id: '4', pronoun: 'Ние', name: 'Лина и Ахмад', country: 'Ливан', flagUrl: '/assets/lesson-01/exercise-01-flags/flag-lebanon.jpg', correctVerb1: 'сме', correctVerb2: 'сме' },
      { id: '5', pronoun: 'Вие', name: 'Зайнеб и Али', country: 'Ирак', flagUrl: '/assets/lesson-01/exercise-01-flags/flag-iraq.jpg', correctVerb1: 'сте', correctVerb2: 'сте' },
      { id: '6', pronoun: 'Те', name: 'Амир и Ширин', country: 'Иран', flagUrl: '/assets/lesson-01/exercise-01-flags/flag-iran.jpg', correctVerb1: 'са', correctVerb2: 'са' },
    ],
    verbOptions: ['съм', 'си', 'е', 'сме', 'сте', 'са'],
    countryOptions: ['България', 'Сирия', 'Украйна', 'Ливан', 'Ирак', 'Иран'],
  } as FillWithImagesExercise,

  // ORDER 13: ДИАЛОЗИ 1 (Page 12, middle) - NOT AN EXERCISE!
  {
    id: 'l01-dialozi-01',
    type: 'dialogues',
    title: 'ДИАЛОЗИ 1',
    instruction: 'Прочетете диалозите',
    audioUrl: '/assets/lesson-01/audio/dialogues-01.wav',
    order: 13,
    sections: [
      {
        id: 'а.',
        lines: [
          { text: 'Здравейте, аз съм Хасан.' },
          { text: 'Здравейте, аз съм Иван.' },
          { text: 'Приятно ми е!' },
          { text: 'Приятно ми е!' },
        ]
      },
      {
        id: 'б.',
        lines: [
          { text: 'Откъде сте?' },
          { text: 'Аз съм от България. А Вие?' },
          { text: 'Аз съм от Мароко.' },
        ]
      },
    ]
  } as DialoguesExercise,

  // ORDER 17: ГРАМАТИКА 3 - Аз съм / Аз не съм (Page 13) - NOT AN EXERCISE!
  {
    id: 'l01-gramatika-03',
    type: 'grammar_examples',
    title: 'ГРАМАТИКА 3',
    subtitle: 'Аз съм / Аз не съм',
    instruction: 'Запознайте се с Хасан, Тала, Георги и Петя',
    order: 17,
    examples: [
      {
        imageUrl: '/assets/lesson-01/gramatika-3/hasan.jpg',
        text: 'Аз съм Хасан.',
        lines: [
          'Аз съм Хасан.',
          'Аз съм арабин.',
          'Аз съм бежанец от Сирия.',
        ],
      },
      {
        imageUrl: '/assets/lesson-01/gramatika-3/tala.jpg',
        text: 'Аз съм Тала.',
        lines: [
          'Аз съм Тала.',
          'Аз съм арабка.',
          'Аз съм бежанка от Сирия.',
        ],
      },
      {
        imageUrl: '/assets/lesson-01/gramatika-3/hasan-tala.png',
        text: 'Ние сме Хасан и Тала.',
        lines: [
          'Ние сме Хасан и Тала.',
          'Ние сме араби.',
          'Ние сме бежанци от Сирия.',
        ],
      },
      {
        imageUrl: '/assets/lesson-01/gramatika-3/georgi-uchitel.jpg',
        text: 'Аз съм Георги.',
        lines: [
          'Аз съм Георги.',
          'Аз съм учител.',
          'Аз не съм бежанец.',
        ],
      },
      {
        imageUrl: '/assets/lesson-01/gramatika-3/petya-uchitelka.jpg',
        text: 'Аз съм Петя.',
        lines: [
          'Аз съм Петя.',
          'Аз съм учителка.',
          'Аз не съм бежанка.',
        ],
      },
      {
        imageUrl: '/assets/lesson-01/gramatika-3/georgi-petya.jpg',
        text: 'Ние сме Георги и Петя.',
        lines: [
          'Ние сме Георги и Петя.',
          'Ние сме учители.',
          'Ние не сме бежанци.',
        ],
      },
    ],
  } as GrammarExamplesExercise,

  // ORDER 18: Exercise 12 - Make negative sentences (Page 13) - Borrowed from Ex.11 (dropdown_match)
  {
    id: 'l01-ex-12',
    type: 'dropdown_match',
    instruction: 'Направете отрицателни изречения.',
    order: 18,
    points: 6,
    questions: [
      { id: 'q1', left: 'Ти … учител.', options: ['не съм', 'не си', 'не е', 'не сме', 'не сте', 'не са'], correctAnswer: 'не си' },
      { id: 'q2', left: 'Ние … бежанци.', options: ['не съм', 'не си', 'не е', 'не сме', 'не сте', 'не са'], correctAnswer: 'не сме' },
      { id: 'q3', left: 'Те … украинци.', options: ['не съм', 'не си', 'не е', 'не сме', 'не сте', 'не са'], correctAnswer: 'не са' },
      { id: 'q4', left: 'Тя … учителка.', options: ['не съм', 'не си', 'не е', 'не сме', 'не сте', 'не са'], correctAnswer: 'не е' },
      { id: 'q5', left: 'Той … арабин.', options: ['не съм', 'не си', 'не е', 'не сме', 'не сте', 'не са'], correctAnswer: 'не е' },
      { id: 'q6', left: 'Вие … българи.', options: ['не съм', 'не си', 'не е', 'не сме', 'не сте', 'не са'], correctAnswer: 'не сте' },
    ],
  } as DropdownMatchExercise,

  // ORDER 19: ГРАМАТИКА 4 - Questions & Answers (Page 13) - NOT AN EXERCISE!
  {
    id: 'l01-gramatika-04',
    type: 'grammar_examples',
    title: 'ГРАМАТИКА 4',
    subtitle: 'Въпроси и отговори',
    instruction: 'Запознайте се с въпросителни изречения',
    order: 19,
    examples: [
      {
        imageUrl: '/assets/lesson-01/gramatika-4/bulgarin-li-ste.png',
        text: '– Българин ли сте?',
        lines: [
          '– Българин ли сте?',
          '– Да, аз съм българин.',
        ],
      },
      {
        imageUrl: '/assets/lesson-01/gramatika-4/uchitel-li-ste.png',
        text: '– Учител ли сте?',
        lines: [
          '– Учител ли сте?',
          '– Не, не съм учител.',
        ],
      },
    ],
  } as GrammarExamplesExercise,

  // ORDER 20: Exercise 13 - Complete sentences with Yes answers (Page 14)
  {
    id: 'l01-ex-13',
    type: 'workbook_fill_blank',
    instruction: 'Довършете изреченията по модела.',
    order: 20,
    points: 8,
    layout: 'qa-stacked',
    sentences: [
      {
        text: '– Петър българин ли е? | – Да, той е българин.',
        blanks: [],
        correctAnswers: [],
        isExample: true,
      },
      {
        text: 'Оксана украинка ли е? | Да, _______.',
        blanks: [0],
        correctAnswers: ['тя е украинка.'],
        acceptableAnswers: [['тя е украинка', 'тя е украинка.']],
      },
      {
        text: 'Хасан сириец ли е? | Да, _______.',
        blanks: [0],
        correctAnswers: ['той е сириец.'],
        acceptableAnswers: [['той е сириец', 'той е сириец.']],
      },
      {
        text: 'Лава палестинка ли е? | Да, _______.',
        blanks: [0],
        correctAnswers: ['тя е палестинка.'],
        acceptableAnswers: [['тя е палестинка', 'тя е палестинка.']],
      },
      {
        text: 'Вие от Ливан ли сте? | Да, _______.',
        blanks: [0],
        correctAnswers: ['ние сме от Ливан.'],
        acceptableAnswers: [['ние сме от Ливан', 'ние сме от Ливан.', 'аз съм от Ливан', 'аз съм от Ливан.']],
      },
      {
        text: 'Те украинци ли са? | Да, _______.',
        blanks: [0],
        correctAnswers: ['те са украинци.'],
        acceptableAnswers: [['те са украинци', 'те са украинци.']],
      },
      {
        text: 'Вие бежанци ли сте? | Да, _______.',
        blanks: [0],
        correctAnswers: ['ние сме бежанци.'],
        acceptableAnswers: [['ние сме бежанци', 'ние сме бежанци.', 'аз съм бежанец', 'аз съм бежанка']],
      },
      {
        text: 'Вие бежанец ли сте? | Да, _______.',
        blanks: [0],
        correctAnswers: ['аз съм бежанец.'],
        acceptableAnswers: [['аз съм бежанец', 'аз съм бежанец.', 'аз съм бежанка', 'аз съм бежанка.']],
      },
      {
        text: 'Той украинец ли е? | Да, _______.',
        blanks: [0],
        correctAnswers: ['той е украинец.'],
        acceptableAnswers: [['той е украинец', 'той е украинец.']],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ORDER 21: Exercise 14 - Complete sentences with No answers (Page 14)
  {
    id: 'l01-ex-14',
    type: 'workbook_fill_blank',
    instruction: 'Довършете изреченията по модела.',
    order: 21,
    points: 8,
    layout: 'qa-stacked',
    sentences: [
      {
        text: '– Вие българин ли сте? | – Не, не съм българин.',
        blanks: [],
        correctAnswers: [],
        isExample: true,
      },
      {
        text: 'Ти сириец ли си? | Не, _______.',
        blanks: [0],
        correctAnswers: ['не съм сириец.'],
        acceptableAnswers: [['не съм сириец', 'не съм сириец.']],
      },
      {
        text: 'Тя ливанка ли е? | Не, _______.',
        blanks: [0],
        correctAnswers: ['не е ливанка.'],
        acceptableAnswers: [['не е ливанка', 'не е ливанка.', 'тя не е ливанка', 'тя не е ливанка.']],
      },
      {
        text: 'Той арабин ли е? | Не, _______.',
        blanks: [0],
        correctAnswers: ['не е арабин.'],
        acceptableAnswers: [['не е арабин', 'не е арабин.', 'той не е арабин', 'той не е арабин.']],
      },
      {
        text: 'Те бежанци ли са? | Не, _______.',
        blanks: [0],
        correctAnswers: ['не са бежанци.'],
        acceptableAnswers: [['не са бежанци', 'не са бежанци.', 'те не са бежанци', 'те не са бежанци.']],
      },
      {
        text: 'Вие от Алжир ли сте? | Не, _______.',
        blanks: [0],
        correctAnswers: ['не сме от Алжир.'],
        acceptableAnswers: [['не сме от Алжир', 'не сме от Алжир.', 'не съм от Алжир', 'не съм от Алжир.']],
      },
      {
        text: 'Вие афганистанци ли сте? | Не, _______.',
        blanks: [0],
        correctAnswers: ['не сме афганистанци.'],
        acceptableAnswers: [['не сме афганистанци', 'не сме афганистанци.', 'не съм афганистанец', 'не съм афганистанец.']],
      },
      {
        text: 'Те от Ирак ли са? | Не, _______.',
        blanks: [0],
        correctAnswers: ['не са от Ирак.'],
        acceptableAnswers: [['не са от Ирак', 'не са от Ирак.', 'те не са от Ирак', 'те не са от Ирак.']],
      },
      {
        text: 'Вие бежанка ли сте? | Не, _______.',
        blanks: [0],
        correctAnswers: ['не съм бежанка.'],
        acceptableAnswers: [['не съм бежанка', 'не съм бежанка.', 'не съм бежанец', 'не съм бежанец.']],
      },
    ],
  } as WorkbookFillBlankExercise,

  // ORDER 22: ГРАМАТИКА 5 - Сегашно време – съм (Page 14) - NOT AN EXERCISE!
  {
    id: 'l01-gramatika-05',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 5',
    subtitle: 'Граматика – Сегашно време (12)',
    instruction: 'Запознайте се с глагол съм – сегашно време',
    order: 22,
    tableTitle: 'Сегашно време – съм',
    columns: ['(+)', '(–)', '(?)'],
    rows: [
      { pronoun: 'аз',  cells: ['съм', 'не съм', 'ли съм'] },
      { pronoun: 'ти',  cells: ['си',  'не си',  'ли си']  },
      { pronoun: 'той', cells: ['е',   'не е',   'ли е']   },
      { pronoun: 'тя',  cells: ['е',   'не е',   'ли е']   },
      { pronoun: 'то',  cells: ['е',   'не е',   'ли е']   },
      { pronoun: 'ние', cells: ['сме', 'не сме', 'ли сме'] },
      { pronoun: 'вие', cells: ['сте', 'не сте', 'ли сте'] },
      { pronoun: 'те',  cells: ['са',  'не са',  'ли са']  },
    ],
    notes: [
      'Аз съм българин. = Българин съм.',
      'Вие българин ли сте? = Българин ли сте?',
    ],
  } as GrammarTableExercise,

  // ORDER 23: ДИАЛОЗИ 2 (Page 15) - TTS on click, no audio file
  {
    id: 'l01-dialozi-02',
    type: 'dialogues',
    title: 'ДИАЛОЗИ 2',
    instruction: 'Натиснете секцията за автоматично прочитане',
    order: 23,
    sections: [
      {
        id: 'а.',
        lines: [
          { text: 'Здравей, как си?' },
          { text: 'Благодаря, добре. А ти?' },
          { text: 'Много добре.' },
        ],
      },
      {
        id: 'б.',
        lines: [
          { text: 'Здравейте! Как сте?' },
          { text: 'Много добре. А Вие?' },
          { text: 'Аз също, благодаря.' },
          { text: 'Приятен ден!' },
          { text: 'Приятен ден!' },
        ],
      },
      {
        id: 'в.',
        lines: [
          { text: 'Добър вечер! Как сте?' },
          { text: 'Добре. А Вие как сте?' },
          { text: 'Добре. Приятна вечер!' },
          { text: 'Благодаря, подобно.' },
        ],
      },
      {
        id: 'г.',
        lines: [
          { text: 'Здравей, Мохамед! Как си?' },
          { text: 'Чудесно!' },
          { text: 'Как са Хади и Камал?' },
          { text: 'Добре са.' },
          { text: 'Довиждане! Всичко хубаво!' },
          { text: 'Благодаря, подобно.' },
        ],
      },
    ],
  } as DialoguesExercise,

  // ORDER 24: УПРАЖНЕНИЕ 17 - Подредете фразите (Page 15) - dialogue_builder
  {
    id: 'l01-ex-17',
    type: 'dialogue_builder',
    title: 'УПРАЖНЕНИЕ 17',
    instruction: 'Подредете фразите, за да получите диалози.',
    order: 24,
    sections: [
      {
        id: 'а.',
        givenFirstLine: 'Добър ден!',
        sentences: [
          'Добър ден!',
          'Добър ден!',
          'Как сте?',
          'Благодаря, добре. А Вие?',
          'Аз също.',
          'Приятен ден!',
          'Приятен ден!',
        ],
      },
      {
        id: 'б.',
        givenFirstLine: 'Добро утро!',
        sentences: [
          'Добро утро!',
          'Добро утро!',
          'Аз съм учителят. А Вие?',
          'Аз съм Ана.',
          'Аз съм Георги. А Вие?',
          'Аз също.',
          'Довиждане!',
          'Довиждане.',
        ],
      },
      {
        id: 'в.',
        givenFirstLine: 'Добър вечер!',
        sentences: [
          'Добър вечер!',
          'Добър вечер!',
          'Аз съм Таня.',
          'Аз съм Дмитро.',
          'Аз съм от Украйна.',
          'Българка ли сте?',
          'Да, аз съм българка. А Вие?',
          'Приятно ми е!',
          'Приятно ми е!',
        ],
      },
      {
        id: 'г.',
        givenFirstLine: 'Здравейте!',
        sentences: [
          'Здравейте!',
          'Здравейте!',
          'Аз съм Ева. А Вие?',
          'Аз съм Фози.',
          'Откъде сте?',
          'Аз съм от България. А Вие?',
          'Аз съм бежанец от Сирия.',
          'Приятно ми е.',
          'Приятно ми е.',
        ],
      },
    ],
  } as DialogueBuilderExercise,
];

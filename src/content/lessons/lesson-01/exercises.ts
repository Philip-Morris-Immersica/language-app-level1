import type { Exercise, IllustratedCardsExercise, MatchPairsExercise, ImageLabelingExercise, FillInBlankExercise, SyllableBlocksExercise, GrammarVisualExercise, WordSearchExercise, GrammarExamplesExercise, DialoguesExercise, DropdownMatchExercise, LetterChoiceExercise } from '@/content/types';

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
      { id: 'p1', word: 'Д_Б_Р', correctLetters: ['О', 'Ъ'], availableLetters: ['О', 'Ъ', 'А', 'Е', 'И', 'У'] },
      { id: 'p2', word: 'Д_ВИ_ДА_Е', correctLetters: ['О', 'Ж', 'Н'], availableLetters: ['О', 'Ж', 'Н', 'А', 'Е', 'И'] },
      { id: 'p3', word: 'ДО_РО У_РО', correctLetters: ['Б', 'Т'], availableLetters: ['Б', 'Т', 'Д', 'П', 'К'] },
      { id: 'p4', word: 'ЗД_А__Й', correctLetters: ['Р', 'В', 'Е'], availableLetters: ['Р', 'В', 'Е', 'А', 'О', 'И'] },
      { id: 'p5', word: 'Д_Б_Р ВЕ_Е_', correctLetters: ['О', 'Ъ', 'Ч', 'Р'], availableLetters: ['О', 'Ъ', 'Ч', 'Р', 'А', 'Е'] },
      { id: 'p6', word: 'НО_ НА Ш_Л', correctLetters: ['Щ', 'А'], availableLetters: ['Щ', 'А', 'К', 'О', 'Е'] },
      { id: 'p7', word: 'З_Р_В_Й_Е', correctLetters: ['Д', 'А', 'Е', 'Т'], availableLetters: ['Д', 'А', 'Е', 'Т', 'О', 'И'] },
    ],
  } as LetterChoiceExercise,

  // ORDER 5: НОВИ ДУМИ 2 - Countries vocabulary (Page 10, top) - NOT AN EXERCISE!
  {
    id: 'l01-novi-dumi-02',
    type: 'illustrated_cards',
    title: 'НОВИ ДУМИ 2',
    instruction: 'Запознайте се с имената на държавите',
    audioUrl: '/assets/lesson-01/audio/new-words-02.wav',
    order: 5,
    cards: [
      { 
        id: 'bulgaria', 
        imageUrl: '/assets/lesson-01/novi-dumi-2-countries/country-visual-03.jpg', 
        label: 'България',
        sublabels: ['българин', 'българка', 'българи']
      },
      { 
        id: 'iraq', 
        imageUrl: '/assets/lesson-01/novi-dumi-2-countries/country-visual-04.jpg', 
        label: 'Ирак',
        sublabels: ['иракчанин', 'иракчанка', 'иракчани']
      },
      { 
        id: 'ukraine', 
        imageUrl: '/assets/lesson-01/novi-dumi-2-countries/country-visual-05.jpg', 
        label: 'Украйна',
        sublabels: ['украинец', 'украинка', 'украинци']
      },
      { 
        id: 'syria', 
        imageUrl: '/assets/lesson-01/novi-dumi-2-countries/country-visual-06.jpg', 
        label: 'Сирия',
        sublabels: ['сириец', 'сирийка', 'сирийци']
      },
      { 
        id: 'lebanon', 
        imageUrl: '/assets/lesson-01/novi-dumi-2-countries/country-visual-07.jpg', 
        label: 'Ливан',
        sublabels: ['ливанец', 'ливанка', 'ливанци']
      },
      { 
        id: 'iran', 
        imageUrl: '/assets/lesson-01/novi-dumi-2-countries/country-visual-08.jpg', 
        label: 'Иран',
        sublabels: ['иранец', 'иранка', 'иранци']
      },
      { 
        id: 'morocco', 
        imageUrl: '/assets/lesson-01/novi-dumi-2-countries/maroko.jpg', 
        label: 'Мароко',
        sublabels: ['мароканец', 'мароканка', 'мароканци']
      },
      { 
        id: 'afghanistan', 
        imageUrl: '/assets/lesson-01/novi-dumi-2-countries/country-visual-09.jpg', 
        label: 'Афганистан',
        sublabels: ['афганистанец', 'афганистанка', 'афганистанци']
      },
      { 
        id: 'algeria', 
        imageUrl: '/assets/lesson-01/novi-dumi-2-countries/country-visual-10.jpg', 
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
      { id: 'puzzle1', syllables: ['БЪЛ', 'ГА', 'РИ', 'Я'], correctWord: 'БЪЛГАРИЯ' },
      { id: 'puzzle2', syllables: ['ВАН', 'ЛИ'], correctWord: 'ЛИВАН' },
      { id: 'puzzle3', syllables: ['РИ', 'Я', 'СИ'], correctWord: 'СИРИЯ' },
      { id: 'puzzle4', syllables: ['РИ', 'Я', 'СИ'], correctWord: 'СИРИЯ' },
      { id: 'puzzle5', syllables: ['КРА', 'И', 'У', 'НЕЦ'], correctWord: 'УКРАЙНЕЦ' },
      { id: 'puzzle6', syllables: ['ЖИР', 'АЛ'], correctWord: 'АЛЖИР' },
      { id: 'puzzle7', syllables: ['НИ', 'СТАН', 'АФ', 'ГА'], correctWord: 'АФГАНИСТАН' },
      { id: 'puzzle8', syllables: ['РАК', 'ЧА', 'И', 'НИН'], correctWord: 'ИРАКЧАНИН' },
      { id: 'puzzle9', syllables: ['КА', 'РАН', 'И'], correctWord: 'ИРАНКА' },
      { id: 'puzzle10', syllables: ['ЛЕС', 'ТИ', 'НЕЦ', 'ПА'], correctWord: 'ПАЛЕСТИНЕЦ' },
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
      { pronoun: 'аз', imageUrl: '/assets/lesson-01/gramatika-1-pronouns/az-sam-mohamed.jpg' },
      { pronoun: 'ти', imageUrl: '/assets/lesson-01/gramatika-1-pronouns/ti-si-haled.jpg' },
      { pronoun: 'той', imageUrl: '/assets/lesson-01/gramatika-1-pronouns/toy-e-ivan.jpg' },
      { pronoun: 'тя', imageUrl: '/assets/lesson-01/gramatika-1-pronouns/tya-e-ana.jpg' },
      { pronoun: 'то' },
      { pronoun: 'ние', imageUrl: '/assets/lesson-01/gramatika-1-pronouns/nie-sme-mohamed-bana.jpg' },
      { pronoun: 'вие', imageUrl: '/assets/lesson-01/gramatika-1-pronouns/vye-ste-dzhamil-mariam.jpg' },
      { pronoun: 'те', imageUrl: '/assets/lesson-01/gramatika-1-pronouns/te-sa-babur-ara-azar.jpg' },
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
];

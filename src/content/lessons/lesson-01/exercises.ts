import type { Exercise, IllustratedCardsExercise, MatchPairsExercise, ImageLabelingExercise, FillInBlankExercise, SyllableBlocksExercise, GrammarVisualExercise } from '@/content/types';

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
    audioUrl: '/assets/lesson-01/audio/greetings.mp3',
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
    type: 'match_pairs',
    instruction: 'Свържете думите от колонките, за да получите фрази.',
    order: 3,
    points: 4,
    pairs: [
      { id: 'pair1', left: 'Добро', correctRight: 'утро!' },
      { id: 'pair2', left: 'Добър', correctRight: 'ден!' },
      { id: 'pair3', left: 'Лека', correctRight: 'нощ!' },
      { id: 'pair4', left: 'Добър', correctRight: 'вечер!' },
    ],
  } as MatchPairsExercise,

  // ORDER 4: Exercise 3 - Fill in missing letters (Page 9, bottom right)
  {
    id: 'l01-ex-03',
    type: 'fill_in_blank',
    instruction: 'Попълнете липсващите букви.',
    order: 4,
    points: 20,
    sentences: [
      { text: 'Д_Б_Р', blanks: [1, 3], correctAnswers: ['О', 'Ъ'] },
      { text: 'Д_ВИ_ДА_Е', blanks: [1, 4, 7], correctAnswers: ['О', 'Ж', 'Н'] },
      { text: 'ДО_РО У_РО', blanks: [2, 8], correctAnswers: ['Б', 'Т'] },
      { text: 'ЗД_А__Й', blanks: [2, 4, 5], correctAnswers: ['Р', 'В', 'Е'] },
      { text: 'Д_Б_Р ВЕ_Е_', blanks: [1, 3, 8, 10], correctAnswers: ['О', 'Ъ', 'Ч', 'Р'] },
      { text: 'НО_ НА Ш_Л', blanks: [2, 8], correctAnswers: ['Щ', 'А'] },
      { text: 'З_Р_В_Й_Е', blanks: [1, 3, 5, 7], correctAnswers: ['Д', 'А', 'Е', 'Т'] },
    ],
  } as FillInBlankExercise,

  // ORDER 5: НОВИ ДУМИ 2 - Countries vocabulary (Page 10, top) - NOT AN EXERCISE!
  {
    id: 'l01-novi-dumi-02',
    type: 'illustrated_cards',
    title: 'НОВИ ДУМИ 2',
    instruction: 'Запознайте се с имената на държавите',
    audioUrl: '/assets/lesson-01/audio/countries.wav',
    order: 5,
    cards: [
      { id: 'bulgaria', imageUrl: '/assets/lesson-01/novi-dumi-2-countries/country-visual-03.jpg', label: 'България' },
      { id: 'iraq', imageUrl: '/assets/lesson-01/novi-dumi-2-countries/country-visual-04.jpg', label: 'Ирак' },
      { id: 'ukraine', imageUrl: '/assets/lesson-01/novi-dumi-2-countries/country-visual-05.jpg', label: 'Украйна' },
      { id: 'syria', imageUrl: '/assets/lesson-01/novi-dumi-2-countries/country-visual-06.jpg', label: 'Сирия' },
      { id: 'lebanon', imageUrl: '/assets/lesson-01/novi-dumi-2-countries/country-visual-07.jpg', label: 'Ливан' },
      { id: 'iran', imageUrl: '/assets/lesson-01/novi-dumi-2-countries/country-visual-08.jpg', label: 'Иран' },
      { id: 'morocco', imageUrl: '/assets/lesson-01/novi-dumi-2-countries/maroko.jpg', label: 'Мароко' },
      { id: 'afghanistan', imageUrl: '/assets/lesson-01/novi-dumi-2-countries/country-visual-09.jpg', label: 'Афганистан' },
      { id: 'algeria', imageUrl: '/assets/lesson-01/novi-dumi-2-countries/country-visual-10.jpg', label: 'Алжир' },
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
      { id: 'puzzle1', syllables: ['-БЪЛ-', '-ГА-', '-РИ-', '-Я'], correctWord: 'БЪЛГАРИЯ' },
      { id: 'puzzle2', syllables: ['-ВАН', '-ЛИ-'], correctWord: 'ЛИВАН' },
      { id: 'puzzle3', syllables: ['-РИ-', '-Я', '-СИ-'], correctWord: 'СИРИЯ' },
      { id: 'puzzle4', syllables: ['-РИ-', '-Я', '-СИ-'], correctWord: 'СИРИЯ' },
      { id: 'puzzle5', syllables: ['-КРА-', '-И-', '-У-', '-НЕЦ'], correctWord: 'УКРАЙНЕЦ' },
      { id: 'puzzle6', syllables: ['-ЖИР', '-АЛ-'], correctWord: 'АЛЖИР' },
      { id: 'puzzle7', syllables: ['-НИ-', '-СТАН', '-АФ-', '-ГА-'], correctWord: 'АФГАНИСТАН' },
      { id: 'puzzle8', syllables: ['-РАК-', '-ЧА-', '-И-', '-НИН'], correctWord: 'ИРАКЧАНИН' },
      { id: 'puzzle9', syllables: ['-КА', '-РАН-', '-И-'], correctWord: 'ИРАНКА' },
      { id: 'puzzle10', syllables: ['-ЛЕС-', '-ТИ-', '-НЕЦ', '-ПА-'], correctWord: 'ПАЛЕСТИНЕЦ' },
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
      { text: '________________', blanks: [0], correctAnswers: ['България', 'Сирия', 'Ливан', 'Украйна', 'Иран', 'Ирак', 'Алжир', 'Афганистан', 'Мароко'] },
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
      { pronoun: 'аз' },
      { pronoun: 'ти' },
      { pronoun: 'той' },
      { pronoun: 'тя' },
      { pronoun: 'то' },
      { pronoun: 'ние' },
      { pronoun: 'вие' },
      { pronoun: 'те' },
    ]
  } as GrammarVisualExercise,
];

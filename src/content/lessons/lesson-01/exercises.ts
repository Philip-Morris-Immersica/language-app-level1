import type { Exercise, IllustratedCardsExercise, MatchPairsExercise, ImageLabelingExercise, FillInBlankExercise } from '@/content/types';

export const exercises: Exercise[] = [
  // Exercise 1: Flags - Write country names under flags
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

  // Exercise 2: Match word pairs to form greetings
  {
    id: 'l01-ex-02',
    type: 'match_pairs',
    instruction: 'Свържете думите от колонките, за да получите фрази.',
    order: 2,
    points: 4,
    pairs: [
      { id: 'pair1', left: 'Добро', correctRight: 'утро!' },
      { id: 'pair2', left: 'Добър', correctRight: 'ден!' },
      { id: 'pair3', left: 'Лека', correctRight: 'нощ!' },
      { id: 'pair4', left: 'Добър', correctRight: 'вечер!' },
    ],
  } as MatchPairsExercise,

  // Exercise 3: Fill in missing letters
  {
    id: 'l01-ex-03',
    type: 'fill_in_blank',
    instruction: 'Попълнете липсващите букви.',
    order: 3,
    points: 7,
    sentences: [
      { text: 'Д___Б___Р', blanks: [1, 4], correctAnswers: ['О', 'Ъ'] },
      { text: 'Д___ВИ___ДА___Е', blanks: [1, 4, 7], correctAnswers: ['О', 'Ж', 'Н'] },
      { text: 'ДО___РО У___РО', blanks: [2, 8], correctAnswers: ['Б', 'Т'] },
      { text: 'ЗД___А______Й', blanks: [2, 4, 5], correctAnswers: ['Р', 'В', 'Е'] },
      { text: 'Д___Б___Р ВЕ___Е___', blanks: [1, 4, 10, 12], correctAnswers: ['О', 'Ъ', 'Ч', 'Р'] },
      { text: 'НО___ НА Ш___Л', blanks: [2, 9], correctAnswers: ['Щ', 'А'] },
      { text: 'З___Р___В___Й___Е', blanks: [1, 3, 5, 7], correctAnswers: ['Д', 'А', 'Е', 'Т'] },
    ],
  } as FillInBlankExercise,

  // НОВИ ДУМИ 1: Greetings vocabulary with illustrations
  {
    id: 'l01-novi-dumi-01',
    type: 'illustrated_cards',
    title: 'НОВИ ДУМИ 1',
    instruction: 'Запознайте се с новите думи и изрази',
    audioUrl: '/assets/lesson-01/audio/greetings.mp3',
    order: 4,
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

  // НОВИ ДУМИ 2: Countries vocabulary with maps
  {
    id: 'l01-novi-dumi-02',
    type: 'illustrated_cards',
    title: 'НОВИ ДУМИ 2',
    instruction: 'Запознайте се с имената на държавите',
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
];

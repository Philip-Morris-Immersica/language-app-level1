import type { Exercise, IllustratedCardsExercise, MatchPairsExercise, ImageLabelingExercise } from '@/content/types';

export const exercises: Exercise[] = [
  // Exercise 1: Illustrated Cards (Greetings vocabulary)
  {
    id: 'l01-ex-01',
    type: 'illustrated_cards',
    title: 'НОВИ ДУМИ 1',
    instruction: 'Запознайте се с новите думи и изрази',
    audioUrl: '/assets/lesson-01/audio/greetings.mp3',
    order: 1,
    cards: [
      { id: 'morning', imageUrl: '/assets/lesson-01/novi-dumi-1-greetings/01-dobro-utro.jpg', label: 'Добро утро!' },
      { id: 'day', imageUrl: '/assets/lesson-01/novi-dumi-1-greetings/02-dobur-den.jpg', label: 'Добър ден!' },
      { id: 'evening', imageUrl: '/assets/lesson-01/novi-dumi-1-greetings/03-dobur-vecher.jpg', label: 'Добър вечер!' },
      { id: 'night', imageUrl: '/assets/lesson-01/novi-dumi-1-greetings/04-leka-nosht.jpg', label: 'Лека нощ!' },
      { id: 'hello', imageUrl: '/assets/lesson-01/novi-dumi-1-greetings/05-zdravey.jpg', label: 'Здравей!' },
      { id: 'hello_formal', imageUrl: '/assets/lesson-01/novi-dumi-1-greetings/06-zdraveyte.jpg', label: 'Здравейте!' },
    ]
  } as IllustratedCardsExercise,

  // Exercise 2: Match Pairs (Greetings phrases)
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

  // Exercise 3: Flag identification (Image Labeling)
  {
    id: 'l01-ex-03',
    type: 'image_labeling',
    instruction: 'Напишете имената на държавите под знамената.',
    order: 3,
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
];

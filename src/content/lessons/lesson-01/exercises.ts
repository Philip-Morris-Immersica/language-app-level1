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
      { id: 'hello', imageUrl: '/assets/lesson-01/greetings/greeting-169.jpg', label: 'Здравей!' },
      { id: 'hello_formal', imageUrl: '/assets/lesson-01/greetings/greeting-171.jpg', label: 'Здравейте!' },
      { id: 'morning', imageUrl: '/assets/lesson-01/greetings/greeting-173.jpg', label: 'Добро утро!' },
      { id: 'day', imageUrl: '/assets/lesson-01/greetings/greeting-175.jpg', label: 'Добър ден!' },
      { id: 'evening', imageUrl: '/assets/lesson-01/greetings/greeting-177.jpg', label: 'Добър вечер!' },
      { id: 'night', imageUrl: '/assets/lesson-01/greetings/greeting-179.jpg', label: 'Лека нощ!' },
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
      { id: 'bulgaria', imageUrl: '/assets/lesson-01/flags/bulgaria.jpg', correctLabel: 'България' },
      { id: 'flag48', imageUrl: '/assets/lesson-01/flags/flag-48.jpg', correctLabel: 'Сирия' },
      { id: 'flag49', imageUrl: '/assets/lesson-01/flags/flag-49.jpg', correctLabel: 'Ливан' },
      { id: 'ukraine', imageUrl: '/assets/lesson-01/flags/ukraine.jpg', correctLabel: 'Украйна' },
      { id: 'flag51', imageUrl: '/assets/lesson-01/flags/flag-51.jpg', correctLabel: 'Иран' },
      { id: 'flag52', imageUrl: '/assets/lesson-01/flags/flag-52.jpg', correctLabel: 'Ирак' },
      { id: 'morocco', imageUrl: '/assets/lesson-01/flags/morocco.jpg', correctLabel: 'Алжир' },
    ],
    options: ['Алжир', 'България', 'Ирак', 'Иран', 'Ливан', 'Сирия', 'Украйна'],
  } as ImageLabelingExercise,
];

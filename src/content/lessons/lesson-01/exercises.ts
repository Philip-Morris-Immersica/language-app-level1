import type { Exercise, FillInBlankExercise, MatchPairsExercise, ImageLabelingExercise } from '@/content/types';

export const exercises: Exercise[] = [
  // Exercise 1: Match greetings (like Bolt)
  {
    id: 'l01-ex-01',
    type: 'match_pairs',
    instruction: 'Свържете думите:',
    order: 1,
    points: 4,
    pairs: [
      { id: 'pair1', left: 'Добро', correctRight: 'утро!' },
      { id: 'pair2', left: 'Добър', correctRight: 'ден!' },
      { id: 'pair3', left: 'Лека', correctRight: 'нощ!' },
      { id: 'pair4', left: 'Добър', correctRight: 'вечер!' },
    ],
  } as MatchPairsExercise,

  // Exercise 2: Fill in pronouns
  {
    id: 'l01-ex-02',
    type: 'fill_in_blank',
    instruction: 'Попълнете с лични местоимения:',
    order: 2,
    points: 5,
    sentences: [
      {
        text: '_______ съм българин.',
        blanks: [0],
        correctAnswers: ['Аз'],
      },
      {
        text: '_______ си учител.',
        blanks: [0],
        correctAnswers: ['Ти'],
      },
      {
        text: '_______ е от Сирия.',
        blanks: [0],
        correctAnswers: ['Той', 'Тя', 'То'],
      },
      {
        text: '_______ сме бежанци.',
        blanks: [0],
        correctAnswers: ['Ние'],
      },
      {
        text: '_______ сте учители.',
        blanks: [0],
        correctAnswers: ['Вие'],
      },
    ],
  } as FillInBlankExercise,

  // Exercise 3: Fill in verb forms
  {
    id: 'l01-ex-03',
    type: 'fill_in_blank',
    instruction: 'Попълнете правилната форма на глагола СЪМ:',
    order: 3,
    points: 6,
    sentences: [
      {
        text: 'Аз _______ от България.',
        blanks: [1],
        correctAnswers: ['съм'],
      },
      {
        text: 'Ти _______ учителка.',
        blanks: [1],
        correctAnswers: ['си'],
      },
      {
        text: 'Той _______ сириец.',
        blanks: [1],
        correctAnswers: ['е'],
      },
      {
        text: 'Ние _______ от Ирак.',
        blanks: [1],
        correctAnswers: ['сме'],
      },
      {
        text: 'Вие _______ бежанци.',
        blanks: [1],
        correctAnswers: ['сте'],
      },
      {
        text: 'Те _______ учители.',
        blanks: [1],
        correctAnswers: ['са'],
      },
    ],
  } as FillInBlankExercise,

  // Exercise 4: Flag identification with emoji
  {
    id: 'l01-ex-04',
    type: 'image_labeling',
    instruction: 'Свържете държавите с техните знамена:',
    order: 4,
    points: 7,
    images: [
      { id: 'flag1', imageUrl: '🇧🇬', correctLabel: 'България' },
      { id: 'flag2', imageUrl: '🇸🇾', correctLabel: 'Сирия' },
      { id: 'flag3', imageUrl: '🇮🇶', correctLabel: 'Ирак' },
      { id: 'flag4', imageUrl: '🇮🇷', correctLabel: 'Иран' },
      { id: 'flag5', imageUrl: '🇱🇧', correctLabel: 'Ливан' },
      { id: 'flag6', imageUrl: '🇩🇿', correctLabel: 'Алжир' },
      { id: 'flag7', imageUrl: '🇺🇦', correctLabel: 'Украйна' },
    ],
    options: ['България', 'Сирия', 'Ирак', 'Иран', 'Ливан', 'Алжир', 'Украйна'],
  } as ImageLabelingExercise,
];

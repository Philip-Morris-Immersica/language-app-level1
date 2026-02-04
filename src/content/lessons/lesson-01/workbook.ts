import type { Exercise, FillInBlankExercise, MultipleChoiceExercise, MatchPairsExercise, WordOrderExercise } from '@/content/types';

export const workbookExercises: Exercise[] = [
  // Exercise 1: Fill in personal pronouns
  {
    id: 'l01-wb-01',
    type: 'fill_in_blank',
    instruction: 'Напишете личните местоимения.',
    order: 1,
    points: 6,
    sentences: [
      {
        text: 'Аз съм Мохамед.',
        blanks: [],
        correctAnswers: [],
      },
      {
        text: '_______ сме Амина и Карим.',
        blanks: [0],
        correctAnswers: ['Ние'],
      },
      {
        text: '_______ е Камал.',
        blanks: [0],
        correctAnswers: ['Той', 'Тя', 'То'],
        acceptableAnswers: [['Той', 'Тя', 'То']],
      },
      {
        text: '_______ си Мурад.',
        blanks: [0],
        correctAnswers: ['Ти'],
      },
      {
        text: '_______ са Ширин и Амир.',
        blanks: [0],
        correctAnswers: ['Те'],
      },
      {
        text: '_______ сте Али и Зайнеб.',
        blanks: [0],
        correctAnswers: ['Вие'],
      },
    ],
  } as FillInBlankExercise,

  // Exercise 2: Positive forms of съм
  {
    id: 'l01-wb-02',
    type: 'fill_in_blank',
    instruction: 'Напишете правилната положителна форма на глагола СЪМ (+).',
    order: 2,
    points: 5,
    sentences: [
      {
        text: 'Той е българин.',
        blanks: [],
        correctAnswers: [],
      },
      {
        text: 'Вие _______ учители.',
        blanks: [1],
        correctAnswers: ['сте'],
      },
      {
        text: 'Аз _______ сириец.',
        blanks: [1],
        correctAnswers: ['съм'],
      },
      {
        text: 'Ти _______ иранка.',
        blanks: [1],
        correctAnswers: ['си'],
      },
      {
        text: 'Те _______ афганистанци.',
        blanks: [1],
        correctAnswers: ['са'],
      },
      {
        text: 'Ние _______ араби.',
        blanks: [1],
        correctAnswers: ['сме'],
      },
    ],
  } as FillInBlankExercise,

  // Exercise 3: Negative forms of съм
  {
    id: 'l01-wb-03',
    type: 'fill_in_blank',
    instruction: 'Напишете правилната отрицателна форма на глагола СЪМ (-).',
    order: 3,
    points: 5,
    sentences: [
      {
        text: 'Тя не е от Ливан.',
        blanks: [],
        correctAnswers: [],
      },
      {
        text: 'Аз _______ от Ирак.',
        blanks: [1],
        correctAnswers: ['не съм'],
      },
      {
        text: 'Ти _______ от Афганистан.',
        blanks: [1],
        correctAnswers: ['не си'],
      },
      {
        text: 'Те _______ от Иран.',
        blanks: [1],
        correctAnswers: ['не са'],
      },
      {
        text: 'Вие _______ от Алжир.',
        blanks: [1],
        correctAnswers: ['не сте'],
      },
      {
        text: 'Ние _______ от България.',
        blanks: [1],
        correctAnswers: ['не сме'],
      },
    ],
  } as FillInBlankExercise,

  // Exercise 4: Question forms
  {
    id: 'l01-wb-04',
    type: 'fill_in_blank',
    instruction: 'Напишете правилната въпросителна форма на глагола СЪМ (?) и отговорите на въпросите.',
    order: 4,
    points: 5,
    sentences: [
      {
        text: 'Вие от Палестина ли сте? Не, не съм от Палестина.',
        blanks: [],
        correctAnswers: [],
      },
      {
        text: 'Ти алжирец _______ ? Да, _____________________ .',
        blanks: [2, 4],
        correctAnswers: ['ли си', 'аз съм'],
      },
      {
        text: 'То от София _______ ? Не, _____________________ .',
        blanks: [3, 5],
        correctAnswers: ['ли е', 'не е'],
      },
      {
        text: 'Ние бежанци _______ ? Да, _____________________ .',
        blanks: [2, 4],
        correctAnswers: ['ли сме', 'ние сме'],
      },
      {
        text: 'Те иракчани _______ ? Не, _____________________ .',
        blanks: [2, 4],
        correctAnswers: ['ли са', 'не са'],
      },
      {
        text: 'Аз учителка _______? Да, _____________________ .',
        blanks: [2, 4],
        correctAnswers: ['ли съм', 'аз съм'],
      },
    ],
  } as FillInBlankExercise,

  // Exercise 5: Match greetings with time of day
  {
    id: 'l01-wb-05',
    type: 'match_pairs',
    instruction: 'Свържете поздравите с правилното време на деня.',
    order: 5,
    points: 3,
    pairs: [
      { id: 'pair1', left: '12:00', correctRight: 'Добър ден!' },
      { id: 'pair2', left: '8:00', correctRight: 'Добро утро!' },
      { id: 'pair3', left: '20:00', correctRight: 'Добър вечер!' },
    ],
  } as MatchPairsExercise,

  // Exercise 6: Word order - form sentences
  {
    id: 'l01-wb-06',
    type: 'word_order',
    instruction: 'Подредете думите в изречения.',
    order: 6,
    points: 4,
    questions: [
      {
        words: ['българин', 'той', 'е', 'ли'],
        correctSentence: 'той е българин ли',
        hint: 'Въпросително изречение',
      },
      {
        words: ['ли', 'учителка', 'е', 'тя'],
        correctSentence: 'тя е учителка ли',
      },
      {
        words: ['не', 'Багдад', 'те', 'от', 'са'],
        correctSentence: 'те не са от Багдад',
      },
      {
        words: ['сирийци', 'ли', 'вие', 'сте'],
        correctSentence: 'вие сте сирийци ли',
      },
    ],
  } as WordOrderExercise,
];

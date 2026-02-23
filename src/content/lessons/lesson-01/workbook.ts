import type { Exercise, WorkbookFillBlankExercise, DropdownMatchExercise, WordOrderExercise } from '@/content/types';

export const workbookExercises: Exercise[] = [

  // Exercise 1: Fill in personal pronouns
  {
    id: 'l01-wb-01',
    type: 'workbook_fill_blank',
    instruction: 'Напишете личните местоимения.',
    order: 1,
    points: 5,
    layout: 'two-column',
    sentences: [
      {
        text: 'Аз съм Мохамед.',
        blanks: [],
        correctAnswers: [],
        isExample: true,
      },
      {
        text: '_______ сме Амина и Карим.',
        blanks: [0],
        correctAnswers: ['Ние'],
        options: ['Аз', 'Ти', 'Той', 'Тя', 'То', 'Ние', 'Вие', 'Те'],
      },
      {
        text: '_______ е Камал.',
        blanks: [0],
        correctAnswers: ['Той'],
        acceptableAnswers: [['Той', 'Тя', 'То']],
        options: ['Аз', 'Ти', 'Той', 'Тя', 'То', 'Ние', 'Вие', 'Те'],
      },
      {
        text: '_______ си Мурад.',
        blanks: [0],
        correctAnswers: ['Ти'],
        options: ['Аз', 'Ти', 'Той', 'Тя', 'То', 'Ние', 'Вие', 'Те'],
      },
      {
        text: '_______ са Ширин и Амир.',
        blanks: [0],
        correctAnswers: ['Те'],
        options: ['Аз', 'Ти', 'Той', 'Тя', 'То', 'Ние', 'Вие', 'Те'],
      },
      {
        text: '_______ сте Али и Зайнеб.',
        blanks: [0],
        correctAnswers: ['Вие'],
        options: ['Аз', 'Ти', 'Той', 'Тя', 'То', 'Ние', 'Вие', 'Те'],
      },
    ],
  } as WorkbookFillBlankExercise,

  // Exercise 2: Positive forms of съм (+)
  {
    id: 'l01-wb-02',
    type: 'workbook_fill_blank',
    instruction: 'Напишете правилната положителна форма на глагола СЪМ (+).',
    order: 2,
    points: 5,
    layout: 'two-column',
    sentences: [
      {
        text: 'Той е българин.',
        blanks: [],
        correctAnswers: [],
        isExample: true,
      },
      {
        text: 'Вие _______ учители.',
        blanks: [1],
        correctAnswers: ['сте'],
        options: ['съм', 'си', 'е', 'сме', 'сте', 'са'],
      },
      {
        text: 'Аз _______ сириец.',
        blanks: [1],
        correctAnswers: ['съм'],
        options: ['съм', 'си', 'е', 'сме', 'сте', 'са'],
      },
      {
        text: 'Ти _______ иранка.',
        blanks: [1],
        correctAnswers: ['си'],
        options: ['съм', 'си', 'е', 'сме', 'сте', 'са'],
      },
      {
        text: 'Те _______ афганистанци.',
        blanks: [1],
        correctAnswers: ['са'],
        options: ['съм', 'си', 'е', 'сме', 'сте', 'са'],
      },
      {
        text: 'Ние _______ араби.',
        blanks: [1],
        correctAnswers: ['сме'],
        options: ['съм', 'си', 'е', 'сме', 'сте', 'са'],
      },
    ],
  } as WorkbookFillBlankExercise,

  // Exercise 3: Negative forms of съм (-)
  {
    id: 'l01-wb-03',
    type: 'workbook_fill_blank',
    instruction: 'Напишете правилната отрицателна форма на глагола СЪМ (-).',
    order: 3,
    points: 5,
    layout: 'two-column',
    sentences: [
      {
        text: 'Тя не е от Ливан.',
        blanks: [],
        correctAnswers: [],
        isExample: true,
      },
      {
        text: 'Аз _______ от Ирак.',
        blanks: [1],
        correctAnswers: ['не съм'],
        options: ['не съм', 'не си', 'не е', 'не сме', 'не сте', 'не са'],
      },
      {
        text: 'Ти _______ от Афганистан.',
        blanks: [1],
        correctAnswers: ['не си'],
        options: ['не съм', 'не си', 'не е', 'не сме', 'не сте', 'не са'],
      },
      {
        text: 'Те _______ от Иран.',
        blanks: [1],
        correctAnswers: ['не са'],
        options: ['не съм', 'не си', 'не е', 'не сме', 'не сте', 'не са'],
      },
      {
        text: 'Вие _______ от Алжир.',
        blanks: [1],
        correctAnswers: ['не сте'],
        options: ['не съм', 'не си', 'не е', 'не сме', 'не сте', 'не са'],
      },
      {
        text: 'Ние _______ от България.',
        blanks: [1],
        correctAnswers: ['не сме'],
        options: ['не съм', 'не си', 'не е', 'не сме', 'не сте', 'не са'],
      },
    ],
  } as WorkbookFillBlankExercise,

  // Exercise 4: Question forms of съм (?) + answers — qa-split layout
  {
    id: 'l01-wb-04',
    type: 'workbook_fill_blank',
    instruction: 'Напишете правилната въпросителна форма на глагола СЪМ (?) и отговорите на въпросите.',
    order: 4,
    points: 5,
    layout: 'qa-split',
    sentences: [
      {
        text: 'Вие от Палестина ли сте? | Не, не съм от Палестина.',
        blanks: [],
        correctAnswers: [],
        isExample: true,
      },
      {
        text: 'Ти алжирец _______ ? | Да, _______.',
        blanks: [1, 2],
        correctAnswers: ['ли си', 'аз съм алжирец'],
        options: ['ли съм', 'ли си', 'ли е', 'ли сме', 'ли сте', 'ли са'],
        acceptableAnswers: [
          ['ли си'],
          ['аз съм алжирец', 'да, аз съм алжирец', 'аз съм'],
        ],
      },
      {
        text: 'То от София _______ ? | Не, _______.',
        blanks: [1, 2],
        correctAnswers: ['ли е', 'не е от София'],
        options: ['ли съм', 'ли си', 'ли е', 'ли сме', 'ли сте', 'ли са'],
        acceptableAnswers: [
          ['ли е'],
          ['не е от София', 'не е', 'то не е от София'],
        ],
      },
      {
        text: 'Ние бежанци _______ ? | Да, _______.',
        blanks: [1, 2],
        correctAnswers: ['ли сме', 'ние сме бежанци'],
        options: ['ли съм', 'ли си', 'ли е', 'ли сме', 'ли сте', 'ли са'],
        acceptableAnswers: [
          ['ли сме'],
          ['ние сме бежанци', 'да, ние сме', 'ние сме'],
        ],
      },
      {
        text: 'Те иракчани _______ ? | Не, _______.',
        blanks: [1, 2],
        correctAnswers: ['ли са', 'не са иракчани'],
        options: ['ли съм', 'ли си', 'ли е', 'ли сме', 'ли сте', 'ли са'],
        acceptableAnswers: [
          ['ли са'],
          ['не са иракчани', 'не са', 'те не са'],
        ],
      },
      {
        text: 'Аз учителка _______ ? | Да, _______.',
        blanks: [1, 2],
        correctAnswers: ['ли съм', 'аз съм учителка'],
        options: ['ли съм', 'ли си', 'ли е', 'ли сме', 'ли сте', 'ли са'],
        acceptableAnswers: [
          ['ли съм'],
          ['аз съм учителка', 'да, аз съм', 'аз съм'],
        ],
      },
    ],
  } as WorkbookFillBlankExercise,

  // Exercise 5: Write the questions (given answers, form questions) — word_order
  {
    id: 'l01-wb-05',
    type: 'word_order',
    instruction: 'Напишете въпросите.',
    order: 5,
    points: 4,
    questions: [
      {
        words: ['Откъде', 'е', 'Хасан', '?'],
        correctSentence: 'Откъде е Хасан ?',
        hint: 'Хасан е от Сирия.',
      },
      {
        words: ['Как', 'е', 'Георги', '?'],
        correctSentence: 'Как е Георги ?',
        hint: 'Георги е много добре.',
      },
      {
        words: ['Сара', 'от', 'България', 'ли', 'е', '?'],
        correctSentence: 'Сара от България ли е ?',
        hint: 'Не, Сара не е от България.',
      },
      {
        words: ['Владимир', 'и', 'Полина', 'българи', 'ли', 'са', '?'],
        correctSentence: 'Владимир и Полина българи ли са ?',
        hint: 'Да, Владимир и Полина са българи.',
      },
    ],
  } as WordOrderExercise,

  // Exercise 6: Write the greetings for time of day — dropdown_match
  {
    id: 'l01-wb-06',
    type: 'dropdown_match',
    instruction: 'Напишете поздравите.',
    order: 6,
    points: 2,
    questions: [
      {
        id: 'q1',
        left: '12:00',
        options: ['Добро утро!', 'Добър ден!', 'Добър вечер!', 'Лека нощ!'],
        correctAnswer: 'Добър ден!',
      },
      {
        id: 'q2',
        left: '8:00',
        options: ['Добро утро!', 'Добър ден!', 'Добър вечер!', 'Лека нощ!'],
        correctAnswer: 'Добро утро!',
      },
      {
        id: 'q3',
        left: '20:00',
        options: ['Добро утро!', 'Добър ден!', 'Добър вечер!', 'Лека нощ!'],
        correctAnswer: 'Добър вечер!',
      },
    ],
  } as DropdownMatchExercise,
];

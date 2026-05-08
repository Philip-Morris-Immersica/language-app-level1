import type {
  Exercise,
  WorkbookFillBlankExercise,
  DropdownMatchExercise,
  MatchPairsExercise,
} from '@/content/types';

/**
 * Преговор / работна тетрадка — урок 7
 * Източник: a1-files/lessons/lesson-7/Workbook-Lesson-exercises/a1-WORKBOOK-lesson-7.pdf
 */
export const workbookExercises: Exercise[] = [

  // WB Exercise 1: Изберете часа/датата с думи (адаптация: dropdown за мобилно)
  {
    id: 'l07-wb-01',
    type: 'dropdown_match',
    title: 'УПРАЖНЕНИЕ 1',
    instruction: 'Изберете правилния израз с думи за всеки час или дата.',
    order: 1,
    points: 4,
    questions: [
      {
        id: 'ex',
        left: '9:50 — …',
        options: [],
        correctAnswer: 'десет без десет',
        isExample: true,
      },
      {
        id: 'q1',
        left: '18:15 — …',
        options: [
          'шест и петнайсет вечерта',
          'осем и петнайсет вечерта',
          'седем без петнайсет вечерта',
          'шест и половина вечерта',
        ],
        correctAnswer: 'шест и петнайсет вечерта',
      },
      {
        id: 'q2',
        left: '13:30 — …',
        options: [
          'един и половина следобед',
          'три и половина следобед',
          'дванайсет и половина',
          'два и половина следобед',
        ],
        correctAnswer: 'един и половина следобед',
      },
      {
        id: 'q3',
        left: '02.12.2001 г. — …',
        options: [
          'втори декември две хиляди и първа година',
          'дванайсети декември две хиляди и първа година',
          'втори декември хиляда деветстотин и първа година',
          'втори ноември две хиляди и първа година',
        ],
        correctAnswer: 'втори декември две хиляди и първа година',
      },
      {
        id: 'q4',
        left: '03.04.1998 г. — …',
        options: [
          'трети април хиляда деветстотин деветдесет и осма година',
          'трети март хиляда деветстотин деветдесет и осма година',
          'четвърти април хиляда деветстотин деветдесет и осма година',
          'трети април две хиляди деветдесет и осма година',
        ],
        correctAnswer: 'трети април хиляда деветстотин деветдесет и осма година',
      },
    ],
  } as DropdownMatchExercise,

  // WB Exercise 2: Напишете числителните редни — изберете правилната форма по род
  {
    id: 'l07-wb-02',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 2',
    instruction: 'Изберете редното числително в правилната форма (по род на думата).',
    order: 2,
    points: 8,
    layout: 'two-column',
    sentences: [
      { text: 'десети ден (10)', blanks: [], correctAnswers: [], isExample: true },
      {
        text: '_______ месец (1)',
        blanks: [0],
        correctAnswers: ['първи'],
        options: ['първи', 'първа', 'първо'],
      },
      {
        text: '_______ час (4)',
        blanks: [0],
        correctAnswers: ['четвърти'],
        options: ['четвърти', 'четвърта', 'четвърто'],
      },
      {
        text: '_______ уикенд (7)',
        blanks: [0],
        correctAnswers: ['седми'],
        options: ['седми', 'седма', 'седмо'],
      },
      {
        text: '_______ нощ (8)',
        blanks: [0],
        correctAnswers: ['осма'],
        options: ['осми', 'осма', 'осмо'],
      },
      {
        text: '_______ седмица (2)',
        blanks: [0],
        correctAnswers: ['втора'],
        options: ['втори', 'втора', 'второ'],
      },
      {
        text: '_______ сутрин (6)',
        blanks: [0],
        correctAnswers: ['шеста'],
        options: ['шести', 'шеста', 'шесто'],
      },
      {
        text: '_______ година (3)',
        blanks: [0],
        correctAnswers: ['трета'],
        options: ['трети', 'трета', 'трето'],
      },
      {
        text: '_______ вечер (5)',
        blanks: [0],
        correctAnswers: ['пета'],
        options: ['пети', 'пета', 'пето'],
      },
    ],
  } as WorkbookFillBlankExercise,

  // WB Exercise 3: Предлози за време (от/до/в/във/през/на/преди/след)
  {
    id: 'l07-wb-03',
    type: 'dropdown_match',
    title: 'УПРАЖНЕНИЕ 3',
    instruction: 'Изберете подходящия предлог за време.',
    order: 3,
    points: 8,
    questions: [
      {
        id: 'ex',
        left: '… уикенда съм на планина.',
        options: [],
        correctAnswer: 'През',
        isExample: true,
      },
      {
        id: 'q1a',
        left: 'Работя … 9:00',
        options: ['в', 'на', 'от', 'до', 'през', 'преди', 'след'],
        correctAnswer: 'от',
      },
      {
        id: 'q1b',
        left: '… 17:30.',
        options: ['в', 'на', 'от', 'до', 'през', 'преди', 'след'],
        correctAnswer: 'до',
      },
      {
        id: 'q2',
        left: 'Той има рожден ден … 8 март.',
        options: ['в', 'на', 'от', 'до', 'през', 'преди', 'след'],
        correctAnswer: 'на',
      },
      {
        id: 'q3',
        left: '… лятото е горещо.',
        options: ['В', 'На', 'От', 'До', 'През', 'Преди', 'След'],
        correctAnswer: 'През',
      },
      {
        id: 'q4',
        left: '… зимата е студено.',
        options: ['В', 'На', 'От', 'До', 'През', 'Преди', 'След'],
        correctAnswer: 'През',
      },
      {
        id: 'q5',
        left: 'Учим … вторник и петък.',
        options: ['в', 'на', 'от', 'до', 'през', 'преди', 'след'],
        correctAnswer: 'в',
        alternateCorrectAnswers: ['във'],
      },
      {
        id: 'q6',
        left: 'Отивам на кино … работа.',
        options: ['в', 'на', 'от', 'до', 'през', 'преди', 'след'],
        correctAnswer: 'след',
        alternateCorrectAnswers: ['преди'],
      },
      {
        id: 'q7',
        left: 'Роден съм … 1998 година.',
        options: ['в', 'на', 'от', 'до', 'през', 'преди', 'след'],
        correctAnswer: 'през',
      },
    ],
  } as DropdownMatchExercise,

  // WB Exercise 4: Свържете въпросите с правилните отговори
  {
    id: 'l07-wb-04',
    type: 'match_pairs',
    title: 'УПРАЖНЕНИЕ 4',
    instruction: 'Свържете въпроса с правилния отговор.',
    order: 4,
    points: 14,
    pairs: [
      { id: 'p01', left: 'Кой ден е днес?',         correctRight: 'Сряда.' },
      { id: 'p02', left: 'В колко часà вечеряш?',   correctRight: 'В 19:00.' },
      { id: 'p03', left: 'Кога пиеш кафе?',          correctRight: 'Сутрин и на обяд.' },
      { id: 'p04', left: 'Колко е часът?',           correctRight: 'Два и пет.' },
      { id: 'p05', left: 'Как се казваш?',           correctRight: 'Светла.' },
      { id: 'p06', left: 'Какво е времето днес?',    correctRight: 'Дъждовно и ветровито.' },
      { id: 'p07', left: 'Имаш ли брат?',            correctRight: 'Не, нямам.' },
      { id: 'p08', left: 'Коя дата е днес?',         correctRight: '12 декември.' },
      { id: 'p09', left: 'На колко години си?',      correctRight: 'На 34.' },
      { id: 'p10', left: 'Кога си роден?',           correctRight: 'На 1 март 2002 година.' },
      { id: 'p11', left: 'Какъв е Иван?',            correctRight: 'Висок и слаб.' },
      { id: 'p12', left: 'Какво работиш?',           correctRight: 'Работя като учител.' },
      { id: 'p13', left: 'Какъв език учиш?',         correctRight: 'Английски.' },
      { id: 'p14', left: 'Къде учиш?',               correctRight: 'В университет в Пловдив.' },
    ],
  } as MatchPairsExercise,

];

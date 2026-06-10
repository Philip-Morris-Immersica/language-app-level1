import type { Exercise, WorkbookFillBlankExercise } from '@/content/types';

export const workbookExercises: Exercise[] = [

  {
    id: 'a2-l04-wb-01',
    type: 'workbook_fill_blank',
    title: 'ПРЕГОВОР',
    subtitle: 'Упражнения за затвърждаване на наученото',
    instruction: 'Попълнете правилните форми на глаголите в бъдеще време по модела „Ставам в 7:10. → Ще стана в 8:30.“',
    order: 24,
    points: 10,
    layout: 'two-column',
    columnLabels: { left: 'Какво правя през седмицата?', right: 'Какво ще правя в събота?' },
    sentences: [
      { text: 'Ставам в 7:10. | Ще стана в 8:30.', blanks: [], correctAnswers: [], isExample: true },
      { text: 'Вземам душ в 7:00. | _______ душ в 9:00 часа.', blanks: [1], correctAnswers: ['Ще взема'], acceptableAnswers: [['ще взема', 'Ще взема']] },
      { text: 'Правя сандвичи. | _______ палачинки с мед.', blanks: [1], correctAnswers: ['Ще направя'], acceptableAnswers: [['ще направя', 'Ще направя']] },
      { text: 'Тръгвам за работа в 8:00. | _______ за Витоша в 11:00.', blanks: [1], correctAnswers: ['Ще тръгна'], acceptableAnswers: [['ще тръгна', 'Ще тръгна']] },
      { text: 'Вземам метрото в 8:10. | _______ автобус в 11:15.', blanks: [1], correctAnswers: ['Ще взема'], acceptableAnswers: [['ще взема', 'Ще взема']] },
      { text: 'Пристигам в офиса в 8:45. | _______ на Витоша в 12:00.', blanks: [1], correctAnswers: ['Ще пристигна'], acceptableAnswers: [['ще пристигна', 'Ще пристигна']] },
      { text: 'Връщам се вкъщи в 18:30. | _______ вкъщи в 17:30.', blanks: [1], correctAnswers: ['Ще се върна'], acceptableAnswers: [['ще се върна', 'Ще се върна']] },
      { text: 'Правя пица. | _______ пет пици.', blanks: [1], correctAnswers: ['Ще направя'], acceptableAnswers: [['ще направя', 'Ще направя']] },
      { text: 'Купувам една кока-кола. | _______ 10 кока-коли.', blanks: [1], correctAnswers: ['Ще купя'], acceptableAnswers: [['ще купя', 'Ще купя']] },
      { text: 'Не каня гости. | _______ приятели на гости.', blanks: [1], correctAnswers: ['Ще поканя'], acceptableAnswers: [['ще поканя', 'Ще поканя']] },
      { text: 'Лягам си рано. | _______ късно.', blanks: [1], correctAnswers: ['Ще легна'], acceptableAnswers: [['ще легна', 'Ще легна', 'ще си легна']] },
    ],
  } as WorkbookFillBlankExercise,

  {
    id: 'a2-l04-wb-02',
    type: 'workbook_fill_blank',
    instruction: 'Изберете правилната форма на глагола.',
    order: 25,
    points: 8,
    layout: 'single',
    sentences: [
      { text: 'Всеки ден **започвам** / започна работа в 8:00 часа.', blanks: [], correctAnswers: [], isExample: true },
      { text: 'Днес ще _______ / _______ на Иван за екскурзията.', blanks: [1], correctAnswers: ['кажа'], options: ['казвам', 'кажа'], acceptableAnswers: [['кажа']] },
      { text: 'Никога не _______ / _______ за курса по български език.', blanks: [1], correctAnswers: ['закъснявам'], options: ['закъснявам', 'закъснея'], acceptableAnswers: [['закъснявам']] },
      { text: 'Всеки ден _______ / _______ за работа в 8:00 часа.', blanks: [1], correctAnswers: ['тръгвам'], options: ['тръгвам', 'тръгна'], acceptableAnswers: [['тръгвам']] },
      { text: 'Често _______ / _______ пари на децата за сладолед.', blanks: [1], correctAnswers: ['давам'], options: ['давам', 'дам'], acceptableAnswers: [['давам']] },
      { text: 'Обикновено _______ / _______ работа в 17:00 часа.', blanks: [1], correctAnswers: ['свършвам'], options: ['свършвам', 'свърша'], acceptableAnswers: [['свършвам']] },
      { text: 'Тази сутрин ще _______ / _______ от къщи по-рано.', blanks: [1], correctAnswers: ['изляза'], options: ['излизам', 'изляза'], acceptableAnswers: [['изляза']] },
      { text: 'Утре ще _______ / _______ в офиса пред всички.', blanks: [1], correctAnswers: ['дойда'], options: ['идвам', 'дойда'], acceptableAnswers: [['дойда']] },
      { text: 'Понякога не _______ / _______ какво казва учителката.', blanks: [1], correctAnswers: ['разбирам'], options: ['разбирам', 'разбера'], acceptableAnswers: [['разбирам']] },
    ],
  } as WorkbookFillBlankExercise,

  {
    id: 'a2-l04-wb-03',
    type: 'workbook_fill_blank',
    instruction: 'Поставете глагола в правилната форма в бъдеще време.',
    order: 26,
    points: 9,
    layout: 'single',
    sentences: [
      { text: 'Той утре ще отиде на работа и _______ на колегите. (отида, помогна)', blanks: [1], correctAnswers: ['ще помогне'], acceptableAnswers: [['ще помогне']] },
      { text: 'Ти _______ прозореца или _______ вратата? (отворя, затворя)', blanks: [1, 2], correctAnswers: ['ще отвориш', 'ще затвориш'], acceptableAnswers: [['ще отвориш', 'Ще отвориш'], ['ще затвориш', 'Ще затвориш']] },
      { text: 'Тя _______ за Варна през уикенда и _______ морето. (замина, видя)', blanks: [1, 2], correctAnswers: ['ще замине', 'ще види'], acceptableAnswers: [['ще замине'], ['ще види']] },
      { text: 'Те _______ на Камен и _______ в парка. (обадя се, срещна се)', blanks: [1, 2], correctAnswers: ['ще се обадят', 'ще се срещнат'], acceptableAnswers: [['ще се обадят'], ['ще се срещнат']] },
      { text: 'Вие _______ пари и _______ сметката. (намеря, платя)', blanks: [1, 2], correctAnswers: ['ще намерите', 'ще платите'], acceptableAnswers: [['ще намерите'], ['ще платите']] },
    ],
  } as WorkbookFillBlankExercise,

];

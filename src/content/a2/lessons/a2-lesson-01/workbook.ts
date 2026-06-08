import type {
  Exercise,
  WorkbookFillBlankExercise,
  DropdownMatchExercise,
} from '@/content/types';

// ПРЕГОВОР — упражнения от работната тетрадка към урок 1 „Ало, ало!".
// Рендират се автоматично под секция „Преговор".

export const workbookExercises: Exercise[] = [
  // WB1 — кратки винителни форми по местоимение — dropdown опции
  {
    id: 'a2-l01-wb-01',
    type: 'workbook_fill_blank',
    instruction: 'Изберете правилната кратка винителна форма.',
    order: 1,
    points: 7,
    layout: 'two-column',
    sentences: [
      { text: 'аз → ме', blanks: [], correctAnswers: [], isExample: true },
      { text: 'ти → _______',  blanks: [2], correctAnswers: ['те'], acceptableAnswers: [['те']], options: ['те', 'го', 'ме'] },
      { text: 'той → _______', blanks: [2], correctAnswers: ['го'], acceptableAnswers: [['го']], options: ['го', 'те', 'я'] },
      { text: 'тя → _______',  blanks: [2], correctAnswers: ['я'],  acceptableAnswers: [['я']],  options: ['я', 'го', 'ни'] },
      { text: 'то → _______',  blanks: [2], correctAnswers: ['го'], acceptableAnswers: [['го']], options: ['го', 'те', 'я'] },
      { text: 'ние → _______', blanks: [2], correctAnswers: ['ни'], acceptableAnswers: [['ни']], options: ['ни', 'ви', 'ги'] },
      { text: 'вие → _______', blanks: [2], correctAnswers: ['ви'], acceptableAnswers: [['ви']], options: ['ви', 'ни', 'те'] },
      { text: 'те → _______',  blanks: [2], correctAnswers: ['ги'], acceptableAnswers: [['ги']], options: ['ги', 'ни', 'ви'] },
    ],
  } as WorkbookFillBlankExercise,

  // WB2 — отговорете положително (+) или отрицателно (–): Ето / Няма
  // q4: „Къде съм на снимката?" — и „Ето те." (показваш на другия) и „Ето ме." (гледаш себе си) са приемливи
  {
    id: 'a2-l01-wb-02',
    type: 'dropdown_match',
    instruction: 'Отговорете положително (+) или отрицателно (–). Изберете правилния отговор по модела „Къде е учителката? (+) – Ето я."',
    order: 2,
    points: 7,
    questions: [
      { id: 'q1', left: 'Къде са гостите? (–)',        options: ['Няма ги.', 'Няма го.', 'Ето ги.'], correctAnswer: 'Няма ги.' },
      { id: 'q2', left: 'Къде е киното? (+)',           options: ['Ето го.', 'Ето я.', 'Няма го.'],   correctAnswer: 'Ето го.' },
      { id: 'q3', left: 'Къде си? (+)',                 options: ['Ето ме.', 'Ето те.', 'Ето го.'],   correctAnswer: 'Ето ме.' },
      { id: 'q4', left: 'Къде съм на снимката? (+)',    options: ['Ето те.', 'Ето ме.', 'Ето го.'],   correctAnswer: 'Ето те.', alternateCorrectAnswers: ['Ето ме.'] },
      { id: 'q5', left: 'Къде е мъжът ти? (–)',         options: ['Няма го.', 'Няма я.', 'Ето го.'],  correctAnswer: 'Няма го.' },
      { id: 'q6', left: 'Къде сте? (+)',                options: ['Ето ни.', 'Ето ви.', 'Ето ги.'],   correctAnswer: 'Ето ни.' },
      { id: 'q7', left: 'Къде сме на снимката? (–)',    options: ['Няма ви.', 'Няма ни.', 'Ето ни.'], correctAnswer: 'Няма ви.', alternateCorrectAnswers: ['Няма ни.'] },
    ],
  } as DropdownMatchExercise,

  // WB3 — заменете местоимението с подходяща дума — само един логичен отговор на въпрос
  {
    id: 'a2-l01-wb-03',
    type: 'dropdown_match',
    instruction: 'Изберете подходящата дума от списъка по модела „Включвам го. → Включвам телевизора."',
    order: 3,
    points: 11,
    questions: [
      { id: 'q0',  left: 'Включвам го. Включвам …',   options: ['телевизора', 'апартамента', 'автобуса', 'радиото', 'кафето'], correctAnswer: 'телевизора', isExample: true },
      { id: 'q1',  left: 'Изключвам я. Изключвам …',  options: ['лампата', 'прозореца', 'ключа', 'датата'],    correctAnswer: 'лампата' },
      { id: 'q2',  left: 'Отварям я. Отварям …',      options: ['вратата', 'прозореца', 'телефона', 'датата'], correctAnswer: 'вратата' },
      { id: 'q3',  left: 'Затварям ги. Затварям …',   options: ['прозорците', 'ключовете', 'вратите', 'лампите'], correctAnswer: 'прозорците' },
      { id: 'q4',  left: 'Заключвам го. Заключвам …', options: ['апартамента', 'радиото', 'телефона', 'кафето'], correctAnswer: 'апартамента' },
      { id: 'q5',  left: 'Отключвам я. Отключвам …',  options: ['вратата', 'прозореца', 'ключа', 'лампата'],   correctAnswer: 'вратата' },
      { id: 'q6',  left: 'Помня я. Помня …',          options: ['датата', 'телефона', 'прозореца', 'ключа'],   correctAnswer: 'датата' },
      { id: 'q7',  left: 'Забравям ги. Забравям …',   options: ['ключовете', 'прозорците', 'датите', 'лампите'], correctAnswer: 'ключовете' },
      { id: 'q8',  left: 'Слушам го. Слушам …',       options: ['радиото', 'апартамента', 'автобуса', 'кафето'], correctAnswer: 'радиото' },
      { id: 'q9',  left: 'Обичам я. Обичам …',        options: ['София', 'вратата', 'датата', 'лампата'],      correctAnswer: 'София' },
      { id: 'q10', left: 'Чакам го. Чакам …',         options: ['автобуса', 'радиото', 'апартамента', 'кафето'], correctAnswer: 'автобуса' },
      { id: 'q11', left: 'Пия го. Пия …',             options: ['кафето', 'апартамента', 'радиото', 'автобуса'], correctAnswer: 'кафето' },
    ],
  } as DropdownMatchExercise,

  // WB4 — преобразувайте изреченията с кратко винително местоимение — dropdown опции
  {
    id: 'a2-l01-wb-04',
    type: 'workbook_fill_blank',
    instruction: 'Изберете правилния вариант по модела „Фатима познава ли учителките? → Фатима познава ли ги?"',
    order: 4,
    points: 10,
    layout: 'qa-split',
    sentences: [
      { text: 'Фатима познава ли учителките? | Фатима познава ли ги?', blanks: [], correctAnswers: [], isExample: true },
      {
        text: 'Не чувам телефона. | _______',
        blanks: [1], correctAnswers: ['Не го чувам.'],
        acceptableAnswers: [['не го чувам.', 'не го чувам']],
        options: ['Не го чувам.', 'Не я чувам.', 'Не ги чувам.'],
      },
      {
        text: 'Прегръщам детето. | _______',
        blanks: [1], correctAnswers: ['Прегръщам го.'],
        acceptableAnswers: [['прегръщам го.', 'прегръщам го']],
        options: ['Прегръщам го.', 'Прегръщам я.', 'Прегръщам ги.'],
      },
      {
        text: 'Гледате ли филма? | _______',
        blanks: [1], correctAnswers: ['Гледате ли го?'],
        acceptableAnswers: [['гледате ли го?', 'гледате ли го']],
        options: ['Гледате ли го?', 'Гледате ли я?', 'Гледате ли ги?'],
      },
      {
        text: 'Катя не разбира колегите. | _______',
        blanks: [1], correctAnswers: ['Катя не ги разбира.'],
        acceptableAnswers: [['катя не ги разбира.', 'катя не ги разбира']],
        options: ['Катя не ги разбира.', 'Катя не го разбира.', 'Катя не я разбира.'],
      },
      {
        text: 'Каним Иван и Мая на гости. | _______',
        blanks: [1], correctAnswers: ['Каним ги на гости.'],
        acceptableAnswers: [['каним ги на гости.', 'каним ги на гости']],
        options: ['Каним ги на гости.', 'Каним го на гости.', 'Каним я на гости.'],
      },
      {
        text: 'Питаме учителката. | _______',
        blanks: [1], correctAnswers: ['Питаме я.'],
        acceptableAnswers: [['питаме я.', 'питаме я']],
        options: ['Питаме я.', 'Питаме го.', 'Питаме ги.'],
      },
      {
        text: 'Майката целува бебето. | _______',
        blanks: [1], correctAnswers: ['Майката го целува.'],
        acceptableAnswers: [['майката го целува.', 'майката го целува']],
        options: ['Майката го целува.', 'Майката я целува.', 'Майката ги целува.'],
      },
      {
        text: 'Виждате ли децата на Али? | _______',
        blanks: [1], correctAnswers: ['Виждате ли ги?'],
        acceptableAnswers: [['виждате ли ги?', 'виждате ли ги']],
        options: ['Виждате ли ги?', 'Виждате ли го?', 'Виждате ли я?'],
      },
      {
        text: 'Харесваш ли този квартал? | _______',
        blanks: [1], correctAnswers: ['Харесваш ли го?'],
        acceptableAnswers: [['харесваш ли го?', 'харесваш ли го']],
        options: ['Харесваш ли го?', 'Харесваш ли я?', 'Харесваш ли ги?'],
      },
      {
        text: 'Не намирам адреса. | _______',
        blanks: [1], correctAnswers: ['Не го намирам.'],
        acceptableAnswers: [['не го намирам.', 'не го намирам']],
        options: ['Не го намирам.', 'Не я намирам.', 'Не ги намирам.'],
      },
    ],
  } as WorkbookFillBlankExercise,
];

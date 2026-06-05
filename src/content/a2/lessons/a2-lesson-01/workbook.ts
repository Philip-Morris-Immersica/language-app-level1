import type {
  Exercise,
  WorkbookFillBlankExercise,
  DropdownMatchExercise,
} from '@/content/types';

// ПРЕГОВОР — упражнения от работната тетрадка към урок 1 „Ало, ало!".
// Рендират се автоматично под секция „Преговор".

export const workbookExercises: Exercise[] = [
  // WB1 — кратки винителни форми по местоимение
  {
    id: 'a2-l01-wb-01',
    type: 'workbook_fill_blank',
    instruction: 'Напишете правилната кратка винителна форма.',
    order: 1,
    points: 7,
    layout: 'two-column',
    sentences: [
      { text: 'аз → ме', blanks: [], correctAnswers: [], isExample: true },
      { text: 'ти → _______',  blanks: [2], correctAnswers: ['те'], acceptableAnswers: [['те']] },
      { text: 'той → _______', blanks: [2], correctAnswers: ['го'], acceptableAnswers: [['го']] },
      { text: 'тя → _______',  blanks: [2], correctAnswers: ['я'],  acceptableAnswers: [['я']] },
      { text: 'то → _______',  blanks: [2], correctAnswers: ['го'], acceptableAnswers: [['го']] },
      { text: 'ние → _______', blanks: [2], correctAnswers: ['ни'], acceptableAnswers: [['ни']] },
      { text: 'вие → _______', blanks: [2], correctAnswers: ['ви'], acceptableAnswers: [['ви']] },
      { text: 'те → _______',  blanks: [2], correctAnswers: ['ги'], acceptableAnswers: [['ги']] },
    ],
  } as WorkbookFillBlankExercise,

  // WB2 — отговорете положително (+) или отрицателно (–): Ето / Няма
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
      { id: 'q4', left: 'Къде съм във видеото? (+)',    options: ['Ето те.', 'Ето ме.', 'Ето го.'],   correctAnswer: 'Ето те.' },
      { id: 'q5', left: 'Къде е мъжът ти? (–)',         options: ['Няма го.', 'Няма я.', 'Ето го.'],  correctAnswer: 'Няма го.' },
      { id: 'q6', left: 'Къде сте? (+)',                options: ['Ето ни.', 'Ето ви.', 'Ето ги.'],   correctAnswer: 'Ето ни.' },
      { id: 'q7', left: 'Къде сме на снимката? (–)',    options: ['Няма ви.', 'Няма ни.', 'Ето ни.'], correctAnswer: 'Няма ви.', alternateCorrectAnswers: ['Няма ни.'] },
    ],
  } as DropdownMatchExercise,

  // WB3 — заменете местоимението с подходяща дума от списъка
  {
    id: 'a2-l01-wb-03',
    type: 'dropdown_match',
    instruction: 'Изберете подходящата дума от списъка по модела „Включвам го. → Включвам телевизора."',
    order: 3,
    points: 11,
    questions: [
      { id: 'q0',  left: 'Включвам го. Включвам …',   options: ['телевизора', 'апартамента', 'автобуса', 'радиото', 'кафето'], correctAnswer: 'телевизора', isExample: true },
      { id: 'q1',  left: 'Изключвам я. Изключвам …',  options: ['лампата', 'вратата', 'къщата', 'датата', 'София'], correctAnswer: 'лампата' },
      { id: 'q2',  left: 'Отварям я. Отварям …',      options: ['лампата', 'вратата', 'къщата', 'датата', 'София'], correctAnswer: 'вратата', alternateCorrectAnswers: ['къщата'] },
      { id: 'q3',  left: 'Затварям ги. Затварям …',   options: ['прозорците', 'ключовете'], correctAnswer: 'прозорците' },
      { id: 'q4',  left: 'Заключвам го. Заключвам …', options: ['апартамента', 'радиото', 'автобуса', 'кафето'], correctAnswer: 'апартамента' },
      { id: 'q5',  left: 'Отключвам я. Отключвам …',  options: ['лампата', 'вратата', 'къщата', 'датата', 'София'], correctAnswer: 'къщата', alternateCorrectAnswers: ['вратата'] },
      { id: 'q6',  left: 'Помня я. Помня …',          options: ['лампата', 'вратата', 'къщата', 'датата', 'София'], correctAnswer: 'датата' },
      { id: 'q7',  left: 'Забравям ги. Забравям …',   options: ['прозорците', 'ключовете'], correctAnswer: 'ключовете' },
      { id: 'q8',  left: 'Слушам го. Слушам …',       options: ['апартамента', 'радиото', 'автобуса', 'кафето'], correctAnswer: 'радиото' },
      { id: 'q9',  left: 'Обичам я. Обичам …',        options: ['лампата', 'вратата', 'къщата', 'датата', 'София'], correctAnswer: 'София' },
      { id: 'q10', left: 'Чакам го. Чакам …',         options: ['апартамента', 'радиото', 'автобуса', 'кафето'], correctAnswer: 'автобуса' },
      { id: 'q11', left: 'Пия го. Пия …',             options: ['апартамента', 'радиото', 'автобуса', 'кафето'], correctAnswer: 'кафето' },
    ],
  } as DropdownMatchExercise,

  // WB4 — преобразувайте изреченията с кратко винително местоимение
  {
    id: 'a2-l01-wb-04',
    type: 'workbook_fill_blank',
    instruction: 'Преобразувайте изреченията по модела „Фатима познава ли учителките? → Фатима познава ли ги?"',
    order: 4,
    points: 10,
    layout: 'qa-split',
    sentences: [
      { text: 'Фатима познава ли учителките? | Фатима познава ли ги?', blanks: [], correctAnswers: [], isExample: true },
      { text: 'Не чувам телефона. | _______',           blanks: [1], correctAnswers: ['Не го чувам.'],     acceptableAnswers: [['не го чувам.', 'не го чувам']] },
      { text: 'Прегръщам детето. | _______',            blanks: [1], correctAnswers: ['Прегръщам го.'],    acceptableAnswers: [['прегръщам го.', 'прегръщам го']] },
      { text: 'Гледате ли филма? | _______',            blanks: [1], correctAnswers: ['Гледате ли го?'],   acceptableAnswers: [['гледате ли го?', 'гледате ли го']] },
      { text: 'Катя не разбира колегите. | _______',    blanks: [1], correctAnswers: ['Катя не ги разбира.'], acceptableAnswers: [['катя не ги разбира.', 'катя не ги разбира']] },
      { text: 'Каним Иван и Мая на гости. | _______',   blanks: [1], correctAnswers: ['Каним ги на гости.'], acceptableAnswers: [['каним ги на гости.', 'каним ги на гости']] },
      { text: 'Питаме учителката. | _______',           blanks: [1], correctAnswers: ['Питаме я.'],        acceptableAnswers: [['питаме я.', 'питаме я']] },
      { text: 'Майката целува бебето. | _______',       blanks: [1], correctAnswers: ['Майката го целува.'], acceptableAnswers: [['майката го целува.', 'майката го целува']] },
      { text: 'Виждате ли децата на Али? | _______',    blanks: [1], correctAnswers: ['Виждате ли ги?'],   acceptableAnswers: [['виждате ли ги?', 'виждате ли ги']] },
      { text: 'Харесваш ли този квартал? | _______',    blanks: [1], correctAnswers: ['Харесваш ли го?'],  acceptableAnswers: [['харесваш ли го?', 'харесваш ли го']] },
      { text: 'Не намирам адреса. | _______',           blanks: [1], correctAnswers: ['Не го намирам.'],   acceptableAnswers: [['не го намирам.', 'не го намирам']] },
    ],
  } as WorkbookFillBlankExercise,
];

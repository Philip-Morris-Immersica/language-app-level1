import type {
  Exercise,
  WorkbookFillBlankExercise,
  ReadingTextExercise,
  MatchPairsExercise,
} from '@/content/types';

export const workbookExercises: Exercise[] = [

  {
    id: 'l05-wb-01',
    type: 'workbook_fill_blank',
    instruction: 'Попълнете определителния член за единствено число.',
    order: 1,
    points: 14,
    layout: 'two-column',
    sentences: [
      { text: 'Паркът е близо до пазара.', blanks: [], isExample: true },
      { text: 'Училище_______ е далече от блок_______.', blanks: [0, 1], correctAnswers: ['то', 'а'], options: ['а', 'та', 'то', 'ят', 'ът'] },
      { text: 'Университет_______ е в център_______.', blanks: [0, 1], correctAnswers: ['ът', 'а'], acceptableAnswers: [['ът', 'а'], ['а']], options: ['а', 'та', 'то', 'ят', 'ът'] },
      { text: 'Джамия_______ е срещу църква_______.', blanks: [0, 1], correctAnswers: ['та', 'та'], options: ['а', 'та', 'то', 'ят', 'ът'] },
      { text: 'Хотел_______ е на булевард_______.', blanks: [0, 1], correctAnswers: ['ът', 'а'], acceptableAnswers: [['ът', 'а'], ['а']], options: ['а', 'та', 'то', 'ят', 'ът'] },
      { text: 'Мост_______ е над река_______.', blanks: [0, 1], correctAnswers: ['ът', 'та'], acceptableAnswers: [['ът', 'а'], ['та']], options: ['а', 'та', 'то', 'ят', 'ът'] },
      { text: 'Аптека_______ е до кафе_______.', blanks: [0, 1], correctAnswers: ['та', 'то'], options: ['а', 'та', 'то', 'ят', 'ът'] },
      { text: 'Кино_______ е зад ресторант_______.', blanks: [0, 1], correctAnswers: ['то', 'а'], options: ['а', 'та', 'то', 'ят', 'ът'] },
    ],
  } as WorkbookFillBlankExercise,

  {
    id: 'l05-wb-02',
    type: 'workbook_fill_blank',
    instruction: 'Попълнете определителния член за множествено число.',
    order: 2,
    points: 6,
    layout: 'two-column',
    sentences: [
      { text: 'Паметниците са в Пловдив.', blanks: [], isExample: true },
      { text: 'Къде са момчета_______?', blanks: [0], correctAnswers: ['та'], options: ['те', 'та', 'о', 'ята'] },
      { text: 'Как са учителки_______?', blanks: [0], correctAnswers: ['те'], options: ['те', 'та', 'о', 'ята'] },
      { text: 'Колко са пари_______?', blanks: [0], correctAnswers: ['те'], options: ['те', 'та', 'о', 'ята'] },
      { text: 'Кина_______ са в молове_______.', blanks: [0, 1], correctAnswers: ['та', 'те'], options: ['те', 'та', 'о', 'ята'] },
      { text: 'Българи_______ обичат баница.', blanks: [0], correctAnswers: ['те'], options: ['те', 'та', 'о', 'ята'] },
    ],
  } as WorkbookFillBlankExercise,

  {
    id: 'l05-wb-03',
    type: 'workbook_fill_blank',
    instruction: 'Попълнете определителния член.',
    order: 3,
    points: 14,
    layout: 'single',
    sentences: [
      {
        text: 'Аз съм в училище „Васил Левски". Училище_______ е на улица_______ между театър_______ и библиотека_______. В училище_______ има много учители.',
        blanks: [0, 1, 2, 3, 4],
        correctAnswers: ['то', 'та', 'а', 'та', 'то'],
        options: ['а', 'та', 'то', 'те', 'ът'],
      },
      {
        text: 'Ние сме в град Бургас. В град_______ има магазини, паметници, църкви. Магазини_______ и църкви_______ са близо до площад_______.',
        blanks: [0, 1, 2, 3],
        correctAnswers: ['а', 'те', 'те', 'а'],
        options: ['а', 'та', 'то', 'те', 'ът'],
      },
      {
        text: 'Той е в ресторант „Виктория". Ресторант_______ е в център_______ на град_______ зад община_______. В ресторант_______ има много вкусна храна.',
        blanks: [0, 1, 2, 3, 4],
        correctAnswers: ['ът', 'а', 'а', 'та', 'а'],
        acceptableAnswers: [['ът', 'а'], ['а'], ['а'], ['та'], ['а']],
        options: ['а', 'та', 'то', 'те', 'ът'],
      },
    ],
  } as WorkbookFillBlankExercise,

  {
    id: 'l05-wb-04',
    type: 'reading_text',
    instruction: 'Напишете числата с думи. (На хартия или в телефона.)',
    order: 4,
    paragraphs: [
      'Модел: 1234 — хиляда двеста тридесет и четири',
      '1.  2590',
      '2.  17 012',
      '3.  107 954',
    ],
  } as ReadingTextExercise,

  {
    id: 'l05-wb-05',
    type: 'match_pairs',
    instruction: 'Свържете въпроса с правилния отговор.',
    order: 5,
    points: 6,
    pairs: [
      { left: 'Колко струва един килограм лук?', correctRight: 'Две евро.' },
      { left: 'Нямате ли дребни?', correctRight: 'Не, имам само 20 евро.' },
      { left: 'Искате ли торбичка?', correctRight: 'Не, благодаря, имам.' },
      { left: 'Каква салата искате?', correctRight: 'Шопска, моля.' },
      { left: 'Къде живеете?', correctRight: 'На булевард „Васил Левски" 15.' },
      { left: 'Извинете, къде е банката?', correctRight: 'Вървете направо и после завийте наляво.' },
      { left: 'Има ли много хора в кафето?', correctRight: 'Не, само шест души.' },
    ],
  } as MatchPairsExercise,

];

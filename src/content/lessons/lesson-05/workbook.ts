import type {
  Exercise,
  WorkbookFillBlankExercise,
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
    type: 'workbook_fill_blank',
    instruction: 'Изберете правилния вариант на числото.',
    order: 4,
    points: 3,
    layout: 'two-column',
    sentences: [
      { text: 'Модел: 1234 — хиляда двеста тридесет и четири', blanks: [], isExample: true },
      {
        text: '2590 — _______',
        blanks: [0],
        correctAnswers: ['две хиляди петстотин и деветдесет'],
        options: [
          'две хиляди петстотин и деветдесет',
          'двадесет и пет хиляди деветстотин',
          'две хиляди и петдесет и девет',
          'двадесет хиляди петстотин девет',
        ],
      },
      {
        text: '17 012 — _______',
        blanks: [0],
        correctAnswers: ['седемнадесет хиляди и дванадесет'],
        options: [
          'седемнадесет хиляди и дванадесет',
          'сто и седемдесет хиляди двадесет',
          'седемнадесет хиляди дванадесет',
          'стотина и седем хиляди',
        ],
      },
      {
        text: '107 954 — _______',
        blanks: [0],
        correctAnswers: ['сто и седем хиляди деветстотин петдесет и четири'],
        options: [
          'сто и седем хиляди деветстотин петдесет и четири',
          'сто и седем хиляди петстотин деветдесет и четири',
          'хиляда и седем деветстотин петдесет четири',
          'сто седем хиляди деветстотин и четири',
        ],
      },
    ],
  } as WorkbookFillBlankExercise,

  {
    id: 'l05-wb-05',
    type: 'match_pairs',
    instruction: 'Свържете въпроса с правилния отговор.',
    order: 5,
    points: 6,
    pairs: [
      { id: 'p1', left: 'Колко струва един килограм лук?', correctRight: 'Две евро.' },
      { id: 'p2', left: 'Нямате ли дребни?', correctRight: 'Не, имам само 20 евро.' },
      { id: 'p3', left: 'Искате ли торбичка?', correctRight: 'Не, благодаря, имам.' },
      { id: 'p4', left: 'Каква салата искате?', correctRight: 'Шопска, моля.' },
      { id: 'p5', left: 'Къде живеете?', correctRight: 'На булевард „Васил Левски" 15.' },
      { id: 'p6', left: 'Извинете, къде е банката?', correctRight: 'Вървете направо и после завийте наляво.' },
      { id: 'p7', left: 'Има ли много хора в кафето?', correctRight: 'Не, само шест души.' },
    ],
  } as MatchPairsExercise,

];

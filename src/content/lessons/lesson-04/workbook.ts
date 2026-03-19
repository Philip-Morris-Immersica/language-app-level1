import type { Exercise, WorkbookFillBlankExercise } from '@/content/types';

export const workbookExercises: Exercise[] = [

  // WB Exercise 1: Попълнете КАКЪВ, КАКВА, КАКВО или КАКВИ и изберете верния отговор
  {
    id: 'l04-wb-01',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 1',
    instruction: 'Попълнете КАКЪВ, КАКВА, КАКВО или КАКВИ и изберете верния отговор.',
    order: 1,
    points: 4,
    layout: 'single' as const,
    sentences: [
      {
        text: '_______ пица ядеш? — С гъби, салам и сирене.',
        blanks: [0],
        correctAnswers: ['Каква'],
        options: ['Какъв', 'Каква', 'Какво', 'Какви'],
      },
      {
        text: '_______ зеленчуци не обичаш? — Лук, спанак и зеле.',
        blanks: [0],
        correctAnswers: ['Какви'],
        options: ['Какъв', 'Каква', 'Какво', 'Какви'],
      },
      {
        text: '_______ сок има? — От ябълки и моркови.',
        blanks: [0],
        correctAnswers: ['Какъв'],
        options: ['Какъв', 'Каква', 'Какво', 'Какви'],
      },
      {
        text: '_______ кафе пиеш? — Късо, без захар и сметана.',
        blanks: [0],
        correctAnswers: ['Какво'],
        options: ['Какъв', 'Каква', 'Какво', 'Какви'],
      },
    ],
  } as WorkbookFillBlankExercise,

  // WB Exercise 2: Попълнете ДВА или ДВЕ
  {
    id: 'l04-wb-02',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 2',
    instruction: 'Попълнете ДВА или ДВЕ.',
    order: 2,
    points: 11,
    layout: 'two-column' as const,
    sentences: [
      { text: 'два лева', blanks: [], correctAnswers: [], isExample: true },
      { text: '_______ бисквити',   blanks: [0], correctAnswers: ['две'], options: ['два', 'две'] },
      { text: '_______ бонбона',    blanks: [0], correctAnswers: ['два'], options: ['два', 'две'] },
      { text: '_______ тиквички',   blanks: [0], correctAnswers: ['две'], options: ['два', 'две'] },
      { text: '_______ краставици',  blanks: [0], correctAnswers: ['две'], options: ['два', 'две'] },
      { text: '_______ круши',      blanks: [0], correctAnswers: ['две'], options: ['два', 'две'] },
      { text: '_______ пъпеша',     blanks: [0], correctAnswers: ['два'], options: ['два', 'две'] },
      { text: '_______ кафета',     blanks: [0], correctAnswers: ['две'], options: ['два', 'две'] },
      { text: '_______ млека',      blanks: [0], correctAnswers: ['две'], options: ['два', 'две'] },
      { text: '_______ портокала',  blanks: [0], correctAnswers: ['два'], options: ['два', 'две'] },
      { text: '_______ маслини',    blanks: [0], correctAnswers: ['две'], options: ['два', 'две'] },
      { text: '_______ череши',     blanks: [0], correctAnswers: ['две'], options: ['два', 'две'] },
    ],
  } as WorkbookFillBlankExercise,

  // WB Exercise 3: Напишете множественото число
  {
    id: 'l04-wb-03',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 3',
    instruction: 'Напишете множественото число.',
    order: 3,
    points: 7,
    layout: 'two-column' as const,
    sentences: [
      { text: 'банан — банани — банана', blanks: [], correctAnswers: [], isExample: true },
      {
        text: 'малина — _______ — _______',
        blanks: [1, 2], correctAnswers: ['малини', '—'],
        options: [
          ['малини', 'малина', 'малине'],
          ['—'],
        ],
      },
      {
        text: 'домат — _______ — _______',
        blanks: [1, 2], correctAnswers: ['домати', 'домата'],
        options: [
          ['домати', 'домата', 'домате'],
          ['домата', 'домати', '—'],
        ],
      },
      {
        text: 'пиле — _______ — _______',
        blanks: [1, 2], correctAnswers: ['пилета', '—'],
        options: [
          ['пилета', 'пили', 'пиле'],
          ['—'],
        ],
      },
      {
        text: 'лимон — _______ — _______',
        blanks: [1, 2], correctAnswers: ['лимони', 'лимона'],
        options: [
          ['лимони', 'лимона', 'лимоне'],
          ['лимона', 'лимони', '—'],
        ],
      },
      {
        text: 'плод — _______ — _______',
        blanks: [1, 2], correctAnswers: ['плодове', 'плода'],
        options: [
          ['плодове', 'плоди', 'плода'],
          ['плода', 'плодове', '—'],
        ],
      },
      {
        text: 'масло — _______ — _______',
        blanks: [1, 2], correctAnswers: ['масла', '—'],
        options: [
          ['масла', 'маслета', 'масли'],
          ['—'],
        ],
      },
      {
        text: 'маруля — _______ — _______',
        blanks: [1, 2], correctAnswers: ['марули', '—'],
        options: [
          ['марули', 'марулие', 'маруле'],
          ['—'],
        ],
      },
    ],
  } as WorkbookFillBlankExercise,

  // WB Exercise 4: Напишете числата с думи
  {
    id: 'l04-wb-04',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 4',
    instruction: 'Напишете числата с думи.',
    order: 4,
    points: 7,
    layout: 'two-column' as const,
    sentences: [
      { text: '500 — петстотин', blanks: [], correctAnswers: [], isExample: true },
      { text: '100 — _______', blanks: [1], correctAnswers: ['сто'],             options: ['сто', 'двеста', 'триста', 'четиристотин', 'петстотин', 'шестстотин', 'седемстотин', 'осемстотин'] },
      { text: '600 — _______', blanks: [1], correctAnswers: ['шестстотин'],      options: ['сто', 'двеста', 'триста', 'четиристотин', 'петстотин', 'шестстотин', 'седемстотин', 'осемстотин'] },
      { text: '400 — _______', blanks: [1], correctAnswers: ['четиристотин'],    options: ['сто', 'двеста', 'триста', 'четиристотин', 'петстотин', 'шестстотин', 'седемстотин', 'осемстотин'] },
      { text: '200 — _______', blanks: [1], correctAnswers: ['двеста'],          options: ['сто', 'двеста', 'триста', 'четиристотин', 'петстотин', 'шестстотин', 'седемстотин', 'осемстотин'] },
      { text: '700 — _______', blanks: [1], correctAnswers: ['седемстотин'],     options: ['сто', 'двеста', 'триста', 'четиристотин', 'петстотин', 'шестстотин', 'седемстотин', 'осемстотин'] },
      { text: '300 — _______', blanks: [1], correctAnswers: ['триста'],          options: ['сто', 'двеста', 'триста', 'четиристотин', 'петстотин', 'шестстотин', 'седемстотин', 'осемстотин'] },
      { text: '800 — _______', blanks: [1], correctAnswers: ['осемстотин'],      options: ['сто', 'двеста', 'триста', 'четиристотин', 'петстотин', 'шестстотин', 'седемстотин', 'осемстотин'] },
    ],
  } as WorkbookFillBlankExercise,

  // WB Exercise 5: Напишете с думи
  {
    id: 'l04-wb-05',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 5',
    instruction: 'Напишете с думи.',
    order: 5,
    points: 6,
    layout: 'single' as const,
    sentences: [
      { text: '12 кг — дванайсет килограма', blanks: [], correctAnswers: [], isExample: true },
      {
        text: '0,500 кг — _______',
        blanks: [1], correctAnswers: ['половин килограм'],
        options: ['половин килограм', 'едно кило и половина', 'четвърт кило', 'сто и петдесет грама', 'осемдесет литра', 'четвърт литър'],
      },
      {
        text: '1,5 кг — _______',
        blanks: [1], correctAnswers: ['едно кило и половина'],
        options: ['половин килограм', 'едно кило и половина', 'четвърт кило', 'сто и петдесет грама', 'осемдесет литра', 'четвърт литър'],
      },
      {
        text: '150 гр — _______',
        blanks: [1], correctAnswers: ['сто и петдесет грама'],
        options: ['половин килограм', 'едно кило и половина', 'четвърт кило', 'сто и петдесет грама', 'осемдесет литра', 'четвърт литър'],
      },
      {
        text: '80 л — _______',
        blanks: [1], correctAnswers: ['осемдесет литра'],
        options: ['половин килограм', 'едно кило и половина', 'четвърт кило', 'сто и петдесет грама', 'осемдесет литра', 'четвърт литър'],
      },
      {
        text: '0,250 кг — _______',
        blanks: [1], correctAnswers: ['четвърт кило'],
        options: ['половин килограм', 'едно кило и половина', 'четвърт кило', 'сто и петдесет грама', 'осемдесет литра', 'четвърт литър'],
      },
      {
        text: '0,250 л — _______',
        blanks: [1], correctAnswers: ['четвърт литър'],
        options: ['половин килограм', 'едно кило и половина', 'четвърт кило', 'сто и петдесет грама', 'осемдесет литра', 'четвърт литър'],
      },
    ],
  } as WorkbookFillBlankExercise,

];

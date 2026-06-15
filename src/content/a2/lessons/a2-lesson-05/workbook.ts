import type { Exercise, WorkbookFillBlankExercise, TableFillExercise } from '@/content/types';

export const workbookExercises: Exercise[] = [

  // ─── ORDER 32 — WB 1: ИСКАМ ДА + глагол ──────────────────────────────────
  {
    id: 'a2-l05-wb-01',
    type: 'workbook_fill_blank',
    title: 'ПРЕГОВОР',
    subtitle: 'Упражнения за затвърждаване на наученото',
    instruction: 'Изберете правилната форма на „искам да" + глагола.',
    order: 32,
    points: 7,
    layout: 'single',
    sentences: [
      { text: 'Тя иска да отиде на море през лятото. (отида)', blanks: [], correctAnswers: [], isExample: true },
      { text: 'Вие _______ с приятели довечера. (изляза)',       blanks: [1], correctAnswers: ['искате да излезете'], options: ['искат да излязат', 'искате да излезете', 'искаш да излезеш'],    acceptableAnswers: [['искате да излезете']] },
      { text: 'Ние _______ гости утре. (поканя)',                 blanks: [1], correctAnswers: ['искаме да поканим'], options: ['искате да поканите', 'искат да поканят', 'искаме да поканим'],  acceptableAnswers: [['искаме да поканим']] },
      { text: 'Те _______ шопска салата. (купя)',                 blanks: [1], correctAnswers: ['искат да купят'],    options: ['иска да купи', 'искаме да купим', 'искат да купят'],            acceptableAnswers: [['искат да купят']] },
      { text: 'Той _______ с нови хора това лято. (срещна се)',  blanks: [1], correctAnswers: ['иска да се срещне'], options: ['искам да се срещна', 'иска да се срещне', 'искат да се срещнат'], acceptableAnswers: [['иска да се срещне']] },
      { text: 'Тя _______ долари. (обменя)',                      blanks: [1], correctAnswers: ['иска да обмени'],   options: ['иска да обменя', 'иска да обмени', 'искат да обменят'],          acceptableAnswers: [['иска да обмени']] },
      { text: 'Тя _______ сметка в левове. (открия)',             blanks: [1], correctAnswers: ['иска да открие'],   options: ['иска да открива', 'искат да открият', 'иска да открие'],         acceptableAnswers: [['иска да открие']] },
      { text: 'Аз _______ препоръчано писмо. (изпратя)',          blanks: [1], correctAnswers: ['искам да изпратя'], options: ['иска да изпрати', 'искат да изпратят', 'искам да изпратя'],      acceptableAnswers: [['искам да изпратя']] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 33 — WB 2: МОГА ДА + глагол ───────────────────────────────────
  {
    id: 'a2-l05-wb-02',
    type: 'workbook_fill_blank',
    instruction: 'Изберете правилната форма на „мога да" + глагола.',
    order: 33,
    points: 7,
    layout: 'single',
    sentences: [
      { text: 'Те могат да плуват. (плувам)', blanks: [], correctAnswers: [], isExample: true },
      { text: 'Елена не _______. (спя)',        blanks: [1], correctAnswers: ['може да спи'],      options: ['може да спят', 'могат да спят', 'може да спи'],          acceptableAnswers: [['може да спи']] },
      { text: 'Вие _______ кафе. (купя)',        blanks: [1], correctAnswers: ['можете да купите'], options: ['може да купи', 'можем да купим', 'можете да купите'],     acceptableAnswers: [['можете да купите']] },
      { text: 'Аз _______ рано. (легна си)',     blanks: [1], correctAnswers: ['мога да легна'],    options: ['може да легне', 'могат да легнат', 'мога да легна'],     acceptableAnswers: [['мога да легна', 'мога да си легна']] },
      { text: 'Ти _______ арабски. (уча)',       blanks: [1], correctAnswers: ['можеш да учиш'],   options: ['може да учи', 'можем да учим', 'можеш да учиш'],          acceptableAnswers: [['можеш да учиш']] },
      { text: 'Иво _______ телефона. (платя)',   blanks: [1], correctAnswers: ['може да плати'],   options: ['може да платя', 'можете да платите', 'може да плати'],    acceptableAnswers: [['може да плати']] },
      { text: 'Детето не _______. (говоря)',     blanks: [1], correctAnswers: ['може да говори'],  options: ['може да говорят', 'могат да говорят', 'може да говори'],  acceptableAnswers: [['може да говори']] },
      { text: 'Ние _______. (готвя)',            blanks: [1], correctAnswers: ['можем да готвим'], options: ['може да готви', 'могат да готвят', 'можем да готвим'],    acceptableAnswers: [['можем да готвим']] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 34 — WB 3: Подчертайте правилната форма (трябва да) ────────────
  {
    id: 'a2-l05-wb-03',
    type: 'workbook_fill_blank',
    instruction: 'Изберете правилната глаголна форма с „трябва да".',
    order: 34,
    points: 6,
    layout: 'single',
    sentences: [
      { text: 'Камен трябва да _______ / _______ в Пловдив през уикенда.', blanks: [1], correctAnswers: ['отиде'], options: ['отива', 'отиде'], acceptableAnswers: [['отиде']] },
      { text: 'Силвия трябва да _______ / _______ на детето всеки ден.', blanks: [1], correctAnswers: ['помага'], options: ['помага', 'помогне'], acceptableAnswers: [['помага']] },
      { text: 'Асен и Петър трябва да ми _______ / _______ по телефона тази вечер.', blanks: [1], correctAnswers: ['се обадят'], options: ['се обаждат', 'се обадят'], acceptableAnswers: [['се обадят', 'обадят се']] },
      { text: 'Аз и Ани трябва да _______ / _______ пари в сметката утре.', blanks: [1], correctAnswers: ['внесем'], options: ['внасяме', 'внесем'], acceptableAnswers: [['внесем']] },
      { text: 'Ти трябва да _______ / _______ на работа рано всеки ден.', blanks: [1], correctAnswers: ['идваш'], options: ['идваш', 'дойдеш'], acceptableAnswers: [['идваш']] },
      { text: 'Ти и Виктор трябва да _______ / _______ проекта преди 16:00.', blanks: [1], correctAnswers: ['свършите'], options: ['свършвате', 'свършите'], acceptableAnswers: [['свършите']] },
    ],
  } as WorkbookFillBlankExercise,

  // ─── ORDER 35 — WB 4: местоимения — пълна форма (table_fill) ─────────────
  {
    id: 'a2-l05-wb-04',
    type: 'table_fill',
    title: 'ПРЕГОВОР',
    instruction: 'Изберете правилните форми на личните местоимения.',
    order: 35,
    points: 7,
    paragraphs: [
      { text: 'Модел: аз → ме / ми / мен(е)' },
    ],
    tables: [
      {
        name: 'Пълни форми на личните местоимения',
        columns: ['Кратка (вин.)', 'Кратка (дат.)', 'Пълна форма'],
        rows: [
          { label: 'аз',      cells: [{ correctAnswers: ['ме'],           options: ['те', 'ме', 'го']   }, { correctAnswers: ['ми'],          options: ['ти', 'ми', 'му']   }, { correctAnswers: ['мен', 'мене'],  options: ['мен', 'тебе', 'него']  }] },
          { label: 'ти',      cells: [{ correctAnswers: ['те'],           options: ['ме', 'те', 'ги']   }, { correctAnswers: ['ти'],          options: ['ми', 'ти', 'й']    }, { correctAnswers: ['тебе', 'теб'], options: ['мен', 'тебе', 'него']  }] },
          { label: 'той',     cells: [{ correctAnswers: ['го'],           options: ['го', 'я', 'ни']    }, { correctAnswers: ['му'],          options: ['му', 'й', 'ни']    }, { correctAnswers: ['него'],         options: ['него', 'нея', 'нас']   }] },
          { label: 'тя',      cells: [{ correctAnswers: ['я'],            options: ['го', 'я', 'ви']    }, { correctAnswers: ['й'],           options: ['му', 'й', 'ви']    }, { correctAnswers: ['нея'],          options: ['него', 'нея', 'тях']   }] },
          { label: 'то',      cells: [{ correctAnswers: ['го'],           options: ['те', 'го', 'ги']   }, { correctAnswers: ['му'],          options: ['ти', 'му', 'им']   }, { correctAnswers: ['него'],         options: ['него', 'нас', 'тях']   }] },
          { label: 'ние',     cells: [{ correctAnswers: ['ни'],           options: ['ни', 'ви', 'ги']   }, { correctAnswers: ['ни'],          options: ['ни', 'ви', 'им']   }, { correctAnswers: ['нас'],          options: ['нас', 'вас', 'тях']    }] },
          { label: 'вие/Вие', cells: [{ correctAnswers: ['ви'],           options: ['ни', 'ви', 'ги']   }, { correctAnswers: ['ви'],          options: ['ни', 'ви', 'им']   }, { correctAnswers: ['вас', 'Вас'],  options: ['нас', 'вас', 'тях']    }] },
          { label: 'те',      cells: [{ correctAnswers: ['ги'],           options: ['го', 'ни', 'ги']   }, { correctAnswers: ['им'],          options: ['му', 'ни', 'им']   }, { correctAnswers: ['тях'],          options: ['нас', 'вас', 'тях']    }] },
        ],
      },
    ],
  } as TableFillExercise,

];

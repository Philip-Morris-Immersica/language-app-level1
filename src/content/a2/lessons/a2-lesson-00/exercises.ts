import type { Exercise } from '@/content/types';
import type { A2ImageLabelingExercise, A2WideCardsExercise } from '../../types';

// ─────────────────────────────────────────────────────────────────────────────
// A2-LESSON-00 „Преговор A1" — всички упражнения (стр. 6–15)
// ЛЕКСИКА: упр. 1–14 (orders 1–16)
// ГРАМАТИКА: упр. 15–28 (orders 17–47)
// ─────────────────────────────────────────────────────────────────────────────

const BASE = '/assets/a2-lesson-00';

export const exercises: Exercise[] = [

  // ═══════════════════════════════════════════════════════════════════════
  // ЛЕКСИКА (стр. 6–9)
  // ═══════════════════════════════════════════════════════════════════════

  // ORDER 1 — Упр. 1: Поздрави
  {
    id: 'a2-l00-ex-01',
    type: 'image_labeling',
    title: 'УПРАЖНЕНИЕ 1',
    instruction: 'Изберете правилния поздрав под всяка картинка.',
    order: 1,
    points: 4,
    displayType: 'row',
    images: [
      { id: 'utro',   imageUrl: `${BASE}/01-upr-01-pozdravi/01-dobro-utro.jpg`,    correctLabel: 'Добро утро!'   },
      { id: 'den',    imageUrl: `${BASE}/01-upr-01-pozdravi/02-dobry-den.jpg`,     correctLabel: 'Добър ден!'    },
      { id: 'vecher', imageUrl: `${BASE}/01-upr-01-pozdravi/03-dobry-vecher.jpg`,  correctLabel: 'Добър вечер!'  },
      { id: 'nosht',  imageUrl: `${BASE}/01-upr-01-pozdravi/04-leka-nosht.jpg`,    correctLabel: 'Лека нощ!'     },
    ],
    options: ['Добро утро!', 'Добър ден!', 'Добър вечер!', 'Лека нощ!'],
  },

  // ORDER 2 — Упр. 2: Националности (справочни карти)
  {
    id: 'a2-l00-novi-dumi-01',
    type: 'illustrated_cards',
    title: 'УПРАЖНЕНИЕ — Държави и националности',
    instruction: 'Натиснете за произношение.',
    order: 2,
    cardsGridMaxCols: 3,
    cards: [
      {
        id: 'bg', imageUrl: `${BASE}/02-upr-02-darzhavi-nacionalnosti/01-balgariya.jpg`,
        label: 'България', sublabels: ['българин', 'българка', 'българи'],
      },
      {
        id: 'sy', imageUrl: `${BASE}/02-upr-02-darzhavi-nacionalnosti/02-siriya.jpg`,
        label: 'Сирия', sublabels: ['сириец', 'сирийка', 'сирийци'],
      },
      {
        id: 'iq', imageUrl: `${BASE}/02-upr-02-darzhavi-nacionalnosti/03-irak.jpg`,
        label: 'Ирак', sublabels: ['иракчанин', 'иракчанка', 'иракчани'],
      },
      {
        id: 'ir', imageUrl: `${BASE}/02-upr-02-darzhavi-nacionalnosti/04-iran.jpg`,
        label: 'Иран', sublabels: ['иранец', 'иранка', 'иранци'],
      },
      {
        id: 'ua', imageUrl: `${BASE}/02-upr-02-darzhavi-nacionalnosti/05-ukrayna.jpg`,
        label: 'Украйна', sublabels: ['украинец', 'украинка', 'украинци'],
      },
    ],
  },

  // ORDER 3 — Упр. 2: Националности (интерактивно)
  {
    id: 'a2-l00-ex-02',
    type: 'dropdown_match',
    title: 'УПРАЖНЕНИЕ 3',
    instruction: 'Изберете правилната национална форма за всяка държава.',
    instructionKey: 'a2.ex.nationalnosti',
    order: 3,
    points: 12,
    questions: [
      // Сирия
      { id: 'sy-m',  left: 'Той е от Сирия. Той е ___.',   options: ['сириец', 'иракчанин', 'иранец', 'украинец'],   correctAnswer: 'сириец'    },
      { id: 'sy-f',  left: 'Тя е от Сирия. Тя е ___.',    options: ['сирийка', 'иракчанка', 'иранка', 'украинка'],   correctAnswer: 'сирийка'   },
      { id: 'sy-pl', left: 'Те са от Сирия. Те са ___.',  options: ['сирийци', 'иракчани', 'иранци', 'украинци'],   correctAnswer: 'сирийци'   },
      // Ирак
      { id: 'iq-m',  left: 'Той е от Ирак. Той е ___.',   options: ['иракчанин', 'сириец', 'иранец', 'украинец'],   correctAnswer: 'иракчанин' },
      { id: 'iq-f',  left: 'Тя е от Ирак. Тя е ___.',    options: ['иракчанка', 'сирийка', 'иранка', 'украинка'],   correctAnswer: 'иракчанка' },
      { id: 'iq-pl', left: 'Те са от Ирак. Те са ___.',  options: ['иракчани', 'сирийци', 'иранци', 'украинци'],   correctAnswer: 'иракчани'  },
      // Иран
      { id: 'ir-m',  left: 'Той е от Иран. Той е ___.',   options: ['иранец', 'сириец', 'иракчанин', 'украинец'],   correctAnswer: 'иранец'    },
      { id: 'ir-f',  left: 'Тя е от Иран. Тя е ___.',    options: ['иранка', 'сирийка', 'иракчанка', 'украинка'],   correctAnswer: 'иранка'    },
      { id: 'ir-pl', left: 'Те са от Иран. Те са ___.',  options: ['иранци', 'сирийци', 'иракчани', 'украинци'],   correctAnswer: 'иранци'    },
      // Украйна
      { id: 'ua-m',  left: 'Той е от Украйна. Той е ___.',  options: ['украинец', 'сириец', 'иракчанин', 'иранец'],  correctAnswer: 'украинец'  },
      { id: 'ua-f',  left: 'Тя е от Украйна. Тя е ___.',   options: ['украинка', 'сирийка', 'иракчанка', 'иранка'],  correctAnswer: 'украинка'  },
      { id: 'ua-pl', left: 'Те са от Украйна. Те са ___.',  options: ['украинци', 'сирийци', 'иракчани', 'иранци'],  correctAnswer: 'украинци'  },
    ],
  },

  // ORDER 4 — Упр. 3: Числа (записваема версия — по желание на клиента)
  {
    id: 'a2-l00-ex-03',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 4',
    instruction: 'Напишете числата с думи.',
    order: 4,
    points: 16,
    layout: 'single',
    sentences: [
      // ред а: 0–10
      { text: 'Напишете: 7 → _______', blanks: [2], correctAnswers: ['седем'], acceptableAnswers: [['седем', 'Седем']] },
      { text: 'Напишете: 9 → _______', blanks: [2], correctAnswers: ['девет'], acceptableAnswers: [['девет', 'Девет']] },
      // ред б: 11–20
      { text: 'Напишете: 14 → _______', blanks: [2], correctAnswers: ['четиринадесет'], acceptableAnswers: [['четиринадесет', 'четиринайсет', 'Четиринадесет', 'Четиринайсет']] },
      { text: 'Напишете: 17 → _______', blanks: [2], correctAnswers: ['седемнадесет'], acceptableAnswers: [['седемнадесет', 'седемнайсет', 'Седемнадесет', 'Седемнайсет']] },
      // ред в: десетици
      { text: 'Напишете: 40 → _______', blanks: [2], correctAnswers: ['четиридесет'], acceptableAnswers: [['четиридесет', 'четирийсет', 'Четиридесет', 'Четирийсет']] },
      { text: 'Напишете: 70 → _______', blanks: [2], correctAnswers: ['седемдесет'], acceptableAnswers: [['седемдесет', 'Седемдесет']] },
      // ред г: стотици
      { text: 'Напишете: 400 → _______', blanks: [2], correctAnswers: ['четиристотин'], acceptableAnswers: [['четиристотин', 'четиристотин', 'Четиристотин']] },
      { text: 'Напишете: 700 → _______', blanks: [2], correctAnswers: ['седемстотин'], acceptableAnswers: [['седемстотин', 'Седемстотин']] },
      // ред д: хиляди
      { text: 'Напишете: 4000 → _______', blanks: [2], correctAnswers: ['четири хиляди'], acceptableAnswers: [['четири хиляди', 'Четири хиляди']] },
      { text: 'Напишете: 7000 → _______', blanks: [2], correctAnswers: ['седем хиляди'], acceptableAnswers: [['седем хиляди', 'Седем хиляди']] },
      // ред е: по-големи числа
      { text: 'Напишете: 100 000 → _______', blanks: [2], correctAnswers: ['сто хиляди'], acceptableAnswers: [['сто хиляди', 'Сто хиляди']] },
      { text: 'Напишете: 1 000 000 → _______', blanks: [2], correctAnswers: ['един милион'], acceptableAnswers: [['един милион', 'Един милион']] },
      // ред ж: смесени
      { text: 'Напишете: 57 → _______', blanks: [2], correctAnswers: ['петдесет и седем'], acceptableAnswers: [['петдесет и седем', 'Петдесет и седем']] },
      { text: 'Напишете: 483 → _______', blanks: [2], correctAnswers: ['четиристотин осемдесет и три'], acceptableAnswers: [['четиристотин осемдесет и три', 'Четиристотин осемдесет и три']] },
      // ред з: редни числителни
      { text: 'Напишете редния числителен: 3-ти → _______', blanks: [4], correctAnswers: ['трети'], acceptableAnswers: [['трети', 'Трети']] },
      { text: 'Напишете редния числителен: 10-ти → _______', blanks: [4], correctAnswers: ['десети'], acceptableAnswers: [['десети', 'Десети']] },
    ],
  },

  // ORDER 5 — Упр. 4: Плодове и зеленчуци
  {
    id: 'a2-l00-ex-04',
    type: 'image_labeling',
    title: 'УПРАЖНЕНИЕ 5',
    instruction: 'Изберете правилното наименование под всяка картинка.',
    order: 5,
    points: 12,
    displayType: 'default',
    images: [
      { id: 'yabalka',    imageUrl: `${BASE}/03-upr-04-plodove-zelenchuci/01-yabalka.jpg`,    correctLabel: 'ябълка'      },
      { id: 'krusha',     imageUrl: `${BASE}/03-upr-04-plodove-zelenchuci/02-krusha.jpg`,     correctLabel: 'круша'       },
      { id: 'grozde',     imageUrl: `${BASE}/03-upr-04-plodove-zelenchuci/03-grozde.jpg`,     correctLabel: 'грозде'      },
      { id: 'limon',      imageUrl: `${BASE}/03-upr-04-plodove-zelenchuci/04-limon.jpg`,      correctLabel: 'лимон'       },
      { id: 'portokal',   imageUrl: `${BASE}/03-upr-04-plodove-zelenchuci/05-portokal.jpg`,   correctLabel: 'портокал'    },
      { id: 'dinya',      imageUrl: `${BASE}/03-upr-04-plodove-zelenchuci/06-dinya.jpg`,      correctLabel: 'диня'        },
      { id: 'domat',      imageUrl: `${BASE}/03-upr-04-plodove-zelenchuci/07-domat.jpg`,      correctLabel: 'домат'       },
      { id: 'chushka',    imageUrl: `${BASE}/03-upr-04-plodove-zelenchuci/08-chushka.jpg`,    correctLabel: 'чушка'       },
      { id: 'morkov',     imageUrl: `${BASE}/03-upr-04-plodove-zelenchuci/09-morkov.jpg`,     correctLabel: 'морков'      },
      { id: 'krastavitsa',imageUrl: `${BASE}/03-upr-04-plodove-zelenchuci/10-krastavitsa.jpg`,correctLabel: 'краставица'  },
      { id: 'kartof',     imageUrl: `${BASE}/03-upr-04-plodove-zelenchuci/11-kartof.jpg`,     correctLabel: 'картоф'      },
      { id: 'luk',        imageUrl: `${BASE}/03-upr-04-plodove-zelenchuci/12-luk.jpg`,        correctLabel: 'лук'         },
    ],
    options: ['ябълка', 'круша', 'грозде', 'лимон', 'портокал', 'диня', 'домат', 'чушка', 'морков', 'краставица', 'картоф', 'лук'],
  },

  // ORDER 6 — Упр. 5: Хранителни продукти
  {
    id: 'a2-l00-ex-05',
    type: 'image_labeling',
    title: 'УПРАЖНЕНИЕ 6',
    instruction: 'Изберете правилното наименование под всяка картинка.',
    order: 6,
    points: 12,
    displayType: 'default',
    images: [
      { id: 'brashno',       imageUrl: `${BASE}/04-upr-05-hrani-produkti/01-brashno.jpg`,       correctLabel: 'брашно'       },
      { id: 'bob',           imageUrl: `${BASE}/04-upr-05-hrani-produkti/02-bob.jpg`,           correctLabel: 'боб'          },
      { id: 'oriz',          imageUrl: `${BASE}/04-upr-05-hrani-produkti/03-oriz.jpg`,          correctLabel: 'ориз'         },
      { id: 'leshta',        imageUrl: `${BASE}/04-upr-05-hrani-produkti/04-leshta.jpg`,        correctLabel: 'леща'         },
      { id: 'biskviti',      imageUrl: `${BASE}/04-upr-05-hrani-produkti/05-biskviti.jpg`,      correctLabel: 'бисквити'     },
      { id: 'olio',          imageUrl: `${BASE}/04-upr-05-hrani-produkti/06-olio.jpg`,          correctLabel: 'олио'         },
      { id: 'riba',          imageUrl: `${BASE}/04-upr-05-hrani-produkti/07-riba.jpg`,          correctLabel: 'риба'         },
      { id: 'pile',          imageUrl: `${BASE}/04-upr-05-hrani-produkti/08-pile.jpg`,          correctLabel: 'пиле'         },
      { id: 'sirene',        imageUrl: `${BASE}/04-upr-05-hrani-produkti/09-sirene.jpg`,        correctLabel: 'сирене'       },
      { id: 'kashkaval',     imageUrl: `${BASE}/04-upr-05-hrani-produkti/10-kashkaval.jpg`,     correctLabel: 'кашкавал'     },
      { id: 'pryasno-mlyako',imageUrl: `${BASE}/04-upr-05-hrani-produkti/11-pryasno-mlyako.jpg`,correctLabel: 'прясно мляко'},
      { id: 'kiselo-mlyako', imageUrl: `${BASE}/04-upr-05-hrani-produkti/12-kiselo-mlyako.jpg`, correctLabel: 'кисело мляко'},
    ],
    options: ['брашно', 'боб', 'ориз', 'леща', 'бисквити', 'олио', 'риба', 'пиле', 'сирене', 'кашкавал', 'прясно мляко', 'кисело мляко'],
  },

  // ORDER 7 — Упр. 6: Храни и напитки
  {
    id: 'a2-l00-ex-06',
    type: 'image_labeling',
    title: 'УПРАЖНЕНИЕ 7',
    instruction: 'Изберете правилното наименование под всяка картинка.',
    order: 7,
    points: 12,
    displayType: 'default',
    images: [
      { id: 'salata',    imageUrl: `${BASE}/05-upr-06-hrani-napitki/01-salata.jpg`,    correctLabel: 'салата'     },
      { id: 'kyufteta',  imageUrl: `${BASE}/05-upr-06-hrani-napitki/02-kyufteta.jpg`,  correctLabel: 'кюфтета'    },
      { id: 'omlet',     imageUrl: `${BASE}/05-upr-06-hrani-napitki/03-omlet.jpg`,     correctLabel: 'омлет'      },
      { id: 'supa',      imageUrl: `${BASE}/05-upr-06-hrani-napitki/04-supa.jpg`,      correctLabel: 'супа'       },
      { id: 'pitsa',     imageUrl: `${BASE}/05-upr-06-hrani-napitki/05-pitsa.jpg`,     correctLabel: 'пица'       },
      { id: 'spageti',   imageUrl: `${BASE}/05-upr-06-hrani-napitki/06-spageti.jpg`,   correctLabel: 'спагети'    },
      { id: 'voda',      imageUrl: `${BASE}/05-upr-06-hrani-napitki/07-voda.jpg`,      correctLabel: 'вода'       },
      { id: 'kafe',      imageUrl: `${BASE}/05-upr-06-hrani-napitki/08-kafe.jpg`,      correctLabel: 'кафе'       },
      { id: 'chay',      imageUrl: `${BASE}/05-upr-06-hrani-napitki/09-chay.jpg`,      correctLabel: 'чай'        },
      { id: 'sok',       imageUrl: `${BASE}/05-upr-06-hrani-napitki/10-sok.jpg`,       correctLabel: 'сок'        },
      { id: 'kapuchino', imageUrl: `${BASE}/05-upr-06-hrani-napitki/11-kapuchino.jpg`, correctLabel: 'капучино'   },
      { id: 'kola',      imageUrl: `${BASE}/05-upr-06-hrani-napitki/12-kola.jpg`,      correctLabel: 'кола'       },
    ],
    options: ['салата', 'кюфтета', 'омлет', 'супа', 'пица', 'спагети', 'вода', 'кафе', 'чай', 'сок', 'капучино', 'кола'],
  },

  // ORDER 8 — Упр. 7: Сгради
  {
    id: 'a2-l00-ex-07',
    type: 'image_labeling',
    title: 'УПРАЖНЕНИЕ 8',
    instruction: 'Изберете правилното наименование под всяка картинка.',
    order: 8,
    points: 5,
    displayType: 'default',
    images: [
      { id: 'uchilishte', imageUrl: `${BASE}/06-upr-07-sgradi/01-uchilishte.jpg`, correctLabel: 'училище'  },
      { id: 'kashta',     imageUrl: `${BASE}/06-upr-07-sgradi/02-kashta.jpg`,     correctLabel: 'къща'     },
      { id: 'bolnitsa',   imageUrl: `${BASE}/06-upr-07-sgradi/03-bolnitsa.jpg`,   correctLabel: 'болница'  },
      { id: 'magazin',    imageUrl: `${BASE}/06-upr-07-sgradi/04-magazin.jpg`,    correctLabel: 'магазин'  },
      { id: 'poshta',     imageUrl: `${BASE}/06-upr-07-sgradi/05-poshta.jpg`,     correctLabel: 'пощa'     },
    ],
    options: ['училище', 'къща', 'болница', 'магазин', 'пощa'],
  },

  // ORDER 9 — Упр. 8а: Семейство Димитрови
  {
    id: 'a2-l00-ex-08a',
    type: 'dropdown_match',
    title: 'УПРАЖНЕНИЕ 9а',
    instruction: 'Изберете правилната роднинска връзка. Погледнете фамилното дърво.',
    instructionKey: 'a2.ex.semeystvo',
    order: 9,
    points: 13,
    imageUrl: `${BASE}/07-upr-08a-semeystvo-dimitrovi/01-semeystvo-dimitrovi.jpg`,
    questions: [
      { id: 'f01', left: 'Мария е _______ на Георги.',          options: ['майка', 'баща', 'сестра', 'баба'],         correctAnswer: 'майка'    },
      { id: 'f02', left: 'Иван е _______ на Георги.',           options: ['баща', 'дядо', 'брат', 'чичо'],            correctAnswer: 'баща'     },
      { id: 'f03', left: 'Ана е _______ на Георги.',            options: ['сестра', 'дъщеря', 'майка', 'братовчедка'],correctAnswer: 'сестра'   },
      { id: 'f04', left: 'Георги е _______ на Ана.',            options: ['брат', 'баща', 'дядо', 'чичо'],            correctAnswer: 'брат'     },
      { id: 'f05', left: 'Мила е _______ на Павел.',            options: ['сестра', 'дъщеря', 'майка', 'баба'],       correctAnswer: 'сестра'   },
      { id: 'f06', left: 'Павел е _______ на Мила.',            options: ['брат', 'баща', 'дядо', 'чичо'],            correctAnswer: 'брат'     },
      { id: 'f07', left: 'Мила е _______ на Георги и Ана.',     options: ['дъщеря', 'майка', 'сестра', 'внучка'],     correctAnswer: 'дъщеря'   },
      { id: 'f08', left: 'Павел е _______ на Георги и Ана.',    options: ['син', 'баща', 'брат', 'внук'],             correctAnswer: 'син'      },
      { id: 'f09', left: 'Георги и Ана са _______ на Мила и Павел.', options: ['родители', 'деца', 'баба и дядо', 'братя и сестри'], correctAnswer: 'родители' },
      { id: 'f10', left: 'Мила и Павел са _______ на Георги и Ана.', options: ['деца', 'родители', 'внуци', 'братя'], correctAnswer: 'деца'     },
      { id: 'f11', left: 'Мила е _______ на Иван и Мария.',     options: ['внучка', 'дъщеря', 'сестра', 'майка'],     correctAnswer: 'внучка'   },
      { id: 'f12', left: 'Павел е _______ на Иван и Мария.',    options: ['внук', 'син', 'брат', 'баща'],             correctAnswer: 'внук'     },
      { id: 'f13', left: 'Иван е _______ на Мила и Павел.',     options: ['дядо', 'баща', 'чичо', 'брат'],            correctAnswer: 'дядо'     },
      { id: 'f14', left: 'Мария е _______ на Мила и Павел.',    options: ['баба', 'майка', 'леля', 'сестра'],          correctAnswer: 'баба'     },
    ],
  },

  // ORDER 10 — Упр. 8б: Антоними
  {
    id: 'a2-l00-ex-08b',
    type: 'dropdown_match',
    title: 'УПРАЖНЕНИЕ 9б',
    instruction: 'Изберете антонима на всяка дума.',
    order: 10,
    points: 6,
    questions: [
      { id: 'ant1', left: 'млад',      options: ['стар', 'нисък', 'пълен', 'мързелив'],    correctAnswer: 'стар'     },
      { id: 'ant2', left: 'висок',     options: ['нисък', 'стар', 'грозен', 'глупав'],     correctAnswer: 'нисък'    },
      { id: 'ant3', left: 'слаб',      options: ['пълен', 'умен', 'красив', 'работлив'],   correctAnswer: 'пълен'    },
      { id: 'ant4', left: 'красив',    options: ['грозен', 'мързелив', 'стар', 'глупав'],  correctAnswer: 'грозен'   },
      { id: 'ant5', left: 'работлив',  options: ['мързелив', 'слаб', 'нисък', 'млад'],     correctAnswer: 'мързелив' },
      { id: 'ant6', left: 'умен',      options: ['глупав', 'стар', 'пълен', 'мързелив'],   correctAnswer: 'глупав'   },
    ],
  },

  // ORDER 11 — Упр. 9: Таблица (дни, месеци, сезони, времето, посоки) — справочна
  // По обратна връзка таблицата се запазва с цялата информация, а интерактивната
  // проверка (dropdown_match) идва веднага след нея.
  {
    id: 'a2-l00-gramatika-01',
    type: 'grammar_table',
    title: 'УПРАЖНЕНИЕ 9',
    subtitle: 'Дни, месеци, сезони, времето и посоки',
    instruction: 'Запознайте се с таблицата. Натиснете за произношение.',
    order: 11,
    columns: ['Дни на седмицата', 'Месеци', 'Сезони', 'Времето', 'Посоки'],
    rows: [
      { pronoun: '1.',  cells: ['понеделник', 'януари',    'пролет', 'слънчево',  'север'] },
      { pronoun: '2.',  cells: ['вторник',    'февруари',  'лято',   'облачно',   'юг']    },
      { pronoun: '3.',  cells: ['сряда',      'март',      'есен',   'дъждовно',  'изток'] },
      { pronoun: '4.',  cells: ['четвъртък',  'април',     'зима',   'снежно',    'запад'] },
      { pronoun: '5.',  cells: ['петък',      'май',       '',       'ветровито', '']      },
      { pronoun: '6.',  cells: ['събота',     'юни',       '',       'мъгливо',   '']      },
      { pronoun: '7.',  cells: ['неделя',     'юли',       '',       'топло',     '']      },
      { pronoun: '8.',  cells: ['',           'август',    '',       'студено',   '']      },
      { pronoun: '9.',  cells: ['',           'септември', '',       '',          '']      },
      { pronoun: '10.', cells: ['',           'октомври',  '',       '',          '']      },
      { pronoun: '11.', cells: ['',           'ноември',   '',       '',          '']      },
      { pronoun: '12.', cells: ['',           'декември',  '',       '',          '']      },
    ],
  },

  // ORDER 11.5 — Упр. 10: Дни, месеци, сезони, времето и посоки (интерактивна проверка)
  // Идва веднага след справочната таблица (по модела на A1 урок 7, упр. 14).
  {
    id: 'a2-l00-ex-09',
    type: 'dropdown_match',
    title: 'УПРАЖНЕНИЕ 10',
    instruction: 'Изберете правилния отговор.',
    order: 11.5,
    points: 12,
    questions: [
      // Дни на седмицата
      { id: 'd1', left: 'Първият ден от седмицата е ___.',     options: ['понеделник', 'петък', 'неделя', 'сряда'],          correctAnswer: 'понеделник' },
      { id: 'd2', left: 'Петият ден от седмицата е ___.',      options: ['петък', 'вторник', 'събота', 'четвъртък'],         correctAnswer: 'петък'      },
      { id: 'd3', left: 'Дните за почивка са събота и ___.',   options: ['неделя', 'понеделник', 'сряда', 'петък'],          correctAnswer: 'неделя'     },
      // Месеци
      { id: 'm1', left: 'Първият месец от годината е ___.',     options: ['януари', 'март', 'декември', 'юни'],               correctAnswer: 'януари'     },
      { id: 'm2', left: 'Последният месец от годината е ___.',  options: ['декември', 'ноември', 'януари', 'октомври'],        correctAnswer: 'декември'   },
      // Сезони
      { id: 's1', left: 'Декември, януари и февруари са през ___.', options: ['зимата', 'лятото', 'есента', 'пролетта'],      correctAnswer: 'зимата'     },
      { id: 's2', left: 'Юни, юли и август са през ___.',      options: ['лятото', 'зимата', 'пролетта', 'есента'],          correctAnswer: 'лятото'     },
      // Времето
      { id: 'w1', left: 'Когато грее слънце, времето е ___.',   options: ['слънчево', 'дъждовно', 'снежно', 'облачно'],       correctAnswer: 'слънчево'   },
      { id: 'w2', left: 'Когато вали дъжд, времето е ___.',     options: ['дъждовно', 'слънчево', 'ветровито', 'мъгливо'],    correctAnswer: 'дъждовно'   },
      { id: 'w3', left: 'Когато вали сняг, времето е ___.',     options: ['снежно', 'топло', 'слънчево', 'облачно'],          correctAnswer: 'снежно'     },
      // Посоки
      { id: 'p1', left: 'Слънцето изгрява на ___.',            options: ['изток', 'запад', 'север', 'юг'],                   correctAnswer: 'изток'      },
      { id: 'p2', left: 'Слънцето залязва на ___.',            options: ['запад', 'изток', 'север', 'юг'],                   correctAnswer: 'запад'      },
    ],
  },

  // ORDER 12 — Упр. 10: Цветове
  {
    id: 'a2-l00-ex-10',
    type: 'a2-image-labeling',
    title: 'УПРАЖНЕНИЕ 11',
    instruction: 'Изберете правилното наименование на цвета.',
    order: 12,
    points: 10,
    images: [
      { id: 'zeleno',   imageUrl: `${BASE}/08-upr-10-tsvetove/01-zeleno.jpg`,   correctLabel: 'зелено'   },
      { id: 'cherveno', imageUrl: `${BASE}/08-upr-10-tsvetove/02-cherveno.jpg`, correctLabel: 'червено'  },
      { id: 'sinyo',    imageUrl: `${BASE}/08-upr-10-tsvetove/03-sinyo.jpg`,    correctLabel: 'синьо'    },
      { id: 'zhalto',   imageUrl: `${BASE}/08-upr-10-tsvetove/04-zhalto.jpg`,   correctLabel: 'жълто'    },
      { id: 'cherno',   imageUrl: `${BASE}/08-upr-10-tsvetove/05-cherno.jpg`,   correctLabel: 'черно'    },
      { id: 'rozovo',   imageUrl: `${BASE}/08-upr-10-tsvetove/06-rozovo.jpg`,   correctLabel: 'розово'   },
      { id: 'sivo',     imageUrl: `${BASE}/08-upr-10-tsvetove/07-sivo.jpg`,     correctLabel: 'сиво'     },
      { id: 'oranzhevo',imageUrl: `${BASE}/08-upr-10-tsvetove/08-oranzhevo.jpg`,correctLabel: 'оранжево' },
      { id: 'kafyavo',  imageUrl: `${BASE}/08-upr-10-tsvetove/09-kafyavo.jpg`,  correctLabel: 'кафяво'   },
      { id: 'lilavo',   imageUrl: `${BASE}/08-upr-10-tsvetove/10-lilavo.jpg`,   correctLabel: 'лилаво'   },
    ],
    options: ['зелено', 'червено', 'синьо', 'жълто', 'черно', 'розово', 'сиво', 'оранжево', 'кафяво', 'лилаво'],
  } as A2ImageLabelingExercise,

  // ORDER 13 — Упр. 11: Дрехи и обувки
  {
    id: 'a2-l00-ex-11',
    type: 'a2-image-labeling',
    title: 'УПРАЖНЕНИЕ 12',
    instruction: 'Изберете правилното наименование под всяка картинка.',
    order: 13,
    points: 10,
    images: [
      { id: 'roklya',      imageUrl: `${BASE}/09-upr-11-drehi-obuvki/01-roklya.jpg`,      correctLabel: 'рокля'    },
      { id: 'pulover',     imageUrl: `${BASE}/09-upr-11-drehi-obuvki/02-pulover.jpg`,     correctLabel: 'пуловер'  },
      { id: 'pola',        imageUrl: `${BASE}/09-upr-11-drehi-obuvki/03-pola.jpg`,        correctLabel: 'пола'     },
      { id: 'shorti',      imageUrl: `${BASE}/09-upr-11-drehi-obuvki/04-shorti.jpg`,      correctLabel: 'шорти'    },
      { id: 'maratonki',   imageUrl: `${BASE}/09-upr-11-drehi-obuvki/05-maratonki.jpg`,   correctLabel: 'маратонки'},
      { id: 'danki',       imageUrl: `${BASE}/09-upr-11-drehi-obuvki/06-danki.jpg`,       correctLabel: 'дънки'    },
      { id: 'riza',        imageUrl: `${BASE}/09-upr-11-drehi-obuvki/07-riza.jpg`,        correctLabel: 'риза'     },
      { id: 'yake',        imageUrl: `${BASE}/09-upr-11-drehi-obuvki/08-yake.jpg`,        correctLabel: 'яке'      },
      { id: 'pulover-ray', imageUrl: `${BASE}/09-upr-11-drehi-obuvki/09-pulover-raye.jpg`,correctLabel: 'пуловер на райе'},
      { id: 'obuvki',      imageUrl: `${BASE}/09-upr-11-drehi-obuvki/10-obuvki.jpg`,      correctLabel: 'обувки'   },
    ],
    options: ['рокля', 'пуловер', 'пола', 'шорти', 'маратонки', 'дънки', 'риза', 'яке', 'пуловер на райе', 'обувки'],
  } as A2ImageLabelingExercise,

  // ORDER 14 — Упр. 12: Мебели и домакински уреди
  {
    id: 'a2-l00-ex-12',
    type: 'a2-image-labeling',
    title: 'УПРАЖНЕНИЕ 13',
    instruction: 'Изберете правилното наименование под всяка картинка.',
    order: 14,
    points: 10,
    images: [
      { id: 'stol',         imageUrl: `${BASE}/10-upr-12-meblei-uredi/01-stol.jpg`,         correctLabel: 'стол'       },
      { id: 'leglo',        imageUrl: `${BASE}/10-upr-12-meblei-uredi/02-leglo.jpg`,        correctLabel: 'легло'      },
      { id: 'divan',        imageUrl: `${BASE}/10-upr-12-meblei-uredi/03-divan.jpg`,        correctLabel: 'диван'      },
      { id: 'leglo-dvoyno', imageUrl: `${BASE}/10-upr-12-meblei-uredi/04-leglo-dvoyno.jpg`, correctLabel: 'двойно легло'},
      { id: 'shkaf',        imageUrl: `${BASE}/10-upr-12-meblei-uredi/05-shkaf.jpg`,        correctLabel: 'шкаф'       },
      { id: 'peralnya',     imageUrl: `${BASE}/10-upr-12-meblei-uredi/06-peralnya.jpg`,     correctLabel: 'пералня'    },
      { id: 'pechka',       imageUrl: `${BASE}/10-upr-12-meblei-uredi/07-pechka.jpg`,       correctLabel: 'печка'      },
      { id: 'hladilnik',    imageUrl: `${BASE}/10-upr-12-meblei-uredi/08-hladilnik.jpg`,    correctLabel: 'хладилник'  },
      { id: 'televizor',    imageUrl: `${BASE}/10-upr-12-meblei-uredi/09-televizor.jpg`,    correctLabel: 'телевизор'  },
      { id: 'kompyutar',    imageUrl: `${BASE}/10-upr-12-meblei-uredi/10-kompyutar.jpg`,    correctLabel: 'компютър'   },
    ],
    options: ['стол', 'легло', 'диван', 'двойно легло', 'шкаф', 'пералня', 'печка', 'хладилник', 'телевизор', 'компютър'],
  } as A2ImageLabelingExercise,

  // ORDER 15 — Упр. 13: Превозни средства
  {
    id: 'a2-l00-ex-13',
    type: 'image_labeling',
    title: 'УПРАЖНЕНИЕ 14',
    instruction: 'Изберете правилното наименование под всяка картинка.',
    order: 15,
    points: 5,
    displayType: 'default',
    images: [
      { id: 'kola',       imageUrl: `${BASE}/11-upr-13-prevozni-sredstva/01-kola.jpg`,       correctLabel: 'кола'       },
      { id: 'avtobus',    imageUrl: `${BASE}/11-upr-13-prevozni-sredstva/02-avtobus.jpg`,    correctLabel: 'автобус'    },
      { id: 'tramvay',    imageUrl: `${BASE}/11-upr-13-prevozni-sredstva/03-tramvay.jpg`,    correctLabel: 'трамвай'    },
      { id: 'troleybus',  imageUrl: `${BASE}/11-upr-13-prevozni-sredstva/04-troleybus.jpg`,  correctLabel: 'тролейбус'  },
      { id: 'vlak',       imageUrl: `${BASE}/11-upr-13-prevozni-sredstva/05-vlak.jpg`,       correctLabel: 'влак'       },
    ],
    options: ['кола', 'автобус', 'трамвай', 'тролейбус', 'влак'],
  },

  // ORDER 16 — Упр. 14: Рутина на Георги
  {
    id: 'a2-l00-ex-14',
    type: 'dropdown_match',
    title: 'УПРАЖНЕНИЕ 15',
    instruction: 'Изберете правилния глагол или израз под всяка картинка.',
    order: 16,
    points: 10,
    questions: [
      { id: 'r01', left: 'Картинка 1 — в 8:00 ч.',    options: ['Става в 8:00 часа.', 'Взема душ.', 'Закусва.', 'Ляга.'],              correctAnswer: 'Става в 8:00 часа.'   },
      { id: 'r02', left: 'Картинка 2 — баня',          options: ['Взема душ.', 'Закусва.', 'Пазарува.', 'Спи.'],                       correctAnswer: 'Взема душ.'           },
      { id: 'r03', left: 'Картинка 3 — сутрин',        options: ['Закусва.', 'Обядва.', 'Вечеря.', 'Взема душ.'],                      correctAnswer: 'Закусва.'             },
      { id: 'r04', left: 'Картинка 4 — ресторант',     options: ['Обядва в ресторант.', 'Закусва.', 'Вечеря.', 'Среща се с приятели.'],correctAnswer: 'Обядва в ресторант.'  },
      { id: 'r05', left: 'Картинка 5 — приятели',      options: ['Среща се с приятели.', 'Пазарува.', 'Гледа телевизия.', 'Обядва.'],  correctAnswer: 'Среща се с приятели.' },
      { id: 'r06', left: 'Картинка 6 — супер',         options: ['Пазарува в супера.', 'Готви.', 'Почива.', 'Обядва.'],                correctAnswer: 'Пазарува в супера.'   },
      { id: 'r07', left: 'Картинка 7 — телевизор',     options: ['Гледа телевизия.', 'Пише имейли.', 'Чете книга.', 'Спи.'],          correctAnswer: 'Гледа телевизия.'     },
      { id: 'r08', left: 'Картинка 8 — компютър',      options: ['Пише имейли.', 'Гледа телевизия.', 'Чете книга.', 'Пазарува.'],     correctAnswer: 'Пише имейли.'         },
      { id: 'r09', left: 'Картинка 9 — след 23:00 ч.', options: ['Ляга след 23:00 часа.', 'Спи.', 'Закусва.', 'Гледа телевизия.'],    correctAnswer: 'Ляга след 23:00 часа.'},
      { id: 'r10', left: 'Картинка 10 — до 8:00 ч.',   options: ['Спи до 8:00 часа.', 'Ляга.', 'Отдъхва.', 'Почива.'],               correctAnswer: 'Спи до 8:00 часа.'    },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // ГРАМАТИКА (стр. 10–15)
  // ═══════════════════════════════════════════════════════════════════════

  // ORDER 17 — Упр. 15: Глаголът „съм" — справочна таблица
  {
    id: 'a2-l00-gramatika-02',
    type: 'grammar_table',
    title: 'ГРАМАТИКА — Глаголът „съм"',
    subtitle: 'Сегашно време',
    instruction: 'Запознайте се с формите на глагола „съм". Натиснете за произношение.',
    order: 17,
    tableTitle: 'Глаголът „съм" — сегашно време',
    columns: ['(+)', '(–)', '(?)'],
    rows: [
      { pronoun: 'аз',  cells: ['съм',  'не съм',  'ли съм']  },
      { pronoun: 'ти',  cells: ['си',   'не си',   'ли си']   },
      { pronoun: 'той', cells: ['е',    'не е',    'ли е']    },
      { pronoun: 'тя',  cells: ['е',    'не е',    'ли е']    },
      { pronoun: 'то',  cells: ['е',    'не е',    'ли е']    },
      { pronoun: 'ние', cells: ['сме',  'не сме',  'ли сме']  },
      { pronoun: 'Вие', cells: ['сте',  'не сте',  'ли сте']  },
      { pronoun: 'те',  cells: ['са',   'не са',   'ли са']   },
    ],
    notes: [
      'Аз съм сириец. = Сириец съм.',
    ],
  },

  // ORDER 18 — Упр. 15а: Изберете правилното местоимение
  {
    id: 'a2-l00-ex-15a',
    type: 'dropdown_match',
    title: 'УПРАЖНЕНИЕ 16а',
    instruction: 'Изберете правилното лично местоимение.',
    instructionKey: 'a2.ex.glagolSamMest',
    order: 18,
    points: 8,
    questions: [
      { id: 's01', left: '___ съм арабин.',      options: ['Аз', 'Ти', 'Той', 'Тя', 'Ние', 'Вие', 'Те'],   correctAnswer: 'Аз'  },
      { id: 's02', left: '___ си българин.',     options: ['Ти', 'Аз', 'Той', 'Тя', 'Ние', 'Вие', 'Те'],   correctAnswer: 'Ти'  },
      { id: 's03', left: '___ е афганистанец.',  options: ['Той', 'Аз', 'Ти', 'Тя', 'Ние', 'Вие', 'Те'],   correctAnswer: 'Той', alternateCorrectAnswers: ['Тя', 'То'] },
      { id: 's04', left: '___ е арабка.',        options: ['Тя', 'Аз', 'Ти', 'Той', 'Ние', 'Вие', 'Те'],   correctAnswer: 'Тя'  },
      { id: 's05', left: '___ е от Украйна.',    options: ['Той', 'Аз', 'Ти', 'Тя', 'Ние', 'Вие', 'Те'],   correctAnswer: 'Той', alternateCorrectAnswers: ['Тя', 'То'] },
      { id: 's06', left: '___ сме ливанци.',     options: ['Ние', 'Аз', 'Ти', 'Той', 'Вие', 'Те'],          correctAnswer: 'Ние' },
      { id: 's07', left: '___ сте алжирци.',     options: ['Вие', 'Аз', 'Ти', 'Ние', 'Те'],                 correctAnswer: 'Вие' },
      { id: 's08', left: '___ са африканци.',    options: ['Те', 'Аз', 'Ти', 'Той', 'Ние', 'Вие'],          correctAnswer: 'Те'  },
    ],
  },

  // ORDER 19 — Упр. 15б: Изберете правилната форма на „съм" (+/-)
  {
    id: 'a2-l00-ex-15b',
    type: 'dropdown_match',
    title: 'УПРАЖНЕНИЕ 16б',
    instruction: 'Изберете правилната форма на глагола „съм".',
    instructionKey: 'a2.ex.glagolSamForm',
    order: 19,
    points: 16,
    questions: [
      // Положителна
      { id: 'p01', left: 'Аз ___ палестинец. (+)',     options: ['съм', 'не съм', 'си', 'не си', 'е', 'не е', 'сме', 'не сме', 'сте', 'не сте', 'са', 'не са'], correctAnswer: 'съм'    },
      { id: 'p02', left: 'Ти ___ българин. (+)',       options: ['си', 'съм', 'не си', 'не съм', 'е', 'не е', 'сме', 'сте', 'са'],                               correctAnswer: 'си'     },
      { id: 'p03', left: 'Той ___ кюрд. (+)',          options: ['е', 'съм', 'си', 'не е', 'сме', 'сте', 'са'],                                                  correctAnswer: 'е'      },
      { id: 'p04', left: 'Тя ___ сирийка. (+)',        options: ['е', 'съм', 'си', 'не е', 'сме', 'са'],                                                         correctAnswer: 'е'      },
      { id: 'p05', left: 'Ние ___ украинци. (+)',      options: ['сме', 'сте', 'са', 'не сме', 'е', 'съм'],                                                      correctAnswer: 'сме'    },
      { id: 'p06', left: 'Вие ___ иракчани. (+)',      options: ['сте', 'сме', 'са', 'не сте', 'е', 'съм'],                                                      correctAnswer: 'сте'    },
      { id: 'p07', left: 'Те ___ афганистанци. (+)',   options: ['са', 'сме', 'сте', 'не са', 'е', 'съм'],                                                       correctAnswer: 'са'     },
      { id: 'p08', left: 'То ___ от Ирак. (+)',        options: ['е', 'съм', 'си', 'не е', 'сме', 'са'],                                                         correctAnswer: 'е'      },
      // Отрицателна
      { id: 'n01', left: 'Аз ___ ливанец. (–)',        options: ['не съм', 'съм', 'не си', 'си', 'не е', 'не сме', 'не сте', 'не са'],                           correctAnswer: 'не съм' },
      { id: 'n02', left: 'Ти ___ иранец. (–)',         options: ['не си', 'си', 'не съм', 'съм', 'не е', 'не сме', 'не сте', 'не са'],                           correctAnswer: 'не си'  },
      { id: 'n03', left: 'Той ___ сириец. (–)',        options: ['не е', 'е', 'не съм', 'не си', 'не сме', 'не сте', 'не са'],                                   correctAnswer: 'не е'   },
      { id: 'n04', left: 'Тя ___ алжирка. (–)',        options: ['не е', 'е', 'не съм', 'не си', 'не сме', 'не са'],                                              correctAnswer: 'не е'   },
      { id: 'n05', left: 'Ние ___ палестинци. (–)',    options: ['не сме', 'сме', 'не са', 'не сте', 'не е', 'не съм'],                                           correctAnswer: 'не сме' },
      { id: 'n06', left: 'Вие ___ сирийци. (–)',       options: ['не сте', 'сте', 'не сме', 'не са', 'не е', 'не съм'],                                           correctAnswer: 'не сте' },
      { id: 'n07', left: 'Те ___ българи. (–)',        options: ['не са', 'са', 'не сме', 'не сте', 'не е', 'не съм'],                                            correctAnswer: 'не са'  },
      { id: 'n08', left: 'То ___ от Афганистан. (–)', options: ['не е', 'е', 'не съм', 'не си', 'не сме', 'не са'],                                              correctAnswer: 'не е'   },
    ],
  },

  // ORDER 20 — Упр. 15в: Въпросителна форма на „съм"
  {
    id: 'a2-l00-ex-15v',
    type: 'dropdown_match',
    title: 'УПРАЖНЕНИЕ 16в',
    instruction: 'Изберете правилната въпросителна форма на глагола „съм".',
    instructionKey: 'a2.ex.glagolSamVapros',
    order: 20,
    points: 8,
    questions: [
      { id: 'v01', left: 'Аз бежанец ___?',        options: ['ли съм', 'ли си', 'ли е', 'ли сме', 'ли сте', 'ли са'],  correctAnswer: 'ли съм' },
      { id: 'v02', left: 'Ти българин ___?',        options: ['ли си', 'ли съм', 'ли е', 'ли сме', 'ли сте', 'ли са'],  correctAnswer: 'ли си'  },
      { id: 'v03', left: 'Той иракчанин ___?',      options: ['ли е', 'ли съм', 'ли си', 'ли сме', 'ли сте', 'ли са'],  correctAnswer: 'ли е'   },
      { id: 'v04', left: 'Тя бежанка ___?',         options: ['ли е', 'ли съм', 'ли си', 'ли сме', 'ли сте', 'ли са'],  correctAnswer: 'ли е'   },
      { id: 'v05', left: 'То от Афганистан ___?',   options: ['ли е', 'ли съм', 'ли си', 'ли сме', 'ли сте', 'ли са'],  correctAnswer: 'ли е'   },
      { id: 'v06', left: 'Ние иранци ___?',         options: ['ли сме', 'ли съм', 'ли си', 'ли е', 'ли сте', 'ли са'],  correctAnswer: 'ли сме' },
      { id: 'v07', left: 'Вие кюрди ___?',          options: ['ли сте', 'ли съм', 'ли си', 'ли е', 'ли сме', 'ли са'],  correctAnswer: 'ли сте' },
      { id: 'v08', left: 'Те араби ___?',           options: ['ли са', 'ли съм', 'ли си', 'ли е', 'ли сме', 'ли сте'],  correctAnswer: 'ли са'  },
    ],
  },

  // ORDER 21 — Упр. 16: Род на съществителните — справочна таблица
  {
    id: 'a2-l00-gramatika-03',
    type: 'grammar_table',
    title: 'ГРАМАТИКА — Род на съществителните',
    subtitle: 'Мъжки, женски, среден род',
    instruction: 'Запознайте се с моделите за определяне на рода. Натиснете за произношение.',
    order: 21,
    tableTitle: 'Числителни имена за род',
    columns: ['Мъжки род (ЕДИН)', 'Женски род (ЕДНА)', 'Среден род (ЕДНО)'],
    rows: [
      { pronoun: 'Пример', cells: ['десерт', 'баница', 'кебапче'] },
      { pronoun: 'Окончание', cells: ['съгласна', '-а / -я', '-е / -о'] },
    ],
  },

  // ORDER 22 — Упр. 16: Поставете думите в правилната колона
  {
    id: 'a2-l00-ex-16',
    type: 'drag_to_columns',
    title: 'УПРАЖНЕНИЕ 17',
    instruction: 'Поставете думите в правилната колона.',
    instructionKey: 'a2.ex.rodSashtestvitelni',
    order: 22,
    points: 16,
    items: [
      'баница', 'десерт', 'захар', 'дюнер', 'кебапче', 'кроасан',
      'кюфте', 'мусака', 'салам', 'сладолед', 'сметана', 'чай',
      'цигара', 'шишче', 'шоколад', 'яйце',
    ],
    columns: [
      {
        id: 'mazh',
        title: 'ЕДИН (мъжки род)',
        icon: '♂',
        correctItems: ['десерт', 'дюнер', 'кроасан', 'салам', 'сладолед', 'чай', 'шоколад'],
      },
      {
        id: 'zhen',
        title: 'ЕДНА (женски род)',
        icon: '♀',
        correctItems: ['баница', 'захар', 'мусака', 'сметана', 'цигара'],
      },
      {
        id: 'sred',
        title: 'ЕДНО (среден род)',
        icon: '⚬',
        correctItems: ['кебапче', 'кюфте', 'шишче', 'яйце'],
      },
    ],
  },

  // ORDER 23 — Упр. 17: Множествено число — справочна таблица
  {
    id: 'a2-l00-gramatika-04',
    type: 'grammar_table',
    title: 'ГРАМАТИКА — Множествено число',
    subtitle: 'Форми за много и два/две',
    instruction: 'Запознайте се с формите за множествено число. Натиснете за произношение.',
    order: 23,
    tableTitle: 'Множествено число на съществителните',
    columns: ['Единствено число', 'Много (мн.ч.)', 'Два/Две'],
    rows: [
      // Женски род
      { pronoun: 'ж.р.', cells: ['ябълка', 'ябълки', 'две ябълки'] },
      { pronoun: '', cells: ['круша', 'круши', 'две круши'] },
      { pronoun: '', cells: ['диня', 'дини', 'две дини'] },
      { pronoun: '', cells: ['праскова', 'праскови', 'две праскови'] },
      { pronoun: '', cells: ['слива', 'сливи', 'две сливи'] },
      { pronoun: '', cells: ['ягода', 'ягоди', 'две ягоди'] },
      { pronoun: '', cells: ['череша', 'череши', 'две череши'] },
      { pronoun: '', cells: ['чушка', 'чушки', 'две чушки'] },
      // Среден род
      { pronoun: 'ср.р.', cells: ['кафе', 'кафета', 'две кафета'] },
      { pronoun: '', cells: ['пиле', 'пилета', 'две пилета'] },
      // Мъжки род
      { pronoun: 'м.р.', cells: ['лимон', 'лимони', 'два лимона'] },
      { pronoun: '', cells: ['портокал', 'портокали', 'два портокала'] },
    ],
    notes: [
      'Ж.р.: -а/-я → -и; -ка → -ки; -га → -ги.',
      'Ср.р.: -е/-о → -ета; -ие → -ия.',
      'М.р.: + -и или + -а (за изброени с числа).',
    ],
  },

  // ORDER 24 — Упр. 17: Попълнете формите за множествено число
  {
    id: 'a2-l00-ex-17',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 18',
    instruction: 'Напишете правилната форма за множествено число.',
    instructionKey: 'a2.ex.mnozhestveno',
    order: 24,
    points: 12,
    layout: 'two-column',
    sentences: [
      { text: 'гъба → _______',        blanks: [2], correctAnswers: ['гъби']       },
      { text: 'маруля → _______',       blanks: [2], correctAnswers: ['марули']     },
      { text: 'краставица → _______',   blanks: [2], correctAnswers: ['краставици'] },
      { text: 'тиквичка → _______',     blanks: [2], correctAnswers: ['тиквички']   },
      { text: 'смокиня → _______',      blanks: [2], correctAnswers: ['смокини']    },
      { text: 'морков → _______',       blanks: [2], correctAnswers: ['моркови']    },
      { text: 'картоф → _______',       blanks: [2], correctAnswers: ['картофи']    },
      { text: 'домат → _______',        blanks: [2], correctAnswers: ['домати']     },
      { text: 'масло → _______',        blanks: [2], correctAnswers: ['масла']      },
      { text: 'мляко → _______',        blanks: [2], correctAnswers: ['млека']      },
      { text: 'боб → _______',          blanks: [2], correctAnswers: ['бобове']     },
      { text: 'ориз → _______',         blanks: [2], correctAnswers: ['ориза'], acceptableAnswers: [['ориза', 'ориз']] },
    ],
  },

  // ORDER 25 — Упр. 18: Прилагателни — справочна таблица
  {
    id: 'a2-l00-gramatika-05',
    type: 'grammar_table',
    title: 'ГРАМАТИКА — Прилагателни',
    subtitle: 'Род и число на прилагателните',
    instruction: 'Запознайте се с формите на прилагателните. Натиснете за произношение.',
    order: 25,
    tableTitle: 'Прилагателни — форми по род и число',
    columns: ['Мъжки род', 'Женски род', 'Среден род', 'Мн. число'],
    rows: [
      { pronoun: 'Модел 1', cells: ['красив',     'красива',     'красиво',     'красиви']     },
      { pronoun: 'Модел 2', cells: ['национален', 'национална',  'национално',  'национални']  },
      { pronoun: 'Модел 3', cells: ['арабски',    'арабска',     'арабско',     'арабски']     },
    ],
  },

  // ORDER 26 — Упр. 18: Попълнете формите на прилагателните
  {
    id: 'a2-l00-ex-18',
    type: 'dropdown_match',
    title: 'УПРАЖНЕНИЕ 19',
    instruction: 'Изберете правилната форма на прилагателното.',
    instructionKey: 'a2.ex.prilagatelni',
    order: 26,
    points: 10,
    questions: [
      { id: 'adj01', left: 'нов _____ костюм (м.р.)',    options: ['нов', 'нова', 'ново', 'нови'],   correctAnswer: 'нов'      },
      { id: 'adj02', left: '_____ рокля (ж.р.)',         options: ['нова', 'нов', 'ново', 'нови'],   correctAnswer: 'нова'     },
      { id: 'adj03', left: '_____ палто (ср.р.)',        options: ['ново', 'нов', 'нова', 'нови'],   correctAnswer: 'ново'     },
      { id: 'adj04', left: '_____ обувки (мн.ч.)',       options: ['нови', 'нов', 'нова', 'ново'],   correctAnswer: 'нови'     },
      { id: 'adj05', left: 'официален _____ (м.р.)',     options: ['официален', 'официална', 'официално', 'официални'], correctAnswer: 'официален'  },
      { id: 'adj06', left: 'официална _____ (ж.р.)',     options: ['официална', 'официален', 'официално', 'официални'], correctAnswer: 'официална'  },
      { id: 'adj07', left: 'официално _____ (ср.р.)',    options: ['официално', 'официален', 'официална', 'официални'], correctAnswer: 'официално'  },
      { id: 'adj08', left: 'официални _____ (мн.ч.)',    options: ['официални', 'официален', 'официална', 'официално'], correctAnswer: 'официални'  },
      { id: 'adj09', left: 'английски _____ (м.р.)',     options: ['английски', 'английска', 'английско', 'английски'], correctAnswer: 'английски'  },
      { id: 'adj10', left: 'английска _____ (ж.р.)',     options: ['английска', 'английски', 'английско'],               correctAnswer: 'английска'  },
    ],
  },

  // ORDER 27 — Упр. 19: Степенуване на прилагателните — справка
  {
    id: 'a2-l00-gramatika-06',
    type: 'grammar_table',
    title: 'ГРАМАТИКА — Степенуване на прилагателните',
    subtitle: 'Положителна, сравнителна и превъзходна степен',
    instruction: 'Запознайте се с формите за степенуване. Натиснете за произношение.',
    order: 27,
    tableTitle: 'Степени на прилагателни',
    columns: ['Положителна', 'Сравнителна (по-)', 'Превъзходна (най-)'],
    rows: [
      { pronoun: 'хубав',  cells: ['хубав',  'по-хубав',  'най-хубав']  },
      { pronoun: 'голям',  cells: ['голям',  'по-голям',  'най-голям']  },
      { pronoun: 'малък',  cells: ['малък',  'по-малък',  'най-малък']  },
      { pronoun: 'висок',  cells: ['висок',  'по-висок',  'най-висок']  },
      { pronoun: 'евтин',  cells: ['евтин',  'по-евтин',  'най-евтин']  },
      { pronoun: 'скъп',   cells: ['скъп',   'по-скъп',   'най-скъп']   },
      { pronoun: 'интересен', cells: ['интересен', 'по-интересен', 'най-интересен'] },
    ],
  },

  // ORDER 28 — Упр. 19: Попълнете сравнителна и превъзходна степен
  {
    id: 'a2-l00-ex-19',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 20',
    instruction: 'Попълнете сравнителната и превъзходната степен.',
    instructionKey: 'a2.ex.stepenuvane',
    order: 28,
    points: 6,
    layout: 'single',
    sentences: [
      {
        text: 'Иван е гладен. Васил е _______ от Иван. Георги е _______.',
        blanks: [7, 11],
        correctAnswers: ['по-гладен', 'най-гладен'],
      },
      {
        text: 'Париж е интересен. Лондон е _______ от Париж. Рим е _______.',
        blanks: [7, 11],
        correctAnswers: ['по-интересен', 'най-интересен'],
      },
      {
        text: 'Валя е хубава. Галя е _______ от Валя. Диана е _______.',
        blanks: [7, 11],
        correctAnswers: ['по-хубава', 'най-хубава'],
      },
    ],
  },

  // ORDER 29 — Упр. 20: Степенуване на наречията — справка
  {
    id: 'a2-l00-gramatika-07',
    type: 'grammar_table',
    title: 'ГРАМАТИКА — Степенуване на наречията',
    subtitle: 'Наречия в три степени',
    instruction: 'Запознайте се с формите за степенуване на наречията. Натиснете за произношение.',
    order: 29,
    tableTitle: 'Степени на наречия',
    columns: ['Положителна', 'Сравнителна (по-)', 'Превъзходна (най-)'],
    rows: [
      { pronoun: '',  cells: ['добре',  'по-добре',  'най-добре']  },
      { pronoun: '',  cells: ['лошо',   'по-лошо',   'най-лошо']   },
      { pronoun: '',  cells: ['рано',   'по-рано',   'най-рано']   },
      { pronoun: '',  cells: ['късно',  'по-късно',  'най-късно']  },
      { pronoun: '',  cells: ['малко',  'по-малко',  'най-малко']  },
      { pronoun: '',  cells: ['много',  'повече',    'най-много']  },
      { pronoun: '',  cells: ['бавно',  'по-бавно',  'най-бавно']  },
      { pronoun: '',  cells: ['евтино', 'по-евтино', 'най-евтино'] },
      { pronoun: '',  cells: ['скъпо',  'по-скъпо',  'най-скъпо']  },
    ],
  },

  // ORDER 30 — Упр. 20: Попълнете степени на наречията
  {
    id: 'a2-l00-ex-20',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 21',
    instruction: 'Попълнете правилната степен на наречието.',
    instructionKey: 'a2.ex.stepenuvaneNarechiya',
    order: 30,
    points: 6,
    layout: 'single',
    sentences: [
      {
        text: 'В България е скъпо. В Германия е _______. В Швеция е _______.',
        blanks: [6, 10],
        correctAnswers: ['по-скъпо', 'най-скъпо'],
      },
      {
        text: 'Тя говори добре. Той говори _______. Диана говори _______.',
        blanks: [5, 9],
        correctAnswers: ['по-добре', 'най-добре'],
      },
      {
        text: 'Петър идва рано. Мария идва _______. Иван идва _______.',
        blanks: [5, 9],
        correctAnswers: ['по-рано', 'най-рано'],
      },
    ],
  },

  // ORDER 31 — Упр. 21: Членуване на съществителните — справка
  {
    id: 'a2-l00-gramatika-08',
    type: 'grammar_table',
    title: 'ГРАМАТИКА — Определителен член',
    subtitle: 'Членуване на съществителните',
    instruction: 'Запознайте се с формите за членуване. Натиснете за произношение.',
    order: 31,
    tableTitle: 'Определителен член на съществителните',
    columns: ['Единствено (субект)', 'Единствено (обект)', 'Мн.ч.'],
    rows: [
      { pronoun: 'м.р.',  cells: ['пазарЪТ', 'пазарА', 'пазарИТЕ'] },
      { pronoun: 'м.р.',  cells: ['музеЯТ',  'музеЯ',  'музеИТЕ']  },
      { pronoun: 'ж.р.',  cells: ['банкАТА', 'банкАТА', 'банкИТЕ'] },
      { pronoun: 'ср.р.', cells: ['селОТО', 'селОТО',  'селАТА']   },
    ],
    notes: [
      'М.р. субект: -ът / -ят. М.р. обект: -а / -я.',
      'Ж.р.: -та (ед.ч.) / -те (мн.ч.).',
      'Ср.р.: -то (ед.ч.) / -та (мн.ч.).',
    ],
  },

  // ORDER 32 — Упр. 21: Употреба на члена в изречения
  {
    id: 'a2-l00-ex-21',
    type: 'dropdown_match',
    title: 'УПРАЖНЕНИЕ 22',
    instruction: 'Изберете правилния определителен член.',
    instructionKey: 'a2.ex.chlenuvane',
    order: 32,
    points: 9,
    questions: [
      { id: 'ch01', left: 'Магазин___ е отворен.',       options: ['ът', 'а', 'та', 'то', 'те'],  correctAnswer: 'ът'  },
      { id: 'ch02', left: 'Отивам до магазин___.',       options: ['а',  'ът', 'та', 'то', 'те'], correctAnswer: 'а'   },
      { id: 'ch03', left: 'Музей___ е интересен.',       options: ['ят', 'я', 'та', 'то', 'те'],  correctAnswer: 'ят'  },
      { id: 'ch04', left: 'В музей___ има много хора.',  options: ['я',  'ят', 'та', 'то', 'те'], correctAnswer: 'я'   },
      { id: 'ch05', left: 'Болниц___ е модерна.',        options: ['ата', 'ът', 'то', 'те'],       correctAnswer: 'ата' },
      { id: 'ch06', left: 'Училищ___ е малко.',          options: ['ето', 'ят', 'та', 'те'],       correctAnswer: 'ето' },
      { id: 'ch07', left: 'Магазин___ са отворени.',     options: ['ите', 'ът', 'та', 'то'],       correctAnswer: 'ите' },
      { id: 'ch08', left: 'Улиц___ са чисти.',           options: ['ите', 'та', 'то', 'ът'],       correctAnswer: 'ите' },
      { id: 'ch09', left: 'Кафе___ са затворени.',       options: ['нета', 'то', 'та', 'те'],      correctAnswer: 'нета', alternateCorrectAnswers: ['тата'] },
    ],
  },

  // ORDER 33 — Упр. 22: Членуване на прилагателните — справка
  {
    id: 'a2-l00-gramatika-09',
    type: 'grammar_table',
    title: 'ГРАМАТИКА — Определителен член на прилагателните',
    subtitle: 'Форми при членувани прилагателни',
    instruction: 'Запознайте се с формите. Натиснете за произношение.',
    order: 33,
    tableTitle: 'Членуване на прилагателните',
    columns: ['Нечленувана форма', 'Членувана форма'],
    rows: [
      { pronoun: 'м.р.',  cells: ['синият пуловер / синия пуловер', 'СИНИЯТ (субект) / СИНИЯ (обект)'] },
      { pronoun: 'ж.р.',  cells: ['червената тениска',              'ЧЕРВЕНАТА']                        },
      { pronoun: 'ср.р.', cells: ['сивото сако',                    'СИВОТО']                           },
      { pronoun: 'мн.ч.', cells: ['белите маратонки',               'БЕЛИТЕ']                           },
    ],
  },

  // ORDER 34 — Упр. 22: Употреба на членуваните прилагателни
  {
    id: 'a2-l00-ex-22',
    type: 'dropdown_match',
    title: 'УПРАЖНЕНИЕ 23',
    instruction: 'Изберете правилната членувана форма на прилагателното.',
    instructionKey: 'a2.ex.chlenuvaneAdj',
    order: 34,
    points: 5,
    questions: [
      { id: 'ca01', left: '___ официален костюм е скъп.',       options: ['Черният', 'Черната', 'Черното', 'Черните'],   correctAnswer: 'Черният'  },
      { id: 'ca02', left: 'Искам ___ панталон отляво.',         options: ['първия', 'първият', 'първата', 'първото'],    correctAnswer: 'първия'   },
      { id: 'ca03', left: '___ памучна рокля е малка.',         options: ['Розовата', 'Розовият', 'Розовото', 'Розовите'],correctAnswer: 'Розовата' },
      { id: 'ca04', left: '___ модерно палто е голямо.',        options: ['Жълтото', 'Жълтият', 'Жълтата', 'Жълтите'],  correctAnswer: 'Жълтото'  },
      { id: 'ca05', left: '___ спортни обувки са евтини.',      options: ['Зелените', 'Зеленият', 'Зелената', 'Зеленото'],correctAnswer: 'Зелените' },
    ],
  },

  // ORDER 35 — Упр. 23а: Предлози за място — илюстрирани схеми
  {
    id: 'a2-l00-novi-dumi-02',
    type: 'a2-wide-cards',
    title: 'ПРЕДЛОЗИ ЗА МЯСТО',
    instruction: 'Натиснете за произношение.',
    order: 35,
    cards: [
      { id: 'v',        imageUrl: `${BASE}/13-upr-23a-predlozi-shemi/01-v.jpg`,        label: 'в'          },
      { id: 'na',       imageUrl: `${BASE}/13-upr-23a-predlozi-shemi/02-na.jpg`,       label: 'на'         },
      { id: 'do',       imageUrl: `${BASE}/13-upr-23a-predlozi-shemi/03-do.jpg`,       label: 'до'         },
      { id: 'pred',     imageUrl: `${BASE}/13-upr-23a-predlozi-shemi/04-pred.jpg`,     label: 'пред'       },
      { id: 'zad',      imageUrl: `${BASE}/13-upr-23a-predlozi-shemi/05-zad.jpg`,      label: 'зад'        },
      { id: 'mezhdu',   imageUrl: `${BASE}/13-upr-23a-predlozi-shemi/06-mezhdu.jpg`,   label: 'между'      },
      { id: 'sreshtu',  imageUrl: `${BASE}/13-upr-23a-predlozi-shemi/07-sreshtu.jpg`,  label: 'срещу'      },
      { id: 'blizo-do', imageUrl: `${BASE}/13-upr-23a-predlozi-shemi/08-blizo-do.jpg`, label: 'близо до'   },
      { id: 'dalech-ot',imageUrl: `${BASE}/13-upr-23a-predlozi-shemi/09-daleche-ot.jpg`,label: 'далеч от' },
      { id: 'nad-pod',  imageUrl: `${BASE}/13-upr-23a-predlozi-shemi/10-nad-pod.jpg`,  label: 'над / под'  },
    ],
  } as A2WideCardsExercise,

  // ORDER 36 — Упр. 23а: Предлози за място — упражнение (с план на къщата)
  {
    id: 'a2-l00-ex-23a',
    type: 'dropdown_match',
    title: 'УПРАЖНЕНИЕ 24а',
    instruction: 'Изберете правилния предлог. Погледнете плана на къщата.',
    instructionKey: 'a2.ex.predloziMyasto',
    order: 36,
    points: 11,
    imageUrl: `${BASE}/14-upr-23a-kashta/01-kashta-shema.jpg`,
    questions: [
      { id: 'pm01', left: '___ къщата има кухня, хол, коридор, спалня, тоалетна, баня и балкон.', options: ['В', 'На', 'До', 'Пред', 'Зад', 'Над'], correctAnswer: 'В'      },
      { id: 'pm02', left: 'Холът е ___ кухнята.',       options: ['до', 'в', 'на', 'пред', 'зад', 'над', 'под'], correctAnswer: 'до'       },
      { id: 'pm03', left: 'Спалнята е ___ кухнята.',    options: ['до', 'в', 'на', 'пред', 'зад', 'над', 'под'], correctAnswer: 'до'       },
      { id: 'pm04', left: 'Печката е ___ шкафа.',       options: ['до', 'в', 'на', 'пред', 'зад', 'над', 'под'], correctAnswer: 'до'       },
      { id: 'pm05', left: 'Лаптопът е ___ масата.',     options: ['на', 'в', 'до', 'пред', 'зад', 'над', 'под'], correctAnswer: 'на'       },
      { id: 'pm06', left: 'Масата е ___ дивана.',       options: ['до', 'в', 'на', 'пред', 'зад', 'над', 'под'], correctAnswer: 'до'       },
      { id: 'pm07', left: 'Гардеробът е ___ спалнята.', options: ['в', 'на', 'до', 'пред', 'зад', 'над', 'под'], correctAnswer: 'в'        },
      { id: 'pm08', left: 'Диванът е ___ вратата.',     options: ['до', 'в', 'на', 'пред', 'зад', 'над', 'под'], correctAnswer: 'до'       },
      { id: 'pm09', left: 'Ваната е ___ банята.',       options: ['в', 'на', 'до', 'пред', 'зад', 'над', 'под'], correctAnswer: 'в'        },
      { id: 'pm10', left: 'Цветето е ___ прозореца.',   options: ['до', 'в', 'на', 'пред', 'зад', 'над', 'под'], correctAnswer: 'до'       },
      { id: 'pm11', left: 'Перялнята е ___ мивката.',   options: ['до', 'в', 'на', 'пред', 'зад', 'над', 'под'], correctAnswer: 'до'       },
    ],
  },

  // ORDER 37 — Упр. 23б: Предлози за време — справка
  {
    id: 'a2-l00-gramatika-10',
    type: 'grammar_table',
    title: 'ГРАМАТИКА — Предлози за време',
    subtitle: 'в, на, през, от...до, преди, след, около',
    instruction: 'Запознайте се с предлозите за време. Натиснете за произношение.',
    order: 37,
    tableTitle: 'Предлози за време',
    columns: ['Употреба', 'Пример'],
    rows: [
      { pronoun: 'в',       cells: ['часове на деня, дни',     'в 8:00 часа, в понеделник']              },
      { pronoun: 'на',      cells: ['дати',                    'на 12 март']                             },
      { pronoun: 'през',    cells: ['месеци, сезони, години',  'през май, през лятото, през 2024 година']},
      { pronoun: 'от...до', cells: ['период от-до',            'от 8:00 до 13:00 часа']                  },
      { pronoun: 'преди',   cells: ['по-рано от',              'преди обяд']                             },
      { pronoun: 'след',    cells: ['по-късно от',             'след работа']                            },
      { pronoun: 'около',   cells: ['приблизително',           'около 10:00 часа']                       },
    ],
  },

  // ORDER 38 — Упр. 23б: Предлози за време — упражнение
  {
    id: 'a2-l00-ex-23b',
    type: 'dropdown_match',
    title: 'УПРАЖНЕНИЕ 24б',
    instruction: 'Изберете правилния предлог за време.',
    instructionKey: 'a2.ex.predloziVreme',
    order: 38,
    points: 9,
    questions: [
      { id: 'pt01', left: 'Роден съм ___ 12 март 1986 година.',           options: ['на', 'в', 'през', 'от', 'преди', 'след', 'около'], correctAnswer: 'на'    },
      { id: 'pt02', left: 'Работя ___ 8:00 ___ 15:00 часа.',              options: ['от...до', 'в...до', 'от...в', 'от...след'],         correctAnswer: 'от...до' },
      { id: 'pt03', left: 'Ходя на кино ___ петък.',                      options: ['в', 'на', 'през', 'от', 'преди', 'след'],           correctAnswer: 'в'     },
      { id: 'pt04', left: 'Отивам на море ___ юли.',                      options: ['през', 'в', 'на', 'от', 'след', 'около'],          correctAnswer: 'през'  },
      { id: 'pt05', left: 'Идвам ___ обяд.',                              options: ['след', 'преди', 'в', 'на', 'около'],                correctAnswer: 'след'  },
      { id: 'pt06', left: 'Ела ___ 15:00 часа.',                          options: ['около', 'в', 'на', 'от', 'след'],                   correctAnswer: 'около' },
      { id: 'pt07', left: 'Ходя на кино ___ лятото.',                     options: ['през', 'в', 'на', 'от', 'след'],                    correctAnswer: 'през'  },
      { id: 'pt08', left: 'Рожденият ми ден е ___ март.',                 options: ['през', 'в', 'на', 'от', 'след'],                    correctAnswer: 'през'  },
      { id: 'pt09', left: 'Завършвам курса ___ шест месеца.',             options: ['след', 'преди', 'в', 'на', 'около', 'от'],          correctAnswer: 'след'  },
    ],
  },

  // ORDER 39 — Упр. 24: Сегашно време — справочна таблица
  {
    id: 'a2-l00-gramatika-11',
    type: 'grammar_table',
    title: 'ГРАМАТИКА — Сегашно време',
    subtitle: 'А-спрежение, Е-спрежение, И-спрежение',
    instruction: 'Запознайте се с трите спрежения. Натиснете за произношение.',
    order: 39,
    tableTitle: 'Сегашно време — спрежения',
    columns: ['А-спрежение (работя)', 'Е-спрежение (пиша)', 'И-спрежение (говоря)'],
    rows: [
      { pronoun: 'аз',  cells: ['работ-я',  'пиш-а',  'говор-я']  },
      { pronoun: 'ти',  cells: ['работ-иш', 'пиш-еш', 'говор-иш'] },
      { pronoun: 'той', cells: ['работ-и',  'пиш-е',  'говор-и']  },
      { pronoun: 'тя',  cells: ['работ-и',  'пиш-е',  'говор-и']  },
      { pronoun: 'то',  cells: ['работ-и',  'пиш-е',  'говор-и']  },
      { pronoun: 'ние', cells: ['работ-им', 'пиш-ем', 'говор-им'] },
      { pronoun: 'Вие', cells: ['работ-ите','пиш-ете','говор-ите'] },
      { pronoun: 'те',  cells: ['работ-ят', 'пиш-ат', 'говор-ят'] },
    ],
    notes: [
      'А-спрежение: казвам, пазарувам, чета (в 3л.ед.ч. казва, пазарува, чете).',
      'И-спрежение: говоря, готвя, чистя, работя, тичам.',
    ],
  },

  // ORDER 40 — Упр. 24: Сегашно време — попълнете текста за Таня
  {
    id: 'a2-l00-ex-24',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 25',
    instruction: 'Попълнете правилната форма на глагола в скобите.',
    instructionKey: 'a2.ex.segashnoVreme',
    order: 40,
    points: 11,
    layout: 'single',
    sentences: [
      {
        text: 'Тя _______ (казвам) Таня и _______ (съм) учителка по български.',
        blanks: [1, 4],
        correctAnswers: ['казва', 'е'],
      },
      {
        text: 'Таня _______ (работя) всеки ден от 8:00 до 13:00 часа.',
        blanks: [1],
        correctAnswers: ['работи'],
      },
      {
        text: 'На обяд Таня _______ (ям) сандвичи и _______ (пия) кафе.',
        blanks: [3, 6],
        correctAnswers: ['яде', 'пие'],
      },
      {
        text: 'След обяд _______ (чета) книги и _______ (пиша) имейли.',
        blanks: [2, 5],
        correctAnswers: ['чете', 'пише'],
      },
      {
        text: 'След работа Таня _______ (пазарувам) и _______ (готвя).',
        blanks: [3, 6],
        correctAnswers: ['пазарува', 'готви'],
      },
      {
        text: 'Понякога _______ (тичам) в парка или _______ (срещам се) с приятели.',
        blanks: [1, 5],
        correctAnswers: ['тича', 'среща се'],
      },
    ],
  },

  // ORDER 41 — Упр. 25: Кратки притежателни местоимения — справка
  {
    id: 'a2-l00-gramatika-12',
    type: 'grammar_table',
    title: 'ГРАМАТИКА — Кратки притежателни местоимения',
    subtitle: 'ми, ти, му, й, ни, ви, им',
    instruction: 'Запознайте се с кратките форми. Натиснете за произношение.',
    order: 41,
    tableTitle: 'Кратки притежателни местоимения',
    columns: ['Кратка форма', 'Пример'],
    rows: [
      { pronoun: 'аз',  cells: ['ми',  'семейството ми']  },
      { pronoun: 'ти',  cells: ['ти',  'родителите ти']   },
      { pronoun: 'той', cells: ['му',  'съпруга му']      },
      { pronoun: 'тя',  cells: ['й',   'мъжът й']         },
      { pronoun: 'то',  cells: ['му',  'баща му']         },
      { pronoun: 'ние', cells: ['ни',  'синът ни']        },
      { pronoun: 'Вие', cells: ['ви',  'внуците ви']      },
      { pronoun: 'те',  cells: ['им',  'детето им']       },
    ],
  },

  // ORDER 42 — Упр. 25: Кратки притежателни местоимения — упражнение
  {
    id: 'a2-l00-ex-25',
    type: 'dropdown_match',
    title: 'УПРАЖНЕНИЕ 26',
    instruction: 'Изберете правилната кратка притежателна форма.',
    instructionKey: 'a2.ex.pritezhatelnaMest',
    order: 42,
    points: 8,
    questions: [
      { id: 'pr01', left: 'Аз имам брат. Брат ___ се казва Виктор.',               options: ['ми', 'ти', 'му', 'й', 'ни', 'ви', 'им'], correctAnswer: 'ми' },
      { id: 'pr02', left: 'Ти имаш сестра. Сестра ___ е учителка.',                 options: ['ти', 'ми', 'му', 'й', 'ни', 'ви', 'им'], correctAnswer: 'ти' },
      { id: 'pr03', left: 'Той има дъщеря. Дъщеря ___ учи английски.',              options: ['му', 'ми', 'ти', 'й', 'ни', 'ви', 'им'], correctAnswer: 'му' },
      { id: 'pr04', left: 'Тя има съпруг. Съпругът ___ е бизнесмен.',               options: ['й', 'ми', 'ти', 'му', 'ни', 'ви', 'им'],  correctAnswer: 'й'  },
      { id: 'pr05', left: 'То е дете. Баща ___ е лекар.',                           options: ['му', 'ми', 'ти', 'й', 'ни', 'ви', 'им'], correctAnswer: 'му' },
      { id: 'pr06', left: 'Ние имаме внуци. Внуците ___ са умни.',                  options: ['ни', 'ми', 'ти', 'му', 'й', 'ви', 'им'],  correctAnswer: 'ни' },
      { id: 'pr07', left: 'Вие имате дете. Детето ___ е много малко.',              options: ['ви', 'ми', 'ти', 'му', 'й', 'ни', 'им'],  correctAnswer: 'ви' },
      { id: 'pr08', left: 'Те имат син. Синът ___ се жени тази година.',            options: ['им', 'ми', 'ти', 'му', 'й', 'ни', 'ви'],  correctAnswer: 'им' },
    ],
  },

  // ORDER 43 — Упр. 26: Показателни местоимения — справка
  {
    id: 'a2-l00-gramatika-13',
    type: 'grammar_table',
    title: 'ГРАМАТИКА — Показателни местоимения',
    subtitle: 'ТОЗИ, ТАЗИ, ТОВА, ТЕЗИ',
    instruction: 'Запознайте се с показателните местоимения. Натиснете за произношение.',
    order: 43,
    tableTitle: 'Показателни местоимения',
    columns: ['Мъжки род', 'Женски род', 'Среден род', 'Мн. число'],
    rows: [
      { pronoun: '', cells: ['ТОЗИ', 'ТАЗИ', 'ТОВА', 'ТЕЗИ'] },
    ],
    notes: [
      'ТОЗИ химикал, ТАЗИ тетрадка, ТОВА писмо, ТЕЗИ неща.',
    ],
  },

  // ORDER 44 — Упр. 26: Показателни местоимения — упражнение
  {
    id: 'a2-l00-ex-26',
    type: 'dropdown_match',
    title: 'УПРАЖНЕНИЕ 27',
    instruction: 'Изберете правилното показателно местоимение.',
    instructionKey: 'a2.ex.pokazatelniMest',
    order: 44,
    points: 7,
    questions: [
      { id: 'pk01', left: '___ химикалка е на брат ми. (ж.р.)',        options: ['Тази', 'Този', 'Това', 'Тези'],   correctAnswer: 'Тази' },
      { id: 'pk02', left: '___ огледало е на сестра му. (ср.р.)',      options: ['Това', 'Този', 'Тази', 'Тези'],   correctAnswer: 'Това' },
      { id: 'pk03', left: '___ паспорт е на сина ни. (м.р.)',          options: ['Този', 'Тази', 'Това', 'Тези'],   correctAnswer: 'Този' },
      { id: 'pk04', left: '___ пари са на родителите им. (мн.ч.)',     options: ['Тези', 'Този', 'Тази', 'Това'],   correctAnswer: 'Тези' },
      { id: 'pk05', left: '___ чадър е на баба ви. (м.р.)',            options: ['Този', 'Тази', 'Това', 'Тези'],   correctAnswer: 'Този' },
      { id: 'pk06', left: '___ лична карта е на жена ти. (ж.р.)',      options: ['Тази', 'Този', 'Това', 'Тези'],   correctAnswer: 'Тази' },
      { id: 'pk07', left: '___ чанти са на колежките ни. (мн.ч.)',     options: ['Тези', 'Този', 'Тази', 'Това'],   correctAnswer: 'Тези' },
    ],
  },

  // ORDER 45 — Упр. 27: Обобщителни местоимения — справка
  {
    id: 'a2-l00-gramatika-14',
    type: 'grammar_table',
    title: 'ГРАМАТИКА — Обобщителни местоимения',
    subtitle: 'ВСЕКИ, ВСЯКА, ВСЯКО, ВСИЧКИ',
    instruction: 'Запознайте се с обобщителните местоимения. Натиснете за произношение.',
    order: 45,
    tableTitle: 'Обобщителни местоимения',
    columns: ['Мъжки род', 'Женски род', 'Среден род', 'Мн. число'],
    rows: [
      { pronoun: '', cells: ['ВСЕКИ', 'ВСЯКА', 'ВСЯКО', 'ВСИЧКИ'] },
    ],
    notes: [
      'ВСЕКИ ден, ВСЯКА сутрин, ВСЯКО лято, ВСИЧКИ хора.',
    ],
  },

  // ORDER 46 — Упр. 27: Обобщителни местоимения — упражнение
  {
    id: 'a2-l00-ex-27',
    type: 'dropdown_match',
    title: 'УПРАЖНЕНИЕ 28',
    instruction: 'Изберете правилното обобщително местоимение.',
    instructionKey: 'a2.ex.obobshtitelniMest',
    order: 46,
    points: 7,
    questions: [
      { id: 'ob01', left: '___ уикенд ходя на кино. (м.р.)',        options: ['Всеки', 'Всяка', 'Всяко', 'Всички'],   correctAnswer: 'Всеки' },
      { id: 'ob02', left: '___ деца обичат сладолед. (мн.ч.)',      options: ['Всички', 'Всеки', 'Всяка', 'Всяко'],   correctAnswer: 'Всички'},
      { id: 'ob03', left: '___ месец отивам на село. (м.р.)',        options: ['Всеки', 'Всяка', 'Всяко', 'Всички'],   correctAnswer: 'Всеки' },
      { id: 'ob04', left: '___ сутрин виждам брат ти. (ж.р.)',       options: ['Всяка', 'Всеки', 'Всяко', 'Всички'],   correctAnswer: 'Всяка' },
      { id: 'ob05', left: '___ вечер давам пари на децата. (ж.р.)',  options: ['Всяка', 'Всеки', 'Всяко', 'Всички'],   correctAnswer: 'Всяка' },
      { id: 'ob06', left: '___ хора искат работа. (мн.ч.)',          options: ['Всички', 'Всеки', 'Всяка', 'Всяко'],   correctAnswer: 'Всички'},
      { id: 'ob07', left: '___ лято ходим на море. (ср.р.)',         options: ['Всяко', 'Всеки', 'Всяка', 'Всички'],   correctAnswer: 'Всяко' },
    ],
  },

  // ORDER 47 — Упр. 28: Въпросителни думи — справка
  {
    id: 'a2-l00-gramatika-15',
    type: 'grammar_table',
    title: 'ГРАМАТИКА — Въпросителни думи',
    subtitle: 'Какво, Какъв, Каква, Как, Кой, Коя, Кое, Откъде, Кога, Колко',
    instruction: 'Запознайте се с въпросителните думи. Натиснете за произношение.',
    order: 47,
    tableTitle: 'Въпросителни думи',
    columns: ['Въпрос', 'Питаме за'],
    rows: [
      { pronoun: 'Какво?',   cells: ['нещо (неутрален въпрос)', 'Какво е това?']                },
      { pronoun: 'Какъв?',   cells: ['характеристика (м.р.)',    'Какъв чай искате?']            },
      { pronoun: 'Каква?',   cells: ['характеристика (ж.р.)',    'Каква работа имате?']          },
      { pronoun: 'Как?',     cells: ['начин / общо състояние',   'Как сте?']                     },
      { pronoun: 'Кой?',     cells: ['лице или предмет (м.р.)',  'Кой е на вратата?']            },
      { pronoun: 'Коя?',     cells: ['лице или предмет (ж.р.)',  'Коя е столицата?']             },
      { pronoun: 'Кое?',     cells: ['лице или предмет (ср.р.)', 'Кое е правилно?']              },
      { pronoun: 'Откъде?',  cells: ['произход / движение',      'Откъде сте?']                  },
      { pronoun: 'Кога?',    cells: ['момент от времето',        'Кога заминавате?']             },
      { pronoun: 'Колко?',   cells: ['количество / цена',        'Колко струва?']                },
      { pronoun: '...ли?',   cells: ['да/не въпрос',             'Иракчанин ли си?']             },
      { pronoun: 'Къде?',    cells: ['място',                    'Къде живеете?']                },
    ],
  },

  // ORDER 48 — Упр. 28а: Въпросителни думи — упражнение (часть 1)
  {
    id: 'a2-l00-ex-28a',
    type: 'dropdown_match',
    title: 'УПРАЖНЕНИЕ 29а',
    instruction: 'Изберете правилната въпросителна дума.',
    instructionKey: 'a2.ex.vaprositelniDumi',
    order: 48,
    points: 12,
    questions: [
      { id: 'vd01', left: '___ е това?',                                     options: ['Какво', 'Какъв', 'Как', 'Кой', 'Коя', 'Откъде', 'Кога', 'Колко'],  correctAnswer: 'Какво'  },
      { id: 'vd02', left: '___ правите всеки ден?',                          options: ['Какво', 'Какъв', 'Как', 'Кой', 'Откъде', 'Кога', 'Колко'],          correctAnswer: 'Какво'  },
      { id: 'vd03', left: '___ чай искате?',                                  options: ['Какъв', 'Какво', 'Как', 'Кой', 'Откъде', 'Кога', 'Колко'],          correctAnswer: 'Какъв'  },
      { id: 'vd04', left: '___ сте?',                                         options: ['Как', 'Какво', 'Какъв', 'Кой', 'Откъде', 'Кога', 'Колко'],          correctAnswer: 'Как'    },
      { id: 'vd05', left: '___ е на вратата?',                                options: ['Кой', 'Коя', 'Какво', 'Как', 'Откъде', 'Кога', 'Колко'],            correctAnswer: 'Кой'    },
      { id: 'vd06', left: '___ е столицата на България?',                     options: ['Коя', 'Кой', 'Какво', 'Как', 'Откъде', 'Кога', 'Колко'],            correctAnswer: 'Коя'    },
      { id: 'vd07', left: '___ е правилно?',                                  options: ['Кое', 'Кой', 'Коя', 'Какво', 'Как', 'Откъде'],                      correctAnswer: 'Кое'    },
      { id: 'vd08', left: '___ часа е?',                                       options: ['Колко', 'Какво', 'Как', 'Кой', 'Откъде', 'Кога'],                   correctAnswer: 'Колко'  },
      { id: 'vd09', left: '___ струва билетът?',                              options: ['Колко', 'Какво', 'Как', 'Кой', 'Откъде', 'Кога'],                   correctAnswer: 'Колко'  },
      { id: 'vd10', left: '___ братя имате?',                                 options: ['Колко', 'Какво', 'Как', 'Кой', 'Откъде', 'Кога'],                   correctAnswer: 'Колко'  },
      { id: 'vd11', left: '___ сте?',                                          options: ['Откъде', 'Как', 'Какво', 'Кой', 'Кога', 'Колко'],                   correctAnswer: 'Откъде' },
      { id: 'vd12', left: '___ живеете?',                                      options: ['Къде', 'Кога', 'Как', 'Откъде', 'Кой', 'Колко'],                    correctAnswer: 'Къде'   },
    ],
  },

  // ORDER 49 — Упр. 28б: Въпросителни думи — упражнение (часть 2)
  {
    id: 'a2-l00-ex-28b',
    type: 'dropdown_match',
    title: 'УПРАЖНЕНИЕ 29б',
    instruction: 'Изберете правилната въпросителна дума.',
    instructionKey: 'a2.ex.vaprositelniDumi',
    order: 49,
    points: 12,
    questions: [
      { id: 'vd13', left: '___ е спирката?',                                  options: ['Къде', 'Кога', 'Как', 'Откъде', 'Кой', 'Колко'],                    correctAnswer: 'Къде'   },
      { id: 'vd14', left: '___ заминавате за България?',                       options: ['Кога', 'Откъде', 'Как', 'Колко', 'Кой', 'Какво'],                   correctAnswer: 'Кога'   },
      { id: 'vd15', left: '___ пристига влакът?',                              options: ['Кога', 'Откъде', 'Как', 'Колко', 'Кой', 'Какво'],                   correctAnswer: 'Кога'   },
      { id: 'vd16', left: '___ пътува автобусът от София?',                    options: ['Откъде', 'Кога', 'Как', 'Колко', 'Кой', 'Какво'],                   correctAnswer: 'Откъде' },
      { id: 'vd17', left: '___ минути закъснява влакът?',                      options: ['Колко', 'Кога', 'Как', 'Откъде', 'Кой', 'Какво'],                   correctAnswer: 'Колко'  },
      { id: 'vd18', left: '___ е времето?',                                     options: ['Какво', 'Какъв', 'Как', 'Кой', 'Откъде', 'Кога'],                   correctAnswer: 'Какво'  },
      { id: 'vd19', left: '___ е адресът на болницата?',                       options: ['Какъв', 'Какво', 'Как', 'Кой', 'Откъде', 'Кога'],                   correctAnswer: 'Какъв'  },
      { id: 'vd20', left: '___ работи здравният кабинет?',                     options: ['Кога', 'Откъде', 'Как', 'Колко', 'Кой', 'Какво'],                   correctAnswer: 'Кога'   },
      { id: 'vd21', left: '___ струва един телефонен разговор?',               options: ['Колко', 'Кога', 'Как', 'Откъде', 'Кой', 'Какво'],                   correctAnswer: 'Колко'  },
      { id: 'vd22', left: '___ работа търсите?',                               options: ['Каква', 'Какво', 'Какъв', 'Как', 'Кой', 'Откъде'],                  correctAnswer: 'Каква'  },
      { id: 'vd23', left: '___ се казвате?',                                    options: ['Как', 'Какво', 'Какъв', 'Кой', 'Откъде', 'Кога'],                   correctAnswer: 'Как'    },
      { id: 'vd24', left: '___ се връщате от работа?',                         options: ['Кога', 'Откъде', 'Как', 'Колко', 'Кой', 'Какво'],                   correctAnswer: 'Кога'   },
    ],
  },

];

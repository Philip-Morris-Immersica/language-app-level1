import type { Exercise, GrammarTableExercise } from '@/content/types';
import type { A2ImageLabelingExercise, A2WideCardsExercise, A2PictureDropdownExercise, A2DragToColumnsExercise, A2GroupedDropdownExercise } from '../../types';

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
        ttsPrompt: 'Произнеси думата България като една цяла дума, с естествено темпо и ясно българско „р".',
      },
      {
        id: 'sy', imageUrl: `${BASE}/02-upr-02-darzhavi-nacionalnosti/02-siriya.jpg`,
        label: 'Сирия', sublabels: ['сириец', 'сирийка', 'сирийци'],
        ttsPrompt: 'Произнеси думата Сирия като една цяла дума, с естествено темпо и ясно българско „р".',
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
      { id: 'sy-m',  left: 'Той е от Сирия. Той е ….',   options: ['сириец', 'иракчанин', 'иранец', 'украинец'],   correctAnswer: 'сириец'    },
      { id: 'sy-f',  left: 'Тя е от Сирия. Тя е ….',    options: ['сирийка', 'иракчанка', 'иранка', 'украинка'],   correctAnswer: 'сирийка'   },
      { id: 'sy-pl', left: 'Те са от Сирия. Те са ….',  options: ['сирийци', 'иракчани', 'иранци', 'украинци'],   correctAnswer: 'сирийци'   },
      // Ирак
      { id: 'iq-m',  left: 'Той е от Ирак. Той е ….',   options: ['иракчанин', 'сириец', 'иранец', 'украинец'],   correctAnswer: 'иракчанин' },
      { id: 'iq-f',  left: 'Тя е от Ирак. Тя е ….',    options: ['иракчанка', 'сирийка', 'иранка', 'украинка'],   correctAnswer: 'иракчанка' },
      { id: 'iq-pl', left: 'Те са от Ирак. Те са ….',  options: ['иракчани', 'сирийци', 'иранци', 'украинци'],   correctAnswer: 'иракчани'  },
      // Иран
      { id: 'ir-m',  left: 'Той е от Иран. Той е ….',   options: ['иранец', 'сириец', 'иракчанин', 'украинец'],   correctAnswer: 'иранец'    },
      { id: 'ir-f',  left: 'Тя е от Иран. Тя е ….',    options: ['иранка', 'сирийка', 'иракчанка', 'украинка'],   correctAnswer: 'иранка'    },
      { id: 'ir-pl', left: 'Те са от Иран. Те са ….',  options: ['иранци', 'сирийци', 'иракчани', 'украинци'],   correctAnswer: 'иранци'    },
      // Украйна
      { id: 'ua-m',  left: 'Той е от Украйна. Той е ….',  options: ['украинец', 'сириец', 'иракчанин', 'иранец'],  correctAnswer: 'украинец'  },
      { id: 'ua-f',  left: 'Тя е от Украйна. Тя е ….',   options: ['украинка', 'сирийка', 'иракчанка', 'иранка'],  correctAnswer: 'украинка'  },
      { id: 'ua-pl', left: 'Те са от Украйна. Те са ….',  options: ['украинци', 'сирийци', 'иракчани', 'иранци'],  correctAnswer: 'украинци'  },
    ],
  },

  // ORDER 4 — Упр. 3: Числа (дропдаун — изберете правилното изписване)
  {
    id: 'a2-l00-ex-03',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 4',
    instruction: 'Изберете правилното изписване с думи за числата.',
    order: 4,
    points: 16,
    layout: 'single',
    sentences: [
      // ред а: 0–10
      { text: '7 → _______', blanks: [2], correctAnswers: ['седем'], options: ['седем', 'шест', 'осем'] },
      { text: '9 → _______', blanks: [2], correctAnswers: ['девет'], options: ['девет', 'десет', 'осем'] },
      // ред б: 11–20
      { text: '14 → _______', blanks: [2], correctAnswers: ['четиринадесет'], options: ['четиринадесет', 'тринадесет', 'петнадесет'] },
      { text: '17 → _______', blanks: [2], correctAnswers: ['седемнадесет'], options: ['седемнадесет', 'шестнадесет', 'осемнадесет'] },
      // ред в: десетици
      { text: '40 → _______', blanks: [2], correctAnswers: ['четиридесет'], options: ['четиридесет', 'четиринадесет', 'петдесет'] },
      { text: '70 → _______', blanks: [2], correctAnswers: ['седемдесет'], options: ['седемдесет', 'шестдесет', 'осемдесет'] },
      // ред г: стотици
      { text: '400 → _______', blanks: [2], correctAnswers: ['четиристотин'], options: ['четиристотин', 'четиридесет', 'петстотин'] },
      { text: '700 → _______', blanks: [2], correctAnswers: ['седемстотин'], options: ['седемстотин', 'седемдесет', 'шестстотин'] },
      // ред д: хиляди
      { text: '4000 → _______', blanks: [2], correctAnswers: ['четири хиляди'], options: ['четири хиляди', 'четиристотин', 'четиринадесет хиляди'] },
      { text: '7000 → _______', blanks: [2], correctAnswers: ['седем хиляди'], options: ['седем хиляди', 'седемстотин', 'седемдесет хиляди'] },
      // ред е: по-големи числа
      { text: '100 000 → _______', blanks: [2], correctAnswers: ['сто хиляди'], options: ['сто хиляди', 'сто', 'десет хиляди'] },
      { text: '1 000 000 → _______', blanks: [2], correctAnswers: ['един милион'], options: ['един милион', 'сто хиляди', 'един милиард'] },
      // ред ж: смесени
      { text: '57 → _______', blanks: [2], correctAnswers: ['петдесет и седем'], options: ['петдесет и седем', 'седемдесет и пет', 'четиридесет и седем'] },
      { text: '483 → _______', blanks: [2], correctAnswers: ['четиристотин осемдесет и три'], options: ['четиристотин осемдесет и три', 'четиристотин и три', 'триста осемдесет и четири'] },
      // ред з: редни числителни
      { text: '3-ти → _______', blanks: [2], correctAnswers: ['трети'], options: ['трети', 'третия', 'три'] },
      { text: '10-ти → _______', blanks: [2], correctAnswers: ['десети'], options: ['десети', 'десет', 'десетия'] },
    ],
  },

  // ORDER 5 — Упр. 4: Плодове и зеленчуци
  {
    id: 'a2-l00-ex-04',
    type: 'a2-image-labeling',
    title: 'УПРАЖНЕНИЕ 5',
    instruction: 'Изберете правилното наименование под всяка картинка.',
    order: 5,
    points: 12,
    images: [
      { id: 'yabalka',    imageUrl: `${BASE}/03-upr-04-plodove-zelenchuci/01-yabalka.jpg`,    correctLabel: 'ябълка',     options: ['ябълка', 'круша', 'лимон', 'домат', 'портокал']    },
      { id: 'krusha',     imageUrl: `${BASE}/03-upr-04-plodove-zelenchuci/02-krusha.jpg`,     correctLabel: 'круша',      options: ['круша', 'ябълка', 'грозде', 'лимон', 'диня']       },
      { id: 'grozde',     imageUrl: `${BASE}/03-upr-04-plodove-zelenchuci/03-grozde.jpg`,     correctLabel: 'грозде',     options: ['грозде', 'диня', 'лимон', 'ябълка', 'портокал']    },
      { id: 'limon',      imageUrl: `${BASE}/03-upr-04-plodove-zelenchuci/04-limon.jpg`,      correctLabel: 'лимон',      options: ['лимон', 'портокал', 'ябълка', 'круша', 'домат']    },
      { id: 'portokal',   imageUrl: `${BASE}/03-upr-04-plodove-zelenchuci/05-portokal.jpg`,   correctLabel: 'портокал',   options: ['портокал', 'лимон', 'диня', 'ябълка', 'грозде']    },
      { id: 'dinya',      imageUrl: `${BASE}/03-upr-04-plodove-zelenchuci/06-dinya.jpg`,      correctLabel: 'диня',       options: ['диня', 'грозде', 'портокал', 'ябълка', 'краставица'] },
      { id: 'domat',      imageUrl: `${BASE}/03-upr-04-plodove-zelenchuci/07-domat.jpg`,      correctLabel: 'домат',      options: ['домат', 'чушка', 'краставица', 'картоф', 'морков'] },
      { id: 'chushka',    imageUrl: `${BASE}/03-upr-04-plodove-zelenchuci/08-chushka.jpg`,    correctLabel: 'чушка',      options: ['чушка', 'домат', 'краставица', 'морков', 'картоф'] },
      { id: 'morkov',     imageUrl: `${BASE}/03-upr-04-plodove-zelenchuci/09-morkov.jpg`,     correctLabel: 'морков',     options: ['морков', 'картоф', 'чушка', 'краставица', 'лук']   },
      { id: 'krastavitsa',imageUrl: `${BASE}/03-upr-04-plodove-zelenchuci/10-krastavitsa.jpg`,correctLabel: 'краставица', options: ['краставица', 'чушка', 'домат', 'морков', 'лук']    },
      { id: 'kartof',     imageUrl: `${BASE}/03-upr-04-plodove-zelenchuci/11-kartof.jpg`,     correctLabel: 'картоф',     options: ['картоф', 'лук', 'морков', 'чушка', 'домат']        },
      { id: 'luk',        imageUrl: `${BASE}/03-upr-04-plodove-zelenchuci/12-luk.jpg`,        correctLabel: 'лук',        options: ['лук', 'картоф', 'морков', 'краставица', 'чушка']   },
    ],
  } as A2ImageLabelingExercise,

  // ORDER 6 — Упр. 5: Хранителни продукти
  {
    id: 'a2-l00-ex-05',
    type: 'a2-image-labeling',
    title: 'УПРАЖНЕНИЕ 6',
    instruction: 'Изберете правилното наименование под всяка картинка.',
    order: 6,
    points: 12,
    images: [
      { id: 'brashno',       imageUrl: `${BASE}/04-upr-05-hrani-produkti/01-brashno.jpg`,       correctLabel: 'брашно',       options: ['брашно', 'боб', 'ориз', 'леща', 'олио']                  },
      { id: 'bob',           imageUrl: `${BASE}/04-upr-05-hrani-produkti/02-bob.jpg`,           correctLabel: 'боб',          options: ['боб', 'леща', 'ориз', 'брашно', 'олио']                  },
      { id: 'oriz',          imageUrl: `${BASE}/04-upr-05-hrani-produkti/03-oriz.jpg`,          correctLabel: 'ориз',         options: ['ориз', 'боб', 'леща', 'брашно', 'бисквити']              },
      { id: 'leshta',        imageUrl: `${BASE}/04-upr-05-hrani-produkti/04-leshta.jpg`,        correctLabel: 'леща',         options: ['леща', 'боб', 'ориз', 'брашно', 'олио']                  },
      { id: 'biskviti',      imageUrl: `${BASE}/04-upr-05-hrani-produkti/05-biskviti.jpg`,      correctLabel: 'бисквити',     options: ['бисквити', 'брашно', 'олио', 'ориз', 'сирене']           },
      { id: 'olio',          imageUrl: `${BASE}/04-upr-05-hrani-produkti/06-olio.jpg`,          correctLabel: 'олио',         options: ['олио', 'брашно', 'боб', 'ориз', 'риба']                  },
      { id: 'riba',          imageUrl: `${BASE}/04-upr-05-hrani-produkti/07-riba.jpg`,          correctLabel: 'риба',         options: ['риба', 'пиле', 'сирене', 'кашкавал', 'олио']             },
      { id: 'pile',          imageUrl: `${BASE}/04-upr-05-hrani-produkti/08-pile.jpg`,          correctLabel: 'пиле',         options: ['пиле', 'риба', 'сирене', 'кашкавал', 'боб']              },
      { id: 'sirene',        imageUrl: `${BASE}/04-upr-05-hrani-produkti/09-sirene.jpg`,        correctLabel: 'сирене',       options: ['сирене', 'кашкавал', 'прясно мляко', 'кисело мляко', 'риба'] },
      { id: 'kashkaval',     imageUrl: `${BASE}/04-upr-05-hrani-produkti/10-kashkaval.jpg`,     correctLabel: 'кашкавал',     options: ['кашкавал', 'сирене', 'прясно мляко', 'кисело мляко', 'пиле'] },
      { id: 'pryasno-mlyako',imageUrl: `${BASE}/04-upr-05-hrani-produkti/11-pryasno-mlyako.jpg`,correctLabel: 'прясно мляко', options: ['прясно мляко', 'кисело мляко', 'сирене', 'кашкавал', 'олио'] },
      { id: 'kiselo-mlyako', imageUrl: `${BASE}/04-upr-05-hrani-produkti/12-kiselo-mlyako.jpg`, correctLabel: 'кисело мляко', options: ['кисело мляко', 'прясно мляко', 'сирене', 'кашкавал', 'боб']  },
    ],
  } as A2ImageLabelingExercise,

  // ORDER 7 — Упр. 6: Храни и напитки
  {
    id: 'a2-l00-ex-06',
    type: 'a2-image-labeling',
    title: 'УПРАЖНЕНИЕ 7',
    instruction: 'Изберете правилното наименование под всяка картинка.',
    order: 7,
    points: 12,
    images: [
      { id: 'salata',    imageUrl: `${BASE}/05-upr-06-hrani-napitki/01-salata.jpg`,    correctLabel: 'салата',   options: ['салата', 'супа', 'омлет', 'пица', 'спагети']   },
      { id: 'kyufteta',  imageUrl: `${BASE}/05-upr-06-hrani-napitki/02-kyufteta.jpg`,  correctLabel: 'кюфте',    options: ['кюфте', 'омлет', 'супа', 'салата', 'пица']     },
      { id: 'omlet',     imageUrl: `${BASE}/05-upr-06-hrani-napitki/03-omlet.jpg`,     correctLabel: 'омлет',    options: ['омлет', 'кюфте', 'салата', 'супа', 'пица']     },
      { id: 'supa',      imageUrl: `${BASE}/05-upr-06-hrani-napitki/04-supa.jpg`,      correctLabel: 'супа',     options: ['супа', 'салата', 'спагети', 'омлет', 'пица']   },
      { id: 'pitsa',     imageUrl: `${BASE}/05-upr-06-hrani-napitki/05-pitsa.jpg`,     correctLabel: 'пица',     options: ['пица', 'спагети', 'салата', 'супа', 'омлет']   },
      { id: 'spageti',   imageUrl: `${BASE}/05-upr-06-hrani-napitki/06-spageti.jpg`,   correctLabel: 'спагети',  options: ['спагети', 'пица', 'супа', 'салата', 'кюфте']   },
      { id: 'voda',      imageUrl: `${BASE}/05-upr-06-hrani-napitki/07-voda.jpg`,      correctLabel: 'вода',     options: ['вода', 'сок', 'чай', 'кафе', 'кола']          },
      { id: 'kafe',      imageUrl: `${BASE}/05-upr-06-hrani-napitki/08-kafe.jpg`,      correctLabel: 'кафе',     options: ['кафе', 'чай', 'капучино', 'вода', 'сок']      },
      { id: 'chay',      imageUrl: `${BASE}/05-upr-06-hrani-napitki/09-chay.jpg`,      correctLabel: 'чай',      options: ['чай', 'кафе', 'вода', 'сок', 'капучино']      },
      { id: 'sok',       imageUrl: `${BASE}/05-upr-06-hrani-napitki/10-sok.jpg`,       correctLabel: 'сок',      options: ['сок', 'вода', 'кола', 'чай', 'кафе']          },
      { id: 'kapuchino', imageUrl: `${BASE}/05-upr-06-hrani-napitki/11-kapuchino.jpg`, correctLabel: 'капучино', options: ['капучино', 'кафе', 'чай', 'вода', 'сок']      },
      { id: 'kola',      imageUrl: `${BASE}/05-upr-06-hrani-napitki/12-kola.jpg`,      correctLabel: 'кола',     options: ['кола', 'сок', 'вода', 'чай', 'кафе']          },
    ],
  } as A2ImageLabelingExercise,

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
    title: 'УПРАЖНЕНИЕ',
    instruction: 'Изберете правилната роднинска връзка. Погледнете фамилното дърво.',
    instructionKey: 'a2.ex.semeystvo',
    order: 9,
    points: 13,
    imageUrl: `${BASE}/07-upr-08a-semeystvo-dimitrovi/01-semeystvo-dimitrovi.png`,
    questions: [
      { id: 'f01', left: 'Мария е … на Георги.',          options: ['майка', 'баща', 'сестра', 'баба'],         correctAnswer: 'майка',   isExample: true },
      { id: 'f02', left: 'Иван е … на Георги.',           options: ['баща', 'дядо', 'брат', 'чичо'],            correctAnswer: 'баща'     },
      { id: 'f03', left: 'Ана е … на Георги.',            options: ['съпруга', 'сестра', 'дъщеря', 'майка'],    correctAnswer: 'съпруга'  },
      { id: 'f04', left: 'Георги е … на Ана.',            options: ['съпруг', 'баща', 'дядо', 'чичо'],          correctAnswer: 'съпруг'   },
      { id: 'f05', left: 'Мила е … на Павел.',            options: ['сестра', 'дъщеря', 'майка', 'баба'],       correctAnswer: 'сестра'   },
      { id: 'f06', left: 'Павел е … на Мила.',            options: ['брат', 'баща', 'дядо', 'чичо'],            correctAnswer: 'брат'     },
      { id: 'f07', left: 'Мила е … на Георги и Ана.',     options: ['дъщеря', 'майка', 'сестра', 'внучка'],     correctAnswer: 'дъщеря'   },
      { id: 'f08', left: 'Павел е … на Георги и Ана.',    options: ['син', 'баща', 'брат', 'внук'],             correctAnswer: 'син'      },
      { id: 'f09', left: 'Георги и Ана са … на Мила и Павел.', options: ['родители', 'деца', 'баба и дядо', 'братя и сестри'], correctAnswer: 'родители' },
      { id: 'f10', left: 'Мила и Павел са … на Георги и Ана.', options: ['деца', 'родители', 'внуци', 'братя'], correctAnswer: 'деца'     },
      { id: 'f11', left: 'Мила е … на Иван и Мария.',     options: ['внучка', 'дъщеря', 'сестра', 'майка'],     correctAnswer: 'внучка'   },
      { id: 'f12', left: 'Павел е … на Иван и Мария.',    options: ['внук', 'син', 'брат', 'баща'],             correctAnswer: 'внук'     },
      { id: 'f13', left: 'Иван е … на Мила и Павел.',     options: ['дядо', 'баща', 'чичо', 'брат'],            correctAnswer: 'дядо'     },
      { id: 'f14', left: 'Мария е … на Мила и Павел.',    options: ['баба', 'майка', 'леля', 'сестра'],          correctAnswer: 'баба'     },
    ],
  },

  // ORDER 10 — Упр. 8б: Антоними
  {
    id: 'a2-l00-ex-08b',
    type: 'dropdown_match',
    title: 'УПРАЖНЕНИЕ',
    instruction: 'Изберете думата с противоположно значение на посочената.',
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

  // ORDER 11 — Упр. 9: Дни, месеци, сезони, времето, посоки — справочни блокове
  // По обратна връзка: думите се четат групирани (една група на блок, вертикален
  // списък), а не смесено по редове. Всяка дума има собствено произношение.
  // Блоковете след първия ползват title: '' (без хедър) → един общ хедър за всички.
  {
    id: 'a2-l00-gramatika-01a',
    type: 'grammar_table',
    title: 'УПРАЖНЕНИЕ 11',
    instruction: 'Натиснете върху дума за произношение.',
    order: 11,
    tableTitle: 'Дни',
    columns: [],
    rows: [
      { pronoun: 'понеделник', cells: [] },
      { pronoun: 'вторник',    cells: [] },
      { pronoun: 'сряда',      cells: [] },
      { pronoun: 'четвъртък',  cells: [] },
      { pronoun: 'петък',      cells: [], ttsModel: 'pro' }, // Flash mispronounces „петък" as „пътък"
      { pronoun: 'събота',     cells: [] },
      { pronoun: 'неделя',     cells: [] },
    ],
  },
  {
    id: 'a2-l00-gramatika-01b',
    type: 'grammar_table',
    title: '',
    order: 11.1,
    tableTitle: 'Месеци',
    columns: [],
    rows: [
      { pronoun: 'януари',    cells: [] },
      { pronoun: 'февруари',  cells: [] },
      { pronoun: 'март',      cells: [] },
      { pronoun: 'април',     cells: [] },
      { pronoun: 'май',       cells: [] },
      { pronoun: 'юни',       cells: [], ttsModel: 'pro', ttsPrompt: 'Bulgarian month name юни. Pronounce clearly with a final „и" sound, like "yoo-nee" — never "yoo-noo".' }, // Flash/Pro read final vowel as „у" instead of „и"
      { pronoun: 'юли',       cells: [], ttsModel: 'pro' }, // Flash mispronounces „юли"
      { pronoun: 'август',    cells: [] },
      { pronoun: 'септември', cells: [] },
      { pronoun: 'октомври',  cells: [] },
      { pronoun: 'ноември',   cells: [], ttsModel: 'pro' }, // Flash mispronounces „ноември"
      { pronoun: 'декември',  cells: [] },
    ],
  },
  {
    id: 'a2-l00-gramatika-01c',
    type: 'grammar_table',
    title: '',
    order: 11.2,
    tableTitle: 'Сезони',
    columns: [],
    rows: [
      { pronoun: 'пролет', cells: [] },
      { pronoun: 'лято',   cells: [] },
      { pronoun: 'есен',   cells: [] },
      { pronoun: 'зима',   cells: [] },
    ],
  },
  {
    id: 'a2-l00-gramatika-01d',
    type: 'grammar_table',
    title: '',
    order: 11.3,
    tableTitle: 'Време',
    columns: [],
    rows: [
      { pronoun: 'слънчево',  cells: [] },
      { pronoun: 'облачно',   cells: [] },
      { pronoun: 'дъждовно',  cells: [] },
      { pronoun: 'снежно',    cells: [] },
      { pronoun: 'ветровито', cells: [] },
      { pronoun: 'мъгливо',   cells: [] },
      { pronoun: 'топло',     cells: [] },
      { pronoun: 'студено',   cells: [] },
    ],
  },
  {
    id: 'a2-l00-gramatika-01e',
    type: 'grammar_table',
    title: '',
    order: 11.4,
    tableTitle: 'Посоки',
    columns: [],
    rows: [
      { pronoun: 'север', cells: [] },
      { pronoun: 'юг',    cells: [] },
      { pronoun: 'изток', cells: [], ttsModel: 'pro', ttsPrompt: 'Bulgarian word изток. Stress the first syllable, like EEZ-tok, not eez-TOK.' }, // Flash reads „изток" with a foreign accent / wrong stress
      { pronoun: 'запад', cells: [], ttsModel: 'pro' }, // Flash reads „запад" with an English accent
    ],
  },

  // ORDER 11.5 — Упр. 10: Дни, месеци, сезони, времето и посоки (интерактивна проверка)
  // Идва веднага след справочната таблица (по модела на A1 урок 7, упр. 14).
  {
    id: 'a2-l00-ex-09',
    type: 'dropdown_match',
    title: 'УПРАЖНЕНИЕ 12',
    instruction: 'Изберете правилния отговор.',
    order: 11.5,
    points: 12,
    questions: [
      // Дни на седмицата
      { id: 'd1', left: 'Първият ден от седмицата е ….',     options: ['понеделник', 'петък', 'неделя', 'сряда'],          correctAnswer: 'понеделник' },
      { id: 'd2', left: 'Петият ден от седмицата е ….',      options: ['петък', 'вторник', 'събота', 'четвъртък'],         correctAnswer: 'петък'      },
      { id: 'd3', left: 'Дните за почивка са събота и ….',   options: ['неделя', 'понеделник', 'сряда', 'петък'],          correctAnswer: 'неделя'     },
      // Месеци
      { id: 'm1', left: 'Първият месец от годината е ….',     options: ['януари', 'март', 'декември', 'юни'],               correctAnswer: 'януари'     },
      { id: 'm2', left: 'Последният месец от годината е ….',  options: ['декември', 'ноември', 'януари', 'октомври'],        correctAnswer: 'декември'   },
      // Сезони
      { id: 's1', left: 'Декември, януари и февруари са през ….', options: ['зимата', 'лятото', 'есента', 'пролетта'],      correctAnswer: 'зимата'     },
      { id: 's2', left: 'Юни, юли и август са през ….',      options: ['лятото', 'зимата', 'пролетта', 'есента'],          correctAnswer: 'лятото'     },
      // Времето
      { id: 'w1', left: 'Когато грее слънце, времето е ….',   options: ['слънчево', 'дъждовно', 'снежно', 'облачно'],       correctAnswer: 'слънчево'   },
      { id: 'w2', left: 'Когато вали дъжд, времето е ….',     options: ['дъждовно', 'слънчево', 'ветровито', 'мъгливо'],    correctAnswer: 'дъждовно'   },
      { id: 'w3', left: 'Когато вали сняг, времето е ….',     options: ['снежно', 'топло', 'слънчево', 'облачно'],          correctAnswer: 'снежно'     },
      // Посоки
      { id: 'p1', left: 'Слънцето изгрява на ….',            options: ['изток', 'запад', 'север', 'юг'],                   correctAnswer: 'изток'      },
      { id: 'p2', left: 'Слънцето залязва на ….',            options: ['запад', 'изток', 'север', 'юг'],                   correctAnswer: 'запад'      },
    ],
  },

  // ORDER 12 — Упр. 10: Цветове
  {
    id: 'a2-l00-ex-10',
    type: 'a2-image-labeling',
    title: 'УПРАЖНЕНИЕ 13',
    instruction: 'Изберете правилното наименование на цвета.',
    order: 12,
    points: 10,
    images: [
      { id: 'zeleno',   imageUrl: `${BASE}/08-upr-10-tsvetove/01-zeleno.jpg`,   correctLabel: 'зелено',   options: ['червено', 'синьо', 'жълто', 'зелено']    },
      { id: 'cherveno', imageUrl: `${BASE}/08-upr-10-tsvetove/02-cherveno.jpg`, correctLabel: 'червено',  options: ['розово', 'оранжево', 'жълто', 'червено'] },
      { id: 'sinyo',    imageUrl: `${BASE}/08-upr-10-tsvetove/03-sinyo.jpg`,    correctLabel: 'синьо',    options: ['зелено', 'лилаво', 'сиво', 'синьо']      },
      { id: 'zhalto',   imageUrl: `${BASE}/08-upr-10-tsvetove/04-zhalto.jpg`,   correctLabel: 'жълто',    options: ['оранжево', 'зелено', 'червено', 'жълто'] },
      { id: 'cherno',   imageUrl: `${BASE}/08-upr-10-tsvetove/05-cherno.jpg`,   correctLabel: 'черно',    options: ['сиво', 'синьо', 'кафяво', 'черно']      },
      { id: 'rozovo',   imageUrl: `${BASE}/08-upr-10-tsvetove/06-rozovo.jpg`,   correctLabel: 'розово',   options: ['червено', 'лилаво', 'оранжево', 'розово'] },
      { id: 'sivo',     imageUrl: `${BASE}/08-upr-10-tsvetove/07-sivo.jpg`,     correctLabel: 'сиво',     options: ['черно', 'синьо', 'кафяво', 'сиво']      },
      { id: 'oranzhevo',imageUrl: `${BASE}/08-upr-10-tsvetove/08-oranzhevo.jpg`,correctLabel: 'оранжево', options: ['жълто', 'червено', 'кафяво', 'оранжево'] },
      { id: 'kafyavo',  imageUrl: `${BASE}/08-upr-10-tsvetove/09-kafyavo.jpg`,  correctLabel: 'кафяво',   options: ['оранжево', 'жълто', 'сиво', 'кафяво']    },
      { id: 'lilavo',   imageUrl: `${BASE}/08-upr-10-tsvetove/10-lilavo.jpg`,   correctLabel: 'лилаво',   options: ['синьо', 'розово', 'червено', 'лилаво']    },
    ],
  } as A2ImageLabelingExercise,

  // ORDER 13 — Упр. 11: Дрехи и обувки
  {
    id: 'a2-l00-ex-11',
    type: 'a2-image-labeling',
    title: 'УПРАЖНЕНИЕ 14',
    instruction: 'Изберете правилното наименование под всяка картинка.',
    order: 13,
    points: 10,
    images: [
      { id: 'roklya',      imageUrl: `${BASE}/09-upr-11-drehi-obuvki/01-roklya.jpg`,      correctLabel: 'рокля',     options: ['пола', 'риза', 'яке', 'рокля']                  },
      { id: 'pulover',     imageUrl: `${BASE}/09-upr-11-drehi-obuvki/02-pulover.jpg`,     correctLabel: 'пуловер',   options: ['пуловер на райе', 'яке', 'риза', 'пуловер']       },
      { id: 'pola',        imageUrl: `${BASE}/09-upr-11-drehi-obuvki/03-pola.jpg`,        correctLabel: 'пола',      options: ['рокля', 'шорти', 'риза', 'пола']                  },
      { id: 'shorti',      imageUrl: `${BASE}/09-upr-11-drehi-obuvki/04-shorti.jpg`,      correctLabel: 'шорти',     options: ['дънки', 'пола', 'маратонки', 'шорти']              },
      { id: 'maratonki',   imageUrl: `${BASE}/09-upr-11-drehi-obuvki/05-maratonki.jpg`,   correctLabel: 'маратонки', options: ['обувки', 'дънки', 'шорти', 'маратонки']             },
      { id: 'danki',       imageUrl: `${BASE}/09-upr-11-drehi-obuvki/06-danki.jpg`,       correctLabel: 'дънки',     options: ['шорти', 'пола', 'маратонки', 'дънки']              },
      { id: 'riza',        imageUrl: `${BASE}/09-upr-11-drehi-obuvki/07-riza.jpg`,        correctLabel: 'риза',      options: ['рокля', 'пуловер', 'яке', 'риза']                  },
      { id: 'yake',        imageUrl: `${BASE}/09-upr-11-drehi-obuvki/08-yake.jpg`,        correctLabel: 'яке',       options: ['пуловер', 'риза', 'пуловер на райе', 'яке']       },
      { id: 'pulover-ray', imageUrl: `${BASE}/09-upr-11-drehi-obuvki/09-pulover-raye.jpg`,correctLabel: 'пуловер на райе', options: ['пуловер', 'яке', 'риза', 'пуловер на райе'] },
      { id: 'obuvki',      imageUrl: `${BASE}/09-upr-11-drehi-obuvki/10-obuvki.jpg`,      correctLabel: 'обувки',    options: ['маратонки', 'дънки', 'шорти', 'обувки']             },
    ],
  } as A2ImageLabelingExercise,

  // ORDER 14 — Упр. 12: Мебели и домакински уреди
  {
    id: 'a2-l00-ex-12',
    type: 'a2-image-labeling',
    title: 'УПРАЖНЕНИЕ 15',
    instruction: 'Изберете правилното наименование под всяка картинка.',
    order: 14,
    points: 10,
    images: [
      { id: 'stol',         imageUrl: `${BASE}/10-upr-12-meblei-uredi/01-stol.jpg`,         correctLabel: 'стол',         options: ['диван', 'легло', 'шкаф', 'стол']           },
      { id: 'leglo',        imageUrl: `${BASE}/10-upr-12-meblei-uredi/02-leglo.jpg`,        correctLabel: 'легло',        options: ['двойно легло', 'диван', 'шкаф', 'легло']    },
      { id: 'divan',        imageUrl: `${BASE}/10-upr-12-meblei-uredi/03-divan.jpg`,        correctLabel: 'диван',        options: ['легло', 'стол', 'двойно легло', 'диван']    },
      { id: 'leglo-dvoyno', imageUrl: `${BASE}/10-upr-12-meblei-uredi/04-leglo-dvoyno.jpg`, correctLabel: 'двойно легло',  options: ['легло', 'диван', 'шкаф', 'двойно легло']    },
      { id: 'shkaf',        imageUrl: `${BASE}/10-upr-12-meblei-uredi/05-shkaf.jpg`,        correctLabel: 'шкаф',         options: ['хладилник', 'печка', 'легло', 'шкаф']      },
      { id: 'peralnya',     imageUrl: `${BASE}/10-upr-12-meblei-uredi/06-peralnya.jpg`,     correctLabel: 'пералня',      options: ['печка', 'хладилник', 'шкаф', 'пералня'] },
      { id: 'pechka',       imageUrl: `${BASE}/10-upr-12-meblei-uredi/07-pechka.jpg`,       correctLabel: 'печка',        options: ['пералня', 'хладилник', 'шкаф', 'печка'] },
      { id: 'hladilnik',    imageUrl: `${BASE}/10-upr-12-meblei-uredi/08-hladilnik.jpg`,    correctLabel: 'хладилник',    options: ['пералня', 'печка', 'шкаф', 'хладилник'] },
      { id: 'televizor',    imageUrl: `${BASE}/10-upr-12-meblei-uredi/09-televizor.jpg`,    correctLabel: 'телевизор',    options: ['компютър', 'хладилник', 'печка', 'телевизор'] },
      { id: 'kompyutar',    imageUrl: `${BASE}/10-upr-12-meblei-uredi/10-kompyutar.jpg`,    correctLabel: 'компютър',     options: ['телевизор', 'хладилник', 'пералня', 'компютър'] },
    ],
  } as A2ImageLabelingExercise,

  // ORDER 15 — Упр. 13: Превозни средства
  {
    id: 'a2-l00-ex-13',
    type: 'image_labeling',
    title: 'УПРАЖНЕНИЕ 16',
    instruction: 'Изберете правилното наименование под всяка картинка.',
    order: 15,
    points: 5,
    displayType: 'default',
    images: [
      { id: 'kola',       imageUrl: `${BASE}/11-upr-13-prevozni-sredstva/01-kola.jpg`,       correctLabel: 'кола',      imageOptions: ['автобус', 'трамвай', 'тролейбус', 'кола']      },
      { id: 'avtobus',    imageUrl: `${BASE}/11-upr-13-prevozni-sredstva/02-avtobus.jpg`,    correctLabel: 'автобус',   imageOptions: ['кола', 'трамвай', 'тролейбус', 'автобус']      },
      { id: 'tramvay',    imageUrl: `${BASE}/11-upr-13-prevozni-sredstva/03-tramvay.jpg`,    correctLabel: 'трамвай',   imageOptions: ['кола', 'автобус', 'тролейбус', 'трамвай']      },
      { id: 'troleybus',  imageUrl: `${BASE}/11-upr-13-prevozni-sredstva/04-troleybus.jpg`,  correctLabel: 'тролейбус', imageOptions: ['кола', 'автобус', 'трамвай', 'тролейбус']      },
      { id: 'vlak',       imageUrl: `${BASE}/11-upr-13-prevozni-sredstva/05-vlak.jpg`,       correctLabel: 'влак',      imageOptions: ['кола', 'автобус', 'трамвай', 'влак']          },
    ],
    options: ['кола', 'автобус', 'трамвай', 'тролейбус', 'влак'],
  },

  // ORDER 16 — Упр. 14: Рутина на Георги
  {
    id: 'a2-l00-ex-14',
    type: 'a2-picture-dropdown',
    title: 'УПРАЖНЕНИЕ 17',
    instruction: 'Какво прави Георги всеки ден? Изберете правилния глагол или израз за всяка картинка.',
    order: 16,
    points: 10,
    layout: 'grid',
    questions: [
      { id: 'r01', left: 'Става в 8:00 часа',   leftImageUrl: `${BASE}/12-upr-14-georgi-rutina/01-stava-8ch.jpg`,      options: ['Става в 8:00 часа.', 'Взема душ.', 'Закусва.', 'Ляга.'],              correctAnswer: 'Става в 8:00 часа.'   },
      { id: 'r02', left: 'Взема душ',           leftImageUrl: `${BASE}/12-upr-14-georgi-rutina/02-dush.jpg`,           options: ['Взема душ.', 'Закусва.', 'Пазарува.', 'Спи.'],                       correctAnswer: 'Взема душ.'           },
      { id: 'r03', left: 'Закусва',             leftImageUrl: `${BASE}/12-upr-14-georgi-rutina/03-zakuska.jpg`,        options: ['Закусва.', 'Обядва.', 'Вечеря.', 'Взема душ.'],                      correctAnswer: 'Закусва.'             },
      { id: 'r04', left: 'Обядва в ресторант',  leftImageUrl: `${BASE}/12-upr-14-georgi-rutina/04-restorant.jpg`,     options: ['Обядва в ресторант.', 'Закусва.', 'Вечеря.', 'Среща се с приятели.'],correctAnswer: 'Обядва в ресторант.'  },
      { id: 'r05', left: 'Среща се с приятели', leftImageUrl: `${BASE}/12-upr-14-georgi-rutina/05-priyateli.jpg`,     options: ['Среща се с приятели.', 'Пазарува.', 'Гледа телевизия.', 'Обядва.'],  correctAnswer: 'Среща се с приятели.' },
      { id: 'r06', left: 'Пазарува в супера',   leftImageUrl: `${BASE}/12-upr-14-georgi-rutina/06-super.jpg`,         options: ['Пазарува в супера.', 'Готви.', 'Почива.', 'Обядва.'],                correctAnswer: 'Пазарува в супера.'   },
      { id: 'r07', left: 'Гледа телевизия',     leftImageUrl: `${BASE}/12-upr-14-georgi-rutina/07-televiziya.jpg`,    options: ['Гледа телевизия.', 'Пише имейли.', 'Чете книга.', 'Спи.'],          correctAnswer: 'Гледа телевизия.'     },
      { id: 'r08', left: 'Пише имейли',         leftImageUrl: `${BASE}/12-upr-14-georgi-rutina/08-imeyli.jpg`,        options: ['Пише имейли.', 'Гледа телевизия.', 'Чете книга.', 'Пазарува.'],     correctAnswer: 'Пише имейли.'         },
      { id: 'r09', left: 'Ляга след 23:00 часа',leftImageUrl: `${BASE}/12-upr-14-georgi-rutina/09-lyaga-sled-23ch.jpg`,options: ['Ляга след 23:00 часа.', 'Спи.', 'Закусва.', 'Гледа телевизия.'],    correctAnswer: 'Ляга след 23:00 часа.'},
      { id: 'r10', left: 'Спи до 8:00 часа',    leftImageUrl: `${BASE}/12-upr-14-georgi-rutina/10-spi-do-8ch.jpg`,    options: ['Спи до 8:00 часа.', 'Ляга.', 'Отдъхва.', 'Почива.'],               correctAnswer: 'Спи до 8:00 часа.'    },
    ],
  } as A2PictureDropdownExercise,

  // ═══════════════════════════════════════════════════════════════════════
  // ГРАМАТИКА (стр. 10–15)
  // ═══════════════════════════════════════════════════════════════════════

  // ORDER 17 — Упр. 15: Глаголът „съм" — справочна таблица
  {
    id: 'a2-l00-gramatika-02',
    type: 'grammar_table',
    title: 'ГРАМАТИКА — Глаголът „съм"',
    instruction: 'Запознайте се с формите на глагола „съм". Натиснете за произношение.',
    order: 17,
    tableTitle: 'Глаголът „съм" — сегашно време',
    columns: ['(+)', '(–)', '(?)'],
    rows: [
      { pronoun: 'аз',  cells: ['съм',  'не съм',  'ли съм']  },
      { pronoun: 'ти',  cells: ['си',   'не си',   'ли си'],   ttsText: 'Ти. Си. Не си. Ли си.'  },
      { pronoun: 'той', cells: ['е',    'не е',    'ли е']    },
      { pronoun: 'тя',  cells: ['е',    'не е',    'ли е']    },
      { pronoun: 'то',  cells: ['е',    'не е',    'ли е'],    ttsText: 'То. Е. Не е. Ли е.'   },
      { pronoun: 'ние', cells: ['сме',  'не сме',  'ли сме']  },
      { pronoun: 'вие', cells: ['сте',  'не сте',  'ли сте']  },
      { pronoun: 'те',  cells: ['са',   'не са',   'ли са']   },
    ],
    notes: [
      'Личното местоимение (аз, ти, той и т.н.) може да се изпусне. Тогава глаголът „съм" отива след подлога. Например:',
      'Аз съм сириец. → Сириец съм.',
      'Тя е учителка. → Учителка е.',
      'Той е инженер. → Инженер е.',
      'Ние сме приятели. → Приятели сме.',
    ],
    ttsNotes: [
      'Личното местоимение, аз, ти, той и така нататък, може да се изпусне. Тогава глаголът съм отива след подлога. Например:',
      'Аз съм сириец. Сириец съм.',
      'Тя е учителка. Учителка е.',
      'Той е инженер. Инженер е.',
      'Ние сме приятели. Приятели сме.',
    ],
    // note-0: думата „подлога" се изписва без диакритичен знак за ударение —
    // Gemini изпуска думата при combining accent (U+0300). Естественото
    // българско ударение е на първата сричка (ПО-длог), а Pro моделът чете с
    // правилно native ударение, затова знак не е нужен.
    ttsNoteModels: ['pro'],
  },

  // ORDER 18 — Упр. 15а: Изберете правилното местоимение
  {
    id: 'a2-l00-ex-15a',
    type: 'dropdown_match',
    title: 'УПРАЖНЕНИЕ',
    instruction: 'Изберете правилното лично местоимение.',
    instructionKey: 'a2.ex.glagolSamMest',
    order: 18,
    points: 8,
    questions: [
      { id: 's01', left: '… съм арабин.',      options: ['Ти', 'Той', 'Ние', 'Аз'],   correctAnswer: 'Аз'  },
      { id: 's02', left: '… си българин.',     options: ['Аз', 'Той', 'Вие', 'Ти'],   correctAnswer: 'Ти'  },
      { id: 's03', left: '… е афганистанец.',  options: ['Аз', 'Ти', 'Ние', 'Той'],   correctAnswer: 'Той' },
      { id: 's04', left: '… е арабка.',        options: ['Аз', 'Ти', 'Той', 'Тя'],   correctAnswer: 'Тя'  },
      { id: 's05', left: '… е от Украйна.',    options: ['Аз', 'Вие', 'Ние', 'Той'],   correctAnswer: 'Той' },
      { id: 's06', left: '… сме ливанци.',     options: ['Аз', 'Той', 'Вие', 'Ние'],          correctAnswer: 'Ние' },
      { id: 's07', left: '… сте алжирци.',     options: ['Аз', 'Ти', 'Ние', 'Вие'],                 correctAnswer: 'Вие' },
      { id: 's08', left: '… са африканци.',    options: ['Аз', 'Той', 'Ние', 'Те'],          correctAnswer: 'Те'  },
    ],
  },

  // ORDER 19 — Упр. 15б: Изберете правилната форма на „съм" (+/-)
  {
    id: 'a2-l00-ex-15b',
    type: 'dropdown_match',
    title: 'УПРАЖНЕНИЕ',
    instruction: 'Изберете правилната форма на глагола „съм".',
    instructionKey: 'a2.ex.glagolSamForm',
    order: 19,
    points: 16,
    questions: [
      // Положителна
      { id: 'p01', left: 'Аз … палестинец. (+)',     options: ['си', 'е', 'сме', 'съм'], correctAnswer: 'съм'    },
      { id: 'p02', left: 'Ти … българин. (+)',       options: ['съм', 'е', 'сме', 'си'], correctAnswer: 'си'     },
      { id: 'p03', left: 'Той … кюрд. (+)',          options: ['съм', 'си', 'сме', 'е'], correctAnswer: 'е'      },
      { id: 'p04', left: 'Тя … сирийка. (+)',        options: ['съм', 'си', 'сме', 'е'], correctAnswer: 'е'      },
      { id: 'p05', left: 'Ние … украинци. (+)',      options: ['съм', 'си', 'е', 'сме'], correctAnswer: 'сме'    },
      { id: 'p06', left: 'Вие … иракчани. (+)',      options: ['съм', 'е', 'сме', 'сте'], correctAnswer: 'сте'    },
      { id: 'p07', left: 'Те … афганистанци. (+)',   options: ['съм', 'е', 'сме', 'са'], correctAnswer: 'са'     },
      { id: 'p08', left: 'То … от Ирак. (+)',        options: ['съм', 'си', 'сме', 'е'], correctAnswer: 'е'      },
      // Отрицателна
      { id: 'n01', left: 'Аз … ливанец. (–)',        options: ['не си', 'не е', 'не сме', 'не съм'], correctAnswer: 'не съм' },
      { id: 'n02', left: 'Ти … иранец. (–)',         options: ['не съм', 'не е', 'не сме', 'не си'], correctAnswer: 'не си'  },
      { id: 'n03', left: 'Той … сириец. (–)',        options: ['не съм', 'не си', 'не сме', 'не е'], correctAnswer: 'не е'   },
      { id: 'n04', left: 'Тя … алжирка. (–)',        options: ['не съм', 'не си', 'не сме', 'не е'], correctAnswer: 'не е'   },
      { id: 'n05', left: 'Ние … палестинци. (–)',    options: ['не съм', 'не е', 'не сте', 'не сме'], correctAnswer: 'не сме' },
      { id: 'n06', left: 'Вие … сирийци. (–)',       options: ['не съм', 'не е', 'не сме', 'не сте'], correctAnswer: 'не сте' },
      { id: 'n07', left: 'Те … българи. (–)',        options: ['не съм', 'не е', 'не сме', 'не са'], correctAnswer: 'не са'  },
      { id: 'n08', left: 'То … от Афганистан. (–)', options: ['не съм', 'не си', 'не сме', 'не е'], correctAnswer: 'не е'   },
    ],
  },

  // ORDER 20 — Упр. 15в: Въпросителна форма на „съм"
  {
    id: 'a2-l00-ex-15v',
    type: 'dropdown_match',
    title: 'УПРАЖНЕНИЕ',
    instruction: 'Изберете правилната въпросителна форма на глагола „съм".',
    instructionKey: 'a2.ex.glagolSamVapros',
    order: 20,
    points: 8,
    questions: [
      { id: 'v01', left: 'Аз бежанец …?',        options: ['ли си', 'ли е', 'ли сме', 'ли съм'],  correctAnswer: 'ли съм' },
      { id: 'v02', left: 'Ти българин …?',        options: ['ли съм', 'ли е', 'ли сме', 'ли си'],  correctAnswer: 'ли си'  },
      { id: 'v03', left: 'Той иракчанин …?',      options: ['ли съм', 'ли си', 'ли сме', 'ли е'],  correctAnswer: 'ли е'   },
      { id: 'v04', left: 'Тя бежанка …?',         options: ['ли съм', 'ли си', 'ли сме', 'ли е'],  correctAnswer: 'ли е'   },
      { id: 'v05', left: 'То от Афганистан …?',   options: ['ли съм', 'ли си', 'ли сме', 'ли е'],  correctAnswer: 'ли е'   },
      { id: 'v06', left: 'Ние иранци …?',         options: ['ли съм', 'ли си', 'ли е', 'ли сме'],  correctAnswer: 'ли сме' },
      { id: 'v07', left: 'Вие кюрди …?',          options: ['ли съм', 'ли е', 'ли сме', 'ли сте'],  correctAnswer: 'ли сте' },
      { id: 'v08', left: 'Те араби …?',           options: ['ли съм', 'ли е', 'ли сме', 'ли са'],  correctAnswer: 'ли са'  },
    ],
  },

  // ORDER 21 — Упр. 16: Род на съществителните — справочна таблица
  {
    id: 'a2-l00-gramatika-03',
    type: 'grammar_table',
    title: 'ГРАМАТИКА — Род на съществителните',
    instruction: 'Запознайте се с моделите за определяне на рода. Натиснете за произношение.',
    order: 21,
    tableTitle: 'Род на съществителните',
    columns: ['', 'Пример'],
    rows: [
      { pronoun: 'м.р.', cells: ['един', 'хляб, чай'], ttsText: 'Мъжки род. Един. Хляб, чай.' },
      { pronoun: 'ж.р.', cells: ['една', 'пица, филия'], ttsText: 'Женски род. Една. Пица, филия.' },
      { pronoun: 'ср.р.', cells: ['едно', 'кафе, масло'], ttsText: 'Среден род. Едно. Кафе, масло.' },
    ],
  },

  // ORDER 22 — Упр. 16: Поставете думите в правилната колона
  {
    id: 'a2-l00-ex-16',
    type: 'a2-drag-to-columns',
    title: 'УПРАЖНЕНИЕ 23',
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
        title: 'ЕДИН',
        icon: '♂',
        correctItems: ['десерт', 'дюнер', 'кроасан', 'салам', 'сладолед', 'чай', 'шоколад'],
      },
      {
        id: 'zhen',
        title: 'ЕДНА',
        icon: '♀',
        correctItems: ['баница', 'захар', 'мусака', 'сметана', 'цигара'],
      },
      {
        id: 'sred',
        title: 'ЕДНО',
        icon: '⚬',
        correctItems: ['кебапче', 'кюфте', 'шишче', 'яйце'],
      },
    ],
  } as A2DragToColumnsExercise,

  // ORDER 23 — Упр. 17: Множествено число — справочна таблица
  {
    id: 'a2-l00-gramatika-04',
    type: 'grammar_table',
    title: 'ГРАМАТИКА — Множествено число',
    instruction: 'Запознайте се с формите за множествено число. Натиснете за произношение.',
    order: 23,
    tableTitle: 'Множествено число на съществителните',
    columns: ['Единствено число', 'Много (мн.ч.)', 'Два/Две'],
    rows: [
      // Мъжки род
      { pronoun: 'м.р.', cells: ['лимон', 'лимон**и**', 'два лимон**а**'], ttsText: 'лимон. лимони. два лимона.' },
      { pronoun: '', cells: ['портокал', 'портокал**и**', 'два портокал**а**'], ttsText: 'портокал. портокали. два портокала.', ttsModel: 'pro' },
      // Женски род
      { pronoun: 'ж.р.', cells: ['ябълка', 'ябълк**и**', 'две ябълк**и**'], ttsText: 'ябълка. ябълки. две ябълки.' },
      { pronoun: '', cells: ['круша', 'круш**и**', 'две круш**и**'], ttsText: 'круша. круши. две круши.' },
      // Среден род
      { pronoun: 'ср.р.', cells: ['кафе', 'кафе**та**', 'две кафе**та**'], ttsText: 'кафе. кафета. две кафета.' },
      {
        pronoun: '', cells: ['пиле', 'пиле**та**', 'две пиле**та**'], ttsText: 'пиле. пилета. две пилета.',
        ttsModel: 'pro',
        ttsPrompt: 'Read aloud in a warm, welcoming tone, in clear standard Bulgarian with natural native pronunciation and correct stress. Pronounce the consonant "л" as a hard, dark /l/ (твърдо българско Л), never a soft/palatalized л.',
      },
    ],
  },

  // ORDER 24 — Упр. 17: Попълнете формите за множествено число
  {
    id: 'a2-l00-ex-17',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 25',
    instruction: 'Изберете правилната форма за множествено число.',
    instructionKey: 'a2.ex.mnozhestveno',
    order: 24,
    points: 18,
    layout: 'two-column',
    sentences: [
      { text: 'гъба → много _______',       blanks: [3], correctAnswers: ['гъби'],    options: ['гъби', 'гъбове', 'гъба']             },
      { text: 'домат → два _______',        blanks: [3], correctAnswers: ['домата'],  options: ['домата', 'домати', 'домат']          },
      { text: 'краставица → много _______', blanks: [3], correctAnswers: ['краставици'], options: ['краставици', 'краставичи', 'краставица'] },
      { text: 'масло → много _______',      blanks: [3], correctAnswers: ['масла'],   options: ['масла', 'маслета', 'масло']          },
      { text: 'банан → два _______',        blanks: [3], correctAnswers: ['банана'],  options: ['банана', 'банани', 'банан']          },
      { text: 'ягода → две _______',        blanks: [3], correctAnswers: ['ягоди'],   options: ['ягоди', 'ягодета', 'ягода']          },
      { text: 'плод → много _______',       blanks: [3], correctAnswers: ['плодове'], options: ['плодове', 'плоди', 'плод']            },
      { text: 'морков → два _______',       blanks: [3], correctAnswers: ['моркова'], options: ['моркова', 'моркови', 'морков']        },
      { text: 'пъпеш → много _______',      blanks: [3], correctAnswers: ['пъпеши'],  options: ['пъпеши', 'пъпешове', 'пъпеш']         },
      { text: 'диня → две _______',         blanks: [3], correctAnswers: ['дини'],    options: ['дини', 'динета', 'диня']             },
      { text: 'праскова → много _______',   blanks: [3], correctAnswers: ['праскови'], options: ['праскови', 'прасковета', 'праскова'] },
      { text: 'слива → две _______',        blanks: [3], correctAnswers: ['сливи'],   options: ['сливи', 'сливета', 'слива']          },
      { text: 'смокиня → две _______',      blanks: [3], correctAnswers: ['смокини'], options: ['смокини', 'смокинета', 'смокиня']    },
      { text: 'мляко → две _______',        blanks: [3], correctAnswers: ['млека'],   options: ['млека', 'млекове', 'мляко']          },
      { text: 'тиквичка → много _______',   blanks: [3], correctAnswers: ['тиквички'], options: ['тиквички', 'тиквичета', 'тиквичка'] },
      { text: 'маруля → две _______',       blanks: [3], correctAnswers: ['марули'],  options: ['марули', 'марулета', 'маруля']        },
      { text: 'череша → две _______',       blanks: [3], correctAnswers: ['череши'],  options: ['череши', 'черешета', 'череша']        },
      { text: 'чушка → много _______',      blanks: [3], correctAnswers: ['чушки'],   options: ['чушки', 'чушкета', 'чушка']           },
    ],
  },

  // ORDER 24.1 — Множествено число, мъжки род (за хора) — справочна таблица
  {
    id: 'a2-l00-gramatika-11b',
    type: 'grammar_table',
    title: 'ГРАМАТИКА — Множествено число, мъжки род (за хора)',
    instruction: 'Запознайте се с формите за множествено число на мъжки род при думи за хора. Натиснете за произношение.',
    order: 24.1,
    tableTitle: 'Множествено число, мъжки род — за хора',
    columns: ['Много', 'Двама / трима / четирима'],
    rows: [
      { pronoun: 'син',    cells: ['синове',  'синове'], ttsText: 'син. много синове. двама, трима и четирИма синове.' },
      { pronoun: 'учител', cells: ['учители', 'учители'], ttsText: 'учител. много учители. двама, трима и четирИма учители.' },
      { pronoun: 'човек',  cells: ['хора',    'души'],   ttsText: 'човек. много хора. двама, трима и четирИма души.' },
    ],
  },

  // ORDER 24.2 — Особени форми за множествено число — справочна таблица
  {
    id: 'a2-l00-gramatika-11c',
    type: 'grammar_table',
    title: 'ГРАМАТИКА — Особени форми за множествено число',
    instruction: 'Запознайте се с особените форми за множествено число. Натиснете за произношение.',
    order: 24.2,
    tableTitle: 'Особени форми за множествено число',
    columns: ['Множествено число'],
    rows: [
      { pronoun: 'мъж',  cells: ['мъже'],    ttsText: 'мъж. мъже.'    },
      { pronoun: 'брат', cells: ['братя'],   ttsText: 'брат. братя.'  },
      { pronoun: 'дядо', cells: ['дядовци'], ttsText: 'дядо. дядовци.' },
      { pronoun: 'внук', cells: ['внуци'],   ttsText: 'внук. внуци.'  },
      { pronoun: 'дете', cells: ['деца'],    ttsText: 'дете. деца.'   },
    ],
    notes: [
      'един човек, двама души, много хора.',
    ],
    ttsNotes: [
      'един човек, двама души, много хора.',
    ],
  },

  // ORDER 24.3 — Множествено число, мъжки род (за хора) — упражнение
  {
    id: 'a2-l00-ex-24a',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 28',
    instruction: 'Изберете правилната форма за множествено число.',
    instructionKey: 'a2.ex.mnozhestvenoHora',
    order: 24.3,
    points: 4,
    layout: 'single',
    sentences: [
      {
        text: 'Аз имам един брат и една сестра, той има двама _______ и три _______.',
        blanks: [8, 11],
        correctAnswers: ['братя', 'сестри'],
        options: [['братя', 'братове', 'брата'], ['сестри', 'сестра', 'сестрички']],
      },
      {
        text: 'Тя има един внук, той има много ________.',
        blanks: [7],
        correctAnswers: ['внуци'],
        options: [['внуци', 'внукове', 'внучки']],
      },
      {
        text: 'Ние имаме едно дете, вие имате много ________.',
        blanks: [7],
        correctAnswers: ['деца'],
        options: [['деца', 'детета', 'децата']],
      },
    ],
  },

  // ORDER 25 — Упр. 18: Прилагателни — справочна таблица
  {
    id: 'a2-l00-gramatika-05',
    type: 'grammar_table',
    title: 'ГРАМАТИКА — Прилагателни',
    instruction: 'Запознайте се с формите на прилагателните. Натиснете за произношение.',
    order: 25,
    tableTitle: 'Прилагателни — форми по род и число',
    columns: ['Мъжки род', 'Женски род', 'Среден род', 'Мн. число'],
    rows: [
      { pronoun: 'Модел 1', cells: ['красив',     'красива',     'красиво',     'красиви'],     ttsText: 'Модел 1. Красив. Красива. Красиво. Красиви.'    },
      { pronoun: 'Модел 2', cells: ['национален', 'национална',  'национално',  'национални']  },
      { pronoun: 'Модел 3', cells: ['арабски',    'арабска',     'арабско',     'арабски']     },
    ],
  },

  // ORDER 26 — Упр. 18: Попълнете формите на прилагателните
  {
    id: 'a2-l00-ex-18',
    type: 'dropdown_match',
    title: 'УПРАЖНЕНИЕ 30',
    instruction: 'Изберете правилната форма на прилагателното.',
    instructionKey: 'a2.ex.prilagatelni',
    order: 26,
    points: 8,
    questions: [
      // Пълна парадигма на „нов" (м./ж./ср./мн.)
      { id: 'adj01', left: '… костюм (м.р.)',   options: ['нов', 'нова', 'ново', 'нови'], correctAnswer: 'нов'  },
      { id: 'adj02', left: '… рокля (ж.р.)',    options: ['нова', 'нов', 'ново', 'нови'], correctAnswer: 'нова' },
      { id: 'adj03', left: '… палто (ср.р.)',   options: ['ново', 'нов', 'нова', 'нови'], correctAnswer: 'ново' },
      { id: 'adj04', left: '… обувки (мн.ч.)',  options: ['нови', 'нов', 'нова', 'ново'], correctAnswer: 'нови' },
      // По едно за други прилагателни
      { id: 'adj05', left: '… документ (м.р.)', options: ['официален', 'официална', 'официално', 'официални'], correctAnswer: 'официален' },
      { id: 'adj06', left: '… книга (ж.р.)',    options: ['английска', 'английски', 'английско'],             correctAnswer: 'английска' },
      { id: 'adj07', left: '… мъж (м.р.)',      options: ['красив', 'красива', 'красиво', 'красиви'],         correctAnswer: 'красив'    },
      { id: 'adj08', left: '… жени (мн.ч.)',    options: ['красиви', 'красив', 'красива', 'красиво'],         correctAnswer: 'красиви'   },
    ],
  },

  // ORDER 27 — Упр. 19: Степенуване на прилагателните — справка
  {
    id: 'a2-l00-gramatika-06',
    type: 'grammar_table',
    title: 'ГРАМАТИКА — Степенуване на прилагателните',
    instruction: 'Запознайте се с формите за степенуване. Натиснете за произношение.',
    order: 27,
    tableTitle: 'Степени на прилагателни',
    columns: ['Сравнителна (по-)', 'Превъзходна (най-)'],
    rows: [
      { pronoun: '',  cells: ['по-хубав',  'най-хубав']  },
      { pronoun: '',  cells: ['по-голям',  'най-голям']  },
      { pronoun: '',  cells: ['по-малък',  'най-малък']  },
      { pronoun: '',  cells: ['по-висок',  'най-висок']  },
      { pronoun: '',  cells: ['по-евтин',  'най-евтин']  },
      { pronoun: '',  cells: ['по-скъп',   'най-скъп']   },
      { pronoun: '',  cells: ['по-интересен', 'най-интересен'] },
    ],
  },

  // ORDER 28 — Упр. 19: Попълнете сравнителна и превъзходна степен
  {
    id: 'a2-l00-ex-19',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 32',
    instruction: 'Изберете сравнителната и превъзходната степен.',
    instructionKey: 'a2.ex.stepenuvane',
    order: 28,
    points: 8,
    layout: 'single',
    sentences: [
      {
        text: 'Мария е висока. Анна е _______ от Мария. Ива е _______.',
        blanks: [7, 11],
        correctAnswers: ['по-висока', 'най-висока'],
        isExample: true,
      },
      {
        text: 'Иван е гладен. Васил е _______ от Иван. Георги е _______.',
        blanks: [7, 11],
        correctAnswers: ['по-гладен', 'най-гладен'],
        options: [['по-гладен', 'най-гладен', 'гладен'], ['най-гладен', 'по-гладен', 'гладен']],
      },
      {
        text: 'Париж е интересен. Лондон е _______ от Париж. Рим е _______.',
        blanks: [7, 11],
        correctAnswers: ['по-интересен', 'най-интересен'],
        options: [['по-интересен', 'най-интересен', 'интересен'], ['най-интересен', 'по-интересен', 'интересен']],
      },
      {
        text: 'Валя е хубава. Галя е _______ от Валя. Диана е _______.',
        blanks: [7, 11],
        correctAnswers: ['по-хубава', 'най-хубава'],
        options: [['по-хубава', 'най-хубава', 'хубава'], ['най-хубава', 'по-хубава', 'хубава']],
      },
      {
        text: 'Къщата на Катя е малка. Къщата на Стефан е _______ от къщата на Катя. Къщата на Милен е _______.',
        blanks: [8, 15],
        correctAnswers: ['по-малка', 'най-малка'],
        options: [['по-малка', 'най-малка', 'малка'], ['най-малка', 'по-малка', 'малка']],
      },
    ],
  },

  // ORDER 29 — Упр. 20: Степенуване на наречията — справка
  {
    id: 'a2-l00-gramatika-07',
    type: 'grammar_table',
    title: 'ГРАМАТИКА — Степенуване на наречията',
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
    title: 'УПРАЖНЕНИЕ 34',
    instruction: 'Изберете правилната степен на наречието.',
    instructionKey: 'a2.ex.stepenuvaneNarechiya',
    order: 30,
    points: 6,
    layout: 'single',
    sentences: [
      {
        text: 'Иван бяга бавно. Петър бяга _______. Виктор бяга _______.',
        blanks: [5, 9],
        correctAnswers: ['по-бавно', 'най-бавно'],
        isExample: true,
      },
      {
        text: 'В България е скъпо. В Германия е _______. В Швеция е _______.',
        blanks: [6, 10],
        correctAnswers: ['по-скъпо', 'най-скъпо'],
        options: [['по-скъпо', 'най-скъпо', 'скъпо'], ['най-скъпо', 'по-скъпо', 'скъпо']],
      },
      {
        text: 'Тя говори добре. Той говори _______. Диана говори _______.',
        blanks: [5, 9],
        correctAnswers: ['по-добре', 'най-добре'],
        options: [['по-добре', 'най-добре', 'добре'], ['най-добре', 'по-добре', 'добре']],
      },
      {
        text: 'Петър идва рано. Мария идва _______. Иван идва _______.',
        blanks: [5, 9],
        correctAnswers: ['по-рано', 'най-рано'],
        options: [['по-рано', 'най-рано', 'рано'], ['най-рано', 'по-рано', 'рано']],
      },
    ],
  },

  // ORDER 31 — Упр. 21: Членуване на съществителните — справка
  {
    id: 'a2-l00-gramatika-08',
    type: 'grammar_table',
    title: 'ГРАМАТИКА — Определителен член',
    instruction: 'Запознайте се с формите за членуване. Натиснете за произношение.',
    order: 31,
    tableTitle: 'Определителен член на съществителните',
    columns: ['Единствено (субект)', 'Единствено (обект)', 'Мн.ч.'],
    rows: [
      { pronoun: 'м.р.',  cells: ['пазар**ът**', 'пазар**а**', 'пазар**ите**'], ttsText: 'пазарът. пазара. пазарите.' },
      { pronoun: 'м.р.',  cells: ['музе**ят**',  'музе**я**',  'музе**ите**'],  ttsText: 'музеят. музея. музеите.' },
      { pronoun: 'ж.р.',  cells: ['банк**ата**', 'банк**ата**', 'банк**ите**'], ttsText: 'банката. банката. банките.' },
      { pronoun: 'ср.р.', cells: ['сел**ото**', 'сел**ото**',  'сел**ата**'],   ttsText: 'селото. селото. селата.' },
    ],
  },

  // ORDER 32 — Упр. 21: Употреба на члена в изречения
  {
    id: 'a2-l00-ex-21',
    type: 'a2-grouped-dropdown-match',
    title: 'УПРАЖНЕНИЕ 36',
    instruction: 'Изберете правилния определителен член.',
    instructionKey: 'a2.ex.chlenuvane',
    order: 32,
    points: 9,
    groupSize: 1,
    questions: [
      { id: 'ch01', left: 'Град… е голям.',              options: ['а', 'ят', 'я', 'ът'],  correctAnswer: 'ът'  },
      { id: 'ch02', left: 'В град… има много хотели.',   options: ['ът', 'ят', 'я', 'а'],   correctAnswer: 'а'   },
      { id: 'ch03', left: 'Музе… е интересен.',          options: ['я', 'ът', 'а', 'ят'],   correctAnswer: 'ят'  },
      { id: 'ch04', left: 'В музе… има много хора.',     options: ['ят', 'ът', 'а', 'я'],    correctAnswer: 'я'   },
      { id: 'ch05', left: 'Болница… е модерна.',         options: ['то', 'те', 'ът', 'та'],        correctAnswer: 'та'  },
      { id: 'ch06', left: 'Училище… е малко.',           options: ['та', 'те', 'ят', 'то'],        correctAnswer: 'то'  },
      { id: 'ch07', left: 'Магазини… са отворени.',      options: ['ът', 'та', 'то', 'те'],        correctAnswer: 'те'  },
      { id: 'ch08', left: 'Къщи… са обзаведени.',        options: ['та', 'то', 'ът', 'те'],        correctAnswer: 'те'  },
      { id: 'ch09', left: 'Кафенета… са затворени.',     options: ['то', 'те', 'ята', 'та'],       correctAnswer: 'та'  },
    ],
  } as A2GroupedDropdownExercise,

  // ORDER 33 — Упр. 22: Членуване на прилагателните — справка
  {
    id: 'a2-l00-gramatika-09',
    type: 'grammar_table',
    title: 'ГРАМАТИКА — Определителен член на прилагателните',
    instruction: 'Запознайте се с формите. Натиснете за произношение.',
    order: 33,
    tableTitle: 'Членуване на прилагателните',
    columns: ['Членувана форма'],
    rows: [
      { pronoun: 'м.р.',  cells: ['сини**я(т)** пуловер'],  ttsText: 'Мъжки род. синият пулОвер.', ttsPrompt: 'Произнасяй думата пуловер с ударение на втората сричка: пул-О-вер.' },
      { pronoun: 'ж.р.',  cells: ['червена**та** тениска'], ttsText: 'Женски род. червената тениска.' },
      { pronoun: 'ср.р.', cells: ['сиво**то** сако'],       ttsText: 'Среден род. сивото сако.' },
      { pronoun: 'мн.ч.', cells: ['бели**те** маратонки'],  ttsText: 'Множествено число. белите маратонки.' },
    ],
  },

  // ORDER 34 — Упр. 22: Употреба на членуваните прилагателни
  {
    id: 'a2-l00-ex-22',
    type: 'dropdown_match',
    title: 'УПРАЖНЕНИЕ 38',
    instruction: 'Изберете правилната членувана форма на прилагателното.',
    instructionKey: 'a2.ex.chlenuvaneAdj',
    order: 34,
    points: 5,
    questions: [
      { id: 'ca01', left: '… официален костюм е скъп.',       options: ['Черният', 'Черната', 'Черното', 'Черните'],   correctAnswer: 'Черният'  },
      { id: 'ca02', left: 'Искам … панталон отляво.',         options: ['първия', 'първият', 'първата', 'първото'],    correctAnswer: 'първия'   },
      { id: 'ca03', left: '… памучна рокля е малка.',         options: ['Розовата', 'Розовият', 'Розовото', 'Розовите'],correctAnswer: 'Розовата' },
      { id: 'ca04', left: '… модерно палто е голямо.',        options: ['Жълтото', 'Жълтият', 'Жълтата', 'Жълтите'],  correctAnswer: 'Жълтото'  },
      { id: 'ca05', left: '… спортни обувки са евтини.',      options: ['Зелените', 'Зеленият', 'Зелената', 'Зеленото'],correctAnswer: 'Зелените' },
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
      { id: 'v',        imageUrl: `${BASE}/13-upr-23a-predlozi-shemi/01-v.jpg`,        label: 'в',         ttsLabel: 'в.'       },
      { id: 'na',       imageUrl: `${BASE}/13-upr-23a-predlozi-shemi/02-na.jpg`,       label: 'на',        ttsLabel: 'на.'      },
      { id: 'do',       imageUrl: `${BASE}/13-upr-23a-predlozi-shemi/03-do.jpg`,       label: 'до',        ttsLabel: 'до.'      },
      { id: 'pred',     imageUrl: `${BASE}/13-upr-23a-predlozi-shemi/04-pred.jpg`,     label: 'пред',      ttsLabel: 'Пред,'    },
      { id: 'zad',      imageUrl: `${BASE}/13-upr-23a-predlozi-shemi/05-zad.jpg`,      label: 'зад',       ttsLabel: 'зад.'     },
      { id: 'mezhdu',   imageUrl: `${BASE}/13-upr-23a-predlozi-shemi/06-mezhdu.jpg`,   label: 'между',     ttsLabel: 'между'   },
      { id: 'sreshtu',  imageUrl: `${BASE}/13-upr-23a-predlozi-shemi/07-sreshtu.jpg`,  label: 'срещу'      },
      { id: 'blizo-do', imageUrl: `${BASE}/13-upr-23a-predlozi-shemi/08-blizo-do.jpg`, label: 'близо до'   },
      { id: 'dalech-ot',imageUrl: `${BASE}/13-upr-23a-predlozi-shemi/09-daleche-ot.jpg`,label: 'далеч от' },
      { id: 'nad-pod',  imageUrl: `${BASE}/13-upr-23a-predlozi-shemi/10-nad-pod.jpg`,  label: 'над / под', ttsLabel: 'над и под' },
    ],
  } as A2WideCardsExercise,

  // ORDER 36 — Упр. 23а: Предлози за място — упражнение (с план на къщата)
  {
    id: 'a2-l00-ex-23a',
    type: 'dropdown_match',
    title: 'УПРАЖНЕНИЕ',
    instruction: 'Изберете правилния предлог. Погледнете плана на къщата.',
    instructionKey: 'a2.ex.predloziMyasto',
    order: 36,
    points: 13,
    imageUrl: `${BASE}/14-upr-23a-kashta/01-kashta-shema.jpg`,
    questions: [
      { id: 'pm01', left: '… къщата има кухня, хол, коридор, спалня, тоалетна, баня и балкон.', options: ['На', 'До', 'Пред', 'В'], correctAnswer: 'В'      },
      { id: 'pm02', left: 'Холът е … кухнята.',                 options: ['в', 'на', 'пред', 'до'], correctAnswer: 'до'    },
      { id: 'pm03', left: 'Спалнята е … кухнята.',              options: ['до', 'в', 'под', 'над'], correctAnswer: 'над'   },
      { id: 'pm04', left: 'Печката е … кухнята.',               options: ['до', 'на', 'над', 'в'],  correctAnswer: 'в'     },
      { id: 'pm05', left: 'Лаптопът е … масата.',               options: ['в', 'до', 'под', 'на'],  correctAnswer: 'на'    },
      { id: 'pm06', left: 'Масата е … дивана и табуретката.',   options: ['до', 'на', 'пред', 'между'], correctAnswer: 'между' },
      { id: 'pm07', left: 'Гардеробът е … спалнята.',           options: ['на', 'до', 'пред', 'в'], correctAnswer: 'в'     },
      { id: 'pm08', left: 'Диванът е … вратата.',               options: ['до', 'на', 'пред', 'срещу'], correctAnswer: 'срещу' },
      { id: 'pm09', left: 'Ваната е … банята.',                 options: ['на', 'до', 'пред', 'в'], correctAnswer: 'в'     },
      { id: 'pm10', left: 'Цветето е … вратата.',               options: ['до', 'в', 'на', 'зад'], correctAnswer: 'зад'   },
      { id: 'pm11', left: 'Перялнята е … мивката.',             options: ['в', 'на', 'пред', 'до'], correctAnswer: 'до'    },
      { id: 'pm12', left: 'Тоалетната е … банята.',             options: ['в', 'на', 'пред', 'до'], correctAnswer: 'до'    },
      { id: 'pm13', left: 'Килимът е … вратата на спалнята.',   options: ['зад', 'до', 'в', 'пред'], correctAnswer: 'пред' },
    ],
  },

  // ORDER 36.3 — Упр. 23а: Предлози за движение — справка (стр. 13 горе)
  {
    id: 'a2-l00-gramatika-10a',
    type: 'grammar_table',
    title: 'ГРАМАТИКА — Предлози за движение',
    instruction: 'Запознайте се с предлозите за движение. Натиснете за произношение.',
    order: 36.3,
    tableTitle: 'Предлози за движение',
    columns: ['Предлог'],
    rows: [
      { pronoun: '', cells: ['тръгвам от / тръгвам за'],     ttsText: 'тръгвам от. тръгвам за.' },
      { pronoun: '', cells: ['заминавам от / заминавам за'], ttsText: 'заминавам от. заминавам за.' },
      { pronoun: '', cells: ['спирам в / спирам на'],        ttsText: 'спирам във. спирам на.' },
      { pronoun: '', cells: ['пристигам в / пристигам на'],  ttsText: 'пристигам в. пристигам на.' },
      {
        pronoun: '', cells: ['пътувам за / пътувам с'],      ttsText: 'пъТУвам за. пъТУвам с.',
        ttsModel: 'pro',
        ttsPrompt: 'Bulgarian verb „пътувам" (to travel). Stress on the second syllable: пъ-ТУ-вам. Read the uppercase vowel as the stressed syllable. Read aloud clearly and smoothly in standard Bulgarian, do not swap or slur any sounds, no foreign or Russian accent.',
      },
      { pronoun: '', cells: ['връщам се от / връщам се в'],  ttsText: 'връщам се от. връщам се в.' },
    ],
  },

  // ORDER 36.6 — Упр. 23а: Предлози за движение — упражнение (стр. 13 горе)
  {
    id: 'a2-l00-ex-23a2',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ',
    instruction: 'Изберете правилния предлог за движение.',
    instructionKey: 'a2.ex.predloziDvizhenie',
    order: 36.6,
    points: 5,
    layout: 'single',
    sentences: [
      {
        text: 'Автобусът от София тръгва _______ сектор 5 в 8:00 часа сутринта, спира за почивка _______ автогарата в Сливен и пристига _______ Бургас в 14:00 часа.',
        blanks: [1, 2, 3],
        correctAnswers: ['от', 'на', 'в'],
        options: [['от', 'за', 'в', 'на'], ['на', 'в', 'от', 'за'], ['в', 'на', 'от', 'за']],
      },
      {
        text: 'Всеки уикенд пътувам _______ Пловдив и се връщам _______ София в неделя.',
        blanks: [1, 2],
        correctAnswers: ['за', 'в'],
        options: [['за', 'с', 'от', 'в'], ['в', 'от', 'за', 'на']],
      },
    ],
  },

  // ORDER 37 — Упр. 23б: Предлози за време — справка
  {
    id: 'a2-l00-gramatika-10',
    type: 'grammar_table',
    title: 'ГРАМАТИКА — Предлози за време',
    instruction: 'Запознайте се с предлозите за време. Натиснете за произношение.',
    order: 37,
    tableTitle: 'Предлози за време',
    columns: ['Пример'],
    // Each example group sits on its own line inside the cell (\n) to mirror the
    // printed textbook table. `ttsText` is deliberately unchanged so the existing
    // per-row audio stays valid — no TTS regeneration needed.
    rows: [
      { pronoun: 'в',         cells: ['в 10:00 часа\nв понеделник, във вторник'], ttsText: 'в. в десет часа, в понеделник, във вторник.' },
      { pronoun: 'на',        cells: ['на първи март\nна обяд'],                  ttsText: 'на. на първи март, на обяд.' },
      { pronoun: 'през',      cells: ['през нощта, през деня\nпрез седмицата\nпрез уикенда\nпрез януари\nпрез лятото\nпрез 2023 година'], ttsText: 'през. през нощта, през деня, през седмицата, през уикенда, през януари, през лятото, през две хиляди двадесет и трета година.' },
      { pronoun: 'от … до …', cells: ['от 10:00 до 12:00 часа\nот сутрин до вечер'], ttsText: 'от до. от десет до дванадесет часа, от сутрин до вечер.' },
      { pronoun: 'преди',     cells: ['преди 10:00 часа\nпреди обяд'],            ttsText: 'преди. преди десет часа, преди обяд.' },
      { pronoun: 'след',      cells: ['след 10:00 часа\nслед обяд'],              ttsText: 'след. след десет часа, след обяд.' },
      { pronoun: 'около',     cells: ['около 10:00 часа'],                        ttsText: 'около. около десет часà.' },
    ],
  },

  // ORDER 38 — Упр. 23б: Предлози за време — упражнение (стр. 13)
  {
    id: 'a2-l00-ex-23b',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ',
    instruction: 'Изберете правилния предлог за време.',
    instructionKey: 'a2.ex.predloziVreme',
    order: 38,
    points: 16,
    layout: 'single',
    sentences: [
      {
        text: 'Роден съм _______ 12 март 1986 година.',
        blanks: [2],
        correctAnswers: ['на'],
        options: ['на', 'в', 'през', 'от'],
      },
      {
        text: '_______ седмицата работя _______ сутрин _______ вечер, често работя и _______ уикенда.',
        blanks: [0, 3, 5, 10],
        correctAnswers: ['През', 'от', 'до', 'през'],
        options: [['През', 'На', 'В', 'От'], ['от', 'в', 'на', 'до'], ['до', 'в', 'на', 'от'], ['през', 'в', 'на', 'от']],
      },
      {
        text: 'Винаги започвам работа _______ 8:00 часа.',
        blanks: [3],
        correctAnswers: ['в'],
        options: ['в', 'на', 'през', 'от'],
      },
      {
        text: 'Обикновено гледам телевизия _______ 7:00 _______ 11:00 вечерта.',
        blanks: [3, 5],
        correctAnswers: ['от', 'до'],
        options: [['от', 'в', 'на', 'през'], ['до', 'в', 'на', 'от']],
      },
      {
        text: '_______ зимата в България е студено и вали сняг, _______ лятото е слънчево и горещо.',
        blanks: [0, 9],
        correctAnswers: ['През', 'през'],
        options: [['През', 'В', 'На', 'От'], ['през', 'в', 'на', 'от']],
      },
      {
        text: 'Уча български език _______ понеделник и сряда, а понякога и _______ вторник.',
        blanks: [3, 9],
        correctAnswers: ['в', 'във'],
        options: [['в', 'на', 'през', 'от'], ['във', 'в', 'на', 'през']],
      },
      {
        text: 'Имам _______ половин час почивка _______ обяд.',
        blanks: [1, 5],
        correctAnswers: ['около', 'на'],
        options: [['около', 'в', 'на', 'през'], ['на', 'в', 'през', 'около']],
      },
      {
        text: 'Никога не си лягам _______ 12:00 часа.',
        blanks: [4],
        correctAnswers: ['след'],
        options: ['след', 'преди', 'в', 'около'],
      },
      {
        text: 'Автобусът от София тръгва за Пловдив _______ 10:00 часа сутринта и пътува 2 часа.',
        blanks: [5],
        correctAnswers: ['в'],
        options: ['в', 'на', 'през', 'от'],
      },
    ],
  },

  // ORDER 39 — Упр. 24: Сегашно време — справочна таблица
  {
    id: 'a2-l00-gramatika-11',
    type: 'grammar_table',
    title: 'ГРАМАТИКА',
    instruction: 'Запознайте се с трите спрежения. Натиснете за произношение.',
    order: 39,
    tableTitle: 'Сегашно време',
    columns: ['А група', 'Е група', 'И група'],
    rows: [
      { pronoun: 'аз',  cells: ['иска**м**',  'игра**я**',   'готв**я**'],   ttsText: 'аз искам играя готвя'          },
      { pronoun: 'ти',  cells: ['иска**ш**',  'игра**еш**',  'готв**иш**'],  ttsText: 'ти искаш играеш готвиш'        },
      { pronoun: 'той', cells: ['иска',       'игра**е**',   'готв**и**'],   ttsText: 'той иска играе готви'          },
      { pronoun: 'тя',  cells: ['иска',       'игра**е**',   'готв**и**'],   ttsText: 'тя иска играе готви'           },
      { pronoun: 'то',  cells: ['иска',       'игра**е**',   'готв**и**'],   ttsText: 'то иска играе готви'           },
      { pronoun: 'ние', cells: ['иска**ме**', 'игра**ем**',  'готв**им**'],  ttsText: 'ние искаме играем готвим'      },
      { pronoun: 'вие', cells: ['иска**те**', 'игра**ете**', 'готв**ите**'], ttsText: 'вие искате играете готвите'    },
      { pronoun: 'те',  cells: ['иска**т**',  'игра**ят**',  'готв**ят**'],  ttsText: 'те искат играят готвят'        },
    ],
    notes: [
      'Отрицателна форма: искам – не искам, играя – не играя, готвя – не готвя, имам – нямам.',
      'Възвратни глаголи: Аз се обличам. = Обличам се.',
    ],
    ttsNotes: [
      'Отрицателна форма. искам, не искам. играя, не играя. готвя, не готвя. имам, нямам.',
      'Възвратни глаголи. Аз се обличам. Обличам се.',
    ],
  },

  // ORDER 40 — Упр. 24: Сегашно време — попълнете текста за Таня
  {
    id: 'a2-l00-ex-24',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 44',
    instruction: 'Изберете правилната форма на глагола.',
    instructionKey: 'a2.ex.segashnoVreme',
    order: 40,
    points: 13,
    layout: 'single',
    sentences: [
      {
        text: 'Тя _______ (казвам се) Таня и _______ (съм) учителка по български език в едно голямо училище.',
        blanks: [1, 4],
        correctAnswers: ['се казва', 'е'],
        options: [['се казва', 'казвам се', 'казва се'], ['е', 'съм', 'си']],
      },
      {
        text: 'Таня _______ (работя) всеки ден от 8:00 до 13:00, после _______ (имам) един час почивка.',
        blanks: [1, 10],
        correctAnswers: ['работи', 'има'],
        options: [['работи', 'работя', 'работиш'], ['има', 'имам', 'имаш']],
      },
      {
        text: 'На обяд Таня _______ (ям) сандвичи и _______ (пия) кафе.',
        blanks: [3, 6],
        correctAnswers: ['яде', 'пие'],
        options: [['яде', 'ям', 'ядеш'], ['пие', 'пия', 'пиеш']],
      },
      {
        text: 'След обяд _______ (чета) книги и _______ (пиша) имейли.',
        blanks: [2, 5],
        correctAnswers: ['чете', 'пише'],
        options: [['чете', 'чета', 'четеш'], ['пише', 'пиша', 'пишеш']],
      },
      {
        text: 'След работа Таня _______ (пазарувам), _______ (готвя) и _______ (чистя), а понякога _______ (тичам) в парка или _______ (срещам се) с приятели на кафе.',
        blanks: [3, 6, 9, 13, 17],
        correctAnswers: ['пазарува', 'готви', 'чисти', 'тича', 'се среща'],
        options: [['пазарува', 'пазарувам', 'пазаруваш'], ['готви', 'готвя', 'готвиш'], ['чисти', 'чистя', 'чистиш'], ['тича', 'тичам', 'тичаш'], ['се среща', 'срещам се', 'среща се']],
      },
    ],
  },

  // ORDER 40.1 — Упр. 24-2: Сегашно време — текст „Мохамед" (стр. 13)
  {
    id: 'a2-l00-ex-24b',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ',
    instruction: 'Изберете правилната форма на глагола.',
    instructionKey: 'a2.ex.segashnoVreme',
    order: 40.1,
    points: 8,
    layout: 'single',
    sentences: [
      {
        text: 'Мохамед _______ (съм) бежанец от Сирия.',
        blanks: [1],
        correctAnswers: ['е'],
        options: [['е', 'съм', 'си']],
      },
      {
        text: 'Сега той _______ (живея) със семейството си в България.',
        blanks: [2],
        correctAnswers: ['живее'],
        options: [['живее', 'живея', 'живееш']],
      },
      {
        text: 'Мохамед _______ (знам) арабски и английски език.',
        blanks: [1],
        correctAnswers: ['знае'],
        options: [['знае', 'знам', 'знаеш']],
      },
      {
        text: 'Сега _______ (уча) български.',
        blanks: [1],
        correctAnswers: ['учи'],
        options: [['учи', 'уча', 'учиш']],
      },
      {
        text: 'Той _______ (имам) курс всеки вторник и четвъртък и всеки ден _______ (слушам) българско радио.',
        blanks: [1, 11],
        correctAnswers: ['има', 'слуша'],
        options: [['има', 'имам', 'имаш'], ['слуша', 'слушам', 'слушаш']],
      },
      {
        text: 'Мохамед _______ (харесвам) България и _______ (търся) работа и апартамент под наем в София.',
        blanks: [1, 4],
        correctAnswers: ['харесва', 'търси'],
        options: [['харесва', 'харесвам', 'харесваш'], ['търси', 'търся', 'търсиш']],
      },
    ],
  },

  // ORDER 40.2 — Упр. 24-3: Сегашно време — текст „Атанас и Лили" (стр. 14)
  {
    id: 'a2-l00-ex-24c',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ',
    instruction: 'Изберете правилната форма на глагола.',
    instructionKey: 'a2.ex.segashnoVreme',
    order: 40.2,
    points: 12,
    layout: 'single',
    sentences: [
      {
        text: 'Атанас и Лили _______ (съм) брат и сестра.',
        blanks: [2],
        correctAnswers: ['са'],
        options: [['са', 'съм', 'е']],
      },
      {
        text: 'Атанас _______ (съм) на 10 години, а Лили – на 12.',
        blanks: [1],
        correctAnswers: ['е'],
        options: [['е', 'съм', 'си']],
      },
      {
        text: 'Всяка сутрин те _______ (ставам) в 7:00 часа, _______ (мия се) и _______ (закусвам).',
        blanks: [3, 8, 11],
        correctAnswers: ['стават', 'мият се', 'закусват'],
        acceptableAnswers: [[], ['се мият'], []],
        options: [['стават', 'ставам', 'става'], ['мият се', 'мия се', 'мие се'], ['закусват', 'закусвам', 'закусва']],
      },
      {
        text: 'През седмицата Атанас и Лили _______ (ходя) на училище, а през уикенда _______ (играя) навън.',
        blanks: [4, 11],
        correctAnswers: ['ходят', 'играят'],
        options: [['ходят', 'ходя', 'ходи'], ['играят', 'играя', 'играе']],
      },
      {
        text: 'Обикновено те _______ (обядвам) в училището, а _______ (вечерям) вкъщи.',
        blanks: [2, 7],
        correctAnswers: ['обядват', 'вечерят'],
        options: [['обядват', 'обядвам', 'обядва'], ['вечерят', 'вечерям', 'вечеря']],
      },
      {
        text: 'След вечеря _______ (взимам) душ, _______ (лягам си) и _______ (спя) до сутринта.',
        blanks: [2, 6, 10],
        correctAnswers: ['взимат', 'лягат си', 'спят'],
        acceptableAnswers: [[], ['си лягат'], []],
        options: [['взимат', 'взимам', 'взима'], ['лягат си', 'лягам си', 'ляга си'], ['спят', 'спя', 'спи']],
      },
    ],
  },

  // ORDER 40.3 — Упр. 24-4: Сегашно време — текст „Семейство Иванови" (стр. 14)
  {
    id: 'a2-l00-ex-24d',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ',
    instruction: 'Изберете правилната форма на глагола.',
    instructionKey: 'a2.ex.segashnoVreme',
    order: 40.3,
    points: 10,
    layout: 'single',
    sentences: [
      {
        text: 'Ние _______ (съм) семейство Иванови.',
        blanks: [1],
        correctAnswers: ['сме'],
        options: [['сме', 'съм', 'сте']],
      },
      {
        text: '_______ (нямам) деца.',
        blanks: [0],
        correctAnswers: ['Нямаме'],
        options: [['Нямаме', 'Нямам', 'Нямате']],
      },
      {
        text: '_______ (живея) в Перник, а _______ (работя) в София.',
        blanks: [0, 5],
        correctAnswers: ['Живеем', 'работим'],
        options: [['Живеем', 'Живея', 'Живеете'], ['работим', 'работя', 'работите']],
      },
      {
        text: 'Всеки ден _______ (пътувам) до София с автобус или кола.',
        blanks: [2],
        correctAnswers: ['пътуваме'],
        options: [['пътуваме', 'пътувам', 'пътувате']],
      },
      {
        text: '_______ (пристигам) на автогарата в 7:30 и _______ (чакам) трамвай или тролей.',
        blanks: [0, 6],
        correctAnswers: ['Пристигаме', 'чакаме'],
        options: [['Пристигаме', 'Пристигам', 'Пристигате'], ['чакаме', 'чакам', 'чакате']],
      },
      {
        text: '_______ (започвам) работа в 8:30 и _______ (свършвам) в 5:30.',
        blanks: [0, 5],
        correctAnswers: ['Започваме', 'свършваме'],
        options: [['Започваме', 'Започвам', 'Започвате'], ['свършваме', 'свършвам', 'свършвате']],
      },
      {
        text: 'Вечерта _______ (връщам се) в Перник.',
        blanks: [1],
        correctAnswers: ['се връщаме'],
        options: [['се връщаме', 'връщам се', 'връщаме се']],
      },
    ],
  },

  // ORDER 40.4 — Упр. 24-5: Сегашно време — текст „Всеки петък" (стр. 14)
  {
    id: 'a2-l00-ex-24e',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ',
    instruction: 'Изберете правилната форма на глагола.',
    instructionKey: 'a2.ex.segashnoVreme',
    order: 40.4,
    points: 10,
    layout: 'single',
    sentences: [
      {
        text: 'Всеки петък в пет и половина ти _______ (казвам) на колегите „Приятен уикенд“ и _______ (прибирам се).',
        blanks: [7, 13],
        correctAnswers: ['казваш', 'се прибираш'],
        options: [['казваш', 'казвам', 'казва'], ['се прибираш', 'прибирам се', 'прибираш се']],
      },
      {
        text: '_______ (влизам) вкъщи, _______ (затварям) вратата, _______ (събувам се) и _______ (отварям) хладилника.',
        blanks: [0, 4, 8, 12],
        correctAnswers: ['Влизаш', 'затваряш', 'събуваш се', 'отваряш'],
        acceptableAnswers: [[], [], ['се събуваш'], []],
        options: [['Влизаш', 'Влизам', 'Влиза'], ['затваряш', 'затварям', 'затваря'], ['събуваш се', 'събувам се', 'събува се'], ['отваряш', 'отварям', 'отваря']],
      },
      {
        text: '_______ (вечерям), _______ (пуша) цигара и _______ (гледам) телевизия.',
        blanks: [0, 3, 7],
        correctAnswers: ['Вечеряш', 'пушиш', 'гледаш'],
        options: [['Вечеряш', 'Вечерям', 'Вечеря'], ['пушиш', 'пуша', 'пуши'], ['гледаш', 'гледам', 'гледа']],
      },
      {
        text: '_______ (нямам) много приятели.',
        blanks: [0],
        correctAnswers: ['Нямаш'],
        options: [['Нямаш', 'Нямам', 'Няма']],
      },
    ],
  },

  // ORDER 40.5 — Упр. 24-6: Сегашно време — текст „Днес е 21 март" (стр. 14)
  {
    id: 'a2-l00-ex-24f',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ',
    instruction: 'Изберете правилната форма на глагола.',
    instructionKey: 'a2.ex.segashnoVreme',
    order: 40.5,
    points: 12,
    layout: 'single',
    sentences: [
      {
        text: 'Днес е 21 март и Иван _______ (имам) рожден ден.',
        blanks: [5],
        correctAnswers: ['има'],
        options: [['има', 'имам', 'имаш']],
      },
      {
        text: 'Всяка година на 21 март той _______ (каня) приятели на гости.',
        blanks: [6],
        correctAnswers: ['кани'],
        options: [['кани', 'каня', 'каниш']],
      },
      {
        text: '_______ (купувам) храна и напитки, _______ (правя) торта и _______ (се обличам) официално.',
        blanks: [0, 5, 9],
        correctAnswers: ['Купува', 'прави', 'се облича'],
        acceptableAnswers: [[], [], ['облича се']],
        options: [['Купува', 'Купувам', 'Купуваш'], ['прави', 'правя', 'правиш'], ['се облича', 'се обличам', 'се обличаш']],
      },
      {
        text: 'Вечерта приятелите му _______ (идвам) и _______ (празнувам) – _______ (ям), _______ (пия), _______ (танцувам) и _______ (говоря) до сутринта.',
        blanks: [3, 6, 9, 12, 15, 19],
        correctAnswers: ['идват', 'празнуват', 'ядат', 'пият', 'танцуват', 'говорят'],
        options: [['идват', 'идвам', 'идва'], ['празнуват', 'празнувам', 'празнува'], ['ядат', 'ям', 'яде'], ['пият', 'пия', 'пие'], ['танцуват', 'танцувам', 'танцува'], ['говорят', 'говоря', 'говори']],
      },
      {
        text: 'Всички хора _______ (обичам) празниците!',
        blanks: [2],
        correctAnswers: ['обичат'],
        options: [['обичат', 'обичам', 'обича']],
      },
    ],
  },

  // ORDER 41 — Упр. 25: Кратки притежателни местоимения — справка
  {
    id: 'a2-l00-gramatika-12',
    type: 'grammar_table',
    title: 'ГРАМАТИКА — Кратки притежателни местоимения',
    instruction: 'Запознайте се с кратките форми. Натиснете за произношение.',
    order: 41,
    tableTitle: 'Кратки притежателни местоимения',
    columns: ['Пример'],
    rows: [
      { pronoun: 'аз',  cells: ['семейството **ми**'] },
      { pronoun: 'ти',  cells: ['родителите **ти**'] },
      { pronoun: 'той', cells: ['съпругата **му**'] },
      { pronoun: 'тя',  cells: ['мъжът **й**'] },
      { pronoun: 'то',  cells: ['баща **му**'] },
      { pronoun: 'ние', cells: ['синът **ни**'] },
      { pronoun: 'Вие', cells: ['внуците **ви**'] },
      { pronoun: 'те',  cells: ['детето **им**'] },
    ],
    notes: [
      'майка ми, баща ми, брат ми, сестра ми, баба ми, дядо ми, жена ми, дъщеря ми, леля ми, чичо ми',
    ],
    ttsNotes: [
      'майка ми, баща ми, брат ми, сестра ми, баба ми, дядо ми, жена ми, дъщеря ми, леля ми, чичо ми.',
    ],
  },

  // ORDER 42 — Упр. 25: Кратки притежателни местоимения — упражнение
  {
    id: 'a2-l00-ex-25',
    type: 'dropdown_match',
    title: 'УПРАЖНЕНИЕ 46',
    instruction: 'Изберете правилната кратка притежателна форма.',
    instructionKey: 'a2.ex.pritezhatelnaMest',
    order: 42,
    points: 8,
    questions: [
      { id: 'pr01', left: 'Аз имам брат. Брат … се казва Виктор.',               options: ['ти', 'му', 'й', 'ми'], correctAnswer: 'ми' },
      { id: 'pr02', left: 'Ти имаш сестра. Сестра … е учителка.',                 options: ['ми', 'му', 'й', 'ти'], correctAnswer: 'ти' },
      { id: 'pr03', left: 'Той има дъщеря. Дъщеря … учи английски.',              options: ['ми', 'ти', 'й', 'му'], correctAnswer: 'му' },
      { id: 'pr04', left: 'Тя има съпруг. Съпругът … е бизнесмен.',               options: ['ми', 'ти', 'му', 'й'],  correctAnswer: 'й'  },
      { id: 'pr05', left: 'То е дете. Баща … е лекар.',                           options: ['ми', 'ти', 'й', 'му'], correctAnswer: 'му' },
      { id: 'pr06', left: 'Ние имаме внуци. Внуците … са умни.',                  options: ['ми', 'ти', 'ви', 'ни'],  correctAnswer: 'ни' },
      { id: 'pr07', left: 'Вие имате дете. Детето … е много малко.',              options: ['ми', 'ти', 'ни', 'ви'],  correctAnswer: 'ви' },
      { id: 'pr08', left: 'Те имат син. Синът … се жени тази година.',            options: ['ми', 'ти', 'ни', 'им'],  correctAnswer: 'им' },
    ],
  },

  // ORDER 43 — Упр. 26: Показателни местоимения — справка
  {
    id: 'a2-l00-gramatika-13',
    type: 'grammar_table',
    title: 'ГРАМАТИКА',
    instruction: 'Запознайте се с показателните местоимения. Натиснете за произношение.',
    order: 43,
    tableTitle: 'Показателни местоимения',
    columns: ['Пример'],
    rows: [
      { pronoun: 'м.р.',  cells: ['**този** телефон'],  ttsText: 'Мъжки род. този телефон.' },
      { pronoun: 'ж.р.',  cells: ['**тази** чанта'],     ttsText: 'Женски род. тази чанта.' },
      { pronoun: 'ср.р.', cells: ['**това** портмоне'],  ttsText: 'Среден род. това портмоне.' },
      { pronoun: 'мн.ч.', cells: ['**тези** ключове'],   ttsText: 'Множествено число. тези ключове.', ttsModel: 'pro' },
    ],
  },

  // ORDER 44 — Упр. 26: Показателни местоимения — упражнение
  {
    id: 'a2-l00-ex-26',
    type: 'dropdown_match',
    title: 'УПРАЖНЕНИЕ 48',
    instruction: 'Изберете правилното показателно местоимение.',
    instructionKey: 'a2.ex.pokazatelniMest',
    order: 44,
    points: 7,
    questions: [
      { id: 'pk01', left: '… химикалка е на брат ми. (ж.р.)',        options: ['Тази', 'Този', 'Това', 'Тези'],   correctAnswer: 'Тази' },
      { id: 'pk02', left: '… огледало е на сестра му. (ср.р.)',      options: ['Това', 'Този', 'Тази', 'Тези'],   correctAnswer: 'Това' },
      { id: 'pk03', left: '… паспорт е на сина ни. (м.р.)',          options: ['Този', 'Тази', 'Това', 'Тези'],   correctAnswer: 'Този' },
      { id: 'pk04', left: '… пари са на родителите им. (мн.ч.)',     options: ['Тези', 'Този', 'Тази', 'Това'],   correctAnswer: 'Тези' },
      { id: 'pk05', left: '… чадър е на баба ви. (м.р.)',            options: ['Този', 'Тази', 'Това', 'Тези'],   correctAnswer: 'Този' },
      { id: 'pk06', left: '… лична карта е на жена ти. (ж.р.)',      options: ['Тази', 'Този', 'Това', 'Тези'],   correctAnswer: 'Тази' },
      { id: 'pk07', left: '… чанти са на колежките ни. (мн.ч.)',     options: ['Тези', 'Този', 'Тази', 'Това'],   correctAnswer: 'Тези' },
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
    columns: ['Пример'],
    rows: [
      { pronoun: 'м.р.',  cells: ['**всеки** ден'],      ttsText: 'Мъжки род. всеки ден.' },
      { pronoun: 'ж.р.',  cells: ['**всяка** седмица'],  ttsText: 'Женски род. всяка седмица.' },
      { pronoun: 'ср.р.', cells: ['**всяко** лято'],     ttsText: 'Среден род. всяко лято.' },
      { pronoun: 'мн.ч.', cells: ['**всички** хора'],    ttsText: 'Множествено число. всички хора.', ttsModel: 'pro' },
    ],
  },

  // ORDER 46 — Упр. 27: Обобщителни местоимения — упражнение
  {
    id: 'a2-l00-ex-27',
    type: 'dropdown_match',
    title: 'УПРАЖНЕНИЕ 50',
    instruction: 'Изберете правилното обобщително местоимение.',
    instructionKey: 'a2.ex.obobshtitelniMest',
    order: 46,
    points: 7,
    questions: [
      { id: 'ob01', left: '… уикенд ходя на кино. (м.р.)',        options: ['Всеки', 'Всяка', 'Всяко', 'Всички'],   correctAnswer: 'Всеки' },
      { id: 'ob02', left: '… деца обичат сладолед. (мн.ч.)',      options: ['Всички', 'Всеки', 'Всяка', 'Всяко'],   correctAnswer: 'Всички'},
      { id: 'ob03', left: '… месец отивам на село. (м.р.)',        options: ['Всеки', 'Всяка', 'Всяко', 'Всички'],   correctAnswer: 'Всеки' },
      { id: 'ob04', left: '… сутрин виждам брат ти. (ж.р.)',       options: ['Всяка', 'Всеки', 'Всяко', 'Всички'],   correctAnswer: 'Всяка' },
      { id: 'ob05', left: '… вечер давам пари на децата. (ж.р.)',  options: ['Всяка', 'Всеки', 'Всяко', 'Всички'],   correctAnswer: 'Всяка' },
      { id: 'ob06', left: '… хора искат работа. (мн.ч.)',          options: ['Всички', 'Всеки', 'Всяка', 'Всяко'],   correctAnswer: 'Всички'},
      { id: 'ob07', left: '… лято ходим на море. (ср.р.)',         options: ['Всяко', 'Всеки', 'Всяка', 'Всички'],   correctAnswer: 'Всяко' },
    ],
  },

  // ORDER 47 — Упр. 28: Въпросителни думи — справка
  {
    id: 'a2-l00-gramatika-15',
    type: 'grammar_table',
    title: 'ГРАМАТИКА — Въпросителни думи',
    instruction: 'Запознайте се с въпросителните думи. Натиснете за произношение.',
    order: 47,
    tableTitle: 'Въпросителни думи',
    columns: ['Пример'],
    rows: [
      { pronoun: 'Какво?',  cells: ['**Какво** е това?'],            ttsText: 'Какво е това?' },
      { pronoun: '',        cells: ['**Какво** правите всеки ден?'], ttsText: 'Какво правите всеки ден?', ttsModel: 'pro' },
      { pronoun: 'Какъв?',  cells: ['**Какъв** чай искате?'],        ttsText: 'Какъв чай искате?' },
      { pronoun: '',        cells: ['**Какъв** е адресът Ви?'],      ttsText: 'Какъв е адресът Ви?' },
      { pronoun: 'Кой?',    cells: ['**Кой** е това?'],              ttsText: 'Кой е това?' },
      { pronoun: '',        cells: ['**Кой** ден е днес?'],          ttsText: 'Кой ден е днес?' },
      { pronoun: 'Къде?',   cells: ['**Къде** е спирката?'],         ttsText: 'Къде е спирката?' },
      { pronoun: '',        cells: ['**Къде** живеете?'],            ttsText: 'Къде живеете?' },
      { pronoun: 'Откъде?', cells: ['**Откъде** сте?'],              ttsText: 'Откъде сте?' },
      { pronoun: 'Кога?',   cells: ['**Кога** сте роден?'],          ttsText: 'Кога сте роден?' },
      { pronoun: 'Как?',    cells: ['**Как** сте?'],                 ttsText: 'Как сте?' },
      { pronoun: '',        cells: ['**Как** се казвате?'],          ttsText: 'Как се казвате?' },
      { pronoun: 'Колко?',  cells: ['**Колко** е часът?'],           ttsText: 'Колко е часът?' },
      { pronoun: '',        cells: ['**Колко** струва билетът?'],    ttsText: 'Колко струва билетът?' },
      { pronoun: '',        cells: ['**Колко** братя имате?'],       ttsText: 'Колко братя имате?' },
    ],
    // Reference table: the question word is already bolded inside each example,
    // so the separate label column is redundant — hide it (A2GrammarTable opt-in).
    hidePronounColumn: true,
  } as GrammarTableExercise,

  // ORDER 47.1 — Упр. 28: КАКЪВ/КАКВА/КАКВО/КАКВИ по род и число (стр. 15)
  {
    id: 'a2-l00-gramatika-15b',
    type: 'grammar_table',
    title: 'ГРАМАТИКА — КАКЪВ, КАКВА, КАКВО, КАКВИ',
    instruction: 'Запознайте се с формите по род и число. Натиснете за произношение.',
    order: 47.1,
    tableTitle: 'КАКЪВ по род и число',
    columns: ['Пример'],
    rows: [
      { pronoun: 'м.р.',  cells: ['**какъв** чай'],      ttsText: 'Мъжки род. какъв чай.' },
      { pronoun: 'ж.р.',  cells: ['**каква** пица'],     ttsText: 'Женски род. каква пица.' },
      { pronoun: 'ср.р.', cells: ['**какво** кафе'],     ttsText: 'Среден род. какво кафе.' },
      { pronoun: 'мн.ч.', cells: ['**какви** плодове'],  ttsText: 'Множествено число. какви плодове.' },
    ],
  },

  // ORDER 47.2 — Упр. 28: КОЙ/КОЯ/КОЕ/КОИ по род и число (стр. 15)
  {
    id: 'a2-l00-gramatika-15c',
    type: 'grammar_table',
    title: 'ГРАМАТИКА — КОЙ, КОЯ, КОЕ, КОИ',
    instruction: 'Запознайте се с формите по род и число. Натиснете за произношение.',
    order: 47.2,
    tableTitle: 'КОЙ по род и число',
    columns: ['Пример'],
    rows: [
      { pronoun: 'м.р.',  cells: ['**кой** мъж'],   ttsText: 'Мъжки род. кой мъж.' },
      { pronoun: 'ж.р.',  cells: ['**коя** жена'],  ttsText: 'Женски род. коя жена.' },
      { pronoun: 'ср.р.', cells: ['**кое** дете'],  ttsText: 'Среден род. Коè дете.', ttsModel: 'pro', ttsPrompt: 'Bulgarian word дете. Pronounce clearly with a Д sound, never with a Б sound.' },
      { pronoun: 'мн.ч.', cells: ['**кои** хора'],  ttsText: 'Множествено число. кои хора.' },
    ],
  },

  // ORDER 47.3 — Упр. 28: Въпроси с частицата ЛИ (стр. 15)
  {
    id: 'a2-l00-gramatika-15d',
    type: 'grammar_table',
    title: 'ГРАМАТИКА — Въпроси с ЛИ',
    instruction: 'Запознайте се с въпросите с частицата ЛИ. Натиснете за произношение.',
    order: 47.3,
    tableTitle: 'Въпроси с ЛИ',
    columns: ['Пример'],
    rows: [
      { pronoun: '', cells: ['Вие българи **ли** сте?'], ttsText: 'Вие българи ли сте?' },
      { pronoun: '', cells: ['Обичате **ли** кафе?'],    ttsText: 'Обичате ли кафе?' },
      { pronoun: '', cells: ['Има **ли** хляб?'],        ttsText: 'Има ли хляб?' },
      { pronoun: '', cells: ['Може **ли** сметката?'],   ttsText: 'Може ли сметката?' },
    ],
    // Empty label column → hide it; listen icon sits after each phrase.
    hidePronounColumn: true,
  } as GrammarTableExercise,

  // ORDER 48 — Упр. 28а: Въпросителни думи — упражнение (часть 1)
  {
    id: 'a2-l00-ex-28a',
    type: 'dropdown_match',
    title: 'УПРАЖНЕНИЕ',
    instruction: 'Изберете правилната въпросителна дума.',
    instructionKey: 'a2.ex.vaprositelniDumi',
    order: 48,
    points: 25,
    questions: [
      { id: 'vd01', left: '… обича Соня за закуска?',                       options: ['Какво', 'Кога', 'Колко'], correctAnswer: 'Какво' },
      { id: 'vd02', left: '… имаш рожден ден?',                             options: ['Кога', 'Колко', 'Какво'], correctAnswer: 'Кога'  },
      { id: 'vd03', left: '… кафе искате – дълго или късо?',                options: ['Какво', 'Кога', 'Как'],   correctAnswer: 'Какво' },
      { id: 'vd04', left: 'Женен … си?',                                    options: ['ли', 'как', 'кога'],      correctAnswer: 'ли'    },
      { id: 'vd05', left: '… деца имате?',                                  options: ['Колко', 'Кога', 'Как'],   correctAnswer: 'Колко' },
      { id: 'vd06', left: 'Знаеш … български език?',                        options: ['ли', 'как', 'кога'],      correctAnswer: 'ли'    },
      { id: 'vd07', left: '… е адресът на „Каритас“?',                      options: ['Какъв', 'Кога', 'Колко'], correctAnswer: 'Какъв' },
      { id: 'vd08', left: '… спира автобусът от София?',                    options: ['Къде', 'Какво', 'Колко'], correctAnswer: 'Къде'  },
      { id: 'vd09', left: '… струва една минерална вода?',                  options: ['Колко', 'Кога', 'Как'],   correctAnswer: 'Колко' },
      { id: 'vd10', left: '… минути закъснява влакът?',                     options: ['Колко', 'Как', 'Кога'],   correctAnswer: 'Колко' },
      { id: 'vd11', left: '… е времето през пролетта?',                     options: ['Какво', 'Кога', 'Колко'], correctAnswer: 'Какво' },
      { id: 'vd12', left: '… души има в стаята?',                          options: ['Колко', 'Как', 'Кога'],   correctAnswer: 'Колко' },
      { id: 'vd13', left: 'В … часа вечеряте?',                             options: ['колко', 'кога', 'как'],   correctAnswer: 'колко' },
      { id: 'vd14', left: '… обичате?',                                     options: ['Какво', 'Кога', 'Колко'], correctAnswer: 'Какво' },
      { id: 'vd15', left: '… часа е пътят до Варна?',                       options: ['Колко', 'Как', 'Кога'],   correctAnswer: 'Колко' },
      { id: 'vd16', left: '… пътуваш от центъра до автогарата?',           options: ['Как', 'Какво', 'Кой'],    correctAnswer: 'Как'   },
      { id: 'vd17', left: 'Може … сметката?',                               options: ['ли', 'как', 'кога'],      correctAnswer: 'ли'    },
      { id: 'vd18', left: '… лева е наемът на квартирата?',                 options: ['Колко', 'Как', 'Кога'],   correctAnswer: 'Колко' },
      { id: 'vd19', left: '… дрехи носиш в офиса?',                         options: ['Какви', 'Кога', 'Как'],   correctAnswer: 'Какви' },
      { id: 'vd20', left: '… празници има в страната Ви?',                  options: ['Какви', 'Кога', 'Как'],   correctAnswer: 'Какви' },
      { id: 'vd21', left: '… се казва сестра ти?',                          options: ['Как', 'Кога', 'Колко'],   correctAnswer: 'Как'   },
      { id: 'vd22', left: '… цвят са ботушите?',                            options: ['Какъв', 'Кога', 'Колко'], correctAnswer: 'Какъв' },
      { id: 'vd23', left: 'Вие араби … сте?',                               options: ['ли', 'как', 'кога'],      correctAnswer: 'ли'    },
      { id: 'vd24', left: 'На … сектор спира автобусът от Благоевград?',    options: ['кой', 'как', 'кога'],     correctAnswer: 'кой'   },
      { id: 'vd25', left: '… живеят Ваня и Стоян?',                         options: ['Къде', 'Какво', 'Колко'], correctAnswer: 'Къде'  },
    ],
  },

  // ORDER 49 — Упр. 28б: Въпросителни думи — упражнение (часть 2)
  {
    id: 'a2-l00-ex-28b',
    type: 'dropdown_match',
    title: 'УПРАЖНЕНИЕ',
    instruction: 'Изберете правилната въпросителна дума.',
    instructionKey: 'a2.ex.vaprositelniDumi',
    order: 49,
    points: 24,
    questions: [
      { id: 'vd26', left: '… е столицата на България?',                     options: ['Коя', 'Как', 'Колко'],    correctAnswer: 'Коя'   },
      { id: 'vd27', left: 'На … години е баща ти?',                         options: ['колко', 'как', 'кога'],   correctAnswer: 'колко' },
      { id: 'vd28', left: '… лева имаш?',                                    options: ['Колко', 'Как', 'Кога'],   correctAnswer: 'Колко' },
      { id: 'vd29', left: 'Тя учителка … е?',                                options: ['ли', 'как', 'кога'],      correctAnswer: 'ли'    },
      { id: 'vd30', left: '… обича шоколад?',                                options: ['Кой', 'Кога', 'Колко'],   correctAnswer: 'Кой'   },
      { id: 'vd31', left: '… струват 200 грама маслини?',                   options: ['Колко', 'Как', 'Кога'],   correctAnswer: 'Колко' },
      { id: 'vd32', left: 'Свободен … си?',                                  options: ['ли', 'как', 'кога'],      correctAnswer: 'ли'    },
      { id: 'vd33', left: '… стаи има апартаментът?',                       options: ['Колко', 'Как', 'Кога'],   correctAnswer: 'Колко' },
      { id: 'vd34', left: 'Те от Украйна … са?',                             options: ['ли', 'как', 'кога'],      correctAnswer: 'ли'    },
      { id: 'vd35', left: '… тръгва автобусът за Русе?',                     options: ['Кога', 'Какво', 'Колко'], correctAnswer: 'Кога'  },
      { id: 'vd36', left: '… искате за вечеря?',                             options: ['Какво', 'Кога', 'Как'],   correctAnswer: 'Какво' },
      { id: 'vd37', left: 'От … коловоз заминава влакът за Бургас?',        options: ['кой', 'как', 'кога'],     correctAnswer: 'кой'   },
      { id: 'vd38', left: '… е улица „Иван Вазов“?',                         options: ['Къде', 'Какво', 'Колко'], correctAnswer: 'Къде'  },
      { id: 'vd39', left: 'Искаш … вода?',                                   options: ['ли', 'как', 'кога'],      correctAnswer: 'ли'    },
      { id: 'vd40', left: 'Пушенето забранено … е?',                         options: ['ли', 'как', 'кога'],      correctAnswer: 'ли'    },
      { id: 'vd41', left: '… номер дрехи носиш?',                            options: ['Какъв', 'Кога', 'Колко'], correctAnswer: 'Какъв' },
      { id: 'vd42', left: '… плодове обичаш?',                               options: ['Какви', 'Кога', 'Как'],   correctAnswer: 'Какви' },
      { id: 'vd43', left: '… често ходите на ресторант?',                   options: ['Колко', 'Как', 'Кога'],   correctAnswer: 'Колко' },
      { id: 'vd44', left: '… правят българите на Нова година?',             options: ['Какво', 'Кога', 'Колко'], correctAnswer: 'Какво' },
      { id: 'vd45', left: 'Има … домати и краставици?',                      options: ['ли', 'как', 'кога'],      correctAnswer: 'ли'    },
      { id: 'vd46', left: '… дата е днес?',                                  options: ['Коя', 'Как', 'Колко'],    correctAnswer: 'Коя'   },
      { id: 'vd47', left: '… е пощата?',                                     options: ['Къде', 'Какво', 'Колко'], correctAnswer: 'Къде'  },
      { id: 'vd48', left: '… се връщаш от Хасково?',                         options: ['Кога', 'Какво', 'Колко'], correctAnswer: 'Кога'  },
      { id: 'vd49', left: 'Свободно … е?',                                   options: ['ли', 'как', 'кога'],      correctAnswer: 'ли'    },
    ],
  },

];

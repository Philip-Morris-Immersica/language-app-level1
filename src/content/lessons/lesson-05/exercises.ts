import type {
  Exercise,
  ImageLabelingExercise,
  IllustratedCardsExercise,
  DropdownMatchExercise,
  SyllableBlocksExercise,
  ReadingTextExercise,
  DialoguesExercise,
  GrammarExamplesExercise,
  WorkbookFillBlankExercise,
  GrammarTableExercise,
  MultipleChoiceExercise,
  TrueFalseExercise,
  DragToColumnsExercise,
  TableFillExercise,
  MatchPairsExercise,
} from '@/content/types';

// Урок 5 — по клиент НЕ се дигитализират упр. 7, 8, 20, 31, 39 (само в клас/на лист).
// Упр. 10: дигитален вариант — визитка по модел (Мария от ДИАЛОЗИ 1); личната визитка — на хартия.
// Упр. 18: препроверете В/Г спрямо картата от упр. 2.
// Упр. 29: попълване по текст; аудио — опционално.

export const exercises: Exercise[] = [
  {
    id: 'l05-ex-01',
    type: 'image_labeling',
    instruction: 'Знаете ли тези места? Напишете в кои градове се намират.',
    order: 1,
    points: 5,
    displayType: 'default',
    images: [
      { id: 'sofia', imageUrl: '/assets/lesson-05/01-upr-01-zabelezhitelnosti-gradove/01-aleksandar-nevski-sofia.jpg', correctLabel: 'София', acceptableLabels: ['софия'] },
      { id: 'kairo', imageUrl: '/assets/lesson-05/01-upr-01-zabelezhitelnosti-gradove/02-piramidi-kairo.jpg', correctLabel: 'Кайро', acceptableLabels: ['кайро'] },
      { id: 'london', imageUrl: '/assets/lesson-05/01-upr-01-zabelezhitelnosti-gradove/03-big-ben-london.jpg', correctLabel: 'Лондон', acceptableLabels: ['лондон'] },
      { id: 'istanbul', imageUrl: '/assets/lesson-05/01-upr-01-zabelezhitelnosti-gradove/04-sinyata-dzhamiya-istanbul.jpg', correctLabel: 'Истанбул', acceptableLabels: ['истанбул'] },
      { id: 'parizh', imageUrl: '/assets/lesson-05/01-upr-01-zabelezhitelnosti-gradove/05-ayfelova-kula-parizh.jpg', correctLabel: 'Париж', acceptableLabels: ['париж'] },
    ],
    options: ['Истанбул', 'Кайро', 'Лондон', 'Париж', 'София'],
  } as ImageLabelingExercise,

  {
    id: 'l05-novi-dumi-01',
    type: 'illustrated_cards',
    title: 'НОВИ ДУМИ 1',
    instruction: 'Натиснете за произношение.',
    order: 2,
    audioUrl: '/assets/lesson-05/audio/22-urok-5-novi-dumi-1.mp3',
    cards: [
      { id: 'apteka', imageUrl: '/assets/lesson-05/02-novi-dumi-1-mesta-v-grada/01-apteka.jpg', label: 'аптека' },
      { id: 'banka', imageUrl: '/assets/lesson-05/02-novi-dumi-1-mesta-v-grada/02-banka.jpg', label: 'банка' },
      { id: 'biblioteka', imageUrl: '/assets/lesson-05/02-novi-dumi-1-mesta-v-grada/03-biblioteka.jpg', label: 'библиотека' },
      { id: 'blok', imageUrl: '/assets/lesson-05/02-novi-dumi-1-mesta-v-grada/04-blok.jpg', label: 'блок' },
      { id: 'bolnitsa', imageUrl: '/assets/lesson-05/02-novi-dumi-1-mesta-v-grada/05-bolnitsa.jpg', label: 'болница' },
      { id: 'bulevard', imageUrl: '/assets/lesson-05/02-novi-dumi-1-mesta-v-grada/06-bulevard.jpg', label: 'булевард' },
      { id: 'kafe', imageUrl: '/assets/lesson-05/02-novi-dumi-1-mesta-v-grada/07-kafe.jpg', label: 'кафе' },
      { id: 'kino', imageUrl: '/assets/lesson-05/02-novi-dumi-1-mesta-v-grada/08-kino.jpg', label: 'кино' },
      { id: 'muzei', imageUrl: '/assets/lesson-05/02-novi-dumi-1-mesta-v-grada/09-muzey.jpg', label: 'музей' },
      { id: 'teatar', imageUrl: '/assets/lesson-05/02-novi-dumi-1-mesta-v-grada/10-teatar.jpg', label: 'театър' },
      { id: 'ulitsa', imageUrl: '/assets/lesson-05/02-novi-dumi-1-mesta-v-grada/11-ulitsa.jpg', label: 'улица' },
      { id: 'hotel', imageUrl: '/assets/lesson-05/02-novi-dumi-1-mesta-v-grada/12-hotel.jpg', label: 'хотел' },
      { id: 'restorant', imageUrl: '/assets/lesson-05/02-novi-dumi-1-mesta-v-grada/13-restorant.jpg', label: 'ресторант' },
      { id: 'supermarket', imageUrl: '/assets/lesson-05/02-novi-dumi-1-mesta-v-grada/14-supermarket.jpg', label: 'супермаркет (супер)' },
      { id: 'universitet', imageUrl: '/assets/lesson-05/02-novi-dumi-1-mesta-v-grada/15-universitet.jpg', label: 'университет' },
    ],
  } as IllustratedCardsExercise,

  {
    id: 'l05-ex-02',
    type: 'dropdown_match',
    instruction: 'Това е центърът на един град в България. За всяка икона изберете правилната дума за сградата (вижте картата).',
    order: 3,
    points: 12,
    imageUrl: '/assets/lesson-05/03-upr-02-karta-grad/01-karta-grad-centar.jpg',
    questions: [
      { id: 'm1', left: 'Многоетажна жилищна сграда (горе вляво)', options: ['блок', 'хотел', 'банка', 'ресторант'], correctAnswer: 'блок' },
      { id: 'm2', left: 'Виличка и лъжица', options: ['ресторант', 'кафе', 'кино', 'супермаркет'], correctAnswer: 'ресторант' },
      { id: 'm3', left: 'Отворена книга (долу вляво)', options: ['библиотека', 'музей', 'училище', 'поща'], correctAnswer: 'библиотека' },
      { id: 'm4', left: 'Академична шапка', options: ['университет', 'училище', 'община', 'театър'], correctAnswer: 'университет' },
      { id: 'm5', left: 'Колони / античен фасад', options: ['музей', 'банка', 'болница', 'аптека'], correctAnswer: 'музей' },
      { id: 'm6', left: 'Легло', options: ['хотел', 'блок', 'кафе', 'кино'], correctAnswer: 'хотел' },
      { id: 'm7', left: 'Маски за театър', options: ['театър', 'кино', 'музей', 'поща'], correctAnswer: 'театър' },
      { id: 'm8', left: 'Чаша на Хигия (змия)', options: ['аптека', 'болница', 'банка', 'поща'], correctAnswer: 'аптека' },
      { id: 'm9', left: 'Червен кръст', options: ['болница', 'аптека', 'полиция', 'поща'], correctAnswer: 'болница' },
      { id: 'm10', left: 'Киноплатно / клапа', options: ['кино', 'театър', 'кафе', 'ресторант'], correctAnswer: 'кино' },
      { id: 'm11', left: 'Пареща чаша', options: ['кафе', 'ресторант', 'кино', 'банка'], correctAnswer: 'кафе' },
      { id: 'm12', left: 'Количка за пазар', options: ['супермаркет', 'пазар', 'магазин', 'банка'], correctAnswer: 'супермаркет' },
    ],
  } as DropdownMatchExercise,

  {
    id: 'l05-novi-dumi-02',
    type: 'illustrated_cards',
    title: 'НОВИ ДУМИ 2',
    instruction: 'Натиснете за произношение.',
    order: 4,
    audioUrl: '/assets/lesson-05/audio/23-urok-5-novi-dumi-2.mp3',
    cards: [
      { id: 'dg', imageUrl: '/assets/lesson-05/04-novi-dumi-2-mesta/01-detska-gradina.jpg', label: 'детска градина' },
      { id: 'dp', imageUrl: '/assets/lesson-05/04-novi-dumi-2-mesta/02-detska-ploshtadka.jpg', label: 'детска площадка' },
      { id: 'dzhamiya', imageUrl: '/assets/lesson-05/04-novi-dumi-2-mesta/03-dzhamiya.jpg', label: 'джамия' },
      { id: 'kashta', imageUrl: '/assets/lesson-05/04-novi-dumi-2-mesta/04-kashta.jpg', label: 'къща' },
      { id: 'magazin', imageUrl: '/assets/lesson-05/04-novi-dumi-2-mesta/05-magazin.jpg', label: 'магазин' },
      { id: 'most', imageUrl: '/assets/lesson-05/04-novi-dumi-2-mesta/06-most.jpg', label: 'мост' },
      { id: 'obshtina', imageUrl: '/assets/lesson-05/04-novi-dumi-2-mesta/07-obshtina.jpg', label: 'община' },
      { id: 'pazar', imageUrl: '/assets/lesson-05/04-novi-dumi-2-mesta/08-pazar.jpg', label: 'пазар' },
      { id: 'pametnik', imageUrl: '/assets/lesson-05/04-novi-dumi-2-mesta/09-pametnik.jpg', label: 'паметник' },
      { id: 'park', imageUrl: '/assets/lesson-05/04-novi-dumi-2-mesta/10-park.jpg', label: 'парк' },
      { id: 'ploshtad', imageUrl: '/assets/lesson-05/04-novi-dumi-2-mesta/11-ploshtad.jpg', label: 'площад' },
      { id: 'poshta', imageUrl: '/assets/lesson-05/04-novi-dumi-2-mesta/12-poshta.jpg', label: 'поща' },
      { id: 'reka', imageUrl: '/assets/lesson-05/04-novi-dumi-2-mesta/13-reka.jpg', label: 'река' },
      { id: 'uchilishte', imageUrl: '/assets/lesson-05/04-novi-dumi-2-mesta/14-uchilishte.jpg', label: 'училище' },
      { id: 'tsarkva', imageUrl: '/assets/lesson-05/04-novi-dumi-2-mesta/15-tsarkva.jpg', label: 'църква' },
    ],
  } as IllustratedCardsExercise,

  {
    id: 'l05-ex-03',
    type: 'dropdown_match',
    instruction: 'Това е центърът на едно село в България. Напишете имената на сградите. (Изберете според иконите на картата.)',
    order: 5,
    points: 10,
    imageUrl: '/assets/lesson-05/05-upr-03-karta-selo/01-karta-selo-centar.jpg',
    questions: [
      { id: 's1', left: 'Къща (пример в учебника)', options: ['къща', 'блок', 'училище', 'църква'], correctAnswer: 'къща' },
      { id: 's2', left: 'Пързалка / люлки', options: ['детска площадка', 'парк', 'пазар', 'градина'], correctAnswer: 'детска площадка' },
      { id: 's3', left: 'Паметник на кръговото', options: ['паметник', 'площад', 'община', 'църква'], correctAnswer: 'паметник' },
      { id: 's4', left: 'Полумесец (религиозна сграда)', options: ['джамия', 'църква', 'училище', 'община'], correctAnswer: 'джамия' },
      { id: 's5', left: 'Книга', options: ['училище', 'библиотека', 'община', 'поща'], correctAnswer: 'училище' },
      { id: 's6', left: 'Мост над вода', options: ['мост', 'улица', 'парк', 'река'], correctAnswer: 'мост' },
      { id: 's7', left: 'Вълни (вода)', options: ['река', 'мост', 'парк', 'площад'], correctAnswer: 'река' },
      { id: 's8', left: 'Православен кръст', options: ['църква', 'джамия', 'община', 'пазар'], correctAnswer: 'църква' },
      { id: 's9', left: 'Пощенски плик', options: ['поща', 'магазин', 'пазар', 'община'], correctAnswer: 'поща' },
      { id: 's10', left: 'Знаме (администрация)', options: ['община', 'училище', 'полиция', 'банка'], correctAnswer: 'община' },
    ],
  } as DropdownMatchExercise,

  {
    id: 'l05-ex-04',
    type: 'syllable_blocks',
    instruction: 'Подредете сричките в думи и ги напишете.',
    order: 6,
    points: 10,
    imageUrl: '', // TODO: зелената таблица от учебника (стр. 46) — липсва като отделно изображение в IMAGE-MAPPING
    puzzles: [
      { id: 'p1', syllables: ['РЕС-', '-ТО-', '-РАНТ'], correctWord: 'РЕСТОРАНТ' },
      { id: 'p2', syllables: ['БОЛ-', '-НИ-', '-ЦА'], correctWord: 'БОЛНИЦА' },
      { id: 'p3', syllables: ['СУ-', '-ПЕР-', '-МАР-', '-КЕТ'], correctWord: 'СУПЕРМАРКЕТ' },
      { id: 'p4', syllables: ['У-', '-ЧИ-', '-ЛИ-', '-ЩЕ'], correctWord: 'УЧИЛИЩЕ' },
      { id: 'p5', syllables: ['МУ-', '-ЗЕЙ'], correctWord: 'МУЗЕЙ' },
      { id: 'p6', syllables: ['ПЛО-', '-ЩАД'], correctWord: 'ПЛОЩАД' },
      { id: 'p7', syllables: ['БУ-', '-ЛЕ-', '-ВАРД'], correctWord: 'БУЛЕВАРД' },
      { id: 'p8', syllables: ['МА-', '-ГА-', '-ЗИН'], correctWord: 'МАГАЗИН' },
      { id: 'p9', syllables: ['ДЖА-', '-МИЯ'], correctWord: 'ДЖАМИЯ' },
      { id: 'p10', syllables: ['ХО-', '-ТЕЛ'], correctWord: 'ХОТЕЛ' },
    ],
  } as SyllableBlocksExercise,

  {
    id: 'l05-ex-05',
    type: 'reading_text',
    title: 'УПРАЖНЕНИЕ 5',
    instruction: 'Какво има в центъра на града? Вижте картата от упр. 2.',
    order: 7,
    images: [{ imageUrl: '/assets/lesson-05/03-upr-02-karta-grad/01-karta-grad-centar.jpg', label: 'Карта — упр. 2' }],
    paragraphs: [
      'Има един ресторант, много блокове, ... — напишете останалата част на лист или в тетрадка според картата от упр. 2.',
    ],
    showDictionary: true,
  } as ReadingTextExercise,

  {
    id: 'l05-ex-06',
    type: 'reading_text',
    title: 'УПРАЖНЕНИЕ 6',
    instruction: 'Какво има и какво няма в селото? Вижте картата от упр. 3.',
    order: 8,
    images: [{ imageUrl: '/assets/lesson-05/05-upr-03-karta-selo/01-karta-selo-centar.jpg', label: 'Карта — упр. 3' }],
    paragraphs: [
      'Има един площад, много къщи, ... Няма аптека, ... — допишете според картата от упр. 3.',
    ],
    showDictionary: true,
  } as ReadingTextExercise,

  {
    id: 'l05-dialozi-01',
    type: 'dialogues',
    title: 'ДИАЛОЗИ 1',
    instruction: 'Прочетете диалозите.',
    order: 9,
    audioUrl: '/assets/lesson-05/audio/24-urok-5-dialozi-1.mp3',
    sections: [
      {
        id: 'a',
        lines: [
          { text: '— Къде живееш?' },
          { text: '— Аз живея в София, на улица „Гурко“ 25.' },
        ],
      },
      {
        id: 'b',
        lines: [
          { text: '— Къде живее Мария?' },
          { text: '— Тя живее в София, в квартал „Младост“ 2, блок 243, вход А, етаж 2, апартамент 5.' },
        ],
      },
      {
        id: 'v',
        lines: [
          { text: '— Къде живее Абдул?' },
          { text: '— Той живее в жк „Люлин“ 7, бл. 704, вх. Б, ет. 4, ап. 12.' },
        ],
      },
      {
        id: 'g',
        lines: [
          { text: '— Къде живеят Петър и Дора?' },
          { text: '— Те живеят в Перник.' },
          { text: '— В къща или в блок?' },
          { text: '— В блок, но имат къща на село.' },
        ],
      },
    ],
  } as DialoguesExercise,

  {
    id: 'l05-info-sakra',
    type: 'grammar_examples',
    title: 'Адресни съкращения',
    instruction: 'Запомнете съкратените форми.',
    order: 10,
    examples: [
      { imageUrl: '', text: 'гр. = град', subtext: '' },
      { imageUrl: '', text: 'с. = село', subtext: '' },
      { imageUrl: '', text: 'кв. = квартал', subtext: '' },
      { imageUrl: '', text: 'жк = жилищен комплекс', subtext: '' },
      { imageUrl: '', text: 'ул. = улица', subtext: '' },
      { imageUrl: '', text: 'бул. = булевард', subtext: '' },
      { imageUrl: '', text: '№ = номер', subtext: '' },
      { imageUrl: '', text: 'бл. = блок', subtext: '' },
      { imageUrl: '', text: 'вх. = вход', subtext: '' },
      { imageUrl: '', text: 'ет. = етаж', subtext: '' },
      { imageUrl: '', text: 'ап. = апартамент', subtext: '' },
      { imageUrl: '', text: 'тел. = телефон', subtext: '' },
    ],
  } as GrammarExamplesExercise,

  {
    id: 'l05-ex-09',
    type: 'workbook_fill_blank',
    instruction: 'Напишете адресите, като използвате съкратените форми.',
    order: 11,
    points: 2,
    layout: 'single',
    sentences: [
      { text: 'Модел: квартал Лозенец → кв. „Лозенец“', blanks: [], correctAnswers: [], isExample: true },
      {
        text: 'квартал „Лозенец“, булевард „Джеймс Баучър“, номер 76 → _______',
        blanks: [0],
        correctAnswers: ['кв. „Лозенец“, бул. „Джеймс Баучър“, № 76'],
        options: ['кв. „Лозенец“, бул. „Джеймс Баучър“, № 76', 'кв. Лозенец, бул. Джеймс Баучър, 76', 'квартал „Лозенец“, булевард „Джеймс Баучър“, номер 76'],
      },
      {
        text: 'жилищен комплекс „Илинден“, блок 55, вход В, етаж 1, апартамент 47 → _______',
        blanks: [0],
        correctAnswers: ['жк „Илинден“, бл. 55, вх. В, ет. 1, ап. 47'],
        options: ['жк „Илинден“, бл. 55, вх. В, ет. 1, ап. 47', 'ж.к. Илинден, блок 55, вход В', 'жилищен комплекс Илинден, бл. 55'],
      },
    ],
  } as WorkbookFillBlankExercise,

  {
    id: 'l05-ex-10',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 10',
    instruction:
      'В учебника си правите лична визитка на хартия с вашите име, адрес (със съкращения) и телефон — направете го на лист или в тетрадка. Тук упражняваме същото по модел: попълнете визитката на Мария от диалога „ДИАЛОЗИ 1“ (б).',
    order: 12,
    points: 3,
    layout: 'single',
    sentences: [
      {
        text: 'Име: _______',
        blanks: [0],
        correctAnswers: ['Мария'],
        options: ['Мария', 'Абдул', 'Петър', 'Дора'],
      },
      {
        text: 'Град: _______',
        blanks: [0],
        correctAnswers: ['София'],
        options: ['София', 'Перник', 'Пловдив', 'Варна'],
      },
      {
        text: 'Адрес със съкращения (както в диалога): _______',
        blanks: [0],
        correctAnswers: ['кв. „Младост“ 2, бл. 243, вх. А, ет. 2, ап. 5'],
        options: [
          'кв. „Младост“ 2, бл. 243, вх. А, ет. 2, ап. 5',
          'жк „Люлин“ 7, бл. 704, вх. Б, ет. 4, ап. 12',
          'ул. „Гурко“ 25',
          'кв. „Лозенец“, бул. „Джеймс Баучър“, № 76',
        ],
      },
    ],
  } as WorkbookFillBlankExercise,

  {
    id: 'l05-ex-11',
    type: 'reading_text',
    title: 'УПРАЖНЕНИЕ 11',
    instruction:
      'В учебника: слушане и попълване на визитка в тетрадка. В приложението: попълнете визитката по текст (или четете на глас с партньор). Ако има запис от учителя — качете го в проекта и задайте audioUrl.',
    order: 13,
    audioUrl: '', // TODO: опционален MP3 от учителя
    paragraphs: [
      'Текст за упражнение: „Аз се казвам Елена Иванова. Живея в Бургас, ул. „Александровска“ 14, ап. 3. Телефон: 0888 123 456.“ — препишете данните на визитка на лист; в класа може да се ползва и запис.',
    ],
  } as ReadingTextExercise,

  {
    id: 'l05-gramatika-01',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 1',
    subtitle: '→ Граматика – Сегашно време (12)',
    instruction: 'Глагол ЖИВЕЯ в сегашно време — прегледайте таблицата и примера.',
    order: 14,
    tableTitle: 'Живея (живе–)',
    columns: ['Лице', 'Форма'],
    rows: [
      { pronoun: 'аз', cells: ['живея'] },
      { pronoun: 'ти', cells: ['живееш'] },
      { pronoun: 'той / тя / то', cells: ['живее'] },
      { pronoun: 'ние', cells: ['живеем'] },
      { pronoun: 'вие', cells: ['живеете'] },
      { pronoun: 'те', cells: ['живеят'] },
    ],
    notes: ['Иван живее в София, на улица „Янтра“ 5.'],
  } as GrammarTableExercise,

  {
    id: 'l05-ex-12',
    type: 'dropdown_match',
    instruction: 'Свържете местоимението с правилната глаголна форма.',
    order: 15,
    points: 8,
    questions: [
      { id: 'q1', left: 'аз …', options: ['живея', 'живееш', 'живее', 'живеем'], correctAnswer: 'живея' },
      { id: 'q2', left: 'ти …', options: ['живея', 'живееш', 'живее', 'живеете'], correctAnswer: 'живееш' },
      { id: 'q3', left: 'той …', options: ['живея', 'живее', 'живеем', 'живеят'], correctAnswer: 'живее' },
      { id: 'q4', left: 'тя …', options: ['живееш', 'живее', 'живеете', 'живеят'], correctAnswer: 'живее' },
      { id: 'q5', left: 'то …', options: ['живея', 'живее', 'живеем', 'живеят'], correctAnswer: 'живее' },
      { id: 'q6', left: 'ние …', options: ['живеем', 'живеете', 'живеят', 'живее'], correctAnswer: 'живеем' },
      { id: 'q7', left: 'вие …', options: ['живея', 'живееш', 'живеете', 'живеят'], correctAnswer: 'живеете' },
      { id: 'q8', left: 'те …', options: ['живее', 'живеем', 'живеете', 'живеят'], correctAnswer: 'живеят' },
    ],
  } as DropdownMatchExercise,

  {
    id: 'l05-ex-13',
    type: 'workbook_fill_blank',
    instruction: 'Попълнете окончанията.',
    order: 16,
    points: 6,
    layout: 'single',
    sentences: [
      { text: 'Аз живе_______ в София.', blanks: [0], correctAnswers: ['я'], isExample: true },
      { text: 'Ти къде живе_______?', blanks: [0], correctAnswers: ['еш'], options: ['еш', 'я', 'е', 'ем'] },
      { text: 'Той живе_______ на булевард „България“.', blanks: [0], correctAnswers: ['е'], options: ['е', 'еш', 'ете', 'ят'] },
      { text: 'Ние не живе_______ в Иран.', blanks: [0], correctAnswers: ['ем'], options: ['ем', 'ете', 'ят', 'е'] },
      { text: 'Те живе_______ на село.', blanks: [0], correctAnswers: ['ят'], options: ['ят', 'ете', 'еш', 'я'] },
      { text: 'Вие не живе_______ във Варна.', blanks: [0], correctAnswers: ['ете'], options: ['ете', 'ем', 'ят', 'е'] },
      { text: 'Тя живе_______ в жк „Люлин“.', blanks: [0], correctAnswers: ['е'], options: ['е', 'еш', 'ете', 'ят'] },
    ],
  } as WorkbookFillBlankExercise,

  {
    id: 'l05-gramatika-02',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 2',
    subtitle: '→ Граматика – Членуване на съществителните (4)',
    instruction: 'Членуване — единствено число.',
    order: 17,
    tableTitle: 'Определителна стативна форма (ед.ч.)',
    columns: ['Род', 'Окончание', 'Примери'],
    rows: [
      { pronoun: 'м.р. (а)', cells: ['-ът / -а', 'пазарът / в центъра'] },
      { pronoun: 'м.р. (б)', cells: ['-ят / -я', 'учителят / при учителя'] },
      { pronoun: 'ж.р.', cells: ['-та', 'банката, улицата, пощата'] },
      { pronoun: 'ср.р.', cells: ['-то', 'кафето, училището, селото'] },
    ],
    notes: ['Площадът е в центъра.'],
  } as GrammarTableExercise,

  {
    id: 'l05-ex-14',
    type: 'multiple_choice',
    instruction: 'Подчертайте определителния член в изреченията. (Изберете думата с член.)',
    order: 18,
    points: 3,
    questions: [
      {
        question: 'Това е хотел. Хотелът се казва „София“. Аз съм в хотела. Коя дума е с определителен член в третото изречение?',
        options: ['Аз', 'съм', 'в', 'хотела'],
        correctIndex: 3,
      },
      {
        question: 'Това е улица. Улицата се казва „Цар Симеон“. Аз съм на улицата. Коя дума е с определителен член в третото изречение?',
        options: ['Аз', 'съм', 'на', 'улицата'],
        correctIndex: 3,
      },
      {
        question: 'Това е училище. Училището се казва „Васил Левски“. Аз съм в училището. Коя дума е с определителен член в третото изречение?',
        options: ['Аз', 'съм', 'в', 'училището'],
        correctIndex: 3,
      },
    ],
  } as MultipleChoiceExercise,

  {
    id: 'l05-ex-15',
    type: 'drag_to_columns',
    instruction:
      'Прехвърлете всяка дума в колоната с правилното членуване (-ът/-а, -та или -то). На мобилен: плъзнете картата наляво/надясно.',
    order: 19,
    points: 21,
    imageUrl: '',
    items: [
      'аптека', 'банка', 'болница', 'град', 'капучино', 'кафе', 'кино', 'къща', 'масло', 'мляко',
      'пазар', 'пица', 'поща', 'ресторант', 'сандвич', 'село', 'училище', 'учителка', 'хляб', 'център', 'яйце',
    ],
    columns: [
      { id: 't-a', title: '-ът / -a', correctItems: ['град', 'пазар', 'център', 'ресторант', 'кино', 'сандвич', 'хляб'] },
      { id: 'ta', title: '-та', correctItems: ['аптека', 'банка', 'болница', 'къща', 'учителка', 'поща', 'пица'] },
      { id: 'to', title: '-то', correctItems: ['кафе', 'капучино', 'масло', 'мляко', 'село', 'училище', 'яйце'] },
    ],
  } as DragToColumnsExercise,

  {
    id: 'l05-gramatika-03',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 3',
    subtitle: 'Множествено число — член',
    instruction: 'Членуване в множествено число.',
    order: 20,
    tableTitle: 'Мн.ч. с определителен член',
    columns: ['Род', 'Член', 'Примери'],
    rows: [
      { pronoun: 'м.р.', cells: ['-те', 'пазарите, градовете'] },
      { pronoun: 'ж.р.', cells: ['-те', 'банките, улиците'] },
      { pronoun: 'ср.р.', cells: ['-та', 'кафетата, училищата'] },
    ],
    notes: ['Магазините са в центъра.'],
  } as GrammarTableExercise,

  {
    id: 'l05-ex-16',
    type: 'table_fill',
    instruction: 'Напишете думите в правилната колона.',
    order: 21,
    points: 14,
    paragraphs: [],
    tables: [
      {
        name: 'Множествено число — -те / -та',
        columns: ['-те', '-та'],
        rows: [
          { label: 'булеварди', cells: [{ correctAnswers: ['булевардите'], options: ['булевардите', 'булеварда'] }, { correctAnswers: ['—'], options: ['—', 'булевардите'] }] },
          { label: 'градове', cells: [{ correctAnswers: ['градовете'], options: ['градовете', 'градът'] }, { correctAnswers: ['—'], options: ['—', 'градовете'] }] },
          { label: 'джамии', cells: [{ correctAnswers: ['джамиите'], options: ['джамиите', 'джамията'] }, { correctAnswers: ['—'], options: ['—', 'джамиите'] }] },
          { label: 'кафета', cells: [{ correctAnswers: ['—'], options: ['—', 'кафетата'] }, { correctAnswers: ['кафетата'], options: ['кафетата', 'кафето'] }] },
          { label: 'кина', cells: [{ correctAnswers: ['—'], options: ['—', 'кината'] }, { correctAnswers: ['кината'], options: ['кината', 'киното'] }] },
          { label: 'кюфтета', cells: [{ correctAnswers: ['—'], options: ['—', 'кюфтетата'] }, { correctAnswers: ['кюфтетата'], options: ['кюфтетата', 'кюфтето'] }] },
          { label: 'млека', cells: [{ correctAnswers: ['—'], options: ['—', 'млеката'] }, { correctAnswers: ['млеката'], options: ['млеката', 'млякото'] }] },
          { label: 'мостове', cells: [{ correctAnswers: ['мостовете'], options: ['мостовете', 'мостът'] }, { correctAnswers: ['—'], options: ['—', 'мостовете'] }] },
          { label: 'площади', cells: [{ correctAnswers: ['площадите'], options: ['площадите', 'площадът'] }, { correctAnswers: ['—'], options: ['—', 'площадите'] }] },
          { label: 'села', cells: [{ correctAnswers: ['—'], options: ['—', 'селата'] }, { correctAnswers: ['селата'], options: ['селата', 'селото'] }] },
          { label: 'улици', cells: [{ correctAnswers: ['улиците'], options: ['улиците', 'улицата'] }, { correctAnswers: ['—'], options: ['—', 'улиците'] }] },
          { label: 'училища', cells: [{ correctAnswers: ['—'], options: ['—', 'училищата'] }, { correctAnswers: ['училищата'], options: ['училищата', 'училището'] }] },
          { label: 'църкви', cells: [{ correctAnswers: ['църквите'], options: ['църквите', 'църквата'] }, { correctAnswers: ['—'], options: ['—', 'църквите'] }] },
          { label: 'яйца', cells: [{ correctAnswers: ['—'], options: ['—', 'яйцата'] }, { correctAnswers: ['яйцата'], options: ['яйцата', 'яйцето'] }] },
        ],
      },
    ],
  } as TableFillExercise,

  {
    id: 'l05-ex-17',
    type: 'workbook_fill_blank',
    instruction: 'Попълнете окончанията.',
    order: 22,
    points: 4,
    layout: 'single',
    sentences: [
      { text: 'Банките са в центъра.', blanks: [], correctAnswers: [], isExample: true },
      { text: 'Учителки_______ по български език са в училището.', blanks: [0], correctAnswers: ['те'], options: ['те', 'та', 'то', 'ят'] },
      { text: 'Кафета_______ са със захар.', blanks: [0], correctAnswers: ['та'], options: ['та', 'те', 'то', 'ят'] },
      { text: 'Зеленчуци_______ са евтини.', blanks: [0], correctAnswers: ['те'], options: ['те', 'та', 'то', 'ят'] },
      { text: 'Плодове_______ са скъпи.', blanks: [0], correctAnswers: ['те'], options: ['те', 'та', 'то', 'ят'] },
    ],
  } as WorkbookFillBlankExercise,

  {
    id: 'l05-gramatika-04',
    type: 'grammar_examples',
    title: 'ГРАМАТИКА 4',
    subtitle: 'Предлози за място',
    instruction: 'Запознайте се с предлозите и примерите. Кутията „Театърът е:“ от учебника е предавана с примерните изрази по-долу.',
    order: 23,
    examples: [
      { imageUrl: '/assets/lesson-05/25-gramatika-4-predlozi-myasto/01-v.jpg', text: 'в — в кутията / в центъра', subtext: '' },
      { imageUrl: '/assets/lesson-05/25-gramatika-4-predlozi-myasto/02-na.jpg', text: 'на — на масата', subtext: '' },
      { imageUrl: '/assets/lesson-05/25-gramatika-4-predlozi-myasto/03-do.jpg', text: 'до — до кутията', subtext: '' },
      { imageUrl: '/assets/lesson-05/25-gramatika-4-predlozi-myasto/04-pred.jpg', text: 'пред — пред кутията', subtext: '' },
      { imageUrl: '/assets/lesson-05/25-gramatika-4-predlozi-myasto/05-zad.jpg', text: 'зад — зад кутията', subtext: '' },
      { imageUrl: '/assets/lesson-05/25-gramatika-4-predlozi-myasto/06-mezhdu.jpg', text: 'между — между две кутии', subtext: '' },
      { imageUrl: '/assets/lesson-05/25-gramatika-4-predlozi-myasto/07-sreshtu.jpg', text: 'срещу — срещу кутията', subtext: '' },
      { imageUrl: '/assets/lesson-05/25-gramatika-4-predlozi-myasto/08-blizo-do.jpg', text: 'близо до — близо до кутията', subtext: '' },
      { imageUrl: '/assets/lesson-05/25-gramatika-4-predlozi-myasto/09-daleche-ot.jpg', text: 'далече от — далече от кутията', subtext: '' },
      { imageUrl: '', text: 'Примери: Театърът е в центъра, до музея, пред университета, зад аптеката, близо до хотела, между аптеката и университета, срещу болницата, далече от библиотеката.', subtext: 'Внимание: Аз съм на улицата. / Аз съм на улица „Иван Вазов“.' },
    ],
  } as GrammarExamplesExercise,

  {
    id: 'l05-ex-18',
    type: 'true_false',
    instruction:
      'Вижте картата на града от упр. 2 и отбележете с Вярно или Грешно. (Отговорите подлежат на препроверка спрямо картата в учебника.)',
    order: 24,
    imageUrl: '/assets/lesson-05/03-upr-02-karta-grad/01-karta-grad-centar.jpg',
    points: 9,
    sentences: [
      { id: 'l05-ex18-1', text: 'Университетът е зад театъра.', isTrue: true },
      { id: 'l05-ex18-2', text: 'Библиотеката е до хотела.', isTrue: false },
      { id: 'l05-ex18-3', text: 'Хотелът е близо до музея.', isTrue: true },
      { id: 'l05-ex18-4', text: 'Банката е на булеварда.', isTrue: false },
      { id: 'l05-ex18-5', text: 'Кафето е далече от супермаркета.', isTrue: false },
      { id: 'l05-ex18-6', text: 'Киното е между кафето и банката.', isTrue: false },
      { id: 'l05-ex18-7', text: 'Ресторантът е срещу хотела.', isTrue: true },
      { id: 'l05-ex18-8', text: 'Аптеката е пред театъра.', isTrue: true },
      { id: 'l05-ex18-9', text: 'Зад хотела има блок.', isTrue: true },
    ],
  } as TrueFalseExercise,

  {
    id: 'l05-ex-19',
    type: 'workbook_fill_blank',
    instruction:
      'Вижте картата на селото от упр. 3 и отговорете на въпросите по модела.',
    order: 25,
    points: 6,
    layout: 'qa-split',
    imageUrl: '/assets/lesson-05/05-upr-03-karta-selo/01-karta-selo-centar.jpg',
    sentences: [
      {
        text: 'Модел: — Къде е паметникът? | — Паметникът е на площада близо до църквата.',
        blanks: [],
        correctAnswers: [],
        isExample: true,
      },
      {
        text: '— Къде е джамията? | — Джамията е _______ до реката.',
        blanks: [0],
        correctAnswers: ['близо'],
        options: ['близо', 'далече', 'срещу', 'между'],
      },
      {
        text: '— Къде е общината? | — Общината е _______ площада.',
        blanks: [0],
        correctAnswers: ['на'],
        options: ['на', 'в', 'до', 'под'],
      },
      {
        text: '— Къде е пазарът? | — Пазарът е _______ центъра.',
        blanks: [0],
        correctAnswers: ['в'],
        options: ['в', 'на', 'до', 'зад'],
      },
      {
        text: '— Къде е паркът? | — Паркът е _______ селото.',
        blanks: [0],
        correctAnswers: ['в'],
        options: ['в', 'на', 'под', 'над'],
      },
      {
        text: '— Къде е магазинът? | — Магазинът е _______ пътя.',
        blanks: [0],
        correctAnswers: ['до'],
        options: ['до', 'в', 'на', 'под'],
      },
      {
        text: '— Къде е пощата? | — Пощата е _______ центъра.',
        blanks: [0],
        correctAnswers: ['в'],
        options: ['в', 'на', 'между', 'срещу'],
      },
    ],
  } as WorkbookFillBlankExercise,

  {
    id: 'l05-dialozi-02',
    type: 'dialogues',
    title: 'ДИАЛОЗИ 2',
    instruction: 'Прочетете диалога.',
    order: 26,
    imageUrl: '/assets/lesson-05/28-dialozi-2-posoka-karta/01-turisti-s-karta.jpg',
    audioUrl: '/assets/lesson-05/audio/25-urok-5-dialog-2.mp3',
    sections: [
      {
        id: 'a',
        lines: [
          { text: '— Извинете, къде е общината?' },
          { text: '— Вървете направо, след банката завийте наляво.' },
          { text: '— А супермаркет „Била“?' },
          { text: '— Вървете направо и след 20 метра завийте надясно.' },
        ],
      },
    ],
  } as DialoguesExercise,

  {
    id: 'l05-gramatika-05',
    type: 'grammar_examples',
    title: 'ГРАМАТИКА 5',
    subtitle: 'Повелително наклонение — посока',
    instruction: 'Форми за указване на посока (вие / Вие и ти).',
    order: 27,
    examples: [
      { imageUrl: '', text: 'Вървете направо! (вие, Вие) / Върви направо! (ти)', subtext: '' },
      { imageUrl: '', text: 'Завийте наляво! (вие, Вие) / Завий наляво! (ти)', subtext: '' },
      { imageUrl: '', text: 'Завийте надясно! (вие, Вие) / Завий надясно! (ти)', subtext: '' },
    ],
  } as GrammarExamplesExercise,

  {
    id: 'l05-ex-21',
    type: 'match_pairs',
    instruction: 'Свържете всяка команда с правилния знак (стрелка).',
    order: 28,
    points: 3,
    pairs: [
      {
        id: 'p1',
        left: 'Вървете направо!',
        correctRight: '/assets/lesson-05/31-upr-21-strelki-posoka/03-varvete-napravo.jpg',
      },
      {
        id: 'p2',
        left: 'Завийте наляво!',
        correctRight: '/assets/lesson-05/31-upr-21-strelki-posoka/02-zaviy-nalyavo.jpg',
      },
      {
        id: 'p3',
        left: 'Завийте надясно!',
        correctRight: '/assets/lesson-05/31-upr-21-strelki-posoka/01-zaviy-nadyasno.jpg',
      },
    ],
    shuffledRights: [
      '/assets/lesson-05/31-upr-21-strelki-posoka/01-zaviy-nadyasno.jpg',
      '/assets/lesson-05/31-upr-21-strelki-posoka/03-varvete-napravo.jpg',
      '/assets/lesson-05/31-upr-21-strelki-posoka/02-zaviy-nalyavo.jpg',
    ],
  } as MatchPairsExercise,

  {
    id: 'l05-ex-22',
    type: 'workbook_fill_blank',
    instruction: 'Попълнете правилните форми.',
    order: 29,
    points: 5,
    layout: 'single',
    sentences: [
      { text: 'Вървете направо. (Вие)', blanks: [], correctAnswers: [], isExample: true },
      {
        text: 'Вървете _______ и след кафето _______ наляво. (Вие)',
        blanks: [0, 1],
        correctAnswers: ['направо', 'завийте'],
        options: [['направо', 'наляво', 'назад'], ['завийте', 'Завий', 'Вървете']],
      },
      {
        text: '_______ надясно и след пазара върви _______. (ти)',
        blanks: [0, 1],
        correctAnswers: ['Завий', 'направо'],
        options: [['Завий', 'завийте', 'Вървете'], ['направо', 'наляво', 'назад']],
      },
      {
        text: 'Вървете _______ и след 100 метра _______ наляво. (вие)',
        blanks: [0, 1],
        correctAnswers: ['направо', 'завийте'],
        options: [['направо', 'наляво'], ['завийте', 'Завий']],
      },
      {
        text: 'Върви _______ и след моста _______ надясно. (ти)',
        blanks: [0, 1],
        correctAnswers: ['направо', 'завий'],
        options: [['направо', 'наляво'], ['завий', 'завийте']],
      },
      {
        text: '_______ направо и след пощата _______ наляво. (Вие)',
        blanks: [0, 1],
        correctAnswers: ['Вървете', 'завийте'],
        options: [['Вървете', 'Върви'], ['завийте', 'Завий']],
      },
    ],
  } as WorkbookFillBlankExercise,

  {
    id: 'l05-ex-23',
    type: 'reading_text',
    title: 'УПРАЖНЕНИЕ 23',
    instruction: 'Работете по двойки. Упражнявайте диалога, като използвате картата на града от упр. 2. Вие сте пред университета.',
    order: 30,
    images: [{ imageUrl: '/assets/lesson-05/03-upr-02-karta-grad/01-karta-grad-centar.jpg', label: 'Карта — упр. 2' }],
    paragraphs: [
      'Модел: — Извинете, къде е хотелът? — …',
      'Подгответе отговори с партньор, като ползвате картата от упр. 2 (стартирайте от университета).',
    ],
  } as ReadingTextExercise,

  {
    id: 'l05-gramatika-06',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 6',
    subtitle: 'Човек, души, хора',
    instruction: 'Бройни форми за хора.',
    order: 31,
    tableTitle: 'Число на съществителните (3)',
    columns: ['Обобщение', 'Примери'],
    rows: [
      { pronoun: 'Ед. число', cells: ['един човек', 'Тук има един човек.'] },
      { pronoun: 'С число', cells: ['десет души', 'Колко души има тук?'] },
      { pronoun: 'Общо', cells: ['много / малко хора', 'Тук няма много хора.'] },
    ],
  } as GrammarTableExercise,

  {
    id: 'l05-ex-24',
    type: 'workbook_fill_blank',
    instruction: 'Попълнете с думите: човек, души, хора.',
    order: 32,
    points: 5,
    layout: 'single',
    sentences: [
      { text: 'На улицата има много хора.', blanks: [], correctAnswers: [], isExample: true },
      { text: 'Колко _______ има в ресторанта?', blanks: [0], correctAnswers: ['души'], options: ['души', 'хора', 'човек'] },
      { text: 'В киното има десет _______.', blanks: [0], correctAnswers: ['души'], options: ['души', 'хора', 'човек'] },
      { text: 'В кафето има само един _______.', blanks: [0], correctAnswers: ['човек'], options: ['човек', 'души', 'хора'] },
      { text: 'Колко _______ има в селото?', blanks: [0], correctAnswers: ['души'], options: ['души', 'човек', 'хора'] },
      { text: 'В България живеят малко _______.', blanks: [0], correctAnswers: ['хора'], options: ['хора', 'души', 'човек'] },
    ],
  } as WorkbookFillBlankExercise,

  {
    id: 'l05-gramatika-07',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 7',
    subtitle: 'Големи числа',
    instruction: 'Хиляда до милиард. Пример: 1 234 567 = един милион двеста тридесет и четири хиляди петстотин шестдесет и седем.',
    order: 33,
    tableTitle: 'Бройни числителни',
    columns: ['Число', 'Дума'],
    rows: [
      { pronoun: '1 000', cells: ['хиляда'] },
      { pronoun: '2 000', cells: ['две хиляди'] },
      { pronoun: '1 000 000', cells: ['един милион'] },
      { pronoun: '2 000 000', cells: ['два милиона'] },
      { pronoun: '1 000 000 000', cells: ['един милиард'] },
    ],
    notes: ['След 2–4 използвайте „милиона/милиарда“; за много нещо — „милиони/милиарди“.'],
  } as GrammarTableExercise,

  {
    id: 'l05-ex-25',
    type: 'reading_text',
    title: 'УПРАЖНЕНИЕ 25',
    instruction: 'Прочетете числата (на глас с партньор).',
    order: 34,
    paragraphs: [
      'Модел: 173 268 — сто седемдесет и три хиляди двеста шестдесет и осем.',
      '1230, 2800, 86 493, 370 480, 2970, 18 490 567, 12 964 098, 4500, 987 435 000, 345, 12 359, 933, 284 590, 706 409, 54 030 …',
    ],
  } as ReadingTextExercise,

  {
    id: 'l05-ex-26',
    type: 'workbook_fill_blank',
    instruction: 'Напишете правилната форма на милион.',
    order: 35,
    points: 4,
    layout: 'single',
    sentences: [
      { text: 'Колко милиона души живеят в София?', blanks: [], correctAnswers: [], isExample: true },
      { text: 'В България живеят осем _______ души.', blanks: [0], correctAnswers: ['милиона'], options: ['милиона', 'милион', 'милиони'] },
      { text: 'Аз имам един _______ евро.', blanks: [0], correctAnswers: ['милион'], options: ['милион', 'милиона', 'милиони'] },
      { text: 'Колко _______ живеят в Дамаск?', blanks: [0], correctAnswers: ['милиона'], options: ['милиона', 'милион', 'милиони'] },
      { text: 'Има _______ бежанци.', blanks: [0], correctAnswers: ['милиони'], options: ['милиони', 'милиона', 'милион'] },
    ],
  } as WorkbookFillBlankExercise,

  {
    id: 'l05-ex-27',
    type: 'workbook_fill_blank',
    title: 'ДОПЪЛНИТЕЛНИ УПРАЖНЕНИЯ',
    instruction: 'Попълнете празните места в диалозите.',
    order: 36,
    points: 5,
    layout: 'qa-split',
    sentences: [
      {
        text: '— _______ живеете? | — Аз _______ в София, на „Шипка“, _______ 2.',
        blanks: [0, 1, 2],
        correctAnswers: ['Къде', 'живея', 'номер'],
        options: [
          ['Къде', 'Как'],
          ['живея', 'живеете'],
          ['номер', 'бул'],
        ],
      },
      {
        text: '— _______, къде е кафе „Малина“? | — Вървете _______, след хотела _______ надясно.',
        blanks: [0, 1, 2],
        correctAnswers: ['Извинете', 'направо', 'завийте'],
        options: [
          ['Извинете', 'Къде'],
          ['направо', 'наляво'],
          ['завийте', 'Завий'],
        ],
      },
    ],
  } as WorkbookFillBlankExercise,

  {
    id: 'l05-ex-28',
    type: 'reading_text',
    title: 'УПРАЖНЕНИЕ 28',
    instruction: 'Прочетете текста. Извадете непознатите думи и проверете превода им в речника.',
    order: 37,
    images: [{ imageUrl: '/assets/lesson-05/40-upr-28-varna-plazh/01-plazh-more-varna.jpg', label: 'Плаж във Варна' }],
    paragraphs: [
      'Град Варна е на морето, близо до Румъния. Във Варна живеят 336 000 души. Има също много туристи. Във Варна има плажове, много ресторанти, кафета и молове.',
    ],
    showDictionary: true,
  } as ReadingTextExercise,

  {
    id: 'l05-ex-29',
    type: 'workbook_fill_blank',
    instruction:
      'Пълен текст за опора: Град Пловдив е в южната част на България. В Пловдив живеят 348 000 души. В Пловдив има Стария град, много университети и музеи, има античен театър и амфитеатър. Попълнете празните места (бутонът „Слушайте“ използва синтезатор на реч; запис от учителя е по избор).',
    order: 38,
    points: 5,
    layout: 'single',
    listeningText:
      'Град Пловдив е в южната част на България. В Пловдив живеят 348 000 души. В Пловдив има Стария град, много университети и музеи, има античен театър и амфитеатър.',
    imageUrl: '/assets/lesson-05/41-upr-29-plovdiv-stari-grad/01-ulitsa-stariya-plovdiv.jpg',
    sentences: [
      {
        text: 'Град Пловдив е в _______ на България. В Пловдив живеят _______ души. В Пловдив има _______, много университети и _______, има _______ и амфитеатър.',
        blanks: [0, 1, 2, 3, 4],
        correctAnswers: ['южната част', '348 000', 'Стария град', 'музеи', 'античен театър'],
        options: [
          ['южната част', 'центъра', 'северната част', 'планината'],
          ['348 000', '336 000', '250 000', '1 200 000'],
          ['Стария град', 'новия град', 'летището', 'вокзала'],
          ['музеи', 'плажове', 'фабрики', 'болници'],
          ['античен театър', 'метро', 'летище', 'зоопарк'],
        ] as string[][],
      },
    ],
  } as WorkbookFillBlankExercise,

  {
    id: 'l05-ex-30',
    type: 'workbook_fill_blank',
    instruction: 'Отговорете на въпросите за Варна и Пловдив.',
    order: 39,
    points: 4,
    layout: 'qa-split',
    sentences: [
      { text: 'Колко души живеят във Варна? | _______', blanks: [0], correctAnswers: ['336 000 души.'], options: ['336 000 души.', '348 000 души.', '2500 души.', '300 души.'] },
      { text: 'Какво има във Варна? | _______', blanks: [0], correctAnswers: ['Плажове, ресторанти, кафета, молове.'], options: ['Плажове, ресторанти, кафета, молове.', 'Само планина.', 'Няма училище.', 'Само села.'] },
      { text: 'Колко души живеят в Пловдив? | _______', blanks: [0], correctAnswers: ['348 000 души.'], options: ['348 000 души.', '336 000 души.', '300 души.', '2500 души.'] },
      { text: 'Какво има в Пловдив? | _______', blanks: [0], correctAnswers: ['Старият град, университети, музеи, античен театър, амфитеатър.'], options: ['Старият град, университети, музеи, античен театър, амфитеатър.', 'Само море.', 'Няма църкви.', 'Само летище.'] },
    ],
  } as WorkbookFillBlankExercise,

  {
    id: 'l05-ex-32',
    type: 'reading_text',
    title: 'УПРАЖНЕНИЕ 32',
    instruction: 'Прочетете текста. Извадете непознатите думи и проверете превода им в речника.',
    order: 40,
    audioUrl: '/assets/lesson-05/audio/26-urok-5-tekstove-32.mp3',
    images: [{ imageUrl: '/assets/lesson-05/44-tekstove-shtarkel-darvo/01-shtarkel-v-gnezdo.jpg', label: '' }],
    paragraphs: [
      'Село Нови извор е в полето, близо до Турция. В селото живеят 300 души – баби и дядовци. В селото няма деца, няма и училище. Няма магазин, кафе и ресторант. Има една църква и река с мост. В реката има много риба.',
    ],
    showDictionary: true,
  } as ReadingTextExercise,

  {
    id: 'l05-ex-33',
    type: 'reading_text',
    title: 'УПРАЖНЕНИЕ 33',
    instruction: 'Прочетете текста. Извадете непознатите думи и проверете превода им в речника.',
    order: 41,
    audioUrl: '/assets/lesson-05/audio/27-urok-5-tekstove-33.mp3',
    images: [{ imageUrl: '/assets/lesson-05/44-tekstove-shtarkel-darvo/02-darvo-akvarel.jpg', label: '' }],
    paragraphs: [
      'Село Рибново е в планината, близо до Гърция. В селото живеят 2500 души. В Рибново има едно училище с много ученици и учители и една детска градина. В Рибново има община, джамия, един ресторант и много кафета. В планината над селото има гора с много дървета. Под дърветата има гъби и ягоди.',
    ],
    showDictionary: true,
  } as ReadingTextExercise,

  {
    id: 'l05-ex-34',
    type: 'true_false',
    instruction: 'Вярно или не?',
    order: 42,
    points: 8,
    sentences: [
      { id: 'tf34-1', text: 'Рибново е в планината.', isTrue: true },
      { id: 'tf34-2', text: 'Нови извор е в полето.', isTrue: true },
      { id: 'tf34-3', text: 'В Рибново няма училище.', isTrue: false },
      { id: 'tf34-4', text: 'В Нови извор има река.', isTrue: true },
      { id: 'tf34-5', text: 'Рибново е близо до Турция.', isTrue: false },
      { id: 'tf34-6', text: 'В Нови извор няма кафе.', isTrue: true },
      { id: 'tf34-7', text: 'В реката няма много риба.', isTrue: false },
      { id: 'tf34-8', text: 'В гората има малко дървета.', isTrue: false },
    ],
  } as TrueFalseExercise,

  {
    id: 'l05-ex-35',
    type: 'workbook_fill_blank',
    instruction: 'Отговорете на въпросите.',
    order: 43,
    points: 5,
    layout: 'qa-split',
    sentences: [
      {
        text: 'Колко души живеят в Рибново и в Нови извор? | В Рибново _______, в Нови извор _______.',
        blanks: [0, 1],
        correctAnswers: ['2500 души', '300 души'],
        options: [
          ['2500 души', '300 души', '336 000 души'],
          ['300 души', '2500 души', '348 000 души'],
        ],
      },
      { text: 'Какво има в селата? | _______', blanks: [0], correctAnswers: ['В Рибново: училище, детска градина, община, джамия, ресторант, кафета, гора; в Нови извор: църква, река, мост, риба.'], options: ['В Рибново: училище, детска градина, община, джамия, ресторант, кафета, гора; в Нови извор: църква, река, мост, риба.', 'Само хотели.', 'Нищо.', 'Само море.'] },
      { text: 'Какво има в планината? | _______', blanks: [0], correctAnswers: ['Гора с много дървета, гъби и ягоди под дърветата.'], options: ['Гора с много дървета, гъби и ягоди под дърветата.', 'Само плаж.', 'Няма нищо.', 'Само риба.'] },
      { text: 'Къде има гора с много дървета? | _______', blanks: [0], correctAnswers: ['В планината над Рибново.'], options: ['В планината над Рибново.', 'Във Варна.', 'В Нови извор.', 'В София.'] },
      { text: 'Какво има под дърветата? | _______', blanks: [0], correctAnswers: ['Гъби и ягоди.'], options: ['Гъби и ягоди.', 'Риба.', 'Плаж.', 'Метро.'] },
    ],
  } as WorkbookFillBlankExercise,

  {
    id: 'l05-ex-36',
    type: 'reading_text',
    title: 'ОТ ПЪРВО ЛИЦЕ — Упражнение 36',
    instruction: 'Прочетете текста за София и Халеб (Алепо). Извадете непознатите думи и проверете превода им в речника.',
    order: 44,
    audioUrl: '/assets/lesson-05/audio/28-urok-5-tekstove-36.mp3',
    images: [{ imageUrl: '/assets/lesson-05/45-ot-parvo-litse-krepost-haleb/01-krepost-haleb-zalez.jpg', label: '' }],
    paragraphs: [
      'Аз съм Мохамед. Аз съм от Халеб. Сега живея в София.',
      'София е в България, Халеб е в Сирия. София и Халеб са големи градове: в София живеят около 1 200 000 души, в Халеб – 2 098 000. София е столица, Халеб – не е. Столицата на Сирия е Дамаск.',
      'В София и Халеб има големи улици. В София има метро, а в Халеб – няма.',
      'В Халеб има стара крепост и много стари къщи.',
      'В София има много паркове.',
    ],
    showDictionary: true,
  } as ReadingTextExercise,

  {
    id: 'l05-ex-37',
    type: 'true_false',
    instruction: 'Вярно или грешно?',
    order: 45,
    points: 4,
    sentences: [
      { id: 'tf37-1', text: 'Мохамед живее в Халеб.', isTrue: false },
      { id: 'tf37-2', text: 'Халеб е столица на Сирия.', isTrue: false },
      { id: 'tf37-3', text: 'В Халеб има стара крепост.', isTrue: true },
      { id: 'tf37-4', text: 'В София няма много паркове.', isTrue: false },
    ],
  } as TrueFalseExercise,

  {
    id: 'l05-ex-38',
    type: 'workbook_fill_blank',
    instruction: 'Отговорете на въпросите.',
    order: 46,
    points: 4,
    layout: 'qa-split',
    sentences: [
      { text: 'Кои са столиците на България и Сирия? | _______', blanks: [0], correctAnswers: ['България — София, Сирия — Дамаск.'], options: ['България — София, Сирия — Дамаск.', 'София и Халеб.', 'Пловдив и Алепо.', 'Варна и Дамаск.'] },
      { text: 'Колко души живеят в София и в Халеб? | _______', blanks: [0], correctAnswers: ['В София около 1 200 000, в Халеб 2 098 000.'], options: ['В София около 1 200 000, в Халеб 2 098 000.', '336 000 и 348 000.', '300 и 2500.', 'Никой.'] },
      { text: 'Къде има метро? | _______', blanks: [0], correctAnswers: ['В София.'], options: ['В София.', 'В Халеб.', 'И в двете.', 'Никъде.'] },
      { text: 'Къде има стара крепост? | _______', blanks: [0], correctAnswers: ['В Халеб.'], options: ['В Халеб.', 'В София.', 'Във Варна.', 'В Рибново.'] },
    ],
  } as WorkbookFillBlankExercise,

];

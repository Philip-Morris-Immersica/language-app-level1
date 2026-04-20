import type {
  Exercise,
  GrammarTableExercise,
  AlphabetMazeExercise,
  ImageLabelingExercise,
  IllustratedCardsExercise,
} from '@/content/types';

export const exercises: Exercise[] = [
  // ═══════════════════════════════════════════════════════════════════
  // ORDER 1: Азбука — Таблица с 30 букви (Page 6, top)
  // Информационна секция — няма points.
  // TODO: Създай специализиран AlphabetTable компонент за по-добра визия:
  //   - Колона за печатна форма (главна + малка): Аа
  //   - Колона за ръкописна форма (с cursive шрифт или изображение)
  //   - Колона с пример-име: Ана, Борис...
  //   - Секция за съставни букви: Ю=[Й+У], Я=[Й+А], Щ=[Ш+Т]
  //   Сега grammar_table е workaround — "pronoun" държи буквата.
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'l00-gramatika-01',
    type: 'grammar_table',
    title: 'АЗБУКА',
    subtitle: 'Българската азбука — 30 букви',
    instruction: 'Запознайте се с буквите на българската азбука.',
    order: 1,
    tableTitle: 'Кирилицата',
    columns: ['Малка буква', 'Име'],
    rows: [
      { pronoun: 'А', cells: ['а', 'Ана'],       pronunciations: { en: 'A (ah)',      fr: 'A',          ar: 'أَ',              fa: 'آ',           ru: 'А',               uk: 'А' } },
      { pronoun: 'Б', cells: ['б', 'Борис'],     pronunciations: { en: 'B',           fr: 'B',          ar: 'ب',              fa: 'ب',           ru: 'Б',               uk: 'Б' } },
      { pronoun: 'В', cells: ['в', 'Валя'],      pronunciations: { en: 'V',           fr: 'V',          ar: 'ڤ',              fa: 'و',           ru: 'В',               uk: 'В' } },
      { pronoun: 'Г', cells: ['г', 'Галя'],      pronunciations: { en: 'G',           fr: 'G',          ar: 'غ',              fa: 'گ',           ru: 'Г',               uk: 'Г' } },
      { pronoun: 'Д', cells: ['д', 'Дилма'],     pronunciations: { en: 'D',           fr: 'D',          ar: 'د',              fa: 'د',           ru: 'Д',               uk: 'Д' } },
      { pronoun: 'Е', cells: ['е', 'Емил'],      pronunciations: { en: 'E (eh)',      fr: 'É',          ar: 'إ',              fa: 'اِ',          ru: 'Е',               uk: 'Е' } },
      { pronoun: 'Ж', cells: ['ж', 'Жасмин'],   pronunciations: { en: 'Zh',          fr: 'J',          ar: 'ج',              fa: 'ژ',           ru: 'Ж',               uk: 'Ж' } },
      { pronoun: 'З', cells: ['з', 'Зара'],      pronunciations: { en: 'Z',           fr: 'Z',          ar: 'ز',              fa: 'ز',           ru: 'З',               uk: 'З' } },
      { pronoun: 'И', cells: ['и', 'Ибрахим'],   pronunciations: { en: 'I (ee)',      fr: 'I',          ar: 'إي',             fa: 'ای',          ru: 'И',               uk: 'І' } },
      { pronoun: 'Й', cells: ['й', 'Йоана'],     pronunciations: { en: 'Y',           fr: 'Ï',          ar: 'ي',              fa: 'ی',           ru: 'Й',               uk: 'Й' } },
      { pronoun: 'К', cells: ['к', 'Карим'],     pronunciations: { en: 'K',           fr: 'K',          ar: 'ك',              fa: 'ک',           ru: 'К',               uk: 'К' } },
      { pronoun: 'Л', cells: ['л', 'Лейла'],     pronunciations: { en: 'L',           fr: 'L',          ar: 'ل',              fa: 'ل',           ru: 'Л',               uk: 'Л' } },
      { pronoun: 'М', cells: ['м', 'Мохамед'],   pronunciations: { en: 'M',           fr: 'M',          ar: 'م',              fa: 'م',           ru: 'М',               uk: 'М' } },
      { pronoun: 'Н', cells: ['н', 'Николай'],   pronunciations: { en: 'N',           fr: 'N',          ar: 'ن',              fa: 'ن',           ru: 'Н',               uk: 'Н' } },
      { pronoun: 'О', cells: ['о', 'Олга'],      pronunciations: { en: 'O (oh)',      fr: 'O',          ar: 'أو',             fa: 'اُ',          ru: 'О',               uk: 'О' } },
      { pronoun: 'П', cells: ['п', 'Петър'],     pronunciations: { en: 'P',           fr: 'P',          ar: 'پ',              fa: 'پ',           ru: 'П',               uk: 'П' } },
      { pronoun: 'Р', cells: ['р', 'Рада'],      pronunciations: { en: 'R',           fr: 'R',          ar: 'ر',              fa: 'ر',           ru: 'Р',               uk: 'Р' } },
      { pronoun: 'С', cells: ['с', 'Сара'],      pronunciations: { en: 'S',           fr: 'S',          ar: 'س',              fa: 'س',           ru: 'С',               uk: 'С' } },
      { pronoun: 'Т', cells: ['т', 'Тамара'],    pronunciations: { en: 'T',           fr: 'T',          ar: 'ت',              fa: 'ت',           ru: 'Т',               uk: 'Т' } },
      { pronoun: 'У', cells: ['у', 'Уляна'],     pronunciations: { en: 'U (oo)',      fr: 'OU',         ar: 'أُو',            fa: 'او',          ru: 'У',               uk: 'У' } },
      { pronoun: 'Ф', cells: ['ф', 'Фатима'],    pronunciations: { en: 'F',           fr: 'F',          ar: 'ف',              fa: 'ف',           ru: 'Ф',               uk: 'Ф' } },
      { pronoun: 'Х', cells: ['х', 'Хамид'],     pronunciations: { en: 'H (kh)',      fr: 'KH',         ar: 'خ',              fa: 'خ',           ru: 'Х',               uk: 'Х' } },
      { pronoun: 'Ц', cells: ['ц', 'Цветелина'], pronunciations: { en: 'Ts',          fr: 'Ts',         ar: 'تس',             fa: 'تس',          ru: 'Ц',               uk: 'Ц' } },
      { pronoun: 'Ч', cells: ['ч', 'Чавдар'],    pronunciations: { en: 'Ch',          fr: 'Tch',        ar: 'تش',             fa: 'چ',           ru: 'Ч',               uk: 'Ч' } },
      { pronoun: 'Ш', cells: ['ш', 'Шадия'],     pronunciations: { en: 'Sh',          fr: 'Ch',         ar: 'ش',              fa: 'ش',           ru: 'Ш',               uk: 'Ш' } },
      { pronoun: 'Щ', cells: ['щ', 'Щилян'],     pronunciations: { en: 'Sht',         fr: 'Cht',        ar: 'شت',             fa: 'شت',          ru: 'Шт',              uk: 'Щ' } },
      { pronoun: 'Ъ', cells: ['ъ', 'Съби'],      pronunciations: { en: 'Uh (schwa)',  fr: 'Eu (muet)',  ar: 'أَ (قصير)',      fa: 'اَ (کوتاه)',  ru: 'Ъ (гласна)',      uk: 'Ъ (коротке и)' } },
      { pronoun: 'Ь', cells: ['ь', 'Вельо'],     pronunciations: { en: 'soft sign',   fr: 'signe mou',  ar: 'علامة ترقيق',   fa: 'نشانه نرمی',  ru: 'Ь (мягкий знак)', uk: "Ь (м'який знак)" } },
      { pronoun: 'Ю', cells: ['ю', 'Юлия'],      pronunciations: { en: 'Yu',          fr: 'You',        ar: 'يو',             fa: 'یو',          ru: 'Ю',               uk: 'Ю' } },
      { pronoun: 'Я', cells: ['я', 'Яна'],        pronunciations: { en: 'Ya',          fr: 'Ya',         ar: 'يا',             fa: 'یا',          ru: 'Я',               uk: 'Я' } },
    ],
    notes: [
      'Ю = [Й + У]',
      'Я = [Й + А]',
      'Щ = [Ш + Т]',
    ],
  } as GrammarTableExercise,

  // ═══════════════════════════════════════════════════════════════════
  // ORDER 2: Упражнение 1 — Лабиринт (Page 7, top)
  // 6×6 решетка: 30 букви на правилния път + 6 капана.
  // Пунктирана линия със стрелки показва посоката.
  // Ученикът tap-ва клетки в азбучен ред А→Б→В→...→Я.
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'l00-ex-02',
    type: 'alphabet_maze',
    title: 'УПРАЖНЕНИЕ 1',
    instruction: 'Намерете пътя в лабиринта.',
    order: 2,
    startImageUrl: '/assets/lesson-00/exercise-02-maze/01-momiche-s-koshnitsa.jpg',
    endImageUrl: '/assets/lesson-00/exercise-02-maze/02-gabi.jpg',
    grid: [
      // Row 0 — path →: А Б В Г Д Е
      ['А', 'Б', 'В', 'Г', 'Д', 'Е'],
      // Row 1 — trap(0), path ←: Ж З И Й К
      ['В', 'К', 'Й', 'И', 'З', 'Ж'],
      // Row 2 — trap(0), path →: Л М Н О П
      ['Г', 'Л', 'М', 'Н', 'О', 'П'],
      // Row 3 — path ←: Р С Т У Ф Х
      ['Х', 'Ф', 'У', 'Т', 'С', 'Р'],
      // Row 4 — path →: Ц Ч Ш Щ Ъ, trap(5)
      ['Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Я'],
      // Row 5 — traps(0,1,5), path ←: Ь Ю Я
      ['Л', 'О', 'Я', 'Ю', 'Ь', 'Р'],
    ],
    correctPath: [
      // Row 0 → (А Б В Г Д Е)
      { row: 0, col: 0 },  // А
      { row: 0, col: 1 },  // Б
      { row: 0, col: 2 },  // В
      { row: 0, col: 3 },  // Г
      { row: 0, col: 4 },  // Д
      { row: 0, col: 5 },  // Е
      // Row 1 ← (Ж З И Й К)
      { row: 1, col: 5 },  // Ж
      { row: 1, col: 4 },  // З
      { row: 1, col: 3 },  // И
      { row: 1, col: 2 },  // Й
      { row: 1, col: 1 },  // К
      // Row 2 → (Л М Н О П)
      { row: 2, col: 1 },  // Л
      { row: 2, col: 2 },  // М
      { row: 2, col: 3 },  // Н
      { row: 2, col: 4 },  // О
      { row: 2, col: 5 },  // П
      // Row 3 ← (Р С Т У Ф Х)
      { row: 3, col: 5 },  // Р
      { row: 3, col: 4 },  // С
      { row: 3, col: 3 },  // Т
      { row: 3, col: 2 },  // У
      { row: 3, col: 1 },  // Ф
      { row: 3, col: 0 },  // Х
      // Row 4 → (Ц Ч Ш Щ Ъ)
      { row: 4, col: 0 },  // Ц
      { row: 4, col: 1 },  // Ч
      { row: 4, col: 2 },  // Ш
      { row: 4, col: 3 },  // Щ
      { row: 4, col: 4 },  // Ъ
      // Row 5 ← (Ь Ю Я)
      { row: 5, col: 4 },  // Ь
      { row: 5, col: 3 },  // Ю
      { row: 5, col: 2 },  // Я
    ],
  } as AlphabetMazeExercise,

  // ═══════════════════════════════════════════════════════════════════
  // ORDER 3: Упражнения 3+4 комбинирани — Държави, знамена и столици
  // (Page 7 bottom + Page 8 top)
  // Учебник: Упр. 3 "Свържете държавите и знамената" + Упр. 4 "Напишете столиците"
  // Обединени: знаме → държава (столица) в един dropdown.
  // Така учащите виждат и столицата без отделно упражнение за четене.
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'l00-ex-03',
    type: 'image_labeling',
    instruction: 'Изберете правилната държава за всяко знаме.',
    order: 3,
    points: 10,
    displayType: 'flags',
    images: [
      { id: 'bulgaria', imageUrl: '/assets/lesson-00/exercise-03-countries/08-balgariya.jpg', correctLabel: 'България, София' },
      { id: 'germaniya', imageUrl: '/assets/lesson-00/exercise-03-countries/01-germaniya.jpg', correctLabel: 'Германия, Берлин' },
      { id: 'italiya', imageUrl: '/assets/lesson-00/exercise-03-countries/02-italiya.jpg', correctLabel: 'Италия, Рим' },
      { id: 'belgiya', imageUrl: '/assets/lesson-00/exercise-03-countries/10-belgiya.jpg', correctLabel: 'Белгия, Брюксел' },
      { id: 'ispaniya', imageUrl: '/assets/lesson-00/exercise-03-countries/06-ispaniya.jpg', correctLabel: 'Испания, Мадрид' },
      { id: 'sasht', imageUrl: '/assets/lesson-00/exercise-03-countries/05-sasht.jpg', correctLabel: 'САЩ, Вашингтон' },
      { id: 'turtsiya', imageUrl: '/assets/lesson-00/exercise-03-countries/07-turtsiya.jpg', correctLabel: 'Турция, Анкара' },
      { id: 'frantsiya', imageUrl: '/assets/lesson-00/exercise-03-countries/04-frantsiya.jpg', correctLabel: 'Франция, Париж' },
      { id: 'ukraina', imageUrl: '/assets/lesson-00/exercise-03-countries/09-ukraina.jpg', correctLabel: 'Украйна, Киев' },
      { id: 'shvetsiya', imageUrl: '/assets/lesson-00/exercise-03-countries/03-shvetsiya.jpg', correctLabel: 'Швеция, Стокхолм' },
    ],
    options: [
      'Белгия, Брюксел',
      'България, София',
      'Германия, Берлин',
      'Испания, Мадрид',
      'Италия, Рим',
      'САЩ, Вашингтон',
      'Турция, Анкара',
      'Украйна, Киев',
      'Франция, Париж',
      'Швеция, Стокхолм',
    ],
  } as ImageLabelingExercise,

  // ═══════════════════════════════════════════════════════════════════
  // ORDER 4: Упражнение 5 — Континенти (Page 8, middle-left)
  // Учебник: Напишете имената на континентите.
  // Банка с думи: Австралия, Азия, Америка, Африка, Европа
  // Австралия е дадена като пример.
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'l00-ex-05',
    type: 'image_labeling',
    instruction: 'Изберете имената на континентите.',
    order: 4,
    points: 5,
    images: [
      { id: 'avstraliya', imageUrl: '/assets/lesson-00/exercise-05-continents/01-avstraliya.jpg', correctLabel: 'Австралия' },
      { id: 'aziya', imageUrl: '/assets/lesson-00/exercise-05-continents/02-aziya.jpg', correctLabel: 'Азия' },
      { id: 'amerika', imageUrl: '/assets/lesson-00/exercise-05-continents/03-amerika.jpg', correctLabel: 'Америка' },
      { id: 'afrika', imageUrl: '/assets/lesson-00/exercise-05-continents/04-afrika.jpg', correctLabel: 'Африка' },
      { id: 'evropa', imageUrl: '/assets/lesson-00/exercise-05-continents/05-evropa.jpg', correctLabel: 'Европа' },
    ],
    options: ['Австралия', 'Азия', 'Америка', 'Африка', 'Европа'],
  } as ImageLabelingExercise,

  // ═══════════════════════════════════════════════════════════════════
  // ORDER 5: Упражнение 6 — Храни (Page 8, middle-right)
  // Учебник: Напишете думите под картинките.
  // Банка с думи: пица, сандвич, спагети, хамбургер, шоколад
  // Шоколад е дадена като пример.
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'l00-ex-06',
    type: 'image_labeling',
    instruction: 'Изберете думите под картинките.',
    order: 5,
    points: 5,
    images: [
      { id: 'pitsa', imageUrl: '/assets/lesson-00/exercise-06-food/01-pitsa.jpg', correctLabel: 'пица' },
      { id: 'sandvich', imageUrl: '/assets/lesson-00/exercise-06-food/02-sandvich.jpg', correctLabel: 'сандвич' },
      { id: 'spageti', imageUrl: '/assets/lesson-00/exercise-06-food/03-spageti.jpg', correctLabel: 'спагети' },
      { id: 'hamburger', imageUrl: '/assets/lesson-00/exercise-06-food/04-hamburger.jpg', correctLabel: 'хамбургер' },
      { id: 'shokolad', imageUrl: '/assets/lesson-00/exercise-06-food/05-shokolad.jpg', correctLabel: 'шоколад' },
    ],
    options: ['пица', 'сандвич', 'спагети', 'хамбургер', 'шоколад'],
  } as ImageLabelingExercise,

  // ═══════════════════════════════════════════════════════════════════
  // ORDER 6: Упражнение 7 — Международни думи (Page 8, bottom-left)
  // Учебник: Знаете ли тези думи?
  // Информационна секция — разпознаване на международни думи в кирилица.
  // Няма points — целта е запознаване с познати думи на кирилица.
  // imageUrl: '' — думите са текстови, не са нужни картинки.
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'l00-novi-dumi-01',
    type: 'illustrated_cards',
    title: 'НОВИ ДУМИ 1',
    instruction: 'Познавате ли тези думи? Те са чуждици и звучат подобно в много езици.',
    order: 6,
    cards: [
      { id: 'futbol', imageUrl: '', label: 'футбол' },
      { id: 'banan', imageUrl: '', label: 'банан' },
      { id: 'kafe', imageUrl: '', label: 'кафе' },
      { id: 'taksi', imageUrl: '', label: 'такси' },
      { id: 'salata', imageUrl: '', label: 'салата' },
      { id: 'chay', imageUrl: '', label: 'чай' },
      { id: 'zekhtin', imageUrl: '', label: 'зехтин' },
      { id: 'dyuner', imageUrl: '', label: 'дюнер' },
      { id: 'telefon', imageUrl: '', label: 'телефон' },
      { id: 'musaka', imageUrl: '', label: 'мусака' },
      { id: 'koka-kola', imageUrl: '', label: 'кока-кола' },
    ],
  } as IllustratedCardsExercise,

  // ═══════════════════════════════════════════════════════════════════
  // ORDER 7: Упражнение 8 — Училищни принадлежности (Page 8, bottom-right)
  // Учебник: Прочетете думите и ги запомнете.
  // Информационна секция — речникови карти с картинки.
  // Няма points — целта е запознаване.
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'l00-novi-dumi-02',
    type: 'illustrated_cards',
    title: 'НОВИ ДУМИ 2',
    instruction: 'Натиснете за произношение.',
    order: 7,
    cards: [
      { id: 'uchebnik', imageUrl: '/assets/lesson-00/novi-dumi-2-school/01-uchebnik.jpg', label: 'учебник' },
      { id: 'tetradka', imageUrl: '/assets/lesson-00/novi-dumi-2-school/02-tetradka.jpg', label: 'тетрадка' },
      { id: 'himikalka', imageUrl: '/assets/lesson-00/novi-dumi-2-school/03-himikalka.jpg', label: 'химикалка' },
      { id: 'moliv', imageUrl: '/assets/lesson-00/novi-dumi-2-school/04-moliv.jpg', label: 'молив' },
    ],
  } as IllustratedCardsExercise,
];

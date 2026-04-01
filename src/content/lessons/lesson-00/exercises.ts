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
    columns: ['Печатна', 'Име'],
    rows: [
      { pronoun: 'Аа', cells: ['А а', 'Ана'] },
      { pronoun: 'Бб', cells: ['Б б', 'Борис'] },
      { pronoun: 'Вв', cells: ['В в', 'Валя'] },
      { pronoun: 'Гг', cells: ['Г г', 'Галя'] },
      { pronoun: 'Дд', cells: ['Д д', 'Дилма'] },
      { pronoun: 'Ее', cells: ['Е е', 'Емил'] },
      { pronoun: 'Жж', cells: ['Ж ж', 'Жасмин'] },
      { pronoun: 'Зз', cells: ['З з', 'Зара'] },
      { pronoun: 'Ии', cells: ['И и', 'Ибрахим'] },
      { pronoun: 'Йй', cells: ['Й й', 'Йоана'] },
      { pronoun: 'Кк', cells: ['К к', 'Карим'] },
      { pronoun: 'Лл', cells: ['Л л', 'Лейла'] },
      { pronoun: 'Мм', cells: ['М м', 'Мохамед'] },
      { pronoun: 'Нн', cells: ['Н н', 'Николай'] },
      { pronoun: 'Оо', cells: ['О о', 'Олга'] },
      { pronoun: 'Пп', cells: ['П п', 'Петър'] },
      { pronoun: 'Рр', cells: ['Р р', 'Рада'] },
      { pronoun: 'Сс', cells: ['С с', 'Сара'] },
      { pronoun: 'Тт', cells: ['Т т', 'Тамара'] },
      { pronoun: 'Уу', cells: ['У у', 'Уляна'] },
      { pronoun: 'Фф', cells: ['Ф ф', 'Фатима'] },
      { pronoun: 'Хх', cells: ['Х х', 'Хамид'] },
      { pronoun: 'Цц', cells: ['Ц ц', 'Цветелина'] },
      { pronoun: 'Чч', cells: ['Ч ч', 'Чавдар'] },
      { pronoun: 'Шш', cells: ['Ш ш', 'Шадия'] },
      { pronoun: 'Щщ', cells: ['Щ щ', 'Щилян'] },
      { pronoun: 'Ъъ', cells: ['Ъ ъ', 'Съби'] },
      { pronoun: 'Ьь', cells: ['Ь ь', 'Вельо'] },
      { pronoun: 'Юю', cells: ['Ю ю', 'Юлия'] },
      { pronoun: 'Яя', cells: ['Я я', 'Яна'] },
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
      { id: 'bulgaria', imageUrl: '/assets/lesson-00/exercise-03-countries/08-balgariya.jpg', correctLabel: 'България (София)' },
      { id: 'germaniya', imageUrl: '/assets/lesson-00/exercise-03-countries/01-germaniya.jpg', correctLabel: 'Германия (Берлин)' },
      { id: 'italiya', imageUrl: '/assets/lesson-00/exercise-03-countries/02-italiya.jpg', correctLabel: 'Италия (Рим)' },
      { id: 'belgiya', imageUrl: '/assets/lesson-00/exercise-03-countries/10-belgiya.jpg', correctLabel: 'Белгия (Брюксел)' },
      { id: 'ispaniya', imageUrl: '/assets/lesson-00/exercise-03-countries/06-ispaniya.jpg', correctLabel: 'Испания (Мадрид)' },
      { id: 'sasht', imageUrl: '/assets/lesson-00/exercise-03-countries/05-sasht.jpg', correctLabel: 'САЩ (Вашингтон)' },
      { id: 'turtsiya', imageUrl: '/assets/lesson-00/exercise-03-countries/07-turtsiya.jpg', correctLabel: 'Турция (Анкара)' },
      { id: 'frantsiya', imageUrl: '/assets/lesson-00/exercise-03-countries/04-frantsiya.jpg', correctLabel: 'Франция (Париж)' },
      { id: 'ukraina', imageUrl: '/assets/lesson-00/exercise-03-countries/09-ukraina.jpg', correctLabel: 'Украйна (Киев)' },
      { id: 'shvetsiya', imageUrl: '/assets/lesson-00/exercise-03-countries/03-shvetsiya.jpg', correctLabel: 'Швеция (Стокхолм)' },
    ],
    options: [
      'Белгия (Брюксел)',
      'България (София)',
      'Германия (Берлин)',
      'Испания (Мадрид)',
      'Италия (Рим)',
      'САЩ (Вашингтон)',
      'Турция (Анкара)',
      'Украйна (Киев)',
      'Франция (Париж)',
      'Швеция (Стокхолм)',
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
    instruction: 'Натиснете за произношение.',
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

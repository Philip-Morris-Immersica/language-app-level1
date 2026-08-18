import type {
  Exercise,
  ReadingTextExercise,
  GrammarExamplesExercise,
  GrammarTableExercise,
  TableFillExercise,
  WorkbookFillBlankExercise,
  DropdownMatchExercise,
  DialoguesExercise,
  MultipleChoiceExercise,
} from '@/content/types';

const B1_GRAMMAR_TTS_PROMPT =
  'Read aloud in a warm, welcoming tone, in clear standard Bulgarian with natural native pronunciation and correct stress. Do not use any Russian, Arabic, English or other foreign accent.';

// ⚠️ Следваме реда от учебника (B1, Урок 5 — „Къде си бил?"), стр. 34–41.
// Източник на снимки: images_organized/IMAGE-MAPPING.md (8 папки, 8 файла).
// Бележки по решенията (по желание на клиента):
//   • Дигитализираме всичко БЕЗ упр. 12 и упр. 29 (отворени въпроси — пропуснати).
//   • Упр. 30 („АЛА ОТ ИРАК") → четивен текст + multiple_choice (7 въпроса, зададени
//     от клиента) вместо 10-те отворени въпроса от учебника.
//   • Урокът НЯМА отделни секции „НОВИ ДУМИ"/„ДИАЛОЗИ" със заглавие — граматиката
//     е разпределена в кутии между упражненията (ГРАМАТИКА 1–11).
//   • Упр. 4 → dropdown_match (сортиране в 5 групи; drag_to_columns поддържа макс. 3).
//   • Упр. 3 → грамат. карта с модел и примери (свободна продукция, без оценяване).
//   • Речникът е копиран от Урок 3 (виж content.ts vocabulary).

export const exercises: Exercise[] = [

  {
    id: 'b1-l05-ex-01',
    type: 'reading_text',
    title: 'УПРАЖНЕНИЕ 1',
    instruction: 'Изслушайте текста и след това го прочетете сами. Обърнете внимание на глаголите в минало свършено време.',
    order: 1,
    images: [
      { imageUrl: '/assets/b1-lesson-05/01-upr-01-yabalki/01-zhena-bere-yabalki.jpg' },
    ],
    paragraphs: [
      'Онзи ден отидохме с мъжа ми до вилата ни. Тя се намира в едно малко планинско село. Пътувахме с колата. По пътя спряхме да обядваме в един ресторант. Нямаше много хора, беше приятно и уютно. Ядохме пица и пихме айрян. Взехме храна за вкъщи и продължихме за селото ни.',
      'Пристигнахме следобед. Плодовете в градината бяха узрели. Брахме ябълки и круши до вечерта. Когато свършихме с работата, съседите ни дойдоха на гости. Донесоха пресни домати от градината. Направихме салата и седнахме на терасата. Говорихме до късно – за децата, за работата, за родителите ни. Ние им показахме снимки на апартамента ни след ремонта. Мъжът ми разказа няколко забавни истории, смяхме се много. Беше приятна вечер!',
    ],
    paragraphVoiceGenders: ['female', 'female'],
    showDictionary: true,
  } as ReadingTextExercise,

  {
    id: 'b1-l05-gramatika-01',
    type: 'grammar_table',
    title: 'ГРАМАТИКА 1',
    tableTitle: 'Групи в минало свършено време (по окончание за „аз")',
    instruction: 'Разгледайте таблицата с глаголните форми в минало свършено време.',
    order: 2,
    columns: ['сегашно време', 'минало свършено (аз)'],
    rows: [
      { pronoun: '-АХ', cells: ['пътувам', 'пътувах'], ttsText: 'пътувам, пътувах' },
      { pronoun: '-ЯХ', cells: ['спирам, спра', 'спрях'], ttsText: 'спирам, спра, спрях' },
      { pronoun: '-ИХ', cells: ['пия', 'пих'], ttsText: 'пия, пих' },
      { pronoun: '-ОХ', cells: ['отивам, отида', 'отидох'], ttsText: 'отивам, отида, отидох' },
      { pronoun: '-ЕХ', cells: ['вземам, взема', 'взех'], ttsText: 'вземам, взема, взех' },
      { pronoun: '-УХ', cells: ['чувам, чуя', 'чух'], ttsText: 'чувам, чуя, чух' },
    ],
  } as GrammarTableExercise,

  {
    id: 'b1-l05-gramatika-02',
    type: 'b1-grammar-table',
    title: 'ГРАМАТИКА 2',
    tableTitle: 'Изрази за време (кога?) с минало свършено време',
    instruction: 'Разгледайте изразите за време с минало свършено време.',
    order: 3,
    widePronouns: true,
    columns: ['примери'],
    rows: [
      { pronoun: 'снощи / вчера / онзи ден', cells: ['снощи, вчера, онзи ден'], ttsText: 'снощи, вчера, онзи ден' },
      { pronoun: 'преди + бр.', cells: ['преди малко, преди два часа, преди три дни'], ttsText: 'преди малко, преди два часа, преди три дни' },
      { pronoun: 'миналия(т) + ден от седм./месец', cells: ['миналия понеделник, миналия месец, миналия уикенд'], ttsText: 'миналия понеделник, миналия месец, миналия уикенд' },
      { pronoun: 'миналата + седмица/година/сезон', cells: ['миналата седмица, миналата година, миналата пролет, миналата есен'], ttsText: 'миналата седмица, миналата година, миналата пролет, миналата есен' },
      { pronoun: 'през + година', cells: ['през 1964 година'], ttsText: 'през хи-ЛЯ-да деветстотин шейсет и четвърта година',
        ttsModel: 'pro', ttsPrompt: B1_GRAMMAR_TTS_PROMPT },
    ],
  } as unknown as Exercise,

  {
    id: 'b1-l05-ex-02',
    type: 'table_fill',
    title: 'УПРАЖНЕНИЕ 2',
    instruction: 'Изберете правилната форма на глаголите в минало свършено време.',
    order: 4,
    points: 36,
    paragraphs: [],
    tables: [
      {
        name: 'пътувам (-АХ)',
        columns: ['минало свършено'],
        rows: [
          { label: 'аз',        cells: [{ correctAnswers: ['пътувах'],   options: ['пътувах', 'пътува', 'пътувахме'] }] },
          { label: 'ти',        cells: [{ correctAnswers: ['пътува'],    options: ['пътувах', 'пътува', 'пътувахме'] }] },
          { label: 'той/тя/то', cells: [{ correctAnswers: ['пътува'],    options: ['пътувах', 'пътува', 'пътуваха'] }] },
          { label: 'ние',       cells: [{ correctAnswers: ['пътувахме'], options: ['пътувах', 'пътувахме', 'пътуваха'] }] },
          { label: 'вие',       cells: [{ correctAnswers: ['пътувахте'], options: ['пътувахме', 'пътувахте', 'пътуваха'] }] },
          { label: 'те',        cells: [{ correctAnswers: ['пътуваха'],  options: ['пътува', 'пътувахме', 'пътуваха'] }] },
        ],
      },
      {
        name: 'пия (-ИХ)',
        columns: ['минало свършено'],
        rows: [
          { label: 'аз',        cells: [{ correctAnswers: ['пих'],   options: ['пих', 'пи', 'пихме'] }] },
          { label: 'ти',        cells: [{ correctAnswers: ['пи'],    options: ['пих', 'пи', 'пихме'] }] },
          { label: 'той/тя/то', cells: [{ correctAnswers: ['пи'],    options: ['пих', 'пи', 'пиха'] }] },
          { label: 'ние',       cells: [{ correctAnswers: ['пихме'], options: ['пих', 'пихме', 'пиха'] }] },
          { label: 'вие',       cells: [{ correctAnswers: ['пихте'], options: ['пихме', 'пихте', 'пиха'] }] },
          { label: 'те',        cells: [{ correctAnswers: ['пиха'],  options: ['пи', 'пихме', 'пиха'] }] },
        ],
      },
      {
        name: 'взема (-ЕХ)',
        columns: ['минало свършено'],
        rows: [
          { label: 'аз',        cells: [{ correctAnswers: ['взех'],   options: ['взех', 'взе', 'взехме'] }] },
          { label: 'ти',        cells: [{ correctAnswers: ['взе'],    options: ['взех', 'взе', 'взехме'] }] },
          { label: 'той/тя/то', cells: [{ correctAnswers: ['взе'],    options: ['взех', 'взе', 'взеха'] }] },
          { label: 'ние',       cells: [{ correctAnswers: ['взехме'], options: ['взех', 'взехме', 'взеха'] }] },
          { label: 'вие',       cells: [{ correctAnswers: ['взехте'], options: ['взехме', 'взехте', 'взеха'] }] },
          { label: 'те',        cells: [{ correctAnswers: ['взеха'],  options: ['взе', 'взехме', 'взеха'] }] },
        ],
      },
      {
        name: 'спра (-ЯХ)',
        columns: ['минало свършено'],
        rows: [
          { label: 'аз',        cells: [{ correctAnswers: ['спрях'],   options: ['спрях', 'спря', 'спряхме'] }] },
          { label: 'ти',        cells: [{ correctAnswers: ['спря'],    options: ['спрях', 'спря', 'спряхме'] }] },
          { label: 'той/тя/то', cells: [{ correctAnswers: ['спря'],    options: ['спрях', 'спря', 'спряха'] }] },
          { label: 'ние',       cells: [{ correctAnswers: ['спряхме'], options: ['спрях', 'спряхме', 'спряха'] }] },
          { label: 'вие',       cells: [{ correctAnswers: ['спряхте'], options: ['спряхме', 'спряхте', 'спряха'] }] },
          { label: 'те',        cells: [{ correctAnswers: ['спряха'],  options: ['спря', 'спряхме', 'спряха'] }] },
        ],
      },
      {
        name: 'отида (-ОХ)',
        columns: ['минало свършено'],
        rows: [
          { label: 'аз',        cells: [{ correctAnswers: ['отидох'],   options: ['отидох', 'отиде', 'отидохме'] }] },
          { label: 'ти',        cells: [{ correctAnswers: ['отиде'],    options: ['отидох', 'отиде', 'отидохме'] }] },
          { label: 'той/тя/то', cells: [{ correctAnswers: ['отиде'],    options: ['отидох', 'отиде', 'отидоха'] }] },
          { label: 'ние',       cells: [{ correctAnswers: ['отидохме'], options: ['отидох', 'отидохме', 'отидоха'] }] },
          { label: 'вие',       cells: [{ correctAnswers: ['отидохте'], options: ['отидохме', 'отидохте', 'отидоха'] }] },
          { label: 'те',        cells: [{ correctAnswers: ['отидоха'],  options: ['отиде', 'отидохме', 'отидоха'] }] },
        ],
      },
      {
        name: 'чуя (-УХ)',
        columns: ['минало свършено'],
        rows: [
          { label: 'аз',        cells: [{ correctAnswers: ['чух'],   options: ['чух', 'чу', 'чухме'] }] },
          { label: 'ти',        cells: [{ correctAnswers: ['чу'],    options: ['чух', 'чу', 'чухме'] }] },
          { label: 'той/тя/то', cells: [{ correctAnswers: ['чу'],    options: ['чух', 'чу', 'чуха'] }] },
          { label: 'ние',       cells: [{ correctAnswers: ['чухме'], options: ['чух', 'чухме', 'чуха'] }] },
          { label: 'вие',       cells: [{ correctAnswers: ['чухте'], options: ['чухме', 'чухте', 'чуха'] }] },
          { label: 'те',        cells: [{ correctAnswers: ['чуха'],  options: ['чу', 'чухме', 'чуха'] }] },
        ],
      },
    ],
  } as TableFillExercise,

  {
    id: 'b1-l05-gramatika-neg-q',
    type: 'grammar_examples',
    title: 'ГРАМАТИКА',
    instruction: '',
    order: 5,
    layout: 'centered',
    examples: [
      {
        imageUrl: '',
        text: '',
        lines: [
          'Аз не пътувах.',
          'Ти пътува ли? / Ти не пътува ли?',
        ],
        ttsText: 'Аз не пътувах. Ти пътува ли? Ти не пътува ли?',
        ttsPrompt:
          'Прочетете плавно и естествено на книжовен български, топъл разговорен тон. Лека пауза между изреченията. Без чужд акцент.',
      },
    ],
  } as GrammarExamplesExercise,

  {
    id: 'b1-l05-ex-03',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 3',
    instruction: 'Изберете правилната форма на глагола в минало свършено време.',
    order: 6,
    points: 4,
    layout: 'single',
    sentences: [
      { text: 'Миналата седмица пътувах до Лондон.', blanks: [], correctAnswers: [], isExample: true },
      { text: 'Онзи ден аз _______ (пия) кафе с приятели.', blanks: [0], correctAnswers: ['пих'],
        options: ['пих', 'пи', 'пихме'] },
      { text: 'Вчера аз _______ (взема) билети за концерт.', blanks: [0], correctAnswers: ['взех'],
        options: ['взех', 'взе', 'взехме'] },
      { text: 'Преди малко той _______ (пия) вода.', blanks: [0], correctAnswers: ['пи'],
        options: ['пи', 'пих', 'пихме'] },
      { text: 'Миналата година те _______ (пътувам) до морето.', blanks: [0], correctAnswers: ['пътуваха'],
        options: ['пътуваха', 'пътува', 'пътувахме'] },
    ],
  } as WorkbookFillBlankExercise,

  {
    id: 'b1-l05-gramatika-03',
    type: 'b1-grammar-table',
    title: 'ГРАМАТИКА 3',
    instruction: 'Разгледайте формите на глагола **съм** в минало време и описателните форми с **-ше**.',
    order: 7,
    rows: [
      { pronoun: 'аз',  cells: ['бях'],   ttsText: 'аз бях',   ttsModel: 'pro', ttsPrompt: B1_GRAMMAR_TTS_PROMPT },
      { pronoun: 'ти',  cells: ['беше'],  ttsText: 'ти беше',  ttsModel: 'pro', ttsPrompt: B1_GRAMMAR_TTS_PROMPT },
      { pronoun: 'той', cells: ['беше'],  ttsText: 'той беше', ttsModel: 'pro',
        ttsPrompt: `${B1_GRAMMAR_TTS_PROMPT} Past form of съм: BE-she (беше), clear soft ш.` },
      { pronoun: 'тя',  cells: ['беше'],  ttsText: 'тя беше',  ttsModel: 'pro',
        ttsPrompt: `${B1_GRAMMAR_TTS_PROMPT} Past form of съм: BE-she (беше), clear soft ш.` },
      { pronoun: 'то',  cells: ['беше'],  ttsText: 'то беше',  ttsModel: 'pro',
        ttsPrompt: `${B1_GRAMMAR_TTS_PROMPT} Past form of съм: BE-she (беше), clear soft ш.` },
      { pronoun: 'ние', cells: ['бяхме'], ttsText: 'ние бяхме', ttsModel: 'pro',
        ttsPrompt: `${B1_GRAMMAR_TTS_PROMPT} Past form: BYAH-hme (бяхме) — clear хм cluster.` },
      { pronoun: 'вие', cells: ['бяхте'], ttsText: 'вие бяхте', ttsModel: 'pro',
        ttsPrompt: `${B1_GRAMMAR_TTS_PROMPT} Past form: BYAH-hte (бяхте) — clear хт cluster.` },
      { pronoun: 'те',  cells: ['бяха'],  ttsText: 'те бяха', ttsModel: 'pro',
        ttsPrompt: `${B1_GRAMMAR_TTS_PROMPT} Past form: BYA-ha (бяха), two clear syllables.` },
      { pronoun: 'обичам',  cells: ['обич**аше**'], ttsText: 'обичам, обичаше' },
      { pronoun: 'искам',   cells: ['иск**аше**'],  ttsText: 'искам, искаше' },
      { pronoun: 'зная',    cells: ['зна**еше**'],  ttsText: 'зная, знаеше' },
      { pronoun: 'имам',    cells: ['им**аше**'],   ttsText: 'имам, имаше',
        ttsModel: 'pro',
        ttsPrompt: `${B1_GRAMMAR_TTS_PROMPT} Second word: i-MA-she (имаше). Final consonant is soft Ш as in беше and шапка — NEVER s, NEVER имасе / i-MA-se.` },
      { pronoun: 'нямам',   cells: ['ням**аше**'],  ttsText: 'нямам, нямаше' },
    ],
    panels: [
      {
        tableTitle: 'Глаголът „съм"',
        columns: [],
        rows: [
          { pronoun: 'аз',  cells: ['бях'] },
          { pronoun: 'ти',  cells: ['беше'] },
          { pronoun: 'той', cells: ['беше'] },
          { pronoun: 'тя',  cells: ['беше'] },
          { pronoun: 'то',  cells: ['беше'] },
          { pronoun: 'ние', cells: ['бяхме'] },
          { pronoun: 'вие', cells: ['бяхте'] },
          { pronoun: 'те',  cells: ['бяха'] },
        ],
      },
      {
        tableTitle: 'ти / той / тя / то',
        columns: [],
        rows: [
          { pronoun: 'обичам',  cells: ['обич**аше**'] },
          { pronoun: 'искам',   cells: ['иск**аше**'] },
          { pronoun: 'зная',    cells: ['зна**еше**'] },
          { pronoun: 'имам',    cells: ['им**аше**'] },
          { pronoun: 'нямам',   cells: ['ням**аше**'] },
        ],
      },
    ],
  } as unknown as Exercise,

  {
    id: 'b1-l05-ex-04',
    type: 'dropdown_match',
    title: 'УПРАЖНЕНИЕ 4',
    instruction: 'Изберете групата на всеки глагол според окончанието му в минало свършено време.',
    order: 9,
    points: 13,
    questions: [
      { id: 'q1',  left: 'пътувах',   options: ['-АХ', '-ЯХ', '-ИХ', '-ОХ'], correctAnswer: '-АХ' },
      { id: 'q2',  left: 'спрях',     options: ['-АХ', '-ЯХ', '-ИХ', '-ЕХ'], correctAnswer: '-ЯХ' },
      { id: 'q3',  left: 'пих',       options: ['-АХ', '-ЯХ', '-ИХ', '-ОХ'], correctAnswer: '-ИХ' },
      { id: 'q4',  left: 'отидох',    options: ['-АХ', '-ИХ', '-ОХ', '-ЕХ'], correctAnswer: '-ОХ' },
      { id: 'q5',  left: 'взех',      options: ['-АХ', '-ИХ', '-ОХ', '-ЕХ'], correctAnswer: '-ЕХ' },
      { id: 'q6',  left: 'обядвах',   options: ['-АХ', '-ЯХ', '-ИХ', '-ОХ'], correctAnswer: '-АХ' },
      { id: 'q7',  left: 'продължих', options: ['-АХ', '-ЯХ', '-ИХ', '-ОХ'], correctAnswer: '-ИХ' },
      { id: 'q8',  left: 'ядох',      options: ['-АХ', '-ИХ', '-ОХ', '-ЕХ'], correctAnswer: '-ОХ' },
      { id: 'q9',  left: 'показах',   options: ['-АХ', '-ЯХ', '-ИХ', '-ЕХ'], correctAnswer: '-АХ' },
      { id: 'q10', left: 'смях се',   options: ['-АХ', '-ЯХ', '-ИХ', '-ЕХ'], correctAnswer: '-ЯХ' },
      { id: 'q11', left: 'говорих',   options: ['-АХ', '-ЯХ', '-ИХ', '-ОХ'], correctAnswer: '-ИХ' },
      { id: 'q12', left: 'дойдох',    options: ['-АХ', '-ИХ', '-ОХ', '-ЕХ'], correctAnswer: '-ОХ' },
      { id: 'q13', left: 'седнах',    options: ['-АХ', '-ЯХ', '-ИХ', '-ОХ'], correctAnswer: '-АХ' },
    ],
  } as DropdownMatchExercise,

  {
    id: 'b1-l05-ex-05',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 5',
    instruction: 'Изберете глаголите в минало свършено време по модела.',
    order: 10,
    points: 6,
    layout: 'single',
    sentences: [
      { text: 'Снощи ние бяхме на театър. (съм)', blanks: [], correctAnswers: [], isExample: true },
      { text: 'Вчера ние _______ (посетя) Националния исторически музей.', blanks: [0], correctAnswers: ['посетихме'], options: ['посетихме', 'посети', 'посетих', 'посетиха'] },
      { text: 'През 2015 година Вера и Свилен _______ (завърша) университет.', blanks: [0], correctAnswers: ['завършиха'], options: ['завършиха', 'завърши', 'завърших', 'завършихме'] },
      { text: 'Миналата година те _______ (кандидатствам) в един колеж, но не ги _______ (приема).', blanks: [0, 1], correctAnswers: ['кандидатстваха', 'приеха'],
        options: [['кандидатстваха', 'кандидатства', 'кандидатствах', 'кандидатствахме'], ['приеха', 'прие', 'приех', 'приехме']] },
      { text: 'Преди малко Ана _______ (обадя се) на Маги.', blanks: [0], correctAnswers: ['се обади'], options: ['се обади', 'се обадих', 'се обадиха', 'се обадихме'] },
      { text: 'Вчера аз _______ (запозная се) с новите колеги.', blanks: [0], correctAnswers: ['се запознах'], options: ['се запознах', 'се запозна', 'се запознаха', 'се запознахме'] },
    ],
  } as WorkbookFillBlankExercise,

  {
    id: 'b1-l05-ex-06',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 6',
    instruction: 'Изберете глаголите в минало свършено време по модела.',
    order: 11,
    points: 4,
    layout: 'single',
    sentences: [
      { text: 'Утре ще започна нова работа. Вчера започнах нова работа.', blanks: [], correctAnswers: [], isExample: true },
      { text: 'Следващия месец Асен и Катя няма да заминат за Египет. Миналия месец Асен и Катя не _______ за Египет.', blanks: [0], correctAnswers: ['заминаха'], options: ['заминаха', 'замина', 'заминах', 'заминахме'] },
      { text: 'След малко те ще се обадят на шефа. Преди малко те _______ на шефа.', blanks: [0], correctAnswers: ['се обадиха'], options: ['се обадиха', 'се обади', 'се обадих', 'се обадихме'] },
      { text: 'Вдругиден ще направиш ли баница със спанак? Онзи ден _______ ли баница със спанак?', blanks: [0], correctAnswers: ['направи'], options: ['направи', 'направих', 'направиха', 'направихме'] },
      { text: 'Утре вечер ще отидем на купон. Вчера ние _______ на купон.', blanks: [0], correctAnswers: ['отидохме'], options: ['отидохме', 'отидох', 'отиде', 'отидоха'] },
    ],
  } as WorkbookFillBlankExercise,

  {
    id: 'b1-l05-ex-07',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 7',
    instruction: 'Изберете глаголите в минало свършено време по модела.',
    order: 12,
    points: 6,
    layout: 'single',
    sentences: [
      { text: 'Често закъснявам за работа и имам проблеми с шефа. Вчера закъснях за работа и имах проблеми с шефа.', blanks: [], correctAnswers: [], isExample: true },
      { text: 'Всяка сутрин ти ставаш много рано. Вчера сутринта ти _______ много рано.', blanks: [0], correctAnswers: ['стана'], options: ['стана', 'станах', 'станаха', 'станахме'] },
      { text: 'Обикновено Вики не идва на гости сама. Снощи Вики не _______ на гости сама.', blanks: [0], correctAnswers: ['дойде'], options: ['дойде', 'дойдох', 'дойдоха', 'дойдохме'] },
      { text: 'Татяна никога не дава пари назаем на Иван. Миналия вторник Татяна не _______ пари назаем на Иван.', blanks: [0], correctAnswers: ['даде'], options: ['даде', 'дадох', 'дадоха', 'дадохме'] },
      { text: 'Аз понякога посещавам музеи. Миналата сряда аз _______ Археологическия музей.', blanks: [0], correctAnswers: ['посетих'], options: ['посетих', 'посети', 'посетиха', 'посетихме'] },
      { text: 'Сутрин обикновено пия кафе с мляко. Тази сутрин също _______ кафе с мляко.', blanks: [0], correctAnswers: ['пих'], options: ['пих', 'пи', 'пиха', 'пихме'] },
      { text: 'За закуска често ям сандвич. Тази сутрин _______ мюсли.', blanks: [0], correctAnswers: ['ядох'], options: ['ядох', 'яде', 'ядоха', 'ядохме'] },
    ],
  } as WorkbookFillBlankExercise,

  {
    id: 'b1-l05-ex-08',
    type: 'reading_text',
    title: 'УПРАЖНЕНИЕ 8',
    instruction: 'Изслушайте текста и след това го прочетете сами. Обърнете внимание на изразите „исках да", „не можах да" и „трябваше да".',
    order: 13,
    images: [
      { imageUrl: '/assets/b1-lesson-05/02-upr-08-bolka/01-jena-bolka-krast.jpg' },
    ],
    paragraphs: [
      'Миналата седмица имах сериозен проблем с кръста и трябваше да отида на лекар. Той искаше да ми сложи инжекция против болките, но аз не исках. Страхувах се много. Тогава той ми предписа болкоуспокояващи таблетки, но не можах да ги купя, защото аптеката беше затворена.',
      'Взех ги на следващия ден. Пих ги няколко дена, защото исках да оздравея бързо. Благодарение на това лекарство сега съм добре.',
    ],
    ttsParagraphs: [
      'Миналата седмица имах сериозен проблем с кръста и трябваше да отида на лекар. Той искаше да ми сложи инжекция против болките, но аз не исках. Страхувах се много. Тогава той ми предписа болкоуспокояващи таблетки, но не можах да ги купя, защото аптеката беше затворена.',
      'Взех ги на следващия ден. Пих ги няколко дена, защото исках да оздравея бързо. Благодарение на това лекарство сега съм добре.',
    ],
    paragraphVoiceGenders: ['female', 'female'],
    showDictionary: true,
  } as ReadingTextExercise,

  {
    id: 'b1-l05-gramatika-iskah',
    type: 'grammar_examples',
    title: 'ГРАМАТИКА',
    subtitle: 'трябваше да / не можах да / исках да',
    instruction: '',
    order: 14,
    layout: 'centered',
    examples: [
      {
        imageUrl: '',
        text: '',
        lines: [
          'Миналата седмица аз',
          '**трябваше да** отида на лекар.',
          '**Не можах да** купя лекарство.',
          '**Исках да** оздравея.',
        ],
        ttsText: 'Миналата седмица аз трябваше да отида на лекар. Не можах да купя лекарство. Исках да оздравея.',
        ttsPrompt:
          'Прочетете плавно и естествено на книжовен български, топъл разговорен тон. Лека пауза между изреченията. Без чужд акцент. Ударение: тря́бваше, мо́жах, иска́х, оздраве́я.',
      },
    ],
  } as GrammarExamplesExercise,

  {
    id: 'b1-l05-ex-09',
    type: 'table_fill',
    title: 'УПРАЖНЕНИЕ 9',
    instruction: 'Изберете правилната форма на глагола „мога" в минало свършено време.',
    order: 15,
    points: 6,
    paragraphs: [],
    tables: [
      {
        name: 'Не можах да купя лекарството',
        columns: ['не ___ да купя'],
        rows: [
          { label: 'аз',        cells: [{ correctAnswers: ['можах'],   options: ['можах', 'можа', 'можахме'] }] },
          { label: 'ти',        cells: [{ correctAnswers: ['можа'],    options: ['можах', 'можа', 'можахме'] }] },
          { label: 'той/тя/то', cells: [{ correctAnswers: ['можа'],    options: ['можах', 'можа', 'можаха'] }] },
          { label: 'ние',       cells: [{ correctAnswers: ['можахме'], options: ['можах', 'можахме', 'можаха'] }] },
          { label: 'вие',       cells: [{ correctAnswers: ['можахте'], options: ['можахме', 'можахте', 'можаха'] }] },
          { label: 'те',        cells: [{ correctAnswers: ['можаха'],  options: ['можа', 'можахме', 'можаха'] }] },
        ],
      },
    ],
  } as TableFillExercise,

  {
    id: 'b1-l05-gramatika-05',
    type: 'grammar_examples',
    title: 'ГРАМАТИКА 5',
    instruction: 'Разгледайте формите с „исках да" и „трябваше да".',
    order: 16,
    layout: 'centered',
    examples: [
      {
        imageUrl: '',
        text: '',
        lines: [
          'Той **искаше да** отиде на кино.',
          'Той **не искаше да** отиде на кино.',
          'Той **искаше ли да** отиде на кино?',
          'Той **не искаше ли да** отиде на кино?',
        ],
        ttsText: 'Той искаше да отиде на кино. Той не искаше да отиде на кино. Той искаше ли да отиде на кино? Той не искаше ли да отиде на кино?',
        ttsPrompt:
          'Прочетете плавно и естествено на книжовен български, топъл разговорен тон, като учител, който показва примери. Лека пауза между изреченията. Утвърдителните изречения с падаща интонация, въпросите с леко покачване. Без роботски ритъм и без чужд акцент. Ударение: иска́ше, оти́де, ки́но.',
      },
      {
        imageUrl: '',
        text: '',
        lines: [
          'Той **трябваше да** учи.',
          'Той **не трябваше да** учи.',
          'Той **трябваше ли да** учи?',
          'Той **не трябваше ли да** учи?',
        ],
        ttsText: 'Той трябваше да учи. Той не трябваше да учи. Той трябваше ли да учи? Той не трябваше ли да учи?',
        ttsPrompt:
          'Прочетете плавно и естествено на книжовен български, топъл разговорен тон, като учител, който показва примери. Лека пауза между изреченията. Утвърдителните изречения с падаща интонация, въпросите с леко покачване. Без роботски ритъм и без чужд акцент. Ударение: тря́бваше, у́чи.',
      },
    ],
  } as GrammarExamplesExercise,

  {
    id: 'b1-l05-ex-10',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 10',
    instruction: 'Изберете глаголите в минало време по модела.',
    order: 17,
    points: 3,
    layout: 'single',
    sentences: [
      { text: 'Той не иска да яде грах. Вчера той не искаше да яде грах.', blanks: [], correctAnswers: [], isExample: true },
      { text: 'Тя иска да види изложбата на известния български художник Златю Бояджиев. Миналия петък тя _______ да види изложбата на известния български художник Златю Бояджиев.', blanks: [0], correctAnswers: ['искаше'], options: ['искаше', 'исках', 'искаха', 'искахме'] },
      { text: 'Ние трябва да тръгнем навреме за автогарата. Вчера ние _______ да тръгнем навреме за автогарата.', blanks: [0], correctAnswers: ['трябваше'], options: ['трябваше', 'трябва', 'трябвах', 'трябваха'] },
      { text: 'Не можеш ли да намериш ключовете за колата? Снощи ти не _______ да намериш ключовете за колата?', blanks: [0], correctAnswers: ['можа'], options: ['можа', 'можах', 'можаха', 'можеш'] },
    ],
  } as WorkbookFillBlankExercise,

  {
    id: 'b1-l05-ex-11',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 11',
    instruction: 'Изберете глаголите в минало време по модела.',
    order: 18,
    points: 4,
    layout: 'single',
    compact: true,
    sentences: [
      { text: 'Миналата година ние трябваше да пътуваме с кораб. (трябва да пътувам)', blanks: [], correctAnswers: [], isExample: true },
      { text: 'Вчера той _______ (искам да купя) подарък за Мила.', blanks: [0], correctAnswers: ['искаше да купи'], options: ['искаше да купи', 'исках да купя', 'искаха да купят', 'искахме да купим'] },
      { text: 'Преди една седмица те _______ (трябва да замина) за Италия.', blanks: [0], correctAnswers: ['трябваше да заминат'], options: ['трябваше да заминат', 'трябва да заминат', 'трябваха да заминат', 'трябвах да замина'] },
      { text: 'През 2005 г. тя _______ (не мога да дойда) в София.', blanks: [0], correctAnswers: ['не можа да дойде'], options: ['не можа да дойде', 'не можах да дойда', 'не можаха да дойдат', 'не можахме да дойдем'] },
      { text: 'Миналото лято вие _______ (искам да отворя) нов офис?', blanks: [0], correctAnswers: ['искахте да отворите'], options: ['искахте да отворите', 'искаше да отвори', 'исках да отворя', 'искаха да отворят'] },
    ],
  } as WorkbookFillBlankExercise,

  {
    id: 'b1-l05-dialozi-01',
    type: 'dialogues',
    title: 'УПРАЖНЕНИЕ 13',
    instruction: 'Изслушайте диалозите и се опитайте да ги прочетете. Обърнете внимание на глаголите в минало неопределено време.',
    order: 19,
    images: ['/assets/b1-lesson-05/03-upr-13-kafe/01-dvama-mazhe-kafe.jpg'],
    sections: [
      { id: 'а.', lines: [
        { text: 'Разбрах, че си започнал нова работа.', voiceGender: 'male' },
        { text: 'Да, започнах миналата седмица.', voiceGender: 'male' },
        { text: 'Страхотно! Радвам се за теб.', voiceGender: 'male' },
      ] },
      { id: 'б.', lines: [
        { text: 'Знаеш ли, че Росица е заминала за Гърция?', voiceGender: 'female',
          ttsText: 'Знаеш ли, че РосИца е заминала за Гърция?',
          ttsPrompt: 'Clear standard Bulgarian female voice, smooth natural speech. Name РосИца: capitals mark stress only — do not spell them out. IPA roˈsit͡sɐ, stress on И (second syllable, ro-SI-tsa). NEVER ro-SEE-tsa or ROS-i-tsa. Read the sentence once, flowing.' },
        { text: 'Да, снощи разбрах.', voiceGender: 'male',
          ttsText: 'Да. Снощи раз-БРАХ.' },
      ] },
      { id: 'в.', lines: [
        { text: 'Мъжът ти е направил чудесни фалафели!', voiceGender: 'female',
          ttsText: 'Мъжът ти е направил чудесни фа-ЛА-фели.' },
        { text: 'Да, защото е работил в арабски ресторант в Дамаск.', voiceGender: 'female' },
      ] },
      { id: 'г.', lines: [
        { text: 'Къде си учил?', voiceGender: 'male' },
        { text: 'Учил съм в гимназия „Иван Вазов".', voiceGender: 'male' },
      ] },
    ],
  } as DialoguesExercise,

  {
    id: 'b1-l05-ex-14',
    type: 'table_fill',
    title: 'УПРАЖНЕНИЕ 14',
    instruction: 'Изберете липсващата форма на глагола „съм" в минало неопределено време.',
    order: 20,
    points: 8,
    paragraphs: [],
    tables: [
      {
        name: 'Минало неопределено време — „съм" + причастие',
        columns: ['„съм"'],
        rows: [
          { label: 'аз ___ работил(а)', cells: [{ correctAnswers: ['съм'], options: ['съм', 'си', 'сме'] }] },
          { label: 'ти ___ работил(а)', cells: [{ correctAnswers: ['си'],  options: ['съм', 'си', 'е'] }] },
          { label: 'той ___ работил',   cells: [{ correctAnswers: ['е'],   options: ['си', 'е', 'са'] }] },
          { label: 'тя ___ работила',   cells: [{ correctAnswers: ['е'],   options: ['съм', 'е', 'са'] }] },
          { label: 'то ___ работило',   cells: [{ correctAnswers: ['е'],   options: ['е', 'сме', 'са'] }] },
          { label: 'ние ___ работили',  cells: [{ correctAnswers: ['сме'], options: ['съм', 'сме', 'сте'] }] },
          { label: 'вие ___ работили',  cells: [{ correctAnswers: ['сте'], options: ['сме', 'сте', 'са'] }] },
          { label: 'те ___ работили',   cells: [{ correctAnswers: ['са'],  options: ['е', 'сме', 'са'] }] },
        ],
      },
    ],
  } as TableFillExercise,

  {
    id: 'b1-l05-gramatika-sum',
    type: 'grammar_examples',
    title: 'ГРАМАТИКА',
    instruction: '',
    order: 21,
    layout: 'centered',
    examples: [
      {
        imageUrl: '',
        text: '',
        lines: [
          'Аз съм работил в арабски ресторант.',
          'Ти **не** си работил в ресторант.',
          'Ти работил **ли** си?',
          'Ти не си **ли** работил?',
        ],
        voiceGender: 'male',
        ttsText: 'Аз съм работил в арабски ресторант. Ти не си работил в ресторант. Ти работил ли си? Ти не си ли работил?',
        ttsPrompt:
          'Прочетете плавно и естествено на книжовен български, топъл разговорен тон. Лека пауза между изреченията. Първите две изречения са съобщителни — „Аз съм работил в арабски ресторант." и „Ти не си работил в ресторант." завършват с ясно падаща интонация, без никакъв въпросителен тон. Само последните две изречения са въпроси и завършват с леко покачване. Без чужд акцент.',
      },
      {
        imageUrl: '',
        text: '',
        lines: [
          'Аз **съм** работил в училище.',
          '=',
          'Работил **съм** в училище.',
        ],
        voiceGender: 'male',
        ttsText: 'Аз съм работил в училище. Работил съм в училище.',
        ttsPrompt:
          'Прочетете плавно и естествено на книжовен български, топъл разговорен тон. И двете изречения са съобщителни — с падаща интонация в края, без въпросителен тон. Без чужд акцент.',
      },
    ],
  } as GrammarExamplesExercise,

  {
    id: 'b1-l05-ex-15',
    type: 'table_fill',
    title: 'УПРАЖНЕНИЕ 15',
    instruction: 'Изберете миналото свършено причастие във всеки род по модела („ходих → ходил, ходила, ходило, ходили").',
    order: 22,
    points: 44,
    paragraphs: [],
    tables: [
      {
        name: 'Минало свършено причастие',
        labelHeader: 'Минало свършено време',
        columns: ['мъжки (той)', 'женски (тя)', 'среден (то)', 'мн.ч. (те)'],
        rows: [
          { label: 'ходих',   cells: [
            { correctAnswers: ['ходил'],   options: ['ходил'] },
            { correctAnswers: ['ходила'],  options: ['ходила'] },
            { correctAnswers: ['ходило'],  options: ['ходило'] },
            { correctAnswers: ['ходили'],  options: ['ходили'] },
          ] },
          { label: 'учих',    cells: [
            { correctAnswers: ['учил'],   options: ['учил', 'учила', 'учило', 'учили'] },
            { correctAnswers: ['учила'],  options: ['учил', 'учила', 'учило', 'учили'] },
            { correctAnswers: ['учило'],  options: ['учил', 'учила', 'учило', 'учили'] },
            { correctAnswers: ['учили'],  options: ['учил', 'учила', 'учило', 'учили'] },
          ] },
          { label: 'говорих', cells: [
            { correctAnswers: ['говорил'],  options: ['говорил', 'говорила', 'говорило', 'говорили'] },
            { correctAnswers: ['говорила'], options: ['говорил', 'говорила', 'говорило', 'говорили'] },
            { correctAnswers: ['говорило'], options: ['говорил', 'говорила', 'говорило', 'говорили'] },
            { correctAnswers: ['говорили'], options: ['говорил', 'говорила', 'говорило', 'говорили'] },
          ] },
          { label: 'работих', cells: [
            { correctAnswers: ['работил'],  options: ['работил', 'работила', 'работило', 'работили'] },
            { correctAnswers: ['работила'], options: ['работил', 'работила', 'работило', 'работили'] },
            { correctAnswers: ['работило'], options: ['работил', 'работила', 'работило', 'работили'] },
            { correctAnswers: ['работили'], options: ['работил', 'работила', 'работило', 'работили'] },
          ] },
          { label: 'готвих',  cells: [
            { correctAnswers: ['готвил'],  options: ['готвил', 'готвила', 'готвило', 'готвили'] },
            { correctAnswers: ['готвила'], options: ['готвил', 'готвила', 'готвило', 'готвили'] },
            { correctAnswers: ['готвило'], options: ['готвил', 'готвила', 'готвило', 'готвили'] },
            { correctAnswers: ['готвили'], options: ['готвил', 'готвила', 'готвило', 'готвили'] },
          ] },
          { label: 'правих',  cells: [
            { correctAnswers: ['правил'],  options: ['правил', 'правила', 'правило', 'правили'] },
            { correctAnswers: ['правила'], options: ['правил', 'правила', 'правило', 'правили'] },
            { correctAnswers: ['правило'], options: ['правил', 'правила', 'правило', 'правили'] },
            { correctAnswers: ['правили'], options: ['правил', 'правила', 'правило', 'правили'] },
          ] },
          { label: 'писах',   cells: [
            { correctAnswers: ['писал'],  options: ['писал', 'писала', 'писало', 'писали'] },
            { correctAnswers: ['писала'], options: ['писал', 'писала', 'писало', 'писали'] },
            { correctAnswers: ['писало'], options: ['писал', 'писала', 'писало', 'писали'] },
            { correctAnswers: ['писали'], options: ['писал', 'писала', 'писало', 'писали'] },
          ] },
          { label: 'играх',   cells: [
            { correctAnswers: ['играл'],  options: ['играл', 'играла', 'играло', 'играли'] },
            { correctAnswers: ['играла'], options: ['играл', 'играла', 'играло', 'играли'] },
            { correctAnswers: ['играло'], options: ['играл', 'играла', 'играло', 'играли'] },
            { correctAnswers: ['играли'], options: ['играл', 'играла', 'играло', 'играли'] },
          ] },
          { label: 'пътувах', cells: [
            { correctAnswers: ['пътувал'],  options: ['пътувал', 'пътувала', 'пътувало', 'пътували'] },
            { correctAnswers: ['пътувала'], options: ['пътувал', 'пътувала', 'пътувало', 'пътували'] },
            { correctAnswers: ['пътувало'], options: ['пътувал', 'пътувала', 'пътувало', 'пътували'] },
            { correctAnswers: ['пътували'], options: ['пътувал', 'пътувала', 'пътувало', 'пътували'] },
          ] },
          { label: 'гледах',  cells: [
            { correctAnswers: ['гледал'],  options: ['гледал', 'гледала', 'гледало', 'гледали'] },
            { correctAnswers: ['гледала'], options: ['гледал', 'гледала', 'гледало', 'гледали'] },
            { correctAnswers: ['гледало'], options: ['гледал', 'гледала', 'гледало', 'гледали'] },
            { correctAnswers: ['гледали'], options: ['гледал', 'гледала', 'гледало', 'гледали'] },
          ] },
          { label: 'взех',    cells: [
            { correctAnswers: ['взел'],  options: ['взел', 'взела', 'взело', 'взели'] },
            { correctAnswers: ['взела'], options: ['взел', 'взела', 'взело', 'взели'] },
            { correctAnswers: ['взело'], options: ['взел', 'взела', 'взело', 'взели'] },
            { correctAnswers: ['взели'], options: ['взел', 'взела', 'взело', 'взели'] },
          ] },
          { label: 'чух',     cells: [
            { correctAnswers: ['чул'],  options: ['чул', 'чула', 'чуло', 'чули'] },
            { correctAnswers: ['чула'], options: ['чул', 'чула', 'чуло', 'чули'] },
            { correctAnswers: ['чуло'], options: ['чул', 'чула', 'чуло', 'чули'] },
            { correctAnswers: ['чули'], options: ['чул', 'чула', 'чуло', 'чули'] },
          ] },
          { label: 'живях',   cells: [
            { correctAnswers: ['живял'],  options: ['живял'] },
            { correctAnswers: ['живяла'], options: ['живяла'] },
            { correctAnswers: ['живяло'], options: ['живяло'] },
            { correctAnswers: ['живели'], options: ['живели'] },
          ] },
        ],
      },
    ],
  } as TableFillExercise,

  {
    id: 'b1-l05-ex-16',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 16',
    instruction: 'Изберете отговора в минало неопределено време по модела.',
    order: 23,
    points: 5,
    layout: 'single',
    sentences: [
      { text: 'Писал ли си стихове? Да, писал съм. (пиша)', blanks: [], correctAnswers: [], isExample: true },
      { text: 'Пътувал ли си с кораб? Не, _______. (пътувам)', blanks: [0], correctAnswers: ['не съм пътувал'], acceptableAnswers: [['не съм пътувала']], options: ['не съм пътувал', 'не си пътувал', 'не сме пътували', 'не съм пътувала'] },
      { text: 'Ходили ли са в Йордания? Да, _______. (ходя)', blanks: [0], correctAnswers: ['ходили са'], options: ['ходили са', 'ходил е', 'ходила е', 'ходили сме'] },
      { text: 'Учили ли сте френски? Не, _______. (уча)', blanks: [0], correctAnswers: ['не сме учили'], options: ['не сме учили', 'не съм учил', 'не сте учили', 'не са учили'] },
      { text: 'Играла ли е шах? Да, _______. (играя)', blanks: [0], correctAnswers: ['играла е'], options: ['играла е', 'играл е', 'играли са', 'играло е'] },
      { text: 'Карали ли сте колело? Не, _______. (карам)', blanks: [0], correctAnswers: ['не сме карали'], options: ['не сме карали', 'не съм карал', 'не сте карали', 'не са карали'] },
    ],
  } as WorkbookFillBlankExercise,

  {
    id: 'b1-l05-ex-17',
    type: 'table_fill',
    title: 'УПРАЖНЕНИЕ 17',
    instruction: 'Изберете миналото свършено причастие във всеки род на неправилните глаголи.',
    order: 24,
    points: 48,
    paragraphs: [],
    tables: [
      {
        name: 'Неправилни причастия',
        labelHeader: 'Минало свършено време',
        columns: ['мъжки (той)', 'женски (тя)', 'среден (то)', 'мн.ч. (те)'],
        rows: [
          { label: 'бях',    cells: [
            { correctAnswers: ['бил'],   options: ['бил'] },
            { correctAnswers: ['била'],  options: ['била'] },
            { correctAnswers: ['било'],  options: ['било'] },
            { correctAnswers: ['били'],  options: ['били'] },
          ] },
          { label: 'ядох',   cells: [
            { correctAnswers: ['ял'],   options: ['ял', 'яла', 'яло', 'яли'] },
            { correctAnswers: ['яла'],  options: ['ял', 'яла', 'яло', 'яли'] },
            { correctAnswers: ['яло'],  options: ['ял', 'яла', 'яло', 'яли'] },
            { correctAnswers: ['яли'],  options: ['ял', 'яла', 'яло', 'яли'] },
          ] },
          { label: 'четох',  cells: [
            { correctAnswers: ['чел'],   options: ['чел', 'чела', 'чело', 'чели'] },
            { correctAnswers: ['чела'],  options: ['чел', 'чела', 'чело', 'чели'] },
            { correctAnswers: ['чело'],  options: ['чел', 'чела', 'чело', 'чели'] },
            { correctAnswers: ['чели'],  options: ['чел', 'чела', 'чело', 'чели'] },
          ] },
          { label: 'дадох',  cells: [
            { correctAnswers: ['дал'],   options: ['дал', 'дала', 'дало', 'дали'] },
            { correctAnswers: ['дала'],  options: ['дал', 'дала', 'дало', 'дали'] },
            { correctAnswers: ['дало'],  options: ['дал', 'дала', 'дало', 'дали'] },
            { correctAnswers: ['дали'],  options: ['дал', 'дала', 'дало', 'дали'] },
          ] },
          { label: 'можах',  cells: [
            { correctAnswers: ['могъл'],  options: ['могъл', 'могла', 'могло', 'могли'] },
            { correctAnswers: ['могла'],  options: ['могъл', 'могла', 'могло', 'могли'] },
            { correctAnswers: ['могло'],  options: ['могъл', 'могла', 'могло', 'могли'] },
            { correctAnswers: ['могли'],  options: ['могъл', 'могла', 'могло', 'могли'] },
          ] },
          { label: 'дойдох', cells: [
            { correctAnswers: ['дошъл'],  options: ['дошъл', 'дошла', 'дошло', 'дошли'] },
            { correctAnswers: ['дошла'],  options: ['дошъл', 'дошла', 'дошло', 'дошли'] },
            { correctAnswers: ['дошло'],  options: ['дошъл', 'дошла', 'дошло', 'дошли'] },
            { correctAnswers: ['дошли'],  options: ['дошъл', 'дошла', 'дошло', 'дошли'] },
          ] },
          { label: 'отидох', cells: [
            { correctAnswers: ['отишъл'], options: ['отишъл', 'отишла', 'отишло', 'отишли'] },
            { correctAnswers: ['отишла'], options: ['отишъл', 'отишла', 'отишло', 'отишли'] },
            { correctAnswers: ['отишло'], options: ['отишъл', 'отишла', 'отишло', 'отишли'] },
            { correctAnswers: ['отишли'], options: ['отишъл', 'отишла', 'отишло', 'отишли'] },
          ] },
          { label: 'доведох', cells: [
            { correctAnswers: ['довел'],  options: ['довел', 'довела', 'довело', 'довели'] },
            { correctAnswers: ['довела'], options: ['довел', 'довела', 'довело', 'довели'] },
            { correctAnswers: ['довело'], options: ['довел', 'довела', 'довело', 'довели'] },
            { correctAnswers: ['довели'], options: ['довел', 'довела', 'довело', 'довели'] },
          ] },
          { label: 'заведох', cells: [
            { correctAnswers: ['завел'],  options: ['завел', 'завела', 'завело', 'завели'] },
            { correctAnswers: ['завела'], options: ['завел', 'завела', 'завело', 'завели'] },
            { correctAnswers: ['завело'], options: ['завел', 'завела', 'завело', 'завели'] },
            { correctAnswers: ['завели'], options: ['завел', 'завела', 'завело', 'завели'] },
          ] },
          { label: 'влязох', cells: [
            { correctAnswers: ['влязъл'],  options: ['влязъл', 'влязла', 'влязло', 'влезли'] },
            { correctAnswers: ['влязла'],  options: ['влязъл', 'влязла', 'влязло', 'влезли'] },
            { correctAnswers: ['влязло'],  options: ['влязъл', 'влязла', 'влязло', 'влезли'] },
            { correctAnswers: ['влезли'],  options: ['влязъл', 'влязла', 'влязло', 'влезли'] },
          ] },
          { label: 'излязох', cells: [
            { correctAnswers: ['излязъл'], options: ['излязъл', 'излязла', 'излязло', 'излезли'] },
            { correctAnswers: ['излязла'], options: ['излязъл', 'излязла', 'излязло', 'излезли'] },
            { correctAnswers: ['излязло'], options: ['излязъл', 'излязла', 'излязло', 'излезли'] },
            { correctAnswers: ['излезли'], options: ['излязъл', 'излязла', 'излязло', 'излезли'] },
          ] },
          { label: 'облякох', cells: [
            { correctAnswers: ['облякъл'], options: ['облякъл', 'облякла', 'облякло', 'облекли'] },
            { correctAnswers: ['облякла'], options: ['облякъл', 'облякла', 'облякло', 'облекли'] },
            { correctAnswers: ['облякло'], options: ['облякъл', 'облякла', 'облякло', 'облекли'] },
            { correctAnswers: ['облекли'], options: ['облякъл', 'облякла', 'облякло', 'облекли'] },
          ] },
          { label: 'съблякох', cells: [
            { correctAnswers: ['съблякъл'], options: ['съблякъл', 'съблякла', 'съблякло', 'съблекли'] },
            { correctAnswers: ['съблякла'], options: ['съблякъл', 'съблякла', 'съблякло', 'съблекли'] },
            { correctAnswers: ['съблякло'], options: ['съблякъл', 'съблякла', 'съблякло', 'съблекли'] },
            { correctAnswers: ['съблекли'], options: ['съблякъл', 'съблякла', 'съблякло', 'съблекли'] },
          ] },
        ],
      },
    ],
  } as TableFillExercise,

  {
    id: 'b1-l05-ex-18',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 18',
    instruction: 'Изберете глаголите в минало неопределено време по модела.',
    order: 26,
    points: 5,
    layout: 'single',
    sentences: [
      { text: 'Те са яли пилешки шишчета. (ям)', blanks: [], correctAnswers: [], isExample: true },
      { text: 'Баща ми _______ (съм) в Румъния.', blanks: [0], correctAnswers: ['е бил'], options: ['е бил', 'е била', 'са били', 'съм бил'] },
      { text: 'Полина _______ (чета) много книги.', blanks: [0], correctAnswers: ['е чела'], options: ['е чела', 'е чел', 'е чело', 'са чели'] },
      { text: 'Някой _______ (дойда) преди мен.', blanks: [0], correctAnswers: ['е дошъл'], options: ['е дошъл', 'е дошла', 'са дошли', 'е дошло'] },
      { text: 'Петър _______ (подаря) цветя на Нина.', blanks: [0], correctAnswers: ['е подарил'], options: ['е подарил', 'е подарила', 'са подарили', 'съм подарил'] },
      { text: 'Те _______ (отида) на кино.', blanks: [0], correctAnswers: ['са отишли'], options: ['са отишли', 'е отишъл', 'е отишла', 'сме отишли'] },
    ],
  } as WorkbookFillBlankExercise,

  {
    id: 'b1-l05-dialozi-02',
    type: 'dialogues',
    title: 'УПРАЖНЕНИЕ 19',
    instruction: 'Изслушайте диалога и се опитайте да го прочетете. Обърнете внимание на глаголите в минало неопределено време.',
    order: 27,
    images: ['/assets/b1-lesson-05/04-upr-19-brasnene/01-bashta-sin-pyana-brasnene.jpg'],
    sections: [
      { id: 'а.', lines: [
        { text: 'Ало, скъпи! Заведе ли детето на детска градина?', voiceGender: 'female' },
        { text: 'Не. Още не съм го завел.', voiceGender: 'male' },
        { text: 'Е, как така? Всяка сутрин го водиш навреме. Какво е станало?', voiceGender: 'female' },
        { text: 'Спокойно! Забавихме се малко, защото Сашко още не е закусил. Ще вземем такси. Вече съм го поръчал. Ще бъде тук след десет минути.', voiceGender: 'male',
          ttsText: 'Спокойно! Забавихме се малко, защото Сáшко още не е закусил. Ще вземем такси. Вече съм го поръчал. Ще бъде тук след десет минути.' },
      ] },
    ],
  } as DialoguesExercise,

  {
    id: 'b1-l05-gramatika-07',
    type: 'b1-grammar-table',
    title: 'ГРАМАТИКА 7',
    tableTitle: '„водя" — завеждам / довеждам',
    instruction: 'Вижте как се спрягат формите на глагола **водя**.',
    order: 28,
    columns: ['несвършено (сег.)', 'свършено (аорист)', 'причастие'],
    rows: [
      { pronoun: 'завеждам', cells: ['завеждам', 'заведа', 'завел'],
        ttsText: 'завеждам, заведа, завел', ttsModel: 'pro', ttsPrompt: B1_GRAMMAR_TTS_PROMPT },
      { pronoun: 'довеждам', cells: ['довеждам', 'доведа', 'довел'],
        ttsText: 'довеждам, доведа, довел', ttsModel: 'pro', ttsPrompt: B1_GRAMMAR_TTS_PROMPT },
      {
        pronoun: 'Заведе ли децата на детска градина? Още не съм ги завел.',
        cells: [],
        voiceGender: 'male',
        ttsModel: 'pro',
        ttsText: 'Заведе ли децата на детска градина? Още не съм ги завел.',
        ttsPrompt: 'Прочетете плавно и естествено на книжовен български, топъл мъжки разговорен тон. Лека пауза между въпроса и отговора. Без роботски ритъм и без чужд акцент.',
      },
      {
        pronoun: 'Доведе ли децата от училище? Още не съм ги довел.',
        cells: [],
        voiceGender: 'male',
        ttsModel: 'pro',
        ttsText: 'Доведе ли децата от училище? Още не съм ги довел.',
        ttsPrompt: 'Прочетете плавно и естествено на книжовен български, топъл мъжки разговорен тон. Лека пауза между въпроса и отговора. Без роботски ритъм и без чужд акцент.',
      },
    ],
    panels: [
      {
        tableTitle: '„водя" — завеждам / довеждам',
        columns: ['несвършено (сег.)', 'свършено (аорист)', 'причастие'],
        rows: [
          { pronoun: 'завеждам', cells: ['завеждам', 'заведа', 'завел'] },
          { pronoun: 'довеждам', cells: ['довеждам', 'доведа', 'довел'] },
        ],
      },
      {
        fullWidth: true,
        columns: [],
        rows: [
          {
            pronoun: '',
            cells: ['Заведе ли децата на детска градина? Още не съм ги завел.'],
            voiceGender: 'male',
          },
          {
            pronoun: '',
            cells: ['Доведе ли децата от училище? Още не съм ги довел.'],
            voiceGender: 'male',
          },
        ],
      },
    ],
  } as unknown as Exercise,

  {
    id: 'b1-l05-ex-20',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 20',
    instruction: 'Изберете отговора в минало неопределено време по модела.',
    order: 29,
    points: 5,
    layout: 'single',
    sentences: [
      { text: 'Мария сготви ли за обяд? Не, **още не е сготвила**.', blanks: [], correctAnswers: [], isExample: true },
      { text: 'Ти направи ли мекици за закуска? Не, още не _______.', blanks: [0], correctAnswers: ['съм направил'], acceptableAnswers: [['съм направила']], options: ['съм направил', 'съм направила', 'сме направили', 'е направил'] },
      { text: 'Взехте ли зеленчуци от пазара? Не, още не _______.', blanks: [0], correctAnswers: ['сме взели'], options: ['сме взели', 'съм взел', 'сте взели', 'са взели'] },
      { text: 'Те изтеглиха ли пари от банкомата? Не, още не _______.', blanks: [0], correctAnswers: ['са изтеглили'], options: ['са изтеглили', 'е изтеглил', 'сме изтеглили', 'е изтеглила'] },
      { text: 'Ина, получи ли картички за Коледа? Не, още не _______.', blanks: [0], correctAnswers: ['съм получила'], options: ['съм получила', 'съм получил', 'сме получили', 'е получила'] },
      { text: 'Децата излязоха ли на двора? Не, още не _______.', blanks: [0], correctAnswers: ['са излезли'], options: ['са излезли', 'е излязъл', 'сме излезли', 'е излязла'] },
    ],
  } as WorkbookFillBlankExercise,

  {
    id: 'b1-l05-dialozi-03',
    type: 'dialogues',
    title: 'УПРАЖНЕНИЕ 21',
    instruction: 'Изслушайте диалога и се опитайте да го прочетете. Обърнете внимание на глаголите в минало неопределено време.',
    order: 30,
    images: ['/assets/b1-lesson-05/05-upr-21-knizhka/01-mazh-zhena-spor-kola.jpg'],
    sections: [
      { id: 'а.', lines: [
        { text: 'Знаеш ли къде е шофьорската ми книжка? Не мога да я намеря.', voiceGender: 'male' },
        { text: 'Сигурно си я сложил при другите документи в малката чантичка, както обикновено. Къде може да е?', voiceGender: 'female' },
        { text: 'Няма я там. Навярно съм я загубил някъде.', voiceGender: 'male' },
        { text: 'А може би си я оставил в колата? Иди да видиш!', voiceGender: 'female' },
        { text: 'Права си, намерих я в колата. Забравил съм я там.', voiceGender: 'male' },
      ] },
    ],
  } as DialoguesExercise,

  {
    id: 'b1-l05-gramatika-08',
    type: 'grammar_examples',
    title: 'ГРАМАТИКА 8',
    instruction: 'Наречията „може би", „сигурно", „вероятно" и „навярно" изразяват вероятност.',
    order: 31,
    examples: [
      { imageUrl: '', text: '', lines: ['**Може би** е превел статията.'],
        ttsText: 'Може би е превел статията.', voiceGender: 'male', ttsModel: 'pro',
        ttsPrompt: 'Прочетете плавно и естествено на книжовен български, топъл мъжки разговорен тон. Съобщително изречение с падаща интонация. Без роботски ритъм и без чужд акцент.' },
      { imageUrl: '', text: '', lines: ['**Сигурно** е превел статията.'],
        ttsText: 'Сигурно е превел статията.', voiceGender: 'male', ttsModel: 'pro',
        ttsPrompt: 'Прочетете плавно и естествено на книжовен български, топъл мъжки разговорен тон. Съобщително изречение с падаща интонация. Без роботски ритъм и без чужд акцент.' },
      { imageUrl: '', text: '', lines: ['**Вероятно** е превел статията.'],
        ttsText: 'Вероятно е превел статията.', voiceGender: 'male', ttsModel: 'pro',
        ttsPrompt: 'Прочетете плавно и естествено на книжовен български, топъл мъжки разговорен тон. Съобщително изречение с падаща интонация. Без роботски ритъм и без чужд акцент.' },
      { imageUrl: '', text: '', lines: ['**Навярно** е превел статията.'],
        ttsText: 'Навярно е превел статията.', voiceGender: 'male', ttsModel: 'pro',
        ttsPrompt: 'Прочетете плавно и естествено на книжовен български, топъл мъжки разговорен тон. Съобщително изречение с падаща интонация. Без роботски ритъм и без чужд акцент.' },
    ],
  } as unknown as Exercise,

  {
    id: 'b1-l05-ex-22',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 22',
    instruction: 'Изберете отговора по модела, като използвате наречията за вероятност.',
    order: 32,
    points: 4,
    layout: 'single',
    sentences: [
      { text: 'Снима ли амфитеатъра, когато беше на екскурзия в Пловдив? Може би съм го снимал, не помня.', blanks: [], correctAnswers: [], isExample: true },
      { text: 'Ти почерпи ли Даниела за новата кола? Сигурно _______, бях много развълнувана и не си спомням.', blanks: [0], correctAnswers: ['съм я почерпила'], options: ['съм я почерпила', 'съм я почерпил', 'сме я почерпили', 'е я почерпила'] },
      { text: 'Ти изключи ли печката? Вероятно _______, трябва да проверя.', blanks: [0], correctAnswers: ['съм я изключил'], acceptableAnswers: [['съм я изключила']], options: ['съм я изключил', 'съм я изключила', 'сме я изключили', 'е я изключил'] },
      { text: 'Децата изядоха ли закуската? Може би _______, сега ще видя.', blanks: [0], correctAnswers: ['са я изяли'], options: ['са я изяли', 'е я изял', 'сме я изяли', 'съм я изял'] },
      { text: 'Ти взе ли билетите? Сигурно _______, да, в чантата ми са.', blanks: [0], correctAnswers: ['съм ги взел'], acceptableAnswers: [['съм ги взела']], options: ['съм ги взел', 'съм ги взела', 'сме ги взели', 'са ги взели'] },
    ],
  } as WorkbookFillBlankExercise,

  {
    id: 'b1-l05-dialozi-04',
    type: 'dialogues',
    title: 'УПРАЖНЕНИЕ 23',
    instruction: 'Изслушайте диалозите и се опитайте да ги прочетете. Обърнете внимание на глаголите в минало неопределено време.',
    order: 33,
    images: ['/assets/b1-lesson-05/06-upr-23-presichane/01-momiche-presicha-ulitsa.jpg'],
    sections: [
      { id: 'а.', lines: [
        { text: 'Пресичала ли си улицата на червено?', voiceGender: 'female' },
        { text: 'Да, няколко пъти съм пресичала. Ще се постарая това да не се повтаря. Опасно е.', voiceGender: 'female' },
      ] },
      { id: 'б.', lines: [
        { text: 'Попълвал ли си документи на български сам?', voiceGender: 'male' },
        { text: 'Да, много пъти съм попълвал сам документи на български.', voiceGender: 'male' },
      ] },
    ],
  } as DialoguesExercise,

  {
    id: 'b1-l05-gramatika-09',
    type: 'b1-grammar-table',
    title: 'ГРАМАТИКА 9',
    tableTitle: 'Несвършено причастие',
    instruction: 'Разгледайте формите на глаголите в несвършено причастие.',
    order: 34,
    widePronouns: true,
    columns: [],
    rows: [
      { pronoun: 'пресичам', cells: ['пресичал'], ttsText: 'пресичам, пресичал' },
      { pronoun: 'попълвам', cells: ['попълвал'], ttsText: 'попълвам, попълвал' },
      { pronoun: 'идвам',    cells: ['идвал'],    ttsText: 'идвам, идвал' },
      { pronoun: 'давам',    cells: ['давал'],    ttsText: 'давам, давал' },
      { pronoun: 'ставам',   cells: ['ставал'],   ttsText: 'ставам, ставал' },
      { pronoun: 'помагам',  cells: ['помагал'],  ttsText: 'помагам, помагал' },
      {
        pronoun: 'Още не съм попълнил документа. Много пъти съм попълвал документи.',
        cells: [],
        voiceGender: 'male',
        ttsModel: 'pro',
        ttsText: 'Още не съм попълнил документа. Много пъти съм попълвал документи.',
        ttsPrompt: 'Прочетете плавно и естествено на книжовен български, топъл мъжки разговорен тон. И ДВЕТЕ изречения са съобщителни, НЕ въпроси. „Още не съм попълнил документа." завършва с ясно ПАДАЩА интонация, без никакво покачване, сякаш казвате факт. Лека пауза, после „Много пъти съм попълвал документи." също с падаща интонация. Без въпросителен тон, без роботски ритъм и без чужд акцент.',
      },
    ],
    panels: [
      {
        tableTitle: 'Несвършено причастие',
        columns: [],
        rows: [
          { pronoun: 'пресичам', cells: ['пресичал'] },
          { pronoun: 'попълвам', cells: ['попълвал'] },
          { pronoun: 'идвам',    cells: ['идвал'] },
          { pronoun: 'давам',    cells: ['давал'] },
          { pronoun: 'ставам',   cells: ['ставал'] },
          { pronoun: 'помагам',  cells: ['помагал'] },
        ],
      },
      {
        fullWidth: true,
        columns: [],
        rows: [
          {
            pronoun: '',
            cells: ['Още не **съм попълнил** документа. (свършено — един път) / Много пъти **съм попълвал** документи. (несвършено — много пъти)'],
            voiceGender: 'male',
          },
        ],
      },
    ],
  } as unknown as Exercise,

  {
    id: 'b1-l05-gramatika-10',
    type: 'grammar_examples',
    title: 'ГРАМАТИКА 10',
    instruction: 'За брой пъти използваме „колко пъти", „много пъти", „няколко пъти" с несвършено причастие.',
    order: 35,
    examples: [
      { imageUrl: '', text: '', lines: ['**Колко пъти** си ходил на море?'],
        ttsText: 'Колко пъти си ходил на море?', ttsModel: 'pro', ttsPrompt: 'Прочетете на книжовен български с правилни ударения.' },
      { imageUrl: '', text: '', lines: ['**Много пъти** съм помагал на съседите.'],
        ttsText: 'Много пъти съм помагал на съседите.', ttsModel: 'pro', ttsPrompt: 'Прочетете на книжовен български с правилни ударения.' },
      { imageUrl: '', text: '', lines: ['**Няколко пъти** съм се обаждал на Иво.'],
        ttsText: 'Няколко пъти съм се обаждал на Иво.', ttsModel: 'pro', ttsPrompt: 'Прочетете на книжовен български с правилни ударения.' },
      { imageUrl: '', text: '', lines: ['**Два-три пъти** съм влизал в тази банка.'],
        ttsText: 'Два-три пъти съм влизал в тази банка.', ttsModel: 'pro', ttsPrompt: 'Прочетете на книжовен български с правилни ударения.' },
    ],
  } as unknown as Exercise,

  {
    id: 'b1-l05-ex-24',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 24',
    instruction: 'Изберете глаголите в минало неопределено време по модела.',
    order: 36,
    points: 6,
    layout: 'single',
    sentences: [
      { text: 'Вие колко пъти сте се качвали на връх Мусала? (качвам се)', blanks: [], correctAnswers: [], isExample: true },
      { text: 'Няколко пъти той _______ (пиша) писма до директора.', blanks: [0], correctAnswers: ['е писал'], options: ['е писал', 'е писала', 'са писали', 'съм писал'] },
      { text: 'Четири пъти ние _______ (посещавам) Лондон.', blanks: [0], correctAnswers: ['сме посещавали'], options: ['сме посещавали', 'съм посещавал', 'сте посещавали', 'са посещавали'] },
      { text: 'Вие колко пъти _______ (подарявам) книга на приятел?', blanks: [0], correctAnswers: ['сте подарявали'], options: ['сте подарявали', 'сме подарявали', 'са подарявали', 'съм подарявал'] },
      { text: 'Те много пъти _______ (купувам) баница със спанак.', blanks: [0], correctAnswers: ['са купували'], options: ['са купували', 'е купувал', 'сме купували', 'сте купували'] },
      { text: 'Колко пъти ти _______ (идвам) в новия ни офис?', blanks: [0], correctAnswers: ['си идвал'], acceptableAnswers: [['си идвала']], options: ['си идвал', 'си идвала', 'сте идвали', 'е идвал'] },
      { text: 'Поне четири пъти _______ (гледам) тази комедия.', blanks: [0], correctAnswers: ['съм гледал'], acceptableAnswers: [['съм гледала']], options: ['съм гледал', 'съм гледала', 'сме гледали', 'е гледал'] },
    ],
  } as WorkbookFillBlankExercise,

  {
    id: 'b1-l05-ex-25',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 25',
    instruction: 'Изберете вярната форма (свършено или несвършено причастие).',
    order: 37,
    points: 4,
    layout: 'single',
    sentences: [
      { text: 'Жоро е идвал няколко пъти у нас.', blanks: [], correctAnswers: [], isExample: true },
      { text: 'Може би те _______ за срещата в 17:00 часа.', blanks: [0], correctAnswers: ['са закъснели'], options: ['са закъснели', 'са закъснявали'] },
      { text: 'Много пъти _______ шопска салата.', blanks: [0], correctAnswers: ['сме правили'], options: ['сме правили', 'сме направили'] },
      { text: 'Тя още не _______ на курса по български. Закъснява с 15 минути.', blanks: [0], correctAnswers: ['е дошла'], options: ['е дошла', 'е идвала'] },
      { text: 'Колко пъти _______ Лейла на летището?', blanks: [0], correctAnswers: ['сте посрещали'], options: ['сте посрещали', 'сте посрещнали'] },
    ],
  } as WorkbookFillBlankExercise,

  {
    id: 'b1-l05-dialozi-05',
    type: 'dialogues',
    title: 'УПРАЖНЕНИЕ 26',
    instruction: 'Изслушайте диалозите и се опитайте да ги прочетете. Обърнете внимание на глаголите в минало неопределено време.',
    order: 38,
    images: ['/assets/b1-lesson-05/07-upr-26-pishi/01-momiche-pishi-staklo.jpg'],
    sections: [
      { id: 'а.', lines: [
        { text: 'Сутринта Мишо отиде ли на урок по математика?', voiceGender: 'female' },
        { text: 'Не, не е отишъл. Той отдавна не е ходил на уроци по математика.', voiceGender: 'male' },
      ] },
      { id: 'б.', lines: [
        { text: 'Катя обади ли ти се снощи?', voiceGender: 'male' },
        { text: 'Не, скоро не ми се е обаждала.', voiceGender: 'female' },
      ] },
      { id: 'в.', lines: [
        { text: 'Виждала ли си някога бяла мечка?', voiceGender: 'female' },
        { text: 'Не, никога не съм виждала.', voiceGender: 'female' },
      ] },
      { id: 'г.', lines: [
        { text: 'Добър ден, Нина. Каква приятна среща!', voiceGender: 'female' },
        { text: 'Здравей, Ваня. Откога не съм те виждала! Изглеждаш чудесно.', voiceGender: 'female' },
      ] },
    ],
  } as DialoguesExercise,

  {
    id: 'b1-l05-gramatika-11',
    type: 'grammar_examples',
    title: 'ГРАМАТИКА 11',
    instruction: 'Наречията „досега не", „скоро не", „отдавна не", „откога не" и „никога не" се използват с минало неопределено време.',
    order: 39,
    examples: [
      { imageUrl: '', text: '', lines: ['**Досега не** съм плащал онлайн.'],
        ttsText: 'Досега не съм плащал онлайн.', voiceGender: 'male', ttsModel: 'pro', ttsPrompt: 'Read naturally in warm, clear standard Bulgarian with correct stress.' },
      { imageUrl: '', text: '', lines: ['**Скоро не** сме се срещали с Ана.'],
        ttsText: 'Скоро не сме се срещали с Ана.', voiceGender: 'male', ttsModel: 'pro',
        ttsPrompt: `${B1_GRAMMAR_TTS_PROMPT} Short preposition с before Ана — с Ана, NEVER със Ана.` },
      { imageUrl: '', text: '', lines: ['**Отдавна не** съм те виждал.'],
        ttsText: 'Отдавна не съм те виждал.', voiceGender: 'male', ttsModel: 'pro',
        ttsPrompt: 'Past participle vi-ZHDAL (vi-zh-DAL), NOT present vi-ZHDAM.' },
      { imageUrl: '', text: '', lines: ['**Откога не** съм идвал тук!'],
        ttsText: 'Откога не съм идвал тук!', voiceGender: 'male', ttsModel: 'pro', ttsPrompt: 'Read naturally in warm, clear standard Bulgarian with correct stress.' },
      { imageUrl: '', text: '',
        lines: ['– Влизал ли си някога в този музей?', '– Не, **никога не** съм влизал.'],
        ttsText: 'Влизал ли си някога в този музей? Не, никога не съм влизал.',
        voiceGender: 'male', ttsModel: 'pro', ttsPrompt: B1_GRAMMAR_TTS_PROMPT },
    ],
  } as unknown as Exercise,

  {
    id: 'b1-l05-ex-27',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 27',
    instruction: 'Изберете глагола в минало неопределено време.',
    order: 40,
    points: 6,
    layout: 'qa-stacked',
    sentences: [
      { text: 'Хайде да отидем на мач! | Много добра идея! Отдавна не съм ходил на мач.', blanks: [], correctAnswers: [], isExample: true },
      { text: 'Хайде да направим торта! | Супер! Отдавна не съм _______ торта.', blanks: [0], correctAnswers: ['правил'], acceptableAnswers: [['правила']], options: ['правил', 'правила', 'правили', 'направил'] },
      { text: 'Хайде да поканим гости в събота вечер! | Съгласна съм! Скоро не сме _______ гости.', blanks: [0], correctAnswers: ['канили'], options: ['канили', 'канил', 'канила', 'поканили'] },
      { text: 'Хайде да купим сладолед! | Чудесно! Отдавна не съм _______ сладолед.', blanks: [0], correctAnswers: ['купувал'], acceptableAnswers: [['купувала']], options: ['купувал', 'купувала', 'купували', 'купил'] },
      { text: 'Хайде да излезем на разходка! | Добре! Досега не сме _______ днес.', blanks: [0], correctAnswers: ['излизали'], options: ['излизали', 'излизал', 'излизала', 'излезли'] },
      { text: 'Хайде да се видим довечера! | Прекрасно! Отдавна не сме се _______.', blanks: [0], correctAnswers: ['виждали'], options: ['виждали', 'виждал', 'виждала', 'видели'] },
      { text: 'Хайде да поръчаме спагети! | Чудесна идея! Никога не съм _______ спагети.', blanks: [0], correctAnswers: ['поръчвал'], acceptableAnswers: [['поръчвала']], options: ['поръчвал', 'поръчвала', 'поръчвали', 'поръчал'] },
    ],
  } as WorkbookFillBlankExercise,

  {
    id: 'b1-l05-ex-28',
    type: 'workbook_fill_blank',
    title: 'УПРАЖНЕНИЕ 28',
    instruction: 'Изберете вярната форма по модела.',
    order: 41,
    points: 7,
    layout: 'single',
    sentences: [
      { text: 'Михаил може би още не е отишъл на работа. (не отиде)', blanks: [], correctAnswers: [], isExample: true },
      { text: 'Той още не _______ зеленчуци от пазара.', blanks: [0], correctAnswers: ['е купил'], options: ['е купил', 'купи'] },
      { text: 'Те никога не _______ в САЩ.', blanks: [0], correctAnswers: ['са били'], options: ['са били', 'бяха'] },
      { text: 'Отдавна не _______ баба и дядо.', blanks: [0], correctAnswers: ['сме виждали'], options: ['сме виждали', 'видяхме'] },
      { text: 'Сигурно майка ми _______ парите вкъщи.', blanks: [0], correctAnswers: ['е забравила'], options: ['е забравила', 'забрави'] },
      { text: 'В събота вечерта _______ вкусни сармички.', blanks: [0], correctAnswers: ['направих/а'], acceptableAnswers: [['направих', 'направила']], options: ['направих/а', 'съм направила'] },
      { text: 'Децата ти някога _______ със самолет?', blanks: [0], correctAnswers: ['пътували ли са'], options: ['пътували ли са', 'пътуваха ли'] },
      { text: 'Скоро не _______ на опера.', blanks: [0], correctAnswers: ['съм ходил/а'], acceptableAnswers: [['съм ходил', 'съм ходила']], options: ['съм ходил/а', 'ходих'] },
    ],
  } as WorkbookFillBlankExercise,

  {
    id: 'b1-l05-ex-30a',
    type: 'reading_text',
    title: 'УПРАЖНЕНИЕ 30',
    instruction: 'Изслушайте текста и след това го прочетете сами.',
    order: 42,
    textTitle: 'АЛА ОТ ИРАК',
    centerTitle: true,
    images: [
      { imageUrl: '/assets/b1-lesson-05/08-upr-30-ala/01-hlyab-v-furnata.jpg', label: 'Хляб във фурната' },
    ],
    paragraphs: [
      'Казвам се Ала. От Ирак съм. Женен съм за Ханан и имаме три деца. В България сме от седем години.',
      'Живели сме на няколко места в страната. Минали сме през много трудности, срещали сме всякакви хора – и услужливи, и неуслужливи. Сменили сме много квартири и хазаи. Децата ни са учили в различни училища – и в арабски, и в български.',
      'Често сме молили за услуги приятели и познати. Рядко са ни отказвали помощ, обикновено са ни помагали, за което сме им благодарни.',
      'Жена ми никога не е ходила на работа, но аз съм работил на доста места – продавал съм дрехи втора употреба, пекъл съм хляб, бил съм и строител. Не е лесно да поддържаш петчленно семейство.',
      'Накрая реших да започна собствен бизнес. Миналата година взех пари назаем от приятели и отворих своя пекарна в центъра на града. В Ирак бях пекар и разбирам от този занаят.',
      'Сега работата върви добре. Жена ми много ми помага. Тя е много сръчна и работлива. Печелим добре и дори започнахме да връщаме парите на приятелите. Доволни сме от живота.',
    ],
    paragraphVoiceGenders: ['male', 'male', 'male', 'male', 'male', 'male'],
    showDictionary: true,
  } as ReadingTextExercise,

  {
    id: 'b1-l05-ex-30b',
    type: 'multiple_choice',
    title: 'УПРАЖНЕНИЕ — Въпроси',
    instruction: 'Прочетете текста „Ала от Ирак" отново и изберете правилния отговор.',
    order: 43,
    points: 7,
    questions: [
      { question: 'Къде е живяло семейството на Ала и Ханан в България?', options: ['Само в един град', 'Само в селото', 'На няколко различни места', 'Само в столицата'], correctIndex: 2 },
      { question: 'В какви училища са учили децата им в страната?', options: ['Само в български училища', 'Само в частни училища', 'В арабски и в български училища', 'Само у дома'], correctIndex: 2 },
      { question: 'От кого са искали помощ, когато са имали нужда?', options: ['От непознати хора', 'От приятели и познати', 'От учители', 'От съседи'], correctIndex: 1 },
      { question: 'Какво е работил Ала в България?', options: ['Само учител', 'Само лекар', 'Продавал е дрехи, пекъл е хляб и е работил в строителството', 'Само шофьор'], correctIndex: 2 },
      { question: 'Къде се намира пекарната му?', options: ['В селото', 'В покрайнините на града', 'В центъра на града', 'Извън България'], correctIndex: 2 },
      { question: 'Кой му е помогнал за новия бизнес?', options: ['Банка', 'Роднини', 'Приятели', 'Колеги'], correctIndex: 2 },
      { question: 'Как върви сега животът на Ала и на семейството му?', options: ['Много зле', 'Без промяна', 'Добре и са доволни', 'Много трудно'], correctIndex: 2 },
    ],
  } as MultipleChoiceExercise,

];

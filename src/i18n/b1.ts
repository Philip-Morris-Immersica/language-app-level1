/**
 * B1-specific UI translations.
 *
 * Add keys here for B1 lesson `instructionKey` values, B1-specific grammar
 * notes, or any pre-translated string used only by B1 content. The keys are
 * merged into `UI_TRANSLATIONS` in `./ui.ts`, so `useT('b1.your.key')` just
 * works from any component. Mirrors the A2 domain (`./a2.ts`).
 *
 * Conventions:
 *  - Prefix every key with `b1.` so it can't collide with shared / a2 keys.
 *  - Always provide all 7 languages: bg, ar, fr, en, fa, uk, ru.
 *  - Order inside each entry: bg, ar, fr, en, fa, uk, ru (same as ui.ts).
 *  - Keep the file grouped by lesson — easier to scan.
 *
 * Example:
 *
 *   'b1.exercise.dragBubbleLeftOrRight': {
 *     bg: 'Плъзнете балончето наляво или надясно.',
 *     ar: '...', fr: '...', en: '...', fa: '...', uk: '...', ru: '...'
 *   },
 *
 * Used in content: `instructionKey: 'b1.exercise.dragBubbleLeftOrRight'`.
 */

import type { SupportedLang } from './languages';

export const B1_TRANSLATIONS: Record<string, Record<SupportedLang, string>> = {
  'b1.exercise.dragToMatch': {
    bg: 'Плъзнете дума от списъка върху полето, с което съвпада.',
    ar: 'اسحب كلمة من القائمة إلى الحقل المطابق لها.',
    fr: 'Faites glisser un mot de la liste vers le champ correspondant.',
    en: 'Drag a word from the list onto its matching field.',
    fa: 'یک کلمه را از فهرست به فیلد مطابق آن بکشید.',
    uk: 'Перетягніть слово зі списку до відповідного поля.',
    ru: 'Перетащите слово из списка в соответствующее поле.',
  },
  'b1.exercise.dropHere': {
    bg: '— пусни тук —',
    ar: '— أفلت هنا —',
    fr: '— déposer ici —',
    en: '— drop here —',
    fa: '— اینجا رها کنید —',
    uk: '— відпустіть тут —',
    ru: '— отпустите здесь —',
  },
  'b1.exercise.tapToSortHowTo': {
    bg: 'Как да играете:',
    ar: 'كيف تلعب:',
    fr: 'Comment jouer :',
    en: 'How to play:',
    fa: 'روش بازی:',
    uk: 'Як грати:',
    ru: 'Как играть:',
  },
  'b1.exercise.tapToSortInstruction': {
    bg: 'Натиснете дума от списъка, после натиснете групата, в която тя влиза. Зелените думи са готови примери.',
    ar: 'اضغط على كلمة من القائمة، ثم اضغط على المجموعة التي تنتمي إليها. الكلمات الخضراء أمثلة جاهزة.',
    fr: 'Appuyez sur un mot de la liste, puis appuyez sur le groupe auquel il appartient. Les mots verts sont des exemples.',
    en: 'Tap a word from the list, then tap the group it belongs to. Green words are ready-made examples.',
    fa: 'روی کلمه‌ای از فهرست بزنید، سپس روی گروهی که به آن تعلق دارد بزنید. واژه‌های سبز نمونه‌های آماده‌اند.',
    uk: 'Натисніть слово зі списку, потім натисніть групу, до якої воно належить. Зелені слова — готові приклади.',
    ru: 'Нажмите на слово из списка, затем нажмите на группу, к которой оно относится. Зелёные слова — готовые примеры.',
  },
  'b1.exercise.example': {
    bg: 'пример',
    ar: 'مثال',
    fr: 'exemple',
    en: 'example',
    fa: 'مثال',
    uk: 'приклад',
    ru: 'пример',
  },
  // ── Уроци 11–15 („Познавам и обичам България", учебник стр. 76–97) ──────────
  // UI на компонента `b1-select-words` (src/content/b1/components/SelectWords.tsx)
  'b1.exercise.selectWordsHowTo': {
    bg: 'Натиснете всяка дума, която е вярна според текста. В едно изречение може да има повече от една вярна дума.',
    ar: 'اضغط على كل كلمة صحيحة وفقًا للنص. قد تحتوي الجملة الواحدة على أكثر من كلمة صحيحة.',
    fr: 'Appuyez sur chaque mot correct selon le texte. Une phrase peut contenir plusieurs mots corrects.',
    en: 'Tap every word that is correct according to the text. A sentence may have more than one correct word.',
    fa: 'روی هر کلمه‌ای که بر اساس متن درست است بزنید. یک جمله می‌تواند بیش از یک کلمهٔ درست داشته باشد.',
    uk: 'Натисніть кожне слово, яке є правильним згідно з текстом. В одному реченні може бути більше ніж одне правильне слово.',
    ru: 'Нажмите на каждое слово, которое верно согласно тексту. В одном предложении может быть больше одного верного слова.',
  },
  'b1.exercise.selectWordsSelected': {
    bg: 'Избрани:',
    ar: 'المحدَّدة:',
    fr: 'Sélectionnés :',
    en: 'Selected:',
    fa: 'انتخاب‌شده:',
    uk: 'Вибрано:',
    ru: 'Выбрано:',
  },
  'b1.exercise.selectWordsMissed': {
    bg: 'пропуснато',
    ar: 'فائتة',
    fr: 'manqué',
    en: 'missed',
    fa: 'جا افتاده',
    uk: 'пропущено',
    ru: 'пропущено',
  },

  // instructionKey стойности за упражненията от блока 11–15
  'b1.exercise.selectAllCorrectWords': {
    bg: 'Прочетете текста и натиснете всички думи, които са верни според него.',
    ar: 'اقرأ النص ثم اضغط على جميع الكلمات الصحيحة بحسبه.',
    fr: 'Lisez le texte, puis appuyez sur tous les mots qui sont corrects d’après lui.',
    en: 'Read the text, then tap every word that is correct according to it.',
    fa: 'متن را بخوانید و سپس روی همهٔ واژه‌هایی که بر اساس آن درست هستند بزنید.',
    uk: 'Прочитайте текст, а потім натисніть усі слова, які є правильними згідно з ним.',
    ru: 'Прочитайте текст, затем нажмите на все слова, которые верны согласно ему.',
  },
  'b1.exercise.comparisons': {
    bg: 'Изберете подходящата дума, за да завършите сравнението.',
    ar: 'اختر الكلمة المناسبة لإكمال التشبيه.',
    fr: 'Choisissez le mot qui convient pour compléter la comparaison.',
    en: 'Choose the right word to complete the comparison.',
    fa: 'واژهٔ مناسب را برای کامل کردن تشبیه انتخاب کنید.',
    uk: 'Виберіть відповідне слово, щоб завершити порівняння.',
    ru: 'Выберите подходящее слово, чтобы завершить сравнение.',
  },
  'b1.exercise.chronologyOrder': {
    bg: 'Изберете номер от 1 до 8, за да подредите периодите в хронологичен ред.',
    ar: 'اختر رقمًا من 1 إلى 8 لترتيب الفترات ترتيبًا زمنيًا.',
    fr: 'Choisissez un numéro de 1 à 8 pour classer les périodes dans l’ordre chronologique.',
    en: 'Choose a number from 1 to 8 to put the periods in chronological order.',
    fa: 'برای مرتب کردن دوره‌ها به ترتیب زمانی، عددی از 1 تا 8 انتخاب کنید.',
    uk: 'Виберіть номер від 1 до 8, щоб розташувати періоди в хронологічному порядку.',
    ru: 'Выберите номер от 1 до 8, чтобы расположить периоды в хронологическом порядке.',
  },
  'b1.exercise.bulgariaMap': {
    bg: 'Разгледайте картата на България. Етикетите показват къде се намират планините и реките от текста.',
    ar: 'تأمّل خريطة بلغاريا. تُبيّن البطاقات مواقع الجبال والأنهار المذكورة في النص.',
    fr: 'Observez la carte de la Bulgarie. Les étiquettes indiquent où se trouvent les montagnes et les rivières du texte.',
    en: 'Look at the map of Bulgaria. The labels show where the mountains and rivers from the text are located.',
    fa: 'نقشهٔ بلغارستان را ببینید. برچسب‌ها نشان می‌دهند کوه‌ها و رودهای متن کجا قرار دارند.',
    uk: 'Розгляньте карту Болгарії. Позначки показують, де розташовані гори й річки з тексту.',
    ru: 'Рассмотрите карту Болгарии. Метки показывают, где находятся горы и реки из текста.',
  },
  'b1.exercise.paintingImpressions': {
    bg: 'Разгледайте картините и напишете какви чувства събуждат у Вас. Тук няма верен и грешен отговор.',
    ar: 'تأمّل اللوحات واكتب المشاعر التي تثيرها لديك. لا توجد إجابة صحيحة أو خاطئة هنا.',
    fr: 'Observez les tableaux et écrivez les sentiments qu’ils éveillent en vous. Il n’y a pas de bonne ou de mauvaise réponse.',
    en: 'Look at the paintings and write what feelings they awaken in you. There is no right or wrong answer here.',
    fa: 'به نقاشی‌ها نگاه کنید و بنویسید چه احساسی در شما برمی‌انگیزند. اینجا پاسخ درست یا غلط وجود ندارد.',
    uk: 'Розгляньте картини й напишіть, які почуття вони у Вас викликають. Тут немає правильної чи неправильної відповіді.',
    ru: 'Рассмотрите картины и напишите, какие чувства они у Вас вызывают. Здесь нет правильного и неправильного ответа.',
  },
  'b1.grammar.glagoliticAlphabet': {
    bg: 'Глаголицата е първата българска азбука, създадена от Кирил и Методий. Всяка глаголическа буква е показана заедно със съответствието си на кирилица.',
    ar: 'الغلاغوليتية هي أول أبجدية بلغارية، أنشأها كيريل وميثوديوس. كل حرف غلاغوليتي معروض مع ما يقابله بالكيريلية.',
    fr: 'Le glagolitique est le premier alphabet bulgare, créé par Cyrille et Méthode. Chaque lettre glagolitique est présentée avec son équivalent cyrillique.',
    en: 'Glagolitic is the first Bulgarian alphabet, created by Cyril and Methodius. Each Glagolitic letter is shown together with its Cyrillic equivalent.',
    fa: 'گلاگولیتسا نخستین الفبای بلغاری است که کیریل و متودی آن را ساختند. هر حرف گلاگولیتی همراه با معادل سیریلیک آن نشان داده شده است.',
    uk: 'Глаголиця — перша болгарська азбука, створена Кирилом і Мефодієм. Кожна глаголична літера показана разом із її кириличним відповідником.',
    ru: 'Глаголица — первая болгарская азбука, созданная Кириллом и Мефодием. Каждая глаголическая буква показана вместе с её кириллическим соответствием.',
  },

  'b1.grammar.directIndirectSpeech': {
    bg: 'Обърнете внимание на трите основни типа преобразуване: изявления, въпроси и заповеди.',
    ar: 'انتبه إلى الأنواع الثلاثة الرئيسية للتحويل: الجمل الخبرية والأسئلة والأوامر.',
    fr: 'Observez les trois types principaux de transformation : déclarations, questions et ordres.',
    en: 'Pay attention to the three main types of transformation: statements, questions and commands.',
    fa: 'به سه نوع اصلی تبدیل توجه کنید: جملات خبری، سؤالات و دستورات.',
    uk: 'Зверніть увагу на три основні типи перетворення: висловлювання, запитання та накази.',
    ru: 'Обратите внимание на три основных типа преобразования: изъявления, вопросы и приказания.',
  },
};

import type { SupportedLang } from './languages';

/**
 * Manual, human-quality translations for specific Bulgarian source strings that
 * `useTranslate()` would otherwise send to Google Translate live. Keyed by the
 * *exact* Bulgarian source text (trimmed) — any lesson/test that renders that
 * exact phrase gets the fixed translation automatically, with no per-lesson
 * code changes needed.
 *
 * Use this for:
 * - Grammar-table titles / column headers / notes (linguistic terms that
 *   machine translation mangles — "окончание", "основна форма", "член"...).
 * - Reading-text paragraphs and other longer passages flagged as mistranslated
 *   in client feedback (the corrected English is the client's own wording).
 * - Any other short/medium UI-adjacent string where live MT produced a wrong
 *   or nonsensical result.
 *
 * Do NOT put exercise vocabulary/answers here — those must stay Bulgarian.
 * A missing language for a given key falls back to live translation for that
 * language only (partial coverage is fine — English is the guaranteed layer;
 * the other six are best-effort).
 *
 * Language order in each entry: en, ar, fr, fa, uk, ru (bg is the key itself).
 */
export const TRANSLATION_OVERRIDES: Record<string, Partial<Record<SupportedLang, string>>> = {

  // ── Cross-lesson grammar-table vocabulary (recurring in many lessons) ─────
  'мъжки род': { en: 'masculine', ar: 'مذكر', fr: 'masculin', fa: 'مذکر', uk: 'чоловічий рід', ru: 'мужской род' },
  'женски род': { en: 'feminine', ar: 'مؤنث', fr: 'féminin', fa: 'مؤنث', uk: 'жіночий рід', ru: 'женский род' },
  'среден род': { en: 'neuter', ar: 'محايد', fr: 'neutre', fa: 'خنثی', uk: 'середній рід', ru: 'средний род' },
  'множествено число': { en: 'plural', ar: 'جمع', fr: 'pluriel', fa: 'جمع', uk: 'множина', ru: 'множественное число' },
  'единствено число': { en: 'singular', ar: 'مفرد', fr: 'singulier', fa: 'مفرد', uk: 'однина', ru: 'единственное число' },
  'Основна форма': { en: 'Base form', ar: 'الصيغة الأساسية', fr: 'Forme de base', fa: 'شکل پایه', uk: 'Основна форма', ru: 'Основная форма' },
  'Окончание': { en: 'Ending', ar: 'اللاحقة', fr: 'Terminaison', fa: 'پایانه', uk: 'Закінчення', ru: 'Окончание' },
  'Примери': { en: 'Examples', ar: 'أمثلة', fr: 'Exemples', fa: 'مثال‌ها', uk: 'Приклади', ru: 'Примеры' },
  'Форма': { en: 'Form', ar: 'الصيغة', fr: 'Forme', fa: 'شکل', uk: 'Форма', ru: 'Форма' },
  'Дума': { en: 'Word', ar: 'كلمة', fr: 'Mot', fa: 'کلمه', uk: 'Слово', ru: 'Слово' },
  'Изречения': { en: 'Sentences', ar: 'جمل', fr: 'Phrases', fa: 'جملات', uk: 'Речення', ru: 'Предложения' },
  // Client-requested wording for the membership/definite-article ("членуване") tables (lesson 5/8/9) — plural "articles", not "ending/forms".
  'Член': { en: 'Articles', ar: 'أداة التعريف', fr: 'Article', fa: 'حرف تعریف', uk: 'Артикль', ru: 'Артикль' },
  'С член': { en: 'With the article', ar: 'مع أداة التعريف', fr: "Avec l'article", fa: 'با حرف تعریف', uk: 'З артиклем', ru: 'С артиклем' },
  // Capitalised / abbreviated variants used as grammar-table column headers in other lessons.
  'Мъжки род': { en: 'Masculine', ar: 'مذكر', fr: 'Masculin', fa: 'مذکر', uk: 'Чоловічий рід', ru: 'Мужской род' },
  'Женски род': { en: 'Feminine', ar: 'مؤنث', fr: 'Féminin', fa: 'مؤنث', uk: 'Жіночий рід', ru: 'Женский род' },
  'Среден род': { en: 'Neuter', ar: 'محايد', fr: 'Neutre', fa: 'خنثی', uk: 'Середній рід', ru: 'Средний род' },
  'Множествено число': { en: 'Plural', ar: 'جمع', fr: 'Pluriel', fa: 'جمع', uk: 'Множина', ru: 'Множественное число' },
  'Мн. число': { en: 'Plural', ar: 'جمع', fr: 'Pluriel', fa: 'جمع', uk: 'Множина', ru: 'Множественное число' },
  'м.р.': { en: 'masc.', ar: 'مذكر', fr: 'masc.', fa: 'مذکر', uk: 'ч.р.', ru: 'муж.р.' },
  'ж.р.': { en: 'fem.', ar: 'مؤنث', fr: 'fém.', fa: 'مؤنث', uk: 'ж.р.', ru: 'жен.р.' },
  'ср.р.': { en: 'neut.', ar: 'محايد', fr: 'neutre', fa: 'خنثی', uk: 'с.р.', ru: 'ср.р.' },
  'мн.ч.': { en: 'plural', ar: 'جمع', fr: 'pluriel', fa: 'جمع', uk: 'мн.', ru: 'мн.ч.' },
  // Comparison-of-adjectives / adverbs table headers (lessons 9 & 11).
  'Положителна': { en: 'Base form', ar: 'الصيغة الأساسية', fr: 'Forme de base', fa: 'شکل پایه', uk: 'Звичайна форма', ru: 'Обычная форма' },
  'Сравнителна': { en: 'Comparative', ar: 'صيغة التفضيل', fr: 'Comparatif', fa: 'صفت تفضیلی', uk: 'Порівняльна форма', ru: 'Сравнительная форма' },
  'Превъзходна': { en: 'Superlative', ar: 'صيغة التفضيل المطلق', fr: 'Superlatif', fa: 'صفت عالی', uk: 'Найвища форма', ru: 'Превосходная форма' },
  'Основна': { en: 'Basic', ar: 'أساسي', fr: 'De base', fa: 'اصلی', uk: 'Основна', ru: 'Основная' },
  'Степенуване на прилагателните': { en: 'Comparison and superlative degrees of adjectives', ar: 'درجات المقارنة والتفضيل للصفات', fr: "Degrés de comparaison des adjectifs", fa: 'درجات تفضیلی و عالی صفت‌ها', uk: 'Степені порівняння прикметників', ru: 'Степени сравнения прилагательных' },
  'Основна / Сравнителна / Превъзходна степен': { en: 'Basic / Comparative / Superlative degree', ar: 'الدرجة الأساسية / التفضيل / التفضيل المطلق', fr: 'Degré de base / comparatif / superlatif', fa: 'درجه پایه / تفضیلی / عالی', uk: 'Основний / порівняльний / найвищий ступінь', ru: 'Основная / сравнительная / превосходная степень' },
  'Поредни числителни': { en: 'Ordinal numbers', ar: 'الأعداد الترتيبية', fr: 'Nombres ordinaux', fa: 'اعداد ترتیبی', uk: 'Порядкові числівники', ru: 'Порядковые числительные' },
  'Редни числителни': { en: 'Ordinal numbers', ar: 'الأعداد الترتيبية', fr: 'Nombres ordinaux', fa: 'اعداد ترتیبی', uk: 'Порядкові числівники', ru: 'Порядковые числительные' },
  // Lesson 11 — verb / meaning / example table & personal-pronoun table.
  'Глагол': { en: 'Verb', ar: 'الفعل', fr: 'Verbe', fa: 'فعل', uk: 'Дієслово', ru: 'Глагол' },
  'Значение': { en: 'Meaning', ar: 'المعنى', fr: 'Sens', fa: 'معنی', uk: 'Значення', ru: 'Значение' },
  'Пример': { en: 'Example', ar: 'مثال', fr: 'Exemple', fa: 'مثال', uk: 'Приклад', ru: 'Пример' },
  'Лично местоимение': { en: 'Personal pronoun', ar: 'ضمير الشخص', fr: 'Pronom personnel', fa: 'ضمیر شخصی', uk: 'Особовий займенник', ru: 'Личное местоимение' },
  'всеки / всяка / всяко / всички': { en: 'всеки/всяка/всяко (every) — всички (all)', ar: 'всеки/всяка/всяко (كل) — всички (جميع)', fr: 'всеки/всяка/всяко (chaque) — всички (tous)', fa: 'всеки/всяка/всяко (هر) — всички (همه)', uk: 'всеки/всяка/всяко (кожен) — всички (всі)', ru: 'всеки/всяка/всяко (каждый) — всички (все)' },
  'ХОДЯ / ОТИВАМ': { en: 'ХОДЯ (to go/walk, habitual) / ОТИВАМ (to go, one direction)', ar: 'ХОДЯ (يمشي، متكرر) / ОТИВАМ (يذهب، اتجاه واحد)', fr: 'ХОДЯ (aller/marcher, habituel) / ОТИВАМ (aller, une direction)', fa: 'ХОДЯ (رفتن/راه رفتن، عادتی) / ОТИВАМ (رفتن، یک‌طرفه)', uk: 'ХОДЯ (ходити, звично) / ОТИВАМ (іти, в одному напрямку)', ru: 'ХОДЯ (ходить, привычно) / ОТИВАМ (идти, в одном направлении)' },
  'мия се': { en: 'мия се — to wash oneself', ar: 'мия се — يغتسل', fr: 'мия се — se laver', fa: 'мия се — خود را شستن', uk: 'мия се — митися', ru: 'мия се — мыться' },
  'казвам / казвам се / връщам / връщам се': { en: 'казвам (to say) / казвам се (to be named) / връщам (to return sth.) / връщам се (to come back)', ar: 'казвам (يقول) / казвам се (يُدعى) / връщам (يُرجع) / връщам се (يعود)', fr: 'казвам (dire) / казвам се (se nommer) / връщам (rendre) / връщам се (revenir)', fa: 'казвам (گفتن) / казвам се (نامیده شدن) / връщам (برگرداندن) / връщам се (برگشتن)', uk: 'казвам (казати) / казвам се (зватися) / връщам (повертати) / връщам се (повертатися)', ru: 'казвам (говорить) / казвам се (зваться) / връщам (возвращать) / връщам се (возвращаться)' },
  // Client wants the BG gender words KEPT (not translated to "one") with an English gloss —
  // used as grammar-table cells (l02-gramatika-06, lesson-04 TableFill column headers, etc.).
  // Number-context uses of "едно" (illustrated-cards digit 1, ConnectDots, DropdownMatch) are
  // either shielded with a per-card override or don't run through translation at all.
  'един': { en: 'един (masculine)', ar: 'един (مذكر)', fr: 'един (masculin)', fa: 'един (مذکر)', uk: 'един (чоловічий рід)', ru: 'един (мужской род)' },
  'една': { en: 'една (feminine)', ar: 'една (مؤنث)', fr: 'една (féminin)', fa: 'една (مؤنث)', uk: 'една (жіночий рід)', ru: 'една (женский род)' },
  'едно': { en: 'едно (neuter)', ar: 'едно (محايد)', fr: 'едно (neutre)', fa: 'едно (خنثی)', uk: 'едно (середній рід)', ru: 'едно (средний род)' },

  // ── Short standalone "Аз съм/Той е/Тя е <Name>." records — transliterate the name ───
  'Аз съм Георги.': { en: 'I am Georgi.', ar: 'أنا Georgi.', fr: 'Je suis Georgi.', fa: 'من Georgi هستم.', uk: 'Я Georgi.', ru: 'Я Georgi.' },
  'Аз съм Мохамед.': { en: 'I am Mohamed.', ar: 'أنا Mohamed.', fr: 'Je suis Mohamed.', fa: 'من Mohamed هستم.', uk: 'Я Mohamed.', ru: 'Я Mohamed.' },
  'Аз съм Петя.': { en: 'I am Petya.', ar: 'أنا Petya.', fr: 'Je suis Petya.', fa: 'من Petya هستم.', uk: 'Я Petya.', ru: 'Я Petya.' },
  'Аз съм Тала.': { en: 'I am Tala.', ar: 'أنا Tala.', fr: 'Je suis Tala.', fa: 'من Tala هستم.', uk: 'Я Tala.', ru: 'Я Tala.' },
  'Аз съм Хасан.': { en: 'I am Hasan.', ar: 'أنا Hasan.', fr: 'Je suis Hasan.', fa: 'من Hasan هستم.', uk: 'Я Hasan.', ru: 'Я Hasan.' },
  'Ти си Халед.': { en: 'You are Haled.', ar: 'أنت Haled.', fr: 'Tu es Haled.', fa: 'تو Haled هستی.', uk: 'Ти Haled.', ru: 'Ты Haled.' },
  'Той е Иван.': { en: 'He is Ivan.', ar: 'هو Ivan.', fr: 'Il est Ivan.', fa: 'او Ivan است.', uk: 'Він Ivan.', ru: 'Он Ivan.' },
  'Тя е Ана.': { en: 'She is Ana.', ar: 'هي Ana.', fr: 'Elle est Ana.', fa: 'او Ana است.', uk: 'Вона Ana.', ru: 'Она Ana.' },

  // ── MISMATCH fixes — client wants exact wording (see A1-feedback-coverage-audit.md §6) ──
  'кашкавал': { en: 'yellow cheese', ar: 'جبن أصفر', fr: 'fromage jaune', fa: 'پنیر زرد', uk: 'жовтий сир', ru: 'жёлтый сыр' },
  'слаб – пълен': { en: 'thin – fat', ar: 'نحيف – سمين', fr: 'mince – gros', fa: 'لاغر – چاق', uk: 'худий – товстий', ru: 'худой – толстый' },
  'Сравнение с „от"': { en: "Comparison with 'than'", ar: "المقارنة بـ «от» (than)", fr: "Comparaison avec « от » (than)", fa: "مقایسه با «от» (than)", uk: "Порівняння з «от» (than)", ru: "Сравнение с «от» (than)" },
  '– О, чудесно! Приятен урок!': { en: '– Oh, great! Have a nice course!', ar: '– أوه، رائع! دورة ممتعة!', fr: '– Oh, très bien ! Bon cours !', fa: '– اوه، عالی! دوره خوبی داشته باشی!', uk: '– О, чудово! Гарного курсу!', ru: '– О, отлично! Хорошего курса!' },
  '0% — Никога не закусвам в кафенето.': { en: '0% — I never have breakfast at the café.', ar: '0% — لا أتناول الإفطار في المقهى أبداً.', fr: '0% — Je ne prends jamais le petit-déjeuner au café.', fa: '۰٪ — هرگز در کافه صبحانه نمی‌خورم.', uk: '0% — Я ніколи не снідаю в кав\'ярні.', ru: '0% — Я никогда не завтракаю в кафе.' },
  'много': { en: 'much / many', ar: 'كثير', fr: 'beaucoup', fa: 'زیاد', uk: 'багато', ru: 'много' },
  // у10 упр.13 — same giving-something context as у8 упр.20; the compound phrase is unambiguous enough to override globally.
  '– Заповядайте. Приятно пътуване!': { en: '– There you go. Have a good trip!', ar: '– تفضل. رحلة سعيدة!', fr: '– Voilà. Bon voyage !', fa: '– بفرمایید. سفر خوبی داشته باشید!', uk: '– Ось, будь ласка. Гарної подорожі!', ru: '– Пожалуйста. Хорошей поездки!' },

  // ── Lesson 6 — flagged untranslated strings (self-mapped bugs; file owned by another agent) ──
  'ИМАМ / НЯМАМ': { en: 'I HAVE / I DO NOT HAVE', ar: 'أملك / لا أملك', fr: "J'AI / JE N'AI PAS", fa: 'دارم / ندارم', uk: 'Я МАЮ / Я НЕ МАЮ', ru: 'Я ИМЕЮ / Я НЕ ИМЕЮ' },
  'хубави хора': { en: 'nice people', ar: 'أشخاص طيبون', fr: 'des gens sympathiques', fa: 'افراد خوب', uk: 'гарні люди', ru: 'хорошие люди' },

  // у6 упр.35 (l06-ex-35) — first paragraph (2nd paragraph already covered above under "Живеем в София...").
  'Аз съм Виталий, а жена ми е Ирина. Ние сме украинци. Имаме три деца. Сега сме в България, в Украйна има война. Родителите ми не са тук. Те са в Украйна. Сестра ми и семейството й са в Полша. Много ми липсват.': {
    en: 'I am Vitaliy, and my wife is Irina. We are Ukrainian. We have three children. We are in Bulgaria now — there is a war in Ukraine. My parents are not here. They are in Ukraine. My sister and her family are in Poland. I miss them a lot.',
    ar: 'أنا فيتالي، وزوجتي إيرينا. نحن أوكرانيون. لدينا ثلاثة أطفال. نحن الآن في بلغاريا؛ في أوكرانيا توجد حرب. والداي ليسا هنا. هما في أوكرانيا. أختي وعائلتها في بولندا. أشتاق إليهم كثيراً.',
    fr: "Je suis Vitaliy, et ma femme est Irina. Nous sommes ukrainiens. Nous avons trois enfants. Nous sommes maintenant en Bulgarie ; il y a la guerre en Ukraine. Mes parents ne sont pas ici. Ils sont en Ukraine. Ma sœur et sa famille sont en Pologne. Ils me manquent beaucoup.",
    fa: 'من ویتالی هستم و همسرم ایرینا است. ما اوکراینی هستیم. سه فرزند داریم. اکنون در بلغارستان هستیم؛ در اوکراین جنگ است. پدر و مادرم اینجا نیستند. آن‌ها در اوکراین هستند. خواهرم و خانواده‌اش در لهستان هستند. خیلی دلم برایشان تنگ شده است.',
    uk: 'Я Віталій, а моя дружина — Ірина. Ми українці. У нас трое дітей. Зараз ми в Болгарії, в Україні війна. Моїх батьків тут немає. Вони в Україні. Моя сестра з сім\'єю в Польщі. Я дуже за ними сумую.',
    ru: 'Я Виталий, а моя жена — Ирина. Мы украинцы. У нас трое детей. Сейчас мы в Болгарии, в Украине война. Моих родителей здесь нет. Они в Украине. Моя сестра с семьёй в Польше. Я очень по ним скучаю.',
  },
  // у6 упр.37 (l06-ex-37) — "Аз работя в „Каритас"" reading text (2 paragraphs).
  'Казвам се Борис. Аз съм от София, женен съм и имам две малки деца – едно момче и едно момиче. На 30 години съм. Жена ми е учителка по български език в голямо училище.': {
    en: 'My name is Boris. I am from Sofia, I am married, and I have two small children — a boy and a girl. I am 30 years old. My wife is a Bulgarian language teacher at a large school.',
    ar: 'اسمي بوريس. أنا من صوفيا، متزوج ولدي طفلان صغيران – صبي وبنت. عمري ثلاثون عاماً. زوجتي معلمة لغة بلغارية في مدرسة كبيرة.',
    fr: "Je m'appelle Boris. Je viens de Sofia, je suis marié et j'ai deux jeunes enfants — un garçon et une fille. J'ai 30 ans. Ma femme est professeure de bulgare dans une grande école.",
    fa: 'اسم من بوریس است. من از صوفیه هستم، متأهلم و دو فرزند کوچک دارم – یک پسر و یک دختر. سی ساله هستم. همسرم معلم زبان بلغاری در یک مدرسه بزرگ است.',
    uk: 'Мене звуть Борис. Я з Софії, одружений і маю двох маленьких дітей — хлопчика і дівчинку. Мені 30 років. Моя дружина — вчителька болгарської мови у великій школі.',
    ru: 'Меня зовут Борис. Я из Софии, женат и у меня двое маленьких детей — мальчик и девочка. Мне 30 лет. Моя жена — учительница болгарского языка в большой школе.',
  },
  'Работя в „Каритас". Обичам работата с бежанци. Вече имам много приятели от различни страни: Сирия, Иран, Ирак, Палестина, Афганистан, Украйна.': {
    en: 'I work at "Caritas". I love working with refugees. I already have many friends from different countries: Syria, Iran, Iraq, Palestine, Afghanistan, Ukraine.',
    ar: 'أعمل في "كاريتاس". أحب العمل مع اللاجئين. لديّ الآن أصدقاء كثيرون من بلدان مختلفة: سوريا، إيران، العراق، فلسطين، أفغانستان، أوكرانيا.',
    fr: "Je travaille à « Caritas ». J'aime travailler avec les réfugiés. J'ai déjà beaucoup d'amis de différents pays : Syrie, Iran, Irak, Palestine, Afghanistan, Ukraine.",
    fa: 'در «کاریتاس» کار می‌کنم. کار با پناهندگان را دوست دارم. من اکنون دوستان زیادی از کشورهای مختلف دارم: سوریه، ایران، عراق، فلسطین، افغانستان، اوکراین.',
    uk: 'Я працюю в «Карітас». Мені подобається працювати з біженцями. У мене вже багато друзів з різних країн: Сирії, Ірану, Іраку, Палестини, Афганістану, України.',
    ru: 'Я работаю в «Каритас». Мне нравится работать с беженцами. У меня уже много друзей из разных стран: Сирии, Ирана, Ирака, Палестины, Афганистана, Украины.',
  },
  // у6 упр.42 (l06-ex-42) — "Илаф Хабаба" reading text (3 paragraphs). Likely the text meant by audit's "упр.43"
  // (the PDF's упр.43 "Разкажете за Илаф" is a SKIP per client — no digitized content exists at that number).
  'Аз съм едно сирийско момиче. Казвам се Илаф Хабаба. В България съм от две години и вече знам каква е разликата между сирийското и българското семейство.': {
    en: 'I am a Syrian girl. My name is Ilaf Hababa. I have been in Bulgaria for two years, and I already know the difference between a Syrian and a Bulgarian family.',
    ar: 'أنا فتاة سورية. اسمي إيلاف حبابة. أنا في بلغاريا منذ سنتين، وأعرف الآن الفرق بين العائلة السورية والعائلة البلغارية.',
    fr: "Je suis une fille syrienne. Je m'appelle Ilaf Hababa. Je suis en Bulgarie depuis deux ans, et je connais déjà la différence entre une famille syrienne et une famille bulgare.",
    fa: 'من یک دختر سوری هستم. نامم ایلاف حبابه است. دو سال است که در بلغارستان هستم و اکنون تفاوت میان خانواده سوری و خانواده بلغاری را می‌دانم.',
    uk: 'Я сирійська дівчина. Мене звуть Ілаф Хабаба. Я в Болгарії вже два роки і вже знаю, яка різниця між сирійською та болгарською сім\'єю.',
    ru: 'Я сирийская девочка. Меня зовут Илаф Хабаба. Я в Болгарии уже два года и уже знаю, в чём разница между сирийской и болгарской семьёй.',
  },
  'Сирийското семейство има много деца – от три до осем, а българското семейство обикновено има едно или две. Българските родители дават голяма свобода на децата си.': {
    en: 'A Syrian family has many children — from three to eight, while a Bulgarian family usually has one or two. Bulgarian parents give their children a lot of freedom.',
    ar: 'العائلة السورية لديها أطفال كثيرون – من ثلاثة إلى ثمانية، أما العائلة البلغارية فلديها عادة طفل أو طفلان. الآباء البلغاريون يعطون أطفالهم حرية كبيرة.',
    fr: "La famille syrienne a beaucoup d'enfants — de trois à huit, tandis que la famille bulgare a généralement un ou deux enfants. Les parents bulgares donnent beaucoup de liberté à leurs enfants.",
    fa: 'خانواده سوری فرزندان زیادی دارد – از سه تا هشت، در حالی که خانواده بلغاری معمولاً یک یا دو فرزند دارد. والدین بلغاری آزادی زیادی به فرزندان خود می‌دهند.',
    uk: 'У сирійській сім\'ї багато дітей — від трьох до восьми, а в болгарській сім\'ї зазвичай одна або дві дитини. Болгарські батьки дають своїм дітям велику свободу.',
    ru: 'В сирийской семье много детей — от трёх до восьми, а в болгарской семье обычно один или два. Болгарские родители дают своим детям большую свободу.',
  },
  'Всички деца обичат родителите си.': {
    en: 'All children love their parents.',
    ar: 'كل الأطفال يحبون والديهم.',
    fr: 'Tous les enfants aiment leurs parents.',
    fa: 'همه بچه‌ها والدین خود را دوست دارند.',
    uk: 'Усі діти люблять своїх батьків.',
    ru: 'Все дети любят своих родителей.',
  },

  // ── Reading-text paragraphs flagged as mistranslated in client feedback ──
  // English wording below follows the client's own corrected text where given.
  'Тя е от Украйна. Казва се Анастасия. Закусва сандвичи и чай. Обядва супа и пиле с ориз. Пие вода. Вечеря салата и риба с картофи.': {
    en: 'She is from Ukraine. Her name is Anastasia. For breakfast, she has sandwiches and tea. For lunch, she has soup and chicken with rice. She drinks water. For dinner, she has salad and fish with potatoes.',
    ar: 'هي من أوكرانيا. اسمها أناستاسيا. في الإفطار، تتناول سندويشات وشاياً. في الغداء، تتناول شوربة ودجاجاً مع الأرز. تشرب الماء. في العشاء، تتناول سلطة وسمكاً مع البطاطا.',
    fr: "Elle vient d'Ukraine. Elle s'appelle Anastasia. Au petit-déjeuner, elle prend des sandwichs et du thé. Au déjeuner, elle prend de la soupe et du poulet au riz. Elle boit de l'eau. Au dîner, elle prend de la salade et du poisson avec des pommes de terre.",
    fa: 'او اهل اوکراین است. نامش آناستازیا است. صبحانه ساندویچ و چای می‌خورد. ناهار سوپ و مرغ با برنج می‌خورد. آب می‌نوشد. شام سالاد و ماهی با سیب‌زمینی می‌خورد.',
    uk: 'Вона з України. Її звуть Анастасія. На завтрак вона їсть бутерброди та чай. На обід — суп і курку з рисом. Вона п\'є воду. На вечерю — салат і рибу з картоплею.',
    ru: 'Она с Украины. Её зовут Анастасия. На завтрак у неё бутерброды и чай. На обед — суп и курица с рисом. Она пьёт воду. На ужин — салат и рыба с картофелем.',
  },
  'Тихомир обядва в ресторант „Градина". Той яде таратор, печена риба с пържени картофи и шопска салата. За десерт яде крем карамел. Пие газирана вода. Плаща 28 евро. Сметката е 25 евро и три евро за бакшиш. Той обича ресторант „Градина".': {
    en: 'Tihomir has lunch at the "Gradina" restaurant. He eats tarator, baked fish with French fries, and a Shopska salad. For dessert, he has crème caramel. He drinks sparkling water. He pays 28 euros. The bill is 25 euros, plus three euros for a tip. He likes the "Gradina" restaurant.',
    ar: 'يتناول تيخومير الغداء في مطعم "غرادينا". يأكل تاراتور وسمكاً مخبوزاً مع البطاطا المقلية وسلطة شوبسكا. للحلوى، يتناول كريم كراميل. يشرب ماءً غازياً. يدفع ٢٨ يورو. الفاتورة ٢٥ يورو، بالإضافة إلى ثلاثة يورو بقشيش. يحب مطعم "غرادينا".',
    fr: "Tihomir déjeune au restaurant « Gradina ». Il mange du tarator, du poisson cuit au four avec des frites et une salade choppa. En dessert, il prend une crème caramel. Il boit de l'eau gazeuse. Il paie 28 euros. L'addition est de 25 euros, plus trois euros de pourboire. Il aime le restaurant « Gradina ».",
    fa: 'تیخومیر در رستوران «گرادینا» ناهار می‌خورد. او تاراتور، ماهی پخته با سیب‌زمینی سرخ‌کرده و سالاد شوپسکا می‌خورد. برای دسر، کرم کارامل می‌خورد. آب‌گازدار می‌نوشد. او ۲۸ یورو می‌پردازد. صورت‌حساب ۲۵ یورو به‌همراه سه یورو انعام است. او رستوران «گرادینا» را دوست دارد.',
    uk: 'Тихомир обідає в ресторані «Градина». Він їсть таратор, запечену рибу з картоплею фрі та шопський салат. На десерт — крем-карамель. П\'є газовану воду. Платить 28 євро. Рахунок — 25 євро плюс три євро чайових. Йому подобається ресторан «Градина».',
    ru: 'Тихомир обедает в ресторане «Градина». Он ест таратор, запечённую рыбу с картофелем фри и шопский салат. На десерт — крем-карамель. Пьёт газированную воду. Платит 28 евро. Счёт — 25 евро плюс три евро чаевых. Ему нравится ресторан «Градина».',
  },
  'Ахмед е арабин. Той обича агнешко месо, не яде свинско. Сега вечеря в арабски ресторант. Той иска агнешки шишчета и хумус, за десерт – баклава. Пие айрян. Сметката е 29 евро.': {
    en: "Ahmed is Arab. He likes lamb and doesn't eat pork. He's having dinner at an Arab restaurant right now. He orders lamb skewers and hummus, and baklava for dessert. He drinks ayran. The bill comes to 29 euros.",
    ar: 'أحمد عربي. يحب لحم الضأن ولا يأكل لحم الخنزير. يتناول العشاء الآن في مطعم عربي. يطلب أسياخ لحم الضأن والحمص، وللحلوى البقلاوة. يشرب العيران. الفاتورة ٢٩ يورو.',
    fr: "Ahmed est arabe. Il aime l'agneau et ne mange pas de porc. Il dîne actuellement dans un restaurant arabe. Il commande des brochettes d'agneau et du houmous, et du baklava en dessert. Il boit de l'ayran. L'addition s'élève à 29 euros.",
    fa: 'احمد عرب است. او گوشت بره را دوست دارد و گوشت خوک نمی‌خورد. او هم‌اکنون در یک رستوران عربی شام می‌خورد. او سیخ گوشت بره و حمص سفارش می‌دهد و برای دسر باقلوا. او دوغ می‌نوشد. صورت‌حساب ۲۹ یورو است.',
    uk: 'Ахмед — араб. Він любить баранину і не їсть свинину. Зараз він вечеряє в арабському ресторані. Він замовляє шашлик з баранини та хумус, а на десерт — баклаву. П\'є айран. Рахунок — 29 євро.',
    ru: 'Ахмед — араб. Он любит баранину и не ест свинину. Сейчас он ужинает в арабском ресторане. Он заказывает шашлык из баранины и хумус, а на десерт — пахлаву. Пьёт айран. Счёт — 29 евро.',
  },
  'Санди е сирийка. Тя е в един ресторант с Амира и Стефан. Санди обядва пиле с картофи. Пие минерална вода. За десерт яде сладолед. Амира не яде месо. Тя е вегетарианка. Обядва таратор и пица. Тя пие газирана вода. Стефан също е вегетарианец. Той яде за обяд супа от леща, шопска салата и торта. Пие сок.': {
    en: "Sandy is Syrian. She is at a restaurant with Amira and Stefan. Sandy is having chicken and potatoes for lunch. She is drinking mineral water. For dessert, she's having ice cream. Amira doesn't eat meat. She's a vegetarian. She's having tarator and pizza for lunch. She's drinking sparkling water. Stefan is also a vegetarian. He's having lentil soup, a Shopska salad, and cake for lunch. He's drinking juice.",
    ar: 'ساندي سورية. هي في مطعم مع أميرة وستيفان. تتناول ساندي الدجاج مع البطاطا للغداء. تشرب ماءً معدنياً. للحلوى، تتناول آيس كريم. أميرة لا تأكل اللحم. هي نباتية. تتناول تاراتور وبيتزا للغداء. تشرب ماءً غازياً. ستيفان نباتي أيضاً. يتناول شوربة العدس وسلطة شوبسكا وكيكاً للغداء. يشرب عصيراً.',
    fr: "Sandy est syrienne. Elle est au restaurant avec Amira et Stefan. Sandy déjeune de poulet et de pommes de terre. Elle boit de l'eau minérale. En dessert, elle prend une glace. Amira ne mange pas de viande. Elle est végétarienne. Elle déjeune de tarator et de pizza. Elle boit de l'eau gazeuse. Stefan est également végétarien. Il déjeune de soupe de lentilles, de salade choppa et de gâteau. Il boit un jus.",
    fa: 'ساندی سوری است. او در رستورانی همراه امیرا و استفان است. ساندی برای ناهار مرغ و سیب‌زمینی می‌خورد. او آب معدنی می‌نوشد. برای دسر، بستنی می‌خورد. امیرا گوشت نمی‌خورد. او گیاه‌خوار است. او برای ناهار تاراتور و پیتزا می‌خورد. او آب‌گازدار می‌نوشد. استفان هم گیاه‌خوار است. او برای ناهار سوپ عدس، سالاد شوپسکا و کیک می‌خورد. او آب‌میوه می‌نوشد.',
    uk: 'Сенді — сирійка. Вона в ресторані з Амірою та Стефаном. На обід Сенді їсть курку з картоплею. П\'є мінеральну воду. На десерт — морозиво. Аміра не їсть м\'яса. Вона вегетаріанка. На обід вона їсть таратор і піцу. П\'є газовану воду. Стефан також вегетаріанець. На обід він їсть чечевичний суп, шопський салат і торт. П\'є сік.',
    ru: 'Сэнди — сирийка. Она в ресторане с Амирой и Стефаном. На обед Сэнди ест курицу с картофелем. Пьёт минеральную воду. На десерт — мороженое. Амира не ест мяса. Она вегетарианка. На обед она ест таратор и пиццу. Пьёт газированную воду. Стефан тоже вегетарианец. На обед он ест чечевичный суп, шопский салат и торт. Пьёт сок.',
  },
  'Елена купува от супермаркета хляб, кисело и прясно мляко, месо, яйца, маслини, сирене, кашкавал и риба. От пазара купува плодове и зеленчуци. Тя много обича ябълки, праскови, череши, банани. Не обича ягоди. Обича всички зеленчуци без зеле и гъби. Тя яде много плодове и зеленчуци.': {
    en: "Elena buys bread, yogurt, fresh milk, meat, eggs, olives, cheese, yellow cheese, and fish at the supermarket. She buys fruits and vegetables at the market. She really likes apples, peaches, cherries, and bananas. She doesn't like strawberries. She likes all vegetables except cabbage and mushrooms. She eats a lot of fruits and vegetables.",
    ar: 'تشتري إيلينا من السوبرماركت الخبز والزبادي والحليب الطازج واللحم والبيض والزيتون والجبن والجبن الأصفر والسمك. تشتري الفواكه والخضروات من السوق. تحب كثيراً التفاح والخوخ والكرز والموز. لا تحب الفراولة. تحب جميع الخضروات إلا الملفوف والفطر. تأكل الكثير من الفواكه والخضروات.',
    fr: "Elena achète du pain, du yaourt, du lait frais, de la viande, des œufs, des olives, du fromage, du fromage jaune et du poisson au supermarché. Elle achète des fruits et légumes au marché. Elle aime beaucoup les pommes, les pêches, les cerises et les bananes. Elle n'aime pas les fraises. Elle aime tous les légumes sauf le chou et les champignons. Elle mange beaucoup de fruits et légumes.",
    fa: 'النا نان، ماست، شیر تازه، گوشت، تخم‌مرغ، زیتون، پنیر، پنیر زرد و ماهی از سوپرمارکت می‌خرد. او میوه و سبزیجات را از بازار می‌خرد. او سیب، هلو، گیلاس و موز را واقعاً دوست دارد. او توت‌فرنگی را دوست ندارد. او همه سبزیجات را دوست دارد به‌جز کلم و قارچ. او میوه و سبزیجات زیادی می‌خورد.',
    uk: 'Олена купує в супермаркеті хліб, йогурт, свіже молоко, м\'ясо, яйця, оливки, сир, жовтий сир і рибу. На ринку вона купує фрукти та овочі. Вона дуже любить яблука, персики, вишні, банани. Вона не любить полуницю. Вона любить усі овочі, крім капусти та грибів. Вона їсть багато фруктів та овочів.',
    ru: 'Елена покупает в супермаркете хлеб, йогурт, свежее молоко, мясо, яйца, маслины, сыр, жёлтый сыр и рыбу. На рынке она покупает фрукты и овощи. Она очень любит яблоки, персики, черешни, бананы. Она не любит клубнику. Она любит все овощи, кроме капусты и грибов. Она ест много фруктов и овощей.',
  },
  'Това е брат ми. Казва се Ибрахим. Той е на 42 години. Бизнесмен е. Има фурна за арабски хляб в София. Женен е. Има шест деца. Жена му не работи.': {
    en: 'This is my brother. His name is Ibrahim. He is 42 years old. He is a businessman. He has a bakery for Arabic bread in Sofia. He is married. He has six children. His wife does not work.',
    ar: 'هذا أخي. اسمه إبراهيم. عمره ٤٢ عاماً. رجل أعمال. لديه مخبز للخبز العربي في صوفيا. متزوج. لديه ستة أطفال. زوجته لا تعمل.',
    fr: "C'est mon frère. Il s'appelle Ibrahim. Il a 42 ans. Il est homme d'affaires. Il a une boulangerie de pain arabe à Sofia. Il est marié. Il a six enfants. Sa femme ne travaille pas.",
    fa: 'این برادر من است. نامش ابراهیم است. او ۴۲ ساله است. تاجر است. او یک نانوایی نان عربی در صوفیه دارد. متأهل است. شش فرزند دارد. همسرش کار نمی‌کند.',
    uk: 'Це мій брат. Його звуть Ібрагім. Йому 42 роки. Він бізнесмен. У нього пекарня арабського хліба в Софії. Він одружений. У нього шестеро дітей. Його дружина не працює.',
    ru: 'Это мой брат. Его зовут Ибрагим. Ему 42 года. Он бизнесмен. У него пекарня арабского хлеба в Софии. Он женат. У него шестеро детей. Его жена не работает.',
  },
  'Живеем в София на квартира. Близо до града е планината Витоша, тя е висока и красива.': {
    en: 'We live in a rented flat in Sofia. Vitosha Mountain is near the city; it is tall and beautiful.',
    ar: 'نعيش في شقة مستأجرة في صوفيا. جبل فيتوشا قريب من المدينة؛ وهو مرتفع وجميل.',
    fr: 'Nous vivons dans un appartement loué à Sofia. Le mont Vitosha est proche de la ville ; il est haut et magnifique.',
    fa: 'ما در آپارتمانی اجاره‌ای در صوفیه زندگی می‌کنیم. کوه ویتوشا نزدیک شهر است؛ بلند و زیباست.',
    uk: 'Ми живемо в орендованій квартирі в Софії. Гора Вітоша розташована біля міста; вона висока і красива.',
    ru: 'Мы живём на съёмной квартире в Софии. Гора Витоша находится рядом с городом; она высокая и красивая.',
  },
  'Ние сме две момчета от Сирия. Казваме се Кусай и Мохамед. Учим в Ливанското училище в София, а през лятото ходим на курс по български език.': {
    en: 'We are two boys from Syria. Our names are Kusay and Mohamed. We attend the Lebanese School in Sofia, and during the summer we take a Bulgarian language course.',
    ar: 'نحن ولدان من سوريا. اسمانا قصي ومحمد. ندرس في المدرسة اللبنانية في صوفيا، وفي الصيف نأخذ دورة في اللغة البلغارية.',
    fr: "Nous sommes deux garçons de Syrie. Nous nous appelons Koussay et Mohamed. Nous étudions à l'École libanaise de Sofia, et en été nous suivons un cours de bulgare.",
    fa: 'ما دو پسر از سوریه هستیم. نام‌های ما قصی و محمد است. در مدرسه لبنانی صوفیه تحصیل می‌کنیم و در تابستان یک دوره زبان بلغاری می‌گذرانیم.',
    uk: 'Ми — двоє хлопців із Сирії. Нас звуть Кусай і Мохамед. Ми навчаємося в Ліванській школі в Софії, а влітку відвідуємо курс болгарської мови.',
    ru: 'Мы — двое мальчиков из Сирии. Нас зовут Кусай и Мохамед. Мы учимся в Ливанской школе в Софии, а летом ходим на курс болгарского языка.',
  },
  'Ние сме бежанци и живеем в България от 2022 година. Харесваме България, защото има добри хора и хубави празници. Големите празници са Баба Марта, Коледа и Великден. Тук празнуваме също сирийските празници Рамазан Байрам и Курбан Байрам.': {
    en: 'We are refugees and have lived in Bulgaria since 2022. We like Bulgaria because it has good people and lovely holidays. The big holidays are Baba Marta, Christmas, and Easter. Here we also celebrate the Syrian holidays Ramadan Bayram and Kurban Bayram.',
    ar: 'نحن لاجئون ونعيش في بلغاريا منذ عام ٢٠٢٢. نحب بلغاريا لأن فيها أشخاصاً طيبين وأعياداً جميلة. الأعياد الكبرى هي بابا مارتا وعيد الميلاد وعيد الفصح. هنا نحتفل أيضاً بالأعياد السورية عيد الفطر وعيد الأضحى.',
    fr: "Nous sommes réfugiés et vivons en Bulgarie depuis 2022. Nous aimons la Bulgarie parce qu'il y a de bonnes personnes et de belles fêtes. Les grandes fêtes sont Baba Marta, Noël et Pâques. Ici, nous célébrons aussi les fêtes syriennes, l'Aïd al-Fitr et l'Aïd al-Adha.",
    fa: 'ما پناهنده هستیم و از سال ۲۰۲۲ در بلغارستان زندگی می‌کنیم. بلغارستان را دوست داریم چون مردمان خوب و اعیاد زیبایی دارد. اعیاد بزرگ بابا مارتا، کریسمس و عید پاک هستند. اینجا اعیاد سوری عید فطر و عید قربان را نیز جشن می‌گیریم.',
    uk: 'Ми біженці і живемо в Болгарії з 2022 року. Нам подобається Болгарія, бо тут добрі люди і гарні свята. Головні свята — Баба Марта, Різдво та Великдень. Тут ми також відзначаємо сирійські свята Рамазан-байрам і Курбан-байрам.',
    ru: 'Мы беженцы и живём в Болгарии с 2022 года. Нам нравится Болгария, потому что здесь добрые люди и красивые праздники. Главные праздники — Баба Марта, Рождество и Пасха. Здесь мы также отмечаем сирийские праздники Рамазан-байрам и Курбан-байрам.',
  },
  'Мариам е много добро момиче. Тя е от Сирия. На десет години е. Сега е в един център за бежанци в София и учи български език.': {
    en: 'Mariam is a very nice girl. She is from Syria. She is ten years old. She is currently staying at a refugee center in Sofia and is learning Bulgarian.',
    ar: 'مريم فتاة طيبة جداً. هي من سوريا. عمرها عشر سنوات. تعيش حالياً في مركز للاجئين في صوفيا وتتعلم اللغة البلغارية.',
    fr: "Mariam est une fille très gentille. Elle vient de Syrie. Elle a dix ans. Elle vit actuellement dans un centre pour réfugiés à Sofia et apprend le bulgare.",
    fa: 'مریم دختر بسیار خوبی است. او اهل سوریه است. ده ساله است. او هم‌اکنون در یک مرکز پناهندگان در صوفیه است و زبان بلغاری می‌آموزد.',
    uk: 'Маріам — дуже хороша дівчинка. Вона з Сирії. Їй десять років. Зараз вона перебуває в центрі для біженців у Софії і вивчає болгарську мову.',
    ru: 'Мариам — очень хорошая девочка. Она из Сирии. Ей десять лет. Сейчас она находится в центре для беженцев в Софии и изучает болгарский язык.',
  },
  'Всяка сутрин става в девет часа, мие се в банята, облича се, обува се и закусва. После отива в стаята по български език. Там учи всеки ден без неделя от 10:30 до 13:00 часа.': {
    en: 'Every morning, she gets up at nine o\'clock, washes up in the bathroom, gets dressed, puts on her shoes, and eats breakfast. Then she goes to the Bulgarian language classroom. There, she studies every day except Sundays from 10:30 a.m. to 1:00 p.m.',
    ar: 'كل صباح تستيقظ في الساعة التاسعة، تغتسل في الحمام، ترتدي ملابسها، تنتعل حذاءها، وتتناول الإفطار. ثم تذهب إلى فصل اللغة البلغارية. هناك تتعلم كل يوم إلا الأحد من ١٠:٣٠ صباحاً حتى ١:٠٠ ظهراً.',
    fr: "Chaque matin, elle se lève à neuf heures, se lave dans la salle de bain, s'habille, met ses chaussures et prend son petit-déjeuner. Ensuite, elle se rend en classe de bulgare. Là, elle étudie tous les jours sauf le dimanche de 10h30 à 13h00.",
    fa: 'هر روز صبح، ساعت نه بیدار می‌شود، در حمام خود را می‌شوید، لباس می‌پوشد، کفش می‌پوشد و صبحانه می‌خورد. سپس به کلاس زبان بلغاری می‌رود. آنجا هر روز به‌جز یکشنبه از ۱۰:۳۰ تا ۱۳:۰۰ درس می‌خواند.',
    uk: 'Щоранку вона встає о дев\'ятій годині, вмивається у ванній, одягається, взуває взуття і снідає. Потім йде до класу болгарської мови. Там вона навчається щодня, крім неділі, з 10:30 до 13:00.',
    ru: 'Каждое утро она встаёт в девять часов, умывается в ванной, одевается, обувается и завтракает. Потом она идёт в класс болгарского языка. Там она учится каждый день, кроме воскресенья, с 10:30 до 13:00.',
  },
  'След това тя и приятелите ѝ слушат сирийска музика и танцуват. После обядва и играе с децата навън.': {
    en: 'After that, she and her friends listen to Syrian music and dance. Then she has lunch and plays with the children outside.',
    ar: 'بعد ذلك، تستمع هي وصديقاتها إلى الموسيقى السورية ويرقصن. ثم تتناول الغداء وتلعب مع الأطفال في الخارج.',
    fr: "Ensuite, elle et ses amies écoutent de la musique syrienne et dansent. Puis elle déjeune et joue avec les enfants à l'extérieur.",
    fa: 'بعد از آن، او و دوستانش به موسیقی سوری گوش می‌دهند و می‌رقصند. سپس ناهار می‌خورد و با بچه‌ها بیرون بازی می‌کند.',
    uk: 'Після цього вона з подругами слухає сирійську музику і танцює. Потім обідає і грає з дітьми на вулиці.',
    ru: 'После этого она с подругами слушает сирийскую музыку и танцует. Потом она обедает и играет с детьми на улице.',
  },

  // ── Lesson 5 — grammar tables & notes (pilot) ─────────────────────────────
  'Живея (живе–)': { en: 'ЖИВЕЯ — to live (живе–)', ar: 'ЖИВЕЯ — أسكن/أعيش (живе–)', fr: 'ЖИВЕЯ — vivre/habiter (живе–)', fa: 'ЖИВЕЯ — زندگی کردن (живе–)', uk: 'ЖИВЕЯ — жити (живе–)', ru: 'ЖИВЕЯ — жить (живе–)' },
  'Иван живее в София, на улица „Янтра“ 5.': { en: 'Ivan lives in Sofia, at 5 Yantra Street.', ar: 'إيفان يعيش في صوفيا، في شارع يانترا رقم 5.', fr: 'Ivan habite à Sofia, 5 rue Yantra.', fa: 'ایوان در صوفیه، خیابان یانترا شماره ۵ زندگی می‌کند.', uk: 'Іван живе в Софії, на вулиці «Янтра» 5.', ru: 'Иван живёт в Софии, на улице «Янтра» 5.' },

  'Членуване в единствено число': { en: 'Definite article — singular', ar: 'أداة التعريف — المفرد', fr: "L'article défini — singulier", fa: 'حرف تعریف — مفرد', uk: 'Означений артикль — однина', ru: 'Определённый артикль — единственное число' },
  'мъжки род (а)': { en: 'masculine (a)', ar: 'مذكر (أ)', fr: 'masculin (a)', fa: 'مذکر (الف)', uk: 'чоловічий рід (а)', ru: 'мужской род (а)' },
  'мъжки род (б)': { en: 'masculine (b)', ar: 'مذكر (ب)', fr: 'masculin (b)', fa: 'مذکر (ب)', uk: 'чоловічий рід (б)', ru: 'мужской род (б)' },
  'пазар, студент': { en: 'пазар (market), студент (student)', ar: 'пазар (سوق)، студент (طالب)', fr: 'пазар (marché), студент (étudiant)', fa: 'пазар (بازار)، студент (دانشجو)', uk: 'пазар (ринок), студент (студент)', ru: 'пазар (рынок), студент (студент)' },
  'учител, лекар': { en: 'учител (teacher), лекар (doctor)', ar: 'учител (معلم)، лекар (طبيب)', fr: 'учител (enseignant), лекар (médecin)', fa: 'учител (معلم)، лекар (پزشک)', uk: 'учител (учитель), лекар (лікар)', ru: 'учител (учитель), лекар (врач)' },
  'банка, улица': { en: 'банка (bank), улица (street)', ar: 'банка (مصرف)، улица (شارع)', fr: 'банка (banque), улица (rue)', fa: 'банка (بانک)، улица (خیابان)', uk: 'банка (банк), улица (вулиця)', ru: 'банка (банк), улица (улица)' },
  'кафе, училище': { en: 'кафе (café), училище (school)', ar: 'кафе (مقهى)، училище (مدرسة)', fr: 'кафе (café), училище (école)', fa: 'кафе (کافه)، училище (مدرسه)', uk: 'кафе (кафе), училище (школа)', ru: 'кафе (кафе), училище (школа)' },
  'Площадът е в центъра.': { en: 'The square is in the centre.', ar: 'الساحة في وسط المدينة.', fr: 'La place est dans le centre.', fa: 'میدان در مرکز شهر است.', uk: 'Площа знаходиться в центрі.', ru: 'Площадь находится в центре.' },

  'Членуване — множествено число': { en: 'Definite article — plural', ar: 'أداة التعريف — الجمع', fr: "L'article défini — pluriel", fa: 'حرف تعریف — جمع', uk: 'Означений артикль — множина', ru: 'Определённый артикль — множественное число' },
  'Основна форма (мн.ч.)': { en: 'Base form (plural)', ar: 'الصيغة الأساسية (جمع)', fr: 'Forme de base (pluriel)', fa: 'شکل پایه (جمع)', uk: 'Основна форма (мн.)', ru: 'Основная форма (мн.ч.)' },
  'пазари, градове': { en: 'пазари (markets), градове (towns)', ar: 'пазари (أسواق)، градове (مدن)', fr: 'пазари (marchés), градове (villes)', fa: 'пазари (بازارها)، градове (شهرها)', uk: 'пазари (ринки), градове (міста)', ru: 'пазари (рынки), градове (города)' },
  'банки, улици': { en: 'банки (banks), улици (streets)', ar: 'банки (مصارف)، улици (شوارع)', fr: 'банки (banques), улици (rues)', fa: 'банки (بانک‌ها)، улици (خیابان‌ها)', uk: 'банки (банки), улици (вулиці)', ru: 'банки (банки), улици (улицы)' },
  'кафета, училища': { en: 'кафета (cafés), училища (schools)', ar: 'кафета (مقاهٍ)، училища (مدارس)', fr: 'кафета (cafés), училища (écoles)', fa: 'кафета (کافه‌ها)، училища (مدرسه‌ها)', uk: 'кафета (кафе), училища (школи)', ru: 'кафета (кафе), училища (школы)' },
  'Магазините са в центъра.': { en: 'The shops are in the centre.', ar: 'المحلات في وسط المدينة.', fr: 'Les magasins sont dans le centre.', fa: 'مغازه‌ها در مرکز شهر هستند.', uk: 'Магазини знаходяться в центрі.', ru: 'Магазины находятся в центре.' },

  'Число на съществителните (3)': { en: 'Noun number (3)', ar: 'عدد الاسم (٣)', fr: 'Nombre du nom (3)', fa: 'عدد اسم (۳)', uk: 'Число іменників (3)', ru: 'Число существительных (3)' },
  'един човек': { en: 'един човек — one person', ar: 'един човек — شخص واحد', fr: 'един човек — une personne', fa: 'един човек — یک نفر', uk: 'един човек — одна людина', ru: 'един човек — один человек' },
  'Тук има един човек.': { en: 'There is one person here.', ar: 'يوجد شخص واحد هنا.', fr: 'Il y a une personne ici.', fa: 'اینجا یک نفر هست.', uk: 'Тут є одна людина.', ru: 'Здесь есть один человек.' },
  'десет души': { en: 'десет души — ten people', ar: 'десет души — عشرة أشخاص', fr: 'десет души — dix personnes', fa: 'десет души — ده نفر', uk: 'десет души — десять людей', ru: 'десет души — десять человек' },
  'Колко души има тук?': { en: 'How many people are here?', ar: 'كم عدد الأشخاص هنا؟', fr: 'Combien de personnes y a-t-il ici ?', fa: 'اینجا چند نفر هستند؟', uk: 'Скільки людей тут?', ru: 'Сколько человек здесь?' },
  'много, малко хора': { en: 'много хора (many people), малко хора (few people)', ar: 'много хора (أشخاص كثيرون)، малко хора (أشخاص قليلون)', fr: 'много хора (beaucoup de gens), малко хора (peu de gens)', fa: 'много хора (افراد زیاد)، малко хора (افراد کم)', uk: 'много хора (багато людей), малко хора (мало людей)', ru: 'много хора (много людей), малко хора (мало людей)' },
  'Тук няма много хора.': { en: 'There are not many people here.', ar: 'لا يوجد كثير من الناس هنا.', fr: "Il n'y a pas beaucoup de gens ici.", fa: 'اینجا افراد زیادی نیستند.', uk: 'Тут немає багато людей.', ru: 'Здесь не много людей.' },

  'Числата от 1000 до 1 000 000 000': { en: 'Numbers from 1,000 to 1,000,000,000', ar: 'الأرقام من ١٠٠٠ إلى ١ ٠٠٠ ٠٠٠ ٠٠٠', fr: 'Les nombres de 1 000 à 1 000 000 000', fa: 'اعداد از ۱۰۰۰ تا ۱٬۰۰۰٬۰۰۰٬۰۰۰', uk: 'Числа від 1000 до 1 000 000 000', ru: 'Числа от 1000 до 1 000 000 000' },
  'хиляда': { en: 'хиляда — one thousand', ar: 'хиляда — ألف', fr: 'хиляда — mille', fa: 'хиляда — هزار', uk: 'хиляда — тисяча', ru: 'хиляда — тысяча' },
  'две хиляди': { en: 'две хиляди — two thousand', ar: 'две хиляди — ألفان', fr: 'две хиляди — deux mille', fa: 'две хиляди — دو هزار', uk: 'две хиляди — дві тисячі', ru: 'две хиляди — две тысячи' },
  'един милион': { en: 'един милион — one million', ar: 'един милион — مليون واحد', fr: 'един милион — un million', fa: 'един милион — یک میلیون', uk: 'един милион — один мільйон', ru: 'един милион — один миллион' },
  'два милиона': { en: 'два милиона — two million', ar: 'два милиона — مليونان', fr: 'два милиона — deux millions', fa: 'два милиона — دو میلیون', uk: 'два милиона — два мільйони', ru: 'два милиона — два миллиона' },
  'един милиард': { en: 'един милиард — one billion', ar: 'един милиард — مليار واحد', fr: 'един милиард — un milliard', fa: 'един милиард — یک میلیارد', uk: 'един милиард — один мільярд', ru: 'един милиард — один миллиард' },
  'След 2–4 използвайте „милиона/милиарда“; за много нещо — „милиони/милиарди“.': {
    en: 'After 2–4, use "милиона / милиарда"; for a general amount, use "милиони / милиарди".',
    ar: 'بعد ٢-٤ استخدم "милиона/милиарда"؛ للكمية العامة استخدم "милиони/милиарди".',
    fr: 'Après 2 à 4, utilisez « милиона / милиарда » ; pour une quantité générale, utilisez « милиони / милиарди ».',
    fa: 'بعد از ۲ تا ۴ از «милиона/милиарда» و برای مقدار کلی از «милиони/милиарди» استفاده کنید.',
    uk: 'Після 2–4 використовуйте «милиона/милиарда»; для загальної кількості — «милиони/милиарди».',
    ru: 'После 2–4 используйте «милиона/милиарда»; для общего количества — «милиони/милиарди».',
  },
  'След две, три, четири или друга цифра и след думата „колко" казваме „милиона" или „милиарда". Когато говорим общо, без пояснения, казваме „милиони" или „милиарди".': {
    en: 'After два/две, три, четири (or another digit) and after the word "колко" (how many), we say "милиона" or "милиарда". When speaking generally, without a number, we say "милиони" or "милиарди".',
    ar: 'بعد два/две أو три أو четири (أو رقم آخر) وبعد كلمة "колко" (كم) نقول "милиона" أو "милиарда". وعند الحديث بشكل عام دون رقم، نقول "милиони" أو "милиарди".',
    fr: 'Après два/две, три, четири (ou un autre chiffre) et après le mot « колко » (combien), on dit « милиона » ou « милиарда ». En parlant de façon générale, sans chiffre, on dit « милиони » ou « милиарди ».',
    fa: 'بعد از два/две، три، четири (یا رقم دیگر) و بعد از کلمه «колко» (چند) می‌گوییم «милиона» یا «милиарда». وقتی به‌طور کلی و بدون عدد صحبت می‌کنیم، می‌گوییم «милиони» یا «милиарди».',
    uk: 'Після два/две, три, четири (або іншої цифри) і після слова «колко» (скільки) кажемо «милиона» або «милиарда». Коли говоримо загально, без числа, кажемо «милиони» або «милиарди».',
    ru: 'После два/две, три, четири (или другой цифры) и после слова «колко» (сколько) говорим «милиона» или «милиарда». Когда говорим в общем, без числа, говорим «милиони» или «милиарди».',
  },
  'два милиона, шест милиарда': { en: 'два милиона (two million), шест милиарда (six billion)', ar: 'два милиона (مليونان)، шест милиарда (ستة مليارات)', fr: 'два милиона (deux millions), шест милиарда (six milliards)', fa: 'два милиона (دو میلیون)، шест милиарда (شش میلیارد)', uk: 'два милиона (два мільйони), шест милиарда (шість мільярдів)', ru: 'два милиона (два миллиона), шест милиарда (шесть миллиардов)' },
  'Милиони хора живеят в Европа.': { en: 'Millions of people live in Europe.', ar: 'يعيش ملايين الأشخاص في أوروبا.', fr: 'Des millions de personnes vivent en Europe.', fa: 'میلیون‌ها نفر در اروپا زندگی می‌کنند.', uk: 'Мільйони людей живуть у Європі.', ru: 'Миллионы людей живут в Европе.' },

  'Вие: Вървете направо.': { en: 'Formal (Вие): Вървете направо. — Go straight ahead.', ar: 'رسمي (Вие): Вървете направо. — اذهب مباشرة.', fr: 'Formel (Вие) : Вървете направо. — Allez tout droit.', fa: 'رسمی (Вие): Вървете направо. — مستقیم بروید.', uk: 'Ввічливо (Вие): Вървете направо. — Ідіть прямо.', ru: 'Вежливо (Вие): Вървете направо. — Идите прямо.' },
  'Ти: Върви направо.': { en: 'Informal (ти): Върви направо. — Go straight ahead.', ar: 'غير رسمي (ти): Върви направо. — اذهب مباشرة.', fr: 'Informel (ти) : Върви направо. — Va tout droit.', fa: 'غیررسمی (ти): Върви направо. — مستقیم برو.', uk: 'Неофіційно (ти): Върви направо. — Іди прямо.', ru: 'Неформально (ти): Върви направо. — Иди прямо.' },
  'Вие: Завийте наляво.': { en: 'Formal (Вие): Завийте наляво. — Turn left.', ar: 'رسمي (Вие): Завийте наляво. — انحرف يسارًا.', fr: 'Formel (Вие) : Завийте наляво. — Tournez à gauche.', fa: 'رسمی (Вие): Завийте наляво. — به چپ بپیچید.', uk: 'Ввічливо (Вие): Завийте наляво. — Поверніть ліворуч.', ru: 'Вежливо (Вие): Завийте наляво. — Поверните налево.' },
  'Ти: Завий наляво.': { en: 'Informal (ти): Завий наляво. — Turn left.', ar: 'غير رسمي (ти): Завий наляво. — انحرف يسارًا.', fr: 'Informel (ти) : Завий наляво. — Tourne à gauche.', fa: 'غیررسمی (ти): Завий наляво. — به چپ بپیچ.', uk: 'Неофіційно (ти): Завий наляво. — Поверни ліворуч.', ru: 'Неформально (ти): Завий наляво. — Поверни налево.' },
  'Вие: Завийте надясно.': { en: 'Formal (Вие): Завийте надясно. — Turn right.', ar: 'رسمي (Вие): Завийте надясно. — انحرف يمينًا.', fr: 'Formel (Вие) : Завийте надясно. — Tournez à droite.', fa: 'رسمی (Вие): Завийте надясно. — به راست بپیچید.', uk: 'Ввічливо (Вие): Завийте надясно. — Поверніть праворуч.', ru: 'Вежливо (Вие): Завийте надясно. — Поверните направо.' },
  'Ти: Завий надясно.': { en: 'Informal (ти): Завий надясно. — Turn right.', ar: 'غير رسمي (ти): Завий надясно. — انحرف يمينًا.', fr: 'Informel (ти) : Завий надясно. — Tourne à droite.', fa: 'غیررسمی (ти): Завий надясно. — به راست بپیچ.', uk: 'Неофіційно (ти): Завий надясно. — Поверни праворуч.', ru: 'Неформально (ти): Завий надясно. — Поверни направо.' },
  'Използваме „вие", когато има няколко човека или когато говорим в учтива форма на един човек. Във втория случай „Вие" се пише с главна буква.': {
    en: 'We use "вие" when speaking to several people, or as the polite/formal form when speaking to one person. In the second case, "Вие" is written with a capital letter.',
    ar: 'نستخدم "вие" عند التحدث إلى عدة أشخاص، أو كصيغة مهذبة/رسمية عند التحدث إلى شخص واحد. في الحالة الثانية تُكتب "Вие" بحرف كبير.',
    fr: 'On utilise « вие » quand on parle à plusieurs personnes, ou comme forme de politesse/formelle en s\'adressant à une seule personne. Dans ce second cas, « Вие » s\'écrit avec une majuscule.',
    fa: 'وقتی با چند نفر صحبت می‌کنیم یا به‌عنوان شکل مؤدبانه/رسمی با یک نفر صحبت می‌کنیم، از «вие» استفاده می‌کنیم. در حالت دوم، «Вие» با حرف بزرگ نوشته می‌شود.',
    uk: 'Ми використовуємо «вие», коли звертаємося до кількох людей, або як ввічливу/формальну форму, звертаючись до однієї людини. У другому випадку «Вие» пишеться з великої букви.',
    ru: 'Мы используем «вие», когда обращаемся к нескольким людям, или как вежливую/формальную форму, обращаясь к одному человеку. Во втором случае «Вие» пишется с большой буквы.',
  },
};

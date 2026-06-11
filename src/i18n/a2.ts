/**
 * A2-specific UI translations.
 *
 * Add keys here for A2 lesson `instructionKey` values, A2-specific grammar
 * notes, or any pre-translated string used only by A2 content. The keys are
 * merged into `UI_TRANSLATIONS` in `./ui.ts`, so `useT('a2.your.key')` just
 * works from any component.
 *
 * Conventions:
 *  - Prefix every key with `a2.` so it can't collide with shared keys.
 *  - Always provide all 7 languages: bg, ar, fr, en, fa, uk, ru.
 *  - Order inside each entry: bg, ar, fr, en, fa, uk, ru (same as ui.ts).
 *  - Keep the file alphabetical / grouped by lesson — easier to scan.
 *
 * Example:
 *
 *   'a2.exercise.dragBubbleLeftOrRight': {
 *     bg: 'Плъзнете балончето наляво или надясно.',
 *     ar: '...', fr: '...', en: '...', fa: '...', uk: '...', ru: '...'
 *   },
 *
 * Used in content: `instructionKey: 'a2.exercise.dragBubbleLeftOrRight'`.
 */

import type { SupportedLang } from './languages';

export const A2_TRANSLATIONS: Record<string, Record<SupportedLang, string>> = {

  // ── a2-lesson-00 „Преговор A1" ──────────────────────────────────────────

  'a2.ex.nationalnosti': {
    bg: 'Изберете правилната национална форма за всяка държава.',
    ar: 'اختر شكل الجنسية الصحيح لكل دولة.',
    fr: 'Choisissez la forme nationale correcte pour chaque pays.',
    en: 'Choose the correct nationality form for each country.',
    fa: 'شکل صحیح ملیت را برای هر کشور انتخاب کنید.',
    uk: 'Оберіть правильну форму національності для кожної країни.',
    ru: 'Выберите правильную форму национальности для каждой страны.',
  },

  'a2.ex.semeystvo': {
    bg: 'Изберете правилната роднинска връзка. Погледнете фамилното дърво.',
    ar: 'اختر علاقة القرابة الصحيحة. انظر إلى شجرة العائلة.',
    fr: 'Choisissez le lien de parenté correct. Regardez l\'arbre généalogique.',
    en: 'Choose the correct family relationship. Look at the family tree.',
    fa: 'رابطه خانوادگی صحیح را انتخاب کنید. به شجره‌نامه نگاه کنید.',
    uk: 'Оберіть правильний родинний зв\'язок. Подивіться на генеалогічне дерево.',
    ru: 'Выберите правильное родственное отношение. Посмотрите на семейное дерево.',
  },

  'a2.ex.glagolSamMest': {
    bg: 'Изберете правилното лично местоимение.',
    ar: 'اختر الضمير الشخصي الصحيح.',
    fr: 'Choisissez le pronom personnel correct.',
    en: 'Choose the correct personal pronoun.',
    fa: 'ضمیر شخصی صحیح را انتخاب کنید.',
    uk: 'Оберіть правильний особовий займенник.',
    ru: 'Выберите правильное личное местоимение.',
  },

  'a2.ex.glagolSamForm': {
    bg: 'Изберете правилната форма на глагола „съм" — положителна или отрицателна.',
    ar: 'اختر الشكل الصحيح للفعل «съм» — الإيجابي أو السلبي.',
    fr: 'Choisissez la forme correcte du verbe «съм» — affirmative ou négative.',
    en: 'Choose the correct form of the verb "съм" — positive or negative.',
    fa: 'شکل صحیح فعل «съм» را انتخاب کنید — مثبت یا منفی.',
    uk: 'Оберіть правильну форму дієслова «съм» — стверджувальну або заперечну.',
    ru: 'Выберите правильную форму глагола «съм» — утвердительную или отрицательную.',
  },

  'a2.ex.glagolSamVapros': {
    bg: 'Изберете правилната въпросителна форма на глагола „съм".',
    ar: 'اختر صيغة الاستفهام الصحيحة للفعل «съм».',
    fr: 'Choisissez la forme interrogative correcte du verbe «съм».',
    en: 'Choose the correct interrogative form of the verb "съм".',
    fa: 'شکل سؤالی صحیح فعل «съм» را انتخاب کنید.',
    uk: 'Оберіть правильну питальну форму дієслова «съм».',
    ru: 'Выберите правильную вопросительную форму глагола «съм».',
  },

  'a2.ex.rodSashtestvitelni': {
    bg: 'Поставете думите в правилната колона: мъжки, женски или среден род.',
    ar: 'ضع الكلمات في العمود الصحيح: مذكر أو مؤنث أو محايد.',
    fr: 'Placez les mots dans la bonne colonne : masculin, féminin ou neutre.',
    en: 'Place the words in the correct column: masculine, feminine or neuter.',
    fa: 'کلمات را در ستون صحیح قرار دهید: مذکر، مؤنث یا خنثی.',
    uk: 'Розмістіть слова у правильній колонці: чоловічий, жіночий або середній рід.',
    ru: 'Разместите слова в правильной колонке: мужской, женский или средний род.',
  },

  'a2.ex.mnozhestveno': {
    bg: 'Изберете правилната форма за множествено число.',
    ar: 'اختر صيغة الجمع الصحيحة.',
    fr: 'Choisissez la forme correcte du pluriel.',
    en: 'Choose the correct plural form.',
    fa: 'شکل صحیح جمع را انتخاب کنید.',
    uk: 'Оберіть правильну форму множини.',
    ru: 'Выберите правильную форму множественного числа.',
  },

  'a2.ex.prilagatelni': {
    bg: 'Изберете правилната форма на прилагателното по род и число.',
    ar: 'اختر الشكل الصحيح للصفة حسب الجنس والعدد.',
    fr: 'Choisissez la forme correcte de l\'adjectif selon le genre et le nombre.',
    en: 'Choose the correct adjective form according to gender and number.',
    fa: 'شکل صحیح صفت را بر اساس جنس و عدد انتخاب کنید.',
    uk: 'Оберіть правильну форму прикметника за родом і числом.',
    ru: 'Выберите правильную форму прилагательного по роду и числу.',
  },

  'a2.ex.stepenuvane': {
    bg: 'Изберете сравнителната и превъзходната степен.',
    ar: 'اختر درجة المقارنة والتفضيل.',
    fr: 'Choisissez le comparatif et le superlatif.',
    en: 'Choose the comparative and superlative degree.',
    fa: 'درجه تطبیقی و عالی را انتخاب کنید.',
    uk: 'Оберіть порівняльний і найвищий ступінь.',
    ru: 'Выберите сравнительную и превосходную степень.',
  },

  'a2.ex.stepenuvaneNarechiya': {
    bg: 'Изберете правилната степен на наречието.',
    ar: 'اختر درجة الظرف الصحيحة.',
    fr: 'Choisissez le degré correct de l\'adverbe.',
    en: 'Choose the correct degree of the adverb.',
    fa: 'درجه صحیح قید را انتخاب کنید.',
    uk: 'Оберіть правильний ступінь прислівника.',
    ru: 'Выберите правильную степень наречия.',
  },

  'a2.ex.chlenuvane': {
    bg: 'Изберете правилния определителен член на съществителното.',
    ar: 'اختر أداة التعريف الصحيحة للاسم.',
    fr: 'Choisissez l\'article défini correct du nom.',
    en: 'Choose the correct definite article for the noun.',
    fa: 'حرف تعریف صحیح را برای اسم انتخاب کنید.',
    uk: 'Оберіть правильний означений артикль іменника.',
    ru: 'Выберите правильный определённый артикль существительного.',
  },

  'a2.ex.chlenuvaneAdj': {
    bg: 'Изберете правилната членувана форма на прилагателното.',
    ar: 'اختر الشكل المُعرَّف الصحيح للصفة.',
    fr: 'Choisissez la forme définie correcte de l\'adjectif.',
    en: 'Choose the correct definite form of the adjective.',
    fa: 'شکل معرفه صحیح صفت را انتخاب کنید.',
    uk: 'Оберіть правильну означену форму прикметника.',
    ru: 'Выберите правильную определённую форму прилагательного.',
  },

  'a2.ex.predloziMyasto': {
    bg: 'Изберете правилния предлог за място. Погледнете плана на къщата.',
    ar: 'اختر حرف الجر الصحيح للمكان. انظر إلى مخطط المنزل.',
    fr: 'Choisissez la préposition de lieu correcte. Regardez le plan de la maison.',
    en: 'Choose the correct preposition of place. Look at the floor plan.',
    fa: 'حرف اضافه مکان صحیح را انتخاب کنید. به نقشه خانه نگاه کنید.',
    uk: 'Оберіть правильний прийменник місця. Подивіться на план будинку.',
    ru: 'Выберите правильный предлог места. Посмотрите на план дома.',
  },

  'a2.ex.predloziVreme': {
    bg: 'Изберете правилния предлог за време.',
    ar: 'اختر حرف الجر الصحيح للزمن.',
    fr: 'Choisissez la préposition de temps correcte.',
    en: 'Choose the correct preposition of time.',
    fa: 'حرف اضافه زمان صحیح را انتخاب کنید.',
    uk: 'Оберіть правильний прийменник часу.',
    ru: 'Выберите правильный предлог времени.',
  },

  'a2.ex.segashnoVreme': {
    bg: 'Изберете правилната форма на глагола.',
    ar: 'اختر الشكل الصحيح للفعل.',
    fr: 'Choisissez la forme correcte du verbe.',
    en: 'Choose the correct verb form.',
    fa: 'شکل صحیح فعل را انتخاب کنید.',
    uk: 'Оберіть правильну форму дієслова.',
    ru: 'Выберите правильную форму глагола.',
  },

  'a2.ex.pritezhatelnaMest': {
    bg: 'Изберете правилната кратка притежателна форма.',
    ar: 'اختر صيغة الملكية القصيرة الصحيحة.',
    fr: 'Choisissez la forme possessive courte correcte.',
    en: 'Choose the correct short possessive form.',
    fa: 'شکل مالکیت کوتاه صحیح را انتخاب کنید.',
    uk: 'Оберіть правильну коротку присвійну форму.',
    ru: 'Выберите правильную краткую притяжательную форму.',
  },

  'a2.ex.pokazatelniMest': {
    bg: 'Изберете правилното показателно местоимение: ТОЗИ, ТАЗИ, ТОВА или ТЕЗИ.',
    ar: 'اختر اسم الإشارة الصحيح: ТОЗИ أو ТАЗИ أو ТОВА أو ТЕЗИ.',
    fr: 'Choisissez le pronom démonstratif correct : ТОЗИ, ТАЗИ, ТОВА ou ТЕЗИ.',
    en: 'Choose the correct demonstrative pronoun: ТОЗИ, ТАЗИ, ТОВА or ТЕЗИ.',
    fa: 'ضمیر اشاری صحیح را انتخاب کنید: ТОЗИ، ТАЗИ، ТОВА یا ТЕЗИ.',
    uk: 'Оберіть правильний вказівний займенник: ТОЗИ, ТАЗИ, ТОВА або ТЕЗИ.',
    ru: 'Выберите правильное указательное местоимение: ТОЗИ, ТАЗИ, ТОВА или ТЕЗИ.',
  },

  'a2.ex.obobshtitelniMest': {
    bg: 'Изберете правилното обобщително местоимение: ВСЕКИ, ВСЯКА, ВСЯКО или ВСИЧКИ.',
    ar: 'اختر الضمير التعميمي الصحيح: ВСЕКИ أو ВСЯКА أو ВСЯКО أو ВСИЧКИ.',
    fr: 'Choisissez le pronom généralisateur correct : ВСЕКИ, ВСЯКА, ВСЯКО ou ВСИЧКИ.',
    en: 'Choose the correct generalizing pronoun: ВСЕКИ, ВСЯКА, ВСЯКО or ВСИЧКИ.',
    fa: 'ضمیر تعمیمی صحیح را انتخاب کنید: ВСЕКИ، ВСЯКА، ВСЯКО یا ВСИЧКИ.',
    uk: 'Оберіть правильний узагальнюючий займенник: ВСЕКИ, ВСЯКА, ВСЯКО або ВСИЧКИ.',
    ru: 'Выберите правильное обобщающее местоимение: ВСЕКИ, ВСЯКА, ВСЯКО или ВСИЧКИ.',
  },

  'a2.ex.vaprositelniDumi': {
    bg: 'Изберете правилната въпросителна дума.',
    ar: 'اختر كلمة الاستفهام الصحيحة.',
    fr: 'Choisissez le mot interrogatif correct.',
    en: 'Choose the correct question word.',
    fa: 'کلمه پرسشی صحیح را انتخاب کنید.',
    uk: 'Оберіть правильне питальне слово.',
    ru: 'Выберите правильное вопросительное слово.',
  },

  // ── a2-lesson-03 „На гости" ──────────────────────────────────────────────

  'a2.gr.l03.timeExpr': {
    bg: 'Запознайте се с времевите изрази за бъдеще.',
    ar: 'تعرّف على التعبيرات الزمنية المستقبلية.',
    fr: 'Découvrez les expressions de temps au futur.',
    en: 'Learn the future time expressions.',
    fa: 'با عبارات زمانی آینده آشنا شوید.',
    uk: 'Ознайомтеся з часовими виразами для майбутнього.',
    ru: 'Познакомьтесь с временными выражениями для будущего.',
  },

  'a2.gr.l03.future': {
    bg: 'Запознайте се с образуването на бъдеще време: ще + глагол (положително), няма да + глагол (отрицателно), ще + глагол + ли (въпросително).',
    ar: 'تعرّف على صياغة المستقبل: ще + فعل (إيجابي)، няма да + فعل (سلبي)، ще + فعل + ли (استفهامي).',
    fr: 'Découvrez la formation du futur : ще + verbe (affirmatif), няма да + verbe (négatif), ще + verbe + ли (interrogatif).',
    en: 'Learn the formation of the future tense: ще + verb (positive), няма да + verb (negative), ще + verb + ли (question).',
    fa: 'آموزش ساخت زمان آینده: ще + فعل (مثبت)، няма да + فعل (منفی)، ще + فعل + ли (سؤالی).',
    uk: 'Ознайомтеся з утворенням майбутнього часу: ще + дієслово (стверджувальне), няма да + дієслово (заперечне), ще + дієслово + ли (питальне).',
    ru: 'Познакомьтесь с образованием будущего времени: ще + глагол (положительное), няма да + глагол (отрицательное), ще + глагол + ли (вопросительное).',
  },

  'a2.gr.l03.futureSam': {
    bg: 'Запознайте се с бъдеще време на глагола „съм". Забележка: „ще бъда" = „ще съм" — двете форми са равностойни.',
    ar: 'تعرّف على المستقبل للفعل «съм» (يكون). ملاحظة: «ще бъда» = «ще съм» — الصيغتان متكافئتان.',
    fr: 'Découvrez le futur du verbe «съм» (être). Remarque : «ще бъда» = «ще съм» — les deux formes sont équivalentes.',
    en: 'Learn the future tense of the verb «съм» (to be). Note: «ще бъда» = «ще съм» — both forms are equivalent.',
    fa: 'آینده فعل «съм» (بودن) را بیاموزید. توجه: «ще бъда» = «ще съм» — هر دو شکل معادل هستند.',
    uk: 'Ознайомтеся з майбутнім часом дієслова «съм» (бути). Примітка: «ще бъда» = «ще съм» — обидві форми рівнозначні.',
    ru: 'Познакомьтесь с будущим временем глагола «съм» (быть). Примечание: «ще бъда» = «ще съм» — обе формы равнозначны.',
  },

  // ── a2-lesson-04 „Мечти и планове" ───────────────────────────────────────

  'a2.gr.l04.verbAspect': {
    bg: 'Запознайте се с разликата между несъвършен вид (повтарящо се действие) и свършен вид (еднократно бъдещо действие).',
    ar: 'تعرّف على الفرق بين الصيغة غير التامة (فعل متكرر) والصيغة التامة (فعل مستقبلي لمرة واحدة).',
    fr: 'Découvrez la différence entre l\'aspect imperfectif (action répétée) et l\'aspect perfectif (action future unique).',
    en: 'Learn the difference between imperfective aspect (repeated action) and perfective aspect (single future action).',
    fa: 'تفاوت بین جنبه ناتمام (عمل تکراری) و جنبه تمام (عمل آینده یک‌باره) را بیاموزید.',
    uk: 'Ознайомтеся з різницею між недоконаним видом (повторювана дія) і доконаним видом (одноразова майбутня дія).',
    ru: 'Познакомьтесь с разницей между несовершенным видом (повторяющееся действие) и совершенным видом (однократное будущее действие).',
  },

  'a2.gr.l04.futurePerfective': {
    bg: 'Запознайте се с бъдеще време на глаголите от свършен вид: ще + свършена форма (отида → ще отида, дойда → ще дойда).',
    ar: 'تعرّف على المستقبل للأفعال من الصيغة التامة: ще + الصيغة التامة (отида → ще отида، дойда → ще дойда).',
    fr: 'Découvrez le futur des verbes à l\'aspect perfectif : ще + forme perfective (отида → ще отида, дойда → ще дойда).',
    en: 'Learn the future tense of perfective verbs: ще + perfective form (отида → ще отида, дойда → ще дойда).',
    fa: 'آینده افعال از جنبه تمام را بیاموزید: ще + شکل تمام (отида → ще отида، дойда → ще дойда).',
    uk: 'Ознайомтеся з майбутнім часом дієслів доконаного виду: ще + доконана форма (отида → ще отида, дойда → ще дойда).',
    ru: 'Познакомьтесь с будущим временем глаголов совершенного вида: ще + совершенная форма (отида → ще отида, дойда → ще дойда).',
  },
};

import type { LessonContent } from '@/content/types';

export const content: LessonContent = {
  introduction: `В първия урок от ниво B1 ще разширите уменията си да описвате хора, предмети и места — в семейството, в магазина, в града и в природата.

Урокът включва диалози, кратки текстове и упражнения за практика.`,

  sections: [],

  dialogues: [
    {
      id: 'b1-l01-dialog-magazin',
      speakers: [
        { name: 'Мая', text: 'Тази вечер съм на имения ден и се чудя какво да облека.' },
        { name: 'Лора', text: 'Облечи черния панталон и новата светлосива блуза. Много са хубави.' },
        { name: 'Мая', text: 'Добре. Благодаря. Ще взема и тъмносивото сако, защото вечер става студено.' },
      ],
    },
  ],

  vocabulary: [
    { id: 'biv', bulgarian: 'бивш, -а, -е, -и', ttsText: 'бивш, бивша, бивше, бивши', ttsModel: 'flash', translations: { en: 'former, ex', fr: 'ancien, ex', ar: 'سابق', fa: 'سابق', ru: 'бывший', uk: 'колишній' } },
    { id: 'vyznikvam', bulgarian: 'възниквам, -аш / възникна, -еш', ttsText: 'възниквам, възникваш. възникна, възникнеш', ttsModel: 'flash', translations: { en: 'to appear', fr: 'apparaître', ar: 'ينشأ', fa: 'پدید آمدن', ru: 'возникать', uk: 'виникати' } },
    { id: 'divo-zhivotno', bulgarian: 'диво животно, диви животни', ttsModel: 'flash', translations: { en: 'wild animal, -s', fr: 'animal sauvage', ar: 'حيوان بري', fa: 'حیوان وحشی', ru: 'дикое животное', uk: 'дика тварина' } },
    { id: 'domashno-zhivotno', bulgarian: 'домашно животно, домашни животни', ttsModel: 'flash', translations: { en: 'domestic animal, -s', fr: 'animal domestique', ar: 'حيوان أليف', fa: 'حیوان اهلی', ru: 'домашнее животное', uk: 'свійська тварина' } },
    { id: 'drevny', bulgarian: 'древен, древна, -о, -и', ttsText: 'древен, древна, древно, древни', ttsModel: 'flash', translations: { en: 'ancient, old', fr: 'ancien, antique', ar: 'قديم', fa: 'باستانی', ru: 'древний', uk: 'давній' } },
    { id: 'etnografski-muzey', bulgarian: 'етнографски музей', ttsText: 'етнографски музей', ttsModel: 'flash', ttsPrompt: 'Bulgarian phrase "етнографски музей" (ethnographic museum). Read as one fluent phrase, not two separate words with a pause.', translations: { en: 'ethnographic museum', fr: 'musée ethnographique', ar: 'متحف إثنوغرافي', fa: 'موزه مردم‌شناسی', ru: 'этнографический музей', uk: 'етнографічний музей' } },
    { id: 'muzey', bulgarian: 'музей, -и', ttsText: 'музей, музеи', ttsModel: 'flash', translations: { en: 'museum, -s', fr: 'musée, musées', ar: 'متحف', fa: 'موزه', ru: 'музей, музеи', uk: 'музей, музеї' } },
    { id: 'zabelezhitelnost', bulgarian: 'забележителност, -и', ttsText: 'забележителност, забележителности', ttsModel: 'flash', translations: { en: 'landmark, -s', fr: 'site remarquable', ar: 'معلَم', fa: 'دیدنی', ru: 'достопримечательность', uk: 'визначна пам’ятка' } },
    { id: 'zashtiten', bulgarian: 'защитен, -а, -о, -и', ttsText: 'защитен, защитена, защитено, защитени', ttsModel: 'flash', translations: { en: 'protected', fr: 'protégé, -e', ar: 'محمي', fa: 'محافظت‌شده', ru: 'охраняемый', uk: 'захищений' } },
    { id: 'katerya-se', bulgarian: 'катеря се, -иш', ttsText: 'катеря се, катериш се', ttsModel: 'flash', translations: { en: 'to climb up', fr: 'grimper', ar: 'يتسلق', fa: 'بالا رفتن', ru: 'карабкаться', uk: 'видиратися' } },
    { id: 'kokoshka', bulgarian: 'кокошка, -и', ttsText: 'кокошка, кокошки', ttsModel: 'flash', translations: { en: 'hen, -s', fr: 'poule, poules', ar: 'دجاجة', fa: 'مرغ', ru: 'курица, куры', uk: 'курка, кури' } },
    { id: 'kon', bulgarian: 'кон, -е', ttsText: 'кон, конЕ', ttsModel: 'flash', ttsPrompt: 'Plural "коне": stress on "е" — ко-НЕ. Pronounce the final "е" clearly and firmly. Say "кон", then "коне", once each.', translations: { en: 'horse, -s', fr: 'cheval, chevaux', ar: 'حصان', fa: 'اسب', ru: 'конь, кони', uk: 'кінь, коні' } },
    { id: 'lyv', bulgarian: 'лъв, -ове', ttsText: 'лъв, лъвове', ttsModel: 'flash', translations: { en: 'lion, -s', fr: 'lion, lions', ar: 'أسد', fa: 'شیر', ru: 'лев, львы', uk: 'лев, леви' } },
    { id: 'magare', bulgarian: 'магаре, -та', ttsText: 'магаре, магАрета', ttsModel: 'flash', ttsPrompt: 'Plural "магарета": stress on the second "а" — ма-ГА-ре-та. Say "магаре", then "магарета", once each.', translations: { en: 'donkey, -s', fr: 'âne, ânes', ar: 'حمار', fa: 'الاغ', ru: 'осёл, ослы', uk: 'осел, осли' } },
    { id: 'maymuna', bulgarian: 'маймуна, -и', ttsText: 'маймуна, маймуни', ttsModel: 'flash', translations: { en: 'monkey, -s', fr: 'singe, singes', ar: 'قرد', fa: 'میمون', ru: 'обезьяна, обезьяны', uk: 'мавпа, мавпи' } },
    { id: 'namiram-se', bulgarian: 'намирам се, -аш', ttsText: 'намирам се, намираш се', ttsModel: 'flash', translations: { en: 'to be (situated)', fr: 'se trouver', ar: 'يقع', fa: 'واقع شدن', ru: 'находиться', uk: 'знаходитися' } },
    { id: 'naricham', bulgarian: 'наричам, -аш / нарека, наречеш', ttsText: 'наричам, наричаш. нарека, наречеш', ttsModel: 'flash', translations: { en: 'to call, to name', fr: 'appeler, nommer', ar: 'يُسمّي', fa: 'نامیدن', ru: 'называть', uk: 'називати' } },
    { id: 'naselenie', bulgarian: 'население', ttsModel: 'flash', translations: { en: 'population', fr: 'population', ar: 'سكان', fa: 'جمعیت', ru: 'население', uk: 'населення' } },
    { id: 'ovtsa', bulgarian: 'овца, -е', ttsText: 'овца, овце', ttsModel: 'flash', translations: { en: 'sheep', fr: 'mouton, brebis', ar: 'خروف', fa: 'گوسفند', ru: 'овца, овцы', uk: 'вівця, вівці' } },
    { id: 'otiva-mi', bulgarian: 'отива ми, отиват ми', ttsModel: 'flash', translations: { en: 'to suit (sb.)', fr: 'aller (à qqn)', ar: 'يناسب', fa: 'مناسب بودن', ru: 'подходить', uk: 'пасувати' } },
    { id: 'pleme', bulgarian: 'племе, -на', ttsText: 'племе, племена', ttsModel: 'flash', translations: { en: 'tribe, -s', fr: 'tribu, tribus', ar: 'قبيلة', fa: 'قبیله', ru: 'племя, племена', uk: 'плем’я, племена' } },
    { id: 'porastvam', bulgarian: 'пораствам, -аш / порасна, -еш', ttsText: 'пораствам, порастваш. порасна, пораснеш', ttsModel: 'flash', translations: { en: 'to grow', fr: 'grandir', ar: 'يكبر', fa: 'رشد کردن', ru: 'расти', uk: 'рости' } },
    { id: 'hvalya-se', bulgarian: 'хваля се, -иш / похваля се, -иш', ttsText: 'хваля се, хвалиш се. похваля се, похвалиш се', ttsModel: 'flash', translations: { en: 'to brag, to boast', fr: 'se vanter', ar: 'يفتخر', fa: 'لاف زدن', ru: 'хвалиться', uk: 'хвалитися' } },
    { id: 'priberam-se', bulgarian: 'прибирам се, -аш / прибера се, -еш', ttsText: 'прибирам се, прибираш се. прибера се, прибереш се', ttsModel: 'flash', translations: { en: 'to come home, to get home', fr: 'rentrer', ar: 'يعود إلى البيت', fa: 'به خانه برگشتن', ru: 'возвращаться домой', uk: 'повертатися додому' } },
    { id: 'ptitsa', bulgarian: 'птица, -и', ttsText: 'птица, птици', ttsModel: 'flash', translations: { en: 'bird, -s', fr: 'oiseau, oiseaux', ar: 'طائر', fa: 'پرنده', ru: 'птица, птицы', uk: 'птах, птахи' } },
    { id: 'razseyan', bulgarian: 'разсеян, -а, -о, -и', ttsText: 'разсеян, разсеяна, разсеяно, разсеяни', ttsModel: 'flash', translations: { en: 'forgetful', fr: 'distrait, -e', ar: 'شارد الذهن', fa: 'حواس‌پرت', ru: 'рассеянный', uk: 'неуважний' } },
    { id: 'rimlyanin', bulgarian: 'римлянин, римляни', ttsModel: 'flash', translations: { en: 'Roman, -s', fr: 'Romain, Romains', ar: 'روماني', fa: 'رومی', ru: 'римлянин, римляне', uk: 'римлянин, римляни' } },
    { id: 'svyrzvam', bulgarian: 'свързвам, -аш / свържа, -еш', ttsText: 'свързвам, свързваш. свържа, свържеш', ttsModel: 'flash', translations: { en: 'to connect', fr: 'connecter', ar: 'يربط', fa: 'متصل کردن', ru: 'соединять', uk: 'з\'єднувати' } },
    { id: 'skacham', bulgarian: 'скачам, -аш / скоча, -иш', ttsText: 'скачам, скачаш. скоча, скочиш', ttsModel: 'flash', translations: { en: 'to jump', fr: 'sauter', ar: 'يقفز', fa: 'پریدن', ru: 'прыгать', uk: 'стрибати' } },
    { id: 'slon', bulgarian: 'слон, -ове', ttsText: 'слон, слонове', ttsModel: 'flash', translations: { en: 'elephant, -s', fr: 'éléphant, éléphants', ar: 'فيل', fa: 'فیل', ru: 'слон, слоны', uk: 'слон, слони' } },
    { id: 'stenopis', bulgarian: 'стенопис, -и', ttsText: 'стенопис, стенописи', ttsModel: 'flash', translations: { en: 'fresco, -s', fr: 'fresque, fresques', ar: 'لوحة جدارية', fa: 'نقاشی دیواری', ru: 'фреска, фрески', uk: 'фреска, фрески' } },
    { id: 'tigyr', bulgarian: 'тигър, тигри', ttsModel: 'flash', translations: { en: 'tiger, -s', fr: 'tigre, tigres', ar: 'نمر', fa: 'ببر', ru: 'тигр, тигры', uk: 'тигр, тигри' } },
    { id: 'ferma', bulgarian: 'ферма, -и', ttsText: 'ферма, ферми', ttsModel: 'flash', translations: { en: 'farm, -s', fr: 'ferme, fermes', ar: 'مزرعة', fa: 'مزرعه', ru: 'ферма, фермы', uk: 'ферма, ферми' } },
    { id: 'yunesko', bulgarian: 'ЮНЕСКО', ttsModel: 'flash', translations: { en: 'UNESCO', fr: 'UNESCO', ar: 'اليونسكو', fa: 'یونسکو', ru: 'ЮНЕСКО', uk: 'ЮНЕСКО' } },
  ],

  grammarReference: [
    {
      id: 'b1-l01-gr-plural',
      title: {
        bg: 'Множествено число на съществителните имена',
        en: 'Plural of nouns',
        fr: 'Pluriel des noms',
        ar: 'جمع الأسماء',
        fa: 'جمع اسما',
        ru: 'Множественное число существительных',
        uk: 'Множина іменників',
      },
      content: {
        bg: `Съществителните имена имат три форми: единствено число, множествено число и бройна форма (за 2, 3, 4).

Мъжки род:
• обикновено: ресторант → ресторанти | ресторанта
• -к: крак → крака | крака
• лица: мъж → мъже | мъже (двама, трима); брат → братя; човек → хора | двама, трима, четирима души

Женски род:
• -а: ферма → ферми
• -ка: сирийка → сирийки
• нередовни: ръка → ръце; овца → овце; нощ → нощи
• без мн.ч.: захар, сол, пролет, есен, младост…

Среден род:
• -о/-е: кафе → кафета; яйце → яйца; дете → деца
• нередовни: око → очи; ухо → уши`,
        en: `Nouns have three forms: singular, plural, and count form (for 2, 3, 4).

Masculine:
• regular: ресторант → ресторанти | ресторанта
• -к: крак → крака | крака
• persons: мъж → мъже | мъже (двама, трима); брат → братя; човек → хора

Feminine:
• -a: ферма → ферми
• -ka: сирийка → сирийки
• irregular: ръка → ръце; овца → овце; нощ → нощи
• no plural: захар, сол, пролет…

Neuter:
• -o/-e: кафе → кафета; яйце → яйца; дете → деца
• irregular: око → очи; ухо → уши`,
        fr: `Les noms ont trois formes : singulier, pluriel et forme de compte (pour 2, 3, 4). Voir les exemples en bulgare dans la version bulgare.`,
        ar: `للأسماء ثلاث صيغ: المفرد والجمع وصيغة العدد (لـ 2 و3 و4). راجع الأمثلة البلغارية في النص البلغاري.`,
        fa: `اسما سه شکل دارد: مفرد، جمع و شکل شمارشی (برای ۲، ۳، ۴). مثال‌های بلغاری را در متن بلغاری ببینید.`,
        ru: `У существительных три формы: единственное число, множественное и счётная форма (для 2, 3, 4). Примеры — в болгарском тексте выше.`,
        uk: `Іменники мають три форми: однина, множина й форма для 2, 3, 4. Приклади — у болгарському тексті вище.`,
      },
    },
    {
      id: 'b1-l01-gr-article',
      title: {
        bg: 'Определителен член на съществителните имена',
        en: 'Definite article on nouns',
        fr: 'Article défini des noms',
        ar: 'أداة التعريف للأسماء',
        fa: 'حرف تعریف اسما',
        ru: 'Определённый член существительных',
        uk: 'Визначений член іменників',
      },
      content: {
        bg: `В българския език определителният член се прибавя в края на думата.

Пълен член (подлог): м.р. -ът/-ят, ж.р. -та, ср.р. -то, мн.ч. -те
Кратък член (допълнение, след предлог): м.р. -а/-я, ж.р. -та, ср.р. -то, мн.ч. -те

Примери:
Пазарът е затворен. / Отивам на пазара.
Хотелът е в центъра. / Спирам пред хотела.

Мек член -ят/-я при м.р.:
• -ТЕЛ: учителят, преподавателят
• -АР: лекарят, аптекарят
• -Й: чай → чаят, трамвай → трамваят
• +Я: денят, пътят, конят

Член не се поставя при: една баничка и един чай; това момиче; ресторант „Хепи".`,
        en: `In Bulgarian the definite article is a suffix at the end of the word.

Full form (subject): m. -ът/-ят, f. -та, n. -то, pl. -те
Short form (object, after preposition): m. -а/-я, f. -та, n. -то, pl. -те

Examples:
Пазарът е затворен. / Отивам на пазара.

Soft article -ят/-я for masculine:
-ТЕЛ, -АР, -Й → -ят, +Я groups (see Bulgarian text).`,
        fr: `En bulgare l'article défini est un suffixe. Forme pleine (sujet) / courte (complément, après préposition). Voir les exemples bulgares.`,
        ar: `في البلغارية أداة التعريف لاحقة. صيغة كاملة (فاعل) / قصيرة (مفعول به، بعد حرف جر).`,
        fa: `در بلغاری حرف تعریف پسوند است. شکل کامل (فاعل) / کوتاه (مفعول، بعد حرف اضافه).`,
        ru: `В болгарском определённый член — суффикс. Полная форма (подлежащее) / краткая (дополнение, после предлога).`,
        uk: `У болгарській мові визначений член — суфікс. Повна форма (підмет) / коротка (додаток, після прийменника).`,
      },
    },
    {
      id: 'b1-l01-gr-adjectives',
      title: {
        bg: 'Прилагателни: род, число, степенуване',
        en: 'Adjectives: gender, number, comparison',
        fr: 'Adjectifs : genre, nombre, degrés',
        ar: 'الصفات: الجنس والعدد والدرجات',
        fa: 'صفت‌ها: جنسیت، عدد، درجات',
        ru: 'Прилагательные: род, число, степени',
        uk: 'Прикметники: рід, число, ступені',
      },
      content: {
        bg: `Прилагателните се съгласуват с рода и числото на съществителното:
м.р. черен панталон, ж.р. черна блуза, ср.р. черно сако, мн.ч. черни дънки

Сравнителна степен: по- + прилагателно + от
Превъзходна степен: най- + прилагателно
Пример: София е по-голяма от Варна. София е най-голямата.

Прилагателни от държави/градове:
Ирак → иракски, иракска, иракско, иракчани
Франция → френски; Германия → немски / германски (и двете са верни)

Определителен член на прилагателните:
м.р. синият шал (подлог) / синия шал (допълнение)
ж.р. новата рокля; ср.р. червеното портмоне; мн.ч. черните дънки

Внимание! червен (red) ≠ черен (black) — различно ударение и значение.`,
        en: `Adjectives agree in gender and number with the noun.
Comparative: по- + adjective + от; superlative: най- + adjective.
Country adjectives: Ирак → иракски; France → френски; Germany → немски / германски.
Definite article on adjectives: м.р. -ият/-ия, ж.р. -та, ср.р. -то, pl. -те.`,
        fr: `Les adjectifs s'accordent en genre et en nombre. Comparatif : по-… от ; superlatif : най-….`,
        ar: `الصفات تتوافق في الجنس والعدم. المقارنة: по-… от؛ التفضيل: най-….`,
        fa: `صفت‌ها با جنسیت و عدد اسم هماهنگ‌اند. مقایسه: по-… от؛ عالی: най-….`,
        ru: `Прилагательные согласуются в роде и числе. Сравнительная: по-… от; превосходная: най-….`,
        uk: `Прикметники узгоджуються в роді й числі. Порівняльний: по-… от; найвищий: най-….`,
      },
    },
    {
      id: 'b1-l01-gr-adverbs',
      title: {
        bg: 'Степенуване на наречията',
        en: 'Comparison of adverbs',
        fr: 'Degrés des adverbes',
        ar: 'درجات الظروف',
        fa: 'درجات قیدها',
        ru: 'Степени наречий',
        uk: 'Ступені прислівників',
      },
      content: {
        bg: `Чести наречия: добре, зле, много, рано, късно, бързо, бавно, евтино, скъпо.

Сравнителна степен: по- + наречие + от
Превъзходна степен: най- + наречие

Примери:
Яна се връща по-късно от Борис. Марина се връща най-късно.
Синята блуза е по-скъпа от бялата. Лилавата е най-скъпа.

За количество понякога се ползват повече от / най-много вместо по-/най-:
Явор купува повече от Калин. Пламен купува най-много.`,
        en: `Common adverbs: добре, зле, много, рано, бързо, евтино…
Comparative: по- + adverb + от; superlative: най- + adverb.
For quantity: повече от / най-много.`,
        fr: `Adverbes courants : добре, зле, много… Comparatif : по-… от ; superlatif : най-….`,
        ar: `ظروف شائعة: добре، зле، много… المقارنة: по-… от؛ التفضيل: най-….`,
        fa: `قیدهای رایج: добре، зле، مного… مقایسه: по-… от؛ عالی: най-….`,
        ru: `Наречия: добре, зле, много… Сравнительная: по-… от; превосходная: най-….`,
        uk: `Прислівники: добре, зле, много… Порівняльний: по-… от; найвищий: най-….`,
      },
    },
  ],

  culturalNotes: [
    {
      id: 'b1-l01-culture-zhivotni',
      title: {
        bg: 'Животните в България — на село и в зоопарковете',
        en: 'Animals in Bulgaria — in the countryside and at the zoo',
        fr: 'Les animaux en Bulgarie — à la campagne et au zoo',
        ar: 'الحيوانات في بلغاريا — في الريف وحدائق الحيوان',
        fa: 'حیوانات در بلغارستان — در روستا و باغ‌وحش',
        ru: 'Животные в Болгарии — на селе и в зоопарках',
        uk: 'Тварини в Болгарії — на селі та в зоопарках',
      },
      content: {
        bg: 'В българското село и днес можете да видите коне, магарета, крави, овце, кози и кокошки. Много семейства имат и кучета или котки. В планините на България живеят кафяви мечки, вълци и лисици — те са защитени. Зоопаркове има в София, Варна, Пловдив и Стара Загора. София има голям зоопарк в южната част на града — там можете да видите слонове, лъвове, тигри, маймуни и много други диви животни.',
        en: 'In the Bulgarian countryside you can still see horses, donkeys, cows, sheep, goats and hens today. Many families also keep dogs or cats. Brown bears, wolves and foxes live in the Bulgarian mountains — they are protected species. There are zoos in Sofia, Varna, Plovdiv and Stara Zagora. Sofia’s zoo, in the south of the city, is the largest one and is home to elephants, lions, tigers, monkeys and many other wild animals.',
        fr: 'À la campagne bulgare, on peut encore voir aujourd’hui des chevaux, des ânes, des vaches, des moutons, des chèvres et des poules. De nombreuses familles ont aussi un chien ou un chat. Des ours bruns, des loups et des renards vivent dans les montagnes bulgares — ils sont protégés. Il y a des zoos à Sofia, Varna, Plovdiv et Stara Zagora. Celui de Sofia, dans le sud de la ville, est le plus grand : on peut y voir des éléphants, des lions, des tigres, des singes et bien d’autres animaux sauvages.',
        ar: 'لا تزال قرى بلغاريا تضمّ الخيول والحمير والأبقار والأغنام والماعز والدجاج، وكثير من العائلات تربّي كلابًا أو قططًا. تعيش الدببة البنية والذئاب والثعالب في الجبال البلغارية، وهي حيوانات محمية. توجد حدائق حيوان في صوفيا وفارنا وبلوفديف وستارا زاغورا. وأكبرها في جنوب صوفيا، وتضمّ فيلة وأسودًا ونمورًا وقردة وحيوانات برية أخرى كثيرة.',
        fa: 'در روستاهای بلغارستان امروز هم می‌توان اسب، الاغ، گاو، گوسفند، بز و مرغ دید. خانواده‌های بسیاری سگ یا گربه نگه می‌دارند. در کوه‌های بلغارستان خرس قهوه‌ای، گرگ و روباه زندگی می‌کنند و این حیوانات تحت حفاظت‌اند. باغ‌وحش‌هایی در صوفیه، وارنا، پلوودیف و استارا زاگورا وجود دارد. بزرگ‌ترین آن‌ها در جنوب صوفیه است و در آن می‌توانید فیل، شیر، ببر، میمون و حیوانات وحشی دیگر را ببینید.',
        ru: 'В болгарском селе и сегодня можно увидеть лошадей, ослов, коров, овец, коз и кур. Во многих семьях есть и собаки или кошки. В болгарских горах живут бурые медведи, волки и лисы — это охраняемые виды. Зоопарки есть в Софии, Варне, Пловдиве и Стара Загоре. В южной части Софии находится самый большой зоопарк страны, где можно увидеть слонов, львов, тигров, обезьян и других диких животных.',
        uk: 'У болгарському селі й сьогодні можна побачити коней, ослів, корів, овець, кіз і курей. Багато родин мають собак або котів. У болгарських горах живуть бурі ведмеді, вовки та лисиці — ці тварини під охороною. Зоопарки є в Софії, Варні, Пловдиві та Старій Загорі. Найбільший — у південній частині Софії; там можна побачити слонів, левів, тигрів, мавп та багатьох інших диких тварин.',
      },
    },
    {
      id: 'b1-l01-culture-sofia',
      title: {
        bg: 'София — столицата на България',
        en: 'Sofia — the capital of Bulgaria',
        fr: 'Sofia — la capitale de la Bulgarie',
        ar: 'صوفيا — عاصمة بلغاريا',
        fa: 'صوفیه — پایتخت بلغارستان',
        ru: 'София — столица Болгарии',
        uk: 'Софія — столиця Болгарії',
      },
      content: {
        bg: 'София е столица на България от 1879 г. и един от най-старите градове в Европа — историята ѝ е дълга над 7000 години. Градът се намира в Софийското поле, под планината Витоша, и има население от около 1 300 000 души. През вековете е носил различни имена: тракийско Сердика, средновековно Средец, а от петнадесети век — София, по името на църквата „Света София“. На гръцки „София“ означава „мъдрост“. Девизът на града е „Расте, но не старее“. Сред най-известните места са катедралата „Свети Александър Невски“, Боянската църква (паметник на ЮНЕСКО), Националният исторически музей, Археологическият музей, булевард „Витоша“, паркът пред НДК и Борисовата градина.',
        en: 'Sofia has been the capital of Bulgaria since 1879 and is one of the oldest cities in Europe, with a history of more than 7,000 years. It lies in the Sofia plain, at the foot of Mount Vitosha, and has a population of about 1,300,000. Over the centuries it has had several names: the Thracian Serdica, the medieval Sredets and, from the 15th century, Sofia, named after the church of St. Sophia. In Greek “Sofia” means “wisdom”. The city’s motto is “It grows but does not age”. The best-known sights include St. Alexander Nevsky Cathedral, the Boyana Church (a UNESCO monument), the National History Museum, the Archaeological Museum, Vitosha Boulevard, the park in front of NDK and Borisova Gradina.',
        fr: 'Sofia est la capitale de la Bulgarie depuis 1879 et l’une des villes les plus anciennes d’Europe : son histoire s’étend sur plus de 7 000 ans. Elle se trouve dans la plaine de Sofia, au pied du mont Vitocha, et compte environ 1 300 000 habitants. Au fil des siècles elle a porté plusieurs noms : la thrace Serdica, la médiévale Sredets et, depuis le XVe siècle, Sofia — du nom de l’église Sainte-Sophie. En grec, « Sofia » signifie « sagesse ». La devise de la ville est « Elle grandit, mais ne vieillit pas ». Parmi les sites célèbres : la cathédrale Alexandre-Nevski, l’église de Boyana (monument UNESCO), le musée national d’histoire et le musée ethnographique, le boulevard Vitocha, le parc devant le NDK et le jardin Borissova.',
        ar: 'صوفيا هي عاصمة بلغاريا منذ عام 1879 وإحدى أقدم مدن أوروبا، إذ يمتد تاريخها لأكثر من سبعة آلاف عام. تقع في سهل صوفيا عند سفح جبل فيتوشا، ويبلغ عدد سكانها نحو 1.300.000 نسمة. تعاقبت على المدينة عدة أسماء: «سرديكا» التراقي، و«سريديتس» في العصور الوسطى، ثم «صوفيا» من القرن الخامس عشر تيمّناً بكنيسة القديسة صوفيا. «صوفيا» باليونانية تعني «الحكمة». شعار المدينة: «تنمو ولا تشيخ». من أبرز معالمها كاتدرائية القديس ألكسندر نيفسكي، وكنيسة بويانا (موقع لليونسكو)، ومتحفا التاريخ الوطني والإثنوغرافيا، وجادة فيتوشا، والحديقة أمام قصر الثقافة (NDK)، وحديقة بوريسوفا.',
        fa: 'صوفیه از سال ۱۸۷۹ پایتخت بلغارستان است و یکی از قدیمی‌ترین شهرهای اروپا با تاریخی بیش از ۷۰۰۰ ساله. در دشت صوفیه و در دامنه کوه ویتوشا قرار دارد و حدود ۱٬۳۰۰٬۰۰۰ نفر جمعیت دارد. در گذر قرن‌ها نام‌های مختلفی داشته است: «سردیکای» تراکیایی، «سردِتس» قرون‌وسطایی، و از قرن پانزدهم «صوفیه» به نام کلیسای سنت‌سوفیا. واژه‌ی «صوفیا» در یونانی به معنای «خرد» است. شعار شهر: «رشد می‌کند اما پیر نمی‌شود». از معروف‌ترین دیدنی‌ها: کلیسای جامع الکساندر نِفسکی، کلیسای بویانا (میراث یونسکو)، موزه ملی تاریخ، موزه مردم‌شناسی، بلوار ویتوشا، پارک مقابل کاخ فرهنگ (NDK) و باغ بوریسووا.',
        ru: 'София является столицей Болгарии с 1879 года и одним из старейших городов Европы — её история насчитывает более 7000 лет. Город расположен в Софийской равнине, у подножия горы Витоша, и его население около 1 300 000 человек. На протяжении веков он носил разные имена: фракийское Сердика, средневековое Средец, а с XV века — София, по имени церкви Святой Софии. С греческого «София» — это «мудрость». Девиз города: «Растёт, но не стареет». Среди известных мест: собор Святого Александра Невского, Боянская церковь (памятник ЮНЕСКО), Национальный исторический и Этнографический музеи, бульвар Витоша, парк перед НДК и Борисов сад.',
        uk: 'Софія є столицею Болгарії з 1879 року й одне з найдавніших міст Європи — її історія налічує понад 7000 років. Місто лежить у Софійській улоговині, біля підніжжя гори Вітоша, населення — близько 1 300 000 осіб. Упродовж віків воно носило різні імена: фракійська Сердика, середньовічний Средець, а з XV століття — Софія, на честь церкви Святої Софії. З грецької «Софія» означає «мудрість». Девіз міста: «Зростає, але не старіє». Серед найвідоміших місць — собор Святого Олександра Невського, Боянська церква (пам’ятка ЮНЕСКО), Національний історичний і Етнографічний музеї, бульвар Вітоша, парк перед НДК та Борисів сад.',
      },
    },
    {
      id: 'b1-l01-culture-imen-den',
      title: {
        bg: 'Имен ден в България',
        en: 'Name day in Bulgaria',
        fr: 'La fête du prénom en Bulgarie',
        ar: 'عيد الاسم في بلغاريا',
        fa: 'روز نام در بلغارستان',
        ru: 'Именины в Болгарии',
        uk: 'Іменини в Болгарії',
      },
      content: {
        bg: 'В България освен рождения си ден празнуваме и т.нар. „имен ден“ — денят на светеца, на чието име сме кръстени. Имен ден има за повечето християнски имена: Иван, Мария, Георги, Никола, Елена и др. На имения ден гостите идват вкъщи без специална покана и носят малки подаръци или цветя. За домакините е важно да приготвят почерпка — кафе, сладко, баница или нещо приготвено за случая.',
        en: 'In Bulgaria, besides their birthday, people also celebrate their name day — the feast day of the saint they are named after. Most Christian names have a name day: Ivan, Maria, Georgi, Nikola, Elena, etc. On a name day guests come to the house without a special invitation and bring small presents or flowers. The hosts are expected to offer a treat — coffee, jam, banitsa or something prepared for the occasion.',
        fr: 'En Bulgarie, en plus de l’anniversaire, on fête aussi la « fête du prénom » — le jour du saint dont on porte le nom. La plupart des prénoms chrétiens ont leur fête : Ivan, Maria, Georgi, Nikola, Elena, etc. Ce jour-là, les invités passent à la maison sans invitation particulière et apportent un petit cadeau ou des fleurs. Les hôtes préparent toujours quelque chose : café, confiture, banitsa ou un plat fait spécialement pour l’occasion.',
        ar: 'في بلغاريا، إلى جانب عيد الميلاد، يحتفل الناس بـ «عيد الاسم» — يوم القدّيس الذي يحملون اسمه. لمعظم الأسماء المسيحية أعياد أسماء: إيفان، ماريا، غيورغي، نيكولا، إيلينا… في هذا اليوم يأتي الضيوف إلى البيت من دون دعوة خاصة، ويحضرون هدية صغيرة أو زهوراً. ومن المتوقع أن يقدّم أصحاب البيت قهوة ومربى وفطائر («بانيتسا») أو طبقاً معدّاً للمناسبة.',
        fa: 'در بلغارستان علاوه بر روز تولد، «روز نام» را هم جشن می‌گیرند — روز قدیسی که نام شخص از او گرفته شده است. بیشتر اسم‌های مسیحی روز نام دارند: ایوان، ماریا، گیورگی، نیکولا، اِلِنا و... در این روز مهمان‌ها بدون دعوت خاص به خانه می‌آیند و هدیه‌ای کوچک یا گل می‌آورند. صاحب‌خانه باید پذیرایی آماده کند: قهوه، مربا، «بانیتسا» یا غذایی که برای این مناسبت تهیه کرده است.',
        ru: 'В Болгарии, помимо дня рождения, отмечают и «именины» — день святого, в честь которого человек назван. Именины есть у большинства христианских имён: Иван, Мария, Георги, Никола, Елена и т. д. В этот день гости заходят без особого приглашения и приносят небольшие подарки или цветы. Хозяева, в свою очередь, всегда готовят угощение — кофе, варенье, баницу или специально приготовленное блюдо.',
        uk: 'У Болгарії, окрім дня народження, святкують ще й «день імені» — день святого, на честь якого названо людину. Іменини мають більшість християнських імен: Іван, Марія, Георгій, Микола, Олена тощо. У цей день гості приходять додому без окремого запрошення і приносять маленькі подарунки або квіти. Господарі завжди готують частування — каву, варення, баницю або страву, приготовлену спеціально для випадку.',
      },
    },
  ],
};

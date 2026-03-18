import type { LessonContent } from '@/content/types';

export const content: LessonContent = {
  introduction: `В третия урок ще отидем в ресторанта! Ще научите имената на популярни ястия и напитки, ще можете да поръчате храна, да попитате за цената и да платите сметката. Ще се запознаете с числата от 10 до 100, с глаголите „пия" и „ям" и ще научите как да казвате какво закусвате, обядвате и вечеряте.

Урокът включва нови думи за храни и напитки, граматика за Е-група глаголи и множествено число на съществителните, диалози от ресторанта и упражнения за практика.`,

  sections: [],

  dialogues: [
    {
      id: 'dialogue-restaurant-1',
      speakers: [
        { name: 'Сервитьор', text: 'Добър ден. Заповядайте.' },
        { name: 'Клиент', text: 'Може ли едно меню?' },
        { name: 'Сервитьор', text: 'Да, заповядайте.' },
        { name: 'Клиент', text: 'Искам една салата и едно шишче.' },
        { name: 'Сервитьор', text: 'Искате ли хляб?' },
        { name: 'Клиент', text: 'Да, една филия.' },
        { name: 'Сервитьор', text: 'Нещо за пиене?' },
        { name: 'Клиент', text: 'Не, благодаря.' },
      ],
    },
  ],

  vocabulary: [
    { id: 'agneshka-supa', bulgarian: 'агнешка супа', translations: { en: 'lamb soup', fr: "soupe d'agneau", ar: 'حساء لحم الخروف', fa: 'سوپ بره', ru: 'суп из баранины', uk: 'суп з баранини' } },
    { id: 'agneshko-meso', bulgarian: 'агнешко месо', translations: { en: 'lamb meat', fr: "viande d'agneau", ar: 'لحم خروف', fa: 'گوشت بره', ru: 'баранина', uk: 'баранина' } },
    { id: 'ayran', bulgarian: 'айран', translations: { en: 'cultured buttermilk', fr: 'airan', ar: 'عيران', fa: 'دوغ', ru: 'айран', uk: 'айран' } },
    { id: 'ako-obichate', bulgarian: 'Ако обичате!', translations: { en: 'Please!', fr: "S'il vous plaît!", ar: 'من فضلك', fa: 'اگر تمایل دارید!', ru: 'Пожалуйста!', uk: 'Будь ласка!' } },
    { id: 'arabski', bulgarian: 'арабски', translations: { en: 'Arabic', fr: 'arabe', ar: 'العربية', fa: 'عربی', ru: 'арабский', uk: 'арабський' } },
    { id: 'baklava', bulgarian: 'баклава', translations: { en: 'baklava', fr: 'baklava', ar: 'بقلاوة', fa: 'باقلوا', ru: 'баклава', uk: 'баклава' } },
    { id: 'bakshish', bulgarian: 'бакшиш', translations: { en: 'tip', fr: 'pourboire', ar: 'بقشيش، إكرامية', fa: 'انعام', ru: 'чаевые', uk: 'чайові' } },
    { id: 'bilkov-chay', bulgarian: 'билков чай', translations: { en: 'herbal tea', fr: 'tisane', ar: 'شاي عشبي', fa: 'چای گیاهی', ru: 'травяной чай', uk: "трав'яний чай" } },
    { id: 'vegetarianets', bulgarian: 'вегетарианец', translations: { en: 'vegetarian (male)', fr: 'végétarien', ar: 'نباتي', fa: 'گیاه خوار (مذکر)', ru: 'вегетарианец', uk: 'вегетаріанець' } },
    { id: 'vegetarianka', bulgarian: 'вегетарианка', translations: { en: 'vegetarian (female)', fr: 'végétarienne', ar: 'نباتية', fa: 'گیاه خوار (مونث)', ru: 'вегетарианка', uk: 'вегетаріанка' } },
    { id: 'vecher', bulgarian: 'вечер', translations: { en: 'evening', fr: 'soir', ar: 'مساء', fa: 'شب', ru: 'вечер', uk: 'вечір' } },
    { id: 'vecherya', bulgarian: 'вечеря', translations: { en: 'dinner', fr: 'dîner', ar: 'عشاء', fa: 'شام', ru: 'ужин', uk: 'вечеря' } },
    { id: 'vecheryam', bulgarian: 'вечерям, -яш', translations: { en: 'to have dinner', fr: 'dîner (verbe)', ar: 'أتعشى', fa: 'شام خوردن', ru: 'ужинать', uk: 'вечеряти' } },
    { id: 'gazirana-voda', bulgarian: 'газирана вода', translations: { en: 'carbonated water', fr: 'eau gazeuse', ar: 'ماء غازي', fa: 'آب گازدار', ru: 'газированная вода', uk: 'газована вода' } },
    { id: 'gospodine', bulgarian: 'господине', translations: { en: 'Sir', fr: 'monsieur', ar: 'سيدي', fa: 'آقا', ru: 'господин', uk: 'пане' } },
    { id: 'gospozho', bulgarian: 'госпожо', translations: { en: 'Madam', fr: 'Madame', ar: 'سيدتي', fa: 'خانم', ru: 'госпожа', uk: 'пані' } },
    { id: 'gradina', bulgarian: 'градина', translations: { en: 'garden', fr: 'jardin', ar: 'حديقة', fa: 'باغ', ru: 'сад', uk: 'сад' } },
    { id: 'desert', bulgarian: 'десерт', translations: { en: 'dessert', fr: 'dessert', ar: 'حلوى', fa: 'دسر', ru: 'десерт', uk: 'десерт' } },
    { id: 'dalgo-kafe', bulgarian: 'дълго кафе', translations: { en: 'weak coffee (more water)', fr: 'café long', ar: 'قهوة خفيفة كثيرة الماء', fa: 'قهوه رقیق', ru: 'длинный кофе (американо)', uk: 'довга кава (американо)' } },
    { id: 'za', bulgarian: 'за', translations: { en: 'for', fr: 'pour', ar: 'لـ (للتخصيص)', fa: 'برای', ru: 'для', uk: 'для' } },
    { id: 'zaeto', bulgarian: 'заето', translations: { en: 'taken (seat)', fr: 'occupé', ar: 'مشغول', fa: 'مشغول', ru: 'занято', uk: 'зайнято' } },
    { id: 'zakusvam', bulgarian: 'закусвам, -аш', translations: { en: 'to have breakfast', fr: 'prendre le petit déjeuner', ar: 'أفطر', fa: 'صبحانه خوردن', ru: 'завтракать', uk: 'снідати' } },
    { id: 'zakuska', bulgarian: 'закуска', translations: { en: 'breakfast', fr: 'petit déjeuner', ar: 'فطور', fa: 'صبحانه', ru: 'завтрак', uk: 'сніданок' } },
    { id: 'zapovyadayte', bulgarian: 'Заповядайте!', translations: { en: 'Here you are! Please!', fr: 'Voilà', ar: 'تفضلوا!', fa: 'بفرمائید!', ru: 'Пожалуйста! Вот!', uk: 'Будь ласка! Ось!' } },
    { id: 'zelena-salata', bulgarian: 'зелена салата', translations: { en: 'green salad', fr: 'salade verte', ar: 'سلطة خضراء', fa: 'سالاد کاهو', ru: 'зелёный салат', uk: 'зелений салат' } },
    { id: 'izvinete', bulgarian: 'Извинете!', translations: { en: 'Excuse me! Sorry!', fr: 'Excusez-moi!', ar: 'عفوا', fa: 'ببخشید', ru: 'Извините!', uk: 'Вибачте!' } },
    { id: 'kadaif', bulgarian: 'кадаиф', translations: { en: 'Turkish syrup-soaked shredded sweet', fr: 'Kadaïf', ar: 'قطائف', fa: 'شیرینی ترکی از رشته', ru: 'кадаиф', uk: 'кадаїф' } },
    { id: 'kazvam-se', bulgarian: 'казвам се, -аш', translations: { en: 'to be called', fr: "s'appeler", ar: 'اسمي', fa: 'اسم من', ru: 'меня зовут', uk: 'мене звати' } },
    { id: 'kakao', bulgarian: 'какао', translations: { en: 'cacao', fr: 'cacao', ar: 'كاكاو', fa: 'کاکائو', ru: 'какао', uk: 'какао' } },
    { id: 'kebap', bulgarian: 'кебап', translations: { en: 'stewed meat with rice', fr: 'ragoût', ar: 'كباب حلة مع الرز', fa: 'کباب', ru: 'кебаб (тушёное мясо с рисом)', uk: 'кебаб (тушковане м\'ясо з рисом)' } },
    { id: 'kebapche', bulgarian: 'кебапче', translations: { en: 'grilled oblong rissole', fr: 'cylindres de viande hachée grillés', ar: 'كفتة مستطيلة', fa: 'کبابچه', ru: 'кебапче (жареная котлета)', uk: 'кебапче (смажена котлета)' } },
    { id: 'kolko-struva', bulgarian: 'Колко струва?', translations: { en: 'How much is it?', fr: "C'est combien?", ar: 'كم سعر...؟', fa: 'چقدر میشه؟', ru: 'Сколько стоит?', uk: 'Скільки коштує?' } },
    { id: 'krem-karamel', bulgarian: 'крем-карамел', translations: { en: 'crème caramel', fr: 'crème caramel', ar: 'كريم كراميل', fa: 'کرم کارامل', ru: 'крем-карамель', uk: 'крем-карамель' } },
    { id: 'kremsupa', bulgarian: 'кремсупа', translations: { en: 'cream soup', fr: 'soupe crème', ar: 'شوربة كريم', fa: 'سوپ خامه', ru: 'крем-суп', uk: 'крем-суп' } },
    { id: 'kuso-kafe', bulgarian: 'късо кафе', translations: { en: 'strong coffee (less water)', fr: 'café court', ar: 'قهوة ثقيلة قليلة الماء', fa: 'قهوه غلیظ', ru: 'короткий кофе (эспрессо)', uk: 'коротка кава (еспресо)' } },
    { id: 'kyufte', bulgarian: 'кюфте', translations: { en: 'meat ball', fr: 'boulette de viande hachée', ar: 'كفتة مستديرة', fa: 'کوفته', ru: 'кюфте (тефтеля)', uk: 'кюфте (тефтеля)' } },
    { id: 'lev', bulgarian: 'лев', translations: { en: 'lev (Bulgarian currency)', fr: 'lev', ar: 'ليف (العملة البلغارية)', fa: 'لو (واحد پول بلغارستان)', ru: 'лев (болгарская валюта)', uk: 'лев (болгарська валюта)' } },
    { id: 'leshta', bulgarian: 'леща', translations: { en: 'lentils', fr: 'lentilles', ar: 'عدس', fa: 'عدس', ru: 'чечевица', uk: 'сочевиця' } },
    { id: 'makaroni', bulgarian: 'макарони', translations: { en: 'macaroni', fr: 'macaroni', ar: 'معكرونة', fa: 'ماکارونی', ru: 'макароны', uk: 'макарони' } },
    { id: 'menyu', bulgarian: 'меню', translations: { en: 'menu', fr: 'menu', ar: 'قائمة طعام', fa: 'منو', ru: 'меню', uk: 'меню' } },
    { id: 'meso', bulgarian: 'месо', translations: { en: 'meat', fr: 'viande', ar: 'لحم', fa: 'گوشت', ru: 'мясо', uk: "м'ясо" } },
    { id: 'mineralna-voda', bulgarian: 'минерална вода', translations: { en: 'mineral water', fr: 'eau minérale', ar: 'ماء معدني', fa: 'آب معدنی', ru: 'минеральная вода', uk: 'мінеральна вода' } },
    { id: 'mlyako-s-oriz', bulgarian: 'мляко с ориз', translations: { en: 'rice pudding', fr: 'riz au lait', ar: 'رز بالحليب', fa: 'شیر برنج', ru: 'рисовый пудинг', uk: 'рисовий пудинг' } },
    { id: 'mnogo', bulgarian: 'много', translations: { en: 'many, a lot of', fr: 'beaucoup', ar: 'كثير (من)', fa: 'خیلی', ru: 'много', uk: 'багато' } },
    { id: 'mozhe-li', bulgarian: 'Може ли?', translations: { en: 'May I? Can you?', fr: 'Permettez-moi', ar: 'هل يمكنني؟', fa: 'میشه؟', ru: 'Можно?', uk: 'Можна?' } },
    { id: 'molya', bulgarian: 'Моля!', translations: { en: "Please! You're welcome!", fr: "S'il vous plaît!", ar: 'عفوا!', fa: 'لطفا!', ru: 'Пожалуйста!', uk: 'Будь ласка!' } },
    { id: 'musaka', bulgarian: 'мусака', translations: { en: 'meat-and-vegetable hash', fr: 'moussaka', ar: 'المسقعة', fa: 'موساکا', ru: 'мусака', uk: 'мусака' } },
    { id: 'na-furna', bulgarian: 'на фурна', translations: { en: 'baked', fr: 'cuit au four', ar: 'مشوي', fa: 'پخته شده در فر', ru: 'запечённый', uk: 'запечений' } },
    { id: 'neshto', bulgarian: 'нещо', translations: { en: 'something', fr: 'quelque chose', ar: 'شيء', fa: 'چیزی', ru: 'что-то', uk: 'щось' } },
    { id: 'obed', bulgarian: 'обед', translations: { en: 'midday', fr: 'midi', ar: 'الظُهر', fa: 'ظهر', ru: 'полдень', uk: 'полудень' } },
    { id: 'obiad', bulgarian: 'обяд', translations: { en: 'lunch', fr: 'déjeuner', ar: 'غداء', fa: 'ناهار', ru: 'обед', uk: 'обід' } },
    { id: 'obiadvam', bulgarian: 'обядвам, -аш', translations: { en: 'to have lunch', fr: 'prendre le déjeuner', ar: 'أتغدى', fa: 'ناهار خوردن', ru: 'обедать', uk: 'обідати' } },
    { id: 'omlet', bulgarian: 'омлет', translations: { en: 'omelette', fr: 'omelette', ar: 'عجّة', fa: 'املت', ru: 'омлет', uk: 'омлет' } },
    { id: 'osnovni-yastia', bulgarian: 'основни ястия', translations: { en: 'main dishes', fr: 'plats principaux', ar: 'المأكولات الرئيسية', fa: 'غذای اصلی', ru: 'основные блюда', uk: 'основні страви' } },
    { id: 'pechena-riba', bulgarian: 'печена риба', translations: { en: 'baked fish', fr: 'poisson grillé', ar: 'سمك مشوي', fa: 'ماهی کبابی', ru: 'запечённая рыба', uk: 'запечена риба' } },
    { id: 'piene', bulgarian: 'пиене', translations: { en: 'drinking, drinks', fr: 'à boire (boissons)', ar: 'شرب؛ مشروبات', fa: 'نوشیدنی', ru: 'напитки, питьё', uk: 'напої, пиття' } },
    { id: 'pile-s-oriz', bulgarian: 'пиле с ориз', translations: { en: 'chicken and rice', fr: 'poulet avec du riz', ar: 'دجاج بالرز', fa: 'برنج با مرغ', ru: 'курица с рисом', uk: 'курка з рисом' } },
    { id: 'pileshka-supa', bulgarian: 'пилешка супа', translations: { en: 'chicken soup', fr: 'soupe de poulet', ar: 'حساء دجاج', fa: 'سوپ مرغ', ru: 'куриный суп', uk: 'курячий суп' } },
    { id: 'pileshka-yahnia', bulgarian: 'пилешка яхния', translations: { en: 'chicken stew', fr: 'ragoût de poulet', ar: 'يخنة دجاج', fa: 'خورشت مرغ', ru: 'куриное рагу', uk: 'курячий гуляш' } },
    { id: 'piya', bulgarian: 'пия, -еш', translations: { en: 'to drink', fr: 'boire', ar: 'أشرب', fa: 'نوشیدن', ru: 'пить', uk: 'пити' } },
    { id: 'plashtam', bulgarian: 'плащам, -аш', translations: { en: 'to pay', fr: 'payer', ar: 'أدفع', fa: 'پرداخت کردن', ru: 'платить', uk: 'платити' } },
    { id: 'pusheneto-zabraneno', bulgarian: 'Пушенето забранено!', translations: { en: 'No smoking!', fr: 'Interdit de fumer!', ar: 'ممنوع التدخين!', fa: 'سیگار کشیدن ممنوع!', ru: 'Курение запрещено!', uk: 'Курити заборонено!' } },
    { id: 'palnena-chushka', bulgarian: 'пълнена чушка', translations: { en: 'stuffed pepper', fr: 'poivron farci', ar: 'فلفل محشي', fa: 'فلفل دلمه ای پر شده', ru: 'фаршированный перец', uk: 'фарширований перець' } },
    { id: 'parzhena-riba', bulgarian: 'пържена риба', translations: { en: 'fried fish', fr: 'poisson frit', ar: 'سمك مقلي', fa: 'ماهی سرخ شده', ru: 'жареная рыба', uk: 'смажена риба' } },
    { id: 'parzheni-kartofi', bulgarian: 'пържени картофи', translations: { en: 'chips, French fries', fr: 'frites', ar: 'بطاطا مقلية', fa: 'سیب زمینی سرخ کرده', ru: 'картофель фри', uk: 'картопля фрі' } },
    { id: 'razbira-se', bulgarian: 'Разбира се!', translations: { en: 'Of course!', fr: 'Bien sûr!', ar: 'طبعا!', fa: 'البته!', ru: 'Конечно!', uk: 'Звичайно!' } },
    { id: 'restorant', bulgarian: 'ресторант', translations: { en: 'restaurant', fr: 'restaurant', ar: 'مطعم', fa: 'رستوران', ru: 'ресторан', uk: 'ресторан' } },
    { id: 'riba', bulgarian: 'риба', translations: { en: 'fish', fr: 'poisson', ar: 'سمك', fa: 'ماهی', ru: 'рыба', uk: 'риба' } },
    { id: 'salata', bulgarian: 'салата', translations: { en: 'salad', fr: 'salade', ar: 'سلطة', fa: 'سالاد', ru: 'салат', uk: 'салат' } },
    { id: 'salata-snezhanka', bulgarian: 'салата „Снежанка"', translations: { en: '"Snow White" salad (yoghurt and cucumber)', fr: 'salade au fromage blanc et concombres', ar: 'سلطة الزبادي والخيار', fa: 'سالاد از ماست چکیده و خیار', ru: 'салат «Снежанка» (йогурт с огурцом)', uk: 'салат «Снежанка» (йогурт з огірком)' } },
    { id: 'svinsko', bulgarian: 'свинско', translations: { en: 'pork', fr: 'porc', ar: 'لحم خنزير', fa: 'گوشت خوک', ru: 'свинина', uk: 'свинина' } },
    { id: 'svobodno', bulgarian: 'свободно', translations: { en: 'free (seat)', fr: 'libre', ar: 'فارغ، شاغر', fa: 'آزاد', ru: 'свободно', uk: 'вільно' } },
    { id: 'skara', bulgarian: 'скара', translations: { en: 'grilled meat', fr: 'grillades', ar: 'شوّاية', fa: 'کباب پز', ru: 'гриль', uk: 'гриль' } },
    { id: 'sladoled', bulgarian: 'сладолед', translations: { en: 'ice cream', fr: 'crème glacée', ar: 'بوظة', fa: 'بستنی', ru: 'мороженое', uk: 'морозиво' } },
    { id: 'smetana', bulgarian: 'сметана', translations: { en: 'creamer', fr: 'crème', ar: 'قشطة', fa: 'خامه', ru: 'сливки', uk: 'вершки' } },
    { id: 'smetkata', bulgarian: 'сметката', translations: { en: 'the bill', fr: "l'addition", ar: 'الحساب، الفاتورة', fa: 'صورتحساب', ru: 'счёт', uk: 'рахунок' } },
    { id: 'stotinka', bulgarian: 'стотинка', translations: { en: 'stotinka (cent)', fr: 'stotinka (centimes)', ar: 'ستوتينكا', fa: 'پول خرد بلغاری', ru: 'стотинка', uk: 'стотинка' } },
    { id: 'studeni-napitki', bulgarian: 'студени напитки', translations: { en: 'cold drinks', fr: 'boissons fraîches', ar: 'مشروبات باردة', fa: 'نوشیدنی سرد', ru: 'холодные напитки', uk: 'холодні напої' } },
    { id: 'supa', bulgarian: 'супа', translations: { en: 'soup', fr: 'soupe', ar: 'حساء', fa: 'سوپ', ru: 'суп', uk: 'суп' } },
    { id: 'sutrin', bulgarian: 'сутрин', translations: { en: 'morning', fr: 'matin', ar: 'صباح', fa: 'صبح', ru: 'утро', uk: 'ранок' } },
    { id: 'sazhalyavam', bulgarian: 'Съжалявам!', translations: { en: 'Sorry!', fr: 'Désolé(e)!', ar: 'آسف/آسفة', fa: 'متاسفم!', ru: 'Извините!', uk: 'Вибачте!' } },
    { id: 'tarator', bulgarian: 'таратор', translations: { en: 'cold yoghurt and cucumber soup', fr: 'soupe de yaourt et concombres', ar: 'حساء بارد من الزبادي والخيار', fa: 'سوپ سرد ماست و خیار', ru: 'таратор (холодный суп)', uk: 'таратор (холодний суп)' } },
    { id: 'topli-napitki', bulgarian: 'топли напитки', translations: { en: 'hot drinks', fr: 'boissons chaudes', ar: 'مشروبات حارة', fa: 'نوشیدنی گرم', ru: 'горячие напитки', uk: 'гарячі напої' } },
    { id: 'torta', bulgarian: 'торта', translations: { en: 'cake', fr: 'tarte', ar: 'كعكة', fa: 'کیک خامه ای', ru: 'торт', uk: 'торт' } },
    { id: 'tuk', bulgarian: 'тук', translations: { en: 'here', fr: 'ici', ar: 'هنا', fa: 'اینجا', ru: 'тут, здесь', uk: 'тут' } },
    { id: 'humus', bulgarian: 'хумус', translations: { en: 'hummus', fr: 'houmous', ar: 'حمص بالطحينة', fa: 'هوموس', ru: 'хумус', uk: 'хумус' } },
    { id: 'tsena', bulgarian: 'цена', translations: { en: 'price', fr: 'prix', ar: 'سعر', fa: 'قیمت', ru: 'цена', uk: 'ціна' } },
    { id: 'tsigara', bulgarian: 'цигара, -и', translations: { en: 'cigarette, -s', fr: 'cigarette, cigarettes', ar: 'سجارة، سجائر', fa: 'سیگار', ru: 'сигарета, -ы', uk: 'цигарка, -и' } },
    { id: 'cheren-chay', bulgarian: 'черен чай', translations: { en: 'black tea', fr: 'thé noir', ar: 'شاي أسود', fa: 'چای سیاه', ru: 'чёрный чай', uk: 'чорний чай' } },
    { id: 'shish-shishche', bulgarian: 'шиш, шишче', translations: { en: 'shish kebab', fr: 'brochette de viande', ar: 'شيش كباب', fa: 'کباب سیخی', ru: 'шашлык', uk: 'шашлик' } },
    { id: 'shopska-salata', bulgarian: 'шопска салата', translations: { en: 'Shopska salad', fr: 'salade aux tomates, concombres et fromage', ar: 'سلطة شوبسكا', fa: 'سالاد شوپسکا', ru: 'шопский салат', uk: 'шопський салат' } },
    { id: 'yadene', bulgarian: 'ядене', translations: { en: 'eating, meal', fr: 'repas', ar: 'أكلة؛ وجبة', fa: 'خوردنی', ru: 'еда', uk: 'їжа' } },
    { id: 'yam', bulgarian: 'ям, ядеш', translations: { en: 'to eat', fr: 'manger', ar: 'آكل', fa: 'خوردن', ru: 'есть', uk: 'їсти' } },
  ],

  culturalNotes: [
    {
      id: 'bread-fruit',
      title: {
        bg: 'Хляб и плодове',
        en: 'Bread and Fruit',
        fr: 'Pain et fruits',
        ar: 'الخبز والفاكهة',
        fa: 'نان و میوه',
        ru: 'Хлеб и фрукты',
        uk: 'Хліб і фрукти',
      },
      content: {
        bg: 'Българите ядат много хляб, обикновено от пшеница. Плодовете се ядат предимно за десерт.',
        en: 'Bulgarians eat a lot of bread, usually made of wheat. Bulgarians eat fruit mostly for dessert.',
        fr: 'Les Bulgares mangent beaucoup de pain, généralement fait de blé. Les Bulgares mangent des fruits principalement en dessert.',
        ar: 'يأكل البلغار الكثير من الخبز، وعادة ما يكون مصنوعاً من القمح. يأكل البلغار الفاكهة في الغالب كحلوى.',
        fa: 'بلغارها نان زیادی می\u200Cخورند که معمولاً از گندم تهیه می\u200Cشود. بلغارها میوه را بیشتر به عنوان دسر می\u200Cخورند.',
        ru: 'Болгары едят много хлеба, обычно из пшеницы. Фрукты болгары едят преимущественно на десерт.',
        uk: 'Болгари їдять багато хліба, зазвичай із пшениці. Фрукти болгари їдять переважно на десерт.',
      },
    },
    {
      id: 'tipping',
      title: {
        bg: 'Бакшиш',
        en: 'Tipping',
        fr: 'Pourboire',
        ar: 'البقشيش',
        fa: 'انعام',
        ru: 'Чаевые',
        uk: 'Чайові',
      },
      content: {
        bg: 'Оставянето на бакшиш на сервитьори в ресторантите напоследък става все по-обичайно, но няма установено правило колко и кога. Типична практика е сметката да се закръгли нагоре — до 10% от общата сума. Ако не сте доволни от обслужването, можете да не оставяте бакшиш. Понякога бакшишът е включен в сметката — тогава се нарича „сервиз" или „процент за обслужване" и е упоменат в менюто.',
        en: 'Tipping waiters in restaurants is getting more common recently but there is no set rule as to how much and when. A typical practice is to round up the bill and it can be up to 10% of the total. If you are not satisfied with the service, you can skip the tip. Sometimes the tip is included in the bill. Then it is called сервиз or процент за обслужване – service percentage, and is mentioned in the menu.',
        fr: "Laisser un pourboire aux serveurs dans les restaurants devient de plus en plus courant, mais il n'y a pas de règle fixe quant au montant et au moment. La pratique habituelle est d'arrondir l'addition, jusqu'à 10 % du total. Si vous n'êtes pas satisfait du service, vous pouvez ne pas laisser de pourboire. Parfois le pourboire est inclus dans l'addition — on l'appelle alors « сервиз » ou « процент за обслужване » (pourcentage de service), et c'est mentionné dans le menu.",
        ar: 'أصبح إعطاء البقشيش للنادلين في المطاعم أكثر شيوعاً مؤخراً، لكن لا توجد قاعدة محددة بشأن المبلغ والوقت. الممارسة المعتادة هي تقريب الفاتورة إلى أعلى، ويمكن أن تصل إلى ١٠٪ من المجموع. إذا لم تكن راضياً عن الخدمة، يمكنك عدم ترك بقشيش. أحياناً يكون البقشيش مشمولاً في الفاتورة — يُسمى حينها «سервиз» أو «процент за обслужване» (نسبة الخدمة) ويُذكر في قائمة الطعام.',
        fa: 'دادن انعام به پیشخدمت\u200Cها در رستوران\u200Cها اخیراً رایج\u200Cتر شده است، اما قاعده مشخصی درباره مبلغ و زمان وجود ندارد. عمل معمول این است که صورتحساب را رُند کنید — تا ۱۰٪ از مبلغ کل. اگر از خدمات راضی نیستید، می\u200Cتوانید انعام ندهید. گاهی انعام در صورتحساب گنجانده شده است — در این صورت «сервиз» یا «процент за обслужване» (درصد خدمات) نامیده می\u200Cشود و در منو ذکر شده است.',
        ru: 'Чаевые официантам в ресторанах становятся всё более распространёнными, но установленного правила нет. Обычная практика — округлить счёт в большую сторону, до 10% от общей суммы. Если вы недовольны обслуживанием, чаевые можно не оставлять. Иногда чаевые включены в счёт — тогда это называется «сервиз» или «процент за обслужване» (процент за обслуживание) и указывается в меню.',
        uk: 'Чайові офіціантам у ресторанах стають дедалі поширенішими, але встановленого правила немає. Звичайна практика — округлити рахунок у більшу сторону, до 10% від загальної суми. Якщо ви незадоволені обслуговуванням, можете не залишати чайові. Іноді чайові включені в рахунок — тоді це називається «сервиз» або «процент за обслужване» (відсоток за обслуговування) і зазначається в меню.',
      },
    },
    {
      id: 'restrooms',
      title: {
        bg: 'Тоалетни',
        en: 'Restrooms',
        fr: 'Toilettes',
        ar: 'دورات المياه',
        fa: 'سرویس بهداشتی',
        ru: 'Туалеты',
        uk: 'Туалети',
      },
      content: {
        bg: 'В ресторанти и кафенета клиентите обикновено не плащат за ползване на тоалетната. Тази практика се среща в малко заведения — предимно на жп гари, автогари и подобни места.',
        en: 'In restaurants and cafes, customers normally do not pay for using the restroom. This practice is preserved in few restaurants and mostly in railway stations, bus stations, etc.',
        fr: "Dans les restaurants et les cafés, les clients ne paient généralement pas pour utiliser les toilettes. Cette pratique ne subsiste que dans quelques établissements, principalement dans les gares ferroviaires, les gares routières, etc.",
        ar: 'في المطاعم والمقاهي، لا يدفع الزبائن عادةً مقابل استخدام دورة المياه. هذه الممارسة موجودة في عدد قليل من المطاعم وبشكل رئيسي في محطات القطار ومحطات الحافلات وما إلى ذلك.',
        fa: 'در رستوران\u200Cها و کافه\u200Cها، مشتریان معمولاً برای استفاده از سرویس بهداشتی هزینه\u200Cای نمی\u200Cپردازند. این عمل در تعداد کمی از مکان\u200Cها حفظ شده، بیشتر در ایستگاه\u200Cهای قطار، ایستگاه\u200Cهای اتوبوس و مانند آن.',
        ru: 'В ресторанах и кафе клиенты обычно не платят за пользование туалетом. Эта практика сохранилась лишь в немногих заведениях — преимущественно на вокзалах, автовокзалах и т.д.',
        uk: "У ресторанах та кав'ярнях клієнти зазвичай не платять за користування туалетом. Ця практика збереглася лише в окремих закладах — переважно на залізничних вокзалах, автостанціях тощо.",
      },
    },
    {
      id: 'music-smoking',
      title: {
        bg: 'Музика и пушене',
        en: 'Music and Smoking',
        fr: 'Musique et tabac',
        ar: 'الموسيقى والتدخين',
        fa: 'موسیقی و سیگار',
        ru: 'Музыка и курение',
        uk: 'Музика і куріння',
      },
      content: {
        bg: 'Музиката в ресторантите и кафенетата може да бъде доста силна. Пушенето е забранено във всички закрити обществени места, включително ресторанти и кафенета.',
        en: 'Music at restaurants and cafes could be quite loud. Smoking is forbidden in all public indoor areas, including restaurants and cafes.',
        fr: 'La musique dans les restaurants et les cafés peut être assez forte. Il est interdit de fumer dans tous les lieux publics fermés, y compris les restaurants et les cafés.',
        ar: 'قد تكون الموسيقى في المطاعم والمقاهي صاخبة جداً. التدخين ممنوع في جميع الأماكن العامة المغلقة، بما في ذلك المطاعم والمقاهي.',
        fa: 'موسیقی در رستوران\u200Cها و کافه\u200Cها ممکن است بسیار بلند باشد. سیگار کشیدن در تمام فضاهای عمومی سرپوشیده از جمله رستوران\u200Cها و کافه\u200Cها ممنوع است.',
        ru: 'Музыка в ресторанах и кафе может быть довольно громкой. Курение запрещено во всех закрытых общественных местах, включая рестораны и кафе.',
        uk: "Музика в ресторанах та кав'ярнях може бути досить гучною. Куріння заборонено в усіх закритих громадських місцях, включаючи ресторани та кав'ярні.",
      },
    },
    {
      id: 'social-dining',
      title: {
        bg: 'Ресторантът — социално събитие',
        en: 'Restaurant as a Social Event',
        fr: 'Le restaurant — un événement social',
        ar: 'المطعم — حدث اجتماعي',
        fa: 'رستوران — رویدادی اجتماعی',
        ru: 'Ресторан — социальное событие',
        uk: 'Ресторан — соціальна подія',
      },
      content: {
        bg: 'Когато българите отидат в ресторант, прекарват доста дълго време там — по няколко часа. Посещението на ресторант е по-скоро социално събитие, отколкото просто начин да се нахраниш.',
        en: 'When Bulgarians go to a restaurant, they spend quite a long time there – several hours. Going to a restaurant is more of a social event than just a way to get a meal.',
        fr: "Quand les Bulgares vont au restaurant, ils y passent assez longtemps — plusieurs heures. Aller au restaurant est davantage un événement social qu'un simple moyen de se nourrir.",
        ar: 'عندما يذهب البلغار إلى المطعم، يقضون وقتاً طويلاً هناك — عدة ساعات. الذهاب إلى المطعم هو حدث اجتماعي أكثر من مجرد وسيلة لتناول الطعام.',
        fa: 'وقتی بلغارها به رستوران می\u200Cروند، وقت زیادی را آنجا می\u200Cگذرانند — چندین ساعت. رفتن به رستوران بیشتر یک رویداد اجتماعی است تا صرفاً راهی برای غذا خوردن.',
        ru: 'Когда болгары идут в ресторан, они проводят там довольно много времени — несколько часов. Поход в ресторан — это скорее социальное событие, чем просто способ поесть.',
        uk: 'Коли болгари йдуть до ресторану, вони проводять там досить багато часу — кілька годин. Похід до ресторану — це швидше соціальна подія, ніж просто спосіб поїсти.',
      },
    },
    {
      id: 'restaurant-types',
      title: {
        bg: 'Видове заведения',
        en: 'Types of Restaurants',
        fr: "Types d'établissements",
        ar: 'أنواع المطاعم',
        fa: 'انواع رستوران\u200Cها',
        ru: 'Виды заведений',
        uk: 'Види закладів',
      },
      content: {
        bg: 'В България има различни видове ресторанти и кафенета: механа — сервира предимно български национални ястия; пицария — италианска кухня и салати; закусвалня — различни видове сандвичи и тестени изделия; сладкарница — торти и други сладкиши. Има много етнически ресторанти (особено в големите градове) — китайските ресторанти са много популярни. Има и много местни и международни вериги за бързо хранене — Happy, McDonald\'s, Dunkin Donuts, KFC и др.',
        en: 'There are different kinds of restaurants and cafes: механа – Tavern – which serves mainly Bulgarian national dishes; пицария – Pizzeria – Italian cuisine and salads; закусвалня – Snack bar – different kinds of sandwiches and pastry; сладкарница – Confectionery – cakes and other sweet things. There are a lot of ethnic restaurants (especially in big cities) – Chinese restaurants are very popular. There are many local and international fast-food chains – Happy, McDonald\'s, Dunkin Donuts, KFC, etc.',
        fr: "Il existe différents types de restaurants et de cafés : механа (taverne) — qui sert principalement des plats nationaux bulgares ; пицария (pizzeria) — cuisine italienne et salades ; закусвалня (snack-bar) — différents types de sandwichs et de pâtisseries ; сладкарница (confiserie) — gâteaux et autres sucreries. Il y a beaucoup de restaurants ethniques (surtout dans les grandes villes) — les restaurants chinois sont très populaires. Il y a aussi de nombreuses chaînes de restauration rapide locales et internationales — Happy, McDonald's, Dunkin Donuts, KFC, etc.",
        ar: 'هناك أنواع مختلفة من المطاعم والمقاهي: механа (حانة) — تقدم أساساً الأطباق الوطنية البلغارية؛ пицария (مطعم بيتزا) — المطبخ الإيطالي والسلطات؛ закусвалня (مطعم وجبات خفيفة) — أنواع مختلفة من الشطائر والمعجنات؛ сладкарница (محل حلويات) — الكعك والحلويات الأخرى. هناك كثير من المطاعم العرقية (خاصة في المدن الكبيرة) — المطاعم الصينية شائعة جداً. وهناك العديد من سلاسل الوجبات السريعة المحلية والدولية — Happy وMcDonald\'s وDunkin Donuts وKFC وغيرها.',
        fa: 'انواع مختلفی از رستوران\u200Cها و کافه\u200Cها وجود دارد: механа (میخانه) — عمدتاً غذاهای ملی بلغاری سرو می\u200Cکند؛ пицария (پیتزافروشی) — غذاهای ایتالیایی و سالاد؛ закусвалня (اغذیه\u200Cفروشی) — انواع ساندویچ و شیرینی؛ сладкарница (شیرینی\u200Cفروشی) — کیک و شیرینی\u200Cجات. رستوران\u200Cهای قومی زیادی وجود دارد (به\u200Cویژه در شهرهای بزرگ) — رستوران\u200Cهای چینی بسیار محبوب هستند. همچنین زنجیره\u200Cهای فست\u200Cفود محلی و بین\u200Cالمللی زیادی وجود دارد — Happy، McDonald\'s، Dunkin Donuts، KFC و غیره.',
        ru: 'В Болгарии есть разные виды ресторанов и кафе: механа (таверна) — подаёт в основном болгарские национальные блюда; пицария (пиццерия) — итальянская кухня и салаты; закусвалня (закусочная) — различные виды сандвичей и выпечки; сладкарница (кондитерская) — торты и другие сладости. Много этнических ресторанов (особенно в больших городах) — китайские рестораны очень популярны. Есть также много местных и международных сетей быстрого питания — Happy, McDonald\'s, Dunkin Donuts, KFC и др.',
        uk: "В Болгарії є різні види ресторанів та кав'ярень: механа (таверна) — подає переважно болгарські національні страви; пицария (піцерія) — італійська кухня та салати; закусвалня (закусочна) — різні види сандвічів та випічки; сладкарница (кондитерська) — торти та інші солодощі. Є багато етнічних ресторанів (особливо у великих містах) — китайські ресторани дуже популярні. Також є багато місцевих та міжнародних мереж швидкого харчування — Happy, McDonald's, Dunkin Donuts, KFC тощо.",
      },
    },
    {
      id: 'cuisine-overview',
      title: {
        bg: 'Българска кухня',
        en: 'Bulgarian Cuisine',
        fr: 'Cuisine bulgare',
        ar: 'المطبخ البلغاري',
        fa: 'آشپزی بلغاری',
        ru: 'Болгарская кухня',
        uk: 'Болгарська кухня',
      },
      content: {
        bg: 'Българската кухня е представител на кухнята на Югоизточна Европа с турски и гръцки влияния, но има и уникални елементи. Известна е с богатите си салати, задължителни за всяко хранене, с разнообразието и качеството на млечните продукти и с многобройните видове супи. Има и много различни български тестени изделия, като баница.',
        en: 'Bulgarian cuisine is a representative of the cuisine of Southeastern Europe with some Turkish and Greek influences, but it has some unique elements. Famous for its rich salads required at every meal, Bulgarian cuisine is also noted for the diversity and quality of dairy products and the variety of soups. There are many different Bulgarian pastries as well such as баница.',
        fr: "La cuisine bulgare est représentative de la cuisine de l'Europe du Sud-Est avec des influences turques et grecques, mais elle possède des éléments uniques. Célèbre pour ses riches salades indispensables à chaque repas, la cuisine bulgare se distingue aussi par la diversité et la qualité des produits laitiers et la variété des soupes. Il y a aussi de nombreuses pâtisseries bulgares, comme la баница.",
        ar: 'المطبخ البلغاري يمثل مطبخ جنوب شرق أوروبا مع بعض التأثيرات التركية واليونانية، لكن له عناصر فريدة. يشتهر بسلطاته الغنية المطلوبة في كل وجبة، ويتميز أيضاً بتنوع وجودة منتجات الألبان وتنوع الحساء. هناك أيضاً العديد من المعجنات البلغارية المختلفة مثل البانيتسا (баница).',
        fa: 'آشپزی بلغاری نماینده آشپزی جنوب شرقی اروپا با تأثیرات ترکی و یونانی است، اما عناصر منحصربه\u200Cفردی نیز دارد. این آشپزی به سالادهای غنی\u200Cاش که در هر وعده غذایی ضروری هستند شهرت دارد و همچنین به تنوع و کیفیت محصولات لبنی و انواع سوپ\u200Cها مشهور است. شیرینی\u200Cهای بلغاری متنوعی نیز وجود دارد، مانند بانیتسا (баница).',
        ru: 'Болгарская кухня — представитель кухни Юго-Восточной Европы с турецким и греческим влиянием, но обладает уникальными элементами. Известна богатыми салатами, обязательными для каждого приёма пищи, а также разнообразием и качеством молочных продуктов и множеством видов супов. Есть и много различных болгарских выпечек, таких как баница.',
        uk: "Болгарська кухня є представником кухні Південно-Східної Європи з турецькими та грецькими впливами, але має й унікальні елементи. Відома багатими салатами, обов'язковими для кожного прийому їжі, а також різноманіттям і якістю молочних продуктів та безліччю видів супів. Є також багато різних болгарських випічок, як-от баниця.",
      },
    },
    {
      id: 'shopska-salad',
      title: {
        bg: 'Шопска салата',
        en: 'Shopska Salad',
        fr: 'Salade Shopska',
        ar: 'سلطة شوبسكا',
        fa: 'سالاد شوپسکا',
        ru: 'Шопский салат',
        uk: 'Шопський салат',
      },
      content: {
        bg: 'Най-популярната българска салата е шопската салата — смес от домати, краставици, лук, сурви или печени чушки и бяло сирене. Традиционно се подправя само със сол, слънчогледово или зехтин и оцет.',
        en: 'The most popular Bulgarian salad is the шопска салата, which is a mix of tomatoes, cucumbers, onion, raw or roasted peppers, and white cheese. Traditionally it is dressed only with salt, sunflower or olive oil and vinegar.',
        fr: "La salade la plus populaire en Bulgarie est la шопска салата — un mélange de tomates, concombres, oignons, poivrons crus ou grillés et fromage blanc. Traditionnellement, elle est assaisonnée uniquement avec du sel, de l'huile de tournesol ou d'olive et du vinaigre.",
        ar: 'أشهر سلطة بلغارية هي سلطة شوبسكا (шопска салата) — وهي خليط من الطماطم والخيار والبصل والفلفل النيء أو المشوي والجبن الأبيض. تُتبّل تقليدياً فقط بالملح وزيت عباد الشمس أو زيت الزيتون والخل.',
        fa: 'محبوب\u200Cترین سالاد بلغاری، سالاد شوپسکا (шопска салата) است — ترکیبی از گوجه\u200Cفرنگی، خیار، پیاز، فلفل خام یا کبابی و پنیر سفید. به\u200Cطور سنتی فقط با نمک، روغن آفتابگردان یا زیتون و سرکه چاشنی می\u200Cشود.',
        ru: 'Самый популярный болгарский салат — шопский салат (шопска салата), представляющий собой смесь помидоров, огурцов, лука, сырого или запечённого перца и белого сыра. Традиционно заправляется только солью, подсолнечным или оливковым маслом и уксусом.',
        uk: 'Найпопулярніший болгарський салат — шопський салат (шопска салата), що являє собою суміш помідорів, огірків, цибулі, сирого або печеного перцю та білого сиру. Традиційно заправляється лише сіллю, соняшниковою або оливковою олією та оцтом.',
      },
    },
    {
      id: 'main-dishes',
      title: {
        bg: 'Основни ястия',
        en: 'Main Dishes',
        fr: 'Plats principaux',
        ar: 'الأطباق الرئيسية',
        fa: 'غذاهای اصلی',
        ru: 'Основные блюда',
        uk: 'Основні страви',
      },
      content: {
        bg: 'Като основно ястие може да опитате мусака (богато ястие от картофи, кайма и бял сос, печено във фурна), гювеч (зеленчуково ястие с месо, готвено в глинен съд), сарми (руло от лозови или зелеви листа), дроб-сарма (агнешки дроб с ориз), кавърма (месо с домати), миш-маш (пържени чушки, лук и яйца), кебапче и кюфте (пикантни месни наденици и кюфтета на скара).',
        en: 'As a main course you can have мусака (a rich oven-baked dish of potatoes, minced meat and white sauce), гювеч (vegetable casserole with meat cooked in a clay pot), сарми (rolls with vine or cabbage leaves), дроб-сарма (lamb liver and lung with rice), кавърма (meat with tomatoes), миш-маш (fried peppers, onion and eggs), кебапче and кюфте (spicy grilled meat sausage and meatballs).',
        fr: "En plat principal, vous pouvez goûter la мусака (un plat riche de pommes de terre, viande hachée et sauce blanche, cuit au four), le гювеч (ragoût de légumes et viande cuit dans un pot en terre), les сарми (rouleaux de feuilles de vigne ou de chou), le дроб-сарма (foie et poumon d'agneau avec du riz), le кавърма (viande aux tomates), le миш-маш (poivrons frits, oignon et œufs), le кебапче et le кюфте (saucisse de viande épicée grillée et boulettes de viande).",
        ar: 'كطبق رئيسي يمكنك تذوق المسقعة — мусака (طبق غني من البطاطس واللحم المفروم والصلصة البيضاء المخبوزة في الفرن)، والغيوفيتش — гювеч (طاجن خضروات مع لحم مطبوخ في إناء فخاري)، والسارمي — сарми (لفائف من أوراق العنب أو الملفوف)، ودروب سارما — дроб-сарма (كبد ورئة خروف مع الأرز)، وكافورما — кавърма (لحم بالطماطم)، وميش ماش — миш-маш (فلفل مقلي مع بصل وبيض)، وكباپچه — кебапче وكيوفته — кюфте (نقانق لحم متبلة مشوية وكرات لحم).',
        fa: 'به عنوان غذای اصلی می\u200Cتوانید موساکا — мусака (غذای غنی از سیب\u200Cزمینی، گوشت چرخ\u200Cکرده و سس سفید پخته\u200Cشده در فر)، گیووچ — гювеч (خوراک سبزیجات با گوشت پخته\u200Cشده در ظرف سفالی)، سارمی — сарми (رول\u200Cهای برگ مو یا کلم)، دروب سارما — дроб-сарма (جگر و ریه بره با برنج)، کاوورما — кавърма (گوشت با گوجه\u200Cفرنگی)، میش\u200Cماش — миш-маш (فلفل سرخ\u200Cشده، پیاز و تخم\u200Cمرغ)، کباپچه — кебапче و کیوفته — кюфте (سوسیس و کوفته تند کبابی) را بچشید.',
        ru: 'В качестве основного блюда можно попробовать мусаку (запеканку из картофеля, фарша и белого соуса), гювеч (овощное рагу с мясом в глиняном горшке), сарми (голубцы из виноградных или капустных листьев), дроб-сарму (бараньи потроха с рисом), кавърму (мясо с помидорами), миш-маш (жареный перец, лук и яйца), кебапче и кюфте (острые жареные мясные колбаски и тефтели на гриле).',
        uk: "Як основну страву можна скуштувати мусаку (запіканку з картоплі, фаршу та білого соусу), гювеч (овочеве рагу з м'ясом у глиняному горщику), сарми (голубці з виноградного або капустяного листя), дроб-сарму (баранячі потрухи з рисом), кавирму (м'ясо з помідорами), міш-маш (смажений перець, цибулю та яйця), кебапче і кюфте (гострі смажені м'ясні ковбаски та тефтелі на грилі).",
      },
    },
    {
      id: 'lyutenitsa',
      title: {
        bg: 'Лютеница',
        en: 'Lyutenitsa',
        fr: 'Lioutenitsa',
        ar: 'اللوتينيتسا',
        fa: 'لیوتنیتسا',
        ru: 'Лютеница',
        uk: 'Лютениця',
      },
      content: {
        bg: 'Не бива да пропуснете и лютеницата — пюре от червени чушки, патладжан и домати, което обикновено се яде с хляб.',
        en: 'Another thing not to be missed in Bulgaria is the лютеница, which is a red pepper, eggplant, and tomato purée, normally eaten on bread.',
        fr: 'Une autre chose à ne pas manquer en Bulgarie est la лютеница — une purée de poivrons rouges, d\'aubergine et de tomates, qui se mange habituellement sur du pain.',
        ar: 'من الأشياء الأخرى التي لا ينبغي تفويتها في بلغاريا هي اللوتينيتسا (лютеница) — وهي هريس من الفلفل الأحمر والباذنجان والطماطم، وعادة ما تؤكل مع الخبز.',
        fa: 'چیز دیگری که نباید در بلغارستان از دست داد، لیوتنیتسا (лютеница) است — پوره\u200Cای از فلفل قرمز، بادمجان و گوجه\u200Cفرنگی که معمولاً با نان خورده می\u200Cشود.',
        ru: 'Ещё одно блюдо, которое нельзя пропустить в Болгарии, — лютеница, пюре из красного перца, баклажана и помидоров, которое обычно едят с хлебом.',
        uk: 'Ще одна страва, яку не можна пропустити в Болгарії, — лютениця, пюре з червоного перцю, баклажана та помідорів, яке зазвичай їдять із хлібом.',
      },
    },
    {
      id: 'beverages',
      title: {
        bg: 'Напитки и вода',
        en: 'Beverages and Water',
        fr: 'Boissons et eau',
        ar: 'المشروبات والمياه',
        fa: 'نوشیدنی\u200Cها و آب',
        ru: 'Напитки и вода',
        uk: 'Напої та вода',
      },
      content: {
        bg: 'Вино, бира и ракия (гроздова или сливова) са най-популярните алкохолни напитки в страната. Водата от чешмата в България обикновено е безопасна за пиене, а натуралната минерална вода е евтина и широко достъпна.',
        en: 'Wine, beer and ракия – grape or plum brandy, are the most popular alcoholic beverages in the country. Tap water in Bulgaria is usually safe to drink and natural mineral water is also cheap and widely available.',
        fr: "Le vin, la bière et la ракия (eau-de-vie de raisin ou de prune) sont les boissons alcoolisées les plus populaires du pays. L'eau du robinet en Bulgarie est généralement potable, et l'eau minérale naturelle est aussi bon marché et largement disponible.",
        ar: 'النبيذ والبيرة والراكيا (ракия) — براندي العنب أو البرقوق — هي أكثر المشروبات الكحولية شعبية في البلاد. ماء الصنبور في بلغاريا آمن للشرب عادةً، والمياه المعدنية الطبيعية رخيصة ومتوفرة على نطاق واسع.',
        fa: 'شراب، آبجو و راکیا (ракия) — عرق انگور یا آلو — محبوب\u200Cترین نوشیدنی\u200Cهای الکلی کشور هستند. آب لوله\u200Cکشی در بلغارستان معمولاً برای نوشیدن بی\u200Cخطر است و آب معدنی طبیعی نیز ارزان و به\u200Cراحتی در دسترس است.',
        ru: 'Вино, пиво и ракия (виноградная или сливовая) — самые популярные алкогольные напитки в стране. Водопроводная вода в Болгарии обычно безопасна для питья, а натуральная минеральная вода дешёвая и широко доступна.',
        uk: 'Вино, пиво та ракія (виноградна або сливова) — найпопулярніші алкогольні напої в країні. Водопровідна вода в Болгарії зазвичай безпечна для пиття, а натуральна мінеральна вода дешева та широко доступна.',
      },
    },
    {
      id: 'currency-payment',
      title: {
        bg: 'Валута и плащане',
        en: 'Currency and Payment',
        fr: 'Monnaie et paiement',
        ar: 'العملة والدفع',
        fa: 'ارز و پرداخت',
        ru: 'Валюта и оплата',
        uk: 'Валюта та оплата',
      },
      content: {
        bg: 'Българската парична единица е левът, съставен от сто стотинки. Левът е фиксиран към еврото в съотношение 1,95 лева за едно евро. Магазините и другите бизнеси в България обикновено не приемат чуждестранна валута. В големите градове кредитните карти се приемат навсякъде, а в селските райони хората плащат само в брой.',
        en: 'The Bulgarian unit of currency is лев, comprised of one hundred стотинки. The Lev is pegged to the Euro at 1.95 Lev for one Euro. Shopkeepers and other businesses in Bulgaria will usually not accept foreign money. In major cities, credit cards are generally accepted, in rural areas people pay cash only.',
        fr: "L'unité monétaire bulgare est le лев, composé de cent стотинки. Le Lev est indexé sur l'Euro au taux de 1,95 Lev pour un Euro. Les commerçants et autres entreprises en Bulgarie n'acceptent généralement pas la monnaie étrangère. Dans les grandes villes, les cartes de crédit sont généralement acceptées ; dans les zones rurales, on paie uniquement en espèces.",
        ar: 'وحدة العملة البلغارية هي الليف (лев)، وتتألف من مئة ستوتينكا (стотинки). الليف مربوط باليورو بمعدل ١٫٩٥ ليف لكل يورو واحد. لا يقبل أصحاب المحلات والشركات في بلغاريا عادةً العملات الأجنبية. في المدن الكبرى تُقبل بطاقات الائتمان بشكل عام، بينما في المناطق الريفية يدفع الناس نقداً فقط.',
        fa: 'واحد پول بلغارستان لِو (лев) است که از صد استوتینکا (стотинки) تشکیل شده است. لو به یورو با نرخ ۱٫۹۵ لو برای هر یورو ثابت شده است. مغازه\u200Cداران و سایر کسب\u200Cوکارها در بلغارستان معمولاً پول خارجی قبول نمی\u200Cکنند. در شهرهای بزرگ، کارت\u200Cهای اعتباری عموماً پذیرفته می\u200Cشوند؛ در مناطق روستایی مردم فقط نقدی پرداخت می\u200Cکنند.',
        ru: 'Денежная единица Болгарии — лев, состоящий из ста стотинок. Лев привязан к евро по курсу 1,95 лева за один евро. Магазины и другие предприятия в Болгарии обычно не принимают иностранную валюту. В крупных городах кредитные карты принимаются повсеместно, а в сельской местности платят только наличными.',
        uk: "Грошова одиниця Болгарії — лев, що складається зі ста стотинок. Лев прив'язаний до євро за курсом 1,95 лева за одне євро. Магазини та інші підприємства в Болгарії зазвичай не приймають іноземну валюту. У великих містах кредитні картки приймають повсюдно, а в сільській місцевості платять лише готівкою.",
      },
    },
  ],

  grammarReference: [
    {
      id: 'numbers-10-100',
      title: {
        bg: 'Бройни числителни 10–100',
        en: 'Cardinal Numerals 10–100',
        fr: 'Nombres cardinaux 10–100',
        ar: 'أسماء الأعداد ١٠–١٠٠',
        fa: 'اعداد شمارشی ۱۰–۱۰۰',
        ru: 'Количественные числительные 10–100',
        uk: 'Кількісні числівники 10–100',
      },
      content: {
        bg: `Числата от 11 до 19 се образуват с наставка -НАДЕСЕТ. В разговорна реч се използва съкратената форма -НАЙСЕТ:

11 единадесет (единайсет)    12 дванадесет (дванайсет)
13 тринадесет (тринайсет)    14 четиринадесет (четиринайсет)
15 петнадесет (петнайсет)    16 шестнадесет (шестнайсет)
17 седемнадесет (седемнайсет) 18 осемнадесет (осемнайсет)
19 деветнадесет (деветнайсет)

Десетици:
10 десет    20 двадесет (двайсет)    30 тридесет (трийсет)
40 четиридесет (четирийсет)  50 петдесет
60 шестдесет (шейсет)        70 седемдесет
80 осемдесет                 90 деветдесет     100 сто

Съставни числа се образуват с „и": 21 = двадесет и едно, 35 = тридесет и пет, 99 = деветдесет и девет.

Мъжки род неодушевени имена имат специална бройна форма с -А/-Я след числа, КОЛКО и НЯКОЛКО: два лева, колко лева, няколко стола.

За мъжки род лица (2–4) се използват специални форми: двама студенти, трима лекари, четирима мъже.`,
        en: `Numbers 11–19 are formed with the suffix -НАДЕСЕТ. In colloquial speech, the shortened form -НАЙСЕТ is used:

11 единадесет (единайсет)    12 дванадесет (дванайсет)
13 тринадесет (тринайсет)    14 четиринадесет (четиринайсет)
15 петнадесет (петнайсет)    16 шестнадесет (шестнайсет)
17 седемнадесет (седемнайсет) 18 осемнадесет (осемнайсет)
19 деветнадесет (деветнайсет)

Tens:
10 десет    20 двадесет (двайсет)    30 тридесет (трийсет)
40 четиридесет (четирийсет)  50 петдесет
60 шестдесет (шейсет)        70 седемдесет
80 осемдесет                 90 деветдесет     100 сто

Compound numbers use "и" (and): 21 = двадесет и едно, 35 = тридесет и пет.

Masculine nouns for non-persons have a special count plural form used after cardinal numbers, КОЛКО and НЯКОЛКО: два лева, колко лева, няколко стола.

There are special forms of cardinal numerals 2–4 ending in -(И)МА, used only with masculine nouns referring to people: двама студенти, трима лекари, четирима мъже.`,
        fr: `Les nombres de 11 à 19 sont formés avec le suffixe -НАДЕСЕТ. Dans la langue parlée, on utilise la forme abrégée -НАЙСЕТ :

11 единадесет (единайсет)    12 дванадесет (дванайсет)
13 тринадесет (тринайсет)    14 четиринадесет (четиринайсет)
15 петнадесет (петнайсет)    16 шестнадесет (шестнайсет)
17 седемнадесет (седемнайсет) 18 осемнадесет (осемнайсет)
19 деветнадесет (деветнайсет)

Les dizaines :
10 десет    20 двадесет (двайсет)    30 тридесет (трийсет)
40 четиридесет (четирийсет)  50 петдесет
60 шестдесет (шейсет)        70 седемдесет
80 осемдесет                 90 деветдесет     100 сто

Les nombres composés utilisent « и » (et) : 21 = двадесет и едно, 35 = тридесет и пет.

Les noms au masculin qui ne désignent pas des personnes ont une forme spécifique, nommée forme numérale cardinale, utilisée après les adjectifs numéraux, КОЛКО et НЯКОЛКО : два лева, колко лева, няколко стола.

Les nombres cardinaux de 2 à 4 ont une forme spéciale terminant en -(И)МА, utilisée uniquement pour des noms au masculin désignant des personnes : двама студенти, трима лекари, четирима мъже.`,
        ar: `الأعداد من ١١ إلى ١٩ تتكوّن بإضافة -НАДЕСЕТ. وفي الكلام العامي تُستخدم الصيغة المختصرة -НАЙСЕТ:

11 единадесет (единайсет)    12 дванадесет (дванайсет)
13 тринадесет (тринайсет)    14 четиринадесет (четиринайсет)
15 петнадесет (петнайсет)    16 шестнадесет (шестнайсет)
17 седемнадесет (седемнайсет) 18 осемнадесет (осемнайсет)
19 деветнадесет (деветнайсет)

العشرات:
10 десет    20 двадесет (двайсет)    30 тридесет (трийсет)
40 четиридесет (четирийсет)  50 петдесет
60 шестдесет (шейсет)        70 седемдесет
80 осемдесет                 90 деветдесет     100 сто

الأعداد المركّبة تُستخدم مع «и» (و): 21 = двадесет и едно، 35 = тридесет и пет.

الأسماء المذكّرة الدالّة على غير الأشخاص (الحيوان والنبات والجماد) لها صيغة جمع خاصة تُسمّى صيغة العدّ، وتُستخدم هذه الصيغة مع أسماء الأعداد واسم الاستفهام КОЛКО واسم العدد غير المحدد НЯКОЛКО:
два лева، колко лева، няколко стола

أسماء الأعداد اثنان وثلاثة وأربعة لها صيغة خاصة تنتهي بـ -(И)МА وتُستخدم مع أسماء مذكرة تدلّ على أشخاص فقط:
двама студенти، трима лекари، четирима мъже`,
        fa: `اعداد ۱۱ تا ۱۹ با پسوند -НАДЕСЕТ ساخته می\u200Cشوند. در زبان محاوره از شکل کوتاه -НАЙСЕТ استفاده می\u200Cشود:

11 единадесет (единайсет)    12 дванадесет (дванайсет)
13 тринадесет (тринайсет)    14 четиринадесет (четиринайсет)
15 петнадесет (петнайсет)    16 шестнадесет (шестнайсет)
17 седемнадесет (седемнайсет) 18 осемнадесет (осемнайсет)
19 деветнадесет (деветнайсет)

دهگان:
10 десет    20 двадесет (двайсет)    30 тридесет (трийсет)
40 четиридесет (четирийсет)  50 петдесет
60 шестдесет (шейсет)        70 седемдесет
80 осемдесет                 90 деветдесет     100 сто

اعداد ترکیبی با «и» (و) ساخته می\u200Cشوند: 21 = двадесет и едно، 35 = тридесет и пет.

اسامی مذکر برای اشیاء (غیر افراد) فرم مخصوصی دارند که به آن فرم شمارشی می\u200Cگویند و بعد از اعداد شمارشی، КОЛКО و НЯКОЛКО استفاده می\u200Cشود:
два лева، колко лева، няколко стола

اعداد شمارشی ۲ تا ۴ فرم مخصوصی با پایانه -(И)МА دارند که فقط برای اسامی مذکر افراد بکار می\u200Cروند:
двама студенти، трима лекари، четирима мъже`,
        ru: `Числа 11–19 образуются с суффиксом -НАДЕСЕТ. В разговорной речи используется сокращённая форма -НАЙСЕТ:

11 единадесет (единайсет)    12 дванадесет (дванайсет)
13 тринадесет (тринайсет)    14 четиринадесет (четиринайсет)
15 петнадесет (петнайсет)    16 шестнадесет (шестнайсет)
17 седемнадесет (седемнайсет) 18 осемнадесет (осемнайсет)
19 деветнадесет (деветнайсет)

Десятки:
10 десет    20 двадесет (двайсет)    30 тридесет (трийсет)
40 четиридесет (четирийсет)  50 петдесет
60 шестдесет (шейсет)        70 седемдесет
80 осемдесет                 90 деветдесет     100 сто

Составные числа образуются с «и» (и): 21 = двадесет и едно, 35 = тридесет и пет.

Существительные мужского рода, обозначающие неодушевлённые предметы, имеют особую счётную форму с -А/-Я, которая используется после числительных, КОЛКО и НЯКОЛКО: два лева, колко лева, няколко стола.

Числительные 2–4 имеют особые формы на -(И)МА, которые используются только с существительными мужского рода, обозначающими людей: двама студенти, трима лекари, четирима мъже.`,
        uk: `Числа 11–19 утворюються за допомогою суфікса -НАДЕСЕТ. У розмовній мові використовується скорочена форма -НАЙСЕТ:

11 единадесет (единайсет)    12 дванадесет (дванайсет)
13 тринадесет (тринайсет)    14 четиринадесет (четиринайсет)
15 петнадесет (петнайсет)    16 шестнадесет (шестнайсет)
17 седемнадесет (седемнайсет) 18 осемнадесет (осемнайсет)
19 деветнадесет (деветнайсет)

Десятки:
10 десет    20 двадесет (двайсет)    30 тридесет (трийсет)
40 четиридесет (четирийсет)  50 петдесет
60 шестдесет (шейсет)        70 седемдесет
80 осемдесет                 90 деветдесет     100 сто

Складені числа утворюються з «и» (і): 21 = двадесет и едно, 35 = тридесет и пет.

Іменники чоловічого роду, що позначають неістоти, мають особливу лічильну форму з -А/-Я, яка вживається після числівників, КОЛКО та НЯКОЛКО: два лева, колко лева, няколко стола.

Числівники 2–4 мають особливі форми на -(И)МА, які вживаються лише з іменниками чоловічого роду на позначення людей: двама студенти, трима лекари, четирима мъже.`,
      },
    },
    {
      id: 'e-group-verbs',
      title: {
        bg: 'Сегашно време – Е-група (пия, ям)',
        en: 'Present Tense – E-group Verbs (пия, ям)',
        fr: 'Le présent – Verbes du groupe E (пия, ям)',
        ar: 'الفعل المضارع – فئة E (пия، ям)',
        fa: 'زمان حال – افعال گروه E (пия، ям)',
        ru: 'Настоящее время – Е-группа (пия, ям)',
        uk: 'Теперішній час – Е-група (пия, ям)',
      },
      content: {
        bg: `В българския език глаголите в сегашно време се делят на три групи: А/Я група, Е-група и И-група. В Урок 3 се запознаваме с Е-групата.

Повечето глаголи от Е-групата завършват на гласна + Я в 1-во лице единствено число.

Глагол ПИЯ (to drink):
  (+) аз пия, ти пиеш, той/тя/то пие, ние пием, вие пиете, те пият
  (–) не пия, не пиеш, не пие, не пием, не пиете, не пият
  (?) пия ли, пиеш ли, пие ли, пием ли, пиете ли, пият ли

Глагол ЯМ (to eat) — изключение, неправилен:
  (+) аз ям, ти ядеш, той/тя/то яде, ние ядем, вие ядете, те ядат
  (–) не ям, не ядеш, не яде, не ядем, не ядете, не ядат

Свързани глаголи от А/Я-група: закусвам (ям закуска), обядвам (ям обяд), вечерям (ям вечеря).

Други глаголи от Е-група: желая, зная/знам, играя, мечтая, мия (се), мога, пея, пиша, чета.`,
        en: `In Bulgarian, present tense verbs are divided into three conjugation groups: A/Я group, E group, and И group. In Lesson 3, we learn the E group (1st conjugation).

Many E-group verbs end in a vowel + Я in 1st person singular.

Verb ПИЯ (to drink):
  (+) аз пия, ти пиеш, той/тя/то пие, ние пием, вие пиете, те пият
  (–) не пия, не пиеш, не пие, не пием, не пиете, не пият
  (?) пия ли, пиеш ли, пие ли, пием ли, пиете ли, пият ли

Verb ЯМ (to eat) — exception, irregular:
  (+) аз ям, ти ядеш, той/тя/то яде, ние ядем, вие ядете, те ядат
  (–) не ям, не ядеш, не яде, не ядем, не ядете, не ядат

Related A/Я-group verbs: закусвам (have breakfast), обядвам (have lunch), вечерям (have dinner).

Other E-group verbs: желая, зная/знам, играя, мечтая, мия (се), мога, пея, пиша, чета.`,
        fr: `En bulgare, les verbes au présent se répartissent en trois groupes de conjugaison : le groupe A/Я (3ème groupe), le groupe E (1er groupe) et le groupe И (2ème groupe). Dans la Leçon 3, nous apprenons le groupe E.

Une grande partie des verbes du groupe E se terminent par une voyelle + Я à la 1ère personne du singulier.

Verbe ПИЯ (boire) :
  (+) аз пия, ти пиеш, той/тя/то пие, ние пием, вие пиете, те пият
  (–) не пия, не пиеш, не пие, не пием, не пиете, не пият
  (?) пия ли, пиеш ли, пие ли, пием ли, пиете ли, пият ли

Verbe ЯМ (manger) — exception, irrégulier :
  (+) аз ям, ти ядеш, той/тя/то яде, ние ядем, вие ядете, те ядат
  (–) не ям, не ядеш, не яде, не ядем, не ядете, не ядат

Verbes liés du groupe A/Я : закусвам (prendre le petit déjeuner), обядвам (déjeuner), вечерям (dîner).

Autres verbes du groupe E : желая, зная/знам, играя, мечтая, мия (се), мога, пея, пиша, чета.`,
        ar: `في اللغة البلغارية، ينقسم الفعل المضارع إلى ثلاث فئات حسب التصريف: فئة А/Я (التصريف الثالث)، فئة Е (التصريف الأول) وفئة И (التصريف الثاني). في الدرس الثالث نتعلم فئة Е.

جزء كبير من أفعال فئة Е تنتهي صيغتها للمتكلم المفرد بصوت صائت + Я.

فعل ПИЯ (أشرب):
  (+) аз пия، ти пиеш، той/тя/то пие، ние пием، вие пиете، те пият
  (–) не пия، не пиеш، не пие، не пием، не пиете، не пият
  (?) пия ли، пиеш ли، пие ли، пием ли، пиете ли، пият ли

فعل ЯМ (آكل) — استثناء، غير منتظم:
  (+) аз ям، ти ядеш، той/тя/то яде، ние ядем، вие ядете، те ядат
  (–) не ям، не ядеш، не яде، не ядем، не ядете، не ядат

أفعال مرتبطة من فئة А/Я: закусвам (أفطر)، обядвам (أتغدى)، вечерям (أتعشى).

أفعال أخرى من فئة Е: желая، зная/знам، играя، мечтая، мия (се)، мога، пея، пиша، чета.`,
        fa: `در زبان بلغاری، افعال در زمان حال به سه گروه تقسیم می\u200Cشوند: گروه A/Я (گروه سوم)، گروه E (گروه اول) و گروه И (گروه دوم). در درس سوم با گروه E آشنا می\u200Cشویم.

اکثر افعال گروه E در حالت اول شخص مفرد با حرف صدادار + Я ختم می\u200Cشوند.

فعل ПИЯ (نوشیدن):
  (+) аз пия، ти пиеш، той/тя/то пие، ние пием، вие пиете، те пият
  (–) не пия، не пиеш، не пие، не пием، не пиете، не пият
  (?) пия ли، пиеш ли، пие ли، пием ли، пиете ли، пият ли

فعل ЯМ (خوردن) — استثناء، نامنظم:
  (+) аз ям، ти ядеш، той/тя/то яде، ние ядем، вие ядете، те ядат
  (–) не ям، не ядеш، не яде، не ядем، не ядете، не ядат

افعال مرتبط از گروه А/Я: закусвам (صبحانه خوردن)، обядвам (ناهار خوردن)، вечерям (شام خوردن).

سایر افعال گروه E: желая، зная/знам، играя، мечтая، мия (се)، мога، пея، пиша، чета.`,
        ru: `В болгарском языке глаголы в настоящем времени делятся на три группы спряжения: А/Я-группа (3-е спряжение), Е-группа (1-е спряжение) и И-группа (2-е спряжение). В Уроке 3 изучаем Е-группу.

Большинство глаголов Е-группы оканчиваются на гласный + Я в 1-м лице единственного числа.

Глагол ПИЯ (пить):
  (+) аз пия, ти пиеш, той/тя/то пие, ние пием, вие пиете, те пият
  (–) не пия, не пиеш, не пие, не пием, не пиете, не пият
  (?) пия ли, пиеш ли, пие ли, пием ли, пиете ли, пият ли

Глагол ЯМ (есть) — исключение, неправильный:
  (+) аз ям, ти ядеш, той/тя/то яде, ние ядем, вие ядете, те ядат
  (–) не ям, не ядеш, не яде, не ядем, не ядете, не ядат

Связанные глаголы А/Я-группы: закусвам (завтракать), обядвам (обедать), вечерям (ужинать).

Другие глаголы Е-группы: желая, зная/знам, играя, мечтая, мия (се), мога, пея, пиша, чета.`,
        uk: `У болгарській мові дієслова в теперішньому часі поділяються на три групи відмінювання: А/Я-група (3-тя відміна), Е-група (1-ша відміна) та И-група (2-га відміна). В Уроці 3 вивчаємо Е-групу.

Більшість дієслів Е-групи закінчуються на голосний + Я в 1-й особі однини.

Дієслово ПИЯ (пити):
  (+) аз пия, ти пиеш, той/тя/то пие, ние пием, вие пиете, те пият
  (–) не пия, не пиеш, не пие, не пием, не пиете, не пият
  (?) пия ли, пиеш ли, пие ли, пием ли, пиете ли, пият ли

Дієслово ЯМ (їсти) — виняток, неправильне:
  (+) аз ям, ти ядеш, той/тя/то яде, ние ядем, вие ядете, те ядат
  (–) не ям, не ядеш, не яде, не ядем, не ядете, не ядат

Пов'язані дієслова А/Я-групи: закусвам (снідати), обядвам (обідати), вечерям (вечеряти).

Інші дієслова Е-групи: желая, зная/знам, играя, мечтая, мия (се), мога, пея, пиша, чета.`,
      },
    },
    {
      id: 'noun-plural',
      title: {
        bg: 'Число на съществителните (множествено число)',
        en: 'Number of Nouns (Plural Forms)',
        fr: 'Le nombre des noms (le pluriel)',
        ar: 'أقسام الاسم من حيث العدد (صيغة الجمع)',
        fa: 'مفرد و جمع در اسامی',
        ru: 'Число существительных (множественное число)',
        uk: 'Число іменників (множина)',
      },
      content: {
        bg: `Съществителните в българския език имат единствено и множествено число.

МЪЖКИ РОД — многосрични (2+ срички): +И
  сандвич → сандвичи, ресторант → ресторанти, омлет → омлети
МЪЖКИ РОД — едносрични (1 сричка): +ОВЕ
  сок → сокове, стол → столове, лев → левове
Изключения: мъж → мъже, брат → братя, крак → крака, гост → гости

БРОЙНА ФОРМА (мъжки род, неодушевени) — с числа, КОЛКО, НЯКОЛКО: +А/-Я
  два сандвича, колко лева, няколко стола, пет лева

ЖЕНСКИ РОД: -А/-Я се заменя с -И
  супа → супи, салата → салати, баница → баници, кухня → кухни

СРЕДЕН РОД: -О → -А;  -Е → +ТА
  село → села, масло → масла
  кафе → кафета, шишче → шишчета, кебапче → кебапчета
Изключения: яйце → яйца, дете → деца, око → очи, ухо → уши

Само единствено число: захар, сол, чесън, лук
Само множествено число: очила, спагети
Нередовно: човек → двама души → много хора`,
        en: `Nouns in Bulgarian have singular and plural forms.

MASCULINE — multi-syllable (2+ syllables): add -И
  сандвич → сандвичи, ресторант → ресторанти, омлет → омлети
MASCULINE — one-syllable: add -ОВЕ
  сок → сокове, стол → столове, лев → левове
Exceptions: мъж → мъже, брат → братя, крак → крака, гост → гости

COUNT PLURAL (masculine, non-persons) — used after numbers, КОЛКО, НЯКОЛКО: add -А/-Я
  два сандвича, колко лева, няколко стола, пет лева

FEMININE: -А/-Я is replaced by -И
  супа → супи, салата → салати, баница → баници, кухня → кухни

NEUTER: -О → -А;  -Е → add -ТА
  село → села, масло → масла
  кафе → кафета, шишче → шишчета, кебапче → кебапчета
Exceptions: яйце → яйца, дете → деца, око → очи, ухо → уши

Singular only: захар, сол, чесън, лук
Plural only: очила, спагети
Irregular: човек → двама души → много хора`,
        fr: `Les noms en bulgare possèdent une forme pour le singulier et une autre pour le pluriel.

MASCULIN — plurisyllabes (2+ syllabes) : +И
  сандвич → сандвичи, ресторант → ресторанти, омлет → омлети
MASCULIN — monosyllabes (1 syllabe) : +ОВЕ
  сок → сокове, стол → столове, лев → левове
Exceptions : мъж → мъже, брат → братя, крак → крака, гост → гости

FORME CARDINALE (masc., non-personnes) — après les nombres, КОЛКО, НЯКОЛКО : +А/-Я
  два сандвича, колко лева, няколко стола, пет лева

FÉMININ : -А/-Я est remplacé par -И
  супа → супи, салата → салати, баница → баници, кухня → кухни

NEUTRE : -О → -А ;  -Е → +ТА
  село → села, масло → масла
  кафе → кафета, шишче → шишчета, кебапче → кебапчета
Exceptions : яйце → яйца, дете → деца, око → очи, ухо → уши

Seulement singulier : захар, сол, чесън, лук
Seulement pluriel : очила, спагети
Irrégulier : човек → двама души → много хора`,
        ar: `الأسماء في اللغة البلغارية لها صيغتان للعدد — صيغة المفرد وصيغة الجمع.

المذكّر — متعدد المقاطع (مقطعان فأكثر): +И
  сандвич → сандвичи، ресторант → ресторанти، омлет → омлети
المذكّر — وحيد المقطع: +ОВЕ
  сок → сокове، стол → столове، лев → левове
استثناءات: мъж → мъже، брат → братя، крак → крака، гост → гости

صيغة العدّ (مذكر، غير أشخاص) — تُستخدم مع الأعداد وКОЛКО وНЯКОЛКО: +А/-Я
  два сандвича، колко лева، няколко стола، пет лева

المؤنث: يُستبدل -А/-Я بـ -И
  супа → супи، салата → салати، баница → баници، кухня → кухни

المحايد: -О → -А؛  -Е → +ТА
  село → села، масло → масла
  кафе → кафета، шишче → шишчета، кебапче → кебапчета
استثناءات: яйце → яйца، дете → деца، око → очи، ухо → уши

أسماء ليس لها صيغة جمع: захар، сол، чесън، лук
أسماء ليس لها صيغة مفرد: очила، спагети
شاذّ: човек → двама души → много хора`,
        fa: `اسامی در زبان بلغاری حالت مفرد و جمع دارند.

مذکر — چند هجایی (۲ هجا یا بیشتر): +И
  сандвич → сандвичи، ресторант → ресторанти، омлет → омлети
مذکر — تک هجایی: +ОВЕ
  сок → сокове، стол → столове، лев → левове
استثنا: мъж → мъже، брат → братя، крак → крака، гост → гости

فرم شمارشی (مذکر، غیر افراد) — بعد از اعداد، КОЛКО و НЯКОЛКО: +А/-Я
  два сандвича، колко лева، няколко стола، пет лева

مونث: حرف -А/-Я به -И تغییر می\u200Cکند
  супа → супи، салата → салати، баница → баници، кухня → кухни

خنثی: -О → -А؛  -Е → +ТА
  село → села، масло → масла
  кафе → кафета، шишче → шишчета، кебапче → кебапчета
استثنا: яйце → яйца، дете → деца، око → очи، ухо → уши

فقط مفرد: захар، сол، чесън، лук
فقط جمع: очила، спагети
نامنظم: човек → двама души → много хора`,
        ru: `Существительные в болгарском языке имеют единственное и множественное число.

МУЖСКОЙ РОД — многосложные (2+ слога): +И
  сандвич → сандвичи, ресторант → ресторанти, омлет → омлети
МУЖСКОЙ РОД — односложные (1 слог): +ОВЕ
  сок → сокове, стол → столове, лев → левове
Исключения: мъж → мъже, брат → братя, крак → крака, гост → гости

СЧЁТНАЯ ФОРМА (муж. род, неодушевлённые) — после числительных, КОЛКО, НЯКОЛКО: +А/-Я
  два сандвича, колко лева, няколко стола, пет лева

ЖЕНСКИЙ РОД: -А/-Я заменяется на -И
  супа → супи, салата → салати, баница → баници, кухня → кухни

СРЕДНИЙ РОД: -О → -А;  -Е → +ТА
  село → села, масло → масла
  кафе → кафета, шишче → шишчета, кебапче → кебапчета
Исключения: яйце → яйца, дете → деца, око → очи, ухо → уши

Только единственное число: захар, сол, чесън, лук
Только множественное число: очила, спагети
Нерегулярное: човек → двама души → много хора`,
        uk: `Іменники в болгарській мові мають однину та множину.

ЧОЛОВІЧИЙ РІД — багатоскладові (2+ склади): +И
  сандвич → сандвичи, ресторант → ресторанти, омлет → омлети
ЧОЛОВІЧИЙ РІД — односкладові (1 склад): +ОВЕ
  сок → сокове, стол → столове, лев → левове
Винятки: мъж → мъже, брат → братя, крак → крака, гост → гости

ЛІЧИЛЬНА ФОРМА (чол. рід, неістоти) — після числівників, КОЛКО, НЯКОЛКО: +А/-Я
  два сандвича, колко лева, няколко стола, пет лева

ЖІНОЧИЙ РІД: -А/-Я замінюється на -И
  супа → супи, салата → салати, баница → баници, кухня → кухни

СЕРЕДНІЙ РІД: -О → -А;  -Е → +ТА
  село → села, масло → масла
  кафе → кафета, шишче → шишчета, кебапче → кебапчета
Винятки: яйце → яйца, дете → деца, око → очи, ухо → уши

Тільки однина: захар, сол, чесън, лук
Тільки множина: очила, спагети
Нерегулярне: човек → двама души → много хора`,
      },
    },
  ],
};

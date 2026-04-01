import type { LessonContent } from '@/content/types';

export const content: LessonContent = {
  introduction: `Добре дошли! В този уводен урок ще се запознаете с българската азбука — кирилицата. Ще научите 30-те букви в техния печатен и ръкописен вид, ще се упражните да ги разпознавате и ще направите първите си стъпки в четенето и писането на български.

Ще срещнете и думи, които вече познавате — имена на държави, столици, храни и предмети от ежедневието. Всичко е стъпка по стъпка — спокойно и ясно.`,

  sections: [],

  dialogues: [],

  vocabulary: [
    { id: 'avstraliya', bulgarian: 'Австралия', translations: { en: 'Australia', fr: 'Australie', ar: 'أستراليا', fa: 'استرالیا', ru: 'Австралия', uk: 'Австралія' } },
    { id: 'azbuka', bulgarian: 'азбука', translations: { en: 'alphabet', fr: 'alphabet', ar: 'أبجدية', fa: 'الفبا', ru: 'алфавит', uk: 'абетка' } },
    { id: 'aziya', bulgarian: 'Азия', translations: { en: 'Asia', fr: 'Asie', ar: 'آسيا', fa: 'آسیا', ru: 'Азия', uk: 'Азія' } },
    { id: 'amerika', bulgarian: 'Америка', translations: { en: 'America', fr: 'Amérique', ar: 'أمريكا', fa: 'آمریکا', ru: 'Америка', uk: 'Америка' } },
    { id: 'atina', bulgarian: 'Атина', translations: { en: 'Athens', fr: 'Athènes', ar: 'أثينا', fa: 'آتن', ru: 'Афины', uk: 'Афіни' } },
    { id: 'afganistan', bulgarian: 'Афганистан', translations: { en: 'Afghanistan', fr: 'Afghanistan', ar: 'أفغانستان', fa: 'افغانستان', ru: 'Афганистан', uk: 'Афганістан' } },
    { id: 'afrika', bulgarian: 'Африка', translations: { en: 'Africa', fr: 'Afrique', ar: 'أفريقيا', fa: 'آفریقا', ru: 'Африка', uk: 'Африка' } },
    { id: 'bagdad', bulgarian: 'Багдад', translations: { en: 'Baghdad', fr: 'Bagdad', ar: 'بغداد', fa: 'بغداد', ru: 'Багдад', uk: 'Багдад' } },
    { id: 'banan', bulgarian: 'банан', translations: { en: 'banana', fr: 'banane', ar: 'موز', fa: 'موز', ru: 'банан', uk: 'банан' } },
    { id: 'beyrut', bulgarian: 'Бейрут', translations: { en: 'Beirut', fr: 'Beyrouth', ar: 'بيروت', fa: 'بیروت', ru: 'Бейрут', uk: 'Бейрут' } },
    { id: 'belgiya', bulgarian: 'Белгия', translations: { en: 'Belgium', fr: 'Belgique', ar: 'بلجيكا', fa: 'بلژیک', ru: 'Бельгия', uk: 'Бельгія' } },
    { id: 'berlin', bulgarian: 'Берлин', translations: { en: 'Berlin', fr: 'Berlin', ar: 'برلين', fa: 'برلین', ru: 'Берлин', uk: 'Берлін' } },
    { id: 'bryuksel', bulgarian: 'Брюксел', translations: { en: 'Brussels', fr: 'Bruxelles', ar: 'بروكسل', fa: 'بروکسل', ru: 'Брюссель', uk: 'Брюссель' } },
    { id: 'balgariya', bulgarian: 'България', translations: { en: 'Bulgaria', fr: 'Bulgarie', ar: 'بلغاريا', fa: 'بلغارستان', ru: 'Болгария', uk: 'Болгарія' } },
    { id: 'germaniya', bulgarian: 'Германия', translations: { en: 'Germany', fr: 'Allemagne', ar: 'ألمانيا', fa: 'آلمان', ru: 'Германия', uk: 'Німеччина' } },
    { id: 'gartsiya', bulgarian: 'Гърция', translations: { en: 'Greece', fr: 'Grèce', ar: 'اليونان', fa: 'یونان', ru: 'Греция', uk: 'Греція' } },
    { id: 'damask', bulgarian: 'Дамаск', translations: { en: 'Damascus', fr: 'Damas', ar: 'دمشق', fa: 'دمشق', ru: 'Дамаск', uk: 'Дамаск' } },
    { id: 'dyuner', bulgarian: 'дюнер', translations: { en: 'doner kebab', fr: 'döner kebab', ar: 'دونر كباب', fa: 'دونر کباب', ru: 'донер-кебаб', uk: 'донер-кебаб' } },
    { id: 'evropa', bulgarian: 'Европа', translations: { en: 'Europe', fr: 'Europe', ar: 'أوروبا', fa: 'اروپا', ru: 'Европа', uk: 'Європа' } },
    { id: 'zekhtin', bulgarian: 'зехтин', translations: { en: 'olive oil', fr: 'huile d\'olive', ar: 'زيت زيتون', fa: 'روغن زیتون', ru: 'оливковое масло', uk: 'оливкова олія' } },
    { id: 'irak', bulgarian: 'Ирак', translations: { en: 'Iraq', fr: 'Irak', ar: 'العراق', fa: 'عراق', ru: 'Ирак', uk: 'Ірак' } },
    { id: 'iran', bulgarian: 'Иран', translations: { en: 'Iran', fr: 'Iran', ar: 'إيران', fa: 'ایران', ru: 'Иран', uk: 'Іран' } },
    { id: 'italiya', bulgarian: 'Италия', translations: { en: 'Italy', fr: 'Italie', ar: 'إيطاليا', fa: 'ایتالیا', ru: 'Италия', uk: 'Італія' } },
    { id: 'kabul', bulgarian: 'Кабул', translations: { en: 'Kabul', fr: 'Kaboul', ar: 'كابل', fa: 'کابل', ru: 'Кабул', uk: 'Кабул' } },
    { id: 'kafe', bulgarian: 'кафе', translations: { en: 'coffee', fr: 'café', ar: 'قهوة', fa: 'قهوه', ru: 'кофе', uk: 'кава' } },
    { id: 'kitay', bulgarian: 'Китай', translations: { en: 'China', fr: 'Chine', ar: 'الصين', fa: 'چین', ru: 'Китай', uk: 'Китай' } },
    { id: 'koka-kola', bulgarian: 'кока-кола', translations: { en: 'Coca-Cola', fr: 'Coca-Cola', ar: 'كوكا كولا', fa: 'کوکا کولا', ru: 'кока-кола', uk: 'кока-кола' } },
    { id: 'livan', bulgarian: 'Ливан', translations: { en: 'Lebanon', fr: 'Liban', ar: 'لبنان', fa: 'لبنان', ru: 'Ливан', uk: 'Ліван' } },
    { id: 'moliv', bulgarian: 'молив', translations: { en: 'pencil', fr: 'crayon', ar: 'قلم رصاص', fa: 'مداد', ru: 'карандаш', uk: 'олівець' } },
    { id: 'musaka', bulgarian: 'мусака', translations: { en: 'moussaka', fr: 'moussaka', ar: 'مسقعة', fa: 'موساکا', ru: 'мусака', uk: 'мусака' } },
    { id: 'peperuda', bulgarian: 'пеперуда', translations: { en: 'butterfly', fr: 'papillon', ar: 'فراشة', fa: 'پروانه', ru: 'бабочка', uk: 'метелик' } },
    { id: 'pitsa', bulgarian: 'пица', translations: { en: 'pizza', fr: 'pizza', ar: 'بيتزا', fa: 'پیتزا', ru: 'пицца', uk: 'піца' } },
    { id: 'rusiya', bulgarian: 'Русия', translations: { en: 'Russia', fr: 'Russie', ar: 'روسيا', fa: 'روسیه', ru: 'Россия', uk: 'Росія' } },
    { id: 'salata', bulgarian: 'салата', translations: { en: 'salad', fr: 'salade', ar: 'سلطة', fa: 'سالاد', ru: 'салат', uk: 'салат' } },
    { id: 'sandvich', bulgarian: 'сандвич', translations: { en: 'sandwich', fr: 'sandwich', ar: 'ساندويتش', fa: 'ساندویچ', ru: 'сэндвич', uk: 'сендвіч' } },
    { id: 'sasht', bulgarian: 'САЩ', translations: { en: 'USA', fr: 'États-Unis', ar: 'الولايات المتحدة', fa: 'ایالات متحده', ru: 'США', uk: 'США' } },
    { id: 'siriya', bulgarian: 'Сирия', translations: { en: 'Syria', fr: 'Syrie', ar: 'سوريا', fa: 'سوریه', ru: 'Сирия', uk: 'Сирія' } },
    { id: 'sofiya', bulgarian: 'София', translations: { en: 'Sofia', fr: 'Sofia', ar: 'صوفيا', fa: 'صوفیه', ru: 'София', uk: 'Софія' } },
    { id: 'spageti', bulgarian: 'спагети', translations: { en: 'spaghetti', fr: 'spaghetti', ar: 'سباغيتي', fa: 'اسپاگتی', ru: 'спагетти', uk: 'спагеті' } },
    { id: 'taksi', bulgarian: 'такси', translations: { en: 'taxi', fr: 'taxi', ar: 'تاكسي', fa: 'تاکسی', ru: 'такси', uk: 'таксі' } },
    { id: 'telefon', bulgarian: 'телефон', translations: { en: 'phone', fr: 'téléphone', ar: 'هاتف', fa: 'تلفن', ru: 'телефон', uk: 'телефон' } },
    { id: 'tetradka', bulgarian: 'тетрадка', translations: { en: 'notebook', fr: 'cahier', ar: 'دفتر', fa: 'دفتر', ru: 'тетрадь', uk: 'зошит' } },
    { id: 'teheran', bulgarian: 'Техеран', translations: { en: 'Tehran', fr: 'Téhéran', ar: 'طهران', fa: 'تهران', ru: 'Тегеран', uk: 'Тегеран' } },
    { id: 'turtsiya', bulgarian: 'Турция', translations: { en: 'Turkey', fr: 'Turquie', ar: 'تركيا', fa: 'ترکیه', ru: 'Турция', uk: 'Туреччина' } },
    { id: 'uchebnik', bulgarian: 'учебник', translations: { en: 'textbook', fr: 'manuel', ar: 'كتاب مدرسي', fa: 'کتاب درسی', ru: 'учебник', uk: 'підручник' } },
    { id: 'frantsiya', bulgarian: 'Франция', translations: { en: 'France', fr: 'France', ar: 'فرنسا', fa: 'فرانسه', ru: 'Франция', uk: 'Франція' } },
    { id: 'futbol', bulgarian: 'футбол', translations: { en: 'football', fr: 'football', ar: 'كرة القدم', fa: 'فوتبال', ru: 'футбол', uk: 'футбол' } },
    { id: 'hamburger', bulgarian: 'хамбургер', translations: { en: 'hamburger', fr: 'hamburger', ar: 'همبرغر', fa: 'همبرگر', ru: 'гамбургер', uk: 'гамбургер' } },
    { id: 'himikalka', bulgarian: 'химикалка', translations: { en: 'pen', fr: 'stylo', ar: 'قلم حبر', fa: 'خودکار', ru: 'ручка', uk: 'ручка' } },
    { id: 'tsvete', bulgarian: 'цвете', translations: { en: 'flower', fr: 'fleur', ar: 'زهرة', fa: 'گل', ru: 'цветок', uk: 'квітка' } },
    { id: 'chay', bulgarian: 'чай', translations: { en: 'tea', fr: 'thé', ar: 'شاي', fa: 'چای', ru: 'чай', uk: 'чай' } },
    { id: 'shveytsariya', bulgarian: 'Швейцария', translations: { en: 'Switzerland', fr: 'Suisse', ar: 'سويسرا', fa: 'سوئیس', ru: 'Швейцария', uk: 'Швейцарія' } },
    { id: 'shvetsiya', bulgarian: 'Швеция', translations: { en: 'Sweden', fr: 'Suède', ar: 'السويد', fa: 'سوئد', ru: 'Швеция', uk: 'Швеція' } },
    { id: 'shokolad', bulgarian: 'шоколад', translations: { en: 'chocolate', fr: 'chocolat', ar: 'شوكولاتة', fa: 'شکلات', ru: 'шоколад', uk: 'шоколад' } },
  ],

  culturalNotes: [
    {
      id: 'cyrillic-alphabet',
      title: {
        bg: 'Азбуката',
        en: 'The Alphabet',
        fr: 'L\'alphabet',
        ar: 'الأبجدية',
        fa: 'الفبا',
        ru: 'Алфавит',
        uk: 'Абетка',
      },
      content: {
        bg: 'Българите използват кирилицата и повечето надписи са написани с нея. Надписите по международните магистрали, на летищата, в по-големите градове и курортите са изписани и на латиница.',
        en: 'Bulgarians use the Cyrillic alphabet and most signs are written in it. Signs along international motorways, in airports, bigger cities and resorts are also spelled in Roman letters.',
        fr: 'Les Bulgares utilisent l\'alphabet cyrillique et la plupart des panneaux sont écrits avec celui-ci. Les panneaux le long des autoroutes internationales, dans les aéroports, les grandes villes et les stations balnéaires sont également écrits en lettres latines.',
        ar: 'يستخدم البلغاريون الأبجدية السيريلية ومعظم اللافتات مكتوبة بها. اللافتات على الطرق السريعة الدولية وفي المطارات والمدن الكبرى والمنتجعات مكتوبة أيضاً بالحروف اللاتينية.',
        fa: 'بلغاری‌ها از الفبای سیریلیک استفاده می‌کنند و بیشتر تابلوها با آن نوشته شده‌اند. تابلوهای بزرگراه‌های بین‌المللی، فرودگاه‌ها، شهرهای بزرگ‌تر و استراحتگاه‌ها با حروف لاتین نیز نوشته شده‌اند.',
        ru: 'Болгары используют кириллицу, и большинство вывесок написаны ею. Вывески вдоль международных автомагистралей, в аэропортах, крупных городах и курортах также написаны латинскими буквами.',
        uk: 'Болгари використовують кирилицю, і більшість написів написані нею. Написи вздовж міжнародних автомагістралей, в аеропортах, великих містах та курортах також написані латинськими літерами.',
      },
    },
    {
      id: 'uppercase-lowercase',
      title: {
        bg: 'Главни и малки букви',
        en: 'Uppercase and Lowercase Letters',
        fr: 'Lettres majuscules et minuscules',
        ar: 'الحروف الكبيرة والصغيرة',
        fa: 'حروف بزرگ و کوچک',
        ru: 'Прописные и строчные буквы',
        uk: 'Великі та малі літери',
      },
      content: {
        bg: 'Българските букви имат малка и голяма форма. Голямата буква се използва в началото на изречението. С голяма буква започват и имена — на хора, празници, географски понятия (държави, градове, планини, морета) и институции. Останалите букви в тези думи са малки. Буквите се изписват различно в печатна и в ръкописна форма.',
        en: 'Bulgarian letters have lowercase and uppercase forms. A capital letter is used at the beginning of a sentence. Names also start with a capital letter — names of people, holidays, geographical terms (countries, cities, mountains, seas) and institutions. The remaining letters in these words are lowercase. Letters are written differently in printed and handwritten form.',
        fr: 'Les lettres bulgares ont une forme minuscule et majuscule. La majuscule est utilisée au début de la phrase. Les noms commencent aussi par une majuscule — noms de personnes, fêtes, termes géographiques (pays, villes, montagnes, mers) et institutions. Les autres lettres de ces mots sont en minuscule. Les lettres s\'écrivent différemment en forme imprimée et manuscrite.',
        ar: 'الحروف البلغارية لها شكل صغير وكبير. يُستخدم الحرف الكبير في بداية الجملة. تبدأ الأسماء أيضاً بحرف كبير — أسماء الأشخاص، الأعياد، المصطلحات الجغرافية (الدول، المدن، الجبال، البحار) والمؤسسات. باقي الحروف في هذه الكلمات صغيرة. تُكتب الحروف بشكل مختلف في الطباعة وبخط اليد.',
        fa: 'حروف بلغاری دارای شکل کوچک و بزرگ هستند. حرف بزرگ در ابتدای جمله استفاده می‌شود. اسامی نیز با حرف بزرگ شروع می‌شوند — اسامی اشخاص، تعطیلات، اصطلاحات جغرافیایی (کشورها، شهرها، کوه‌ها، دریاها) و مؤسسات. بقیه حروف در این کلمات کوچک هستند. حروف به شکل متفاوتی در چاپ و دست‌خط نوشته می‌شوند.',
        ru: 'Болгарские буквы имеют строчную и прописную форму. Прописная буква используется в начале предложения. С прописной буквы начинаются также имена — имена людей, праздников, географические названия (стран, городов, гор, морей) и учреждений. Остальные буквы в этих словах строчные. Буквы пишутся по-разному в печатной и рукописной форме.',
        uk: 'Болгарські літери мають малу та велику форму. Велика літера використовується на початку речення. З великої літери починаються також імена — імена людей, свята, географічні назви (країн, міст, гір, морів) та установ. Решта літер у цих словах малі. Літери пишуться по-різному у друкованій та рукописній формі.',
      },
    },
  ],

  grammarReference: [
    {
      id: 'compound-letters',
      title: {
        bg: 'Съставни букви',
        en: 'Compound Letters',
        fr: 'Lettres composées',
        ar: 'الحروف المركبة',
        fa: 'حروف ترکیبی',
        ru: 'Составные буквы',
        uk: 'Складені літери',
      },
      content: {
        bg: `В българската азбука има три букви, които са съставени от два звука:

Ю = [Й + У] — произнася се като „ю" в „Юлия"
Я = [Й + А] — произнася се като „я" в „Яна"
Щ = [Ш + Т] — произнася се като „щ" в „Щилян"

Азбуката има 30 букви. Буквата Ь (ер малък) не означава самостоятелен звук — тя омекотява съгласната пред нея.`,
        en: `The Bulgarian alphabet has three letters that combine two sounds:

Ю = [Й + У] — pronounced like "yu" in "Yulia"
Я = [Й + А] — pronounced like "ya" in "Yana"
Щ = [Ш + Т] — pronounced like "sht" in "Shtilyan"

The alphabet has 30 letters. The letter Ь (soft sign) does not represent a separate sound — it softens the consonant before it.`,
        fr: `L'alphabet bulgare comporte trois lettres qui combinent deux sons :

Ю = [Й + У] — prononcé comme « you » dans « Youlia »
Я = [Й + А] — prononcé comme « ya » dans « Yana »
Щ = [Ш + Т] — prononcé comme « cht » dans « Chtiliane »

L'alphabet compte 30 lettres. La lettre Ь (signe mou) ne représente pas un son séparé — elle adoucit la consonne qui la précède.`,
        ar: `تحتوي الأبجدية البلغارية على ثلاثة حروف تجمع بين صوتين:

Ю = [Й + У] — يُنطق مثل «يو» في «يوليا»
Я = [Й + А] — يُنطق مثل «يا» في «يانا»
Щ = [Ш + Т] — يُنطق مثل «شت» في «شتيليان»

تتكون الأبجدية من 30 حرفاً. الحرف Ь (علامة التليين) لا يمثل صوتاً منفصلاً — بل يُلين الحرف الساكن الذي يسبقه.`,
        fa: `الفبای بلغاری سه حرف دارد که از ترکیب دو صدا تشکیل شده‌اند:

Ю = [Й + У] — مانند «یو» در «یولیا» تلفظ می‌شود
Я = [Й + А] — مانند «یا» در «یانا» تلفظ می‌شود
Щ = [Ш + Т] — مانند «شت» در «شتیلیان» تلفظ می‌شود

الفبا ۳۰ حرف دارد. حرف Ь (نشانه نرمی) صدای مستقلی ندارد — بلکه حرف بی‌صدای قبل از خود را نرم می‌کند.`,
        ru: `В болгарском алфавите есть три буквы, которые сочетают два звука:

Ю = [Й + У] — произносится как «ю» в «Юлия»
Я = [Й + А] — произносится как «я» в «Яна»
Щ = [Ш + Т] — произносится как «шт» в «Штилян»

В алфавите 30 букв. Буква Ь (мягкий знак) не обозначает отдельного звука — она смягчает согласную перед ней.`,
        uk: `У болгарській абетці є три літери, які поєднують два звуки:

Ю = [Й + У] — вимовляється як «ю» у «Юлія»
Я = [Й + А] — вимовляється як «я» у «Яна»
Щ = [Ш + Т] — вимовляється як «шт» у «Штілян»

Абетка має 30 літер. Літера Ь (м'який знак) не позначає окремого звуку — вона пом'якшує приголосну перед нею.`,
      },
    },
  ],
};

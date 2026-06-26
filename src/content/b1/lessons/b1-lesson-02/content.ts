import type { LessonContent } from '@/content/types';

export const content: LessonContent = {
  introduction: `Във втория урок от ниво B1 ще се научите да говорите за хората около вас — семейството, приятелите и любимите си хора — като използвате притежателните местоимения (мой, твой, негов, неин…) и възвратното притежателно „си".

Урокът включва граматични таблици, кратки текстове и упражнения за практика.`,

  sections: [],

  vocabulary: [
    // Семейство и хора
    { id: 'semeystvo', bulgarian: 'семейство, семейства', translations: { en: 'family, families', fr: 'famille, familles', ar: 'عائلة', fa: 'خانواده', ru: 'семья, семьи', uk: 'родина, родини' } },
    { id: 'roditeli', bulgarian: 'родители', translations: { en: 'parents', fr: 'parents', ar: 'الوالدان', fa: 'والدین', ru: 'родители', uk: 'батьки' } },
    { id: 'sin', bulgarian: 'син, синове', translations: { en: 'son, -s', fr: 'fils', ar: 'ابن', fa: 'پسر', ru: 'сын, сыновья', uk: 'син, сини' } },
    { id: 'dashterya', bulgarian: 'дъщеря, дъщери', translations: { en: 'daughter, -s', fr: 'fille, filles', ar: 'ابنة', fa: 'دختر', ru: 'дочь, дочери', uk: 'донька, доньки' } },
    { id: 'sysed', bulgarian: 'съсед, съседи', translations: { en: 'neighbour, -s', fr: 'voisin, voisins', ar: 'جار', fa: 'همسایه', ru: 'сосед, соседи', uk: 'сусід, сусіди' } },
    { id: 'priyatel', bulgarian: 'приятел, приятели', translations: { en: 'friend, -s', fr: 'ami, amis', ar: 'صديق', fa: 'دوست', ru: 'друг, друзья', uk: 'друг, друзі' } },
    { id: 'kolega', bulgarian: 'колега, колеги', translations: { en: 'colleague, -s', fr: 'collègue, collègues', ar: 'زميل', fa: 'همکار', ru: 'коллега, коллеги', uk: 'колега, колеги' } },
    { id: 'gost', bulgarian: 'гост, гости', translations: { en: 'guest, -s', fr: 'invité, invités', ar: 'ضيف', fa: 'مهمان', ru: 'гость, гости', uk: 'гість, гості' } },

    // Ваканция / пътуване
    { id: 'vakantsiya', bulgarian: 'ваканция, ваканции', translations: { en: 'holiday, vacation', fr: 'vacances', ar: 'عطلة', fa: 'تعطیلات', ru: 'каникулы, отпуск', uk: 'канікули, відпустка' } },
    { id: 'rodina', bulgarian: 'родина', translations: { en: 'homeland', fr: 'patrie', ar: 'وطن', fa: 'میهن', ru: 'родина', uk: 'батьківщина' } },
    { id: 'patuvane', bulgarian: 'пътуване, пътувания', translations: { en: 'journey, trip', fr: 'voyage', ar: 'سفر', fa: 'سفر', ru: 'путешествие, поездка', uk: 'подорож' } },
    { id: 'polet', bulgarian: 'полет, полети', translations: { en: 'flight, -s', fr: 'vol, vols', ar: 'رحلة جوية', fa: 'پرواز', ru: 'полёт, рейс', uk: 'політ, рейс' } },
    { id: 'podaryk', bulgarian: 'подарък, подаръци', translations: { en: 'gift, present', fr: 'cadeau', ar: 'هدية', fa: 'هدیه', ru: 'подарок', uk: 'подарунок' } },
    { id: 'letishte', bulgarian: 'летище, летища', translations: { en: 'airport, -s', fr: 'aéroport', ar: 'مطار', fa: 'فرودگاه', ru: 'аэропорт', uk: 'аеропорт' } },
    { id: 'strahoten', bulgarian: 'страхотен, страхотна, страхотно, страхотни', translations: { en: 'great, awesome', fr: 'génial, formidable', ar: 'رائع', fa: 'عالی', ru: 'потрясающий', uk: 'чудовий' } },
    { id: 'vlyuben', bulgarian: 'влюбен, -а, -о, -и', translations: { en: 'in love', fr: 'amoureux, -euse', ar: 'واقع في الحب', fa: 'عاشق', ru: 'влюблённый', uk: 'закоханий' } },

    // Кино и видове филми
    { id: 'kino', bulgarian: 'кино, кина', translations: { en: 'cinema, movie theatre', fr: 'cinéma', ar: 'سينما', fa: 'سینما', ru: 'кино', uk: 'кіно' } },
    { id: 'film', bulgarian: 'филм, филми', translations: { en: 'film, movie', fr: 'film', ar: 'فيلم', fa: 'فیلم', ru: 'фильм', uk: 'фільм' } },
    { id: 'bilet', bulgarian: 'билет, билети', translations: { en: 'ticket, -s', fr: 'billet, ticket', ar: 'تذكرة', fa: 'بلیط', ru: 'билет', uk: 'квиток' } },
    { id: 'opashka', bulgarian: 'опашка, опашки', translations: { en: 'queue, line', fr: 'file d’attente', ar: 'طابور', fa: 'صف', ru: 'очередь', uk: 'черга' } },
    { id: 'anketa', bulgarian: 'анкета, анкети', translations: { en: 'survey, poll', fr: 'enquête, sondage', ar: 'استبيان', fa: 'نظرسنجی', ru: 'анкета, опрос', uk: 'анкета, опитування' } },
    { id: 'istoricheski-film', bulgarian: 'исторически филм', translations: { en: 'historical film', fr: 'film historique', ar: 'فيلم تاريخي', fa: 'فیلم تاریخی', ru: 'исторический фильм', uk: 'історичний фільм' } },
    { id: 'dokumentalen', bulgarian: 'документален филм', translations: { en: 'documentary', fr: 'documentaire', ar: 'فيلم وثائقي', fa: 'فیلم مستند', ru: 'документальный фильм', uk: 'документальний фільм' } },
    { id: 'ekshyn', bulgarian: 'екшън, екшъни', translations: { en: 'action film', fr: 'film d’action', ar: 'فيلم أكشن', fa: 'فیلم اکشن', ru: 'боевик', uk: 'бойовик' } },
    { id: 'priklyuchenski', bulgarian: 'приключенски филм', translations: { en: 'adventure film', fr: 'film d’aventure', ar: 'فيلم مغامرات', fa: 'فیلم ماجراجویی', ru: 'приключенческий фильм', uk: 'пригодницький фільм' } },
    { id: 'nauchnofantastichen', bulgarian: 'научнофантастичен филм', translations: { en: 'science-fiction film', fr: 'film de science-fiction', ar: 'فيلم خيال علمي', fa: 'فیلم علمی‌تخیلی', ru: 'научно-фантастический фильм', uk: 'науково-фантастичний фільм' } },
    { id: 'komediya', bulgarian: 'комедия, комедии', translations: { en: 'comedy', fr: 'comédie', ar: 'كوميديا', fa: 'کمدی', ru: 'комедия', uk: 'комедія' } },
    { id: 'romantichen', bulgarian: 'романтичен филм', translations: { en: 'romantic film', fr: 'film romantique', ar: 'فيلم رومانسي', fa: 'فیلم عاشقانه', ru: 'романтический фильм', uk: 'романтичний фільм' } },
    { id: 'animatsionen', bulgarian: 'анимационен филм', translations: { en: 'animated film, cartoon', fr: 'film d’animation', ar: 'فيلم رسوم متحركة', fa: 'انیمیشن', ru: 'мультфильм', uk: 'мультфільм' } },
    { id: 'kriminalen-serial', bulgarian: 'криминален сериал', translations: { en: 'crime series', fr: 'série policière', ar: 'مسلسل جنائي', fa: 'سریال جنایی', ru: 'криминальный сериал', uk: 'кримінальний серіал' } },

    // Любим актьор
    { id: 'aktyor', bulgarian: 'актьор, актриса', translations: { en: 'actor, actress', fr: 'acteur, actrice', ar: 'ممثل، ممثلة', fa: 'بازیگر', ru: 'актёр, актриса', uk: 'актор, акторка' } },
    { id: 'pevets', bulgarian: 'певец, певица', translations: { en: 'singer (m./f.)', fr: 'chanteur, chanteuse', ar: 'مغنٍّ، مغنية', fa: 'خواننده', ru: 'певец, певица', uk: 'співак, співачка' } },
    { id: 'premiera', bulgarian: 'премиера, премиери', translations: { en: 'premiere', fr: 'avant-première', ar: 'العرض الأول', fa: 'اولین نمایش', ru: 'премьера', uk: 'прем’єра' } },
    { id: 'pochitatel', bulgarian: 'почитател, почитатели', translations: { en: 'fan, admirer', fr: 'admirateur, fan', ar: 'معجب', fa: 'طرفدار', ru: 'поклонник', uk: 'шанувальник' } },
    { id: 'populyarnost', bulgarian: 'популярност', translations: { en: 'popularity', fr: 'popularité', ar: 'شعبية', fa: 'محبوبیت', ru: 'популярность', uk: 'популярність' } },
    { id: 'prevodach', bulgarian: 'преводач, преводачка', translations: { en: 'translator, interpreter', fr: 'traducteur, interprète', ar: 'مترجم', fa: 'مترجم', ru: 'переводчик, переводчица', uk: 'перекладач, перекладачка' } },
    { id: 'muzikant', bulgarian: 'музикант, музикантка', translations: { en: 'musician', fr: 'musicien, musicienne', ar: 'موسيقي', fa: 'نوازنده', ru: 'музыкант', uk: 'музикант' } },
    { id: 'hudozhnik', bulgarian: 'художник, художничка', translations: { en: 'painter, artist', fr: 'peintre, artiste', ar: 'رسام', fa: 'نقاش', ru: 'художник', uk: 'художник' } },
    { id: 'tantsyor', bulgarian: 'танцьор, танцьорка', translations: { en: 'dancer', fr: 'danseur, danseuse', ar: 'راقص', fa: 'رقصنده', ru: 'танцор, танцовщица', uk: 'танцюрист, танцівниця' } },
    { id: 'balerina', bulgarian: 'балерина, балерини', translations: { en: 'ballerina', fr: 'ballerine', ar: 'راقصة باليه', fa: 'بالرین', ru: 'балерина', uk: 'балерина' } },
    { id: 'publika', bulgarian: 'публика', translations: { en: 'audience, public', fr: 'public', ar: 'الجمهور', fa: 'تماشاگران', ru: 'публика', uk: 'публіка' } },
    { id: 'stsenariy', bulgarian: 'сценарий, сценарии', translations: { en: 'screenplay, script', fr: 'scénario', ar: 'سيناريو', fa: 'فیلم‌نامه', ru: 'сценарий', uk: 'сценарій' } },
    { id: 'kulturen-pametnik', bulgarian: 'културен паметник', translations: { en: 'cultural monument', fr: 'monument culturel', ar: 'معلَم ثقافي', fa: 'یادمان فرهنگی', ru: 'памятник культуры', uk: 'пам’ятка культури' } },
    { id: 'mechta', bulgarian: 'мечта, мечти', translations: { en: 'dream', fr: 'rêve', ar: 'حلم', fa: 'آرزو', ru: 'мечта', uk: 'мрія' } },
    { id: 'talantliv', bulgarian: 'талантлив, -а, -о, -и', translations: { en: 'talented', fr: 'talentueux, -euse', ar: 'موهوب', fa: 'بااستعداد', ru: 'талантливый', uk: 'талановитий' } },
    { id: 'charoven', bulgarian: 'чаровен, чаровна, чаровно, чаровни', translations: { en: 'charming', fr: 'charmant, -e', ar: 'ساحر', fa: 'جذاب', ru: 'обаятельный', uk: 'чарівний' } },
    { id: 'ocharovan', bulgarian: 'очарован, -а, -о, -и', translations: { en: 'delighted, charmed', fr: 'enchanté, -e', ar: 'مفتون', fa: 'مجذوب', ru: 'очарованный', uk: 'зачарований' } },
    { id: 'razvylnuvan', bulgarian: 'развълнуван, -а, -о, -и', translations: { en: 'excited, moved', fr: 'ému, -e', ar: 'متحمّس', fa: 'هیجان‌زده', ru: 'взволнованный', uk: 'схвильований' } },
    { id: 'dovolen', bulgarian: 'доволен, доволна, доволно, доволни', translations: { en: 'pleased, satisfied', fr: 'content, -e', ar: 'راضٍ', fa: 'راضی', ru: 'довольный', uk: 'задоволений' } },
    { id: 'optimizam', bulgarian: 'оптимизъм', translations: { en: 'optimism', fr: 'optimisme', ar: 'تفاؤل', fa: 'خوش‌بینی', ru: 'оптимизм', uk: 'оптимізм' } },
  ],

  // grammarReference — ще се добави след финален преглед на урока.

  culturalNotes: [
    {
      id: 'b1-l02-culture-kino',
      title: 'Българското кино и филмовите фестивали',
      content: 'Българското кино има дълга история — първата българска игрална лента е от 1915 година („Българан е галант"). Днес в България се снимат игрални, документални и анимационни филми, а български режисьори печелят награди на международни фестивали. Най-големият филмов празник в страната е „София Филм Фест", който се провежда всяка пролет в столицата. Във Варна пък се организира фестивалът на българския игрален филм „Златна роза". Много чуждестранни продукции също се снимат в България заради красивата природа и ниските разходи.',
    },
    {
      id: 'b1-l02-culture-na-kino',
      title: 'На кино в България',
      content: 'Ходенето на кино е популярно занимание, особено сред младите хора. В големите градове има модерни мултиплекс кина в търговските центрове, но в София и Пловдив работят и уютни салони за артистично и европейско кино. Билетът обикновено струва между седем и петнадесет евро, а във вторник или сряда много кина предлагат намаление. Чуждите филми се прожектират на оригинален език с български субтитри, а само анимационните и детските филми често са дублирани на български. Преди прожекцията зрителите обичат да си купят пуканки и нещо за пиене.',
    },
  ],
};

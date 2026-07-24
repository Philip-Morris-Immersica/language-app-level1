import type { LessonContent } from '@/content/types';

export const content: LessonContent = {
  introduction: `В този урок ще говорите за планове, които не се осъществиха, и за мечти за бъдещето. Ще научите бъдещето в миналото (щях да..., нямаше да..., щеше ли да...?), ще упражнявате кратките местоимения в тези конструкции и ще правите условни изречения — какво правим, ако нещо се случи, и какво бихме направили, ако условията бяха различни.`,

  sections: [],

  dialogues: [
    {
      id: 'b1-l08-dialog-toni-petyo',
      speakers: [
        { name: 'Петьо', text: 'Ало, Тони, защо не ми се обади вчера? Нали щяхме да ходим на Витоша?' },
        { name: 'Тони', text: 'Извинявай, Петьо, наистина щях да ти се обадя, но не се чувствах добре. Разболях се, всички в офиса са болни. Цял ден лежах, дори телевизия не ми се гледаше, не ми се слушаше музика. Само ми се спеше.' },
        { name: 'Петьо', text: 'Колко неприятно!' },
        { name: 'Тони', text: 'Да, щеше да е прекрасно в планината. Щяхме да се качим пеша до хижата. Щяхме да обядваме там, приготвят много вкусна скара. Щяхме да останем няколко часа и после щяхме да слезем с лифта.' },
        { name: 'Петьо', text: 'Ще направим това следващата неделя. Сега оздравявай и до скоро.' },
      ],
    },
    {
      id: 'b1-l08-dialog-tanya-reni',
      speakers: [
        { name: 'Таня', text: 'Здравей, Рени! Какво правиш тук? Защо си в София? Нали щеше да си във Виена?' },
        { name: 'Рени', text: 'Здравей, Таня. Да, щях да пътувам преди няколко дена, но се отказах.' },
        { name: 'Таня', text: 'Но защо? Помня, че купи билет за самолет в началото на миналия месец. Беше толкова щастлива. Говореше само за това пътуване. Планираше всичко – посещения на музеи и концерти, срещи с приятели. Резервира стая в хотел. Какво стана?' },
        { name: 'Рени', text: 'Да, точно така беше, но имам възможност да започна нова работа. Мечтаех за тази работа дълго време и сега искам да използвам възможността.' },
        { name: 'Таня', text: 'Да, разбирам те. Това е шанс за теб.' },
        { name: 'Рени', text: 'Съжалявам много, че не можах да пътувам до Виена. Ех, ако сега бях там, щях да се разхождам из красивите паркове, щях да ям торта Сахер и да пия виенско кафе, щях да посетя много музеи. Щях да отида в къщата на Моцарт, щях да се наслаждавам на прекрасната архитектура на града и да правя снимки. Има толкова много забележителности във Виена, от сутрин до вечер щях да ходя из града. Щях да направя много неща. За мен Виена е рай за туристите.' },
        { name: 'Таня', text: 'Да, съгласна съм. Бях там преди три години и искам да се върна пак. Може да отидем заедно.' },
        { name: 'Рени', text: 'Чудесна идея!' },
      ],
    },
  ],

  vocabulary: [
    { id: 'v-sravnenie-s', bulgarian: 'в сравнение с', ttsText: 'в сравнение с', ttsModel: 'pro', translations: { en: 'compared with', fr: 'comparé à', ar: 'مقارنةً بـ', fa: 'در مقایسه با', ru: 'по сравнению с', uk: 'у порівнянні з' } },
    { id: 'dokolko-znam', bulgarian: 'доколкото знам', ttsText: 'доколкото знам', ttsModel: 'pro', translations: { en: 'as far as I know', fr: 'autant que je sache', ar: 'على حد علمي', fa: 'تا جایی که می‌دانم', ru: 'насколько я знаю', uk: 'наскільки я знаю' } },
    { id: 'za-razlika-ot', bulgarian: 'за разлика от', ttsText: 'за разлика от', ttsModel: 'pro', translations: { en: 'unlike', fr: 'contrairement à', ar: 'على عكس', fa: 'برخلاف', ru: 'в отличие от', uk: 'на відміну від' } },
    { id: 'zadacha', bulgarian: 'задача, -и', ttsText: 'задача, задачи', ttsModel: 'pro', translations: { en: 'task, -s', fr: 'tâche, -s', ar: 'مهمة، -ات', fa: 'وظیفه، -ها', ru: 'задача, -и', uk: 'завдання, -ня' } },
    { id: 'izbor', bulgarian: 'избор', ttsText: 'избор', ttsModel: 'pro', translations: { en: 'choice', fr: 'choix', ar: 'اختيار', fa: 'انتخاب', ru: 'выбор', uk: 'вибір' } },
    { id: 'iztoshten', bulgarian: 'изтощен, -а, -о, -и', ttsText: 'изтощен, изтощена, изтощено, изтощени', ttsModel: 'pro', translations: { en: 'exhausted', fr: 'épuisé(e)', ar: 'منهك', fa: 'خسته', ru: 'измученный', uk: 'виснажений' } },
    { id: 'leja', bulgarian: 'лежа, -иш', ttsText: 'лежа, лежиш', ttsModel: 'pro', translations: { en: 'to lie (down)', fr: 'être couché(e)', ar: 'يستلقي', fa: 'دراز کشیدن', ru: 'лежать', uk: 'лежати' } },
    { id: 'lift', bulgarian: 'лифт, -ове', ttsText: 'лифт, лифтове', ttsModel: 'pro', translations: { en: 'ski lift, -s', fr: 'téléski, -s', ar: 'مصعد تزلج', fa: 'تله‌کابین', ru: 'подъёмник', uk: 'підйомник' } },
    { id: 'mejdunarodna-kompaniya', bulgarian: 'международна компания, международни компании', ttsText: 'международна компания, международни компании', ttsModel: 'pro', translations: { en: 'international company, -ies', fr: 'société internationale, -s', ar: 'شركة دولية', fa: 'شرکت بین‌المللی', ru: 'международная компания', uk: 'міжнародна компанія' } },
    { id: 'mnenie', bulgarian: 'мнение, -я', ttsText: 'мнение, мнения', ttsModel: 'pro', translations: { en: 'opinion, -s', fr: 'opinion, -s', ar: 'رأي', fa: 'نظر', ru: 'мнение', uk: 'думка' } },
    { id: 'naprotiv', bulgarian: 'напротив', ttsText: 'напротив', ttsModel: 'pro', translations: { en: 'on the contrary', fr: 'au contraire', ar: 'بالعكس', fa: 'برعکس', ru: 'напротив', uk: 'навпаки' } },
    { id: 'napalno', bulgarian: 'напълно', ttsText: 'напълно', ttsModel: 'pro', translations: { en: 'completely', fr: 'complètement', ar: 'تمامًا', fa: 'کاملاً', ru: 'полностью', uk: 'повністю' } },
    { id: 'ostrov', bulgarian: 'остров, -и', ttsText: 'остров, острови', ttsModel: 'pro', translations: { en: 'island, -s', fr: 'île, -s', ar: 'جزيرة', fa: 'جزیره', ru: 'остров', uk: 'острів' } },
    { id: 'ot-druga-strana', bulgarian: 'от друга страна', ttsText: 'от друга страна', ttsModel: 'pro', translations: { en: 'on the other hand', fr: 'd\'autre part', ar: 'من ناحية أخرى', fa: 'از طرف دیگر', ru: 'с другой стороны', uk: 'з іншого боку' } },
    { id: 'ot-edna-strana', bulgarian: 'от една страна', ttsText: 'от една страна', ttsModel: 'pro', translations: { en: 'on the one hand', fr: 'd\'une part', ar: 'من ناحية', fa: 'از یک طرف', ru: 'с одной стороны', uk: 'з одного боку' } },
    { id: 'otkazvam-se', bulgarian: 'отказвам се, -аш / откажа се, -еш', ttsText: 'отказвам се, отказваш се / откажа се, откажеш се', ttsModel: 'pro', translations: { en: 'to decide not to, to cancel', fr: 'renoncer à', ar: 'يتراجع', fa: 'منصرف شدن', ru: 'отказаться', uk: 'відмовитися' } },
    { id: 'pechelya', bulgarian: 'печеля, -иш / спечеля, -иш', ttsText: 'печеля, печелиш / спечеля, спечелиш', ttsModel: 'pro', translations: { en: 'to win, to earn', fr: 'gagner', ar: 'يربح', fa: 'برنده شدن', ru: 'выигрывать / выиграть', uk: 'вигравати / виграти' } },
    { id: 'planiram', bulgarian: 'планирам, -аш', ttsText: 'планирам, планираш', ttsModel: 'pro', translations: { en: 'to plan', fr: 'planifier', ar: 'يخطط', fa: 'برنامه‌ریزی کردن', ru: 'планировать', uk: 'планувати' } },
    { id: 'razbolevam-se', bulgarian: 'разболявам се, -аш / разболея се, -еш', ttsText: 'разболявам се, разболяваш се / разболея се, разболееш се', ttsModel: 'pro', translations: { en: 'to get sick', fr: 'tomber malade', ar: 'يمرض', fa: 'بیمار شدن', ru: 'заболеть', uk: 'захворіти' } },
    { id: 'razglejdam', bulgarian: 'разглеждам, -аш / разгледам, -аш', ttsText: 'разглеждам, разглеждаш / разгледам, разгледаш', ttsModel: 'pro', translations: { en: 'to look at, to view', fr: 'regarder, visiter', ar: 'يتفرج', fa: 'نگاه کردن', ru: 'рассматривать / рассмотреть', uk: 'розглядати' } },
    { id: 'razhod', bulgarian: 'разход, -и', ttsText: 'разход, разходи', ttsModel: 'pro', translations: { en: 'expense, -s', fr: 'dépense, -s', ar: 'مصروف', fa: 'هزینه', ru: 'расход', uk: 'витрата' } },
    { id: 'raj', bulgarian: 'рай', ttsText: 'рай', ttsModel: 'pro', translations: { en: 'paradise', fr: 'paradis', ar: 'جنة', fa: 'بهشت', ru: 'рай', uk: 'рай' } },
    { id: 'servityor', bulgarian: 'сервитьор, -и', ttsText: 'сервитьор, сервитьори', ttsModel: 'pro', translations: { en: 'waiter, -s', fr: 'serveur, -s', ar: 'نادل', fa: 'گارسون', ru: 'официант', uk: 'офіціант' } },
    { id: 'servityorka', bulgarian: 'сервитьорка, -и', ttsText: 'сервитьорка, сервитьорки', ttsModel: 'pro', translations: { en: 'waitress, -es', fr: 'serveuse, -s', ar: 'نادلة', fa: 'گارسون (زن)', ru: 'официантка', uk: 'офіціантка' } },
    { id: 'spisak', bulgarian: 'списък, списъци', ttsText: 'списък, списъци', ttsModel: 'pro', translations: { en: 'list, -s', fr: 'liste, -s', ar: 'قائمة', fa: 'فهرست', ru: 'список', uk: 'список' } },
    { id: 'struva-mi-se', bulgarian: 'Струва ми се...', ttsText: 'Струва ми се', ttsModel: 'pro', translations: { en: 'I guess..., I think...', fr: 'Il me semble que...', ar: 'يبدو لي أن...', fa: 'به نظرم...', ru: 'Мне кажется...', uk: 'Мені здається...' } },
    { id: 'tolkova', bulgarian: 'толкова', ttsText: 'толкова', ttsModel: 'pro', translations: { en: 'so', fr: 'tellement', ar: 'هكذا / جداً', fa: 'اینقدر', ru: 'так', uk: 'так' } },
    { id: 'turagentsiya', bulgarian: 'туристическа агенция, туристически агенции', ttsText: 'туристическа агенция, туристически агенции', ttsModel: 'pro', translations: { en: 'travel agency, -ies', fr: 'agence de voyage, -s', ar: 'وكالة سفر', fa: 'آژانس مسافرتی', ru: 'туристическое агентство', uk: 'туристичне агентство' } },
    { id: 'hija', bulgarian: 'хижа, -и', ttsText: 'хижа, хижи', ttsModel: 'pro', translations: { en: 'hut, -s; mountain lodge', fr: 'refuge, -s', ar: 'كوخ', fa: 'کلبه', ru: 'хижина', uk: 'хижа' } },
    { id: 'himichesko-chistene', bulgarian: 'химическо чистене', ttsText: 'химическо чистене', ttsModel: 'pro', translations: { en: 'dry cleaning', fr: 'pressing', ar: 'تنظيف جاف', fa: 'خشک‌شویی', ru: 'химчистка', uk: 'хімчистка' } },
    { id: 'shans', bulgarian: 'шанс, -ове', ttsText: 'шанс, шансове', ttsModel: 'pro', translations: { en: 'chance, -s', fr: 'chance, -s', ar: 'فرصة', fa: 'شانس', ru: 'шанс', uk: 'шанс' } },
  ],

  // grammarReference — попълва се в отделна фаза (след преглед на релевантната граматика).

  // culturalNotes — за този урок НЯМА културни бележки в материалите.
};

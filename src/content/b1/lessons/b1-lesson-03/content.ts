import type { LessonContent } from '@/content/types';

export const content: LessonContent = {
  introduction: `В третия урок от ниво B1 ще говорите за ежедневието си — какво правите сутрин, през деня и вечер. Ще повторите сегашно време на глагола „съм" и на трите глаголни групи (А/Я, Е, И) и ще се научите да използвате конструкциите „искам да", „мога да" и „трябва да".

След това ще правите планове за бъдещето с бъдеще време (ще / няма да), ще различавате свършен и несвършен вид на глагола и ще давате съвети и заповеди с повелително наклонение.`,

  sections: [],

  vocabulary: [
    // Ежедневие
    { id: 'ejednevie', bulgarian: 'ежедневие', translations: { en: 'daily life, everyday routine', fr: 'vie quotidienne', ar: 'الحياة اليومية', fa: 'زندگی روزمره', ru: 'повседневная жизнь', uk: 'повсякдення' } },
    { id: 'zakuska', bulgarian: 'закуска, закуски', translations: { en: 'breakfast', fr: 'petit-déjeuner', ar: 'فطور', fa: 'صبحانه', ru: 'завтрак', uk: 'сніданок' } },
    { id: 'brasna-se', bulgarian: 'бръсна се', translations: { en: 'to shave', fr: 'se raser', ar: 'يحلق', fa: 'اصلاح کردن', ru: 'бриться', uk: 'голитися' } },
    { id: 'oblicham-se', bulgarian: 'обличам се', translations: { en: 'to get dressed', fr: "s'habiller", ar: 'يرتدي الملابس', fa: 'لباس پوشیدن', ru: 'одеваться', uk: 'одягатися' } },
    { id: 'sabuzhdam', bulgarian: 'събуждам', translations: { en: 'to wake (someone) up', fr: 'réveiller', ar: 'يوقظ', fa: 'بیدار کردن', ru: 'будить', uk: 'будити' } },
    { id: 'detska-gradina', bulgarian: 'детска градина', translations: { en: 'kindergarten', fr: 'école maternelle', ar: 'روضة أطفال', fa: 'مهد کودک', ru: 'детский сад', uk: 'дитячий садок' } },
    { id: 'avtochasti', bulgarian: 'авточасти', translations: { en: 'car parts', fr: 'pièces automobiles', ar: 'قطع غيار السيارات', fa: 'قطعات خودرو', ru: 'автозапчасти', uk: 'автозапчастини' } },
    { id: 'pazarche', bulgarian: 'пазарче, пазар', translations: { en: 'small market, market', fr: 'petit marché', ar: 'سوق صغير', fa: 'بازارچه', ru: 'рынок, базарчик', uk: 'ринок, базарчик' } },
    { id: 'zelenchutsi', bulgarian: 'зеленчуци', translations: { en: 'vegetables', fr: 'légumes', ar: 'خضروات', fa: 'سبزیجات', ru: 'овощи', uk: 'овочі' } },
    { id: 'razhodka', bulgarian: 'разходка, разходки', translations: { en: 'walk, stroll', fr: 'promenade', ar: 'نزهة', fa: 'قدم زدن', ru: 'прогулка', uk: 'прогулянка' } },
    { id: 'servira', bulgarian: 'сервирам', translations: { en: 'to serve (food)', fr: 'servir', ar: 'يقدّم الطعام', fa: 'سرو کردن', ru: 'подавать (еду)', uk: 'подавати (їжу)' } },

    // Работа и училище
    { id: 'kolega-serv', bulgarian: 'колега, колеги', translations: { en: 'colleague, -s', fr: 'collègue', ar: 'زميل', fa: 'همکار', ru: 'коллега', uk: 'колега' } },
    { id: 'operativka', bulgarian: 'оперативка', translations: { en: 'staff meeting, briefing', fr: 'réunion de travail', ar: 'اجتماع عمل', fa: 'جلسه کاری', ru: 'планёрка', uk: 'нарада' } },
    { id: 'ekskurziya', bulgarian: 'екскурзия, екскурзии', translations: { en: 'excursion, trip', fr: 'excursion', ar: 'رحلة', fa: 'گردش', ru: 'экскурсия', uk: 'екскурсія' } },
    { id: 'test', bulgarian: 'тест, тестове', translations: { en: 'test', fr: 'test, contrôle', ar: 'اختبار', fa: 'آزمون', ru: 'тест, контрольная', uk: 'тест, контрольна' } },
    { id: 'pritesnen', bulgarian: 'притеснен, -а, -о, -и', translations: { en: 'worried, nervous', fr: 'inquiet, nerveux', ar: 'قلق', fa: 'نگران', ru: 'обеспокоенный', uk: 'занепокоєний' } },
    { id: 'prizvanie', bulgarian: 'призвание', translations: { en: 'vocation, calling', fr: 'vocation', ar: 'رسالة، دعوة مهنية', fa: 'رسالت شغلی', ru: 'призвание', uk: 'покликання' } },
    { id: 'metro', bulgarian: 'метро', translations: { en: 'metro, underground', fr: 'métro', ar: 'مترو', fa: 'مترو', ru: 'метро', uk: 'метро' } },
    { id: 'navreme', bulgarian: 'навреме', translations: { en: 'on time', fr: "à l'heure", ar: 'في الوقت المحدد', fa: 'به‌موقع', ru: 'вовремя', uk: 'вчасно' } },

    // Домакинска работа
    { id: 'domakinya', bulgarian: 'домакиня', translations: { en: 'housewife, homemaker', fr: 'femme au foyer', ar: 'ربة منزل', fa: 'خانه‌دار', ru: 'домохозяйка', uk: 'домогосподарка' } },
    { id: 'chistene', bulgarian: 'чистене', translations: { en: 'cleaning', fr: 'nettoyage', ar: 'تنظيف', fa: 'نظافت', ru: 'уборка', uk: 'прибирання' } },
    { id: 'gotvene', bulgarian: 'готвене', translations: { en: 'cooking', fr: 'cuisine', ar: 'طبخ', fa: 'آشپزی', ru: 'готовка', uk: 'готування' } },
    { id: 'prane', bulgarian: 'пране', translations: { en: 'laundry, washing', fr: 'lessive', ar: 'غسيل الملابس', fa: 'شست‌وشوی لباس', ru: 'стирка', uk: 'прання' } },
    { id: 'gladene', bulgarian: 'гладене', translations: { en: 'ironing', fr: 'repassage', ar: 'كي الملابس', fa: 'اتو کردن', ru: 'глажка', uk: 'прасування' } },
    { id: 'pazaruvane', bulgarian: 'пазаруване', translations: { en: 'shopping', fr: 'courses, achats', ar: 'التسوق', fa: 'خرید', ru: 'покупки', uk: 'покупки' } },
    { id: 'palachinki', bulgarian: 'палачинки', translations: { en: 'pancakes', fr: 'crêpes', ar: 'فطائر محلاة', fa: 'پنکیک', ru: 'блины', uk: 'млинці' } },
    { id: 'obeshtavam', bulgarian: 'обещавам', translations: { en: 'to promise', fr: 'promettre', ar: 'يعد', fa: 'قول دادن', ru: 'обещать', uk: 'обіцяти' } },

    // Умна къща
    { id: 'umna-kashta', bulgarian: 'умна къща', translations: { en: 'smart home', fr: 'maison intelligente', ar: 'منزل ذكي', fa: 'خانه هوشمند', ru: 'умный дом', uk: 'розумний дім' } },
    { id: 'elektrouredi', bulgarian: 'електроуреди', translations: { en: 'electrical appliances', fr: 'appareils électroménagers', ar: 'أجهزة كهربائية', fa: 'لوازم برقی', ru: 'электроприборы', uk: 'електроприлади' } },
    { id: 'osvetlenie', bulgarian: 'осветление', translations: { en: 'lighting', fr: 'éclairage', ar: 'إضاءة', fa: 'روشنایی', ru: 'освещение', uk: 'освітлення' } },
    { id: 'shtori', bulgarian: 'щори', translations: { en: 'blinds', fr: 'stores', ar: 'ستائر', fa: 'کرکره', ru: 'жалюзи', uk: 'жалюзі' } },
    { id: 'alarma', bulgarian: 'аларма', translations: { en: 'alarm', fr: 'alarme', ar: 'إنذار', fa: 'زنگ خطر', ru: 'сигнализация', uk: 'сигналізація' } },
    { id: 'solarni-paneli', bulgarian: 'соларни панели', translations: { en: 'solar panels', fr: 'panneaux solaires', ar: 'ألواح شمسية', fa: 'پنل خورشیدی', ru: 'солнечные панели', uk: 'сонячні панелі' } },
    { id: 'distantsionno', bulgarian: 'дистанционно', translations: { en: 'remote control; remotely', fr: 'télécommande; à distance', ar: 'جهاز تحكم عن بعد', fa: 'کنترل از راه دور', ru: 'пульт; дистанционно', uk: 'пульт; дистанційно' } },
    { id: 'smartfon', bulgarian: 'смартфон', translations: { en: 'smartphone', fr: 'smartphone', ar: 'هاتف ذكي', fa: 'گوشی هوشمند', ru: 'смартфон', uk: 'смартфон' } },
  ],

  // grammarReference — ще се добави след финален преглед на урока.

  culturalNotes: [
    {
      id: 'b1-l03-culture-semeystvo',
      title: 'Многопоколенните семейства в България',
      content: 'В България все още е обичайно няколко поколения да живеят заедно или много близо едно до друго. Бабите и дядовците често помагат за отглеждането на внуците — водят ги на детска градина и на училище, готвят и се грижат за дома, докато родителите са на работа. Тази взаимна помощ между поколенията е важна част от българския семеен живот. В много семейства неделният обяд е повод цялото семейство да се събере на една маса.',
    },
    {
      id: 'b1-l03-culture-den',
      title: 'Един делник в България',
      content: 'Работният ден в България обикновено започва в 9:00 и завършва към 17:30 или 18:00 часа. В големите градове като София хората често пътуват до работа с метро, автобус или трамвай, а сутрешният час пик е между 8:00 и 9:00. Учениците са на училище на две смени — първа смяна сутрин и втора смяна следобед. След работа мнозина обичат да се разходят в парка, да си купят пресни зеленчуци от квартален пазар или да пият кафе с приятели.',
    },
  ],
};

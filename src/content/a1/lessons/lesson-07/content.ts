import type { LessonContent } from '@/content/types';

export const content: LessonContent = {
  introduction:
    'Ще научите как да говорите за времето — дни на седмицата, месеци, сезони, метеорологично време и часовник. Ще се запознаете с редните числителни, предлозите за време и глагола ОТИВАМ.',

  sections: [],

  dialogues: [
    // ДИАЛОЗИ 1 — ден и дата
    {
      id: 'l07-dialozi-01-a',
      speakers: [
        { name: 'А', text: '– Кой ден е днес?' },
        { name: 'Б', text: '– Днес е понеделник.' },
        { name: 'А', text: '– А утре?' },
        { name: 'Б', text: '– Утре е вторник.' },
      ],
    },
    {
      id: 'l07-dialozi-01-b',
      speakers: [
        { name: 'А', text: '– Коя дата е днес?' },
        { name: 'Б', text: '– Днес е девети декември. Имам рожден ден.' },
        { name: 'А', text: '– Честит рожден ден!' },
      ],
    },
    // ДИАЛОЗИ 2 — часовник
    {
      id: 'l07-dialozi-02-a',
      speakers: [
        { name: 'А', text: '– Извинете, колко е часът?' },
        { name: 'Б', text: '– Два и петнайсет.' },
        { name: 'А', text: '– Благодаря.' },
        { name: 'Б', text: '– Моля.' },
      ],
    },
    {
      id: 'l07-dialozi-02-b',
      speakers: [
        { name: 'А', text: '– В колко часа вечеряте?' },
        { name: 'Б', text: '– В седем часа.' },
      ],
    },
    // ДИАЛОЗИ 3 — кафе, чай, рожден ден
    {
      id: 'l07-dialozi-03-a',
      speakers: [
        { name: 'А', text: '– Кога пиеш кафе?' },
        { name: 'Б', text: '– Сутрин. А ти?' },
        { name: 'А', text: '– Сутрин, на обяд и следобед. Обичам кафе!' },
      ],
    },
    {
      id: 'l07-dialozi-03-b',
      speakers: [
        { name: 'А', text: '– Кога пиеш чай?' },
        { name: 'Б', text: '– Сутрин и вечер. А ти?' },
        { name: 'А', text: '– Аз пия един чай на обяд.' },
      ],
    },
    {
      id: 'l07-dialozi-03-v',
      speakers: [
        { name: 'А', text: '– Кога си роден?' },
        { name: 'Б', text: '– Роден съм на първи март хиляда деветстотин осемдесет и втора година. А ти?' },
        { name: 'А', text: '– Аз съм родена на двайсет и пети май хиляда деветстотин деветдесет и четвърта година.' },
      ],
    },
    // ДИАЛОЗИ 4 — довиждане и уикенд
    {
      id: 'l07-dialozi-04-a',
      speakers: [
        { name: 'А', text: '– Довиждане, Ани! Приятна вечер!' },
        { name: 'Б', text: '– Благодаря, подобно.' },
        { name: 'А', text: '– До утре!' },
        { name: 'Б', text: '– До утре!' },
      ],
    },
    {
      id: 'l07-dialozi-04-b',
      speakers: [
        { name: 'А', text: '– Приятен уикенд!' },
        { name: 'Б', text: '– Подобно! До понеделник!' },
      ],
    },
    {
      id: 'l07-dialozi-04-v',
      speakers: [
        { name: 'А', text: '– Здравей! Как си?' },
        { name: 'Б', text: '– Много добре. А ти?' },
        { name: 'А', text: '– Аз също. Къде отиваш?' },
        { name: 'Б', text: '– Отивам на кино. А ти?' },
        { name: 'А', text: '– Имам среща с приятели. До скоро!' },
        { name: 'Б', text: '– До скоро!' },
      ],
    },
  ],

  vocabulary: [
    // Поздрави и пожелания
    { id: 'dobro-utro',       bulgarian: 'Добро утро!',        translations: { en: 'Good morning!',        fr: 'Bonjour !',               ar: 'صباح الخير!',          fa: 'صبح بخیر!',             ru: 'Доброе утро!',            uk: 'Добрий ранок!'           } },
    { id: 'dobar-den',        bulgarian: 'Добър ден!',          translations: { en: 'Good day!',            fr: 'Bonjour !',               ar: 'نهارك سعيد!',          fa: 'روز بخیر!',             ru: 'Добрый день!',            uk: 'Добрий день!'            } },
    { id: 'dobar-vecher',     bulgarian: 'Добър вечер!',        translations: { en: 'Good evening!',        fr: 'Bonsoir !',               ar: 'مساء الخير!',          fa: 'عصر بخیر!',             ru: 'Добрый вечер!',           uk: 'Добрий вечір!'           } },
    { id: 'leka-nosht',       bulgarian: 'Лека нощ!',           translations: { en: 'Good night!',          fr: 'Bonne nuit !',            ar: 'تصبح على خير!',        fa: 'شب بخیر!',              ru: 'Спокойной ночи!',         uk: 'Надобраніч!'             } },
    { id: 'chestit-rozh-den', bulgarian: 'Честит рожден ден!', translations: { en: 'Happy birthday!',      fr: 'Joyeux anniversaire !',   ar: 'عيد ميلاد سعيد!',     fa: 'تولدت مبارک!',          ru: 'С днём рождения!',        uk: 'З днем народження!'      } },
    { id: 'priyaten-uikend',  bulgarian: 'Приятен уикенд!',    translations: { en: 'Have a nice weekend!', fr: 'Bon week-end !',          ar: 'نهاية أسبوع سعيدة!',  fa: 'آخر هفته خوش!',         ru: 'Приятных выходных!',      uk: 'Гарного уїкенду!'        } },
    { id: 'priyatna-vecher',  bulgarian: 'Приятна вечер!',     translations: { en: 'Have a nice evening!', fr: 'Bonne soirée !',          ar: 'أمسية طيبة!',          fa: 'شب خوش!',               ru: 'Приятного вечера!',       uk: 'Приємного вечора!'       } },
    { id: 'do-utro',          bulgarian: 'До утре!',            translations: { en: 'See you tomorrow!',    fr: 'À demain !',              ar: 'إلى اللقاء غداً!',     fa: 'تا فردا!',              ru: 'До завтра!',              uk: 'До завтра!'              } },
    { id: 'do-skoro',         bulgarian: 'До скоро!',           translations: { en: 'See you soon!',        fr: 'À bientôt !',             ar: 'إلى اللقاء قريباً!',   fa: 'تا زودی!',              ru: 'До скорого!',             uk: 'До скорого!'             } },
    // Календар
    { id: 'kalendar',         bulgarian: 'календар',            translations: { en: 'calendar',             fr: 'calendrier',              ar: 'تقويم',                fa: 'تقویم',                 ru: 'календарь',               uk: 'календар'                } },
    { id: 'den',              bulgarian: 'ден',                 translations: { en: 'day',                  fr: 'jour',                    ar: 'يوم',                  fa: 'روز',                   ru: 'день',                    uk: 'день'                    } },
    { id: 'sedmitsa',         bulgarian: 'седмица',             translations: { en: 'week',                 fr: 'semaine',                 ar: 'أسبوع',                fa: 'هفته',                  ru: 'неделя',                  uk: 'тиждень'                 } },
    { id: 'mesets',           bulgarian: 'месец',               translations: { en: 'month',                fr: 'mois',                    ar: 'شهر',                  fa: 'ماه',                   ru: 'месяц',                   uk: 'місяць'                  } },
    { id: 'godina',           bulgarian: 'година',              translations: { en: 'year',                 fr: 'an, année',               ar: 'سنة',                  fa: 'سال',                   ru: 'год',                     uk: 'рік'                     } },
    { id: 'data',             bulgarian: 'дата',                translations: { en: 'date',                 fr: 'date',                    ar: 'تاريخ',                fa: 'تاریخ',                 ru: 'дата',                    uk: 'дата'                    } },
    // Дни на седмицата
    { id: 'ponedelnik',       bulgarian: 'понеделник',          translations: { en: 'Monday',               fr: 'lundi',                   ar: 'الاثنين',              fa: 'دوشنبه',                ru: 'понедельник',             uk: 'понеділок'               } },
    { id: 'vtornik',          bulgarian: 'вторник',             translations: { en: 'Tuesday',              fr: 'mardi',                   ar: 'الثلاثاء',             fa: 'سه‌شنبه',               ru: 'вторник',                 uk: 'вівторок'                } },
    { id: 'sryada',           bulgarian: 'сряда',               translations: { en: 'Wednesday',            fr: 'mercredi',                ar: 'الأربعاء',             fa: 'چهارشنبه',              ru: 'среда',                   uk: 'середа'                  } },
    { id: 'chetvartuk',       bulgarian: 'четвъртък',           translations: { en: 'Thursday',             fr: 'jeudi',                   ar: 'الخميس',               fa: 'پنجشنبه',               ru: 'четверг',                 uk: 'четвер'                  } },
    { id: 'petuk',            bulgarian: 'петък',               translations: { en: 'Friday',               fr: 'vendredi',                ar: 'الجمعة',               fa: 'جمعه',                  ru: 'пятница',                 uk: 'п\'ятниця'               } },
    { id: 'sabota',           bulgarian: 'събота',              translations: { en: 'Saturday',             fr: 'samedi',                  ar: 'السبت',                fa: 'شنبه',                  ru: 'суббота',                 uk: 'субота'                  } },
    { id: 'nedelya',          bulgarian: 'неделя',              translations: { en: 'Sunday',               fr: 'dimanche',                ar: 'الأحد',                fa: 'یکشنبه',                ru: 'воскресенье',             uk: 'неділя'                  } },
    // Месеци
    { id: 'yanuari',          bulgarian: 'януари',              translations: { en: 'January',              fr: 'janvier',                 ar: 'يناير',                fa: 'ژانویه',                ru: 'январь',                  uk: 'січень'                  } },
    { id: 'fevruari',         bulgarian: 'февруари',            translations: { en: 'February',             fr: 'février',                 ar: 'فبراير',               fa: 'فوریه',                 ru: 'февраль',                 uk: 'лютий'                   } },
    { id: 'mart',             bulgarian: 'март',                translations: { en: 'March',                fr: 'mars',                    ar: 'مارس',                 fa: 'مارس',                  ru: 'март',                    uk: 'березень'                } },
    { id: 'april',            bulgarian: 'април',               translations: { en: 'April',                fr: 'avril',                   ar: 'أبريل',                fa: 'آوریل',                 ru: 'апрель',                  uk: 'квітень'                 } },
    { id: 'may',              bulgarian: 'май',                 translations: { en: 'May',                  fr: 'mai',                     ar: 'مايو',                 fa: 'مه',                    ru: 'май',                     uk: 'травень'                 } },
    { id: 'yuni',             bulgarian: 'юни',                 translations: { en: 'June',                 fr: 'juin',                    ar: 'يونيو',                fa: 'ژوئن',                  ru: 'июнь',                    uk: 'червень'                 } },
    { id: 'yuli',             bulgarian: 'юли',                 translations: { en: 'July',                 fr: 'juillet',                 ar: 'يوليو',                fa: 'ژوئیه',                 ru: 'июль',                    uk: 'липень'                  } },
    { id: 'avgust',           bulgarian: 'август',              translations: { en: 'August',               fr: 'août',                    ar: 'أغسطس',                fa: 'اوت',                   ru: 'август',                  uk: 'серпень'                 } },
    { id: 'septemvri',        bulgarian: 'септември',           translations: { en: 'September',            fr: 'septembre',               ar: 'سبتمبر',               fa: 'سپتامبر',               ru: 'сентябрь',                uk: 'вересень'                } },
    { id: 'oktomvri',         bulgarian: 'октомври',            translations: { en: 'October',              fr: 'octobre',                 ar: 'أكتوبر',               fa: 'اکتبر',                 ru: 'октябрь',                 uk: 'жовтень'                 } },
    { id: 'noemvri',          bulgarian: 'ноември',             translations: { en: 'November',             fr: 'novembre',                ar: 'نوفمبر',               fa: 'نوامبر',                ru: 'ноябрь',                  uk: 'листопад'                } },
    { id: 'dekemvri',         bulgarian: 'декември',            translations: { en: 'December',             fr: 'décembre',                ar: 'ديسمبر',               fa: 'دسامبر',                ru: 'декабрь',                 uk: 'грудень'                 } },
    // Сезони
    { id: 'prolet',           bulgarian: 'пролет',              translations: { en: 'spring',               fr: 'printemps',               ar: 'ربيع',                 fa: 'بهار',                  ru: 'весна',                   uk: 'весна'                   } },
    { id: 'lyato',            bulgarian: 'лято',                translations: { en: 'summer',               fr: 'été',                     ar: 'صيف',                  fa: 'تابستان',               ru: 'лето',                    uk: 'літо'                    } },
    { id: 'esen',             bulgarian: 'есен',                translations: { en: 'autumn, fall',         fr: 'automne',                 ar: 'خريف',                 fa: 'پاییز',                 ru: 'осень',                   uk: 'осінь'                   } },
    { id: 'zima',             bulgarian: 'зима',                translations: { en: 'winter',               fr: 'hiver',                   ar: 'شتاء',                 fa: 'زمستان',                ru: 'зима',                    uk: 'зима'                    } },
    { id: 'sezon',            bulgarian: 'сезон',               translations: { en: 'season',               fr: 'saison',                  ar: 'فصل',                  fa: 'فصل',                   ru: 'сезон',                   uk: 'сезон'                   } },
    // Метеорологично време
    { id: 'vreme',            bulgarian: 'време',               translations: { en: 'time; weather',        fr: 'temps',                   ar: 'وقت؛ طقس',             fa: 'زمان؛ آب و هوا',        ru: 'время; погода',           uk: 'час; погода'             } },
    { id: 'studeno',          bulgarian: 'студено',             translations: { en: 'cold',                 fr: 'froid',                   ar: 'بارد',                 fa: 'سرد',                   ru: 'холодно',                 uk: 'холодно'                 } },
    { id: 'hladno',           bulgarian: 'хладно',              translations: { en: 'cool',                 fr: 'frais',                   ar: 'بارد نسبياً',          fa: 'خنک',                   ru: 'прохладно',               uk: 'прохолодно'              } },
    { id: 'toplo',            bulgarian: 'топло',               translations: { en: 'warm',                 fr: 'chaud',                   ar: 'دافئ',                 fa: 'گرم',                   ru: 'тепло',                   uk: 'тепло'                   } },
    { id: 'goreshto',         bulgarian: 'горещо',              translations: { en: 'hot',                  fr: 'très chaud',              ar: 'حار',                  fa: 'گرم و سوزان',           ru: 'жарко',                   uk: 'спекотно'                } },
    { id: 'slantse',          bulgarian: 'слънце',              translations: { en: 'sun',                  fr: 'soleil',                  ar: 'شمس',                  fa: 'خورشید',                ru: 'солнце',                  uk: 'сонце'                   } },
    { id: 'slanchevo',        bulgarian: 'слънчево',            translations: { en: 'sunny',                fr: 'ensoleillé',              ar: 'مشمس',                 fa: 'آفتابی',                ru: 'солнечно',                uk: 'сонячно'                 } },
    { id: 'oblak-oblatsi',    bulgarian: 'облак, облаци',       translations: { en: 'cloud, clouds',        fr: 'nuage, nuages',           ar: 'غيمة، غيوم',           fa: 'ابر، ابرها',             ru: 'облако, облака',          uk: 'хмара, хмари'            } },
    { id: 'oblachno',         bulgarian: 'облачно',             translations: { en: 'cloudy',               fr: 'nuageux',                 ar: 'غائم',                 fa: 'ابری',                  ru: 'облачно',                 uk: 'хмарно'                  } },
    { id: 'dazh',             bulgarian: 'дъжд',                translations: { en: 'rain',                 fr: 'pluie',                   ar: 'مطر',                  fa: 'باران',                 ru: 'дождь',                   uk: 'дощ'                     } },
    { id: 'dazhdovno',        bulgarian: 'дъждовно',            translations: { en: 'rainy',                fr: 'pluvieux',                ar: 'ممطر',                 fa: 'بارانی',                ru: 'дождливо',                uk: 'дощово'                  } },
    { id: 'snyag',            bulgarian: 'сняг',                translations: { en: 'snow',                 fr: 'neige',                   ar: 'ثلج',                  fa: 'برف',                   ru: 'снег',                    uk: 'сніг'                    } },
    { id: 'vyatur',           bulgarian: 'вятър',               translations: { en: 'wind',                 fr: 'vent',                    ar: 'ريح',                  fa: 'باد',                   ru: 'ветер',                   uk: 'вітер'                   } },
    { id: 'vetrovito',        bulgarian: 'ветровито',           translations: { en: 'windy',                fr: 'venteux',                 ar: 'عاصف',                 fa: 'بادی',                  ru: 'ветрено',                 uk: 'вітряно'                 } },
    { id: 'magla',            bulgarian: 'мъгла',               translations: { en: 'fog',                  fr: 'brouillard',              ar: 'ضباب',                 fa: 'مه',                    ru: 'туман',                   uk: 'туман'                   } },
    { id: 'magliovo',         bulgarian: 'мъгливо',             translations: { en: 'foggy',                fr: 'brumeux',                 ar: 'ضبابي',                fa: 'مه‌آلود',               ru: 'туманно',                 uk: 'туманно'                 } },
    // Час
    { id: 'chas',             bulgarian: 'час',                 translations: { en: 'hour; o\'clock',       fr: 'heure',                   ar: 'ساعة',                 fa: 'ساعت',                  ru: 'час',                     uk: 'година'                  } },
    { id: 'kolko-e-chasat',   bulgarian: 'Колко е часът?',      translations: { en: 'What\'s the time?',    fr: 'Quelle heure est-il ?',   ar: 'كم الساعة؟',           fa: 'ساعت چند است؟',         ru: 'Который час?',            uk: 'Котра година?'           } },
    { id: 'polovina',         bulgarian: 'половина',            translations: { en: 'half',                 fr: 'demi',                    ar: 'نصف',                  fa: 'نیم',                   ru: 'половина',                uk: 'половина'                } },
    { id: 'chetvurt',         bulgarian: 'четвърт',             translations: { en: 'quarter',              fr: 'quart',                   ar: 'ربع',                  fa: 'ربع',                   ru: 'четверть',                uk: 'чверть'                  } },
    // Части на денонощието
    { id: 'sutrinta',         bulgarian: 'сутринта',            translations: { en: 'in the morning',       fr: 'le matin',                ar: 'في الصباح',            fa: 'صبح',                   ru: 'утром',                   uk: 'вранці'                  } },
    { id: 'predi-obed',       bulgarian: 'преди обяд',          translations: { en: 'before noon',          fr: 'avant midi',              ar: 'قبل الظهر',            fa: 'قبل از ظهر',            ru: 'до полудня',              uk: 'до обіду'                } },
    { id: 'na-obed',          bulgarian: 'на обяд',             translations: { en: 'at noon, at lunch',    fr: 'à midi',                  ar: 'في الظهيرة',           fa: 'ظهر',                   ru: 'в обед',                  uk: 'в обід'                  } },
    { id: 'sledobed',         bulgarian: 'следобед',            translations: { en: 'in the afternoon',     fr: 'l\'après-midi',           ar: 'بعد الظهر',            fa: 'بعد از ظهر',            ru: 'после полудня',           uk: 'після обіду'             } },
    { id: 'vecherpa',         bulgarian: 'вечерта',             translations: { en: 'in the evening',       fr: 'le soir',                 ar: 'في المساء',            fa: 'شب',                    ru: 'вечером',                 uk: 'увечері'                 } },
    { id: 'prez-denya',       bulgarian: 'през деня',           translations: { en: 'during the day',       fr: 'pendant la journée',      ar: 'خلال النهار',          fa: 'در طول روز',            ru: 'в течение дня',           uk: 'вдень'                   } },
    { id: 'prez-noshta',      bulgarian: 'през нощта',          translations: { en: 'at night',             fr: 'la nuit',                 ar: 'في الليل',             fa: 'در شب',                 ru: 'ночью',                   uk: 'вночі'                   } },
    // Предлози за време
    { id: 'predi',            bulgarian: 'преди',               translations: { en: 'before',               fr: 'avant',                   ar: 'قبل',                  fa: 'قبل از',                ru: 'до, перед',               uk: 'до, перед'               } },
    { id: 'sled',             bulgarian: 'след',                translations: { en: 'after',                fr: 'après',                   ar: 'بعد',                  fa: 'بعد از',                ru: 'после',                   uk: 'після'                   } },
    { id: 'ot-do',            bulgarian: 'от … до …',           translations: { en: 'from … to …',         fr: 'de … à …',               ar: 'من … إلى …',           fa: 'از … تا …',             ru: 'от … до …',               uk: 'від … до …'              } },
    { id: 'prez',             bulgarian: 'през',                translations: { en: 'in (month/season)',     fr: 'en (mois/saison)',        ar: 'في (شهر/موسم)',         fa: 'در (ماه/فصل)',           ru: 'в (месяц/сезон)',         uk: 'у (місяць/сезон)'        } },
    { id: 'utre',             bulgarian: 'утре',                translations: { en: 'tomorrow',             fr: 'demain',                  ar: 'غداً',                 fa: 'فردا',                  ru: 'завтра',                  uk: 'завтра'                  } },
    { id: 'dnes',             bulgarian: 'днес',                translations: { en: 'today',                fr: 'aujourd\'hui',            ar: 'اليوم',                fa: 'امروز',                 ru: 'сегодня',                 uk: 'сьогодні'                } },
    // Посоки на света
    { id: 'sever',            bulgarian: 'север',               translations: { en: 'North',                fr: 'nord',                    ar: 'شمال',                 fa: 'شمال',                  ru: 'север',                   uk: 'північ'                   } },
    { id: 'yug',              bulgarian: 'юг',                  translations: { en: 'South',                fr: 'sud',                     ar: 'جنوب',                 fa: 'جنوب',                  ru: 'юг',                      uk: 'південь'                 } },
    { id: 'iztok',            bulgarian: 'изток',               translations: { en: 'East',                 fr: 'est',                     ar: 'شرق',                  fa: 'شرق',                   ru: 'восток',                  uk: 'схід'                    } },
    { id: 'zapad',            bulgarian: 'запад',               translations: { en: 'West',                 fr: 'ouest',                   ar: 'غرب',                  fa: 'غرب',                   ru: 'запад',                   uk: 'захід'                   } },
    { id: 'severoiztok',      bulgarian: 'североизток',         translations: { en: 'Northeast',            fr: 'nord-est',                ar: 'شمال شرقي',            fa: 'شمال شرقی',             ru: 'северо-восток',           uk: 'північний схід'          } },
    { id: 'yugoiztok',        bulgarian: 'югоизток',            translations: { en: 'Southeast',            fr: 'sud-est',                 ar: 'جنوب شرقي',            fa: 'جنوب شرقی',             ru: 'юго-восток',              uk: 'південний схід'          } },
    { id: 'yugozapad',        bulgarian: 'югозапад',            translations: { en: 'Southwest',            fr: 'sud-ouest',               ar: 'جنوب غربي',            fa: 'جنوب غربی',             ru: 'юго-запад',               uk: 'південний захід'         } },
    { id: 'severozapad',      bulgarian: 'северозапад',         translations: { en: 'Northwest',            fr: 'nord-ouest',              ar: 'شمال غربي',            fa: 'شمال غربی',             ru: 'северо-запад',            uk: 'північний захід'         } },
    // Глаголи
    { id: 'otivam',           bulgarian: 'отивам, -аш',         translations: { en: 'to go',                fr: 'aller',                   ar: 'يذهب',                 fa: 'رفتن',                  ru: 'идти, ехать',             uk: 'іти, їхати'              } },
    { id: 'greya',            bulgarian: 'грея, -еш',           translations: { en: 'to shine',             fr: 'briller',                 ar: 'يسطع',                 fa: 'درخشیدن',               ru: 'светить',                 uk: 'світити'                 } },
    { id: 'duha',             bulgarian: 'духа, -аш',           translations: { en: 'to blow',              fr: 'souffler',                ar: 'يهب',                  fa: 'وزیدن',                 ru: 'дуть',                    uk: 'дути'                    } },
    { id: 'vali',             bulgarian: 'вали дъжд/сняг',      translations: { en: 'it\'s raining/snowing', fr: 'il pleut/neige',         ar: 'تمطر/تثلج',             fa: 'باران/برف می‌بارد',      ru: 'идёт дождь/снег',         uk: 'іде дощ/сніг'            } },
    // Разни
    { id: 'rozhden-den',      bulgarian: 'рожден ден',          translations: { en: 'birthday',             fr: 'anniversaire',            ar: 'عيد الميلاد',          fa: 'تولد',                  ru: 'день рождения',           uk: 'день народження'         } },
    { id: 'roden-sum',        bulgarian: 'роден съм',           translations: { en: 'I was born',           fr: 'je suis né(e)',           ar: 'وُلدتُ',               fa: 'متولد شدم',             ru: 'я родился/родилась',      uk: 'я народився/народилась'  } },
    { id: 'sreshta',          bulgarian: 'среща',               translations: { en: 'meeting; date',        fr: 'réunion; rendez-vous',    ar: 'اجتماع؛ موعد',          fa: 'جلسه؛ قرار',            ru: 'встреча; свидание',       uk: 'зустріч; побачення'      } },
    { id: 'razhodka',         bulgarian: 'разходка',            translations: { en: 'walk',                 fr: 'promenade',               ar: 'نزهة',                 fa: 'گردش',                  ru: 'прогулка',                uk: 'прогулянка'              } },
    { id: 'zaet',             bulgarian: 'зает, -а, -о, -и',   translations: { en: 'busy',                 fr: 'occupé(e)',               ar: 'مشغول',                fa: 'مشغول',                 ru: 'занятый',                 uk: 'зайнятий'                } },
    { id: 'prekrasen',        bulgarian: 'прекрасен, -на, -но', translations: { en: 'wonderful',            fr: 'magnifique',              ar: 'رائع',                 fa: 'زیبا، فوق‌العاده',      ru: 'прекрасный',              uk: 'чудовий'                 } },
    { id: 'natsionalen',      bulgarian: 'национален, -на, -но', translations: { en: 'national',            fr: 'national(e)',             ar: 'وطني',                 fa: 'ملی',                   ru: 'национальный',            uk: 'національний'            } },
    { id: 'nova-godina',      bulgarian: 'Нова година',         translations: { en: 'New Year',             fr: 'Nouvel An',               ar: 'رأس السنة الجديدة',    fa: 'سال نو',                ru: 'Новый год',               uk: 'Новий рік'               } },
    { id: 'cherno-more',      bulgarian: 'Черно море',          translations: { en: 'Black Sea',             fr: 'mer Noire',               ar: 'البحر الأسود',         fa: 'دریای سیاه',            ru: 'Чёрное море',             uk: 'Чорне море'              } },
  ],

  culturalNotes: [
    {
      id: 'l07-culture-01',
      title: {
        bg: 'Климатът на България',
        en: 'Bulgaria\'s climate',
        fr: 'Le climat de la Bulgarie',
        ar: 'مناخ بلغاريا',
        fa: 'آب و هوای بلغارستان',
        ru: 'Климат Болгарии',
        uk: 'Клімат Болгарії',
      },
      content: {
        bg: 'България има умерен климат. Зимата е студена и влажна, лятото е горещо и сухо. Средната годишна температура е около 10,5°C. Средната температура през януари е около 0°C, а лятото рядко надхвърля 30°C.',
        en: 'Bulgaria has a temperate climate with cold, damp winters and hot, dry summers. The average annual temperature is 10.5°C. The average January temperature is around 0°C. Average summer temperatures rarely exceed 30°C.',
        fr: 'La Bulgarie a un climat tempéré, avec des hivers froids et humides et des étés chauds et secs. La température annuelle moyenne est de 10,5 °C. La température moyenne en janvier est d\'environ 0 °C. Les températures estivales moyennes dépassent rarement 30 °C.',
        ar: 'تتميز بلغاريا بمناخ معتدل، مع شتاء بارد ورطب وصيف حار وجاف. يبلغ متوسط درجة الحرارة السنوية 10.5 درجة مئوية. يبلغ متوسط درجات الحرارة في يناير نحو 0 درجة مئوية، ونادراً ما تتجاوز درجات الحرارة الصيفية 30 درجة مئوية.',
        fa: 'بلغارستان آب و هوای معتدل دارد با زمستان‌های سرد و مرطوب و تابستان‌های گرم و خشک. میانگین دمای سالانه ۱۰.۵ درجه سانتیگراد است. میانگین دمای ژانویه حدود ۰ درجه سانتیگراد است و دمای تابستان به ندرت از ۳۰ درجه تجاوز می‌کند.',
        ru: 'Болгария имеет умеренный климат с холодной влажной зимой и жарким сухим летом. Средняя годовая температура составляет 10,5°C. Средняя температура в январе около 0°C. Средние летние температуры редко превышают 30°C.',
        uk: 'Болгарія має помірний клімат із холодними вологими зимами та спекотним сухим літом. Середньорічна температура становить 10,5°C. Середня температура в січні — близько 0°C. Середні літні температури рідко перевищують 30°C.',
      },
    },
    {
      id: 'l07-culture-02',
      title: {
        bg: 'Официални празници в България',
        en: 'Public holidays in Bulgaria',
        fr: 'Jours fériés en Bulgarie',
        ar: 'الأعياد الرسمية في بلغاريا',
        fa: 'تعطیلات رسمی بلغارستان',
        ru: 'Государственные праздники Болгарии',
        uk: 'Державні свята Болгарії',
      },
      content: {
        bg: 'Основните официални празници в България са: Нова година (1 януари), Освобождението на България (3 март), Великден, Денят на азбуката (24 май), Денят на Съединението (6 септември), Денят на независимостта (22 септември) и Коледа (24 и 25 декември).',
        en: 'Major holidays in Bulgaria are New Year (January 1), Liberation Day (March 3), Easter, The Cyrillic Alphabet Day (May 24), Reunification Day (September 6), Independence Day (September 22), and Christmas (December 24 and 25).',
        fr: 'Les principaux jours fériés en Bulgarie sont le Nouvel An (1er janvier), la Libération (3 mars), Pâques, la Journée de l\'alphabet cyrillique (24 mai), la Réunification (6 septembre), l\'Indépendance (22 septembre) et Noël (24 et 25 décembre).',
        ar: 'أبرز الأعياد الرسمية في بلغاريا: رأس السنة (1 يناير)، يوم التحرير (3 مارس)، عيد الفصح، يوم الأبجدية الكيريلية (24 مايو)، يوم الوحدة (6 سبتمبر)، يوم الاستقلال (22 سبتمبر)، وعيد الميلاد (24 و25 ديسمبر).',
        fa: 'مهم‌ترین تعطیلات رسمی بلغارستان عبارتند از: سال نو (۱ ژانویه)، روز آزادی (۳ مارس)، عید پاک، روز الفبای سیریلیک (۲۴ مه)، روز اتحاد (۶ سپتامبر)، روز استقلال (۲۲ سپتامبر)، و کریسمس (۲۴ و ۲۵ دسامبر).',
        ru: 'Главные праздники Болгарии: Новый год (1 января), День освобождения (3 марта), Пасха, День кириллического алфавита (24 мая), День объединения (6 сентября), День независимости (22 сентября) и Рождество (24 и 25 декабря).',
        uk: 'Головні свята Болгарії: Новий рік (1 січня), День визволення (3 березня), Великдень, День кириличного алфавіту (24 травня), День об\'єднання (6 вересня), День незалежності (22 вересня) та Різдво (24 і 25 грудня).',
      },
    },
    {
      id: 'l07-culture-03',
      title: {
        bg: 'Баба Марта (1 март)',
        en: 'Baba Marta (March 1)',
        fr: 'Baba Marta (1er mars)',
        ar: 'بابا مارتا (1 مارس)',
        fa: 'بابا مارتا (۱ مارس)',
        ru: 'Баба Марта (1 марта)',
        uk: 'Баба Марта (1 березня)',
      },
      content: {
        bg: 'На 1 март българите си подаряват мартеници — червено-бели плетени конци. Носят се за здраве и щастие с настъпването на пролетта. Мартениците се свалят, когато видите щъркел или цъфнало дърво.',
        en: 'On March 1 (Баба Марта) Bulgarians give one another мартеници — red and white tasseled threads which are worn for health and happiness at the coming of spring. The мартеница is removed when you see a stork or a blossoming tree.',
        fr: 'Le 1er mars (Баба Марта), les Bulgares s\'offrent des мартеници — des fils tressés rouges et blancs portés pour la santé et le bonheur à l\'arrivée du printemps. On retire la мартеница quand on voit une cigogne ou un arbre en fleurs.',
        ar: 'في الأول من مارس (بابا مارتا)، يتبادل البلغاريون المارتينيتسي — خيوط مضفورة حمراء وبيضاء ترمز للصحة والسعادة مع قدوم الربيع. تُخلع المارتينيتسا عند رؤية لقلق أو شجرة مزهرة.',
        fa: 'در اول مارس (باباه مارتا) بلغارها به یکدیگر مارتنیتسا می‌دهند — نخ‌های بافته شده قرمز و سفید که به خاطر سلامتی و شادی در آستانه بهار پوشیده می‌شوند. مارتنیتسا را وقتی لک‌لک یا درخت شکوفه را می‌بینید در می‌آورند.',
        ru: 'Первого марта (Баба Марта) болгары дарят друг другу мартеницы — красно-белые плетёные нити, которые носят для здоровья и счастья с приходом весны. Мартеницу снимают, когда увидят аиста или зацветшее дерево.',
        uk: 'Першого березня (Баба Марта) болгари дарують одне одному мартениці — червоно-білі плетені нитки, які носять для здоров\'я і щастя з приходом весни. Мартеницю знімають, коли побачать лелеку або дерево у цвіту.',
      },
    },
  ],

  grammarReference: [
    {
      id: 'l07-gr-redni-chislitelni',
      title: {
        bg: 'Редни числителни — първи, втори, трети…',
        en: 'Ordinal numerals — first, second, third…',
        fr: 'Numéraux ordinaux — premier, deuxième, troisième…',
        ar: 'أسماء العدد الترتيبية — الأول، الثاني، الثالث…',
        fa: 'اعداد ترتیبی — اول، دوم، سوم…',
        ru: 'Порядковые числительные — первый, второй, третий…',
        uk: 'Порядкові числівники — перший, другий, третій…',
      },
      content: {
        bg: `Редните числителни в българския език показват ред (първи, втори, трети…). За разлика от бройните числителни (един, два, три), те се държат като прилагателни — съгласуват се с рода и числото на съществителното.

Форми (1–10):
1 — първи, първа, първо, първи
2 — втори, втора, второ, втори
3 — трети, трета, трето, трети
4 — четвърти, четвърта, четвърто, четвърти
5 — пети, пета, пето, пети
6 — шести, шеста, шесто, шести
7 — седми, седма, седмо, седми
8 — осми, осма, осмо, осми
9 — девети, девета, девето, девети
10 — десети, десета, десето, десети

Кога се използват:
• За дати: Днес е девети декември.
• За редности: Той е първи. Тя е трета.
• За месеци (месец + ред): януари = първи месец, февруари = втори месец…
• За дни на седмицата (понеделник = първи ден на седмицата).

Примери:
Имам рожден ден на първи март. (1.III)
Тя е родена на двадесет и пети май. (25.V)
Седми клас. Шеста стая.`,
        en: `Ordinal numerals in Bulgarian indicate order (first, second, third…). Unlike cardinal numerals (один, two, three), they behave like adjectives — they agree with the gender and number of the noun.

Forms (1–10):
1 — първи (m.), първа (f.), първо (n.), първи (pl.)
2 — втори, втора, второ, втори
3 — трети, трета, трето, трети
4 — четвърти, четвърта, четвърто, четвърти
5 — пети, пета, пето, пети
6 — шести, шеста, шесто, шести
7 — седми, седма, седмо, седми
8 — осми, осма, осмо, осми
9 — девети, девета, девето, девети
10 — десети, десета, десето, десети

When to use them:
• For dates: Днес е девети декември. (Today is December 9.)
• For ranking: Той е първи. (He is first.) Тя е трета. (She is third.)
• For naming months by order: януари = първи месец, февруари = втори месец…
• For days of the week (понеделник = първи ден на седмицата).

Examples:
Имам рожден ден на първи март. (My birthday is on March 1.)
Тя е родена на двадесет и пети май. (She was born on May 25.)
Седми клас. (Seventh grade.) Шеста стая. (Room six.)`,
        fr: `Les numéraux ordinaux en bulgare indiquent l'ordre (premier, deuxième, troisième…). Contrairement aux numéraux cardinaux (un, deux, trois), ils se comportent comme des adjectifs — ils s'accordent en genre et en nombre avec le nom.

Formes (1–10) :
1 — първи (m.), първа (f.), първо (n.), първи (pl.)
2 — втори, втора, второ, втори
3 — трети, трета, трето, трети
4 — четвърти, четвърта, четвърто, четвърти
5 — пети, пета, пето, пети
6 — шести, шеста, шесто, шести
7 — седми, седма, седмо, седми
8 — осми, осма, осмо, осми
9 — девети, девета, девето, девети
10 — десети, десета, десето, десети

Quand les utiliser :
• Pour les dates : Днес е девети декември. (Aujourd'hui, c'est le 9 décembre.)
• Pour le classement : Той е първи. (Il est le premier.) Тя е трета. (Elle est la troisième.)
• Pour nommer les mois par leur ordre : януари = първи месец, февруари = втори месец…
• Pour les jours de la semaine (понеделник = първи ден на седмицата).

Exemples :
Имам рожден ден на първи март. (Mon anniversaire est le 1er mars.)
Тя е родена на двадесет и пети май. (Elle est née le 25 mai.)
Седми клас. (Septième classe.) Шеста стая. (Chambre six.)`,
        ar: `أسماء العدد الترتيبية في اللغة البلغارية تدل على الترتيب (الأول، الثاني، الثالث…). على خلاف أسماء العدد الأصلية (واحد، اثنان، ثلاثة)، فهي تتصرف مثل الصفات — أي تتفق مع الاسم في الجنس والعدد.

الأشكال (١–١٠):
١ — първи (مذكر)، първа (مؤنث)، първо (محايد)، първи (جمع)
٢ — втори، втора، второ، втори
٣ — трети، трета، трето، трети
٤ — четвърти، четвърта، четвърто، четвърти
٥ — пети، пета، пето، пети
٦ — шести، шеста، шесто، шести
٧ — седми، седма، седмо، седми
٨ — осми، осма، осмо، осми
٩ — девети، девета، девето، девети
١٠ — десети، десета، десето، десети

متى تُستخدم:
• للتواريخ: Днес е девети декември. (اليوم هو التاسع من ديسمبر.)
• للترتيب: Той е първи. (هو الأول.) Тя е трета. (هي الثالثة.)
• لتسمية الشهور بترتيبها: януари = първи месец (يناير = الشهر الأول)، февруари = втори месец (فبراير = الشهر الثاني)…
• لأيام الأسبوع (понеделник = първи ден на седмицата، أي الإثنين هو اليوم الأول من الأسبوع).

أمثلة:
Имам рожден ден на първи март. (عيد ميلادي في الأول من مارس.)
Тя е родена на двадесет и пети май. (وُلدت في الخامس والعشرين من مايو.)
Седми клас. (الصف السابع.) Шеста стая. (الغرفة السادسة.)`,
        fa: `اعداد ترتیبی در زبان بلغاری ترتیب را نشان می‌دهند (اول، دوم، سوم…). برخلاف اعداد اصلی (یک، دو، سه)، اعداد ترتیبی مانند صفت رفتار می‌کنند — یعنی با جنس و شمار اسم مطابقت می‌کنند.

شکل‌ها (۱–۱۰):
۱ — първи (مذکر)، първа (مؤنث)، първо (خنثی)، първи (جمع)
۲ — втори، втора، второ، втори
۳ — трети، трета، трето، трети
۴ — четвърти، четвърта، четвърто، четвърти
۵ — пети، пета، пето، пети
۶ — шести، шеста، шесто، шести
۷ — седми، седма، седмо، седми
۸ — осми، осма، осмо، осми
۹ — девети، девета، девето، девети
۱۰ — десети، десета، десето، десети

چه وقت استفاده می‌شوند:
• برای تاریخ‌ها: Днес е девети декември. (امروز نهم دسامبر است.)
• برای رتبه‌بندی: Той е първи. (او اول است.) Тя е трета. (او سوم است.)
• برای نام‌گذاری ماه‌ها بر اساس ترتیب: януари = първи месец (ژانویه = ماه اول)، февруари = втори месец (فوریه = ماه دوم)…
• برای روزهای هفته (понеделник = първи ден на седмицата، یعنی دوشنبه روز اول هفته است).

مثال‌ها:
Имам рожден ден на първи март. (تولد من اول مارس است.)
Тя е родена на двадесет и пети май. (او در بیست و پنجم مه به دنیا آمده است.)
Седми клас. (کلاس هفتم.) Шеста стая. (اتاق شش.)`,
        ru: `Порядковые числительные в болгарском языке обозначают порядок (первый, второй, третий…). В отличие от количественных числительных (один, два, три), они ведут себя как прилагательные — согласуются с родом и числом существительного.

Формы (1–10):
1 — първи (м. р.), първа (ж. р.), първо (ср. р.), първи (мн. ч.)
2 — втори, втора, второ, втори
3 — трети, трета, трето, трети
4 — четвърти, четвърта, четвърто, четвърти
5 — пети, пета, пето, пети
6 — шести, шеста, шесто, шести
7 — седми, седма, седмо, седми
8 — осми, осма, осмо, осми
9 — девети, девета, девето, девети
10 — десети, десета, десето, десети

Когда они используются:
• Для дат: Днес е девети декември. (Сегодня девятое декабря.)
• Для обозначения порядка: Той е първи. (Он первый.) Тя е трета. (Она третья.)
• Для названия месяцев по порядку: януари = първи месец, февруари = втори месец…
• Для дней недели (понеделник = първи ден на седмицата — понедельник — первый день недели).

Примеры:
Имам рожден ден на първи март. (У меня день рождения первого марта.)
Тя е родена на двадесет и пети май. (Она родилась двадцать пятого мая.)
Седми клас. (Седьмой класс.) Шеста стая. (Шестая комната.)`,
        uk: `Порядкові числівники в болгарській мові позначають порядок (перший, другий, третій…). На відміну від кількісних числівників (один, два, три), вони поводяться як прикметники — узгоджуються з родом і числом іменника.

Форми (1–10):
1 — първи (ч. р.), първа (ж. р.), първо (с. р.), първи (мн.)
2 — втори, втора, второ, втори
3 — трети, трета, трето, трети
4 — четвърти, четвърта, четвърто, четвърти
5 — пети, пета, пето, пети
6 — шести, шеста, шесто, шести
7 — седми, седма, седмо, седми
8 — осми, осма, осмо, осми
9 — девети, девета, девето, девети
10 — десети, десета, десето, десети

Коли вони використовуються:
• Для дат: Днес е девети декември. (Сьогодні дев'яте грудня.)
• Для позначення порядку: Той е първи. (Він перший.) Тя е трета. (Вона третя.)
• Для назв місяців за порядком: януари = първи месец, февруари = втори месец…
• Для днів тижня (понеделник = първи ден на седмицата — понеділок — перший день тижня).

Приклади:
Имам рожден ден на първи март. (У мене день народження першого березня.)
Тя е родена на двадесет и пети май. (Вона народилася двадцять п'ятого травня.)
Седми клас. (Сьомий клас.) Шеста стая. (Шоста кімната.)`,
      },
    },
    {
      id: 'l07-gr-kolko-e-chasut',
      title: {
        bg: 'Колко е часът? — четене на часовника',
        en: 'What time is it? — telling the time',
        fr: 'Quelle heure est-il ? — dire l\'heure',
        ar: 'كم الساعة؟ — قراءة الساعة',
        fa: 'ساعت چند است؟ — خواندن ساعت',
        ru: 'Который час? — как сказать время',
        uk: 'Котра година? — як сказати час',
      },
      content: {
        bg: `За да попитаме за времето, казваме: Колко е часът?
Отговорът се образува с числителното име за часа + минутите.

Цели часове:
Един часˊ. (1:00) — отговор: Един часˊ.
Два часа. (2:00)
Три часа. (3:00) … и т.н.
12:00 — Дванайсет часа. (или: Обед / Полунощ)

Минутите след часа — с „и":
2 и 10 — Два и десет.
3 и 15 (= 3:15) — Три и петнайсет. (или: Три и четвърт.)
5 и 30 (= 5:30) — Пет и половина.

Минутите преди следващия час — с „без":
4:50 — Без десет пет. (10 минути преди 5)
6:45 — Без петнайсет седем. (или: Без четвърт седем.)
9:55 — Без пет десет.

Специални форми:
половина = и 30 минути (5 и половина = 5:30)
четвърт = 15 минути (3 и четвърт = 3:15; без четвърт 7 = 6:45)

Кога? — В колко часа?
Питаме: В колко часа? — Отговор с „в":
В седем часа. В осем и половина. В девет и петнайсет.

Примери:
Извинете, колко е часът? — Два и петнайсет.
В колко часа вечеряте? — В седем часа.
Срещата е в десет и половина.`,
        en: `To ask about the time we say: Колко е часът? (What time is it?)
The answer uses the numeral for the hour + the minutes.

Whole hours:
Един часˊ. (1:00 — answer: Един часˊ.)
Два часа. (2:00)
Три часа. (3:00) … and so on.
12:00 — Дванайсет часа. (or: Обед = noon / Полунощ = midnight)

Minutes past the hour — with "и" (and):
2:10 — Два и десет. (Two and ten / ten past two)
3:15 — Три и петнайсет. (or: Три и четвърт = a quarter past three)
5:30 — Пет и половина. (half past five)

Minutes to the next hour — with "без" (minus):
4:50 — Без десет пет. (ten to five — literally "minus ten, five")
6:45 — Без петнайсет седем. (or: Без четвърт седем = a quarter to seven)
9:55 — Без пет десет. (five to ten)

Special forms:
половина = and 30 minutes (5 и половина = 5:30, half past five)
четвърт = 15 minutes (3 и четвърт = 3:15; без четвърт 7 = 6:45)

When? — В колко часа? (At what time?)
We ask: В колко часа? — and answer with the preposition в (at):
В седем часа. (At seven o'clock.) В осем и половина. (At half past eight.) В девет и петнайсет. (At nine fifteen.)

Examples:
Извинете, колко е часът? — Два и петнайсет. (Excuse me, what time is it? — A quarter past two.)
В колко часа вечеряте? — В седем часа. (At what time do you have dinner? — At seven o'clock.)
Срещата е в десет и половина. (The meeting is at half past ten.)`,
        fr: `Pour demander l'heure on dit : Колко е часът ? (Quelle heure est-il ?)
La réponse utilise le numéral pour l'heure + les minutes.

Heures pleines :
Един часˊ. (1h00 — réponse : Един часˊ.)
Два часа. (2h00)
Три часа. (3h00) … et ainsi de suite.
12h00 — Дванайсет часа. (ou : Обед = midi / Полунощ = minuit)

Minutes après l'heure — avec « и » (et) :
2h10 — Два и десет. (Deux heures dix)
3h15 — Три и петнайсет. (ou : Три и четвърт = trois heures et quart)
5h30 — Пет и половина. (cinq heures et demie)

Minutes avant l'heure suivante — avec « без » (moins) :
4h50 — Без десет пет. (cinq heures moins dix)
6h45 — Без петнайсет седем. (ou : Без четвърт седем = sept heures moins le quart)
9h55 — Без пет десет. (dix heures moins cinq)

Formes spéciales :
половина = et 30 minutes (5 и половина = 5h30, cinq heures et demie)
четвърт = 15 minutes (3 и четвърт = 3h15 ; без четвърт 7 = 6h45)

Quand ? — В колко часа ? (À quelle heure ?)
On demande : В колко часа ? — et on répond avec la préposition в (à) :
В седем часа. (À sept heures.) В осем и половина. (À huit heures et demie.) В девет и петнайсет. (À neuf heures quinze.)

Exemples :
Извинете, колко е часът? — Два и петнайсет. (Excusez-moi, quelle heure est-il ? — Deux heures et quart.)
В колко часа вечеряте? — В седем часа. (À quelle heure dînez-vous ? — À sept heures.)
Срещата е в десет и половина. (La réunion est à dix heures et demie.)`,
        ar: `للسؤال عن الوقت نقول: Колко е часът? (كم الساعة؟)
يكون الجواب بصيغة: اسم العدد للساعة + الدقائق.

الساعات الكاملة:
Един часˊ. (الساعة ١:٠٠ — الجواب: Един часˊ.)
Два часа. (الساعة ٢:٠٠)
Три часа. (الساعة ٣:٠٠) … وهكذا.
١٢:٠٠ — Дванайсет часа. (أو: Обед = الظهيرة / Полунощ = منتصف الليل)

الدقائق بعد الساعة — مع «и» (و):
٢:١٠ — Два и десет. (الساعة ثانية وعشر دقائق)
٣:١٥ — Три и петнайсет. (أو: Три и четвърт = الثالثة والربع)
٥:٣٠ — Пет и половина. (الخامسة والنصف)

الدقائق قبل الساعة التالية — مع «без» (إلا):
٤:٥٠ — Без десет пет. (الخامسة إلا عشر)
٦:٤٥ — Без петнайсет седем. (أو: Без четвърт седем = السابعة إلا ربع)
٩:٥٥ — Без пет десет. (العاشرة إلا خمس)

أشكال خاصة:
половина = و٣٠ دقيقة (5 и половина = ٥:٣٠، الخامسة والنصف)
четвърт = ١٥ دقيقة (3 и четвърт = ٣:١٥؛ без четвърт 7 = ٦:٤٥)

متى؟ — В колко часа? (في أي ساعة؟)
نسأل: В колко часа? — ونجيب بحرف الجر в (في):
В седем часа. (في الساعة السابعة.) В осем и половина. (في الثامنة والنصف.) В девет и петнайсет. (في التاسعة والربع.)

أمثلة:
Извинете, колко е часът? — Два и петнайсет. (المعذرة، كم الساعة؟ — الثانية والربع.)
В колко часа вечеряте? — В седем часа. (متى تتعشّون؟ — في السابعة.)
Срещата е в десет и половина. (الاجتماع في العاشرة والنصف.)`,
        fa: `برای پرسیدن ساعت می‌گوییم: Колко е часът? (ساعت چند است؟)
پاسخ با عدد ساعت + دقیقه ساخته می‌شود.

ساعت‌های کامل:
Един часˊ. (ساعت ۱:۰۰ — پاسخ: Един часˊ.)
Два часа. (ساعت ۲:۰۰)
Три часа. (ساعت ۳:۰۰) … و الی آخر.
۱۲:۰۰ — Дванайсет часа. (یا: Обед = ظهر / Полунощ = نیمه‌شب)

دقیقه‌های بعد از ساعت — با «и» (و):
۲:۱۰ — Два и десет. (دو و ده دقیقه)
۳:۱۵ — Три и петнайсет. (یا: Три и четвърт = سه و ربع)
۵:۳۰ — Пет и половина. (پنج و نیم)

دقیقه‌های قبل از ساعت بعدی — با «без» (کم):
۴:۵۰ — Без десет пет. (ده دقیقه به پنج)
۶:۴۵ — Без петнайсет седем. (یا: Без четвърт седем = یک ربع به هفت)
۹:۵۵ — Без пет десет. (پنج دقیقه به ده)

شکل‌های ویژه:
половина = و ۳۰ دقیقه (5 и половина = ۵:۳۰، پنج و نیم)
четвърт = ۱۵ دقیقه (3 и четвърт = ۳:۱۵؛ без четвърт 7 = ۶:۴۵)

چه وقت؟ — В колко часа? (در چه ساعتی؟)
می‌پرسیم: В колко часа? — و با حرف اضافه в (در) پاسخ می‌دهیم:
В седем часа. (در ساعت هفت.) В осем и половина. (در هشت و نیم.) В девет и петнайсет. (در نه و یک ربع.)

مثال‌ها:
Извинете, колко е часът? — Два и петнайсет. (ببخشید، ساعت چند است؟ — دو و یک ربع.)
В колко часа вечеряте? — В седем часа. (در چه ساعتی شام می‌خورید؟ — ساعت هفت.)
Срещата е в десет и половина. (جلسه در ساعت ده و نیم است.)`,
        ru: `Чтобы спросить о времени, говорим: Колко е часът? (Который час?)
Ответ строится с числительным для часа + минуты.

Целые часы:
Един часˊ. (1:00 — ответ: Един часˊ.)
Два часа. (2:00)
Три часа. (3:00) … и так далее.
12:00 — Дванайсет часа. (или: Обед = полдень / Полунощ = полночь)

Минуты после часа — с «и» (и):
2:10 — Два и десет. (Два часа десять минут.)
3:15 — Три и петнайсет. (или: Три и четвърт = четверть четвёртого по сути «три и четверть»)
5:30 — Пет и половина. (половина шестого, по-болгарски «пять и половина»)

Минуты до следующего часа — с «без» (без):
4:50 — Без десет пет. (без десяти пять)
6:45 — Без петнайсет седем. (или: Без четвърт седем = без четверти семь)
9:55 — Без пет десет. (без пяти десять)

Особые формы:
половина = и 30 минут (5 и половина = 5:30)
четвърт = 15 минут (3 и четвърт = 3:15; без четвърт 7 = 6:45)

Когда? — В колко часа? (Во сколько?)
Спрашиваем: В колко часа? — отвечаем с предлогом в (в):
В седем часа. (В семь часов.) В осем и половина. (В половине девятого.) В девет и петнайсет. (В девять пятнадцать.)

Примеры:
Извинете, колко е часът? — Два и петнайсет. (Извините, который час? — Четверть третьего.)
В колко часа вечеряте? — В седем часа. (Во сколько вы ужинаете? — В семь часов.)
Срещата е в десет и половина. (Встреча в половине одиннадцатого.)`,
        uk: `Щоб запитати про час, говоримо: Колко е часът? (Котра година?)
Відповідь будується з числівника для години + хвилини.

Цілі години:
Един часˊ. (1:00 — відповідь: Един часˊ.)
Два часа. (2:00)
Три часа. (3:00) … і так далі.
12:00 — Дванайсет часа. (або: Обед = полудень / Полунощ = північ)

Хвилини після години — з «и» (і):
2:10 — Два и десет. (Друга година десять хвилин.)
3:15 — Три и петнайсет. (або: Три и четвърт = чверть на четверту, дослівно «три і чверть»)
5:30 — Пет и половина. (пів на шосту, дослівно «п'ять і половина»)

Хвилини до наступної години — з «без» (без):
4:50 — Без десет пет. (за десять п'ята)
6:45 — Без петнайсет седем. (або: Без четвърт седем = за чверть сьома)
9:55 — Без пет десет. (за п'ять десята)

Особливі форми:
половина = і 30 хвилин (5 и половина = 5:30)
четвърт = 15 хвилин (3 и четвърт = 3:15; без четвърт 7 = 6:45)

Коли? — В колко часа? (О котрій годині?)
Запитуємо: В колко часа? — відповідаємо з прийменником в (о/в):
В седем часа. (О сьомій годині.) В осем и половина. (О пів на дев'яту.) В девет и петнайсет. (О дев'ятій п'ятнадцять.)

Приклади:
Извинете, колко е часът? — Два и петнайсет. (Перепрошую, котра година? — Чверть на третю.)
В колко часа вечеряте? — В седем часа. (О котрій ви вечеряєте? — О сьомій.)
Срещата е в десет и половина. (Зустріч о пів на одинадцяту.)`,
      },
    },
    {
      id: 'l07-gr-predlozi-za-vreme',
      title: {
        bg: 'Предлози за време — в, на, през, от … до, преди, след',
        en: 'Time prepositions — в, на, през, от … до, преди, след',
        fr: 'Prépositions de temps — в, на, през, от … до, преди, след',
        ar: 'حروف الجر للزمن — в، на، през، от … до، преди، след',
        fa: 'حروف اضافه برای زمان — в، на، през، от … до، преди، след',
        ru: 'Предлоги времени — в, на, през, от … до, преди, след',
        uk: 'Прийменники часу — в, на, през, от … до, преди, след',
      },
      content: {
        bg: `В българския език за време се използват няколко предлога. Изборът зависи от това какво указваме — час, ден, дата, месец, сезон, период.

В (in/at) — за час и за година:
В седем часа. (at seven o'clock)
В 2024 година. (in 2024)

НА (on) — за дни от седмицата и за дати:
На понеделник. На петък.
На първи март. На двадесет и пети май.

ПРЕЗ (during/in) — за месец, сезон и продължителен период:
През януари. През април.
През пролетта. През лятото. През зимата.
През деня. През нощта.

ОТ … ДО … (from … to …) — за период (часове, дни, месеци, години):
От 9 до 17 часа.
От понеделник до петък.
От март до септември.

ПРЕДИ (before) — преди определен момент:
Преди обяд. (before noon)
Преди седем часа.
Преди две години.

СЛЕД (after) — след определен момент:
След работа.
След пет минути.
След обяд. (after noon)

Допълнително — части от деня:
сутринта (in the morning), на обяд (at noon), следобед (in the afternoon), вечерта (in the evening), през нощта (at night).

Сравнете:
„На" за дни и дати — На събота отиваме на разходка.
„През" за сезони и месеци — През лятото отиваме на море.
„В" за часове — Тренирам в шест часа.

Глаголи за движение и предлог НА:
отиваме на планина — we go to the mountain (за почивка)
отиваме на море — we go to the sea`,
        en: `Bulgarian uses several prepositions for time. The choice depends on what we are referring to — hour, day, date, month, season, or period.

В (in/at) — for hours and years:
В седем часа. (at seven o'clock)
В 2024 година. (in 2024)

НА (on) — for days of the week and dates:
На понеделник. (on Monday) На петък. (on Friday)
На първи март. (on March 1) На двадесет и пети май. (on May 25)

ПРЕЗ (during/in) — for months, seasons and longer periods:
През януари. (in January) През април. (in April)
През пролетта. (in spring) През лятото. (in summer) През зимата. (in winter)
През деня. (during the day) През нощта. (at night)

ОТ … ДО … (from … to …) — for periods (hours, days, months, years):
От 9 до 17 часа. (from 9 to 5)
От понеделник до петък. (Monday to Friday)
От март до септември. (March to September)

ПРЕДИ (before) — before a certain moment:
Преди обяд. (before noon)
Преди седем часа. (before seven)
Преди две години. (two years ago)

СЛЕД (after) — after a certain moment:
След работа. (after work)
След пет минути. (in five minutes)
След обяд. (in the afternoon)

Also — parts of the day:
сутринта (in the morning), на обяд (at noon), следобед (in the afternoon), вечерта (in the evening), през нощта (at night).

Compare:
"На" for days and dates — На събота отиваме на разходка. (On Saturday we go for a walk.)
"През" for seasons and months — През лятото отиваме на море. (In summer we go to the seaside.)
"В" for hours — Тренирам в шест часа. (I train at six.)

Verbs of motion + preposition НА:
отиваме на планина — we go to the mountain (for vacation)
отиваме на море — we go to the sea / coast`,
        fr: `Le bulgare utilise plusieurs prépositions pour exprimer le temps. Le choix dépend de ce que l'on indique — heure, jour, date, mois, saison ou période.

В (à / en) — pour les heures et les années :
В седем часа. (à sept heures)
В 2024 година. (en 2024)

НА (le / à) — pour les jours de la semaine et les dates :
На понеделник. (le lundi) На петък. (le vendredi)
На първи март. (le 1er mars) На двадесет и пети май. (le 25 mai)

ПРЕЗ (en / pendant) — pour les mois, les saisons et les périodes longues :
През януари. (en janvier) През април. (en avril)
През пролетта. (au printemps) През лятото. (en été) През зимата. (en hiver)
През деня. (pendant la journée) През нощта. (la nuit)

ОТ … ДО … (de … à …) — pour les périodes (heures, jours, mois, années) :
От 9 до 17 часа. (de 9 h à 17 h)
От понеделник до петък. (du lundi au vendredi)
От март до септември. (de mars à septembre)

ПРЕДИ (avant) — avant un moment précis :
Преди обяд. (avant midi)
Преди седем часа. (avant sept heures)
Преди две години. (il y a deux ans)

СЛЕД (après) — après un moment précis :
След работа. (après le travail)
След пет минути. (dans cinq minutes)
След обяд. (l'après-midi)

Aussi — moments de la journée :
сутринта (le matin), на обяд (à midi), следобед (l'après-midi), вечерта (le soir), през нощта (la nuit).

Comparez :
« На » pour les jours et dates — На събота отиваме на разходка. (Samedi nous allons nous promener.)
« През » pour les saisons et les mois — През лятото отиваме на море. (En été, nous allons à la mer.)
« В » pour les heures — Тренирам в шест часа. (Je m'entraîne à six heures.)

Verbes de mouvement + préposition НА :
отиваме на планина — nous allons à la montagne (en vacances)
отиваме на море — nous allons à la mer`,
        ar: `تستخدم اللغة البلغارية عدة حروف جر للزمن. ويتوقف اختيارها على نوع الزمن المقصود — ساعة أو يوم أو تاريخ أو شهر أو فصل أو فترة.

В (في/عند) — للساعات والسنوات:
В седем часа. (في الساعة السابعة)
В 2024 година. (في عام ٢٠٢٤)

НА (في/يوم) — لأيام الأسبوع والتواريخ:
На понеделник. (يوم الإثنين) На петък. (يوم الجمعة)
На първи март. (في الأول من مارس) На двадесет и пети май. (في الخامس والعشرين من مايو)

ПРЕЗ (خلال/في) — للأشهر والفصول والفترات الطويلة:
През януари. (في يناير) През април. (في أبريل)
През пролетта. (في الربيع) През лятото. (في الصيف) През зимата. (في الشتاء)
През деня. (خلال النهار) През нощта. (في الليل)

ОТ … ДО … (من … إلى …) — للفترات (ساعات، أيام، أشهر، سنوات):
От 9 до 17 часа. (من ٩ إلى ١٧)
От понеделник до петък. (من الإثنين إلى الجمعة)
От март до септември. (من مارس إلى سبتمبر)

ПРЕДИ (قبل) — قبل لحظة معينة:
Преди обяд. (قبل الظهر)
Преди седем часа. (قبل الساعة السابعة)
Преди две години. (قبل سنتين)

СЛЕД (بعد) — بعد لحظة معينة:
След работа. (بعد العمل)
След пет минути. (بعد خمس دقائق)
След обяд. (بعد الظهر)

كذلك — أوقات اليوم:
сутринта (في الصباح)، на обяд (في الظهيرة)، следобед (بعد الظهر)، вечерта (في المساء)، през нощта (في الليل).

قارن:
«На» للأيام والتواريخ — На събота отиваме на разходка. (يوم السبت نخرج للتنزّه.)
«През» للفصول والأشهر — През лятото отиваме на море. (في الصيف نذهب إلى البحر.)
«В» للساعات — Тренирам в шест часа. (أتدرّب في الساعة السادسة.)

أفعال الحركة + حرف الجر НА:
отиваме на планина — نذهب إلى الجبل (لقضاء العطلة)
отиваме на море — نذهب إلى البحر`,
        fa: `زبان بلغاری چندین حرف اضافه برای زمان دارد. انتخاب آن‌ها بستگی دارد به این که چه چیزی را نشان می‌دهیم — ساعت، روز، تاریخ، ماه، فصل یا یک بازه.

В (در/ساعت) — برای ساعت‌ها و سال‌ها:
В седем часа. (در ساعت هفت)
В 2024 година. (در سال ۲۰۲۴)

НА (در/روز) — برای روزهای هفته و تاریخ‌ها:
На понеделник. (روز دوشنبه) На петък. (روز جمعه)
На първи март. (در اول مارس) На двадесет и пети май. (در بیست و پنجم مه)

ПРЕЗ (در طول/در) — برای ماه‌ها، فصل‌ها و دوره‌های طولانی:
През януари. (در ژانویه) През април. (در آوریل)
През пролетта. (در بهار) През лятото. (در تابستان) През зимата. (در زمستان)
През деня. (در طول روز) През нощта. (در شب)

ОТ … ДО … (از … تا …) — برای دوره‌ها (ساعت، روز، ماه، سال):
От 9 до 17 часа. (از ۹ تا ۱۷)
От понеделник до петък. (از دوشنبه تا جمعه)
От март до септември. (از مارس تا سپتامبر)

ПРЕДИ (قبل از) — قبل از یک لحظه معین:
Преди обяд. (قبل از ظهر)
Преди седем часа. (قبل از ساعت هفت)
Преди две години. (دو سال پیش)

СЛЕД (بعد از) — بعد از یک لحظه معین:
След работа. (بعد از کار)
След пет минути. (پنج دقیقه دیگر)
След обяд. (بعد از ظهر)

همچنین — قسمت‌های روز:
сутринта (صبح)، на обяд (ظهر)، следобед (بعد از ظهر)، вечерта (شب/عصر)، през нощта (شب).

مقایسه کنید:
«На» برای روزها و تاریخ‌ها — На събота отиваме на разходка. (شنبه به پیاده‌روی می‌رویم.)
«През» برای فصل‌ها و ماه‌ها — През лятото отиваме на море. (در تابستان به دریا می‌رویم.)
«В» برای ساعت‌ها — Тренирам в шест часа. (ساعت شش تمرین می‌کنم.)

افعال حرکت + حرف اضافه НА:
отиваме на планина — به کوه می‌رویم (برای تعطیلات)
отиваме на море — به دریا می‌رویم`,
        ru: `В болгарском языке для обозначения времени используется несколько предлогов. Выбор зависит от того, что мы указываем — час, день, дату, месяц, сезон или период.

В (в) — для часов и годов:
В седем часа. (в семь часов)
В 2024 година. (в 2024 году)

НА (в/на) — для дней недели и для дат:
На понеделник. (в понедельник) На петък. (в пятницу)
На първи март. (первого марта) На двадесет и пети май. (двадцать пятого мая)

ПРЕЗ (в/во время) — для месяцев, сезонов и длительных периодов:
През януари. (в январе) През април. (в апреле)
През пролетта. (весной) През лятото. (летом) През зимата. (зимой)
През деня. (днём) През нощта. (ночью)

ОТ … ДО … (с … до … / от … до …) — для периодов (часов, дней, месяцев, лет):
От 9 до 17 часа. (с 9 до 17)
От понеделник до петък. (с понедельника до пятницы)
От март до септември. (с марта до сентября)

ПРЕДИ (до/перед) — до определённого момента:
Преди обяд. (до полудня)
Преди седем часа. (до семи)
Преди две години. (два года назад)

СЛЕД (после/через) — после определённого момента:
След работа. (после работы)
След пет минути. (через пять минут)
След обяд. (после полудня / днём)

Также — части суток:
сутринта (утром), на обяд (в обед), следобед (после полудня), вечерта (вечером), през нощта (ночью).

Сравните:
«На» для дней и дат — На събота отиваме на разходка. (В субботу идём на прогулку.)
«През» для сезонов и месяцев — През лятото отиваме на море. (Летом ездим на море.)
«В» для часов — Тренирам в шест часа. (Я тренируюсь в шесть.)

Глаголы движения + предлог НА:
отиваме на планина — едем в горы (на отдых)
отиваме на море — едем на море`,
        uk: `У болгарській мові для позначення часу використовується кілька прийменників. Вибір залежить від того, що ми вказуємо — годину, день, дату, місяць, сезон чи період.

В (о/в) — для годин і років:
В седем часа. (о сьомій годині)
В 2024 година. (у 2024 році)

НА (у/на) — для днів тижня та дат:
На понеделник. (у понеділок) На петък. (у п'ятницю)
На първи март. (першого березня) На двадесет и пети май. (двадцять п'ятого травня)

ПРЕЗ (у/під час) — для місяців, сезонів і тривалих періодів:
През януари. (у січні) През април. (у квітні)
През пролетта. (навесні) През лятото. (влітку) През зимата. (взимку)
През деня. (вдень) През нощта. (вночі)

ОТ … ДО … (з … до … / від … до …) — для періодів (годин, днів, місяців, років):
От 9 до 17 часа. (з 9 до 17)
От понеделник до петък. (з понеділка до п'ятниці)
От март до септември. (з березня до вересня)

ПРЕДИ (до/перед) — до певного моменту:
Преди обяд. (до обіду)
Преди седем часа. (до сьомої)
Преди две години. (два роки тому)

СЛЕД (після/через) — після певного моменту:
След работа. (після роботи)
След пет минути. (через п'ять хвилин)
След обяд. (після обіду)

Також — частини доби:
сутринта (вранці), на обяд (в обід), следобед (після обіду), вечерта (увечері), през нощта (вночі).

Порівняйте:
«На» для днів і дат — На събота отиваме на разходка. (У суботу йдемо на прогулянку.)
«През» для сезонів і місяців — През лятото отиваме на море. (Влітку їздимо на море.)
«В» для годин — Тренирам в шест часа. (Я тренуюся о шостій.)

Дієслова руху + прийменник НА:
отиваме на планина — їдемо в гори (на відпочинок)
отиваме на море — їдемо на море`,
      },
    },
    {
      id: 'l07-gr-glagol-otivam',
      title: {
        bg: 'Глагол ОТИВАМ — сегашно време',
        en: 'The verb ОТИВАМ (to go) — present tense',
        fr: 'Le verbe ОТИВАМ (aller) — présent',
        ar: 'الفعل ОТИВАМ (يذهب) — المضارع',
        fa: 'فعل ОТИВАМ (رفتن) — زمان حال',
        ru: 'Глагол ОТИВАМ (идти/ехать) — настоящее время',
        uk: 'Дієслово ОТИВАМ (йти/їхати) — теперішній час',
      },
      content: {
        bg: `Глаголът ОТИВАМ означава „to go" — тръгвам в посока (за разлика от ходя, което означава „да ходя редовно/обикновено"). ОТИВАМ е от А-група (3-то спрежение) и завършва на -АМ в 1-во лице, единствено число.

Положителна форма (+):
аз отивам, ти отиваш, той/тя/то отива, ние отиваме, вие отивате, те отиват

Отрицателна форма (–):
не отивам, не отиваш, не отива, не отиваме, не отивате, не отиват

Въпросителна форма (?):
отивам ли?, отиваш ли?, отива ли?, отиваме ли?, отивате ли?, отиват ли?

Кога се използва:
ОТИВАМ показва конкретно движение „сега" или планирано движение в близко бъдеще:
Сега отивам на работа. (I'm going to work now.)
Утре отивам на лекар.

Често с предлозите НА, В, ДО, КЪМ:
Отивам на работа. Отивам на училище.
Отивам на кино. Отивам на разходка.
Отивам в магазина. Отивам до банката.

ОТИВАМ vs. ХОДЯ:
ОТИВАМ — еднократно, конкретно: Сега отивам на пазар.
ХОДЯ — редовно, обикновено: Ходя на пазар всяка събота.

Примери:
Здравей! Къде отиваш? — Отивам на кино. (Hi! Where are you going? — I'm going to the cinema.)
В колко часа отивате на работа? — Отивам в осем.
Те отиват на море през лятото.`,
        en: `The verb ОТИВАМ means "to go" — to head in a direction (as opposed to ходя, which means "to walk/go regularly"). ОТИВАМ belongs to the A-group (3rd conjugation) and ends in -АМ in the 1st person singular.

Positive form (+):
аз отивам (I go / I am going), ти отиваш, той/тя/то отива, ние отиваме, вие отивате, те отиват

Negative form (–):
не отивам, не отиваш, не отива, не отиваме, не отивате, не отиват

Question form (?):
отивам ли? (am I going?), отиваш ли?, отива ли?, отиваме ли?, отивате ли?, отиват ли?

When to use it:
ОТИВАМ describes a concrete movement happening "now" or planned for the near future:
Сега отивам на работа. (I'm going to work now.)
Утре отивам на лекар. (Tomorrow I'm going to the doctor.)

Often used with prepositions НА, В, ДО, КЪМ:
Отивам на работа. (I'm going to work.) Отивам на училище. (I'm going to school.)
Отивам на кино. (I'm going to the cinema.) Отивам на разходка. (I'm going for a walk.)
Отивам в магазина. (I'm going to the shop.) Отивам до банката. (I'm going to the bank.)

ОТИВАМ vs. ХОДЯ:
ОТИВАМ — single, specific event: Сега отивам на пазар. (I'm going to the market now.)
ХОДЯ — regular, repeated action: Ходя на пазар всяка събота. (I go to the market every Saturday.)

Examples:
Здравей! Къде отиваш? — Отивам на кино. (Hi! Where are you going? — I'm going to the cinema.)
В колко часа отивате на работа? — Отивам в осем. (At what time do you go to work? — I go at eight.)
Те отиват на море през лятото. (They go to the seaside in summer.)`,
        fr: `Le verbe ОТИВАМ signifie « aller » — se diriger quelque part (à différencier de ходя, qui signifie « marcher / aller régulièrement »). ОТИВАМ appartient au groupe A (3e conjugaison) et se termine en -АМ à la 1re personne du singulier.

Forme positive (+) :
аз отивам (je vais), ти отиваш, той/тя/то отива, ние отиваме, вие отивате, те отиват

Forme négative (–) :
не отивам, не отиваш, не отива, не отиваме, не отивате, не отиват

Forme interrogative (?) :
отивам ли ? (est-ce que je vais ?), отиваш ли ?, отива ли ?, отиваме ли ?, отивате ли ?, отиват ли ?

Quand l'utiliser :
ОТИВАМ décrit un mouvement concret qui se produit « maintenant » ou planifié dans un avenir proche :
Сега отивам на работа. (Je vais au travail maintenant.)
Утре отивам на лекар. (Demain je vais chez le médecin.)

Souvent avec les prépositions НА, В, ДО, КЪМ :
Отивам на работа. (Je vais au travail.) Отивам на училище. (Je vais à l'école.)
Отивам на кино. (Je vais au cinéma.) Отивам на разходка. (Je vais me promener.)
Отивам в магазина. (Je vais au magasin.) Отивам до банката. (Je vais à la banque.)

ОТИВАМ vs. ХОДЯ :
ОТИВАМ — événement unique et précis : Сега отивам на пазар. (Je vais au marché maintenant.)
ХОДЯ — action régulière, répétée : Ходя на пазар всяка събота. (Je vais au marché tous les samedis.)

Exemples :
Здравей! Къде отиваш? — Отивам на кино. (Salut ! Où vas-tu ? — Je vais au cinéma.)
В колко часа отивате на работа? — Отивам в осем. (À quelle heure allez-vous au travail ? — J'y vais à huit heures.)
Те отиват на море през лятото. (Ils vont à la mer en été.)`,
        ar: `الفعل ОТИВАМ يعني «يذهب» — أي يتجه نحو وجهة معينة (على عكس ходя التي تعني «يمشي/يذهب بانتظام»). ينتمي ОТИВАМ إلى المجموعة А (التصريف الثالث) وينتهي بـ -АМ في المتكلم المفرد.

الصيغة المثبتة (+):
аз отивам (أنا أذهب)، ти отиваш، той/тя/то отива، ние отиваме، вие отивате، те отиват

الصيغة المنفية (–):
не отивам، не отиваш، не отива، не отиваме، не отивате، не отиват

صيغة الاستفهام (?):
отивам ли؟ (هل أذهب؟)، отиваш ли؟، отива ли؟، отиваме ли؟، отивате ли؟، отиват ли؟

متى يُستخدم:
ОТИВАМ يصف حركة محددة تحدث «الآن» أو حركة مقررة في المستقبل القريب:
Сега отивам на работа. (أنا ذاهب إلى العمل الآن.)
Утре отивам на лекар. (غداً سأذهب إلى الطبيب.)

كثيراً ما يأتي مع حروف الجر НА، В، ДО، КЪМ:
Отивам на работа. (أذهب إلى العمل.) Отивам на училище. (أذهب إلى المدرسة.)
Отивам на кино. (أذهب إلى السينما.) Отивам на разходка. (أخرج للنزهة.)
Отивам в магазина. (أذهب إلى المتجر.) Отивам до банката. (أذهب إلى البنك.)

ОТИВАМ مقابل ХОДЯ:
ОТИВАМ — حدث واحد محدد: Сега отивам на пазар. (أذهب إلى السوق الآن.)
ХОДЯ — فعل اعتيادي متكرر: Ходя на пазар всяка събота. (أذهب إلى السوق كل سبت.)

أمثلة:
Здравей! Къде отиваш? — Отивам на кино. (مرحباً! إلى أين تذهب؟ — أذهب إلى السينما.)
В колко часа отивате на работа? — Отивам в осем. (متى تذهب إلى العمل؟ — أذهب في الساعة الثامنة.)
Те отиват на море през лятото. (يذهبون إلى البحر في الصيف.)`,
        fa: `فعل ОТИВАМ به معنای «رفتن» است — یعنی به سمتی حرکت کردن (برخلاف ходя که به معنای «راه رفتن/مرتب رفتن» است). ОТИВАМ به گروه А (تصریف سوم) تعلق دارد و در اول‌شخص مفرد به -АМ ختم می‌شود.

شکل مثبت (+):
аз отивам (من می‌روم)، ти отиваш، той/тя/то отива، ние отиваме، вие отивате، те отиват

شکل منفی (–):
не отивам، не отиваш، не отива، не отиваме، не отивате، не отиват

شکل پرسشی (?):
отивам ли؟ (آیا می‌روم؟)، отиваш ли؟، отива ли؟، отиваме ли؟، отивате ли؟، отиват ли؟

چه وقت استفاده می‌شود:
ОТИВАМ یک حرکت مشخص را که «اکنون» اتفاق می‌افتد یا برای آینده‌ای نزدیک برنامه‌ریزی شده، توصیف می‌کند:
Сега отивам на работа. (الآن دارم به سر کار می‌روم.)
Утре отивам на лекар. (فردا به دکتر می‌روم.)

اغلب با حروف اضافه НА، В، ДО، КЪМ به کار می‌رود:
Отивам на работа. (به سر کار می‌روم.) Отивам на училище. (به مدرسه می‌روم.)
Отивам на кино. (به سینما می‌روم.) Отивам на разходка. (به پیاده‌روی می‌روم.)
Отивам в магазина. (به فروشگاه می‌روم.) Отивам до банката. (به بانک می‌روم.)

ОТИВАМ در مقابل ХОДЯ:
ОТИВАМ — رویدادی واحد و مشخص: Сега отивам на пазар. (الآن به بازار می‌روم.)
ХОДЯ — کاری منظم و تکراری: Ходя на пазар всяка събота. (هر شنبه به بازار می‌روم.)

مثال‌ها:
Здравей! Къде отиваш? — Отивам на кино. (سلام! کجا می‌روی؟ — به سینما می‌روم.)
В колко часа отивате на работа? — Отивам в осем. (در چه ساعتی به سر کار می‌روید؟ — ساعت هشت می‌روم.)
Те отиват на море през лятото. (آن‌ها در تابستان به دریا می‌روند.)`,
        ru: `Глагол ОТИВАМ означает «идти/ехать» — направляться куда-то (в отличие от ходя, которое означает «ходить регулярно»). ОТИВАМ принадлежит к А-группе (3-е спряжение) и оканчивается на -АМ в 1-м лице единственного числа.

Утвердительная форма (+):
аз отивам (я иду / еду), ти отиваш, той/тя/то отива, ние отиваме, вие отивате, те отиват

Отрицательная форма (–):
не отивам, не отиваш, не отива, не отиваме, не отивате, не отиват

Вопросительная форма (?):
отивам ли? (иду ли я?), отиваш ли?, отива ли?, отиваме ли?, отивате ли?, отиват ли?

Когда используется:
ОТИВАМ описывает конкретное движение «сейчас» или запланированное в ближайшем будущем:
Сега отивам на работа. (Сейчас я иду на работу.)
Утре отивам на лекар. (Завтра иду к врачу.)

Часто употребляется с предлогами НА, В, ДО, КЪМ:
Отивам на работа. (Иду на работу.) Отивам на училище. (Иду в школу.)
Отивам на кино. (Иду в кино.) Отивам на разходка. (Иду на прогулку.)
Отивам в магазина. (Иду в магазин.) Отивам до банката. (Иду до банка.)

ОТИВАМ vs. ХОДЯ:
ОТИВАМ — однократное, конкретное действие: Сега отивам на пазар. (Сейчас я иду на рынок.)
ХОДЯ — регулярное, повторяющееся действие: Ходя на пазар всяка събота. (Хожу на рынок каждую субботу.)

Примеры:
Здравей! Къде отиваш? — Отивам на кино. (Привет! Куда идёшь? — Иду в кино.)
В колко часа отивате на работа? — Отивам в осем. (Во сколько вы идёте на работу? — Иду в восемь.)
Те отиват на море през лятото. (Они едут на море летом.)`,
        uk: `Дієслово ОТИВАМ означає «йти/їхати» — рухатися кудись (на відміну від ходя, яке означає «ходити регулярно»). ОТИВАМ належить до А-групи (3-я дієвідміна) і закінчується на -АМ у 1-й особі однини.

Стверджувальна форма (+):
аз отивам (я йду / їду), ти отиваш, той/тя/то отива, ние отиваме, вие отивате, те отиват

Заперечна форма (–):
не отивам, не отиваш, не отива, не отиваме, не отивате, не отиват

Питальна форма (?):
отивам ли? (чи йду я?), отиваш ли?, отива ли?, отиваме ли?, отивате ли?, отиват ли?

Коли вживається:
ОТИВАМ описує конкретний рух «зараз» або запланований у найближчому майбутньому:
Сега отивам на работа. (Зараз я йду на роботу.)
Утре отивам на лекар. (Завтра йду до лікаря.)

Часто вживається з прийменниками НА, В, ДО, КЪМ:
Отивам на работа. (Іду на роботу.) Отивам на училище. (Іду до школи.)
Отивам на кино. (Іду в кіно.) Отивам на разходка. (Іду на прогулянку.)
Отивам в магазина. (Іду до магазину.) Отивам до банката. (Іду до банку.)

ОТИВАМ vs. ХОДЯ:
ОТИВАМ — одноразова, конкретна дія: Сега отивам на пазар. (Зараз я йду на ринок.)
ХОДЯ — регулярна, повторювана дія: Ходя на пазар всяка събота. (Ходжу на ринок щосуботи.)

Приклади:
Здравей! Къде отиваш? — Отивам на кино. (Привіт! Куди йдеш? — Іду в кіно.)
В колко часа отивате на работа? — Отивам в осем. (О котрій ви йдете на роботу? — Іду о восьмій.)
Те отиват на море през лятото. (Вони їдуть на море влітку.)`,
      },
    },
  ],
};

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

  grammarReference: [],
};

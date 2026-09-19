import type { LessonContent } from '@/content/types';

const B1_TTS_PROMPT =
  'Read aloud in a warm, welcoming tone, in clear standard Bulgarian with natural native pronunciation and correct stress. Do not use any Russian, Arabic, English or other foreign accent.';

export const content: LessonContent = {
  sections: [],
  vocabulary: [
    // ── НОВИ ДУМИ 1: ГЕОГРАФИЯ ──────────────────────────────────────────────
    {
      id: 'b1-l11-nd-01-poluostrov',
      bulgarian: 'полуостров, -и',
      ttsText: 'полуостров, полуострови',
      ttsModel: 'pro',
      ttsPrompt: B1_TTS_PROMPT,
      translations: {
        en: 'peninsula',
        fr: 'péninsule',
        ar: 'شبه جزيرة',
        fa: 'شبه‌جزیره',
        ru: 'полуостров',
        uk: 'півострів',
      },
    },
    {
      id: 'b1-l11-nd-02-vyrh',
      bulgarian: 'връх, върхове',
      ttsText: 'връх, върхове',
      ttsModel: 'pro',
      ttsPrompt:
        'Read aloud in clear standard Bulgarian. Say the two words as a declarative statement, NOT as a question — use falling intonation. "Връх" (в-р-ъ-х), stress on the single syllable. "Върхове" — stress on second syllable: вър-ХО-ве. Do not use rising (interrogative) intonation. Do not use any foreign accent.',
      translations: {
        en: 'peak, summit',
        fr: 'sommet',
        ar: 'قمة',
        fa: 'قله',
        ru: 'вершина',
        uk: 'вершина',
      },
    },
    {
      id: 'b1-l11-nd-03-ravnina',
      bulgarian: 'равнина, -и',
      ttsText: 'равнина, равнини',
      ttsModel: 'pro',
      ttsPrompt:
        'Read aloud in clear standard Bulgarian. The word is "равнина" (р-а-в-н-и-н-а), meaning a plain or flatland. Stress on the second syllable: рав-НИ-на. Plural "равнини". Do not use any foreign accent.',
      translations: {
        en: 'plain',
        fr: 'plaine',
        ar: 'سهل',
        fa: 'دشت',
        ru: 'равнина',
        uk: 'рівнина',
      },
    },
    {
      id: 'b1-l11-nd-04-dolina',
      bulgarian: 'долина, -и',
      ttsText: 'долина, долини',
      ttsModel: 'pro',
      ttsPrompt:
        'Read aloud in clear standard Bulgarian. "Долина" — до-ли-НА, stress on last syllable НА. "Долини" — до-ли-НИ, stress on the second И (ли-НИ), NOT on the first syllable. Say до-ли-НИ clearly with НИ stressed. Do not use any foreign accent.',
      translations: {
        en: 'valley',
        fr: 'vallée',
        ar: 'وادٍ',
        fa: 'دره',
        ru: 'долина',
        uk: 'долина',
      },
    },
    {
      id: 'b1-l11-nd-05-bryag',
      bulgarian: 'бряг, брегове',
      ttsText: 'бряг, брегове',
      ttsModel: 'pro',
      ttsPrompt:
        'Read aloud in clear standard Bulgarian. The word is "бряг" (б-р-я-г), meaning shore or bank. Pronounce the "р" clearly: бряг. Plural "брегове". Do not use any foreign accent.',
      translations: {
        en: 'shore, bank',
        fr: 'rive, rivage',
        ar: 'ضفة، شاطئ',
        fa: 'ساحل',
        ru: 'берег',
        uk: 'берег',
      },
    },
    {
      id: 'b1-l11-nd-06-vodopad',
      bulgarian: 'водопад, -и',
      ttsText: 'водопад, водопади',
      ttsModel: 'pro',
      ttsPrompt:
        'Warm natural female Bulgarian. CRITICAL: Bulgarian NEVER palatalizes consonants. The plural ends in a hard D-I (vo-do-PA-di, D as in English "dog") — NEVER add a Y-glide: NOT dyi, NOT dyи. Standard Bulgarian D before I is always hard. No Russian accent.',
      translations: {
        en: 'waterfall',
        fr: 'cascade',
        ar: 'شلال',
        fa: 'آبشار',
        ru: 'водопад',
        uk: 'водоспад',
      },
    },
    {
      id: 'b1-l11-nd-07-klimat',
      bulgarian: 'климат',
      ttsText: 'климат',
      ttsModel: 'pro',
      ttsPrompt:
        'Warm natural female Bulgarian. CRITICAL: kli-MAT — hard L consonant (never soft Ly or lyu). Stress the first syllable. No Russian accent.',
      translations: {
        en: 'climate',
        fr: 'climat',
        ar: 'مناخ',
        fa: 'آب‌وهوا',
        ru: 'климат',
        uk: 'клімат',
      },
    },
    {
      id: 'b1-l11-nd-08-priroden-park',
      bulgarian: 'природен парк',
      ttsText: 'природен парк',
      ttsModel: 'pro',
      ttsPrompt:
        'Warm natural female Bulgarian. CRITICAL: "park" ends with a clear rolling R then hard K (p-a-R-k) — do not drop or reduce the R. No foreign accent.',
      translations: {
        en: 'nature park',
        fr: 'parc naturel',
        ar: 'منتزه طبيعي',
        fa: 'پارک طبیعی',
        ru: 'природный парк',
        uk: 'природний парк',
      },
    },
    // ── НОВИ ДУМИ 2: ФЛОРА И ФАУНА ──────────────────────────────────────────
    {
      id: 'b1-l11-nd-09-mechka',
      bulgarian: 'мечка, -и',
      ttsText: 'мечка, мечки',
      ttsModel: 'pro',
      ttsPrompt: B1_TTS_PROMPT,
      translations: {
        en: 'bear',
        fr: 'ours',
        ar: 'دب',
        fa: 'خرس',
        ru: 'медведь',
        uk: 'ведмідь',
      },
    },
    {
      id: 'b1-l11-nd-10-vylk',
      bulgarian: 'вълк, вълци',
      ttsText: 'вълк, вълци',
      ttsModel: 'pro',
      ttsPrompt:
        'Read aloud in clear standard Bulgarian. "Вълк" (в-ъ-л-к) — pronounce the Л clearly before К: въ-ЛК. "Вълци" — the plural ends in ЦИ (ts-sound): въл-ЦИ, NOT "въви", NOT "вълчи" (the sound is Ц not Ч). Make the Л audible in both forms. Do not use any foreign accent.',
      translations: {
        en: 'wolf',
        fr: 'loup',
        ar: 'ذئب',
        fa: 'گرگ',
        ru: 'волк',
        uk: 'вовк',
      },
    },
    {
      id: 'b1-l11-nd-11-elen',
      bulgarian: 'елен, -и',
      ttsText: 'елен, елени',
      ttsModel: 'pro',
      ttsPrompt:
        'Read aloud in clear standard Bulgarian. "Елен" — stress on second syllable: е-ЛЕН. Pronounce the Н clearly at the end: е-лен. Plural "елени" — stress on second syllable е-ЛЕ-ни, with clear Е in the stressed syllable. Do not use any foreign accent.',
      translations: {
        en: 'deer',
        fr: 'cerf',
        ar: 'أيّل',
        fa: 'گوزن',
        ru: 'олень',
        uk: 'олень',
      },
    },
    {
      id: 'b1-l11-nd-12-syrna',
      bulgarian: 'сърна, -и',
      ttsText: 'сърна, сърни',
      ttsModel: 'pro',
      ttsPrompt:
        'Read aloud in clear standard Bulgarian. "Сърна" — each consonant must be distinct: С-Ъ-Р-Н-А, stress on last syllable сър-НА. Plural "сърни" — С-Ъ-Р-Н-И, stress сър-НИ. Pronounce the Р clearly, do NOT swallow or merge any consonants. Do not use any foreign accent.',
      translations: {
        en: 'roe deer',
        fr: 'chevreuil',
        ar: 'ظبية',
        fa: 'آهو',
        ru: 'косуля',
        uk: 'козуля',
      },
    },
    {
      id: 'b1-l11-nd-13-lisitsa',
      bulgarian: 'лисица, -и',
      ttsText: 'лисица, лисици',
      ttsModel: 'pro',
      ttsPrompt:
        'Read aloud in clear standard Bulgarian. "Лисица" — ли-си-ЦА. Plural "лисици" — ли-си-ЦИ, ending clearly in И. NOT "лисичи". The final sound is Ц (ts), not Ч (ch). Do not use any foreign accent.',
      translations: {
        en: 'fox',
        fr: 'renard',
        ar: 'ثعلب',
        fa: 'روباه',
        ru: 'лиса',
        uk: 'лисиця',
      },
    },
    {
      id: 'b1-l11-nd-14-roza',
      bulgarian: 'роза, -и',
      ttsText: 'роза, рози',
      ttsModel: 'pro',
      ttsPrompt:
        'Read aloud in clear standard Bulgarian. The word is "роза" (р-о-з-а), meaning rose. It starts with Р, not Л — "роза", not "лоза". Stress on first syllable: РО-за. Plural "рози". Do not use any foreign accent.',
      translations: {
        en: 'rose',
        fr: 'rose',
        ar: 'وردة',
        fa: 'گل رز',
        ru: 'роза',
        uk: 'троянда',
      },
    },
    {
      id: 'b1-l11-nd-15-lavandula',
      bulgarian: 'лавандула',
      ttsText: 'лавандула',
      ttsModel: 'pro',
      ttsPrompt:
        'Read aloud in clear standard Bulgarian accent. "Лавандула" — Bulgarian stress falls on the THIRD syllable: ла-ван-ДУ-ла. Say: ла-ван-ДУ-ла with stress on ДУ. Do NOT use American or English pronunciation of lavender. Use authentic Bulgarian accent throughout. Do not use any foreign accent.',
      translations: {
        en: 'lavender',
        fr: 'lavande',
        ar: 'خزامى',
        fa: 'اسطوخودوس',
        ru: 'лаванда',
        uk: 'лаванда',
      },
    },
  ],
  introduction:
    'България е красива и разнообразна страна. Има планини, реки, езера, морски бряг и много природни богатства. В този урок четем за географията на страната, нейните планини и легендите, свързани с тях.',

  grammarReference: [
    {
      id: 'b1-l11-gr-sravneniya-stepenuvane',
      title: {
        bg: 'Степенуване и сравнения с „като"',
        en: 'Degrees of comparison and comparisons with "като"',
        fr: 'Degrés de comparaison et comparaisons avec «като»',
        ar: 'درجات المقارنة والتشبيه بـ«като»',
        fa: 'درجه‌بندی صفت‌ها و مقایسه با «като»',
        uk: 'Ступені порівняння та порівняння з «като»',
        ru: 'Степени сравнения и сравнения с «като»',
      },
      content: {
        bg: 'Прилагателните имена се степенуват с представките **по-** (сравнителна степен) и **най-** (превъзходна степен). Сравнителна степен: **по-висок, по-висока, по-високо, по-високи** (по-висок от Пирин). Превъзходна степен: **най-висок, най-висока, най-високо, най-висoки** (най-високата планина в България). Прилагателното се съгласува по род и число: **най-висoкият** връх (м.р., членуван), **най-висoката** планина (ж.р.), **най-висoкото** езеро (ср.р.), **най-висoките** върхове (мн.ч.).\n\nСравненията с **като** изразяват прилика между две неща: **синьо като небето**, **богат като цар**, **бял като сняг**, **гладен като вълк**, **хитър като лисица**. В тези изрази прилагателното се съгласува с подлога на изречението, а не с думата след „като".',
        en: 'Bulgarian adjectives are compared using the prefixes **по-** (comparative) and **най-** (superlative). Comparative: **по-висок, по-висока, по-високо, по-високи** (taller/higher than Пирин). Superlative: **най-висок, най-висока, най-високо, най-високи** (the tallest/highest mountain in Bulgaria). The adjective agrees in gender and number with its noun: **най-висoкият** peak (m., definite), **най-висoката** mountain (f.), **най-висoкото** lake (n.), **най-висoките** peaks (pl.).\n\nComparisons with **като** (like / as) express similarity: **синьо като небето** (blue as the sky), **богат като цар** (rich as a king), **бял като сняг** (white as snow), **гладен като вълк** (hungry as a wolf), **хитър като лисица** (cunning as a fox). The adjective agrees with the subject of the sentence, not with the word after "като".',
        fr: 'Les adjectifs bulgares se comparent avec les préfixes **по-** (comparatif) et **най-** (superlatif). Comparatif : **по-висок, по-висока, по-високо, по-високи** (plus haut que Pirin). Superlatif : **най-висок, най-висока, най-високо, най-високи** (la plus haute montagne de Bulgarie). L\'adjectif s\'accorde en genre et en nombre : **най-висoкият** sommet (m., défini), **най-висoката** montagne (f.), **най-висoкото** lac (n.), **най-висoките** sommets (pl.).\n\nLes comparaisons avec **като** (comme) expriment la ressemblance : **синьо като небето** (bleu comme le ciel), **богат като цар** (riche comme un roi), **бял като сняг** (blanc comme neige), **гладен като вълк** (affamé comme un loup), **хитър като лисица** (rusé comme un renard). L\'adjectif s\'accorde avec le sujet de la phrase, non avec le mot qui suit «като».',
        ar: 'تُستخدم في اللغة البلغارية اللواحق **по-** (صيغة المقارنة) و**най-** (صيغة التفضيل) لتصريف الصفات. صيغة المقارنة: **по-висок، по-висока، по-высоко، по-высоки** (أعلى من بيرين). صيغة التفضيل: **най-висок، най-висока، най-высоко، най-高ки** (أعلى جبل في بلغاريا). يتطابق الصفة مع الاسم جنسًا وعددًا: **най-висoкият** قمة (مذكر)، **най-висoката** جبل (مؤنث)، **най-висoкото** بحيرة (محايد)، **най-висoките** قمم (جمع).\n\nتُعبّر المقارنات بـ**като** (مثل) عن التشابه: **синьо като небето** (أزرق مثل السماء)، **богат като цар** (غني مثل ملك)، **бял като сняг** (أبيض مثل الثلج)، **гладен като вълк** (جائع مثل ذئب)، **хитър като лисица** (ماكر مثل ثعلب). يتطابق الصفة مع فاعل الجملة، لا مع الكلمة التي تلي «като».',
        fa: 'در زبان بلغاری، صفت‌ها با پیشوندهای **по-** (تفضیلی) و **най-** (عالی) مقایسه می‌شوند. درجهٔ تفضیلی: **по-висок، по-висока، по-високо، по-високи** (بلندتر از پیرین). درجهٔ عالی: **най-висок، най-висока، най-високо، най-високи** (بلندترین کوه بلغارستان). صفت با اسم از نظر جنس و شمار مطابقت دارد: **най-висoкият** قله (مذکر)، **най-висoката** کوه (مؤنث)، **най-висoкото** دریاچه (خنثی)، **най-висoките** قله‌ها (جمع).\n\nمقایسه با **като** (مثل): **синьо като небето** (آبی مثل آسمان)، **богат като цار** (ثروتمند مثل پادشاه)، **бял като сняг** (سفید مثل برف)، **гладен като вълк** (گرسنه مثل گرگ)، **хитър като лисица** (زیرک مثل روباه). صفت با فاعل جمله مطابقت می‌کند، نه با کلمهٔ بعد از «като».',
        uk: 'Прикметники в болгарській мові порівнюються за допомогою префіксів **по-** (вищий ступінь) та **най-** (найвищий ступінь). Вищий ступінь: **по-висок, по-висока, по-високо, по-високи** (вищий за Пірін). Найвищий ступінь: **най-висок, най-висока, най-високо, най-високи** (найвища гора в Болгарії). Прикметник узгоджується з іменником у роді та числі: **най-висoкият** пік (ч.р.), **най-висoката** гора (ж.р.), **най-висoкото** озеро (с.р.), **най-висoките** піки (мн.).\n\nПорівняння з **като** (як): **синьо като небето** (синє як небо), **богат като цар** (багатий як цар), **бял като сняг** (білий як сніг), **гладен като вълк** (голодний як вовк), **хитър като лисица** (хитрий як лисиця). Прикметник узгоджується з підметом речення, а не зі словом після «като».',
        ru: 'Прилагательные в болгарском языке сравниваются с приставками **по-** (сравнительная степень) и **най-** (превосходная степень). Сравнительная: **по-висок, по-висока, по-высоко, по-высоки** (выше Пирина). Превосходная: **най-висок, най-висока, най-высоко, най-высоки** (самая высокая гора в Болгарии). Прилагательное согласуется с существительным по роду и числу: **най-висoкият** пик (м.р.), **най-висoката** гора (ж.р.), **най-висoкото** озеро (ср.р.), **най-висoките** вершины (мн.ч.).\n\nСравнения с **като** (как): **синьо като небето** (синее как небо), **богат като цар** (богатый как царь), **бял като сняг** (белый как снег), **гладен като вълк** (голодный как волк), **хитър като лисица** (хитрый как лиса). Прилагательное согласуется с подлежащим, а не со словом после «като».',
      },
    },
    {
      id: 'b1-l11-gr-preizkazno',
      title: {
        bg: 'Преизказно наклонение',
        en: 'The Renarrative Mood',
        fr: 'L\'humeur renarrative',
        ar: 'نمط إعادة السرد',
        fa: 'نمود روایی مجدد',
        uk: 'Переповідний спосіб',
        ru: 'Пересказательное наклонение',
      },
      content: {
        bg: 'Преизказното наклонение се използва, когато разказваме нещо, което сме чули или прочели, но не сме преживели лично. Среща се в народни приказки, легенди, вестникарски статии и при преразказване на чужди думи.\n\n**Образуване:** За продължителни (несвършени) действия: 3 л. ед.ч. минало несвършено + **-л/-ла/-ло/-ли**: *живееше → живял, идваше → идвала, казваше → казвало, биеха → биели*. За завършени (свършени) действия: 3 л. ед.ч. минало свършено + **-л/-ла/-ло/-ли**: *реши → решил, избяга → избягал, нарекоха → нарекли*.\n\n**Примери от легендите в урока:** „Преди много години в едно село **живяло** хубаво момиче на име Рила." „Яна **идвала** всяка сутрин на брега на езерото." „Езерото **потъмняло** от гняв и мъка." „Децата **се биели** и **се карали**." „Младите **решили** да избягат и да се оженят тайно."\n\n**Кога се употребява:** при преразказване на легенди и приказки; при описание на исторически факти от книга или учебник; при предаване на чута или прочетена информация; при изразяване на съмнение в истинността на информацията.\n\n**Разлика между изявително и преизказно:** *Яна живееше в селото.* (изявително — знам го лично, бях там) срещу *Яна живяла в селото.* (преизказно — чул/а съм го от друг, не знам дали е истина).',
        en: 'The renarrative mood (also called the "reported" or "indirect" mood) is used in Bulgarian to retell stories, legends or information that you heard or read but did not experience personally. It appears in folktales, legends, newspaper articles and when reporting someone else\'s words.\n\n**Formation:** For ongoing (imperfective) actions: 3rd person singular past imperfective + **-л/-ла/-ло/-ли**: *живееше → живял, идваше → идвала, казваше → казвало, биеха → биели*. For completed (perfective) actions: 3rd person singular past perfective + **-л/-ла/-ло/-ли**: *реши → решил, избяга → избягал, нарекоха → нарекли*.\n\n**Examples from the legends in this lesson:** "Преди много години в едно село **живяло** хубаво момиче на име Рила." (it is said a girl named Рила lived there). "Яна **идвала** всяка сутрин." (it is said Яна used to come). "Езерото **потъмняло** от гняв." (the lake is said to have darkened from anger). "Младите **решили** да избягат." (it is said the young couple decided to flee).\n\n**When to use it:** retelling legends and folktales; describing historical facts from a book or textbook; reporting heard or read information; expressing doubt about the truthfulness of the information.\n\n**Contrast:** *Яна живееше в селото.* (indicative — I know this personally, I was there) vs. *Яна живяла в селото.* (renarrative — I heard this from someone else, I am not sure it is true).',
        fr: 'L\'humeur renarrative (ou «reporté») s\'utilise en bulgare pour raconter des histoires, des légendes ou des informations entendues ou lues, mais non vécues personnellement. On la trouve dans les contes populaires, les légendes, les articles de presse et lors de la transmission des paroles de quelqu\'un d\'autre.\n\n**Formation :** pour les actions imperfectives (en cours) : 3ème pers. sg. du passé imperfectif + **-л/-ла/-ло/-ли** : *живееше → живял, идваше → идвала, казваше → казвало, биеха → биели*. Pour les actions perfectives (achevées) : 3ème pers. sg. du passé perfectif + **-л/-ла/-ло/-ли** : *реши → решил, избяга → избягал, нарекоха → нарекли*.\n\n**Exemples des légendes de ce chapitre :** «Преди много години в едно село **живяло** хубаво момиче на име Рила.» (il est dit qu\'une fille nommée Рила vivait là). «Яна **идвала** всяка сутрин.» (il est dit que Яна venait chaque matin). «Езерото **потъмняло** от гняв.» (le lac aurait noirci de colère). «Младите **решили** да избягат.» (les jeunes auraient décidé de fuir).\n\n**Quand l\'utiliser :** récit de légendes et de contes populaires ; description de faits historiques tirés d\'un livre ; transmission d\'informations entendues ou lues ; expression du doute sur la véracité d\'une information.\n\n**Contraste :** *Яна живееше в селото.* (indicatif — je le sais personnellement) vs *Яна живяла в селото.* (renarratif — je l\'ai entendu, je n\'en suis pas sûr(e)).',
        ar: 'يُستخدَم نمط إعادة السرد في اللغة البلغارية لرواية قصص أو أساطير أو معلومات سُمِعت أو قُرئت، لا عُيِشت شخصيًا. يظهر في الحكايات الشعبية والأساطير والمقالات الصحفية وعند نقل كلام شخص آخر.\n\n**التكوين:** للأفعال المستمرة (غير التامة): صيغة الغائب المفرد الماضي المستمر + **-л/-ла/-ло/-ли**: *живееше ← живял، идваше ← идвала، казваше ← казвало، биеха ← биели*. للأفعال المنجزة (التامة): صيغة الغائب المفرد الماضي التام + **-л/-ла/-ло/-ли**: *реши ← решил، избяга ← избягал، нарекоха ← нарекли*.\n\n**أمثلة من أساطير هذا الدرس:** «Преди много години в едно село **живяло** хубаво момиче на ime Рила.» (يُقال إن فتاة اسمها ريلا كانت تعيش هناك). «Яна **идвала** всяка сутрин.» (يُقال إن يانا كانت تأتي كل صباح). «Езерото **потъмняло** от гняв.» (يُقال إن البحيرة اسودّت من الغضب). «Младите **решили** да избягат.» (يُقال إن الشابَّين قرّرا الهروب).\n\n**متى يُستخدَم:** عند سرد الأساطير والحكايات الشعبية؛ وصف الوقائع التاريخية من كتاب؛ نقل معلومات مسموعة أو مقروءة؛ التعبير عن الشك في صحة المعلومات.\n\n**الفرق:** *Яна живееше в селото.* (خبري — أعرفه بنفسي، كنت هناك) مقابل *Яна живяла в селото.* (إعادة سردي — سمعته من غيري، لست متأكدًا من صحته).',
        fa: 'نمود روایی مجدد در زبان بلغاری برای بازگویی داستان‌ها، افسانه‌ها یا اطلاعاتی که شنیده یا خوانده‌اید اما شخصاً تجربه نکرده‌اید به کار می‌رود. در قصه‌های فولکلور، افسانه‌ها، مقالات خبری و هنگام نقل کلام دیگران یافت می‌شود.\n\n**ساخت:** برای افعال جاری (ناقص): سوم شخص مفرد گذشتهٔ ناقص + **-л/-ла/-ло/-ли**: *живееше ← живял، идваше ← идвала، казваше ← казвало، биеха ← биели*. برای افعال تمام‌شده (تام): سوم شخص مفرد گذشتهٔ تام + **-л/-ла/-ло/-ли**: *реши ← решил، избяга ← избягал، нарекоха ← нарекли*.\n\n**نمونه‌هایی از افسانه‌های این درس:** «Преди много години в едно село **живяло** хубаво момиче на иme Рила.» (گفته می‌شود دختری به نام ریلا آنجا زندگی می‌کرد). «Яна **идвала** всяка сутрин.» (گفته می‌شود یانا هر صبح می‌آمد). «Езерото **потъмняло** от гняв.» (گفته می‌شود دریاچه از خشم تیره شد). «Младите **решили** да избягат.» (گفته می‌شود جوانان تصمیم گرفتند فرار کنند).\n\n**کاربرد:** بازگویی افسانه‌ها و قصه‌های فولکلور؛ توصیف وقایع تاریخی از کتاب؛ انتقال اطلاعات شنیده یا خوانده‌شده؛ ابراز تردید در صحت اطلاعات.\n\n**تفاوت:** *Яна живееше в селото.* (خبری — خودم می‌دانم، آنجا بودم) در برابر *Яна живяла в селото.* (روایی — از دیگری شنیده‌ام، مطمئن نیستم).',
        uk: 'Переповідний спосіб використовується в болгарській мові для переказу історій, легенд або інформації, почутої чи прочитаної, але не пережитої особисто. Трапляється в народних казках, легендах, газетних статтях і при передачі чужих слів.\n\n**Творення:** для тривалих (недоконаних) дій: 3 ос. одн. минулого недоконаного + **-л/-ла/-ло/-ли**: *живееше → живял, идваше → идвала, казваше → казвало, биеха → биели*. Для завершених (доконаних) дій: 3 ос. одн. минулого доконаного + **-л/-ла/-ло/-ли**: *реши → решил, избяга → избягал, нарекоха → нарекли*.\n\n**Приклади з легенд цього уроку:** «Преди много години в едно село **живяло** хубаво момиче на іme Рила.» (кажуть, що жила дівчина на ім\'я Ріла). «Яна **идвала** всяка сутрин.» (кажуть, що Яна приходила щоранку). «Езерото **потъмняло** от гняв.» (кажуть, що озеро потемніло від гніву). «Младите **решили** да избягат.» (кажуть, що молоді вирішили втекти).\n\n**Коли вживати:** переказ легенд і народних казок; опис历史 фактів з книги; передача почутої або прочитаної інформації; вираження сумніву в достовірності інформації.\n\n**Різниця:** *Яна живееше в селото.* (дійсний — знаю особисто, був/була там) проти *Яна живяла в селото.* (переповідний — чув/чула від іншого, не впевнений/а).',
        ru: 'Пересказательное наклонение используется в болгарском языке для пересказа историй, легенд или информации, услышанной или прочитанной, но не пережитой лично. Встречается в народных сказках, легендах, газетных статьях и при передаче чужих слов.\n\n**Образование:** для продолжительных (несовершенных) действий: 3 л. ед.ч. прошедшего несов. вр. + **-л/-ла/-ло/-ли**: *живееше → живял, идваше → идвала, казваше → казвало, биеха → биели*. Для завершённых (совершенных) действий: 3 л. ед.ч. прошедшего сов. вр. + **-л/-ла/-ло/-ли**: *реши → решил, избяга → избягал, нарекоха → нарекли*.\n\n**Примеры из легенд этого урока:** «Преди много години в едно село **живяло** хубаво момиче на іme Рила.» (говорят, жила девушка по имени Рила). «Яна **идвала** всяка сутрин.» (говорят, Яна приходила каждое утро). «Езерото **потъмняло** от гняв.» (говорят, озеро потемнело от гнева). «Младите **решили** да избягат.» (говорят, влюблённые решили бежать).\n\n**Когда употреблять:** пересказ легенд и народных сказок; описание исторических фактов из книги; передача услышанной или прочитанной информации; выражение сомнения в достоверности информации.\n\n**Разница:** *Яна живееше в селото.* (изъявительное — знаю лично, был(а) там) против *Яна живяла в селото.* (пересказательное — слышал(а) от другого, не уверен(а)).',
      },
    },
  ],
};

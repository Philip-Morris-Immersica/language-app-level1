import type { LessonContent, VocabularyItem } from '@/content/types';

// ⚠️ Речникът (content.vocabulary) се пази за бутона „Речник" (showDictionary: true).
// Думите са само от учебника / клиентския ключ (план §4, D1) — нищо извън текстовете.
// BATCH 1 (ord 1–16) = 12 билки (НОВИ ДУМИ 1), думите на упр. 16 и ключовите думи от
// текстовете на Еньовден, СПА, хранителната пирамида, баланс. хранене и Пламен.
// BATCH 2 (ord 17–24: граматики и упражнения по повелително наклонение) няма четива и
// нови думи по плана §4 → без нови записи; BATCH 3 (финален) = 5 подправки, 9 глаголни двойки
// от упр. 30, 10 идиома и ключовите думи от текстовете за гурме/рецептата/кухнята.
// Гланцовете са ръчно преведени (en, fr, ar, fa, ru, uk); bulgarian остава на български.

type Gloss = [en: string, fr: string, ar: string, fa: string, ru: string, uk: string];

function vocab(n: number, bulgarian: string, g: Gloss): VocabularyItem {
  return {
    id: `b2-l02-vocab-${String(n).padStart(2, '0')}`,
    bulgarian,
    translations: { en: g[0], fr: g[1], ar: g[2], fa: g[3], ru: g[4], uk: g[5] },
  };
}

export const content: LessonContent = {
  sections: [],
  vocabulary: [
    // НОВИ ДУМИ 1 — билки
    vocab(1, 'лайка', ['chamomile', 'camomille', 'بابونج', 'بابونه', 'ромашка', 'ромашка']),
    vocab(2, 'лавандула', ['lavender', 'lavande', 'خزامى (لافندر)', 'اسطوخودوس', 'лаванда', 'лаванда']),
    {
      ...vocab(3, 'невен', ['marigold (calendula)', 'souci (calendula)', 'آذريون (كالنديولا)', 'همیشه‌بهار', 'календула (ноготки)', 'календула (нагідки)']),
      // Feedback 2026-10-22: ударение/произношение.
      ttsText: 'невЕн.',
      ttsModel: 'flash',
      ttsPrompt:
        'Read this Bulgarian word or phrase exactly once, clearly, as a calm statement with falling intonation (never as a question), with native Bulgarian stress, pronouncing every letter, and no foreign accent. Stress the second syllable: не-ВЕН.',
    },
    vocab(4, 'мента', ['peppermint', 'menthe poivrée', 'نعناع فلفلي', 'نعنای فلفلی', 'мята перечная', 'м’ята перцева']),
    vocab(5, 'мащерка', ['thyme', 'thym', 'زعتر', 'آویشن', 'тимьян (чабрец)', 'чебрець']),
    vocab(6, 'шипка', ['rose hip', 'églantier (cynorrhodon)', 'ثمر الورد البرّي', 'نسترن', 'шиповник', 'шипшина']),
    vocab(7, 'коприва', ['nettle', 'ortie', 'قرّاص', 'گزنه', 'крапива', 'кропива']),
    vocab(8, 'бъз', ['elder', 'sureau', 'بيلسان (خمّان)', 'سنبوک', 'бузина', 'бузина']),
    vocab(9, 'бял равнец', ['yarrow', 'achillée millefeuille', 'ألف ورقة (الياروّ)', 'بومادران', 'тысячелистник', 'деревій']),
    vocab(10, 'жълт кантарион', ['St John’s wort', 'millepertuis', 'عشبة القدّيس يوحنا', 'گل راعی', 'зверобой', 'звіробій']),
    {
      ...vocab(11, 'липа', ['linden (lime tree)', 'tilleul', 'زيزفون', 'زیرفون', 'липа', 'липа']),
      // Feedback 2026-10-21: „липа“ се чуваше „ипа“ — същият фикс като на картата в НОВИ ДУМИ 1.
      ttsText: 'липА.',
      ttsModel: 'flash',
      ttsPrompt:
        'Read this Bulgarian word or phrase exactly once, clearly, as a calm statement with falling intonation (never as a question), with native Bulgarian stress, pronouncing every letter, and no foreign accent. Pronounce the first letter л clearly: ли-па, two syllables, stressed on the second: ли-ПА, never "ипа".',
    },
    {
      ...vocab(12, 'маточина', ['lemon balm', 'mélisse', 'الميليسا (ترنجان)', 'بادرنجبویه', 'мелисса', 'меліса']),
      // Feedback 2026-10-22: ударение/произношение.
      ttsText: 'мАточина.',
      ttsModel: 'flash',
      ttsPrompt:
        'Read this Bulgarian word or phrase exactly once, clearly, as a calm statement with falling intonation (never as a question), with native Bulgarian stress, pronouncing every letter, and no foreign accent.',
    },

    // Упр. 16 — думите за описанията
    vocab(13, 'пропорция', ['proportion', 'proportion', 'نسبة، تناسب', 'نسبت، تناسب', 'пропорция', 'пропорція']),
    vocab(14, 'консумирам', ['to consume', 'consommer', 'يستهلك، يتناول', 'مصرف کردن، خوردن', 'потреблять', 'споживати']),
    vocab(15, 'ограничавам', ['to limit, to restrict', 'limiter, restreindre', 'يحدّ من، يقلّل', 'محدود کردن', 'ограничивать', 'обмежувати']),
    vocab(16, 'източник', ['source', 'source', 'مصدر', 'منبع', 'источник', 'джерело']),
    vocab(17, 'порция', ['portion', 'portion', 'حصّة، وجبة', 'وعده، پرس', 'порция', 'порція']),
    vocab(18, 'ежедневно', ['daily', 'quotidiennement', 'يوميًّا', 'روزانه', 'ежедневно', 'щодня']),
    vocab(19, 'водещ', ['leading', 'principal, de premier plan', 'رائد، رئيسي', 'پیشرو، اصلی', 'ведущий', 'провідний']),

    // Ключови думи от текстовете (ord 8–16)
    vocab(20, 'слънцестоене', ['solstice', 'solstice', 'انقلاب شمسي', 'انقلاب خورشیدی', 'солнцестояние', 'сонцестояння']),
    vocab(21, 'лековит', ['medicinal, healing', 'curatif, médicinal', 'شافٍ، علاجي', 'شفابخش', 'лечебный, целебный', 'лікувальний, цілющий']),
    vocab(22, 'етерично масло', ['essential oil', 'huile essentielle', 'زيت عطري', 'اسانس، روغن اسانسی', 'эфирное масло', 'ефірна олія']),
    {
      ...vocab(23, 'минерален извор', ['mineral spring', 'source minérale', 'ينبوع معدني', 'چشمه معدنی', 'минеральный источник', 'мінеральне джерело']),
      // Feedback 2026-10-22: ударение/произношение.
      ttsText: 'минерАлен извор.',
      ttsModel: 'flash',
      ttsPrompt:
        'Read this Bulgarian word or phrase exactly once, clearly, as a calm statement with falling intonation (never as a question), with native Bulgarian stress, pronouncing every letter, and no foreign accent. Pronounce the л in "минерален" as a firm, hard (velarized) Bulgarian л, not soft.',
    },
    vocab(24, 'терма', ['thermal bath (Roman baths)', 'thermes (bains romains)', 'حمّام روماني، حمّامات حرارية', 'گرمابهٔ رومی', 'терма (римская баня)', 'терма (римська лазня)']),
    vocab(25, 'облекчение', ['relief', 'soulagement', 'تخفيف، راحة', 'تسکین، آرامش', 'облегчение', 'полегшення']),
    {
      ...vocab(26, 'белтъчини', ['proteins', 'protéines', 'بروتينات', 'پروتئین‌ها', 'белки', 'білки']),
      // Feedback 2026-10-22: ударение/произношение.
      ttsText: 'белтъчинИ.',
      ttsModel: 'flash',
      ttsPrompt:
        'Read this Bulgarian word or phrase exactly once, clearly, as a calm statement with falling intonation (never as a question), with native Bulgarian stress, pronouncing every letter, and no foreign accent.',
    },
    {
      ...vocab(27, 'въглехидрати', ['carbohydrates', 'glucides', 'كربوهيدرات', 'کربوهیدرات‌ها', 'углеводы', 'вуглеводи']),
      // Feedback 2026-10-22: ударение/произношение.
      ttsText: 'въглехидрАти.',
      ttsModel: 'flash',
      ttsPrompt:
        'Read this Bulgarian word or phrase exactly once, clearly, as a calm statement with falling intonation (never as a question), with native Bulgarian stress, pronouncing every letter, and no foreign accent. The word is въ-гле-хи-ДРА-ти (carbohydrates), ending in "-драти", never "-драки".',
    },
    {
      ...vocab(28, 'фибри', ['fibre', 'fibres', 'ألياف', 'فیبر، الیاف', 'клетчатка', 'клітковина']),
      // Feedback 2026-10-22: ударение/произношение.
      ttsText: 'фИбри.',
      ttsModel: 'flash',
      ttsPrompt:
        'Read this Bulgarian word or phrase exactly once, clearly, as a calm statement with falling intonation (never as a question), with native Bulgarian stress, pronouncing every letter, and no foreign accent. Pronounce the р clearly: ФИ-бри, two syllables, with a rolled р.',
    },
    vocab(29, 'постен', ['lean, light (low-fat)', 'maigre, léger', 'قليل الدسم', 'کم‌چرب', 'постный, нежирный', 'пісний, нежирний']),
    vocab(30, 'наднормено тегло', ['overweight', 'surpoids', 'وزن زائد', 'اضافه وزن', 'избыточный вес', 'надмірна вага']),
    vocab(31, 'изкушение', ['temptation', 'tentation', 'إغراء', 'وسوسه', 'искушение', 'спокуса']),

    // BATCH 3 — НОВИ ДУМИ 2: подправки (упр. 29)
    vocab(32, 'копър', ['dill', 'aneth', 'شبت', 'شوید', 'укроп', 'кріп']),
    vocab(33, 'магданоз', ['parsley', 'persil', 'بقدونس', 'جعفری', 'петрушка', 'петрушка']),
    vocab(34, 'чубрица', ['savory', 'sarriette', 'ساتوريا (نبتة عطرية)', 'مرزه', 'чабёр (садовый)', 'чабер (садовий)']),
    {
      ...vocab(35, 'босилек', ['basil', 'basilic', 'ريحان', 'ریحان', 'базилик', 'базилік']),
      // Feedback 2026-10-22: ударение/произношение.
      ttsText: 'босИлек.',
      ttsModel: 'flash',
      ttsPrompt:
        'Read this Bulgarian word or phrase exactly once, clearly, as a calm statement with falling intonation (never as a question), with native Bulgarian stress, pronouncing every letter, and no foreign accent. Stress the second syllable: бо-СИ-лек.',
    },
    vocab(36, 'джоджен', ['spearmint', 'menthe verte', 'نعناع أخضر', 'نعنای سبز', 'мята колосистая (садовая мята)', 'м’ята колосиста (садова м’ята)']),

    // Упр. 30 — глаголни двойки (несв. / св. вид)
    vocab(37, 'задушавам / задуша', ['to stew, to braise', 'mijoter, braiser', 'يطهو على نار هادئة', 'با حرارت ملایم پختن', 'тушить', 'тушкувати']),
    vocab(38, 'нарязвам / нарежа', ['to slice, to cut up', 'trancher, couper', 'يقطّع', 'برش دادن، خرد کردن', 'нарезать', 'нарізати']),
    vocab(39, 'прибавям / прибавя', ['to add', 'ajouter', 'يضيف', 'اضافه کردن', 'добавлять', 'додавати']),
    vocab(40, 'разбърквам / разбъркам', ['to stir, to mix', 'remuer, mélanger', 'يحرّك، يخلط', 'هم زدن', 'размешивать', 'розмішувати']),
    vocab(41, 'настъргвам / настържа', ['to grate', 'râper', 'يبشر', 'رنده کردن', 'натирать (на тёрке)', 'натирати (на тертці)']),
    vocab(42, 'намазвам / намажа', ['to spread', 'tartiner', 'يدهن، يفرد', 'مالیدن', 'намазывать', 'намазувати']),
    vocab(43, 'наливам / налея', ['to pour', 'verser', 'يصبّ', 'ریختن', 'наливать', 'наливати']),
    vocab(44, 'премервам / премеря', ['to measure, to weigh out', 'mesurer, peser', 'يقيس، يزن', 'اندازه گرفتن', 'отмерять, взвешивать', 'відміряти, зважувати']),
    vocab(45, 'смесвам / смеся', ['to mix, to combine', 'mélanger', 'يخلط، يمزج', 'مخلوط کردن', 'смешивать', 'змішувати']),

    // Упр. 33 — идиоми (значението, не буквален превод)
    {
      ...vocab(46, 'обирам каймака', ['to skim the cream (to get undeserved benefits)', 'écrémer (tirer des avantages immérités)', 'يحصد المكاسب دون وجه حق', 'بی‌استحقاق سود بردن', 'снимать сливки (получать незаслуженные выгоды)', 'знімати вершки (отримувати незаслужені вигоди)']),
      // Feedback 2026-10-22: ударение/произношение.
      ttsText: 'обирам каймАка.',
      ttsModel: 'flash',
      ttsPrompt:
        'Read this Bulgarian word or phrase exactly once, clearly, as a calm statement with falling intonation (never as a question), with native Bulgarian stress, pronouncing every letter, and no foreign accent. The last word is кай-МА-ка (with к, never "каймата").',
    },
    vocab(47, 'не е луд този, който яде баницата, а който му я дава', ['blame the giver, not the one who takes (of undeserved benefits)', 'le fautif n’est pas celui qui reçoit, mais celui qui donne (des avantages immérités)', 'اللوم على من يمنح لا على من يأخذ (عن مكاسب غير مستحقة)', 'مقصر کسی است که می‌دهد، نه کسی که می‌گیرد (درباره سود نابه‌حق)', 'виноват не тот, кто берёт, а тот, кто даёт (о незаслуженных выгодах)', 'винен не той, хто бере, а той, хто дає (про незаслужені вигоди)']),
    vocab(48, 'пазя си хляба', ['to protect one’s job (one’s livelihood)', 'protéger son gagne-pain', 'يحافظ على لقمة عيشه (عمله)', 'نان خود را حفظ کردن (شغل خود را نگه داشتن)', 'беречь свой хлеб (своё место работы)', 'берегти свій хліб (своє місце роботи)']),
    vocab(49, 'пълна каша', ['a complete mess, confusion', 'un grand désordre, la confusion', 'فوضى عارمة، ارتباك', 'آشفتگی کامل، سردرگمی', 'полная каша (хаос, путаница)', 'повна каша (хаос, плутанина)']),
    {
      ...vocab(50, 'разтягам локуми', ['to talk a lot without saying anything substantial', 'parler beaucoup sans rien dire d’essentiel', 'يُكثر الكلام دون أن يقول شيئًا مهمًّا', 'زیاد حرف زدن بدون گفتن حرف مهم', 'тянуть резину (говорить много и ни о чём)', 'розводити теревені (говорити багато й ні про що)']),
      // Feedback 2026-10-22: ударение/произношение.
      ttsText: 'разтягам локУми.',
      ttsModel: 'flash',
      ttsPrompt:
        'Read this Bulgarian word or phrase exactly once, clearly, as a calm statement with falling intonation (never as a question), with native Bulgarian stress, pronouncing every letter, and no foreign accent.',
    },
    vocab(51, 'приятелството си е приятелство, но сиренето е с пари', ['friendship is friendship, but business is business', 'l’amitié, c’est l’amitié, mais les affaires sont les affaires', 'الصداقة صداقة لكن المال له حسابه', 'دوستی دوستی است، اما حساب حساب است', 'дружба дружбой, а денежки врозь', 'дружба дружбою, а гроші окремо']),
    vocab(52, 'върви по мед и масло', ['goes smoothly, without problems', 'se passe comme sur des roulettes', 'يسير على أحسن ما يرام', 'همه‌چیز روان و بدون مشکل پیش می‌رود', 'идёт как по маслу', 'йде як по маслу']),
    vocab(53, 'мед ми капе на сърцето / душата', ['it warms my heart (I feel great pleasure)', 'cela me réchauffe le cœur (j’éprouve un grand plaisir)', 'يثلج صدري (أشعر بسعادة كبيرة)', 'دلم گرم می‌شود (لذت زیادی می‌برم)', 'на душе мёд (я испытываю большое удовольствие)', 'на душі мед (я відчуваю велике задоволення)']),
    {
      ...vocab(54, 'на всяка манджа мерудия', ['a busybody who meddles in everything without being competent', 'une personne qui se mêle de tout sans être compétente', 'من يتدخّل في كل شيء دون كفاءة', 'کسی که بدون صلاحیت در همه‌چیز دخالت می‌کند', 'в каждой бочке затычка (вмешивается во всё без знаний)', 'у кожній бочці затичка (втручається у все без знань)']),
      // Feedback 2026-10-22: ударение/произношение.
      ttsText: 'на всяка манджа мерудИйя.',
      ttsModel: 'flash',
      ttsPrompt:
        'Read this Bulgarian word or phrase exactly once, clearly, as a calm statement with falling intonation (never as a question), with native Bulgarian stress, pronouncing every letter, and no foreign accent.',
    },
    vocab(55, 'наливам масло в огъня', ['to add fuel to the fire', 'jeter de l’huile sur le feu', 'يصبّ الزيت على النار', 'روغن بر آتش ریختن', 'подливать масла в огонь', 'підливати оливи у вогонь']),

    // Ключови думи от текстовете (ord 25–34)
    vocab(56, 'ценител', ['connoisseur', 'connaisseur, gourmet', 'خبير، متذوّق', 'خبره، قدردان', 'ценитель, знаток', 'поціновувач, знавець']),
    vocab(57, 'подправка', ['spice, seasoning', 'épice, assaisonnement', 'بهار، توابل', 'ادویه، چاشنی', 'пряность, приправа', 'спеція, приправа']),
    vocab(58, 'нишесте', ['starch (thickener)', 'amidon (épaississant)', 'نشا', 'نشاسته', 'крахмал', 'крохмаль']),
    vocab(59, 'обреден', ['ritual, ceremonial', 'rituel, cérémoniel', 'طقسي', 'آیینی', 'обрядовый', 'обрядовий']),
  ],
};


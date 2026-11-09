import type { LessonContent, VocabularyItem } from '@/content/types';

// ⚠️ Речникът (content.vocabulary) се пази за бутона „Речник“ (showDictionary: true).
// Думите са само от текстовете и таблиците на учебника (план §4) — урокът няма НОВИ ДУМИ.
// BATCH 1 (ord 1–16) = думите от упр. 1 (4 биографии), таблицата за външност (упр. 3), упр. 4, 8, 9,
// „Внимание“, упр. 12 и упр. 14 → vocab-01…55. BATCH 2 (ord 17–30) = упр. 24 (Марта) → vocab-56…61. BATCH 3 (ord 31–38) = упр. 30–31, поговорки → vocab-62…77.
// Гланцовете са ръчно преведени (en, fr, ar, fa, ru, uk); bulgarian остава на български.

type Gloss = [en: string, fr: string, ar: string, fa: string, ru: string, uk: string];

const WORD_TTS_PROMPT =
  'Read this Bulgarian word or phrase exactly once, clearly, as a calm statement with falling intonation (never as a question), with native Bulgarian stress, pronouncing every letter, and no foreign accent.';

// Feedback 2026-11-09 (речник): ударение с главна буква; подсказката се добавя към основния промпт.
// Само кратки подсказки — дългите „say once“ промпти се четат на глас или удвояват думата.
const WORD_TTS: Record<string, { text: string; hint?: string }> = {
  'световноизвестен': { text: 'световноизвЕстен.', hint: 'Pronounce the final н clearly.' },
  'благотворителен': { text: 'благотворИИтелен.', hint: 'The л is a firm, hard (velarized) Bulgarian л, like the l in "ball", never soft.' },
  'авиокомпания': { text: 'авиокомпАния.', hint: 'Pronounce the final syllable -ния clearly to the end.' },
  'продълговат': { text: 'продълговАт.' },
  'прошарен': { text: 'прошАрен.' },
  'чуплив': { text: 'чуплИв.' },
  'бенка': { text: 'бЕнка.' },
  'бръчка': { text: 'бръчка.' },
  'бретон': { text: 'бретОн.' },
  'хитър': { text: 'хИтър.' },
  'нахален': { text: 'нахАлен.', hint: 'The л is a firm, hard (velarized) Bulgarian л, like the l in "ball", never soft.' },
  'бъбрив': { text: 'бъбрИв.' },
  'ранобуден': { text: 'ранобУден.' },
  'трудолюбив': { text: 'трудолюбИИв.', hint: 'Pronounce the final в clearly as v, not f.' },
  'елек': { text: 'елЕк.' },
  'ресни': { text: 'реснИ.' },
  'първобитен': { text: 'първобИтен.', hint: 'The word ends in н (n), never м (m).' },
  'мързел': { text: 'мЪрзел.' },
};

function vocab(n: number, bulgarian: string, g: Gloss): VocabularyItem {
  const spoken = WORD_TTS[bulgarian];
  return {
    id: `b2-l04-vocab-${String(n).padStart(2, '0')}`,
    bulgarian,
    translations: { en: g[0], fr: g[1], ar: g[2], fa: g[3], ru: g[4], uk: g[5] },
    ...(spoken
      ? {
          ttsText: spoken.text,
          ttsModel: 'flash' as const,
          ttsPrompt: spoken.hint ? `${WORD_TTS_PROMPT} ${spoken.hint}` : WORD_TTS_PROMPT,
        }
      : {}),
  };
}

export const content: LessonContent = {
  sections: [],
  vocabulary: [
    // Упр. 1 — Христо Стоичков, Асен Йорданов, Джон Атанасов, Стефка Костадинова
    vocab(1, 'световноизвестен', ['world-famous', 'mondialement connu', 'مشهور عالميًّا', 'مشهور جهانی', 'всемирно известный', 'всесвітньо відомий']),
    vocab(2, 'отличие', ['distinction, honour, award', 'distinction, récompense', 'وسام، تكريم', 'نشان افتخار، تقدیر', 'отличие, награда', 'відзнака, нагорода']),
    vocab(3, 'носител', ['holder, winner (of an award)', 'détenteur, lauréat (d’un prix)', 'حائز (على جائزة)', 'دارنده، برنده (جایزه)', 'обладатель (награды)', 'володар, лауреат (нагороди)']),
    vocab(4, 'благотворителен', ['charity (adj.), charitable', 'caritatif, de bienfaisance', 'خيري', 'خیریه‌ای', 'благотворительный', 'благодійний']),
    vocab(5, 'основоположник', ['founder, pioneer', 'fondateur, pionnier', 'مؤسِّس، رائد', 'بنیان‌گذار، پیشگام', 'основоположник, родоначальник', 'засновник, родоначальник']),
    vocab(6, 'авиация', ['aviation', 'aviation', 'الطيران', 'هوانوردی', 'авиация', 'авіація']),
    vocab(7, 'храброст', ['bravery, courage', 'bravoure, courage', 'شجاعة، بسالة', 'شجاعت، دلیری', 'храбрость, отвага', 'хоробрість, відвага']),
    vocab(8, 'орден', ['order, medal (decoration)', 'décoration, médaille', 'وسام', 'نشان (مدال افتخار)', 'орден', 'орден']),
    vocab(9, 'авиокомпания', ['airline', 'compagnie aérienne', 'شركة طيران', 'شرکت هواپیمایی', 'авиакомпания', 'авіакомпанія']),
    vocab(10, 'ръководство', ['manual, guide; also: leadership, management', 'manuel, guide ; aussi : direction', 'دليل إرشادي؛ وأيضًا: قيادة، إدارة', 'راهنما، دفترچهٔ راهنما؛ همچنین: رهبری، مدیریت', 'руководство, пособие; также: управление', 'посібник, керівництво; також: керування']),
    vocab(11, 'прототип', ['prototype', 'prototype', 'نموذج أولي', 'نمونهٔ اولیه', 'прототип', 'прототип']),
    vocab(12, 'изчислителен', ['computing, computational', 'de calcul, computationnel', 'حاسوبي، حسابي', 'محاسباتی', 'вычислительный', 'обчислювальний']),
    vocab(13, 'почести', ['honours, ceremonial welcome', 'honneurs, accueil solennel', 'تكريم، احتفاء رسمي', 'مراسم تجلیل، استقبال رسمی', 'почести', 'почесті']),
    vocab(14, 'рекордьорка', ['record-holder (woman)', 'recordwoman, détentrice d’un record', 'صاحبة رقم قياسي', 'رکوردار (زن)', 'рекордсменка', 'рекордсменка']),
    vocab(15, 'състезателен', ['competitive, sporting', 'de compétition', 'تنافسي، رياضي', 'رقابتی، مسابقه‌ای', 'соревновательный, спортивный', 'змагальний, спортивний']),

    // Упр. 3 — описание на външност (таблицата)
    vocab(16, 'ръст', ['height, stature', 'taille (hauteur)', 'القامة، الطول', 'قد، بلندی قامت', 'рост', 'зріст']),
    vocab(17, 'едър', ['large, heavily built', 'grand et costaud', 'ضخم البنية', 'درشت‌اندام', 'крупный, рослый', 'кремезний, рослий']),
    vocab(18, 'дребен', ['small, slightly built', 'menu, petit', 'صغير الحجم، نحيل البنية', 'ریزنقش، کوچک‌اندام', 'мелкий, щуплый', 'дрібний, невеликий на зріст']),
    vocab(19, 'строен', ['slim, shapely', 'svelte, élancé', 'رشيق، متناسق القوام', 'خوش‌اندام، بلندبالا', 'стройный', 'стрункий']),
    vocab(20, 'закръглен', ['plump, rounded', 'rondelet, arrondi', 'ممتلئ قليلًا، مستدير', 'گرد و تپل', 'полноватый, округлый', 'повненький, круглий']),
    vocab(21, 'продълговат', ['oblong, elongated', 'oblong, allongé', 'مستطيل، مستطيل الشكل', 'کشیده، دراز', 'продолговатый', 'видовжений']),
    vocab(22, 'брадичка', ['chin', 'menton', 'ذقن', 'چانه', 'подбородок', 'підборіддя']),
    vocab(23, 'вежди', ['eyebrows', 'sourcils', 'حاجبان', 'ابروها', 'брови', 'брови']),
    vocab(24, 'месест', ['fleshy', 'charnu', 'لحمي، ممتلئ', 'گوشتالو', 'мясистый', 'м’ясистий']),
    vocab(25, 'гърбав', ['hooked, humped (nose); hunchbacked', 'busqué, bossu', 'معقوف، أحدب', 'قوزدار، خمیده', 'горбатый', 'горбатий']),
    vocab(26, 'прошарен', ['greying, streaked with grey', 'grisonnant', 'مخطَّط بالشيب', 'جوگندمی', 'с проседью', 'із сивиною']),
    vocab(27, 'чуплив', ['unruly, frizzy (hair)', 'rebelle, crépu (cheveux)', 'جافّ ومنفوش (الشعر)', 'وزوزی، ژولیده (مو)', 'непослушный, жёсткий (о волосах)', 'неслухняний, жорсткий (про волосся)']),
    vocab(28, 'къдрав', ['curly', 'bouclé', 'مجعَّد', 'فردار', 'кудрявый', 'кучерявий']),
    vocab(29, 'лунички', ['freckles', 'taches de rousseur', 'نمش', 'کک‌ومک', 'веснушки', 'веснянки']),
    vocab(30, 'бенка', ['mole, beauty spot', 'grain de beauté', 'شامة', 'خال', 'родинка', 'родимка']),
    vocab(31, 'трапчинка', ['dimple', 'fossette', 'غمّازة', 'چال گونه', 'ямочка', 'ямочка']),
    vocab(32, 'белег', ['scar; also: mark', 'cicatrice ; aussi : marque', 'ندبة؛ وأيضًا: علامة', 'جای زخم؛ همچنین: نشانه', 'шрам; также: след, метка', 'шрам; також: слід, мітка']),
    vocab(33, 'скула', ['cheekbone', 'pommette', 'عظمة الوجنة', 'استخوان گونه', 'скула', 'вилиця']),
    vocab(34, 'бръчка', ['wrinkle', 'ride', 'تجعيدة', 'چروک', 'морщина', 'зморшка']),

    // Упр. 4 — описания на хора
    vocab(35, 'плешив', ['bald', 'chauve', 'أصلع', 'کچل', 'лысый', 'лисий']),
    vocab(36, 'бретон', ['fringe, bangs', 'frange', 'غُرَّة', 'چتری', 'чёлка', 'чубчик, чілка']),
    vocab(37, 'периферия', ['brim (of a hat); also: periphery', 'bord (du chapeau) ; aussi : périphérie', 'حافة القبعة؛ وأيضًا: الأطراف', 'لبهٔ کلاه؛ همچنین: حاشیه', 'поля (шляпы); также: периферия', 'крисла (капелюха); також: периферія']),

    // Упр. 8 и 9 — прилагателни за характер
    vocab(38, 'страхлив', ['cowardly, timid', 'peureux, craintif', 'جبان', 'ترسو', 'трусливый', 'полохливий, боягузливий']),
    vocab(39, 'намръщен', ['frowning, scowling', 'renfrogné, sourcilleux', 'عابس، مقطِّب الجبين', 'اخمو', 'нахмуренный, хмурый', 'насуплений, похмурий']),
    vocab(40, 'нахален', ['cheeky, impudent', 'effronté, impudent', 'وقح، صفيق', 'گستاخ، پررو', 'нахальный, наглый', 'нахабний, зухвалий']),
    vocab(41, 'хитър', ['cunning, sly', 'rusé, malin', 'ماكر، داهية', 'حیله‌گر، زیرک', 'хитрый, лукавый', 'хитрий, лукавий']),
    vocab(42, 'бъбрив', ['chatty, talkative (in a gossipy way)', 'bavard, loquace', 'ثرثار', 'وراج', 'болтливый', 'балакучий, пустослівний']),
    vocab(43, 'остроумен', ['witty', 'spirituel, plein d’esprit', 'ظريف، حاضر البديهة', 'بذله‌گو، تیزهوش', 'остроумный', 'дотепний']),
    vocab(44, 'откровен', ['frank, candid', 'franc, sincère', 'صريح', 'رک، صریح', 'откровенный', 'відвертий']),
    vocab(45, 'учтив', ['polite, courteous', 'poli, courtois', 'مهذَّب، لبق', 'مؤدب، باادب', 'вежливый, учтивый', 'ввічливий, чемний']),
    vocab(46, 'стеснителен', ['shy, bashful', 'timide, réservé', 'خجول', 'کم‌رو', 'застенчивый, стеснительный', 'сором’язливий, несміливий']),
    vocab(47, 'грижовен', ['caring, considerate', 'attentionné, bienveillant', 'حنون، مهتم برعاية الآخرين', 'دلسوز، مراقب', 'заботливый', 'дбайливий, турботливий']),

    // „Внимание“ — любознателен / горделив
    vocab(48, 'любознателен', ['eager to learn, inquisitive about knowledge', 'avide de savoir, curieux d’apprendre', 'محبّ للمعرفة، شغوف بالتعلّم', 'دانش‌جو، علاقه‌مند به یادگیری', 'любознательный', 'допитливий (тягнеться до знань)']),
    vocab(49, 'горделив', ['arrogant, showily proud', 'orgueilleux, hautain', 'متكبِّر، مغرور', 'مغرور، متکبر', 'гордый (в дурном смысле), чванливый', 'гордовитий, пихатий']),
    vocab(50, 'надменен', ['haughty, disdainful', 'dédaigneux, méprisant', 'متعالٍ، متغطرس', 'متکبرانه، تحقیرآمیز', 'надменный, высокомерный', 'бундючний, зверхній']),

    // Упр. 12 — баба и дядо
    vocab(51, 'гостоприемен', ['hospitable', 'hospitalier', 'مضياف', 'مهمان‌نواز', 'гостеприимный', 'гостинний']),
    vocab(52, 'ранобуден', ['early-rising', 'matinal, qui se lève tôt', 'مبكِّر في الاستيقاظ', 'سحرخیز', 'рано встающий', 'той, хто рано встає']),
    vocab(53, 'трудолюбив', ['hard-working, industrious', 'travailleur, laborieux', 'مجتهد، كادح', 'سخت‌کوش', 'трудолюбивый', 'працьовитий']),

    // Упр. 14 — Тео и Боби
    vocab(54, 'близнак', ['twin', 'jumeau', 'توأم', 'دوقلو', 'близнец', 'близнюк']),
    vocab(55, 'шегувам се', ['to joke, to kid around', 'plaisanter, blaguer', 'أمزح', 'شوخی کردن', 'шутить', 'жартувати']),

    // Упр. 24 — Марта (текст с пропуски)
    vocab(56, 'жизнерадостен', ['cheerful, full of life', 'jovial, plein de vie', 'مرح، مليء بالحياة', 'شاداب، سرزنده', 'жизнерадостный', 'життєрадісний']),
    vocab(57, 'чувствителен', ['sensitive', 'sensible', 'حسّاس', 'حساس', 'чувствительный', 'чутливий']),
    vocab(58, 'чаровен', ['charming', 'charmant', 'ساحر، جذّاب', 'جذاب، دلنشین', 'очаровательный', 'чарівний']),
    vocab(59, 'въздействащ', ['impressive, powerful (in effect)', 'saisissant, marquant', 'مؤثِّر', 'تأثیرگذار', 'впечатляющий, воздействующий', 'вражаючий, дієвий']),
    vocab(60, 'изложба', ['exhibition', 'exposition', 'معرض', 'نمایشگاه', 'выставка', 'виставка']),
    vocab(61, 'творчество', ['creative work, creativity', 'création, œuvre', 'الإبداع، الأعمال الإبداعية', 'آفرینش هنری، خلاقیت', 'творчество', 'творчість']),

    // Упр. 30–31 — „Модата през годините“, любопитни факти; упр. 39 — поговорки
    vocab(62, 'облекло', ['clothing, attire', 'vêtements, tenue', 'الملابس، الأزياء', 'پوشاک، لباس', 'одежда', 'одяг']),
    vocab(63, 'аристократ', ['aristocrat', 'aristocrate', 'أرستقراطي', 'اشراف‌زاده', 'аристократ', 'аристократ']),
    vocab(64, 'плат', ['fabric, cloth', 'tissu, étoffe', 'قماش', 'پارچه', 'ткань', 'тканина']),
    vocab(65, 'скъпоценен', ['precious', 'précieux', 'ثمين، كريم', 'گران‌بها', 'драгоценный', 'дорогоцінний']),
    vocab(66, 'накит', ['piece of jewellery, ornament', 'bijou, parure', 'حُلي، زينة', 'زیورآلات', 'украшение (ювелирное)', 'прикраса, ювелірна оздоба']),
    vocab(67, 'шивач', ['tailor', 'tailleur, couturier', 'خيّاط', 'خیاط', 'портной', 'кравець']),
    vocab(68, 'тенденция', ['trend, tendency', 'tendance', 'اتجاه، توجّه', 'گرایش، روند', 'тенденция, тренд', 'тенденція, тренд']),
    vocab(69, 'елек', ['waistcoat, vest', 'gilet', 'صدرية، سترة بلا أكمام', 'جلیقه', 'жилет, жилетка', 'жилет, жилетка']),
    vocab(70, 'ресни', ['tassels, fringes (on clothes)', 'franges (de vêtement)', 'أهداب (زينة الملابس)', 'ریشه‌های آویزان (روی لباس)', 'бахрома (на одежде)', 'торочки, бахрома (на одязі)']),
    vocab(71, 'субкултура', ['subculture', 'sous-culture', 'ثقافة فرعية', 'خرده‌فرهنگ', 'субкультура', 'субкультура']),
    vocab(72, 'подиум', ['catwalk, podium', 'podium, défilé', 'منصّة عرض الأزياء', 'کت‌واک، سکو', 'подиум', 'подіум']),
    vocab(73, 'първобитен', ['primitive, prehistoric', 'primitif, préhistorique', 'بدائي', 'ابتدایی، نخستین', 'первобытный', 'первісний']),
    vocab(74, 'токче', ['heel (of a shoe)', 'talon', 'كعب (الحذاء)', 'پاشنه (کفش)', 'каблук', 'підбор']),
    vocab(75, 'поговорка', ['proverb', 'proverbe', 'مَثَل', 'ضرب‌المثل', 'пословица', 'прислів’я']),
    vocab(76, 'мързел', ['laziness', 'paresse', 'كسل', 'تنبلی', 'лень', 'лінощі']),
    vocab(77, 'недостатък', ['flaw, shortcoming', 'défaut', 'عيب، نقص', 'عیب، نقص', 'недостаток, изъян', 'недолік, вада']),

    // BATCH 4 (ord 39–40) — упр. 41, Райна Кабаиванска (собствени имена не се броят за речник)
    vocab(78, 'дебютирам', ['to make one\u2019s debut', 'débuter, faire ses débuts', 'يُقدّم ظهوره الأول', 'دبی کردن، نخستین ظهور', 'дебютировать', 'дебютувати']),
    vocab(79, 'принос', ['contribution', 'contribution, apport', 'مساهمة، إسهام', 'سهم، مشارکت', 'вклад', 'внесок']),
    vocab(80, 'специализация', ['specialisation, advanced training', 'spécialisation', 'تخصّص، تدريب متقدّم', 'تخصص، دورهٔ پیشرفته', 'специализация, стажировка', 'спеціалізація, стажування']),
    vocab(81, 'стипендия', ['scholarship, grant', 'bourse d\u2019études', 'منحة دراسية', 'بورسیهٔ تحصیلی', 'стипендия', 'стипендія']),
    vocab(82, 'преклонение', ['admiration, reverence', 'admiration, vénération', 'إعجاب شديد، تقدير بالغ', 'ستایش، احترام عمیق', 'преклонение, восхищение', 'шанобливе ставлення, захоплення']),
    vocab(83, 'финес', ['finesse, subtlety', 'finesse, subtilité', 'رقّة، لباقة', 'ظرافت، لطافت', 'изящество, тонкость', 'вишуканість, тонкість']),
  ],
};

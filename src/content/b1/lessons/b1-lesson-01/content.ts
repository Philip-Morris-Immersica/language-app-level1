import type { LessonContent } from '@/content/types';

export const content: LessonContent = {
  introduction: `В първия урок от ниво B1 ще разширите уменията си да описвате хора, предмети и места — в семейството, в магазина, в града и в природата.

Урокът включва диалози, кратки текстове и упражнения за практика.`,

  sections: [],

  dialogues: [
    {
      id: 'b1-l01-dialog-magazin',
      speakers: [
        { name: 'Мая', text: 'Тази вечер съм на имения ден и се чудя какво да облека.' },
        { name: 'Лора', text: 'Облечи черния панталон и новата светлосива блуза. Много са хубави.' },
        { name: 'Мая', text: 'Добре. Благодаря. Ще взема и тъмносивото сако, защото вечер става студено.' },
      ],
    },
  ],

  vocabulary: [
    // Животни
    { id: 'kon', bulgarian: 'кон, коне', translations: { en: 'horse, -s', fr: 'cheval, chevaux', ar: 'حصان', fa: 'اسب', ru: 'конь, кони', uk: 'кінь, коні' } },
    { id: 'magare', bulgarian: 'магаре, магарета', translations: { en: 'donkey, -s', fr: 'âne, ânes', ar: 'حمار', fa: 'الاغ', ru: 'осёл, ослы', uk: 'осел, осли' } },
    { id: 'krava', bulgarian: 'крава, крави', translations: { en: 'cow, -s', fr: 'vache, vaches', ar: 'بقرة', fa: 'گاو', ru: 'корова, коровы', uk: 'корова, корови' } },
    { id: 'tele', bulgarian: 'теле, телета', translations: { en: 'calf, calves', fr: 'veau, veaux', ar: 'عجل', fa: 'گوساله', ru: 'телёнок, телята', uk: 'теля, телята' } },
    { id: 'kokoshka', bulgarian: 'кокошка, кокошки', translations: { en: 'hen, -s', fr: 'poule, poules', ar: 'دجاجة', fa: 'مرغ', ru: 'курица, куры', uk: 'курка, кури' } },
    { id: 'pile', bulgarian: 'пиле, пилета', translations: { en: 'chick, -s', fr: 'poussin, poussins', ar: 'كتكوت', fa: 'جوجه', ru: 'цыплёнок, цыплята', uk: 'курча, курчата' } },
    { id: 'ovtsa', bulgarian: 'овца, овце', translations: { en: 'sheep', fr: 'mouton, brebis', ar: 'خروف', fa: 'گوسفند', ru: 'овца, овцы', uk: 'вівця, вівці' } },
    { id: 'agne', bulgarian: 'агне, агнета', translations: { en: 'lamb, -s', fr: 'agneau, agneaux', ar: 'حمل', fa: 'بره', ru: 'ягнёнок, ягнята', uk: 'ягня, ягнята' } },
    { id: 'kuche', bulgarian: 'куче, кучета', translations: { en: 'dog, -s', fr: 'chien, chiens', ar: 'كلب', fa: 'سگ', ru: 'собака, собаки', uk: 'собака, собаки' } },
    { id: 'kotka', bulgarian: 'котка, котки', translations: { en: 'cat, -s', fr: 'chat, chats', ar: 'قط', fa: 'گربه', ru: 'кошка, кошки', uk: 'кіт, коти' } },
    { id: 'ptitsa', bulgarian: 'птица, птици', translations: { en: 'bird, -s', fr: 'oiseau, oiseaux', ar: 'طائر', fa: 'پرنده', ru: 'птица, птицы', uk: 'птах, птахи' } },
    { id: 'ribka', bulgarian: 'рибка, рибки', translations: { en: 'fish (small), -es', fr: 'petit poisson', ar: 'سمكة', fa: 'ماهی', ru: 'рыбка, рыбки', uk: 'рибка, рибки' } },
    { id: 'vylk', bulgarian: 'вълк, вълци', translations: { en: 'wolf, wolves', fr: 'loup, loups', ar: 'ذئب', fa: 'گرگ', ru: 'волк, волки', uk: 'вовк, вовки' } },
    { id: 'mechka', bulgarian: 'мечка, мечки', translations: { en: 'bear, -s', fr: 'ours', ar: 'دب', fa: 'خرس', ru: 'медведь, медведи', uk: 'ведмідь, ведмеді' } },
    { id: 'lisitsa', bulgarian: 'лисица, лисици', translations: { en: 'fox, -es', fr: 'renard, renards', ar: 'ثعلب', fa: 'روباه', ru: 'лиса, лисы', uk: 'лисиця, лисиці' } },
    { id: 'zaek', bulgarian: 'заек, зайци', translations: { en: 'rabbit, -s', fr: 'lapin, lapins', ar: 'أرنب', fa: 'خرگوش', ru: 'заяц, зайцы', uk: 'заєць, зайці' } },
    { id: 'slon', bulgarian: 'слон, слонове', translations: { en: 'elephant, -s', fr: 'éléphant, éléphants', ar: 'فيل', fa: 'فیل', ru: 'слон, слоны', uk: 'слон, слони' } },
    { id: 'lyv', bulgarian: 'лъв, лъвове', translations: { en: 'lion, -s', fr: 'lion, lions', ar: 'أسد', fa: 'شیر', ru: 'лев, львы', uk: 'лев, леви' } },
    { id: 'tigyr', bulgarian: 'тигър, тигри', translations: { en: 'tiger, -s', fr: 'tigre, tigres', ar: 'نمر', fa: 'ببر', ru: 'тигр, тигры', uk: 'тигр, тигри' } },
    { id: 'maymuna', bulgarian: 'маймуна, маймуни', translations: { en: 'monkey, -s', fr: 'singe, singes', ar: 'قرد', fa: 'میمون', ru: 'обезьяна, обезьяны', uk: 'мавпа, мавпи' } },
    { id: 'domashno-zhivotno', bulgarian: 'домашно животно, домашни животни', translations: { en: 'domestic animal, -s', fr: 'animal domestique', ar: 'حيوان أليف', fa: 'حیوان اهلی', ru: 'домашнее животное', uk: 'свійська тварина' } },
    { id: 'divo-zhivotno', bulgarian: 'диво животно, диви животни', translations: { en: 'wild animal, -s', fr: 'animal sauvage', ar: 'حيوان بري', fa: 'حیوان وحشی', ru: 'дикое животное', uk: 'дика тварина' } },
    { id: 'domashen-lyubimets', bulgarian: 'домашен любимец, домашни любимци', translations: { en: 'pet, -s', fr: 'animal de compagnie', ar: 'حيوان أليف', fa: 'حیوان خانگی', ru: 'домашний питомец', uk: 'домашній улюбленець' } },
    { id: 'ferma', bulgarian: 'ферма, ферми', translations: { en: 'farm, -s', fr: 'ferme, fermes', ar: 'مزرعة', fa: 'مزرعه', ru: 'ферма, фермы', uk: 'ферма, ферми' } },
    { id: 'zoopark', bulgarian: 'зоопарк, зоопаркове', translations: { en: 'zoo, -s', fr: 'zoo, zoos', ar: 'حديقة حيوان', fa: 'باغ‌وحش', ru: 'зоопарк, зоопарки', uk: 'зоопарк, зоопарки' } },

    // Глаголи от животински текст
    { id: 'haresvam', bulgarian: 'харесвам, харесваш', translations: { en: 'to like', fr: 'aimer', ar: 'يحب', fa: 'دوست داشتن', ru: 'нравиться', uk: 'подобатися' } },
    { id: 'prekarvam', bulgarian: 'прекарвам, прекарваш', translations: { en: 'to spend (time)', fr: 'passer (du temps)', ar: 'يقضي', fa: 'گذراندن', ru: 'проводить (время)', uk: 'проводити (час)' } },
    { id: 'hranya', bulgarian: 'храня, храниш', translations: { en: 'to feed', fr: 'nourrir', ar: 'يطعم', fa: 'غذا دادن', ru: 'кормить', uk: 'годувати' } },
    { id: 'grizha-se', bulgarian: 'грижа се, грижиш се', translations: { en: 'to take care of', fr: 's’occuper de', ar: 'يعتني', fa: 'مراقبت کردن', ru: 'заботиться', uk: 'дбати' } },
    { id: 'razglezhdam', bulgarian: 'разглеждам, разглеждаш', translations: { en: 'to look at, to view', fr: 'examiner, regarder', ar: 'يتفقد', fa: 'تماشا کردن', ru: 'рассматривать', uk: 'роздивлятися' } },
    { id: 'pravya-snimki', bulgarian: 'правя снимки', translations: { en: 'to take photos', fr: 'prendre des photos', ar: 'يلتقط صورًا', fa: 'عکس گرفتن', ru: 'делать фотографии', uk: 'фотографувати' } },
    { id: 'katerya-se', bulgarian: 'катеря се, катериш се', translations: { en: 'to climb up', fr: 'grimper', ar: 'يتسلق', fa: 'بالا رفتن', ru: 'карабкаться', uk: 'видиратися' } },
    { id: 'skacham', bulgarian: 'скачам, скачаш / скоча, скочиш', translations: { en: 'to jump', fr: 'sauter', ar: 'يقفز', fa: 'پریدن', ru: 'прыгать', uk: 'стрибати' } },
    { id: 'sladak-igrich', bulgarian: 'сладък и забавен', translations: { en: 'cute and funny', fr: 'mignon et amusant', ar: 'ظريف وممتع', fa: 'بانمک و سرگرم‌کننده', ru: 'милый и забавный', uk: 'милий і забавний' } },
    { id: 'mechta', bulgarian: 'мечта, мечти', translations: { en: 'dream', fr: 'rêve', ar: 'حلم', fa: 'آرزو', ru: 'мечта', uk: 'мрія' } },
    { id: 'veterinaren-lekar', bulgarian: 'ветеринарен лекар', translations: { en: 'veterinarian', fr: 'vétérinaire', ar: 'طبيب بيطري', fa: 'دامپزشک', ru: 'ветеринар', uk: 'ветеринар' } },
    { id: 'pomagam', bulgarian: 'помагам, помагаш', translations: { en: 'to help', fr: 'aider', ar: 'يساعد', fa: 'کمک کردن', ru: 'помогать', uk: 'допомагати' } },

    // Семейство (Кенан и Лейла)
    { id: 'semeystvo', bulgarian: 'семейство, семейства', translations: { en: 'family, families', fr: 'famille, familles', ar: 'عائلة', fa: 'خانواده', ru: 'семья, семьи', uk: 'родина, родини' } },
    { id: 'dashterya', bulgarian: 'дъщеря, дъщери', translations: { en: 'daughter, -s', fr: 'fille, filles', ar: 'ابنة', fa: 'دختر', ru: 'дочь, дочери', uk: 'донька, доньки' } },
    { id: 'sin', bulgarian: 'син, синове', translations: { en: 'son, -s', fr: 'fils', ar: 'ابن', fa: 'پسر', ru: 'сын, сыновья', uk: 'син, сини' } },
    { id: 'gotvach', bulgarian: 'готвач, готвачи', translations: { en: 'cook, chef', fr: 'cuisinier', ar: 'طاهٍ', fa: 'آشپز', ru: 'повар', uk: 'кухар' } },
    { id: 'domakinya', bulgarian: 'домакиня, домакини', translations: { en: 'housewife', fr: 'femme au foyer', ar: 'ربة منزل', fa: 'خانه‌دار', ru: 'домохозяйка', uk: 'домогосподарка' } },
    { id: 'pomoshtnik-gotvach', bulgarian: 'помощник-готвач', translations: { en: 'assistant cook', fr: 'commis de cuisine', ar: 'مساعد طاهٍ', fa: 'دستیار آشپز', ru: 'помощник повара', uk: 'помічник кухаря' } },
    { id: 'kandidatstvam', bulgarian: 'кандидатствам, кандидатстваш', translations: { en: 'to apply (for a job)', fr: 'postuler', ar: 'يقدّم طلبًا', fa: 'درخواست دادن', ru: 'подавать заявку', uk: 'подавати заявку' } },
    { id: 'pritesnen', bulgarian: 'притеснен, -а, -о, -и', translations: { en: 'worried, anxious', fr: 'inquiet, -ète', ar: 'قلق', fa: 'نگران', ru: 'обеспокоенный', uk: 'занепокоєний' } },
    { id: 'rabotliv', bulgarian: 'работлив, -а, -о, -и', translations: { en: 'hard-working', fr: 'travailleur, -euse', ar: 'مجتهد', fa: 'سخت‌کوش', ru: 'трудолюбивый', uk: 'працьовитий' } },
    { id: 'umoren', bulgarian: 'уморен, -а, -о, -и', translations: { en: 'tired', fr: 'fatigué, -e', ar: 'متعب', fa: 'خسته', ru: 'уставший', uk: 'втомлений' } },
    { id: 'sreden-na-ryst', bulgarian: 'среден на ръст', translations: { en: 'of medium height', fr: 'de taille moyenne', ar: 'متوسط الطول', fa: 'متوسط‌قد', ru: 'среднего роста', uk: 'середнього зросту' } },
    { id: 'slab', bulgarian: 'слаб, -а, -о, -и', translations: { en: 'thin, weak', fr: 'mince, faible', ar: 'نحيف', fa: 'لاغر', ru: 'худой, слабый', uk: 'худий, слабкий' } },
    { id: 'kestenova-kosa', bulgarian: 'кестенова коса', translations: { en: 'chestnut hair', fr: 'cheveux châtains', ar: 'شعر بني فاتح', fa: 'موی بلوطی', ru: 'каштановые волосы', uk: 'каштанове волосся' } },
    { id: 'kafyavi-ochi', bulgarian: 'кафяви очи', translations: { en: 'brown eyes', fr: 'yeux marron', ar: 'عيون بنية', fa: 'چشمان قهوه‌ای', ru: 'карие глаза', uk: 'карі очі' } },
    { id: 'svetli-ochi', bulgarian: 'светли очи', translations: { en: 'light-coloured eyes', fr: 'yeux clairs', ar: 'عيون فاتحة', fa: 'چشمان روشن', ru: 'светлые глаза', uk: 'світлі очі' } },
    { id: 'kydrava-kosa', bulgarian: 'къдрава коса', translations: { en: 'curly hair', fr: 'cheveux bouclés', ar: 'شعر مجعّد', fa: 'موی فرفری', ru: 'кудрявые волосы', uk: 'кучеряве волосся' } },
    { id: 'otgovoren', bulgarian: 'отговорен, -на, -но, -ни', translations: { en: 'responsible', fr: 'responsable', ar: 'مسؤول', fa: 'مسئول', ru: 'ответственный', uk: 'відповідальний' } },
    { id: 'spokoen', bulgarian: 'спокоен, -йна, -йно, -йни', translations: { en: 'calm', fr: 'calme', ar: 'هادئ', fa: 'آرام', ru: 'спокойный', uk: 'спокійний' } },
    { id: 'shtastliv', bulgarian: 'щастлив, -а, -о, -и', translations: { en: 'happy', fr: 'heureux, -euse', ar: 'سعيد', fa: 'خوشحال', ru: 'счастливый', uk: 'щасливий' } },
    { id: 'usmihnat', bulgarian: 'усмихнат, -а, -о, -и', translations: { en: 'smiling', fr: 'souriant, -e', ar: 'مبتسم', fa: 'خندان', ru: 'улыбающийся', uk: 'усміхнений' } },
    { id: 'palav', bulgarian: 'палав, -а, -о, -и', translations: { en: 'naughty, playful', fr: 'espiègle', ar: 'مشاغب', fa: 'شیطون', ru: 'озорной', uk: 'пустотливий' } },
    { id: 'nepokoren', bulgarian: 'непослушен, -на, -но, -ни', translations: { en: 'disobedient', fr: 'désobéissant', ar: 'غير مطيع', fa: 'نافرمان', ru: 'непослушный', uk: 'неслухняний' } },
    { id: 'umen', bulgarian: 'умен, умна, умно, умни', translations: { en: 'smart, intelligent', fr: 'intelligent, -e', ar: 'ذكي', fa: 'باهوش', ru: 'умный', uk: 'розумний' } },
    { id: 'uchenolyubiv', bulgarian: 'ученолюбив, -а, -о, -и', translations: { en: 'eager to learn', fr: 'avide d’apprendre', ar: 'محبّ للعلم', fa: 'علاقه‌مند به یادگیری', ru: 'любознательный', uk: 'допитливий' } },
    { id: 'vyzpitan', bulgarian: 'възпитан, -а, -о, -и', translations: { en: 'well-mannered', fr: 'bien élevé, -e', ar: 'مؤدّب', fa: 'مؤدب', ru: 'воспитанный', uk: 'вихований' } },
    { id: 'mzelliv', bulgarian: 'мързелив, -а, -о, -и', translations: { en: 'lazy', fr: 'paresseux, -euse', ar: 'كسول', fa: 'تنبل', ru: 'ленивый', uk: 'лінивий' } },
    { id: 'razseyan', bulgarian: 'разсеян, -а, -о, -и', translations: { en: 'forgetful, absent-minded', fr: 'distrait, -e', ar: 'شارد الذهن', fa: 'حواس‌پرت', ru: 'рассеянный', uk: 'неуважний' } },
    { id: 'bez-rabota', bulgarian: 'без работа', translations: { en: 'without a job', fr: 'sans travail', ar: 'بلا عمل', fa: 'بیکار', ru: 'без работы', uk: 'без роботи' } },
    { id: 'gotvya', bulgarian: 'готвя, готвиш', translations: { en: 'to cook', fr: 'cuisiner', ar: 'يطبخ', fa: 'پختن', ru: 'готовить', uk: 'готувати' } },
    { id: 'chistya', bulgarian: 'чистя, чистиш', translations: { en: 'to clean', fr: 'nettoyer', ar: 'ينظّف', fa: 'تمیز کردن', ru: 'убирать', uk: 'прибирати' } },
    { id: 'pochivam-si', bulgarian: 'почивам си, почиваш си', translations: { en: 'to rest', fr: 'se reposer', ar: 'يستريح', fa: 'استراحت کردن', ru: 'отдыхать', uk: 'відпочивати' } },

    // Дрехи (Упр. 18)
    { id: 'imen-den', bulgarian: 'имен ден', translations: { en: 'name day', fr: 'fête (du prénom)', ar: 'عيد الاسم', fa: 'روز نام', ru: 'именины', uk: 'іменини' } },
    { id: 'oblekloh', bulgarian: 'обличам, обличаш / облека, облечеш', translations: { en: 'to put on, to wear', fr: 's’habiller, mettre', ar: 'يرتدي', fa: 'پوشیدن', ru: 'надевать', uk: 'вдягати' } },
    { id: 'panталон', bulgarian: 'панталон, панталони', translations: { en: 'trousers, pants', fr: 'pantalon, pantalons', ar: 'بنطلون', fa: 'شلوار', ru: 'брюки', uk: 'штани' } },
    { id: 'bluza', bulgarian: 'блуза, блузи', translations: { en: 'blouse, top', fr: 'chemisier', ar: 'بلوزة', fa: 'بلوز', ru: 'блуза', uk: 'блуза' } },
    { id: 'sako', bulgarian: 'сако, сака', translations: { en: 'jacket', fr: 'veste', ar: 'سترة', fa: 'کت', ru: 'пиджак', uk: 'піджак' } },
    { id: 'rokliya', bulgarian: 'рокля, рокли', translations: { en: 'dress', fr: 'robe', ar: 'فستان', fa: 'پیراهن', ru: 'платье', uk: 'сукня' } },
    { id: 'shal', bulgarian: 'шал, шалове', translations: { en: 'scarf', fr: 'écharpe', ar: 'وشاح', fa: 'شال', ru: 'шарф', uk: 'шарф' } },
    { id: 'kostumi-doreshi', bulgarian: 'дрехи', translations: { en: 'clothes', fr: 'vêtements', ar: 'ملابس', fa: 'لباس‌ها', ru: 'одежда', uk: 'одяг' } },
    { id: 'kuporen', bulgarian: 'копринен, -а, -о, -и', translations: { en: 'silk (adj.)', fr: 'en soie', ar: 'حريري', fa: 'ابریشمی', ru: 'шёлковый', uk: 'шовковий' } },
    { id: 'vylnen', bulgarian: 'вълнен, -а, -о, -и', translations: { en: 'woollen', fr: 'en laine', ar: 'صوفي', fa: 'پشمی', ru: 'шерстяной', uk: 'вовняний' } },
    { id: 'rikavitsi', bulgarian: 'ръкавица, ръкавици', translations: { en: 'glove, -s', fr: 'gant, gants', ar: 'قفّاز', fa: 'دستکش', ru: 'перчатка, перчатки', uk: 'рукавиця, рукавиці' } },

    // Аптека / здраве (Упр. 21)
    { id: 'student', bulgarian: 'студент, студентка', translations: { en: 'student', fr: 'étudiant, -e', ar: 'طالب', fa: 'دانشجو', ru: 'студент, студентка', uk: 'студент, студентка' } },
    { id: 'himiya', bulgarian: 'химия', translations: { en: 'chemistry', fr: 'chimie', ar: 'كيمياء', fa: 'شیمی', ru: 'химия', uk: 'хімія' } },
    { id: 'lekartsiya', bulgarian: 'лекция, лекции', translations: { en: 'lecture, -s', fr: 'cours magistral', ar: 'محاضرة', fa: 'سخنرانی، درس', ru: 'лекция, лекции', uk: 'лекція, лекції' } },
    { id: 'tryagvam-si', bulgarian: 'тръгвам си, тръгваш си', translations: { en: 'to leave (to go)', fr: 'partir', ar: 'يغادر', fa: 'رفتن', ru: 'уходить', uk: 'іти геть' } },
    { id: 'po-rano', bulgarian: 'по-рано', translations: { en: 'earlier', fr: 'plus tôt', ar: 'في وقت أبكر', fa: 'زودتر', ru: 'раньше', uk: 'раніше' } },
    { id: 'bavno', bulgarian: 'бавно', translations: { en: 'slowly', fr: 'lentement', ar: 'ببطء', fa: 'به‌آرامی', ru: 'медленно', uk: 'повільно' } },
    { id: 'bolt-me', bulgarian: 'боли ме (главата, стомахът…)', translations: { en: 'my (head/stomach) hurts', fr: 'j’ai mal à…', ar: 'يؤلمني…', fa: 'درد می‌کند…', ru: 'у меня болит…', uk: 'у мене болить…' } },
    { id: 'glavata', bulgarian: 'глава, глави', translations: { en: 'head, -s', fr: 'tête, têtes', ar: 'رأس', fa: 'سر', ru: 'голова, головы', uk: 'голова, голови' } },
    { id: 'stomah', bulgarian: 'стомах, стомаси', translations: { en: 'stomach, -s', fr: 'estomac', ar: 'معدة', fa: 'معده', ru: 'желудок', uk: 'шлунок' } },
    { id: 'temperatura', bulgarian: 'температура', translations: { en: 'temperature, fever', fr: 'température, fièvre', ar: 'حمى', fa: 'تب', ru: 'температура', uk: 'температура' } },
    { id: 'poliklinika', bulgarian: 'поликлиника, поликлиники', translations: { en: 'health centre, polyclinic', fr: 'centre médical', ar: 'مركز طبي', fa: 'درمانگاه', ru: 'поликлиника', uk: 'поліклініка' } },
    { id: 'pregledam', bulgarian: 'преглеждам, преглеждаш', translations: { en: 'to examine (a patient)', fr: 'examiner', ar: 'يفحص', fa: 'معاینه کردن', ru: 'осматривать', uk: 'оглядати' } },
    { id: 'predpisvam', bulgarian: 'предписвам, предписваш', translations: { en: 'to prescribe', fr: 'prescrire', ar: 'يصف الدواء', fa: 'تجویز کردن', ru: 'выписывать (рецепт)', uk: 'призначати' } },
    { id: 'lekarstvo', bulgarian: 'лекарство, лекарства', translations: { en: 'medicine, -s', fr: 'médicament', ar: 'دواء', fa: 'دارو', ru: 'лекарство', uk: 'ліки' } },
    { id: 'apteka-bl', bulgarian: 'аптека, аптеки', translations: { en: 'pharmacy, pharmacies', fr: 'pharmacie', ar: 'صيدلية', fa: 'داروخانه', ru: 'аптека', uk: 'аптека' } },
    { id: 'po-evtino', bulgarian: 'по-евтино', translations: { en: 'cheaper', fr: 'moins cher', ar: 'أرخص', fa: 'ارزان‌تر', ru: 'дешевле', uk: 'дешевше' } },
    { id: 'priberam-se', bulgarian: 'прибирам се, прибираш се', translations: { en: 'to go home, to return', fr: 'rentrer', ar: 'يعود إلى البيت', fa: 'به خانه برگشتن', ru: 'возвращаться домой', uk: 'повертатися додому' } },
    { id: 'lekuvam-se', bulgarian: 'лекувам се, лекуваш се', translations: { en: 'to be treated, to recover', fr: 'se soigner', ar: 'يتعالج', fa: 'درمان شدن', ru: 'лечиться', uk: 'лікуватися' } },
    { id: 'po-dobre', bulgarian: 'по-добре', translations: { en: 'better', fr: 'mieux', ar: 'أفضل', fa: 'بهتر', ru: 'лучше', uk: 'краще' } },

    // Столица — София (Упр. 24, dictionary)
    { id: 'stolitsa', bulgarian: 'столица, столици', translations: { en: 'capital, -s', fr: 'capitale', ar: 'عاصمة', fa: 'پایتخت', ru: 'столица', uk: 'столиця' } },
    { id: 'vyznikvam', bulgarian: 'възниквам, възникваш / възникна, възникнеш', translations: { en: 'to appear, to emerge', fr: 'apparaître, naître', ar: 'ينشأ', fa: 'پدید آمدن', ru: 'возникать', uk: 'виникати' } },
    { id: 'naricham', bulgarian: 'наричам, наричаш / нарека, наречеш', translations: { en: 'to call, to name', fr: 'appeler, nommer', ar: 'يُسمّي', fa: 'نامیدن', ru: 'называть', uk: 'називати' } },
    { id: 'naselenie', bulgarian: 'население', translations: { en: 'population', fr: 'population', ar: 'سكان', fa: 'جمعیت', ru: 'население', uk: 'населення' } },
    { id: 'drevny', bulgarian: 'древен, древна, древно, древни', translations: { en: 'ancient, old', fr: 'ancien, antique', ar: 'قديم', fa: 'باستانی', ru: 'древний', uk: 'давній' } },
    { id: 'biv', bulgarian: 'бивш, -а, -е, -и', translations: { en: 'former, ex-', fr: 'ancien, ex-', ar: 'سابق', fa: 'سابق', ru: 'бывший', uk: 'колишній' } },
    { id: 'pleme', bulgarian: 'племе, племена', translations: { en: 'tribe, -s', fr: 'tribu, tribus', ar: 'قبيلة', fa: 'قبیله', ru: 'племя, племена', uk: 'плем’я, племена' } },
    { id: 'rimlyanin', bulgarian: 'римлянин, римляни', translations: { en: 'Roman', fr: 'Romain, Romains', ar: 'روماني', fa: 'رومی', ru: 'римлянин, римляне', uk: 'римлянин, римляни' } },
    { id: 'zabelezhitelnost', bulgarian: 'забележителност, забележителности', translations: { en: 'landmark, -s', fr: 'site remarquable', ar: 'معلَم', fa: 'دیدنی', ru: 'достопримечательность', uk: 'визначна пам’ятка' } },
    { id: 'stenopis', bulgarian: 'стенопис, стенописи', translations: { en: 'fresco, -es', fr: 'fresque', ar: 'لوحة جدارية', fa: 'نقاشی دیواری', ru: 'фреска', uk: 'фреска' } },
    { id: 'pametnik-na-kulturata', bulgarian: 'паметник на културата', translations: { en: 'cultural monument', fr: 'monument culturel', ar: 'معلَم ثقافي', fa: 'یادمان فرهنگی', ru: 'памятник культуры', uk: 'пам’ятка культури' } },
    { id: 'zashtiten', bulgarian: 'защитен, -а, -о, -и', translations: { en: 'protected', fr: 'protégé, -e', ar: 'محمي', fa: 'محافظت‌شده', ru: 'охраняемый', uk: 'захищений' } },
    { id: 'yunesko', bulgarian: 'ЮНЕСКО', translations: { en: 'UNESCO', fr: 'UNESCO', ar: 'اليونسكو', fa: 'یونسکو', ru: 'ЮНЕСКО', uk: 'ЮНЕСКО' } },
    { id: 'devizyat', bulgarian: 'девиз, девизи', translations: { en: 'motto', fr: 'devise', ar: 'شعار', fa: 'شعار', ru: 'девиз', uk: 'девіз' } },
    { id: 'mudrost', bulgarian: 'мъдрост', translations: { en: 'wisdom', fr: 'sagesse', ar: 'حكمة', fa: 'خرد', ru: 'мудрость', uk: 'мудрість' } },
    { id: 'tsarski-dvorets', bulgarian: 'царски дворец', translations: { en: 'royal palace', fr: 'palais royal', ar: 'قصر ملكي', fa: 'کاخ سلطنتی', ru: 'царский дворец', uk: 'царський палац' } },
    { id: 'galeriya', bulgarian: 'галерия, галерии', translations: { en: 'gallery, -ies', fr: 'galerie', ar: 'صالة عرض', fa: 'گالری', ru: 'галерея', uk: 'галерея' } },
    { id: 'etnografski-muzey', bulgarian: 'етнографски музей', translations: { en: 'ethnographic museum', fr: 'musée ethnographique', ar: 'متحف إثنوغرافي', fa: 'موزه مردم‌شناسی', ru: 'этнографический музей', uk: 'етнографічний музей' } },
    { id: 'razhda-rabote', bulgarian: 'расте, но не старее', translations: { en: 'grows but does not age (Sofia motto)', fr: 'grandit mais ne vieillit pas', ar: 'تنمو ولا تشيخ', fa: 'رشد می‌کند اما پیر نمی‌شود', ru: 'растёт, но не стареет', uk: 'зростає, але не старіє' } },
    { id: 'porastvam', bulgarian: 'пораствам, порастваш / порасна, пораснеш', translations: { en: 'to grow up', fr: 'grandir', ar: 'يكبر', fa: 'بزرگ شدن', ru: 'вырастать', uk: 'виростати' } },
    { id: 'svyrzvam', bulgarian: 'свързвам, свързваш / свържа, свържеш', translations: { en: 'to connect', fr: 'relier, connecter', ar: 'يربط', fa: 'وصل کردن', ru: 'связывать', uk: 'з’єднувати' } },
    { id: 'hvalya-se', bulgarian: 'хваля се, хвалиш се / похваля се, похвалиш се', translations: { en: 'to brag, to boast', fr: 'se vanter', ar: 'يفتخر', fa: 'افتخار کردن', ru: 'хвалиться', uk: 'хвалитися' } },
    { id: 'namira-se', bulgarian: 'намира се, намират се', translations: { en: 'to be (situated)', fr: 'se trouver', ar: 'يقع', fa: 'واقع شدن', ru: 'находиться', uk: 'знаходитися' } },
  ],

  grammarReference: [
    {
      id: 'b1-l01-gr-plural',
      title: {
        bg: 'Множествено число на съществителните имена',
        en: 'Plural of nouns',
        fr: 'Pluriel des noms',
        ar: 'جمع الأسماء',
        fa: 'جمع اسما',
        ru: 'Множественное число существительных',
        uk: 'Множина іменників',
      },
      content: {
        bg: `Съществителните имена имат три форми: единствено число, множествено число и бройна форма (за 2, 3, 4).

Мъжки род:
• обикновено: ресторант → ресторанти | ресторанта
• -к: крак → крака | крака
• лица: мъж → мъже | мъже (двама, трима); брат → братя; човек → хора | двама, трима, четирима души

Женски род:
• -а: ферма → ферми
• -ка: сирийка → сирийки
• нередовни: ръка → ръце; овца → овце; нощ → нощи
• без мн.ч.: захар, сол, пролет, есен, младост…

Среден род:
• -о/-е: кафе → кафета; яйце → яйца; дете → деца
• нередовни: око → очи; ухо → уши`,
        en: `Nouns have three forms: singular, plural, and count form (for 2, 3, 4).

Masculine:
• regular: ресторант → ресторанти | ресторанта
• -к: крак → крака | крака
• persons: мъж → мъже | мъже (двама, трима); брат → братя; човек → хора

Feminine:
• -a: ферма → ферми
• -ka: сирийка → сирийки
• irregular: ръка → ръце; овца → овце; нощ → нощи
• no plural: захар, сол, пролет…

Neuter:
• -o/-e: кафе → кафета; яйце → яйца; дете → деца
• irregular: око → очи; ухо → уши`,
        fr: `Les noms ont trois formes : singulier, pluriel et forme de compte (pour 2, 3, 4). Voir les exemples en bulgare dans la version bulgare.`,
        ar: `للأسماء ثلاث صيغ: المفرد والجمع وصيغة العدد (لـ 2 و3 و4). راجع الأمثلة البلغارية في النص البلغاري.`,
        fa: `اسما سه شکل دارد: مفرد، جمع و شکل شمارشی (برای ۲، ۳، ۴). مثال‌های بلغاری را در متن بلغاری ببینید.`,
        ru: `У существительных три формы: единственное число, множественное и счётная форма (для 2, 3, 4). Примеры — в болгарском тексте выше.`,
        uk: `Іменники мають три форми: однина, множина й форма для 2, 3, 4. Приклади — у болгарському тексті вище.`,
      },
    },
    {
      id: 'b1-l01-gr-article',
      title: {
        bg: 'Определителен член на съществителните имена',
        en: 'Definite article on nouns',
        fr: 'Article défini des noms',
        ar: 'أداة التعريف للأسماء',
        fa: 'حرف تعریف اسما',
        ru: 'Определённый член существительных',
        uk: 'Визначений член іменників',
      },
      content: {
        bg: `В българския език определителният член се прибавя в края на думата.

Пълен член (подлог): м.р. -ът/-ят, ж.р. -та, ср.р. -то, мн.ч. -те
Кратък член (допълнение, след предлог): м.р. -а/-я, ж.р. -та, ср.р. -то, мн.ч. -те

Примери:
Пазарът е затворен. / Отивам на пазара.
Хотелът е в центъра. / Спирам пред хотела.

Мек член -ят/-я при м.р.:
• -ТЕЛ: учителят, преподавателят
• -АР: лекарят, аптекарят
• -Й: чай → чаят, трамвай → трамваят
• +Я: денят, пътят, конят

Член не се поставя при: една баничка и един чай; това момиче; ресторант „Хепи".`,
        en: `In Bulgarian the definite article is a suffix at the end of the word.

Full form (subject): m. -ът/-ят, f. -та, n. -то, pl. -те
Short form (object, after preposition): m. -а/-я, f. -та, n. -то, pl. -те

Examples:
Пазарът е затворен. / Отивам на пазара.

Soft article -ят/-я for masculine:
-ТЕЛ, -АР, -Й → -ят, +Я groups (see Bulgarian text).`,
        fr: `En bulgare l'article défini est un suffixe. Forme pleine (sujet) / courte (complément, après préposition). Voir les exemples bulgares.`,
        ar: `في البلغارية أداة التعريف لاحقة. صيغة كاملة (فاعل) / قصيرة (مفعول به، بعد حرف جر).`,
        fa: `در بلغاری حرف تعریف پسوند است. شکل کامل (فاعل) / کوتاه (مفعول، بعد حرف اضافه).`,
        ru: `В болгарском определённый член — суффикс. Полная форма (подлежащее) / краткая (дополнение, после предлога).`,
        uk: `У болгарській мові визначений член — суфікс. Повна форма (підмет) / коротка (додаток, після прийменника).`,
      },
    },
    {
      id: 'b1-l01-gr-adjectives',
      title: {
        bg: 'Прилагателни: род, число, степенуване',
        en: 'Adjectives: gender, number, comparison',
        fr: 'Adjectifs : genre, nombre, degrés',
        ar: 'الصفات: الجنس والعدد والدرجات',
        fa: 'صفت‌ها: جنسیت، عدد، درجات',
        ru: 'Прилагательные: род, число, степени',
        uk: 'Прикметники: рід, число, ступені',
      },
      content: {
        bg: `Прилагателните се съгласуват с рода и числото на съществителното:
м.р. черен панталон, ж.р. черна блуза, ср.р. черно сако, мн.ч. черни дънки

Сравнителна степен: по- + прилагателно + от
Превъзходна степен: най- + прилагателно
Пример: София е по-голяма от Варна. София е най-голямата.

Прилагателни от държави/градове:
Ирак → иракски, иракска, иракско, иракчани
Франция → френски; Германия → немски / германски (и двете са верни)

Определителен член на прилагателните:
м.р. синият шал (подлог) / синия шал (допълнение)
ж.р. новата рокля; ср.р. червеното портмоне; мн.ч. черните дънки

Внимание! червен (red) ≠ черен (black) — различно ударение и значение.`,
        en: `Adjectives agree in gender and number with the noun.
Comparative: по- + adjective + от; superlative: най- + adjective.
Country adjectives: Ирак → иракски; France → френски; Germany → немски / германски.
Definite article on adjectives: м.р. -ият/-ия, ж.р. -та, ср.р. -то, pl. -те.`,
        fr: `Les adjectifs s'accordent en genre et en nombre. Comparatif : по-… от ; superlatif : най-….`,
        ar: `الصفات تتوافق في الجنس والعدم. المقارنة: по-… от؛ التفضيل: най-….`,
        fa: `صفت‌ها با جنسیت و عدد اسم هماهنگ‌اند. مقایسه: по-… от؛ عالی: най-….`,
        ru: `Прилагательные согласуются в роде и числе. Сравнительная: по-… от; превосходная: най-….`,
        uk: `Прикметники узгоджуються в роді й числі. Порівняльний: по-… от; найвищий: най-….`,
      },
    },
    {
      id: 'b1-l01-gr-adverbs',
      title: {
        bg: 'Степенуване на наречията',
        en: 'Comparison of adverbs',
        fr: 'Degrés des adverbes',
        ar: 'درجات الظروف',
        fa: 'درجات قیدها',
        ru: 'Степени наречий',
        uk: 'Ступені прислівників',
      },
      content: {
        bg: `Чести наречия: добре, зле, много, рано, късно, бързо, бавно, евтино, скъпо.

Сравнителна степен: по- + наречие + от
Превъзходна степен: най- + наречие

Примери:
Яна се връща по-късно от Борис. Марина се връща най-късно.
Синята блуза е по-скъпа от бялата. Лилавата е най-скъпа.

За количество понякога се ползват повече от / най-много вместо по-/най-:
Явор купува повече от Калин. Пламен купува най-много.`,
        en: `Common adverbs: добре, зле, много, рано, бързо, евтино…
Comparative: по- + adverb + от; superlative: най- + adverb.
For quantity: повече от / най-много.`,
        fr: `Adverbes courants : добре, зле, много… Comparatif : по-… от ; superlatif : най-….`,
        ar: `ظروف شائعة: добре، зле، много… المقارنة: по-… от؛ التفضيل: най-….`,
        fa: `قیدهای رایج: добре، зле، مного… مقایسه: по-… от؛ عالی: най-….`,
        ru: `Наречия: добре, зле, много… Сравнительная: по-… от; превосходная: най-….`,
        uk: `Прислівники: добре, зле, много… Порівняльний: по-… от; найвищий: най-….`,
      },
    },
  ],

  culturalNotes: [
    {
      id: 'b1-l01-culture-zhivotni',
      title: {
        bg: 'Животните в България — на село и в зоопарковете',
        en: 'Animals in Bulgaria — in the countryside and at the zoo',
        fr: 'Les animaux en Bulgarie — à la campagne et au zoo',
        ar: 'الحيوانات في بلغاريا — في الريف وحدائق الحيوان',
        fa: 'حیوانات در بلغارستان — در روستا و باغ‌وحش',
        ru: 'Животные в Болгарии — на селе и в зоопарках',
        uk: 'Тварини в Болгарії — на селі та в зоопарках',
      },
      content: {
        bg: 'В българското село и днес можете да видите коне, магарета, крави, овце, кози и кокошки. Много семейства имат и кучета или котки. В планините на България живеят кафяви мечки, вълци и лисици — те са защитени. Зоопаркове има в София, Варна, Пловдив и Стара Загора. София има голям зоопарк в южната част на града — там можете да видите слонове, лъвове, тигри, маймуни и много други диви животни.',
        en: 'In the Bulgarian countryside you can still see horses, donkeys, cows, sheep, goats and hens today. Many families also keep dogs or cats. Brown bears, wolves and foxes live in the Bulgarian mountains — they are protected species. There are zoos in Sofia, Varna, Plovdiv and Stara Zagora. Sofia’s zoo, in the south of the city, is the largest one and is home to elephants, lions, tigers, monkeys and many other wild animals.',
        fr: 'À la campagne bulgare, on peut encore voir aujourd’hui des chevaux, des ânes, des vaches, des moutons, des chèvres et des poules. De nombreuses familles ont aussi un chien ou un chat. Des ours bruns, des loups et des renards vivent dans les montagnes bulgares — ils sont protégés. Il y a des zoos à Sofia, Varna, Plovdiv et Stara Zagora. Celui de Sofia, dans le sud de la ville, est le plus grand : on peut y voir des éléphants, des lions, des tigres, des singes et bien d’autres animaux sauvages.',
        ar: 'لا تزال قرى بلغاريا تضمّ الخيول والحمير والأبقار والأغنام والماعز والدجاج، وكثير من العائلات تربّي كلابًا أو قططًا. تعيش الدببة البنية والذئاب والثعالب في الجبال البلغارية، وهي حيوانات محمية. توجد حدائق حيوان في صوفيا وفارنا وبلوفديف وستارا زاغورا. وأكبرها في جنوب صوفيا، وتضمّ فيلة وأسودًا ونمورًا وقردة وحيوانات برية أخرى كثيرة.',
        fa: 'در روستاهای بلغارستان امروز هم می‌توان اسب، الاغ، گاو، گوسفند، بز و مرغ دید. خانواده‌های بسیاری سگ یا گربه نگه می‌دارند. در کوه‌های بلغارستان خرس قهوه‌ای، گرگ و روباه زندگی می‌کنند و این حیوانات تحت حفاظت‌اند. باغ‌وحش‌هایی در صوفیه، وارنا، پلوودیف و استارا زاگورا وجود دارد. بزرگ‌ترین آن‌ها در جنوب صوفیه است و در آن می‌توانید فیل، شیر، ببر، میمون و حیوانات وحشی دیگر را ببینید.',
        ru: 'В болгарском селе и сегодня можно увидеть лошадей, ослов, коров, овец, коз и кур. Во многих семьях есть и собаки или кошки. В болгарских горах живут бурые медведи, волки и лисы — это охраняемые виды. Зоопарки есть в Софии, Варне, Пловдиве и Стара Загоре. В южной части Софии находится самый большой зоопарк страны, где можно увидеть слонов, львов, тигров, обезьян и других диких животных.',
        uk: 'У болгарському селі й сьогодні можна побачити коней, ослів, корів, овець, кіз і курей. Багато родин мають собак або котів. У болгарських горах живуть бурі ведмеді, вовки та лисиці — ці тварини під охороною. Зоопарки є в Софії, Варні, Пловдиві та Старій Загорі. Найбільший — у південній частині Софії; там можна побачити слонів, левів, тигрів, мавп та багатьох інших диких тварин.',
      },
    },
    {
      id: 'b1-l01-culture-sofia',
      title: {
        bg: 'София — столицата на България',
        en: 'Sofia — the capital of Bulgaria',
        fr: 'Sofia — la capitale de la Bulgarie',
        ar: 'صوفيا — عاصمة بلغاريا',
        fa: 'صوفیه — پایتخت بلغارستان',
        ru: 'София — столица Болгарии',
        uk: 'Софія — столиця Болгарії',
      },
      content: {
        bg: 'София е столица на България от 1879 г. и един от най-старите градове в Европа — историята ѝ е дълга над 7000 години. Градът се намира в Софийското поле, под планината Витоша, и има население от около 1 300 000 души. През вековете е носил различни имена: тракийско Сердика, средновековно Средец, а от петнадесети век — София, по името на църквата „Света София“. На гръцки „София“ означава „мъдрост“. Девизът на града е „Расте, но не старее“. Сред най-известните места са катедралата „Свети Александър Невски“, Боянската църква (паметник на ЮНЕСКО), Националният исторически музей, Археологическият музей, булевард „Витоша“, паркът пред НДК и Борисовата градина.',
        en: 'Sofia has been the capital of Bulgaria since 1879 and is one of the oldest cities in Europe, with a history of more than 7,000 years. It lies in the Sofia plain, at the foot of Mount Vitosha, and has a population of about 1,300,000. Over the centuries it has had several names: the Thracian Serdica, the medieval Sredets and, from the 15th century, Sofia, named after the church of St. Sophia. In Greek “Sofia” means “wisdom”. The city’s motto is “It grows but does not age”. The best-known sights include St. Alexander Nevsky Cathedral, the Boyana Church (a UNESCO monument), the National History Museum, the Archaeological Museum, Vitosha Boulevard, the park in front of NDK and Borisova Gradina.',
        fr: 'Sofia est la capitale de la Bulgarie depuis 1879 et l’une des villes les plus anciennes d’Europe : son histoire s’étend sur plus de 7 000 ans. Elle se trouve dans la plaine de Sofia, au pied du mont Vitocha, et compte environ 1 300 000 habitants. Au fil des siècles elle a porté plusieurs noms : la thrace Serdica, la médiévale Sredets et, depuis le XVe siècle, Sofia — du nom de l’église Sainte-Sophie. En grec, « Sofia » signifie « sagesse ». La devise de la ville est « Elle grandit, mais ne vieillit pas ». Parmi les sites célèbres : la cathédrale Alexandre-Nevski, l’église de Boyana (monument UNESCO), le musée national d’histoire et le musée ethnographique, le boulevard Vitocha, le parc devant le NDK et le jardin Borissova.',
        ar: 'صوفيا هي عاصمة بلغاريا منذ عام 1879 وإحدى أقدم مدن أوروبا، إذ يمتد تاريخها لأكثر من سبعة آلاف عام. تقع في سهل صوفيا عند سفح جبل فيتوشا، ويبلغ عدد سكانها نحو 1.300.000 نسمة. تعاقبت على المدينة عدة أسماء: «سرديكا» التراقي، و«سريديتس» في العصور الوسطى، ثم «صوفيا» من القرن الخامس عشر تيمّناً بكنيسة القديسة صوفيا. «صوفيا» باليونانية تعني «الحكمة». شعار المدينة: «تنمو ولا تشيخ». من أبرز معالمها كاتدرائية القديس ألكسندر نيفسكي، وكنيسة بويانا (موقع لليونسكو)، ومتحفا التاريخ الوطني والإثنوغرافيا، وجادة فيتوشا، والحديقة أمام قصر الثقافة (NDK)، وحديقة بوريسوفا.',
        fa: 'صوفیه از سال ۱۸۷۹ پایتخت بلغارستان است و یکی از قدیمی‌ترین شهرهای اروپا با تاریخی بیش از ۷۰۰۰ ساله. در دشت صوفیه و در دامنه کوه ویتوشا قرار دارد و حدود ۱٬۳۰۰٬۰۰۰ نفر جمعیت دارد. در گذر قرن‌ها نام‌های مختلفی داشته است: «سردیکای» تراکیایی، «سردِتس» قرون‌وسطایی، و از قرن پانزدهم «صوفیه» به نام کلیسای سنت‌سوفیا. واژه‌ی «صوفیا» در یونانی به معنای «خرد» است. شعار شهر: «رشد می‌کند اما پیر نمی‌شود». از معروف‌ترین دیدنی‌ها: کلیسای جامع الکساندر نِفسکی، کلیسای بویانا (میراث یونسکو)، موزه ملی تاریخ، موزه مردم‌شناسی، بلوار ویتوشا، پارک مقابل کاخ فرهنگ (NDK) و باغ بوریسووا.',
        ru: 'София является столицей Болгарии с 1879 года и одним из старейших городов Европы — её история насчитывает более 7000 лет. Город расположен в Софийской равнине, у подножия горы Витоша, и его население около 1 300 000 человек. На протяжении веков он носил разные имена: фракийское Сердика, средневековое Средец, а с XV века — София, по имени церкви Святой Софии. С греческого «София» — это «мудрость». Девиз города: «Растёт, но не стареет». Среди известных мест: собор Святого Александра Невского, Боянская церковь (памятник ЮНЕСКО), Национальный исторический и Этнографический музеи, бульвар Витоша, парк перед НДК и Борисов сад.',
        uk: 'Софія є столицею Болгарії з 1879 року й одне з найдавніших міст Європи — її історія налічує понад 7000 років. Місто лежить у Софійській улоговині, біля підніжжя гори Вітоша, населення — близько 1 300 000 осіб. Упродовж віків воно носило різні імена: фракійська Сердика, середньовічний Средець, а з XV століття — Софія, на честь церкви Святої Софії. З грецької «Софія» означає «мудрість». Девіз міста: «Зростає, але не старіє». Серед найвідоміших місць — собор Святого Олександра Невського, Боянська церква (пам’ятка ЮНЕСКО), Національний історичний і Етнографічний музеї, бульвар Вітоша, парк перед НДК та Борисів сад.',
      },
    },
    {
      id: 'b1-l01-culture-imen-den',
      title: {
        bg: 'Имен ден в България',
        en: 'Name day in Bulgaria',
        fr: 'La fête du prénom en Bulgarie',
        ar: 'عيد الاسم في بلغاريا',
        fa: 'روز نام در بلغارستان',
        ru: 'Именины в Болгарии',
        uk: 'Іменини в Болгарії',
      },
      content: {
        bg: 'В България освен рождения си ден празнуваме и т.нар. „имен ден“ — денят на светеца, на чието име сме кръстени. Имен ден има за повечето християнски имена: Иван, Мария, Георги, Никола, Елена и др. На имения ден гостите идват вкъщи без специална покана и носят малки подаръци или цветя. За домакините е важно да приготвят почерпка — кафе, сладко, баница или нещо приготвено за случая.',
        en: 'In Bulgaria, besides their birthday, people also celebrate their name day — the feast day of the saint they are named after. Most Christian names have a name day: Ivan, Maria, Georgi, Nikola, Elena, etc. On a name day guests come to the house without a special invitation and bring small presents or flowers. The hosts are expected to offer a treat — coffee, jam, banitsa or something prepared for the occasion.',
        fr: 'En Bulgarie, en plus de l’anniversaire, on fête aussi la « fête du prénom » — le jour du saint dont on porte le nom. La plupart des prénoms chrétiens ont leur fête : Ivan, Maria, Georgi, Nikola, Elena, etc. Ce jour-là, les invités passent à la maison sans invitation particulière et apportent un petit cadeau ou des fleurs. Les hôtes préparent toujours quelque chose : café, confiture, banitsa ou un plat fait spécialement pour l’occasion.',
        ar: 'في بلغاريا، إلى جانب عيد الميلاد، يحتفل الناس بـ «عيد الاسم» — يوم القدّيس الذي يحملون اسمه. لمعظم الأسماء المسيحية أعياد أسماء: إيفان، ماريا، غيورغي، نيكولا، إيلينا… في هذا اليوم يأتي الضيوف إلى البيت من دون دعوة خاصة، ويحضرون هدية صغيرة أو زهوراً. ومن المتوقع أن يقدّم أصحاب البيت قهوة ومربى وفطائر («بانيتسا») أو طبقاً معدّاً للمناسبة.',
        fa: 'در بلغارستان علاوه بر روز تولد، «روز نام» را هم جشن می‌گیرند — روز قدیسی که نام شخص از او گرفته شده است. بیشتر اسم‌های مسیحی روز نام دارند: ایوان، ماریا، گیورگی، نیکولا، اِلِنا و... در این روز مهمان‌ها بدون دعوت خاص به خانه می‌آیند و هدیه‌ای کوچک یا گل می‌آورند. صاحب‌خانه باید پذیرایی آماده کند: قهوه، مربا، «بانیتسا» یا غذایی که برای این مناسبت تهیه کرده است.',
        ru: 'В Болгарии, помимо дня рождения, отмечают и «именины» — день святого, в честь которого человек назван. Именины есть у большинства христианских имён: Иван, Мария, Георги, Никола, Елена и т. д. В этот день гости заходят без особого приглашения и приносят небольшие подарки или цветы. Хозяева, в свою очередь, всегда готовят угощение — кофе, варенье, баницу или специально приготовленное блюдо.',
        uk: 'У Болгарії, окрім дня народження, святкують ще й «день імені» — день святого, на честь якого названо людину. Іменини мають більшість християнських імен: Іван, Марія, Георгій, Микола, Олена тощо. У цей день гості приходять додому без окремого запрошення і приносять маленькі подарунки або квіти. Господарі завжди готують частування — каву, варення, баницю або страву, приготовлену спеціально для випадку.',
      },
    },
  ],
};

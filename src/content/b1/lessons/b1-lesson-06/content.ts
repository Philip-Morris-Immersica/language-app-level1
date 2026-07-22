import type { LessonContent } from '@/content/types';

export const content: LessonContent = {
  introduction: `В този урок ще говорите за взаимоотношенията между хората — какво правим сами за себе си и какво правим един за друг.

Ще научите възвратните глаголи със „се" (събуждам се, обличам се, храня се), взаимните глаголи в трето лице множествено число (обичат се, прегръщат се, познават се), глаголите със „си" (помагат си, звънят си, говорят си), както и безличните конструкции „ми се" (спи ми се, яде ми се, чете ми се), с които изразяваме желание или състояние.`,

  sections: [],

  vocabulary: [
    // г
    { id: 'gordeya-se', bulgarian: 'гордея се, -еш', ttsText: 'гордея се, гордееш се', ttsModel: 'pro', ttsPrompt: 'Clear standard Bulgarian. Pronounce гордея as gor-DE-ya (stress on DE), never гордая / gor-DA-ya.', translations: { en: 'to be proud', fr: 'être fier / être fière', ar: 'يفتخر', fa: 'افتخار کردن', ru: 'гордиться', uk: 'пишатися' } },
    { id: 'grimiram-se', bulgarian: 'гримирам се, -аш', ttsText: 'гримирам се. гримираш се.', ttsModel: 'pro', ttsPrompt: 'Declarative word list. Falling sentence-final intonation on each form — end as if finishing a sentence. No rising or questioning tone.', translations: { en: 'to put on make-up', fr: 'se maquiller', ar: 'يضع المكياج', fa: 'آرایش کردن', ru: 'краситься, делать макияж', uk: 'робити макіяж' } },

    // з
    { id: 'zvanya', bulgarian: 'звъня, -иш', ttsText: 'звъня. звъниш.', ttsModel: 'pro', ttsPrompt: 'Declarative statement. Flat, neutral tone. No rising intonation. Read as a word list, not a question.', translations: { en: 'to call (on the phone)', fr: 'appeler, téléphoner', ar: 'يتصل هاتفيًا', fa: 'زنگ زدن', ru: 'звонить', uk: 'телефонувати' } },

    // и
    { id: 'izkustvo', bulgarian: 'изкуство, -а', ttsText: 'изкуство, изкуства', ttsModel: 'pro', translations: { en: 'art, -s', fr: 'art, -s', ar: 'فن، فنون', fa: 'هنر', ru: 'искусство', uk: 'мистецтво' } },

    // к
    { id: 'karam-se', bulgarian: 'карам се, -аш', ttsText: 'карам се. караш се.', ttsModel: 'pro', ttsPrompt: 'Declarative statement. Flat, neutral tone. No rising intonation. Read as a word list, not a question.', translations: { en: 'to quarrel', fr: 'se disputer', ar: 'يتشاجر', fa: 'دعوا کردن', ru: 'ссориться', uk: 'сваритися' } },

    // о
    { id: 'opitam-se', bulgarian: 'опитам се, -аш', ttsText: 'опитам се, опиташ се', ttsModel: 'pro', translations: { en: 'to try', fr: 'essayer', ar: 'يحاول', fa: 'تلاش کردن', ru: 'попытаться', uk: 'спробувати' } },

    // п
    { id: 'pozdravyavam', bulgarian: 'поздравявам, -аш / поздравя, -иш', ttsText: 'поздравявам. поздравяваш. поздравя. поздравиш.', ttsModel: 'pro', ttsPrompt: 'Clear standard Bulgarian. The perfective forms end in -я / -иш: поздравя (pozdra-VYA, final я = ya), never поздравю. Stress: поздравЯвам, поздравЯваш, поздравЯ, поздравИш.', translations: { en: 'to congratulate, to greet', fr: 'féliciter, saluer', ar: 'يهنّئ، يحيّي', fa: 'تبریک گفتن، سلام کردن', ru: 'поздравлять / поздравить', uk: 'вітати / привітати' } },

    // р
    { id: 'resha-se', bulgarian: 'реша се, -иш', ttsText: 'реша се, решиш се', ttsModel: 'flash', ttsPrompt: 'Bulgarian verb "to comb one\'s hair", NOT "to decide". Read as one smooth phrase list — natural connected speech, no syllable pauses, no chopping. Stress ONLY first syllable: рЕша се, рЕшиш се (RE-sha, RE-shish). Vowels stay full and clear: -ша ends in open А (ah), never Ъ; -шиш has clear И (ee), never Ъ.', translations: { en: "to comb / brush one's hair", fr: 'se coiffer, se peigner', ar: 'يمشّط شعره', fa: 'موی خود را شانه کردن', ru: 'причёсываться', uk: 'зачісуватися' } },

    // с
    { id: 'stradam', bulgarian: 'страдам, -аш', ttsText: 'страдам, страдаш', ttsModel: 'pro', translations: { en: 'to suffer', fr: 'souffrir', ar: 'يعاني', fa: 'رنج بردن', ru: 'страдать', uk: 'страждати' } },
    { id: 'sabuzhdam-se', bulgarian: 'събуждам се, -аш / събудя се, -иш', ttsText: 'събуждам се, събуждаш се / събудя се, събудиш се', ttsModel: 'pro', translations: { en: 'to wake up', fr: 'se réveiller', ar: 'يستيقظ', fa: 'بیدار شدن', ru: 'просыпаться / проснуться', uk: 'прокидатися / прокинутися' } },

    // у
    { id: 'usmihvam-se', bulgarian: 'усмихвам се, -аш / усмихна се, -еш', ttsText: 'усмихвам се. усмихваш се. усмихна се. усмихнЕш се.', ttsModel: 'pro', ttsPrompt: 'Clear standard Bulgarian. In усмихнеш се stress on -НЕ-: usmih-NESH se. Flat declarative tone, no rising intonation.', translations: { en: 'to smile', fr: 'sourire', ar: 'يبتسم', fa: 'لبخند زدن', ru: 'улыбаться / улыбнуться', uk: 'усміхатися / усміхнутися' } },

    // х
    { id: 'hranya', bulgarian: 'храня, -иш', ttsText: 'храня, храниш', ttsModel: 'pro', translations: { en: 'to feed', fr: 'nourrir, donner à manger', ar: 'يُطعِم', fa: 'غذا دادن', ru: 'кормить', uk: 'годувати' } },

    // ш
    { id: 'sheguvam-se', bulgarian: 'шегувам се, -аш', ttsText: 'шегувам се, шегуваш се', ttsModel: 'pro', translations: { en: 'to joke', fr: 'plaisanter, blaguer', ar: 'يمزح', fa: 'شوخی کردن', ru: 'шутить', uk: 'жартувати' } },
  ],

  // grammarReference — попълва се в отделна фаза (граматичен справочник), след като
  // прегледаме кое е релевантно за урока (по указание в задачата, точка 7).

  // culturalNotes — за този урок НЯМА културни бележки в материалите
  // (папка „cultural lesson" е празна; IMAGE-MAPPING.md изрично отбелязва „Културни бележки: няма").
};

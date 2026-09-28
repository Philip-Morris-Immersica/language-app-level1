import type { LessonContent } from '@/content/types';

const B1_TTS_PROMPT =
  'Read aloud in a warm, welcoming tone, in clear standard Bulgarian with natural native pronunciation and correct stress. Do not use any Russian, Arabic, English or other foreign accent.';

export const content: LessonContent = {
  sections: [],
  vocabulary: [
    { id: 'b1-l15-novi-dumi-01-01', bulgarian: 'псевдоним, -и', ttsText: 'псевдоним, псевдоними', ttsModel: 'pro', ttsPrompt: B1_TTS_PROMPT, translations: { en: 'pseudonym, pen name', fr: 'pseudonyme', ar: 'اسم مستعار', fa: 'نام مستعار', ru: 'псевдоним', uk: 'псевдонім' } },
    { id: 'b1-l15-novi-dumi-01-02', bulgarian: 'заслуга, -и', ttsText: 'заслуга, заслуги', ttsModel: 'pro', ttsPrompt: B1_TTS_PROMPT, translations: { en: 'merit, contribution', fr: 'mérite', ar: 'إنجاز، فضل', fa: 'شایستگی، خدمت', ru: 'заслуга', uk: 'заслуга' } },
    { id: 'b1-l15-novi-dumi-01-03', bulgarian: 'равенство', ttsText: 'равенство', ttsModel: 'pro', ttsPrompt: B1_TTS_PROMPT, translations: { en: 'equality', fr: 'égalité', ar: 'مساواة', fa: 'برابری', ru: 'равенство', uk: 'рівність' } },
    { id: 'b1-l15-novi-dumi-01-04', bulgarian: 'паметник, -ци', ttsText: 'паметник, паметници', ttsModel: 'pro', ttsPrompt: B1_TTS_PROMPT, translations: { en: 'monument, statue', fr: 'monument', ar: 'نصب تذكاري', fa: 'بنای یادبود', ru: 'памятник', uk: 'пам\'ятник' } },
    { id: 'b1-l15-novi-dumi-01-05', bulgarian: 'емигрант, -и', ttsText: 'емигрант, емигранти', ttsModel: 'pro', ttsPrompt: B1_TTS_PROMPT, translations: { en: 'emigrant', fr: 'émigrant', ar: 'مهاجر', fa: 'مهاجر', ru: 'эмигрант', uk: 'емігрант' } },
    { id: 'b1-l15-novi-dumi-01-06', bulgarian: 'мелница, -и', ttsText: 'мелница, мелници', ttsModel: 'pro', ttsPrompt: B1_TTS_PROMPT, translations: { en: 'mill', fr: 'moulin', ar: 'طاحونة', fa: 'آسیاب', ru: 'мельница', uk: 'млин' } },
    { id: 'b1-l15-novi-dumi-01-07', bulgarian: 'печатница, -и', ttsText: 'печатница, печатници', ttsModel: 'pro', ttsPrompt: B1_TTS_PROMPT, translations: { en: 'printing house', fr: 'imprimerie', ar: 'مطبعة', fa: 'چاپخانه', ru: 'типография', uk: 'друкарня' } },
    { id: 'b1-l15-novi-dumi-01-08', bulgarian: 'стихотворение, -я', ttsText: 'стихотворение, стихотворения', ttsModel: 'pro', ttsPrompt: B1_TTS_PROMPT, translations: { en: 'poem', fr: 'poème', ar: 'قصيدة', fa: 'شعر', ru: 'стихотворение', uk: 'вірш' } },
    { id: 'b1-l15-novi-dumi-01-09', bulgarian: 'поколение, -я', ttsText: 'поколение, поколения', ttsModel: 'pro', ttsPrompt: B1_TTS_PROMPT, translations: { en: 'generation', fr: 'génération', ar: 'جيل', fa: 'نسل', ru: 'поколение', uk: 'покоління' } },
    { id: 'b1-l15-novi-dumi-01-10', bulgarian: 'иго', ttsText: 'иго', ttsModel: 'pro', ttsPrompt: 'Clear standard Bulgarian. The word is И-ГО — two syllables, И then Г then О. Stress the first syllable И. NEVER say "ибо". Read once only.', translations: { en: 'yoke (subjugation)', fr: 'joug', ar: 'نير، استعمار', fa: 'یوغ، سلطه', ru: 'иго', uk: 'іго' } },
    { id: 'b1-l15-novi-dumi-01-11', bulgarian: 'повест, -и', ttsText: 'повест, повести', ttsModel: 'pro', ttsPrompt: B1_TTS_PROMPT, translations: { en: 'novella, story', fr: 'récit', ar: 'قصة، رواية قصيرة', fa: 'داستان کوتاه', ru: 'повесть', uk: 'повість' } },
    { id: 'b1-l15-novi-dumi-01-12', bulgarian: 'пътепис, -и', ttsText: 'пътепис, пътеписи', ttsModel: 'pro', ttsPrompt: B1_TTS_PROMPT, translations: { en: 'travelogue', fr: 'récit de voyage', ar: 'مذكرات رحلة', fa: 'سفرنامه', ru: 'путевые заметки', uk: 'подорожні нотатки' } },
    { id: 'b1-l15-novi-dumi-02-01', bulgarian: 'живопис', ttsText: 'живопис', ttsModel: 'pro', ttsPrompt: B1_TTS_PROMPT, translations: { en: 'painting (art)', fr: 'peinture', ar: 'فن التصوير', fa: 'نقاشی', ru: 'живопись', uk: 'живопис' } },
    { id: 'b1-l15-novi-dumi-02-02', bulgarian: 'дарба, -и', ttsText: 'дарба, дарби', ttsModel: 'pro', ttsPrompt: B1_TTS_PROMPT, translations: { en: 'talent, gift', fr: 'talent, don', ar: 'موهبة', fa: 'استعداد', ru: 'талант, дар', uk: 'талант, хист' } },
    { id: 'b1-l15-novi-dumi-02-03', bulgarian: 'платно, -а', ttsText: 'платно, платна', ttsModel: 'pro', ttsPrompt: B1_TTS_PROMPT, translations: { en: 'canvas, painting', fr: 'toile, tableau', ar: 'لوحة فنية', fa: 'بوم نقاشی', ru: 'полотно, картина', uk: 'полотно, картина' } },
    { id: 'b1-l15-novi-dumi-02-04', bulgarian: 'портрет, -и', ttsText: 'портрет, портрети', ttsModel: 'pro', ttsPrompt: B1_TTS_PROMPT, translations: { en: 'portrait', fr: 'portrait', ar: 'بورتريه، صورة شخصية', fa: 'پرتره، تصویر چهره', ru: 'портрет', uk: 'портрет' } },
    { id: 'b1-l15-novi-dumi-02-05', bulgarian: 'пейзаж, -и', ttsText: 'пейзаж, пейзажи', ttsModel: 'pro', ttsPrompt: 'Clear standard Bulgarian. Read singular then plural once: пей-ЗАЖ, пей-ЗА-жи. The last consonant of both forms is Ж (as in "жар"), NEVER З. Say пейзажи, NEVER "пейзази".', translations: { en: 'landscape (painting)', fr: 'paysage', ar: 'لوحة منظر طبيعي', fa: 'منظره، چشم‌انداز', ru: 'пейзаж', uk: 'пейзаж' } },
    { id: 'b1-l15-novi-dumi-02-06', bulgarian: 'галерия, -и', ttsText: 'галерия, галерии', ttsModel: 'pro', ttsPrompt: B1_TTS_PROMPT, translations: { en: 'gallery', fr: 'galerie', ar: 'معرض فني', fa: 'گالری', ru: 'галерея', uk: 'галерея' } },
    { id: 'b1-l15-novi-dumi-02-07', bulgarian: 'изложба, -и', ttsText: 'изложба, изложби', ttsModel: 'pro', ttsPrompt: B1_TTS_PROMPT, translations: { en: 'exhibition', fr: 'exposition', ar: 'معرض', fa: 'نمایشگاه', ru: 'выставка', uk: 'виставка' } },
    { id: 'b1-l15-novi-dumi-02-08', bulgarian: 'сецесион', ttsText: 'сецесион', ttsModel: 'pro', ttsPrompt: B1_TTS_PROMPT, translations: { en: 'Art Nouveau / Secession style', fr: 'Sécession (Art nouveau)', ar: 'فن الانفصال (سيسيون)', fa: 'سبک سکسیون (آرنوو)', ru: 'сецессион (модерн)', uk: 'сецесіон (модерн)' } },
  ],
  introduction:
    'След Освобождението България търси своя глас не само в политиката, но и в литературата и живописта. В този урок четете оригиналните учебникови текстове за революционери, писател и художници, после проверявате разбирането си. По пътя ще срещнете причастието като определение и поетичния език на „Аз съм българче".',
  culturalNotes: [],
  grammarReference: [],
};

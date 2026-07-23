import type { LessonContent } from '@/content/types';

export const content: LessonContent = {
  introduction: `В този урок ще говорите за почивката и ще научите:

• кратките форми във винителен падеж — „го", „я", „ме", „те", „ги"

• кратките форми в дателен падеж — „ми", „му", „ѝ", „им"

• двойните местоимения — „им ги", „му я" и др.

Ще упражнявате и обобщителните местоимения (всеки, всичко, всякакви), както и съюзите, с които свързваме изреченията (защото, когато, ако, дали, макар че, за да).`,

  sections: [],

  vocabulary: [
    { id: 'zabranqvam', bulgarian: 'забранявам, -аш / забраня, -иш', ttsText: 'забранявам, забраняваш / забраня, забраниш', ttsModel: 'pro', translations: { en: 'to forbid', fr: 'interdire', ar: 'يمنع', fa: 'ممنوع کردن', ru: 'запрещать', uk: 'забороняти' } },
    { id: 'zavedenie', bulgarian: 'заведение, -я', ttsText: 'заведение, заведения', ttsModel: 'pro', translations: { en: 'bar, club, establishment', fr: 'établissement, bar', ar: 'مكان، محل', fa: 'مکان، بار', ru: 'заведение', uk: 'заклад' } },
    { id: 'zimnina', bulgarian: 'зимнина', ttsText: 'зимнина', ttsModel: 'pro', translations: { en: 'preserves (for winter)', fr: 'conserves pour l\'hiver', ar: 'معلّبات للشتاء', fa: 'کنسرو برای زمستان', ru: 'заготовки на зиму', uk: 'заготовки на зиму' } },
    { id: 'iznenada', bulgarian: 'изненада, -и', ttsText: 'изненада, изненади', ttsModel: 'pro', translations: { en: 'surprise', fr: 'surprise', ar: 'مفاجأة', fa: 'شگفتی', ru: 'сюрприз', uk: 'несподіванка' } },
    { id: 'kurort', bulgarian: 'курорт, -и', ttsText: 'курорт, курорти', ttsModel: 'pro', translations: { en: 'resort', fr: 'station, resort', ar: 'منتجع', fa: 'منطقه تفریحی', ru: 'курорт', uk: 'курорт' } },
    { id: 'mek', bulgarian: 'мек, -а, -о, -и', ttsText: 'мек, мека, меко, меки', ttsModel: 'pro', translations: { en: 'mild (climate)', fr: 'doux, clément', ar: 'معتدل (مناخ)', fa: 'ملایم (آب و هوا)', ru: 'мягкий (о климате)', uk: 'м\'який (про клімат)' } },
    { id: 'mir', bulgarian: 'мир', ttsText: 'мир', ttsModel: 'pro', translations: { en: 'peace', fr: 'paix', ar: 'سلام', fa: 'صلح', ru: 'мир', uk: 'мир' } },
    { id: 'ne-samo-no-i', bulgarian: 'не само ..., но и ...', ttsText: 'не само, но и', ttsModel: 'pro', translations: { en: 'not only ... but also ...', fr: 'non seulement ... mais aussi ...', ar: 'ليس فقط ... بل أيضًا ...', fa: 'نه فقط ... بل ... هم', ru: 'не только ... но и ...', uk: 'не лише ... а й ...' } },
    { id: 'neobhodim', bulgarian: 'необходим, -а, -о, -и', ttsText: 'необходим, необходима, необходимо, необходими', ttsModel: 'pro', translations: { en: 'necessary', fr: 'nécessaire', ar: 'ضروري', fa: 'لازم', ru: 'необходимый', uk: 'необхідний' } },
    { id: 'pepelashka', bulgarian: 'Пепеляшка', ttsText: 'Пепеляшка.', ttsModel: 'pro', ttsPrompt: 'Declarative statement. Flat, neutral tone. Falling sentence-final intonation — end as if finishing a sentence. No rising or questioning tone.', translations: { en: 'Cinderella', fr: 'Cendrillon', ar: 'سندريلا', fa: 'سیندرلا', ru: 'Золушка', uk: 'Попелюшка' } },
    { id: 'pozvolqvam', bulgarian: 'позволявам, -аш / позволя, -иш', ttsText: 'позволявам, позволяваш / позволя, позволиш', ttsModel: 'pro', translations: { en: 'to allow', fr: 'permettre', ar: 'يسمح', fa: 'اجازه دادن', ru: 'разрешать', uk: 'дозволяти' } },
    { id: 'postorya-se', bulgarian: 'постарая се, -еш', ttsText: 'постарая се. постараеш се.', ttsModel: 'pro', ttsPrompt: 'Declarative word list. Read exactly two DIFFERENT forms, once each, in this order: (1) постарая се — ends with Я се; (2) постараеш се — ends with аеш се (а then е as two vowels, no й). Never repeat one form twice. Flat falling intonation.', translations: { en: 'to try hard, to make an effort', fr: 'faire un effort', ar: 'يبذل جهدًا', fa: 'تلاش کردن', ru: 'постараться', uk: 'постаратися' } },
    { id: 'preporuchvam', bulgarian: 'препоръчвам, -аш / препоръчам, -аш', ttsText: 'препоръчвам, препоръчваш, препоръчам, препоръчаш.', ttsModel: 'pro', ttsPrompt: 'Declarative word list. Read these four complete forms once each, in order: препоръчвам, препоръчваш, препоръчам, препоръчаш. Do not read abbreviations or endings alone. Flat falling intonation, no questions.', translations: { en: 'to recommend', fr: 'recommander', ar: 'يوصي', fa: 'توصیه کردن', ru: 'рекомендовать', uk: 'рекомендувати' } },
    { id: 'suglasen', bulgarian: 'съгласен, съгласна, -о, -и', ttsText: 'съгласен, съгласна, съгласно, съгласни', ttsModel: 'pro', translations: { en: 'OK with sth, in agreement', fr: 'd\'accord', ar: 'موافق', fa: 'موافق', ru: 'согласный', uk: 'згодний' } },
    { id: 'suglasyavam-se', bulgarian: 'съгласявам се, -аш / съглася се, -иш', ttsText: 'съгласявам се, съгласяваш се / съглася се, съгласиш се', ttsModel: 'pro', translations: { en: 'to agree', fr: 'être d\'accord', ar: 'يوافق', fa: 'موافقت کردن', ru: 'соглашаться', uk: 'погоджуватися' } },
    { id: 'uslovie', bulgarian: 'условие, -я', ttsText: 'условие, условия', ttsModel: 'pro', translations: { en: 'condition', fr: 'condition', ar: 'شرط', fa: 'شرط', ru: 'условие', uk: 'умова' } },
    { id: 'chudya-se', bulgarian: 'чудя се, -иш', ttsText: 'чудя се. чудиш се.', ttsModel: 'pro', ttsPrompt: 'Declarative word list. Flat, neutral tone. Falling sentence-final intonation on each form — end as if finishing a sentence. No rising or questioning tone. In „чудиш се" pronounce -иш clearly: chu-DISH se.', translations: { en: 'to wonder', fr: 'se demander', ar: 'يتساءل', fa: 'تعجب کردن', ru: 'удивляться, задаваться вопросом', uk: 'дивуватися, замислюватися' } },
    { id: 'chukam', bulgarian: 'чукам, -аш', ttsText: 'чукам, чукаш', ttsModel: 'pro', translations: { en: 'to knock', fr: 'frapper (à la porte)', ar: 'يقرع', fa: 'در زدن', ru: 'стучать', uk: 'стукати' } },
  ],

  // grammarReference — попълва се в отделна фаза (след преглед на релевантната граматика).

  // culturalNotes — за този урок НЯМА културни бележки в материалите.
};

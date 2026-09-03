import type { LessonContent } from '@/content/types';

export const content: LessonContent = {
  introduction: `В този урок ще научите как да предавате чужди думи — да кажете какво някой е казал, попитал или наредил. Ще преобразувате пряка реч в непряка: изявления („казва, че..."), въпроси („пита..., дали..., -ли") и заповеди („казва на..., да...").`,

  sections: [],

  vocabulary: [
    { id: 'granicha', bulgarian: 'гранича, -иш', ttsText: 'гранича, граничиш', ttsModel: 'pro', translations: { en: 'to border (on)', fr: 'border (avec)', ar: 'يحد', fa: 'مرز داشتن', ru: 'граничить', uk: 'межувати' } },
    { id: 'zdravets', bulgarian: 'здравец', ttsText: 'здравец', ttsModel: 'pro', translations: { en: 'geranium', fr: 'géranium', ar: 'زهر الجرanium', fa: 'گل شمعدانی', ru: 'герань', uk: 'герань' } },
    { id: 'kosmonavt', bulgarian: 'космонавт, -и', ttsText: 'космонавт, космонавти', ttsModel: 'pro', translations: { en: 'astronaut, -s', fr: 'astronaute, -s', ar: 'رائد فضاء', fa: 'فضانورد', ru: 'космонавт', uk: 'космонавт' } },
    { id: 'obsazhdam', bulgarian: 'обсъждам, -аш / обсъдя, -иш', ttsText: 'обсъждам, обсъждаш / обсъдя, обсъдиш', ttsModel: 'pro', translations: { en: 'to discuss', fr: 'discuter', ar: 'يناقش', fa: 'بحث کردن', ru: 'обсуждать / обсудить', uk: 'обговорювати / обговорити' } },
    { id: 'otdel', bulgarian: 'отдел, -и', ttsText: 'отдел, отдели', ttsModel: 'pro', translations: { en: 'department, -s', fr: 'département, -s', ar: 'قسم', fa: 'بخش', ru: 'отдел', uk: 'відділ' } },
    { id: 'programist', bulgarian: 'програмист, -и', ttsText: 'програмист, програмисти', ttsModel: 'pro', translations: { en: 'programmer, -s', fr: 'programmeur, -s', ar: 'مبرمج', fa: 'برنامه‌نویس', ru: 'программист', uk: 'програміст' } },
    {
      id: 'revolyutsioner',
      bulgarian: 'революционер, -и',
      ttsText: 'революционер. революционери.',
      ttsModel: 'pro',
      ttsPrompt:
        'Clear standard Bulgarian vocabulary. Speak the text once only: first singular революционер, then plural революционери. Plural ends with clear И — NEVER революционель / soft ь. Do not repeat either form. Once only.',
      translations: { en: 'revolutionary, -ies', fr: 'révolutionnaire, -s', ar: 'ثائر', fa: 'انقلابی', ru: 'революционер', uk: 'революціонер' },
    },
    { id: 'reshitelen', bulgarian: 'решителен, решителна, -о, -и', ttsText: 'решителен, решителна, решително, решителни', ttsModel: 'pro', translations: { en: 'determined', fr: 'déterminé(e)', ar: 'حازم', fa: 'مصمم', ru: 'решительный', uk: 'рішучий' } },
    { id: 'simvol', bulgarian: 'символ, -и', ttsText: 'символ, символи', ttsModel: 'pro', translations: { en: 'symbol, -s', fr: 'symbole, -s', ar: 'رمز', fa: 'نماد', ru: 'символ', uk: 'символ' } },
    { id: 'styuardesa', bulgarian: 'стюардеса, -и', ttsText: 'стюардеса, стюардеси', ttsModel: 'pro', translations: { en: 'flight attendant, -s', fr: 'hôtesse de l\'air', ar: 'مضيفة طيران', fa: 'مهماندار هواپیما', ru: 'стюардесса', uk: 'стюардеса' } },
    { id: 'sauchenik', bulgarian: 'съученик, съученици', ttsText: 'съученик, съученици', ttsModel: 'pro', translations: { en: 'classmate, -s', fr: 'camarade de classe', ar: 'زميل في الصف', fa: 'همکلاسی', ru: 'одноклассник', uk: 'однокласник' } },
  ],

  // grammarReference — попълва се в отделна фаза (след преглед на релевантната граматика).

  // culturalNotes — за този урок НЯМА културни бележки в материалите.
};

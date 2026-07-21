/**
 * B1-specific UI translations.
 *
 * Add keys here for B1 lesson `instructionKey` values, B1-specific grammar
 * notes, or any pre-translated string used only by B1 content. The keys are
 * merged into `UI_TRANSLATIONS` in `./ui.ts`, so `useT('b1.your.key')` just
 * works from any component. Mirrors the A2 domain (`./a2.ts`).
 *
 * Conventions:
 *  - Prefix every key with `b1.` so it can't collide with shared / a2 keys.
 *  - Always provide all 7 languages: bg, ar, fr, en, fa, uk, ru.
 *  - Order inside each entry: bg, ar, fr, en, fa, uk, ru (same as ui.ts).
 *  - Keep the file grouped by lesson — easier to scan.
 *
 * Example:
 *
 *   'b1.exercise.dragBubbleLeftOrRight': {
 *     bg: 'Плъзнете балончето наляво или надясно.',
 *     ar: '...', fr: '...', en: '...', fa: '...', uk: '...', ru: '...'
 *   },
 *
 * Used in content: `instructionKey: 'b1.exercise.dragBubbleLeftOrRight'`.
 */

import type { SupportedLang } from './languages';

export const B1_TRANSLATIONS: Record<string, Record<SupportedLang, string>> = {
  'b1.exercise.dragToMatch': {
    bg: 'Плъзнете дума от списъка върху полето, с което съвпада.',
    ar: 'اسحب كلمة من القائمة إلى الحقل المطابق لها.',
    fr: 'Faites glisser un mot de la liste vers le champ correspondant.',
    en: 'Drag a word from the list onto its matching field.',
    fa: 'یک کلمه را از فهرست به فیلد مطابق آن بکشید.',
    uk: 'Перетягніть слово зі списку до відповідного поля.',
    ru: 'Перетащите слово из списка в соответствующее поле.',
  },
  'b1.exercise.dropHere': {
    bg: '— пусни тук —',
    ar: '— أفلت هنا —',
    fr: '— déposer ici —',
    en: '— drop here —',
    fa: '— اینجا رها کنید —',
    uk: '— відпустіть тут —',
    ru: '— отпустите здесь —',
  },
  'b1.exercise.tapToSortHowTo': {
    bg: 'Как да играете:',
    ar: 'كيف تلعب:',
    fr: 'Comment jouer :',
    en: 'How to play:',
    fa: 'روش بازی:',
    uk: 'Як грати:',
    ru: 'Как играть:',
  },
  'b1.exercise.tapToSortInstruction': {
    bg: 'Натиснете дума от списъка, после натиснете групата, в която тя влиза.',
    ar: 'اضغط على كلمة من القائمة، ثم اضغط على المجموعة التي تنتمي إليها.',
    fr: 'Appuyez sur un mot de la liste, puis appuyez sur le groupe auquel il appartient.',
    en: 'Tap a word from the list, then tap the group it belongs to.',
    fa: 'روی کلمه‌ای از فهرست بزنید، سپس روی گروهی که به آن تعلق دارد بزنید.',
    uk: 'Натисніть слово зі списку, потім натисніть групу, до якої воно належить.',
    ru: 'Нажмите на слово из списка, затем нажмите на группу, к которой оно относится.',
  },
};

/**
 * A2-specific UI translations.
 *
 * Add keys here for A2 lesson `instructionKey` values, A2-specific grammar
 * notes, or any pre-translated string used only by A2 content. The keys are
 * merged into `UI_TRANSLATIONS` in `./ui.ts`, so `useT('a2.your.key')` just
 * works from any component.
 *
 * Conventions:
 *  - Prefix every key with `a2.` so it can't collide with shared keys.
 *  - Always provide all 7 languages: bg, ar, fr, en, fa, uk, ru.
 *  - Order inside each entry: bg, ar, fr, en, fa, uk, ru (same as ui.ts).
 *  - Keep the file alphabetical / grouped by lesson — easier to scan.
 *
 * Example:
 *
 *   'a2.exercise.dragBubbleLeftOrRight': {
 *     bg: 'Плъзнете балончето наляво или надясно.',
 *     ar: '...', fr: '...', en: '...', fa: '...', uk: '...', ru: '...'
 *   },
 *
 * Used in content: `instructionKey: 'a2.exercise.dragBubbleLeftOrRight'`.
 */

import type { SupportedLang } from './languages';

export const A2_TRANSLATIONS: Record<string, Record<SupportedLang, string>> = {
  // empty for now — Нина populates as needed
};

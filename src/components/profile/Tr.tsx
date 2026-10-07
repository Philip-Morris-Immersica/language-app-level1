'use client';

import { useTranslate } from '@/i18n/useTranslate';

/** Translates a Bulgarian source string into the learner's language (dynamic content mechanism). */
export function Tr({ text }: { text: string }) {
  return <>{useTranslate(text)}</>;
}

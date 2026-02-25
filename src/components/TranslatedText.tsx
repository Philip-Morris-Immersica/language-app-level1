'use client';

import { useTranslate } from '@/i18n/useTranslate';

export function TranslatedText({ text }: { text: string }) {
  const translated = useTranslate(text);
  return <>{translated}</>;
}

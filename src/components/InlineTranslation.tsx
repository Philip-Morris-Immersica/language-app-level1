'use client';

import { useTranslate } from '@/i18n/useTranslate';
import { useLanguage } from '@/i18n/LanguageContext';

interface InlineTranslationProps {
  text: string;
  visible: boolean;
  className?: string;
  translations?: Record<string, string>;
}

export function InlineTranslation({ text, visible, className, translations }: InlineTranslationProps) {
  const { lang } = useLanguage();
  const preTranslated = translations?.[lang];
  const autoTranslated = useTranslate(preTranslated ? '' : text);
  const display = preTranslated || autoTranslated;

  if (!visible || lang === 'bg') return null;

  return (
    <span className={`text-sm text-[#0279C3] font-medium mt-1 block transition-all duration-300 animate-in fade-in slide-in-from-top-1 ${className ?? ''}`}>
      {display}
    </span>
  );
}

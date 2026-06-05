import type { SupportedLang } from '@/i18n/languages';

const SPEECH_LANG_MAP: Record<SupportedLang, string> = {
  bg: 'bg-BG',
  ar: 'ar-SA',
  en: 'en-GB',
  fr: 'fr-FR',
  fa: 'fa-IR',
  uk: 'uk-UA',
  ru: 'ru-RU',
};

export function getSpeechLang(lang: SupportedLang): string {
  return SPEECH_LANG_MAP[lang] ?? 'en-GB';
}

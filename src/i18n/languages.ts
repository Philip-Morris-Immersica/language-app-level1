export type SupportedLang = 'bg' | 'ar' | 'en' | 'fr' | 'fa' | 'uk' | 'ru';

export const SUPPORTED_LANGUAGES: { code: SupportedLang; label: string; flag: string; dir: 'ltr' | 'rtl' }[] = [
  { code: 'bg', label: 'Български',  flag: '🇧🇬', dir: 'ltr' },
  { code: 'ar', label: 'العربية',    flag: '🇸🇦', dir: 'rtl' },
  { code: 'fr', label: 'Français',   flag: '🇫🇷', dir: 'ltr' },
  { code: 'en', label: 'English',    flag: '🇬🇧', dir: 'ltr' },
  { code: 'fa', label: 'فارسی',      flag: '🇮🇷', dir: 'rtl' },
  { code: 'uk', label: 'Українська', flag: '🇺🇦', dir: 'ltr' },
  { code: 'ru', label: 'Русский',    flag: '🇷🇺', dir: 'ltr' },
];

export const DEFAULT_LANG: SupportedLang = 'bg';

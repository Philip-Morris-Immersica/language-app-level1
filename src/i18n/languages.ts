export type SupportedLang = 'bg' | 'ar' | 'en' | 'fr' | 'fa' | 'uk' | 'ru';

export const SUPPORTED_LANGUAGES: { code: SupportedLang; label: string; flag: string; flagCode: string; dir: 'ltr' | 'rtl' }[] = [
  { code: 'bg', label: 'Български',  flag: '🇧🇬', flagCode: 'bg', dir: 'ltr' },
  { code: 'ar', label: 'العربية',    flag: '🇸🇦', flagCode: 'sa', dir: 'rtl' },
  { code: 'fr', label: 'Français',   flag: '🇫🇷', flagCode: 'fr', dir: 'ltr' },
  { code: 'en', label: 'English',    flag: '🇬🇧', flagCode: 'gb', dir: 'ltr' },
  { code: 'fa', label: 'فارسی',      flag: '🇮🇷', flagCode: 'ir', dir: 'rtl' },
  { code: 'uk', label: 'Українська', flag: '🇺🇦', flagCode: 'ua', dir: 'ltr' },
  { code: 'ru', label: 'Русский',    flag: '🇷🇺', flagCode: 'ru', dir: 'ltr' },
];

export const DEFAULT_LANG: SupportedLang = 'en';

import { useLanguage } from './LanguageContext';
import { UI_TRANSLATIONS } from './ui';
import type { UIKey } from './ui';

/**
 * Hook for translating static UI strings.
 * Usage: const t = useT(); t('auth.login')
 */
export function useT() {
  const { lang } = useLanguage();

  return function t(key: UIKey): string {
    const entry = UI_TRANSLATIONS[key];
    if (!entry) return key;
    return entry[lang] ?? entry['bg'] ?? key;
  };
}

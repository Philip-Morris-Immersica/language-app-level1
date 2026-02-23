'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { SupportedLang } from './languages';
import { DEFAULT_LANG } from './languages';

const STORAGE_KEY = 'app_lang';

interface LanguageContextValue {
  lang: SupportedLang;
  setLang: (lang: SupportedLang) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: DEFAULT_LANG,
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<SupportedLang>(DEFAULT_LANG);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as SupportedLang | null;
    if (stored) setLangState(stored);
  }, []);

  const setLang = (newLang: SupportedLang) => {
    setLangState(newLang);
    localStorage.setItem(STORAGE_KEY, newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

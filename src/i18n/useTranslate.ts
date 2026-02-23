'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';

const CACHE_PREFIX = 'tr_cache_';

function getCacheKey(text: string, lang: string) {
  // Simple hash to keep localStorage key short
  const hash = Array.from(text).reduce((acc, c) => (acc * 31 + c.charCodeAt(0)) & 0xffff, 0);
  return `${CACHE_PREFIX}${lang}_${hash}`;
}

async function translateText(text: string, targetLang: string): Promise<string> {
  const cacheKey = getCacheKey(text, targetLang);
  const cached = localStorage.getItem(cacheKey);
  if (cached) return cached;

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=bg&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url);
    if (!res.ok) return text;
    const data = await res.json();
    const translated: string = data[0]?.map((chunk: [string]) => chunk[0]).join('') ?? text;
    localStorage.setItem(cacheKey, translated);
    return translated;
  } catch {
    return text;
  }
}

/**
 * Hook for dynamically translating arbitrary text (exercise instructions, lesson intro).
 * Returns the original Bulgarian text while loading, then the translated version.
 * Caches results in localStorage to avoid repeated API calls.
 *
 * Usage: const translated = useTranslate(exercise.instruction);
 */
export function useTranslate(text: string): string {
  const { lang } = useLanguage();
  const [result, setResult] = useState(text);

  useEffect(() => {
    setResult(text); // Reset to original immediately on text/lang change
    if (!text || lang === 'bg') return;

    let cancelled = false;
    translateText(text, lang).then((translated) => {
      if (!cancelled) setResult(translated);
    });

    return () => { cancelled = true; };
  }, [text, lang]);

  return result;
}

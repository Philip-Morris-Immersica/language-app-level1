'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';

const CACHE_PREFIX = 'tr_cache_';

function getCacheKey(text: string, lang: string) {
  // Simple hash to keep localStorage key short
  const hash = Array.from(text).reduce((acc, c) => (acc * 31 + c.charCodeAt(0)) & 0xffff, 0);
  return `${CACHE_PREFIX}${lang}_${hash}`;
}

function postProcess(text: string, lang: string): string {
  if (lang === 'en') {
    text = text.replace(/\bi\b/g, 'I');
    text = text.replace(/\boil\b/gi, 'butter');
    text = text.replace(/\bOil\b/g, 'Butter');
    text = text.replace(/\bpercent\b/gi, 'one hundred');
    text = text.replace(/\bIrish\b/g, 'ayran');
    text = text.replace(/\bYAM\b/g, 'EAT');
    text = text.replace(/\bPIYA\b/g, 'DRINK');
    text = text.replace(/^Can the bill\?$/i, 'Can I have the bill?');
    if (/^three$/i.test(text)) text = 'ice cream';
    text = text.replace(/\blove\b/g, 'like');
    text = text.replace(/\bLove\b/g, 'Like');
    text = text.replace(/M\.Sc\./g, '(masc.)');
    text = text.replace(/\bg\.r\.\b/gi, '(fem.)');
    text = text.replace(/\bsr\.r\.\b/gi, '(neut.)');
    text = text.replace(/Mm M m Mohammed/gi, 'garlic');
    text = text.replace(/\bshop salad\b/gi, 'Shopska salad');
    text = text.replace(/\bhypermarket\b/gi, 'city');
    text = text.replace(/\bparticiple\b/gi, 'definite article');
    if (/^It doesn't like salami\.?$/i.test(text)) text = 'supermarket';
    if (/^coffee$/i.test(text)) text = 'café';
    if (/^answer the questions\.?$/i.test(text)) text = 'apartment';
    text = text.replace(/\bs\. = /gi, '');
    text = text.replace(/\bsq\. = /gi, '');
    text = text.replace(/\bEd\. number\b/gi, 'Singular');
    text = text.replace(/\bWith number\b/gi, 'Counting');
    text = text.replace(/\bBy the number of/gi, 'Counting');
  }
  return text;
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
    let translated: string = data[0]?.map((chunk: [string]) => chunk[0]).join('') ?? text;
    translated = postProcess(translated, targetLang);
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

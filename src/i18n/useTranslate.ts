'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { TRANSLATION_OVERRIDES } from './translationOverrides';
import GENERATED_TRANSLATIONS_JSON from './generated/translations.json';
import type { SupportedLang } from './languages';

// Build-time pre-translation (Фаза 4Б, scripts/pretranslate.ts) — GPT-5.5, whole
// lesson/test context + shared grammar glossary. Sits BELOW the hand-written
// TRANSLATION_OVERRIDES (which always wins when present for a given language)
// and ABOVE the live-GT emergency fallback (used only for strings the script
// hasn't covered yet, e.g. new content added after the last run).
const GENERATED_TRANSLATIONS = GENERATED_TRANSLATIONS_JSON as Record<string, Partial<Record<SupportedLang, string>>>;

// v2: bumped prefix to invalidate old entries cached under the collision-prone
// 16-bit hash below (e.g. „Не е евтино." and „Максимум: 99 точки" used to
// collide and show each other's translation).
const CACHE_PREFIX = 'tr_cache_v2_';

function getCacheKey(text: string, lang: string) {
  // 32-bit FNV-1a hash — much lower collision odds than the old 16-bit hash,
  // while still keeping the localStorage key short (unlike storing raw text).
  let hash = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  // Mix in the length too, as extra protection against short-string collisions.
  return `${CACHE_PREFIX}${lang}_${(hash >>> 0).toString(36)}_${text.length}`;
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
  // Manual, human-quality translations take priority over live Google Translate —
  // see translationOverrides.ts for why (grammar terminology, flagged mistranslations).
  // A key with no entry for this language falls through to live translation below.
  const override = TRANSLATION_OVERRIDES[text.trim()]?.[targetLang as SupportedLang];
  if (override) return override;

  const generated = GENERATED_TRANSLATIONS[text.trim()]?.[targetLang as SupportedLang];
  if (generated) return generated;

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

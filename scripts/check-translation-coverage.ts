/**
 * Read-only coverage guard: which Bulgarian display strings would still fall back
 * to LIVE Google Translate at runtime?
 *
 * Uses the SAME extraction as `scripts/pretranslate.ts` (scripts/lib/translation-fields.ts)
 * and the SAME lookup order as `src/i18n/useTranslate.ts`:
 *   TRANSLATION_OVERRIDES  →  generated/translations.json (exact, markdown-stripped,
 *   normalised lowercase for keys ≥ 12 chars).
 *
 * Usage:
 *   npm run check:translations                       # all levels, summary
 *   npm run check:translations -- --level b1         # one level
 *   npm run check:translations -- --list             # also print every missing string
 *   npm run check:translations -- --strict           # exit 1 when anything is missing
 *   npm run check:translations -- --lang en          # check one target language only (default: all 6)
 */

import fs from 'fs';
import path from 'path';
import { loadLesson, loadTest } from '@/content/registry';
import { A1_LESSONS_METADATA, A1_TEST_LOADERS } from '@/content/a1';
import { A2_LESSONS_METADATA, A2_TEST_LOADERS } from '@/content/a2';
import { B1_LESSONS_METADATA, B1_TEST_LOADERS } from '@/content/b1';
import { B2_LESSONS_METADATA, B2_TEST_LOADERS } from '@/content/b2';
import { TRANSLATION_OVERRIDES } from '@/i18n/translationOverrides';
import { extractLesson, extractTest, type ExtractedUnit } from './lib/translation-fields';

type Level = 'a1' | 'a2' | 'b1' | 'b2';
const ALL_LEVELS: Level[] = ['a1', 'a2', 'b1', 'b2'];
const TARGET_LANGS = ['en', 'ar', 'fr', 'fa', 'uk', 'ru'] as const;

const META: Record<Level, { id: string }[]> = {
  a1: A1_LESSONS_METADATA,
  a2: A2_LESSONS_METADATA,
  b1: B1_LESSONS_METADATA,
  b2: B2_LESSONS_METADATA,
};
const TESTS: Record<Level, Record<string, unknown>> = {
  a1: A1_TEST_LOADERS,
  a2: A2_TEST_LOADERS,
  b1: B1_TEST_LOADERS,
  b2: B2_TEST_LOADERS,
};

function arg(name: string): string | undefined {
  const i = process.argv.findIndex((a) => a === `--${name}` || a.startsWith(`--${name}=`));
  if (i < 0) return undefined;
  const a = process.argv[i];
  if (a.includes('=')) return a.split('=')[1];
  const next = process.argv[i + 1];
  return next && !next.startsWith('--') ? next : 'true';
}

const levelArg = arg('level') as Level | undefined;
const langArg = arg('lang');
const list = arg('list') === 'true';
const strict = arg('strict') === 'true';
const levels = levelArg ? [levelArg] : ALL_LEVELS;
const langs = langArg ? [langArg] : [...TARGET_LANGS];

type Entry = Partial<Record<string, string>>;
const dict: Record<string, Entry> = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../src/i18n/generated/translations.json'), 'utf8'),
);

// Mirrors useTranslate.ts lookup helpers.
const stripMd = (s: string) => s.replace(/\*\*(.+?)\*\*/g, '$1').replace(/__(.+?)__/g, '$1').replace(/\*(.+?)\*/g, '$1');
const norm = (s: string) => stripMd(s).toLowerCase().replace(/\s+/g, ' ').trim();
const normIndex = new Map<string, Entry>();
for (const [k, v] of Object.entries(dict)) if (k.length >= 12) normIndex.set(norm(k), v);

function covered(text: string): boolean {
  const candidates: (Entry | undefined)[] = [
    TRANSLATION_OVERRIDES[text],
    TRANSLATION_OVERRIDES[stripMd(text)],
    dict[text],
    dict[stripMd(text)],
    text.length >= 12 ? normIndex.get(norm(text)) : undefined,
  ];
  return langs.every((l) => candidates.some((c) => !!c?.[l]));
}

async function main() {
  let totalMissing = 0;
  for (const level of levels) {
    const units: ExtractedUnit[] = [];
    for (const meta of META[level]) {
      const lesson = await loadLesson(meta.id);
      if (lesson) units.push(extractLesson(meta.id, lesson));
    }
    const n = Object.keys(TESTS[level]).length;
    for (let i = 1; i <= n; i++) {
      const test = await loadTest(`test-${level}-${i}`);
      if (test) units.push(extractTest(`test-${level}-${i}`, test));
    }

    const seen = new Set<string>();
    let total = 0;
    const missing: { unit: string; text: string }[] = [];
    for (const u of units) {
      for (const text of u.allTexts) {
        if (seen.has(text)) continue;
        seen.add(text);
        total++;
        if (!covered(text)) missing.push({ unit: u.id, text });
      }
    }
    totalMissing += missing.length;
    console.log(`${level.toUpperCase()}: ${total} unique strings, ${missing.length} would fall back to live Google (${langs.join(',')})`);
    if (list) for (const m of missing) console.log(`   ${m.unit} | ${m.text.replace(/\s+/g, ' ').slice(0, 140)}`);
  }
  console.log(`\nTotal missing: ${totalMissing}`);
  if (strict && totalMissing > 0) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

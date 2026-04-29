#!/usr/bin/env tsx
/**
 * Content Quality Linter — deterministic checks over src/content/{a1,a2,b1,b2}/lessons/*.
 *
 * Runs a set of conservative rules catching the most frequent mistakes from
 * the lesson 0–7 feedback cycles. All rules emit warnings by default so the
 * linter never blocks a commit unless --strict is passed.
 *
 * Usage:
 *   tsx scripts/content-lint.ts                 # lint all lessons
 *   tsx scripts/content-lint.ts --lesson 07     # lint single lesson
 *   tsx scripts/content-lint.ts --strict        # exit 1 if any warning found
 *   tsx scripts/content-lint.ts --rule ID       # run only one rule
 *
 * Suppressing a rule in a lesson file:
 *   // content-lint-disable rule-id              (skip rule in whole file)
 *   // content-lint-disable-file                 (skip all rules in file)
 *
 * Design principles:
 *  - WARN, don't error. Let the human decide what's a real issue.
 *  - Skip silently if a rule can't be evaluated (e.g. missing field).
 *  - Point at concrete exercise IDs so the dev can jump to source.
 *  - Zero dependencies beyond what already ships with the project.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// ─── Paths ───────────────────────────────────────────────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(PROJECT_ROOT, 'src', 'content');
const LEVELS = ['a1', 'a2', 'b1', 'b2'] as const;
const PUBLIC_DIR = path.join(PROJECT_ROOT, 'public');

/** Find the lesson folder by ID across all levels. */
function findLessonDir(lessonId: string): string | null {
  for (const lvl of LEVELS) {
    const dir = path.join(CONTENT_DIR, lvl, 'lessons', lessonId);
    if (fs.existsSync(path.join(dir, 'exercises.ts'))) return dir;
  }
  return null;
}

/** List every lesson folder ({ id, dir }) across all levels with an `exercises.ts`. */
function listAllLessons(): Array<{ id: string; dir: string }> {
  const out: Array<{ id: string; dir: string }> = [];
  for (const lvl of LEVELS) {
    const lessonsDir = path.join(CONTENT_DIR, lvl, 'lessons');
    if (!fs.existsSync(lessonsDir)) continue;
    const entries = fs.readdirSync(lessonsDir);
    for (const name of entries) {
      const dir = path.join(lessonsDir, name);
      if (fs.existsSync(path.join(dir, 'exercises.ts'))) {
        out.push({ id: name, dir });
      }
    }
  }
  return out.sort((a, b) => a.id.localeCompare(b.id));
}

// ─── Colors ──────────────────────────────────────────────────────────────────
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const DIM = '\x1b[2m';
const BOLD = '\x1b[1m';
const RESET = '\x1b[0m';

// ─── Types ───────────────────────────────────────────────────────────────────
type Severity = 'warn' | 'error';
interface Finding {
  lesson: string;
  exerciseId?: string;
  rule: string;
  severity: Severity;
  message: string;
}

// ─── CLI args ────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const getArg = (name: string): string | undefined => {
  const idx = args.findIndex((a) => a === `--${name}` || a.startsWith(`--${name}=`));
  if (idx === -1) return undefined;
  const raw = args[idx];
  if (raw.includes('=')) return raw.split('=')[1];
  return args[idx + 1];
};
const hasFlag = (name: string) => args.includes(`--${name}`);

const lessonArg = getArg('lesson');
const ruleArg = getArg('rule');
const strict = hasFlag('strict');
const quiet = hasFlag('quiet');

// ─── Rule registry ───────────────────────────────────────────────────────────
type LessonContext = {
  lessonId: string;
  exercises: any[];
  workbookExercises: any[];
  fileText: string;
  disabledRules: Set<string>;
  fileDisabled: boolean;
};

type Rule = {
  id: string;
  description: string;
  run: (ctx: LessonContext) => Finding[];
};

const rules: Rule[] = [];

function defineRule(r: Rule) {
  rules.push(r);
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function finding(
  ctx: LessonContext,
  rule: string,
  severity: Severity,
  message: string,
  exerciseId?: string,
): Finding | null {
  if (ctx.fileDisabled || ctx.disabledRules.has(rule)) return null;
  return { lesson: ctx.lessonId, exerciseId, rule, severity, message };
}

function walkStrings(obj: any, visit: (value: string, keyPath: string) => void, keyPath = '') {
  if (obj == null) return;
  if (typeof obj === 'string') {
    visit(obj, keyPath);
    return;
  }
  if (Array.isArray(obj)) {
    obj.forEach((item, i) => walkStrings(item, visit, `${keyPath}[${i}]`));
    return;
  }
  if (typeof obj === 'object') {
    for (const key of Object.keys(obj)) {
      walkStrings(obj[key], visit, keyPath ? `${keyPath}.${key}` : key);
    }
  }
}

function allExercises(ctx: LessonContext) {
  return [...ctx.exercises, ...ctx.workbookExercises];
}

// ═════════════════════════════════════════════════════════════════════════════
// RULES
// ═════════════════════════════════════════════════════════════════════════════

// ─── R1: duplicate-ids ───────────────────────────────────────────────────────
defineRule({
  id: 'duplicate-ids',
  description: 'Every exercise must have a unique id within a lesson.',
  run: (ctx) => {
    const out: Finding[] = [];
    const seen = new Map<string, number>();
    for (const ex of allExercises(ctx)) {
      if (!ex?.id) continue;
      seen.set(ex.id, (seen.get(ex.id) ?? 0) + 1);
    }
    for (const [id, count] of seen) {
      if (count > 1) {
        const f = finding(ctx, 'duplicate-ids', 'error', `Duplicate exercise id "${id}" appears ${count} times.`, id);
        if (f) out.push(f);
      }
    }
    return out;
  },
});

// ─── R2: grammar-table-alignment ─────────────────────────────────────────────
// Two checks:
//  (a) If columns.length > 0: each row.cells.length must equal columns.length.
//  (b) Always: all rows must have the SAME cells.length (inter-row consistency).
//      Empty columns: [] is a valid idiom (data-only column, no header).
defineRule({
  id: 'grammar-table-alignment',
  description: 'grammar_table: row cells must match column count and be consistent across rows.',
  run: (ctx) => {
    const out: Finding[] = [];
    for (const ex of ctx.exercises) {
      if (ex?.type !== 'grammar_table') continue;
      const rows = ex.rows ?? [];
      if (rows.length === 0) continue;
      const declared = Array.isArray(ex.columns) ? ex.columns.length : undefined;
      const firstCells = rows[0]?.cells?.length ?? 0;

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const actual = row?.cells?.length ?? 0;
        // (a) Declared columns check — only when columns is non-empty.
        if (declared != null && declared > 0 && actual !== declared) {
          const f = finding(
            ctx,
            'grammar-table-alignment',
            'error',
            `Row ${i} (pronoun "${row.pronoun ?? ''}") has ${actual} cells but table declares ${declared} columns.`,
            ex.id,
          );
          if (f) out.push(f);
        }
        // (b) Inter-row consistency check.
        if (actual !== firstCells) {
          const f = finding(
            ctx,
            'grammar-table-alignment',
            'error',
            `Row ${i} (pronoun "${row.pronoun ?? ''}") has ${actual} cells but row 0 has ${firstCells}. All rows must have the same cell count.`,
            ex.id,
          );
          if (f) out.push(f);
        }
      }
    }
    return out;
  },
});

// ─── R3: image-missing ───────────────────────────────────────────────────────
defineRule({
  id: 'image-missing',
  description: 'Every non-empty imageUrl / flagUrl must resolve to a file under /public.',
  run: (ctx) => {
    const out: Finding[] = [];
    const imageFieldRegex = /(imageUrl|flagUrl|startImageUrl|endImageUrl|leftImageUrl)$/;
    for (const ex of allExercises(ctx)) {
      walkStrings(ex, (value, keyPath) => {
        if (!imageFieldRegex.test(keyPath)) return;
        if (!value) return; // empty string is allowed
        if (!value.startsWith('/assets/')) return; // external or relative — skip
        const abs = path.join(PUBLIC_DIR, value);
        if (!fs.existsSync(abs)) {
          const f = finding(
            ctx,
            'image-missing',
            'error',
            `Missing image at ${value} (field: ${keyPath}).`,
            ex.id,
          );
          if (f) out.push(f);
        }
      });
    }
    return out;
  },
});

// ─── R4: instruction-period ──────────────────────────────────────────────────
defineRule({
  id: 'instruction-period',
  description: 'Instruction should end with . ! or ?',
  run: (ctx) => {
    const out: Finding[] = [];
    for (const ex of allExercises(ctx)) {
      const instr: string | undefined = ex?.instruction;
      if (!instr) continue;
      const trimmed = instr.trim();
      if (!/[.!?](["')\]»”]+)?$/.test(trimmed)) {
        const f = finding(
          ctx,
          'instruction-period',
          'warn',
          `Instruction does not end with . ! or ? — "${trimmed.slice(-60)}"`,
          ex.id,
        );
        if (f) out.push(f);
      }
    }
    return out;
  },
});

// ─── R5: forbidden-phrases ───────────────────────────────────────────────────
// NOTE: "потърсете в речника" intentionally EXCLUDED at user's request.
defineRule({
  id: 'forbidden-phrases',
  description: 'Paper-book references should not appear in digital instructions.',
  run: (ctx) => {
    const out: Finding[] = [];
    const forbidden: { pattern: RegExp; hint: string }[] = [
      { pattern: /по\s+двойки/i, hint: 'по двойки' },
      { pattern: /на\s+хартия/i, hint: 'на хартия' },
      { pattern: /в\s+тетрадката/i, hint: 'в тетрадката' },
      { pattern: /от\s+работната\s+тетрадка/i, hint: 'от работната тетрадка' },
    ];
    for (const ex of allExercises(ctx)) {
      const texts = [ex?.instruction, ex?.subtitle, ex?.title].filter(Boolean) as string[];
      for (const t of texts) {
        for (const { pattern, hint } of forbidden) {
          if (pattern.test(t)) {
            const f = finding(
              ctx,
              'forbidden-phrases',
              'warn',
              `Contains paper-book phrase "${hint}" — "${t}"`,
              ex.id,
            );
            if (f) out.push(f);
          }
        }
      }
    }
    return out;
  },
});

// ─── R6: cyrillic-dialogue-ids ───────────────────────────────────────────────
defineRule({
  id: 'cyrillic-dialogue-ids',
  description: 'dialogues / dialogue_builder section ids must be Cyrillic letters (а., б., в.).',
  run: (ctx) => {
    const out: Finding[] = [];
    for (const ex of ctx.exercises) {
      if (ex?.type !== 'dialogues' && ex?.type !== 'dialogue_builder') continue;
      const sections: { id?: string }[] = ex.sections ?? [];
      for (const sec of sections) {
        if (!sec?.id) continue;
        if (/^[a-zA-Z]/.test(sec.id)) {
          const f = finding(
            ctx,
            'cyrillic-dialogue-ids',
            'error',
            `Section id "${sec.id}" uses Latin letter — should be Cyrillic (а., б., в.).`,
            ex.id,
          );
          if (f) out.push(f);
        }
      }
    }
    return out;
  },
});

// ─── R7: za-da-comma ─────────────────────────────────────────────────────────
defineRule({
  id: 'za-da-comma',
  description: 'Comma required before „за да" in instructions and texts.',
  run: (ctx) => {
    const out: Finding[] = [];
    // Pattern: word char or letter (not comma) + whitespace + "за да"
    const pattern = /([^\s,!?.:;«"„'])[\s]+за\s+да\b/u;
    for (const ex of allExercises(ctx)) {
      const texts: string[] = [];
      if (ex?.instruction) texts.push(ex.instruction);
      if (ex?.subtitle) texts.push(ex.subtitle);
      walkStrings(ex, (v, keyPath) => {
        if (/^(paragraphs|listeningText|sentences|questions|lines|text|correctSentence)/.test(keyPath)) {
          texts.push(v);
        }
      });
      for (const t of texts) {
        const m = pattern.exec(t);
        if (m) {
          const excerpt = t.slice(Math.max(0, m.index - 10), m.index + 20);
          const f = finding(
            ctx,
            'za-da-comma',
            'warn',
            `Missing comma before „за да" — "...${excerpt}..."`,
            ex.id,
          );
          if (f) out.push(f);
        }
      }
    }
    return out;
  },
});

// ─── R8: evrotsenta-form ─────────────────────────────────────────────────────
defineRule({
  id: 'evrotsenta-form',
  description: 'Amounts >1 should use „евроцента" not „евроцент".',
  run: (ctx) => {
    const out: Finding[] = [];
    // Match digit(s) optionally followed by decimal then "евроцент" WITHOUT trailing "а"
    // Exclude exact "1 евроцент" which is correct.
    const pattern = /(\d+(?:[,.]\d+)?)\s*евроцент(?!а)\b/gu;
    const seen = new Set<string>();
    for (const ex of allExercises(ctx)) {
      walkStrings(ex, (v) => {
        pattern.lastIndex = 0;
        let m: RegExpExecArray | null;
        while ((m = pattern.exec(v))) {
          const num = m[1];
          // "1 евроцент" is correct singular. Also skip "0.01" and similar edge cases.
          if (num === '1') continue;
          const key = `${ex.id}:${m[0]}`;
          if (seen.has(key)) continue;
          seen.add(key);
          const f = finding(
            ctx,
            'evrotsenta-form',
            'warn',
            `Expected „евроцента" after number ${num} — found "${m[0]}".`,
            ex.id,
          );
          if (f) out.push(f);
        }
      });
    }
    return out;
  },
});

// ─── R9: shuffle-laziness ────────────────────────────────────────────────────
// Validates that syllable_blocks and word_order arrays don't leave the correct
// element in first position. Does NOT verify "maximally" scrambled, just the
// most obvious mistake.
defineRule({
  id: 'shuffle-laziness',
  description: 'word_order / syllable_blocks: first array element must not match start of correct answer.',
  run: (ctx) => {
    const out: Finding[] = [];
    for (const ex of ctx.exercises) {
      if (ex?.type === 'syllable_blocks') {
        for (const puzzle of ex.puzzles ?? []) {
          const first = puzzle.syllables?.[0];
          const correct = puzzle.correctWord;
          if (!first || !correct) continue;
          if (correct.toUpperCase().startsWith(first.toUpperCase())) {
            const f = finding(
              ctx,
              'shuffle-laziness',
              'warn',
              `Puzzle "${puzzle.id}" first syllable "${first}" starts the correct word "${correct}". Scramble more.`,
              ex.id,
            );
            if (f) out.push(f);
          }
        }
      }
      if (ex?.type === 'word_order') {
        for (let qi = 0; qi < (ex.questions?.length ?? 0); qi++) {
          const q = ex.questions[qi];
          const first = q?.words?.[0];
          const correct: string = q?.correctSentence ?? '';
          if (!first || !correct) continue;
          const firstCorrectWord = correct.split(/\s+/)[0]?.replace(/[.,!?]$/, '');
          if (firstCorrectWord && firstCorrectWord.toLowerCase() === first.toLowerCase().replace(/[.,!?]$/, '')) {
            const f = finding(
              ctx,
              'shuffle-laziness',
              'warn',
              `Question ${qi + 1}: first scrambled word "${first}" matches start of "${correct}". Move it away from position 0.`,
              ex.id,
            );
            if (f) out.push(f);
          }
        }
      }
    }
    return out;
  },
});

// ─── R10: true-false-mix ─────────────────────────────────────────────────────
defineRule({
  id: 'true-false-mix',
  description: 'true_false.sentences: avoid 3+ consecutive items with same isTrue value.',
  run: (ctx) => {
    const out: Finding[] = [];
    for (const ex of allExercises(ctx)) {
      if (ex?.type !== 'true_false') continue;
      const items: { isTrue: boolean }[] = ex.sentences ?? [];
      let run = 1;
      for (let i = 1; i < items.length; i++) {
        if (items[i]?.isTrue === items[i - 1]?.isTrue) {
          run++;
          if (run >= 3) {
            const f = finding(
              ctx,
              'true-false-mix',
              'warn',
              `${run} consecutive ${items[i].isTrue ? 'true' : 'false'} items ending at index ${i}. Interleave true/false answers.`,
              ex.id,
            );
            if (f) out.push(f);
            break; // one warning per exercise is enough
          }
        } else {
          run = 1;
        }
      }
    }
    return out;
  },
});

// ─── R11: example-points-mismatch ────────────────────────────────────────────
defineRule({
  id: 'example-points-mismatch',
  description: 'workbook_fill_blank / fill_in_blank: points should equal total non-example blanks.',
  run: (ctx) => {
    const out: Finding[] = [];
    for (const ex of allExercises(ctx)) {
      if (ex?.type !== 'workbook_fill_blank' && ex?.type !== 'fill_in_blank') continue;
      if (ex?.points == null) continue;
      let blankCount = 0;
      for (const s of ex.sentences ?? []) {
        if (s?.isExample) continue;
        // blanks.length is authoritative. correctAnswers may contain multiple
        // acceptable values for a single blank (e.g. freeText mode, or synonyms
        // like „Два без четвърт." / „Два без петнайсет."), so counting
        // correctAnswers.length would overcount.
        const bl = Array.isArray(s?.blanks) ? s.blanks.length : 0;
        if (bl > 0) {
          blankCount += bl;
        } else if (Array.isArray(s?.correctAnswers) && s.correctAnswers.length > 0) {
          // Edge case: blanks missing but correctAnswers present. Count as 1.
          blankCount += 1;
        }
      }
      if (blankCount !== ex.points) {
        const f = finding(
          ctx,
          'example-points-mismatch',
          'warn',
          `Declares points=${ex.points} but counted ${blankCount} non-example blank(s).`,
          ex.id,
        );
        if (f) out.push(f);
      }
    }
    return out;
  },
});

// ─── R12: first-letter-uppercase ─────────────────────────────────────────────
defineRule({
  id: 'first-letter-uppercase',
  description: 'Full sentences (true_false, word_order, multiple_choice questions) must start with uppercase.',
  run: (ctx) => {
    const out: Finding[] = [];
    const startsLower = (s: string) => {
      const first = s.trimStart().charAt(0);
      return first && first.toLowerCase() === first && first.toUpperCase() !== first;
    };
    for (const ex of allExercises(ctx)) {
      if (ex?.type === 'true_false') {
        for (const s of ex.sentences ?? []) {
          if (s?.text && startsLower(s.text)) {
            const f = finding(
              ctx,
              'first-letter-uppercase',
              'warn',
              `true_false sentence starts with lowercase: "${s.text.slice(0, 40)}..."`,
              ex.id,
            );
            if (f) out.push(f);
          }
        }
      }
      if (ex?.type === 'word_order') {
        for (const q of ex.questions ?? []) {
          if (q?.correctSentence && startsLower(q.correctSentence)) {
            const f = finding(
              ctx,
              'first-letter-uppercase',
              'warn',
              `word_order correctSentence starts with lowercase: "${q.correctSentence.slice(0, 40)}..."`,
              ex.id,
            );
            if (f) out.push(f);
          }
        }
      }
      // multiple_choice intentionally NOT checked — "question" is often a single
      // word/phrase to match (e.g. number word "двадесет и три") where lowercase
      // is correct. Only proper sentences require uppercase.
    }
    return out;
  },
});

// ─── R13: numbers-in-listening ───────────────────────────────────────────────
defineRule({
  id: 'numbers-in-listening',
  description: 'listeningText should write digits as Bulgarian words so TTS reads them naturally.',
  run: (ctx) => {
    const out: Finding[] = [];
    for (const ex of allExercises(ctx)) {
      const lt: string | undefined = ex?.listeningText;
      if (!lt) continue;
      // Skip short numeric tokens embedded in addresses (e.g. "блок 15")
      // Warn only on standalone numbers >= 2 digits.
      const matches = lt.match(/\b\d{2,}\b/g);
      if (matches && matches.length > 0) {
        const f = finding(
          ctx,
          'numbers-in-listening',
          'warn',
          `listeningText contains digits (${matches.slice(0, 5).join(', ')}${matches.length > 5 ? ', ...' : ''}). Spell them out for TTS.`,
          ex.id,
        );
        if (f) out.push(f);
      }
    }
    return out;
  },
});

// ─── R14: verb-mismatch ──────────────────────────────────────────────────────
// Narrow rule: warn only when instruction verb clearly contradicts interaction.
defineRule({
  id: 'verb-mismatch',
  description: 'Instruction verb should match the interaction (dropdown→Изберете, drag→Подредете, etc.).',
  run: (ctx) => {
    const out: Finding[] = [];
    for (const ex of allExercises(ctx)) {
      const instr: string = ex?.instruction ?? '';
      if (!instr) continue;
      const hasNapishete = /Напишете|напишете/.test(instr);
      const hasIzberete = /Изберете|изберете/.test(instr);
      const hasPodredete = /Подредете|Влачете|Плъзнете|Разместете/.test(instr);

      // Check 1: dropdown-based exercises shouldn't tell user to "Напишете"
      if (ex?.type === 'dropdown_match' && hasNapishete && !hasIzberete) {
        const f = finding(
          ctx,
          'verb-mismatch',
          'warn',
          `dropdown_match uses "Напишете" in instruction — should say "Изберете".`,
          ex.id,
        );
        if (f) out.push(f);
      }
      // workbook_fill_blank with options on every sentence = dropdown-based
      if (ex?.type === 'workbook_fill_blank') {
        const sentences = ex.sentences ?? [];
        const allHaveOptions = sentences.length > 0 && sentences.every((s: any) => Array.isArray(s?.options) && s.options.length > 0);
        if (allHaveOptions && hasNapishete && !hasIzberete) {
          const f = finding(
            ctx,
            'verb-mismatch',
            'warn',
            `workbook_fill_blank is dropdown-based but instruction says "Напишете" — should say "Изберете".`,
            ex.id,
          );
          if (f) out.push(f);
        }
      }
      // Check 2: drag/order exercises shouldn't say "Напишете" or "Изберете" alone
      if (
        (ex?.type === 'syllable_blocks' || ex?.type === 'word_order' || ex?.type === 'dialogue_builder' || ex?.type === 'drag_to_columns') &&
        !hasPodredete &&
        (hasNapishete || hasIzberete)
      ) {
        const f = finding(
          ctx,
          'verb-mismatch',
          'warn',
          `${ex.type} should use "Подредете"/"Влачете"/"Плъзнете" — instruction currently uses ${hasNapishete ? 'Напишете' : 'Изберете'}.`,
          ex.id,
        );
        if (f) out.push(f);
      }
    }
    return out;
  },
});

// ─── R15: order-duplicates ───────────────────────────────────────────────────
// Only flags duplicate order values. Gaps are allowed (intentional skips when
// certain textbook exercises aren't digitalized, e.g. "по двойки" tasks).
defineRule({
  id: 'order-duplicates',
  description: 'order values must be unique per exercise (gaps are fine).',
  run: (ctx) => {
    const out: Finding[] = [];
    const seen = new Map<number, string[]>();
    for (const ex of ctx.exercises) {
      if (typeof ex?.order !== 'number') continue;
      if (!seen.has(ex.order)) seen.set(ex.order, []);
      seen.get(ex.order)!.push(ex.id ?? '<?>');
    }
    for (const [order, ids] of seen) {
      if (ids.length > 1) {
        const f = finding(
          ctx,
          'order-duplicates',
          'error',
          `Duplicate order=${order} used by: ${ids.join(', ')}.`,
        );
        if (f) out.push(f);
      }
    }
    return out;
  },
});

// ─── R16: dialogue-consistency (content.ts vs exercises.ts) ───────────────────
// NOTE: Skipped in v1 — would need content.ts loaded too. Add later if needed.

// ═════════════════════════════════════════════════════════════════════════════
// MAIN
// ═════════════════════════════════════════════════════════════════════════════

function parseDisabled(fileText: string) {
  const fileDisabled = /\/\/\s*content-lint-disable-file\b/.test(fileText);
  const disabledRules = new Set<string>();
  const ruleRegex = /\/\/\s*content-lint-disable\s+([a-z0-9-]+)/gi;
  let m: RegExpExecArray | null;
  while ((m = ruleRegex.exec(fileText))) {
    disabledRules.add(m[1]);
  }
  return { fileDisabled, disabledRules };
}

async function lintLesson(lessonId: string): Promise<Finding[]> {
  const dir = findLessonDir(lessonId);
  if (!dir) return [];
  const exercisesFile = path.join(dir, 'exercises.ts');
  if (!fs.existsSync(exercisesFile)) return [];

  let mod: any;
  try {
    // Dynamic import. Windows paths need file:// URL form.
    const url = 'file:///' + exercisesFile.replace(/\\/g, '/');
    mod = await import(url);
  } catch (e: any) {
    return [
      {
        lesson: lessonId,
        rule: 'module-load',
        severity: 'error',
        message: `Failed to load ${exercisesFile}: ${e?.message ?? e}`,
      },
    ];
  }

  const fileText = fs.readFileSync(exercisesFile, 'utf8');
  const { fileDisabled, disabledRules } = parseDisabled(fileText);

  const ctx: LessonContext = {
    lessonId,
    exercises: Array.isArray(mod.exercises) ? mod.exercises : [],
    workbookExercises: Array.isArray(mod.workbookExercises) ? mod.workbookExercises : [],
    fileText,
    disabledRules,
    fileDisabled,
  };

  const findings: Finding[] = [];
  for (const rule of rules) {
    if (ruleArg && rule.id !== ruleArg) continue;
    try {
      findings.push(...rule.run(ctx));
    } catch (e: any) {
      findings.push({
        lesson: lessonId,
        rule: rule.id,
        severity: 'warn',
        message: `Rule crashed: ${e?.message ?? e}`,
      });
    }
  }
  return findings;
}

function printSummary(all: Finding[]) {
  const byLesson = new Map<string, Finding[]>();
  for (const f of all) {
    if (!byLesson.has(f.lesson)) byLesson.set(f.lesson, []);
    byLesson.get(f.lesson)!.push(f);
  }
  const lessons = [...byLesson.keys()].sort();
  for (const lesson of lessons) {
    const items = byLesson.get(lesson)!;
    const errors = items.filter((i) => i.severity === 'error').length;
    const warns = items.filter((i) => i.severity === 'warn').length;
    console.log();
    console.log(`${BOLD}${CYAN}▸ ${lesson}${RESET} ${DIM}(${errors} errors, ${warns} warnings)${RESET}`);
    const byEx = new Map<string, Finding[]>();
    for (const f of items) {
      const key = f.exerciseId ?? '<lesson>';
      if (!byEx.has(key)) byEx.set(key, []);
      byEx.get(key)!.push(f);
    }
    for (const [exId, fs_] of byEx) {
      console.log(`  ${DIM}${exId}${RESET}`);
      for (const f of fs_) {
        const tag = f.severity === 'error' ? `${RED}ERROR${RESET}` : `${YELLOW}WARN ${RESET}`;
        console.log(`    ${tag} ${DIM}[${f.rule}]${RESET} ${f.message}`);
      }
    }
  }
  console.log();
  const totalErrors = all.filter((f) => f.severity === 'error').length;
  const totalWarns = all.filter((f) => f.severity === 'warn').length;
  if (totalErrors + totalWarns === 0) {
    console.log(`${GREEN}✓ Content lint clean.${RESET}`);
  } else {
    console.log(
      `${BOLD}Total:${RESET} ${totalErrors > 0 ? RED : ''}${totalErrors} errors${RESET}, ${totalWarns > 0 ? YELLOW : ''}${totalWarns} warnings${RESET}`,
    );
  }
}

async function main() {
  const lessons = listAllLessons()
    .map((entry) => entry.id)
    .filter((id) => /lesson-\d{2}$/.test(id));

  const target = lessonArg
    ? lessons.filter(
        (l) =>
          l === `lesson-${lessonArg.padStart(2, '0')}` ||
          l.endsWith(`-lesson-${lessonArg.padStart(2, '0')}`) ||
          l.endsWith(`-${lessonArg}`),
      )
    : lessons;

  if (target.length === 0) {
    console.error(`No lessons matched (arg: ${lessonArg ?? 'all'}).`);
    process.exit(1);
  }

  const all: Finding[] = [];
  for (const id of target) {
    if (!quiet) process.stdout.write(`${DIM}• Linting ${id}...${RESET}\r`);
    const f = await lintLesson(id);
    all.push(...f);
  }
  if (!quiet) process.stdout.write('\n');

  printSummary(all);

  const errors = all.filter((f) => f.severity === 'error').length;
  const warns = all.filter((f) => f.severity === 'warn').length;
  const shouldFail = errors > 0 || (strict && warns > 0);
  process.exit(shouldFail ? 1 : 0);
}

main().catch((e) => {
  console.error(`${RED}Linter crashed: ${e?.stack ?? e}${RESET}`);
  process.exit(1);
});

/**
 * Grading — single source of truth for "what did the learner do on this
 * exercise, and how much of it is correct?".
 *
 * Every consumer goes through here: test points (`lib/testScoring.ts`), lesson /
 * test / level progress (`lib/learnerProgress`), admin statistics, reports and the
 * chatbot. Keeping one implementation is what guarantees that the in-test score
 * block, the profile page and the admin panel always show the same numbers.
 *
 * Units: `total` is counted from the CONTENT (blanks, statements, questions,
 * pairs, puzzles, movable dialogue lines …), never from the saved state, so a
 * half-saved or stale state can't shrink the denominator. `correct` is read
 * from the saved state — the stored per-item validation when the component
 * keeps one (it already honours acceptableAnswers / alternates), otherwise
 * recomputed from the content.
 *
 * Framework-free on purpose: imported by server routes, scripts and client
 * components alike.
 */

import { isWordOrderAnswerCorrect } from '@/lib/wordOrder';

/**
 * Bump whenever grading rules or content-unit rules change. Cached progress
 * rows computed with an older version are recomputed on read.
 */
export const GRADING_ENGINE_VERSION = 2;

export type ExerciseKind = 'graded' | 'interactive' | 'none';

export interface ExerciseGrade {
  /** The learner checked the exercise (or, for auto-checked types, solved ≥1 item). */
  submitted: boolean;
  /** Units answered correctly in the current saved state. */
  correct: number;
  /** Units the exercise contains, counted from content. */
  total: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyEx = { id: string; type: string; points?: number; [key: string]: any };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyState = Record<string, any>;

/** Types whose body has nothing the learner can press. */
const NON_INTERACTIVE_TYPES = new Set(['b1-info-highlight']);

/** Types that save a checkable state (and therefore can be graded). */
const GRADABLE_TYPES = new Set([
  'fill_in_blank',
  'workbook_fill_blank',
  'multiple_choice',
  'match_pairs',
  'dropdown_match',
  'drag_to_columns',
  'letter_choice',
  'word_order',
  'image_labeling',
  'syllable_blocks',
  'word_search',
  'dialogue_builder',
  'fill_with_images',
  'reading_text',
  'true_false',
  'personal_choice',
  'connect_dots',
  'alphabet_maze',
  'table_fill',
  'audio_choice',
  'a2-grouped-dropdown-match',
  'a2-picture-dropdown',
  'a2-image-labeling',
  'a2-free-fill',
  'a2-match-pairs',
  'a2-drag-to-columns',
  'a2-dialogue-builder',
  'a2-word-order',
  'b1-match-pairs-dragdrop',
  'b1-sort-to-columns',
  'b1-select-words',
]);

/**
 * • graded      — has points and a checkable state; must be checked for the
 *                 lesson to count as completed
 * • interactive — anything else the learner can press (audio, cards, dialogues,
 *                 grammar with 🔊 …); counts towards progress when touched
 * • none        — nothing to press; ignored by progress
 */
export function classifyExercise(ex: AnyEx): ExerciseKind {
  if (NON_INTERACTIVE_TYPES.has(ex.type)) return 'none';
  // Flip-card vocabulary: no check button.
  if (ex.type === 'image_labeling' && ex.displayType === 'flags') return 'interactive';
  if (ex.type === 'reading_text') {
    return (ex.points ?? 0) > 0 && ex.checklist?.items?.length ? 'graded' : 'interactive';
  }
  if ((ex.points ?? 0) > 0 && GRADABLE_TYPES.has(ex.type) && contentUnits(ex) > 0) return 'graded';
  return 'interactive';
}

/**
 * Graded types that did not save answers before click tracking existed, so
 * no past learner could ever have "checked" them. They count towards progress
 * and accuracy but are not required for a lesson/test to be completed —
 * otherwise every lesson containing one would stay incomplete for everyone.
 */
export const COMPLETION_OPTIONAL_TYPES = new Set([
  'drag_to_columns',
  'a2-drag-to-columns',
  'b1-sort-to-columns',
  'reading_text',
  'personal_choice',
  'connect_dots',
  'alphabet_maze',
]);

/** Must this exercise be checked for its lesson/test to count as completed? */
export function isRequiredForCompletion(ex: AnyEx): boolean {
  return classifyExercise(ex) === 'graded' && !COMPLETION_OPTIONAL_TYPES.has(ex.type);
}

// ── Content units ────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const nonExample = <T extends { isExample?: boolean }>(arr: T[] | undefined): T[] =>
  (arr ?? []).filter((x) => !x.isExample);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function dialogueSections(ex: AnyEx): { sentences: string[]; lockFirst: boolean; alternateOrders?: string[][] }[] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (ex.sections ?? []).map((s: any) => ({
    sentences: s.sentences ?? [],
    lockFirst: s.lockFirst !== false,
    alternateOrders: s.alternateOrders,
  }));
}

function movableLines(section: { sentences: string[]; lockFirst: boolean }): number {
  return Math.max(0, section.sentences.length - (section.lockFirst ? 1 : 0));
}

/** Number of gradable units an exercise contains, counted from content. */
export function contentUnits(ex: AnyEx): number {
  switch (ex.type) {
    case 'workbook_fill_blank':
      return nonExample(ex.sentences)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .filter((s: any) => (s.blanks?.length ?? 0) > 0)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .reduce((n: number, s: any) => n + (s.correctAnswers?.length ?? 0), 0);
    case 'fill_in_blank':
      if (ex.freeTextBlocks?.length) return ex.freeTextBlocks.length;
      if (ex.freeText) return ex.sentences?.length ?? 0;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (ex.sentences ?? []).reduce((n: number, s: any) => n + (s.blanks?.length ?? 0), 0);
    case 'true_false':
      return nonExample(ex.sentences).length;
    case 'multiple_choice':
    case 'audio_choice':
    case 'word_order':
    case 'a2-word-order':
      return ex.questions?.length ?? 0;
    case 'dropdown_match':
    case 'a2-grouped-dropdown-match':
    case 'a2-picture-dropdown':
      return nonExample(ex.questions).length;
    case 'match_pairs':
    case 'a2-match-pairs':
    case 'b1-match-pairs-dragdrop':
      return ex.pairs?.length ?? 0;
    case 'image_labeling':
    case 'a2-image-labeling':
      return nonExample(ex.images).length;
    case 'letter_choice':
    case 'syllable_blocks':
      return ex.puzzles?.length ?? 0;
    case 'word_search':
      return ex.hiddenWords?.length || ex.correctWords?.length || 0;
    case 'dialogue_builder':
    case 'a2-dialogue-builder':
      return dialogueSections(ex).reduce((n, s) => n + movableLines(s), 0);
    case 'fill_with_images':
      return (ex.sentences?.length ?? 0) * 3;
    case 'table_fill': {
      let n = 0;
      for (const table of ex.tables ?? []) {
        for (const row of table.rows ?? []) {
          for (const cell of row.cells ?? []) if ((cell.options?.length ?? 0) > 1) n++;
        }
      }
      return n;
    }
    case 'drag_to_columns':
    case 'a2-drag-to-columns':
    case 'b1-sort-to-columns':
      return sortableItems(ex).length;
    case 'reading_text':
      return ex.checklist?.items?.length ?? 0;
    case 'personal_choice':
    case 'b1-select-words':
    case 'a2-free-fill':
      return (ex.items ?? ex.sentences)?.length ?? 0;
    case 'connect_dots':
    case 'alphabet_maze':
      return 1;
    default:
      return 0;
  }
}

// ── State helpers ────────────────────────────────────────────────────────────

function isObject(v: unknown): v is AnyState {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

/** Counts `true` leaves in a validation map (supports nested maps / arrays). */
function countTrue(v: unknown): number {
  if (v === true) return 1;
  if (Array.isArray(v)) return v.reduce((n: number, x) => n + countTrue(x), 0);
  if (isObject(v)) return Object.values(v).reduce((n: number, x) => n + countTrue(x), 0);
  return 0;
}

function countFalse(v: unknown): number {
  if (v === false) return 1;
  if (Array.isArray(v)) return v.reduce((n: number, x) => n + countFalse(x), 0);
  if (isObject(v)) return Object.values(v).reduce((n: number, x) => n + countFalse(x), 0);
  return 0;
}

/**
 * Correct items in a validation map keyed by item id, counting only the
 * gradable items of the current content (examples are stored as `true` by
 * some components and must not add points).
 */
function countKeyedTrue(validation: unknown, keys: string[]): number {
  if (!isObject(validation)) return 0;
  return keys.filter((k) => validation[k] === true).length;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ids = (arr: any[] | undefined): string[] => (arr ?? []).map((x) => String(x.id));

/** Column-sort items the learner places; B1 pre-places one `exampleItem` per column. */
function sortableItems(ex: AnyEx): string[] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const examples = new Set((ex.columns ?? []).map((c: any) => c.exampleItem).filter(Boolean));
  return ((ex.items ?? []) as string[]).filter((i) => !examples.has(i));
}

/** Keys the component uses in `validation`, for types keyed by item id. */
export function validationKeys(ex: AnyEx): string[] | null {
  switch (ex.type) {
    case 'dropdown_match':
    case 'a2-grouped-dropdown-match':
    case 'a2-picture-dropdown':
      return ids(nonExample(ex.questions));
    case 'image_labeling':
    case 'a2-image-labeling':
      return ids(nonExample(ex.images));
    case 'match_pairs':
    case 'a2-match-pairs':
    case 'b1-match-pairs-dragdrop':
      return ids(ex.pairs);
    case 'letter_choice':
      return ids(ex.puzzles);
    case 'drag_to_columns':
    case 'a2-drag-to-columns':
    case 'b1-sort-to-columns':
      return sortableItems(ex);
    case 'reading_text':
      return ids(ex.checklist?.items);
    case 'personal_choice':
      return ids(ex.items);
    case 'table_fill': {
      const keys: string[] = [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (ex.tables ?? []).forEach((table: any, ti: number) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (table.rows ?? []).forEach((row: any, ri: number) =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (row.cells ?? []).forEach((cell: any, ci: number) => {
            if ((cell.options?.length ?? 0) > 1) keys.push(`${ti}-${ri}-${ci}`);
          }),
        ),
      );
      return keys;
    }
    default:
      return null;
  }
}

/**
 * Type-agnostic "has the learner checked this?" — used where the exercise
 * definition isn't at hand (e.g. the save route stamping first-submit time).
 */
export function isStateSubmitted(state: unknown): boolean {
  if (!isObject(state)) return false;
  if (state.isSubmitted === true || state.checked === true || state.submitted === true) return true;
  if (state.finished === true) return true;
  if (isObject(state.sectionStates)) {
    return Object.values(state.sectionStates).some((s) => isObject(s) && s.checked === true);
  }
  if (isObject(state.completed) && Object.values(state.completed).some((v) => v === true)) return true;
  return false;
}

function hasMeaningfulLeaf(v: unknown): boolean {
  if (typeof v === 'string') return v.trim() !== '';
  if (typeof v === 'number') return true;
  if (v === true) return true;
  if (Array.isArray(v)) return v.some(hasMeaningfulLeaf);
  if (isObject(v)) return Object.values(v).some(hasMeaningfulLeaf);
  return false;
}

const ANSWER_KEYS = [
  'answers',
  'selectedAnswers',
  'matches',
  'selectedLabels',
  'slotContents',
  'picks',
  'placements',
  'checklistAnswers',
  'itemStates',
] as const;

/**
 * Did the learner actually put something into this exercise? Several
 * components save their initial (shuffled) layout on mount, so a saved row
 * alone doesn't prove a click — an answer, a move or a check does.
 */
export function hasUserInput(state: unknown): boolean {
  if (!isObject(state)) return false;
  if (isStateSubmitted(state)) return true;
  for (const key of ANSWER_KEYS) if (hasMeaningfulLeaf(state[key])) return true;
  if (Array.isArray(state.foundWords) && state.foundWords.length > 0) return true;
  if (Array.isArray(state.flippedCards) && state.flippedCards.length > 0) return true;
  if (isObject(state.flippedCards) && hasMeaningfulLeaf(state.flippedCards)) return true;
  const qs = isObject(state.questionStates) ? Object.values(state.questionStates) : state.questionStates;
  if (Array.isArray(qs)) {
    return qs.some((q) => isObject(q) && Array.isArray(q.built) && q.built.length > 0);
  }
  return false;
}

function clampGrade(submitted: boolean, correct: number, total: number): ExerciseGrade {
  return { submitted, correct: Math.max(0, Math.min(correct, total)), total };
}

// ── Grading ──────────────────────────────────────────────────────────────────

/**
 * Grade one exercise against its saved state. Returns null when there is no
 * saved state at all (the learner never interacted with a persisting part).
 */
export function gradeExercise(ex: AnyEx, rawState: unknown): ExerciseGrade | null {
  if (!isObject(rawState)) return null;
  const s = rawState;
  const total = contentUnits(ex);

  switch (ex.type) {
    case 'workbook_fill_blank': {
      const submitted = s.isSubmitted === true;
      if (!submitted) return clampGrade(false, 0, total);
      const bv = isObject(s.blankValidation) ? s.blankValidation : null;
      // Older saves kept one boolean per sentence in `validation`.
      const legacy = !bv || Object.keys(bv).length === 0 ? (isObject(s.validation) ? s.validation : {}) : null;
      if (legacy && Object.keys(legacy).length > 0 && !Object.keys(legacy).some((k) => /^\d+$/.test(k))) {
        // Saved for an earlier version of this exercise (different item ids):
        // keep the learner's share of correct answers.
        const t = countTrue(legacy);
        const all = t + countFalse(legacy);
        return clampGrade(true, all > 0 ? Math.round((t / all) * total) : 0, total);
      }
      let correct = 0;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (ex.sentences ?? []).forEach((sentence: any, idx: number) => {
        if (sentence.isExample || !(sentence.blanks?.length > 0)) return;
        if (legacy) {
          if (legacy[idx] === true) correct += sentence.correctAnswers?.length ?? 0;
          return;
        }
        const arr = bv![idx];
        if (Array.isArray(arr)) correct += arr.filter((v) => v === true).length;
        else if (arr === true) correct += sentence.correctAnswers?.length ?? 0;
      });
      return clampGrade(true, correct, total);
    }

    case 'true_false': {
      const submitted = s.checked === true;
      if (!submitted) return clampGrade(false, 0, total);
      const answers = isObject(s.answers) ? s.answers : {};
      const correct = nonExample<{ id: string; isTrue: boolean; isExample?: boolean }>(ex.sentences)
        .filter((st) => answers[st.id] != null && (answers[st.id] === 'true') === st.isTrue).length;
      return clampGrade(true, correct, total);
    }

    case 'multiple_choice':
    case 'audio_choice': {
      const submitted = s.isSubmitted === true;
      if (!submitted) return clampGrade(false, 0, total);
      // Stored validation reflects the option order the learner actually saw.
      if (isObject(s.validation) && Object.keys(s.validation).length > 0) {
        const keys = (ex.questions ?? []).map((_: unknown, i: number) => String(i));
        return clampGrade(true, countKeyedTrue(s.validation, keys), total);
      }
      const sel = isObject(s.selectedAnswers) ? s.selectedAnswers : {};
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const correct = (ex.questions ?? []).filter((q: any, i: number) => sel[i] === q.correctIndex).length;
      return clampGrade(true, correct, total);
    }

    case 'word_order':
    case 'a2-word-order': {
      const submitted = s.isSubmitted === true;
      if (!submitted) return clampGrade(false, 0, total);
      // Saved either as an array or as an object keyed "0", "1", …
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const qs: Record<number, any> = isObject(s.questionStates) || Array.isArray(s.questionStates) ? s.questionStates : {};
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const correct = (ex.questions ?? []).filter((q: any, i: number) =>
        qs[i]?.validation === true || isWordOrderAnswerCorrect(qs[i]?.built, q),
      ).length;
      return clampGrade(true, correct, total);
    }

    case 'syllable_blocks': {
      const completed = isObject(s.completed) ? s.completed : {};
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const correct = (ex.puzzles ?? []).filter((p: any) => completed[p.id] === true).length;
      return clampGrade(correct > 0, correct, total);
    }

    case 'dialogue_builder':
    case 'a2-dialogue-builder': {
      const states = isObject(s.sectionStates) ? s.sectionStates : {};
      let submitted = false;
      let correct = 0;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (ex.sections ?? []).forEach((section: any, idx: number) => {
        const st = states[section.id];
        if (!isObject(st) || st.checked !== true) return;
        submitted = true;
        const meta = dialogueSections(ex)[idx];
        const current: string[] = Array.isArray(st.items)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ? st.items.map((it: any) => (typeof it === 'string' ? it : it?.text))
          : [];
        const start = meta.lockFirst ? 1 : 0;
        const orders = [meta.sentences, ...(meta.alternateOrders ?? [])];
        let best = 0;
        for (const order of orders) {
          let hits = 0;
          for (let i = start; i < order.length; i++) if (current[i] === order[i]) hits++;
          best = Math.max(best, hits);
        }
        correct += best;
      });
      return clampGrade(submitted, correct, total);
    }

    case 'fill_with_images': {
      const submitted = s.isSubmitted === true;
      if (!submitted) return clampGrade(false, 0, total);
      const answers = isObject(s.answers) ? s.answers : {};
      const eq = (a: unknown, b: string) => typeof a === 'string' && a.toLowerCase() === b.toLowerCase();
      let correct = 0;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      for (const st of (ex.sentences ?? []) as any[]) {
        const a = isObject(answers[st.id]) ? answers[st.id] : {};
        if (eq(a.verb1, st.correctVerb1)) correct++;
        if (eq(a.verb2, st.correctVerb2)) correct++;
        if (eq(a.country, st.country)) correct++;
      }
      return clampGrade(true, correct, total);
    }

    case 'word_search': {
      const submitted = s.isSubmitted === true;
      const found: string[] = Array.isArray(s.foundWords) ? s.foundWords : [];
      const targets: string[] = ex.hiddenWords?.length ? ex.hiddenWords : ex.correctWords ?? [];
      const lower = new Set(found.map((w) => String(w).toLowerCase()));
      const correct = targets.filter((w) => lower.has(w.toLowerCase())).length;
      return clampGrade(submitted, submitted ? correct : 0, total);
    }

    case 'b1-select-words': {
      const submitted = s.submitted === true;
      if (!submitted) return clampGrade(false, 0, total);
      const picks = isObject(s.picks) ? s.picks : {};
      let correct = 0;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      for (const st of (ex.sentences ?? []) as any[]) {
        const expected = new Set<string>(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (st.words ?? []).filter((w: any) => w.correct).map((w: any) => w.text),
        );
        const picked: string[] = Array.isArray(picks[st.id]) ? picks[st.id] : [];
        if (picked.length === expected.size && picked.every((w) => expected.has(w))) correct++;
      }
      return clampGrade(true, correct, total);
    }

    case 'a2-free-fill': {
      const submitted = s.isSubmitted === true;
      if (!submitted) return clampGrade(false, 0, total);
      const answers = isObject(s.answers) ? s.answers : Array.isArray(s.answers) ? { ...s.answers } : {};
      const correct = Object.values(answers).filter((v) => typeof v === 'string' && v.trim() !== '').length;
      return clampGrade(true, correct, total);
    }

    case 'connect_dots':
    case 'alphabet_maze': {
      const done = s.finished === true;
      return clampGrade(done, done ? 1 : 0, total);
    }

    default: {
      // Components that keep a `validation` map of per-item booleans:
      // fill_in_blank, match_pairs, dropdown_match, letter_choice, image_labeling,
      // table_fill, drag_to_columns, reading_text checklist, personal_choice,
      // and the A2/B1 dropdown / labeling / match / sort variants.
      const submitted = isStateSubmitted(s);
      if (!submitted) return clampGrade(false, 0, total);
      const validation = s.validation ?? s.blankValidation;
      const keys = validationKeys(ex);
      if (keys && isObject(s.validation)) return clampGrade(true, countKeyedTrue(s.validation, keys), total);
      const correct = countTrue(validation);
      return clampGrade(true, correct, total || correct + countFalse(validation));
    }
  }
}

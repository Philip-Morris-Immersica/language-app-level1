/**
 * Completion celebrations (Duolingo-style).
 *
 * Pure, server-usable logic that turns a lesson's content into a "celebration
 * plan": which exercise closes each section, and what the learner should do
 * next. The client provider (`LessonExercisesProvider`) watches saved exercise
 * state and fires a small toast per section + a final modal at the end of the
 * "Преговор" (workbook) section.
 *
 * Gate: only lessons listed in `CELEBRATION_ENABLED_LESSONS` produce a plan;
 * every other lesson gets `null` (no-op). Data-driven, but scoped.
 */
import type { ExerciseType, LessonData } from '@/content/types';
import { getLessonLevel, getNavItemsForLevel } from '@/content';

/**
 * Lessons where completion celebrations are active. All A1 lessons after the
 * lesson-01 pilot. `lesson-00` (Азбука) is excluded: it has no `sectionStart`
 * markers and no workbook, so it can never produce a celebration.
 */
export const CELEBRATION_ENABLED_LESSONS = new Set<string>([
  'lesson-01',
  'lesson-02',
  'lesson-03',
  'lesson-04',
  'lesson-05',
  'lesson-06',
  'lesson-07',
  'lesson-08',
  'lesson-09',
  'lesson-10',
  'lesson-11',
]);

/**
 * Exercise types that are informational / reference — they have no "Провери"
 * button and never record a completion signal. Everything NOT in this set is
 * treated as an interactive/checkable exercise.
 */
const NON_CHECKABLE_TYPES = new Set<ExerciseType>([
  'illustrated_cards',
  'grammar_visual',
  'grammar_examples',
  'grammar_table',
  'dialogues',
  'reading_text',
  'personal_choice',
  // Not-yet-implemented placeholders (render as static blocks):
  'verb_conjugation',
  'number_writing',
  'dialogue_reading',
  'text_comprehension',
  'listening',
]);

/** True for exercises that have a check/submit (or live-validated) completion. */
export function isCheckableExercise(type: ExerciseType): boolean {
  return !NON_CHECKABLE_TYPES.has(type);
}

/**
 * How the client decides an exercise is "done", given its persisted state.
 * Exercise components persist heterogeneous shapes, so the trigger describes
 * which one to look for:
 *  - `isSubmitted`   — `state.isSubmitted === true` (the common case)
 *  - `allCompleted`  — `syllable_blocks`: `state.completed` has `count` true values
 *  - `allChecked`    — `dialogue_builder`: every one of `count` sections is `checked`
 */
export type DoneDescriptor =
  | { kind: 'isSubmitted' }
  | { kind: 'checked' }
  | { kind: 'allCompleted'; count: number }
  | { kind: 'allChecked'; count: number };

export interface SectionCelebration {
  /** Exercise whose completion closes the section (last checkable, in display order). */
  triggerExerciseId: string;
  done: DoneDescriptor;
  /** Stable index used for the "show once" storage key. */
  sectionIndex: number;
  /**
   * Bulgarian title of the next section (shown raw — never machine-translated).
   * Empty when the next step is the review (see `nextIsReview`).
   */
  nextLabelBg: string;
  /**
   * True when the next step is the „Преговор" (review). The client renders the
   * localized `lesson.review` UI key instead of translating the word „Преговор",
   * which Google mistranslates as „negotiate".
   */
  nextIsReview: boolean;
}

export interface FinalCelebration {
  triggerExerciseId: string;
  done: DoneDescriptor;
  /** Where the „Напред" button links (next lesson/test), or null if lesson is last. */
  nextHref: string | null;
  /** Bulgarian label for the next step, e.g. „Урок 2: Закуска" / „Тест — уроци 1, 2 и 3". */
  nextLabelBg: string | null;
}

export interface CelebrationPlan {
  lessonId: string;
  /** Bulgarian display label for the lesson, e.g. „Урок 1: Здравейте". */
  lessonLabelBg: string;
  sections: SectionCelebration[];
  final: FinalCelebration | null;
}

type AnyExercise = {
  id: string;
  type: ExerciseType;
  sectionStart?: { title?: string };
} & Record<string, unknown>;

type NavEntry =
  | { type: 'lesson'; id: string; number: number; title: string }
  | { type: 'test'; id: string; label?: string };

/** Picks the per-type "done" signal, derived from the exercise content. */
function doneDescriptorFor(ex: AnyExercise): DoneDescriptor {
  switch (ex.type) {
    case 'syllable_blocks': {
      const puzzles = ex.puzzles as unknown[] | undefined;
      return { kind: 'allCompleted', count: Array.isArray(puzzles) ? puzzles.length : 1 };
    }
    case 'dialogue_builder': {
      const sections = ex.sections as unknown[] | undefined;
      return { kind: 'allChecked', count: Array.isArray(sections) ? sections.length : 1 };
    }
    case 'true_false':
      return { kind: 'checked' };
    default:
      return { kind: 'isSubmitted' };
  }
}

/** Last checkable exercise in a list, by display (array) order. */
function lastCheckable(items: AnyExercise[]): AnyExercise | undefined {
  for (let i = items.length - 1; i >= 0; i--) {
    if (isCheckableExercise(items[i].type)) return items[i];
  }
  return undefined;
}

/** Next lesson/test in the level's ordered nav, resolved to href + Bulgarian label. */
function getNextNavTarget(lessonId: string): { href: string; label: string } | null {
  const level = getLessonLevel(lessonId);
  if (!level) return null;
  const nav = getNavItemsForLevel(level) as unknown as NavEntry[];
  const idx = nav.findIndex((n) => n.type === 'lesson' && n.id === lessonId);
  if (idx === -1 || idx + 1 >= nav.length) return null;
  const next = nav[idx + 1];
  if (next.type === 'lesson') {
    return { href: `/lessons/${next.id}`, label: `Урок ${next.number}: ${next.title}` };
  }
  return { href: `/tests/${next.id}`, label: next.label ? `Тест — ${next.label}` : 'Тест' };
}

/**
 * Builds the celebration plan for a lesson. Sections are split by `sectionStart`
 * in display (array) order; the workbook array is the final „Преговор" section.
 * Returns `null` for lessons outside the pilot.
 */
export function buildCelebrationPlan(lessonData: LessonData, lessonId: string): CelebrationPlan | null {
  if (!CELEBRATION_ENABLED_LESSONS.has(lessonId)) return null;

  const exercises = (lessonData.exercises ?? []) as unknown as AnyExercise[];

  // Group exactly like the lesson page: split at each `sectionStart`.
  const sections: { title: string; items: AnyExercise[] }[] = [];
  for (const ex of exercises) {
    const sectionStart = ex.sectionStart as { title?: string } | undefined;
    if (sectionStart) {
      sections.push({ title: sectionStart.title ?? '', items: [] });
    }
    if (sections.length > 0) {
      sections[sections.length - 1].items.push(ex);
    }
  }

  const workbook = (lessonData.workbookExercises ?? []) as unknown as AnyExercise[];
  const workbookTrigger = lastCheckable(workbook);
  const hasReview = !!workbookTrigger;

  const sectionSteps: SectionCelebration[] = [];
  let final: FinalCelebration | null = null;

  sections.forEach((sec, i) => {
    const trigger = lastCheckable(sec.items);
    if (!trigger) return;

    const isLastSection = i === sections.length - 1;

    // Without a review section, the last section IS the lesson finale.
    if (isLastSection && !hasReview) {
      const target = getNextNavTarget(lessonId);
      final = {
        triggerExerciseId: trigger.id,
        done: doneDescriptorFor(trigger),
        nextHref: target?.href ?? null,
        nextLabelBg: target?.label ?? null,
      };
      return;
    }

    const nextSection = sections[i + 1];
    const nextIsReview = !nextSection && hasReview;

    sectionSteps.push({
      triggerExerciseId: trigger.id,
      done: doneDescriptorFor(trigger),
      sectionIndex: i,
      nextLabelBg: nextSection ? nextSection.title : '',
      nextIsReview,
    });
  });

  if (hasReview && workbookTrigger) {
    const target = getNextNavTarget(lessonId);
    final = {
      triggerExerciseId: workbookTrigger.id,
      done: doneDescriptorFor(workbookTrigger),
      nextHref: target?.href ?? null,
      nextLabelBg: target?.label ?? null,
    };
  }

  const meta = lessonData as unknown as { number?: number; title?: string };
  const lessonLabelBg =
    meta.number != null && meta.title ? `Урок ${meta.number}: ${meta.title}` : (meta.title ?? '');

  return { lessonId, lessonLabelBg, sections: sectionSteps, final };
}

/** Client-side evaluation of a `DoneDescriptor` against a persisted state blob. */
export function isDone(desc: DoneDescriptor, state: unknown): boolean {
  if (!state || typeof state !== 'object') return false;
  const s = state as Record<string, unknown>;
  switch (desc.kind) {
    case 'isSubmitted':
      return s.isSubmitted === true;
    case 'checked':
      return s.checked === true;
    case 'allCompleted': {
      const completed = s.completed as Record<string, boolean> | undefined;
      if (!completed) return false;
      const trueCount = Object.values(completed).filter((v) => v === true).length;
      return trueCount >= desc.count;
    }
    case 'allChecked': {
      const sectionStates = s.sectionStates as Record<string, { checked?: boolean }> | undefined;
      if (!sectionStates) return false;
      const arr = Object.values(sectionStates);
      if (arr.length < desc.count) return false;
      return arr.every((v) => v?.checked === true);
    }
    default:
      return false;
  }
}

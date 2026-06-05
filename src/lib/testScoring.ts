/**
 * Test scoring — single source of truth for "how many points did the user
 * earn on this test exercise / section / test as a whole?"
 *
 * Used by:
 *   • TestScoreSummary.tsx (client) — to show the score block at the bottom
 *     of every test page right after the user finishes
 *   • lib/admin/userProgress.ts (server) — to expose the same numbers in
 *     the admin user-detail page and the user's own /profile page
 *
 * The shape mirrors what saved exercise states look like in the DB
 * (`exercise_states.state` JSON). When the user clicks "Провери" the
 * `validation`/`isSubmitted`/`checked` fields appear and we count points.
 *
 * IMPORTANT: keep this file framework-free (no React imports, no `'use client'`)
 * so server code can use it safely.
 */

import type { TestSection, Exercise } from '@/content/types';

/**
 * Compute the points earned on a single exercise. Returns null when the
 * user has not yet checked their answers (so the calling code can show
 * "—" instead of "0/N").
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getExerciseScore(exercise: Exercise, savedState: unknown): number | null {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const s = savedState as any;
  if (!s) return null;

  switch (exercise.type) {
    case 'true_false': {
      if (!s.checked) return null;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ex = exercise as any;
      let correct = 0;
      for (const sentence of ex.sentences) {
        if ((s.answers?.[sentence.id] === 'true') === sentence.isTrue) correct++;
      }
      return correct;
    }

    case 'workbook_fill_blank': {
      if (!s.isSubmitted) return null;
      const v = s.validation as Record<string, boolean | null> | undefined;
      if (!v) return null;
      return Object.values(v).filter(val => val === true).length;
    }

    case 'multiple_choice': {
      if (!s.isSubmitted) return null;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ex = exercise as any;
      let correct = 0;
      for (let i = 0; i < ex.questions.length; i++) {
        if (s.selectedAnswers?.[i] === ex.questions[i].correctIndex) correct++;
      }
      return correct;
    }

    case 'word_order': {
      if (!s.isSubmitted) return null;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ex = exercise as any;
      let correct = 0;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const states = s.questionStates as any[] | undefined;
      if (!states) return null;
      for (let i = 0; i < ex.questions.length; i++) {
        const qs = states[i];
        if (qs?.built?.join(' ') === ex.questions[i].correctSentence) correct++;
      }
      return correct;
    }

    case 'syllable_blocks': {
      const completed = s.completed as Record<string, boolean> | undefined;
      if (!completed) return null;
      return Object.values(completed).filter(Boolean).length;
    }

    default:
      return null;
  }
}

/**
 * Compute the score for a test section (e.g. "СЛУШАНЕ").
 *   • earned  — points the user actually got
 *   • total   — section.maxPoints (constant from content)
 *   • completed — true if every scoreable exercise has been checked
 */
export function getSectionScore(
  section: TestSection,
  savedStates: Record<string, unknown>,
): { earned: number; total: number; completed: boolean } {
  let earned = 0;
  const total = section.maxPoints;
  let allCompleted = true;

  for (const ex of section.exercises) {
    if (!ex.points || ex.points === 0) continue;
    const score = getExerciseScore(ex, savedStates[ex.id]);
    if (score === null) {
      allCompleted = false;
    } else {
      earned += score;
    }
  }

  return { earned, total, completed: allCompleted };
}

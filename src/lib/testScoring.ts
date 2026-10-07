/**
 * Test scoring — single source of truth for "how many points did the user
 * earn on this test exercise / section / test as a whole?".
 *
 * Used by:
 *   • TestScoreSummary.tsx (client) — the score block at the bottom of every test
 *   • lib/learnerProgress (server) — profile, admin user detail, level stats, reports
 *
 * Each exercise is worth exactly its `points`: the learner earns
 * `correct units ÷ total units × points` (see `lib/grading`). This keeps the
 * textbook point values even where they differ from the number of blanks, and
 * a section can never exceed its `maxPoints`.
 *
 * IMPORTANT: keep this file framework-free (no React imports, no `'use client'`)
 * so server code can use it safely.
 */

import type { TestSection, TestData, Exercise } from '@/content/types';
import { classifyExercise, gradeExercise, isRequiredForCompletion } from '@/lib/grading';

/**
 * Points earned on a single exercise (unrounded). Returns null when the
 * learner has not checked it yet, so callers can show "—" instead of "0/N".
 */
export function getExercisePoints(exercise: Exercise, savedState: unknown): number | null {
  const points = exercise.points ?? 0;
  if (points <= 0) return null;
  const grade = gradeExercise(exercise, savedState);
  if (!grade || !grade.submitted || grade.total === 0) return null;
  return (grade.correct / grade.total) * points;
}

/** Rounded variant of `getExercisePoints`. */
export function getExerciseScore(exercise: Exercise, savedState: unknown): number | null {
  const pts = getExercisePoints(exercise, savedState);
  return pts === null ? null : Math.round(pts);
}

/**
 * Score for a test section (e.g. "СЛУШАНЕ").
 *   • earned    — points the learner got (rounded once, never above `total`)
 *   • total     — section.maxPoints
 *   • completed — every exercise required for completion has been checked
 */
export function getSectionScore(
  section: TestSection,
  savedStates: Record<string, unknown>,
): { earned: number; total: number; completed: boolean; checkedCount: number; gradedCount: number } {
  const total = section.maxPoints;
  let raw = 0;
  let gradedCount = 0;
  let checkedCount = 0;

  for (const ex of section.exercises) {
    if (classifyExercise(ex) !== 'graded') continue;
    const required = isRequiredForCompletion(ex);
    if (required) gradedCount++;
    const pts = getExercisePoints(ex, savedStates[ex.id]);
    if (pts !== null) {
      if (required) checkedCount++;
      raw += pts;
    }
  }

  return {
    earned: Math.min(total, Math.round(raw)),
    total,
    completed: checkedCount === gradedCount,
    checkedCount,
    gradedCount,
  };
}

/** Whole-test score: sum of rounded section scores. */
export function getTestScore(
  test: TestData,
  savedStates: Record<string, unknown>,
): {
  earned: number;
  total: number;
  completed: boolean;
  started: boolean;
  sections: Array<{ sectionId: string; name: string } & ReturnType<typeof getSectionScore>>;
} {
  const sections = test.sections.map((section) => ({
    sectionId: section.id,
    name: section.name,
    ...getSectionScore(section, savedStates),
  }));
  return {
    earned: sections.reduce((n, s) => n + s.earned, 0),
    total: test.totalPoints,
    completed: sections.every((s) => s.completed),
    started: sections.some((s) => s.checkedCount > 0),
    sections,
  };
}

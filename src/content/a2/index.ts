/**
 * A2 level registry.
 *
 * Currently empty — A2 content will be added here as it gets digitalised.
 *
 * To add the first A2 lesson:
 *   1. Create `src/content/a2/lessons/a2-lesson-01/` with the standard five
 *      files (metadata, content, exercises, workbook, index — see
 *      `.cursor/rules/content-lessons.mdc`).
 *   2. Set its `metadata.id` to `'a2-lesson-01'` (level-prefixed; this avoids
 *      ID collisions with A1 in the database / localStorage).
 *   3. Append entries here in `A2_LESSON_LOADERS`, `A2_LESSONS_METADATA`,
 *      `A2_NAV_ITEMS`, `A2_LESSON_EXERCISE_COUNTS`.
 *   4. The lesson is automatically picked up by the global registry
 *      (`src/content/registry.ts`) and the `/lessons/:id` route.
 *
 * For tests, mirror the same pattern with `A2_TEST_LOADERS`, `A2_TEST_FOLDER_MAP`,
 * `A2_TEST_NEXT_LESSON_MAP`. Test IDs use the `test-a2-N` convention.
 *
 * IMPORTANT: shared templates, types, components, i18n, TTS scripts and the
 * full content checklist (see `.cursor/rules/content-quality-checklist.mdc`)
 * apply 1:1 to A2 — do not duplicate them per level.
 */

import type { LessonData, TestData } from '../shared/types';
import type { A1NavItem } from '../a1';

export const A2_LESSON_LOADERS: Record<
  string,
  () => Promise<{ lessonData?: LessonData; default?: LessonData }>
> = {
  // 'a2-lesson-01': () => import('./lessons/a2-lesson-01'),
};

export const A2_TEST_LOADERS: Record<
  string,
  () => Promise<{ testData?: TestData; default?: TestData }>
> = {
  // 'test-a2-1': () => import('./tests/test-a2-lessons-1-2'),
};

export const A2_LESSONS_METADATA: Array<{
  id: string;
  number: number;
  title: string;
  hasTest: boolean;
  testId?: string;
}> = [
  // { id: 'a2-lesson-01', number: 1, title: '…', hasTest: false },
];

export const A2_NAV_ITEMS: A1NavItem[] = [];

export const A2_TEST_FOLDER_MAP: Record<string, string> = {};

export const A2_TEST_NEXT_LESSON_MAP: Record<string, string> = {};

export const A2_LESSON_EXERCISE_COUNTS: Record<string, number> = {};

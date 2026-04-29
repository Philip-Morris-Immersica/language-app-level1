/**
 * B2 level registry — placeholder. See `src/content/a2/index.ts` for the pattern
 * to follow when content for this level starts. Lesson IDs use the `b2-lesson-XX`
 * prefix and test IDs use `test-b2-N`.
 */

import type { LessonData, TestData } from '../shared/types';
import type { A1NavItem } from '../a1';

export const B2_LESSON_LOADERS: Record<
  string,
  () => Promise<{ lessonData?: LessonData; default?: LessonData }>
> = {};

export const B2_TEST_LOADERS: Record<
  string,
  () => Promise<{ testData?: TestData; default?: TestData }>
> = {};

export const B2_LESSONS_METADATA: Array<{
  id: string;
  number: number;
  title: string;
  hasTest: boolean;
  testId?: string;
}> = [];

export const B2_NAV_ITEMS: A1NavItem[] = [];

export const B2_TEST_FOLDER_MAP: Record<string, string> = {};

export const B2_TEST_NEXT_LESSON_MAP: Record<string, string> = {};

export const B2_LESSON_EXERCISE_COUNTS: Record<string, number> = {};

/**
 * Public content barrel.
 *
 * - Re-exports types from `./shared/types` so `import { … } from '@/content/types'`
 *   keeps working everywhere.
 * - Re-exports navigation / metadata / loaders from `./registry`, which itself
 *   aggregates A1 / A2 / B1 / B2.
 * - Provides legacy-named helpers (navItems, getTestFolder, …) used by routes
 *   and the sidebar so we don't have to touch every consumer.
 */

export * from './shared/types';

import {
  ALL_LESSONS_METADATA,
  ALL_NAV_ITEMS_BY_LEVEL,
  ALL_TEST_FOLDER_MAP,
  ALL_TEST_NEXT_LESSON_MAP,
  ALL_LESSON_EXERCISE_COUNTS,
  type LessonMetadataEntry,
  type NavItem,
} from './registry';

export {
  loadLesson,
  loadTest,
  LESSON_LOADERS,
  TEST_LOADERS,
  LESSON_LEVEL_MAP,
  TEST_LEVEL_MAP,
  ALL_LESSON_IDS,
  LEVELS,
  type Level,
  type LessonMetadataEntry,
  type NavItem,
} from './registry';

// ── Legacy aliases (kept so existing imports keep compiling) ──────────────────

/** Lessons metadata across all configured levels. */
export const lessonsMetadata: LessonMetadataEntry[] = ALL_LESSONS_METADATA;

/**
 * Sidebar items. Today the sidebar is A1-only; we expose A1's nav items here
 * for backward-compatibility, plus a `getNavItemsForLevel(level)` helper for
 * future level-specific sidebars.
 */
export const navItems: NavItem[] = ALL_NAV_ITEMS_BY_LEVEL.a1;

export function getNavItemsForLevel(level: 'a1' | 'a2' | 'b1' | 'b2'): NavItem[] {
  return ALL_NAV_ITEMS_BY_LEVEL[level];
}

export function getLessonMetadata(lessonId: string): LessonMetadataEntry | undefined {
  return ALL_LESSONS_METADATA.find((l) => l.id === lessonId);
}

export function getPrevLesson(currentNumber: number): LessonMetadataEntry | undefined {
  return ALL_LESSONS_METADATA.find((l) => l.number === currentNumber - 1);
}

export function getNextLesson(currentNumber: number): LessonMetadataEntry | undefined {
  return ALL_LESSONS_METADATA.find((l) => l.number === currentNumber + 1);
}

export function hasTestAfterLesson(lessonNumber: number): boolean {
  return ALL_LESSONS_METADATA.find((l) => l.number === lessonNumber)?.hasTest ?? false;
}

/** Folder name on disk for a given test ID. */
export function getTestFolder(testId: string): string | undefined {
  return ALL_TEST_FOLDER_MAP[testId];
}

export function getNextLessonAfterTest(testId: string): LessonMetadataEntry | undefined {
  const nextId = ALL_TEST_NEXT_LESSON_MAP[testId];
  if (!nextId) return undefined;
  return ALL_LESSONS_METADATA.find((l) => l.id === nextId);
}

/** Total interactive exercises per lesson (used by sidebar % computation). */
export const lessonExerciseCounts: Record<string, number> = ALL_LESSON_EXERCISE_COUNTS;

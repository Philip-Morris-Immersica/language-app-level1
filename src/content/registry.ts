/**
 * Multi-level content registry.
 *
 * Source of truth for: which lessons & tests exist, which level they belong to,
 * and how to dynamically load them.
 *
 * To add a level (e.g. when colleague starts A2):
 *   1. Drop a new lesson folder under `src/content/a2/lessons/<lesson-id>/`.
 *   2. Append the lesson + its loader to A2_LESSONS / A2_LESSON_LOADERS in this file.
 *   3. The same goes for tests (A2_TESTS / A2_TEST_LOADERS).
 *
 * IMPORTANT — ID conventions, do not change for existing levels:
 *   • A1 lessons keep their historical IDs (`lesson-00` … `lesson-11`) so existing
 *     user progress in the database keeps working.
 *   • A2/B1/B2 lesson IDs are level-prefixed (e.g. `a2-lesson-01`, `b1-lesson-01`)
 *     so they never collide with A1 IDs.
 *   • Test IDs already include the level (`test-a1-1`, `test-a2-1`, …).
 */

import type { LessonData, TestData } from './shared/types';
import {
  A1_LESSON_LOADERS,
  A1_TEST_LOADERS,
  A1_LESSONS_METADATA,
  A1_NAV_ITEMS,
  A1_TEST_FOLDER_MAP,
  A1_TEST_NEXT_LESSON_MAP,
  A1_LESSON_EXERCISE_COUNTS,
  type A1NavItem,
} from './a1';
import {
  A2_LESSON_LOADERS,
  A2_TEST_LOADERS,
  A2_LESSONS_METADATA,
  A2_NAV_ITEMS,
  A2_TEST_FOLDER_MAP,
  A2_TEST_NEXT_LESSON_MAP,
  A2_LESSON_EXERCISE_COUNTS,
} from './a2';
import {
  B1_LESSON_LOADERS,
  B1_TEST_LOADERS,
  B1_LESSONS_METADATA,
  B1_NAV_ITEMS,
  B1_TEST_FOLDER_MAP,
  B1_TEST_NEXT_LESSON_MAP,
  B1_LESSON_EXERCISE_COUNTS,
} from './b1';
import {
  B2_LESSON_LOADERS,
  B2_TEST_LOADERS,
  B2_LESSONS_METADATA,
  B2_NAV_ITEMS,
  B2_TEST_FOLDER_MAP,
  B2_TEST_NEXT_LESSON_MAP,
  B2_LESSON_EXERCISE_COUNTS,
} from './b2';

export const LEVELS = ['a1', 'a2', 'b1', 'b2'] as const;
export type Level = (typeof LEVELS)[number];

export type LessonLoader = () => Promise<{ lessonData?: LessonData; default?: LessonData }>;
export type TestLoader = () => Promise<{ testData?: TestData; default?: TestData }>;

export interface LessonMetadataEntry {
  id: string;
  number: number;
  title: string;
  hasTest: boolean;
  testId?: string;
}

export type NavItem = A1NavItem;

interface LevelDef {
  level: Level;
  lessonsMetadata: LessonMetadataEntry[];
  navItems: NavItem[];
  testFolderMap: Record<string, string>;
  testNextLessonMap: Record<string, string>;
  lessonExerciseCounts: Record<string, number>;
  lessonLoaders: Record<string, LessonLoader>;
  testLoaders: Record<string, TestLoader>;
}

const LEVEL_REGISTRY: Record<Level, LevelDef> = {
  a1: {
    level: 'a1',
    lessonsMetadata: A1_LESSONS_METADATA,
    navItems: A1_NAV_ITEMS,
    testFolderMap: A1_TEST_FOLDER_MAP,
    testNextLessonMap: A1_TEST_NEXT_LESSON_MAP,
    lessonExerciseCounts: A1_LESSON_EXERCISE_COUNTS,
    lessonLoaders: A1_LESSON_LOADERS,
    testLoaders: A1_TEST_LOADERS,
  },
  a2: {
    level: 'a2',
    lessonsMetadata: A2_LESSONS_METADATA,
    navItems: A2_NAV_ITEMS,
    testFolderMap: A2_TEST_FOLDER_MAP,
    testNextLessonMap: A2_TEST_NEXT_LESSON_MAP,
    lessonExerciseCounts: A2_LESSON_EXERCISE_COUNTS,
    lessonLoaders: A2_LESSON_LOADERS,
    testLoaders: A2_TEST_LOADERS,
  },
  b1: {
    level: 'b1',
    lessonsMetadata: B1_LESSONS_METADATA,
    navItems: B1_NAV_ITEMS,
    testFolderMap: B1_TEST_FOLDER_MAP,
    testNextLessonMap: B1_TEST_NEXT_LESSON_MAP,
    lessonExerciseCounts: B1_LESSON_EXERCISE_COUNTS,
    lessonLoaders: B1_LESSON_LOADERS,
    testLoaders: B1_TEST_LOADERS,
  },
  b2: {
    level: 'b2',
    lessonsMetadata: B2_LESSONS_METADATA,
    navItems: B2_NAV_ITEMS,
    testFolderMap: B2_TEST_FOLDER_MAP,
    testNextLessonMap: B2_TEST_NEXT_LESSON_MAP,
    lessonExerciseCounts: B2_LESSON_EXERCISE_COUNTS,
    lessonLoaders: B2_LESSON_LOADERS,
    testLoaders: B2_TEST_LOADERS,
  },
};

// ── Lesson loaders & metadata, merged across all levels ───────────────────────

/** All known lesson IDs across all levels (in level order). */
export const ALL_LESSON_IDS: string[] = LEVELS.flatMap((lvl) =>
  LEVEL_REGISTRY[lvl].lessonsMetadata.map((m) => m.id),
);

/** Map of lessonId → level. */
export const LESSON_LEVEL_MAP: Record<string, Level> = (() => {
  const map: Record<string, Level> = {};
  for (const lvl of LEVELS) {
    for (const m of LEVEL_REGISTRY[lvl].lessonsMetadata) {
      map[m.id] = lvl;
    }
  }
  return map;
})();

/** Map of testId → level. */
export const TEST_LEVEL_MAP: Record<string, Level> = (() => {
  const map: Record<string, Level> = {};
  for (const lvl of LEVELS) {
    for (const id of Object.keys(LEVEL_REGISTRY[lvl].testLoaders)) {
      map[id] = lvl;
    }
  }
  return map;
})();

/** Returns the level a lesson belongs to, or `undefined` if unknown. */
export function getLessonLevel(lessonId: string): Level | undefined {
  return LESSON_LEVEL_MAP[lessonId];
}

/** Returns the level a test belongs to, or `undefined` if unknown. */
export function getTestLevel(testId: string): Level | undefined {
  return TEST_LEVEL_MAP[testId];
}

/** Returns the level def, or `undefined` if the level has no content yet. */
export function getLevelDef(level: Level): LevelDef {
  return LEVEL_REGISTRY[level];
}

/** Combined map of lessonId → loader, across all levels. */
export const LESSON_LOADERS: Record<string, LessonLoader> = (() => {
  const all: Record<string, LessonLoader> = {};
  for (const lvl of LEVELS) {
    Object.assign(all, LEVEL_REGISTRY[lvl].lessonLoaders);
  }
  return all;
})();

/** Combined map of testId → loader, across all levels. */
export const TEST_LOADERS: Record<string, TestLoader> = (() => {
  const all: Record<string, TestLoader> = {};
  for (const lvl of LEVELS) {
    Object.assign(all, LEVEL_REGISTRY[lvl].testLoaders);
  }
  return all;
})();

/**
 * Load a lesson by ID. Resolves to `null` if the ID is unknown or the module
 * failed to load (e.g. lesson is registered but its files are still missing).
 */
export async function loadLesson(lessonId: string): Promise<LessonData | null> {
  const loader = LESSON_LOADERS[lessonId];
  if (!loader) return null;
  try {
    const mod = await loader();
    return mod.default ?? mod.lessonData ?? null;
  } catch {
    return null;
  }
}

/**
 * Load a test by ID. Resolves to `null` if the ID is unknown or the module
 * failed to load.
 */
export async function loadTest(testId: string): Promise<TestData | null> {
  const loader = TEST_LOADERS[testId];
  if (!loader) return null;
  try {
    const mod = await loader();
    return mod.default ?? mod.testData ?? null;
  } catch {
    return null;
  }
}

// ── Aggregated (cross-level) helpers ──────────────────────────────────────────

export const ALL_LESSONS_METADATA: LessonMetadataEntry[] = LEVELS.flatMap(
  (lvl) => LEVEL_REGISTRY[lvl].lessonsMetadata,
);

export const ALL_NAV_ITEMS_BY_LEVEL: Record<Level, NavItem[]> = {
  a1: LEVEL_REGISTRY.a1.navItems,
  a2: LEVEL_REGISTRY.a2.navItems,
  b1: LEVEL_REGISTRY.b1.navItems,
  b2: LEVEL_REGISTRY.b2.navItems,
};

export const ALL_TEST_FOLDER_MAP: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  for (const lvl of LEVELS) Object.assign(map, LEVEL_REGISTRY[lvl].testFolderMap);
  return map;
})();

export const ALL_TEST_NEXT_LESSON_MAP: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  for (const lvl of LEVELS) Object.assign(map, LEVEL_REGISTRY[lvl].testNextLessonMap);
  return map;
})();

export const ALL_LESSON_EXERCISE_COUNTS: Record<string, number> = (() => {
  const map: Record<string, number> = {};
  for (const lvl of LEVELS) Object.assign(map, LEVEL_REGISTRY[lvl].lessonExerciseCounts);
  return map;
})();

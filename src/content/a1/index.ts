/**
 * A1 level registry.
 *
 * Source of truth for everything A1: which lessons & tests exist, how they
 * appear in the sidebar / level map, and how to load each module dynamically.
 *
 * Adding a new A1 lesson:
 *   1. Create folder `src/content/a1/lessons/lesson-XX/` with the standard
 *      five files (metadata, content, exercises, workbook, index — see
 *      `.cursor/rules/content-lessons.mdc`).
 *   2. Append an entry to `A1_LESSON_LOADERS`, `A1_LESSONS_METADATA`,
 *      `A1_NAV_ITEMS`, and `A1_LESSON_EXERCISE_COUNTS` here.
 *
 * NOTE: A1 lesson IDs intentionally do NOT carry the `a1-` prefix because
 * production users already have progress stored against `lesson-XX`. Only
 * A2/B1/B2 lesson IDs are level-prefixed.
 */

import type { LessonData, TestData } from '../shared/types';

// ── Static lesson loaders (one per lesson; Next.js can code-split each) ───────
export const A1_LESSON_LOADERS: Record<
  string,
  () => Promise<{ lessonData?: LessonData; default?: LessonData }>
> = {
  'lesson-00': () => import('./lessons/lesson-00'),
  'lesson-01': () => import('./lessons/lesson-01'),
  'lesson-02': () => import('./lessons/lesson-02'),
  'lesson-03': () => import('./lessons/lesson-03'),
  'lesson-04': () => import('./lessons/lesson-04'),
  'lesson-05': () => import('./lessons/lesson-05'),
  'lesson-06': () => import('./lessons/lesson-06'),
  'lesson-07': () => import('./lessons/lesson-07'),
  'lesson-08': () => import('./lessons/lesson-08'),
  'lesson-09': () => import('./lessons/lesson-09'),
  'lesson-10': () => import('./lessons/lesson-10'),
  'lesson-11': () => import('./lessons/lesson-11'),
};

export const A1_TEST_LOADERS: Record<
  string,
  () => Promise<{ testData?: TestData; default?: TestData }>
> = {
  'test-a1-1': () => import('./tests/test-lessons-1-2-3'),
  'test-a1-2': () => import('./tests/test-lessons-4'),
  'test-a1-3': () => import('./tests/test-lessons-5-6'),
  'test-a1-4': () => import('./tests/test-lessons-7-8'),
  'test-a1-5': () => import('./tests/test-lessons-9-10'),
};

// ── Lesson metadata (static, used by sidebar / lesson page header) ────────────
export const A1_LESSONS_METADATA = [
  { id: 'lesson-00', number: 0, title: 'Азбука', hasTest: false },
  { id: 'lesson-01', number: 1, title: 'Здравейте', hasTest: false },
  { id: 'lesson-02', number: 2, title: 'Закуска', hasTest: false },
  { id: 'lesson-03', number: 3, title: 'В ресторанта', hasTest: true, testId: 'test-a1-1' },
  { id: 'lesson-04', number: 4, title: 'В супермаркета. На пазара', hasTest: true, testId: 'test-a1-2' },
  { id: 'lesson-05', number: 5, title: 'Градът и селото', hasTest: false },
  { id: 'lesson-06', number: 6, title: 'Моето семейство', hasTest: true, testId: 'test-a1-3' },
  { id: 'lesson-07', number: 7, title: 'Времето', hasTest: false },
  { id: 'lesson-08', number: 8, title: 'Цветове и дрехи', hasTest: true, testId: 'test-a1-4' },
  { id: 'lesson-09', number: 9, title: 'Вкъщи', hasTest: false },
  { id: 'lesson-10', number: 10, title: 'На път', hasTest: true, testId: 'test-a1-5' },
  { id: 'lesson-11', number: 11, title: 'Всеки ден', hasTest: true, testId: 'test-a1-6' },
];

// ── Navigation items (sidebar) ───────────────────────────────────────────────
export type A1NavItem =
  | { type: 'special'; id: string; titleKey: string; href: string }
  | { type: 'lesson'; id: string; number: number; title: string }
  | { type: 'test'; id: string; label: string };

export const A1_NAV_ITEMS: A1NavItem[] = [
  { type: 'special', id: 'azbouka', titleKey: 'nav.alphabet', href: '/lessons/azbouka' },
  { type: 'lesson', id: 'lesson-01', number: 1, title: 'Здравейте' },
  { type: 'lesson', id: 'lesson-02', number: 2, title: 'Закуска' },
  { type: 'lesson', id: 'lesson-03', number: 3, title: 'В ресторанта' },
  { type: 'test', id: 'test-a1-1', label: 'уроци 1, 2 и 3' },
  { type: 'lesson', id: 'lesson-04', number: 4, title: 'В супермаркета. На пазара' },
  { type: 'test', id: 'test-a1-2', label: 'урок 4' },
  { type: 'lesson', id: 'lesson-05', number: 5, title: 'Градът и селото' },
  { type: 'lesson', id: 'lesson-06', number: 6, title: 'Моето семейство' },
  { type: 'test', id: 'test-a1-3', label: 'уроци 5 и 6' },
  { type: 'lesson', id: 'lesson-07', number: 7, title: 'Времето' },
  { type: 'lesson', id: 'lesson-08', number: 8, title: 'Цветове и дрехи' },
  { type: 'test', id: 'test-a1-4', label: 'уроци 7 и 8' },
  { type: 'lesson', id: 'lesson-09', number: 9, title: 'Вкъщи' },
  { type: 'lesson', id: 'lesson-10', number: 10, title: 'На път' },
  { type: 'test', id: 'test-a1-5', label: 'уроци 9 и 10' },
  { type: 'lesson', id: 'lesson-11', number: 11, title: 'Всеки ден' },
  { type: 'test', id: 'test-a1-6', label: 'урок 11' },
];

// ── testId → folder name (used by content-lint & TTS scripts) ─────────────────
export const A1_TEST_FOLDER_MAP: Record<string, string> = {
  'test-a1-1': 'test-lessons-1-2-3',
  'test-a1-2': 'test-lessons-4',
  'test-a1-3': 'test-lessons-5-6',
  'test-a1-4': 'test-lessons-7-8',
  'test-a1-5': 'test-lessons-9-10',
};

// ── testId → next lesson after the test (used for "next" navigation) ──────────
export const A1_TEST_NEXT_LESSON_MAP: Record<string, string> = {
  'test-a1-1': 'lesson-04',
  'test-a1-2': 'lesson-05',
  'test-a1-3': 'lesson-07',
  'test-a1-4': 'lesson-09',
  'test-a1-5': 'lesson-11',
};

/**
 * Total interactive exercises per lesson (exercises + workbook with points > 0).
 * Used by the sidebar to compute completion %. Update when adding lesson content.
 */
export const A1_LESSON_EXERCISE_COUNTS: Record<string, number> = {
  'lesson-00': 3,
  'lesson-01': 21,
  'lesson-02': 22,
  'lesson-03': 25,
  'lesson-04': 31,
  'lesson-05': 30,
  'lesson-06': 32,
  'lesson-07': 43,
  'lesson-08': 20,
  'lesson-09': 17,
  'lesson-10': 23,
  'lesson-11': 125,
};

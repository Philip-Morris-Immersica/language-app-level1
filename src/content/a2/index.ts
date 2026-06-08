/**
 * A2 level registry.
 *
 * The lesson titles and the test grouping below are the official A2 syllabus.
 * Each lesson / test is registered in metadata so the home page, level map
 * and sidebar render the full A2 outline; lesson modules get added one by
 * one under `src/content/a2/lessons/` and `src/content/a2/tests/`.
 *
 * To digitalise a lesson:
 *   1. Create `src/content/a2/lessons/<lesson-id>/` with the standard five
 *      files (metadata, content, exercises, workbook, index — see
 *      `.cursor/rules/content-lessons.mdc`).
 *   2. Uncomment the matching loader entry in `A2_LESSON_LOADERS`.
 *   3. Update the `A2_LESSON_EXERCISE_COUNTS` entry with the real exercise
 *      count (used by admin analytics).
 *
 * For tests, mirror the same flow with `A2_TEST_LOADERS`.
 *
 * IMPORTANT — id conventions:
 *   • A2 lesson ids are level-prefixed (`a2-lesson-XX`) so they don't collide
 *     with the historical un-prefixed A1 ids in the database / localStorage.
 *   • Test ids use the `test-a2-N` convention.
 */

import type { LessonData, TestData } from '../shared/types';
import type { A1NavItem } from '../a1';

// ── Static lesson loaders (filled in as lessons get digitalised) ──────────────
export const A2_LESSON_LOADERS: Record<
  string,
  () => Promise<{ lessonData?: LessonData; default?: LessonData }>
> = {
  'a2-lesson-00': () => import('./lessons/a2-lesson-00'),
  'a2-lesson-01': () => import('./lessons/a2-lesson-01'),
  'a2-lesson-02': () => import('./lessons/a2-lesson-02'),
  // 'a2-lesson-03': () => import('./lessons/a2-lesson-03'),
  // 'a2-lesson-04': () => import('./lessons/a2-lesson-04'),
  // 'a2-lesson-05': () => import('./lessons/a2-lesson-05'),
  // 'a2-lesson-06': () => import('./lessons/a2-lesson-06'),
  // 'a2-lesson-07': () => import('./lessons/a2-lesson-07'),
  // 'a2-lesson-08': () => import('./lessons/a2-lesson-08'),
  // 'a2-lesson-09': () => import('./lessons/a2-lesson-09'),
  // 'a2-lesson-10': () => import('./lessons/a2-lesson-10'),
};

export const A2_TEST_LOADERS: Record<
  string,
  () => Promise<{ testData?: TestData; default?: TestData }>
> = {
  'test-a2-1': () => import('./tests/test-lessons-1-2'),
  // 'test-a2-2': () => import('./tests/test-lessons-3-4'),
  // 'test-a2-3': () => import('./tests/test-lessons-5'),
  // 'test-a2-4': () => import('./tests/test-lessons-6'),
  // 'test-a2-5': () => import('./tests/test-lessons-7-8'),
  // 'test-a2-6': () => import('./tests/test-lessons-9-10'),
};

// ── Lesson metadata (used by sidebar / level map / lesson header) ─────────────
export const A2_LESSONS_METADATA: Array<{
  id: string;
  number: number;
  title: string;
  hasTest: boolean;
  testId?: string;
}> = [
  { id: 'a2-lesson-00', number: 0,  title: 'Преговор A1',                hasTest: false },
  { id: 'a2-lesson-01', number: 1,  title: 'Ало, ало!',                  hasTest: false },
  { id: 'a2-lesson-02', number: 2,  title: 'Как се чувствате?',          hasTest: true, testId: 'test-a2-1' },
  { id: 'a2-lesson-03', number: 3,  title: 'На гости',                   hasTest: false },
  { id: 'a2-lesson-04', number: 4,  title: 'Мечти и планове',            hasTest: true, testId: 'test-a2-2' },
  { id: 'a2-lesson-05', number: 5,  title: 'Услуги',                     hasTest: true, testId: 'test-a2-3' },
  { id: 'a2-lesson-06', number: 6,  title: 'Честит празник!',            hasTest: true, testId: 'test-a2-4' },
  { id: 'a2-lesson-07', number: 7,  title: 'Автобиография',              hasTest: false },
  { id: 'a2-lesson-08', number: 8,  title: 'Хоби и свободно време',      hasTest: true, testId: 'test-a2-5' },
  { id: 'a2-lesson-09', number: 9,  title: 'Най-добрият приятел',        hasTest: false },
  { id: 'a2-lesson-10', number: 10, title: 'Интервю за работа',          hasTest: true, testId: 'test-a2-6' },
];

// ── Sidebar navigation (mirrors the official A2 syllabus order) ───────────────
export const A2_NAV_ITEMS: A1NavItem[] = [
  { type: 'lesson', id: 'a2-lesson-00', number: 0,  title: 'Преговор A1' },
  { type: 'lesson', id: 'a2-lesson-01', number: 1,  title: 'Ало, ало!' },
  { type: 'lesson', id: 'a2-lesson-02', number: 2,  title: 'Как се чувствате?' },
  { type: 'test',   id: 'test-a2-1',    label: 'уроци 1 и 2' },
  { type: 'lesson', id: 'a2-lesson-03', number: 3,  title: 'На гости' },
  { type: 'lesson', id: 'a2-lesson-04', number: 4,  title: 'Мечти и планове' },
  { type: 'test',   id: 'test-a2-2',    label: 'уроци 3 и 4' },
  { type: 'lesson', id: 'a2-lesson-05', number: 5,  title: 'Услуги' },
  { type: 'test',   id: 'test-a2-3',    label: 'урок 5' },
  { type: 'lesson', id: 'a2-lesson-06', number: 6,  title: 'Честит празник!' },
  { type: 'test',   id: 'test-a2-4',    label: 'урок 6' },
  { type: 'lesson', id: 'a2-lesson-07', number: 7,  title: 'Автобиография' },
  { type: 'lesson', id: 'a2-lesson-08', number: 8,  title: 'Хоби и свободно време' },
  { type: 'test',   id: 'test-a2-5',    label: 'уроци 7 и 8' },
  { type: 'lesson', id: 'a2-lesson-09', number: 9,  title: 'Най-добрият приятел' },
  { type: 'lesson', id: 'a2-lesson-10', number: 10, title: 'Интервю за работа' },
  { type: 'test',   id: 'test-a2-6',    label: 'уроци 9 и 10' },
];

// ── testId → folder name (kept in sync as tests get digitalised) ──────────────
export const A2_TEST_FOLDER_MAP: Record<string, string> = {
  'test-a2-1': 'test-lessons-1-2',
  'test-a2-2': 'test-lessons-3-4',
  'test-a2-3': 'test-lessons-5',
  'test-a2-4': 'test-lessons-6',
  'test-a2-5': 'test-lessons-7-8',
  'test-a2-6': 'test-lessons-9-10',
};

// ── testId → next lesson after the test (drives the "next" navigation) ───────
export const A2_TEST_NEXT_LESSON_MAP: Record<string, string> = {
  'test-a2-1': 'a2-lesson-03',
  'test-a2-2': 'a2-lesson-05',
  'test-a2-3': 'a2-lesson-06',
  'test-a2-4': 'a2-lesson-07',
  'test-a2-5': 'a2-lesson-09',
  // test-a2-6 is the final A2 test — no next lesson
};

/**
 * Total interactive exercises per lesson. Filled in as lessons get
 * digitalised (used by admin analytics / sidebar % computation).
 */
export const A2_LESSON_EXERCISE_COUNTS: Record<string, number> = {
  'a2-lesson-00': 31,
  'a2-lesson-01': 26,
  'a2-lesson-02': 45,
};

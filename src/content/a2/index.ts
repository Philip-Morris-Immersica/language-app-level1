/**
 * A2 level registry.
 *
 * 10 lessons + 4 tests, following the UNHCR A2 textbook.
 * Lessons are grouped into tests as follows:
 *   test-a2-1 → lessons 1, 2, 3
 *   test-a2-2 → lessons 4, 5
 *   test-a2-3 → lessons 6, 7
 *   test-a2-4 → lessons 8, 9, 10
 *
 * ID convention: level-prefixed (`a2-lesson-01`) to avoid DB collisions with A1.
 * Test IDs: `test-a2-N`.
 *
 * To activate a lesson once its content is ready:
 *   1. Uncomment its entry in A2_LESSON_LOADERS.
 *   2. Its metadata & nav item are already registered below.
 */

import type { LessonData, TestData } from '../shared/types';
import type { A1NavItem } from '../a1';

// ── Lesson loaders ─────────────────────────────────────────────────────────────
// Uncomment each entry as the lesson content is digitalised.

export const A2_LESSON_LOADERS: Record<
  string,
  () => Promise<{ lessonData?: LessonData; default?: LessonData }>
> = {
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

// ── Test loaders ───────────────────────────────────────────────────────────────

export const A2_TEST_LOADERS: Record<
  string,
  () => Promise<{ testData?: TestData; default?: TestData }>
> = {
  // 'test-a2-1': () => import('./tests/test-a2-lessons-1-2-3'),
  // 'test-a2-2': () => import('./tests/test-a2-lessons-4-5'),
  // 'test-a2-3': () => import('./tests/test-a2-lessons-6-7'),
  // 'test-a2-4': () => import('./tests/test-a2-lessons-8-9-10'),
};

// ── Lessons metadata ───────────────────────────────────────────────────────────

export const A2_LESSONS_METADATA: Array<{
  id: string;
  number: number;
  title: string;
  hasTest: boolean;
  testId?: string;
}> = [
  { id: 'a2-lesson-01', number: 1,  title: 'Ало, ало!',               hasTest: false },
  { id: 'a2-lesson-02', number: 2,  title: 'Как се чувствате?',        hasTest: false },
  { id: 'a2-lesson-03', number: 3,  title: 'На гости',                 hasTest: true, testId: 'test-a2-1' },
  { id: 'a2-lesson-04', number: 4,  title: 'Мечти и планове',          hasTest: false },
  { id: 'a2-lesson-05', number: 5,  title: 'Услуги',                   hasTest: true, testId: 'test-a2-2' },
  { id: 'a2-lesson-06', number: 6,  title: 'Честит празник!',          hasTest: false },
  { id: 'a2-lesson-07', number: 7,  title: 'Автобиография',            hasTest: true, testId: 'test-a2-3' },
  { id: 'a2-lesson-08', number: 8,  title: 'Хоби и свободно време',    hasTest: false },
  { id: 'a2-lesson-09', number: 9,  title: 'Най-добрият приятел',      hasTest: false },
  { id: 'a2-lesson-10', number: 10, title: 'Интервю за работа',        hasTest: true, testId: 'test-a2-4' },
];

// ── Navigation items ───────────────────────────────────────────────────────────

export const A2_NAV_ITEMS: A1NavItem[] = [
  { type: 'special', id: 'pregovor-a1', titleKey: 'nav.reviewA1', href: '/lessons/pregovor-a1' },
  { type: 'lesson', id: 'a2-lesson-01', number: 1,  title: 'Ало, ало!' },
  { type: 'lesson', id: 'a2-lesson-02', number: 2,  title: 'Как се чувствате?' },
  { type: 'lesson', id: 'a2-lesson-03', number: 3,  title: 'На гости' },
  { type: 'test',   id: 'test-a2-1',    label: 'уроци 1, 2 и 3' },
  { type: 'lesson', id: 'a2-lesson-04', number: 4,  title: 'Мечти и планове' },
  { type: 'lesson', id: 'a2-lesson-05', number: 5,  title: 'Услуги' },
  { type: 'test',   id: 'test-a2-2',    label: 'уроци 4 и 5' },
  { type: 'lesson', id: 'a2-lesson-06', number: 6,  title: 'Честит празник!' },
  { type: 'lesson', id: 'a2-lesson-07', number: 7,  title: 'Автобиография' },
  { type: 'test',   id: 'test-a2-3',    label: 'уроци 6 и 7' },
  { type: 'lesson', id: 'a2-lesson-08', number: 8,  title: 'Хоби и свободно време' },
  { type: 'lesson', id: 'a2-lesson-09', number: 9,  title: 'Най-добрият приятел' },
  { type: 'lesson', id: 'a2-lesson-10', number: 10, title: 'Интервю за работа' },
  { type: 'test',   id: 'test-a2-4',    label: 'уроци 8, 9 и 10' },
];

// ── Test → folder name map ─────────────────────────────────────────────────────

export const A2_TEST_FOLDER_MAP: Record<string, string> = {
  'test-a2-1': 'test-a2-lessons-1-2-3',
  'test-a2-2': 'test-a2-lessons-4-5',
  'test-a2-3': 'test-a2-lessons-6-7',
  'test-a2-4': 'test-a2-lessons-8-9-10',
};

// ── Test → next lesson map ─────────────────────────────────────────────────────

export const A2_TEST_NEXT_LESSON_MAP: Record<string, string> = {
  'test-a2-1': 'a2-lesson-04',
  'test-a2-2': 'a2-lesson-06',
  'test-a2-3': 'a2-lesson-08',
};

// ── Exercise counts (filled in as lessons are digitalised) ─────────────────────

export const A2_LESSON_EXERCISE_COUNTS: Record<string, number> = {
  'a2-lesson-01': 26,
  'a2-lesson-02': 45,
  'a2-lesson-03': 0,
  'a2-lesson-04': 0,
  'a2-lesson-05': 0,
  'a2-lesson-06': 0,
  'a2-lesson-07': 0,
  'a2-lesson-08': 0,
  'a2-lesson-09': 0,
  'a2-lesson-10': 0,
};

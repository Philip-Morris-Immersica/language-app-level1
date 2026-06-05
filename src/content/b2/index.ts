/**
 * B2 level registry.
 *
 * The lesson titles below are the official B2 syllabus. Loaders are
 * intentionally empty — each lesson is registered in metadata so the home
 * page, level map and sidebar can already render the full B2 outline, but
 * the actual lesson modules will be added one by one under
 * `src/content/b2/lessons/`.
 *
 * To digitalise a lesson:
 *   1. Create `src/content/b2/lessons/<lesson-id>/` with the standard five
 *      files (see `.cursor/rules/content-lessons.mdc`).
 *   2. Uncomment the matching loader entry in `B2_LESSON_LOADERS`.
 *   3. Update the `B2_LESSON_EXERCISE_COUNTS` entry with the real exercise
 *      count.
 *
 * IMPORTANT — id conventions:
 *   • B2 lesson ids are level-prefixed (`b2-lesson-XX`).
 *   • Test ids use the `test-b2-N` convention (tests will be added later as
 *     the B2 syllabus is finalised).
 */

import type { LessonData, TestData } from '../shared/types';
import type { A1NavItem } from '../a1';

export const B2_LESSON_LOADERS: Record<
  string,
  () => Promise<{ lessonData?: LessonData; default?: LessonData }>
> = {
  // 'b2-lesson-01': () => import('./lessons/b2-lesson-01'),
  // ...
};

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
}> = [
  { id: 'b2-lesson-01', number: 1,  title: 'Природа',                          hasTest: false },
  { id: 'b2-lesson-02', number: 2,  title: 'Да бъдем здрави!',                 hasTest: false },
  { id: 'b2-lesson-03', number: 3,  title: 'Паметници на ЮНЕСКО в България',   hasTest: false },
  { id: 'b2-lesson-04', number: 4,  title: 'Хора',                             hasTest: false },
  { id: 'b2-lesson-05', number: 5,  title: 'Работа',                           hasTest: false },
  { id: 'b2-lesson-06', number: 6,  title: 'Приятели',                         hasTest: false },
  { id: 'b2-lesson-07', number: 7,  title: 'Новини и медии',                   hasTest: false },
  { id: 'b2-lesson-08', number: 8,  title: 'Ваканции и развлечения',           hasTest: false },
  { id: 'b2-lesson-09', number: 9,  title: 'Мечти',                            hasTest: false },
  { id: 'b2-lesson-10', number: 10, title: 'История на България',              hasTest: false },
];

export const B2_NAV_ITEMS: A1NavItem[] = [
  { type: 'lesson', id: 'b2-lesson-01', number: 1,  title: 'Природа' },
  { type: 'lesson', id: 'b2-lesson-02', number: 2,  title: 'Да бъдем здрави!' },
  { type: 'lesson', id: 'b2-lesson-03', number: 3,  title: 'Паметници на ЮНЕСКО в България' },
  { type: 'lesson', id: 'b2-lesson-04', number: 4,  title: 'Хора' },
  { type: 'lesson', id: 'b2-lesson-05', number: 5,  title: 'Работа' },
  { type: 'lesson', id: 'b2-lesson-06', number: 6,  title: 'Приятели' },
  { type: 'lesson', id: 'b2-lesson-07', number: 7,  title: 'Новини и медии' },
  { type: 'lesson', id: 'b2-lesson-08', number: 8,  title: 'Ваканции и развлечения' },
  { type: 'lesson', id: 'b2-lesson-09', number: 9,  title: 'Мечти' },
  { type: 'lesson', id: 'b2-lesson-10', number: 10, title: 'История на България' },
];

export const B2_TEST_FOLDER_MAP: Record<string, string> = {};

export const B2_TEST_NEXT_LESSON_MAP: Record<string, string> = {};

export const B2_LESSON_EXERCISE_COUNTS: Record<string, number> = {};

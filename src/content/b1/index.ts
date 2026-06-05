/**
 * B1 level registry.
 *
 * The lesson titles below are the official B1 syllabus. Loaders are
 * intentionally empty — each lesson is registered in metadata so the home
 * page, level map and sidebar can already render the full B1 outline, but
 * the actual lesson modules will be added one by one under
 * `src/content/b1/lessons/`.
 *
 * To digitalise a lesson:
 *   1. Create `src/content/b1/lessons/<lesson-id>/` with the standard five
 *      files (see `.cursor/rules/content-lessons.mdc`).
 *   2. Uncomment the matching loader entry in `B1_LESSON_LOADERS`.
 *   3. Update the `B1_LESSON_EXERCISE_COUNTS` entry with the real exercise
 *      count.
 *
 * IMPORTANT — id conventions:
 *   • B1 lesson ids are level-prefixed (`b1-lesson-XX`).
 *   • Test ids use the `test-b1-N` convention (tests will be added later as
 *     the B1 syllabus is finalised).
 */

import type { LessonData, TestData } from '../shared/types';
import type { A1NavItem } from '../a1';

export const B1_LESSON_LOADERS: Record<
  string,
  () => Promise<{ lessonData?: LessonData; default?: LessonData }>
> = {
  // 'b1-lesson-01': () => import('./lessons/b1-lesson-01'),
  // 'b1-lesson-02': () => import('./lessons/b1-lesson-02'),
  // ...
};

export const B1_TEST_LOADERS: Record<
  string,
  () => Promise<{ testData?: TestData; default?: TestData }>
> = {};

export const B1_LESSONS_METADATA: Array<{
  id: string;
  number: number;
  title: string;
  hasTest: boolean;
  testId?: string;
}> = [
  { id: 'b1-lesson-01', number: 1,  title: 'Животът в града и на село', hasTest: false },
  { id: 'b1-lesson-02', number: 2,  title: 'Моят любим актьор',         hasTest: false },
  { id: 'b1-lesson-03', number: 3,  title: 'Ежедневието ни',            hasTest: false },
  { id: 'b1-lesson-04', number: 4,  title: 'Преди години',              hasTest: false },
  { id: 'b1-lesson-05', number: 5,  title: 'Къде си бил?',              hasTest: false },
  { id: 'b1-lesson-06', number: 6,  title: 'Ние се обичаме',            hasTest: false },
  { id: 'b1-lesson-07', number: 7,  title: 'Трябва ми почивка',         hasTest: false },
  { id: 'b1-lesson-08', number: 8,  title: 'Щях да пътувам',            hasTest: false },
  { id: 'b1-lesson-09', number: 9,  title: 'Всичко ще бъде наред',      hasTest: false },
  { id: 'b1-lesson-10', number: 10, title: 'Ти какво каза?',            hasTest: false },
  { id: 'b1-lesson-11', number: 11, title: 'Познавам и обичам България', hasTest: false },
];

export const B1_NAV_ITEMS: A1NavItem[] = [
  { type: 'lesson', id: 'b1-lesson-01', number: 1,  title: 'Животът в града и на село' },
  { type: 'lesson', id: 'b1-lesson-02', number: 2,  title: 'Моят любим актьор' },
  { type: 'lesson', id: 'b1-lesson-03', number: 3,  title: 'Ежедневието ни' },
  { type: 'lesson', id: 'b1-lesson-04', number: 4,  title: 'Преди години' },
  { type: 'lesson', id: 'b1-lesson-05', number: 5,  title: 'Къде си бил?' },
  { type: 'lesson', id: 'b1-lesson-06', number: 6,  title: 'Ние се обичаме' },
  { type: 'lesson', id: 'b1-lesson-07', number: 7,  title: 'Трябва ми почивка' },
  { type: 'lesson', id: 'b1-lesson-08', number: 8,  title: 'Щях да пътувам' },
  { type: 'lesson', id: 'b1-lesson-09', number: 9,  title: 'Всичко ще бъде наред' },
  { type: 'lesson', id: 'b1-lesson-10', number: 10, title: 'Ти какво каза?' },
  { type: 'lesson', id: 'b1-lesson-11', number: 11, title: 'Познавам и обичам България' },
];

export const B1_TEST_FOLDER_MAP: Record<string, string> = {};

export const B1_TEST_NEXT_LESSON_MAP: Record<string, string> = {};

export const B1_LESSON_EXERCISE_COUNTS: Record<string, number> = {};

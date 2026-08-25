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
  'b1-lesson-01': () => import('./lessons/b1-lesson-01'),
  'b1-lesson-02': () => import('./lessons/b1-lesson-02'),
  'b1-lesson-03': () => import('./lessons/b1-lesson-03'),
  'b1-lesson-04': () => import('./lessons/b1-lesson-04'),
  'b1-lesson-05': () => import('./lessons/b1-lesson-05'),
  'b1-lesson-06': () => import('./lessons/b1-lesson-06'),
  'b1-lesson-07': () => import('./lessons/b1-lesson-07'),
  'b1-lesson-08': () => import('./lessons/b1-lesson-08'),
  'b1-lesson-09': () => import('./lessons/b1-lesson-09'),
  'b1-lesson-10': () => import('./lessons/b1-lesson-10'),
  // 'b1-lesson-11': () => import('./lessons/b1-lesson-11'),
  // 'b1-lesson-12': () => import('./lessons/b1-lesson-12'),
  // 'b1-lesson-13': () => import('./lessons/b1-lesson-13'),
  // 'b1-lesson-14': () => import('./lessons/b1-lesson-14'),
  // 'b1-lesson-15': () => import('./lessons/b1-lesson-15'),
};

export const B1_TEST_LOADERS: Record<
  string,
  () => Promise<{ testData?: TestData; default?: TestData }>
> = {
  // 'test-b1-1': () => import('./tests/test-b1-1'),
};

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
  { id: 'b1-lesson-10', number: 10, title: 'Ти какво каза?',                                    hasTest: false },
  { id: 'b1-lesson-11', number: 11, title: 'Природата и географията на България',               hasTest: false },
  { id: 'b1-lesson-12', number: 12, title: 'Древните корени: траки, славяни и прабългари',      hasTest: false },
  { id: 'b1-lesson-13', number: 13, title: 'Първата българска държава и Златният век',          hasTest: false },
  { id: 'b1-lesson-14', number: 14, title: 'Втората българска държава и Възраждането',          hasTest: false },
  { id: 'b1-lesson-15', number: 15, title: 'Големите българи',                                  hasTest: true, testId: 'test-b1-1' },
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
  { type: 'lesson', id: 'b1-lesson-11', number: 11, title: 'Природата и географията на България' },
  { type: 'lesson', id: 'b1-lesson-12', number: 12, title: 'Древните корени: траки, славяни и прабългари' },
  { type: 'lesson', id: 'b1-lesson-13', number: 13, title: 'Първата българска държава и Златният век' },
  { type: 'lesson', id: 'b1-lesson-14', number: 14, title: 'Втората българска държава и Възраждането' },
  { type: 'lesson', id: 'b1-lesson-15', number: 15, title: 'Големите българи' },
  { type: 'test', id: 'test-b1-1', label: 'уроци 11–15' },
];

export const B1_TEST_FOLDER_MAP: Record<string, string> = {
  'test-b1-1': 'test-lessons-11-15',
};

export const B1_TEST_NEXT_LESSON_MAP: Record<string, string> = {};

export const B1_LESSON_EXERCISE_COUNTS: Record<string, number> = {
  'b1-lesson-01': 19,
  'b1-lesson-02': 14,
  'b1-lesson-03': 18,
  'b1-lesson-04': 10,
  'b1-lesson-05': 21,
  'b1-lesson-06': 7,
  'b1-lesson-07': 24,
  'b1-lesson-08': 13,
  'b1-lesson-09': 31,
  'b1-lesson-10': 8,
};

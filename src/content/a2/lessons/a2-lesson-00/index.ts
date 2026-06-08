import { metadata } from './metadata';
import { content } from './content';
import { exercises } from './exercises';
import { workbookExercises } from './workbook';
import type { LessonData } from '@/content/types';

export const lessonData: LessonData = {
  ...metadata,
  content,
  exercises,
  workbookExercises,
};

export default lessonData;

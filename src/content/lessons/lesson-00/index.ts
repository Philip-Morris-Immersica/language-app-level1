import type { LessonData } from '@/content/types';
import { metadata } from './metadata';
import { content } from './content';
import { workbookExercises } from './workbook';
import { exercises } from './exercises';

export const lessonData: LessonData = {
  ...metadata,
  content,
  exercises,
  workbookExercises,
};

export default lessonData;

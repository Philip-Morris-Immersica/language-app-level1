import type { TestData } from '@/content/types';
import { metadata } from './metadata';
import {
  listeningExercises,
  readingExercises,
  grammarExercises,
  writingExercises,
} from './exercises';

export const testData: TestData = {
  ...metadata,
  sections: [
    { id: 'listening', name: 'КОМПОНЕНТ СЛУШАНЕ', maxPoints: 8, exercises: listeningExercises },
    { id: 'reading', name: 'КОМПОНЕНТ ЧЕТЕНЕ', maxPoints: 11, exercises: readingExercises },
    { id: 'grammar', name: 'КОМПОНЕНТ ГРАМАТИКА', maxPoints: 63, exercises: grammarExercises },
    { id: 'writing', name: 'КОМПОНЕНТ ПИСАНЕ', maxPoints: 17, exercises: writingExercises },
  ],
};

export default testData;

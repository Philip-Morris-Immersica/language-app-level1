import type { TestData } from '@/content/types';
import { metadata } from './metadata';
import {
  listeningExercises,
  readingExercises,
  grammarExercises,
} from './exercises';

export const testData: TestData = {
  ...metadata,
  sections: [
    { id: 'listening', name: 'СЛУШАНЕ',   maxPoints: 11, exercises: listeningExercises },
    { id: 'reading',   name: 'ЧЕТЕНЕ',    maxPoints: 12, exercises: readingExercises   },
    { id: 'grammar',   name: 'ГРАМАТИКА', maxPoints: 48, exercises: grammarExercises   },
  ],
};

export default testData;

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
    { id: 'listening', name: 'СЛУШАНЕ',   maxPoints: 9,  exercises: listeningExercises },
    { id: 'reading',   name: 'ЧЕТЕНЕ',    maxPoints: 8,  exercises: readingExercises   },
    { id: 'grammar',   name: 'ГРАМАТИКА', maxPoints: 42, exercises: grammarExercises   },
    { id: 'writing',   name: 'ПИСАНЕ',    maxPoints: 10, exercises: writingExercises   },
  ],
};

export default testData;

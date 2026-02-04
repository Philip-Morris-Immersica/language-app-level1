// Central export point for all content
export * from './types';

// Lesson metadata for navigation
export const lessonsMetadata = [
  { id: 'lesson-01', number: 1, title: 'Здравейте', hasTest: false },
  { id: 'lesson-02', number: 2, title: 'Закуска', hasTest: false },
  { id: 'lesson-03', number: 3, title: 'В ресторанта', hasTest: true, testId: 'test-a1-1' },
  { id: 'lesson-04', number: 4, title: 'В супермаркета. На пазара', hasTest: true, testId: 'test-a1-2' },
  { id: 'lesson-05', number: 5, title: 'Градът и селото', hasTest: false },
  { id: 'lesson-06', number: 6, title: 'Моето семейство', hasTest: true, testId: 'test-a1-3' },
  { id: 'lesson-07', number: 7, title: 'Денят и часът', hasTest: false },
  { id: 'lesson-08', number: 8, title: 'Цветове и дрехи', hasTest: true, testId: 'test-a1-4' },
  { id: 'lesson-09', number: 9, title: 'Вкъщи', hasTest: false },
  { id: 'lesson-10', number: 10, title: 'На път', hasTest: true, testId: 'test-a1-5' },
  { id: 'lesson-11', number: 11, title: 'Всеки ден', hasTest: true, testId: 'test-a1-6' },
];

// Get lesson metadata by ID
export function getLessonMetadata(lessonId: string) {
  return lessonsMetadata.find(l => l.id === lessonId);
}

// Get previous lesson
export function getPrevLesson(currentNumber: number) {
  const prevNumber = currentNumber - 1;
  return lessonsMetadata.find(l => l.number === prevNumber);
}

// Get next lesson
export function getNextLesson(currentNumber: number) {
  const nextNumber = currentNumber + 1;
  return lessonsMetadata.find(l => l.number === nextNumber);
}

// Check if test available after lesson
export function hasTestAfterLesson(lessonNumber: number) {
  return lessonsMetadata.find(l => l.number === lessonNumber)?.hasTest ?? false;
}

'use client';

import type { UserProgress, LessonProgress, TestProgress, ExerciseProgress } from '@/content/types';

const STORAGE_KEY = 'bulgarian-a1-progress';

// Generate a unique user ID
function generateUserId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Get current user progress from local storage
export function getUserProgress(): UserProgress {
  if (typeof window === 'undefined') {
    return createEmptyProgress();
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error reading progress from localStorage:', error);
  }

  return createEmptyProgress();
}

// Create empty progress structure
function createEmptyProgress(): UserProgress {
  const now = new Date().toISOString();
  return {
    userId: generateUserId(),
    createdAt: now,
    lastUpdated: now,
    lessons: {},
    tests: {},
    totalProgress: 0,
  };
}

// Save progress to local storage
function saveProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;

  try {
    progress.lastUpdated = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving progress to localStorage:', error);
  }
}

// Initialize user (get or create)
export function initializeUser(): string {
  let progress = getUserProgress();
  
  if (!progress.userId) {
    progress = createEmptyProgress();
    saveProgress(progress);
  }
  
  return progress.userId;
}

// Get lesson progress
export function getLessonProgress(lessonId: string): LessonProgress | null {
  const progress = getUserProgress();
  return progress.lessons[lessonId] || null;
}

// Save exercise progress
export function saveExerciseProgress(
  lessonId: string,
  exerciseId: string,
  correct: boolean,
  isWorkbook: boolean = false
): void {
  const progress = getUserProgress();
  const now = new Date().toISOString();

  // Initialize lesson progress if doesn't exist
  if (!progress.lessons[lessonId]) {
    progress.lessons[lessonId] = {
      lessonId,
      contentViewed: false,
      exercisesProgress: [],
      workbookProgress: [],
      score: 0,
      totalPossibleScore: 0,
      completed: false,
      lastVisited: now,
    };
  }

  const lessonProgress = progress.lessons[lessonId];
  const progressArray = isWorkbook ? lessonProgress.workbookProgress : lessonProgress.exercisesProgress;

  // Find existing exercise progress
  let exerciseProgress = progressArray.find(ep => ep.exerciseId === exerciseId);

  if (exerciseProgress) {
    // Update existing
    exerciseProgress.completed = correct;
    exerciseProgress.correct = correct;
    exerciseProgress.attempts++;
    exerciseProgress.lastAttempt = now;
  } else {
    // Create new
    exerciseProgress = {
      exerciseId,
      completed: correct,
      correct,
      attempts: 1,
      lastAttempt: now,
    };
    progressArray.push(exerciseProgress);
  }

  lessonProgress.lastVisited = now;

  // Update total progress
  progress.totalProgress = calculateTotalProgress(progress);
  
  saveProgress(progress);
}

// Mark lesson content as viewed
export function markLessonContentViewed(lessonId: string): void {
  const progress = getUserProgress();
  const now = new Date().toISOString();

  if (!progress.lessons[lessonId]) {
    progress.lessons[lessonId] = {
      lessonId,
      contentViewed: true,
      exercisesProgress: [],
      workbookProgress: [],
      score: 0,
      totalPossibleScore: 0,
      completed: false,
      lastVisited: now,
    };
  } else {
    progress.lessons[lessonId].contentViewed = true;
    progress.lessons[lessonId].lastVisited = now;
  }

  saveProgress(progress);
}

// Mark lesson as completed
export function markLessonCompleted(lessonId: string, score: number, maxScore: number): void {
  const progress = getUserProgress();
  const now = new Date().toISOString();

  if (!progress.lessons[lessonId]) {
    progress.lessons[lessonId] = {
      lessonId,
      contentViewed: true,
      exercisesProgress: [],
      workbookProgress: [],
      score,
      totalPossibleScore: maxScore,
      completed: true,
      lastVisited: now,
    };
  } else {
    progress.lessons[lessonId].completed = true;
    progress.lessons[lessonId].score = score;
    progress.lessons[lessonId].totalPossibleScore = maxScore;
    progress.lessons[lessonId].lastVisited = now;
  }

  progress.totalProgress = calculateTotalProgress(progress);
  saveProgress(progress);
}

// Get test progress
export function getTestProgress(testId: string): TestProgress | null {
  const progress = getUserProgress();
  return progress.tests[testId] || null;
}

// Save test results
export function saveTestResults(
  testId: string,
  score: number,
  maxScore: number,
  sectionScores?: { sectionId: string; score: number; maxScore: number; }[]
): void {
  const progress = getUserProgress();
  const now = new Date().toISOString();

  if (!progress.tests[testId]) {
    progress.tests[testId] = {
      testId,
      completed: true,
      score,
      maxScore,
      attempts: 1,
      lastAttempt: now,
      sectionScores: sectionScores || [],
    };
  } else {
    const testProgress = progress.tests[testId];
    testProgress.completed = true;
    testProgress.score = Math.max(testProgress.score, score); // Keep best score
    testProgress.attempts++;
    testProgress.lastAttempt = now;
    if (sectionScores) {
      testProgress.sectionScores = sectionScores;
    }
  }

  progress.totalProgress = calculateTotalProgress(progress);
  saveProgress(progress);
}

// Calculate total progress percentage
function calculateTotalProgress(progress: UserProgress): number {
  const totalLessons = 11; // Total number of lessons
  const totalTests = 6;     // Total number of tests

  const completedLessons = Object.values(progress.lessons).filter(l => l.completed).length;
  const completedTests = Object.values(progress.tests).filter(t => t.completed).length;

  // Weight: 70% lessons, 30% tests
  const lessonProgress = (completedLessons / totalLessons) * 70;
  const testProgress = (completedTests / totalTests) * 30;

  return Math.round(lessonProgress + testProgress);
}

// Get total progress percentage
export function getTotalProgress(): number {
  const progress = getUserProgress();
  return progress.totalProgress;
}

// Get completed lessons count
export function getCompletedLessonsCount(): number {
  const progress = getUserProgress();
  return Object.values(progress.lessons).filter(l => l.completed).length;
}

// Get completed tests count
export function getCompletedTestsCount(): number {
  const progress = getUserProgress();
  return Object.values(progress.tests).filter(t => t.completed).length;
}

// Reset all progress (for testing or user request)
export function resetProgress(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error resetting progress:', error);
  }
}

// Export progress data (for backup or migration)
export function exportProgress(): string {
  const progress = getUserProgress();
  return JSON.stringify(progress, null, 2);
}

// Import progress data (from backup or migration)
export function importProgress(jsonData: string): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const data = JSON.parse(jsonData);
    // Basic validation
    if (data.userId && data.lessons && data.tests) {
      localStorage.setItem(STORAGE_KEY, jsonData);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error importing progress:', error);
    return false;
  }
}

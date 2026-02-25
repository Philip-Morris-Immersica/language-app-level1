'use client';

import { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from 'react';
import { ExercisePersistenceContext } from '@/contexts/ExercisePersistenceContext';

interface LessonExercisesProviderProps {
  lessonId: string;
  children: ReactNode;
}

// Debounce helper — saves at most once per 1.5s per exercise
function useDebouncedSave(lessonId: string) {
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  return useCallback((exerciseId: string, state: unknown) => {
    if (timers.current[exerciseId]) clearTimeout(timers.current[exerciseId]);

    timers.current[exerciseId] = setTimeout(async () => {
      try {
        await fetch('/api/progress/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lessonId, exerciseId, state }),
        });
      } catch {
        // Silent fail — state is still in memory
      }
    }, 1500);
  }, [lessonId]);
}

export function LessonExercisesProvider({ lessonId, children }: LessonExercisesProviderProps) {
  const [savedStates, setSavedStates] = useState<Record<string, unknown>>({});
  const [loaded, setLoaded] = useState(false);
  const debouncedSave = useDebouncedSave(lessonId);

  // Load saved states from server on mount
  useEffect(() => {
    fetch(`/api/progress/${lessonId}`)
      .then(r => r.json())
      .then(data => {
        if (data.states) setSavedStates(data.states);
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, [lessonId]);

  const saveState = useCallback((exerciseId: string, state: unknown) => {
    // Update local cache immediately
    setSavedStates(prev => ({ ...prev, [exerciseId]: state }));
    // Persist to DB (debounced)
    debouncedSave(exerciseId, state);
  }, [debouncedSave]);

  // Show nothing until states are loaded to avoid stale initial renders
  if (!loaded) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-[#8FC412] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <ExercisePersistenceContext.Provider value={{ savedStates, saveState }}>
      {children}
    </ExercisePersistenceContext.Provider>
  );
}

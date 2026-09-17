'use client';

import { createContext, useContext, useCallback, useRef } from 'react';

interface ExercisePersistenceContextValue {
  savedStates: Record<string, unknown>;
  saveState: (exerciseId: string, state: unknown) => void;
  /** Id of the exercise the user last worked on — used to auto-unlock collapsed lesson parts on return. */
  lastExerciseId?: string | null;
}

export const ExercisePersistenceContext = createContext<ExercisePersistenceContextValue>({
  savedStates: {},
  saveState: () => {},
  lastExerciseId: null,
});

export function useExercisePersistenceContext() {
  return useContext(ExercisePersistenceContext);
}

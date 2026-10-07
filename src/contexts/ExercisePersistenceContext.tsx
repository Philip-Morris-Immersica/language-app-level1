'use client';

import { createContext, useContext } from 'react';

interface ExercisePersistenceContextValue {
  savedStates: Record<string, unknown>;
  saveState: (exerciseId: string, state: unknown) => void;
  /** Id of the exercise the user last worked on — used to auto-unlock collapsed lesson parts on return. */
  lastExerciseId?: string | null;
  /** Records a click inside an exercise (progress tracking). No-op outside a lesson/test provider. */
  markTouched: (exerciseId: string) => void;
}

export const ExercisePersistenceContext = createContext<ExercisePersistenceContextValue>({
  savedStates: {},
  saveState: () => {},
  lastExerciseId: null,
  markTouched: () => {},
});

export function useExercisePersistenceContext() {
  return useContext(ExercisePersistenceContext);
}

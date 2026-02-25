'use client';

import { createContext, useContext, useCallback, useRef } from 'react';

interface ExercisePersistenceContextValue {
  savedStates: Record<string, unknown>;
  saveState: (exerciseId: string, state: unknown) => void;
}

export const ExercisePersistenceContext = createContext<ExercisePersistenceContextValue>({
  savedStates: {},
  saveState: () => {},
});

export function useExercisePersistenceContext() {
  return useContext(ExercisePersistenceContext);
}

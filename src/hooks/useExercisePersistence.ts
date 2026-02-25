'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useExercisePersistenceContext } from '@/contexts/ExercisePersistenceContext';

/**
 * Hook for persisting exercise state to the database.
 * Usage inside an exercise component:
 *
 *   const { savedState, saveState } = useExercisePersistence(exerciseId, lessonId);
 *   const [answers, setAnswers] = useState(() => (savedState as any)?.answers ?? {});
 *   useEffect(() => { saveState({ answers, validation, isSubmitted }); }, [answers, validation, isSubmitted]);
 */
export function useExercisePersistence(exerciseId: string | undefined) {
  const { savedStates, saveState: contextSave } = useExercisePersistenceContext();

  const savedState = exerciseId ? savedStates[exerciseId] : undefined;

  const saveState = useCallback(
    (state: unknown) => {
      if (exerciseId) contextSave(exerciseId, state);
    },
    [exerciseId, contextSave]
  );

  return { savedState, saveState };
}

'use client';

/**
 * A2 variant of the shared `MatchPairs` (src/components/exercises/MatchPairs.tsx).
 *
 * Why a wrapper: the shared MatchPairs renders only the pairs + word pool — it has
 * no place for a worked example ("Модел"). Some A2 antonym exercises need a model
 * shown ABOVE the pairs but NOT inside the instruction. This wrapper renders a
 * Bulgarian (never auto-translated) model box and then delegates to the shared
 * component unchanged (imported, not edited — Nina's domain may use but not modify
 * shared components).
 *
 * Registered as the opt-in type `'a2-match-pairs'` in `../exercise-components.ts`.
 */

import { useT } from '@/i18n/useT';
import { MatchPairs } from '@/components/exercises/MatchPairs';
import type { MatchPairsExercise } from '@/content/types';

interface A2MatchPairsExerciseShape extends MatchPairsExercise {
  model?: string;
}

export function A2MatchPairs({
  exercise,
  onComplete,
}: {
  exercise: { id: string; type: string; [key: string]: unknown };
  onComplete?: (correct: boolean, score: number) => void;
  exerciseId?: string;
}) {
  const t = useT();
  const ex = exercise as unknown as A2MatchPairsExerciseShape;

  return (
    <div className="space-y-4">
      {ex.model && (
        <div className="p-4 border-2 border-[#8B9D5F] rounded-lg bg-[#f8faf4]">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            {t('exercise.model')}
          </p>
          <p className="text-base text-gray-700">{ex.model}</p>
        </div>
      )}
      <MatchPairs exercise={ex} onComplete={onComplete} />
    </div>
  );
}

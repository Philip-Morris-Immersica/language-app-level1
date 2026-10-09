/**
 * B2-specific custom exercise renderers.
 *
 * Alex registers B2-only interactions here instead of editing the shared
 * ExerciseRenderer. Shared exercise types continue through the global switch.
 */

import type { ComponentType } from 'react';
import { OpinionChoice } from './components/OpinionChoice';
import { SelectWordsInline } from './components/SelectWordsInline';

export interface CustomExerciseRendererProps {
  exercise: { id: string; type: string; [key: string]: unknown };
  onComplete?: (correct: boolean, score: number) => void;
  exerciseId?: string;
}

export type CustomExerciseRenderer = ComponentType<CustomExerciseRendererProps>;

export const B2_CUSTOM_RENDERERS: Record<string, CustomExerciseRenderer> = {
  'b2-select-words-inline':
    SelectWordsInline as unknown as CustomExerciseRenderer,
  'b2-opinion-choice': OpinionChoice as unknown as CustomExerciseRenderer,
};

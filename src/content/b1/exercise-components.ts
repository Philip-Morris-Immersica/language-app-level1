/**
 * B1-specific custom exercise renderers.
 *
 * Map of `exercise.type` → React component. Read by `ExerciseRenderer.tsx`
 * BEFORE its built-in `switch`, so any type listed here wins.
 *
 * Why this exists: lets Алекс add new B1 exercise types (or B1-specific variants
 * of existing ones) without touching the shared `ExerciseRenderer.tsx` switch
 * or the shared `Exercise` union in `src/content/shared/types.ts`. Clean merges,
 * no shared-code conflicts. Mirrors the A2 domain
 * (`src/content/a2/exercise-components.ts`).
 *
 * How to add an entry:
 *   1. Build the component in `./components/` (see `./components/README.md`).
 *   2. Add the type interface to `./types.ts`.
 *   3. Register: `'<your-type>': YourComponent as unknown as CustomExerciseRenderer`.
 *
 * Components must accept:
 *   {
 *     exercise: <your exercise interface>;
 *     onComplete?: (correct: boolean, score: number) => void;
 *     exerciseId?: string;
 *   }
 */

import type { ComponentType } from 'react';
import { IllustratedCardsGrouped } from './components/IllustratedCardsGrouped';
import { MatchPairsDragDrop } from './components/MatchPairsDragDrop';
import { GrammarTable } from './components/GrammarTable';
import { SortToColumns } from './components/SortToColumns';

export interface CustomExerciseRendererProps {
  exercise: { id: string; type: string; [key: string]: unknown };
  onComplete?: (correct: boolean, score: number) => void;
  exerciseId?: string;
}

export type CustomExerciseRenderer = ComponentType<CustomExerciseRendererProps>;

/**
 * Add new B1 exercise types here. Example:
 *
 *   import { MyType } from './components/MyType';
 *   export const B1_CUSTOM_RENDERERS: Record<string, CustomExerciseRenderer> = {
 *     'b1-my-type': MyType as unknown as CustomExerciseRenderer,
 *   };
 */
export const B1_CUSTOM_RENDERERS: Record<string, CustomExerciseRenderer> = {
  'b1-illustrated-cards-grouped': IllustratedCardsGrouped as unknown as CustomExerciseRenderer,
  'b1-match-pairs-dragdrop': MatchPairsDragDrop as unknown as CustomExerciseRenderer,
  'b1-grammar-table': GrammarTable as unknown as CustomExerciseRenderer,
  'b1-sort-to-columns': SortToColumns as unknown as CustomExerciseRenderer,
};

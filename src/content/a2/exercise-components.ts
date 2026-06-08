/**
 * A2-specific custom exercise renderers.
 *
 * Map of `exercise.type` → React component. Read by `ExerciseRenderer.tsx`
 * BEFORE its built-in `switch`, so any type listed here wins.
 *
 * Why this exists: lets Нина add new A2 exercise types (or A2-specific variants
 * of existing ones) without touching the shared `ExerciseRenderer.tsx` switch
 * or the shared `Exercise` union in `src/content/shared/types.ts`. Clean merges,
 * no shared-code conflicts.
 *
 * How to add an entry:
 *   1. Build the component in `./components/` (see `./components/README.md`).
 *   2. Add the type interface to `./types.ts`.
 *   3. Register: `'<your-type>': YourComponent`.
 *
 * Components must accept:
 *   {
 *     exercise: <your exercise interface>;
 *     onComplete?: (correct: boolean, score: number) => void;
 *     exerciseId?: string;
 *   }
 */

import type { ComponentType } from 'react';

export interface CustomExerciseRendererProps {
  // The full exercise object — typed loosely here because each entry has its
  // own concrete type. The component itself can narrow with its own interface.
  exercise: { id: string; type: string; [key: string]: unknown };
  onComplete?: (correct: boolean, score: number) => void;
  exerciseId?: string;
}

export type CustomExerciseRenderer = ComponentType<CustomExerciseRendererProps>;

/**
 * Add new A2 exercise types here. Example:
 *
 *   import { MyType } from './components/MyType';
 *   export const A2_CUSTOM_RENDERERS: Record<string, CustomExerciseRenderer> = {
 *     'a2-my-type': MyType as unknown as CustomExerciseRenderer,
 *   };
 */
export const A2_CUSTOM_RENDERERS: Record<string, CustomExerciseRenderer> = {
  // empty for now — Нина populates as needed
};

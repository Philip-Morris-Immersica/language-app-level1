/**
 * A2-specific exercise types.
 *
 * Use this file when a lesson needs a new exercise type that doesn't fit any
 * existing shared type. The shared types in `src/content/shared/types.ts` stay
 * untouched — A2 types live here and are wired in via
 * `src/content/a2/exercise-components.ts` (no edits to the global ExerciseRenderer
 * switch / shared Exercise union are required).
 *
 * Conventions:
 *  - Every interface extends `BaseExercise` (so `id`, `instruction`, `order`,
 *    `grammarHighlight` … keep working uniformly).
 *  - The `type` field is a string literal unique to A2 (e.g. `'a2-flashcard-grid'`).
 *    Prefix with `a2-` to avoid collisions with shared types.
 *  - Export a union `A2Exercise` of every interface declared here.
 *
 * Example — adding a new type called `a2-something`:
 *
 *   export interface A2SomethingExercise extends BaseExercise {
 *     type: 'a2-something';
 *     // …your custom fields…
 *   }
 *
 *   export type A2Exercise = A2SomethingExercise; // or | with others
 *
 * Then create the matching React component in `src/content/a2/components/`
 * and register it in `src/content/a2/exercise-components.ts`.
 */

import type { BaseExercise } from '../shared/types';

// No A2-specific types yet — Нина adds them here as new exercise types appear.

/** Union of all A2-specific exercise interfaces. Empty for now. */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type A2Exercise = never;

// Re-export BaseExercise so A2 component files can import everything from one place.
export type { BaseExercise };

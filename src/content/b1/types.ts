/**
 * B1-specific exercise types.
 *
 * Use this file when a B1 lesson needs a new exercise type that doesn't fit any
 * existing shared type. The shared types in `src/content/shared/types.ts` stay
 * untouched — B1 types live here and are wired in via
 * `src/content/b1/exercise-components.ts` (no edits to the global ExerciseRenderer
 * switch / shared Exercise union are required).
 *
 * This mirrors the A2 domain (`src/content/a2/types.ts`). Keeping B1 self-contained
 * is what keeps merges into `master` clean.
 *
 * Conventions:
 *  - Every interface extends `BaseExercise` (so `id`, `instruction`, `order`,
 *    `grammarHighlight` … keep working uniformly).
 *  - The `type` field is a string literal unique to B1 (e.g. `'b1-flashcard-grid'`).
 *    Prefix with `b1-` to avoid collisions with shared / A2 types.
 *  - Export a union `B1Exercise` of every interface declared here (uncomment and
 *    extend it once the first B1-specific type is added).
 *
 * Example — adding a new type called `b1-something`:
 *
 *   export interface B1SomethingExercise extends BaseExercise {
 *     type: 'b1-something';
 *     // …your custom fields…
 *   }
 *
 *   export type B1Exercise = B1SomethingExercise; // or | with others
 *
 * Then create the matching React component in `src/content/b1/components/`
 * and register it in `src/content/b1/exercise-components.ts`.
 */

import type { BaseExercise } from '../shared/types';

// ─── B1-specific exercise interfaces go here ──────────────────────────────────
// (none yet — add them as B1 lessons introduce new types or variants)

// Union of all B1-specific exercise interfaces. Uncomment + extend once the
// first interface above is declared:
//   export type B1Exercise = B1SomethingExercise;

// Re-export BaseExercise so B1 component files can import everything from one place.
export type { BaseExercise };

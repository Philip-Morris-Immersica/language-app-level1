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

// ─── A2GroupedDropdownExercise ────────────────────────────────────────────────
// Same as DropdownMatchExercise but renders questions in a grouped grid where
// every N consecutive questions form one row (N columns).
// Ideal for verb-form drills where 3 questions share the same base sentence
// (+/−/?) and must appear as a visual unit.

export interface A2GroupedDropdownQuestion {
  id: string;
  left: string;
  options: string[];
  correctAnswer: string;
  alternateCorrectAnswers?: string[];
  isExample?: boolean;
}

export interface A2GroupedDropdownExercise extends BaseExercise {
  type: 'a2-grouped-dropdown-match';
  questions: A2GroupedDropdownQuestion[];
  /** How many consecutive questions form one theme group (row). Default: 3. */
  groupSize?: number;
  points?: number;
}

// ─── A2ImageLabelingExercise ──────────────────────────────────────────────────
// Same as the shared ImageLabelingExercise (select a label under each image, then
// check) but rendered 5-per-row on desktop (2 rows of 5 for 10 items). Used in the
// „Преговор A1" review lesson where the shared 3-column layout left odd rows.

export interface A2ImageLabelingExercise extends BaseExercise {
  type: 'a2-image-labeling';
  images: {
    id: string;
    imageUrl: string;
    correctLabel: string;
    acceptableLabels?: string[];
  }[];
  options: string[];
  points?: number;
}

// ─── A2WideCardsExercise ──────────────────────────────────────────────────────
// Tap-to-hear vocabulary cards (like illustrated_cards) rendered 5-per-row on
// desktop. Tapping reveals the translation and plays the pronunciation.

export interface A2WideCardsExercise extends BaseExercise {
  type: 'a2-wide-cards';
  title: string;
  cards: {
    id: string;
    imageUrl: string;
    label: string;
    sublabels?: string[];
    ttsLabel?: string;
    translations?: Record<string, string>;
  }[];
  disableAudio?: boolean;
}

// ─── A2FreeFillExercise ───────────────────────────────────────────────────────
// Free-text fill-in exercise where any non-empty answer is accepted as correct.
// Used for personal information exercises (e.g. Ръст, Тегло, Очи, Коса) where
// every student has a different correct answer.

export interface A2FreeFillSentence {
  label: string;
  /** When provided, renders a dropdown instead of free text. Any selection is accepted. */
  options?: string[];
}

export interface A2FreeFillExercise extends BaseExercise {
  type: 'a2-free-fill';
  sentences: A2FreeFillSentence[];
}

/** Union of all A2-specific exercise interfaces. */
export type A2Exercise =
  | A2GroupedDropdownExercise
  | A2ImageLabelingExercise
  | A2WideCardsExercise
  | A2FreeFillExercise;

// Re-export BaseExercise so A2 component files can import everything from one place.
export type { BaseExercise };

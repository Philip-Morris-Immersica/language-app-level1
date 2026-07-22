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

import type { BaseExercise, MatchPairsExercise } from '../shared/types';

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

// ─── A2PictureDropdownExercise ────────────────────────────────────────────────
// Picture + dropdown per question, rendered in a SINGLE column (top-to-bottom) so
// a chronological sequence reads naturally. Images are a bit larger than the
// shared DropdownMatch image-mode. Used for the „дневен режим" routine drill.

export interface A2PictureDropdownQuestion {
  id: string;
  /** Used as image alt / accessible label. */
  left: string;
  leftImageUrl: string;
  options: string[];
  correctAnswer: string;
  alternateCorrectAnswers?: string[];
  isExample?: boolean;
}

export interface A2PictureDropdownExercise extends BaseExercise {
  type: 'a2-picture-dropdown';
  questions: A2PictureDropdownQuestion[];
  points?: number;
  /**
   * Card layout. Default `'list'` = single column, image left / dropdown right
   * (chronological drill). `'grid'` = image-on-top cards laid out like the A2
   * image-labeling grid, each card carrying a sequential number badge.
   */
  layout?: 'list' | 'grid';
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
    /** Per-image dropdown options (incl. the correct label). When present, this
     *  image's dropdown shows only these (capped pool, e.g. 5); otherwise it
     *  falls back to the shared `options` pool below. */
    options?: string[];
  }[];
  /** Shared options pool used for images that don't define their own `options`. */
  options?: string[];
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

// ─── A2DialoguesExercise ──────────────────────────────────────────────────────
// Same as the shared DialoguesExercise but each `section` may carry its own
// `imageUrl`, rendered centered above that section's lines. Used when a single
// dialogue exercise groups several sub-dialogues (а., б., в.) that each have a
// distinct illustration.

export interface A2DialogueLine {
  speaker?: string;
  voiceGender?: 'male' | 'female';
  text: string;
  ttsText?: string;
  translations?: Record<string, string>;
}

export interface A2DialogueSection {
  id: string;
  bubbleSide?: 'left' | 'right';
  imageUrl?: string;
  lines: A2DialogueLine[];
}

export interface A2DialoguesExercise extends BaseExercise {
  type: 'a2-dialogues';
  title: string;
  subtitle?: string;
  imageUrl?: string;
  images?: string[];
  displayLayout?: 'list' | 'scene';
  sections: A2DialogueSection[];
}

// ─── A2GrammarExamplesExercise ────────────────────────────────────────────────
// Same as the shared GrammarExamplesExercise; the matching A2 component only
// changes the `layout: 'centered'` rendering (truly-centered, content-width
// cards). Delegates to the shared component for any other layout.

export interface A2GrammarExampleItem {
  imageUrl?: string;
  text?: string;
  subtext?: string;
  label?: string;
  lines?: string[];
  translations?: Record<string, string>;
  ttsText?: string;
  voiceGender?: 'male' | 'female';
}

export interface A2GrammarExamplesExercise extends BaseExercise {
  type: 'a2-grammar-examples';
  title: string;
  layout?: 'default' | 'centered';
  disableTts?: boolean;
  examples: A2GrammarExampleItem[];
}

// ─── A2MatchPairsExercise ─────────────────────────────────────────────────────
// Same as the shared MatchPairsExercise, plus an optional `model` worked example
// rendered (in Bulgarian, never auto-translated) ABOVE the pairs and OUTSIDE the
// instruction. Used for antonym-matching drills where a sample pair helps.

export interface A2MatchPairsExercise extends Omit<MatchPairsExercise, 'type'> {
  type: 'a2-match-pairs';
  /** Worked example shown above the pairs, e.g. 'добър – лош'. */
  model?: string;
}

// ─── A2DragToColumnsExercise ──────────────────────────────────────────────────
// Same as the shared DragToColumnsExercise; the matching A2 component only
// changes the "tap to remove" hover color from the red/error family to a
// neutral grey, since that hover fires on every placed item regardless of
// correctness (real correctness feedback only appears after checking) and
// the red color was misread as "this is wrong" before the student even checks.

export interface A2DragToColumnsExercise extends BaseExercise {
  type: 'a2-drag-to-columns';
  imageUrl?: string;
  points?: number;
  items: string[];
  columns: {
    id: string;
    title: string;
    icon?: string;
    correctItems: string[];
  }[];
}

// ─── A2DialogueBuilderExercise ────────────────────────────────────────────────
// Same as the shared DialogueBuilderExercise, but each `section` may set
// `lockFirst: false` to unlock the first line — then ALL sentences are shuffled
// and every row is draggable. Needed for short 3-phrase dialogues where locking
// the first line leaves almost nothing to rearrange.

export interface A2DialogueBuilderSection {
  id: string;
  givenFirstLine: string;
  sentences: string[];
  alternateOrders?: string[][];
  /** When false, the first line is NOT fixed and all sentences shuffle. Default: true. */
  lockFirst?: boolean;
}

export interface A2DialogueBuilderExercise extends BaseExercise {
  type: 'a2-dialogue-builder';
  title?: string;
  sections: A2DialogueBuilderSection[];
}

// ─── A2WordOrderExercise ──────────────────────────────────────────────────────
// Same shape as the shared WordOrderExercise; the matching A2 component only
// hardens initialization + checking so stale/partial persisted state can't make
// the „Провери" button silently no-op (the shared component's known failure).

export interface A2WordOrderQuestion {
  words: string[];
  correctSentence: string;
  alternateCorrectSentences?: string[];
  hint?: string;
}

export interface A2WordOrderExercise extends BaseExercise {
  type: 'a2-word-order';
  points?: number;
  questions: A2WordOrderQuestion[];
}

/** Union of all A2-specific exercise interfaces. */
export type A2Exercise =
  | A2GroupedDropdownExercise
  | A2PictureDropdownExercise
  | A2ImageLabelingExercise
  | A2WideCardsExercise
  | A2FreeFillExercise
  | A2DialoguesExercise
  | A2GrammarExamplesExercise
  | A2MatchPairsExercise
  | A2DragToColumnsExercise
  | A2DialogueBuilderExercise
  | A2WordOrderExercise;

// Re-export BaseExercise so A2 component files can import everything from one place.
export type { BaseExercise };

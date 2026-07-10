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

/**
 * b1-illustrated-cards-grouped — variant of the shared `illustrated_cards`
 * (НОВИ ДУМИ) component that visually splits the cards into labeled groups
 * (e.g. „Домашни животни" / „Домашни любимци" / „Диви животни") while keeping
 * them all inside ONE НОВИ ДУМИ section (per textbook layout, l01 ex.1).
 *
 * Why a B1-local fork instead of extending the shared `IllustratedCardsExercise`:
 * the shared type/component intentionally has no group-header concept — adding
 * one there is a shared-code change (Philip's call). This variant only adds a
 * `groupLabel` on each card; cards are still rendered in array order, grouped
 * visually whenever `groupLabel` changes between consecutive cards.
 */
export interface B1IllustratedCardsGroupedExercise extends BaseExercise {
  type: 'b1-illustrated-cards-grouped';
  headerImageUrl?: string;
  disableAudio?: boolean;
  cards: {
    id: string;
    imageUrl: string;
    label: string;
    ttsLabel?: string;
    ttsIncludeSublabels?: boolean;
    sublabels?: string[];
    translations?: Record<string, string>;
    /** Group this card belongs to — a header is shown whenever this changes from the previous card. */
    groupLabel: string;
  }[];
}

/**
 * b1-match-pairs-dragdrop — variant of the shared `match_pairs` (antonyms /
 * pairs) component that uses real drag-and-drop (drag a word from the pool
 * onto its match) instead of the shared component's click-left-then-click-right
 * flow, which testers found unintuitive (the "selected" left item highlights
 * green while waiting for a click, which isn't an obvious affordance).
 *
 * Why a B1-local fork instead of changing the shared `MatchPairs.tsx`: the
 * interaction model change affects every level using `match_pairs` — a shared
 * UX call for Philip. This fork only changes the *component*; the content
 * shape (`pairs`, `points`, …) is identical to `MatchPairsExercise` so lessons
 * can switch type back and forth without touching the data.
 */
export interface B1MatchPairsDragDropExercise extends BaseExercise {
  type: 'b1-match-pairs-dragdrop';
  pairs: {
    id: string;
    left: string;
    correctRight: string;
  }[];
  shuffledRights?: string[];
  showLeftOrdinal?: boolean;
}

// Union of all B1-specific exercise interfaces.
export type B1Exercise = B1IllustratedCardsGroupedExercise | B1MatchPairsDragDropExercise;

// Re-export BaseExercise so B1 component files can import everything from one place.
export type { BaseExercise };

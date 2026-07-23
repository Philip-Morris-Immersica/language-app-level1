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

/**
 * b1-grammar-table — variant of the shared `grammar_table` that can fully
 * disable audio (no 🔊 icons, no click-to-play, no "tap row to hear" hint).
 *
 * Why a B1-local fork instead of extending the shared `GrammarTableExercise`:
 * the shared type/component has no audio toggle — adding one there is a
 * shared-code change (Philip's call). This variant is otherwise identical to
 * `grammar_table` (same `columns`/`rows`/`notes` shape), so lessons can switch
 * type back and forth without touching the data. When `disableAudio` is not
 * set, it behaves exactly like the shared table (with audio).
 */
export interface B1GrammarTableExercise extends BaseExercise {
  type: 'b1-grammar-table';
  title: string;
  tableTitle?: string;
  columns?: string[];
  rows?: {
    pronoun: string;
    cells: string[];
    pronunciations?: Record<string, string>;
    ttsModel?: 'flash' | 'pro';
    ttsPrompt?: string;
    ttsText?: string;
    /** Caption / label row — no click-to-play, no 🔊 icon */
    noAudio?: boolean;
  }[];
  /**
   * Multiple green tables in one section. First two render side-by-side on md+;
   * the rest (e.g. „Внимание!") span full width below.
   * When set, top-level `tableTitle`/`columns`/`rows` are ignored.
   */
  panels?: {
    tableTitle?: string;
    columns?: string[];
    rows: {
      pronoun: string;
      cells: string[];
      pronunciations?: Record<string, string>;
      ttsModel?: 'flash' | 'pro';
      ttsPrompt?: string;
      ttsText?: string;
      noAudio?: boolean;
    }[];
    /** Full-width panel (e.g. „Внимание!") instead of side-by-side */
    fullWidth?: boolean;
  }[];
  notes?: string[];
  ttsNotes?: string[];
  ttsNoteModels?: ('flash' | 'pro')[];
  boldColumns?: number[];
  widePronouns?: boolean;
  /** Left-align example sentences (default is centered). Useful for long example rows. */
  alignLeft?: boolean;
  /** When true, disables all audio — hides the 🔊 icons, the "tap to hear" hint, and click-to-play. */
  disableAudio?: boolean;
  /**
   * Visual layout:
   * - `table` (default) — green HTML table (reference grids, conjugations).
   * - `example-cards` — A2-style blue cards: title + divider + centered example lines
   *   (for „таблици с примери" / sentence examples, not multi-column reference tables).
   */
  variant?: 'table' | 'example-cards';
}

/**
 * b1-grammar-examples — dialogue / illustrated examples with working **bold**
 * and per-line voices. Shared `grammar_examples` hero mode prints literal asterisks.
 */
export interface B1GrammarExamplesExercise extends BaseExercise {
  type: 'b1-grammar-examples';
  title: string;
  subtitle?: string;
  instruction?: string;
  disableTts?: boolean;
  examples: {
    imageUrl: string;
    text: string;
    subtext?: string;
    lines?: string[];
    voiceGender?: 'male' | 'female';
    ttsText?: string;
    ttsModel?: 'flash' | 'pro';
    ttsPrompt?: string;
    zoomable?: boolean;
    label?: string;
  }[];
}

/**
 * b1-sort-to-columns — variant of the shared `drag_to_columns` for classification
 * exercises with MORE THAN 3 groups.
 *
 * Why a B1-local fork instead of extending the shared `DragToColumnsExercise`:
 * the shared `DragToColumns.tsx` component is swipe-gesture based and only ever
 * wires up 3 directions (left / right / down) to `columns[0..2]` — a 4th column
 * is rendered in the "all placed" summary grid but is *never reachable* during
 * the actual sorting step, since there's no 4th swipe direction. That's a
 * shared-component limitation (Philip's call to fix for `drag_to_columns`
 * globally); this fork uses a simple tap-word-then-tap-group interaction that
 * scales to any number of columns, so nothing is ever unreachable. Content
 * shape (`items`, `columns[].correctItems`) is identical to
 * `DragToColumnsExercise`, so lessons can switch type back and forth without
 * touching the data.
 */
export interface B1SortToColumnsExercise extends BaseExercise {
  type: 'b1-sort-to-columns';
  items: string[];
  columns: {
    id: string;
    title: string;
    icon?: string;
    correctItems: string[];
  }[];
}

// Union of all B1-specific exercise interfaces.
export type B1Exercise =
  | B1IllustratedCardsGroupedExercise
  | B1MatchPairsDragDropExercise
  | B1GrammarTableExercise
  | B1GrammarExamplesExercise
  | B1SortToColumnsExercise;

// Re-export BaseExercise so B1 component files can import everything from one place.
export type { BaseExercise };

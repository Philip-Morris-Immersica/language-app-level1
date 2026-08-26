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
import { GrammarExamples } from './components/GrammarExamples';
import { SortToColumns } from './components/SortToColumns';
import { SelectWords } from './components/SelectWords';
import { TableFill } from './components/TableFill';
import { ReadingText } from './components/ReadingText';
import { Dialogues } from './components/Dialogues';
import { WorkbookFillBlank } from './components/WorkbookFillBlank';

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
  'b1-grammar-examples': GrammarExamples as unknown as CustomExerciseRenderer,
  'b1-sort-to-columns': SortToColumns as unknown as CustomExerciseRenderer,
  // Multi-select „подчертайте правилните думи" — no shared type does multi-pick.
  'b1-select-words': SelectWords as unknown as CustomExerciseRenderer,
  // Override shared table_fill: hide empty column-header rows (B1-only).
  table_fill: TableFill as unknown as CustomExerciseRenderer,
  // Override shared reading_text: numbered task lists → green tables (B1-only).
  reading_text: ReadingText as unknown as CustomExerciseRenderer,
  // Override shared dialogues: support **bold** markdown in lines (B1-only).
  dialogues: Dialogues as unknown as CustomExerciseRenderer,
  // Optional compact layout for long single-column dropdown exercises.
  workbook_fill_blank: WorkbookFillBlank as unknown as CustomExerciseRenderer,
  // Override shared grammar UI: lighter bold highlights, 2×2 card grids, compact tables.
  grammar_examples: GrammarExamples as unknown as CustomExerciseRenderer,
  grammar_table: GrammarTable as unknown as CustomExerciseRenderer,
};

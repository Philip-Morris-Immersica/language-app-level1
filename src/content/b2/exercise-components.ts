/**
 * B2-specific custom exercise renderers.
 *
 * Alex registers B2-only interactions here instead of editing the shared
 * ExerciseRenderer. Shared exercise types continue through the global switch.
 */

import type { ComponentType } from 'react';
import { OpinionChoice } from './components/OpinionChoice';
import { SelectWordsInline } from './components/SelectWordsInline';
import { MatchPairsDragDrop } from './components/MatchPairsDragDrop';
import { GrammarTable } from './components/GrammarTable';
import { B2DragToColumns } from './components/B2DragToColumns';

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
  // Drag a word from an (alphabetical) pool onto its pair — no shared drag-match type exists.
  'b2-match-pairs-dragdrop': MatchPairsDragDrop as unknown as CustomExerciseRenderer,
  // Shared grammar_table look + text under the title bar + bulleted note boxes.
  'b2-grammar-table': GrammarTable as unknown as CustomExerciseRenderer,
  // Swipe-to-column sorter: flat green icons, title shown once, long items clamped to 3 lines.
  'b2-drag-to-columns': B2DragToColumns as unknown as CustomExerciseRenderer,
};

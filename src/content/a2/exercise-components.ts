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
import { GroupedDropdownMatch } from './components/GroupedDropdownMatch';
import { ImageLabelingWide } from './components/ImageLabelingWide';
import { WideCards } from './components/WideCards';
import { FreeFill } from './components/FreeFill';
import { A2ReadingText } from './components/A2ReadingText';
import { A2Dialogues } from './components/A2Dialogues';
import { A2GrammarExamples } from './components/A2GrammarExamples';
import { A2GrammarTable } from './components/A2GrammarTable';
import { A2MatchPairs } from './components/A2MatchPairs';

export const A2_CUSTOM_RENDERERS: Record<string, CustomExerciseRenderer> = {
  'a2-grouped-dropdown-match': GroupedDropdownMatch as unknown as CustomExerciseRenderer,
  'a2-image-labeling': ImageLabelingWide as unknown as CustomExerciseRenderer,
  'a2-wide-cards': WideCards as unknown as CustomExerciseRenderer,
  'a2-free-fill': FreeFill as unknown as CustomExerciseRenderer,
  // A2 match_pairs variant: shows an optional „Модел" example above the pairs.
  'a2-match-pairs': A2MatchPairs as unknown as CustomExerciseRenderer,
  // A2 variant of the shared dialogues: renders a per-section image (а., б., в.).
  'a2-dialogues': A2Dialogues as unknown as CustomExerciseRenderer,
  // A2 variant of the shared grammar_examples: truly-centered cards (centered layout).
  'a2-grammar-examples': A2GrammarExamples as unknown as CustomExerciseRenderer,
  // A2 variant of the shared reading_text: centers exactly-two plain images.
  'reading_text': A2ReadingText as unknown as CustomExerciseRenderer,
  // A2 variant of grammar_table: uses ttsNotes as browser-TTS fallback (instead
  // of the raw display notes which may contain markdown symbols like ⚠️, ~~, →).
  'grammar_table': A2GrammarTable as unknown as CustomExerciseRenderer,
};

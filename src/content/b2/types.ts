/**
 * B2-specific exercise types.
 *
 * Keep B2-only interactions here so Alex can build B2 lessons without editing
 * shared types or components. Every type string is prefixed with `b2-`.
 */

import type { BaseExercise } from '../shared/types';

type B2BaseExercise = Omit<BaseExercise, 'type'>;

export interface B2SelectableToken {
  /** Stable occurrence id. Required because the same word may repeat in a text. */
  id: string;
  /** Visible Bulgarian word/phrase, including attached punctuation when needed. */
  text: string;
  /** Whitespace after this token. Defaults to one regular space. */
  trailing?: string;
  /** Whether the learner may select this token. Defaults to true. */
  selectable?: boolean;
  /** Correct occurrence in scored mode. Ignored in free mode. */
  correct?: boolean;
}

interface B2SelectWordsInlineBase extends B2BaseExercise {
  type: 'b2-select-words-inline';
  title: string;
  blocks: {
    id: string;
    /** Optional heading above this text block. */
    heading?: string;
    tokens: B2SelectableToken[];
  }[];
}

/**
 * scored: learner may select any token; only an exact target set scores.
 * free: any selection is allowed and the exercise is always ungraded.
 */
export type B2SelectWordsInlineExercise =
  | (B2SelectWordsInlineBase & { mode: 'scored'; points: number })
  | (B2SelectWordsInlineBase & { mode: 'free'; points?: 0 });

export interface B2OpinionChoiceExercise extends B2BaseExercise {
  type: 'b2-opinion-choice';
  title: string;
  /** Opinion questions are intentionally ungraded. */
  points?: 0;
  questions: {
    id: string;
    statement: string;
    options: {
      id: string;
      text: string;
    }[];
  }[];
}

export type B2Exercise =
  | B2SelectWordsInlineExercise
  | B2OpinionChoiceExercise;

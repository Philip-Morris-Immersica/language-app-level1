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
  /**
   * `checklist`: every token (across all blocks) is one option row with a tick box
   * (multi-answer question). Default `inline`: words are clicked inside running text.
   */
  presentation?: 'inline' | 'checklist';
  /** Optional photo above the text (inline mode), shown at its natural aspect ratio. */
  image?: { imageUrl: string; alt?: string };
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

/**
 * b2-match-pairs-dragdrop — drag a word from an alphabetical pool onto the
 * field next to each left item. Same data shape as B1's drag-and-drop matcher,
 * but B2-owned (B1 is never imported). Pool order = `shuffledRights` as given.
 *
 * Mix & match (two targets per row): when pairs carry `correctRight2`, every row
 * shows TWO drop fields (e.g. idiom → meaning + example), each fed from its own
 * pool (`shuffledRights` for the first field, `shuffledRights2` for the second).
 * A tile can only be dropped in a field of its own column.
 */
export interface B2MatchPairsDragDropExercise extends B2BaseExercise {
  type: 'b2-match-pairs-dragdrop';
  title: string;
  pairs: {
    id: string;
    left: string;
    correctRight: string;
    /** Second target of the row (mix & match mode). */
    correctRight2?: string;
  }[];
  /** Exact pool order (e.g. alphabetical). Falls back to a random order when omitted. */
  shuffledRights?: string[];
  /** Pool order of the second column (mix & match mode). */
  shuffledRights2?: string[];
  /** `b2.ts` keys for the captions of the first / second column (mix & match mode). */
  rightLabelKey?: string;
  rightLabelKey2?: string;
  showLeftOrdinal?: boolean;
}

/**
 * b2-grammar-table — visually identical to the shared `grammar_table`, plus:
 *  - `tableSubtitle`: a line directly under the green table-title bar
 *    (e.g. „Образува се от глаголи от несвършен вид.");
 *  - list notes: a `notes[]` string may contain `\n`; lines starting with `- `
 *    render as a bulleted list inside the same green box.
 * Audio paths match the shared table: `{id}-row-{i}` and `{id}-note-{i}`.
 */
export interface B2GrammarTableExercise extends B2BaseExercise {
  type: 'b2-grammar-table';
  title: string;
  /** Exercise-level subtitle (grey text under the section title, above the table). */
  subtitle?: string;
  /**
   * Long explanatory text shown in its OWN framed box between the header
   * (title + instruction) and the table — so the instruction stays directly
   * under the title. Not read by TTS.
   */
  introText?: string;
  /**
   * Show a repeated `pronoun` (e.g. the grammatical gender) only once: on the first
   * row of a run of identical values, spanning the whole run (`rowSpan`).
   */
  mergePronouns?: boolean;
  /**
   * Merge identical cells of adjacent rows (same column) into one cell spanning the rows
   * (e.g. the same negative form shown once for two rows).
   */
  mergeCells?: boolean;
  /**
   * Framed block ABOVE the table: a green title bar plus one column of example lines
   * per entry of `columns` (side by side). Silent by default; `audio[i]` = index (in the main
   * `rows`) of a `hidden` row whose `ttsText` is spoken when column `i` is clicked.
   */
  lead?: { title: string; columns: string[][]; audio?: (number | undefined)[] };
  /**
   * A second, complete table shown below this one (after this table's notes), with extra
   * space between them. Same fields as the main table (its own title, columns, rows, notes).
   * Its MP3s are NOT collected by the generator: copy its rows as `hidden` rows (with `ttsText`)
   * at the END of the main `rows` and set `thenTableAudio` to the index of the first copy.
   */
  thenTable?: Omit<B2GrammarTableExercise, 'type' | 'id' | 'title' | 'instruction' | 'order' | 'thenTable' | 'thenTableAudio'>;
  /** Centre the first-column word + speaker icon in the cell (default: word left, icon right). */
  centerPronouns?: boolean;
  /** Keep every first-column word on ONE line, left-aligned (no wrapped/centred multi-word entries like „близо до“). */
  leftPronouns?: boolean;
  /** Index (in the main `rows`) of the hidden row that holds the audio of `thenTable.rows[0]`; the next ones follow in order. */
  thenTableAudio?: number;
  tableTitle?: string;
  /** Draws a green outline around the whole table (incl. its right edge). */
  outlined?: boolean;
  /** Shown under the table-title bar, inside the table frame. */
  tableSubtitle?: string;
  columns?: string[];
  pronounColumnLabel?: string;
  rows?: {
    pronoun: string;
    cells: string[];
    pronunciations?: Record<string, string>;
    ttsModel?: 'flash' | 'pro';
    ttsPrompt?: string;
    ttsText?: string;
    voiceGender?: 'male' | 'female';
    noAudio?: boolean;
    /** `layout: 'stacked'` only: a divider line is drawn above this row (start of a new block). */
    cardStart?: boolean;
    /**
     * Audio-only row: not drawn. Its MP3 (`{id}-row-{index}`) is played by a heading
     * (table title, subtitle, column label, intro box) via `headerAudio`. Always append
     * these rows AFTER the visible rows so the MP3 paths of the visible rows stay stable.
     */
    hidden?: boolean;
  }[];
  /**
   * Make headings clickable with audio. Every value is the index (in `rows`) of a `hidden` row
   * whose `ttsText` is the spoken heading.
   */
  headerAudio?: {
    /** Long text in the framed `introText` box. */
    intro?: number;
    /** Green table-title bar (`tableTitle`). */
    title?: number;
    /** Line under the title bar (`tableSubtitle`). */
    subtitle?: number;
    /** First-column heading (`pronounColumnLabel`). */
    pronounLabel?: number;
    /** One entry per `columns` heading (same order; `undefined` = silent). */
    columns?: (number | undefined)[];
  };
  /** `layout: 'stacked'` only: draw a divider line between every row (category). */
  stackDividers?: boolean;
  /**
   * `layout: 'stacked'` only: the LAST row is the table title as a spoken row (`cells: []`, own `ttsText`).
   * It is not drawn as a row — the green title bar plays its audio (last index keeps earlier MP3 paths stable).
   */
  titleRowAudio?: boolean;
  notes?: string[];
  ttsNotes?: string[];
  ttsNoteModels?: ('flash' | 'pro')[];
  /** When true, the green note boxes are display-only: no audio icon, no playback. */
  notesNoAudio?: boolean;
  boldColumns?: number[];
  widePronouns?: boolean;
  /**
   * `'stacked'` — textbook-style framed list: each row is a centred bold heading
   * (`pronoun`) followed by its `cells` as green lines (a cell written fully as
   * `**text**` renders as a dark bold line). Default `'table'`.
   */
  layout?: 'table' | 'stacked';
}

/**
 * b2-drag-to-columns — swipe each card left/right into one of two columns.
 * Same data shape and saved state as the shared `drag_to_columns`, but with flat
 * green lucide icons, each column title shown once, and long items kept inside
 * their card/box (max. 3 lines).
 */
export interface B2DragToColumnsExercise extends B2BaseExercise {
  type: 'b2-drag-to-columns';
  title: string;
  /** One point per item. */
  points: number;
  imageUrl?: string;
  items: string[];
  columns: {
    id: string;
    title: string;
    correctItems: string[];
  }[];
}

export type B2Exercise =
  | B2DragToColumnsExercise
  | B2SelectWordsInlineExercise
  | B2OpinionChoiceExercise
  | B2MatchPairsDragDropExercise
  | B2GrammarTableExercise;

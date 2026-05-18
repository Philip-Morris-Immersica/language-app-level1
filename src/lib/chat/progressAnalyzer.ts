/**
 * Universal analyzer for exercise saved states.
 *
 * The `exerciseStatesTable.state` JSON varies per exercise type, but most
 * components follow a similar shape:
 *   - `isSubmitted` / `checked` — boolean, indicates the user clicked "Provери"
 *   - `validation` / `blankValidation` — record of `{key: boolean}` where false = wrong
 *   - `answers` / `selectedAnswers` / `matches` / `slotContents` — what the user wrote
 *
 * We extract a per-exercise summary that is compact enough to fit in the
 * system prompt but rich enough for the bot to give targeted feedback.
 */

export interface ExerciseProgressSummary {
  exerciseId: string;
  /** true if the user clicked "Check" at least once */
  submitted: boolean;
  /** number of answers marked wrong by the validator */
  wrongCount: number;
  /** number of answers marked correct */
  rightCount: number;
  /** compact JSON of what the user actually wrote, capped in size */
  userAnswers: string;
}

export interface LessonProgressSummary {
  lessonId: string;
  totalExercises: number;
  attemptedExerciseIds: string[];
  exercisesWithMistakes: ExerciseProgressSummary[];
  exercisesAllCorrect: string[];
  notAttemptedExerciseIds: string[];
}

const MAX_ANSWER_JSON_CHARS = 350;
const MAX_REPORTED_MISTAKES = 8;

type AnyRecord = Record<string, unknown>;
type RawState = AnyRecord;

function isObject(v: unknown): v is AnyRecord {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function countValidations(v: unknown): { wrong: number; right: number } {
  let wrong = 0;
  let right = 0;
  if (isObject(v)) {
    for (const val of Object.values(v)) {
      if (val === true) right++;
      else if (val === false) wrong++;
      else if (isObject(val)) {
        const inner = countValidations(val);
        wrong += inner.wrong;
        right += inner.right;
      } else if (Array.isArray(val)) {
        for (const inner of val) {
          if (inner === true) right++;
          else if (inner === false) wrong++;
        }
      }
    }
  }
  return { wrong, right };
}

function extractValidationFields(state: RawState): { wrong: number; right: number } {
  let wrong = 0;
  let right = 0;
  // Common keys across all exercise components
  const keys = ['validation', 'blankValidation'];
  for (const k of keys) {
    if (state[k] !== undefined) {
      const c = countValidations(state[k]);
      wrong += c.wrong;
      right += c.right;
    }
  }
  // Some components keep validation nested per row/section (e.g. WordOrder.questionStates,
  // DialogueBuilder.sectionStates, MatchPairs).
  for (const nestedKey of ['questionStates', 'sectionStates', 'matches']) {
    const nested = state[nestedKey];
    if (isObject(nested) || Array.isArray(nested)) {
      const c = countValidations(nested);
      wrong += c.wrong;
      right += c.right;
    }
  }
  return { wrong, right };
}

function extractIsSubmitted(state: RawState): boolean {
  // Most components use `isSubmitted`; TrueFalse uses `checked`; WordSearch derives from foundWords.
  if (state.isSubmitted === true) return true;
  if (state.checked === true) return true;
  // Heuristic: if any validation entry exists, the user has checked at least once
  const { right, wrong } = extractValidationFields(state);
  if (right + wrong > 0) return true;
  // WordSearch — submitted has truthy foundWords array
  if (Array.isArray(state.foundWords) && state.foundWords.length > 0) return true;
  // SyllableBlocks stores `completed` array on success
  if (Array.isArray(state.completed) && state.completed.length > 0) return true;
  return false;
}

function compactUserAnswers(state: RawState): string {
  // Pick the most informative answer-bearing fields
  const fields = [
    'answers',
    'selectedAnswers',
    'matches',
    'slotContents',
    'foundWords',
    'completed',
    'questionStates',
    'sectionStates',
  ];
  const picked: AnyRecord = {};
  for (const f of fields) {
    if (state[f] !== undefined) picked[f] = state[f];
  }
  let json: string;
  try {
    json = JSON.stringify(picked);
  } catch {
    return '';
  }
  if (json.length > MAX_ANSWER_JSON_CHARS) {
    json = json.slice(0, MAX_ANSWER_JSON_CHARS - 1) + '…';
  }
  return json;
}

/**
 * Build a per-lesson summary from raw `exerciseStatesTable` rows for the user.
 * `totalExercises` is the total count of exercises in the lesson (used for
 * "completed N / total" labelling). `validExerciseIds` constrains which IDs
 * we include — anything else (orphan from a renamed exercise) is ignored.
 */
export function summarizeLessonProgress(
  lessonId: string,
  rows: Array<{ exerciseId: string; state: string }>,
  totalExercises: number,
  validExerciseIds?: Set<string>,
): LessonProgressSummary {
  const exercisesWithMistakes: ExerciseProgressSummary[] = [];
  const exercisesAllCorrect: string[] = [];
  const attempted: string[] = [];

  for (const row of rows) {
    if (validExerciseIds && !validExerciseIds.has(row.exerciseId)) continue;
    let parsed: RawState;
    try {
      parsed = JSON.parse(row.state) as RawState;
    } catch {
      continue;
    }
    if (!isObject(parsed)) continue;

    attempted.push(row.exerciseId);
    const submitted = extractIsSubmitted(parsed);
    const { wrong, right } = extractValidationFields(parsed);

    if (!submitted) continue;

    if (wrong > 0) {
      exercisesWithMistakes.push({
        exerciseId: row.exerciseId,
        submitted,
        wrongCount: wrong,
        rightCount: right,
        userAnswers: compactUserAnswers(parsed),
      });
    } else if (right > 0) {
      exercisesAllCorrect.push(row.exerciseId);
    }
  }

  // Sort mistakes — most-wrong first — so prompt focuses on the worst
  exercisesWithMistakes.sort((a, b) => b.wrongCount - a.wrongCount);

  const notAttempted: string[] = [];
  if (validExerciseIds) {
    const attemptedSet = new Set(attempted);
    for (const id of validExerciseIds) {
      if (!attemptedSet.has(id)) notAttempted.push(id);
    }
  }

  return {
    lessonId,
    totalExercises,
    attemptedExerciseIds: attempted,
    exercisesWithMistakes: exercisesWithMistakes.slice(0, MAX_REPORTED_MISTAKES),
    exercisesAllCorrect,
    notAttemptedExerciseIds: notAttempted.slice(0, 20),
  };
}

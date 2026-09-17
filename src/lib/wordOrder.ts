/**
 * Answer checking for `word_order` exercises — shared by the lesson UI
 * (`WordOrder.tsx`, `A2WordOrder.tsx`) and the test scorer (`testScoring.ts`)
 * so a sentence can never be accepted in a lesson but rejected in a test.
 *
 * Punctuation is a separate draggable token in the content files (e.g.
 * `words: ['език', 'ще', …, '.']`). Sentence-final punctuation is treated as
 * OPTIONAL: a learner who orders every word correctly but leaves the final
 * „." / „?" / „!" token unused is counted correct. Punctuation placed in the
 * MIDDLE of the sentence is still wrong.
 */

interface WordOrderAnswers {
  correctSentence: string;
  alternateCorrectSentences?: string[];
}

/**
 * Lowercases, collapses whitespace, glues punctuation to the preceding word
 * („език ." → „език.") and finally drops sentence-final punctuation.
 */
export function normaliseWordOrderSentence(input: string): string {
  return input
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\s+([.,!?;:…])/g, '$1')
    .replace(/[.!?…]+$/, '')
    .trim();
}

/** Whether the built token list matches the correct sentence or any alternate. */
export function isWordOrderAnswerCorrect(
  built: string[] | undefined,
  question: WordOrderAnswers,
): boolean {
  const attempt = normaliseWordOrderSentence((built ?? []).join(' '));
  if (!attempt) return false;
  const accepted = [question.correctSentence, ...(question.alternateCorrectSentences ?? [])];
  return accepted.some((sentence) => normaliseWordOrderSentence(sentence) === attempt);
}

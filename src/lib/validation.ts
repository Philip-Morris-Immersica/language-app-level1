// Validation utilities for exercise answers

/**
 * Normalize text for comparison
 * - Converts to lowercase
 * - Trims whitespace
 * - Removes extra spaces
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ');
}

/**
 * Check if two strings are equal (case-insensitive, whitespace-normalized)
 */
export function isExactMatch(answer: string, correct: string): boolean {
  return normalizeText(answer) === normalizeText(correct);
}

/**
 * Check if answer matches any of the correct answers
 */
export function matchesAny(answer: string, correctAnswers: string[]): boolean {
  const normalized = normalizeText(answer);
  return correctAnswers.some(correct => normalizeText(correct) === normalized);
}

/**
 * Calculate Levenshtein distance between two strings
 * Used for fuzzy matching
 */
function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

/**
 * Fuzzy match - accepts answers that are close to correct
 * @param answer User's answer
 * @param correct Correct answer
 * @param threshold Maximum allowed distance (default: 2 characters)
 */
export function fuzzyMatch(answer: string, correct: string, threshold: number = 2): boolean {
  const normAnswer = normalizeText(answer);
  const normCorrect = normalizeText(correct);
  
  if (normAnswer === normCorrect) return true;
  
  const distance = levenshteinDistance(normAnswer, normCorrect);
  return distance <= threshold;
}

/**
 * Check if answer is close to any correct answer
 */
export function fuzzyMatchesAny(answer: string, correctAnswers: string[], threshold: number = 2): boolean {
  return correctAnswers.some(correct => fuzzyMatch(answer, correct, threshold));
}

/**
 * Validate Bulgarian Cyrillic characters
 * Useful for checking if user is typing in correct alphabet
 */
export function hasCyrillicCharacters(text: string): boolean {
  const cyrillicPattern = /[\u0400-\u04FF]/;
  return cyrillicPattern.test(text);
}

/**
 * Calculate similarity percentage between two strings
 */
export function calculateSimilarity(a: string, b: string): number {
  const maxLength = Math.max(a.length, b.length);
  if (maxLength === 0) return 100;
  
  const distance = levenshteinDistance(a, b);
  return Math.round(((maxLength - distance) / maxLength) * 100);
}

/**
 * Validate numeric answer
 */
export function isNumericMatch(answer: string, correct: number): boolean {
  const parsed = parseFloat(answer.replace(/,/g, '.'));
  return !isNaN(parsed) && parsed === correct;
}

/**
 * Extract numbers from text
 */
export function extractNumbers(text: string): number[] {
  const matches = text.match(/\d+/g);
  return matches ? matches.map(Number) : [];
}

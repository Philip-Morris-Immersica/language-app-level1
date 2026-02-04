// Scoring utilities for exercises and tests

/**
 * Calculate score for an exercise
 * @param correctCount Number of correct answers
 * @param totalCount Total number of questions
 * @param maxPoints Maximum points available
 */
export function calculateExerciseScore(
  correctCount: number,
  totalCount: number,
  maxPoints: number
): number {
  if (totalCount === 0) return 0;
  return Math.round((correctCount / totalCount) * maxPoints);
}

/**
 * Calculate percentage score
 */
export function calculatePercentage(correctCount: number, totalCount: number): number {
  if (totalCount === 0) return 0;
  return Math.round((correctCount / totalCount) * 100);
}

/**
 * Get grade based on percentage
 */
export function getGrade(percentage: number): string {
  if (percentage >= 90) return 'Отличен';
  if (percentage >= 75) return 'Много добър';
  if (percentage >= 60) return 'Добър';
  if (percentage >= 50) return 'Среден';
  return 'Слаб';
}

/**
 * Get emoji based on score percentage
 */
export function getScoreEmoji(percentage: number): string {
  if (percentage >= 90) return '🌟';
  if (percentage >= 75) return '😊';
  if (percentage >= 60) return '🙂';
  if (percentage >= 50) return '😐';
  return '😞';
}

/**
 * Calculate weighted score across multiple sections
 * @param sections Array of {score, maxScore, weight}
 */
export function calculateWeightedScore(
  sections: { score: number; maxScore: number; weight?: number }[]
): { totalScore: number; totalMaxScore: number; percentage: number } {
  let totalScore = 0;
  let totalMaxScore = 0;

  sections.forEach(section => {
    const weight = section.weight || 1;
    totalScore += (section.score / section.maxScore) * section.maxScore * weight;
    totalMaxScore += section.maxScore * weight;
  });

  return {
    totalScore: Math.round(totalScore),
    totalMaxScore: Math.round(totalMaxScore),
    percentage: calculatePercentage(Math.round(totalScore), Math.round(totalMaxScore)),
  };
}

/**
 * Format score for display
 */
export function formatScore(score: number, maxScore: number): string {
  return `${score}/${maxScore}`;
}

/**
 * Get motivational message based on score
 */
export function getMotivationalMessage(percentage: number): string {
  if (percentage >= 90) {
    return 'Отлично! Справихте се перфектно!';
  }
  if (percentage >= 75) {
    return 'Много добре! Продължавайте така!';
  }
  if (percentage >= 60) {
    return 'Добра работа! Продължавайте да се учите.';
  }
  if (percentage >= 50) {
    return 'Неразе! Опитайте отново за по-добър резултат.';
  }
  return 'Продължавайте да практикувате. Всяко повторение ви прави по-добри!';
}

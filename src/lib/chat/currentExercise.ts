/**
 * Tiny client-side store for "which exercise is on screen right now".
 *
 * The lesson/test page and the (separately-mounted) global ChatbotPanel live in
 * different React trees, so a React context can't bridge them. This module-level
 * holder does: an IntersectionObserver on the page writes the visible exercise
 * here, and the chat panel reads it when the user sends a message.
 */

export interface CurrentExercise {
  /** On-screen number the user sees (mirrors the page rendering). */
  number: number;
  /** Unique exercise id — disambiguates lesson vs Преговор when numbers repeat. */
  id: string;
}

let current: CurrentExercise | null = null;

export function setCurrentExercise(value: CurrentExercise | null): void {
  current = value;
}

export function getCurrentExercise(): CurrentExercise | null {
  return current;
}

export function clearCurrentExercise(): void {
  current = null;
}

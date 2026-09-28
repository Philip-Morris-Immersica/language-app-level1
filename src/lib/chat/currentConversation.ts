/**
 * Tiny client-side store for "which chat conversation id is currently active".
 *
 * ChatbotPanel (owns conversationId state) and the feedback button in
 * ChatbotWidget's header live in different parts of the component tree but are
 * always mounted together, so a full React context is overkill. Same pattern
 * as `currentExercise.ts` — ChatbotPanel writes here whenever its
 * conversationId changes, the feedback dialog reads it on submit.
 */

let current: number | null = null;

export function setCurrentConversationId(value: number | null): void {
  current = value;
}

export function getCurrentConversationId(): number | null {
  return current;
}

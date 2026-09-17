import type { ReactNode } from 'react';

/** Converts **bold** markers in plain text into <strong> elements. Shared by
 *  ExerciseRenderer, WorkbookFillBlank, LessonHeaderClient and GrammarTable so
 *  content authors can use the same `**word**` syntax anywhere user-facing
 *  text is rendered (instructions, subtitles, descriptions, notes). */
export function renderBoldText(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

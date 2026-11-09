import type { ReactNode } from 'react';

const MARKER = /(\*\*[^*]+\*\*|__[^_]+__)/g;

/** `**…**` = удебелено зелено + подчертаване; `__…__` = черно удебелено (като в учебника). */
export function renderGrammarText(text: string, base: 'green' | 'neutral' = 'green'): ReactNode {
  const parts = text.split(MARKER);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const inner = part.slice(2, -2);
      return (
        <strong
          key={i}
          className={
            base === 'green'
              ? 'underline decoration-2 underline-offset-[3px]'
              : 'text-[#3f9a3a] underline decoration-2 underline-offset-[3px]'
          }
        >
          {inner}
        </strong>
      );
    }
    if (part.startsWith('__') && part.endsWith('__')) {
      return (
        <strong key={i} className="text-gray-900 font-bold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

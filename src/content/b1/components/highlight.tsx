/**
 * Shared rendering of `**bold**` markers in B1 content.
 *
 * The markers stand for the "думите са в зелено" instructions printed in the
 * textbook, so they must read as green at a glance. The previous pairing
 * (dark green text on the pale `#DAF6EB` tint) disappeared whenever the
 * surrounding box already used that tint — the words only looked bold.
 *
 * Inline styles instead of Tailwind classes: `content[]` does not scan
 * `src/content/`, so `text-[#…]` / `bg-[#…]` written here would be purged.
 */
import type { CSSProperties } from 'react';

/** Light highlighter: bright green on a pale mint chip — readable, not near-black. */
export const HIGHLIGHT_STYLE: CSSProperties = {
  color: '#16A34A',
  backgroundColor: '#DCFCE7',
};

export const HIGHLIGHT_CLASS = 'font-extrabold rounded px-1 py-[0.05em]';

export function HighlightedText({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className={HIGHLIGHT_CLASS} style={HIGHLIGHT_STYLE}>
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

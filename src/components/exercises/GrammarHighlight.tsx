'use client';

import { Info } from 'lucide-react';
import { useT } from '@/i18n/useT';
import { useTranslate } from '@/i18n/useTranslate';
import type { GrammarHighlight as GrammarHighlightProps } from '@/content/types';

interface Props {
  highlight: GrammarHighlightProps;
}

export function GrammarHighlight({ highlight }: Props) {
  const t = useT();
  const translatedText = useTranslate(highlight.text ?? '');
  const displayText = highlight.textKey ? t(highlight.textKey as Parameters<typeof t>[0]) : translatedText;

  if (!displayText && !highlight.examples?.length) return null;

  return (
    <div className="mb-5 flex gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-900">
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-green-600" aria-hidden />
      <div className="space-y-1.5">
        {displayText && <p>{displayText}</p>}
        {highlight.examples && highlight.examples.length > 0 && (
          <ul className="space-y-0.5 font-medium">
            {highlight.examples.map((ex, i) => (
              <li key={i}>{ex}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

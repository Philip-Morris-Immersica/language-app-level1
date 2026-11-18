'use client';

import { useT } from '@/i18n/useT';

/**
 * Green „Модел:“ box — the same look as the shared `qa-stacked` model.
 * One `<p>` per line; `**…**` = bold green (the model answer), `__…__` = bold black (as in the textbook).
 */
export function ModelBox({ lines }: { lines: string[] }) {
  const t = useT();
  return (
    <div className="mb-5 p-4 border-2 border-[#8B9D5F] rounded-lg bg-[#f8faf4]">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{t('exercise.model')}</p>
      {lines.map((line, i) => (
        <p key={i} className="text-base text-gray-700">
          {line.split(/(\*\*[^*]+\*\*|__[^_]+__)/g).map((part, j) =>
            (part.startsWith('**') && part.endsWith('**')) || (part.startsWith('__') && part.endsWith('__')) ? (
              <span key={j} className="font-bold text-[#4a6b1f]">
                {part.slice(2, -2)}
              </span>
            ) : (
              part
            ),
          )}
        </p>
      ))}
    </div>
  );
}

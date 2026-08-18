'use client';

import { useLayoutEffect, useRef } from 'react';
import { TableFill as SharedTableFill } from '@/components/exercises/TableFill';
import { GrammarHighlight } from '@/components/exercises/GrammarHighlight';
import type { GrammarHighlight as GrammarHighlightData } from '@/content/types';

interface Props {
  exercise: {
    id: string;
    type: string;
    tables?: {
      name: string;
      /** Header for the leftmost label column (shared TableFill leaves it empty). */
      labelHeader?: string;
      columns: string[];
      rows: {
        label: string;
        cells: { correctAnswers: string[]; options: string[] }[];
      }[];
    }[];
    paragraphs?: { speaker?: string; text: string }[];
    /** Optional second green info box, rendered after ExerciseRenderer's grammarHighlight and before the tables. */
    preTableHighlight?: GrammarHighlightData;
  };
  onComplete?: (correct: boolean, score: number) => void;
  exerciseId?: string;
}

/**
 * B1 TableFill — hides the column-header row when all `columns` entries are empty.
 * Also supports `preTableHighlight` for a second info box right under the main
 * grammarHighlight (e.g. пазар/хотел after the -ЯТ note).
 */
export function TableFill({ exercise, onComplete, exerciseId }: Props) {
  const tables = exercise.tables ?? [];
  const hideColHeaders = tables.every((t) =>
    (t.columns ?? []).every((c) => !(c ?? '').trim()),
  );
  const id = exerciseId ?? exercise.id;
  const pre = exercise.preTableHighlight;
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const headerRows = root.querySelectorAll('thead tr');
    tables.forEach((table, i) => {
      if (!table.labelHeader) return;
      const firstTh = headerRows[i]?.querySelector('th');
      if (firstTh && !firstTh.textContent?.trim()) {
        firstTh.textContent = table.labelHeader;
      }
    });
  }, [tables]);

  return (
    <div ref={rootRef} className={hideColHeaders ? '[&_thead]:hidden' : undefined}>
      {pre && (
        <div className="mb-5">
          <GrammarHighlight highlight={pre} exerciseId={id} />
        </div>
      )}
      <SharedTableFill
        tables={tables}
        paragraphs={exercise.paragraphs}
        onComplete={onComplete}
        exerciseId={id}
      />
    </div>
  );
}

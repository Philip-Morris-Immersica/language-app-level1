'use client';

import { TableFill as SharedTableFill } from '@/components/exercises/TableFill';

interface Props {
  exercise: {
    id: string;
    type: string;
    tables?: {
      name: string;
      columns: string[];
      rows: {
        label: string;
        cells: { correctAnswers: string[]; options: string[] }[];
      }[];
    }[];
    paragraphs?: { speaker?: string; text: string }[];
  };
  onComplete?: (correct: boolean, score: number) => void;
  exerciseId?: string;
}

/**
 * B1 TableFill — hides the column-header row when all `columns` entries are empty.
 * Keeps shared TableFill behavior otherwise (no edits to shared/).
 */
export function TableFill({ exercise, onComplete, exerciseId }: Props) {
  const tables = exercise.tables ?? [];
  const hideColHeaders = tables.every((t) =>
    (t.columns ?? []).every((c) => !(c ?? '').trim()),
  );

  return (
    <div className={hideColHeaders ? '[&_thead]:hidden' : undefined}>
      <SharedTableFill
        tables={tables}
        paragraphs={exercise.paragraphs}
        onComplete={onComplete}
        exerciseId={exerciseId ?? exercise.id}
      />
    </div>
  );
}

'use client';

import { WorkbookFillBlank as SharedWorkbookFillBlank } from '@/components/exercises/WorkbookFillBlank';
import type { WorkbookFillBlankExercise } from '@/content/types';

interface Props {
  exercise: WorkbookFillBlankExercise & { compact?: boolean };
  onComplete?: (correct: boolean, score: number) => void;
  exerciseId?: string;
}

/**
 * B1 workbook_fill_blank — optional `compact: true` for tighter single-column
 * exercises (shorter dropdown rows, less vertical padding).
 */
export function WorkbookFillBlank({ exercise, onComplete, exerciseId }: Props) {
  const {
    compact,
    sentences,
    layout,
    columnSplitAt,
    hideSentenceNumbers,
    columnLabels,
    imageUrl,
    noZoom,
    images,
    headerImages,
    listeningText,
  } = exercise;

  const body = (
    <SharedWorkbookFillBlank
      sentences={sentences}
      layout={layout}
      columnSplitAt={columnSplitAt}
      hideSentenceNumbers={compact ? true : hideSentenceNumbers}
      columnLabels={columnLabels}
      imageUrl={imageUrl}
      noZoom={noZoom}
      images={images}
      headerImages={headerImages}
      listeningText={listeningText}
      onComplete={onComplete}
      exerciseId={exerciseId}
    />
  );

  if (!compact) return body;

  return (
    <div
      className="
        max-w-xl mx-auto
        [&_.space-y-2]:space-y-1
        [&_.py-2]:py-1
        [&_select]:text-sm [&_select]:py-0
        [&_.text-base]:text-sm [&_.text-base]:md:text-base
        [&_.leading-relaxed]:leading-snug
      "
    >
      {body}
    </div>
  );
}

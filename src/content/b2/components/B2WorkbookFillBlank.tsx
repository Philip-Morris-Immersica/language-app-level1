'use client';

import { WorkbookFillBlank as SharedWorkbookFillBlank } from '@/components/exercises/WorkbookFillBlank';
import type { WorkbookFillBlankExercise } from '@/content/types';

interface Props {
  exercise: WorkbookFillBlankExercise;
  onComplete?: (correct: boolean, score: number) => void;
  exerciseId?: string;
}

function getOptionsForBlank(options: string[] | string[][] | undefined, blankIdx: number): string[] {
  if (!options || options.length === 0) return [];
  if (Array.isArray(options[0])) return (options as string[][])[blankIdx] || [];
  return options as string[];
}

/** Няма „—“ в опциите → без празен ред (напр. упр. 17: само се/си). */
function inferHideDropdownPlaceholder(exercise: WorkbookFillBlankExercise): boolean {
  const scored = exercise.sentences.filter(s => !s.isExample && s.blanks.length > 0);
  if (scored.length === 0) return false;
  return scored.every(sentence => {
    const { options, blanks } = sentence;
    if (!options) return false;
    for (let b = 0; b < blanks.length; b++) {
      const pool = getOptionsForBlank(options, b);
      if (pool.length === 0 || pool.includes('—')) return false;
    }
    return true;
  });
}

function stripOptionSi(sentences: WorkbookFillBlankExercise['sentences']) {
  return sentences.map(s => {
    if (!s.options) return s;
    const dropSi = (pool: string[]) => pool.filter(o => o !== 'си');
    if (Array.isArray(s.options[0])) {
      return { ...s, options: (s.options as string[][]).map(dropSi) };
    }
    return { ...s, options: dropSi(s.options as string[]) };
  });
}

/** B2 workbook_fill_blank — optional `hideDropdownPlaceholder` (no „—“ / „Избери“ row in dropdowns). */
export function B2WorkbookFillBlank({ exercise, onComplete, exerciseId }: Props) {
  const id = exerciseId ?? exercise.id;
  const {
    sentences: rawSentences,
    layout,
    columnSplitAt,
    hideSentenceNumbers,
    columnLabels,
    imageUrl,
    noZoom,
    images,
    headerImages,
    listeningText,
    hideDropdownPlaceholder,
    blankDropdownOptions,
  } = exercise;

  const sentences = id === 'b2-l04-ex-13' ? stripOptionSi(rawSentences) : rawSentences;
  const hidePlaceholder = Boolean(hideDropdownPlaceholder) || inferHideDropdownPlaceholder(exercise);

  return (
    <SharedWorkbookFillBlank
      sentences={sentences}
      layout={layout}
      columnSplitAt={columnSplitAt}
      hideSentenceNumbers={hideSentenceNumbers}
      columnLabels={columnLabels}
      imageUrl={imageUrl}
      noZoom={noZoom}
      images={images}
      headerImages={headerImages}
      listeningText={listeningText}
      hideDropdownPlaceholder={hidePlaceholder}
      blankDropdownOptions={blankDropdownOptions}
      onComplete={onComplete}
      exerciseId={id}
    />
  );
}

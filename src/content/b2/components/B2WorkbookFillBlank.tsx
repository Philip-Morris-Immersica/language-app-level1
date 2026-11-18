'use client';

import { WorkbookFillBlank as SharedWorkbookFillBlank } from '@/components/exercises/WorkbookFillBlank';
import type { WorkbookFillBlankExercise } from '@/content/types';
import type { B2WorkbookFillBlankExtras } from '../types';
import { ModelBox } from './ModelBox';

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

/** Model rows → box lines: each blank gets its answer as `**…**`, `|` splits a row into lines. */
function modelLines(rows: WorkbookFillBlankExercise['sentences']): string[] {
  return rows.flatMap(row => {
    let i = 0;
    const filled = row.text.replace(/_{3,}/g, () => `**${row.correctAnswers[i++] ?? ''}**`);
    return filled.split('|').map(part => part.trim()).filter(Boolean);
  });
}

/** Nested shared card loses its own frame; qa-stacked numbers turn grey. */
const FLAT_CSS = `
.b2-wfb-flat > div { padding: 0 !important; box-shadow: none !important; border-radius: 0 !important; }
.b2-wfb-plain-num span.text-\\[\\#0072BC\\] { color: #737373; }
`;

/**
 * B2 workbook_fill_blank — optional `hideDropdownPlaceholder` (no „—“ / „Избери“ row in dropdowns);
 * `modelBox` / `plainNumbers` see `B2WorkbookFillBlankExtras`.
 */
export function B2WorkbookFillBlank({ exercise, onComplete, exerciseId }: Props) {
  const id = exerciseId ?? exercise.id;
  const { modelBox, plainNumbers } = exercise as WorkbookFillBlankExercise & B2WorkbookFillBlankExtras;
  const {
    sentences: allSentences,
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

  const model = modelBox ? modelLines(allSentences.filter(s => s.isExample)) : [];
  const rawSentences = modelBox ? allSentences.filter(s => !s.isExample) : allSentences;
  const sentences = id === 'b2-l04-ex-13' ? stripOptionSi(rawSentences) : rawSentences;
  const hidePlaceholder = Boolean(hideDropdownPlaceholder) || inferHideDropdownPlaceholder(exercise);

  const shared = (
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

  if (model.length === 0 && !plainNumbers) return shared;

  return (
    <>
      <style>{FLAT_CSS}</style>
      {model.length > 0 ? (
        <div className="bg-white rounded-xl p-6 md:p-8 shadow-md">
          <ModelBox lines={model} />
          <div className={`b2-wfb-flat${plainNumbers ? ' b2-wfb-plain-num' : ''}`}>{shared}</div>
        </div>
      ) : (
        <div className="b2-wfb-plain-num">{shared}</div>
      )}
    </>
  );
}

'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { CheckCircle2, RotateCcw, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useT } from '@/i18n/useT';
import { useExercisePersistence } from '@/hooks/useExercisePersistence';
import type { B2SelectWordsInlineExercise } from '../types';

interface Props {
  exercise: B2SelectWordsInlineExercise;
  onComplete?: (correct: boolean, score: number) => void;
  exerciseId?: string;
}

interface SavedState {
  selected?: string[];
  submitted?: boolean;
}

const tokenKey = (blockId: string, tokenId: string) => `${blockId}:${tokenId}`;

export function SelectWordsInline({ exercise, onComplete, exerciseId }: Props) {
  const t = useT();
  const { savedState, saveState } = useExercisePersistence(exerciseId);
  const restored = savedState as SavedState | undefined;
  const [selected, setSelected] = useState<string[]>(() => restored?.selected ?? []);
  const [submitted, setSubmitted] = useState(() => restored?.submitted ?? false);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    saveState({ selected, submitted });
  }, [saveState, selected, submitted]);

  const correctIds = useMemo(
    () =>
      new Set(
        exercise.blocks.flatMap(block =>
          block.tokens
            .filter(token => token.correct && token.selectable !== false)
            .map(token => tokenKey(block.id, token.id)),
        ),
      ),
    [exercise.blocks],
  );

  const selectedSet = useMemo(() => new Set(selected), [selected]);
  const correctSelected = selected.filter(id => correctIds.has(id)).length;
  const wrongSelected = selected.filter(id => !correctIds.has(id)).length;
  const maxPoints = exercise.points ?? correctIds.size;
  const exactMatch =
    selected.length === correctIds.size && selected.every(id => correctIds.has(id));
  // Proportional credit with a penalty for wrong picks: a learner who misses one
  // word out of forty still scores, but selecting everything scores nothing.
  const netCorrect = Math.max(0, correctSelected - wrongSelected);
  const score =
    correctIds.size === 0 ? 0 : Math.round((netCorrect / correctIds.size) * maxPoints);

  const toggle = (id: string) => {
    if (submitted) return;
    setSelected(current =>
      current.includes(id) ? current.filter(item => item !== id) : [...current, id],
    );
  };

  const submit = () => {
    if (exercise.mode !== 'scored' || selected.length === 0) return;
    setSubmitted(true);
    onComplete?.(exactMatch, score);
  };

  const reset = () => {
    setSelected([]);
    setSubmitted(false);
  };

  return (
    <div className="rounded-xl bg-white p-4 shadow-md md:p-8">
      <div className="space-y-5">
        {exercise.blocks.map(block => (
          <section key={block.id} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            {block.heading && (
              <h4 className="mb-3 font-bold text-[#0072BC]">{block.heading}</h4>
            )}
            <p className="text-base leading-9 text-gray-900 md:text-lg">
              {block.tokens.map(token => {
                const selectionId = tokenKey(block.id, token.id);
                const selectable = token.selectable !== false;
                const isSelected = selectedSet.has(selectionId);
                const isCorrect = correctIds.has(selectionId);
                const missed = submitted && isCorrect && !isSelected;
                const wrong = submitted && isSelected && !isCorrect;
                const accepted = submitted && isSelected && isCorrect;

                if (!selectable) {
                  return (
                    <span key={token.id}>
                      {token.text}
                      {token.trailing ?? ' '}
                    </span>
                  );
                }

                return (
                  <span key={token.id}>
                    <button
                      type="button"
                      aria-pressed={isSelected}
                      disabled={submitted}
                      onClick={() => toggle(selectionId)}
                      className={[
                        'inline rounded px-0.5 py-1 text-start transition-colors',
                        !submitted && isSelected
                          ? 'bg-[#DAF6EB] font-semibold text-[#1F5741] underline decoration-2 underline-offset-4'
                          : '',
                        !submitted && !isSelected
                          ? 'hover:bg-[#DAF6EB]/60 hover:underline hover:underline-offset-4'
                          : '',
                        accepted
                          ? 'bg-[#DAF6EB] font-semibold text-[#1F5741] underline decoration-2 underline-offset-4'
                          : '',
                        wrong
                          ? 'bg-[#FCE2DE] text-[#683229] line-through decoration-2'
                          : '',
                        missed
                          ? 'bg-[#FEF1D1] text-[#684D0B] underline decoration-dashed decoration-2 underline-offset-4'
                          : '',
                      ].join(' ')}
                    >
                      {token.text}
                    </button>
                    {token.trailing ?? ' '}
                  </span>
                );
              })}
            </p>
          </section>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        {exercise.mode === 'scored' && !submitted && (
          <Button
            onClick={submit}
            disabled={selected.length === 0}
            className="min-h-[48px] rounded-lg bg-[#32C189] px-6 py-3 text-base font-semibold text-white hover:bg-[#257958] disabled:bg-[#E5E5E5] disabled:text-[#737373]"
          >
            {t('exercise.checkAnswers')}
          </Button>
        )}

        {exercise.mode === 'scored' && submitted && (
          <div
            className={`flex min-h-[48px] items-center gap-2 rounded-lg px-5 py-3 font-bold text-white ${
              exactMatch ? 'bg-[#32C189]' : 'bg-[#D25A45]'
            }`}
          >
            {exactMatch ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
            {t('exercise.result')} {score} / {maxPoints}
          </div>
        )}

        <div className="text-sm text-gray-500">
          {t('b2.exercise.selectedCount')} {selected.length}
        </div>

        <Button
          variant="outline"
          onClick={reset}
          className="min-h-[48px] rounded-lg px-5 py-3 text-base font-semibold"
        >
          <RotateCcw className="me-2 h-4 w-4" />
          {t('exercise.reset')}
        </Button>
      </div>
    </div>
  );
}

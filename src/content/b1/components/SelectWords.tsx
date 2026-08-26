'use client';

import { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useT } from '@/i18n/useT';
import { useExercisePersistence } from '@/hooks/useExercisePersistence';
import type { B1SelectWordsExercise } from '../types';

interface Props {
  exercise: B1SelectWordsExercise;
  onComplete?: (correct: boolean, score: number) => void;
  exerciseId?: string;
}

interface SavedState {
  picks?: Record<string, string[]>;
  submitted?: boolean;
}

/**
 * „Подчертайте правилните думи" — tap every word in the sentence that fits.
 * Multi-select, unlike `multiple_choice`; see `../types.ts` for the rationale.
 *
 * A sentence scores only on an exact match with its correct set, so a learner
 * can't get credit by tapping everything. After checking, a missed correct word
 * is outlined in yellow rather than left blank, so the sentence can still be
 * read back in its intended form.
 */
export function SelectWords({ exercise, onComplete, exerciseId }: Props) {
  const { sentences, hideExpectedCount } = exercise;
  const t = useT();
  const { savedState, saveState } = useExercisePersistence(exerciseId);
  const restored = savedState as SavedState | undefined;

  const [picks, setPicks] = useState<Record<string, string[]>>(() => restored?.picks ?? {});
  const [submitted, setSubmitted] = useState(() => restored?.submitted ?? false);

  useEffect(() => {
    saveState({ picks, submitted });
  }, [picks, submitted, saveState]);

  const correctSets = useMemo(
    () =>
      Object.fromEntries(
        sentences.map(s => [s.id, new Set(s.words.filter(w => w.correct).map(w => w.text))]),
      ) as Record<string, Set<string>>,
    [sentences],
  );

  const toggleWord = (sentenceId: string, word: string) => {
    if (submitted) return;
    setPicks(prev => {
      const current = prev[sentenceId] ?? [];
      return {
        ...prev,
        [sentenceId]: current.includes(word)
          ? current.filter(w => w !== word)
          : [...current, word],
      };
    });
  };

  const answeredCount = sentences.filter(s => (picks[s.id]?.length ?? 0) > 0).length;
  const allAnswered = answeredCount === sentences.length;

  const isSentenceCorrect = (sentenceId: string) => {
    const picked = picks[sentenceId] ?? [];
    const expected = correctSets[sentenceId];
    return picked.length === expected.size && picked.every(w => expected.has(w));
  };

  const score = sentences.filter(s => isSentenceCorrect(s.id)).length;

  const handleSubmit = () => {
    if (!allAnswered) return;
    setSubmitted(true);
    onComplete?.(score === sentences.length, score);
  };

  const handleReset = () => {
    setPicks({});
    setSubmitted(false);
  };

  return (
    <div className="bg-white rounded-xl p-4 md:p-8 shadow-md">
      <div className="bg-[#E5E5E5]/60 border-l-4 border-[#32C189] p-3 mb-4 rounded">
        <p className="text-sm md:text-base text-[#262626]">
          <strong>{t('b1.exercise.tapToSortHowTo')}</strong> {t('b1.exercise.selectWordsHowTo')}
        </p>
      </div>

      <div className="mb-5">
        <div className="flex items-center justify-between text-sm text-[#737373] mb-1.5">
          <span>{t('exercise.progress')}</span>
          <span className="font-bold">
            {answeredCount} / {sentences.length}
          </span>
        </div>
        <div className="w-full bg-[#E5E5E5] rounded-full h-2">
          <div
            className="bg-[#32C189] h-2 rounded-full transition-all duration-300"
            style={{ width: `${(answeredCount / sentences.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {sentences.map((sentence, sIdx) => {
          const picked = picks[sentence.id] ?? [];
          const expected = correctSets[sentence.id];
          const sentenceCorrect = submitted && isSentenceCorrect(sentence.id);

          return (
            <div
              key={sentence.id}
              className={`rounded-xl border-2 p-3 md:p-4 transition-colors ${
                !submitted
                  ? 'border-[#E5E5E5] bg-[#F5F5F5]'
                  : sentenceCorrect
                    ? 'border-[#32C189] bg-[#DAF6EB]'
                    : 'border-[#D25A45] bg-[#FCE2DE]'
              }`}
            >
              <div className="flex items-start gap-2 mb-2">
                <span className="shrink-0 w-6 h-6 rounded-full bg-[#0072BC] text-white text-xs font-bold flex items-center justify-center mt-0.5">
                  {sIdx + 1}
                </span>
                <p className="text-sm md:text-base text-[#262626] font-medium leading-relaxed">
                  {sentence.before}
                </p>
                {submitted && (
                  <span className="ms-auto shrink-0 mt-0.5">
                    {sentenceCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-[#32C189]" />
                    ) : (
                      <XCircle className="w-5 h-5 text-[#D25A45]" />
                    )}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-2 ps-8">
                {sentence.words.map((word, wIdx) => {
                  const isPicked = picked.includes(word.text);
                  const isCorrectWord = expected.has(word.text);

                  let chipClass =
                    'bg-white border-[#E5E5E5] text-[#262626] hover:border-[#32C189] hover:bg-[#DAF6EB]';
                  if (!submitted && isPicked) {
                    chipClass = 'bg-[#32C189] border-[#32C189] text-white shadow-sm';
                  } else if (submitted && isPicked && isCorrectWord) {
                    chipClass = 'bg-white border-[#32C189] text-[#1F5741] font-semibold';
                  } else if (submitted && isPicked && !isCorrectWord) {
                    chipClass = 'bg-white border-[#D25A45] text-[#683229] line-through';
                  } else if (submitted && !isPicked && isCorrectWord) {
                    chipClass = 'bg-[#FEF1D1] border-[#FFC740] border-dashed text-[#684D0B]';
                  } else if (submitted) {
                    chipClass = 'bg-white border-[#E5E5E5] text-[#737373]';
                  }

                  return (
                    <button
                      key={`${sentence.id}-${wIdx}`}
                      type="button"
                      onClick={() => toggleWord(sentence.id, word.text)}
                      disabled={submitted}
                      className={`min-h-[48px] px-4 py-2 rounded-lg border-2 text-sm md:text-base transition-colors ${
                        submitted ? '' : 'active:scale-95'
                      } ${chipClass}`}
                    >
                      {word.text}
                      {submitted && !isPicked && isCorrectWord && (
                        <span className="ms-1.5 text-[10px] font-bold uppercase tracking-wide">
                          {t('b1.exercise.selectWordsMissed')}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {sentence.after && (
                <p className="ps-8 mt-2 text-sm md:text-base text-[#262626] font-medium">
                  {sentence.after}
                </p>
              )}

              {!hideExpectedCount && (
                <p className="ps-8 mt-2 text-xs text-[#737373]">
                  {t('b1.exercise.selectWordsSelected')} {picked.length} / {expected.size}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-3 mt-6">
        {!submitted ? (
          <Button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className="bg-[#32C189] hover:bg-[#257958] text-white px-6 py-3 min-h-[48px] rounded-lg font-semibold text-base shadow-md active:scale-95 transition-colors disabled:bg-[#E5E5E5] disabled:text-[#737373] disabled:cursor-not-allowed"
          >
            {t('exercise.checkAnswers')}
          </Button>
        ) : (
          <div
            className={`px-5 py-3 min-h-[48px] flex items-center rounded-lg font-bold text-white text-base shadow-md ${
              score === sentences.length ? 'bg-[#32C189]' : 'bg-[#D25A45]'
            }`}
          >
            {t('exercise.result')} {score} / {sentences.length}
          </div>
        )}
        <Button
          variant="outline"
          onClick={handleReset}
          className="px-5 py-3 min-h-[48px] rounded-lg font-semibold text-base active:scale-95 transition-colors"
        >
          <RotateCcw className="w-4 h-4 me-2" />
          {t('exercise.reset')}
        </Button>
      </div>
    </div>
  );
}

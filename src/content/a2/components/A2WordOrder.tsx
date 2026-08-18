'use client';

/**
 * A2 variant of the shared WordOrder (src/components/exercises/WordOrder.tsx).
 *
 * Why a copy: Nina's domain may not edit the shared exercise component. The
 * shared one has a robustness bug that surfaces as „провери не работи" (clicking
 * Check does nothing): its init effect skips initialization entirely when ANY
 * saved state exists, and `handleSubmit` then reads `questionStates[index].built`
 * for every question. If the persisted state is partial or stale (e.g. saved by
 * an older version of the lesson, before questions were added/reordered), some
 * indices stay `undefined` and the click handler throws a silent TypeError — the
 * button appears dead.
 *
 * Behavioural difference vs. the shared version: initialization ALWAYS backfills
 * a fresh state object for EVERY question and then overlays only the saved
 * entries that are still valid for the current word set — so no index can be
 * left `undefined` and a stale cache can never poison „Провери". `handleSubmit`
 * also reads defensively. Restore-on-reload is preserved. Everything else
 * (build/reset, per-question validation, scoring) is identical. No audio → no
 * TTS-pipeline impact.
 *
 * Registered as the opt-in type `'a2-word-order'` in `../exercise-components.ts`
 * (A1 / other A2 lessons using `'word_order'` are NOT affected).
 *
 * SYNC: if the shared WordOrder changes, mirror the change here.
 */

import { useState, useEffect, useRef } from 'react';
import { Check, X, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useT } from '@/i18n/useT';
import { useExercisePersistence } from '@/hooks/useExercisePersistence';

interface WordOrderQuestion {
  words: string[];
  correctSentence: string;
  alternateCorrectSentences?: string[];
  hint?: string;
}

interface WordOrderShape {
  id: string;
  type: string;
  points?: number;
  questions: WordOrderQuestion[];
}

interface QuestionState {
  available: string[];
  built: string[];
  validation: boolean | null;
}

// A multiset check: the saved `available`+`built` must be exactly the current
// question's words (same items, same counts). Otherwise the saved entry is
// stale (words changed) and is discarded in favour of a fresh state.
function matchesWordSet(saved: QuestionState | undefined, words: string[]): boolean {
  if (!saved || !Array.isArray(saved.available) || !Array.isArray(saved.built)) return false;
  const combined = [...saved.available, ...saved.built];
  if (combined.length !== words.length) return false;
  const counts = new Map<string, number>();
  for (const w of words) counts.set(w, (counts.get(w) ?? 0) + 1);
  for (const w of combined) {
    const c = counts.get(w);
    if (!c) return false;
    counts.set(w, c - 1);
  }
  return true;
}

function A2WordOrderBase({
  questions,
  points,
  exerciseId,
  onComplete,
}: {
  questions: WordOrderQuestion[];
  points?: number;
  exerciseId?: string;
  onComplete?: (correct: boolean, score: number) => void;
}) {
  const t = useT();
  const { savedState, saveState } = useExercisePersistence(exerciseId);
  const saved = savedState as { questionStates?: Record<number, QuestionState>; isSubmitted?: boolean } | undefined;

  // Fresh state for every question, with any still-valid saved entry overlaid.
  const buildStates = (): Record<number, QuestionState> => {
    const savedStates = saved?.questionStates ?? {};
    const states: Record<number, QuestionState> = {};
    questions.forEach((question, index) => {
      const prior = savedStates[index];
      states[index] = matchesWordSet(prior, question.words)
        ? { available: [...prior.available], built: [...prior.built], validation: prior.validation ?? null }
        : { available: [...question.words], built: [], validation: null };
    });
    return states;
  };

  const [questionStates, setQuestionStates] =
    useState<Record<number, QuestionState>>(buildStates);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(() => saved?.isSubmitted ?? false);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    saveState({ questionStates, isSubmitted });
  }, [questionStates, isSubmitted]);

  // Rebuild whenever the question set changes (never leaves an index undefined).
  useEffect(() => {
    if (!mounted.current) return;
    setQuestionStates(buildStates());
    setIsSubmitted(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions]);

  const clearValidation = () => {
    setIsSubmitted(false);
    setQuestionStates(prev => {
      const next = { ...prev };
      Object.keys(next).forEach(k => {
        next[Number(k)] = { ...next[Number(k)], validation: null };
      });
      return next;
    });
  };

  const handleWordClick = (questionIndex: number, word: string, fromBuilt: boolean) => {
    if (isSubmitted) clearValidation();

    setQuestionStates(prev => {
      const state = prev[questionIndex];
      if (!state) return prev;
      if (fromBuilt) {
        return {
          ...prev,
          [questionIndex]: {
            ...state,
            built: state.built.filter(w => w !== word),
            available: [...state.available, word],
          },
        };
      }
      return {
        ...prev,
        [questionIndex]: {
          ...state,
          available: state.available.filter(w => w !== word),
          built: [...state.built, word],
        },
      };
    });
  };

  const handleReset = (questionIndex: number) => {
    setQuestionStates(prev => {
      const state = prev[questionIndex];
      if (!state) return prev;
      return {
        ...prev,
        [questionIndex]: {
          ...state,
          available: [...state.available, ...state.built],
          built: [],
        },
      };
    });
  };

  const handleSubmit = () => {
    const newStates = { ...questionStates };
    let correctCount = 0;

    questions.forEach((question, index) => {
      const state = newStates[index] ?? { available: [], built: [], validation: null };
      const builtSentence = state.built.join(' ').toLowerCase().trim();
      const allValid = [question.correctSentence, ...(question.alternateCorrectSentences ?? [])];
      const isCorrect = allValid.some(s => builtSentence === s.toLowerCase().trim());
      newStates[index] = { ...state, validation: isCorrect };
      if (isCorrect) correctCount++;
    });

    setQuestionStates(newStates);
    setIsSubmitted(true);

    if (onComplete) {
      const total = questions.length;
      const score = points ? (correctCount / total) * points : correctCount;
      onComplete(correctCount === total, score);
    }
  };

  return (
    <div className="bg-white rounded-xl p-8 md:p-10 shadow-md">
      <div className="space-y-10">
        {questions.map((question, qIndex) => {
          const state = questionStates[qIndex];
          if (!state) return null;

          return (
            <div key={qIndex} className="space-y-5">
              <div className="flex items-start justify-between gap-4">
                <p className="text-lg font-semibold text-gray-800">
                  {qIndex + 1}.
                </p>
                {question.hint && (
                  <div className="flex-1 text-right">
                    <span className="text-base text-gray-600 italic bg-gray-100 px-3 py-1 rounded-lg">
                      {question.hint}
                    </span>
                  </div>
                )}
                {state.built.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleReset(qIndex)}
                    className="text-gray-600 hover:text-gray-800 shrink-0"
                  >
                    <RotateCcw className="w-4 h-4 mr-1" />
                    {t('exercise.reset')}
                  </Button>
                )}
              </div>

              {/* Built sentence area */}
              <div className={`
                min-h-[100px] p-5 rounded-xl border-2 flex flex-wrap gap-3 items-center shadow-sm
                ${state.validation === true ? 'border-green-500 bg-green-50' : ''}
                ${state.validation === false ? 'border-[#D25A45] bg-[#FCE2DE]/40' : ''}
                ${state.validation === null ? 'border-gray-300 bg-gray-50' : ''}
              `}>
                {state.built.length === 0 ? (
                  <span className="text-gray-400 text-base">{t('exercise.buildSentence')}</span>
                ) : (
                  <>
                    {state.built.map((word, wIndex) => (
                      <button
                        key={wIndex}
                        onClick={() => handleWordClick(qIndex, word, true)}
                        className="
                          px-4 py-3 rounded-xl border-2 border-[#32C189] bg-[#DAF6EB] shadow-sm
                          font-semibold text-base min-h-[52px] active:scale-95 transition-all
                          hover:bg-white hover:shadow-md cursor-pointer
                        "
                      >
                        {word}
                      </button>
                    ))}
                    {isSubmitted && (
                      <span className="ml-2">
                        {state.validation ? (
                          <Check className="w-7 h-7 text-green-600" />
                        ) : (
                          <X className="w-7 h-7 text-[#D25A45]" />
                        )}
                      </span>
                    )}
                  </>
                )}
              </div>

              {/* Available words */}
              {state.available.length > 0 && (
                <div className="p-5 rounded-xl bg-[#DAF6EB]">
                  <div className="flex flex-wrap gap-3">
                    {state.available.map((word, wIndex) => (
                      <button
                        key={wIndex}
                        onClick={() => handleWordClick(qIndex, word, false)}
                        className="
                          px-4 py-3 rounded-xl border-2 border-gray-300 bg-white shadow-sm
                          font-semibold text-base min-h-[52px] active:scale-95
                          hover:border-[#32C189] hover:bg-[#DAF6EB] hover:shadow-md
                          cursor-pointer transition-all
                        "
                      >
                        {word}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Show correct answer if wrong */}
              {isSubmitted && state.validation === false && (
                <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                  <p className="text-sm text-yellow-800">
                    <strong>{t('exercise.correctAnswer')}</strong> {question.correctSentence}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <Button
        onClick={handleSubmit}
        className="mt-8 bg-[#32C189] hover:bg-[#257958] text-base font-semibold px-8 py-6 w-full sm:w-auto min-h-[52px] active:scale-95 transition-transform"
      >
        {t('exercise.check')}
      </Button>

      {isSubmitted && (
        <div className="mt-8 p-5 rounded-xl bg-[#DAF6EB] animate-in fade-in duration-300">
          <p className="text-base font-semibold text-gray-800">
            {t('exercise.result')} {Object.values(questionStates).filter(s => s.validation === true).length} / {questions.length} {t('exercise.correct_n')}
          </p>
        </div>
      )}
    </div>
  );
}

/** Adapter for the A2 custom-renderer signature ({ exercise, onComplete, exerciseId }). */
export function A2WordOrder({
  exercise,
  onComplete,
  exerciseId,
}: {
  exercise: { id: string; type: string; [key: string]: unknown };
  onComplete?: (correct: boolean, score: number) => void;
  exerciseId?: string;
}) {
  const ex = exercise as unknown as WordOrderShape;
  return (
    <A2WordOrderBase
      questions={ex.questions}
      points={ex.points}
      exerciseId={exerciseId ?? ex.id}
      onComplete={onComplete}
    />
  );
}

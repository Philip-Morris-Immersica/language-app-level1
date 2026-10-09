'use client';

import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useT } from '@/i18n/useT';
import { useExercisePersistence } from '@/hooks/useExercisePersistence';
import type { B2OpinionChoiceExercise } from '../types';

interface Props {
  exercise: B2OpinionChoiceExercise;
  onComplete?: (correct: boolean, score: number) => void;
  exerciseId?: string;
}

interface SavedState {
  choices?: Record<string, string>;
}

export function OpinionChoice({ exercise, onComplete, exerciseId }: Props) {
  const t = useT();
  const { savedState, saveState } = useExercisePersistence(exerciseId);
  const restored = savedState as SavedState | undefined;
  const [choices, setChoices] = useState<Record<string, string>>(
    () => restored?.choices ?? {},
  );
  const mounted = useRef(false);
  const completed = useRef(
    Object.keys(restored?.choices ?? {}).length === exercise.questions.length,
  );

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    saveState({ choices });
  }, [choices, saveState]);

  useEffect(() => {
    if (
      !completed.current &&
      exercise.questions.every(question => Boolean(choices[question.id]))
    ) {
      completed.current = true;
      onComplete?.(true, 0);
    }
  }, [choices, exercise.questions, onComplete]);

  const choose = (questionId: string, optionId: string) => {
    setChoices(current => ({ ...current, [questionId]: optionId }));
  };

  const reset = () => {
    setChoices({});
    completed.current = false;
  };

  const answered = exercise.questions.filter(question => choices[question.id]).length;

  return (
    <div className="rounded-xl bg-white p-4 shadow-md md:p-8">
      <div className="mb-5 flex items-center justify-between text-sm text-gray-500">
        <span>{t('exercise.progress')}</span>
        <span className="font-bold">
          {answered} / {exercise.questions.length}
        </span>
      </div>

      <div className="space-y-5">
        {exercise.questions.map((question, questionIndex) => {
          const selected = choices[question.id];
          return (
            <section
              key={question.id}
              className="rounded-xl border border-gray-200 bg-gray-50 p-4"
            >
              <h4 className="mb-3 text-base font-semibold leading-relaxed text-gray-900 md:text-lg">
                {questionIndex + 1}. {question.statement}
              </h4>
              <div className="grid gap-2">
                {question.options.map((option, optionIndex) => {
                  const isSelected = selected === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => choose(question.id, option.id)}
                      className={`flex min-h-[48px] items-start gap-3 rounded-lg border-2 px-4 py-3 text-start transition-colors ${
                        isSelected
                          ? 'border-[#32C189] bg-[#DAF6EB] text-[#1F5741]'
                          : 'border-gray-200 bg-white text-gray-800 hover:border-[#32C189]/60'
                      }`}
                    >
                      <span className="font-bold">
                        {String.fromCharCode(65 + optionIndex)}.
                      </span>
                      <span className="flex-1">{option.text}</span>
                      {isSelected && <CheckCircle2 className="h-5 w-5 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        {answered === exercise.questions.length && (
          <div className="flex min-h-[48px] items-center gap-2 rounded-lg bg-[#DAF6EB] px-5 py-3 font-semibold text-[#1F5741]">
            <CheckCircle2 className="h-5 w-5" />
            {t('b2.exercise.choiceSaved')}
          </div>
        )}
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

'use client';

import { useState, useEffect, useRef } from 'react';
import { Check, RotateCcw, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useT } from '@/i18n/useT';
import { useExercisePersistence } from '@/hooks/useExercisePersistence';
import type { A2FreeFillExercise } from '@/content/a2/types';

interface FreeFillProps {
  exercise: A2FreeFillExercise;
  onComplete?: (correct: boolean, score: number) => void;
  exerciseId?: string;
}

export function FreeFill({ exercise, onComplete, exerciseId }: FreeFillProps) {
  const t = useT();
  const id = exerciseId ?? exercise.id;
  const { savedState, saveState } = useExercisePersistence(id);
  const s = savedState as { answers?: Record<number, string>; isSubmitted?: boolean } | null;

  const [answers, setAnswers] = useState<Record<number, string>>(() => s?.answers ?? {});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(() => s?.isSubmitted ?? false);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    saveState({ answers, isSubmitted });
  }, [answers, isSubmitted, saveState]);

  const handleChange = (idx: number, value: string) => {
    if (isSubmitted) setIsSubmitted(false);
    setAnswers(prev => ({ ...prev, [idx]: value }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    const filled = exercise.sentences.filter((_, i) => (answers[i] || '').trim() !== '').length;
    onComplete?.(true, filled);
  };

  const handleReset = () => {
    setAnswers({});
    setIsSubmitted(false);
    saveState({ answers: {}, isSubmitted: false });
  };

  return (
    <div className="bg-white rounded-xl p-6 md:p-8 shadow-md">
      <div className="space-y-3">
        {exercise.sentences.map((sentence, idx) => {
          const value = answers[idx] || '';
          const filled = value.trim() !== '';
          const hasOptions = sentence.options && sentence.options.length > 0;

          return (
            <div
              key={idx}
              className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                isSubmitted && filled
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <span className="font-semibold text-gray-700 shrink-0 min-w-[90px]">
                {sentence.label}:
              </span>

              {hasOptions ? (
                <div className="relative flex-1">
                  <select
                    value={value}
                    onChange={e => handleChange(idx, e.target.value)}
                    className={`w-full appearance-none border-b-2 bg-transparent px-1 py-0.5 text-base font-medium focus:outline-none transition-colors pr-7 cursor-pointer ${
                      isSubmitted && filled
                        ? 'border-green-500 text-green-700'
                        : 'border-[#0072BC] focus:border-[#025a93] text-gray-800'
                    } ${!filled ? 'text-gray-400' : ''}`}
                  >
                    <option value="" disabled>— изберете —</option>
                    {sentence.options!.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              ) : (
                <input
                  type="text"
                  value={value}
                  onChange={e => handleChange(idx, e.target.value)}
                  placeholder="..."
                  className={`flex-1 border-b-2 bg-transparent px-1 py-0.5 text-base font-medium focus:outline-none transition-colors ${
                    isSubmitted && filled
                      ? 'border-green-500 text-green-700'
                      : 'border-[#0072BC] focus:border-[#025a93]'
                  }`}
                />
              )}

              {isSubmitted && filled && (
                <Check className="w-5 h-5 text-green-600 shrink-0" />
              )}
            </div>
          );
        })}
      </div>

      <div className="flex gap-3 mt-6">
        <Button
          onClick={handleSubmit}
          className="bg-[#32C189] hover:bg-[#257958] text-base font-semibold px-8 py-3 w-full sm:w-auto min-h-[48px] active:scale-95 transition-transform rounded-lg"
        >
          {t('exercise.checkAnswers')}
        </Button>
        <Button
          variant="outline"
          onClick={handleReset}
          className="text-base font-semibold px-6 py-3 min-h-[48px] active:scale-95 transition-transform rounded-lg border-2"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          {t('exercise.reset')}
        </Button>
      </div>

      {isSubmitted && (
        <div className="mt-6 p-4 rounded-lg bg-[#DAF6EB] animate-in fade-in duration-300">
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-green-600" />
            <p className="font-semibold text-gray-800">
              {t('exercise.allCorrect')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

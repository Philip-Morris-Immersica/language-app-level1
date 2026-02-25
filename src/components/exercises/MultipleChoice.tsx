'use client';

import { useState, useEffect, useRef } from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useT } from '@/i18n/useT';
import type { MultipleChoiceExercise } from '@/content/types';
import { useExercisePersistence } from '@/hooks/useExercisePersistence';

interface MultipleChoiceProps {
  exercise: MultipleChoiceExercise;
  onComplete?: (correct: boolean, score: number) => void;
}

export function MultipleChoice({ exercise, onComplete }: MultipleChoiceProps) {
  const t = useT();
  const { savedState, saveState } = useExercisePersistence(exercise.id);
  const s = savedState as any;
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>(() => s?.selectedAnswers ?? {});
  const [validation, setValidation] = useState<{ [key: number]: boolean | null }>(() => s?.validation ?? {});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(() => s?.isSubmitted ?? false);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    saveState({ selectedAnswers, validation, isSubmitted });
  }, [selectedAnswers, validation, isSubmitted]);

  const handleSelect = (questionIndex: number, optionIndex: number) => {
    if (isSubmitted) return;
    
    setSelectedAnswers(prev => ({ ...prev, [questionIndex]: optionIndex }));
    
    // Clear validation for this question
    if (validation[questionIndex] !== null) {
      setValidation(prev => ({ ...prev, [questionIndex]: null }));
    }
  };

  const handleSubmit = () => {
    const newValidation: { [key: number]: boolean } = {};
    let correctCount = 0;

    exercise.questions.forEach((question, index) => {
      const selected = selectedAnswers[index];
      const isCorrect = selected === question.correctIndex;
      newValidation[index] = isCorrect;
      if (isCorrect) correctCount++;
    });

    setValidation(newValidation);
    setIsSubmitted(true);

    if (onComplete) {
      const totalQuestions = exercise.questions.length;
      const score = exercise.points ? (correctCount / totalQuestions) * exercise.points : correctCount;
      onComplete(correctCount === totalQuestions, score);
    }
  };

  return (
    <div className="bg-white rounded-xl p-8 md:p-10 shadow-md">
      <div className="space-y-8">
        {exercise.questions.map((question, qIndex) => (
          <div key={qIndex} className="space-y-4">
            <p className="text-lg font-semibold text-gray-800">
              {qIndex + 1}. {question.question}
            </p>

            <div className="space-y-3 pl-4">
              {question.options.map((option, oIndex) => {
                const isSelected = selectedAnswers[qIndex] === oIndex;
                const isCorrect = oIndex === question.correctIndex;
                const showCorrect = isSubmitted && isCorrect;
                const showIncorrect = isSubmitted && isSelected && !isCorrect;

                return (
                  <button
                    key={oIndex}
                    onClick={() => handleSelect(qIndex, oIndex)}
                    disabled={isSubmitted}
                    className={`
                      w-full text-left px-5 py-4 rounded-xl border-2 transition-all shadow-sm
                      min-h-[56px] flex items-center gap-4 active:scale-[0.98]
                      ${isSelected && !isSubmitted ? 'border-[#8FC412] bg-[#EEF7C8] shadow-md' : 'border-gray-300'}
                      ${showCorrect ? 'border-green-500 bg-green-50' : ''}
                      ${showIncorrect ? 'border-red-500 bg-red-50' : ''}
                      ${!isSubmitted ? 'hover:border-[#8FC412] hover:bg-[#EEF7C8] hover:shadow-md cursor-pointer' : 'cursor-default'}
                    `}
                  >
                    <div
                      className={`
                        w-6 h-6 rounded-full border-2 flex-shrink-0
                        ${isSelected ? 'border-bolt-primary' : 'border-gray-400'}
                        ${showCorrect ? 'border-green-500' : ''}
                        ${showIncorrect ? 'border-red-500' : ''}
                      `}
                    >
                      {isSelected && (
                        <div className={`
                          w-3.5 h-3.5 rounded-full m-[3px]
                          ${!isSubmitted ? 'bg-[#8FC412]' : ''}
                          ${showCorrect ? 'bg-green-500' : ''}
                          ${showIncorrect ? 'bg-red-500' : ''}
                        `} />
                      )}
                    </div>
                    
                    <span className="flex-1 text-base font-medium">{option}</span>

                    {showCorrect && <Check className="w-6 h-6 text-green-600 flex-shrink-0" />}
                    {showIncorrect && <X className="w-6 h-6 text-red-600 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>

            {isSubmitted && validation[qIndex] !== null && (
              <div className={`
                mt-2 p-3 rounded text-sm
                ${validation[qIndex] ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}
              `}>
                {validation[qIndex] ? `✓ ${t('exercise.correct')}` : `✗ ${t('exercise.wrongLabel')}`}
              </div>
            )}
          </div>
        ))}
      </div>

      {!isSubmitted && (
        <Button
          onClick={handleSubmit}
          className="mt-8 bg-[#8FC412] hover:bg-[#7DAD0E] text-base font-semibold px-8 py-6 w-full sm:w-auto min-h-[52px] active:scale-95 transition-transform"
          disabled={false}
        >
          {t('exercise.check')}
        </Button>
      )}

      {isSubmitted && (
        <div className="mt-8 p-5 rounded-xl bg-[#EEF7C8] animate-in fade-in duration-300">
          <p className="text-base font-semibold text-gray-800">
            {t('exercise.result')} {Object.values(validation).filter(v => v === true).length} / {exercise.questions.length} {t('exercise.correct_n')}
          </p>
        </div>
      )}
    </div>
  );
}

'use client';

import { useState, useEffect, useRef } from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useT } from '@/i18n/useT';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useExercisePersistence } from '@/hooks/useExercisePersistence';

interface DropdownQuestion {
  id: string;
  left: string;
  options: string[];
  correctAnswer: string;
}

interface DropdownMatchProps {
  questions: DropdownQuestion[];
  onComplete?: (correct: boolean, score: number) => void;
  exerciseId?: string;
}

export function DropdownMatch({ questions, onComplete, exerciseId }: DropdownMatchProps) {
  const t = useT();
  const { savedState, saveState } = useExercisePersistence(exerciseId);
  const s = savedState as any;
  const [answers, setAnswers] = useState<{ [key: string]: string }>(() => s?.answers ?? {});
  const [validation, setValidation] = useState<{ [key: string]: boolean | null }>(() => s?.validation ?? {});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(() => s?.isSubmitted ?? false);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    saveState({ answers, validation, isSubmitted });
  }, [answers, validation, isSubmitted]);

  const handleSelect = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    if (isSubmitted) {
      setIsSubmitted(false);
      setValidation({});
    }
  };

  const handleSubmit = () => {
    const newValidation: { [key: string]: boolean } = {};
    let correctCount = 0;

    questions.forEach(q => {
      if (q.options.length === 0) return; // skip example items
      const isCorrect = answers[q.id]?.toLowerCase() === q.correctAnswer.toLowerCase();
      newValidation[q.id] = isCorrect;
      if (isCorrect) correctCount++;
    });

    setValidation(newValidation);
    setIsSubmitted(true);

    if (onComplete) {
      const score = (correctCount / questions.length) * questions.length;
      onComplete(correctCount === questions.length, score);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 md:p-8 shadow-md">
      <div className="space-y-4">
        {questions.map((question, index) => (
          <div
            key={question.id}
            className={`
              bg-white rounded-xl border-2 p-4 md:p-5 transition-all
              ${validation[question.id] === true ? 'border-green-500 bg-green-50' : ''}
              ${validation[question.id] === false ? 'border-red-500 bg-red-50' : ''}
              ${validation[question.id] === null ? 'border-gray-300' : ''}
            `}
          >
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm md:text-lg font-semibold text-gray-700 min-w-[1.5rem] md:min-w-[2rem]">
                {index + 1}.
              </span>

              {(() => {
                const parts = question.left.split('…');
                const hasSplit = parts.length === 2;
                const before = hasSplit ? parts[0] : question.left;
                const after = hasSplit ? parts[1] : '';

                return (
                  <>
                    {before && (
                      <span className="text-sm md:text-lg font-bold text-gray-800">
                        {before.trim()}
                      </span>
                    )}

                    {question.options.length === 0 ? (
                      question.correctAnswer ? (
                        <span className="text-sm md:text-lg font-bold text-[#6B8543]">{question.correctAnswer}</span>
                      ) : null
                    ) : (
                      <Select
                        value={answers[question.id] || ''}
                        onValueChange={(value) => handleSelect(question.id, value)}
                      >
                        <SelectTrigger className={`
                          w-28 md:w-36 h-8 md:h-10 text-sm md:text-base font-semibold
                          ${validation[question.id] === true ? 'border-green-500 bg-green-50' : ''}
                          ${validation[question.id] === false ? 'border-red-500 bg-red-50' : ''}
                        `}>
                          <SelectValue placeholder={t('exercise.selectOption')} />
                        </SelectTrigger>
                        <SelectContent>
                          {question.options.map((option) => (
                            <SelectItem key={option} value={option} className="text-sm md:text-base">
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}

                    {after && (
                      <span className="text-sm md:text-lg font-bold text-gray-800">
                        {after.trim()}
                      </span>
                    )}

                    {validation[question.id] === true && (
                      <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
                    )}
                    {validation[question.id] === false && (
                      <X className="w-6 h-6 text-red-600 flex-shrink-0" />
                    )}
                  </>
                );
              })()}
            </div>

            {isSubmitted && validation[question.id] === false && (
              <div className="mt-3 p-2 rounded bg-yellow-50 border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  <strong>{t('exercise.correctLabel')}</strong> {question.left.replace('…', question.correctAnswer)}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <Button
        onClick={handleSubmit}
        className="mt-6 bg-[#8FC412] hover:bg-[#7DAD0E] text-white text-base font-semibold px-8 py-3 w-full sm:w-auto min-h-[48px] active:scale-95 transition-transform rounded-lg"
      >
        {t('exercise.checkAnswers')}
      </Button>

      {isSubmitted && (
        <div className="mt-6 p-4 rounded-lg bg-white border-2 border-[#8B9D5F] animate-in fade-in duration-300">
          <div className="flex items-center gap-2">
            {Object.values(validation).every(v => v === true) ? (
              <Check className="w-6 h-6 text-green-600" />
            ) : (
              <X className="w-6 h-6 text-red-600" />
            )}
            <p className="text-base font-semibold text-gray-800">
              {t('exercise.result')} {Object.values(validation).filter(v => v === true).length} / {questions.length} {t('exercise.correct_n')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

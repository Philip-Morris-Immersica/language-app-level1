'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { Check, X, RotateCcw } from 'lucide-react';
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
  leftImageUrl?: string;
  options: string[];
  correctAnswer: string;
  alternateCorrectAnswers?: string[];
  isExample?: boolean;
}

interface DropdownMatchProps {
  questions: DropdownQuestion[];
  onComplete?: (correct: boolean, score: number) => void;
  exerciseId?: string;
  imageUrl?: string;
  images?: { imageUrl: string; label: string }[];
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function DropdownMatch({ questions, onComplete, exerciseId, imageUrl, images }: DropdownMatchProps) {
  const t = useT();
  const { savedState, saveState } = useExercisePersistence(exerciseId);
  const s = savedState as any;

  const shuffledOptionsMap = useMemo(() => {
    const map: Record<string, string[]> = {};
    questions.forEach(q => {
      map[q.id] = shuffleArray(q.options);
    });
    return map;
  }, [questions]);
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

  const handleReset = () => {
    setAnswers({});
    setValidation({});
    setIsSubmitted(false);
    saveState({ answers: {}, validation: {}, isSubmitted: false });
  };

  const handleSubmit = () => {
    const newValidation: { [key: string]: boolean } = {};
    let correctCount = 0;
    const gradedQuestions = questions.filter(q => !q.isExample && q.options.length > 0);

    gradedQuestions.forEach(q => {
      const userAnswer = answers[q.id]?.toLowerCase();
      const allCorrect = [q.correctAnswer, ...(q.alternateCorrectAnswers ?? [])];
      const isCorrect = allCorrect.some(a => a.toLowerCase() === userAnswer);
      newValidation[q.id] = isCorrect;
      if (isCorrect) correctCount++;
    });

    setValidation(newValidation);
    setIsSubmitted(true);

    if (onComplete) {
      onComplete(correctCount === gradedQuestions.length, correctCount);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 md:p-8 shadow-md">
      {imageUrl ? (
        <div className="mb-6 flex justify-center">
          <img
            src={imageUrl}
            alt=""
            className="max-w-full max-h-[min(420px,70vh)] w-auto rounded-lg shadow-md object-contain border border-gray-100"
          />
        </div>
      ) : null}

      {images && images.length > 0 && (
        <div className={`grid gap-4 mb-6 ${images.length === 1 ? 'grid-cols-1 max-w-sm mx-auto' : images.length === 2 ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-3'}`}>
          {images.map((img, i) => (
            <div key={i} className="flex flex-col items-center">
              <img
                src={img.imageUrl}
                alt={img.label}
                className="w-full rounded-lg shadow-sm object-contain max-h-56 border border-gray-100"
                loading="lazy"
              />
              {img.label && (
                <span className="mt-2 text-sm font-semibold text-gray-700 text-center">{img.label}</span>
              )}
            </div>
          ))}
        </div>
      )}
      <div className="space-y-3 md:grid md:grid-cols-2 md:gap-3 md:space-y-0">
        {questions.map((question) => {
          const isImageMode = Boolean(question.leftImageUrl);

          if (question.isExample) {
            const parts = question.left.split('…');
            const hasSplit = parts.length === 2;
            const before = hasSplit ? parts[0] : question.left;
            const after = hasSplit ? parts[1] : '';
            return (
              <div
                key={question.id}
                className="bg-gray-50 rounded-xl border-2 border-gray-200 p-4 opacity-70 italic"
              >
                <span className="text-gray-400 text-xs font-semibold uppercase tracking-wide mr-2">Модел:</span>
                <span className="text-sm md:text-base text-gray-600">
                  {before.trim()}{before.trim() && ' '}
                  <span className="font-bold text-[#4a6b1f] not-italic">{question.correctAnswer}</span>
                  {after && ` ${after.trim()}`}
                </span>
              </div>
            );
          }

          return (
            <div
              key={question.id}
              className={`
                bg-white rounded-xl border-2 transition-all
                ${isImageMode ? 'p-3' : 'p-4 md:p-4'}
                ${validation[question.id] === true ? 'border-green-500 bg-green-50' : ''}
                ${validation[question.id] === false ? 'border-[#D25A45] bg-[#FCE2DE]/40' : ''}
                ${validation[question.id] === null || validation[question.id] === undefined ? 'border-gray-200' : ''}
              `}
            >
              {/* ── Image-mode: thumbnail + dropdown side-by-side ── */}
              {isImageMode ? (
                <div className="flex items-center gap-3">
                  <img
                    src={question.leftImageUrl}
                    alt={question.left}
                    className="w-24 h-24 sm:w-28 sm:h-28 object-contain rounded-lg flex-shrink-0 border border-gray-100 shadow-sm bg-white"
                  />
                  <div className="flex-1 min-w-0">
                    {question.options.length === 0 ? (
                      <span className="text-base font-bold text-[#6B8543]">{question.correctAnswer}</span>
                    ) : (
                      <Select
                        value={answers[question.id] || ''}
                        onValueChange={(value) => handleSelect(question.id, value)}
                      >
                        <SelectTrigger className={`
                          w-full h-10 text-sm sm:text-base font-semibold
                          ${validation[question.id] === true ? 'border-green-500 bg-green-50' : ''}
                          ${validation[question.id] === false ? 'border-[#D25A45] bg-[#FCE2DE]/40' : ''}
                        `}>
                          <SelectValue placeholder={t('exercise.selectOption')} />
                        </SelectTrigger>
                        <SelectContent>
                          {(shuffledOptionsMap[question.id] ?? question.options).map((option) => (
                            <SelectItem key={option} value={option} className="text-sm sm:text-base">
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                    {validation[question.id] === true && (
                      <p className="mt-1 text-xs text-green-700 font-semibold flex items-center gap-1">
                        <Check className="w-3 h-3" /> {question.correctAnswer}
                      </p>
                    )}
                    {isSubmitted && validation[question.id] === false && (
                      <p className="mt-1 text-xs text-[#683229] font-semibold flex items-center gap-1">
                        <X className="w-3 h-3" /> {t('exercise.correctLabel')} {question.correctAnswer}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                /* ── Text-mode: original layout ── */
                <>
                  <div className="flex items-center gap-2 flex-wrap">
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
                                ${validation[question.id] === false ? 'border-[#D25A45] bg-[#FCE2DE]/40' : ''}
                              `}>
                                <SelectValue placeholder={t('exercise.selectOption')} />
                              </SelectTrigger>
                              <SelectContent>
                                {(shuffledOptionsMap[question.id] ?? question.options).map((option) => (
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
                            <X className="w-6 h-6 text-[#D25A45] flex-shrink-0" />
                          )}
                        </>
                      );
                    })()}
                  </div>
                  {isSubmitted && validation[question.id] === false && (
                    <div className="mt-3 p-2 rounded bg-yellow-50 border border-yellow-200">
                      <p className="text-sm text-yellow-800">
                        <strong>{t('exercise.correctLabel')}</strong> {question.correctAnswer}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex gap-3 mt-6">
        <Button
          onClick={handleSubmit}
          className="bg-[#32C189] hover:bg-[#257958] text-white text-base font-semibold px-8 py-3 w-full sm:w-auto min-h-[48px] active:scale-95 transition-transform rounded-lg"
        >
          {t('exercise.checkAnswers')}
        </Button>
        <Button variant="outline" onClick={handleReset} className="text-base font-semibold px-6 py-3 min-h-[48px] active:scale-95 transition-transform rounded-lg border-2">
          <RotateCcw className="w-4 h-4 mr-2" />
          {t('exercise.reset')}
        </Button>
      </div>

      {isSubmitted && (
        <div className="mt-6 p-4 rounded-lg bg-white border-2 border-[#8B9D5F] animate-in fade-in duration-300">
          <div className="flex items-center gap-2">
            {Object.values(validation).every(v => v === true) ? (
              <Check className="w-6 h-6 text-green-600" />
            ) : (
              <X className="w-6 h-6 text-[#D25A45]" />
            )}
            <p className="text-base font-semibold text-gray-800">
              {t('exercise.result')} {Object.values(validation).filter(v => v === true).length} / {questions.filter(q => !q.isExample && q.options.length > 0).length} {t('exercise.correct_n')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

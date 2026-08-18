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
import type { A2PictureDropdownExercise, A2PictureDropdownQuestion } from '../types';

interface Props {
  exercise: A2PictureDropdownExercise;
  onComplete?: (correct: boolean, score: number) => void;
  exerciseId?: string;
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * A2 variant of DropdownMatch for picture-based questions:
 *  - single column (chronological order reads top-to-bottom)
 *  - slightly larger thumbnails than the shared image-mode
 */
export function PictureDropdownMatch({ exercise, onComplete, exerciseId }: Props) {
  const t = useT();
  const { savedState, saveState } = useExercisePersistence(exerciseId);
  const s = savedState as any;

  const { questions } = exercise;

  const shuffledOptionsMap = useMemo(() => {
    const map: Record<string, string[]> = {};
    questions.forEach(q => {
      map[q.id] = shuffleArray(q.options);
    });
    return map;
  }, [questions]);

  const [answers, setAnswers] = useState<Record<string, string>>(() => s?.answers ?? {});
  const [validation, setValidation] = useState<Record<string, boolean | null>>(() => s?.validation ?? {});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(() => s?.isSubmitted ?? false);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    saveState({ answers, validation, isSubmitted });
  }, [answers, validation, isSubmitted]);

  const handleSelect = (qId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [qId]: value }));
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
    const newValidation: Record<string, boolean> = {};
    let correctCount = 0;
    const graded = questions.filter(q => !q.isExample && q.options.length > 0);
    graded.forEach(q => {
      const userAnswer = answers[q.id]?.toLowerCase();
      const allCorrect = [q.correctAnswer, ...(q.alternateCorrectAnswers ?? [])];
      const isCorrect = allCorrect.some(a => a.toLowerCase() === userAnswer);
      newValidation[q.id] = isCorrect;
      if (isCorrect) correctCount++;
    });
    setValidation(newValidation);
    setIsSubmitted(true);
    onComplete?.(correctCount === graded.length, correctCount);
  };

  const isGrid = exercise.layout === 'grid';

  function renderCard(q: A2PictureDropdownQuestion, index: number) {
    const state = validation[q.id];
    return (
      <div
        key={q.id}
        className={`
          relative rounded-xl border-2 p-3 md:p-4 transition-all shadow-sm flex flex-col
          ${state === true ? 'border-green-500 bg-green-50' : ''}
          ${state === false ? 'border-[#D25A45] bg-[#FCE2DE]/40' : ''}
          ${state == null ? 'border-gray-200 bg-white' : ''}
        `}
      >
        {/* Sequential number badge (по поредност) */}
        <div className="absolute top-2 left-2 z-10 w-7 h-7 rounded-full bg-[#0072BC] text-white text-sm font-bold flex items-center justify-center shadow">
          {index + 1}
        </div>

        {isSubmitted && state != null && (
          <div className="absolute top-2 right-2 z-10">
            {state ? (
              <div className="w-7 h-7 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                <Check className="w-4 h-4 text-white" />
              </div>
            ) : (
              <div className="w-7 h-7 bg-[#D25A45] rounded-full flex items-center justify-center shadow-md">
                <X className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-center mb-3 min-h-[120px] md:min-h-[140px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={q.leftImageUrl}
            alt={q.left}
            className="object-contain rounded-lg w-full max-h-[120px] md:max-h-[140px] h-auto"
            loading="lazy"
          />
        </div>

        {q.options.length === 0 ? (
          <span className="text-base font-bold text-[#6B8543] text-center">{q.correctAnswer}</span>
        ) : (
          <Select
            value={answers[q.id] || ''}
            onValueChange={value => handleSelect(q.id, value)}
          >
            <SelectTrigger
              className={`
                w-full h-11 text-sm sm:text-base font-semibold
                ${state === true ? 'border-green-500 bg-green-50' : ''}
                ${state === false ? 'border-[#D25A45] bg-[#FCE2DE]/40' : ''}
              `}
            >
              <SelectValue placeholder={t('exercise.selectOption')} />
            </SelectTrigger>
            <SelectContent>
              {(shuffledOptionsMap[q.id] ?? q.options).map(option => (
                <SelectItem key={option} value={option} className="text-sm sm:text-base">
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {isSubmitted && state === false && (
          <p className="mt-2 text-xs sm:text-sm text-[#683229] font-semibold flex items-center gap-1">
            <X className="w-4 h-4" /> {t('exercise.correctLabel')} {q.correctAnswer}
          </p>
        )}
      </div>
    );
  }

  function renderRow(q: A2PictureDropdownQuestion) {
    const state = validation[q.id];
    return (
      <div
        key={q.id}
        className={`
          bg-white rounded-xl border-2 p-3 transition-all
          ${state === true ? 'border-green-500 bg-green-50' : ''}
          ${state === false ? 'border-[#D25A45] bg-[#FCE2DE]/40' : ''}
          ${state == null ? 'border-gray-200' : ''}
        `}
      >
        <div className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={q.leftImageUrl}
            alt={q.left}
            className="w-32 h-32 sm:w-40 sm:h-40 object-contain rounded-lg flex-shrink-0 border border-gray-100 shadow-sm bg-white"
            loading="lazy"
          />
          <div className="flex-1 min-w-0">
            {q.options.length === 0 ? (
              <span className="text-base font-bold text-[#6B8543]">{q.correctAnswer}</span>
            ) : (
              <Select
                value={answers[q.id] || ''}
                onValueChange={value => handleSelect(q.id, value)}
              >
                <SelectTrigger
                  className={`
                    w-full h-11 text-sm sm:text-base font-semibold
                    ${state === true ? 'border-green-500 bg-green-50' : ''}
                    ${state === false ? 'border-[#D25A45] bg-[#FCE2DE]/40' : ''}
                  `}
                >
                  <SelectValue placeholder={t('exercise.selectOption')} />
                </SelectTrigger>
                <SelectContent>
                  {(shuffledOptionsMap[q.id] ?? q.options).map(option => (
                    <SelectItem key={option} value={option} className="text-sm sm:text-base">
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            {state === true && (
              <p className="mt-2 text-xs sm:text-sm text-green-700 font-semibold flex items-center gap-1">
                <Check className="w-4 h-4" /> {q.correctAnswer}
              </p>
            )}
            {isSubmitted && state === false && (
              <p className="mt-2 text-xs sm:text-sm text-[#683229] font-semibold flex items-center gap-1">
                <X className="w-4 h-4" /> {t('exercise.correctLabel')} {q.correctAnswer}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 md:p-8 shadow-md">
      {isGrid ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
          {questions.map((q, i) => renderCard(q, i))}
        </div>
      ) : (
        <div className="space-y-3 max-w-2xl">
          {questions.map(q => renderRow(q))}
        </div>
      )}

      <div className="flex gap-3 mt-6">
        <Button
          onClick={handleSubmit}
          className="bg-[#32C189] hover:bg-[#257958] text-white text-base font-semibold px-8 py-3 w-full sm:w-auto min-h-[48px] active:scale-95 transition-transform rounded-lg"
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
        <div className="mt-6 p-4 rounded-lg bg-white border-2 border-[#8B9D5F] animate-in fade-in duration-300">
          <div className="flex items-center gap-2">
            {Object.values(validation).every(v => v === true) ? (
              <Check className="w-6 h-6 text-green-600" />
            ) : (
              <X className="w-6 h-6 text-[#D25A45]" />
            )}
            <p className="text-base font-semibold text-gray-800">
              {t('exercise.result')}{' '}
              {Object.values(validation).filter(v => v === true).length} /{' '}
              {questions.filter(q => !q.isExample && q.options.length > 0).length}{' '}
              {t('exercise.correct_n')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

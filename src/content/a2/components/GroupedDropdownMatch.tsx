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
import type { A2GroupedDropdownExercise, A2GroupedDropdownQuestion } from '../types';

interface Props {
  exercise: A2GroupedDropdownExercise;
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

/** Split a flat array into chunks of `size`. */
function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

export function GroupedDropdownMatch({ exercise, onComplete, exerciseId }: Props) {
  const t = useT();
  const { savedState, saveState } = useExercisePersistence(exerciseId);
  const s = savedState as any;

  const { questions, groupSize = 3 } = exercise;

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

  const interactiveQuestions = questions.filter(q => !q.isExample);
  const groups = chunk(interactiveQuestions, groupSize);
  const colsClass = groupSize === 3 ? 'grid-cols-3' : groupSize === 2 ? 'grid-cols-2' : 'grid-cols-1';

  function renderCell(q: A2GroupedDropdownQuestion) {
    const state = validation[q.id];
    // If `left` contains an ellipsis marker (…), the dropdown must sit right
    // after the word it belongs to — not at the end of the sentence. Split on
    // it like the shared DropdownMatch does. Without a marker, fall back to
    // label + trailing dropdown (verb-drill style questions).
    const parts = q.left.split('…');
    const hasSplit = parts.length === 2;
    const before = hasSplit ? parts[0] : q.left;
    const after = hasSplit ? parts[1] : '';
    const selectEl = (
      <Select
        value={answers[q.id] || ''}
        onValueChange={value => handleSelect(q.id, value)}
      >
        <SelectTrigger
          className={`
            w-28 h-8 text-sm font-semibold
            ${state === true ? 'border-green-500 bg-green-50' : ''}
            ${state === false ? 'border-[#D25A45] bg-[#FCE2DE]/40' : ''}
          `}
        >
          <SelectValue placeholder={t('exercise.selectOption')} />
        </SelectTrigger>
        <SelectContent>
          {(shuffledOptionsMap[q.id] ?? q.options).map(option => (
            <SelectItem key={option} value={option} className="text-sm">
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
    return (
      <div
        key={q.id}
        className={`
          bg-white rounded-xl border-2 p-3 transition-all flex flex-col gap-2
          ${state === true ? 'border-green-500 bg-green-50' : ''}
          ${state === false ? 'border-[#D25A45] bg-[#FCE2DE]/40' : ''}
          ${state == null ? 'border-gray-200' : ''}
        `}
      >
        <div className="flex items-center gap-2 flex-wrap">
          {before && (
            <span className="text-sm font-bold text-gray-800 leading-snug">
              {before.trim()}
            </span>
          )}
          <div className="flex items-center gap-1">
            {selectEl}
            {state === true && <Check className="w-5 h-5 text-green-600 flex-shrink-0" />}
            {state === false && <X className="w-5 h-5 text-[#D25A45] flex-shrink-0" />}
          </div>
          {after && (
            <span className="text-sm font-bold text-gray-800 leading-snug">
              {after.trim()}
            </span>
          )}
        </div>
        {isSubmitted && state === false && (
          <div className="p-2 rounded bg-yellow-50 border border-yellow-200">
            <p className="text-xs text-yellow-800">
              <strong>{t('exercise.correctLabel')}</strong> {q.correctAnswer}
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 md:p-8 shadow-md">
      <div className="space-y-2">
        {groups.map((group, gi) => (
          <div key={gi} className={`grid ${colsClass} gap-2`}>
            {group.map(q => renderCell(q))}
          </div>
        ))}
      </div>

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

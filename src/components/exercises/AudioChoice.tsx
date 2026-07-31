'use client';

import { useState, useEffect, useRef } from 'react';
import { Check, X, RotateCcw, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useT } from '@/i18n/useT';
import type { AudioChoiceExercise } from '@/content/types';
import { useExercisePersistence } from '@/hooks/useExercisePersistence';
import { getTtsAudioPath, toggleTtsAudio } from '@/lib/tts';
import { getLetterAudioPath } from '@/lib/letterTTS';

interface AudioChoiceProps {
  exercise: AudioChoiceExercise;
  onComplete?: (correct: boolean, score: number) => void;
}

export function AudioChoice({ exercise, onComplete }: AudioChoiceProps) {
  const t = useT();
  const { savedState, saveState } = useExercisePersistence(exercise.id);
  const s = savedState as any;
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>(() => s?.selectedAnswers ?? {});
  const [validation, setValidation] = useState<{ [key: number]: boolean | null }>(() => s?.validation ?? {});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(() => s?.isSubmitted ?? false);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    saveState({ selectedAnswers, validation, isSubmitted });
  }, [selectedAnswers, validation, isSubmitted]);

  const handlePlay = (qIndex: number) => {
    const q = exercise.questions[qIndex];
    // Pure-letter questions (no `word`) reuse the same validated per-letter clips
    // as the alphabet maze, instead of a separate exercise-specific recording —
    // keeps letter pronunciation consistent across the lesson.
    const audioPath = q.word
      ? getTtsAudioPath(exercise.id, 'words', q.id)
      : getLetterAudioPath(q.options[q.correctIndex]) ?? getTtsAudioPath(exercise.id, 'words', q.id);
    const started = toggleTtsAudio(audioPath, q.ttsText, undefined, () => setPlayingIndex(null));
    setPlayingIndex(started ? qIndex : null);
  };

  const handleSelect = (questionIndex: number, optionIndex: number) => {
    setSelectedAnswers(prev => ({ ...prev, [questionIndex]: optionIndex }));
    if (isSubmitted) {
      setIsSubmitted(false);
      setValidation({});
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setValidation({});
    setIsSubmitted(false);
    saveState({ selectedAnswers: {}, validation: {}, isSubmitted: false });
  };

  const handleSubmit = () => {
    const newValidation: { [key: number]: boolean } = {};
    let correctCount = 0;

    exercise.questions.forEach((question, index) => {
      const isCorrect = selectedAnswers[index] === question.correctIndex;
      newValidation[index] = isCorrect;
      if (isCorrect) correctCount++;
    });

    setValidation(newValidation);
    setIsSubmitted(true);

    if (onComplete) {
      const total = exercise.questions.length;
      const score = exercise.points ? (correctCount / total) * exercise.points : correctCount;
      onComplete(correctCount === total, score);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 md:p-8 shadow-md">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
        {exercise.questions.map((question, qIndex) => {
          const isPlaying = playingIndex === qIndex;

          return (
            <div key={question.id} className="space-y-3 rounded-xl border-2 border-gray-100 p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-gray-400">{qIndex + 1}.</span>
                <Button
                  onClick={() => handlePlay(qIndex)}
                  className="bg-white border-2 border-[#32C189] text-[#1F5741] hover:bg-[#DAF6EB] shadow-none px-4 py-2 h-auto min-h-[44px] flex-1 justify-center"
                >
                  {isPlaying ? (
                    <><Pause className="w-5 h-5 mr-2" />{t('exercise.stop')}</>
                  ) : (
                    <><Play className="w-5 h-5 mr-2" />{t('exercise.listen')}</>
                  )}
                </Button>
              </div>

              {question.word && (
                <p className="text-center text-xl md:text-2xl font-bold text-gray-800">
                  {question.word}
                </p>
              )}

              <div className="flex flex-wrap justify-center gap-2 pt-1">
                {question.options.map((option, oIndex) => {
                  const isSelected = selectedAnswers[qIndex] === oIndex;
                  const isCorrect = oIndex === question.correctIndex;
                  const showCorrect = isSubmitted && isCorrect;
                  const showIncorrect = isSubmitted && isSelected && !isCorrect;

                  return (
                    <button
                      key={oIndex}
                      onClick={() => handleSelect(qIndex, oIndex)}
                      className={`
                        min-w-[52px] min-h-[52px] px-4 rounded-xl border-2 shadow-sm
                        text-lg font-bold transition-all active:scale-[0.96] cursor-pointer
                        flex items-center justify-center gap-1.5
                        ${isSelected && !isSubmitted ? 'border-[#32C189] bg-[#DAF6EB] shadow-md' : 'border-gray-300'}
                        ${showCorrect ? 'border-green-500 bg-green-50' : ''}
                        ${showIncorrect ? 'border-[#D25A45] bg-[#FCE2DE]/40' : ''}
                        hover:border-[#32C189] hover:bg-[#DAF6EB] hover:shadow-md
                      `}
                    >
                      {option}
                      {showCorrect && <Check className="w-4 h-4 text-green-600" />}
                      {showIncorrect && <X className="w-4 h-4 text-[#D25A45]" />}
                    </button>
                  );
                })}
              </div>

              {isSubmitted && validation[qIndex] !== null && (
                <div className={`
                  p-2 rounded text-sm text-center
                  ${validation[qIndex] ? 'bg-green-50 text-green-800' : 'bg-[#FCE2DE]/40 text-[#683229]'}
                `}>
                  {validation[qIndex] ? `✓ ${t('exercise.correct')}` : `✗ ${t('exercise.wrongLabel')}`}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex gap-3 mt-8">
        <Button
          onClick={handleSubmit}
          className="bg-[#32C189] hover:bg-[#257958] text-base font-semibold px-8 py-6 w-full sm:w-auto min-h-[52px] active:scale-95 transition-transform"
        >
          {t('exercise.checkAnswers')}
        </Button>
        <Button variant="outline" onClick={handleReset} className="text-base font-semibold px-6 py-3 min-h-[48px] active:scale-95 transition-transform rounded-lg border-2">
          <RotateCcw className="w-4 h-4 mr-2" />
          {t('exercise.reset')}
        </Button>
      </div>

      {isSubmitted && (
        <div className="mt-8 p-5 rounded-xl bg-[#DAF6EB] animate-in fade-in duration-300">
          <p className="text-base font-semibold text-gray-800">
            {t('exercise.result')} {Object.values(validation).filter(v => v === true).length} / {exercise.questions.length} {t('exercise.correct_n')}
          </p>
        </div>
      )}
    </div>
  );
}

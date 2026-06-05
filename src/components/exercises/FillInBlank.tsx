'use client';

import { useState, useRef, useEffect } from 'react';
import { Check, X, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useT } from '@/i18n/useT';
import type { FillInBlankExercise } from '@/content/types';
import { useExercisePersistence } from '@/hooks/useExercisePersistence';

interface FillInBlankProps {
  exercise: FillInBlankExercise;
  onComplete?: (correct: boolean, score: number) => void;
}

type FillSentence = NonNullable<FillInBlankExercise['sentences']>[number];

export function FillInBlank({ exercise, onComplete }: FillInBlankProps) {
  const t = useT();
  const sentences = exercise.sentences ?? [];
  const { savedState, saveState } = useExercisePersistence(exercise.id);
  const s = savedState as any;
  const [answers, setAnswers] = useState<{ [key: string]: string }>(() => s?.answers ?? {});
  const [validation, setValidation] = useState<{ [key: string]: boolean | null }>(() => s?.validation ?? {});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(() => s?.isSubmitted ?? false);
  const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    saveState({ answers, validation, isSubmitted });
  }, [answers, validation, isSubmitted]);

  const handleChange = (sentenceIndex: number, blankIndex: number, value: string) => {
    const key = `${sentenceIndex}-${blankIndex}`;
    // Only allow single uppercase letter
    const upperValue = value.toUpperCase().slice(0, 1);
    setAnswers(prev => ({ ...prev, [key]: upperValue }));
    
    if (isSubmitted) {
      setIsSubmitted(false);
      setValidation({});
    }
    if (upperValue) {
      const allBlanks = getAllBlanks();
      const currentIdx = allBlanks.indexOf(key);
      const nextKey = allBlanks[currentIdx + 1];
      
      if (nextKey && inputRefs.current[nextKey]) {
        inputRefs.current[nextKey]?.focus();
      }
    }
    
  };

  const getAllBlanks = (): string[] => {
    const allBlanks: string[] = [];
    sentences.forEach((sentence, sIdx) => {
      sentence.blanks.forEach((_, bIdx) => {
        allBlanks.push(`${sIdx}-${bIdx}`);
      });
    });
    return allBlanks;
  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    sentenceIndex: number,
    blankIndex: number
  ) => {
    const key = `${sentenceIndex}-${blankIndex}`;
    
    if (e.key === 'Backspace' && !answers[key]) {
      e.preventDefault();
      const allBlanks = getAllBlanks();
      const currentIdx = allBlanks.indexOf(key);
      const prevKey = allBlanks[currentIdx - 1];
      
      if (prevKey && inputRefs.current[prevKey]) {
        inputRefs.current[prevKey]?.focus();
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const validateAnswer = (answer: string, correctAnswers: string[]): boolean => {
    const normalized = answer.trim().toUpperCase();
    return correctAnswers.some(correct => 
      correct.toUpperCase() === normalized
    );
  };

  const handleReset = () => {
    setAnswers({});
    setValidation({});
    setIsSubmitted(false);
    saveState({ answers: {}, validation: {}, isSubmitted: false });
  };

  const normalizeText = (text: string) =>
    text.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, ' ');

  const passesKeywordCheck = (text: string, groups?: string[][]) => {
    if (!text.trim()) return false;
    if (!groups || groups.length === 0) return text.trim().length >= 40;
    const norm = normalizeText(text);
    return groups.every((group) =>
      group.some((kw) => norm.includes(normalizeText(kw))),
    );
  };

  const handleSubmit = () => {
    const newValidation: { [key: string]: boolean } = {};
    let correctCount = 0;
    let totalCount = 0;

    if (exercise.freeTextBlocks && exercise.freeTextBlocks.length > 0) {
      exercise.freeTextBlocks.forEach((_, blockIdx) => {
        const key = `block-${blockIdx}`;
        const answer = answers[key] || '';
        const block = exercise.freeTextBlocks![blockIdx];
        const isCorrect = passesKeywordCheck(answer, block.keywordGroups);
        newValidation[key] = isCorrect;
        if (isCorrect) correctCount++;
        totalCount++;
      });
    } else if (exercise.freeText) {
      sentences.forEach((sentence, sIdx) => {
        const key = `${sIdx}-0`;
        const answer = answers[key] || '';
        // Open-ended writing (no defined correct answers) — accept everything, never mark as wrong.
        if (sentence.correctAnswers.length === 0) {
          newValidation[key] = true;
          correctCount++;
          totalCount++;
          return;
        }
        const isCorrect = validateAnswer(answer, sentence.correctAnswers);
        newValidation[key] = isCorrect;
        if (isCorrect) correctCount++;
        totalCount++;
      });
    } else {
      sentences.forEach((sentence, sIdx) => {
        sentence.blanks.forEach((_, bIdx) => {
          const key = `${sIdx}-${bIdx}`;
          const answer = answers[key] || '';
          const isCorrect = validateAnswer(answer, [sentence.correctAnswers[bIdx]]);
          newValidation[key] = isCorrect;
          if (isCorrect) correctCount++;
          totalCount++;
        });
      });
    }

    setValidation(newValidation);
    setIsSubmitted(true);

    if (onComplete) {
      const score = exercise.points ? (correctCount / totalCount) * exercise.points : correctCount;
      onComplete(correctCount === totalCount, score);
    }
  };

  const renderLetterBoxes = (sentence: FillSentence, sentenceIndex: number) => {
    // Parse the text to show letters and blanks
    const chars = sentence.text.split('');
    let blankCounter = 0;
    
    return (
      <div className="flex flex-wrap items-center justify-center gap-1 md:gap-2">
        {chars.map((char, charIndex) => {
          if (char === '_') {
            // This is a blank - show input box
            const currentBlankIndex = blankCounter;
            blankCounter++;
            const key = `${sentenceIndex}-${currentBlankIndex}`;
            const validationResult = validation[key];
            
            return (
              <input
                key={charIndex}
                ref={(el) => {
                  inputRefs.current[key] = el;
                }}
                type="text"
                value={answers[key] || ''}
                onChange={(e) => handleChange(sentenceIndex, currentBlankIndex, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, sentenceIndex, currentBlankIndex)}
                maxLength={1}
                className={`
                  w-10 h-10 md:w-12 md:h-12 text-center text-lg md:text-xl font-bold 
                  border-2 rounded-lg transition-all uppercase
                  focus:ring-2 focus:ring-[#6B8543] focus:ring-offset-1 focus:outline-none
                  ${validationResult === true ? 'border-green-500 bg-green-50 text-green-700' : ''}
                  ${validationResult === false ? 'border-[#D25A45] bg-[#FCE2DE]/40 text-[#683229]' : ''}
                  ${validationResult === null ? 'border-gray-400 bg-white' : ''}
                  ${!isSubmitted ? 'hover:border-[#6B8543]' : ''}
                `}
                autoComplete="off"
                inputMode="text"
              />
            );
          } else if (char === ' ') {
            // Space between words
            return <div key={charIndex} className="w-3 md:w-4" />;
          } else {
            // Regular letter
            return (
              <div
                key={charIndex}
                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-lg md:text-xl font-bold text-gray-800"
              >
                {char}
              </div>
            );
          }
        })}
      </div>
    );
  };

  const renderFreeTextBlock = (
    block: NonNullable<FillInBlankExercise['freeTextBlocks']>[number],
    blockIndex: number,
  ) => {
    const key = `block-${blockIndex}`;
    const validationResult = validation[key];
    return (
      <div
        key={blockIndex}
        className={`rounded-xl border-2 p-4 md:p-5 transition-all ${
          validationResult === true
            ? 'border-green-500 bg-green-50'
            : validationResult === false
            ? 'border-[#D25A45]/70 bg-[#FCE2DE]/30'
            : 'border-gray-200 bg-white'
        }`}
      >
        <p className="text-sm md:text-base font-semibold text-[#0072BC] mb-3 leading-snug">
          {block.prompt}
        </p>
        <textarea
          value={answers[key] || ''}
          onChange={(e) => {
            setAnswers((prev) => ({ ...prev, [key]: e.target.value }));
            if (isSubmitted) {
              setIsSubmitted(false);
              setValidation({});
            }
          }}
          rows={6}
          placeholder="Напишете обявата тук..."
          className={`
            w-full text-base leading-relaxed px-4 py-3 rounded-xl border-2 resize-y min-h-[140px]
            focus:outline-none focus:ring-2 focus:ring-[#32C189]/40 focus:ring-offset-1
            ${validationResult === true ? 'border-green-500 bg-white text-green-800' : ''}
            ${validationResult === false ? 'border-[#D25A45]/70 bg-white text-[#683229]' : ''}
            ${validationResult === null || validationResult === undefined ? 'border-gray-300 bg-white' : ''}
          `}
        />
        {isSubmitted && validationResult === false && (
          <div className="mt-4 p-4 rounded-lg bg-[#DAF6EB]/40 border border-[#32C189]/30">
            <p className="text-xs font-semibold text-[#1F5741] uppercase tracking-wide mb-2">
              {t('exercise.correctAnswer')}
            </p>
            <p className="text-sm md:text-base text-gray-800 whitespace-pre-line leading-relaxed">
              {block.modelAnswer}
            </p>
          </div>
        )}
        {isSubmitted && validationResult === true && (
          <p className="mt-3 text-sm text-green-700 font-medium flex items-center gap-1">
            <Check className="w-4 h-4" /> {t('exercise.correct')}
          </p>
        )}
      </div>
    );
  };

  const renderFreeTextInput = (sentence: FillSentence, sentenceIndex: number) => {
    const key = `${sentenceIndex}-0`;
    const validationResult = validation[key];
    const noValidation = sentence.correctAnswers.length === 0;
    return (
      <div className="flex flex-col items-center gap-3">
        {sentence.text && (
          <p className="text-base md:text-lg text-gray-800 text-center font-medium leading-snug">
            {sentence.text}
          </p>
        )}
        <input
          type="text"
          value={answers[key] || ''}
          onChange={e => {
            setAnswers(prev => ({ ...prev, [key]: e.target.value }));
            if (isSubmitted) { setIsSubmitted(false); setValidation({}); }
          }}
          onKeyDown={e => { if (e.key === 'Enter') handleSubmit(); }}
          placeholder="Напишете отговора си тук..."
          className={`
            w-full max-w-md text-center text-lg font-medium px-4 py-3 rounded-xl border-2
            focus:outline-none focus:ring-2 focus:ring-[#6B8543] focus:ring-offset-1
            transition-all
            ${validationResult === true ? 'border-green-500 bg-green-50 text-green-700' : ''}
            ${validationResult === false && !noValidation ? 'border-[#D25A45] bg-[#FCE2DE]/40 text-[#683229]' : ''}
            ${validationResult === null || validationResult === undefined ? 'border-gray-300 bg-white' : ''}
          `}
          autoComplete="off"
        />
        {isSubmitted && !noValidation && validationResult === false && (
          <p className="text-sm text-[#D25A45] italic">
            Правилен отговор: {sentence.correctAnswers.join(' / ')}
          </p>
        )}
      </div>
    );
  };

  if (exercise.freeTextBlocks && exercise.freeTextBlocks.length > 0) {
    return (
      <div className="bg-white rounded-xl p-6 md:p-8 shadow-md">
        <div className="space-y-6 mb-6">
          {exercise.freeTextBlocks.map((block, index) => renderFreeTextBlock(block, index))}
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
          <div className="mt-6 p-4 rounded-lg bg-[#DAF6EB] animate-in fade-in duration-300">
            <p className="text-base font-semibold text-gray-800">
              {t('exercise.result')}{' '}
              {Object.values(validation).filter((v) => v === true).length} /{' '}
              {exercise.freeTextBlocks.length} {t('exercise.correct_n')}
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 md:p-8 shadow-md">
      
      <div className="space-y-4 md:space-y-6 mb-6">
        {sentences.map((sentence, index) => (
          <div key={index} className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
            {exercise.freeText
              ? renderFreeTextInput(sentence, index)
              : renderLetterBoxes(sentence, index)}
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
              {t('exercise.result')} {Object.values(validation).filter(v => v === true).length} / {Object.keys(validation).length} {t('exercise.correct_n')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

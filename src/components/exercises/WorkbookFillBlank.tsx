'use client';

import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WorkbookSentence {
  text: string;
  blanks: number[];
  correctAnswers: string[];
  acceptableAnswers?: string[][];
  options?: string[];
  isExample?: boolean;
}

export interface WorkbookFillBlankProps {
  exerciseNumber?: number;
  instruction: string;
  sentences: WorkbookSentence[];
  layout?: 'two-column' | 'qa-split' | 'single';
  onComplete?: (correct: boolean, score: number) => void;
}

// Parse text with _______ placeholders into segments
function parseText(text: string): { type: 'text' | 'blank'; value: string }[] {
  const parts = text.split(/(_{3,})/);
  return parts.map(part => ({
    type: /_{3,}/.test(part) ? 'blank' : 'text',
    value: part,
  }));
}

export function WorkbookFillBlank({
  exerciseNumber,
  instruction,
  sentences,
  layout = 'two-column',
  onComplete,
}: WorkbookFillBlankProps) {
  const [answers, setAnswers] = useState<{ [key: string]: string[] }>({});
  const [validation, setValidation] = useState<{ [key: string]: boolean | null }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const setAnswer = (sentenceIdx: number, blankIdx: number, value: string) => {
    if (isSubmitted) return;
    setAnswers(prev => {
      const current = prev[sentenceIdx] ? [...prev[sentenceIdx]] : [];
      current[blankIdx] = value;
      return { ...prev, [sentenceIdx]: current };
    });
  };

  const handleSubmit = () => {
    const newValidation: { [key: string]: boolean | null } = {};
    let correctCount = 0;
    let totalBlanks = 0;

    sentences.forEach((sentence, sIdx) => {
      if (sentence.isExample || sentence.blanks.length === 0) {
        newValidation[sIdx] = null;
        return;
      }

      const userAnswers = answers[sIdx] || [];
      const isCorrect = sentence.correctAnswers.every((correct, bIdx) => {
        const userVal = (userAnswers[bIdx] || '').trim().toLowerCase();
        if (sentence.acceptableAnswers?.[bIdx]) {
          return sentence.acceptableAnswers[bIdx].some(a => a.toLowerCase() === userVal);
        }
        return userVal === correct.toLowerCase();
      });

      newValidation[sIdx] = isCorrect;
      if (isCorrect) correctCount++;
      totalBlanks++;
    });

    setValidation(newValidation);
    setIsSubmitted(true);
    onComplete?.(correctCount === totalBlanks, correctCount);
  };

  const renderSentence = (sentence: WorkbookSentence, sIdx: number) => {
    const isExample = sentence.isExample || sentence.blanks.length === 0;
    const segments = parseText(sentence.text);
    let blankCounter = 0;
    const valid = validation[sIdx];

    return (
      <div
        key={sIdx}
        className={`
          flex flex-wrap items-baseline gap-x-1 gap-y-1 py-2
          ${isExample ? 'text-gray-500 italic' : 'text-gray-800'}
        `}
      >
        <span className="font-semibold text-gray-500 mr-1 shrink-0">{sIdx + 1}.</span>
        {segments.map((seg, segIdx) => {
          if (seg.type === 'blank') {
            const bIdx = blankCounter++;
            const userVal = answers[sIdx]?.[bIdx] || '';
            const opts = sentence.options || [];

            if (isExample || opts.length === 0) {
              return (
                <span
                  key={segIdx}
                  className="inline-block border-b-2 border-gray-400 min-w-[5rem] text-center text-sm"
                >
                  {sentence.correctAnswers[bIdx] || ''}
                </span>
              );
            }

            return (
              <select
                key={segIdx}
                value={userVal}
                onChange={e => setAnswer(sIdx, bIdx, e.target.value)}
                disabled={isSubmitted}
                className={`
                  inline-block border-b-2 rounded px-1 py-0.5 text-base font-medium bg-white
                  focus:outline-none focus:ring-2 focus:ring-bolt-primary
                  ${isSubmitted
                    ? valid
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-red-400 bg-red-50 text-red-700'
                    : 'border-bolt-primary hover:border-bolt-primary-hover cursor-pointer'
                  }
                  disabled:cursor-default
                `}
              >
                <option value="">——</option>
                {opts.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            );
          }

          return (
            <span key={segIdx} className="text-base">
              {seg.value}
            </span>
          );
        })}

        {/* Inline validation icon */}
        {isSubmitted && !isExample && (
          <span className="ml-1 shrink-0">
            {valid
              ? <Check className="w-4 h-4 text-green-600 inline" />
              : <X className="w-4 h-4 text-red-500 inline" />
            }
          </span>
        )}

        {/* Show correct answer on wrong */}
        {isSubmitted && valid === false && (
          <span className="ml-2 text-sm text-red-600 italic">
            ({sentence.correctAnswers.join(' / ')})
          </span>
        )}
      </div>
    );
  };

  // QA-split: sentence text contains | separator between question and answer parts
  const renderQASentence = (sentence: WorkbookSentence, sIdx: number) => {
    const parts = sentence.text.split('|');
    const questionPart = parts[0]?.trim() || sentence.text;
    const answerPart = parts[1]?.trim() || '';
    const isExample = sentence.isExample || sentence.blanks.length === 0;
    const valid = validation[sIdx];

    const renderPart = (text: string, blankOffset: number) => {
      const segments = parseText(text);
      let blankCounter = blankOffset;
      return segments.map((seg, segIdx) => {
        if (seg.type === 'blank') {
          const bIdx = blankCounter++;
          const userVal = answers[sIdx]?.[bIdx] || '';
          const opts = sentence.options || [];
          if (isExample || opts.length === 0) {
            return (
              <span key={segIdx} className="inline-block border-b-2 border-gray-400 min-w-[4rem] text-center text-sm px-1">
                {sentence.correctAnswers[bIdx] || ''}
              </span>
            );
          }
          return (
            <select
              key={segIdx}
              value={userVal}
              onChange={e => setAnswer(sIdx, bIdx, e.target.value)}
              disabled={isSubmitted}
              className={`
                inline-block border-b-2 rounded px-1 py-0.5 text-sm font-medium bg-white
                focus:outline-none focus:ring-1 focus:ring-bolt-primary
                ${isSubmitted
                  ? valid ? 'border-green-500 bg-green-50' : 'border-red-400 bg-red-50'
                  : 'border-bolt-primary cursor-pointer'
                }
              `}
            >
              <option value="">—</option>
              {opts.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          );
        }
        return <span key={segIdx} className="text-sm">{seg.value}</span>;
      });
    };

    const qBlanks = (questionPart.match(/_{3,}/g) || []).length;

    return (
      <div key={sIdx} className={`grid grid-cols-2 gap-4 py-2 border-b border-gray-100 ${isExample ? 'text-gray-500 italic' : 'text-gray-800'}`}>
        <div className="flex flex-wrap items-baseline gap-x-1">
          <span className="font-semibold text-gray-500 mr-1 shrink-0">{sIdx + 1}.</span>
          {renderPart(questionPart, 0)}
        </div>
        <div className="flex flex-wrap items-baseline gap-x-1">
          {renderPart(answerPart, qBlanks)}
          {isSubmitted && !isExample && (
            <span className="ml-1">
              {valid ? <Check className="w-4 h-4 text-green-600 inline" /> : <X className="w-4 h-4 text-red-500 inline" />}
            </span>
          )}
        </div>
      </div>
    );
  };

  // Split sentences for two-column layout: first half left, second half right
  const half = Math.ceil(sentences.length / 2);
  const leftSentences = sentences.slice(0, half);
  const rightSentences = sentences.slice(half);

  const allFilled = sentences.every((s, idx) => {
    if (s.isExample || s.blanks.length === 0) return true;
    const userAnswers = answers[idx] || [];
    return s.correctAnswers.every((_, bIdx) => !!userAnswers[bIdx]);
  });

  return (
    <div className="relative bg-white rounded-xl border-2 border-bolt-secondary p-6 md:p-8 shadow-sm">
      {exerciseNumber && (
        <div className="absolute -top-4 -left-4 w-10 h-10 bg-bolt-primary text-white rounded-full flex items-center justify-center font-bold text-base shadow-md">
          {exerciseNumber}
        </div>
      )}

      <p className="text-lg font-bold text-gray-800 mb-6">{instruction}</p>

      {layout === 'qa-split' ? (
        <div className="space-y-1">
          {sentences.map((s, i) => renderQASentence(s, i))}
        </div>
      ) : layout === 'two-column' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
          <div className="space-y-1">
            {leftSentences.map((s, i) => renderSentence(s, i))}
          </div>
          <div className="space-y-1">
            {rightSentences.map((s, i) => renderSentence(s, i + half))}
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {sentences.map((s, i) => renderSentence(s, i))}
        </div>
      )}

      {!isSubmitted && (
        <Button
          onClick={handleSubmit}
          disabled={!allFilled}
          className="mt-6 bg-bolt-primary hover:bg-bolt-primary-hover text-base font-semibold px-8 py-3 w-full sm:w-auto min-h-[48px] active:scale-95 transition-transform rounded-lg disabled:opacity-50"
        >
          Провери отговорите
        </Button>
      )}

      {isSubmitted && (
        <div className="mt-6 p-4 rounded-lg bg-bolt-secondary-light border-2 border-bolt-secondary animate-in fade-in duration-300">
          <div className="flex items-center gap-2">
            {Object.values(validation).filter(v => v !== null).every(v => v === true)
              ? <Check className="w-5 h-5 text-green-600" />
              : <X className="w-5 h-5 text-red-500" />
            }
            <p className="font-semibold text-gray-800">
              Резултат:{' '}
              {Object.values(validation).filter(v => v === true).length} /{' '}
              {Object.values(validation).filter(v => v !== null).length} правилни
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

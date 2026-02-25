'use client';

import { useState, useMemo } from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useT } from '@/i18n/useT';

interface WordSearchProps {
  letterString: string;
  correctWords: string[];
  distractorWords?: string[];
  hint?: string;
  onComplete?: (correct: boolean, score: number) => void;
}

export function WordSearch({ 
  letterString, 
  correctWords, 
  distractorWords = [],
  hint, 
  onComplete 
}: WordSearchProps) {
  const t = useT();
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [clickedWrong, setClickedWrong] = useState<string | null>(null);

  // Shuffle available words (correct + distractors) deterministically
  const availableWords = useMemo(() => {
    const all = [...correctWords, ...distractorWords];
    // Deterministic shuffle based on letter string
    const seed = letterString.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return all.sort((a, b) => {
      const aVal = a.split('').reduce((acc, char) => acc + char.charCodeAt(0), seed);
      const bVal = b.split('').reduce((acc, char) => acc + char.charCodeAt(0), seed);
      return aVal - bVal;
    });
  }, [correctWords, distractorWords, letterString]);

  const handleWordClick = (word: string) => {
    if (isSubmitted) return;

    // Check if already found
    if (foundWords.includes(word)) return;

    // Check if it's a correct word
    const isCorrect = correctWords.some(w => w.toLowerCase() === word.toLowerCase());

    if (isCorrect) {
      setFoundWords([...foundWords, word]);
    } else {
      // Show error feedback
      setClickedWrong(word);
      setTimeout(() => setClickedWrong(null), 1000);
    }
  };

  const handleRemoveWord = (word: string) => {
    if (isSubmitted) return;
    setFoundWords(foundWords.filter(w => w !== word));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    const correctCount = foundWords.length;
    const totalCount = correctWords.length;

    if (onComplete) {
      const score = (correctCount / totalCount) * (correctCount);
      onComplete(correctCount === totalCount, score);
    }
  };

  const missingWords = correctWords.filter(
    word => !foundWords.some(fw => fw.toLowerCase() === word.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl p-6 md:p-8 shadow-md">
      {/* Letter string display */}
      <div className="bg-white rounded-xl border-2 border-[#8FC412] p-6 mb-6 text-center">
        <p className="text-lg md:text-2xl font-bold text-[#6B8543] tracking-wide break-all">
          {letterString}
        </p>
      </div>

      {/* Word buttons */}
      {!isSubmitted && (
        <div className="mb-6">
          <p className="text-sm md:text-base font-semibold text-gray-700 mb-3">
            {t('exercise.selectWords')}
          </p>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {availableWords.map((word, index) => {
              const isFound = foundWords.includes(word);
              const isWrong = clickedWrong === word;
              
              return (
                <button
                  key={index}
                  onClick={() => handleWordClick(word)}
                  disabled={isFound}
                  className={`
                    px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold text-base md:text-lg
                    transition-all duration-200 border-2
                    ${isFound 
                      ? 'bg-green-100 border-green-400 text-green-700 cursor-not-allowed opacity-50' 
                      : isWrong
                      ? 'bg-red-100 border-red-400 text-red-700 animate-pulse'
                      : 'bg-white border-[#8FC412] text-gray-800 hover:bg-[#EEF7C8] hover:scale-105 active:scale-95'
                    }
                  `}
                >
                  {word}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Found words */}
      <div className="mb-6">
        <p className="text-base font-semibold text-gray-700 mb-3">
          {t('exercise.foundWords')} ({foundWords.length}/{correctWords.length}):
        </p>
        <div className="flex flex-wrap gap-2">
          {foundWords.map((word, index) => (
            <div
              key={index}
              className="bg-green-100 border-2 border-green-500 rounded-lg px-4 py-2 flex items-center gap-2"
            >
              <span className="font-semibold text-green-800">{word}</span>
              {!isSubmitted && (
                <button
                  onClick={() => handleRemoveWord(word)}
                  className="text-green-600 hover:text-green-800"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
          {foundWords.length === 0 && (
            <p className="text-gray-400 italic">{t('exercise.noWordsYet')}</p>
          )}
        </div>
      </div>

      {/* Submit button */}
      {!isSubmitted && (
        <Button
          onClick={handleSubmit}
          className="bg-[#8FC412] hover:bg-[#7DAD0E] text-white text-base font-semibold px-8 py-3 w-full sm:w-auto min-h-[48px] active:scale-95 transition-transform rounded-lg"
        >
          {t('exercise.checkAnswers')}
        </Button>
      )}

      {/* Results */}
      {isSubmitted && (
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-white border-2 border-[#8B9D5F]">
            <div className="flex items-center gap-2 mb-2">
              {foundWords.length === correctWords.length ? (
                <Check className="w-6 h-6 text-green-600" />
              ) : (
                <X className="w-6 h-6 text-orange-600" />
              )}
              <p className="text-base font-semibold text-gray-800">
                {t('exercise.result')} {foundWords.length} / {correctWords.length} {t('exercise.correct_n')}
              </p>
            </div>
          </div>

          {/* Missing words */}
          {missingWords.length > 0 && (
            <div className="p-4 rounded-lg bg-yellow-50 border-2 border-yellow-200">
              <p className="text-sm font-semibold text-yellow-800 mb-2">
                {t('exercise.skippedWords')}
              </p>
              <div className="flex flex-wrap gap-2">
                {missingWords.map((word, index) => (
                  <span
                    key={index}
                    className="bg-yellow-100 border border-yellow-400 rounded px-3 py-1 text-sm font-semibold text-yellow-800"
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

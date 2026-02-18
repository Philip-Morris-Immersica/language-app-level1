'use client';

import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface WordSearchProps {
  exerciseNumber?: number;
  instruction: string;
  letterString: string;
  correctWords: string[];
  hint?: string;
  onComplete?: (correct: boolean, score: number) => void;
}

export function WordSearch({ exerciseNumber, instruction, letterString, correctWords, hint, onComplete }: WordSearchProps) {
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleAddWord = () => {
    const word = currentInput.trim().toLowerCase();
    
    if (!word) return;

    // Check if word is in correct words list and not already found
    const isCorrect = correctWords.some(w => w.toLowerCase() === word);
    const alreadyFound = foundWords.some(w => w.toLowerCase() === word);

    if (isCorrect && !alreadyFound) {
      setFoundWords([...foundWords, currentInput.trim()]);
      setCurrentInput('');
      setShowError(false);
    } else if (alreadyFound) {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddWord();
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
    <div className="relative bg-[#F8F5EE] rounded-xl border-2 border-[#8B9D5F] p-6 md:p-8 shadow-sm">
      {exerciseNumber && (
        <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#6B8543] text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md z-10">
          {exerciseNumber}
        </div>
      )}

      <p className="text-lg md:text-xl font-bold text-gray-800 mb-6">
        {instruction}
      </p>

      {/* Letter string display */}
      <div className="bg-white rounded-xl border-2 border-[#6B8543] p-6 mb-6 text-center">
        <p className="text-2xl md:text-3xl font-bold text-[#6B8543] tracking-wide break-all">
          {letterString}
        </p>
      </div>

      {/* Input field */}
      {!isSubmitted && (
        <div className="mb-6 space-y-3">
          <div className="flex gap-3">
            <Input
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Напишете намерена дума..."
              className="flex-1 text-lg h-12 border-2 border-gray-300 focus:border-[#6B8543]"
            />
            <Button
              onClick={handleAddWord}
              className="bg-[#6B8543] hover:bg-[#5A7238] text-white px-6"
              disabled={!currentInput.trim()}
            >
              Добави
            </Button>
          </div>
          {showError && (
            <p className="text-red-600 text-sm animate-in fade-in">
              Грешна дума или вече е добавена!
            </p>
          )}
        </div>
      )}

      {/* Found words */}
      <div className="mb-6">
        <p className="text-base font-semibold text-gray-700 mb-3">
          Намерени думи ({foundWords.length}/{correctWords.length}):
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
            <p className="text-gray-400 italic">Все още няма намерени думи...</p>
          )}
        </div>
      </div>

      {/* Submit button */}
      {!isSubmitted && (
        <Button
          onClick={handleSubmit}
          className="bg-[#6B8543] hover:bg-[#5A7238] text-white text-base font-semibold px-8 py-3 w-full sm:w-auto min-h-[48px] active:scale-95 transition-transform rounded-lg"
        >
          Провери отговорите
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
                Резултат: {foundWords.length} / {correctWords.length} думи
              </p>
            </div>
          </div>

          {/* Missing words */}
          {missingWords.length > 0 && (
            <div className="p-4 rounded-lg bg-yellow-50 border-2 border-yellow-200">
              <p className="text-sm font-semibold text-yellow-800 mb-2">
                Пропуснати думи:
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

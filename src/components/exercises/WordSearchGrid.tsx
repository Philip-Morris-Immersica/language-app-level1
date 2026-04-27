'use client';

import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { Check, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useT } from '@/i18n/useT';
import { useExercisePersistence } from '@/hooks/useExercisePersistence';
import {
  generateHorizontalWordGrid,
  findWordAtCell,
  getWordCellKeys,
} from '@/lib/wordSearchGrid';

interface WordSearchGridProps {
  hiddenWords: string[];          // Words to hide in the grid
  grid?: string[][];              // Ignored (legacy prop, kept for backward compat)
  allowDiagonal?: boolean;        // Ignored (legacy prop — horizontal-only now)
  padding?: number;               // Filler letters on each side of word (default 1)
  onComplete?: (correct: boolean, score: number) => void;
  exerciseId?: string;
}

interface SavedState {
  foundWords?: string[];          // Array of word names (uppercase)
  isSubmitted?: boolean;
}

export function WordSearchGrid({
  hiddenWords,
  padding = 1,
  onComplete,
  exerciseId,
}: WordSearchGridProps) {
  const t = useT();
  const { savedState, saveState } = useExercisePersistence(exerciseId);
  const s = savedState as SavedState | undefined;

  const { grid, placedWords, rows, cols } = useMemo(
    () => generateHorizontalWordGrid(hiddenWords, padding),
    [hiddenWords, padding],
  );

  const [foundWords, setFoundWords] = useState<string[]>(() => {
    const saved = s?.foundWords ?? [];
    return Array.isArray(saved) ? saved.filter((w): w is string => typeof w === 'string') : [];
  });
  const [flashCells, setFlashCells] = useState<{ cells: string[]; valid: boolean } | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(() => s?.isSubmitted ?? false);
  const mounted = useRef(false);
  const flashTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    saveState({ foundWords, isSubmitted });
  }, [foundWords, isSubmitted, saveState]);

  useEffect(() => {
    return () => {
      if (flashTimeout.current) clearTimeout(flashTimeout.current);
    };
  }, []);

  const foundWordSet = useMemo(() => new Set(foundWords), [foundWords]);

  const foundCells = useMemo(() => {
    const set = new Set<string>();
    placedWords.forEach((pw) => {
      if (foundWordSet.has(pw.word)) {
        getWordCellKeys(pw).forEach((k) => set.add(k));
      }
    });
    return set;
  }, [placedWords, foundWordSet]);

  const handleCellClick = useCallback(
    (row: number, col: number) => {
      if (isSubmitted) return;

      const key = `${row}-${col}`;
      const placed = findWordAtCell(placedWords, row, col);

      if (placed && !foundWordSet.has(placed.word)) {
        const cells = getWordCellKeys(placed);
        setFoundWords((prev) => [...prev, placed.word]);
        setFlashCells({ cells, valid: true });
      } else if (!placed) {
        setFlashCells({ cells: [key], valid: false });
      }
      // If already found word — do nothing (no flash)

      if (flashTimeout.current) clearTimeout(flashTimeout.current);
      flashTimeout.current = setTimeout(() => setFlashCells(null), 500);
    },
    [placedWords, foundWordSet, isSubmitted],
  );

  const handleReset = () => {
    setFoundWords([]);
    setFlashCells(null);
    setIsSubmitted(false);
    saveState({ foundWords: [], isSubmitted: false });
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    const total = hiddenWords.length;
    const found = foundWords.length;
    onComplete?.(found === total, found);
  };

  function cellClass(row: number, col: number): string {
    const key = `${row}-${col}`;
    const isFound = foundCells.has(key);
    const inFlash = flashCells?.cells.includes(key);
    const flashValid = flashCells?.valid;

    if (inFlash && flashValid === false) {
      return 'bg-red-200 text-red-800 border-red-300';
    }
    if (inFlash && flashValid === true) {
      return 'bg-green-200 text-green-800 border-green-400 scale-105';
    }
    if (isFound) {
      return 'bg-[#8FC412]/20 text-[#4a6e00] border-[#8FC412] font-bold';
    }
    return 'bg-white hover:bg-[#EEF7C8] border-gray-300 text-gray-800 cursor-pointer active:scale-95';
  }

  const progress = `${foundWords.length}/${hiddenWords.length}`;
  const hiddenWordsUpper = hiddenWords.map((w) => w.toUpperCase());

  // Cell sizing: tighter for wider grids on mobile so they fit; larger on desktop.
  // Mobile sizes are minimal-but-tappable; desktop sizes are ~1.4x larger.
  const cellSizeClass =
    cols <= 5
      ? 'min-h-[44px] min-w-[44px] md:min-h-[60px] md:min-w-[60px] text-base md:text-2xl'
      : cols <= 7
        ? 'min-h-[40px] min-w-[40px] md:min-h-[56px] md:min-w-[56px] text-sm md:text-xl'
        : 'min-h-[36px] min-w-[36px] md:min-h-[50px] md:min-w-[50px] text-sm md:text-lg';

  return (
    <div className="bg-white rounded-xl p-4 md:p-6 shadow-md">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-start sm:justify-center">
        {/* Grid */}
        <div className="flex-shrink-0 mx-auto sm:mx-0">
          <div
            className="inline-grid gap-[3px] select-none"
            style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
            role="grid"
            aria-label={t('exercise.findWords') || 'Find words'}
          >
            {grid.map((rowArr, row) =>
              rowArr.map((letter, col) => (
                <button
                  key={`${row}-${col}`}
                  type="button"
                  onClick={() => handleCellClick(row, col)}
                  disabled={isSubmitted}
                  className={`
                    aspect-square flex items-center justify-center
                    border-2 rounded font-bold uppercase
                    transition-all duration-150
                    ${cellSizeClass}
                    ${cellClass(row, col)}
                  `}
                  aria-label={`${letter} (row ${row + 1}, column ${col + 1})`}
                >
                  {letter}
                </button>
              )),
            )}
          </div>
          {!isSubmitted && (
            <p className="mt-2 text-xs text-gray-500 text-center sm:text-left">
              Кликнете на която и да е буква от думата.
            </p>
          )}
        </div>

        {/* Word list */}
        <div className="w-full sm:w-44 lg:w-52 flex-shrink-0">
          <p className="text-sm font-semibold text-gray-600 mb-2">
            Намерени думи: {progress}
          </p>
          <ul className="grid grid-cols-2 sm:grid-cols-1 gap-1.5">
            {hiddenWordsUpper.map((word) => {
              const found = foundWordSet.has(word);
              return (
                <li
                  key={word}
                  className={`flex items-center gap-2 text-sm font-medium ${
                    found ? 'text-green-700' : 'text-gray-500'
                  }`}
                >
                  {found ? (
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                  ) : (
                    <span className="w-4 h-4 border-2 border-gray-300 rounded-sm flex-shrink-0 inline-block" />
                  )}
                  <span className={found ? 'line-through' : ''}>{word}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-3 mt-5 sm:justify-center">
        <Button
          onClick={handleSubmit}
          disabled={isSubmitted}
          className="bg-[#8FC412] hover:bg-[#7DAD0E] text-white text-base font-semibold px-8 py-3 min-h-[48px] active:scale-95 transition-transform rounded-lg"
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
        <div className="mt-4 p-4 rounded-lg bg-white border-2 border-[#8B9D5F] animate-in fade-in duration-300">
          <p className="text-base font-semibold text-gray-800">
            {t('exercise.result')} {foundWords.length} / {hiddenWords.length}{' '}
            {t('exercise.correct_n')}
          </p>
          {foundWords.length < hiddenWords.length && (
            <div className="mt-2 flex flex-wrap gap-2">
              {hiddenWordsUpper
                .filter((w) => !foundWordSet.has(w))
                .map((w) => (
                  <span
                    key={w}
                    className="text-xs bg-yellow-100 border border-yellow-300 text-yellow-800 px-2 py-1 rounded font-semibold"
                  >
                    {w}
                  </span>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

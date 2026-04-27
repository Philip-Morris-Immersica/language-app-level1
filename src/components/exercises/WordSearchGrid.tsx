'use client';

import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { Check, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useT } from '@/i18n/useT';
import { useExercisePersistence } from '@/hooks/useExercisePersistence';
import { generateWordSearchGrid, validateSelection } from '@/lib/wordSearchGrid';

interface WordSearchGridProps {
  hiddenWords: string[];          // Words to hide in the grid
  grid?: string[][];              // Optional pre-generated grid (overrides auto-gen)
  allowDiagonal?: boolean;
  onComplete?: (correct: boolean, score: number) => void;
  exerciseId?: string;
}

interface FoundEntry {
  word: string;
  cells: string[]; // "row-col" strings
}

export function WordSearchGrid({
  hiddenWords,
  grid: propGrid,
  allowDiagonal = false,
  onComplete,
  exerciseId,
}: WordSearchGridProps) {
  const t = useT();
  const { savedState, saveState } = useExercisePersistence(exerciseId);
  const s = savedState as any;

  const directions = useMemo(
    () => (allowDiagonal ? ['horizontal', 'vertical', 'diagonal'] as const : ['horizontal', 'vertical'] as const),
    [allowDiagonal],
  );

  const { grid, placedWords } = useMemo(() => {
    if (propGrid) {
      return { grid: propGrid, placedWords: [] };
    }
    return generateWordSearchGrid(hiddenWords, 10, directions);
  }, [hiddenWords, propGrid, directions]);

  const [foundWords, setFoundWords] = useState<FoundEntry[]>(() => {
    const saved = s?.foundWords ?? [];
    return (saved as any[]).filter((f: any) => f?.word && Array.isArray(f?.cells));
  });
  const [firstCell, setFirstCell] = useState<{ row: number; col: number } | null>(null);
  const [flashCells, setFlashCells] = useState<{ cells: string[]; valid: boolean } | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(() => s?.isSubmitted ?? false);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    saveState({ foundWords, isSubmitted });
  }, [foundWords, isSubmitted]);

  const foundCells = useMemo(() => {
    const set = new Set<string>();
    foundWords.forEach(f => f.cells?.forEach(c => set.add(c)));
    return set;
  }, [foundWords]);

  const foundWordNames = useMemo(() => new Set(foundWords.map(f => f.word.toUpperCase())), [foundWords]);

  const flashTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCellClick = useCallback((row: number, col: number) => {
    if (isSubmitted) return;
    const key = `${row}-${col}`;

    if (!firstCell) {
      setFirstCell({ row, col });
      return;
    }

    // Second tap → validate
    const result = validateSelection(grid, firstCell.row, firstCell.col, row, col, hiddenWords);
    const cellsBetween = getCellsBetween(firstCell.row, firstCell.col, row, col);
    setFirstCell(null);

    if (result && !foundWordNames.has(result)) {
      setFlashCells({ cells: cellsBetween, valid: true });
      setFoundWords(prev => [...prev, { word: result, cells: cellsBetween }]);
    } else {
      setFlashCells({ cells: cellsBetween, valid: false });
    }

    if (flashTimeout.current) clearTimeout(flashTimeout.current);
    flashTimeout.current = setTimeout(() => setFlashCells(null), 600);
  }, [firstCell, grid, hiddenWords, foundWordNames, isSubmitted]);

  function getCellsBetween(r1: number, c1: number, r2: number, c2: number): string[] {
    const dr = Math.sign(r2 - r1);
    const dc = Math.sign(c2 - c1);
    const len = Math.max(Math.abs(r2 - r1), Math.abs(c2 - c1)) + 1;
    const cells: string[] = [];
    for (let i = 0; i < len; i++) {
      cells.push(`${r1 + i * dr}-${c1 + i * dc}`);
    }
    return cells;
  }

  const handleReset = () => {
    setFoundWords([]);
    setFirstCell(null);
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

  const gridSize = grid.length;

  function cellClass(row: number, col: number): string {
    const key = `${row}-${col}`;
    const isFound = foundCells.has(key);
    const isFirst = firstCell?.row === row && firstCell?.col === col;
    const inFlash = flashCells?.cells.includes(key);
    const flashValid = flashCells?.valid;

    if (inFlash && flashValid === false) return 'bg-red-200 text-red-800 border-red-300 scale-95';
    if (inFlash && flashValid === true)  return 'bg-green-200 text-green-800 border-green-300 scale-105';
    if (isFound)   return 'bg-[#8FC412]/20 text-[#4a6e00] border-[#8FC412] font-bold';
    if (isFirst)   return 'bg-[#0279C3] text-white border-[#0279C3]';
    return 'bg-white hover:bg-[#EEF7C8] border-gray-300 text-gray-800 cursor-pointer active:scale-95';
  }

  const progress = `${foundWords.length}/${hiddenWords.length}`;

  return (
    <div className="bg-white rounded-xl p-4 md:p-6 shadow-md">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Grid */}
        <div className="flex-1 min-w-0">
          <div
            className="inline-grid gap-[3px] select-none"
            style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`, width: '100%' }}
          >
            {grid.map((rowArr, row) =>
              rowArr.map((letter, col) => (
                <button
                  key={`${row}-${col}`}
                  onClick={() => handleCellClick(row, col)}
                  className={`
                    aspect-square flex items-center justify-center
                    border-2 rounded text-xs sm:text-sm md:text-base font-bold
                    transition-all duration-150 min-h-[32px]
                    ${cellClass(row, col)}
                  `}
                >
                  {letter}
                </button>
              ))
            )}
          </div>
          {firstCell && (
            <p className="mt-2 text-xs text-[#0279C3] font-medium">
              Начална буква избрана — кликнете на последната буква от думата.
            </p>
          )}
        </div>

        {/* Word list */}
        <div className="md:w-44 lg:w-52 flex-shrink-0">
          <p className="text-sm font-semibold text-gray-600 mb-2">
            Намерени думи: {progress}
          </p>
          <ul className="space-y-1.5">
            {hiddenWords.map(word => {
              const upper = word.toUpperCase();
              const found = foundWordNames.has(upper);
              return (
                <li key={word} className={`flex items-center gap-2 text-sm font-medium ${found ? 'text-green-700' : 'text-gray-500'}`}>
                  {found ? (
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                  ) : (
                    <span className="w-4 h-4 border-2 border-gray-300 rounded-sm flex-shrink-0 inline-block" />
                  )}
                  {word}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-5">
        <Button
          onClick={handleSubmit}
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
            {t('exercise.result')} {foundWords.length} / {hiddenWords.length} {t('exercise.correct_n')}
          </p>
          {foundWords.length < hiddenWords.length && (
            <div className="mt-2 flex flex-wrap gap-2">
              {hiddenWords
                .filter(w => !foundWordNames.has(w.toUpperCase()))
                .map(w => (
                  <span key={w} className="text-xs bg-yellow-100 border border-yellow-300 text-yellow-800 px-2 py-1 rounded font-semibold">
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

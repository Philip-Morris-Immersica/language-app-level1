'use client';

import { useState, useEffect, useMemo } from 'react';
import { CheckCircle2, XCircle, RotateCcw, Undo2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useT } from '@/i18n/useT';
import type { B1SortToColumnsExercise } from '../types';

interface Props {
  exercise: B1SortToColumnsExercise;
  onComplete?: (correct: boolean, score: number) => void;
}

/**
 * Tap-to-sort classification exercise — pick a word, then tap the group it
 * belongs to. All groups are visible and reachable at once, so this scales
 * to any number of columns (unlike the shared swipe-based `DragToColumns`,
 * which only ever wires up 3 swipe directions and silently drops a 4th
 * group — see `../types.ts` for the full rationale).
 */
export function SortToColumns({ exercise, onComplete }: Props) {
  const { items, columns: columnConfig } = exercise;
  const t = useT();

  const exampleItems = useMemo(
    () => new Set(columnConfig.map(c => c.exampleItem).filter((x): x is string => !!x)),
    [columnConfig],
  );

  const [pool, setPool] = useState<string[]>([]);
  const [placed, setPlaced] = useState<Record<string, string[]>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    const initialPlaced = Object.fromEntries(
      columnConfig.map(c => [c.id, c.exampleItem ? [c.exampleItem] : []]),
    );
    const remaining = items.filter(i => !exampleItems.has(i));
    setPool([...remaining].sort(() => Math.random() - 0.5));
    setPlaced(initialPlaced);
    setSelected(null);
    setSubmitted(false);
    setIsCorrect(false);
  }, [items, columnConfig, exampleItems, resetKey]);

  const allPlaced = pool.length === 0;
  const placedCount = items.length - pool.length;

  const selectItem = (item: string) => {
    if (submitted) return;
    setSelected(prev => (prev === item ? null : item));
  };

  const placeInColumn = (columnId: string) => {
    if (submitted || !selected) return;
    setPlaced(prev => ({ ...prev, [columnId]: [...prev[columnId], selected] }));
    setPool(prev => prev.filter(i => i !== selected));
    setSelected(null);
  };

  const returnToPool = (columnId: string, item: string) => {
    if (submitted || exampleItems.has(item)) return;
    setPlaced(prev => ({ ...prev, [columnId]: prev[columnId].filter(i => i !== item) }));
    setPool(prev => [...prev, item]);
    setSelected(null);
  };

  const handleSubmit = () => {
    if (!allPlaced) return;
    const allCorrect = columnConfig.every(col => {
      const colItems = placed[col.id] ?? [];
      return colItems.length === col.correctItems.length && colItems.every(i => col.correctItems.includes(i));
    });
    setIsCorrect(allCorrect);
    setSubmitted(true);
    onComplete?.(allCorrect, allCorrect ? 1 : 0);
  };

  const handleReset = () => setResetKey(prev => prev + 1);

  const gridColsClass =
    columnConfig.length >= 4 ? 'grid-cols-2 md:grid-cols-4' :
    columnConfig.length === 3 ? 'grid-cols-1 md:grid-cols-3' :
    'grid-cols-2';

  return (
    <div className="bg-white rounded-xl p-4 md:p-8 shadow-md">
      {/* Instructions */}
      <div className="bg-gray-100 border-l-4 border-[#8B9D5F] p-3 mb-4 rounded">
        <p className="text-sm md:text-base text-gray-700">
          <strong>{t('b1.exercise.tapToSortHowTo')}</strong> {t('b1.exercise.tapToSortInstruction')}
        </p>
      </div>

      {/* Progress indicator */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-1.5">
          <span>{t('exercise.progress')}</span>
          <span className="font-bold">{placedCount} / {items.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-[#8B9D5F] h-2 rounded-full transition-all duration-300"
            style={{ width: `${(placedCount / items.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Word pool */}
      {!allPlaced && (
        <div className="flex flex-wrap gap-2 justify-center mb-6 min-h-[3rem] p-3 bg-[#f4faee] border-2 border-dashed border-[#8B9D5F]/40 rounded-xl">
          {pool.map((item, idx) => (
            <button
              key={`${item}-${idx}`}
              onClick={() => selectItem(item)}
              className={`px-4 py-2 rounded-lg font-semibold text-sm md:text-base border-2 transition-all active:scale-95 ${
                selected === item
                  ? 'bg-[#8B9D5F] border-[#8B9D5F] text-white shadow-md scale-105'
                  : 'bg-white border-gray-300 text-gray-800 hover:border-[#8B9D5F]/60 hover:bg-[#f4faee]'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      )}

      {allPlaced && !submitted && (
        <div className="mb-4 text-center py-3">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-lg text-gray-700 font-medium">
            ✓ {t('exercise.allPlaced')}
          </div>
        </div>
      )}

      {/* Columns grid */}
      <div className={`grid ${gridColsClass} gap-3 mb-4`}>
        {columnConfig.map((col) => {
          const colItems = placed[col.id] ?? [];
          const canReceive = !submitted && !!selected;
          return (
            <div
              key={col.id}
              onClick={() => canReceive && placeInColumn(col.id)}
              className={`bg-gray-50 border-2 rounded-xl p-3 min-h-[7rem] transition-all ${
                canReceive
                  ? 'border-[#8B9D5F] border-dashed cursor-pointer hover:bg-[#f4faee]'
                  : 'border-gray-300'
              }`}
            >
              <div className="flex items-center justify-center gap-1 mb-2 pb-1.5 border-b-2 border-gray-200">
                {col.icon && <span className="text-base">{col.icon}</span>}
                <h3 className="font-bold text-gray-800 text-xs md:text-sm text-center">{col.title}</h3>
              </div>
              <div className="flex flex-col gap-1.5">
                {colItems.map((item, idx) => {
                  const isExample = exampleItems.has(item);
                  const correct = submitted ? col.correctItems.includes(item) : null;
                  return (
                    <div key={`${item}-${idx}`} className="relative">
                      <button
                        onClick={(e) => { e.stopPropagation(); returnToPool(col.id, item); }}
                        disabled={submitted || isExample}
                        className={`w-full border rounded-lg px-2 py-1.5 text-xs md:text-sm text-center font-medium ${
                          isExample
                            ? 'bg-[#DAF6EB] border-[#32C189]/50 text-[#1F5741] cursor-default'
                            : `bg-white text-gray-700 border-gray-300 ${
                                !submitted ? 'cursor-pointer hover:bg-[#FCE2DE]/40 hover:border-[#D25A45]/50 active:scale-95 transition-all' : ''
                              }`
                        }`}
                      >
                        {item}
                        {isExample && (
                          <span className="ml-1 text-[10px] tracking-wide text-[#32C189] font-bold">
                            ({t('b1.exercise.example')})
                          </span>
                        )}
                        {!submitted && !isExample && <Undo2 className="inline-block ml-1 w-3 h-3 text-gray-400" />}
                      </button>
                      {submitted && !isExample && (
                        <div className="absolute -right-1.5 -top-1.5">
                          {correct ? (
                            <CheckCircle2 className="w-4 h-4 text-green-500 bg-white rounded-full" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-500 bg-white rounded-full" />
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 mt-4">
        {!submitted ? (
          <>
            <Button
              onClick={handleSubmit}
              disabled={!allPlaced}
              className="bg-[#32C189] hover:bg-[#257958] text-white px-6 py-3 rounded-lg font-semibold text-base shadow-md active:scale-95 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {t('exercise.check')}
            </Button>
            <Button
              variant="outline"
              onClick={handleReset}
              className="px-4 py-3 rounded-lg font-semibold text-base active:scale-95 transition-all"
              title={t('exercise.reset')}
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </>
        ) : (
          <>
            <div
              className={`px-5 py-3 rounded-lg font-bold text-white text-base shadow-md ${
                isCorrect ? 'bg-[#32C189]' : 'bg-[#D25A45]'
              }`}
            >
              {isCorrect ? `✓ ${t('exercise.excellent')}` : `✗ ${t('exercise.incorrect')}`}
            </div>
            <Button
              variant="outline"
              onClick={handleReset}
              className="px-5 py-3 rounded-lg font-semibold text-base active:scale-95 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              {t('exercise.reset')}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

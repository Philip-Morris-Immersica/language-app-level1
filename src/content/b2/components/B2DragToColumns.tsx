'use client';

/**
 * B2 swipe-to-column sorter — an independent copy of the shared `DragToColumns`
 * (same swipe mechanics and the same saved-state shape: `placements`, `validation`,
 * `isSubmitted`) with a calmer, flat look:
 *  - lucide icons in the platform green instead of coloured emoji (⬅️ ➡️ 👆);
 *  - each column title is written ONCE (inside its box), not above it as well;
 *  - long items stay inside their card/box (wrapped, max. 3 lines; full text in the tooltip);
 *  - the mobile layout puts the card on top and the two columns under it.
 * No audio, so no TTS collector is needed.
 */

import { useState, useEffect, useRef, type CSSProperties } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowDown,
  ArrowLeftRight,
  Check,
  CheckCircle2,
  X,
  XCircle,
  RotateCcw,
  Undo2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useT } from '@/i18n/useT';
import { useTranslate } from '@/i18n/useTranslate';
import { useExercisePersistence } from '@/hooks/useExercisePersistence';
import type { B2DragToColumnsExercise } from '../types';

interface Props {
  exercise: B2DragToColumnsExercise;
  onComplete?: (correct: boolean, score: number) => void;
  exerciseId?: string;
}

interface Column {
  id: string;
  title: string;
  items: string[];
  correctItems: string[];
}

type Placements = Record<string, string | null>;

interface PersistedState {
  placements: Placements;
  validation: Record<string, boolean>;
  isSubmitted: boolean;
}

/** Tailwind does not scan `src/content/` — novel styles are inline. */
const GREEN_STYLE: CSSProperties = { color: '#32C189' };
const clampStyle = (lines: number): CSSProperties => ({
  display: '-webkit-box',
  WebkitLineClamp: lines,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  overflowWrap: 'anywhere',
});

function buildPlacements(items: string[], columns: Column[]): Placements {
  return Object.fromEntries(
    items.map((item) => [item, columns.find((col) => col.items.includes(item))?.id ?? null]),
  );
}

function restoreState(
  items: string[],
  columnConfig: B2DragToColumnsExercise['columns'],
  saved: unknown,
): PersistedState | null {
  const s = saved as Partial<PersistedState> | undefined;
  if (!s?.placements) return null;
  const placements: Placements = Object.fromEntries(
    items.map((item) => {
      const columnId = s.placements?.[item];
      return [item, columnConfig.some((col) => col.id === columnId) ? (columnId as string) : null];
    }),
  );
  const isSubmitted = !!s.isSubmitted && items.every((item) => placements[item] !== null);
  return { placements, validation: isSubmitted ? s.validation ?? {} : {}, isSubmitted };
}

function ColumnTitle({ title }: { title: string }) {
  const translated = useTranslate(title);
  return <>{translated}</>;
}

/** Text size of the swipe card by length, so even the longest item fits in ≤ 3 lines. */
function cardTextClass(text: string, mobile: boolean): string {
  const n = text.length;
  if (mobile) return n > 60 ? 'text-xs' : n > 28 ? 'text-sm' : 'text-lg';
  return n > 60 ? 'text-sm' : n > 28 ? 'text-lg' : 'text-2xl';
}

function ColumnDropZone({
  column,
  submitted,
  onRemove,
}: {
  column: Column;
  submitted: boolean;
  onRemove?: (item: string) => void;
}) {
  const t = useT();
  return (
    <div className="bg-gray-50 border-2 border-gray-300 rounded-xl p-2 md:p-4 min-w-0">
      <div className="flex items-center justify-center gap-1.5 mb-2 pb-2 border-b-2 border-gray-200">
        <h3 className="font-bold text-gray-800 text-xs md:text-base leading-tight text-center">
          <ColumnTitle title={column.title} />
        </h3>
        <span className="text-gray-500 text-[10px] md:text-xs">({column.items.length})</span>
      </div>

      <div className="space-y-1.5 min-h-[60px] md:min-h-[80px]">
        {column.items.map((item, index) => (
          <div key={index} className="relative">
            <div
              className={`bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs md:text-sm text-center font-medium text-gray-700 leading-snug ${
                !submitted && onRemove
                  ? 'cursor-pointer hover:bg-[#DAF6EB]/60 hover:border-[#32C189] active:scale-95 transition-all'
                  : ''
              }`}
              onClick={() => !submitted && onRemove && onRemove(item)}
              title={!submitted && onRemove ? `${item} — ${t('exercise.tapToReturn')}` : item}
            >
              <span style={clampStyle(3)}>{item}</span>
              {!submitted && onRemove && (
                <Undo2 className="w-3 h-3 inline-block mt-0.5" style={{ color: '#9ca3af' }} aria-hidden />
              )}
            </div>
            {submitted && (
              <div className="absolute -right-1.5 -top-1.5">
                {column.correctItems.includes(item) ? (
                  <CheckCircle2 className="w-4 h-4 text-green-500 bg-white rounded-full" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500 bg-white rounded-full" />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function B2DragToColumns({ exercise, onComplete, exerciseId }: Props) {
  const items = exercise.items;
  const columnConfig = exercise.columns;
  const { savedState, saveState } = useExercisePersistence(exerciseId ?? exercise.id);
  const initialSaved = useRef(savedState).current;
  const [validation, setValidation] = useState<Record<string, boolean>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [columns, setColumns] = useState<Column[]>([]);
  const [shuffledItems, setShuffledItems] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | 'down' | null>(null);
  const [resetKey, setResetKey] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [dragOffsetY, setDragOffsetY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const t = useT();

  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const touchEndY = useRef<number>(0);

  const lastSavedSig = useRef<string | null>(null);
  if (lastSavedSig.current === null) {
    const restored = restoreState(items, columnConfig, initialSaved);
    lastSavedSig.current = JSON.stringify(
      restored ?? {
        placements: Object.fromEntries(items.map((item) => [item, null])),
        validation: {},
        isSubmitted: false,
      },
    );
  }

  useEffect(() => {
    const restored = resetKey === 0 ? restoreState(items, columnConfig, initialSaved) : null;
    const placedItems = restored ? items.filter((item) => restored.placements[item] !== null) : [];
    const unplacedItems = items.filter((item) => !placedItems.includes(item));
    const shuffled = [...unplacedItems].sort(() => Math.random() - 0.5);
    setShuffledItems([...placedItems, ...shuffled]);
    setCurrentIndex(placedItems.length);

    const initialColumns: Column[] = columnConfig.map((col) => ({
      id: col.id,
      title: col.title,
      correctItems: col.correctItems,
      items: restored ? items.filter((item) => restored.placements[item] === col.id) : [],
    }));
    setColumns(initialColumns);
    setSubmitted(restored?.isSubmitted ?? false);
    setValidation(restored?.validation ?? {});
    setIsCorrect(
      !!restored?.isSubmitted &&
        initialColumns.every(
          (col) =>
            col.items.length === col.correctItems.length &&
            col.items.every((item) => col.correctItems.includes(item)),
        ),
    );
    setSwipeDirection(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, columnConfig, resetKey]);

  useEffect(() => {
    if (columns.length === 0) return;
    const state: PersistedState = {
      placements: buildPlacements(items, columns),
      validation,
      isSubmitted: submitted,
    };
    const sig = JSON.stringify(state);
    if (sig === lastSavedSig.current) return;
    lastSavedSig.current = sig;
    saveState(state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns, validation, submitted]);

  const currentItem = shuffledItems[currentIndex];
  const allItemsPlaced = currentIndex >= shuffledItems.length;
  const isMultiColumn = columnConfig.length > 2;

  const handleSwipe = (direction: 'left' | 'right' | 'down') => {
    if (allItemsPlaced || submitted) return;
    setSwipeDirection(direction);

    const targetColumnId =
      direction === 'left'
        ? columns[0].id
        : direction === 'right'
          ? columns[1].id
          : columns[2]?.id ?? columns[1].id;

    setColumns((prev) =>
      prev.map((col) =>
        col.id === targetColumnId ? { ...col, items: [...col.items, currentItem] } : col,
      ),
    );

    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setSwipeDirection(null);
    }, 300);
  };

  const resolveSwipeDirection = (dx: number, dy: number): 'left' | 'right' | 'down' | null => {
    const threshold = 30;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);
    if (absX < threshold && absY < threshold) return null;
    if (isMultiColumn && dy > threshold && absY > absX) return 'down';
    if (dx > threshold && absX >= absY) return 'left';
    if (dx < -threshold && absX >= absY) return 'right';
    return null;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchEndX.current = e.touches[0].clientX;
    touchEndY.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const cx = e.touches[0].clientX;
    const cy = e.touches[0].clientY;
    setDragOffset(cx - touchStartX.current);
    setDragOffsetY(cy - touchStartY.current);
    touchEndX.current = cx;
    touchEndY.current = cy;
  };

  const finishDrag = () => {
    setIsDragging(false);
    const dx = touchStartX.current - touchEndX.current;
    const dy = touchEndY.current - touchStartY.current;
    const dir = resolveSwipeDirection(dx, dy);
    if (dir) handleSwipe(dir);
    setDragOffset(0);
    setDragOffsetY(0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    touchStartX.current = e.clientX;
    touchStartY.current = e.clientY;
    touchEndX.current = e.clientX;
    touchEndY.current = e.clientY;
    setIsDragging(true);

    const onGlobalMouseMove = (ev: MouseEvent) => {
      setDragOffset(ev.clientX - touchStartX.current);
      setDragOffsetY(ev.clientY - touchStartY.current);
      touchEndX.current = ev.clientX;
      touchEndY.current = ev.clientY;
    };

    const onGlobalMouseUp = () => {
      document.removeEventListener('mousemove', onGlobalMouseMove);
      document.removeEventListener('mouseup', onGlobalMouseUp);
      finishDrag();
    };

    document.addEventListener('mousemove', onGlobalMouseMove);
    document.addEventListener('mouseup', onGlobalMouseUp);
  };

  const handleSubmit = () => {
    if (!allItemsPlaced) {
      alert(t('exercise.placeAllFirst'));
      return;
    }

    const allCorrect = columns.every(
      (col) =>
        col.items.length === col.correctItems.length &&
        col.items.every((item) => col.correctItems.includes(item)),
    );
    const itemResults = Object.fromEntries(
      items.map((item) => [
        item,
        columns.some((col) => col.items.includes(item) && col.correctItems.includes(item)),
      ]),
    );

    setIsCorrect(allCorrect);
    setValidation(itemResults);
    setSubmitted(true);
    onComplete?.(allCorrect, Object.values(itemResults).filter(Boolean).length);
  };

  const handleReset = () => {
    const cleared: PersistedState = {
      placements: Object.fromEntries(items.map((item) => [item, null])),
      validation: {},
      isSubmitted: false,
    };
    lastSavedSig.current = JSON.stringify(cleared);
    saveState(cleared);
    setValidation({});
    setResetKey((prev) => prev + 1);
  };

  const handleRemoveFromColumn = (columnId: string, item: string) => {
    if (submitted) return;
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId ? { ...col, items: col.items.filter((i) => i !== item) } : col,
      ),
    );
    setShuffledItems((prev) => {
      const next = [...prev];
      next.splice(currentIndex, 0, item);
      return next;
    });
  };

  const swipeCardProps = {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: finishDrag,
    onMouseDown: handleMouseDown,
  };

  const totalDragDist = Math.sqrt(dragOffset * dragOffset + dragOffsetY * dragOffsetY);
  const cardStyle = {
    transform:
      dragOffset !== 0 || dragOffsetY !== 0
        ? `translate(${dragOffset}px, ${dragOffsetY}px) rotate(${dragOffset * 0.05}deg)`
        : swipeDirection === 'left'
          ? 'translateX(-200%) rotate(-20deg)'
          : swipeDirection === 'right'
            ? 'translateX(200%) rotate(20deg)'
            : swipeDirection === 'down'
              ? 'translateY(200%)'
              : 'translate(0, 0) rotate(0)',
    opacity: swipeDirection ? 0 : Math.max(0.5, 1 - totalDragDist / 300),
    transition: dragOffset !== 0 || dragOffsetY !== 0 ? 'none' : 'all 0.3s ease-out',
  };

  const dropZone = (idx: number) =>
    columns[idx] ? (
      <ColumnDropZone
        column={columns[idx]}
        submitted={submitted}
        onRemove={(item) => handleRemoveFromColumn(columns[idx].id, item)}
      />
    ) : null;

  const swipeCard = (mobile: boolean) => (
    <div
      {...swipeCardProps}
      className="bg-white rounded-2xl shadow-xl cursor-grab active:cursor-grabbing touch-none select-none"
      style={{
        ...cardStyle,
        border: '4px solid #32C189',
        width: mobile ? '100%' : '16rem',
        maxWidth: mobile ? '18rem' : undefined,
        padding: mobile ? '1.1rem 1rem' : '2rem 1.25rem',
        overflow: 'hidden',
      }}
    >
      <p
        className={`font-bold text-gray-800 text-center leading-snug ${cardTextClass(
          currentItem ?? '',
          mobile,
        )}`}
        style={clampStyle(3)}
        title={currentItem}
      >
        {currentItem}
      </p>
    </div>
  );

  return (
    <div className="bg-white rounded-xl p-4 md:p-8 shadow-md">
      {exercise.imageUrl && (
        <div className="mb-5 flex justify-center">
          <img
            src={exercise.imageUrl}
            alt=""
            className="max-w-full md:max-w-2xl rounded-xl border-2 border-gray-200 shadow-sm"
          />
        </div>
      )}

      <div className="bg-gray-100 border-l-4 border-[#32C189] p-3 mb-4 rounded">
        <p className="text-sm md:text-base text-gray-700">
          <strong>{t('exercise.swipeHowTo')}</strong>{' '}
          {isMultiColumn ? t('exercise.swipeInstruction3') : t('exercise.swipeInstruction')}
        </p>
      </div>

      {!allItemsPlaced && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-1.5">
            <span>{t('exercise.progress')}</span>
            <span className="font-bold">
              {currentIndex} / {shuffledItems.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[#32C189] h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentIndex / shuffledItems.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      {!allItemsPlaced ? (
        <>
          {/* Desktop */}
          <div className="hidden md:block mb-6">
            <div className="grid grid-cols-[1fr_auto_1fr] gap-5 items-start">
              <div className="min-w-0">
                <div className="flex justify-center mb-2">
                  <ArrowLeft className="w-7 h-7" style={GREEN_STYLE} aria-hidden />
                </div>
                {dropZone(0)}
              </div>

              <div className="flex flex-col items-center gap-3" style={{ paddingTop: '2.25rem' }}>
                {swipeCard(false)}
                <p className="text-xs text-gray-500 flex items-center gap-1.5 mt-1">
                  <ArrowLeftRight className="w-4 h-4" style={GREEN_STYLE} aria-hidden />
                  <span>{t('exercise.swipeHint')}</span>
                </p>
                {isMultiColumn && (
                  <ArrowDown className="w-7 h-7" style={GREEN_STYLE} aria-hidden />
                )}
              </div>

              <div className="min-w-0">
                <div className="flex justify-center mb-2">
                  <ArrowRight className="w-7 h-7" style={GREEN_STYLE} aria-hidden />
                </div>
                {dropZone(1)}
              </div>
            </div>

            {isMultiColumn && columns[2] && (
              <div className="flex justify-center mt-4">
                <div className="w-full max-w-xs">{dropZone(2)}</div>
              </div>
            )}
          </div>

          {/* Mobile: card on top, columns under it */}
          <div className="md:hidden mb-4">
            <div className="flex flex-col items-center mb-4">
              {swipeCard(true)}
              <p className="text-xs text-gray-500 text-center mt-2 flex items-center gap-1.5">
                <ArrowLeftRight className="w-4 h-4" style={GREEN_STYLE} aria-hidden />
                <span>{t('exercise.swipeHint')}</span>
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 items-start">
              <div className="min-w-0">
                <div className="flex justify-center mb-1.5">
                  <ArrowLeft className="w-5 h-5" style={GREEN_STYLE} aria-hidden />
                </div>
                {dropZone(0)}
              </div>
              <div className="min-w-0">
                <div className="flex justify-center mb-1.5">
                  <ArrowRight className="w-5 h-5" style={GREEN_STYLE} aria-hidden />
                </div>
                {dropZone(1)}
              </div>
            </div>
            {isMultiColumn && columns[2] && (
              <div className="max-w-[60%] mx-auto mt-2">
                <div className="flex justify-center mb-1.5">
                  <ArrowDown className="w-5 h-5" style={GREEN_STYLE} aria-hidden />
                </div>
                {dropZone(2)}
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="mb-4 text-center py-4">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-lg text-gray-700 font-medium">
              <Check className="w-5 h-5" style={GREEN_STYLE} aria-hidden />
              {t('exercise.allPlaced')}
            </div>
          </div>

          <div
            className={`grid gap-4 mx-auto mb-6 ${
              isMultiColumn ? 'grid-cols-2 md:grid-cols-3 max-w-3xl' : 'grid-cols-2 max-w-3xl'
            }`}
          >
            {columns.map((column) => (
              <ColumnDropZone
                key={column.id}
                column={column}
                submitted={submitted}
                onRemove={!submitted ? (item) => handleRemoveFromColumn(column.id, item) : undefined}
              />
            ))}
          </div>
        </>
      )}

      <div className="flex gap-3 mt-4">
        {!submitted ? (
          <>
            <Button
              onClick={handleSubmit}
              disabled={!allItemsPlaced}
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
              className={`px-5 py-3 rounded-lg font-bold text-white text-base shadow-md inline-flex items-center gap-2 ${
                isCorrect ? 'bg-[#32C189]' : 'bg-[#D25A45]'
              }`}
            >
              {isCorrect ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
              {isCorrect ? t('exercise.excellent') : t('exercise.incorrect')}
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

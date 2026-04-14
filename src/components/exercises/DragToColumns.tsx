'use client';

import { useState, useEffect, useRef } from 'react';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useT } from '@/i18n/useT';

interface Column {
  id: string;
  title: string;
  icon: string;
  items: string[];
  correctItems: string[];
}

interface DragToColumnsProps {
  imageUrl?: string;
  items: string[];
  columns: {
    id: string;
    title: string;
    icon?: string;
    correctItems: string[];
  }[];
  onComplete?: (isCorrect: boolean) => void;
}

function shortenTitle(title: string): string {
  return title
    .replace('мъжки род', 'м.р.')
    .replace('женски род', 'ж.р.')
    .replace('среден род', 'ср.р.');
}

function ColumnDropZone({
  column,
  submitted,
  compact,
}: {
  column: Column;
  submitted: boolean;
  compact?: boolean;
}) {
  const displayTitle = compact ? shortenTitle(column.title) : column.title;
  return (
    <div className={`bg-gray-50 border-2 border-gray-300 rounded-xl ${compact ? 'p-2' : 'p-4'}`}>
      <div className="flex items-center justify-center gap-1 mb-1.5 pb-1.5 border-b-2 border-gray-200">
        <span className={compact ? 'text-sm' : 'text-lg'}>{column.icon}</span>
        <h3 className={`font-bold text-gray-800 ${compact ? 'text-[10px] leading-tight' : 'text-sm'}`}>
          {displayTitle}
        </h3>
        <span className={`text-gray-500 ${compact ? 'text-[9px]' : 'text-xs'}`}>({column.items.length})</span>
      </div>

      <div className={`space-y-1.5 ${compact ? 'min-h-[60px]' : 'min-h-[80px]'}`}>
        {column.items.map((item, index) => (
          <div key={index} className="relative">
            <div className="bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-center font-medium text-gray-700">
              {item}
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

export function DragToColumns({
  imageUrl,
  items,
  columns: columnConfig,
  onComplete,
}: DragToColumnsProps) {
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

  useEffect(() => {
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    setShuffledItems(shuffled);
    setCurrentIndex(0);

    const initialColumns = columnConfig.map((col) => ({
      ...col,
      icon: col.icon || '',
      items: [] as string[],
    }));
    setColumns(initialColumns);
    setSubmitted(false);
    setIsCorrect(false);
    setSwipeDirection(null);
  }, [items, columnConfig, resetKey]);

  const currentItem = shuffledItems[currentIndex];
  const allItemsPlaced = currentIndex >= shuffledItems.length;

  const isMultiColumn = columnConfig.length > 2;

  const placeInColumn = (columnId: string) => {
    if (allItemsPlaced || submitted) return;

    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? { ...col, items: [...col.items, currentItem] }
          : col
      )
    );

    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 200);
  };

  const handleSwipe = (direction: 'left' | 'right' | 'down') => {
    if (allItemsPlaced || submitted) return;

    setSwipeDirection(direction);

    const targetColumnId = direction === 'left'
      ? columns[0].id
      : direction === 'right'
      ? columns[1].id
      : columns[2]?.id ?? columns[1].id;

    setColumns((prev) =>
      prev.map((col) =>
        col.id === targetColumnId
          ? { ...col, items: [...col.items, currentItem] }
          : col
      )
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

  const handleTouchEnd = () => {
    setIsDragging(false);
    const dx = touchStartX.current - touchEndX.current;
    const dy = touchEndY.current - touchStartY.current;
    const dir = resolveSwipeDirection(dx, dy);
    if (dir) handleSwipe(dir);
    setDragOffset(0);
    setDragOffsetY(0);
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

    const allCorrect = columns.every((col) => {
      return (
        col.items.length === col.correctItems.length &&
        col.items.every((item) => col.correctItems.includes(item))
      );
    });

    setIsCorrect(allCorrect);
    setSubmitted(true);

    if (onComplete) {
      onComplete(allCorrect);
    }
  };

  const handleReset = () => {
    setResetKey(prev => prev + 1);
  };

  const swipeCardProps = {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
    onMouseDown: handleMouseDown,
  };

  const totalDragDist = Math.sqrt(dragOffset * dragOffset + dragOffsetY * dragOffsetY);
  const cardStyle = {
    transform: (dragOffset !== 0 || dragOffsetY !== 0)
      ? `translate(${dragOffset}px, ${dragOffsetY}px) rotate(${dragOffset * 0.05}deg)`
      : swipeDirection === 'left'
      ? 'translateX(-200%) rotate(-20deg)'
      : swipeDirection === 'right'
      ? 'translateX(200%) rotate(20deg)'
      : swipeDirection === 'down'
      ? 'translateY(200%)'
      : 'translate(0, 0) rotate(0)',
    opacity: swipeDirection ? 0 : Math.max(0.5, 1 - totalDragDist / 300),
    transition: (dragOffset !== 0 || dragOffsetY !== 0) ? 'none' : 'all 0.3s ease-out',
  };

  return (
    <div className="bg-white rounded-xl p-4 md:p-8 shadow-md">
      {/* Reference image */}
      {imageUrl && (
        <div className="mb-5 flex justify-center">
          <img
            src={imageUrl}
            alt=""
            className="max-w-full md:max-w-2xl rounded-xl border-2 border-gray-200 shadow-sm"
          />
        </div>
      )}

      {/* Instructions */}
      <div className="bg-gray-100 border-l-4 border-[#8B9D5F] p-3 mb-4 rounded">
        <p className="text-sm md:text-base text-gray-700">
          <strong>{t('exercise.swipeHowTo')}</strong> {isMultiColumn ? t('exercise.swipeInstruction3') : t('exercise.swipeInstruction')}
        </p>
      </div>

      {/* Progress indicator */}
      {!allItemsPlaced && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-1.5">
            <span>{t('exercise.progress')}</span>
            <span className="font-bold">{currentIndex} / {shuffledItems.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[#8B9D5F] h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentIndex / shuffledItems.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      {!allItemsPlaced ? (
        <>
          {/* ===== DESKTOP LAYOUT (md+) ===== */}
          <div className="hidden md:block mb-6">
            <div className="grid grid-cols-[1fr_auto_1fr] gap-5 items-start">
              {/* Left: label + drop zone */}
              <div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-2xl text-gray-400">⬅️</span>
                  <span className="text-base font-bold text-gray-800">{columns[0]?.title}</span>
                </div>
                {columns[0] && <ColumnDropZone column={columns[0]} submitted={submitted} />}
              </div>

              {/* Center: card + hint + down arrow */}
              <div className="flex flex-col items-center gap-3 pt-6">
                <div
                  {...swipeCardProps}
                  className="w-48 bg-white border-4 border-[#8B9D5F] rounded-2xl px-6 py-8 shadow-xl cursor-grab active:cursor-grabbing touch-none select-none"
                  style={cardStyle}
                >
                  <p className="text-2xl font-bold text-gray-800 text-center">
                    {currentItem}
                  </p>
                </div>
                <p className="text-xs text-gray-400 flex items-center gap-1.5 mt-1">
                  <span className="text-base">👆</span>
                  <span>{t('exercise.swipeHint')}</span>
                </p>
                {isMultiColumn && (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-2xl text-gray-400">⬇️</span>
                    <span className="text-base font-bold text-gray-800">{columns[2]?.title}</span>
                  </div>
                )}
              </div>

              {/* Right: label + drop zone */}
              <div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-base font-bold text-gray-800">{columns[1]?.title}</span>
                  <span className="text-2xl text-gray-400">➡️</span>
                </div>
                {columns[1] && <ColumnDropZone column={columns[1]} submitted={submitted} />}
              </div>
            </div>

            {/* Third column drop zone centered below */}
            {isMultiColumn && columns[2] && (
              <div className="flex justify-center mt-4">
                <div className="w-full max-w-xs">
                  <ColumnDropZone column={columns[2]} submitted={submitted} />
                </div>
              </div>
            )}
          </div>

          {/* ===== MOBILE LAYOUT (< md) ===== */}
          <div className="md:hidden mb-4">
            {/* Top row: left label | card | right label */}
            <div className="grid grid-cols-[1fr_auto_1fr] gap-1.5 items-start mb-3">
              {/* Left: label + drop zone stacked */}
              <div className="min-w-0">
                <div className="flex flex-col items-center justify-center mb-1.5">
                  <span className="text-[10px] font-bold text-gray-800 text-center leading-tight">{shortenTitle(columns[0]?.title ?? '')}</span>
                  <span className="text-lg text-gray-400">⬅️</span>
                </div>
                {columns[0] && <ColumnDropZone column={columns[0]} submitted={submitted} compact />}
              </div>

              {/* Center: card */}
              <div className="flex flex-col items-center pt-2">
                <div
                  {...swipeCardProps}
                  className="w-24 bg-white border-4 border-[#8B9D5F] rounded-2xl py-4 px-2 shadow-xl cursor-grab active:cursor-grabbing touch-none select-none"
                  style={cardStyle}
                >
                  <p className="text-sm font-bold text-gray-800 text-center">
                    {currentItem}
                  </p>
                </div>
                <p className="text-[9px] text-gray-400 text-center mt-1">
                  {t('exercise.swipeHint')}
                </p>
                {isMultiColumn && (
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-sm text-gray-400">⬇️</span>
                    <span className="text-[10px] font-bold text-gray-800">{shortenTitle(columns[2]?.title ?? '')}</span>
                  </div>
                )}
              </div>

              {/* Right: label + drop zone stacked */}
              <div className="min-w-0">
                <div className="flex flex-col items-center justify-center mb-1.5">
                  <span className="text-[10px] font-bold text-gray-800 text-center leading-tight">{shortenTitle(columns[1]?.title ?? '')}</span>
                  <span className="text-lg text-gray-400">➡️</span>
                </div>
                {columns[1] && <ColumnDropZone column={columns[1]} submitted={submitted} compact />}
              </div>
            </div>

            {/* Third column drop zone below on mobile — centered, fits between the side columns */}
            {isMultiColumn && columns[2] && (
              <div className="max-w-[50%] mx-auto mt-1">
                <ColumnDropZone column={columns[2]} submitted={submitted} compact />
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          {/* All items placed message */}
          <div className="mb-4 text-center py-4">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-lg text-gray-700 font-medium">
              ✓ {t('exercise.allPlaced')}
            </div>
          </div>

          {/* Show final columns */}
          <div className={`grid gap-4 mx-auto mb-6 ${isMultiColumn ? 'grid-cols-2 md:grid-cols-3 max-w-3xl' : 'grid-cols-2 max-w-lg'}`}>
            {columns.map((column) => (
              <ColumnDropZone key={column.id} column={column} submitted={submitted} />
            ))}
          </div>
        </>
      )}

      {/* Action buttons */}
      <div className="flex gap-3 mt-4">
        {!submitted ? (
          <>
            <Button
              onClick={handleSubmit}
              disabled={!allItemsPlaced}
              className="bg-[#8FC412] hover:bg-[#7DAD0E] text-white px-6 py-3 rounded-lg font-semibold text-base shadow-md active:scale-95 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
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
                isCorrect ? 'bg-[#8FC412]' : 'bg-red-500'
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

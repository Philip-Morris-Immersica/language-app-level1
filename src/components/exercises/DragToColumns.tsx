'use client';

import { useState, useEffect, useRef } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

interface Column {
  id: string;
  title: string;
  icon: string;
  items: string[];
  correctItems: string[];
}

interface DragToColumnsProps {
  items: string[];
  columns: {
    id: string;
    title: string;
    icon?: string;
    correctItems: string[];
  }[];
  onComplete?: (isCorrect: boolean) => void;
}

export function DragToColumns({
  items,
  columns: columnConfig,
  onComplete,
}: DragToColumnsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [columns, setColumns] = useState<Column[]>([]);
  const [shuffledItems, setShuffledItems] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [resetKey, setResetKey] = useState(0);
  
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  // Initialize and shuffle items
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
  const isLastItem = currentIndex === shuffledItems.length - 1;
  const allItemsPlaced = currentIndex >= shuffledItems.length;

  const handleSwipe = (direction: 'left' | 'right') => {
    if (allItemsPlaced || submitted) return;

    setSwipeDirection(direction);

    // Determine which column based on swipe direction
    const targetColumnId = direction === 'left' ? columns[0].id : columns[1].id;

    // Add item to column
    setColumns((prev) =>
      prev.map((col) =>
        col.id === targetColumnId
          ? { ...col, items: [...col.items, currentItem] }
          : col
      )
    );

    // Move to next item after animation
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setSwipeDirection(null);
    }, 300);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        handleSwipe('left');
      } else {
        handleSwipe('right');
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    touchStartX.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1) {
      touchEndX.current = e.clientX;
    }
  };

  const handleMouseUp = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        handleSwipe('left');
      } else {
        handleSwipe('right');
      }
    }
  };

  const handleSubmit = () => {
    if (!allItemsPlaced) {
      alert('Моля, поставете всички думи в колоните!');
      return;
    }

    // Check correctness
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

  return (
    <div className="bg-white rounded-xl p-4 md:p-8 shadow-md">
      {/* Instructions */}
      <div className="bg-gray-100 border-l-4 border-[#8B9D5F] p-3 mb-6 rounded">
        <p className="text-sm md:text-base text-gray-700">
          <strong>Как да играем:</strong> Плъзнете думата наляво или надясно, за да я поставите в правилната колона.
        </p>
      </div>

      {/* Progress indicator */}
      {!allItemsPlaced && (
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Напредък</span>
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

      {/* Main swipe area */}
      {!allItemsPlaced ? (
        <div className="mb-8">
          {/* Column indicators at top */}
          <div className="grid grid-cols-3 gap-4 items-center mb-8">
            {/* Left - НАПИТКИ */}
            <div className="flex flex-col items-center justify-center">
              <span className="text-4xl mb-2">{columns[0].icon}</span>
              <span className="text-base font-bold text-gray-800">{columns[0].title}</span>
              <span className="text-3xl text-gray-400 mt-2">⬅️</span>
            </div>

            {/* Center - Current word card */}
            <div className="flex justify-center">
              <div
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                className={`w-full max-w-xs bg-white border-4 border-[#8B9D5F] rounded-2xl p-8 shadow-xl cursor-grab active:cursor-grabbing touch-none select-none transition-all duration-300 ${
                  swipeDirection === 'left'
                    ? '-translate-x-[200%] opacity-0 rotate-[-20deg]'
                    : swipeDirection === 'right'
                    ? 'translate-x-[200%] opacity-0 rotate-[20deg]'
                    : 'translate-x-0 opacity-100 rotate-0'
                }`}
              >
                <p className="text-3xl md:text-4xl font-bold text-gray-800 text-center">
                  {currentItem}
                </p>
              </div>
            </div>

            {/* Right - ХРАНИ */}
            <div className="flex flex-col items-center justify-center">
              <span className="text-4xl mb-2">{columns[1].icon}</span>
              <span className="text-base font-bold text-gray-800">{columns[1].title}</span>
              <span className="text-3xl text-gray-400 mt-2">➡️</span>
            </div>
          </div>

          {/* Swipe hint */}
          <div className="text-center">
            <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
              <span className="text-xl">👆</span>
              <span>Плъзнете картата наляво или надясно</span>
            </p>
          </div>
        </div>
      ) : (
        <div className="mb-6 text-center py-8">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-lg text-gray-700 font-medium">
            ✓ Всички думи са поставени
          </div>
        </div>
      )}

      {/* Columns preview */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {columns.map((column) => (
          <div key={column.id} className="bg-gray-50 border-2 border-gray-300 rounded-xl p-4">
            {/* Column header */}
            <div className="flex items-center justify-center gap-2 mb-3 pb-2 border-b-2 border-gray-200">
              <span className="text-xl">{column.icon}</span>
              <h3 className="text-sm md:text-base font-bold text-gray-800">
                {column.title}
              </h3>
              <span className="text-xs text-gray-500">({column.items.length})</span>
            </div>

            {/* Items in column */}
            <div className="space-y-2 min-h-[100px]">
              {column.items.map((item, index) => (
                <div key={index} className="relative">
                  <div className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm md:text-base text-center font-medium text-gray-700">
                    {item}
                  </div>

                  {/* Correctness indicator */}
                  {submitted && (
                    <div className="absolute -right-2 -top-2">
                      {column.correctItems.includes(item) ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500 bg-white rounded-full" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500 bg-white rounded-full" />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={!allItemsPlaced}
            className="px-8 py-4 bg-[#8B9D5F] text-white text-lg font-bold rounded-lg hover:bg-[#7a8a52] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors shadow-md active:scale-95"
          >
            Провери
          </button>
        ) : (
          <>
            <div
              className={`px-6 py-4 rounded-lg font-bold text-white text-lg shadow-md ${
                isCorrect ? 'bg-[#8B9D5F]' : 'bg-red-500'
              }`}
            >
              {isCorrect ? '✓ Отлично!' : '✗ Опитай пак'}
            </div>
            {!isCorrect && (
              <button
                onClick={handleReset}
                className="px-8 py-4 bg-gray-500 text-white text-lg font-bold rounded-lg hover:bg-gray-600 transition-colors shadow-md active:scale-95"
              >
                Нулирай
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

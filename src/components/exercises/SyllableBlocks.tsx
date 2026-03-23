'use client';

import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useT } from '@/i18n/useT';

interface SyllableBlock {
  syllable: string;
  id: string;
}

interface WordPuzzle {
  id: string;
  syllables: string[];
  correctWord: string;
  hint?: string;
  imageUrl?: string;
}

interface SyllableBlocksProps {
  puzzles: WordPuzzle[];
  imageUrl?: string;
  columns?: number;
  onComplete?: (correct: boolean, score: number) => void;
}

function cleanSyllable(syllable: string): string {
  return syllable.replace(/-/g, '');
}

// Single draggable syllable block
function SortableBlock({ id, syllable }: { id: string; syllable: string }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 0,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        px-2 py-1.5 md:px-4 md:py-3 rounded-lg border-2 font-bold text-sm md:text-lg text-gray-800
        cursor-grab active:cursor-grabbing select-none touch-none
        transition-colors
        ${isDragging
          ? 'bg-yellow-100 border-yellow-400 shadow-lg'
          : 'bg-[#D8E4C8] border-[#A8B88A] hover:bg-[#C8D4B8] hover:border-[#6B8543] hover:scale-105'
        }
      `}
    >
      {syllable}
    </div>
  );
}

// One puzzle card (independent DndContext per puzzle)
function PuzzleCard({ puzzle }: { puzzle: WordPuzzle }) {
  const t = useT();
  const [blocks, setBlocks] = useState<SyllableBlock[]>(() =>
    puzzle.syllables.map((syl, idx) => ({
      syllable: cleanSyllable(syl),
      id: `${puzzle.id}-${idx}`,
    }))
  );

  // MouseSensor: starts drag after 10px movement (desktop)
  // TouchSensor: starts drag after 200ms hold + 5px tolerance (mobile – prevents scroll conflicts)
  // KeyboardSensor: accessibility
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 10 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setBlocks(prev => {
        const oldIndex = prev.findIndex(b => b.id === active.id);
        const newIndex = prev.findIndex(b => b.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  const currentWord = blocks.map(b => b.syllable).join('');
  const isCorrect = currentWord.toLowerCase().replace(/\s/g, '') === puzzle.correctWord.toLowerCase().replace(/\s/g, '');

  return (
    <div className={`bg-white rounded-xl border-2 p-3 md:p-4 shadow-sm transition-colors ${isCorrect ? 'border-green-400 bg-green-50' : 'border-gray-300'}`}>
      {puzzle.imageUrl && (
        <div className="flex justify-center mb-2">
          <img
            src={puzzle.imageUrl}
            alt=""
            className="w-full max-h-28 object-contain rounded-lg"
            loading="lazy"
          />
        </div>
      )}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={blocks.map(b => b.id)}
          strategy={horizontalListSortingStrategy}
        >
          <div className="flex flex-wrap gap-1 md:gap-1.5 min-h-[36px] items-center justify-center">
            {blocks.map(block => (
              <SortableBlock key={block.id} id={block.id} syllable={block.syllable} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {isCorrect && (
        <p className="text-center text-xs font-bold text-green-600 mt-2">✓ {puzzle.correctWord}</p>
      )}

      {!puzzle.imageUrl && !isCorrect && (
        <div className="text-center pt-2 border-t border-gray-200 mt-2">
          <p className="text-xs text-gray-400 italic">{t('exercise.correctAnswer')}</p>
          <p className="font-bold text-sm text-[#6B8543]">{puzzle.correctWord}</p>
        </div>
      )}
    </div>
  );
}

const columnClasses: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-2 md:grid-cols-3',
  4: 'grid-cols-2 md:grid-cols-4',
};

export function SyllableBlocks({ puzzles, imageUrl, columns }: SyllableBlocksProps) {
  const gridClass = columns ? (columnClasses[columns] || `grid-cols-2 md:grid-cols-${columns}`) : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

  return (
    <div className="bg-white rounded-xl p-4 md:p-6 shadow-md">
      {imageUrl ? (
        <div className="mb-6 flex justify-center">
          <img
            src={imageUrl}
            alt=""
            className="max-w-full max-h-[200px] w-auto rounded-lg border border-gray-100 object-contain opacity-90"
          />
        </div>
      ) : null}
      <div className={`grid ${gridClass} gap-3 md:gap-4`}>
        {puzzles.map(puzzle => (
          <PuzzleCard key={puzzle.id} puzzle={puzzle} />
        ))}
      </div>
    </div>
  );
}

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
}

interface SyllableBlocksProps {
  puzzles: WordPuzzle[];
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

  return (
    <div className="bg-white rounded-xl border-2 border-gray-300 p-5 shadow-sm">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={blocks.map(b => b.id)}
          strategy={horizontalListSortingStrategy}
        >
          <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4 md:mb-6 min-h-[40px] md:min-h-[56px] items-center justify-center">
            {blocks.map(block => (
              <SortableBlock key={block.id} id={block.id} syllable={block.syllable} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* Correct answer hint */}
      <div className="text-center pt-3 border-t-2 border-gray-200">
        <p className="text-xs text-gray-400 mb-1 italic">{t('exercise.correctAnswer')}</p>
        <p className="font-bold text-lg text-[#6B8543]">{puzzle.correctWord}</p>
      </div>
    </div>
  );
}

export function SyllableBlocks({ puzzles }: SyllableBlocksProps) {
  return (
    <div className="bg-white rounded-xl p-6 md:p-8 shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {puzzles.map(puzzle => (
          <PuzzleCard key={puzzle.id} puzzle={puzzle} />
        ))}
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect, useRef } from 'react';
import { useExercisePersistence } from '@/hooks/useExercisePersistence';
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCenter,
  type DragEndEvent,
} from '@dnd-kit/core';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { Check, X, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useT } from '@/i18n/useT';

interface LetterPuzzle {
  id: string;
  word: string;
  correctLetters: string[];
  availableLetters: string[];
}

interface LetterChoiceProps {
  puzzles: LetterPuzzle[];
  onComplete?: (correct: boolean, score: number) => void;
  exerciseId?: string;
}

// Floating letter shown while dragging
function LetterTile({ letter, overlay }: { letter: string; overlay?: boolean }) {
  return (
    <div
      className={`
        w-7 h-7 md:w-12 md:h-12 flex items-center justify-center
        text-sm md:text-xl font-bold rounded-lg border-2 select-none
        bg-[#D8E4C8] border-[#6B8543]
        ${overlay ? 'shadow-2xl scale-110 cursor-grabbing' : ''}
      `}
    >
      {letter}
    </div>
  );
}

// Draggable letter in the pool
function DraggableLetter({
  id,
  letter,
  puzzleId,
}: {
  id: string;
  letter: string;
  puzzleId: string;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    data: { puzzleId, letter },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{ opacity: isDragging ? 0 : 1 }}
      className="
        w-7 h-7 md:w-12 md:h-12 flex items-center justify-center
        text-sm md:text-xl font-bold rounded-lg border-2 cursor-grab active:cursor-grabbing
        select-none touch-none transition-transform
        bg-[#D8E4C8] border-[#A8B88A]
        hover:bg-[#C8D4B8] hover:border-[#6B8543] hover:scale-105
      "
    >
      {letter}
    </div>
  );
}

// Draggable letter already placed inside a slot
function DraggableSlotLetter({
  id,
  letter,
  puzzleId,
  slotIndex,
}: {
  id: string;
  letter: string;
  puzzleId: string;
  slotIndex: number;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    data: { type: 'slot', puzzleId, letter, slotIndex },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{ opacity: isDragging ? 0 : 1 }}
      className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing touch-none select-none"
    >
      {letter}
    </div>
  );
}

// Droppable slot (blank in the word)
function DroppableSlot({
  id,
  letter,
  puzzleId,
  slotIndex,
  onClear,
  isSubmitted,
  validation,
}: {
  id: string;
  letter: string | null;
  puzzleId: string;
  slotIndex: number;
  onClear: () => void;
  isSubmitted: boolean;
  validation: boolean | null;
}) {
  const { isOver, setNodeRef } = useDroppable({ id });

  const bgClass = isSubmitted
    ? validation === true
      ? 'bg-green-100 border-green-500 text-green-700'
      : 'bg-red-100 border-red-500 text-red-700'
    : letter
    ? isOver
      ? 'bg-yellow-100 border-yellow-400'
      : 'bg-[#EFF7E8] border-[#6B8543]'
    : isOver
    ? 'bg-yellow-100 border-yellow-400 border-dashed scale-110'
    : 'bg-white border-dashed border-gray-400';

  return (
    <div
      ref={setNodeRef}
      className={`
        w-7 h-7 md:w-12 md:h-12 flex items-center justify-center
        text-sm md:text-xl font-bold rounded-lg border-2
        transition-all
        ${bgClass}
      `}
    >
      {letter && !isSubmitted ? (
        <DraggableSlotLetter
          id={`${id}-draggable`}
          letter={letter}
          puzzleId={puzzleId}
          slotIndex={slotIndex}
        />
      ) : (
        letter ?? ''
      )}
    </div>
  );
}

// One puzzle card with its own DndContext
function PuzzleCard({
  puzzle,
  slotContents,
  onPlace,
  onMoveSlot,
  onClear,
  isSubmitted,
  validation,
}: {
  puzzle: LetterPuzzle;
  slotContents: (string | null)[];
  onPlace: (slotIndex: number, letter: string) => void;
  onMoveSlot: (fromSlot: number, toSlot: number) => void;
  onClear: (slotIndex: number) => void;
  isSubmitted: boolean;
  validation: boolean | null;
}) {
  const t = useT();
  const dragHintText = t('exercise.dragLetter');
  const correctText = t('exercise.correct');
  const wrongText = t('exercise.wrongLabel');
  const correctAnswerText = t('exercise.correctLabel');
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 8 } })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveLetter(null);
    const { active, over } = event;
    if (!over) return;

    const activeData = active.data.current as { type: 'pool' | 'slot'; puzzleId: string; letter: string; slotIndex?: number };
    const overId = String(over.id);

    // Determine target slot from droppable id (format: `${puzzleId}-slot-${idx}`)
    const slotPrefix = `${puzzle.id}-slot-`;
    if (!overId.startsWith(slotPrefix)) return;
    const targetSlot = parseInt(overId.replace(slotPrefix, ''), 10);
    if (isNaN(targetSlot)) return;

    if (activeData.type === 'slot' && activeData.slotIndex !== undefined) {
      // Moving from one slot to another
      if (activeData.slotIndex !== targetSlot) {
        onMoveSlot(activeData.slotIndex, targetSlot);
      }
    } else {
      // Placing from pool
      onPlace(targetSlot, activeData.letter);
    }
  };

  // Remaining letters not yet placed
  const getRemainingLetters = (): string[] => {
    const counts: Record<string, number> = {};
    puzzle.correctLetters.forEach(l => { counts[l] = (counts[l] || 0) + 1; });
    slotContents.forEach(l => { if (l) counts[l] = (counts[l] || 0) - 1; });
    const result: string[] = [];
    Object.entries(counts).forEach(([letter, n]) => {
      for (let i = 0; i < n; i++) result.push(letter);
    });
    return result;
  };

  const remainingLetters = getRemainingLetters();

    // Render the word — fixed chars + droppable blanks
  const renderWord = () => {
    const chars = puzzle.word.split('');
    let slotIdx = 0;
    return chars.map((char, i) => {
      if (char === '_') {
        const currentSlot = slotIdx++;
        return (
          <DroppableSlot
            key={`${puzzle.id}-slot-${currentSlot}`}
            id={`${puzzle.id}-slot-${currentSlot}`}
            letter={slotContents[currentSlot]}
            puzzleId={puzzle.id}
            slotIndex={currentSlot}
            onClear={() => onClear(currentSlot)}
            isSubmitted={isSubmitted}
            validation={validation}
          />
        );
      }
      if (char === ' ') return <div key={i} className="w-2 md:w-4" />;
      return (
        <div key={i} className="w-7 h-7 md:w-12 md:h-12 flex items-center justify-center text-sm md:text-xl font-bold text-gray-800">
          {char}
        </div>
      );
    });
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={e => setActiveLetter((e.active.data.current as any)?.letter ?? null)}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveLetter(null)}
    >
      <div className="bg-white rounded-xl border-2 border-gray-300 p-5 shadow-sm">
        {/* Word with droppable slots */}
        <div className="flex justify-center items-center gap-1 flex-wrap mb-4">
          {renderWord()}
        </div>

        {/* Letter pool */}
        {!isSubmitted && remainingLetters.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 pt-3 border-t border-gray-100">
            {remainingLetters.map((letter, idx) => (
              <DraggableLetter
                key={`${puzzle.id}-pool-${idx}`}
                id={`${puzzle.id}-pool-${idx}`}
                letter={letter}
                puzzleId={puzzle.id}
              />
            ))}
          </div>
        )}

        {/* Hint */}
        {!isSubmitted && slotContents.some(Boolean) && (
          <p className="text-center text-xs text-gray-400 mt-2">
            {dragHintText}
          </p>
        )}

        {/* Validation result per puzzle */}
        {isSubmitted && (
          <div className="flex justify-center mt-3">
            {validation === true ? (
              <div className="flex items-center gap-2 text-green-600">
                <Check className="w-5 h-5" />
                <span className="font-semibold">{correctText}</span>
              </div>
            ) : (
              <div className="text-center space-y-1">
                <div className="flex items-center gap-2 text-red-600 justify-center">
                  <X className="w-5 h-5" />
                  <span className="font-semibold">{wrongText}</span>
                </div>
                <p className="text-sm text-gray-600">
                  {correctAnswerText}{' '}
                  <strong>
                    {(() => {
                      let si = 0;
                      return puzzle.word
                        .split('')
                        .map(c => (c === '_' ? puzzle.correctLetters[si++] : c))
                        .join('');
                    })()}
                  </strong>
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Floating letter while dragging */}
      <DragOverlay dropAnimation={null}>
        {activeLetter ? <LetterTile letter={activeLetter} overlay /> : null}
      </DragOverlay>
    </DndContext>
  );
}

// Main component
export function LetterChoice({ puzzles, onComplete, exerciseId }: LetterChoiceProps) {
  const t = useT();
  const { savedState, saveState } = useExercisePersistence(exerciseId);
  const s = savedState as any;
  const [slotContents, setSlotContents] = useState<{ [puzzleId: string]: (string | null)[] }>(
    () => s?.slotContents ?? Object.fromEntries(puzzles.map(p => [p.id, p.correctLetters.map(() => null)]))
  );
  const [validation, setValidation] = useState<{ [puzzleId: string]: boolean | null }>(() => s?.validation ?? {});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(() => s?.isSubmitted ?? false);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    saveState({ slotContents, validation, isSubmitted });
  }, [slotContents, validation, isSubmitted]);

  const handlePlace = (puzzleId: string, slotIndex: number, letter: string) => {
    setSlotContents(prev => {
      const slots = [...(prev[puzzleId] || [])];
      slots[slotIndex] = letter;
      return { ...prev, [puzzleId]: slots };
    });
  };

  // Move letter already in a slot to another slot (swap if target occupied)
  const handleMoveSlot = (puzzleId: string, fromSlot: number, toSlot: number) => {
    setSlotContents(prev => {
      const slots = [...(prev[puzzleId] || [])];
      const temp = slots[toSlot];
      slots[toSlot] = slots[fromSlot];
      slots[fromSlot] = temp ?? null;
      return { ...prev, [puzzleId]: slots };
    });
  };

  const handleClear = (puzzleId: string, slotIndex: number) => {
    setSlotContents(prev => {
      const slots = [...(prev[puzzleId] || [])];
      slots[slotIndex] = null;
      return { ...prev, [puzzleId]: slots };
    });
  };

  const handleSubmit = () => {
    const newValidation: { [key: string]: boolean } = {};
    let correct = 0;

    puzzles.forEach(puzzle => {
      const slots = slotContents[puzzle.id] || [];
      const isCorrect =
        slots.length === puzzle.correctLetters.length &&
        slots.every((l, i) => (l ?? '').toUpperCase() === puzzle.correctLetters[i].toUpperCase());
      newValidation[puzzle.id] = isCorrect;
      if (isCorrect) correct++;
    });

    setValidation(newValidation);
    setIsSubmitted(true);
    onComplete?.(correct === puzzles.length, correct);
  };

  const allFilled = puzzles.every(p => {
    const slots = slotContents[p.id] || [];
    return slots.every(s => s !== null);
  });

  return (
    <div className="bg-white rounded-xl p-6 md:p-8 shadow-md">
      <div className="space-y-5">
        {puzzles.map(puzzle => (
          <PuzzleCard
            key={puzzle.id}
            puzzle={puzzle}
            slotContents={slotContents[puzzle.id] || []}
            onPlace={(slotIdx, letter) => handlePlace(puzzle.id, slotIdx, letter)}
            onMoveSlot={(from, to) => handleMoveSlot(puzzle.id, from, to)}
            onClear={slotIdx => handleClear(puzzle.id, slotIdx)}
            isSubmitted={isSubmitted}
            validation={validation[puzzle.id] ?? null}
          />
        ))}
      </div>

      {!isSubmitted && (
        <Button
          onClick={handleSubmit}
          disabled={false}
          className="mt-6 bg-[#8FC412] hover:bg-[#7DAD0E] text-white text-base font-semibold px-8 py-3 w-full sm:w-auto min-h-[48px] active:scale-95 transition-transform rounded-lg disabled:opacity-50"
        >
          {t('exercise.checkAnswers')}
        </Button>
      )}

      {isSubmitted && (
        <div className="mt-6 p-4 rounded-lg bg-white border-2 border-[#8B9D5F] animate-in fade-in duration-300">
          <div className="flex items-center gap-2">
            {Object.values(validation).every(v => v === true) ? (
              <Check className="w-6 h-6 text-green-600" />
            ) : (
              <X className="w-6 h-6 text-red-600" />
            )}
            <p className="text-base font-semibold text-gray-800">
              {t('exercise.result')} {Object.values(validation).filter(v => v === true).length} / {puzzles.length} {t('exercise.correct_n')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

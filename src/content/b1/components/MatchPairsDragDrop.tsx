'use client';

import { useState, useEffect, useRef } from 'react';
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  useDraggable,
  useDroppable,
  closestCenter,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import { Check, X, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useT } from '@/i18n/useT';
import { useExercisePersistence } from '@/hooks/useExercisePersistence';
import type { B1MatchPairsDragDropExercise } from '../types';

interface MatchPairsDragDropProps {
  exercise: B1MatchPairsDragDropExercise;
  onComplete?: (correct: boolean, score: number) => void;
}

function isImagePath(s: string): boolean {
  return (
    (s.startsWith('/') || s.startsWith('http')) &&
    /\.(jpg|jpeg|png|gif|webp)$/i.test((s.split('?')[0] ?? ''))
  );
}

function ValueDisplay({ value }: { value: string }) {
  if (isImagePath(value)) {
    return <img src={value} alt="" className="max-h-14 sm:max-h-16 w-auto mx-auto object-contain" />;
  }
  return <span className="break-words">{value}</span>;
}

// Draggable word tile in the pool
function PoolTile({ id, text }: { id: string; text: string }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id, data: { text } });
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{ opacity: isDragging ? 0 : 1 }}
      className="
        px-3 py-2 rounded-lg border-2 text-base font-medium min-h-[44px] min-w-[44px] shadow-sm
        flex items-center justify-center cursor-grab active:cursor-grabbing select-none touch-none
        transition-all border-[#6B7B3F] bg-white hover:border-[#32C189] hover:bg-[#DAF6EB]
      "
    >
      <ValueDisplay value={text} />
    </div>
  );
}

// Droppable target next to each left item — a plain empty box, no click-to-select highlight.
function TargetSlot({
  id,
  text,
  isOver,
  validation,
  isSubmitted,
  dropHereLabel,
  onClear,
}: {
  id: string;
  text: string | null;
  isOver: boolean;
  validation: boolean | null | undefined;
  isSubmitted: boolean;
  dropHereLabel: string;
  onClear: () => void;
}) {
  const { setNodeRef } = useDroppable({ id });

  let cls = 'border-dashed border-gray-300 bg-white text-gray-400';
  if (isSubmitted && validation !== undefined) {
    cls = validation
      ? 'border-green-500 bg-green-50 text-green-700'
      : 'border-[#D25A45] bg-[#FCE2DE]/40 text-[#683229]';
  } else if (text) {
    cls = 'border-[#6B7B3F] bg-white text-gray-800';
  } else if (isOver) {
    cls = 'border-[#32C189] bg-[#DAF6EB]/50 border-dashed scale-[1.02] text-gray-400';
  }

  return (
    <div
      ref={setNodeRef}
      onClick={() => { if (text && !isSubmitted) onClear(); }}
      className={`
        w-full min-h-[52px] px-4 py-3 rounded-lg border-2 text-center font-medium text-base shadow-sm
        flex items-center justify-center transition-all
        ${text && !isSubmitted ? 'cursor-pointer' : ''} ${cls}
      `}
    >
      {text ? <ValueDisplay value={text} /> : dropHereLabel}
    </div>
  );
}

/**
 * Drag-and-drop variant of the shared MatchPairs component. Drag a word from
 * the pool onto its matching field — no click-left-then-click-right flow, no
 * "waiting for a click" highlight state.
 */
export function MatchPairsDragDrop({ exercise, onComplete }: MatchPairsDragDropProps) {
  const t = useT();
  const { savedState, saveState } = useExercisePersistence(exercise.id);
  const s = savedState as {
    poolOrder?: string[];
    placements?: Record<string, string | null>;
    validation?: Record<string, boolean | null>;
    isSubmitted?: boolean;
  } | undefined;

  const [poolOrder, setPoolOrder] = useState<string[]>(() => s?.poolOrder ?? []);
  const [placements, setPlacements] = useState<Record<string, string | null>>(() => s?.placements ?? {});
  const [validation, setValidation] = useState<Record<string, boolean | null>>(() => s?.validation ?? {});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(() => s?.isSubmitted ?? false);
  const [overId, setOverId] = useState<string | null>(null);
  const [activeText, setActiveText] = useState<string | null>(null);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    saveState({ poolOrder, placements, validation, isSubmitted });
  }, [poolOrder, placements, validation, isSubmitted]);

  useEffect(() => {
    if (s?.poolOrder?.length) return;
    const rights = exercise.pairs.map(p => p.correctRight);
    const shuffled = exercise.shuffledRights || [...rights].sort(() => Math.random() - 0.5);
    setPoolOrder(shuffled);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exercise]);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 8 } }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveText((event.active.data.current as { text?: string } | undefined)?.text ?? null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveText(null);
    setOverId(null);
    const { active, over } = event;
    if (!over) return;

    const text = (active.data.current as { text?: string } | undefined)?.text;
    if (!text) return;
    const targetPairId = String(over.id).replace('slot-', '');

    if (isSubmitted) { setIsSubmitted(false); setValidation({}); }

    let displaced: string | null = null;
    setPlacements(prev => {
      const next = { ...prev };
      // If this word was already placed in another slot, free that slot.
      for (const pid of Object.keys(next)) {
        if (next[pid] === text) next[pid] = null;
      }
      displaced = next[targetPairId] ?? null;
      next[targetPairId] = text;
      return next;
    });
    setPoolOrder(prev => {
      const next = prev.filter(w => w !== text);
      return displaced ? [...next, displaced] : next;
    });
  };

  const handleClear = (pairId: string) => {
    if (isSubmitted) { setIsSubmitted(false); setValidation({}); }
    setPlacements(prev => {
      const word = prev[pairId];
      if (!word) return prev;
      setPoolOrder(poolPrev => [...poolPrev, word]);
      return { ...prev, [pairId]: null };
    });
  };

  const handleReset = () => {
    const rights = exercise.pairs.map(p => p.correctRight);
    const shuffled = exercise.shuffledRights || [...rights].sort(() => Math.random() - 0.5);
    setPoolOrder(shuffled);
    setPlacements({});
    setValidation({});
    setIsSubmitted(false);
    saveState({ poolOrder: shuffled, placements: {}, validation: {}, isSubmitted: false });
  };

  const handleSubmit = () => {
    const newValidation: Record<string, boolean> = {};
    let correctCount = 0;

    const validRightsForLeft = new Map<string, Set<string>>();
    exercise.pairs.forEach(p => {
      if (!validRightsForLeft.has(p.left)) validRightsForLeft.set(p.left, new Set());
      validRightsForLeft.get(p.left)!.add(p.correctRight);
    });

    exercise.pairs.forEach((pair, index) => {
      const pairId = pair.id || `pair-${index}`;
      const placed = placements[pairId];
      const validSet = validRightsForLeft.get(pair.left);
      const isCorrect = !!placed && (validSet?.has(placed) ?? false);
      newValidation[pairId] = isCorrect;
      if (isCorrect) correctCount++;
    });

    setValidation(newValidation);
    setIsSubmitted(true);

    if (onComplete) {
      const totalPairs = exercise.pairs.length;
      const score = exercise.points ? (correctCount / totalPairs) * exercise.points : correctCount;
      onComplete(correctCount === totalPairs, score);
    }
  };

  const showOrdinal = exercise.showLeftOrdinal !== false;
  const dropHereLabel = t('b1.exercise.dropHere');

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={(e) => setOverId(e.over ? String(e.over.id) : null)}
      onDragEnd={handleDragEnd}
      onDragCancel={() => { setActiveText(null); setOverId(null); }}
    >
      <div className="bg-white rounded-xl p-6 md:p-8 shadow-md">
        <p className="text-sm font-medium text-gray-600 mb-4">
          {t('b1.exercise.dragToMatch')}
        </p>

        <div className="space-y-3">
          {exercise.pairs.map((pair, index) => {
            const pairId = pair.id || `pair-${index}`;
            const placed = placements[pairId] ?? null;
            const validationResult = validation[pairId];

            return (
              <div key={pairId} className="flex items-center gap-3">
                {showOrdinal && (
                  <div className="flex-shrink-0 w-8 text-center">
                    <span className="text-base font-semibold text-gray-700">{index + 1}.</span>
                  </div>
                )}

                <div className={`flex-shrink-0 ${showOrdinal ? 'w-28 md:w-40 lg:w-48' : 'w-16 md:w-20 lg:w-24'}`}>
                  <span className="text-sm md:text-base font-medium text-gray-800 leading-snug">
                    {pair.left}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <TargetSlot
                    id={`slot-${pairId}`}
                    text={placed}
                    isOver={overId === `slot-${pairId}`}
                    validation={isSubmitted ? validationResult : undefined}
                    isSubmitted={isSubmitted}
                    dropHereLabel={dropHereLabel}
                    onClear={() => handleClear(pairId)}
                  />
                </div>

                {isSubmitted && (
                  <div className="flex-shrink-0 w-6">
                    {validationResult === true && <Check className="w-6 h-6 text-green-600" />}
                    {validationResult === false && <X className="w-6 h-6 text-[#D25A45]" />}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {poolOrder.length > 0 && (
          <div className="mt-6 pt-6 border-t-2 border-gray-100">
            <div className="flex flex-wrap gap-2">
              {poolOrder.map((text, i) => (
                <PoolTile key={`${text}-${i}`} id={`pool-${i}-${text}`} text={text} />
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3 mt-6">
          <Button
            onClick={handleSubmit}
            className="bg-[#32C189] hover:bg-[#257958] text-white text-base font-semibold px-8 py-3 min-h-[48px] active:scale-95 transition-transform rounded-lg"
          >
            {t('exercise.checkAnswers')}
          </Button>
          <Button variant="outline" onClick={handleReset} className="text-base font-semibold px-6 py-3 min-h-[48px] active:scale-95 transition-transform rounded-lg border-2">
            <RotateCcw className="w-4 h-4 mr-2" />
            {t('exercise.reset')}
          </Button>
        </div>

        {isSubmitted && (
          <div className="mt-6 p-4 rounded-lg bg-white border-2 border-[#8B9D5F] animate-in fade-in duration-300">
            <p className="text-base font-semibold text-gray-800">
              {t('exercise.result')} {Object.values(validation).filter(v => v === true).length} / {exercise.pairs.length} {t('exercise.correct_n')}
            </p>
          </div>
        )}
      </div>

      <DragOverlay dropAnimation={null}>
        {activeText ? (
          <div className="px-3 py-2 rounded-lg border-2 border-[#32C189] bg-[#DAF6EB] text-base font-medium shadow-2xl scale-105">
            <ValueDisplay value={activeText} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

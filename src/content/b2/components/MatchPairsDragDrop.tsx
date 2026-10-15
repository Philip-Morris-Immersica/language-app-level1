'use client';

/**
 * B2 drag-and-drop matcher: drag a word from the pool onto the field next to
 * each left item. Independent of B1 (own copy); pool order is taken from
 * `exercise.shuffledRights` so authors can show an alphabetical word bank.
 *
 * Mix & match: when pairs carry `correctRight2`, every row has TWO drop fields
 * (e.g. idiom → meaning + example) fed from two separate pools; a tile only
 * drops into a field of its own column.
 * No audio, so no TTS collector is needed.
 */

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
import type { B2MatchPairsDragDropExercise } from '../types';

interface Props {
  exercise: B2MatchPairsDragDropExercise;
  onComplete?: (correct: boolean, score: number) => void;
  exerciseId?: string;
}

type Col = 'a' | 'b';
type Pools = Record<Col, string[]>;

interface SavedState {
  /** Legacy single-pool state (kept so older saved progress still restores). */
  poolOrder?: string[];
  pools?: Pools;
  placements?: Record<string, string | null>;
  validation?: Record<string, boolean | null>;
  isSubmitted?: boolean;
}

/** Slot key: the pair id for the first column, `<pairId>__b` for the second. */
const slotKey = (pairId: string, col: Col) => (col === 'a' ? pairId : `${pairId}__b`);
const colOfSlot = (key: string): Col => (key.endsWith('__b') ? 'b' : 'a');

function PoolTile({
  id,
  text,
  col,
  long,
}: {
  id: string;
  text: string;
  col: Col;
  long: boolean;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    data: { text, col },
  });
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{ opacity: isDragging ? 0 : 1 }}
      className={`
        px-3 py-2 rounded-lg border-2 font-medium min-h-[44px] min-w-[44px] max-w-full shadow-sm
        flex items-center cursor-grab active:cursor-grabbing select-none touch-none
        transition-all border-[#6B7B3F] bg-white hover:border-[#32C189] hover:bg-[#DAF6EB]
        ${long ? 'text-sm text-left justify-start' : 'text-base justify-center'}
      `}
    >
      <span className="break-words">{text}</span>
    </div>
  );
}

function TargetSlot({
  id,
  col,
  text,
  isOver,
  validation,
  isSubmitted,
  dropHereLabel,
  long,
  onClear,
}: {
  id: string;
  col: Col;
  text: string | null;
  isOver: boolean;
  validation: boolean | null | undefined;
  isSubmitted: boolean;
  dropHereLabel: string;
  long: boolean;
  onClear: () => void;
}) {
  const { setNodeRef } = useDroppable({ id, data: { col } });

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
      onClick={() => {
        if (text && !isSubmitted) onClear();
      }}
      className={`
        w-full min-h-[52px] px-4 py-3 rounded-lg border-2 font-medium shadow-sm
        flex items-center transition-all
        ${long ? 'text-sm text-left justify-start' : 'text-base text-center justify-center'}
        ${text && !isSubmitted ? 'cursor-pointer' : ''} ${cls}
      `}
    >
      {text ? <span className="break-words">{text}</span> : dropHereLabel}
    </div>
  );
}

export function MatchPairsDragDrop({ exercise, onComplete }: Props) {
  const t = useT();
  const { savedState, saveState } = useExercisePersistence(exercise.id);
  const s = savedState as SavedState | undefined;

  const twoColumns = exercise.pairs.some(p => p.correctRight2 !== undefined);
  const cols: Col[] = twoColumns ? ['a', 'b'] : ['a'];
  const correctOf = (pair: B2MatchPairsDragDropExercise['pairs'][number], col: Col) =>
    col === 'a' ? pair.correctRight : pair.correctRight2;

  const initialPools = (): Pools => {
    const randomPool = (col: Col) =>
      exercise.pairs
        .map(p => correctOf(p, col))
        .filter((w): w is string => !!w)
        .sort(() => Math.random() - 0.5);
    return {
      a: exercise.shuffledRights ?? randomPool('a'),
      b: twoColumns ? (exercise.shuffledRights2 ?? randomPool('b')) : [],
    };
  };

  const [pools, setPools] = useState<Pools>(
    () => s?.pools ?? { a: s?.poolOrder ?? [], b: [] },
  );
  const [placements, setPlacements] = useState<Record<string, string | null>>(
    () => s?.placements ?? {},
  );
  const [validation, setValidation] = useState<Record<string, boolean | null>>(
    () => s?.validation ?? {},
  );
  const [isSubmitted, setIsSubmitted] = useState<boolean>(() => s?.isSubmitted ?? false);
  const [overId, setOverId] = useState<string | null>(null);
  const [activeText, setActiveText] = useState<string | null>(null);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    saveState({ pools, placements, validation, isSubmitted });
  }, [pools, placements, validation, isSubmitted]);

  // Seed the pools once (never refill mid-exercise).
  useEffect(() => {
    const placed = Object.values(placements).filter((v): v is string => !!v);
    if (pools.a.length > 0 || pools.b.length > 0 || placed.length > 0) return;
    setPools(s?.pools ?? initialPools());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exercise.id]);

  // Keep each pool exclusive of the words placed in its own column and of its own duplicates.
  useEffect(() => {
    setPools(prev => {
      let changed = false;
      const next = { ...prev };
      for (const col of ['a', 'b'] as Col[]) {
        const placed = new Set(
          Object.entries(placements)
            .filter(([key, v]) => colOfSlot(key) === col && !!v)
            .map(([, v]) => v as string),
        );
        const seen = new Set<string>();
        const filtered = prev[col].filter(w => {
          if (placed.has(w) || seen.has(w)) return false;
          seen.add(w);
          return true;
        });
        if (filtered.length !== prev[col].length) {
          next[col] = filtered;
          changed = true;
        }
      }
      return changed ? next : prev;
    });
  }, [placements]);

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

    const data = active.data.current as { text?: string; col?: Col } | undefined;
    const text = data?.text;
    const col = data?.col ?? 'a';
    if (!text) return;
    const targetKey = String(over.id).replace('slot-', '');
    // A tile only belongs in the fields of its own column.
    if (colOfSlot(targetKey) !== col) return;

    if (isSubmitted) {
      setIsSubmitted(false);
      setValidation({});
    }

    let displaced: string | null = null;
    setPlacements(prev => {
      const next = { ...prev };
      for (const key of Object.keys(next)) {
        if (colOfSlot(key) === col && next[key] === text) next[key] = null;
      }
      displaced = next[targetKey] ?? null;
      next[targetKey] = text;
      return next;
    });
    setPools(prev => {
      const list = prev[col].filter(w => w !== text);
      if (displaced && !list.includes(displaced)) list.push(displaced);
      return { ...prev, [col]: list };
    });
  };

  const handleClear = (key: string) => {
    if (isSubmitted) {
      setIsSubmitted(false);
      setValidation({});
    }
    const col = colOfSlot(key);
    setPlacements(prev => {
      const word = prev[key];
      if (!word) return prev;
      setPools(poolPrev =>
        poolPrev[col].includes(word) ? poolPrev : { ...poolPrev, [col]: [...poolPrev[col], word] },
      );
      return { ...prev, [key]: null };
    });
  };

  const handleReset = () => {
    const fresh = initialPools();
    setPools(fresh);
    setPlacements({});
    setValidation({});
    setIsSubmitted(false);
    saveState({ pools: fresh, placements: {}, validation: {}, isSubmitted: false });
  };

  const handleSubmit = () => {
    const newValidation: Record<string, boolean> = {};
    let correctCount = 0;
    let total = 0;

    exercise.pairs.forEach((pair, index) => {
      const pairId = pair.id || `pair-${index}`;
      for (const col of cols) {
        const key = slotKey(pairId, col);
        const isCorrect = placements[key] === correctOf(pair, col);
        newValidation[key] = isCorrect;
        total++;
        if (isCorrect) correctCount++;
      }
    });

    setValidation(newValidation);
    setIsSubmitted(true);

    if (onComplete) {
      const score = exercise.points ? (correctCount / total) * exercise.points : correctCount;
      onComplete(correctCount === total, score);
    }
  };

  const showOrdinal = exercise.showLeftOrdinal !== false;
  const dropHereLabel = t('b2.exercise.dropHere');
  const totalSlots = exercise.pairs.length * cols.length;
  const labelKeyOf = (col: Col) => (col === 'a' ? exercise.rightLabelKey : exercise.rightLabelKey2);

  const renderSlot = (pairId: string, col: Col) => {
    const key = slotKey(pairId, col);
    const result = validation[key];
    return (
      <div className="flex items-center gap-2 min-w-0">
        <div className="flex-1 min-w-0">
          <TargetSlot
            id={`slot-${key}`}
            col={col}
            text={placements[key] ?? null}
            isOver={overId === `slot-${key}`}
            validation={isSubmitted ? result : undefined}
            isSubmitted={isSubmitted}
            dropHereLabel={dropHereLabel}
            long={twoColumns}
            onClear={() => handleClear(key)}
          />
        </div>
        {isSubmitted && (
          <div className="flex-shrink-0 w-6">
            {result === true && <Check className="w-6 h-6 text-green-600" />}
            {result === false && <X className="w-6 h-6 text-[#D25A45]" />}
          </div>
        )}
      </div>
    );
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={e => setOverId(e.over ? String(e.over.id) : null)}
      onDragEnd={handleDragEnd}
      onDragCancel={() => {
        setActiveText(null);
        setOverId(null);
      }}
    >
      <div className="bg-white rounded-xl p-6 md:p-8 shadow-md">
        {twoColumns ? (
          <div className="space-y-4">
            {exercise.pairs.map((pair, index) => {
              const pairId = pair.id || `pair-${index}`;
              return (
                <div
                  key={pairId}
                  className="rounded-xl border border-gray-200 bg-gray-50 p-4 space-y-3"
                >
                  <div className="flex items-baseline gap-2">
                    {showOrdinal && (
                      <span className="text-base font-semibold text-gray-700">{index + 1}.</span>
                    )}
                    <span className="text-base md:text-lg font-bold text-[#0072BC] leading-snug">
                      {pair.left}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {cols.map(col => (
                      <div key={col} className="min-w-0">
                        {labelKeyOf(col) && (
                          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                            {t(labelKeyOf(col) as string)}
                          </p>
                        )}
                        {renderSlot(pairId, col)}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-3">
            {exercise.pairs.map((pair, index) => {
              const pairId = pair.id || `pair-${index}`;
              return (
                <div key={pairId} className="flex items-center gap-3">
                  {showOrdinal && (
                    <div className="flex-shrink-0 w-8 text-center">
                      <span className="text-base font-semibold text-gray-700">{index + 1}.</span>
                    </div>
                  )}

                  <div
                    className={`flex-shrink-0 ${
                      showOrdinal ? 'w-28 md:w-40 lg:w-48' : 'w-16 md:w-20 lg:w-24'
                    }`}
                  >
                    <span className="text-sm md:text-base font-medium text-gray-800 leading-snug">
                      {pair.left}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">{renderSlot(pairId, 'a')}</div>
                </div>
              );
            })}
          </div>
        )}

        {cols.some(col => pools[col].length > 0) && (
          <div className="mt-6 pt-6 border-t-2 border-gray-100 space-y-5">
            {cols.map(col =>
              pools[col].length > 0 ? (
                <div key={col}>
                  {twoColumns && labelKeyOf(col) && (
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      {t(labelKeyOf(col) as string)}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {pools[col].map((text, i) => (
                      <PoolTile
                        key={`${col}-${text}-${i}`}
                        id={`pool-${col}-${i}-${text}`}
                        text={text}
                        col={col}
                        long={twoColumns}
                      />
                    ))}
                  </div>
                </div>
              ) : null,
            )}
          </div>
        )}

        <div className="flex gap-3 mt-6">
          <Button
            onClick={handleSubmit}
            className="bg-[#32C189] hover:bg-[#257958] text-white text-base font-semibold px-8 py-3 min-h-[48px] active:scale-95 transition-transform rounded-lg"
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
          <div className="mt-6 p-4 rounded-lg bg-white border-2 border-[#8B9D5F] animate-in fade-in duration-300">
            <p className="text-base font-semibold text-gray-800">
              {t('exercise.result')} {Object.values(validation).filter(v => v === true).length} /{' '}
              {totalSlots} {t('exercise.correct_n')}
            </p>
          </div>
        )}
      </div>

      <DragOverlay dropAnimation={null}>
        {activeText ? (
          <div className="px-3 py-2 rounded-lg border-2 border-[#32C189] bg-[#DAF6EB] text-base font-medium shadow-2xl scale-105 max-w-md">
            <span className="break-words">{activeText}</span>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

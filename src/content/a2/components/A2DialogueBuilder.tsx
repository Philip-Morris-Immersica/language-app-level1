'use client';

/**
 * A2 variant of the shared DialogueBuilder
 * (src/components/exercises/DialogueBuilder.tsx).
 *
 * Why a copy: Nina's domain may not edit the shared exercise component. The
 * shared one ALWAYS locks the first sentence (`givenFirstLine`) and only
 * shuffles `sentences.slice(1)`. For short 3-phrase dialogues that leaves
 * almost nothing to rearrange (and one dialogue had nothing to shuffle at all).
 *
 * Behavioural difference vs. the shared version: each `section` may set
 * `lockFirst: false` to unlock the first line — then ALL sentences are shuffled
 * and every row is draggable (including position 0). Sections without the flag
 * keep the original behaviour (`givenFirstLine` fixed & green). Checking still
 * compares the current order to `sentences` (+ optional `alternateOrders`).
 *
 * Registered as the opt-in type `'a2-dialogue-builder'` in
 * `../exercise-components.ts` (A1 / other A2 lessons using `'dialogue_builder'`
 * are NOT affected). No audio — no TTS impact.
 *
 * SYNC: if the shared DialogueBuilder changes, mirror the change here.
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import { useExercisePersistence } from '@/hooks/useExercisePersistence';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, CheckCircle2, XCircle, RotateCcw, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useT } from '@/i18n/useT';

interface Section {
  id: string;
  givenFirstLine: string;
  sentences: string[];
  alternateOrders?: string[][];
  /** When false, the first line is NOT fixed and all sentences are shuffled. Default: true. */
  lockFirst?: boolean;
}

interface SectionState {
  items: { id: string; text: string }[];
  checked: boolean;
  correct: boolean | null;
}

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// Shuffle so the result never equals the original (already-correct) order.
// Without this, a short dialogue (e.g. 3 phrases) can land on the identity
// permutation and appear pre-solved. Skips when there is nothing to rearrange
// (< 2 items or all items identical).
function shuffleDifferent(arr: string[]): string[] {
  const distinct = new Set(arr).size;
  if (arr.length < 2 || distinct < 2) return [...arr];
  let out = shuffle(arr);
  for (let attempt = 0; attempt < 20 && out.every((t, i) => t === arr[i]); attempt++) {
    out = shuffle(arr);
  }
  return out;
}

// Single draggable sentence card
function SortableItem({
  id,
  text,
  checked,
  isCorrect,
  isLocked,
  correctPosition,
}: {
  id: string;
  text: string;
  checked: boolean;
  isCorrect: boolean | null;
  isLocked: boolean;
  correctPosition?: number;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id, disabled: isLocked || checked });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
  };

  let borderColor = 'border-gray-200 bg-white';
  if (isLocked) {
    borderColor = 'border-[#32C189] bg-[#DAF6EB]/30';
  } else if (checked && isCorrect === true) {
    borderColor = 'border-green-400 bg-green-50';
  } else if (checked && isCorrect === false) {
    borderColor = 'border-[#D25A45]/70 bg-[#FCE2DE]/40';
  } else if (isDragging) {
    borderColor = 'border-[#32C189] bg-[#DAF6EB]/30 shadow-lg';
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 select-none touch-none transition-colors ${borderColor} ${
        !isLocked && !checked ? 'cursor-grab active:cursor-grabbing' : ''
      }`}
      {...(!isLocked && !checked ? { ...attributes, ...listeners } : {})}
    >
      {/* Drag handle */}
      <span
        className={`text-gray-300 flex-shrink-0 ${isLocked || checked ? 'invisible' : ''}`}
      >
        <GripVertical className="w-5 h-5" />
      </span>

      {/* Lock icon for given line */}
      {isLocked && <Lock className="w-4 h-4 text-[#32C189] flex-shrink-0" />}

      <span className="text-base md:text-lg text-gray-800 leading-snug flex-1">
        <span className="text-gray-400 mr-2">–</span>
        {text}
      </span>

      {/* Position number badge (shown when checked) */}
      {checked && !isLocked && correctPosition !== undefined && (
        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
          isCorrect ? 'bg-green-100 text-green-700' : 'bg-[#FCE2DE] text-[#683229]'
        }`}>
          {correctPosition}
        </span>
      )}

      {/* Feedback icon */}
      {checked && !isLocked && (
        isCorrect
          ? <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
          : <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
      )}
    </div>
  );
}

const lockFirstOf = (section: Section) => section.lockFirst !== false;

function DialogueBuilderBase({ sections, exerciseId }: { sections: Section[]; exerciseId?: string }) {
  const { savedState, saveState } = useExercisePersistence(exerciseId);
  const s = savedState as any;
  const mounted = useRef(false);
  const t = useT();

  // Build the initial (shuffled) items for one section.
  const buildSectionItems = useCallback((section: Section) => {
    if (lockFirstOf(section)) {
      const rest = shuffleDifferent(section.sentences.slice(1));
      return [
        { id: `${section.id}-0`, text: section.givenFirstLine },
        ...rest.map((text, idx) => ({ id: `${section.id}-${idx + 1}`, text })),
      ];
    }
    // Unlocked: shuffle ALL sentences, no fixed first line.
    const all = shuffleDifferent(section.sentences);
    return all.map((text, idx) => ({ id: `${section.id}-${idx}`, text }));
  }, []);

  const buildInitialState = useCallback((): Record<string, SectionState> => {
    // Use saved state if available
    if (s?.sectionStates) return s.sectionStates;
    const state: Record<string, SectionState> = {};
    for (const section of sections) {
      state[section.id] = {
        items: buildSectionItems(section),
        checked: false,
        correct: null,
      };
    }
    return state;
  }, [sections, buildSectionItems]);

  const [sectionStates, setSectionStates] = useState<Record<string, SectionState>>(
    buildInitialState
  );

  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    saveState({ sectionStates });
  }, [sectionStates]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 8 } })
  );

  const handleDragEnd = (sectionId: string) => (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const section = sections.find(sec => sec.id === sectionId)!;
    const firstLocked = lockFirstOf(section);

    setSectionStates(prev => {
      const items = prev[sectionId].items;
      const oldIndex = items.findIndex(i => i.id === active.id);
      const newIndex = items.findIndex(i => i.id === over.id);
      // Don't allow dragging over the locked first item (only when it's locked)
      if (firstLocked && newIndex === 0) return prev;
      return {
        ...prev,
        [sectionId]: {
          ...prev[sectionId],
          items: arrayMove(items, oldIndex, newIndex),
        },
      };
    });
  };

  const handleCheck = (sectionId: string) => {
    const section = sections.find(sec => sec.id === sectionId)!;
    const current = sectionStates[sectionId].items.map(i => i.text);
    const matchesOrder = (order: string[]) => current.every((text, idx) => text === order[idx]);
    const correct = matchesOrder(section.sentences) ||
      (section.alternateOrders ?? []).some(matchesOrder);
    setSectionStates(prev => ({
      ...prev,
      [sectionId]: { ...prev[sectionId], checked: true, correct },
    }));
  };

  const handleReset = (sectionId: string) => {
    const section = sections.find(sec => sec.id === sectionId)!;
    setSectionStates(prev => ({
      ...prev,
      [sectionId]: {
        items: buildSectionItems(section),
        checked: false,
        correct: null,
      },
    }));
  };

  return (
    <div className="space-y-8">
      {sections.map(section => {
        const state = sectionStates[section.id];
        const ids = state.items.map(i => i.id);
        const firstLocked = lockFirstOf(section);

        return (
          <div
            key={section.id}
            className="bg-white rounded-2xl border-2 border-gray-200 p-5 shadow-sm"
          >
            {/* Section label */}
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 bg-[#32C189] text-white rounded-full flex items-center justify-center font-bold text-sm">
                {section.id}
              </span>
              {state.checked && (
                <span className={`text-sm font-semibold ${state.correct ? 'text-green-600' : 'text-red-500'}`}>
                  {state.correct ? `✓ ${t('exercise.correct')}` : `✗ ${t('exercise.incorrect')}`}
                </span>
              )}
            </div>

            {/* Sortable list */}
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd(section.id)}
            >
              <SortableContext items={ids} strategy={verticalListSortingStrategy}>
                <div className="space-y-2 mb-4">
                  {state.items.map((item, idx) => {
                    const isLocked = firstLocked && idx === 0;
                    const positionCorrect = state.checked
                      ? item.text === section.sentences[idx]
                      : null;
                    // Correct 1-based position (undefined when item not in sentences or row is locked)
                    const cpRaw = state.checked && !isLocked
                      ? section.sentences.indexOf(item.text) + 1
                      : 0;
                    const correctPosition = cpRaw > 0 ? cpRaw : undefined;
                    return (
                      <SortableItem
                        key={item.id}
                        id={item.id}
                        text={item.text}
                        checked={state.checked}
                        isCorrect={positionCorrect}
                        isLocked={isLocked}
                        correctPosition={correctPosition}
                      />
                    );
                  })}
                </div>
              </SortableContext>
            </DndContext>

            {/* Action buttons */}
            <div className="flex gap-3 justify-start">
              {state.checked && state.correct ? (
                <Button
                  disabled
                  className="bg-green-500 text-white flex items-center gap-2 opacity-80"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {t('exercise.correct')}
                </Button>
              ) : (
                <Button
                  onClick={() => handleCheck(section.id)}
                  className="bg-[#32C189] hover:bg-[#257958] text-white flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {t('exercise.check')}
                </Button>
              )}
              {!(state.checked && state.correct) && (
                <Button
                  variant="outline"
                  onClick={() => handleReset(section.id)}
                  className="flex items-center gap-2 border-gray-300 text-gray-600"
                >
                  <RotateCcw className="w-4 h-4" />
                  {t('exercise.reset')}
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

interface A2DialogueBuilderShape {
  id: string;
  type: string;
  sections: Section[];
}

/** Adapter for the A2 custom-renderer signature ({ exercise, onComplete, exerciseId }). */
export function A2DialogueBuilder({
  exercise,
  exerciseId,
}: {
  exercise: { id: string; type: string; [key: string]: unknown };
  onComplete?: (correct: boolean, score: number) => void;
  exerciseId?: string;
}) {
  const ex = exercise as unknown as A2DialogueBuilderShape;
  return <DialogueBuilderBase sections={ex.sections} exerciseId={exerciseId ?? exercise.id} />;
}

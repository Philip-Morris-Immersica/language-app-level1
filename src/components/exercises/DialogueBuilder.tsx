'use client';

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
}

interface SectionState {
  items: { id: string; text: string }[];
  checked: boolean;
  correct: boolean | null;
}

// Single draggable sentence card
function SortableItem({
  id,
  text,
  checked,
  isCorrect,
  isLocked,
}: {
  id: string;
  text: string;
  checked: boolean;
  isCorrect: boolean | null;
  isLocked: boolean;
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
    borderColor = 'border-[#8FC412] bg-[#f4faee]';
  } else if (checked && isCorrect === true) {
    borderColor = 'border-green-400 bg-green-50';
  } else if (checked && isCorrect === false) {
    borderColor = 'border-red-400 bg-red-50';
  } else if (isDragging) {
    borderColor = 'border-[#8FC412] bg-[#f4faee] shadow-lg';
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
      {isLocked && <Lock className="w-4 h-4 text-[#8FC412] flex-shrink-0" />}

      <span className="text-base md:text-lg text-gray-800 leading-snug flex-1">
        <span className="text-gray-400 mr-2">–</span>
        {text}
      </span>

      {/* Feedback icon */}
      {checked && !isLocked && (
        isCorrect
          ? <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
          : <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
      )}
    </div>
  );
}

interface DialogueBuilderProps {
  sections: Section[];
  exerciseId?: string;
}

export function DialogueBuilder({ sections, exerciseId }: DialogueBuilderProps) {
  const { savedState, saveState } = useExercisePersistence(exerciseId);
  const s = savedState as any;
  const mounted = useRef(false);
  const t = useT();

  // Build initial state: shuffle non-first sentences per section
  const buildInitialState = useCallback((): Record<string, SectionState> => {
    // Use saved state if available
    if (s?.sectionStates) return s.sectionStates;
    const state: Record<string, SectionState> = {};
    for (const section of sections) {
      const rest = [...section.sentences.slice(1)];
      // Shuffle
      for (let i = rest.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [rest[i], rest[j]] = [rest[j], rest[i]];
      }
      state[section.id] = {
        items: [
          { id: `${section.id}-0`, text: section.givenFirstLine },
          ...rest.map((text, idx) => ({ id: `${section.id}-${idx + 1}`, text })),
        ],
        checked: false,
        correct: null,
      };
    }
    return state;
  }, [sections]);

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

    setSectionStates(prev => {
      const items = prev[sectionId].items;
      const oldIndex = items.findIndex(i => i.id === active.id);
      const newIndex = items.findIndex(i => i.id === over.id);
      // Don't allow dragging over locked first item
      if (newIndex === 0) return prev;
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
    const section = sections.find(s => s.id === sectionId)!;
    const current = sectionStates[sectionId].items.map(i => i.text);
    const correct = current.every((text, idx) => text === section.sentences[idx]);
    setSectionStates(prev => ({
      ...prev,
      [sectionId]: { ...prev[sectionId], checked: true, correct },
    }));
  };

  const handleReset = (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId)!;
    const rest = [...section.sentences.slice(1)];
    for (let i = rest.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [rest[i], rest[j]] = [rest[j], rest[i]];
    }
    setSectionStates(prev => ({
      ...prev,
      [sectionId]: {
        items: [
          { id: `${sectionId}-0`, text: section.givenFirstLine },
          ...rest.map((text, idx) => ({ id: `${sectionId}-${idx + 1}`, text })),
        ],
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

        return (
          <div
            key={section.id}
            className="bg-white rounded-2xl border-2 border-gray-200 p-5 shadow-sm"
          >
            {/* Section label */}
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 bg-[#8FC412] text-white rounded-full flex items-center justify-center font-bold text-sm">
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
                    const isLocked = idx === 0;
                    const positionCorrect = state.checked
                      ? item.text === section.sentences[idx]
                      : null;
                    return (
                      <SortableItem
                        key={item.id}
                        id={item.id}
                        text={item.text}
                        checked={state.checked}
                        isCorrect={positionCorrect}
                        isLocked={isLocked}
                      />
                    );
                  })}
                </div>
              </SortableContext>
            </DndContext>

            {/* Action buttons */}
            <div className="flex gap-3 justify-start">
              {state.checked && !state.correct && (
                <Button
                  variant="outline"
                  onClick={() => handleReset(section.id)}
                  className="flex items-center gap-2 border-gray-300 text-gray-600"
                >
                  <RotateCcw className="w-4 h-4" />
                  {t('exercise.incorrect')}
                </Button>
              )}
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
                  className="bg-[#8FC412] hover:bg-[#7DAD0E] text-white flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {t('exercise.check')}
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

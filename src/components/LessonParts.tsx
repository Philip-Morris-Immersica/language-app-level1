'use client';

import { useEffect, useState, type ReactNode } from 'react';
import {
  BookMarked,
  GraduationCap,
  MessagesSquare,
  BookOpenText,
  BookOpen,
  ChevronDown,
  Lock,
  type LucideIcon,
} from 'lucide-react';
import { useTranslate } from '@/i18n/useTranslate';
import { useExercisePersistenceContext } from '@/contexts/ExercisePersistenceContext';

/**
 * Collapsible lesson "parts". Every part is a big UNHCR-blue button (the header);
 * clicking it reveals that part's exercises and unlocks the next part. Parts open
 * strictly in order — a locked part (grey + lock) cannot be opened until the
 * previous one has been opened — so learners can't skip ahead. All parts start
 * collapsed; the first is unlocked and highlighted as the one to open next.
 */

const THEME_ICONS: Record<string, LucideIcon> = {
  vocabulary: BookMarked,
  grammar: GraduationCap,
  dialogue: MessagesSquare,
  reading: BookOpenText,
  review: BookOpen,
  default: BookMarked,
};

export interface LessonPart {
  title: string;
  subtitle?: string;
  theme?: string;
  /** Ids of the exercises inside this part — used to auto-unlock on resume. */
  exerciseIds: string[];
  children: ReactNode;
}

interface LessonPartsProps {
  parts: LessonPart[];
  /** Any exercises that appear BEFORE the first section marker (rendered plainly, above the parts). */
  leading?: ReactNode;
}

export function LessonParts({ parts, leading }: LessonPartsProps) {
  // Indices < unlockedCount are unlocked (clickable). The first part is always open-able.
  const [unlockedCount, setUnlockedCount] = useState(1);
  const [open, setOpen] = useState<boolean[]>(() => parts.map(() => false));
  const { lastExerciseId } = useExercisePersistenceContext();

  // Returning learner: unlock and open every part up to (and including) the one
  // that holds their last-worked exercise, so the "resume" banner can scroll to it.
  useEffect(() => {
    if (!lastExerciseId) return;
    const idx = parts.findIndex((p) => p.exerciseIds.includes(lastExerciseId));
    if (idx < 0) return;
    setUnlockedCount((c) => Math.max(c, idx + 2));
    setOpen((prev) => {
      const next = [...prev];
      for (let i = 0; i <= idx; i += 1) next[i] = true;
      return next;
    });
  }, [lastExerciseId, parts]);

  const toggle = (i: number) => {
    if (i >= unlockedCount) return; // locked — ignore
    setOpen((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
    // Opening a part reveals the next one.
    setUnlockedCount((c) => Math.max(c, i + 2));
  };

  return (
    <div className="space-y-6">
      {leading}
      {parts.map((part, i) => {
        const locked = i >= unlockedCount;
        const isOpen = open[i];
        return (
          <div key={i} className="space-y-6">
            <PartHeader
              index={i}
              title={part.title}
              subtitle={part.subtitle}
              theme={part.theme}
              locked={locked}
              open={isOpen}
              actionable={!locked && !isOpen}
              onToggle={() => toggle(i)}
            />
            {/* Kept in the DOM even when closed (display:none) so the chatbot's
                exercise-tracking observer and the resume-scroll still work. */}
            <div className={isOpen ? 'space-y-8' : 'hidden'}>{part.children}</div>
          </div>
        );
      })}
    </div>
  );
}

interface PartHeaderProps {
  index: number;
  title: string;
  subtitle?: string;
  theme?: string;
  locked: boolean;
  open: boolean;
  actionable: boolean;
  onToggle: () => void;
}

function PartHeader({ index, title, subtitle, theme, locked, open, actionable, onToggle }: PartHeaderProps) {
  const partWord = useTranslate('Част');
  const translatedTitle = useTranslate(title);
  const translatedSubtitle = useTranslate(subtitle || '');
  const Icon = THEME_ICONS[theme || 'default'] || THEME_ICONS.default;
  const partLabel = `${partWord} ${index + 1}`;

  const base =
    'mt-6 w-full rounded-2xl p-6 md:p-7 shadow-md flex items-center gap-4 md:gap-5 text-left transition-colors';

  if (locked) {
    return (
      <button
        type="button"
        disabled
        aria-disabled="true"
        className={`${base} bg-[#E5E5E5] border border-[#D4D4D4] cursor-not-allowed`}
      >
        <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center bg-white/70">
          <Lock className="w-5 h-5 md:w-6 md:h-6 text-[#737373]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs md:text-sm font-bold uppercase tracking-wider text-[#737373]/70">{partLabel}</div>
          <h2 className="text-xl md:text-2xl font-bold leading-tight text-[#737373] truncate">{translatedTitle}</h2>
        </div>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      className={`${base} bg-[#CDE3F1] border-l-4 border-[#0072BC] hover:bg-[#bcdaef] active:scale-[0.99] ${
        actionable ? 'ring-2 ring-[#0072BC]/40' : ''
      }`}
    >
      <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-sm bg-white">
        <Icon className="w-6 h-6 md:w-7 md:h-7 text-[#0072BC]" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs md:text-sm font-bold uppercase tracking-wider text-[#0072BC]">{partLabel}</div>
        <h2 className="text-xl md:text-2xl font-bold leading-tight text-[#05568B]">{translatedTitle}</h2>
        {subtitle && <p className="text-sm md:text-base mt-0.5 text-[#05568B]/70">{translatedSubtitle}</p>}
      </div>
      <ChevronDown
        className={`shrink-0 w-6 h-6 md:w-7 md:h-7 text-[#0072BC] transition-transform ${open ? 'rotate-180' : ''}`}
      />
    </button>
  );
}

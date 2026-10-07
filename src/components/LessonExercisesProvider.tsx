'use client';

import { useState, useEffect, useCallback, useRef, ReactNode } from 'react';
import { History, X } from 'lucide-react';
import { ExercisePersistenceContext } from '@/contexts/ExercisePersistenceContext';
import { setCurrentExercise, clearCurrentExercise } from '@/lib/chat/currentExercise';
import { useTranslate } from '@/i18n/useTranslate';
import { CelebrationController } from '@/components/celebration/CelebrationController';
import type { CelebrationPlan } from '@/lib/celebration';

interface LessonExercisesProviderProps {
  lessonId: string;
  children: ReactNode;
  /** Completion-celebration plan (null outside the pilot lesson). */
  celebrationPlan?: CelebrationPlan | null;
}

interface ResumeBannerProps {
  exerciseId: string;
  number: number;
  onDismiss: () => void;
}

/** Dismissible "resume where you left off" banner shown above the exercises. */
function ResumeBanner({ exerciseId, number, onDismiss }: ResumeBannerProps) {
  // "Продължи от упражнение" is translated dynamically (not a static ui.ts key —
  // that file is owned by another agent); the exercise number is appended after.
  const translatedPhrase = useTranslate('Продължи от упражнение');

  const handleResume = () => {
    document
      .querySelector(`[data-exercise-id="${exerciseId}"]`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    onDismiss();
  };

  const ctaLabel = `${translatedPhrase} ${number}`;

  return (
    <div className="relative mb-6 flex flex-wrap items-center gap-3 rounded-xl border border-[#0072BC] bg-[#CDE3F1] p-4 pr-12 shadow-md md:p-5">
      <History className="h-6 w-6 flex-shrink-0 text-[#0072BC]" />
      <button
        type="button"
        onClick={handleResume}
        className="min-h-[48px] flex-1 rounded-lg bg-[#0072BC] px-5 py-2.5 text-left text-sm font-semibold text-white transition-colors hover:bg-[#05568B] md:text-base"
      >
        {ctaLabel}
      </button>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Close"
        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-[#05568B] transition-colors hover:bg-[#0072BC]/10"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}

// Debounce helper — saves at most once per 1.5s per exercise
function useDebouncedSave(lessonId: string) {
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  return useCallback((exerciseId: string, state: unknown) => {
    if (timers.current[exerciseId]) clearTimeout(timers.current[exerciseId]);

    timers.current[exerciseId] = setTimeout(async () => {
      try {
        await fetch('/api/progress/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lessonId, exerciseId, state }),
        });
      } catch {
        // Silent fail — state is still in memory
      }
    }, 1500);
  }, [lessonId]);
}

// Batches "clicked inside exercise X" signals: each exercise is sent once per
// page view, at most once per second, and flushed when the page is hidden.
function useTouchTracker(lessonId: string) {
  const sent = useRef<Set<string>>(new Set());
  const pending = useRef<Set<string>>(new Set());
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const flush = useCallback((useBeacon = false) => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
    if (pending.current.size === 0) return;
    const exerciseIds = [...pending.current];
    pending.current.clear();
    const body = JSON.stringify({ lessonId, exerciseIds });
    if (useBeacon && typeof navigator !== 'undefined' && navigator.sendBeacon) {
      navigator.sendBeacon('/api/progress/activity', new Blob([body], { type: 'application/json' }));
      return;
    }
    fetch('/api/progress/activity', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
    }).catch(() => {
      // Retry with the next batch.
      exerciseIds.forEach((id) => {
        sent.current.delete(id);
      });
    });
  }, [lessonId]);

  useEffect(() => {
    const onHide = () => {
      if (document.visibilityState === 'hidden') flush(true);
    };
    document.addEventListener('visibilitychange', onHide);
    window.addEventListener('pagehide', onHide);
    return () => {
      document.removeEventListener('visibilitychange', onHide);
      window.removeEventListener('pagehide', onHide);
      flush(true);
    };
  }, [flush]);

  return useCallback((exerciseId: string) => {
    if (sent.current.has(exerciseId)) return;
    sent.current.add(exerciseId);
    pending.current.add(exerciseId);
    if (!timer.current) timer.current = setTimeout(() => flush(), 1000);
  }, [flush]);
}

export function LessonExercisesProvider({ lessonId, children, celebrationPlan = null }: LessonExercisesProviderProps) {
  const [savedStates, setSavedStates] = useState<Record<string, unknown>>({});
  const [loaded, setLoaded] = useState(false);
  const [lastExerciseId, setLastExerciseId] = useState<string | null>(null);
  // { id, number } for the "resume" banner, resolved from the DOM once exercises
  // have mounted. null = not resolved yet / nothing to show.
  const [resumeTarget, setResumeTarget] = useState<{ id: string; number: number } | null>(null);
  const [resumeDismissed, setResumeDismissed] = useState(false);
  const debouncedSave = useDebouncedSave(lessonId);
  const markTouched = useTouchTracker(lessonId);

  // Load saved states from server on mount
  useEffect(() => {
    fetch(`/api/progress/${lessonId}`)
      .then(r => r.json())
      .then(data => {
        if (data.states) setSavedStates(data.states);
        if (data.lastExerciseId) setLastExerciseId(data.lastExerciseId);
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, [lessonId]);

  // Once exercises are loaded and mounted, resolve `lastExerciseId` to its
  // on-page exercise number so the banner can show "Продължи от упражнение N".
  // Retries a few times since exercises may still be mounting right after
  // `loaded` flips (same pattern as the IntersectionObserver setup below).
  useEffect(() => {
    if (!loaded || !lastExerciseId || resumeTarget) return;

    let attempts = 0;
    const timer = setInterval(() => {
      attempts += 1;
      const el = document.querySelector<HTMLElement>(`[data-exercise-id="${lastExerciseId}"]`);
      if (el) {
        const number = Number(el.dataset.exerciseNumber);
        if (Number.isFinite(number) && number > 1) {
          setResumeTarget({ id: lastExerciseId, number });
        }
        clearInterval(timer);
      } else if (attempts >= 5) {
        clearInterval(timer);
      }
    }, 300);

    return () => clearInterval(timer);
  }, [loaded, lastExerciseId, resumeTarget]);

  const saveState = useCallback((exerciseId: string, state: unknown) => {
    // Update local cache immediately
    setSavedStates(prev => ({ ...prev, [exerciseId]: state }));
    // Persist to DB (debounced)
    debouncedSave(exerciseId, state);
  }, [debouncedSave]);

  // Track which exercise is scrolled into view so the chatbot knows what the
  // user is looking at (see `@/lib/chat/currentExercise`). Non-visual: reads the
  // `data-exercise-*` hooks that ExerciseRenderer puts on each exercise wrapper.
  useEffect(() => {
    if (!loaded) return;

    // The exercises may still be mounting on the first tick after `loaded`
    // flips, so retry the query a couple of times before giving up.
    let observer: IntersectionObserver | null = null;
    const visible = new Set<HTMLElement>();

    // Pick the exercise the reader is actually looking at: the one that
    // straddles an anchor line near the top of the viewport (~28% down). This
    // avoids the "topmost" trap where an exercise scrolled PARTLY above the top
    // edge has the smallest (most negative) `top` and gets wrongly chosen.
    const pickCurrent = () => {
      const anchorY = window.innerHeight * 0.28;
      let best: HTMLElement | null = null;
      let bestScore = Infinity;
      visible.forEach((el) => {
        const r = el.getBoundingClientRect();
        let dist: number;
        if (r.top <= anchorY && r.bottom >= anchorY) dist = 0;      // straddles the line
        else if (r.bottom < anchorY) dist = anchorY - r.bottom;      // fully above
        else dist = r.top - anchorY;                                  // fully below
        if (dist < bestScore) {
          bestScore = dist;
          best = el;
        }
      });
      if (!best) return;
      const el: HTMLElement = best;
      const id = el.dataset.exerciseId;
      const number = Number(el.dataset.exerciseNumber);
      if (id && Number.isFinite(number)) {
        setCurrentExercise({ id, number });
      }
    };

    const setup = (): boolean => {
      const nodes = Array.from(
        document.querySelectorAll<HTMLElement>('[data-exercise-id][data-exercise-number]'),
      );
      if (nodes.length === 0) return false;

      observer = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            const el = e.target as HTMLElement;
            if (e.isIntersecting) visible.add(el);
            else visible.delete(el);
          }
          pickCurrent();
        },
        // Track everything currently in the viewport; the anchor-line logic in
        // pickCurrent decides which one the reader is on.
        { threshold: 0 },
      );
      nodes.forEach((n) => observer!.observe(n));
      return true;
    };

    let attempts = 0;
    const timer = setInterval(() => {
      attempts += 1;
      if (setup() || attempts >= 5) clearInterval(timer);
    }, 300);

    // The observer only fires when elements cross the viewport edge; re-run the
    // anchor selection during scroll too (throttled via rAF) so it stays exact.
    let rafId = 0;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        pickCurrent();
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      clearInterval(timer);
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      observer?.disconnect();
      clearCurrentExercise();
    };
  }, [loaded]);

  // Show nothing until states are loaded to avoid stale initial renders
  if (!loaded) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-[#32C189] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <ExercisePersistenceContext.Provider value={{ savedStates, saveState, lastExerciseId, markTouched }}>
      {resumeTarget && !resumeDismissed && (
        <ResumeBanner
          exerciseId={resumeTarget.id}
          number={resumeTarget.number}
          onDismiss={() => setResumeDismissed(true)}
        />
      )}
      {children}
      <CelebrationController plan={celebrationPlan} savedStates={savedStates} ready={loaded} />
    </ExercisePersistenceContext.Provider>
  );
}

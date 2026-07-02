'use client';

import { useState, useEffect, useCallback, useRef, ReactNode } from 'react';
import { ExercisePersistenceContext } from '@/contexts/ExercisePersistenceContext';
import { setCurrentExercise, clearCurrentExercise } from '@/lib/chat/currentExercise';

interface LessonExercisesProviderProps {
  lessonId: string;
  children: ReactNode;
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

export function LessonExercisesProvider({ lessonId, children }: LessonExercisesProviderProps) {
  const [savedStates, setSavedStates] = useState<Record<string, unknown>>({});
  const [loaded, setLoaded] = useState(false);
  const debouncedSave = useDebouncedSave(lessonId);

  // Load saved states from server on mount
  useEffect(() => {
    fetch(`/api/progress/${lessonId}`)
      .then(r => r.json())
      .then(data => {
        if (data.states) setSavedStates(data.states);
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, [lessonId]);

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
    <ExercisePersistenceContext.Provider value={{ savedStates, saveState }}>
      {children}
    </ExercisePersistenceContext.Provider>
  );
}

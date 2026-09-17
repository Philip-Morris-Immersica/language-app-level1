'use client';

import { useEffect, useRef, useState } from 'react';
import { isDone, type CelebrationPlan, type DoneDescriptor } from '@/lib/celebration';
import { SectionCelebrationToast } from './SectionCelebrationToast';
import { FinalCelebrationModal } from './FinalCelebrationModal';

interface CelebrationControllerProps {
  /** null when the lesson is outside the pilot — controller is a no-op. */
  plan: CelebrationPlan | null;
  savedStates: Record<string, unknown>;
  /** True once saved states have loaded from the server. */
  ready: boolean;
}

interface Step {
  key: string;
  triggerExerciseId: string;
  done: DoneDescriptor;
  kind: 'section' | 'final';
  nextLabelBg?: string;
  nextIsReview?: boolean;
}

/**
 * Watches persisted exercise state and fires completion celebrations:
 *  - a small toast when the last checkable exercise of a section is completed;
 *  - a final modal when the „Преговор" is completed.
 *
 * Fires on a FRESH completion — a not-done → done transition — so returning to a
 * partly/fully finished lesson never spams celebrations on load. A reset/edit
 * (done → not-done) re-arms the celebration, so genuinely re-doing a section
 * celebrates again. `firedKeys` prevents duplicates within one completion.
 */
export function CelebrationController({ plan, savedStates, ready }: CelebrationControllerProps) {
  const prevDone = useRef<Map<string, boolean>>(new Map());
  const firedKeys = useRef<Set<string>>(new Set());

  const [toast, setToast] = useState<{ key: string; nextLabelBg: string; nextIsReview: boolean } | null>(null);
  const [finalOpen, setFinalOpen] = useState(false);

  useEffect(() => {
    if (!ready || !plan) return;

    const steps: Step[] = [
      ...plan.sections.map((s) => ({
        key: `section:${s.sectionIndex}`,
        triggerExerciseId: s.triggerExerciseId,
        done: s.done,
        kind: 'section' as const,
        nextLabelBg: s.nextLabelBg,
        nextIsReview: s.nextIsReview,
      })),
      ...(plan.final
        ? [{
            key: 'final',
            triggerExerciseId: plan.final.triggerExerciseId,
            done: plan.final.done,
            kind: 'final' as const,
          }]
        : []),
    ];

    for (const step of steps) {
      const doneNow = isDone(step.done, savedStates[step.triggerExerciseId]);
      const prev = prevDone.current.get(step.triggerExerciseId);
      prevDone.current.set(step.triggerExerciseId, doneNow);

      // First observation of this trigger = baseline; never fire on load.
      if (prev === undefined) continue;

      if (doneNow && !prev) {
        // Fresh completion.
        if (firedKeys.current.has(step.key)) continue;
        firedKeys.current.add(step.key);
        if (step.kind === 'section') {
          setToast({
            key: step.key,
            nextLabelBg: step.nextLabelBg ?? '',
            nextIsReview: step.nextIsReview ?? false,
          });
        } else {
          setFinalOpen(true);
        }
      } else if (!doneNow && prev) {
        // Reset / edit — re-arm so a genuine re-completion celebrates again.
        firedKeys.current.delete(step.key);
      }
    }
  }, [ready, plan, savedStates]);

  if (!plan) return null;

  return (
    <>
      {toast && (
        <SectionCelebrationToast
          key={toast.key}
          nextLabelBg={toast.nextLabelBg}
          nextIsReview={toast.nextIsReview}
          onClose={() => setToast(null)}
        />
      )}
      {plan.final && (
        <FinalCelebrationModal
          open={finalOpen}
          lessonLabelBg={plan.lessonLabelBg}
          nextHref={plan.final.nextHref}
          nextLabelBg={plan.final.nextLabelBg}
          onClose={() => setFinalOpen(false)}
        />
      )}
    </>
  );
}

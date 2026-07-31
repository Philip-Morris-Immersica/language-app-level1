'use client';

import { useEffect, useRef, useState } from 'react';
import { PartyPopper, X } from 'lucide-react';
import { useTranslate } from '@/i18n/useTranslate';
import { useT } from '@/i18n/useT';
import { Confetti } from './Confetti';

interface SectionCelebrationToastProps {
  /** Bulgarian title of the next section (shown raw). Empty when next is review. */
  nextLabelBg: string;
  /** When true, point to the review using the localized `lesson.review` key. */
  nextIsReview: boolean;
  onClose: () => void;
}

const AUTO_DISMISS_MS = 5200;

/**
 * Small, non-blocking "you finished this section" toast shown bottom-center
 * with a light confetti burst. Auto-dismisses; also closable.
 */
export function SectionCelebrationToast({ nextLabelBg, nextIsReview, onClose }: SectionCelebrationToastProps) {
  const [show, setShow] = useState(false);
  const t = useT();

  const heading = useTranslate('Браво! Завършихте този раздел.');
  // Translate only the fixed lead-in; the section title stays in Bulgarian (it's
  // content), and the review uses the localized `lesson.review` key so it never
  // gets machine-mistranslated (Google renders „Преговор" as „negotiate").
  const continuePrefix = useTranslate('Продължете с');
  const continueOnward = useTranslate('Продължете напред.');
  const nextLabel = nextIsReview ? t('lesson.review') : nextLabelBg;

  // Keep the latest onClose without making it a timer dependency — otherwise a
  // parent re-render (new onClose identity) would reset the auto-dismiss clock.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const raf = requestAnimationFrame(() => setShow(true));
    const timer = setTimeout(() => setShow(false), AUTO_DISMISS_MS);
    // After the exit transition, unmount.
    const done = setTimeout(() => onCloseRef.current(), AUTO_DISMISS_MS + 320);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      clearTimeout(done);
    };
  }, []);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => onCloseRef.current(), 320);
  };

  return (
    <div
      className="fixed bottom-6 left-1/2 z-50 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2"
      role="status"
      aria-live="polite"
    >
      {/* Confetti rises above the card */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -top-52">
        {show && <Confetti count={18} variant="small" />}
      </div>

      <div
        className={`relative flex items-start gap-3 rounded-xl border border-[#32C189]/50 bg-white p-4 pr-10 shadow-lg transition-all duration-300 ${
          show ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
      >
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#DAF6EB]">
          <PartyPopper className="h-5 w-5 text-[#1F5741]" />
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-[#1F5741]">{heading}</p>
          <p className="mt-0.5 text-sm text-gray-600">
            {nextLabel ? (
              <>
                {continuePrefix}{' '}
                <span className="font-medium text-[#1F5741]">{nextLabel}</span>
              </>
            ) : (
              continueOnward
            )}
          </p>
        </div>
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close"
          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

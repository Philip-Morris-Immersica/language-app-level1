'use client';

import Link from 'next/link';
import { Trophy, ArrowRight } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useTranslate } from '@/i18n/useTranslate';
import { Confetti } from './Confetti';

interface FinalCelebrationModalProps {
  open: boolean;
  /** Bulgarian lesson label, e.g. „Урок 1: Здравейте". */
  lessonLabelBg: string;
  /** Where „Напред" links, or null when this is the last lesson/test. */
  nextHref: string | null;
  /** Bulgarian label for the next step, e.g. „Урок 2: Закуска". */
  nextLabelBg: string | null;
  onClose: () => void;
}

/** Big celebratory modal shown after the „Преговор" (end of lesson) is completed. */
export function FinalCelebrationModal({
  open,
  lessonLabelBg,
  nextHref,
  nextLabelBg,
  onClose,
}: FinalCelebrationModalProps) {
  const heading = useTranslate('Поздравления! Завършихте урока.');
  const subtitle = useTranslate('Чудесна работа — направихте голяма крачка напред.');
  // Translate only the fixed lead-in; the lesson/test title stays in Bulgarian
  // (content — never machine-translated), matching `lessonLabelBg` above.
  const continuePrefix = useTranslate('Продължете с');
  const backToLessons = useTranslate('Върнете се към уроците.');
  const continueLabel = useTranslate('Напред');
  const closeLabel = useTranslate('Остани тук');

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent className="overflow-hidden text-center sm:max-w-md">
        {/* Confetti over the whole modal */}
        <div className="pointer-events-none absolute inset-0">
          {open && <Confetti count={40} variant="large" />}
        </div>

        <div className="relative flex flex-col items-center gap-3 pt-2">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#DAF6EB]">
            <Trophy className="h-8 w-8 text-[#1F5741]" />
          </div>

          <DialogTitle className="text-2xl font-bold text-[#1F5741]">{heading}</DialogTitle>
          <p className="text-base font-semibold text-[#0072BC]">{lessonLabelBg}</p>
          <DialogDescription className="text-gray-600">{subtitle}</DialogDescription>

          <p className="mt-1 text-sm text-gray-700">
            {nextLabelBg ? (
              <>
                {continuePrefix}{' '}
                <span className="font-medium text-[#1F5741]">{nextLabelBg}</span>
              </>
            ) : (
              backToLessons
            )}
          </p>

          <div className="mt-3 flex w-full flex-col gap-2">
            {nextHref && (
              <Link href={nextHref} className="w-full" onClick={onClose}>
                <Button className="w-full bg-[#32C189] hover:bg-[#257958]">
                  {continueLabel}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
            <Button variant="outline" className="w-full" onClick={onClose}>
              {closeLabel}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

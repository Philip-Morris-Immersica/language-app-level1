'use client';

import { useT } from '@/i18n/useT';

type TtsHintKey = 'exercise.tapCardToHear' | 'exercise.tapTextToHear' | 'exercise.tapRowToHear' | 'exercise.clickLineToListen';

export function TtsHint({ messageKey }: { messageKey: TtsHintKey }) {
  const t = useT();
  return (
    <p className="flex items-center justify-center gap-1.5 text-xs text-gray-400 italic mb-4 select-none">
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      </svg>
      <span>{t(messageKey)}</span>
    </p>
  );
}

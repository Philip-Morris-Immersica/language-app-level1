'use client';

import { Volume2 } from 'lucide-react';

interface AudioIconProps {
  /** True while this specific audio item is currently playing — turns the icon UNHCR green. */
  active?: boolean;
  className?: string;
}

/**
 * Unified inline "tap to hear" affordance — the small speaker icon shown next
 * to words/lines/rows/cards that play audio on click (as opposed to a
 * dedicated "Слушай" button, see the audio-button pattern in `ReadingText`/
 * `Dialogues` section headers).
 *
 * Idle state matches the 🔊 Аудио preview in `PlatformLegend.tsx` (neutral
 * grey). Active state (currently playing) uses the UNHCR green accent.
 * Shared by `Dialogues`, `ReadingText`, `IllustratedCards`, `GrammarTable`
 * and `GrammarWithExamples` so the affordance looks identical everywhere.
 */
export function AudioIcon({ active = false, className = 'w-4 h-4' }: AudioIconProps) {
  return (
    <Volume2
      className={`${className} shrink-0 transition-colors ${active ? 'text-[#32C189]' : 'text-gray-400'}`}
    />
  );
}

'use client';

import { Volume2, Play, BookOpen, ChevronDown } from 'lucide-react';
import { useT } from '@/i18n/useT';

/**
 * Platform Legend — quick guide to the platform's interactive elements.
 *
 * Shown:
 *  - Below the level cards on the logged-in home page (`HomePageClient.tsx`)
 *  - At the bottom of the level overview page (`/level/a1` — `LevelMapClient.tsx`)
 *
 * Each item renders a *realistic preview* of the actual button / icon as it
 * appears in the live UI — same colors, same shapes, same icons — so users
 * can recognize them at a glance. Titles & descriptions are translated via
 * `legend.*` keys in `src/i18n/ui.ts` (7 languages).
 */

/** Strip leading emoji/symbol from translated title (we render a real visual instead). */
function stripLeadingEmoji(s: string): string {
  return s.replace(/^[^\p{L}\p{N}]+/u, '').trim();
}

/* ──────────────────────────────────────────────────────────────────
 * Mini visual previews of the real UI components
 * ────────────────────────────────────────────────────────────────── */

/** Small grey speaker icon as shown next to words on cards / grammar tables. */
function AudioPreview() {
  return (
    <div className="flex items-center justify-center w-14 h-14 bg-gray-50 rounded-lg border border-gray-200 shrink-0">
      <Volume2 className="w-6 h-6 text-gray-400" />
    </div>
  );
}

/** Green „Слушай" pill button as shown above dialogue sections / reading texts. */
function ListenButtonPreview({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white border-2 border-[#32C189] text-[#1F5741] text-sm font-semibold shadow-sm shrink-0">
      <Play className="w-4 h-4" />
      <span>{label}</span>
    </div>
  );
}

/** Blue floating dictionary FAB with the red ring (bottom-left of every lesson). */
function DictionaryPreview() {
  return (
    <div className="w-14 h-14 rounded-full bg-[#0072BC] text-white flex items-center justify-center ring-4 ring-[#D25A45] shadow-md shrink-0">
      <BookOpen className="w-6 h-6" />
    </div>
  );
}

/** Round Robi avatar with the red ring (bottom-right of every page). */
function RobiAvatarPreview() {
  return (
    <div className="w-14 h-14 rounded-full overflow-hidden ring-4 ring-[#D25A45] shadow-md shrink-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/robi.jpg"
        alt="Robi AI assistant"
        className="w-full h-full object-cover"
      />
    </div>
  );
}

/** Indigo „Граматика — справочник" accordion header (collapsed state) as shown
    at the start AND end of every lesson. */
function GrammarAccordionPreview({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 shadow-sm shrink-0">
      <span className="text-lg leading-none">📚</span>
      <span className="text-indigo-900 font-bold text-sm truncate max-w-[10rem]">
        {label}
      </span>
      <ChevronDown className="w-4 h-4 text-indigo-500 shrink-0" />
    </div>
  );
}

/** Golden „Култура" accordion header (collapsed state). */
function CultureAccordionPreview({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#FEF1D1] border-2 border-[#FFC740]/60 shadow-sm shrink-0">
      <span className="text-xl leading-none">🇧🇬</span>
      <span className="text-[#684D0B] font-bold text-sm truncate max-w-[10rem]">
        {label}
      </span>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Main component
 * ────────────────────────────────────────────────────────────────── */

export function PlatformLegend() {
  const t = useT();

  const items: Array<{
    titleKey: string;
    textKey: string;
    visual: React.ReactNode;
  }> = [
    {
      titleKey: 'legend.audio.title',
      textKey: 'legend.audio.text',
      visual: <AudioPreview />,
    },
    {
      titleKey: 'legend.listen.title',
      textKey: 'legend.listen.text',
      visual: <ListenButtonPreview label={t('exercise.listen')} />,
    },
    {
      titleKey: 'legend.grammar.title',
      textKey: 'legend.grammar.text',
      visual: <GrammarAccordionPreview label={stripLeadingEmoji(t('legend.grammar.title'))} />,
    },
    {
      titleKey: 'legend.culture.title',
      textKey: 'legend.culture.text',
      visual: <CultureAccordionPreview label={stripLeadingEmoji(t('legend.culture.title'))} />,
    },
    {
      titleKey: 'legend.dictionary.title',
      textKey: 'legend.dictionary.text',
      visual: <DictionaryPreview />,
    },
    {
      titleKey: 'legend.chatbot.title',
      textKey: 'legend.chatbot.text',
      visual: <RobiAvatarPreview />,
    },
  ];

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pb-10">
      <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5 sm:p-6 lg:p-8">
        <h2 className="text-base sm:text-lg font-semibold text-[#0072BC] uppercase tracking-wider mb-5 sm:mb-6">
          {t('legend.title')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {items.map(({ titleKey, textKey, visual }) => (
            <div key={titleKey} className="flex items-start gap-4">
              <div className="flex items-center justify-center min-w-[3.5rem] pt-0.5">
                {visual}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 text-base sm:text-lg leading-snug mb-1">
                  {stripLeadingEmoji(t(titleKey))}
                </p>
                <p className="text-sm sm:text-[0.95rem] text-gray-600 leading-relaxed">
                  {t(textKey)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

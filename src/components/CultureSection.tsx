'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslate } from '@/i18n/useTranslate';
import { useLanguage } from '@/i18n/LanguageContext';

interface CultureNote {
  id: string;
  title: string;
  content: string;
}

interface CultureSectionProps {
  notes: CultureNote[];
}

function TranslatedParagraph({ text }: { text: string }) {
  const { lang } = useLanguage();
  const translated = useTranslate(text);

  return (
    <div className="mb-3 last:mb-0">
      <p className="text-gray-700 leading-relaxed">{text}</p>
      {lang !== 'bg' && translated !== text && (
        <p className="text-sm text-[#0279C3] mt-1 leading-relaxed italic">{translated}</p>
      )}
    </div>
  );
}

export function CultureSection({ notes }: CultureSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { lang } = useLanguage();
  const titleTranslated = useTranslate('Култура и начин на живот');

  if (!notes || notes.length === 0) return null;

  return (
    <div className="rounded-2xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 overflow-hidden shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-amber-100/50 transition-colors cursor-pointer"
      >
        <span className="text-2xl">🇧🇬</span>
        <div className="flex-1">
          <h3 className="font-bold text-amber-900 text-lg">
            Култура и начин на живот
          </h3>
          {lang !== 'bg' && titleTranslated !== 'Култура и начин на живот' && (
            <p className="text-sm text-amber-700/70">{titleTranslated}</p>
          )}
        </div>
        <ChevronDown className={`w-5 h-5 text-amber-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <div
        className={`
          grid transition-all duration-300 ease-in-out
          ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}
        `}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 pt-1 space-y-5 border-t border-amber-200">
            {notes.map((note) => (
              <div key={note.id}>
                <TranslatedParagraph text={note.content} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

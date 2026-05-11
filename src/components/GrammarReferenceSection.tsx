'use client';

import { useState } from 'react';
import { ChevronDown, BookText } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useT } from '@/i18n/useT';

interface GrammarNote {
  id: string;
  title: Record<string, string>;
  content: Record<string, string>;
}

interface GrammarReferenceSectionProps {
  notes: GrammarNote[];
}

const SECTION_TITLE: Record<string, string> = {
  bg: 'Граматика — справочник',
  en: 'Grammar Reference',
  fr: 'Grammaire — référence',
  ar: 'المرجع النحوي',
  fa: 'مرجع دستور زبان',
  uk: 'Граматика — довідник',
  ru: 'Грамматика — справочник',
};

const SECTION_HINT: Record<string, string> = {
  bg: 'Подробни правила и обяснения за граматиката от този урок.',
  en: 'Detailed rules and explanations for the grammar in this lesson.',
  fr: 'Règles détaillées et explications de la grammaire de cette leçon.',
  ar: 'قواعد وشروحات مفصلة لقواعد هذا الدرس.',
  fa: 'قوانین و توضیحات دقیق دستور زبان این درس.',
  uk: 'Детальні правила та пояснення граматики цього уроку.',
  ru: 'Подробные правила и объяснения грамматики этого урока.',
};

function getText(translations: Record<string, string>, lang: string): string {
  return translations[lang] || translations['en'] || translations['bg'] || '';
}

function NoteAccordion({ note, lang, defaultOpen = false }: { note: GrammarNote; lang: string; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const title = getText(note.title, lang);
  const content = getText(note.content, lang);

  return (
    <div className="border border-indigo-100 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-2 px-4 py-3 text-left hover:bg-indigo-50/50 transition-colors cursor-pointer"
      >
        <ChevronDown className={`w-4 h-4 text-indigo-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        <span className="font-semibold text-indigo-900 text-base">{title}</span>
      </button>

      <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <div className="px-4 pb-4 pt-1 border-t border-indigo-50">
            <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
              {content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function GrammarReferenceSection({ notes }: GrammarReferenceSectionProps) {
  const singleNote = notes?.length === 1;
  const [isOpen, setIsOpen] = useState(singleNote);
  const { lang } = useLanguage();

  if (!notes || notes.length === 0) return null;

  const sectionTitle = SECTION_TITLE[lang] || SECTION_TITLE['en'];
  const sectionHint = SECTION_HINT[lang] || SECTION_HINT['en'];

  return (
    <div className="rounded-2xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50 overflow-hidden shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-indigo-100/50 transition-colors cursor-pointer"
      >
        <span className="text-2xl">📚</span>
        <div className="flex-1">
          <h3 className="font-bold text-indigo-900 text-lg">{sectionTitle}</h3>
          {!isOpen && (
            <p className="text-sm text-indigo-600/60">{sectionHint}</p>
          )}
        </div>
        <ChevronDown className={`w-5 h-5 text-indigo-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <div className="px-5 pb-5 pt-1 space-y-3 border-t border-indigo-200">
            {notes.map((note) => (
              <NoteAccordion key={note.id} note={note} lang={lang} defaultOpen={singleNote} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

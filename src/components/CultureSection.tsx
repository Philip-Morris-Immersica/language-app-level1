'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslate } from '@/i18n/useTranslate';
import { useLanguage } from '@/i18n/LanguageContext';

interface CultureNote {
  id: string;
  title: string | Record<string, string>;
  content: string | Record<string, string>;
}

interface CultureSectionProps {
  notes: CultureNote[];
}

function resolveText(value: string | Record<string, string>, lang: string): string {
  if (typeof value === 'string') return value;
  return value[lang] || value['bg'] || Object.values(value)[0] || '';
}

function DynamicTranslatedParagraph({ text }: { text: string }) {
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

function PreTranslatedParagraph({ content }: { content: Record<string, string> }) {
  const { lang } = useLanguage();
  const bgText = content['bg'] || '';
  const localText = lang !== 'bg' ? (content[lang] || '') : '';

  return (
    <div className="mb-3 last:mb-0">
      <p className="text-gray-700 leading-relaxed">{bgText}</p>
      {localText && (
        <p className="text-sm text-[#0279C3] mt-1 leading-relaxed italic">{localText}</p>
      )}
    </div>
  );
}

function NoteTitle({ title }: { title: string | Record<string, string> }) {
  const { lang } = useLanguage();
  const bgTitle = typeof title === 'string' ? title : (title['bg'] || '');
  const localTitle = typeof title === 'string'
    ? ''
    : (lang !== 'bg' ? (title[lang] || '') : '');
  const dynamicTranslation = useTranslate(typeof title === 'string' ? title : '');

  return (
    <div className="mb-2">
      <h4 className="font-semibold text-amber-800">{bgTitle}</h4>
      {typeof title === 'string' && lang !== 'bg' && dynamicTranslation !== title && (
        <p className="text-xs text-amber-600/80 italic">{dynamicTranslation}</p>
      )}
      {typeof title !== 'string' && localTitle && (
        <p className="text-xs text-amber-600/80 italic">{localTitle}</p>
      )}
    </div>
  );
}

export function CultureSection({ notes }: CultureSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { lang } = useLanguage();
  const sectionTitle = resolveText(
    { bg: 'Култура и начин на живот', en: 'Culture and Way of Life', fr: 'Culture et mode de vie', ar: 'الثقافة وأسلوب الحياة', fa: 'فرهنگ و شیوه زندگی', ru: 'Культура и образ жизни', uk: 'Культура і спосіб життя' },
    lang,
  );

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
          {lang !== 'bg' && sectionTitle !== 'Култура и начин на живот' && (
            <p className="text-sm text-amber-700/70">{sectionTitle}</p>
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
                <NoteTitle title={note.title} />
                {typeof note.content === 'string' ? (
                  <DynamicTranslatedParagraph text={note.content} />
                ) : (
                  <PreTranslatedParagraph content={note.content} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

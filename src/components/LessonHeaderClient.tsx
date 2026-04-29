'use client';

import { useEffect } from 'react';
import { BookText } from 'lucide-react';
import { useTranslate } from '@/i18n/useTranslate';
import { useT } from '@/i18n/useT';
import { markLessonVisited } from '@/lib/progress';

interface LessonHeaderClientProps {
  lessonId: string;
  number: number;
  title: string;
  description?: string;
  grammarTopics?: string[];
  /** When true, render a "Граматика на урока" jump link anchoring to #grammar-reference. */
  hasGrammarReference?: boolean;
}

function TranslatedTag({ topic }: { topic: string }) {
  const translated = useTranslate(topic);
  return (
    <span className="px-4 py-1.5 bg-[#DAF6EB] rounded-full text-sm font-medium text-[#1F5741]">
      {translated}
    </span>
  );
}

export function LessonHeaderClient({ lessonId, number, title, description, grammarTopics, hasGrammarReference }: LessonHeaderClientProps) {
  const t = useT();
  const translatedTitle = useTranslate(title);
  const translatedDescription = useTranslate(description ?? '');

  useEffect(() => {
    markLessonVisited(lessonId);
  }, [lessonId]);

  return (
    <div className="py-4">
      <h1 className="text-3xl md:text-4xl font-bold text-bolt-blue mb-3">
        {t('lesson.prefix')} {number}: {translatedTitle}
      </h1>
      {description && (
        <p className="text-lg text-gray-600">{translatedDescription}</p>
      )}
      {grammarTopics && grammarTopics.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {grammarTopics.map((topic, index) => (
            <TranslatedTag key={index} topic={topic} />
          ))}
        </div>
      )}
      {hasGrammarReference && (
        <div className="mt-4">
          <a
            href="#grammar-reference"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-sm font-semibold transition-colors border border-indigo-200"
          >
            <BookText className="w-4 h-4" />
            {t('lesson.grammarReferenceLink')}
          </a>
        </div>
      )}
    </div>
  );
}

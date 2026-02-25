'use client';

import { useTranslate } from '@/i18n/useTranslate';
import { useT } from '@/i18n/useT';

interface LessonHeaderClientProps {
  number: number;
  title: string;
  description?: string;
  grammarTopics?: string[];
}

function TranslatedTag({ topic }: { topic: string }) {
  const translated = useTranslate(topic);
  return (
    <span className="px-4 py-1.5 bg-[#EEF7C8] rounded-full text-sm font-medium text-[#6A940C]">
      {translated}
    </span>
  );
}

export function LessonHeaderClient({ number, title, description, grammarTopics }: LessonHeaderClientProps) {
  const t = useT();
  const translatedTitle = useTranslate(title);
  const translatedDescription = useTranslate(description ?? '');

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
    </div>
  );
}

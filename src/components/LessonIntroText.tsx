'use client';

import { useTranslate } from '@/i18n/useTranslate';

interface LessonIntroTextProps {
  text: string;
}

export function LessonIntroText({ text }: LessonIntroTextProps) {
  const translated = useTranslate(text);

  return (
    <div className="mb-8">
      {translated.split('\n\n').map((paragraph, i) => (
        <p key={i} className="text-lg text-gray-600 leading-relaxed mb-4">
          {paragraph}
        </p>
      ))}
    </div>
  );
}

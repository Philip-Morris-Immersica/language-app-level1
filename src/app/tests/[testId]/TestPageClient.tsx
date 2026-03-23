'use client';

import { ClipboardCheck } from 'lucide-react';
import { ExerciseRenderer } from '@/components/exercises/ExerciseRenderer';
import { LessonExercisesProvider } from '@/components/LessonExercisesProvider';
import { useTranslate } from '@/i18n/useTranslate';
import { useT } from '@/i18n/useT';
import type { TestData } from '@/content/types';
import { TestScoreSummary } from '@/components/TestScoreSummary';

function TranslatedText({ text }: { text: string }) {
  const translated = useTranslate(text);
  return <>{translated}</>;
}

interface TestPageClientProps {
  testData: TestData;
  testId: string;
}

export function TestPageClient({ testData, testId }: TestPageClientProps) {
  const t = useT();

  return (
    <div className="space-y-8">
      {/* Test header */}
      <div className="py-2">
        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
          <ClipboardCheck className="w-4 h-4" />
          <TranslatedText text={`Максимум: ${testData.totalPoints} точки`} />
        </div>
        <h1 className="text-3xl font-bold text-[#0279C3]">
          <TranslatedText text={testData.title} />
        </h1>
        {testData.introText && (
          <p className="mt-3 text-gray-600 text-base leading-relaxed">
            <TranslatedText text={testData.introText} />
          </p>
        )}
      </div>

      <LessonExercisesProvider lessonId={testId}>
        {testData.sections.map((section) => (
          <div key={section.id} className="space-y-8">
            {/* Section header */}
            <div className="flex items-center gap-3 pt-4">
              <div className="h-px flex-1 bg-gray-200" />
              <h2 className="text-lg font-bold text-gray-700 whitespace-nowrap">
                <TranslatedText text={section.name} />
                {section.maxPoints > 0 && (
                  <span className="text-sm font-normal text-gray-400 ms-2">
                    ({section.maxPoints} {t('exercise.prefix') === 'EXERCISE' ? 'pts' : 'т.'})
                  </span>
                )}
              </h2>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            {/* Section exercises */}
            {section.exercises.map((exercise: any, index: number) => (
              <ExerciseRenderer
                key={exercise.id}
                exercise={exercise}
                exerciseNumber={index + 1}
              />
            ))}
          </div>
        ))}

        {/* Scoring summary */}
        <TestScoreSummary testData={testData} />
      </LessonExercisesProvider>

      {/* Back link */}
      <div className="border-t border-gray-100 pt-6">
        <a
          href="/lessons/lesson-01"
          className="inline-flex items-center gap-2 text-sm text-[#8FC412] font-medium hover:underline"
        >
          ← <TranslatedText text="Обратно към уроците" />
        </a>
      </div>
    </div>
  );
}

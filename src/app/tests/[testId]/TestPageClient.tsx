'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, ClipboardCheck } from 'lucide-react';
import { ExerciseRenderer } from '@/components/exercises/ExerciseRenderer';
import { LessonExercisesProvider } from '@/components/LessonExercisesProvider';
import { useTranslate } from '@/i18n/useTranslate';
import { useT } from '@/i18n/useT';
import type { TestData } from '@/content/types';
import { TestScoreSummary } from '@/components/TestScoreSummary';
import { getNextLessonAfterTest } from '@/content';

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

      {/* Navigation buttons */}
      <div className="border-t border-gray-100 pt-6">
        <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
          <Link
            href="/level/a1"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <TranslatedText text="Към нивo A1" />
          </Link>

          {(() => {
            const next = getNextLessonAfterTest(testId);
            if (!next) return null;
            return (
              <Link
                href={`/lessons/${next.id}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-[#0279C3] text-white hover:bg-[#026aa8] shadow-sm transition-all"
              >
                <TranslatedText text={`Урок ${next.number}: ${next.title}`} />
                <ArrowRight className="w-4 h-4" />
              </Link>
            );
          })()}
        </div>
      </div>
    </div>
  );
}

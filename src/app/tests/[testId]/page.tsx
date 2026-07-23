import { notFound } from 'next/navigation';
import { ClipboardCheck } from 'lucide-react';
import { LessonLayout } from '@/components/layout/LessonLayout';
import { loadTest, getTestLevel, type Level } from '@/content';
import { isLevelEnabled } from '@/lib/enabledLevels';
import { TestPageClient } from './TestPageClient';

interface TestPageProps {
  params: Promise<{ testId: string }>;
}

// UNHCR brand rule: level labels stay Latin in every UI language.
const LATIN_LABEL: Record<Level, string> = {
  a1: 'A1',
  a2: 'A2',
  b1: 'B1',
  b2: 'B2',
};

/**
 * Parses a test id like `test-a1-3` or `test-b2-1` and returns the level
 * label + the test number, so the placeholder screen can display the same
 * convention for every level (e.g. "Тест A2.4").
 */
function describeTest(testId: string): { label: string; backHref: string } {
  const level = getTestLevel(testId);
  const match = testId.match(/^test-[a-z0-9]+-(\d+)$/);
  const number = match?.[1] ?? '?';
  if (level) {
    return {
      label: `${LATIN_LABEL[level]}.${number}`,
      backHref: `/level/${level}`,
    };
  }
  return { label: number, backHref: '/' };
}

export default async function TestPage({ params }: TestPageProps) {
  const { testId } = await params;

  // Level gating — tests from a disabled level are not publicly reachable.
  const testLevel = getTestLevel(testId);
  if (testLevel && !isLevelEnabled(testLevel)) {
    notFound();
  }

  const testData = await loadTest(testId);

  if (!testData) {
    const { label, backHref } = describeTest(testId);
    return (
      <LessonLayout>
        <div className="min-h-[60vh] flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-2xl bg-blue-100 flex items-center justify-center">
                <ClipboardCheck className="w-10 h-10 text-blue-400" />
              </div>
            </div>
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-600 text-sm font-semibold px-4 py-1.5 rounded-full">
              Тест {label}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Съдържанието се подготвя</h1>
              <p className="mt-2 text-gray-500 text-sm leading-relaxed">
                Тестът все още не е наличен. Работим по него — скоро ще бъде готов.
              </p>
            </div>
            <div className="border-t border-gray-100" />
            <a
              href={backHref}
              className="inline-flex items-center gap-2 text-sm text-[#32C189] font-medium hover:underline"
            >
              ← Назад към нивото
            </a>
          </div>
        </div>
      </LessonLayout>
    );
  }

  return (
    <LessonLayout>
      <TestPageClient testData={testData} testId={testId} />
    </LessonLayout>
  );
}

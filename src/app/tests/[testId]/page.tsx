import { ClipboardCheck } from 'lucide-react';
import { LessonLayout } from '@/components/layout/LessonLayout';
import { getTestFolder } from '@/content';
import type { TestData } from '@/content/types';
import { TestPageClient } from './TestPageClient';

interface TestPageProps {
  params: Promise<{ testId: string }>;
}

async function getTestData(testId: string): Promise<TestData | null> {
  const folder = getTestFolder(testId);
  if (!folder) return null;
  try {
    const mod = await import(`@/content/tests/${folder}`);
    return mod.default || mod.testData;
  } catch {
    return null;
  }
}

export default async function TestPage({ params }: TestPageProps) {
  const { testId } = await params;
  const testData = await getTestData(testId);

  if (!testData) {
    const parts = testId.replace('test-a1-', '');
    const label = `А1.${parts}`;
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
              href="/lessons/lesson-01"
              className="inline-flex items-center gap-2 text-sm text-[#32C189] font-medium hover:underline"
            >
              ← Обратно към уроците
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

import { BookOpen } from 'lucide-react';
import { LessonLayout } from '@/components/layout/LessonLayout';

export default function AzboukaPage() {
  return (
    <LessonLayout>
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-6">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-2xl bg-[#EEF7C8] flex items-center justify-center">
              <BookOpen className="w-10 h-10 text-[#8FC412]" />
            </div>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#EEF7C8] border border-[#8FC412] text-[#5a7a00] text-sm font-semibold px-4 py-1.5 rounded-full">
            Азбука
          </div>

          {/* Title */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Съдържанието се подготвя</h1>
            <p className="mt-2 text-gray-500 text-sm leading-relaxed">
              Разделът за азбуката все още не е наличен. Работим по него — скоро ще бъде готов.
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100" />

          {/* Back link */}
          <a
            href="/lessons/lesson-01"
            className="inline-flex items-center gap-2 text-sm text-[#8FC412] font-medium hover:underline"
          >
            ← Обратно към уроците
          </a>
        </div>
      </div>
    </LessonLayout>
  );
}

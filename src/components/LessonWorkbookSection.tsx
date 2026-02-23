'use client';

import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useT } from '@/i18n/useT';

interface LessonWorkbookSectionProps {
  lessonId: string;
  count: number;
}

export function LessonWorkbookSection({ lessonId, count }: LessonWorkbookSectionProps) {
  const t = useT();

  const desc = t('lesson.workbookDesc').replace('{n}', String(count));

  return (
    <div className="py-8 text-center border-t border-gray-100">
      <h3 className="text-2xl font-bold text-bolt-blue mb-3">
        {t('lesson.workbook')}
      </h3>
      <p className="text-lg text-gray-600 mb-6">{desc}</p>
      <Link href={`/lessons/${lessonId}/exercises`}>
        <Button className="bg-[#8FC412] hover:bg-[#7DAD0E] text-base font-semibold px-8 py-6 min-h-[52px] active:scale-95 transition-transform">
          <BookOpen className="w-5 h-5 mr-2" />
          {t('lesson.openWorkbook')}
        </Button>
      </Link>
    </div>
  );
}

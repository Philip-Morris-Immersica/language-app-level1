'use client';

import { BookOpen } from 'lucide-react';
import { useT } from '@/i18n/useT';

export function ReviewSectionDivider() {
  const t = useT();

  return (
    <div className="relative py-10">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t-2 border-dashed border-[#32C189]/40" />
      </div>
      <div className="relative flex flex-col items-center gap-2">
        <div className="bg-white px-6 py-3 rounded-full border-2 border-[#32C189] shadow-md flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-[#32C189]" />
          <span className="text-xl font-bold text-[#1F5741] tracking-wide">
            {t('lesson.review')}
          </span>
          <BookOpen className="w-6 h-6 text-[#32C189]" />
        </div>
        <p className="text-sm text-gray-500 bg-white px-4">
          {t('lesson.reviewDesc')}
        </p>
      </div>
    </div>
  );
}

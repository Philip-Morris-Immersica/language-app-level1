'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { LessonMetadata } from '@/content/types';

interface LessonNavProps {
  prevLesson?: LessonMetadata;
  nextLesson?: LessonMetadata;
  testAvailable?: boolean;
  testId?: string;
}

export function LessonNav({ prevLesson, nextLesson, testAvailable, testId }: LessonNavProps) {
  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        {/* Previous lesson button */}
        <div className="w-full sm:w-auto">
          {prevLesson ? (
            <Link href={`/lessons/${prevLesson.id}`}>
              <Button variant="outline" className="w-full sm:w-auto">
                <ChevronLeft className="w-4 h-4 mr-2" />
                {prevLesson.number}. {prevLesson.title}
              </Button>
            </Link>
          ) : (
            <div className="w-full sm:w-auto" />
          )}
        </div>

        {/* Test button (if available) */}
        {testAvailable && testId && (
          <div className="w-full sm:w-auto">
            <Link href={`/tests/${testId}`}>
              <Button className="w-full sm:w-auto bg-bolt-primary hover:bg-bolt-primary-hover">
                Направи тест
              </Button>
            </Link>
          </div>
        )}

        {/* Next lesson button */}
        <div className="w-full sm:w-auto">
          {nextLesson ? (
            <Link href={`/lessons/${nextLesson.id}`}>
              <Button variant="outline" className="w-full sm:w-auto">
                {nextLesson.number}. {nextLesson.title}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          ) : (
            <div className="w-full sm:w-auto" />
          )}
        </div>
      </div>
    </div>
  );
}

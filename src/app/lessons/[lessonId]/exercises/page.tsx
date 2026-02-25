import { notFound } from 'next/navigation';
import Link from 'next/link';
import { LessonLayout } from '@/components/layout/LessonLayout';
import { Button } from '@/components/ui/button';
import { ExerciseRenderer } from '@/components/exercises/ExerciseRenderer';
import { getLessonMetadata } from '@/content';
import { ChevronLeft } from 'lucide-react';
import { T } from '@/components/T';
import { TranslatedText } from '@/components/TranslatedText';

interface ExercisesPageProps {
  params: Promise<{
    lessonId: string;
  }>;
}

async function getLessonData(lessonId: string) {
  try {
    const lesson = await import(`@/content/lessons/${lessonId}`);
    return lesson.default || lesson.lessonData;
  } catch {
    return null;
  }
}

export default async function ExercisesPage({ params }: ExercisesPageProps) {
  const { lessonId } = await params;
  const metadata = getLessonMetadata(lessonId);

  if (!metadata) {
    notFound();
  }

  const lessonData = await getLessonData(lessonId);

  if (!lessonData || !lessonData.workbookExercises || lessonData.workbookExercises.length === 0) {
    return (
      <LessonLayout>
        <div className="space-y-6">
          <Link href={`/lessons/${lessonId}`}>
            <Button variant="outline">
              <ChevronLeft className="w-4 h-4 mr-2" />
              <T k="lesson.backToLesson" />
            </Button>
          </Link>
          <div className="py-6">
            <h1 className="text-2xl font-bold text-bolt-blue mb-3">
              Работна тетрадка — Урок {metadata.number}
            </h1>
            <p className="text-gray-600">
              Упражненията от работната тетрадка все още се подготвят.
            </p>
          </div>
        </div>
      </LessonLayout>
    );
  }

  return (
    <LessonLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Link href={`/lessons/${lessonId}`}>
            <Button variant="outline">
              <ChevronLeft className="w-4 h-4 mr-2" />
              <T k="lesson.backToLesson" />
            </Button>
          </Link>
          <span className="text-sm font-medium text-bolt-blue">
            {lessonData.workbookExercises.length} <T k="lesson.exercises" />
          </span>
        </div>

        <div className="py-4">
          <h1 className="text-2xl md:text-3xl font-bold text-bolt-blue mb-2">
            <T k="lesson.workbook" />: <TranslatedText text={metadata.title} />
          </h1>
        </div>

        {/* Workbook exercises */}
        <div className="space-y-6">
          {lessonData.workbookExercises.map((exercise: any) => (
            <ExerciseRenderer key={exercise.id} exercise={exercise} />
          ))}
        </div>

        {/* Back button at bottom */}
        <div className="pt-6 border-t border-gray-200">
          <Link href={`/lessons/${lessonId}`}>
            <Button variant="outline" className="w-full sm:w-auto">
              <ChevronLeft className="w-4 h-4 mr-2" />
              <T k="lesson.backToLesson" />
            </Button>
          </Link>
        </div>
      </div>
    </LessonLayout>
  );
}

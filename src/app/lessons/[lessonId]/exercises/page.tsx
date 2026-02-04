import { notFound } from 'next/navigation';
import Link from 'next/link';
import { LessonLayout } from '@/components/layout/LessonLayout';
import { Button } from '@/components/ui/button';
import { ExerciseRenderer } from '@/components/exercises/ExerciseRenderer';
import { getLessonMetadata } from '@/content';
import { ChevronLeft } from 'lucide-react';

interface ExercisesPageProps {
  params: {
    lessonId: string;
  };
}

async function getLessonData(lessonId: string) {
  try {
    const lesson = await import(`@/content/lessons/${lessonId}`);
    return lesson.default || lesson.lessonData;
  } catch (error) {
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
          <div className="flex items-center gap-4 mb-6">
            <Link href={`/lessons/${lessonId}`}>
              <Button variant="outline">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Назад към урока
              </Button>
            </Link>
          </div>

          <div className="bg-bolt-secondary-light border-2 border-bolt-secondary rounded-lg p-8 text-center">
            <h1 className="text-2xl font-bold text-bolt-primary-dark mb-4">
              Работна тетрадка - Урок {metadata.number}
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
              Назад към урока
            </Button>
          </Link>

          <div className="bg-bolt-secondary-light px-4 py-2 rounded-lg border border-bolt-secondary">
            <span className="text-sm font-medium text-bolt-primary-dark">
              {lessonData.workbookExercises.length} упражнения
            </span>
          </div>
        </div>

        <div className="bg-bolt-secondary-light border-2 border-bolt-secondary rounded-lg p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-bolt-primary-dark mb-2">
            Работна тетрадка: {metadata.title}
          </h1>
          <p className="text-gray-700">
            Упражнения за допълнителна практика към Урок {metadata.number}
          </p>
        </div>

        {/* Workbook exercises */}
        <div className="space-y-6">
          {lessonData.workbookExercises.map((exercise: any, index: number) => (
            <div key={exercise.id} className="relative">
              <div className="absolute -left-2 top-0 w-8 h-8 bg-bolt-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                {index + 1}
              </div>
              <div className="ml-8">
                <ExerciseRenderer exercise={exercise} />
              </div>
            </div>
          ))}
        </div>

        {/* Back button at bottom */}
        <div className="pt-6 border-t border-gray-200">
          <Link href={`/lessons/${lessonId}`}>
            <Button variant="outline" className="w-full sm:w-auto">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Назад към урока
            </Button>
          </Link>
        </div>
      </div>
    </LessonLayout>
  );
}

import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { LessonLayout } from '@/components/layout/LessonLayout';
import { LessonNav } from '@/components/layout/LessonNav';
import { Button } from '@/components/ui/button';
import { ExerciseRenderer } from '@/components/exercises/ExerciseRenderer';
import { getLessonMetadata, getPrevLesson, getNextLesson, hasTestAfterLesson } from '@/content';
import { BookOpen } from 'lucide-react';

interface LessonPageProps {
  params: {
    lessonId: string;
  };
}

// This will be replaced with actual lesson data
async function getLessonData(lessonId: string) {
  try {
    const lesson = await import(`@/content/lessons/${lessonId}`);
    return lesson.default || lesson.lessonData;
  } catch (error) {
    return null;
  }
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { lessonId } = await params;
  const metadata = getLessonMetadata(lessonId);
  
  if (!metadata) {
    notFound();
  }

  const lessonData = await getLessonData(lessonId);
  
  // For now, show placeholder if no data
  if (!lessonData) {
    return (
      <LessonLayout>
        <div className="space-y-6">
          <div className="bg-bolt-secondary-light border-2 border-bolt-secondary rounded-lg p-8 text-center">
            <h1 className="text-3xl font-bold text-bolt-primary-dark mb-4">
              {metadata.number}. {metadata.title}
            </h1>
            <p className="text-gray-600 mb-6">
              Съдържанието на урок {metadata.number} все още се подготвя.
            </p>
            <div className="text-sm text-gray-500">
              ID: {lessonId}
            </div>
          </div>

          <LessonNav
            prevLesson={getPrevLesson(metadata.number)}
            nextLesson={getNextLesson(metadata.number)}
            testAvailable={hasTestAfterLesson(metadata.number)}
            testId={metadata.testId}
          />
        </div>
      </LessonLayout>
    );
  }

  return (
    <LessonLayout>
      <div className="space-y-8">
        {/* Lesson header */}
        <div className="bg-bolt-secondary-light border-2 border-bolt-secondary rounded-xl p-8 shadow-sm">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-bolt-primary-dark mb-3">
              Урок {metadata.number}: {metadata.title}
            </h1>
            {lessonData.description && (
              <p className="text-lg text-gray-700">{lessonData.description}</p>
            )}
          </div>

          {lessonData.grammarTopics && lessonData.grammarTopics.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {lessonData.grammarTopics.map((topic: string, index: number) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-white border-2 border-bolt-secondary rounded-full text-sm font-semibold text-gray-700 shadow-sm"
                >
                  {topic}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Lesson content */}
        {lessonData.content && (
          <div className="bg-white rounded-xl border-2 border-bolt-secondary p-8 md:p-12 shadow-sm">
            <div className="prose prose-lg max-w-none">
              {lessonData.content.introduction && (
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">{lessonData.content.introduction}</p>
              )}
              
              {lessonData.content.sections?.map((section: any, index: number) => (
                <div key={section.id || index} className="mb-10">
                  {section.title && (
                    <h2 className="text-2xl font-bold text-bolt-primary-dark mb-4">
                      {section.title}
                    </h2>
                  )}
                  {section.content && (
                    <div className="text-lg text-gray-700 whitespace-pre-wrap leading-relaxed">{section.content}</div>
                  )}
                  {section.imageUrl && (
                    <Image 
                      src={section.imageUrl} 
                      alt={section.title || 'Lesson image'} 
                      width={800}
                      height={600}
                      className="mt-6 rounded-xl max-w-full h-auto shadow-md"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* In-lesson exercises */}
        {lessonData.exercises && lessonData.exercises.length > 0 && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-bolt-primary-dark">Упражнения</h2>
            {lessonData.exercises.map((exercise: any) => (
              <ExerciseRenderer key={exercise.id} exercise={exercise} />
            ))}
          </div>
        )}

        {/* Link to workbook */}
        {lessonData.workbookExercises && lessonData.workbookExercises.length > 0 && (
          <div className="bg-bolt-secondary-light border-2 border-bolt-secondary rounded-xl p-8 text-center shadow-sm">
            <h3 className="text-2xl font-bold text-bolt-primary-dark mb-4">
              Работна тетрадка
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Има още {lessonData.workbookExercises.length} упражнения в работната тетрадка за допълнителна практика.
            </p>
            <Link href={`/lessons/${lessonId}/exercises`}>
              <Button className="bg-bolt-primary hover:bg-bolt-primary-hover text-base font-semibold px-8 py-6 min-h-[52px] active:scale-95 transition-transform">
                <BookOpen className="w-5 h-5 mr-2" />
                Отвори работната тетрадка
              </Button>
            </Link>
          </div>
        )}

        {/* Navigation */}
        <LessonNav
          prevLesson={getPrevLesson(metadata.number)}
          nextLesson={getNextLesson(metadata.number)}
          testAvailable={hasTestAfterLesson(metadata.number)}
          testId={metadata.testId}
        />
      </div>
    </LessonLayout>
  );
}

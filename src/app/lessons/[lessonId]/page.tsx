import { notFound } from 'next/navigation';
import { LessonLayout } from '@/components/layout/LessonLayout';
import { LessonNav } from '@/components/layout/LessonNav';
import { ExerciseRenderer } from '@/components/exercises/ExerciseRenderer';
import { getLessonMetadata, getPrevLesson, getNextLesson, hasTestAfterLesson } from '@/content';
import { LessonIntroText } from '@/components/LessonIntroText';
import { T } from '@/components/T';
import { LessonHeaderClient } from '@/components/LessonHeaderClient';
import { LessonExercisesProvider } from '@/components/LessonExercisesProvider';
import { ReviewSectionDivider } from '@/components/ReviewSectionDivider';
import { VocabularyDrawer } from '@/components/VocabularyDrawer';
import { CultureSection } from '@/components/CultureSection';
import { GrammarReferenceSection } from '@/components/GrammarReferenceSection';

interface LessonPageProps {
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

export default async function LessonPage({ params }: LessonPageProps) {
  const { lessonId } = await params;
  const metadata = getLessonMetadata(lessonId);

  if (!metadata) {
    notFound();
  }

  const lessonData = await getLessonData(lessonId);

  if (!lessonData) {
    return (
      <LessonLayout>
        <div className="space-y-6">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-bolt-blue mb-4">
              {metadata.number}. {metadata.title}
            </h1>
            <p className="text-gray-600 mb-4">
              Съдържанието на урок {metadata.number} все още се подготвя.
            </p>
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

  const vocabulary = lessonData.content?.vocabulary || [];

  return (
    <LessonLayout>
      <div className="space-y-8">
        {/* Lesson header — translatable client component */}
        <LessonHeaderClient
          lessonId={lessonId}
          number={metadata.number}
          title={metadata.title}
          description={lessonData.description}
          grammarTopics={lessonData.grammarTopics}
        />

        {/* Lesson intro — translatable */}
        {lessonData.content?.introduction && (
          <LessonIntroText text={lessonData.content.introduction} />
        )}

        {/* Culture section — collapsible accordion */}
        {lessonData.content?.culturalNotes && lessonData.content.culturalNotes.length > 0 && (
          <CultureSection notes={lessonData.content.culturalNotes} />
        )}

        <LessonExercisesProvider lessonId={lessonId}>
          {/* In-lesson exercises */}
          {lessonData.exercises && lessonData.exercises.length > 0 && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-bolt-blue">
                <T k="lesson.exercises" />
              </h2>
              {lessonData.exercises.map((exercise: any, index: number) => (
                <ExerciseRenderer key={exercise.id} exercise={exercise} exerciseNumber={index + 1} />
              ))}
            </div>
          )}

          {/* Grammar reference — collapsible, before Преговор */}
          {lessonData.content?.grammarReference && lessonData.content.grammarReference.length > 0 && (
            <GrammarReferenceSection notes={lessonData.content.grammarReference} />
          )}

          {/* Workbook exercises — inline with Преговор divider */}
          {lessonData.workbookExercises && lessonData.workbookExercises.length > 0 && (
            <>
              <ReviewSectionDivider />
              <div className="space-y-8">
                {lessonData.workbookExercises.map((exercise: any, index: number) => (
                  <ExerciseRenderer key={exercise.id} exercise={exercise} exerciseNumber={index + 1} />
                ))}
              </div>
            </>
          )}
        </LessonExercisesProvider>

        {/* Navigation */}
        <LessonNav
          prevLesson={getPrevLesson(metadata.number)}
          nextLesson={getNextLesson(metadata.number)}
          testAvailable={hasTestAfterLesson(metadata.number)}
          testId={metadata.testId}
        />
      </div>

      {/* Floating vocabulary drawer */}
      {vocabulary.length > 0 && (
        <VocabularyDrawer
          vocabulary={vocabulary}
          lessonTitle={`${metadata.number}. ${metadata.title}`}
          lessonId={lessonId}
        />
      )}
    </LessonLayout>
  );
}

import { LessonLayout } from '@/components/layout/LessonLayout';
import { LessonNav } from '@/components/layout/LessonNav';
import { ExerciseRenderer } from '@/components/exercises/ExerciseRenderer';
import { getNextLesson } from '@/content';
import { LessonIntroText } from '@/components/LessonIntroText';
import { T } from '@/components/T';
import { LessonHeaderClient } from '@/components/LessonHeaderClient';
import { LessonExercisesProvider } from '@/components/LessonExercisesProvider';
import { VocabularyDrawer } from '@/components/VocabularyDrawer';
import { CultureSection } from '@/components/CultureSection';
import { GrammarReferenceSection } from '@/components/GrammarReferenceSection';
import { lessonData } from '@/content/lessons/lesson-00';

export default function AzboukaPage() {
  const vocabulary = lessonData.content?.vocabulary || [];

  return (
    <LessonLayout>
      <div className="space-y-8">
        <LessonHeaderClient
          lessonId="lesson-00"
          number={lessonData.number}
          title={lessonData.title}
          description={lessonData.description}
          grammarTopics={lessonData.grammarTopics}
        />

        {lessonData.content?.introduction && (
          <LessonIntroText text={lessonData.content.introduction} />
        )}

        {lessonData.content?.culturalNotes && lessonData.content.culturalNotes.length > 0 && (
          <CultureSection notes={lessonData.content.culturalNotes} />
        )}

        <LessonExercisesProvider lessonId="lesson-00">
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

          {lessonData.content?.grammarReference && lessonData.content.grammarReference.length > 0 && (
            <GrammarReferenceSection notes={lessonData.content.grammarReference} />
          )}
        </LessonExercisesProvider>

        <LessonNav
          prevLesson={undefined}
          nextLesson={getNextLesson(0)}
          testAvailable={false}
        />
      </div>

      {vocabulary.length > 0 && (
        <VocabularyDrawer
          vocabulary={vocabulary}
          lessonTitle={`${lessonData.number}. ${lessonData.title}`}
          lessonId="lesson-00"
        />
      )}
    </LessonLayout>
  );
}

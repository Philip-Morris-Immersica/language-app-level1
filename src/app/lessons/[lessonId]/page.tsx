import { type ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { LessonLayout } from '@/components/layout/LessonLayout';
import { LessonNav } from '@/components/layout/LessonNav';
import { ExerciseRenderer } from '@/components/exercises/ExerciseRenderer';
import { getLessonMetadata, getPrevLesson, getNextLesson, hasTestAfterLesson, loadLesson } from '@/content';
import { LessonIntroText } from '@/components/LessonIntroText';
import { T } from '@/components/T';
import { LessonHeaderClient } from '@/components/LessonHeaderClient';
import { LessonExercisesProvider } from '@/components/LessonExercisesProvider';
import { buildCelebrationPlan } from '@/lib/celebration';
import { ReviewSectionDivider } from '@/components/ReviewSectionDivider';
import { LessonParts } from '@/components/LessonParts';
import { VocabularyDrawer } from '@/components/VocabularyDrawer';
import { CultureSection } from '@/components/CultureSection';
import { GrammarReferenceSection } from '@/components/GrammarReferenceSection';

interface LessonPageProps {
  params: Promise<{
    lessonId: string;
  }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { lessonId } = await params;
  const metadata = getLessonMetadata(lessonId);

  if (!metadata) {
    notFound();
  }

  const lessonData = await loadLesson(lessonId);

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
            prevLesson={getPrevLesson(lessonId)}
            nextLesson={getNextLesson(lessonId)}
            testAvailable={hasTestAfterLesson(lessonId)}
            testId={metadata.testId}
          />
        </div>
      </LessonLayout>
    );
  }

  const vocabulary = lessonData.content?.vocabulary || [];
  const hasGrammarReference = !!(lessonData.content?.grammarReference && lessonData.content.grammarReference.length > 0);
  const celebrationPlan = buildCelebrationPlan(lessonData, lessonId);

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

        {/* Grammar reference (TOP) — same accordion as the bottom one, shown BEFORE exercises
            so learners can read the rules before practising. */}
        {hasGrammarReference && (
          <GrammarReferenceSection notes={lessonData.content!.grammarReference!} />
        )}

        <LessonExercisesProvider lessonId={lessonId} celebrationPlan={celebrationPlan}>
          {/* In-lesson exercises */}
          {lessonData.exercises && lessonData.exercises.length > 0 && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-bolt-blue">
                <T k="lesson.exercises" />
              </h2>
              {(() => {
                let displayNumber = 0;
                const renderNode = (exercise: any) => {
                  // Continuation parts of a split exercise (title === '' or hideHeader: true)
                  // render no header, so they must NOT consume a visible number — otherwise
                  // the sequence skips digits (… 9 → 11 → 13 …).
                  const showsHeader = exercise.title !== '' && exercise.hideHeader !== true;
                  if (showsHeader) displayNumber += 1;
                  return (
                    <ExerciseRenderer key={exercise.id} exercise={exercise} exerciseNumber={displayNumber} />
                  );
                };

                const exercises = lessonData.exercises as any[];
                const hasSections = exercises.some((e) => e.sectionStart);

                // Lessons without section markers render flat, exactly as before.
                if (!hasSections) {
                  return exercises.map((exercise) => renderNode(exercise));
                }

                // Group exercises into collapsible "parts", splitting at each
                // sectionStart. Anything before the first marker is "leading" and
                // renders plainly above the parts.
                const leading: ReactNode[] = [];
                const parts: {
                  title: string;
                  subtitle?: string;
                  titleI18n?: Record<string, string>;
                  subtitleI18n?: Record<string, string>;
                  theme?: string;
                  exerciseIds: string[];
                  nodes: ReactNode[];
                }[] = [];

                for (const exercise of exercises) {
                  if (exercise.sectionStart) {
                    parts.push({
                      title: exercise.sectionStart.title,
                      subtitle: exercise.sectionStart.subtitle,
                      titleI18n: exercise.sectionStart.titleI18n,
                      subtitleI18n: exercise.sectionStart.subtitleI18n,
                      theme: exercise.sectionStart.theme,
                      exerciseIds: [],
                      nodes: [],
                    });
                  }
                  const node = renderNode(exercise);
                  if (parts.length === 0) {
                    leading.push(node);
                  } else {
                    const current = parts[parts.length - 1];
                    current.nodes.push(node);
                    current.exerciseIds.push(exercise.id);
                  }
                }

                return (
                  <LessonParts
                    leading={leading.length > 0 ? <div className="space-y-8">{leading}</div> : null}
                    parts={parts.map((p) => ({
                      title: p.title,
                      subtitle: p.subtitle,
                      titleI18n: p.titleI18n,
                      subtitleI18n: p.subtitleI18n,
                      theme: p.theme,
                      exerciseIds: p.exerciseIds,
                      children: <div className="space-y-8">{p.nodes}</div>,
                    }))}
                  />
                );
              })()}
            </div>
          )}

          {/* Grammar reference (BOTTOM) — same accordion as the top one, shown AFTER exercises
              for end-of-lesson review. Visually identical to the top instance. */}
          {hasGrammarReference && (
            <GrammarReferenceSection notes={lessonData.content!.grammarReference!} />
          )}

          {/* Workbook exercises — inline with Преговор divider */}
          {lessonData.workbookExercises && lessonData.workbookExercises.length > 0 && (
            <>
              <ReviewSectionDivider />
              <div className="space-y-8">
                {(() => {
                  let displayNumber = 0;
                  return lessonData.workbookExercises.map((exercise: any) => {
                    const showsHeader = exercise.title !== '' && exercise.hideHeader !== true;
                    if (showsHeader) displayNumber += 1;
                    return <ExerciseRenderer key={exercise.id} exercise={exercise} exerciseNumber={displayNumber} />;
                  });
                })()}
              </div>
            </>
          )}
        </LessonExercisesProvider>

        {/* Navigation */}
        <LessonNav
          prevLesson={getPrevLesson(lessonId)}
          nextLesson={getNextLesson(lessonId)}
          testAvailable={hasTestAfterLesson(lessonId)}
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

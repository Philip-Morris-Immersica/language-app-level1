import { loadLesson, getLessonLevel } from '@/content/registry';

export interface LessonChatContext {
  lessonId: string;
  lessonTitle: string;
  level: string;
  grammarTopics: string[];
  vocabularyWords: string[];
}

export async function getLessonChatContext(lessonId: string): Promise<LessonChatContext | null> {
  const [lessonData, level] = await Promise.all([
    loadLesson(lessonId),
    Promise.resolve(getLessonLevel(lessonId)),
  ]);

  if (!lessonData || !level) return null;

  const grammarTopics = lessonData.grammarTopics ?? [];
  const vocabularyWords = lessonData.vocabulary ?? [];

  return {
    lessonId,
    lessonTitle: lessonData.title,
    level,
    grammarTopics,
    vocabularyWords: vocabularyWords.slice(0, 30),
  };
}

import type { ChatMessage } from './llmClient';
import type { LessonChatContext } from './contentLoader';

const LANG_NAMES: Record<string, string> = {
  bg: 'Bulgarian',
  ar: 'Arabic',
  en: 'English',
  fr: 'French',
  fa: 'Persian (Farsi)',
  uk: 'Ukrainian',
  ru: 'Russian',
};

const BASE_PROMPT_V1 = `You are Robi — an AI language teacher helping refugees learn Bulgarian at the UNHCR language platform in Bulgaria.
You help with grammar, new vocabulary, and exercises from the platform.

RULES:
- Always respond in the user's language ({USER_LANGUAGE}), but keep all Bulgarian words and examples in Bulgarian Cyrillic script.
- Adapt explanation complexity to CEFR level {LEVEL} (A1 = very simple, short sentences; B2 = more advanced).
- NEVER ask for personal information (names, addresses, documents, phone numbers).
- If the user shares personal data, do not store or repeat it.
- When explaining grammar, give simple examples from the current lesson if possible.
- If a question is unrelated to the Bulgarian language (politics, medicine, personal advice), politely redirect to language learning.
- Be encouraging, patient, and supportive — many users are in a difficult life situation.
- Keep answers concise — maximum 3-4 short paragraphs. Use bullet points for lists.
- You CAN see which page the user is currently on and which lesson they are studying. Use this context proactively.`;

export function buildSystemPrompt({
  basePrompt,
  levelPrompt,
  lessonContext,
  userLanguage,
  level,
  completedLessons,
  currentPage,
}: {
  basePrompt?: string;
  levelPrompt?: string;
  lessonContext?: LessonChatContext | null;
  userLanguage: string;
  level?: string;
  completedLessons?: string[];
  currentPage?: string | null;
}): string {
  const langName = LANG_NAMES[userLanguage] ?? userLanguage;
  const levelLabel = level?.toUpperCase() ?? 'A1';

  let system = (basePrompt ?? BASE_PROMPT_V1)
    .replace('{USER_LANGUAGE}', langName)
    .replace('{LEVEL}', levelLabel);

  if (levelPrompt) {
    system += `\n\nLEVEL-SPECIFIC INSTRUCTIONS (${levelLabel}):\n${levelPrompt}`;
  }

  // Current page context — always include so bot knows where user is
  if (currentPage) {
    system += `\n\nCURRENT PAGE: The user is currently on the ${currentPage}.`;
  }

  if (lessonContext) {
    system += `\n\nCURRENT LESSON:
Title: ${lessonContext.lessonTitle} (${lessonContext.level.toUpperCase()})`;
    if (lessonContext.grammarTopics.length > 0) {
      system += `\nGrammar topics covered: ${lessonContext.grammarTopics.join(', ')}`;
    }
    if (lessonContext.vocabularyWords.length > 0) {
      system += `\nKey vocabulary themes: ${lessonContext.vocabularyWords.join(', ')}`;
    }
    system += `\nYou can refer directly to this lesson's content when answering questions. If the user asks "what are we studying?" or "where am I?", tell them they are on lesson: ${lessonContext.lessonTitle}.`;
  } else if (currentPage && currentPage.includes('lesson')) {
    system += ` This appears to be a lesson page. Ask the user what they need help with in this lesson.`;
  }

  system += `\n\nUSER PROFILE:\nResponse language: ${langName}`;

  if (completedLessons && completedLessons.length > 0) {
    system += `\nCompleted lessons: ${completedLessons.join(', ')}`;
  } else {
    system += `\nThis user has not completed any lessons yet (or is just starting).`;
  }

  return system;
}

export function buildMessages(
  systemPrompt: string,
  history: Array<{ role: string; content: string }>,
  userMessage: string,
): ChatMessage[] {
  const messages: ChatMessage[] = [
    { role: 'system', content: systemPrompt },
    ...history.slice(-10).map((m) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    })),
    { role: 'user', content: userMessage },
  ];
  return messages;
}

import type { ChatMessage } from './llmClient';
import type { ChatPageContext } from './contentLoader';
import type { LessonProgressSummary } from './progressAnalyzer';

const LANG_NAMES: Record<string, string> = {
  bg: 'Bulgarian',
  ar: 'Arabic',
  en: 'English',
  fr: 'French',
  fa: 'Persian (Farsi)',
  uk: 'Ukrainian',
  ru: 'Russian',
};

/* ────────────────────────────────────────────────────────────────────────
 * CAPABILITIES — hardcoded, ALWAYS included (cannot be edited from admin).
 *
 * Purpose: tell the model WHAT data + UI knowledge it has, and that it is
 * PERMITTED to use that information. Pure "access layer" — no behavior or
 * pedagogy here. Behavior lives in BASE_PROMPT_V1 below (admin-editable).
 * ────────────────────────────────────────────────────────────────────────
 */
const CAPABILITIES_BLOCK = `You are Robi — an AI language teacher inside the UNHCR Bulgarian language platform.

DATA YOU HAVE ACCESS TO (provided automatically each turn):
- CURRENT PAGE — the page the user is viewing right now.
- CURRENT LESSON — title, grammar topics, vocabulary themes, AND the full list of exercises with their correct answers.
- USER PROGRESS — which lessons the user has touched, AND for the current lesson: which exercises they've submitted, which they got wrong, and what they actually wrote.

You are PERMITTED to use all of this data. When the user asks "where am I?", "what's the answer to exercise N?", or "what did I get wrong?", look at the data below and answer based on it — do not pretend you cannot see it.`;

/* ────────────────────────────────────────────────────────────────────────
 * PLATFORM_KNOWLEDGE — hardcoded, ALWAYS included (cannot be edited).
 *
 * A complete map of the UI so Robi can answer "how do I…?", "where is…?",
 * and "what does X button do?" questions. If the UI changes, update this
 * block to stay in sync. ~400 tokens.
 * ────────────────────────────────────────────────────────────────────────
 */
const PLATFORM_KNOWLEDGE = `PLATFORM MAP (what the user sees on screen — answer "where is X" or "how do I X" questions using this):

HEADER (green bar at the top, always visible):
- LEFT: UNHCR logo + home icon — clicking either goes to the home page.
- RIGHT: language selector dropdown (7 languages: Bulgarian, Arabic, English, French, Persian/Farsi, Ukrainian, Russian — Arabic & Persian are right-to-left), then the user's profile menu with avatar (login / logout / "My profile" / "Admin" for admins).
- The mobile menu (hamburger ☰) appears on small screens; tap to open the lessons sidebar.

SIDEBAR (left side, on lesson pages):
- Lists all lessons of the current level (e.g. A1: lessons 0–11).
- Each entry shows a progress percentage ring (green when done).
- Tests (yellow icon) appear between lessons (e.g. test-a1-1 after lesson-03).
- On mobile, the sidebar slides in from the left via the hamburger menu.

HOME PAGE (after login):
- "Welcome, [Name]!" heading in UNHCR blue.
- Four big blue level cards: A1, A2, B1, B2 (Latin letters, not Cyrillic).
- Below the cards: a "Platform guide / Legend" with realistic mini-previews of every interactive element (audio, listen, dictionary, chatbot, grammar accordion, culture accordion, reset button).

LESSON PAGE (each lesson):
- Top: lesson title + description + grammar topic chips.
- Cultural notes accordion (gold border, 🇧🇬 icon) — usually shown near the top.
- Grammar reference accordion (indigo gradient, 📚 icon, "Граматика — справочник") — appears TWICE: once at the top before exercises, once at the bottom after exercises. Click the ChevronDown to expand.
- Exercises in PDF order (НОВИ ДУМИ vocabulary cards, ГРАМАТИКА tables, ДИАЛОЗИ dialogues, then practice exercises).
- "Преговор" section at the very bottom — review/workbook exercises.

INTERACTIVE ELEMENTS:
- 🔊 small grey speaker icon — next to individual words/dialogue lines. Click to hear that single word/line.
- "Слушай" / "Стоп" green pill button — above long texts and dialogue sections. Plays the WHOLE text/section in sequence. Click again to stop.
- DICTIONARY: round blue circular floating button in the BOTTOM-LEFT corner, with a red ring and a 📖 book icon. Tap it to open the lesson's vocabulary drawer (list of new words with translations). Available on lessons that have vocabulary.
- CHATBOT (Robi — that's me): round avatar in the BOTTOM-RIGHT corner with a red ring. Tap to open this chat panel.
- "Провери" / "Провери отговорите" green button — checks the exercise answers. Wrong answers turn red.
- "Нулирай" outline button — resets the exercise (clears all answers, lets the user start over). Always visible next to the check button.
- LANGUAGE: change via the dropdown in the header (top-right). The whole UI re-renders in the chosen language. Bulgarian exercise content stays in Bulgarian — only the surrounding UI translates.

TESTS:
- Yellow cards in the sidebar between lessons.
- A test ID looks like "test-a1-1" (A1 has 6 tests in total).
- Tests have 4 sections: Listening (with audio), Reading (text + questions), Grammar (fill-in / multiple choice), Writing.
- After finishing, the user sees a TestScoreSummary with the score per section and overall.

PROGRESS:
- Each exercise saves automatically (debounced) when the user types/clicks. The user can leave and come back; their answers and validation state are restored.
- Lesson sidebar ring fills as the user attempts more exercises.

LEVELS:
- A1 (beginner — 11 lessons + 6 tests) — currently the main content.
- A2, B1, B2 — skeleton structure, mostly placeholder content.

If the user asks where a specific UI element is, describe its position using the map above (e.g. "bottom-left", "top of the lesson page", "in the green header"). If a feature is not yet implemented (e.g. A2 lessons not done), say so honestly.`;

/* ────────────────────────────────────────────────────────────────────────
 * BASE_PROMPT_V1 — default behavior prompt. Admin can OVERRIDE the whole
 * thing from /admin/prompts → "Base" scope. The CAPABILITIES + PLATFORM
 * blocks above are always prepended regardless of what admin writes.
 *
 * Sections are clearly named so you can edit one part without breaking
 * others. Use the same `# SECTION NAME` style if you rewrite from scratch.
 * ────────────────────────────────────────────────────────────────────────
 */
const BASE_PROMPT_V1 = `# ROLE
You are Robi, a friendly AI Bulgarian-language tutor on a free platform for refugees in Bulgaria built by UNHCR. Your job is to help the user learn Bulgarian — grammar, vocabulary, pronunciation, exercises — and to help them navigate the platform.

# TONE & STYLE
- Warm, encouraging, patient. Many users are in a difficult life situation — treat them with kindness.
- Conversational and dialogic: ask short clarifying questions instead of dumping a wall of text.
- Concise: max 3–4 short paragraphs per reply. Use bullet points for lists.
- Use simple sentences when the user is at A1; add nuance for higher levels.
- Adapt complexity to CEFR level {LEVEL} (A1 = very simple, short sentences; B2 = more advanced).
- Use light praise when the user gets things right ("Браво!", "Точно!"), gently encourage when wrong.

# LANGUAGE RULES
- Always respond in the user's chosen language ({USER_LANGUAGE}).
- Bulgarian words, examples and exercise content STAY in Bulgarian Cyrillic — never transliterate.
- When introducing a new Bulgarian word, write it once in Cyrillic with a {USER_LANGUAGE} translation in parentheses on first mention.
- For RTL languages (Arabic, Persian) write normally — the UI handles direction.

# BOUNDARIES
- NEVER ask for personal information (full name, address, documents, phone, email, ID numbers).
- If the user shares personal data, do not store, repeat, or reference it; gently steer back to language learning.
- Refuse and politely redirect when asked about: politics, religion, medical advice, legal advice, asylum-process specifics, financial advice. Reply with something like: "I can only help with Bulgarian language learning. For that question please contact UNHCR or the proper service."
- Do not invent rules. If you don't know a Bulgarian grammar fact, say so and suggest looking at the lesson's "Граматика — справочник" accordion.
- Never claim to be a human; you are an AI assistant.

# PEDAGOGICAL APPROACH (when the user asks about exercises)
- Do not dump the correct answer immediately. Teach in steps.
- Step 1: confirm which exercise and which question/blank the user means.
- Step 2: explain the relevant rule from this lesson (grammar topic / new vocabulary), with one short Bulgarian example.
- Step 3: give a hint that nudges the user toward the answer.
- Step 4: if the user still asks after step 3, give the correct answer in Bulgarian Cyrillic plus a one-sentence justification.
- If USER PROGRESS shows the user already submitted wrong answers in this lesson, you MAY proactively mention it. Example: "I see you wrote 'ам' in exercise 5 — the correct form is 'съм'. Want me to explain the verb 'съм'?"
- For not-yet-attempted exercises, encourage the user to try first before asking.

# TEST POLICY
- A test is any item whose ID starts with "test-" (e.g. test-a1-1) or any page under /tests/.
- Do NOT reveal answers to test questions even on direct request — the test is a measurement, not a learning exercise.
- You MAY: explain the grammar rule, give example sentences (not the same ones in the test), encourage and explain what the test is checking, suggest which lesson to revise.
- You may NOT: confirm whether a specific answer the user wrote is right or wrong, translate the test questions into a hint that gives away the answer, or list what's on the test.
- If asked "is my answer right?" on a test, reply: "I can't grade test answers, but I can review the underlying rule with you. Which grammar topic is the question about?"

# DIALOG STYLE
- Default to a back-and-forth conversation, not a monologue.
- When uncertain what the user wants, ask one specific question instead of guessing.
- Mirror the user's energy: short message → short reply; detailed question → structured reply.
- End replies with an inviting next step ("Want me to show another example?", "Should we go to exercise 6?").`;

interface BuildSystemPromptArgs {
  basePrompt?: string;
  levelPrompt?: string;
  /** Page-specific context — either lesson or test, discriminated by `kind`. */
  pageContext?: ChatPageContext | null;
  userLanguage: string;
  level?: string;
  completedLessons?: string[];
  currentPage?: string | null;
  pageProgress?: LessonProgressSummary | null;
  /** The exercise the user is looking at right now (from the on-screen
   *  IntersectionObserver). `number` is the on-screen number; `id` disambiguates
   *  which section it belongs to when numbers repeat (lesson vs Преговор). */
  currentExercise?: { number: number; id: string } | null;
}

export function buildSystemPrompt({
  basePrompt,
  levelPrompt,
  pageContext,
  userLanguage,
  level,
  completedLessons,
  currentPage,
  pageProgress,
  currentExercise,
}: BuildSystemPromptArgs): string {
  const langName = LANG_NAMES[userLanguage] ?? userLanguage;
  const levelLabel = level?.toUpperCase() ?? 'A1';

  const behavior = (basePrompt ?? BASE_PROMPT_V1)
    .replace('{USER_LANGUAGE}', langName)
    .replace('{LEVEL}', levelLabel);

  let system = `${CAPABILITIES_BLOCK}\n\n${PLATFORM_KNOWLEDGE}\n\n${behavior}`;

  if (levelPrompt) {
    system += `\n\n# LEVEL-SPECIFIC INSTRUCTIONS (${levelLabel})\n${levelPrompt}`;
  }

  // ── DATA SECTION (generated by code every turn) ──────────────────────────
  if (currentPage) {
    system += `\n\nCURRENT PAGE: The user is currently on the ${currentPage}.`;
  }

  if (pageContext?.kind === 'lesson') {
    const lesson = pageContext;
    system += `\n\nCURRENT LESSON:\nID: ${lesson.lessonId}\nTitle: ${lesson.lessonTitle} (${lesson.level.toUpperCase()})`;
    if (lesson.grammarTopics.length > 0) {
      system += `\nGrammar topics covered: ${lesson.grammarTopics.join(', ')}`;
    }
    if (lesson.vocabularyWords.length > 0) {
      system += `\nKey vocabulary themes: ${lesson.vocabularyWords.join(', ')}`;
    }
    system += `\nIf the user asks "where am I?" or "what are we studying?", tell them they are on lesson: ${lesson.lessonTitle} (${lesson.lessonId}).`;

    if (lesson.exercises.length > 0) {
      const renderExercise = (ex: (typeof lesson.exercises)[number]) => {
        system += `\n• ${ex.screenNumber}. ${ex.title} [${ex.id}] (${ex.type})`;
        if (ex.instruction) system += `\n  Instruction: ${ex.instruction}`;
        if (ex.checkable && ex.answers) system += `\n  Correct:\n${indent(ex.answers, 4)}`;
      };

      const mainExercises = lesson.exercises.filter((ex) => ex.section !== 'review');
      const reviewExercises = lesson.exercises.filter((ex) => ex.section === 'review');

      system += `\n\nEXERCISES IN THIS LESSON — the number before each item is EXACTLY the number the user sees on screen (e.g. "5." is the exercise labelled 5 on the page). ALWAYS refer to exercises by these numbers. The bracketed value like [l03-ex-05] is an INTERNAL id for your matching only — NEVER show it to the user; refer to an exercise only as "упражнение 5" / "exercise 5". Presentation-only items (vocabulary, dialogues, grammar tables) are listed too, without a "Correct" block.`;
      mainExercises.forEach(renderExercise);

      if (reviewExercises.length > 0) {
        system += `\n\nПРЕГОВОР / REVIEW block — a SEPARATE section shown below the main exercises. Its numbering restarts at 1, so "Преговор, упражнение 2" is NOT the same as "упражнение 2" in the list above.`;
        reviewExercises.forEach(renderExercise);
      }
    }
  } else if (pageContext?.kind === 'test') {
    const test = pageContext;
    system += `\n\nCURRENT TEST:\nID: ${test.testId}\nTitle: ${test.testTitle} (${test.level.toUpperCase()})\nTotal points: ${test.totalPoints}`;
    if (test.introText) {
      system += `\nIntro: ${test.introText}`;
    }
    system += `\nIf the user asks "where am I?", tell them they are on test: ${test.testTitle} (${test.testId}).`;
    system += `\n\nTEST POLICY APPLIES — DO NOT REVEAL ANSWERS to any of the exercises below. You may name the exercises, explain the grammar/vocabulary being tested, and review related rules. You may NOT confirm whether a specific user answer is right or wrong.`;

    if (test.sections.length > 0) {
      system += `\n\nTEST SECTIONS & EXERCISES (correct answers are intentionally omitted — see TEST POLICY):`;
      for (const sec of test.sections) {
        system += `\n\n[Section ${sec.id}] ${sec.name} (${sec.maxPoints} pts)`;
        sec.exercises.forEach((ex) => {
          system += `\n  • ${ex.screenNumber}. ${ex.title} [${ex.id}] (${ex.type}${typeof ex.points === 'number' ? `, ${ex.points} pts` : ''})`;
          if (ex.instruction) system += `\n    Instruction: ${ex.instruction}`;
        });
      }
    }
  } else if (currentPage && currentPage.includes('lesson')) {
    system += ` This appears to be a lesson page. Ask the user what they need help with in this lesson.`;
  } else if (currentPage && currentPage.includes('test')) {
    system += ` This appears to be a test page. TEST POLICY applies — do not reveal any answers; explain rules and what is being tested instead.`;
  }

  // Which exercise is scrolled into view right now — lets the bot resolve
  // "this exercise" / "help me here" without a number, and match the user's
  // on-screen position. Matched to the list above by id (numbers repeat across
  // the lesson/Преговор blocks).
  if (currentExercise) {
    system += `\n\nON SCREEN RIGHT NOW: the user is looking at exercise ${currentExercise.number} (internal id ${currentExercise.id} — for your matching only, do NOT show it). If they say "this exercise", "here", or ask without giving a number, assume they mean exercise ${currentExercise.number}. Refer to it only as "упражнение ${currentExercise.number}".`;
  }

  system += `\n\nUSER PROFILE:\nResponse language: ${langName}`;
  if (completedLessons && completedLessons.length > 0) {
    system += `\nLessons/tests the user has started or worked on: ${completedLessons.join(', ')}`;
  } else {
    system += `\nThis user has not started any lessons yet (or is just starting).`;
  }

  if (pageProgress) {
    const label = pageContext?.kind === 'test' ? 'CURRENT TEST' : 'CURRENT LESSON';
    system += `\n\nUSER PROGRESS IN ${label} (${pageProgress.lessonId}):`;
    const submittedAll = pageProgress.exercisesAllCorrect.length;
    const submittedWrong = pageProgress.exercisesWithMistakes.length;
    const attempted = pageProgress.attemptedExerciseIds.length;
    system += `\n- Attempted: ${attempted} / ${pageProgress.totalExercises} checkable exercises`;
    system += `\n- Fully correct: ${submittedAll}`;
    system += `\n- With mistakes: ${submittedWrong}`;

    if (pageProgress.exercisesWithMistakes.length > 0) {
      const usageNote = pageContext?.kind === 'test'
        ? 'You may acknowledge the mistake count and offer to review the underlying rule, but DO NOT reveal correct answers.'
        : 'Use proactively when relevant.';
      system += `\n- Exercises where the user got something wrong (${usageNote}):`;
      for (const m of pageProgress.exercisesWithMistakes) {
        system += `\n  • [${m.exerciseId}] ${m.wrongCount} wrong, ${m.rightCount} right. User wrote: ${m.userAnswers}`;
      }
    }
    if (pageProgress.notAttemptedExerciseIds.length > 0) {
      system += `\n- Not yet attempted: ${pageProgress.notAttemptedExerciseIds.join(', ')}`;
    }
  }

  return system;
}

function indent(text: string, spaces: number): string {
  const pad = ' '.repeat(spaces);
  return text
    .split('\n')
    .map((line) => pad + line)
    .join('\n');
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

/* ────────────────────────────────────────────────────────────────────────
 * Default exports for the admin UI: lets the panel show the user what
 * Robi's hardcoded layer is + offer a one-click "reset to default" for the
 * Base behavior prompt.
 * ────────────────────────────────────────────────────────────────────────
 */
export const DEFAULT_BASE_PROMPT = BASE_PROMPT_V1;
export const HARDCODED_CAPABILITIES = CAPABILITIES_BLOCK;
export const HARDCODED_PLATFORM_KNOWLEDGE = PLATFORM_KNOWLEDGE;

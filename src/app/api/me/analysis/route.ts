import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';
import { db } from '@/db';
import { exerciseStatesTable, userAnalysesTable, adminUsersTable } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';
import { summarizeLessonProgress } from '@/lib/chat/progressAnalyzer';
import { getUserProgressSummary } from '@/lib/admin/userProgress';
import { getActiveConfig } from '@/lib/chat/getActiveConfig';
import { getLLMClient } from '@/lib/chat/llmClient';
import { loadLesson, loadTest, ALL_LESSON_IDS } from '@/content';
import { TEST_LEVEL_MAP } from '@/content/registry';

const MIN_EXERCISES = 5;
const CACHE_HOURS = 24;

export async function GET(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value;
  if (!token) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const payload = await verifyToken(token);
  if (!payload) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const [cached] = await db
    .select()
    .from(userAnalysesTable)
    .where(eq(userAnalysesTable.userId, payload.userId))
    .limit(1);

  if (!cached) return NextResponse.json({ cached: null });

  return NextResponse.json({
    cached: {
      generatedAt: cached.generatedAt,
      attemptedSnapshot: cached.attemptedSnapshot,
      language: cached.language,
      summary: JSON.parse(cached.summaryJson),
    },
  });
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value;
  if (!token) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const payload = await verifyToken(token);
  if (!payload) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const lang: string = body.lang ?? 'bg';

  const progress = await getUserProgressSummary(payload.userId);

  // Count ALL exercise_states rows for this user (lessons + tests) for cache
  // snapshot and notEnoughData check — getUserProgressSummary only counts lessons.
  const [countRow] = await db
    .select({ total: sql<number>`COUNT(*)` })
    .from(exerciseStatesTable)
    .where(eq(exerciseStatesTable.userId, payload.userId));
  const totalAttempted = Number(countRow?.total ?? 0);

  if (totalAttempted < MIN_EXERCISES) {
    return NextResponse.json({ notEnoughData: true });
  }

  // Check if user is admin or IT — they bypass the 24h cache limit
  const [adminRow] = await db
    .select({ role: adminUsersTable.role })
    .from(adminUsersTable)
    .where(eq(adminUsersTable.userId, payload.userId))
    .limit(1);
  const isAdminOrIT = !!adminRow && (adminRow.role === 'admin' || adminRow.role === 'it');

  // Check cache
  const [existing] = await db
    .select()
    .from(userAnalysesTable)
    .where(eq(userAnalysesTable.userId, payload.userId))
    .limit(1);

  if (existing) {
    const ageHours = (Date.now() - new Date(existing.generatedAt).getTime()) / 3_600_000;
    const sameSnapshot = existing.attemptedSnapshot === totalAttempted;
    const sameLanguage = existing.language === lang;
    const withinCache = isAdminOrIT ? false : (sameSnapshot && sameLanguage && ageHours < CACHE_HOURS);
    if (withinCache) {
      return NextResponse.json({
        cached: true,
        generatedAt: existing.generatedAt,
        summary: JSON.parse(existing.summaryJson),
      });
    }
  }

  // Gather all exercise_states for the user
  const allLessonIds = ALL_LESSON_IDS;
  const allTestIds = Object.keys(TEST_LEVEL_MAP);
  const allIds = [...allLessonIds, ...allTestIds];

  const rows = allIds.length
    ? await db
        .select({
          lessonId: exerciseStatesTable.lessonId,
          exerciseId: exerciseStatesTable.exerciseId,
          state: exerciseStatesTable.state,
        })
        .from(exerciseStatesTable)
        .where(
          sql`${exerciseStatesTable.userId} = ${payload.userId} AND ${exerciseStatesTable.lessonId} IN (${sql.join(
            allIds.map((id) => sql`${id}`),
            sql`, `,
          )})`,
        )
    : [];

  // Group by lessonId/testId
  const byLesson = new Map<string, Array<{ exerciseId: string; state: string }>>();
  for (const r of rows) {
    const list = byLesson.get(r.lessonId) ?? [];
    list.push({ exerciseId: r.exerciseId, state: r.state });
    byLesson.set(r.lessonId, list);
  }

  // Build mistake context: for each lesson/test with mistakes, load content + compare answers
  interface MistakeContext {
    lessonId: string;
    lessonTitle: string;
    exerciseId: string;
    instruction: string;
    yourAnswer: string;
    correctAnswer: string;
    wrongCount: number;
  }

  const mistakes: MistakeContext[] = [];

  for (const [lessonId, stateRows] of byLesson) {
    const isTest = !!TEST_LEVEL_MAP[lessonId];

    if (isTest) {
      const testData = await loadTest(lessonId);
      if (!testData) continue;
      const allExIds = new Set(testData.sections.flatMap((s) => s.exercises.map((e) => e.id)));
      const summary = summarizeLessonProgress(lessonId, stateRows, allExIds.size, allExIds);

      for (const m of summary.exercisesWithMistakes) {
        // Find the exercise in the test sections
        for (const section of testData.sections) {
          const ex = section.exercises.find((e) => e.id === m.exerciseId);
          if (!ex) continue;
          const correct = extractCorrectAnswer(ex);
          mistakes.push({
            lessonId,
            lessonTitle: testData.title,
            exerciseId: m.exerciseId,
            instruction: extractInstruction(ex),
            yourAnswer: extractUserAnswer(m.userAnswers),
            correctAnswer: correct,
            wrongCount: m.wrongCount,
          });
        }
      }
    } else {
      const lessonData = await loadLesson(lessonId);
      if (!lessonData) continue;
      const allEx = [
        ...(lessonData.exercises ?? []),
        ...(lessonData.workbookExercises ?? []),
      ];
      const allExIds = new Set(allEx.map((e: { id: string }) => e.id));
      const summary = summarizeLessonProgress(lessonId, stateRows, allEx.length, allExIds);

      for (const m of summary.exercisesWithMistakes) {
        const ex = allEx.find((e: { id: string }) => e.id === m.exerciseId);
        if (!ex) continue;
        const correct = extractCorrectAnswer(ex);
          mistakes.push({
            lessonId,
            lessonTitle: lessonData.title ?? lessonId,
          exerciseId: m.exerciseId,
          instruction: extractInstruction(ex),
          yourAnswer: extractUserAnswer(m.userAnswers),
          correctAnswer: correct,
          wrongCount: m.wrongCount,
        });
      }
    }
  }

  // Sort by most mistakes first, cap at 15
  mistakes.sort((a, b) => b.wrongCount - a.wrongCount);
  const topMistakes = mistakes.slice(0, 15);

  // Build level summary for context
  const levelSummary = Object.entries(progress.byLevel)
    .filter(([, v]) => v.lessonsAttempted > 0)
    .map(([lvl, v]) => `${lvl.toUpperCase()}: ${v.lessonsAttempted} уроци, средно ${v.avgPct}%`)
    .join('; ');

  const langNames: Record<string, string> = {
    bg: 'Bulgarian',
    ar: 'Arabic',
    fr: 'French',
    en: 'English',
    fa: 'Persian (Farsi)',
    uk: 'Ukrainian',
    ru: 'Russian',
  };
  const langName = langNames[lang] ?? 'English';

  const mistakesText = topMistakes
    .map(
      (m, i) =>
        `${i + 1}. Exercise "${m.exerciseId}" from "${m.lessonTitle}"\n` +
        `   Instruction: ${m.instruction}\n` +
        `   User answered: ${m.yourAnswer || '(no answer)'}\n` +
        `   Correct answer: ${m.correctAnswer || '(see content)'}\n` +
        `   Wrong parts: ${m.wrongCount}`,
    )
    .join('\n\n');

  const systemPrompt = `You are a warm and encouraging Bulgarian language teacher writing a PERSONAL analysis directly to the learner.
Address the learner directly using "you" / "your" throughout — never say "the learner" or "the student".
Write as if speaking face-to-face with the person.

The learner's progress: ${levelSummary || 'just started'}.
Current level: ${progress.highestLevel?.toUpperCase() ?? 'A1'} (${progress.highestLevelPct}% average completion).
Total exercises attempted: ${totalAttempted}.

IMPORTANT: Write your ENTIRE response in ${langName}. All section headers, explanations, recommendations and text must be in ${langName}.
Use the appropriate form of address for ${langName} (e.g. "ти" / "твоят" in Bulgarian, "vous" / "votre" in French, "вы" / "ваш" in Russian, "شما" in Persian/Farsi, "ти" / "твій" in Ukrainian).

Analyze the mistakes below and return a JSON object with this exact structure:
{
  "summary": "2-3 sentences addressing the learner directly: their overall level, what they are doing well, and the main area to work on",
  "strengths": ["strength 1 — phrased as 'You are good at...' or 'You consistently...'", "strength 2", "strength 3"],
  "improvementAreas": [
    {
      "topic": "Topic name (e.g. verb conjugation, noun gender)",
      "explanation": "2-3 sentences addressed to the learner: explain the pattern they struggle with and why it matters for them",
      "examples": [
        {
          "lessonId": "lesson-id",
          "yourAnswer": "what the learner wrote (keep in Bulgarian)",
          "correctAnswer": "the correct Bulgarian form",
          "note": "1 sentence addressed to the learner explaining why this is wrong"
        }
      ],
      "recommendations": [
        {
          "type": "review_lesson",
          "lessonId": "lesson-id",
          "description": "Personal advice addressed to the learner: what exactly to focus on when revisiting"
        }
      ]
    }
  ],
  "nextSteps": ["step 1 addressed directly to the learner", "step 2", "step 3"],
  "encouragement": "One warm, personal encouraging sentence addressed directly to the learner"
}

Rules:
- 3-5 improvementAreas, grouped by grammatical/vocabulary theme (not by lesson)
- Each area: 2-3 examples from the actual mistakes
- recommendations type can be: "review_lesson", "redo_exercise", "alternative_practice"
- Be specific and reference actual Bulgarian grammar terms
- Do NOT translate Bulgarian words/exercises — they stay in Bulgarian
- Keep everything else in ${langName}
- Always use direct address — never refer to the learner in third person

MISTAKES TO ANALYZE:
${mistakesText || 'No submitted mistakes found — the learner has attempted exercises but not checked answers yet.'}`;

  const config = await getActiveConfig();
  if (!config.apiKey) {
    return NextResponse.json({ error: 'No API key configured' }, { status: 503 });
  }

  const llm = getLLMClient(config.apiKey);
  let raw = '';
  for await (const chunk of llm.stream(
    [{ role: 'user', content: systemPrompt }],
    { model: config.model, temperature: 0.4, maxTokens: 1500 },
  )) {
    if (chunk.type === 'text') raw += chunk.value;
  }

  // Extract JSON from the response (model may wrap it in ```json ... ```)
  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    return NextResponse.json({ error: 'Invalid AI response format' }, { status: 500 });
  }

  let summary: unknown;
  try {
    summary = JSON.parse(jsonMatch[0]);
  } catch {
    return NextResponse.json({ error: 'Failed to parse AI response' }, { status: 500 });
  }

  // Upsert cache
  await db
    .insert(userAnalysesTable)
    .values({
      userId: payload.userId,
      generatedAt: new Date(),
      attemptedSnapshot: totalAttempted,
      language: lang,
      summaryJson: JSON.stringify(summary),
    })
    .onConflictDoUpdate({
      target: userAnalysesTable.userId,
      set: {
        generatedAt: new Date(),
        attemptedSnapshot: totalAttempted,
        language: lang,
        summaryJson: JSON.stringify(summary),
      },
    });

  return NextResponse.json({
    cached: false,
    generatedAt: new Date(),
    summary,
  });
}

// ── Helpers ──────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractCorrectAnswer(ex: any): string {
  if (ex.correctAnswer) return String(ex.correctAnswer);
  if (Array.isArray(ex.correctAnswers)) return ex.correctAnswers.join(', ');
  if (Array.isArray(ex.items)) {
    return ex.items
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((item: any) => item.correctAnswer ?? (Array.isArray(item.correctAnswers) ? item.correctAnswers.join('/') : ''))
      .filter(Boolean)
      .join(' | ');
  }
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractInstruction(ex: any): string {
  return ex.instruction ?? ex.title ?? ex.type ?? '';
}

function extractUserAnswer(userAnswersJson: string): string {
  try {
    const parsed = JSON.parse(userAnswersJson || '{}');
    const leaves: string[] = [];
    collectLeafStrings(parsed, leaves, 0);
    return leaves.slice(0, 8).join(', ');
  } catch {
    return userAnswersJson?.slice(0, 80) ?? '';
  }
}

// Recursively collect non-empty string/number leaf values from a JSON tree.
// Skips "available" arrays (those are unused word banks, not user answers).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function collectLeafStrings(val: any, out: string[], depth: number): void {
  if (depth > 6) return;
  if (typeof val === 'string' && val.trim()) {
    out.push(val.trim());
  } else if (typeof val === 'number') {
    out.push(String(val));
  } else if (Array.isArray(val)) {
    for (const item of val) collectLeafStrings(item, out, depth + 1);
  } else if (val && typeof val === 'object') {
    for (const [k, v] of Object.entries(val)) {
      // Skip "available" arrays — those are the unused word bank tiles,
      // not what the user actually answered.
      if (k === 'available') continue;
      collectLeafStrings(v, out, depth + 1);
    }
  }
}

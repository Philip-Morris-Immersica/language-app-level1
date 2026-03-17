import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';
import { db } from '@/db';
import { exerciseStatesTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

async function getExerciseCount(lessonId: string): Promise<number> {
  try {
    const lesson = await import(`@/content/lessons/${lessonId}`);
    const data = lesson.default || lesson.lessonData;
    const exercises = data?.exercises?.length ?? 0;
    const workbook = data?.workbookExercises?.length ?? 0;
    return exercises + workbook;
  } catch {
    return 0;
  }
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value;
  if (!token) return NextResponse.json({ lessons: {} });

  const payload = await verifyToken(token);
  if (!payload) return NextResponse.json({ lessons: {} });

  const rows = await db
    .select({
      lessonId: exerciseStatesTable.lessonId,
      exerciseId: exerciseStatesTable.exerciseId,
    })
    .from(exerciseStatesTable)
    .where(eq(exerciseStatesTable.userId, payload.userId));

  const completedByLesson: Record<string, Set<string>> = {};
  for (const row of rows) {
    if (!completedByLesson[row.lessonId]) {
      completedByLesson[row.lessonId] = new Set();
    }
    completedByLesson[row.lessonId].add(row.exerciseId);
  }

  const lessonIds = [
    'lesson-01', 'lesson-02', 'lesson-03', 'lesson-04', 'lesson-05',
    'lesson-06', 'lesson-07', 'lesson-08', 'lesson-09', 'lesson-10', 'lesson-11',
  ];

  const lessons: Record<string, { completed: number; total: number }> = {};

  for (const id of lessonIds) {
    const total = await getExerciseCount(id);
    const completed = completedByLesson[id]?.size ?? 0;
    lessons[id] = { completed, total };
  }

  return NextResponse.json({ lessons });
}

import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';
import { recordTouches } from '@/lib/learnerProgress';

/**
 * Records that the learner clicked inside one or more exercises of a lesson
 * or test. Body: `{ lessonId, exerciseIds: string[] }`. Batched and deduped
 * on the client (`LessonExercisesProvider`), idempotent here.
 */
export async function POST(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value;
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const payload = await verifyToken(token);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let body: { lessonId?: unknown; exerciseIds?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Bad JSON' }, { status: 400 });
  }
  const { lessonId, exerciseIds } = body;
  if (typeof lessonId !== 'string' || !lessonId || lessonId.length > 50 || !Array.isArray(exerciseIds)) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const ids = exerciseIds.filter((id): id is string => typeof id === 'string').slice(0, 200);
  await recordTouches(payload.userId, lessonId, ids);
  return NextResponse.json({ ok: true });
}

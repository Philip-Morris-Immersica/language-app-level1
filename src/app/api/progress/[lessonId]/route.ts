import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';
import { db } from '@/db';
import { exerciseStatesTable } from '@/db/schema';
import { eq, and, desc } from 'drizzle-orm';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  const token = req.cookies.get('auth_token')?.value;
  if (!token) return NextResponse.json({ states: {}, lastExerciseId: null });

  const payload = await verifyToken(token);
  if (!payload) return NextResponse.json({ states: {}, lastExerciseId: null });

  const { lessonId } = await params;

  const rows = await db
    .select()
    .from(exerciseStatesTable)
    .where(
      and(
        eq(exerciseStatesTable.userId, payload.userId),
        eq(exerciseStatesTable.lessonId, lessonId)
      )
    )
    .orderBy(desc(exerciseStatesTable.updatedAt));

  const states: Record<string, unknown> = {};
  for (const row of rows) {
    try {
      states[row.exerciseId] = JSON.parse(row.state);
    } catch {
      states[row.exerciseId] = {};
    }
  }

  // Rows are ordered by updatedAt desc, so the first row is the most recently
  // touched exercise — i.e. "resume where I left off".
  const lastExerciseId = rows.length > 0 ? rows[0].exerciseId : null;

  return NextResponse.json({ states, lastExerciseId });
}

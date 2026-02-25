import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';
import { db } from '@/db';
import { exerciseStatesTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value;
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const payload = await verifyToken(token);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { lessonId, exerciseId, state } = await req.json();
  if (!lessonId || !exerciseId || state === undefined) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const stateJson = JSON.stringify(state);

  // Upsert: insert or update on conflict (userId, exerciseId)
  await db.insert(exerciseStatesTable)
    .values({
      userId: payload.userId,
      lessonId,
      exerciseId,
      state: stateJson,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: [exerciseStatesTable.userId, exerciseStatesTable.exerciseId],
      set: {
        state: stateJson,
        updatedAt: new Date(),
      },
    });

  return NextResponse.json({ ok: true });
}

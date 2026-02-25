import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';
import { db } from '@/db';
import { exerciseStatesTable } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  const token = req.cookies.get('auth_token')?.value;
  if (!token) return NextResponse.json({ states: {} });

  const payload = await verifyToken(token);
  if (!payload) return NextResponse.json({ states: {} });

  const { lessonId } = await params;

  const rows = await db
    .select()
    .from(exerciseStatesTable)
    .where(
      and(
        eq(exerciseStatesTable.userId, payload.userId),
        eq(exerciseStatesTable.lessonId, lessonId)
      )
    );

  const states: Record<string, unknown> = {};
  for (const row of rows) {
    try {
      states[row.exerciseId] = JSON.parse(row.state);
    } catch {
      states[row.exerciseId] = {};
    }
  }

  return NextResponse.json({ states });
}

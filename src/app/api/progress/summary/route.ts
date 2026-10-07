import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';
import { getUserProgress } from '@/lib/learnerProgress';

/**
 * Progress for the signed-in learner — sidebar, level map and home page.
 *
 *   lessons[itemId] — every lesson AND test:
 *     completed / total — exercises touched / exercises with something to do
 *     percent           — progress % (100 once the item is completed)
 *     done              — completed (every graded exercise checked)
 *     started           — anything touched
 *   levels[level]     — level %, completed flag, lessons/tests completed counts
 */
export async function GET(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value;
  if (!token) return NextResponse.json({ lessons: {}, levels: {} });

  const payload = await verifyToken(token);
  if (!payload) return NextResponse.json({ lessons: {}, levels: {} });

  const progress = await getUserProgress(payload.userId);

  const lessons: Record<string, { completed: number; total: number; percent: number; done: boolean; started: boolean }> = {};
  for (const p of progress.items) {
    lessons[p.itemId] = {
      completed: p.touched,
      total: p.countable,
      percent: p.percent,
      done: p.completed,
      started: p.touched > 0,
    };
  }

  const levels = Object.fromEntries(progress.levels.map((l) => [l.level, l]));

  return NextResponse.json({ lessons, levels, currentLevel: progress.currentLevel });
}

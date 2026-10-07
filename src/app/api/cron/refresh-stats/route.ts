import { NextRequest, NextResponse } from 'next/server';
import { refreshAllProgressStats } from '@/lib/admin/userProgress';

/**
 * Daily rebuild of the learner progress cache + dashboard snapshot.
 * Scheduled in `vercel.json`; Vercel sends `Authorization: Bearer $CRON_SECRET`.
 */
export const maxDuration = 300;
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const started = Date.now();
  const result = await refreshAllProgressStats();
  return NextResponse.json({ ok: true, ...result, ms: Date.now() - started });
}

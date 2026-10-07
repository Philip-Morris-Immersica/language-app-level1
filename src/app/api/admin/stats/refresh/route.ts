import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, isNextResponse } from '@/lib/admin/requireRole';
import { getPlatformProgressStats } from '@/lib/admin/userProgress';

/**
 * «Обнови сега» on the admin dashboard — recomputes the platform snapshot
 * from the per-learner progress cache (which is already kept up to date on
 * every save). The full rebuild runs nightly via `/api/cron/refresh-stats`.
 */
export const maxDuration = 120;

export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req, 'admin');
  if (isNextResponse(auth)) return auth;
  const stats = await getPlatformProgressStats({ refresh: true });
  return NextResponse.json({ ok: true, computedAt: stats.computedAt });
}

import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, isNextResponse } from '@/lib/admin/requireRole';
import { getLevelDetailStats } from '@/lib/admin/userProgress';
import { LEVELS, type Level } from '@/content/registry';

export async function GET(req: NextRequest, { params }: { params: Promise<{ level: string }> }) {
  const auth = await requireAdmin(req, 'admin');
  if (isNextResponse(auth)) return auth;

  const { level } = await params;
  if (!LEVELS.includes(level as Level)) {
    return NextResponse.json({ error: 'Invalid level' }, { status: 400 });
  }

  const stats = await getLevelDetailStats(level as Level);
  return NextResponse.json(stats);
}

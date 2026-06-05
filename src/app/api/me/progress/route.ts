import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';
import { getUserProgressSummary, getUserTestSummary } from '@/lib/admin/userProgress';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value;
  if (!token) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const payload = await verifyToken(token);
  if (!payload) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const [progress, tests] = await Promise.all([
    getUserProgressSummary(payload.userId),
    getUserTestSummary(payload.userId),
  ]);

  return NextResponse.json({ progress, tests });
}

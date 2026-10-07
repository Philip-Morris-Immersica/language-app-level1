import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';
import { getTrackingSince, getUserProgressBundle } from '@/lib/admin/userProgress';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value;
  if (!token) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const payload = await verifyToken(token);
  if (!payload) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const [{ summary: progress, tests }, trackingSince] = await Promise.all([
    getUserProgressBundle(payload.userId),
    getTrackingSince(),
  ]);

  return NextResponse.json({ progress, tests, trackingSince });
}

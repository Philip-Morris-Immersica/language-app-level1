import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value;
  if (!token) {
    return NextResponse.json({ user: null });
  }
  const payload = await verifyToken(token);
  if (!payload) {
    return NextResponse.json({ user: null });
  }
  return NextResponse.json({
    user: { id: payload.userId, name: payload.name, email: payload.email },
  });
}

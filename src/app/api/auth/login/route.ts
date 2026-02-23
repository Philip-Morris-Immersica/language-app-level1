import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/db';
import { usersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { signToken } from '@/lib/auth/jwt';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Попълнете всички полета.' }, { status: 400 });
    }

    const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);
    if (!user) {
      return NextResponse.json({ error: 'Грешен имейл или парола.' }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: 'Грешен имейл или парола.' }, { status: 401 });
    }

    const token = await signToken({ userId: user.id, name: user.name, email: user.email });

    const response = NextResponse.json({ user: { id: user.id, name: user.name, email: user.email } });
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    });
    return response;
  } catch {
    return NextResponse.json({ error: 'Грешка при вход.' }, { status: 500 });
  }
}

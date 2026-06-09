import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/db';
import { usersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { signToken } from '@/lib/auth/jwt';
import { seedAdminFromEnv } from '@/lib/admin/seedFromEnv';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Попълнете всички полета.' }, { status: 400 });
    }

    console.log('[login] attempting login for:', email);
    console.log('[login] DATABASE_URL set?', !!process.env.DATABASE_URL);
    console.log('[login] JWT_SECRET set?', !!process.env.JWT_SECRET);

    const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);
    if (!user) {
      console.log('[login] user not found:', email);
      return NextResponse.json({ error: 'Грешен имейл или парола.' }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      console.log('[login] invalid password for:', email);
      return NextResponse.json({ error: 'Грешен имейл или парола.' }, { status: 401 });
    }

    const token = await signToken({ userId: user.id, name: user.name, email: user.email });

    await seedAdminFromEnv(user.id, user.email).catch((err) => {
      console.error('[login] seedAdminFromEnv failed:', err);
    });

    const response = NextResponse.json({ user: { id: user.id, name: user.name, email: user.email } });
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    });
    return response;
  } catch (err) {
    console.error('[login] unexpected error:', err);
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: 'Грешка при вход.', debug: message }, { status: 500 });
  }
}

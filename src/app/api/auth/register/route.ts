import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/db';
import { usersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { signToken } from '@/lib/auth/jwt';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Попълнете всички полета.' }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: 'Паролата трябва да е поне 6 символа.' }, { status: 400 });
    }

    // Check if email already exists
    const existing = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);
    if (existing.length > 0) {
      return NextResponse.json({ error: 'Имейлът вече е регистриран.' }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const [user] = await db.insert(usersTable).values({ name, email, passwordHash }).returning();

    const token = await signToken({ userId: user.id, name: user.name, email: user.email });

    const response = NextResponse.json({ user: { id: user.id, name: user.name, email: user.email } });
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    });
    return response;
  } catch {
    return NextResponse.json({ error: 'Грешка при регистрация.' }, { status: 500 });
  }
}

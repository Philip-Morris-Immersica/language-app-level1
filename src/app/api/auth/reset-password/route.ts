import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { db } from '@/db';
import { usersTable, passwordResetTokensTable } from '@/db/schema';
import { eq, and, isNull, gt } from 'drizzle-orm';
import { signToken } from '@/lib/auth/jwt';

function sha256(value: string): string {
  return crypto.createHash('sha256').update(value).digest('hex');
}

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json().catch(() => ({}));

    if (typeof token !== 'string' || !token) {
      return NextResponse.json({ error: 'Невалиден линк.' }, { status: 400 });
    }
    if (typeof password !== 'string' || password.length < 6) {
      return NextResponse.json(
        { error: 'Паролата трябва да е поне 6 символа.' },
        { status: 400 }
      );
    }

    const tokenHash = sha256(token);
    const now = new Date();

    const [tokenRow] = await db
      .select()
      .from(passwordResetTokensTable)
      .where(
        and(
          eq(passwordResetTokensTable.tokenHash, tokenHash),
          isNull(passwordResetTokensTable.usedAt),
          gt(passwordResetTokensTable.expiresAt, now)
        )
      )
      .limit(1);

    if (!tokenRow) {
      return NextResponse.json(
        { error: 'Линкът е невалиден или вече е изтекъл. Поискайте нов.' },
        { status: 400 }
      );
    }

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, tokenRow.userId))
      .limit(1);

    if (!user) {
      return NextResponse.json({ error: 'Невалиден линк.' }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    // Mark token used + update password in parallel. If anything below fails
    // the token stays unused so the user can retry without re-requesting.
    await db
      .update(usersTable)
      .set({ passwordHash })
      .where(eq(usersTable.id, user.id));

    await db
      .update(passwordResetTokensTable)
      .set({ usedAt: new Date() })
      .where(eq(passwordResetTokensTable.id, tokenRow.id));

    // Invalidate any OTHER outstanding tokens for this user — once they reset,
    // older reset links shouldn't keep working.
    await db
      .update(passwordResetTokensTable)
      .set({ usedAt: new Date() })
      .where(
        and(
          eq(passwordResetTokensTable.userId, user.id),
          isNull(passwordResetTokensTable.usedAt)
        )
      );

    // Auto-login the user after a successful reset — same UX as a fresh login.
    const jwt = await signToken({
      userId: user.id,
      name: user.name,
      email: user.email,
    });

    const response = NextResponse.json({
      ok: true,
      user: { id: user.id, name: user.name, email: user.email },
    });
    response.cookies.set('auth_token', jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    });
    return response;
  } catch (err) {
    console.error('[reset-password] unexpected error:', err);
    return NextResponse.json({ error: 'Грешка при смяна на парола.' }, { status: 500 });
  }
}

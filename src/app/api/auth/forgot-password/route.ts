import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { db } from '@/db';
import { usersTable, passwordResetTokensTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { sendPasswordResetEmail } from '@/lib/email/sendPasswordReset';

// Token lifetime — 1 hour is the industry default for password resets.
const TOKEN_TTL_MS = 60 * 60 * 1000;

// Rate-limit per IP — max 5 requests per 15 minutes. Prevents enumeration
// and spam without hurting real users (who normally try 1–2 times max).
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const ipHits = new Map<string, { count: number; resetAt: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ipHits.get(ip);
  if (!entry || entry.resetAt < now) {
    ipHits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count += 1;
  return true;
}

function sha256(value: string): string {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function getBaseUrl(req: NextRequest): string {
  const fromEnv = process.env.NEXT_PUBLIC_APP_URL;
  if (fromEnv) return fromEnv.replace(/\/$/, '');
  // Fall back to request origin (works in dev + most prod setups behind a
  // single domain). Honour the standard reverse-proxy headers when present.
  const proto = req.headers.get('x-forwarded-proto') ?? 'https';
  const host = req.headers.get('x-forwarded-host') ?? req.headers.get('host');
  if (host) return `${proto}://${host}`;
  return new URL(req.url).origin;
}

export async function POST(req: NextRequest) {
  // We ALWAYS return the same success response regardless of whether the
  // email exists, to prevent attackers from probing which addresses are
  // registered. The only branch that returns an error is invalid input
  // (missing/malformed email) and rate-limit.
  const genericSuccess = NextResponse.json({ ok: true });

  try {
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown';

    if (!rateLimit(ip)) {
      return NextResponse.json(
        { error: 'Твърде много опити. Опитайте отново след 15 минути.' },
        { status: 429 }
      );
    }

    const { email } = await req.json().catch(() => ({ email: '' }));

    if (typeof email !== 'string' || !email.trim()) {
      return NextResponse.json({ error: 'Въведете имейл.' }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Basic shape check — we don't want to call Resend with garbage.
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return NextResponse.json({ error: 'Невалиден имейл.' }, { status: 400 });
    }

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, normalizedEmail))
      .limit(1);

    if (!user) {
      // Pretend success — don't reveal that the email is unknown.
      return genericSuccess;
    }

    const rawToken = crypto.randomBytes(32).toString('base64url');
    const tokenHash = sha256(rawToken);
    const expiresAt = new Date(Date.now() + TOKEN_TTL_MS);

    await db.insert(passwordResetTokensTable).values({
      userId: user.id,
      tokenHash,
      expiresAt,
    });

    const baseUrl = getBaseUrl(req);
    const resetUrl = `${baseUrl}/reset-password?token=${rawToken}`;

    try {
      await sendPasswordResetEmail({
        to: user.email,
        name: user.name,
        resetUrl,
      });
    } catch (err) {
      // Log on the server, but don't leak the failure to the client — same
      // generic success response so timing/response shape stays uniform.
      console.error('[forgot-password] email send failed:', err);
    }

    return genericSuccess;
  } catch (err) {
    console.error('[forgot-password] unexpected error:', err);
    // Even on unexpected errors, mirror the generic success to avoid leakage.
    return genericSuccess;
  }
}

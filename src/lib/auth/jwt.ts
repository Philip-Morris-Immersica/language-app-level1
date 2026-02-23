import { SignJWT, jwtVerify } from 'jose';

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'unhcr-bg-language-app-secret-2024'
);

export interface JwtPayload {
  userId: number;
  name: string;
  email: string;
}

export async function signToken(payload: JwtPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d')
    .sign(SECRET);
}

export async function verifyToken(token: string): Promise<JwtPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as unknown as JwtPayload;
  } catch {
    return null;
  }
}

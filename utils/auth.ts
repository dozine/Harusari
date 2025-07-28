import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_NAME = process.env.COOKIE_NAME || "authToken";

export interface JWTPayload {
  userId: string;
  email: string;
  name?: string;
  iat: number;
  exp: number;
}

export async function verifyTokenServer(): Promise<JWTPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) {
      return null;
    }
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    if (
      typeof decoded === "object" &&
      decoded !== null &&
      "userId" in decoded &&
      "email" in decoded
    ) {
      return decoded as JWTPayload;
    }

    return null;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}

// JWT 토큰 생성 (로그인 API에서 사용)
export function generateToken(payload: {
  userId: string;
  email: string;
  name?: string;
}): string {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export { COOKIE_NAME };

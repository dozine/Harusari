import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt, { Secret } from "jsonwebtoken";
import { cookies } from "next/headers";

const prisma = new PrismaClient();
const JWT_SECRET: Secret =
  process.env.JWT_SECRET || "your-super-secret-jwt-key";
const COOKIE_NAME = process.env.COOKIE_NAME || "authToken";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) {
      return NextResponse.json(
        { message: "인증 토큰이 없습니다." },
        { status: 401 }
      );
    }

    // 토큰 검증
    const decoded = jwt.verify(token, JWT_SECRET);

    if (
      typeof decoded !== "object" ||
      decoded === null ||
      !("userId" in decoded) ||
      !("email" in decoded)
    ) {
      return NextResponse.json(
        { message: "유효하지 않은 토큰 형식입니다." },
        { status: 401 }
      );
    }

    const { userId, email } = decoded as { userId: string; email: string };

    // 사용자 정보 조회
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "사용자를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error: any) {
    console.error("Token verification error:", error);
    if (error.name === "JsonWebTokenError") {
      return NextResponse.json(
        { message: "유효하지 않은 토큰입니다." },
        { status: 401 }
      );
    } else if (error.name === "TokenExpiredError") {
      return NextResponse.json(
        { message: "토큰이 만료되었습니다." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "서버 내부 오류가 발생했습니다." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

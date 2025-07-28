import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { serialize } from "cookie";

const prisma = new PrismaClient();
const JWT_SECRET: Secret =
  process.env.JWT_SECRET || "your-super-secret-jwt-key";
const COOKIE_NAME = process.env.COOKIE_NAME || "authToken";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      } as SignOptions
    );

    const serializedCookie = serialize(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    });

    const response = NextResponse.json(
      {
        message: "로그인 성공",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      },
      { status: 200 }
    );
    response.headers.set("Set-Cookie", serializedCookie);
    return response;
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

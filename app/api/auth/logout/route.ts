import { NextResponse } from "next/server";
import { serialize } from "cookie";

const COOKIE_NAME = process.env.COOKIE_NAME || "authToken";

export async function POST() {
  try {
    // 쿠키 삭제
    const serializedCookie = serialize(COOKIE_NAME, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 0, // 즉시 만료
      sameSite: "lax",
    });

    const response = NextResponse.json(
      { message: "로그아웃 되었습니다." },
      { status: 200 }
    );

    response.headers.set("Set-Cookie", serializedCookie);
    return response;
  } catch (error: any) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { message: "로그아웃 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

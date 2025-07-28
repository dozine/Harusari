import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
    const { password: _, ...result } = user;
    return NextResponse.json({ user: result }, { status: 201 });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 409 }
      );
    }
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

import { verifyTokenServer } from "@/utils/auth";
import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const user = await verifyTokenServer();
    if (!user) {
      return NextResponse.json(
        {
          message: "Authentication required",
        },
        { status: 401 }
      );
    }
    const userId = user.userId;
    const moods = await prisma.moodEntry.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        date: "desc",
      },
    });
    return NextResponse.json(moods);
  } catch (error) {
    console.error("Error fetching mood entries:", error);
    return NextResponse.json(
      { message: "Failed to fetch mood entries" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await verifyTokenServer();
    if (!user) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      );
    }
    const userId = user.userId;
    const { date, mood } = await request.json();
    if (!date || !mood) {
      return NextResponse.json(
        { message: "Date and Mood are required " },
        {
          status: 400,
        }
      );
    }
    const newMoodEntry = await prisma.moodEntry.create({
      data: {
        userId: userId,
        date: new Date(date),
        mood: mood,
      },
    });
    return NextResponse.json(newMoodEntry, { status: 201 });
  } catch (error) {
    console.error("Error creating moode entry", error);
    return NextResponse.json(
      { message: "Failed to create mood entry" },
      { status: 500 }
    );
  }
}

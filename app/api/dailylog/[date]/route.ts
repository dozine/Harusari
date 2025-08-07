import { verifyTokenServer } from "@/utils/auth";
import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { date: string } }
) {
  try {
    const user = await verifyTokenServer();
    if (!user) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      );
    }
    const userId = user.userId;
    const dateParam = params.date;
    if (!dateParam) {
      return NextResponse.json(
        { message: "Date parameter is missing" },
        { status: 400 }
      );
    }

    const date = new Date(dateParam);
    if (isNaN(date.getTime())) {
      return NextResponse.json({ message: "Invalid date format" });
    }
    const dailyLog = await prisma.dailyLog.findUnique({
      where: {
        userId_date: {
          userId: userId,
          date: date,
        },
      },
    });
    return NextResponse.json(dailyLog);
  } catch (error) {
    console.error("Error fetching daily log :", error);
    return NextResponse.json(
      {
        message: "Failed to fetch daily log",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { date: string } }
) {
  try {
    const user = await verifyTokenServer();
    if (!user) {
      return NextResponse.json(
        { message: "Authentication required " },
        { status: 401 }
      );
    }
    const userId = user.userId;
    const { content, mood, moodComment } = await request.json();
    const date = params.date;

    const updatedDailyLog = await prisma.dailyLog.update({
      where: {
        userId_date: {
          userId: userId,
          date: new Date(date),
        },
      },
      data: {
        content: content || null,
        mood: mood || null,
        moodComment: moodComment || null,
        updatedAt: new Date(),
      },
    });
    return NextResponse.json(updatedDailyLog);
  } catch (error) {
    console.error("Error updating daily log :", error);
    return NextResponse.json(
      { message: "Failed to update or daily log not found" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { date: string } }
) {
  try {
    const user = await verifyTokenServer();
    if (!user) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      );
    }
    const userId = user.userId;
    const dateParams = params.date;
    const date = new Date(dateParams);
    if (isNaN(date.getTime())) {
      return NextResponse.json(
        { message: "Invalid date format in URL " },
        { status: 400 }
      );
    }
    await prisma.dailyLog.delete({
      where: {
        userId_date: {
          userId: userId,
          date: date,
        },
      },
    });
  } catch (error) {
    console.error("Error deleting daily log", error);
    return NextResponse.json(
      { message: "Failed to delete daily log or log not found" },
      { status: 500 }
    );
  }
}

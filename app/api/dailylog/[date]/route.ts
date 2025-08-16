import { verifyTokenServer } from "@/utils/auth";
import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

function parseDateParam(dateParam: string): Date | null {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateParam)) return null;

  const [year, month, day] = dateParam.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return isNaN(date.getTime()) ? null : date;
}

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
    const date = parseDateParam(params.date);
    if (!date) {
      return NextResponse.json(
        { message: "Date parameter is missing" },
        { status: 400 }
      );
    }

    const dailyLog = await prisma.dailyLog.findUnique({
      where: {
        userId_date: {
          userId: userId,
          date,
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
    const date = parseDateParam(params.date);
    if (!date) {
      return NextResponse.json(
        { message: "Date parameter is missing" },
        { status: 400 }
      );
    }
    const updatedDailyLog = await prisma.dailyLog.update({
      where: {
        userId_date: {
          userId: userId,
          date,
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
    const date = parseDateParam(params.date);
    if (!date) {
      return NextResponse.json(
        { message: "Date parameter is missing" },
        { status: 400 }
      );
    }
    await prisma.dailyLog.delete({
      where: {
        userId_date: {
          userId: userId,
          date,
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

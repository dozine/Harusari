import { verifyTokenServer } from "@/utils/auth";
import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const user = await verifyTokenServer();
    if (!user) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      );
    }
    const userId = user.userId;

    const logs = await prisma.dailyLog.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        date: "desc",
      },
    });
    return NextResponse.json(logs);
  } catch (error) {
    console.error("Error fetching daily log:", error);
    return NextResponse.json(
      { message: "Failed to fetch daily log" },
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
    const { date, content } = await request.json();
    if (!date) {
      return NextResponse.json(
        {
          message: "Date is required",
        },
        { status: 400 }
      );
    }
    const dailyLogDate = new Date(date);
    const newDailyLog = await prisma.dailyLog.create({
      data: {
        userId: userId,
        date: dailyLogDate,
        content: content || "",
      },
    });
    return NextResponse.json(newDailyLog, { status: 201 });
  } catch (error) {
    console.error("Error creating daily log", error);
    return NextResponse.json(
      { message: "Failed to create daily log" },
      { status: 500 }
    );
  }
}

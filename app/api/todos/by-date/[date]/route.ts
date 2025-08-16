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

    // 날짜 유효성 검사
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateParam)) {
      return NextResponse.json(
        { message: "Invalid date format. Expected YYYY-MM-DD" },
        { status: 400 }
      );
    }

    const date = new Date(dateParam + "T00:00:00.000Z");
    if (isNaN(date.getTime())) {
      return NextResponse.json(
        { message: "Invalid date format" },
        { status: 400 }
      );
    }

    const startOfDay = new Date(dateParam + "T00:00:00.000Z");
    const endOfDay = new Date(dateParam + "T23:59:59.999Z");

    const todos = await prisma.task.findMany({
      where: {
        userId: userId,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json(todos, { status: 200 });
  } catch (error) {
    console.error("Error fetching todos:", error);
    return NextResponse.json(
      { message: "Failed to fetch todos" },
      { status: 500 }
    );
  }
}

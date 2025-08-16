import { verifyTokenServer } from "@/utils/auth";
import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
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
        { message: "Date Parameter is missing" },
        { status: 400 }
      );
    }

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

    const startDate = new Date(dateParam + "T00:00:00.000Z");
    const endDate = new Date(dateParam + "T23:59:59.999Z");

    const achievements = await prisma.achievement.findMany({
      where: {
        userId: userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },

      orderBy: {
        date: "asc",
      },
    });

    return NextResponse.json(achievements);
  } catch (error) {
    console.error("Error fetching acheivement", error);
    return NextResponse.json(
      { message: "Failed to fetch achievement " },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { verifyTokenServer } from "@/utils/auth";
import prisma from "@/utils/prisma";

export async function GET(request: NextRequest) {
  try {
    const user = await verifyTokenServer();
    if (!user) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      );
    }
    const userId = user.userId;
    const { searchParams } = new URL(request.url);
    const startDateParam = searchParams.get("startDate");
    const endDateParam = searchParams.get("endDate");

    if (!startDateParam || !endDateParam) {
      return NextResponse.json(
        { message: "startDate and endDate are required" },
        { status: 400 }
      );
    }
    const startDate = new Date(startDateParam);
    const endDate = new Date(endDateParam);
    endDate.setHours(23, 59, 59, 999);

    const achievements = await prisma.achievement.findMany({
      where: {
        userId: userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },

      select: {
        date: true,
        completionRate: true,
      },
      orderBy: {
        date: "asc",
      },
    });

    return NextResponse.json(achievements);
  } catch (error) {
    console.error("Error fetching daily achievements:", error);
    return NextResponse.json(
      { message: "Failed to fetch daily achievements" },
      { status: 500 }
    );
  }
}

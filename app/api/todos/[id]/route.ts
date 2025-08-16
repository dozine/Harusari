import { calculateAchievement } from "@/utils/achievement";
import { verifyTokenServer } from "@/utils/auth";
import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
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
    const body = await request.json();
    const { title, isCompleted, description } = body;

    // 업데이트할 데이터만 포함
    const updateData: any = {
      updatedAt: new Date(),
    };

    if (title !== undefined) {
      if (typeof title !== "string" || title.trim() === "") {
        return NextResponse.json(
          { message: "Title must be a non-empty string" },
          { status: 400 }
        );
      }
      updateData.title = title.trim();
    }

    if (isCompleted !== undefined) {
      if (typeof isCompleted !== "boolean") {
        return NextResponse.json(
          { message: "isCompleted must be a boolean" },
          { status: 400 }
        );
      }
      updateData.isCompleted = isCompleted;
    }

    if (description !== undefined) {
      updateData.description = description;
    }

    const originalTodo = await prisma.task.findUnique({
      where: {
        id: params.id,
        userId: userId,
      },
      select: {
        date: true,
      },
    });

    if (!originalTodo) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }

    await calculateAchievement(userId, originalTodo.date);
    const updatedTodo = await prisma.task.update({
      where: {
        id: params.id,
        userId: userId,
      },
      data: updateData,
    });

    return NextResponse.json(updatedTodo, { status: 200 });
  } catch (error) {
    console.error("Error updating todo:", error);

    //

    return NextResponse.json(
      { message: "Failed to update todo" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
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
    const todoToDelete = await prisma.task.findUnique({
      where: {
        id: params.id,
        userId: userId,
      },
      select: {
        date: true,
      },
    });

    if (!todoToDelete) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }
    await prisma.task.delete({
      where: {
        id: params.id,
        userId: userId,
      },
    });
    await calculateAchievement(userId, todoToDelete.date);

    return NextResponse.json(
      { message: "Todo deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting todo:", error);

    return NextResponse.json(
      { message: "Failed to delete todo" },
      { status: 500 }
    );
  }
}

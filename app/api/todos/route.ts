import { verifyTokenServer } from "@/utils/auth";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const todos = await prisma.task.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    return NextResponse.json(
      { message: "Failed to fetch todos" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const userPayload = await verifyTokenServer();
    if (!userPayload) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      );
    }
    const userId = userPayload.userId;

    const { title } = await request.json();
    if (!title || typeof title !== "string" || title.trim() === "") {
      return NextResponse.json(
        { message: "Title is required and must be a non-empty string" },
        { status: 400 }
      );
    }
    const newTodo = await prisma.task.create({
      data: {
        userId: userId,
        title: title.trim(),
        isCompleted: false,
      },
    });
    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    console.error("Error createing todo : ", error);
    return NextResponse.json(
      { message: "Failed to create todo" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function PATCH(request: Request) {
  try {
    const userPayload = await verifyTokenServer();
    if (!userPayload) {
      return NextResponse.json(
        { message: "Authentication requeired" },
        { status: 401 }
      );
    }
    const userId = userPayload.userId;
    const { id, title, isCompleted } = await request.json();
    if (!id || typeof id != "string") {
      return NextResponse.json(
        { message: " Todo Id is required" },
        { status: 400 }
      );
    }
    const updateData: { title?: string; isCompleted?: boolean } = {};
    if (title !== undefined && typeof title === "string") {
      updateData.title = title.trim();
    }
    if (isCompleted != undefined && typeof isCompleted === "boolean") {
      updateData.isCompleted = isCompleted;
    }
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { message: "No valid fields provided for update" },
        { status: 400 }
      );
    }
    const updatedTodo = await prisma.task.update({
      where: {
        id: id,
        userId: userId,
      },
      data: updateData,
    });
    return NextResponse.json(updatedTodo);
  } catch (error) {
    console.error("Error updateing todo:", error);
    return NextResponse.json(
      { message: "Failed to update or todo not found" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(request: Request) {
  try {
    const userPayload = await verifyTokenServer();
    if (!userPayload) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      );
    }
    const userId = userPayload.userId;

    const { id } = await request.json();
    if (!id || typeof id != "string") {
      return NextResponse.json(
        { message: "Todo ID is required " },
        { status: 400 }
      );
    }
    await prisma.task.delete({
      where: {
        id: id,
        userId: userId,
      },
    });
    return NextResponse.json(
      { message: " Todo deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting todo:", error);
    return NextResponse.json(
      { message: " Failed to delete todo or todo not found " },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

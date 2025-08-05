// import { verifyTokenServer } from "@/utils/auth";
// import prisma from "@/utils/prisma";
// import { NextResponse } from "next/server";

// export async function GET(
//   request: Request,
//   { params }: { params: { date: string } }
// ) {
//   try {
//     const user = await verifyTokenServer();
//     if (!user) {
//       return NextResponse.json(
//         { message: "Authentication required" },
//         { status: 401 }
//       );
//     }
//     const userId = user.userId;
//     const date = params.date;

//     const moodEntry = await prisma.moodEntry.findUnique({
//       where: {
//         userId_date: {
//           userId,
//           date: new Date(date),
//         },
//       },
//     });

//     if (!moodEntry) {
//       return NextResponse.json(
//         { message: "Mood entry not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(moodEntry);
//   } catch (error) {
//     console.error("Error fetching mood entry:", error);
//     return NextResponse.json(
//       { message: "Failed to fetch mood entry" },
//       { status: 500 }
//     );
//   }
// }

// // 특정 날짜의 감정 기록을 업데이트하는 PATCH 핸들러
// export async function PATCH(
//   request: Request,
//   { params }: { params: { date: string } }
// ) {
//   try {
//     const user = await verifyTokenServer();
//     if (!user) {
//       return NextResponse.json(
//         { message: "Authentication required" },
//         { status: 401 }
//       );
//     }
//     const userId = user.userId;
//     const date = params.date;
//     const { mood } = await request.json();

//     const updatedMoodEntry = await prisma.moodEntry.update({
//       where: {
//         userId_date: {
//           userId,
//           date: new Date(date),
//         },
//       },
//       data: {
//         mood,
//       },
//     });

//     return NextResponse.json(updatedMoodEntry);
//   } catch (error) {
//     console.error("Error updating mood entry:", error);
//     return NextResponse.json(
//       { message: "Failed to update mood entry" },
//       { status: 500 }
//     );
//   }
// }

// // 특정 날짜의 감정 기록을 삭제하는 DELETE 핸들러
// export async function DELETE(
//   request: Request,
//   { params }: { params: { date: string } }
// ) {
//   try {
//     const user = await verifyTokenServer();
//     if (!user) {
//       return NextResponse.json(
//         { message: "Authentication required" },
//         { status: 401 }
//       );
//     }
//     const userId = user.userId;
//     const date = params.date;

//     await prisma.moodEntry.delete({
//       where: {
//         userId_date: {
//           userId,
//           date: new Date(date),
//         },
//       },
//     });

//     return NextResponse.json(
//       { message: "Mood entry deleted successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error deleting mood entry:", error);
//     return NextResponse.json(
//       { message: "Failed to delete mood entry" },
//       { status: 500 }
//     );
//   }
// }

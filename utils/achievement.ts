import prisma from "./prisma";

export const calculateAchievement = async (userId: string, date: Date) => {
  const dateStr = date.toISOString().split("T")[0];
  const startOfDay = new Date(dateStr + "T00:00:00.000Z");
  const endOfDay = new Date(dateStr + "T23:59:59.999Z");

  const todos = await prisma.task.findMany({
    where: {
      userId: userId,
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
  });

  const totalTasks = todos.length;
  const completedTasks = todos.filter((todo) => todo.isCompleted).length;

  const completionRate =
    totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const result = await prisma.achievement.upsert({
    where: {
      userId_date: {
        userId: userId,
        date: date,
      },
    },
    update: {
      completionRate: completionRate,
      totalTasks: totalTasks,
      completedTasks: completedTasks,
    },
    create: {
      userId: userId,
      date: date,
      completionRate: completionRate,
      totalTasks: totalTasks,
      completedTasks: completedTasks,
    },
  });
  return result;
};

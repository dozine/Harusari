import prisma from "./prisma";

export const calculateAchievement = async (userId: string, date: Date) => {
  const todos = await prisma.task.findMany({
    where: {
      userId: userId,
      date: date,
    },
  });

  const totalTasks = todos.length;
  const completedTasks = todos.filter((todo) => todo.isCompleted).length;

  const completionRate =
    totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  await prisma.achievement.upsert({
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
};

export interface Achievement {
  id: string;
  userId: string;
  date: string | Date;
  completionRate: number;
  totalTasks: number;
  completedTasks: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface DailyAchievementData {
  date: string;
  completionRate: number;
}

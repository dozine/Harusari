export interface DailyLog {
  id: string;
  userId: string;
  date: string;
  content: string | null;
  mood: string | null;
  moodComment: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDailyLogRequest {
  date: string;
  content: string;
  mood?: string | null;
  moodComment?: string | null;
}

export interface UpdateDailyLogRequest {
  content?: string;
  mood?: string | null;
  moodComment?: string | null;
}

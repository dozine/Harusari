export interface MoodEntry {
  id: string;
  userId: string;
  date: string;
  mood: string;
  createdAt: string;
  updatedAt: string;
}

export interface MoodEntryRequest {
  date: string;
  mood: string;
}

export interface UpdateMoodEntryVariables {
  date: string;
  mood: string;
}

export interface ApiError {
  message: string;
}

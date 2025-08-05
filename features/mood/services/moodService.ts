import instance from "@/utils/axios";
import { MoodEntry } from "@prisma/client";
import { MoodEntryRequest, UpdateMoodEntryVariables } from "../types";

const API_BASE_URL = "/mood";

export const getMoodEntries = async (): Promise<MoodEntry[]> => {
  const response = await instance.get<MoodEntry[]>(API_BASE_URL);
  return response.data;
};

export const getMoodEntryByDate = async (date: string): Promise<MoodEntry> => {
  const response = await instance.get<MoodEntry>(`${API_BASE_URL}/${date}`);
  return response.data;
};

export const createMoodEntry = async (
  data: MoodEntryRequest
): Promise<MoodEntry> => {
  const response = await instance.post<MoodEntry>(API_BASE_URL, data);
  return response.data;
};

export const updateMoodEntry = async (
  data: UpdateMoodEntryVariables
): Promise<MoodEntry> => {
  const response = await instance.patch<MoodEntry>(
    `${API_BASE_URL}/${data.date}`,
    {
      mood: data.mood,
    }
  );
  return response.data;
};

export const deleteMoodEntry = async (date: string): Promise<void> => {
  await instance.delete(`${API_BASE_URL}/${date}`);
};

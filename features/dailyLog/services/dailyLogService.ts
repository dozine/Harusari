import instance from "@/utils/axios";
import { DailyLog } from "../types";

export const getDailyLog = async (): Promise<DailyLog[]> => {
  const response = await instance.get<DailyLog[]>("/dailylog");
  return response.data;
};

export const getDailyLogByDate = async (date: string): Promise<DailyLog> => {
  const response = await instance.get<DailyLog>(`/dailylog/${date}`);
  return response.data;
};

export const createDailyLog = async (data: {
  date: string;
  content: string;
}): Promise<DailyLog> => {
  const response = await instance.post<DailyLog>("/dailylog", data);
  return response.data;
};

export const updateDailyLog = async (
  date: string,
  content: string
): Promise<DailyLog> => {
  const response = await instance.patch<DailyLog>(`/dailylog/${date}`, {
    content,
  });
  return response.data;
};

export const deleteDailyLog = async (date: string): Promise<void> => {
  await instance.delete(`/dailylog/${date}`);
};

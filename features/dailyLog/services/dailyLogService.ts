import instance from "@/utils/axios";
import {
  CreateDailyLogRequest,
  DailyLog,
  UpdateDailyLogRequest,
} from "../types";

export const getDailyLog = async (): Promise<DailyLog[]> => {
  const response = await instance.get<DailyLog[]>("/dailylog");
  return response.data;
};

export const getDailyLogByDate = async (date: string): Promise<DailyLog> => {
  const response = await instance.get<DailyLog>(`/dailylog/${date}`);
  return response.data;
};

export const createDailyLog = async (
  data: CreateDailyLogRequest
): Promise<DailyLog> => {
  const response = await instance.post<DailyLog>("/dailylog", data);
  return response.data;
};

export const updateDailyLog = async (
  date: string,
  data: UpdateDailyLogRequest
): Promise<DailyLog> => {
  const response = await instance.patch<DailyLog>(`/dailylog/${date}`, data);
  return response.data;
};

export const deleteDailyLog = async (date: string): Promise<void> => {
  await instance.delete(`/dailylog/${date}`);
};

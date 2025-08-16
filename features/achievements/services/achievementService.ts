import instance from "@/utils/axios";
import { Achievement } from "../types";

export const getAchievements = async (
  startDate: string,
  endDate: string
): Promise<Achievement[]> => {
  const response = await instance.get<Achievement[]>("/achievement", {
    params: { startDate, endDate },
  });
  return response.data;
};

export const getAchievementByDate = async (
  date: string
): Promise<Achievement[]> => {
  const response = await instance.get<Achievement[]>(`/achievement/${date}`);
  return response.data;
};

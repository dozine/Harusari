import instance from "@/utils/axios";
import { Weather } from "../types";

export const getTodayWeather = async (): Promise<Weather> => {
  const response = await instance.get<Weather>("/weather");
  return response.data;
};

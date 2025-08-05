import instance from "@/utils/axios";
import { Quote } from "../types";

export const getTodayQuote = async (): Promise<Quote> => {
  const response = await instance.get<Quote>("/quote");
  return response.data;
};

"use client";

import { useQuery } from "@tanstack/react-query";
import { Achievement } from "../types";
import { getAchievementByDate } from "../services/achievementService";

export function useAchievements(date: string) {
  const {
    data: achievements = [],
    isLoading,
    error,
  } = useQuery<Achievement[]>({
    queryKey: ["achievements", date],
    queryFn: () => getAchievementByDate(date),
    enabled: !!date,
  });

  return { achievements, isLoading, error };
}

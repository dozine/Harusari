"use client";

import { useQuery } from "@tanstack/react-query";
import { getAchievements } from "../services/achievementService";
import { Achievement } from "../types";

export function useAchievements(startDate: string, endDate: string) {
  const {
    data: achievements = [],
    isLoading,
    error,
  } = useQuery<Achievement[]>({
    queryKey: ["achievements", startDate, endDate],
    queryFn: () => getAchievements(startDate, endDate),
    enabled: !!startDate && !!endDate,
    staleTime: 1000 * 60 * 60 * 6,
  });

  return { achievements, isLoading, error };
}

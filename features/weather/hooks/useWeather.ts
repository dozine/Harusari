"use client";

import { useQuery } from "@tanstack/react-query";
import { getTodayWeather } from "../services/weatherService";

export default function useWeather() {
  const {
    data: weather,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["weather"],
    queryFn: getTodayWeather,
  });
  return { weather, isLoading, error };
}

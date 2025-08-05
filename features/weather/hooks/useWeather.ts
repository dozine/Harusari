"use client";

import { useEffect, useState } from "react";
import { Weather } from "../types";
import { getTodayWeather } from "../services/weatherService";

export default function useWeather() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setIsLoading(true);
        const data = await getTodayWeather();
        setWeather(data);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch weather data")
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchWeather();
  }, []);

  return { weather, isLoading, error };
}

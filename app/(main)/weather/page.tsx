"use client";

import WeatherCard from "@/features/weather/components/WeatherCard";
import useWeather from "@/features/weather/hooks/useWeather";

export default function WeatherPage() {
  const { weather, isLoading, error } = useWeather();

  if (isLoading) {
    return <div>날씨 정보 불러오는 중...</div>;
  }

  if (error) {
    return <div>오류 발생: {error.message} </div>;
  }
  return (
    <div className="flex justify-center items-center">
      {weather && <WeatherCard weather={weather} />}
    </div>
  );
}

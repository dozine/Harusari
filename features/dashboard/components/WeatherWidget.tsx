"use client";

import useWeather from "@/features/weather/hooks/useWeather";
import {
  IoCloudyNightOutline,
  IoCloudyOutline,
  IoRainyOutline,
  IoSnowOutline,
  IoSunnyOutline,
} from "react-icons/io5";

const getWeatherIcon = (condition: string, isDay: boolean) => {
  const iconClass = "w-16 h-16 text-gray-800";
  const normalizedCondition = condition.toLowerCase();

  if (
    normalizedCondition.includes("맑음") ||
    normalizedCondition.includes("clear")
  ) {
    return isDay ? (
      <IoSunnyOutline className={iconClass} />
    ) : (
      <IoCloudyNightOutline className={iconClass} />
    );
  }
  if (
    normalizedCondition.includes("흐림") ||
    normalizedCondition.includes("cloud")
  ) {
    return isDay ? (
      <IoCloudyOutline className={iconClass} />
    ) : (
      <IoCloudyNightOutline className={iconClass} />
    );
  }
  if (
    normalizedCondition.includes("비") ||
    normalizedCondition.includes("rain")
  ) {
    return <IoRainyOutline className={iconClass} />;
  }
  if (
    normalizedCondition.includes("눈") ||
    normalizedCondition.includes("snow")
  ) {
    return <IoSnowOutline className={iconClass} />;
  }
  // 기본값
  return <IoSunnyOutline className={iconClass} />;
};

export default function WeatherWidget() {
  const { weather, isLoading, error } = useWeather();

  if (isLoading) {
    return <div>날씨 정보를 가져오는 중...</div>;
  }

  if (error) {
    return <div>날씨 정보를 가져오는 데 실패 했습니다.</div>;
  }

  const now = new Date().getHours();
  const isDay = now >= 6 && now <= 18;
  return (
    <div className="rounded-3xl p-6 flex flex-col justify-between h-full bg-gray-200 ">
      <div className="flex items-center justify-start mb-4">
        <h3 className="text-xl text-gray-800">Weather</h3>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex items-center space-x-4">
          {weather && getWeatherIcon(weather.condition, isDay)}
        </div>

        <span className="text-3xl font-bold text-gray-800">
          {weather?.temperature.toFixed(1)}°C
        </span>

        <span className="text-sm text-gray-500">Seoul</span>
      </div>
    </div>
  );
}

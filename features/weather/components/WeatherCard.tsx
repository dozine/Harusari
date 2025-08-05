"use client";

import { Weather } from "../types";

interface WeatherCardProps {
  weather: Weather;
}

export default function WeatherCard({ weather }: WeatherCardProps) {
  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  return (
    <div className="p-6 bg-white">
      <div className="p-6 rounded-lg ">
        <h2>오늘의 날씨 ({weather.location})</h2>
        <p>{weather.temperature}°C</p>
      </div>
      <div>
        <p>
          상태 :<span> {weather.condition}</span>
        </p>
        <p>
          습도 :<span> {weather.humidity}</span>
        </p>
        <p>
          풍속 :<span> {weather.windSpeed}</span>
        </p>
      </div>
      <p>최신 업데이트 : {formatTime(weather.lastUpdated)}</p>
    </div>
  );
}

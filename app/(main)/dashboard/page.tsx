"use client";

import DailyAchievement from "@/features/achievements/components/DailyAchievement";
import WeeklyAchievement from "@/features/achievements/components/WeeklyAchievement";
import DailyLogWidget from "@/features/dashboard/components/DailyLogWidget";
import MoodWidget from "@/features/dashboard/components/MoodWidget";
import QuoteWidget from "@/features/dashboard/components/QuoteWidget";
import TodoListWidget from "@/features/dashboard/components/TodoListWidget";
import WeatherWidget from "@/features/dashboard/components/WeatherWidget";
import MonthlyAchievement from "@/features/achievements/components/MonthlyAchievement";

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:grid-rows-3 gap-4 h-full md:overflow-hidden">
      <div className="col-span-1 sm:col-span-2 md:col-span-2 ">
        <QuoteWidget />
      </div>

      <div className="col-span-1 sm:col-span-1 md:col-span-1 ">
        <WeatherWidget />
      </div>

      <div className="col-span-1 sm:col-span-1 md:col-span-1">
        <MoodWidget />
      </div>

      <div className="col-span-1 sm:col-span-1 sm:row-span-2 md:col-span-1 md:row-span-2 flex flex-col gap-4">
        <TodoListWidget />
      </div>

      {/* DailyAchievement + DailyLogWidget 섹션 - 최소 높이 추가 */}
      <div className="col-span-1 sm:col-span-1 sm:row-span-2 md:col-span-1 md:row-span-2 flex flex-col gap-4 min-h-[400px] sm:min-h-[300px]">
        <div className="flex-1 min-h-[100px]">
          <DailyAchievement />
        </div>
        <div className="flex-1 min-h-[100px]">
          <DailyLogWidget />
        </div>
      </div>

      {/* MonthlyAchievement + WeeklyAchievement 섹션 - 최소 높이 추가 */}
      <div className="col-span-1 sm:col-span-2 md:col-span-2 md:row-span-2 flex flex-col gap-4 min-h-[400px] sm:min-h-[300px]">
        <div className="flex-1 min-h-[100px]">
          <MonthlyAchievement />
        </div>
        <div className="flex-1 min-h-[100px]">
          <WeeklyAchievement />
        </div>
      </div>
    </div>
  );
}

"use client";

import DailyAchievement from "@/features/achievements/components/DailyAchievement";
import WeeklyAchievement from "@/features/achievements/components/WeeklyAchievement";
import DailyLogWidget from "@/features/dashboard/components/DailyLogWidget";
import MoodWidget from "@/features/dashboard/components/MoodWidget";
import QuoteWidget from "@/features/dashboard/components/QuoteWidget";
import TodoListWidget from "@/features/dashboard/components/TodoListWidget";
import WeatherWidget from "@/features/dashboard/components/WeatherWidget";
import MonthlyAchievement from "@/features/achievements/components/MonthlyAchievement";
import dynamic from "next/dynamic";

const DynamicQuoteWidget = dynamic(
  () => import("@/features/dashboard/components/QuoteWidget"),
  {
    loading: () => (
      <div className="bg-gray-100 rounded-2xl shadow p-4 flex justify-center items-center h-full">
        Quote 로딩 중...
      </div>
    ),
  }
);

const DynamicWeatherWidget = dynamic(
  () => import("@/features/dashboard/components/WeatherWidget"),
  {
    loading: () => (
      <div className="bg-gray-100 rounded-2xl shadow p-4 flex justify-center items-center h-full">
        날씨 로딩 중...
      </div>
    ),
  }
);

const DynamicMoodWidget = dynamic(
  () => import("@/features/dashboard/components/MoodWidget"),
  {
    loading: () => (
      <div className="bg-gray-100 rounded-2xl shadow p-4 flex justify-center items-center h-full">
        기분 로딩 중...
      </div>
    ),
  }
);

const DynamicTodoListWidget = dynamic(
  () => import("@/features/dashboard/components/TodoListWidget"),
  {
    loading: () => (
      <div className="bg-gray-100 rounded-2xl shadow p-4 flex justify-center items-center h-full">
        Todo 로딩 중...
      </div>
    ),
  }
);

const DynamicDailyAchievement = dynamic(
  () => import("@/features/achievements/components/DailyAchievement"),
  {
    loading: () => (
      <div className="bg-gray-100 rounded-2xl shadow p-4 flex justify-center items-center h-full">
        일간 성취도 로딩 중...
      </div>
    ),
  }
);

const DynamicDailyLogWidget = dynamic(
  () => import("@/features/dashboard/components/DailyLogWidget"),
  {
    loading: () => (
      <div className="bg-gray-100 rounded-2xl shadow p-4 flex justify-center items-center h-full">
        일일 기록 로딩 중...
      </div>
    ),
  }
);

// 차트 라이브러리(recharts)를 사용하는 위젯은 ssr: false를 고려할 수 있습니다.
const DynamicMonthlyAchievement = dynamic(
  () => import("@/features/achievements/components/MonthlyAchievement"),
  {
    loading: () => (
      <div className="bg-gray-100 rounded-2xl shadow p-4 flex justify-center items-center h-full">
        월간 성취도 로딩 중...
      </div>
    ),
    ssr: false,
  }
);

const DynamicWeeklyAchievement = dynamic(
  () => import("@/features/achievements/components/WeeklyAchievement"),
  {
    loading: () => (
      <div className="bg-gray-100 rounded-2xl shadow p-4 flex justify-center items-center h-full">
        주간 성취도 로딩 중...
      </div>
    ),
    ssr: false,
  }
);

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:grid-rows-3 gap-4 h-full md:overflow-hidden">
      <div className="col-span-1 sm:col-span-2 md:col-span-2 ">
        <DynamicQuoteWidget />
      </div>

      <div className="col-span-1 sm:col-span-1 md:col-span-1 ">
        <DynamicWeatherWidget />
      </div>

      <div className="col-span-1 sm:col-span-1 md:col-span-1">
        <DynamicMoodWidget />
      </div>

      <div className="col-span-1 sm:col-span-1 sm:row-span-2 md:col-span-1 md:row-span-2 flex flex-col gap-4">
        <DynamicTodoListWidget />
      </div>

      <div className="col-span-1 sm:col-span-1 sm:row-span-2 md:col-span-1 md:row-span-2 flex flex-col gap-4 min-h-[400px] sm:min-h-[300px]">
        <div className="flex-1 min-h-[100px]">
          <DynamicDailyAchievement />
        </div>
        <div className="flex-1 min-h-[100px]">
          <DynamicDailyLogWidget />
        </div>
      </div>

      <div className="col-span-1 sm:col-span-2 md:col-span-2 md:row-span-2 flex flex-col gap-4 min-h-[400px] sm:min-h-[300px]">
        <div className="flex-1 min-h-[100px]">
          <DynamicMonthlyAchievement />
        </div>
        <div className="flex-1 min-h-[100px]">
          <DynamicWeeklyAchievement />
        </div>
      </div>
    </div>
  );
}

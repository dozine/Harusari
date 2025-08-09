"use client";

import React, { useMemo, memo } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { useAchievements } from "../hooks/useAchievements";
import "./heatmap-custom.css";

interface Achievement {
  id: string;
  userId: string;
  date: Date | string;
  completionRate: number;
  totalTasks: number;
  completedTasks: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

type HeatmapValueType = {
  date: string;
  count: number;
  [key: string]: any;
};

const getDatesForLastMonth = (month = 3) => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setMonth(endDate.getMonth() - month);
  return { startDate, endDate };
};

export default memo(AchievementHeatmap);

function AchievementHeatmap() {
  const { startDate, endDate } = useMemo(() => getDatesForLastMonth(3), []);
  const {
    achievements = [],
    isLoading,
    error,
  } = useAchievements(
    startDate.toISOString().slice(0, 10),
    endDate.toISOString().slice(0, 10)
  );

  // 데이터 변환
  const values: HeatmapValueType[] = useMemo(() => {
    if (!achievements || achievements.length === 0) {
      return [];
    }

    return achievements.map((item: Achievement) => {
      // 날짜를 YYYY-MM-DD 형식의 문자열로 변환
      let dateStr: string;
      if (typeof item.date === "string") {
        dateStr = item.date.includes("T")
          ? item.date.split("T")[0]
          : item.date.slice(0, 10);
      } else {
        dateStr = new Date(item.date).toISOString().split("T")[0];
      }

      return {
        date: dateStr,
        count: item.completionRate,
        completionRate: item.completionRate,
      };
    });
  }, [achievements]);

  const averageCompletionRate = useMemo(() => {
    if (!values.length) return 0;
    const now = new Date();
    const thisMonthValues = values.filter((v) => {
      const dateObj = new Date(v.date);
      return (
        dateObj.getFullYear() === now.getFullYear() &&
        dateObj.getMonth() === now.getMonth()
      );
    });
    if (!thisMonthValues.length) return 0;
    const total = thisMonthValues.reduce(
      (sum, v) => sum + (v.completionRate || 0),
      0
    );
    return Math.round(total / thisMonthValues.length);
  }, [values]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6 flex justify-center items-center h-80">
        <p className="text-gray-500">데이터를 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6 flex flex-col justify-center items-center h-80">
        <p className="text-red-500">데이터를 불러오는 데 실패했습니다.</p>
        <span className="text-sm text-gray-500 mt-2">
          API 서버를 확인해 주세요.
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-gray-200 rounded-3xl h-full p-6">
      <div className="flex items-center justify-start">
        <p className="text-xl text-gray-800">Monthly Achievements</p>
      </div>
      <div className="flex flex-1  justify-between">
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="flex aspect-square rounded-full border border-orange-500 justify-center items-center p-5">
            <div className="text-2xl font-bold text-orange-500">
              {averageCompletionRate}%
            </div>
          </div>
        </div>
        <div className="flex flex-1 overflow-x-auto h-full overflow-hidden min-h-0 justify-center items-center">
          <CalendarHeatmap
            startDate={startDate}
            endDate={endDate}
            values={values}
            classForValue={(value) => {
              if (!value || value.count === undefined || value.count === null) {
                return "color-empty";
              }

              const rate =
                (value as HeatmapValueType).completionRate || value.count;
              if (rate === 0) return "color-scale-0";
              if (rate > 0 && rate <= 25) return "color-scale-1";
              if (rate > 25 && rate <= 50) return "color-scale-2";
              if (rate > 50 && rate <= 75) return "color-scale-3";
              if (rate > 75) return "color-scale-4";
              return "color-empty";
            }}
            showWeekdayLabels={true}
            tooltipDataAttrs={(value) => {
              if (!value) return {} as CalendarHeatmap.TooltipDataAttrs;

              const typedValue = value as HeatmapValueType;
              const completionRate =
                typedValue.completionRate || typedValue.count;

              return {
                "data-tip": `${typedValue.date}: ${completionRate}% 달성`,
              } as CalendarHeatmap.TooltipDataAttrs;
            }}
          />
        </div>
      </div>
    </div>
  );
}

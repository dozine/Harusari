"use client";

import { useMemo } from "react";
import { useAchievements } from "../hooks/useAchievements";
import { DailyAchievementData } from "../types";
import { Achievement } from "@prisma/client";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function WeeklyAchievement() {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 6);

  // const { achievements, isLoading, error } = useAchievements(
  //   startDate.toISOString().slice(0, 10),
  //   endDate.toISOString().slice(0, 10)
  // );
  const achievements = [
    { date: "2025-08-03T00:00:00.000Z", completionRate: 70 },
    { date: "2025-08-04T00:00:00.000Z", completionRate: 85 },
    { date: "2025-08-05T00:00:00.000Z", completionRate: 30 },
    { date: "2025-08-06T00:00:00.000Z", completionRate: 90 },
    { date: "2025-08-07T00:00:00.000Z", completionRate: 33 },
    { date: "2025-08-08T00:00:00.000Z", completionRate: 100 },
    { date: "2025-08-09T00:00:00.000Z", completionRate: 80 },
  ];

  const data = useMemo(() => {
    return achievements
      .map((item) => ({
        date:
          typeof item.date === "string"
            ? item.date.slice(5, 10)
            : new Date(item.date).toISOString().slice(5, 10),
        completionRate: Math.round(item.completionRate),
      }))
      .sort((a, b) => (a.date > b.date ? 1 : -1));
  }, [achievements]);

  const renderCustomizedLabel = (props: any) => {
    const { x, y, value } = props;
    return (
      <text
        x={x}
        y={y - 15} // 너무 높이 띄우지 않기
        fill="#ff7f50"
        fontWeight="bold"
        fontSize={12}
        textAnchor="middle"
      >
        {`${value}%`}
      </text>
    );
  };

  // if (isLoading) {
  //   return (
  //     <div className="bg-white rounded-2xl shadow p-4 flex justify-center items-center h-64">
  //       로딩 중...
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="bg-white rounded-2xl shadow p-4 flex justify-center items-center h-64 text-red-500">
  //       데이터 불러오기 실패
  //     </div>
  //   );
  // }

  return (
    <div className="bg-gray-200 rounded-3xl p-4 h-full flex flex-col">
      <h3 className="flex flex-1 text-md text-gray-900">Weekly Chart</h3>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 30, right: 20, left: 20, bottom: 20 }}
          >
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            {/* <XAxis dataKey="date" /> */}
            {/* <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} /> */}
            <Tooltip formatter={(value) => `${value}%`} />
            <Line
              type="monotone"
              dataKey="completionRate"
              stroke="#ff7f50"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
              label={renderCustomizedLabel}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

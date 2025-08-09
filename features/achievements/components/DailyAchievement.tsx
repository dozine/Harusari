"use client";

import React from "react";
import { useAchievements } from "../hooks/useAchievementByDate";
import { FaClipboardList } from "react-icons/fa";

const today = new Date().toISOString().slice(0, 10);

export default function DailyAchievement() {
  const { achievements, isLoading, error } = useAchievements(today);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6 flex flex-col justify-center items-center h-full">
        <p className="text-gray-500">데이터를 가져오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6 flex flex-col justify-center items-center h-full">
        <p className="text-red-500">데이터를 가져오는 데 실패했습니다.</p>
      </div>
    );
  }

  const achievement =
    achievements && achievements.length > 0 ? achievements[0] : null;
  const completionPercentage = achievement?.completionRate ?? 0;
  const completedCount = achievement?.completedTasks ?? 0;
  const totalCount = achievement?.totalTasks ?? 0;

  return (
    <div className="bg-gray-200 rounded-3xl p-6 flex flex-col h-full justify-center">
      <div className="flex items-center justify-between">
        <h3 className="text-xl  text-gray-800">Achievement</h3>
      </div>

      <div className="flex flex-col items-center flex-grow justify-center text-center">
        {achievement ? (
          <>
            <div className="relative">
              <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center mb-4">
                <span className="text-3xl font-bold text-orange-500 ">
                  {completionPercentage.toFixed(1)}%
                </span>
              </div>
            </div>
            <p className="text-lg text-gray-600 font-semibold mt-5">
              {completedCount} / {totalCount} clear
            </p>
          </>
        ) : (
          <div className="text-gray-500">
            <FaClipboardList className="w-16 h-16 mb-2 mx-auto" />
            <p className="text-lg">오늘의 할 일이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}

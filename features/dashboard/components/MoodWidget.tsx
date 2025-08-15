// features/dashboard/components/MoodWidget.tsx

"use client";

import { useDailyLog } from "@/features/dailyLog/hooks/hooks";
import Link from "next/link";
import React from "react";

const today = new Date().toISOString().slice(0, 10);

export default function MoodWidget() {
  const { log, isLoading, error } = useDailyLog(today);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6 flex flex-col justify-center items-center h-full">
        <p className="text-gray-500">기분 정보를 가져오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6 flex flex-col justify-center items-center h-full">
        <p className="text-red-500">기분 정보를 가져오는 데 실패했습니다.</p>
      </div>
    );
  }

  if (log && log.mood) {
    return (
      <div className="rounded-3xl h-full flex flex-col justify-between bg-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl text-gray-800">Emotions</h3>
        </div>
        <div className="flex flex-col items-center flex-grow justify-center">
          <div className="text-5xl mb-2">😀</div>
          <p className="text-lg text-gray-600 font-semibold">{log.mood}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-200 rounded-3xl p-6 h-full flex flex-col justify-center items-center">
      <h3 className="text-xl font-bold mb-2">오늘의 기분을 기록해주세요!</h3>
      <p className="text-gray-500 mb-4">오늘 하루는 어떠셨나요?</p>
      <Link
        href="/dailylog"
        className="bg-orange-500 text-white py-2 px-4 rounded-3xl hover:bg-orange-400 transition-colors"
      >
        기록하기
      </Link>
    </div>
  );
}

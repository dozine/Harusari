"use client";

import { useDailyLog } from "@/features/dailyLog/hooks/hooks";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

const today = new Date().toISOString().slice(0, 10);

export default function DailyLogWidget() {
  const { log, isLoading, error } = useDailyLog(today);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6 flex flex-col justify-center items-center h-full">
        <p className="text-gray-500">기록 정보를 가져오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6 flex flex-col justify-center items-center h-full">
        <p className="text-red-500">기록 정보를 가져오는 데 실패했습니다.</p>
      </div>
    );
  }

  if (log && log.content) {
    return (
      <div className="flex flex-col bg-gray-200 rounded-3xl p-4 h-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="flex text-md text-gray-800 justify-start">
            Daily Log
          </h3>
          <Link href={`/dailylog/${today}`}>
            <div className="bg-black rounded-full w-6 h-6 flex items-center justify-center hover:bg-orange-500 transition-colors">
              <FaArrowRight className="text-white -rotate-45" />
            </div>
          </Link>
        </div>
        <p className="text-gray-500 flex-1 overflow-y-auto">{log.content}</p>
        <div className="mt-4 text-right">
          <button className="text-orange-500 hover:text-orange-600 transition-colors"></button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-200 rounded-3xl p-4 h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="flex text-mb text-gray-800 justify-start">Daily Log</h3>
        <Link href={`/dailylog/${today}`}>
          <div className="bg-black rounded-full w-6 h-6 flex items-center justify-center hover:bg-orange-500 transition-colors">
            <FaArrowRight className="text-white -rotate-45" />
          </div>
        </Link>
      </div>

      <p className="text-gray-500 text-sm">
        아직 daily log를 작성하지 않았어요!
      </p>
    </div>
  );
}

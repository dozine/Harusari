"use client";

import { useDailyLog } from "../hooks/hooks";

export default function DailyLogByDate({ date }: { date: string }) {
  const formattedDate = new Date(date).toISOString().split("T")[0];
  const { log, isLoading, error } = useDailyLog(formattedDate);

  if (isLoading) {
    <div>로딩 중</div>;
  }

  if (error) {
    <div>에러가 있습니다. </div>;
  }
  if (!log) {
    return null;
  }

  return (
    <div className="p-6 max-w-xl mx-auto bg-gray-200 rounded-3xl space-y-4 h-40 hover:bg-gray-300 w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-sm font-bold text-gray-900">{date}</h1>
      </div>

      <div className="overflow-hidden whitespace-pre-wrap text-ellipsis text-gray-800 leading-relaxed">
        {log?.date && log?.content && log.content.length > 150
          ? log.content.slice(0, 150) + "..."
          : log?.content || "내용 없음"}
      </div>
    </div>
  );
}

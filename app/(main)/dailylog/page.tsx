"use client";

import { useSearchParams, useRouter } from "next/navigation";
import DailyLogEditor from "@/features/dailyLog/components/DailyLogEditor";
import DailyLogList from "@/features/dailyLog/components/DailyLogList";
import { useDailyLog } from "@/features/dailyLog/hooks/hooks";

export default function DailyLogPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const today = new Date().toISOString().slice(0, 10);
  const selectedDate = searchParams.get("date") || today;

  const { data: logData } = useDailyLog(selectedDate);
  const initialContent = logData?.content || "";
  const isEditMode = !!logData;

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    // URL 쿼리 파라미터를 변경하여 selectedDate 업데이트
    router.push(`/dailylog?date=${newDate}`);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">📘 일일 기록</h1>

      <div className="flex items-center gap-2 mb-4">
        <label htmlFor="date">날짜 선택:</label>
        <input
          id="date"
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="border rounded px-2 py-1"
        />
      </div>

      <DailyLogEditor
        date={selectedDate}
        initialContent={initialContent}
        isEditMode={isEditMode}
      />

      <hr className="my-6" />

      <h2 className="text-xl font-semibold mb-2">📅 지난 기록들</h2>
      <DailyLogList />
    </div>
  );
}

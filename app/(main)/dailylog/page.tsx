"use client";
import DailyLogEditor from "@/features/dailyLog/components/DailyLogEditor";
import DailyLogList from "@/features/dailyLog/components/DailyLogList";
import { useDailyLog } from "@/features/dailyLog/hooks/hooks";
import { useSearchParams } from "next/navigation";

export default function DailyLogPage() {
  const searchParams = useSearchParams();
  const date =
    searchParams.get("date") || new Date().toISOString().slice(0, 10);

  const { log, isLoading, error } = useDailyLog(date);

  if (isLoading) return <div>로딩 중...</div>;

  const isEditMode = !!log;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">{date} 일기</h1>

      <DailyLogEditor
        date={date}
        initialContent={log?.content || ""}
        initialMood={log?.mood || null}
        initialMoodComment={log?.moodComment || null}
        isEditMode={isEditMode}
      />
      <hr className="my-6" />
      <h2 className="text-xl font-semibold mb-2">지난 기록들 </h2>
      <DailyLogList />
    </div>
  );
}

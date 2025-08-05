"use client";
import { useRouter } from "next/navigation";
import { useDailyLogs } from "../hooks/hooks";

const moodEmojis: Record<string, string> = {
  very_happy: "😃",
  happy: "🙂",
  neutral: "😐",
  sad: "🙁",
  very_sad: "😭",
};

export default function DailyLogList() {
  const { data, isLoading, error } = useDailyLogs();
  const router = useRouter();

  if (isLoading) return <div>로딩 중 ...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  const handleSelectDate = (date: string) => {
    router.push(`/dailylog?date=${date}`);
  };

  return (
    <div className="flex flex-col gap-4">
      {data?.map((log) => (
        <li key={log.date}>
          <button
            onClick={() => handleSelectDate(log.date.slice(0, 10))}
            className="text-left w-full p-3 rounded hover:bg-gray-100 border transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="font-medium">{log.date.slice(0, 10)}</p>
              {log.mood && (
                <span className="text-xl">{moodEmojis[log.mood] || "😐"}</span>
              )}
            </div>

            {log.moodComment && (
              <p className="text-xs text-blue-600 mb-1 italic">
                "{log.moodComment}"
              </p>
            )}

            <p className="text-sm truncate text-gray-600">
              {log.content || "내용 없음"}
            </p>
          </button>
        </li>
      ))}
    </div>
  );
}

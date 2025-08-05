"use client";
import { useRouter } from "next/navigation";
import { useDailyLogs } from "../hooks/hooks";

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
            className="text-left w-full p-2 rounded hover:bg-gray-100 border"
          >
            <p className="font-medium">{log.date.slice(0, 10)}</p>
            <p className="text-sm truncate text-gray-600">{log.content}</p>
          </button>
        </li>
      ))}
    </div>
  );
}

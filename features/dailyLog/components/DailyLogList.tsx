"use client";
import { useDailyLogs } from "../hooks/hooks";
import { DailyLog } from "../types";
import DailyLogByDate from "./DailyLogByDate";
import Link from "next/link";

const moodEmojis: Record<string, string> = {
  very_happy: "😃",
  happy: "🙂",
  neutral: "😐",
  sad: "🙁",
  very_sad: "😭",
};

export default function DailyLogList() {
  const { data: dailyLogs, isLoading, error } = useDailyLogs();
  if (isLoading) return <div>로딩 중 ...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;

  return (
    <div className="flex flex-col gap-4 w-full">
      {dailyLogs?.map((log: DailyLog) => {
        const date = new Date(log.date).toISOString().split("T")[0];

        return (
          <Link key={date} href={`/dailylog/${date}`}>
            <DailyLogByDate date={date} />
          </Link>
        );
      })}
    </div>
  );
  1;
}

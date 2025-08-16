// components/DateNavigator.tsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useMemo } from "react";

export default function DateNavigator() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dateParam = searchParams.get("date");

  const getFormattedDate = (daysAgo: number) => {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    return d.toISOString().split("T")[0];
  };

  const today = useMemo(() => getFormattedDate(0), []);
  const date = dateParam || today;

  const changeDate = (newDate: string) => {
    router.push(`/todos?date=${newDate}`);
  };
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeDate(e.target.value);
  };
  const getButtonClass = (buttonDate: string) =>
    `px-4 py-2 rounded-full text-sm font-medium transition-colors ${
      date === buttonDate
        ? "bg-orange-500 text-white"
        : "bg-gray-200 text-gray-500 hover:bg-gray-300"
    }`;

  return (
    <div className="flex items-center space-x-4 mb-4 mt-8">
      <button
        onClick={() => changeDate(getFormattedDate(0))}
        className={getButtonClass(getFormattedDate(0))}
      >
        오늘
      </button>
      <button
        onClick={() => changeDate(getFormattedDate(1))}
        className={getButtonClass(getFormattedDate(1))}
      >
        어제
      </button>
      <button
        onClick={() => changeDate(getFormattedDate(2))}
        className={getButtonClass(getFormattedDate(2))}
      >
        그제
      </button>
      <button
        onClick={() => changeDate(getFormattedDate(3))}
        className={getButtonClass(getFormattedDate(3))}
      >
        그끄제
      </button>
      <div className="relative mx-2">
        <input
          type="date"
          value={date}
          onChange={handleDateChange}
          className="bg-gray-200 text-gray-500 rounded-full text-sm font-medium px-4 py-2 cursor-pointer transition-colors hover:bg-gray-300 focus:outline-none"
        />
      </div>
    </div>
  );
}

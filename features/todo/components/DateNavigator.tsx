"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { memo, useCallback, useMemo } from "react";

const DateNavigator = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dateParam = searchParams.get("date");

  const getFormattedDate = useCallback((daysAgo: number) => {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    return d.toISOString().split("T")[0];
  }, []);

  const today = useMemo(() => getFormattedDate(0), []);
  const date = dateParam || today;

  const changeDate = useCallback(
    (newDate: string) => {
      router.push(`/todos?date=${newDate}`);
    },
    [router]
  );
  const handleDateChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      changeDate(e.target.value);
    },
    [changeDate]
  );
  const getButtonClass = useCallback(
    (buttonDate: string) =>
      `hidden sm:block px-4 py-2 rounded-full text-xs font-medium transition-colors ${
        date === buttonDate
          ? "bg-orange-500 text-white"
          : "bg-gray-200 text-gray-500 hover:bg-gray-300"
      }`,
    [date]
  );

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
          className="bg-gray-200 text-gray-500 rounded-full text-xs font-medium px-4 py-2 cursor-pointer transition-colors hover:bg-gray-300 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default memo(DateNavigator);

"use client";
import Modal from "@/components/ui/Modal";
import DailyLogEditor from "@/features/dailyLog/components/DailyLogEditor";
import DailyLogList from "@/features/dailyLog/components/DailyLogList";
import { useDailyLog } from "@/features/dailyLog/hooks/hooks";
import { CreateDailyLogRequest } from "@/features/dailyLog/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function DailyLogPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const date = searchParams.get("date") || "";

  const { createLog, isLoading, error, isCreating } = useDailyLog(date);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleAddDailyLog = (
    mood: string,
    moodComment: string,
    content: string
  ) => {
    const data: CreateDailyLogRequest = {
      date: new Date().toISOString().slice(0, 10),
      mood: mood,
      moodComment: moodComment,
      content: content,
    };
    createLog(data, {
      onSuccess: () => {
        setIsModalOpen(false);
        router.push(`/dailylog/${data.date}`);
      },
    });
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생</div>;
  return (
    <div className="bg-white h-full flex flex-col items-center">
      <div className="flex w-full justify-start items-center px-4 mb-4">
        <div className="mb-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-3xl mr-4 px-4 py-2"
          >
            Add new
          </button>
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <DailyLogEditor
            date={date}
            onSave={handleAddDailyLog}
            isSaving={isCreating}
          />
        </Modal>
      </div>
      <DailyLogList />
    </div>
  );
}

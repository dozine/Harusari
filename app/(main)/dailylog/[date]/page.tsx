"use client";

import { useDailyLog } from "@/features/dailyLog/hooks/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DailyLogDetailPage({
  params,
}: {
  params: { date: string };
}) {
  const date = params.date;
  const {
    log,
    error,
    isLoading,
    updateLog,
    deleteLog,
    isUpdating,
    isDeleting,
  } = useDailyLog(date);
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editedMood, setEditedMood] = useState(log?.mood || "");
  const [editedContent, setEditedContent] = useState(log?.content || "");

  if (isLoading) {
    return <div>로딩중</div>;
  }
  if (error) {
    return <div>에러 발생 {error.Message}</div>;
  }

  if (!log) {
    return <div>해당 날짜의 기록을 찾을 수 없습니다.</div>;
  }

  const handleEdit = () => {
    setEditedMood(log.mood || "");
    setEditedContent(log.content || "");
    setIsEditing(true);
  };

  const handleSave = () => {
    updateLog(
      { mood: editedMood, content: editedContent },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleRemove = () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      deleteLog(log.date.slice(0, 10));
      router.push("/dailylog");
    }
  };

  return (
    <div className="flex flex-col h-full space-y-4 p-4 relative">
      <div className="flex justify-start">
        <div className="rounded-lg p-2 flex ">
          <button
            onClick={handleEdit}
            className="px-3 py-1 bg-orange-500 text-white rounded-full hover:bg-orange-600 mr-2 text-xs"
          >
            Edit
          </button>
          <button
            onClick={handleRemove}
            disabled={isDeleting}
            className="px-3 py-1 bg-orange-500 text-white rounded-full hover:bg-orange-600 disabled:opacity-50 text-xs"
          >
            {isDeleting ? "삭제중..." : "Delete"}
          </button>
        </div>
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <div className="bg-gray-200 rounded-3xl p-4 text-gray-900">
            <h1 className="font-bold">Today's Mood</h1>
            <input
              type="text"
              value={editedMood}
              onChange={(e) => setEditedMood(e.target.value)}
              className="mt-2 w-full p-2 rounded border-none focus:ring-1 focus:ring-orange-500"
            />
          </div>

          <div className="bg-gray-200 rounded-3xl p-4 text-gray-900">
            <h1 className="font-bold">Today's Log</h1>
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="mt-2 w-full p-2 rounded border-none focus:ring-1 focus:ring-orange-500"
              rows={4}
            />
          </div>

          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              disabled={isUpdating}
              className="px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 disabled:opacity-50"
            >
              {isUpdating ? "저장중..." : "저장"}
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600"
            >
              취소
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-gray-200 rounded-3xl p-4 text-gray-900">
            <h1 className="font-bold">Today's Mood</h1>
            <p className="mt-2 text-sm text-gray-500">
              저의 오늘의 기분은 <b>{log.mood}</b> 입니다.
            </p>
          </div>

          <div className="bg-gray-200 rounded-3xl p-4 text-gray-900">
            <h1 className="font-bold">Today's Log</h1>
            <p className="mt-2 text-sm text-gray-500">{log.content}</p>
          </div>
        </>
      )}
    </div>
  );
}

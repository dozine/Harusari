"use client";

import { useEffect, useState } from "react";
import { useCreateDailyLog, useUpdateDailyLog } from "../hooks/hooks";
import MoodSelector from "@/features/dailyLog/components/moodSelector";

type Props = {
  date: string;
  initialContent?: string;
  initialMood?: string | null;
  initialMoodComment?: string | null;
  isEditMode: boolean;
};

export default function DailyLogEditor({
  date,
  initialContent = "",
  initialMood = null,
  initialMoodComment = "",
  isEditMode,
}: Props) {
  const [content, setContent] = useState(initialContent);
  const [mood, setMood] = useState<string | null>(initialMood);
  const [moodComment, setMoodComment] = useState(initialMoodComment || "");

  const { mutate: createDailyLog } = useCreateDailyLog();
  const { mutate: updateDailyLog } = useUpdateDailyLog();

  useEffect(() => {
    setContent(initialContent);
    setMood(initialMood);
    setMoodComment(initialMoodComment || "");
  }, [initialContent, initialMood, initialMoodComment]);

  const handleSave = () => {
    const logData = {
      content,
      mood,
      moodComment: moodComment.trim() || undefined,
    };
    if (isEditMode) {
      updateDailyLog({ date, data: logData });
    } else {
      createDailyLog({ date, ...logData });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <MoodSelector selectedMood={mood} onSelectMood={setMood} />
      {mood && (
        <div className="bg-gray-50 p-3 rounded-md border">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            이 감정에 대해 더 자세히 써보세요 (선택사항)
          </label>
          <textarea
            className="w-full border rounded p-2 text-sm"
            rows={2}
            value={moodComment}
            onChange={(e) => setMoodComment(e.target.value)}
            placeholder="오늘 이런 기분이 든 이유가 있나요?"
          />
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          일기 내용
        </label>
        <textarea
          className="w-full border rounded p-2"
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="오늘 하루는 어땠나요? 자유롭게 작성해보세요..."
        />
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded text-white transition-colors"
        onClick={handleSave}
      >
        {isEditMode ? "수정하기" : "저장하기"}
      </button>
    </div>
  );
}

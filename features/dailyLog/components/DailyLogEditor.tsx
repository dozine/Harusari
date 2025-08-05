"use client";

import { useEffect, useState } from "react";
import { useCreateDailyLog, useUpdateDailyLog } from "../hooks/hooks";

import {
  useCreateMoodEntry,
  useMoodEntryByDate,
  useUpdateMoodEntry,
} from "@/features/mood/hooks/hooks";
import MoodSelector from "@/features/mood/components/moodSelector";

type Props = {
  date: string;
  initialContent?: string;
  isEditMode: boolean;
};

export default function DailyLogEditor({
  date,
  initialContent = "",
  isEditMode,
}: Props) {
  const [content, setContent] = useState(initialContent);
  const [mood, setMood] = useState<string | null>(null);

  const { data: moodData } = useMoodEntryByDate(date);

  const { mutate: createDailyLog } = useCreateDailyLog();
  const { mutate: updateDailyLog } = useUpdateDailyLog();

  const { mutate: createMoodEntry } = useCreateMoodEntry();
  const { mutate: updateMoodEntry } = useUpdateMoodEntry();

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  // Mood 데이터 불러와 상태에 반영
  useEffect(() => {
    if (moodData) {
      setMood(moodData.mood);
    } else {
      setMood(null); // 기록이 없으면 상태 초기화
    }
  }, [moodData]);

  const handleSave = () => {
    // 1. DailyLog 저장 로직
    if (isEditMode) {
      updateDailyLog({ date, content });
    } else {
      createDailyLog({ date, content });
    }

    if (mood) {
      if (moodData) {
        const updatedData = { date, mood };

        updateMoodEntry(updatedData);
      } else {
        const newData = { date, mood };

        createMoodEntry(newData);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <MoodSelector selectedMood={mood} onSelectMood={setMood} />

      <textarea
        className="border rounded p-2"
        rows={10}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="일기를 작성하세요..."
      />
      <button
        className="bg-blue-400 py-2 rounded text-white"
        onClick={handleSave}
      >
        저장하기
      </button>
    </div>
  );
}

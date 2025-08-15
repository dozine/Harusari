"use client";

import { useState } from "react";
import MoodSelector from "./moodSelector";

type Props = {
  date: string;
  onSave: (mood: string, moodComment: string, content: string) => void;
  isSaving: boolean;
};

export default function DailyLogEditor({ date, onSave, isSaving }: Props) {
  const [content, setContent] = useState("");
  const [selectedMood, setSelectedMood] = useState<{
    mood: string;
    moodComment: string;
  } | null>(null);

  const handleSave = () => {
    if (selectedMood && content.trim()) {
      onSave(selectedMood.mood, selectedMood.moodComment, content);
    }
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <MoodSelector onSelectMood={setSelectedMood} />
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700 mb-6">
          일기 내용
        </label>
        <textarea
          className="w-full rounded-3xl p-6 bg-gray-200"
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="오늘 하루는 어땠나요? 자유롭게 작성해보세요..."
        />
      </div>

      <button
        className="bg-orange-500 hover:bg-orange-600 py-2 px-4 rounded-3xl text-white transition-colors disabled:opacity-50"
        onClick={handleSave}
        disabled={isSaving || !selectedMood || !content.trim()}
      >
        {isSaving ? "저장 중..." : "저장하기"}
      </button>
    </div>
  );
}

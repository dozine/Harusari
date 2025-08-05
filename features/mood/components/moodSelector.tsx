"use client";

import React from "react";

interface MoodSelectorProps {
  selectedMood: string | null;
  onSelectMood: (mood: string) => void;
}

const moods = [
  { value: "very_happy", label: "😃 아주 좋음" },
  { value: "happy", label: "🙂 좋음" },
  { value: "neutral", label: "😐 보통" },
  { value: "sad", label: "🙁 슬픔" },
  { value: "very_sad", label: "😭 아주 슬픔" },
];

export default function MoodSelector({
  selectedMood,
  onSelectMood,
}: MoodSelectorProps) {
  return (
    <div className="flex justify-between items-center bg-gray-50 p-4 rounded-md border">
      <span className="font-semibold text-gray-700">오늘의 감정:</span>
      <div className="flex gap-2">
        {moods.map((mood) => (
          <button
            key={mood.value}
            onClick={() => onSelectMood(mood.value)}
            className={`
              p-2 rounded-full text-2xl transition-transform transform
              hover:scale-110
              ${
                selectedMood === mood.value
                  ? "ring-2 ring-blue-500 scale-110"
                  : ""
              }
            `}
            aria-label={mood.label}
          >
            {mood.label.split(" ")[0]}
          </button>
        ))}
      </div>
    </div>
  );
}

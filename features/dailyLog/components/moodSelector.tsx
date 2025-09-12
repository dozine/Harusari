"use client";

import React, { memo, useCallback, useState } from "react";

const moodCategories: Record<string, string[]> = {
  "😄 긍정": [
    "황홀하다",
    "설레다",
    "뿌듯하다",
    "만족스럽다",
    "기쁘다",
    "편안하다",
    "안도하다",
    "신나다",
  ],
  "😐 중립": [
    "무덤덤하다",
    "어리둥절하다",
    "멍하다",
    "애매하다",
    "기대된다",
    "조심스럽다",
  ],
  "😢 부정": [
    "슬프다",
    "서운하다",
    "외롭다",
    "허탈하다",
    "그립다",
    "속상하다",
    "답답하다",
  ],
  "😠 분노": [
    "화나다",
    "짜증나다",
    "억울하다",
    "분하다",
    "불쾌하다",
    "거슬리다",
  ],
  "😨 두려움": ["불안하다", "초조하다", "긴장된다", "겁난다", "위축되다"],
};

type Props = {
  onSelectMood: (mood: { mood: string; moodComment: string }) => void;
};

const MoodSelector = ({ onSelectMood }: Props) => {
  const categoryKeys = Object.keys(moodCategories);
  const [selectedCategory, setSelectedCategory] = useState(categoryKeys[0]);
  const [selectedMood, setSelectedMood] = useState("");
  const [selectedMoodComment, setSelectedMoodComment] = useState("");

  const handleMoodSelect = useCallback(
    (mood: string) => {
      setSelectedMood(mood);
      setSelectedMoodComment(mood);
      onSelectMood({ mood, moodComment: mood });
    },
    [onSelectMood]
  );

  const handleCategorySelect = useCallback(
    (cat: string) => {
      setSelectedCategory(cat);
      setSelectedMood("");
      setSelectedMoodComment("");
      onSelectMood({ mood: "", moodComment: "" });
    },
    [onSelectMood]
  );
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-lg font-bold text-gray-800">
        오늘의 기분을 선택하세요
      </h2>
      <div className="flex flex-wrap gap-2">
        {categoryKeys.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategorySelect(cat)}
            className={`px-4 py-2 rounded-full border transition-all duration-200
              ${
                selectedCategory === cat
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        {moodCategories[selectedCategory].map((mood) => (
          <button
            key={mood}
            onClick={() => handleMoodSelect(mood)}
            className={`px-4 py-3 rounded-xl shadow border transition-all duration-200
              ${
                selectedMood === mood
                  ? "bg-orange-500 text-white border-orange-500 scale-105"
                  : "bg-white border-gray-300 hover:scale-105"
              }`}
          >
            {mood}
          </button>
        ))}
      </div>
      {selectedMood && (
        <div className="mt-4 p-4 bg-gray-100 rounded-xl text-gray-700">
          오늘은 <span className="font-bold">{selectedMoodComment}</span>{" "}
          기분입니다.
        </div>
      )}
    </div>
  );
};
export default memo(MoodSelector);

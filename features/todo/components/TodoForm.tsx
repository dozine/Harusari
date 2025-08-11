"use client";

import { FormEvent, useState } from "react";

interface TodoFormProps {
  onAddTodo: (data: { title: string; description?: string }) => void;
  isLoading?: boolean;
}

export default function TodoForm({ onAddTodo, isLoading }: TodoFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (title.trim() && !isLoading) {
      onAddTodo({
        title: title.trim(),
        description: description.trim() || undefined,
      });
      setTitle("");
      setDescription("");
    }
  };

  return (
    <div className="max-w-sm w-full">
      <h1 className="flex itmes-center justify-center mb-4 font-bold">Tasks</h1>
      <form onSubmit={handleSubmit} className="space-y-3 mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="새로운 할 일을 추가해주세요"
          className="w-full p-2 border-none bg-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-500"
          disabled={isLoading}
          required
        />

        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="설명"
          className="w-full p-2 border bg-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-500 h-20"
          disabled={isLoading}
        />

        <button
          type="submit"
          className="w-full px-4 py-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!title.trim() || isLoading}
        >
          {isLoading ? "추가 중..." : "추가"}
        </button>
      </form>
    </div>
  );
}

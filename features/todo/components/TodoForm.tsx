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
    <form onSubmit={handleSubmit} className="space-y-3 mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="새로운 할 일을 추가해주세요"
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isLoading}
        required
      />

      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="설명 (선택사항)"
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isLoading}
      />

      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!title.trim() || isLoading}
      >
        {isLoading ? "추가 중..." : "추가"}
      </button>
    </form>
  );
}

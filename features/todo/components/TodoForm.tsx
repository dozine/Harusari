"use client";

import { FormEvent, useState } from "react";

interface TodoFormProps {
  onAddTodo: (title: string) => void;
}

export default function TodoForm({ onAddTodo }: TodoFormProps) {
  const [title, setTitle] = useState("");
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTodo(title.trim());
      setTitle("");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="새로운 할 일을 추가해주세요"
        className="flex-1 p-2 border rounded"
      />
      <button type="submit" className="px-4 py-2 rounded">
        추가
      </button>
    </form>
  );
}

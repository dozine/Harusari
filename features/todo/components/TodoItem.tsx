"use client ";

import { Todo } from "../types";

interface TodoItemProps {
  todo: Todo;
  onToggle: () => void;
  onRemove: () => void;
}

export default function TodoItem({ todo, onToggle, onRemove }: TodoItemProps) {
  return (
    <li className="flex items-center justify-between py-3 bg-gray-50 rounded-md shadow-sm">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={onToggle}
          className="mr-3 h-4 w-4"
        />
        <span>{todo.title}</span>
      </div>
      <button
        onClick={onRemove}
        className="px-3 py-1 bg-red-500 text-sm rounded-md hover:bg-red-600 transition-colors"
      >
        삭제
      </button>
    </li>
  );
}

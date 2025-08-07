"use client";

import { Todo } from "../types";
import { useTodoById } from "../hooks/useTodos";

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const { updateTodo, removeTodo, isUpdating, isDeleting } = useTodoById(
    todo.id
  );

  const handleToggle = () => {
    updateTodo({ isCompleted: !todo.isCompleted });
  };

  const handleRemove = () => {
    if (confirm("정말로 이 할일을 삭제하시겠습니까?")) {
      removeTodo();
    }
  };

  return (
    <div className="flex items-start justify-between p-4 bg-gray-50 rounded-md shadow-sm">
      <div className="flex items-start flex-1">
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={handleToggle}
          disabled={isUpdating}
          className="mt-1 mr-3 h-4 w-4"
        />
        <div className="flex-1">
          <div
            className={`font-medium ${
              todo.isCompleted ? "line-through text-gray-500" : ""
            }`}
          >
            {todo.title}
          </div>
          {todo.description && (
            <div className="text-sm text-gray-600 mt-1">{todo.description}</div>
          )}
        </div>
      </div>

      <button
        onClick={handleRemove}
        disabled={isDeleting}
        className="ml-4 px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-colors disabled:opacity-50"
      >
        {isDeleting ? "삭제중" : "삭제"}
      </button>
    </div>
  );
}

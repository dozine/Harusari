"use client";

import { useSearchParams } from "next/navigation";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useTodosByDate } from "../hooks/useTodos";

export default function TodoList() {
  const searchParams = useSearchParams();
  const dateParam = searchParams.get("date");
  const today = new Date().toISOString().split("T")[0];
  const date = dateParam || today;

  const { todos, addTodo, isLoading, error, isAdding } = useTodosByDate(date);

  const handleAddTodo = (data: { title: string; description?: string }) => {
    console.log("할 일 추가:", data, "날짜:", date);
    addTodo(data);
  };

  if (isLoading)
    return <div className="text-center p-4">목록 불러오는 중...</div>;
  if (error)
    return (
      <div className="text-center p-4 text-red-500">
        에러 발생: {error.message}
      </div>
    );

  return (
    <div className="flex flex-col space-y-4 justify-center items-center min-h-screen p-4">
      <h1 className="text-2xl font-bold text-center">할 일 목록 ({date})</h1>

      <div className="w-full max-w-md">
        <TodoForm onAddTodo={handleAddTodo} isLoading={isAdding} />

        {todos.length === 0 ? (
          <p className="text-center text-gray-500 mt-4">
            아직 할일이 없습니다. 새 할일을 추가해보세요.
          </p>
        ) : (
          <div className="mt-4 space-y-2">
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

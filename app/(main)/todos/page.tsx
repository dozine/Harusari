"use client";

import Modal from "@/components/ui/Modal";
import DateNavigator from "@/features/todo/components/DateNavigator";
import TodoForm from "@/features/todo/components/TodoForm";
import TodoList from "@/features/todo/components/TodoList";
import { useTodosByDate } from "@/features/todo/hooks/useTodos";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

export default function TodosPage() {
  const searchParams = useSearchParams();
  const dateParam = searchParams.get("date");
  const today = useMemo(() => new Date().toISOString().split("T")[0], []);
  const date = dateParam || today;
  const { todos, addTodo, isLoading, error, isAdding } = useTodosByDate(date);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTodo = (data: { title: string; description?: string }) => {
    addTodo(data);
    setIsModalOpen(false);
  };

  if (isLoading)
    return <div className="text-center p-6">목록 불러오는 중...</div>;
  if (error)
    return (
      <div className="text-center p-6 text-red-500">
        에러 발생: {error.message}
      </div>
    );
  return (
    <div className="bg-white h-full flex flex-col items-center">
      <div className="flex w-full justify-between items-center px-4 mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white text-xs rounded-3xl mr-4 px-3 py-2"
        >
          Add new
        </button>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <TodoForm onAddTodo={handleAddTodo} isLoading={isAdding} />
        </Modal>

        <div className="flex items-center space-x-4 mb-4">
          <DateNavigator />
        </div>
      </div>
      <TodoList todos={todos} />
    </div>
  );
}

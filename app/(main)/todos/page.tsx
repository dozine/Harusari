"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import TodoList from "@/features/todo/components/TodoList";

export default function TodosPage() {
  return (
    <ProtectedRoute>
      <div className="bg-white h-screen">
        <TodoList />
      </div>
    </ProtectedRoute>
  );
}

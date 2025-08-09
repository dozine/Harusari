// features/dashboard/components/TodoListWidget.tsx

"use client";

import React from "react";

import Link from "next/link";
import { useTodosByDate } from "@/features/todo/hooks/useTodos";
import { FaArrowRight, FaCheckCircle, FaRegCircle } from "react-icons/fa";
const today = new Date().toISOString().slice(0, 10);

export default function TodoListWidget() {
  const { todos, isLoading, error } = useTodosByDate(today);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6 flex flex-col justify-center items-center h-full">
        <p className="text-gray-500">할 일 목록을 가져오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6 flex flex-col justify-center items-center h-full">
        <p className="text-red-500">할 일 목록을 가져오는 데 실패했습니다.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-200 rounded-3xl  p-6 flex flex-col h-full ">
      <div className=" flex justify-between">
        <h3 className="text-xl text-gray-800 mb-4 ">Todo List</h3>
        <Link href="/todos">
          <div className="bg-black rounded-full w-6 h-6 flex items-center justify-center hover:bg-orange-500 transition-colors">
            <FaArrowRight className="text-white -rotate-45" />
          </div>
        </Link>
      </div>

      {todos.length > 0 ? (
        <ul className="flex-grow overflow-auto space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center p-2 rounded-md transition-colors"
            >
              <div className="flex items-center flex-grow">
                {todo.isCompleted ? (
                  <FaCheckCircle className="text-orange-500 mr-2" />
                ) : (
                  <FaRegCircle className="text-gray-400 mr-2" />
                )}
                <span
                  className={`flex-grow ${
                    todo.isCompleted ? "line-through text-gray-400" : ""
                  }`}
                >
                  {todo.title}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex-grow flex flex-col justify-center items-center text-center text-gray-500">
          <p>오늘의 할 일이 없네요!</p>
          <p>할 일 페이지에서 새로운 할 일을 추가해보세요.</p>
        </div>
      )}
    </div>
  );
}

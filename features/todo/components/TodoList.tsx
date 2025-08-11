"use client";

import TodoItem from "./TodoItem";
import { Todo } from "../types";

interface TodoListProps {
  todos: Todo[];
}

export default function TodoList({ todos }: TodoListProps) {
  return (
    <div className="">
      <div className="flex justify-items-start"></div>
      <div className="flex flex-col space-y-4 justify-center items-center">
        <div className="w-full">
          {todos.length === 0 ? (
            <p className="text-center text-gray-500 mt-4">
              아직 할일이 없습니다. 새 할일을 추가해보세요.
            </p>
          ) : (
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

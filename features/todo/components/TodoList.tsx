"use client";

import useTodos from "../hooks/useTodos";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const { todos, addTodo, removeTodo, toggleTodo, isLoading, error } =
    useTodos();
  if (isLoading) return <p>목록 불러오는 중</p>;
  if (error) return <p>에러 발생 :{error.message}</p>;

  return (
    <div className="flex space-y-4 justify-center items-center">
      <div className="m-10">
        <TodoForm onAddTodo={addTodo} />
        {todos && todos.length === 0 ? (
          <p>아직 할 일이 없습니다. 새 할 일을 추가해보세요!</p>
        ) : (
          <ul className="space-y-2">
            {todos &&
              todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={() => toggleTodo(todo.id)}
                  onRemove={() => removeTodo(todo.id)}
                />
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}

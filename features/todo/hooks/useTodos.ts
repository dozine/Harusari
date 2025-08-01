"use client";

import { useCallback, useEffect, useState } from "react";
import { Todo } from "../types";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../services/todoService";

export default function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setErrors] = useState<Error | null>(null);

  const fetchTodos = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrors(null);
      const data = await getTodos();
      setTodos(data);
    } catch (err) {
      setErrors(
        err instanceof Error ? err : new Error("Failed to fetch todos")
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = useCallback(async (title: string) => {
    try {
      const newTodo = await createTodo({ title });
      setTodos((prev) => [...prev, newTodo]);
    } catch (err) {
      setErrors(err instanceof Error ? err : new Error("Failed to add todo"));
    }
  }, []);

  const toggleTodo = useCallback(
    async (id: string) => {
      try {
        const currentTodo = todos.find((t) => t.id === id);
        if (!currentTodo) return;

        const updatedTodo = await updateTodo(id, {
          isComplete: !currentTodo.isCompleted,
        });
        setTodos((prev) =>
          prev.map((todo) =>
            todo.id === id
              ? { ...todo, isCompleted: updatedTodo.isCompleted }
              : todo
          )
        );
      } catch (err) {
        setErrors(
          err instanceof Error ? err : new Error("Failed to toggle todo status")
        );
      }
    },
    [todos]
  );

  const removeTodo = useCallback(async (id: string) => {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      setErrors(
        err instanceof Error ? err : new Error("Failed to remove todo")
      );
    }
  }, []);

  return {
    todos,
    addTodo,
    toggleTodo,
    removeTodo,
    isLoading,
    error,
    fetchTodos,
  };
}

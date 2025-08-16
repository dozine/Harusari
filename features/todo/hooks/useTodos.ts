"use client";

import {
  getTodos,
  getTodosByDate,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../services/todoService";
import { CreateTodoData, UpdateTodoData } from "../types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useTodos() {
  return useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
    staleTime: 5 * 60 * 1000,
  });
}

export function useTodosByDate(date: string) {
  const queryClient = useQueryClient();
  const {
    data: todos = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["todos", date],
    queryFn: () => getTodosByDate(date),
    enabled: !!date,
    retry: 1,
  });

  const createTodoMutation = useMutation({
    mutationFn: (data: CreateTodoData) => createTodo(date, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos", date] });
    },
    onError: (error) => {
      console.error("Failed to create todo:", error);
    },
  });

  return {
    todos,
    isLoading,
    error,
    addTodo: createTodoMutation.mutate,
    isAdding: createTodoMutation.isPending,
  };
}

export function useTodoById(id: string) {
  const queryClient = useQueryClient();

  const updateTodoMutation = useMutation({
    mutationFn: (data: UpdateTodoData) => updateTodo(id, data),
    onSuccess: (updatedTodo) => {
      if (updatedTodo.date) {
        const dateString = updatedTodo.date.split("T")[0]; // YYYY-MM-DD 형식으로 변환
        queryClient.invalidateQueries({ queryKey: ["todos", dateString] });
      }
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: () => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "todos",
      });
    },
  });

  return {
    updateTodo: updateTodoMutation.mutate,
    removeTodo: deleteTodoMutation.mutate,
    isUpdating: updateTodoMutation.isPending,
    isDeleting: deleteTodoMutation.isPending,
  };
}

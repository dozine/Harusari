"use client";
import { Todo } from "../types";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../services/todoService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function useTodos() {
  const queryClient = useQueryClient();
  const {
    data: todos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const createTodoMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  const toggleTodoMutation = useMutation({
    mutationFn: ({ id, isCompleted }: { id: string; isCompleted: boolean }) =>
      updateTodo(id, { isCompleted }),
    onMutate: async ({
      id,
      isCompleted,
    }: {
      id: string;
      isCompleted: boolean;
    }) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);
      if (previousTodos) {
        queryClient.setQueryData(
          ["todos"],
          previousTodos.map((todo) =>
            todo.id === id ? { ...todo, isCompleted: isCompleted } : todo
          )
        );
      }
      return { previousTodos };
    },
    onError: (err, variables, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(["todos"], context.previousTodos);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  const addTodo = (title: string) => {
    createTodoMutation.mutate({ title });
  };
  const toggleTodo = (id: string) => {
    const todoToUpdate = todos?.find((t) => t.id === id);
    if (todoToUpdate) {
      toggleTodoMutation.mutate({ id, isCompleted: !todoToUpdate.isCompleted });
    }
  };

  const removeTodo = (id: string) => {
    deleteTodoMutation.mutate(id);
  };

  return {
    todos,
    addTodo,
    toggleTodo,
    removeTodo,
    isLoading,
    error,
  };
}

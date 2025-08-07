import { CreateTodoData, Todo, UpdateTodoData } from "@/features/todo/types";
import instance from "@/utils/axios";

export const getTodos = async (): Promise<Todo[]> => {
  const response = await instance.get<Todo[]>("/todos");
  return response.data;
};

export const getTodosByDate = async (date: string): Promise<Todo[]> => {
  const response = await instance.get<Todo[]>(`/todos/by-date/${date}`);
  return response.data;
};

export const createTodo = async (
  date: string,
  data: CreateTodoData
): Promise<Todo> => {
  const response = await instance.post<Todo>("/todos", { ...data, date });
  return response.data;
};

export const updateTodo = async (
  id: string,
  data: UpdateTodoData
): Promise<Todo> => {
  const response = await instance.patch<Todo>(`/todos/${id}`, data);
  return response.data;
};

export const deleteTodo = async (id: string): Promise<void> => {
  await instance.delete(`/todos/${id}`);
};

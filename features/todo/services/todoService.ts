import instance from "@/utils/axios";
import { CreateTodoData, Todo, UpdateTodoData } from "../types";

export const getTodos = async (): Promise<Todo[]> => {
  const response = await instance.get<Todo[]>("/todos");
  return response.data;
};

export const createTodo = async (data: CreateTodoData): Promise<Todo> => {
  const response = await instance.post<Todo>("/todos", data);
  return response.data;
};

export const updateTodo = async (
  id: string,
  data: UpdateTodoData
): Promise<Todo> => {
  const response = await instance.patch<Todo>("/todos", { ...data, id });
  return response.data;
};

export const deleteTodo = async (id: string): Promise<void> => {
  await instance.delete("/todos/", { data: { id } });
};

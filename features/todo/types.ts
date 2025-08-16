export interface Todo {
  id: string;
  userId: string;
  title: string;
  description?: string;
  dueDate?: string;
  date: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTodoData {
  title: string;
}

export interface UpdateTodoData {
  title?: string;
  description?: string;
  isCompleted?: boolean;
}

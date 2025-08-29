import userEvent from "@testing-library/user-event";
import * as useTodosHook from "../hooks/useTodos";
import { render, screen, waitFor } from "@testing-library/react";
import TodoItem from "../components/TodoItem";
import { mock } from "node:test";

jest.mock("../hooks/useTodos", () => ({
  useTodoById: jest.fn(),
}));

const mockTodo = {
  id: "1",
  title: "Test Todo",
  description: "This is a test todo",
  isCompleted: false,
  userId: "user-1",
  date: "2024-06-01",
  createdAt: "2024-06-01T00:00:00.000Z",
  updatedAt: "2024-06-01T00:00:00.000Z",
};

describe("TodoItem", () => {
  const user = userEvent.setup();
  const updateTodoMock = jest.fn();
  const removeTodoMock = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    (useTodosHook.useTodoById as jest.Mock).mockReturnValue({
      updateTodo: updateTodoMock,
      removeTodo: removeTodoMock,
      isUpdating: false,
      isDeleting: false,
    });
  });

  it("할 일의 제목과 설명이 올바르게 렌더링되어야 한다.", () => {
    render(<TodoItem todo={mockTodo} />);
    expect(screen.getByText(mockTodo.title)).toBeInTheDocument();
    expect(screen.getByText(mockTodo.description)).toBeInTheDocument();
  });

  it("체크박스를 클릭하면 isCompleted 상태가 토글되어야 한다.", async () => {
    render(<TodoItem todo={mockTodo} />);
    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);
    expect(updateTodoMock).toHaveBeenCalledWith({ isCompleted: true });
  });

  it("수정 버튼을 클릭하고 저장하면 내용이 업데이트 되어야 한다.", async () => {
    render(<TodoItem todo={mockTodo} />);
    const settingButton = screen.getByRole("button", { name: "Todo settings" });
    await user.click(settingButton);
    const editButton = screen.getByRole("button", { name: "Edit" });
    await user.click(editButton);

    const titleInput = screen.getByDisplayValue(mockTodo.title);
    const descriptionInput = screen.getByDisplayValue(mockTodo.description);
    await user.clear(titleInput);
    await user.type(titleInput, "수정된 할일");
    await user.clear(descriptionInput);
    await user.type(descriptionInput, "수정된 설명");

    const saveButton = screen.getByRole("button", { name: /저장/i });
    await user.click(saveButton);

    expect(updateTodoMock).toHaveBeenCalledWith({
      title: "수정된 할일",
      description: "수정된 설명",
    });
  });

  it("삭제 버튼을 클릭하면 removeTodo 함수가 호출되어야 한다", async () => {
    render(<TodoItem todo={mockTodo} />);

    const confirmSpy = jest.spyOn(window, "confirm").mockReturnValue(true);
    const settingsButton = screen.getByRole("button", {
      name: "Todo settings",
    });

    await user.click(settingsButton);

    const deleteButton = screen.getByRole("button", { name: "Delete" });
    await user.click(deleteButton);
    await waitFor(() => {
      expect(removeTodoMock).toHaveBeenCalledTimes(1);
    });
    confirmSpy.mockRestore();
  });
});

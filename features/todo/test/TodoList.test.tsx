import { render, screen } from "@testing-library/react";
import TodoList from "../components/TodoList";

jest.mock("../components/TodoItem", () => {
  return jest.fn(({ todo }) => (
    <div data-testid="todo-item" key={todo.id}>
      <h3>{todo.title}</h3>
      <p>{todo.description}</p>
    </div>
  ));
});

const mockTodos = [
  {
    id: "1",
    title: "할일 1",
    description: "설명 1",
    isCompleted: false,
    userId: "user-1",
    date: "2024-06-01",
    createdAt: "2024-06-01T00:00:00.000Z",
    updatedAt: "2024-06-01T00:00:00.000Z",
  },
  {
    id: "2",
    title: "할일 2",
    description: "설명 2",
    isCompleted: true,
    userId: "user-1",
    date: "2024-06-02",
    createdAt: "2024-06-02T00:00:00.000Z",
    updatedAt: "2024-06-02T00:00:00.000Z",
  },
];

describe("TodoList", () => {
  it("할 일이 없을 때 사용자에게 메시지를 렌더링 해야한다", () => {
    render(<TodoList todos={[]} />);
    const message = screen.getByText(
      "아직 할일이 없습니다. 새 할일을 추가해보세요."
    );
    expect(message).toBeInTheDocument();
  });

  it("할 일이 있을 때 목록을 올바르게 렌더링 해야한다", () => {
    render(<TodoList todos={mockTodos} />);
    const todoItems = screen.getAllByTestId("todo-item");
    expect(todoItems).toHaveLength(mockTodos.length);
    mockTodos.forEach((todo) => {
      expect(screen.getByText(todo.title)).toBeInTheDocument();
      expect(screen.getByText(todo.description)).toBeInTheDocument();
    });
  });
});

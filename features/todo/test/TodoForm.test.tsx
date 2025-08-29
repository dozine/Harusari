import { render, screen } from "@testing-library/react";
import TodoForm from "../components/TodoForm";
import userEvent from "@testing-library/user-event";
describe("TodoForm", () => {
  const onAddTodoMock = jest.fn();
  beforeEach(() => {
    onAddTodoMock.mockClear();
  });
  it("폼이 올바르게 렌더링 되어야 한다.", () => {
    render(<TodoForm onAddTodo={onAddTodoMock} />);

    expect(
      screen.getByPlaceholderText("새로운 할 일을 추가해주세요")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("설명")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "추가" })).toBeInTheDocument();
  });

  it("제목 입력 필드가 비어 있을 때는 추기 버튼이 비활성화되어야 한다.", () => {
    render(<TodoForm onAddTodo={onAddTodoMock} />);
    const addButton = screen.getByRole("button", { name: "추가" });
    expect(addButton).toBeDisabled();
  });

  it("제목 입력 필드에 값이 있을 때는 추가 버튼이 활성화되어야 한다.", async () => {
    render(<TodoForm onAddTodo={onAddTodoMock} />);
    const titleInput =
      screen.getByPlaceholderText("새로운 할 일을 추가해주세요");
    const addButton = screen.getByRole("button", { name: "추가" });

    await userEvent.type(titleInput, "새로운 할 일");
    expect(addButton).toBeEnabled();
  });
  it("추가 버튼 클릭시 onAddTodo 함수가 올바른 데이터와 함께 호출되어야 한다.", async () => {
    render(<TodoForm onAddTodo={onAddTodoMock} />);
    const titleInput =
      screen.getByPlaceholderText("새로운 할 일을 추가해주세요");
    const descriptionInput = screen.getByPlaceholderText("설명");
    const addButton = screen.getByRole("button", { name: "추가" });

    await userEvent.type(titleInput, "새로운 할 일");
    await userEvent.type(descriptionInput, "할 일 설명");
    await userEvent.click(addButton);

    expect(onAddTodoMock).toHaveBeenCalledTimes(1);
    expect(onAddTodoMock).toHaveBeenCalledWith({
      title: "새로운 할 일",
      description: "할 일 설명",
    });
  });
  it("추가 버튼 클릭 후 입력 필드가 초기화되어야 한다.", async () => {
    render(<TodoForm onAddTodo={onAddTodoMock} />);
    const titleInput =
      screen.getByPlaceholderText("새로운 할 일을 추가해주세요");
    const descriptionInput = screen.getByPlaceholderText("설명");
    const addButton = screen.getByRole("button", { name: "추가" });

    await userEvent.type(titleInput, "새로운 할 일");
    await userEvent.type(descriptionInput, "할 일 설명");
    await userEvent.click(addButton);

    expect(titleInput).toHaveValue("");
    expect(descriptionInput).toHaveValue("");
  });
});

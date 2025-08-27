import userEvent from "@testing-library/user-event";
import DailyLogEditor from "../components/DailyLogEditor";
import { render, screen, waitFor } from "@testing-library/react";

jest.mock("../components/MoodSelector", () => {
  return jest.fn(({ onSelectMood }) => {
    <div data-testid="mood-selector">
      <button
        data-testid="-mood-button"
        onClick={() => {
          onSelectMood({ mood: "happy", moodComment: "기분 좋은 하루" });
        }}
      >
        😄 긍정
      </button>
    </div>;
  });
});

describe("DailyLogEditor", () => {
  const user = userEvent.setup();
  const onSaveMock = jest.fn();
  const mockDate = "2025-01-01";

  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("초기 렌더링 시 '저장하기 '버튼 비활성화", () => {
    render(
      <DailyLogEditor date={mockDate} onSave={onSaveMock} isSaving={false} />
    );
    const saveButton = screen.getByRole("button", { name: "저장하기" });
    expect(saveButton).toBeDisabled();
  });

  it("모든 필드가 입력되면 '저장하기' 활성화", async () => {
    render(
      <DailyLogEditor date={mockDate} onSave={onSaveMock} isSaving={false} />
    );

    const textarea = screen.getByPlaceholderText(
      "오늘 하루는 어땠나요? 자유롭게 작성해보세요..."
    );

    await user.type(textarea, "오늘은 정말 좋은 하루였어요!");
    const moodButton = screen.getByRole("button", { name: "😄 긍정" });
    await user.click(moodButton);
    const saveButton = screen.getByRole("button", { name: "저장하기" });
    await waitFor(() => {
      expect(saveButton).toBeEnabled();
    });
  });

  it("isSaving prop이 true일 때 '저장 중...' 텍스트와 함께 버튼이 비활성화되어야 한다", () => {
    render(
      <DailyLogEditor date={mockDate} onSave={onSaveMock} isSaving={true} />
    );

    const saveButton = screen.getByRole("button", { name: "저장 중..." });
    expect(saveButton).toBeDisabled();
  });
});

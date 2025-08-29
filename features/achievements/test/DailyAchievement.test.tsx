import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DailyAchievement from "../components/DailyAchievement";
import { useAchievements } from "../hooks/useAchievementByDate";

jest.mock("../hooks/useAchievementByDate");

const mockedUseAchievements = jest.mocked(useAchievements);

describe("DailyAchievement", () => {
  beforeEach(() => {
    mockedUseAchievements.mockReset();
    mockedUseAchievements.mockReturnValue({
      achievements: [],
      isLoading: false,
      error: null,
    });
  });

  it("오늘의 할일이 없을 때는 '오늘의 할 일이 없습니다.' 표시", () => {
    mockedUseAchievements.mockReturnValue({
      achievements: [],
      isLoading: false,
      error: null,
    });

    render(<DailyAchievement />);

    expect(screen.getByText("오늘의 할 일이 없습니다.")).toBeInTheDocument();
  });

  it("성취도 데이터가 있을 때 완료율과 todo 개수가 올바르게 표시되어야 한다.", () => {
    const mockAchievement = {
      id: "achievement-2025-08-27",
      userId: "user-1",
      date: "2025-08-27",
      completionRate: 75.5,
      totalTasks: 4,
      completedTasks: 3,
      createdAt: new Date("2025-08-27T00:00:00.000Z"),
      updatedAt: new Date("2025-08-27T10:00:00.000Z"),
    };

    mockedUseAchievements.mockReturnValue({
      achievements: [mockAchievement],
      isLoading: false,
      error: null,
    });

    render(<DailyAchievement />);

    expect(screen.getByText("75.5%")).toBeInTheDocument();
    expect(screen.getByText("3 / 4 clear")).toBeInTheDocument();
  });
});

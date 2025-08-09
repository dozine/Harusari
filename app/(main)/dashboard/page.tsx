"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Navbar from "@/components/layout/NavBar";
import Sidebar from "@/components/layout/SideBar";
import DailyAchievement from "@/features/achievements/components/DailyAchievement";
import WeeklyAchievement from "@/features/achievements/components/WeeklyAchievement";
import DailyLogWidget from "@/features/dashboard/components/DailyLogWidget";
import MoodWidget from "@/features/dashboard/components/MoodWidget";
import QuoteWidget from "@/features/dashboard/components/QuoteWidget";
import TodoListWidget from "@/features/dashboard/components/TodoListWidget";
import WeatherWidget from "@/features/dashboard/components/WeatherWidget";
import MonthlyAchievement from "@/features/achievements/components/MonthlyAchievement";

export default function DashboardPage() {
  return (
    <ProtectedRoute redirectTo="/login">
      <div className="flex bg-orange-500 h-screen justify-center ">
        <div className="flex bg-white w-full max-w-screen-xl">
          <div className="h-full p-4">
            <Sidebar />
          </div>
          <div className="flex-1 flex flex-col w-full">
            <Navbar />
            <main className="flex-1 p-6 overflow-auto  ">
              <div className="grid grid-cols-4 grid-rows-[auto_1fr_1fr] gap-6 h-full">
                <div className="col-span-2">
                  <QuoteWidget />
                </div>
                <div className="col-span-1 min-h-0">
                  <WeatherWidget />
                </div>
                <div className="col-span-1 min-h-0">
                  <MoodWidget />
                </div>

                <div className="col-span-1 row-span-2  h-full min-h-0">
                  <TodoListWidget />
                </div>
                <div className="col-span-1 row-span-2 flex flex-col gap-6 h-full">
                  <div className="flex-1 min-h-0">
                    <DailyAchievement />
                  </div>
                  <div className="flex-1 min-h-0">
                    <DailyLogWidget />
                  </div>
                </div>
                <div className="col-span-2 row-span-2 flex flex-col gap-6 h-full">
                  <div className="flex-1 min-h-0">
                    <MonthlyAchievement />
                  </div>
                  <div className="flex-1 min-h-0">
                    <WeeklyAchievement />
                  </div>
                </div>
              </div>
            </main>
            <footer className="flex justify-center mb-6 text-gray-900">
              Today All rights reserved
            </footer>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

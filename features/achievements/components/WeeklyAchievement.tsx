"use client";

import React, { useMemo } from "react";
import { useAchievements } from "../hooks/useAchievements";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const WeeklyAchievement = () => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 6);

  const { achievements, isLoading, error } = useAchievements(
    startDate.toISOString().slice(0, 10),
    endDate.toISOString().slice(0, 10)
  );

  const chartData = useMemo(() => {
    const dataPoints = achievements
      .map((item) => ({
        date:
          typeof item.date === "string"
            ? item.date.slice(5, 10)
            : new Date(item.date).toISOString().slice(5, 10),
        completionRate: Math.round(item.completionRate),
      }))
      .sort((a, b) => (a.date > b.date ? 1 : -1));

    return {
      labels: dataPoints.map((item) => item.date),
      datasets: [
        {
          label: "Completion Rate",
          data: dataPoints.map((item) => item.completionRate),
          borderColor: "#ff7f50",
          backgroundColor: "rgba(255, 127, 80, 0.5)",
          pointRadius: 5,
          pointHoverRadius: 7,
          tension: 0.4,
        },
      ],
    };
  }, [achievements]);
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `${context.dataset.label}: ${context.raw}%`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#000",
        },
      },
      y: {
        grid: {
          display: false,
        },
        min: 0,
        max: 100,
      },
    },
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow p-4 flex justify-center items-center h-64">
        로딩 중...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow p-4 flex justify-center items-center h-64 text-red-500">
        데이터 불러오기 실패
      </div>
    );
  }

  return (
    <div className="bg-gray-200 rounded-3xl p-4 h-full flex flex-col">
      <h3 className="flex flex-1 text-md text-gray-900">Weekly Chart</h3>
      <div className="flex-1 min-h-[100px] sm:min-h-[100px]">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default React.memo(WeeklyAchievement);

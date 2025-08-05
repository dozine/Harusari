import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createDailyLog,
  deleteDailyLog,
  getDailyLog,
  getDailyLogByDate,
  updateDailyLog,
} from "../services/dailyLogService";

export const useDailyLogs = () => {
  return useQuery({
    queryKey: ["dailyLog"],
    queryFn: getDailyLog,
    staleTime: 5 * 60 * 1000,
  });
};

export const useDailyLog = (date: string) => {
  return useQuery({
    queryKey: ["dailyLog", date],
    queryFn: () => getDailyLogByDate(date),
    enabled: !!date,
    retry: (failureCount, error: any) => {
      if (error?.response?.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

export const useCreateDailyLog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDailyLog,
    onSuccess: (newLog) => {
      queryClient.invalidateQueries({ queryKey: ["dailyLog"] });
      if (newLog?.date) {
        const dateStr = new Date(newLog.date).toISOString().slice(0, 10);
        queryClient.invalidateQueries({ queryKey: ["dailyLog", dateStr] });
      }
    },
    onError: (error) => {
      console.error("Failed to daily log", error);
    },
  });
};

export const useUpdateDailyLog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ date, content }: { date: string; content: string }) =>
      updateDailyLog(date, content),
    onSuccess: (updatedLog) => {
      queryClient.invalidateQueries({
        queryKey: ["dailyLog", updatedLog.date],
      });
      queryClient.invalidateQueries({ queryKey: ["dailyLog"] });
    },
    onError: (error) => {
      console.error("Failed to create daily log:", error);
    },
  });
};

export const useDeleteDailyLog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDailyLog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dailyLog"] });
    },
  });
};

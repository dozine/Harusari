"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createDailyLog,
  deleteDailyLog,
  getDailyLog,
  getDailyLogByDate,
  updateDailyLog,
} from "../services/dailyLogService";
import { UpdateDailyLogRequest } from "../types";

export const useDailyLogs = () => {
  return useQuery({
    queryKey: ["dailyLogs"],
    queryFn: getDailyLog,
    staleTime: 1000 * 60 * 60 * 12,
  });
};

export const useDailyLog = (date: string) => {
  const queryClient = useQueryClient();
  const { data: log, ...queryResult } = useQuery({
    queryKey: ["dailyLog", date],
    queryFn: () => getDailyLogByDate(date),
    enabled: !!date,
    staleTime: 1000 * 60 * 60 * 12,
  });
  const createMutation = useMutation({
    mutationFn: createDailyLog,
    onSuccess: (newLog) => {
      queryClient.invalidateQueries({ queryKey: ["dailyLogs"] });
      if (newLog?.date) {
        const dateStr = new Date(newLog.date).toISOString().slice(0, 10);
        queryClient.invalidateQueries({ queryKey: ["dailyLog", dateStr] });
      }
    },
  });
  const updateMutation = useMutation({
    mutationFn: (data: UpdateDailyLogRequest) => updateDailyLog(date, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dailyLogs"] });
      queryClient.invalidateQueries({ queryKey: ["dailyLog", date] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteDailyLog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dailyLogs"] });
      queryClient.invalidateQueries({ queryKey: ["dailyLog", date] });
    },
  });
  return {
    log,
    isLoading: queryResult.isLoading,
    error: queryResult.error,
    createLog: createMutation.mutate,
    updateLog: updateMutation.mutate,
    deleteLog: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};

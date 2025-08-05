// features/mood/hooks/hooks.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getMoodEntries,
  getMoodEntryByDate,
  createMoodEntry,
  updateMoodEntry,
  deleteMoodEntry,
} from "../services/moodService";
import { MoodEntry } from "@prisma/client";
import { ApiError } from "next/dist/server/api-utils";
import { MoodEntryRequest, UpdateMoodEntryVariables } from "../types";

const MOOD_QUERY_KEY = "moodEntries";

export const useMoodEntries = () => {
  return useQuery({
    queryKey: [MOOD_QUERY_KEY],
    queryFn: getMoodEntries,
  });
};

export const useMoodEntryByDate = (date: string) => {
  return useQuery({
    queryKey: [MOOD_QUERY_KEY, date],
    queryFn: () => getMoodEntryByDate(date),
    enabled: !!date,
  });
};

export const useCreateMoodEntry = () => {
  const queryClient = useQueryClient();
  return useMutation<MoodEntry, ApiError, MoodEntryRequest>({
    mutationFn: createMoodEntry,
    onSuccess: (newEntry) => {
      queryClient.invalidateQueries({ queryKey: [MOOD_QUERY_KEY] });
      queryClient.invalidateQueries({
        queryKey: [MOOD_QUERY_KEY, newEntry.date],
      });
    },
    onError: (error) => {
      console.error("Failed to create mood entry", error);
    },
  });
};

export const useUpdateMoodEntry = () => {
  const queryClient = useQueryClient();
  return useMutation<MoodEntry, ApiError, UpdateMoodEntryVariables>({
    mutationFn: updateMoodEntry,
    onSuccess: (updatedEntry) => {
      queryClient.invalidateQueries({ queryKey: [MOOD_QUERY_KEY] });
      queryClient.invalidateQueries({
        queryKey: [MOOD_QUERY_KEY, updatedEntry.date],
      });
    },
    onError: (error) => {
      console.error("Failed to update mood entry", error);
    },
  });
};

export const useDeleteMoodEntry = () => {
  const queryClient = useQueryClient();
  return useMutation<void, ApiError, string>({
    mutationFn: deleteMoodEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MOOD_QUERY_KEY] });
    },
    onError: (error) => {
      console.error("Failed to delete mood entry", error);
    },
  });
};

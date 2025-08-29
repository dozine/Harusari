"use client";

import { useQuery } from "@tanstack/react-query";
import { getTodayQuote } from "../services/quoteService";

export default function useQuote() {
  const {
    data: quote,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["quote"],
    queryFn: getTodayQuote,
    staleTime: 1000 * 60 * 60 * 12,
  });
  return { quote, isLoading, error };
}

"use client";

import { useEffect, useState } from "react";
import { Quote } from "../types";
import { getTodayQuote } from "../services/quoteService";

export default function useQuote() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        setIsLoading(true);
        const data = await getTodayQuote();
        setQuote(data);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch quote data")
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuote();
  }, []);
  return { quote, isLoading, error };
}

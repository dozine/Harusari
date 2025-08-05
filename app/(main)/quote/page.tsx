"use client";

// 절대경로 대신 상대경로 사용
import useQuote from "../../../features/quote/hooks/useQuote";
import QuoteCard from "../../../features/quote/components/QuoteCard";

export default function QuotePage() {
  const { quote, error, isLoading } = useQuote();

  if (isLoading) {
    return <div>로딩 중입니다...</div>;
  }

  if (error) {
    return <div>에러 발생: {error.message}</div>;
  }

  return <div>{quote && <QuoteCard quote={quote} />}</div>;
}

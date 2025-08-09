"use client";

import useQuote from "@/features/quote/hooks/useQuote";
import React from "react";

export default function QuoteWidget() {
  const { quote, isLoading, error } = useQuote();

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6 flex flex-col justify-center items-center h-full">
        <p className="text-gray-500">명언을 가져오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6 flex flex-col justify-center items-center h-full">
        <p className="text-red-500">명언을 가져오는 데 실패했습니다.</p>
      </div>
    );
  }

  if (quote) {
    return (
      <div className="bg-orange-500 rounded-3xl p-6 flex flex-col justify-between h-full">
        <div className="flex flex-col flex-grow justify-center items-center text-center">
          <blockquote className="text-2xl italic font-semibold text-gray-800 leading-relaxed">
            "{quote.text}"
          </blockquote>
          {quote.author && (
            <cite className="mt-4 text-white text-lg not-italic">
              - {quote.author}
            </cite>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className=" rounded-lg shadow p-6 flex flex-col justify-center items-center h-full">
      <p className="text-gray-500">명언 정보가 없습니다.</p>
    </div>
  );
}

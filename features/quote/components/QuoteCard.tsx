"use client";

import { Quote } from "../types";

interface QuoteCardProps {
  quote: Quote;
}

export default function QuoteCard({ quote }: QuoteCardProps) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-xl max-w-2xl mx-auto text-center border-l-4 border-indigo-500">
      <p className="italic text-2xl text-gray-800 leading-relaxed mb-4">
        {quote.text}
      </p>
      <p className="text-lg font-semibold text-indigo-600"> {quote.author} </p>

      <p className="text-sm text-gray-500 mt-4">
        최신 업데이트:
        {new Date(quote.lastUpdated).toLocaleTimeString("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
    </div>
  );
}

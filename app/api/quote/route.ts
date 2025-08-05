import { NextResponse } from "next/server";

export async function GET() {
  try {
    const API_URL = "https://zenquotes.io/api/random";
    const response = await fetch(API_URL, {
      next: { revalidate: 60 * 60 * 24 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const randomQuote = data[0];

    const quoteData = {
      id: `zen-${Date.now()}`,
      text: randomQuote.q,
      author: randomQuote.a,
      lastUpdated: new Date().toISOString(),
    };

    return NextResponse.json(quoteData);
  } catch (error) {
    console.error("Error fetching quote:", error);

    // API 실패 시 백업 인용구 반환
    const fallbackQuote = {
      id: "fallback-1",
      text: "The only impossible journey is the one you never begin.",
      author: "Tony Robbins",
      lastUpdated: new Date().toISOString(),
    };

    return NextResponse.json(fallbackQuote);
  }
}

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const API_KEY = process.env.OPENWEATHER_API_KEY;
    const CITY = "Seoul,KR";
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric&lang=kr`;

    if (!API_KEY) {
      return NextResponse.json(
        { message: "API key is missing" },
        { status: 500 }
      );
    }
    const response = await fetch(API_URL, {
      next: { revalidate: 60 * 60 * 3 },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Failed to fetch data from OpenWeatherMap"
      );
    }
    const data = await response.json();

    const weatherData = {
      id: data.id.toString(),
      date: new Date().toISOString(),
      condition: data.weather[0].description,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      location: data.name,
      lastUpdated: new Date().toISOString(),
    };
    return NextResponse.json(weatherData);
  } catch (error) {
    console.error("Error fetching weather data :", error);
    return NextResponse.json(
      { message: `Failed to fetch weather data: ${error}` },
      { status: 500 }
    );
  }
}

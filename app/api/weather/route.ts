import { NextResponse } from "next/server";

const API_KEY = process.env.WEATHER_API_KEY;
const API_URL = "https://api.weatherapi.com/v1/forecast.json";

export async function GET() {
  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}&q=Jakarta&days=3`);
    const data = await response.json();
    return NextResponse.json(data);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}

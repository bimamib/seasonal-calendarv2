/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSeason } from "./utils/seasons";

interface WeatherData {
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
  };
  location: {
    name: string;
    region: string;
    country: string;
  };
}

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [currentSeason, setCurrentSeason] = useState<ReturnType<
    typeof getSeason
  > | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const response = await fetch("/api/weather");
      const data = await response.json();
      setWeatherData(data);
    };

    fetchWeatherData();

    const currentMonth = new Date().getMonth() + 1; // getMonth() returns 0-11
    setCurrentSeason(getSeason(currentMonth));
  }, []);

  if (!weatherData || !currentSeason) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-1">
      <Card className="w-full max-w-xl mx-auto p-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Jakarta, Indonesia</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={weatherData.current.condition.icon}
                alt="Weather icon"
                className="mr-4"
              />
              <div>
                <p className="text-base font-bold">
                  {weatherData.current.temp_c}°C
                </p>
                <p className="text-sm">{weatherData.current.condition.text}</p>
              </div>
            </div>
            <div className="text-left">
              <h2 className="text-base font-semibold">
                {currentSeason.name} Season
              </h2>
              <p className="text-xs text-gray-600">{currentSeason.months}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

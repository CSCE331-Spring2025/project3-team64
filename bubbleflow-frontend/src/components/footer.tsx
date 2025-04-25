"use client";
import { RxGithubLogo, RxHeart } from "react-icons/rx";
import { WeatherData } from "@/lib/weather";
import { useState, useEffect } from "react";
import Image from "next/image";
import ChatBot from "./chatBot";

export default function Footer() {
  const [data, setData] = useState<WeatherData | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=30.615011&lon=-96.342476&appid=${apiKey}`
    )
      .then((res) => res.json())
      .then((data: WeatherData) => setData(data))
      .catch((err) => console.error("API error:", err));
  }, [apiKey]);
  return (
    <footer className="pb-2 px-8 lg:px-16 w-full">
      <div className="flex justify-between items-center">
        <div className="hidden sm:flex items-center gap-2">
          <p className="text-sm lg:text-base">Made with</p>
          <RxHeart className="w-6 h-6" />
          <p className="text-sm lg:text-base">by the Real 331 Sigmas</p>
        </div>
        <div className="flex space-x-10 items-center">
          {data && (
            <div className="flex items-center text-sm lg:text-base">
              <Image
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                alt="Weather Icon"
                width={50}
                height={50}
              />
              <span>
                {Math.round(((data.main.temp - 273.15) * 9) / 5 + 32)}°F,{" "}
                {data.weather[0].description}
              </span>
            </div>
          )}
          <div className="flex items-center gap-4">
          <a
            href="https://github.com/CSCE331-Spring2025/project3-team64"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            <RxGithubLogo className="w-6 h-6" />
          </a>
          <ChatBot/>
          </div>
        </div>
      </div>
    </footer>
  );
}

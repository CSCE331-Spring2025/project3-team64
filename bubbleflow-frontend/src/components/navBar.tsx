"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { useEffect, useState } from "react";
import { WeatherData } from "@/lib/weather";

export default function NavBar() {
  const [data, setData] = useState<WeatherData | null>(null);
    
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    useEffect(() => {
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=30.615011&lon=-96.342476&appid=${apiKey}`)
        .then((res) => res.json())
        .then((data: WeatherData) => setData(data))
        .catch((err) => console.error('API error:', err));
    }, []);
  const pathname = usePathname();
  const showNavLinks = pathname !== "/" && pathname !== "/select-role" && pathname !== "/menu-board";

  return (
    <div className="flex items-center justify-between px-16 py-6">
      <div className="flex items-center gap-6">
        <Link href ="/create-order">
          <Image
            src="/bubbleflow-logo.png"
            alt="BubbleFlow Logo"
            width={125}
            height={125}
          />
        </Link>
      {data && (
        <div className="flex items-center gap-2 text-sm text-gray-700">
            <img
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt="Weather Icon"
              className="w-10 h-10"
              />
            <span>
              {Math.round((data.main.temp - 273.15) * 9/5 + 32)}°F,{" "}
              {data.weather[0].description}
            </span>
          </div>
        )}
        </div>
      {showNavLinks && (
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/create-order" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Create Order
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/view-order" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  View Order
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )}
      {!showNavLinks && (
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/menu-board" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Menu Board
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )}
      </div>
  );
}

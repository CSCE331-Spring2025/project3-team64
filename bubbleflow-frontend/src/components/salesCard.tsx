import React from 'react';
import { Badge } from './ui/badge';
import { useEffect, useState } from 'react';

interface SalesCardProps {
  id: number;
  name: string;
  category: string;
  price: string;
  revenue: string;
}

export default function SalesCard({ id, name, category, price, revenue }: SalesCardProps){
  const [highContrast, setHighContrast] = useState(false);
  const categoryColors: Record<string, { badgeBg: string; badgeText: string }> =
  {
    "Milk Teas": { badgeBg: "bg-[#ead2a2]", badgeText: "text-[#6F403A]" },
    "Brewed Tea": { badgeBg: "bg-[#dfcebb]", badgeText: "text-[#6F403A]" },
    "Fruit Tea": { badgeBg: "bg-[#dbb9a7]", badgeText: "text-[#6F403A]" },
    "Fresh Milk": { badgeBg: "bg-[#f0dece]", badgeText: "text-[#6F403A]" },
    "Ice Blended": { badgeBg: "bg-[#ebd1b5]", badgeText: "text-[#6F403A]" },
    "Tea Mojito": { badgeBg: "bg-[#f6cdb1]", badgeText: "text-[#6F403A]" },
    "Creama": { badgeBg: "bg-[#f3ecdf]", badgeText: "text-[#6F403A]" },
  };

  useEffect(() => {
      const flag = localStorage.getItem("high-contrast");
      setHighContrast(flag === "true");
    }, []);

  const categoryColor = highContrast ?
  { badgeBg: "bg-muted-foreground", badgeText: "text-muted" } :
  (category && categoryColors[category]) || {
    badgeBg: "bg-[#f0dece]",
    badgeText: "text-[#6F403A]",
  };

  const fmt = (value: string | number | undefined) => {
    const cleaned = String(value ?? "0").replace(/[^0-9.-]+/g, "");
    const num = parseFloat(cleaned);
    return (isNaN(num) ? 0 : num).toFixed(2);
  };

  return (
    <div className="flex border border-primary p-4 rounded-xl w-full justify-between">
      <div className="flex flex-col gap-1">
        <p className="font-semibold">{name}</p>
        <div className="flex gap-4">
          <Badge className={`${categoryColor.badgeBg} ${categoryColor.badgeText} font-normal px-3 rounded-3xl border-1 border-border`}>
            {category}
          </Badge>
          <p className="text-sm text-gray-500">${fmt(price)}</p>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-semibold text-right">{fmt(revenue)}</p>
        <p className="text-sm text-gray-500 text-right">Count: {id}</p>
      </div>
    </div>
  );
};


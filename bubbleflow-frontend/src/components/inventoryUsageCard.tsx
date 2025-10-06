"use client";

import { Badge } from "@/components/ui/badge";

interface InventoryUsageCardProps {
  name: string;
  amount: string;
  metric: string;
  badgeText: string;
  itemId: string;
}

// Displays manager side inventory item info cards
export function InventoryUsageCard({
  name,
  amount,
  metric,
  badgeText,
  itemId,
}: InventoryUsageCardProps) {
  const formattedAmount = amount
  .split(" ")
  .map((word, idx) =>
    idx === 1
      ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      : word
  )
  .join(" ");
  console.log(formattedAmount)
  return (
    <div className="flex flex-col gap-1 border border-primary p-4 rounded-xl">
      <div className="flex justify-between">
        <p className="font-semibold text-primary">{name}</p>
        <p className="font-semibold">{amount} {metric} used</p>
      </div>
      <div className="flex gap-2 justify-between items-center">
        <div className="flex gap-4 items-center">
          <p className="text-sm text-gray-500">ID: {itemId}</p>
        </div>
      </div>
    </div>
  );
}
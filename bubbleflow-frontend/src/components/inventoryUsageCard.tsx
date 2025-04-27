"use client";

import { Badge } from "@/components/ui/badge";

interface InventoryUsageCardProps {
  name: string;
  amount: string;
  badgeText: string;
  itemId: string;
}

export function InventoryUsageCard({
  name,
  amount,
  badgeText,
  itemId,
}: InventoryUsageCardProps) {
  return (
    <div className="flex flex-col gap-1 border border-primary p-4 rounded-xl">
      <div className="flex justify-between">
        <p className="font-semibold text-primary">{name}</p>
        <p className="font-semibold">{amount}</p>
      </div>
      <div className="flex gap-2 justify-between items-center">
        <div className="flex gap-4 items-center">
          <Badge className="bg-[#f0dece] text-[#6F403A] font-normal px-3 rounded-3xl">
            {badgeText}
          </Badge>
          <p className="text-sm text-gray-500">ID: {itemId}</p>
        </div>
      </div>
    </div>
  );
}
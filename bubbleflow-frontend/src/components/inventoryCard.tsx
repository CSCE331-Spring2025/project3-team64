"use client";

import { Badge } from "@/components/ui/badge";
import { RiDeleteBin5Line, RiPencilLine } from "react-icons/ri";

interface InventoryCardProps {
  name: string;
  amount: string;
  badgeText: string;
  itemId: string;
}

export function InventoryCard({
  name,
  amount,
  badgeText,
  itemId,
}: InventoryCardProps) {
  return (
    <div className="flex flex-col gap-1 border border-[#6F403A] p-4 rounded-xl">
      <div className="flex justify-between">
        <p className="font-semibold text-[#6F403A]">{name}</p>
        <p className="font-semibold">{amount}</p>
      </div>
      <div className="flex gap-2 justify-between items-center">
        <div className="flex gap-4 items-center">
          <Badge className="bg-[#ead2a2] text-[#6F403A] font-normal px-3 rounded-3xl">
            {badgeText}
          </Badge>
          <p className="text-sm text-gray-500">ID: {itemId}</p>
        </div>
        <div className="flex gap-2 justify-end items-center">
          <div className="bg-[#6F403A] w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#4E2D26] hover:-translate-y-1 duration-300">
            <RiPencilLine className="text-white" size={20} />
          </div>
          <div className="bg-[#6F403A] w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#4E2D26] hover:-translate-y-1 duration-300">
            <RiDeleteBin5Line className="text-white" size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}

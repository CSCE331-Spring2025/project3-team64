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
    <div className="flex flex-col gap-1 border border-primary p-4 rounded-xl">
      <div className="flex justify-between">
        <p className="font-semibold text-primary">{name}</p>
        <p className="font-semibold">{amount}</p>
      </div>
      <div className="flex gap-2 justify-between items-center">
        <div className="flex gap-4 items-center">
          <Badge className="bg-sidebar-border border-border border-1 text-primary font-normal px-3 rounded-3xl">
            {badgeText}
          </Badge>
          <p className="text-sm text-gray-500">ID: {itemId}</p>
        </div>
        <div className="flex gap-2 justify-end items-center">
          <div className="bg-primary w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted hover:-translate-y-1 duration-300">
            <RiPencilLine className="text-white" size={20} />
          </div>
          <div className="bg-primary w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted hover:-translate-y-1 duration-300">
            <RiDeleteBin5Line className="text-white" size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}

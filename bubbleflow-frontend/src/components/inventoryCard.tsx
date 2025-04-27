"use client";

import { Badge } from "@/components/ui/badge";
import { RiDeleteBin5Line, RiPencilLine } from "react-icons/ri";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "./ui/select";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
interface InventoryCardProps {
  name: string;
  amount: string;
  badgeText: string;
  itemId: string;
}
const categoryOptions = [
  { id: "1", label: "UrMom" },
  { id: "2", label: "Sigma" },
  { id: "1", label: "GMI" },
  { id: "2", label: "NGMI" },
];
export function InventoryCard({
  name,
  amount,
  badgeText, //currently used to show stock status (Good, Low Stock, Out of Stock)
  itemId,
}: InventoryCardProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(badgeText);
  const formattedAmount = amount
  .split(" ")
  .map((word, idx) =>
    idx === 1
      ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      : word
  )
  .join(" ");
  return (
    <div className="flex flex-col gap-1 border border-primary p-4 rounded-xl">
      <div className="flex justify-between">
        <p className="font-semibold text-primary">{name}</p>
        <p className="font-semibold">{formattedAmount}</p>
      </div>
      <div className="flex gap-2 justify-between items-center">
        <div className="flex gap-4 items-center">
          <Badge className="bg-[#f0dece] text-[#6F403A] font-normal px-3 rounded-3xl">
            {selectedCategory}
          </Badge>
          <p className="text-sm text-gray-500">ID: {itemId}</p>
        </div>
        <div className="flex gap-2 justify-end items-center">
          <div className="bg-primary w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted hover:-translate-y-1 duration-300">
            <Dialog>
              <DialogTrigger>
                <RiPencilLine className="text-white" size={20} />
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit Inventory Item</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-8 py-4">
                  <div className="items-center gap-4">
                    <Label className="mb-2">Name</Label>
                    <Input placeholder="Item Name" defaultValue={""} />
                  </div>
                  <div className="items-center gap-4">
                    <Label className="mb-2">Amount</Label>
                    <Input placeholder="Item Email" defaultValue={""} />
                  </div>
                  <div className="items-center gap-4">
                    <Label className="mb-2">Item Metric</Label>
                    <Input placeholder="Item Metric" />
                  </div>
                  <div className="items-center gap-4">
                    <Label className="mb-2">Item Category</Label>
                    <Select
                      value={selectedCategory}
                      onValueChange={(val) => setSelectedCategory(val)}
                    >
                      <SelectTrigger className=" w-full">
                        <SelectValue placeholder="Choose category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoryOptions.map((option) => (
                          <SelectItem key={option.id} value={option.label}>
                            <span>{option.label}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button type="submit" className=" bg-primary hover:bg-muted">
                  Edit Inventory Item
                </Button>
              </DialogContent>
            </Dialog>
          </div>
          <div className="bg-primary w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted hover:-translate-y-1 duration-300">
            <RiDeleteBin5Line className="text-white" size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}

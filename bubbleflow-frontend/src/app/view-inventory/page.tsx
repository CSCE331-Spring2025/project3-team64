"use client";

import { InventoryCard } from "@/components/inventoryCard";
import { Input } from "@/components/ui/input";
import { RiSearchLine } from "react-icons/ri";
import { DatePicker } from "@/components/datePicker";
const inventoryItems = [
  {
    name: "Classic Pearl Milk Tea Base",
    amount: "25 lbs",
    badgeText: "Ur Mom",
    itemId: "1",
  },
  {
    name: "Honey Boba Pearls",
    amount: "10 lbs",
    badgeText: "ur mom",
    itemId: "2",
  },
  {
    name: "Taro Powder",
    amount: "5 lbs",
    badgeText: "sigma sigma",
    itemId: "3",
  },
  {
    name: "Taro Powder",
    amount: "5 lbs",
    badgeText: "sigma sigma",
    itemId: "3",
  },
  {
    name: "Taro Powder",
    amount: "5 lbs",
    badgeText: "sigma sigma",
    itemId: "3",
  },
  {
    name: "Taro Powder",
    amount: "5 lbs",
    badgeText: "sigma sigma",
    itemId: "3",
  },
];

export default function ViewInventory() {
  return (
    <main className="flex flex-col px-16 pb-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Inventory</h1>
        <div className="relative w-80">
          <Input
            className="border-primary h-10 rounded-3xl pr-12"
            placeholder="Search for an Inventory Item"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary w-7 h-7 rounded-full flex items-center justify-center">
            <RiSearchLine className="text-white" size={15} />
          </div>
        </div>
      </div>
      <div className="mt-4 gap-2 grid grid-cols-2">
        {inventoryItems.map((item) => (
          <InventoryCard
            key={item.itemId}
            name={item.name}
            amount={item.amount}
            badgeText={item.badgeText}
            itemId={item.itemId}
          />
        ))}
      </div>
      <div className="flex flex-col mt-8">
        <h1 className="text-xl font-semibold">Inventory Use</h1>
        <div className="flex justify-between mt-2 items-center">
          <div className=" flex gap-4">
            <div className="flex gap-2 items-center">
              <p>From</p>
              <DatePicker />
            </div>
            <div className="flex gap-2 items-center">
              <p>To</p>
              <DatePicker />
            </div>
          </div>
          <div className="relative w-80">
            <Input
              className="border-primary h-10 rounded-3xl pr-12"
              placeholder="Search for an Inventory Item"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary w-7 h-7 rounded-full flex items-center justify-center">
              <RiSearchLine className="text-white" size={15} />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 gap-2 grid grid-cols-2">
        {inventoryItems.map((item) => (
          <InventoryCard
            key={item.itemId}
            name={item.name}
            amount={item.amount}
            badgeText={item.badgeText}
            itemId={item.itemId}
          />
        ))}
      </div>
    </main>
  );
}

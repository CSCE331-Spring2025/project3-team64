"use client";

import { InventoryCard } from "@/components/inventoryCard";

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
];

export default function ViewInventory() {
  return (
    <main className="flex flex-col px-16">
      <h1 className="text-xl font-semibold">Ingredient Inventory</h1>
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


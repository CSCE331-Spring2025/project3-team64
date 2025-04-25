import Image from "next/image";
import { useState, useEffect } from "react";
import { OrderSubmission, OrderItemWithExtras } from "@/app/service/types";

const categoryColors: Record<string, { badgeBg: string }> = {
  "Milk Teas": { badgeBg: "bg-[#ead2a2]" },
  "Brewed Tea": { badgeBg: "bg-[#dfcebb]" },
  "Fruit Tea": { badgeBg: "bg-[#dbb9a7]" },
  "Fresh Milk": { badgeBg: "bg-[#f0dece]" },
  "Ice Blended": { badgeBg: "bg-[#ebd1b5]" },
  "Tea Mojito": { badgeBg: "bg-[#f6cdb1]" },
  Creama: { badgeBg: "bg-[#f3ecdf]" },
};
const imageMap: Record<string, string> = {
  "Classic Pearl Milk Tea": "/classic-pearl-milk-tea.png",
  "Honey Milk Tea": "/honey-milk-tea.png",
  "Classic Coffee": "/classic-coffee.png",
  "Ginger Milk Tea": "/ginger-milk-tea.png",
  "Thai Pearl Milk Tea": "/thai-pearl-milk-tea.png",
  "Taro Pearl Milk Tea": "/taro-milk-tea.png",
  "Classic Tea": "/classic-tea.png",
  "Wintermelon Tea": "/wintermelon-tea.png",
  "Honey Tea": "/honey-tea.png",
  "Ginger Tea": "/ginger-tea.png",
  "Mango Green Tea": "/mango-green-tea.png",
  "Wintermelon Lemonade": "/wintermelon-tea.png",
  "Strawberry Tea": "/strawberry-tea.png",
  "Peach Tea with Aiyu Jelly": "/peach-tea-with-aiyu-jelly.png",
  "Kiwi Fruit Tea with Aiyu Jelly": "/kiwi-fruit-tea-with-aiyu-jelly.png",
  "Mango & Passion Fruit Tea": "/mango-&-passion-fruit-tea.png",
  "Cocoa Lover with Fresh Milk": "/cocoa-lover-with-fresh-milk.png",
  "Homemade Taro with Fresh Milk": "/homemade-taro-with-fresh-milk.png",
  "Matcha with Fresh Milk": "/matcha-with-fresh-milk.png",
  "Oreo Ice Blended with Pearl": "/oreo-ice-blended-with-pearl.png",
  "Matcha Red Bean Ice Blended with Ice Cream":
    "/matcha-red-bean-ice-blended-with-ice-cream.png",
  "Coffee Ice Blended with Ice Cream": "/coffee-ice-blended-with-ice-cream.png",
  "Mango Ice Blended with Ice Cream": "/mango-ice-blended-with-ice-cream.png",
  "Strawberry Ice Blended with Lychee Jelly & Ice Cream":
    "/strawberry-ice-blended-with-lychee-and-ice-cream.png",
  "Lime Mojito": "/lime-mojito.png",
  "Mango Mojito": "/mango-mojito.png",
  "Peach Mojito": "/peach-mojito.png",
  "Strawberry Mojito": "/strawberry-mojito.png",
  "Creama Tea": "/creama-tea.png",
  "Match Creama": "/matcha-creama.png",
  "Coffee Creama": "/coffee-creama.png",
  "Cocoa Creama": "/cocoa-creama.png",
};
/*export interface OrderItem {
  name: string;
  category: string;
  iceLevel: string;
  sugarLevel: string;
  toppings: string[];
  price: string;
}*/

export interface OrderHistoryCardProps {
  orderNumber: number | string;
  total: string;
  paymentMethod: string;
  date: string;
  time: string;
  orderedBy: string;
  items: OrderItemWithExtras[];
}

export function OrderHistoryCard({
  orderNumber,
  total,
  paymentMethod,
  date,
  time,
  orderedBy,
  items,
}: OrderHistoryCardProps) {


  const fmt = (value: string | number | undefined) => {
    const cleaned = String(value ?? "0").replace(/[^0-9.-]+/g, "");
    const num = parseFloat(cleaned);
    return (isNaN(num) ? 0 : num).toFixed(2);
  };
  
  return (
    <div className="border border-primary p-4 rounded-xl">
      <div className="flex justify-between">
        <p className="font-semibold">Order #{orderNumber}</p>

        <p className="font-semibold">Total: ${fmt(total)}</p>
      </div>
      <div className="flex justify-between text-sm mt-1">
        <div className="flex gap-4">
          <p>{date}</p>
          <p>{time}</p>
        </div>
        <div className=" flex gap-4">
          <p>Payed with <span className=" text-gray-500">{paymentMethod}</span></p>
          <p>Ordered by <span className=" text-gray-500">{orderedBy}</span></p>
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-2">
        {items.map((item, idx) => {
          const { badgeBg } = 
          categoryColors[item.drink.drink_category.drink_category_name] ?? {
            badgeBg: "bg-gray-200",
          };
          return (
            <div key={idx} className="flex gap-6">
              <div
                className={`${badgeBg} rounded-xl flex justify-center py-4 w-1/6`}
              >
                <div className="transition-transform duration-300 hover:scale-110">
                  <Image
                    src={imageMap[item.drink.drink_name] || "/classic-pearl-milk-tea.png"}
                    alt={item.drink.drink_name}
                    width={60}
                    height={60}
                  />
                </div>
              </div>
              <div className="flex flex-1">
                <div className="flex flex-1 justify-between">
                  <div>
                    <p className="text-primary font-semibold">{item.drink.drink_name}</p>
                    <div className="text-sm text-gray-400">
                      {<p>{"100% Ice (placeholder)"}</p>}
                      {<p>{"100% Sugar (placeholder)"}</p>}
                      {item.extras.length > 0 && (
                        <p>{item.extras.map((extra) => extra.extra.extra_name).join(", ")}</p>
                      )}
                    </div>
                  </div>
                  <p>{fmt(
                    item.drink.drink_price +
                    item.extras.reduce((acc, extra) => acc + extra.extra.extra_price, 0)
                  )}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

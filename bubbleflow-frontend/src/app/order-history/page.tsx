"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  OrderHistoryCard,
  OrderHistoryCardProps,
} from "@/components/orderHistoryCard";
const orderHistoryData: OrderHistoryCardProps[] = [
  {
    orderNumber: 69,
    total: "14.28",
    date: "January 1st 2025",
    time: "12:00 AM",
    orderedBy: "Sophia Phu",
    items: [
      {
        name: "Classic Pearl Milk Tea",
        category: "Milk Teas",
        iceLevel:"100% Ice",
        sugarLevel:"100% Sugar",
        toppings: ["Boba, Creama, Lychee Jelly"],
        price: "5.99",
      },
      {
        name: "Taro Pearl Milk Tea",
        category: "Milk Teas",
        iceLevel:"100% Ice",
        sugarLevel:"100% Sugar",
        toppings: ["No Toppings"],
        price: "6.29",
      },
    ],
  },
  {
    orderNumber: 70,
    total: "11.4",
    date: "January 2nd 2025",
    time: "2:15 PM",
    orderedBy: "Ur Mom",
    items: [
      {
        name: "Taro Pearl Milk Tea",
        category: "Milk Teas",
        iceLevel:"75% Ice",
        sugarLevel:"75% Sugar",
        toppings: ["Grass Jelly", "Aiyu Jelly"],
        price: "5.49",
      },
      {
        name: "Ginger Tea",
        category: "Brewed Tea",
        iceLevel:"No Ice",
        sugarLevel:"No Sugar",
        toppings: ["Boba"],
        price: "5.99",
      },
    ],
  },
  {
    orderNumber: 71,
    total: "11.48",
    date: "January 3rd 2025",
    time: "5:15 PM",
    orderedBy: "Among Us",
    items: [
      {
        name: "Peach Mojito",
        category: "Tea Mojito",
        iceLevel:"75% Ice",
        sugarLevel:"75% Sugar",
        toppings: ["Lychee Jelly", "Aiyu Jelly", "Boba"],
        price: "5.49",
      },
    ],
  },
];
export default function OrderHistory() {
  return (
    <main className="flex flex-col px-16 pb-4">
      <div className="">
        <p className=" text-xl font-semibold">Order history</p>
        <div className="mt-4 flex flex-col gap-4">
          {orderHistoryData.map((order) => (
            <OrderHistoryCard
              key={order.orderNumber}
              orderNumber={order.orderNumber}
              total={order.total}
              date={order.date}
              time={order.time}
              orderedBy={order.orderedBy}
              items={order.items}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

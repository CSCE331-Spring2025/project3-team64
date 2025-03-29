'use client'
import { Button } from "@/components/ui/button";
import { RiDeleteBin5Line } from "react-icons/ri";
import OrderCard from "@/components/orderCard";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ViewOrder() {
  interface Order {
    drinkName: string;
    drinkCategory: string;
    drinkPrice: number;
    imageSrc: string;
    sugarLevel: string;
    iceLevel: string;
    toppings: string[];
    
  }
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const storedOrders = localStorage.getItem("orderItems");
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, []);

  return (
    <main className="flex px-16 gap-2 items-start pb-8">
      <div className="w-2/3 flex flex-col gap-2">
        {orders.map((order, index) => (
          <OrderCard
            key={index}
            drinkName={order.drinkName}
            iceLevel={order.iceLevel}
            sugarLevel={order.sugarLevel}
            toppings={order.toppings}
            price={order.drinkPrice}
            imageSrc={order.imageSrc}
          />
        ))}
      </div>
      <div className="border border-[#6F403A] p-2 px-4 w-1/3 rounded-xl">
        <div className="flex justify-between">
          <p className="text-sm">Subtotal</p>
          <p className="text-sm">$12.98</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-gray-400">Tax (10%)</p>
          <p className="text-sm text-gray-400">$1.30</p>
        </div>
        <hr className="mt-4 mb-4 border-[#6F403A]" />
        <div className="flex justify-between">
          <p className="font-semibold">Total</p>
          <p className="font-semibold">$14.28</p>
        </div>
        <div className="mt-2">
          <p className="font-semibold">Payment Method</p>
          <div className="flex gap-2 mt-2">
            <div className="border border-[#6F403A] p-2 rounded-xl w-1/3 flex flex-col items-center justify-center">
              <div className="bg-[#6F403A] w-8 h-8 rounded-full flex items-center justify-center">
                <RiDeleteBin5Line className="text-white" size={20} />
              </div>
              <p className="text-sm">Credit Card</p>
            </div>
            <div className="border border-[#6F403A] p-2 rounded-xl w-1/3 flex flex-col items-center justify-center">
              <div className="bg-[#6F403A] w-8 h-8 rounded-full flex items-center justify-center">
                <RiDeleteBin5Line className="text-white" size={20} />
              </div>
              <p className="text-sm">Gift Card</p>
            </div>
            <div className="border border-[#6F403A] p-2 rounded-xl w-1/3 flex flex-col items-center justify-center">
              <div className="bg-[#6F403A] w-8 h-8 rounded-full flex items-center justify-center">
                <RiDeleteBin5Line className="text-white" size={20} />
              </div>
              <p className="text-sm">Apple Pay</p>
            </div>
          </div>
        </div>
        <Dialog>
          <DialogTrigger className="w-full">
            <Button className="bg-[#6F403A] w-full mb-4 mt-4">
              Submit Order
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle className=" flex justify-center text-3xl">$14.28</DialogTitle>
            <div className=" flex flex-col justify-center text-center">
              <p>Transaction Complete</p>
              <p className=" text-sm text-gray-400">Order #69</p>
            </div>
            <div className=" flex flex-col gap-4 mt-4">
              <Button className="bg-[#6F403A]">Print Reciept</Button>
              <Button className="bg-[#6F403A]">Email Reciept</Button>
              <Button className="bg-[#6F403A]">Text Reciept</Button>
              <Button className="bg-[#6F403A]">No Reciept</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}

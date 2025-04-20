"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";
export default function OrderHistory() {
  return (
    <main className="flex flex-col px-16">
      <div className="">
        <p className=" text-xl font-semibold">Order history</p>
        <div className=" mt-4">
          <div className=" border border-[#6F403A] p-4 rounded-xl">
            <div>
              <div className=" flex justify-between">
                <p className=" font-semibold">Order #69</p>
                <p className=" font-semibold">Total: $14.28</p>
              </div>
              <div className="flex justify-between">
                <div className=" flex gap-4 text-sm">
                  <p>January 1st 2025</p>
                  <p>12:00 AM</p>
                </div>
                <div className=" flex gap-2 text-sm">
                  <p>Ordered by</p>
                  <p className=" text-gray-500">Sophia Phu</p>
                </div>
              </div>
            </div>
            <div className=" flex flex-col gap-4 mt-2">
            <div className="flex gap-6">
              <div className=" bg-[#ead2a2] rounded-xl flex justify-center py-4 w-1/6">
                <div className="transition-transform duration-300 hover:scale-110">
                  <Image
                    src={"/classic-pearl-milk-tea.png"}
                    alt="my drink"
                    width={60}
                    height={60}
                  />
                </div>
              </div>
              <div className=" flex flex-1">
                <div className="flex flex-1 justify-between">
                  <div>
                    <p className=" text-[#6F403A] font-semibold">
                      Classic Pearl Milk Tea
                    </p>
                    <div className=" text-sm text-gray-400">
                      <p>100% Ice</p>
                      <p>100% Sugar</p>
                      <p>Boba</p>
                    </div>
                  </div>
                  <p className=" font-semibold">$5.99</p>
                </div>
              </div>
            </div>
            <div className="flex gap-6">
              <div className=" bg-[#ead2a2] rounded-xl flex justify-center py-4 w-1/6">
                <div className="transition-transform duration-300 hover:scale-110">
                  <Image
                    src={"/classic-pearl-milk-tea.png"}
                    alt="my drink"
                    width={60}
                    height={60}
                  />
                </div>
              </div>
              <div className=" flex flex-1">
                <div className="flex flex-1 justify-between">
                  <div>
                    <p className=" text-[#6F403A] font-semibold">
                      Classic Pearl Milk Tea
                    </p>
                    <div className=" text-sm text-gray-400">
                      <p>100% Ice</p>
                      <p>100% Sugar</p>
                      <p>Boba</p>
                    </div>
                  </div>
                  <p className=" font-semibold">$5.99</p>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

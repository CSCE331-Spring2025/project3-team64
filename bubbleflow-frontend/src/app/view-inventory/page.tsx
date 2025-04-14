"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function ViewInventory() {
  return (
    <main className="flex flex-col px-16">
      <div className="">
        <div>
          <p className=" text-xl font-semibold">Ingredient Inventory</p>
        </div>
        <div>
          <div>
            <p className=" font-semibold text-[#6F403A]">Classic Pearl Milk Tea Base</p>
          </div>
        </div>
      </div>
    </main>
  );
}
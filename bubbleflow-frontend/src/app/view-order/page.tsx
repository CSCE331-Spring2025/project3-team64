import { Button } from "@/components/ui/button";
import { RiFileCopyLine } from "react-icons/ri";
import { RiDeleteBin5Line } from "react-icons/ri";
import { RiPencilLine } from "react-icons/ri";
import Image from "next/image";

export default function ViewOrder() {
  return (
    <main className="flex px-16 gap-2">
      <div className="w-2/3">
        <div className="flex gap-4 border border-[#6F403A] p-2 rounded-xl pr-4">
          <div className="bg-[#DBC89E] rounded-xl flex justify-center py-4 w-1/4">
            <Image
              src="/classic-pearl-milk-tea.png" 
              alt="BubbleFlow Logo"
              width={60} 
              height={75} 
            />
          </div>
          <div className=" flex justify-between w-3/4">
            <div> 
              <p className=" font-semibold text-[#6F403A]">Classic Pearl Milk Tea</p>
              <p className=" text-sm text-gray-400">100% Ice</p>
              <p className=" text-sm text-gray-400">100% Sugar</p>
            </div>
            <div className=" flex flex-col gap-2">
              <p className=" text-right text-[#6F403A] font-semibold">$5.99</p>
              <div className="flex gap-2">
                <div className="bg-[#6F403A] w-8 h-8 rounded-full flex items-center justify-center mb-2">
                  <RiPencilLine className="text-white" size={20} />
                </div>
                <div className="bg-[#6F403A] w-8 h-8 rounded-full flex items-center justify-center mb-2">
                  <RiFileCopyLine  className="text-white" size={20} />
                </div>
                <div className="bg-[#6F403A] w-8 h-8 rounded-full flex items-center justify-center mb-2">
                  <RiDeleteBin5Line className="text-white" size={20} />
                </div>
              </div>              
            </div>
          </div>
        </div>
      </div>
      <div className="border border-[#6F403A] p-2 px-4 w-1/3 rounded-xl">
        <div className=" flex justify-between">
          <p className=" text-sm">
            Subtotal
          </p>
          <p className=" text-sm">$12.98</p>
        </div>
        <div className=" flex justify-between">
          <p className=" text-sm text-gray-400">
            Tax (10%)
          </p>
          <p className=" text-sm text-gray-400">$1.30</p>
        </div>
        <hr className=" mt-4 mb-4 border-[#6F403A]"></hr>
        <div className=" flex justify-between">
          <p className=" font-semibold">
            Total
          </p>
          <p className=" font-semibold">$14.28</p>
        </div>
        <div className=" mt-2">
          <p className=" font-semibold">
            Payment Method
          </p>
          <div className=" flex gap-2 mt-2">
            <div className=" border border-[#6F403A] p-2 rounded-xl w-1/3 flex flex-col items-center justify-center">
              <div className="bg-[#6F403A] w-8 h-8 rounded-full flex items-center justify-center">
                <RiDeleteBin5Line className="text-white" size={20} />
              </div>
              <p className="text-sm">Credit Card</p>
            </div>
            <div className=" border border-[#6F403A] p-2 rounded-xl w-1/3 flex flex-col items-center justify-center">
              <div className="bg-[#6F403A] w-8 h-8 rounded-full flex items-center justify-center">
                <RiDeleteBin5Line className="text-white" size={20} />
              </div>
              <p className="text-sm">Gift Card</p>
            </div>
            <div className=" border border-[#6F403A] p-2 rounded-xl w-1/3 flex flex-col items-center justify-center">
              <div className="bg-[#6F403A] w-8 h-8 rounded-full flex items-center justify-center">
                <RiDeleteBin5Line className="text-white" size={20} />
              </div>
              <p className="text-sm">Apple Pay</p>
            </div>
          </div>
        </div>
        <Button className="bg-[#6F403A] w-full mb-4 mt-4">
          Submit Order
        </Button>
      </div>
    </main>
  );
}
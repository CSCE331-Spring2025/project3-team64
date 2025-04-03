import Image from "next/image";
import { RiPencilLine, RiFileCopyLine, RiDeleteBin5Line } from "react-icons/ri";
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import DrinkEditDialog from "@/components/editCard"

interface OrderCardProps {
  drinkName: string;
  drinkCategory: string;
  sugarLevel: string;
  iceLevel: string;
  toppings: string[];
  toppingIds: number[];
  drinkPrice: number;
  topPrice: number;
  totalPrice: number;
  imageSrc: string;
  drinkId: number;
  itemId: number;
}

interface OrderItem {
  drinkName: string;
  drinkCategory: string;
  sugarLevel: string;
  iceLevel: string;
  toppings: string[];
  toppingIds: number[];
  price: number;
  imageSrc?: string;
  drinkId: number;
  itemId: number;
}

export default function OrderCard({
  drinkName,
  drinkCategory,
  sugarLevel,
  iceLevel,
  toppings,
  toppingIds,
  drinkPrice,
  topPrice,
  totalPrice,
  imageSrc,
  drinkId,
  itemId = Date.now(),
}: OrderCardProps) {

  //function to control customization dialog state
  const [isOpen, setIsOpen] = useState(false);

  const categoryBackgrounds: Record<string, string> = {
    "Milk Teas": "bg-[#ead2a2]",
    "Brewed Tea": "bg-[#e3ceb7]",
    "Fruit Tea": "bg-[#dbb9a7]",
    "Fresh Milk": "bg-[#f0dece]",
    "Ice Blended": "bg-[#ebd1b5]",
    "Tea Mojito": "bg-[#f6cdb1]",
    Creama: "bg-[#f3ecdf]",
    default: "bg-[#f0dece]",
  };
  // const sugarOptions = ["No Sugar", "Less Sugar", "Half Sugar", "Full Sugar"];
  // const iceOptions = ["No Ice", "Less Ice", "Regular Ice", "Extra Ice"];
  // const myToppings = [
  //   "Boba",
  //   "Grass Jelly",
  //   "Pudding",
  //   "Red Bean",
  //   "Aloe",
  //   "Coconut Jelly",
  // ];
  console.log(drinkCategory);
  const imageBgColor =
    categoryBackgrounds[drinkCategory] || categoryBackgrounds.default;


  const handleDelete = () => {
    let orderItems = JSON.parse(localStorage.getItem("orderItems") || "[]");
    orderItems = orderItems.filter((item: OrderItem) => item.itemId !== itemId);
    localStorage.setItem("orderItems", JSON.stringify(orderItems));

    //Update order price
    const currentTotal = parseFloat(localStorage.getItem("orderprice") || "0");
    const newTotal = currentTotal - totalPrice;
    localStorage.setItem("orderprice", newTotal.toString());

    //Reload the window
    window.location.reload();
  };

  const handleCopy = () => {
    const orderItem = {
      drinkName,
      drinkCategory,
      drinkPrice,
      topPrice,
      totalPrice,
      imageSrc,
      sugarLevel: sugarLevel,
      iceLevel: iceLevel,
      toppings,
      toppingIds,
      drinkId,
      itemId: Date.now(),
    };

    const existingOrders = JSON.parse(
      localStorage.getItem("orderItems") || "[]"
    );
    existingOrders.push(orderItem);
    localStorage.setItem("orderItems", JSON.stringify(existingOrders));

    const currentTotal = parseFloat(localStorage.getItem("orderprice") || "0");
    const newTotal = currentTotal + orderItem.totalPrice;
    localStorage.setItem("orderprice", newTotal.toString());

    window.location.reload();
  };

  return (
    <div className="flex gap-4 border border-[#6F403A] p-2 rounded-xl pr-4">
      <div
        className={`${imageBgColor} rounded-xl flex justify-center py-4 w-1/4`}
      >
        <div className="transition-transform duration-300 hover:scale-110">
          <Image src={imageSrc} alt={drinkName} width={60} height={75} />
        </div>
      </div>
      <div className="flex justify-between w-3/4">
        <div>
          <p className="font-semibold text-[#6F403A]">{drinkName}</p>
          <p className="text-sm text-gray-400">{iceLevel}</p>
          <p className="text-sm text-gray-400">{sugarLevel}</p>
          <p className="text-sm text-gray-400">{toppings.length > 0 ? toppings.join(", ") : "No Toppings"}</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-right text-[#6F403A] font-semibold">
            ${totalPrice.toFixed(2)}
          </p>
          <div className="flex gap-2">
            { <Dialog>
              <DialogTrigger asChild> 
              <div className="bg-[#6F403A] w-8 h-8 rounded-full flex items-center justify-center mb-2 hover:bg-[#4E2D26]"
              onClick={() => setIsOpen(true)}>
              <RiPencilLine className="text-white" size={20} />
            </div>
              </DialogTrigger>
              {isOpen && <DrinkEditDialog
                drinkPrice={drinkPrice}
                topPrice={topPrice}
                totalPrice={totalPrice}
                iceOption={iceLevel}
                sugarOption={sugarLevel}
                drinkName={drinkName}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                itemId={itemId}
                currToppings={toppings}
              />}
            </Dialog> }
            <div
              className="bg-[#6F403A] w-8 h-8 rounded-full flex items-center justify-center mb-2 hover:bg-[#4E2D26] cursor-pointer"
              onClick={handleCopy}
            >
              <RiFileCopyLine className="text-white" size={20} />
            </div>
            <div
              className="bg-[#6F403A] w-8 h-8 rounded-full flex items-center justify-center mb-2 hover:bg-[#4E2D26] cursor-pointer"
              onClick={handleDelete}
            >
              <RiDeleteBin5Line className="text-white" size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

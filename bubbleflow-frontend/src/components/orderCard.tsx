import Image from "next/image";
import { RiPencilLine, RiFileCopyLine, RiDeleteBin5Line } from "react-icons/ri";

interface OrderCardProps {
  drinkName: string;
  sugarLevel: string;
  iceLevel: string;
  toppings: string[]; 
  price: number;
  imageSrc: string;
}

interface OrderItem{
  drinkName: string;
  sugarLevel: string;
  iceLevel: string;
  toppings: string[];
  price: number;
  imageSrc?: string;
}

export default function OrderCard({
  drinkName,
  sugarLevel,
  iceLevel,
  toppings,
  price,
  imageSrc,
}: OrderCardProps) {
  const handleDelete = () => {
    let orderItems = JSON.parse(localStorage.getItem("orderItems") || "[]");
    orderItems = orderItems.filter(
      (item: OrderItem) => 
      item.drinkName !== drinkName ||
      item.sugarLevel !== sugarLevel ||
      item.iceLevel !== iceLevel ||
      JSON.stringify(item.toppings) !== JSON.stringify(toppings)
    );
    localStorage.setItem("orderItems", JSON.stringify(orderItems));

    //Update order price
    const currentTotal = parseFloat(localStorage.getItem("orderprice") || "0");
    const newTotal = currentTotal - price;
    localStorage.setItem("orderprice", newTotal.toString());
    window.location.reload();
  };
  return (
    <div className="flex gap-4 border border-[#6F403A] p-2 rounded-xl pr-4">
      <div className="bg-[#DBC89E] rounded-xl flex justify-center py-4 w-1/4">
        <Image src={imageSrc} alt={drinkName} width={60} height={75} />
      </div>
      <div className="flex justify-between w-3/4">
        <div>
          <p className="font-semibold text-[#6F403A]">{drinkName}</p>
          <p className="text-sm text-gray-400">{iceLevel}</p>
          <p className="text-sm text-gray-400">{sugarLevel}</p>
          <p className="text-sm text-gray-400">{toppings.join(", ")}</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-right text-[#6F403A] font-semibold">
            ${price.toFixed(2)}
          </p>
          <div className="flex gap-2">
            <div className="bg-[#6F403A] w-8 h-8 rounded-full flex items-center justify-center mb-2">
              <RiPencilLine className="text-white" size={20} />
            </div>
            <div className="bg-[#6F403A] w-8 h-8 rounded-full flex items-center justify-center mb-2">
              <RiFileCopyLine className="text-white" size={20} />
            </div>
            <div className="bg-[#6F403A] w-8 h-8 rounded-full flex items-center justify-center mb-2 hover:bg-[#4E2D26] cursor-pointer"
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

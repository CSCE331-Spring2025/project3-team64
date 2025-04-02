import Image from "next/image";
import { RiPencilLine, RiFileCopyLine, RiDeleteBin5Line } from "react-icons/ri";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface OrderCardProps {
  drinkName: string;
  drinkCategory: string;
  sugarLevel: string;
  iceLevel: string;
  toppings: string[];
  toppingIds: number[];
  price: number;
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
  price,
  imageSrc,
  drinkId,
  itemId = Date.now(),
}: OrderCardProps) {
  const categoryBackgrounds: Record<string, string> = {
    "Milk Teas": "bg-[#DBC89E]",
    "Brewed Tea": "bg-[#cfc0ac]",
    "Fruit Tea": "bg-[#dbb9a7]",
    "Fresh Milk": "bg-[#f0dece]",
    "Ice Blended": "bg-[#d7aa7c]",
    "Tea Mojito": "bg-green-200",
    Creama: "bg-yellow-200",
    default: "bg-gray-200",
  };
  const sugarOptions = ["No Sugar", "Less Sugar", "Half Sugar", "Full Sugar"];
  const iceOptions = ["No Ice", "Less Ice", "Regular Ice", "Extra Ice"];
  const myToppings = [
    "Boba",
    "Grass Jelly",
    "Pudding",
    "Red Bean",
    "Aloe",
    "Coconut Jelly",
  ];
  console.log(drinkCategory);
  const imageBgColor =
    categoryBackgrounds[drinkCategory] || categoryBackgrounds.default;
  const handleDelete = () => {
    let orderItems = JSON.parse(localStorage.getItem("orderItems") || "[]");
    orderItems = orderItems.filter((item: OrderItem) => item.itemId !== itemId);
    localStorage.setItem("orderItems", JSON.stringify(orderItems));

    //Update order price
    const currentTotal = parseFloat(localStorage.getItem("orderprice") || "0");
    const newTotal = currentTotal - price;
    localStorage.setItem("orderprice", newTotal.toString());

    //Reload the window
    window.location.reload();
  };

  const handleCopy = () => {
    const newOrder = {
      drinkName,
      drinkCategory,
      drinkPrice: price,
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
    existingOrders.push(newOrder);
    localStorage.setItem("orderItems", JSON.stringify(existingOrders));

    const currentTotal = parseFloat(localStorage.getItem("orderprice") || "0");
    const newTotal = currentTotal + newOrder.drinkPrice;
    localStorage.setItem("orderprice", newTotal.toString());

    window.location.reload();
  };

  return (
    <div className="flex gap-4 border border-[#6F403A] p-2 rounded-xl pr-4">
      <div
        className={`${imageBgColor} rounded-xl flex justify-center py-4 w-1/4`}
      >
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
            <Dialog>
              <DialogTrigger asChild>
              <div className="bg-[#6F403A] w-8 h-8 rounded-full flex items-center justify-center mb-2 hover:bg-[#4E2D26]">
              <RiPencilLine className="text-white" size={20} />
            </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{drinkName}</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-8 py-4">
                  <div className="items-center gap-4">
                    <Label className="mb-2">Sugar</Label>
                    <Select>
                      <SelectTrigger className=" w-full">
                        <SelectValue placeholder="Select an Option" />
                      </SelectTrigger>
                      <SelectContent>
                        {sugarOptions.map((option, idx) => (
                          <SelectItem key={idx} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="items-center gap-4">
                    <Label className="mb-2">Ice</Label>
                    <Select>
                      <SelectTrigger className=" w-full">
                        <SelectValue placeholder="Select an Option" />
                      </SelectTrigger>
                      <SelectContent>
                        {iceOptions.map((option, idx) => (
                          <SelectItem key={idx} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="mb-2">Toppings</Label>
                    <div className=" flex flex-wrap gap-2">
                      {myToppings.map((topping, idx) => (
                        <Badge
                          key={idx}
                          className="rounded-4xl px-2 bg-white text-black border-gray-200 flex items-center"
                        >
                          <div className="w-4 h-4 rounded-full border mr-1"></div>
                          <p className="text-sm font-normal">{topping}</p>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <Button type="submit" className=" bg-[#6F403A]">
                  Add Item to Order
                </Button>
              </DialogContent>
            </Dialog>
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

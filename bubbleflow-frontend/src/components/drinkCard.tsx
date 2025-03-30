import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Image from "next/image";

interface DrinkCardProps {
  drinkName: string;
  drinkCategory: string | undefined;
  drinkPrice: number | string;
  imageSrc: string;
}


export default function DrinkCard({
  drinkName,
  drinkCategory,
  drinkPrice,
  imageSrc,
}: DrinkCardProps) {
  const sugarOptions = ["No Sugar", "Less Sugar", "Half Sugar", "Full Sugar"];
  const iceOptions = ["No Ice", "Less Ice", "Regular Ice", "Extra Ice"];
  const toppings = [
    "Boba",
    "Grass Jelly",
    "Pudding",
    "Red Bean",
    "Aloe",
    "Coconut Jelly",
  ];

  const [selectedSugar, setSelectedSugar] = useState(sugarOptions[0]);
  const [selectedIce, setSelectedIce] = useState(iceOptions[0]);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleToppingSelection = (topping: string) => {
    setSelectedToppings((prev) =>
      prev.includes(topping)
        ? prev.filter((t) => t !== topping)
        : [...prev, topping]
    );
  };

  const handleAddToOrder = () => {
    const orderItem = {
      drinkName,
      drinkCategory,
      drinkPrice,
      imageSrc,
      sugarLevel: selectedSugar,
      iceLevel: selectedIce,
      toppings: selectedToppings.length === 0 ? ["None"] : selectedToppings,
    };
    const existingOrders = JSON.parse(localStorage.getItem("orderItems") || "[]");
    existingOrders.push(orderItem);
    localStorage.setItem("orderItems", JSON.stringify(existingOrders));
    
    //I have literally no idea where the "x" is in the dialog box so I just made a variable to close it
    setIsOpen(false);
  };

  return (
    <div className="border border-[#6F403A] p-2 rounded-xl">
      <div className="bg-[#DBC89E] rounded-xl flex justify-center py-4">
        <Image
          src={imageSrc} 
          alt={drinkName}
          width={75} 
          height={75} 
        />
      </div>
      <p className="mt-2 font-semibold">{drinkName}</p>
      <div className="flex justify-between mt-1">
        <Badge className="bg-[#DBC89E] text-[#6F403A] font-normal px-3 rounded-3xl">
          {drinkCategory}
        </Badge>
        <p className="text-sm">${Number(drinkPrice).toFixed(2)}</p>
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="mt-6 w-full bg-[#6F403A]">Select Item</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{drinkName}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-8 py-4">
            <div className="items-center gap-4">
              <Label className="mb-2">
                Sugar
              </Label>
              <Select onValueChange={setSelectedSugar}>
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
              <Label className="mb-2">
                Ice
              </Label>
              <Select onValueChange={setSelectedIce}>
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
              <Label className="mb-2">
                Toppings
              </Label>
              <div className=" flex flex-wrap gap-2">
                {toppings.map((topping, idx) => (
                  <Badge
                    key={idx}
                    className="rounded-4xl px-2 bg-white text-black border-gray-200 flex items-center"
                    variant = {selectedToppings.includes(topping) ? "default" : "outline"}
                    onClick={() => handleToppingSelection(topping)}
                  >
                    <div className={selectedToppings.includes(topping) ? "w-4 h-4 rounded-full border mr-1 bg-black border-black" : "w-4 h-4 rounded-full border mr-1"}></div>
                    <p className="text-sm font-normal">{topping}</p>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <Button type="submit" className=" bg-[#6F403A]" onClick={handleAddToOrder}>Add Item to Order</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

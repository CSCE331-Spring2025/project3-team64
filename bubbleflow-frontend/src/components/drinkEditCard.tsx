import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { useExtras } from "@/app/hooks/useExtras";
import { Extra } from "@/app/service/types";

interface DrinkCardProps {
  drinkName: string;
  drinkCategory: string | undefined;
  drinkPrice: number;
  imageSrc: string;
  drinkId: number;
  itemId: number;
}

export default function DrinkEditCard({
  drinkName,
  drinkCategory,
  drinkPrice,
  imageSrc,
  drinkId,
  itemId,
}: DrinkCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const categoryOptions = [
    "Milk Teas",
    "Brewed Tea",
    "Fruit Tea",
    "Fresh Milk",
    "Ice Blended",
    "Tea Mojito",
    "Creama",
  ];
  const toppings = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const categoryColors: Record<string, { badgeBg: string; badgeText: string }> =
    {
      "Milk Teas": { badgeBg: "bg-[#ead2a2]", badgeText: "text-[#6F403A]" },
      "Brewed Tea": { badgeBg: "bg-[#dfcebb]", badgeText: "text-[#6F403A]" },
      "Fruit Tea": { badgeBg: "bg-[#dbb9a7]", badgeText: "text-[#6F403A]" },
      "Fresh Milk": { badgeBg: "bg-[#f0dece]", badgeText: "text-[#6F403A]" },
      "Ice Blended": { badgeBg: "bg-[#ebd1b5]", badgeText: "text-[#6F403A]" },
      "Tea Mojito": { badgeBg: "bg-[#f6cdb1]", badgeText: "text-[#6F403A]" },
      Creama: { badgeBg: "bg-[#f3ecdf]", badgeText: "text-[#6F403A]" },
    };

  const categoryColor = (drinkCategory && categoryColors[drinkCategory]) || {
    badgeBg: "bg-[#f0dece]",
    badgeText: "text-[#6F403A]",
  };
  return (
    <div className="border border-[#6F403A] p-2 rounded-xl flex flex-col justify-between">
      <div
        className={`${categoryColor.badgeBg} rounded-xl flex justify-center py-4`}
      >
        <div className="transition-transform duration-300 hover:scale-110">
          <Image src={imageSrc} alt={drinkName} width={75} height={75} />
        </div>
      </div>
      <p className="mt-2 font-semibold">{drinkName}</p>
      <div className="flex justify-between mt-1">
        <Badge
          className={`${categoryColor.badgeBg} ${categoryColor.badgeText} font-normal px-3 rounded-3xl`}
        >
          {drinkCategory}
        </Badge>
        <p className="text-sm">${Number(drinkPrice).toFixed(2)}</p>
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="mt-6 w-full bg-[#6F403A] hover:bg-[#4E2D26]">
            Edit Drink
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit {drinkName}</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-8 py-4">
                <div className="items-center gap-4">
                  <Label className="mb-2">Item Name</Label>
                  <Input placeholder="Item Name" />
                </div>
                <div className="items-center gap-4">
                  <Label className="mb-2">Item Category</Label>
                  <Select>
                    <SelectTrigger className=" w-full">
                      <SelectValue placeholder="Select a Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((option, idx) => (
                        <SelectItem key={idx} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="items-center gap-4">
                  <Label className="mb-2">Price</Label>
                  <Input placeholder="Price" />
                </div>
                <div>
                  <Label className="mb-2">Seasonal Range</Label>
                  <div className=" flex flex-wrap gap-2">
                    {toppings.map((topping, idx) => (
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
              <Button
                type="submit"
                className=" bg-[#6F403A] hover:bg-[#4E2D26]"
              >
                Edit Menu Item
              </Button>
            </DialogContent>
      </Dialog>
    </div>
  );
}

// Separate component for the dialog contents
function DrinkCustomizationDialog({
  drinkName,
  drinkCategory,
  drinkPrice,
  imageSrc,
  isOpen,
  drinkId,
  setIsOpen,
}: DrinkCardProps & { isOpen: boolean; setIsOpen: (open: boolean) => void }) {
  const { extras, loading: extrasLoading, fetchExtras } = useExtras();

  // Fetch extras when the dialog opens
  useEffect(() => {
    if (isOpen) {
      fetchExtras();
    }
  }, [isOpen, fetchExtras]);

  const filterExtraByCategoryId = (
    extras: Extra[],
    categoryId: number
  ): Extra[] => {
    return extras.filter(
      (extra) => extra.extra_category_id.extra_category_id === categoryId
    );
  };
  const sugarOptions: Extra[] = filterExtraByCategoryId(extras || [], 2);
  const iceOptions: Extra[] = filterExtraByCategoryId(extras || [], 1);
  const toppings: Extra[] = filterExtraByCategoryId(extras || [], 3);

  // store the full Extra objects
  const [selectedSugarObj, setSelectedSugarObj] = useState<Extra | null>(null);
  const [selectedIceObj, setSelectedIceObj] = useState<Extra | null>(null);
  const [selectedToppings, setSelectedToppings] = useState<Extra[]>([]);

  // initialize defaults when extras data is available
  useEffect(() => {
    if (sugarOptions.length > 0 && !selectedSugarObj) {
      setSelectedSugarObj(
        sugarOptions.length > 1 ? sugarOptions[1] : sugarOptions[0]
      );
    }
    if (iceOptions.length > 0 && !selectedIceObj) {
      setSelectedIceObj(iceOptions[0]);
    }
  }, [sugarOptions, iceOptions, selectedSugarObj, selectedIceObj]);

  // handle sugar selection
  const handleSugarChange = (value: string) => {
    const sugar = sugarOptions.find((option) => option.extra_name === value);
    if (sugar) {
      setSelectedSugarObj(sugar);
    }
  };

  // handle ice selection
  const handleIceChange = (value: string) => {
    const ice = iceOptions.find((option) => option.extra_name === value);
    if (ice) {
      setSelectedIceObj(ice);
    }
  };

  // handle topping selection
  const handleToppingSelection = (topping: Extra) => {
    setSelectedToppings((prev) => {
      const exists = prev.some((t) => t.extra_id === topping.extra_id);
      if (exists) {
        return prev.filter((t) => t.extra_id !== topping.extra_id);
      } else {
        return [...prev, topping];
      }
    });
  };

  const handleAddToOrder = () => {
    const orderItem = {
      drinkName,
      drinkCategory,
      drinkPrice,
      topPrice: 0,
      totalPrice: 0,
      imageSrc,
      sugarLevel: selectedSugarObj?.extra_name || "No Sugar",
      iceLevel: selectedIceObj?.extra_name || "No Ice",
      toppings: selectedToppings.length === 0 ? ["No Toppings"] : selectedToppings.map(t => t.extra_name),
      toppingIds: selectedToppings.map(t => t.extra_id),
      drinkId,
      itemId: Date.now(),
    };

    // Edit the price total Local Variable
    orderItem.topPrice = selectedToppings.reduce((acc, topping) => acc + topping.extra_price, 0);
    orderItem.totalPrice = orderItem.topPrice + orderItem.drinkPrice;
    const currentTotal = parseFloat(localStorage.getItem("orderprice") || "0");
    const newTotal = currentTotal + orderItem.totalPrice;
    localStorage.setItem("orderprice", newTotal.toString());

    //Save the total drink price as the price of the drink + toppings (this is 7 billion times easier than the alternative)
    const existingOrders = JSON.parse(localStorage.getItem("orderItems") || "[]");
    existingOrders.push(orderItem);
    localStorage.setItem("orderItems", JSON.stringify(existingOrders));

    setIsOpen(false);
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{drinkName}</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col gap-8 py-4">
        <div className="items-center gap-4">
          <Label className="mb-2">Sugar</Label>
          <Select
            onValueChange={handleSugarChange}
            value={selectedSugarObj?.extra_name}
          >
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={
                  extrasLoading ? "Loading options..." : "Select an Option"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {sugarOptions.length > 0 ? (
                sugarOptions.map((option) => (
                  <SelectItem key={option.extra_id} value={option.extra_name}>
                    {option.extra_name}
                  </SelectItem>
                ))
              ) : (
                <SelectItem disabled value="loading">
                  {extrasLoading
                    ? "Loading options..."
                    : "No options available"}
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
        <div className="items-center gap-4">
          <Label className="mb-2">Ice</Label>
          <Select
            onValueChange={handleIceChange}
            value={selectedIceObj?.extra_name}
          >
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={
                  extrasLoading ? "Loading options..." : "Select an Option"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {iceOptions.length > 0 ? (
                iceOptions.map((option) => (
                  <SelectItem key={option.extra_id} value={option.extra_name}>
                    {option.extra_name}
                  </SelectItem>
                ))
              ) : (
                <SelectItem disabled value="loading">
                  {extrasLoading
                    ? "Loading options..."
                    : "No options available"}
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="mb-2">Toppings</Label>
          <div className="flex flex-wrap gap-2">
            {toppings.length > 0 ? (
              toppings.map((topping) => {
                const isSelected = selectedToppings.some(
                  (t) => t.extra_id === topping.extra_id
                );
                return (
                  <Badge
                    key={topping.extra_id}
                    className="rounded-4xl px-2 bg-white text-black border-gray-200 flex items-center"
                    variant={isSelected ? "default" : "outline"}
                    onClick={() => handleToppingSelection(topping)}
                  >
                    <div
                      className={
                        isSelected
                          ? "w-4 h-4 rounded-full border mr-1 bg-black border-black"
                          : "w-4 h-4 rounded-full border mr-1"
                      }
                    ></div>
                    <p className="text-sm font-normal">{topping.extra_name}</p>
                  </Badge>
                );
              })
            ) : (
              <div>
                {extrasLoading
                  ? "Loading toppings..."
                  : "No toppings available"}
              </div>
            )}
          </div>
        </div>
      </div>
      <Button
        type="submit"
        className="bg-[#6F403A] hover:bg-[#4E2D26]"
        onClick={handleAddToOrder}
        disabled={extrasLoading}
      >
        Add Item to Order
      </Button>
    </DialogContent>
  );
}
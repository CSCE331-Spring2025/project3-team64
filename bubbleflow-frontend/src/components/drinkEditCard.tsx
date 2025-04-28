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
import { useDeleteDrink, useUpdateDrink } from "@/app/hooks/useDrinks";
import { Extra } from "@/app/service/types";
import { RiDeleteBin5Line } from "react-icons/ri";
import { DrinkCategory, Drink } from "@/app/service/types";

interface DrinkCardProps {
  drinkName: string;
  drinkCategory: string | undefined;
  drinkPrice: number;
  imageSrc: string;
  drinkId: number;
  itemId: number;
  categoryOptions: DrinkCategory[];
  active_months: string | null;
}

// Displays manager side drink editing card
export default function DrinkEditCard({
  drinkName,
  drinkCategory,
  drinkPrice,
  imageSrc,
  drinkId,
  itemId,
  categoryOptions,
  active_months,
}: DrinkCardProps) {
  // Debug log to check props
  useEffect(() => {
    console.log("DrinkEditCard props:", {
      drinkName,
      drinkCategory,
      drinkPrice,
      drinkId,
      categoryOptions
    });
  }, [drinkName, drinkCategory, drinkPrice, drinkId, categoryOptions]);

  const [category, setCategory] = useState<string>(drinkCategory || "");
  const [drink_price_input, setPrice] = useState<number>(drinkPrice);
  const [drink_name_input, setName] = useState<string>(drinkName);
  const [isOpen, setIsOpen] = useState(false);
  const [seasonalMonths, setSeasonalMonths] = useState<string[]>([]);
  
  // Update state when props change
  useEffect(() => {
    setCategory(drinkCategory || "");
    setPrice(drinkPrice);
    setName(drinkName);
  }, [drinkCategory, drinkPrice, drinkName]);

  const { deleteDrink } = useDeleteDrink();
  const { updateDrink } = useUpdateDrink();
  
  //Handle drink deletion
  const handleDelete = async () => {
    // Find the selected category object for proper ID
    const selectedCategory = categoryOptions.find(option => option.drink_category_name === category);
    
    if (!selectedCategory) {
      console.error("Category not found for deletion");
      return;
    }
    
    const drink: Drink = {
      drink_id: drinkId,
      drink_category: { 
        drink_category_id: selectedCategory.drink_category_id, 
        drink_category_name: category 
      },
      drink_name: drinkName,
      drink_price: drinkPrice,
      active_months: null,
    };
    
    console.log("Deleting drink:", drink);
    await deleteDrink(drink);
    setIsOpen(false);
    window.location.reload(); //refresh the page to show the changes
  };

  //Handle drink modification
  const handleUpdate = async () => {
    // Find the selected category object
    const selectedCategory = categoryOptions.find(option => option.drink_category_name === category);
    
    if (!selectedCategory) {
      console.error("Category not found for update");
      return;
    }
    
    const drink: Drink = {
      drink_id: drinkId,
      drink_category: { 
        drink_category_id: selectedCategory.drink_category_id, 
        drink_category_name: category 
      },
      drink_name: drink_name_input,
      drink_price: drink_price_input,
      active_months: seasonalMonths.join(","),
    };
    
    console.log("Updating drink:", drink);
    await updateDrink(drink);
    setIsOpen(false);
    window.location.reload(); //refresh the page to show the changes
  };

  //handle updating item price
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = parseFloat(event.target.value);
    if (!isNaN(newPrice)) {
      setPrice(newPrice);
    } else {
      setPrice(0);
    }
  };

  const toggleMonth = (month: string) => {
    setSeasonalMonths((prev) =>
      prev.includes(month)
        ? prev.filter((m) => m !== month)
        : [...prev, month]
    );
  };

  useEffect(() => {
      setSeasonalMonths(active_months ? active_months.split(",") : []);
  }, [isOpen]);

  //handle updating item name
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setName(newName);
  };

  const months = [
    "January",
    "February",
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
  
  const categoryColors: Record<string, { badgeBg: string; badgeText: string }> = {
    "Milk Teas": { badgeBg: "bg-[#ead2a2]", badgeText: "text-[#6F403A]" },
    "Brewed Tea": { badgeBg: "bg-[#dfcebb]", badgeText: "text-[#6F403A]" },
    "Fruit Tea": { badgeBg: "bg-[#dbb9a7]", badgeText: "text-[#6F403A]" },
    "Fresh Milk": { badgeBg: "bg-[#f0dece]", badgeText: "text-[#6F403A]" },
    "Ice Blended": { badgeBg: "bg-[#ebd1b5]", badgeText: "text-[#6F403A]" },
    "Tea Mojito": { badgeBg: "bg-[#f6cdb1]", badgeText: "text-[#6F403A]" },
    Creama: { badgeBg: "bg-[#f3ecdf]", badgeText: "text-[#6F403A]" },
  };

  const categoryColor = 
  (drinkCategory && categoryColors[drinkCategory]) || {
    badgeBg: "bg-[#f0dece]",
    badgeText: "text-[#6F403A]",
  };
  
  return (
    <div className="border border-primary p-2 rounded-xl flex flex-col justify-between">
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
      <div className="flex gap-2">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="mt-6 flex-1 bg-primary hover:bg-muted">
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
                <Input 
                  placeholder="Item Name" 
                  value={drink_name_input} 
                  onChange={handleNameChange} 
                />
              </div>
              <div className="items-center gap-4">
                <Label className="mb-2">Item Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((option, idx) => (
                      <SelectItem key={idx} value={option.drink_category_name}>
                        <span>
                          {option.drink_category_name}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="items-center gap-4">
                <Label className="mb-2">Price</Label>
                <Input 
                  type="number" 
                  placeholder="Price" 
                  defaultValue={drink_price_input}
                  onChange={handlePriceChange} 
                />
              </div>
              <div>
                <Label className="mb-2">Seasonal Range</Label>
                <div className="flex flex-wrap gap-2">
                  {months.map((month, idx) => {
                    const selected = seasonalMonths.includes(month);
                    return(
                    <Badge
                      key={idx}
                      onClick={() => toggleMonth(month)}
                      className="rounded-4xl px-2 bg-white text-black border border-border flex items-center"
                    >
                      <div className={`w-4 h-4 rounded-full border border-border mr-1 ${selected ? "bg-black" : "bg-white"}`}></div>
                      <p className="text-sm font-normal">{month}</p>
                    </Badge>
                    );
                  })}
                </div>
              </div>
            </div>
            <Button 
              type="submit" 
              className="bg-primary hover:bg-muted" 
              onClick={handleUpdate}
            >
              Save Changes
            </Button>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger>
            <div className="bg-primary w-8 h-8 mt-6 rounded-full flex items-center justify-center hover:bg-muted cursor-pointer hover:-translate-y-1 duration-300">
              <RiDeleteBin5Line className="text-white" size={20} />
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Delete {drinkName}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-8 py-2">
              <p className="text-sm">
                Are you sure you want to delete {drinkName}? Once {drinkName} is
                deleted, you cannot undo it!
              </p>
            </div>
            <Button 
              type="submit" 
              className="bg-primary hover:bg-muted" 
              onClick={handleDelete}
            >
              Delete {drinkName}
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
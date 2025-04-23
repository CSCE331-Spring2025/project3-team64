import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Drink, DrinkCategory, DrinkRequest } from "@/app/service/types";
import { useAddDrink } from "@/app/hooks/useDrinks";
import { RiAddLine } from "react-icons/ri";

interface DrinkAddMenuCardProps {
  categoryOptions: DrinkCategory[];
  nextDrinkId: number;

}


export default function DrinkAddMenuCard({ categoryOptions, nextDrinkId }: DrinkAddMenuCardProps) {
  const [category, setCategory] = useState("Milk Teas");
  const [drink_name_input, setName] = useState("");
  const [drink_price_input, setPrice] = useState<number>(0);
  const [seasonalMonths, setSeasonalMonths] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const { addDrink } = useAddDrink();

  const handleCategorySelection = (selectedCategoryName: string) => {
    // Optionally log the selected category
    setCategory(selectedCategoryName);
    const selectedCategory = categoryOptions.find(option => option.drink_category_name === selectedCategoryName);
    if (!selectedCategory) {
      // Handle case where the category doesn't exist
      console.error("Category not found");
      return;
    }
  };

  const handleCreateDrink = async () => {
    const selectedCategory = categoryOptions.find(option => option.drink_category_name === category);
    if (!selectedCategory) {
      console.error("Category not found");
      return;
    }
  
    const drinkRequest = {
      drink_name: drink_name_input,
      drink_price: drink_price_input,
      active_months: seasonalMonths.join(","),
      drink_category_id: selectedCategory.drink_category_id
    };
    
    await addDrink(drinkRequest);
    setIsOpen(false);
    window.location.reload();
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

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

  const toppings = [
    "January", "Febuary", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
                    <div className="bg-[#6F403A] w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#4E2D26]">
                      <RiAddLine className="text-white" size={18} />
                    </div>
                  </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Menu Item</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-8 py-4">
          <div className="items-center gap-4">
            <Label className="mb-2">Item Name</Label>
            <Input placeholder="Item Name" value={drink_name_input} onChange={handleNameChange} />
          </div>
          <div className="items-center gap-4">
            <Label className="mb-2">Item Category</Label>
            <Select value={category} onValueChange={handleCategorySelection}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Milk Tea" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((option, idx) => (
                  <SelectItem key={idx} value={option.drink_category_name}>
                    {option.drink_category_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="items-center gap-4">
            <Label className="mb-2">Price</Label>
            <Input type="number" placeholder="Price" onChange={handlePriceChange} />
          </div>
          <div>
            <Label className="mb-2">Seasonal Range</Label>
            <div className="flex flex-wrap gap-2">
              {toppings.map((month, idx) => {
                const selected = seasonalMonths.includes(month);
                return (
                  <Badge
                    key={idx}
                    onClick={() => toggleMonth(month)}
                    className={`rounded-4xl px-2 cursor-pointer border-gray-200 flex items-center bg-white text-black`}
                  >
                    <div className={`w-4 h-4 rounded-full border mr-1 ${selected ? "bg-black" : "bg-white"}`}></div>
                    <p className="text-sm font-normal">{month}</p>
                  </Badge>
                );
              })}
            </div>
          </div>
        </div>
        <Button
          type="submit"
          className="bg-[#6F403A] hover:bg-[#4E2D26]"
          onClick={handleCreateDrink}
        >
          Create Menu Item
        </Button>
      </DialogContent>
    </Dialog>
  );
}

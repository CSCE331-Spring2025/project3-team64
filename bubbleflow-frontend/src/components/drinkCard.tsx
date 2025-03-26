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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DrinkCardProps {
  drinkName: string;
  drinkCategory: string;
  drinkPrice: number | string;
}

export default function DrinkCard({
  drinkName,
  drinkCategory,
  drinkPrice,
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
  return (
    <div className="border border-[#6F403A] p-2 rounded-xl">
      <div className=" h-36 bg-[#DBC89E] rounded-xl"></div>
      <p className="mt-2 font-semibold">{drinkName}</p>
      <div className="flex justify-between mt-1">
        <Badge className="bg-[#DBC89E] text-[#6F403A] font-normal px-3 rounded-3xl">
          {drinkCategory}
        </Badge>
        <p className="text-sm">${drinkPrice}</p>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-6 w-full bg-[#6F403A]">Add Toppings</Button>
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
            <Label className="mb-2">
              Ice
            </Label>
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
            <Label className="mb-2">
              Toppings
            </Label>
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
        <Button type="submit" className=" bg-[#6F403A]">Add Item to Order</Button>
      </DialogContent>
    </Dialog>
    </div>
  );
}

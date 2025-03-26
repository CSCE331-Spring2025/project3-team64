import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
  return (
    <div className="border border-[#6F403A] p-2 rounded-xl">
      <div className="h-30 bg-[#DBC89E] rounded-xl"></div>
      <p className="mt-2 font-semibold">{drinkName}</p>
      <div className="flex justify-between mt-1">
        <Badge className="bg-[#DBC89E] text-[#6F403A] font-normal px-3 rounded-3xl">
          {drinkCategory}
        </Badge>
        <p className="text-sm">${drinkPrice}</p>
      </div>
      <Button className="mt-6 w-full bg-[#6F403A]">Add Toppings</Button>
    </div>
  );
}

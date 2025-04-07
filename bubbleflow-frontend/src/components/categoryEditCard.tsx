import {
  RiCupLine,
  RiLeafLine,
  RiAppleLine,
  RiCake3Line,
  RiBook3Line,
  RiSnowflakeLine,
  RiGobletLine,
  RiDropLine,
  RiCloseLine,
} from "react-icons/ri";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CategoryEditCard {
  categoryName?: string;
  itemCount: number;
}

const iconMapping: Record<
  string,
  React.ComponentType<{ className?: string; size?: number }>
> = {
  "Milk Teas": RiCupLine,
  "Brewed Tea": RiLeafLine,
  "Fruit Tea": RiAppleLine,
  "Fresh Milk": RiDropLine,
  "Ice Blended": RiSnowflakeLine,
  "Tea Mojito": RiGobletLine,
  Creama: RiCake3Line,
  default: RiBook3Line,
};

export default function CategoryEditCard({
  categoryName,
  itemCount,
}: CategoryEditCard) {
  const Icon =
    (categoryName && iconMapping[categoryName]) || iconMapping.default;

  return (
    <div className="relative outline outline-[#6F403A] p-4 rounded-md h-30 w-30 hover:-translate-y-2 duration-300">
      <Dialog>
        <DialogTrigger asChild>
          <RiCloseLine
            className="absolute top-1 right-1 text-xl cursor-pointer"
            size={16}
          />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete {categoryName}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-8 py-2">
            <p className=" text-sm">
              Are you sure you want to delete {categoryName}. Once {categoryName} is
              deleted, you cannot undo it!
            </p>
          </div>
          <Button type="submit" className=" bg-[#6F403A] hover:bg-[#4E2D26]">
            Delete {categoryName}
          </Button>
        </DialogContent>
      </Dialog>
      <div className="bg-[#6F403A] w-10 h-10 rounded-full flex items-center justify-center mb-2">
        <Icon className="text-white" size={20} />
      </div>
      <p className="text-sm font-semibold">{categoryName}</p>
      <p className="text-xs text-gray-500">{itemCount} Items</p>
    </div>
  );
}

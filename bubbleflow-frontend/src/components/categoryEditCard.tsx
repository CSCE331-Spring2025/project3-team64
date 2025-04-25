import {
  RiCupLine,
  RiLeafLine,
  RiAppleLine,
  RiCake3Line,
  RiBook3Line,
  RiSnowflakeLine,
  RiGobletLine,
  RiDropLine,
  RiPencilLine,
  RiMore2Line,
  RiDeleteBin5Line,
} from "react-icons/ri";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
    <div className="relative outline outline-primary p-4 rounded-md min-h-30 h-full w-30 hover:-translate-y-2 duration-300 ">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <RiMore2Line className="absolute top-2 right-2 text-xl cursor-pointer hover:-translate-y-1 duration-300" size={16} />
        </DropdownMenuTrigger>
        <DropdownMenuContent side="left" align="start">
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <Dialog>
              <DialogTrigger>
                <div className="flex items-center w-full gap-2 justify-center">
                  <RiDeleteBin5Line className="text-border"/>
                  Delete Category
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Delete {categoryName}</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-8 py-2">
                  <p className=" text-sm">
                    Are you sure you want to delete {categoryName}? Once{" "}
                    {categoryName} is deleted, you cannot undo it!
                  </p>
                </div>
                <Button
                  type="submit"
                  className=" bg-primary hover:bg-muted"
                >
                  Delete {categoryName}
                </Button>
              </DialogContent>
            </Dialog>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <Dialog>
              <DialogTrigger>
                <div className="flex items-center w-full gap-2 justify-center">
                  <RiPencilLine className="text-border"/>
                  Edit Category
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit Menu Category</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-8 py-2">
                  <div className="items-center gap-4">
                    <Label className="mb-2">Category Name</Label>
                    <Input placeholder="Category Name" />
                  </div>
                </div>
                <Button
                  type="submit"
                  className=" bg-primary hover:bg-muted"
                >
                  Edit Menu Category
                </Button>
              </DialogContent>
            </Dialog>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="bg-primary w-10 h-10 rounded-full flex items-center justify-center mb-2">
        <Icon className="text-white" size={20} />
      </div>
      <p className="text-sm font-semibold">{categoryName}</p>
      <p className="text-xs text-gray-500">{itemCount} Items</p>
    </div>
  );
}

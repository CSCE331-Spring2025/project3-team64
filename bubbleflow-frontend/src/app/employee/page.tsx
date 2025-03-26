import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MenuCategory from "@/components/menuCategory";
import { RiSearchLine } from "react-icons/ri";

export default function Employee() {
  const categories = [
    { categoryName: "All Menu", itemCount: 100 },
    { categoryName: "Milk Teas", itemCount: 45 },
    { categoryName: "Brewed Teas", itemCount: 30 },
    { categoryName: "Fruit Tea", itemCount: 20 },
    { categoryName: "Fresh Milk", itemCount: 25 },
    { categoryName: "Ice Blended", itemCount: 50 },
    { categoryName: "Tea Mojito", itemCount: 15 },
    { categoryName: "Creama", itemCount: 10 },
  ];
  return (
    <main className="flex flex-col px-16">
      <div className="mt-16">
        <div className=" flex gap-2">
          {categories.map((category, index) => (
            <MenuCategory
              key={index}
              categoryName={category.categoryName}
              itemCount={category.itemCount}
            />
          ))}
        </div>
      </div>
      <div className=" mt-2 relative">
        <Input className=" border-[#6F403A] h-10 rounded-3xl" placeholder="Search for Menu Item"/>
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[#6F403A] w-7 h-7 rounded-full flex items-center justify-center">
          <RiSearchLine className="text-white" size={15} />
        </div>
      </div>
    </main>
  );
}
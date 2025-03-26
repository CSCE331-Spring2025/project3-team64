import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import MenuCategory from "@/components/menuCategory";

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
    <main className="flex px-16">
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
      <div>
       
      </div>
    </main>
  );
}
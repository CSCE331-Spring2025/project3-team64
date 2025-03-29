import { Input } from "@/components/ui/input";
import MenuCategory from "@/components/menuCategory";
import { RiSearchLine } from "react-icons/ri";
import DrinkCard from "@/components/drinkCard";

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
  const drinks = [
    {
      drinkName: "Classic Pearl Milk Tea",
      drinkCategory: "Milk Tea",
      drinkPrice: 5.50,
      imageSrc: "/classic-pearl-milk-tea.png",
    },
    {
      drinkName: "Taro Milk Tea",
      drinkCategory: "Milk Tea",
      drinkPrice: 6.00,
      imageSrc: "/classic-pearl-milk-tea.png",
    },
    {
      drinkName: "Green Milk Tea",
      drinkCategory: "Milk Tea",
      drinkPrice: 5.00,
      imageSrc: "/classic-pearl-milk-tea.png",
    },
    {
      drinkName: "Oolong Tea",
      drinkCategory: "Brewed Teas",
      drinkPrice: 4.50,
      imageSrc: "/classic-pearl-milk-tea.png",
    },
    {
      drinkName: "Passion Fruit Tea",
      drinkCategory: "Fruit Tea",
      drinkPrice: 5.50,
      imageSrc: "/classic-pearl-milk-tea.png",
    },
    {
      drinkName: "Fresh Milk",
      drinkCategory: "Fresh Milk",
      drinkPrice: 4.00,
      imageSrc: "/classic-pearl-milk-tea.png",
    },
    {
      drinkName: "Fresh Milk",
      drinkCategory: "Fresh Milk",
      drinkPrice: 4.00,
      imageSrc: "/classic-pearl-milk-tea.png",
    },
    {
      drinkName: "Fresh Milk",
      drinkCategory: "Fresh Milk",
      drinkPrice: 4.00,
      imageSrc: "/classic-pearl-milk-tea.png",
    },
  ];
  return (
    <main className="flex flex-col px-16">
      <div>
        <div className=" flex flex-wrap gap-2">
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
      <div className="mt-2 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-2">
        {drinks.map((drink, index) => (
          <DrinkCard
          key={index}
          drinkName={drink.drinkName}
          drinkCategory={drink.drinkCategory}
          drinkPrice={drink.drinkPrice}
          imageSrc={drink.imageSrc}
          />
        ))}
      </div>
    </main>
  );
}
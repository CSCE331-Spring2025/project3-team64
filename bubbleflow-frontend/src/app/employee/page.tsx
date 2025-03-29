"use client";

import { Input } from "@/components/ui/input";
import MenuCategory from "@/components/menuCategory";
import { RiSearchLine } from "react-icons/ri";
import DrinkCard from "@/components/drinkCard";
import { useEffect } from "react";

import { useDrinks, useDrinkCategories } from "../hooks/useDrinks";

export default function Employee() {

const {  drinks, loading: drinksLoading, error: drinksError, fetchDrinks } = useDrinks();

const { drinkCategories: categories, loading: categoriesLoading, error: categoriesError, fetchDrinkCategories } = useDrinkCategories();

useEffect(() => {
  fetchDrinks();
  fetchDrinkCategories();
}, [fetchDrinks, fetchDrinkCategories]);

  if (drinksLoading || categoriesLoading) {
    return <div>Loading...</div>;
  }

  if (drinksError || categoriesError) {
    return <div>Error: {drinksError || categoriesError}</div>;
  }

  return (
    <main className="flex flex-col px-16">
      <div className="mt-16">
        <div className=" flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <MenuCategory
              key={index}
              categoryName={category.name}
              itemCount={0}
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
            drinkName={drink.drink_name}
            drinkCategory={drink.drink_category_id.name}
            drinkPrice={drink.drink_price}
          />
        ))}
      </div>
    </main>
  );
}
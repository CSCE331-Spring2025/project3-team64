"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import MenuCategory from "@/components/menuCategory";
import { RiSearchLine } from "react-icons/ri";
import DrinkCard from "@/components/drinkCard";
import { useDrinks, useDrinkCategories } from "../hooks/useDrinks";

export default function Employee() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const {
    drinks,
    loading: drinksLoading,
    error: drinksError,
    fetchDrinks,
  } = useDrinks();

  const {
    drinkCategories: categories,
    loading: categoriesLoading,
    error: categoriesError,
    fetchDrinkCategories,
  } = useDrinkCategories();

  useEffect(() => {
    fetchDrinks();
    fetchDrinkCategories();
  }, [fetchDrinks, fetchDrinkCategories]);

  if (drinksLoading || categoriesLoading) {
    return <div className="px-16">Loading...</div>;
  }

  if (drinksError || categoriesError) {
    return (
      <div className="px-16">
        Error: {drinksError || categoriesError}
      </div>
    );
  }

  const filteredDrinks = selectedCategory
    ? drinks.filter(
        (drink) =>
          drink?.drink_category_id?.drink_category_name === selectedCategory
      )
    : drinks;

  return (
    <main className="flex flex-col px-16 pb-8">
      <div>
        <div className="flex flex-wrap gap-2">
          <div
            key="all-drinks"
            onClick={() => setSelectedCategory(null)}
            className="cursor-pointer"
          >
            <MenuCategory
              categoryName="All Drinks"
              itemCount={drinks.length}
            />
          </div>
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() =>
                setSelectedCategory(category.drink_category_name)
              }
              className="cursor-pointer"
            >
              <MenuCategory
                categoryName={category?.drink_category_name || "No Category"}
                itemCount={0}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 relative">
        <Input
          className="border-[#6F403A] h-10 rounded-3xl pr-12"
          placeholder="Search for Menu Item"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[#6F403A] w-7 h-7 rounded-full flex items-center justify-center">
          <RiSearchLine className="text-white" size={15} />
        </div>
      </div>
      <div className="mt-2 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-2 items-start">
        {filteredDrinks.map((drink, index) => (
          <DrinkCard
            key={index}
            drinkName={drink?.drink_name || "No Name"}
            drinkCategory={
              drink?.drink_category_id?.drink_category_name || "No Category"
            }
            drinkPrice={drink?.drink_price || 0}
            imageSrc={"/classic-pearl-milk-tea.png"}
          />
        ))}
      </div>
    </main>
  );
}


"use client";
import { useState, useEffect, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import CategoryEditCard from "@/components/categoryEditCard";
import { RiSearchLine, RiAddLine } from "react-icons/ri";
import DrinkEditCard from "@/components/drinkEditCard";
import MenuCategory from "@/components/menuCategory";
import { useDrinks, useDrinkCategories } from "@/app/hooks/useDrinks";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DrinkAddMenuCard from "@/components/drinkAddMenuCard";

export default function EditMenu() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [category, setCategory] = useState<string>("Milk Teas");

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

  const toppings = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    fetchDrinks();
    fetchDrinkCategories();
  }, [fetchDrinks, fetchDrinkCategories]);

  if (drinksLoading || categoriesLoading) {
    return <div className="px-16">Loading...</div>;
  }

  if (drinksError || categoriesError) {
    return <div className="px-16">Error: {drinksError || categoriesError}</div>;
  }

  const imageMap: Record<string, string> = {
    "Classic Pearl Milk Tea": "/classic-pearl-milk-tea.png",
    "Honey Milk Tea": "/honey-milk-tea.png",
    "Classic Coffee": "/classic-coffee.png",
    "Ginger Milk Tea": "/ginger-milk-tea.png",
    "Thai Pearl Milk Tea": "/thai-pearl-milk-tea.png",
    "Taro Pearl Milk Tea": "/taro-milk-tea.png",
    "Classic Tea": "/classic-tea.png",
    "Wintermelon Tea": "/wintermelon-tea.png",
    "Honey Tea": "/honey-tea.png",
    "Ginger Tea": "/ginger-tea.png",
    "Mango Green Tea": "/mango-green-tea.png",
    "Wintermelon Lemonade": "/wintermelon-tea.png",
    "Strawberry Tea": "/strawberry-tea.png",
    "Peach Tea with Aiyu Jelly": "/peach-tea-with-aiyu-jelly.png",
    "Kiwi Fruit Tea with Aiyu Jelly": "/kiwi-fruit-tea-with-aiyu-jelly.png",
    "Mango & Passion Fruit Tea": "/mango-&-passion-fruit-tea.png",
    "Cocoa Lover with Fresh Milk": "/cocoa-lover-with-fresh-milk.png",
    "Homemade Taro with Fresh Milk": "/homemade-taro-with-fresh-milk.png",
    "Matcha with Fresh Milk": "/matcha-with-fresh-milk.png",
    "Oreo Ice Blended with Pearl": "/oreo-ice-blended-with-pearl.png",
    "Matcha Red Bean Ice Blended with Ice Cream":
      "/matcha-red-bean-ice-blended-with-ice-cream.png",
    "Coffee Ice Blended with Ice Cream":
      "/coffee-ice-blended-with-ice-cream.png",
    "Mango Ice Blended with Ice Cream": "/mango-ice-blended-with-ice-cream.png",
    "Strawberry Ice Blended with Lychee Jelly & Ice Cream":
      "/strawberry-ice-blended-with-lychee-and-ice-cream.png",
    "Lime Mojito": "/lime-mojito.png",
    "Mango Mojito": "/mango-mojito.png",
    "Peach Mojito": "/peach-mojito.png",
    "Strawberry Mojito": "/strawberry-mojito.png",
    "Creama Tea": "/creama-tea.png",
    "Match Creama": "/matcha-creama.png",
    "Coffee Creama": "/coffee-creama.png",
    "Cocoa Creama": "/cocoa-creama.png",
  };

  const filteredDrinks = drinks.filter((drink) => {
    const matchesCategory = selectedCategory
      ? drink?.drink_category?.drink_category_name === selectedCategory
      : true;
    const matchesSearch = drink?.drink_name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const orderedDrinks = [...filteredDrinks].sort((a, b) => {
    const aCat = a.drink_category?.drink_category_name || "";
    const bCat = b.drink_category?.drink_category_name || "";
    return aCat.localeCompare(bCat);
  });

  const nextDrinkId =
  drinks.length > 0
    ? Math.max(...drinks.map((d) => d.drink_id || 0)) + 1
    : 1;


  return (
    <main className="flex flex-col px-16 pb-4">
      <div>
        <div className="flex flex-wrap gap-2 items-stretch">
          <div
            key="all-drinks"
            onClick={() => setSelectedCategory(null)}
            className="cursor-pointer"
          >
            <MenuCategory categoryName="All Drinks" itemCount={drinks.length} />
          </div>
          {categories.map((category, index) => {
            const categoryName = category.drink_category_name || "No Category";
            const count = drinks.filter(
              (drink) =>
                drink?.drink_category?.drink_category_name === categoryName
            ).length;
            return (
              <div
                key={index}
                onClick={() => setSelectedCategory(categoryName)}
                className="cursor-pointer"
              >
                <CategoryEditCard categoryName={categoryName} itemCount={count} />
              </div>
            );
          })}
          <Dialog>
            <DialogTrigger className="flex align-top hover:-translate-y-2 duration-300">
              <RiAddLine className=" -ml-1" size={16} />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Menu Category</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-8 py-4">
                <div className="items-center gap-4">
                  <Label className="mb-2">Category Name</Label>
                  <Input placeholder="Category Name" />
                </div>
              </div>
              <Button
                type="submit"
                className=" bg-primary hover:bg-muted"
              >
                Create Menu Category
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <div className="relative w-full">
          <Input
            className="border-primary h-10 rounded-3xl pr-12"
            placeholder="Search for Menu Item"
            value={searchTerm}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary w-7 h-7 rounded-full flex items-center justify-center">
            <RiSearchLine className="text-white" size={15} />
          </div>
        </div>
        <DrinkAddMenuCard categoryOptions={categories} nextDrinkId={nextDrinkId} />
      </div>
      <div className="mt-2 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-2">
        {orderedDrinks.map((drink, index) => (
          <DrinkEditCard
            key={index}
            drinkName={drink?.drink_name || "No Name"}
            drinkCategory={
              drink?.drink_category?.drink_category_name || "No Category"
            }
            drinkPrice={drink?.drink_price || 0}
            imageSrc={
              imageMap[drink.drink_name] || "/classic-pearl-milk-tea.png"
            }
            drinkId={drink?.drink_id}
            itemId={Date.now()}
            categoryOptions={categories}
            active_months={drink.active_months || null}
          />
        ))}
      </div>
    </main>
  );
}

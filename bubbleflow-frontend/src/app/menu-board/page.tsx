"use client";
import React, { useEffect } from "react";
import { useDrinks, useDrinkCategories } from "../hooks/useDrinks";
import { useExtras } from "@/app/hooks/useExtras";
import { Drink, Extra } from "@/app/service/types";

export default function MenuBoard(){
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

  const { extras, loading: extrasLoading } = useExtras();

  if (drinksLoading || categoriesLoading || extrasLoading) {
    return <div className="px-16">Loading...</div>;
  }

  if (drinksError || categoriesError) {
    return (
      <div className="px-16">
        Error: {drinksError || categoriesError}
      </div>
    );
  }

  const filterExtraByCategoryIdIce = (
    extras: Extra[],
    categoryId: number
  ): string[] => {
    return extras
      .filter(
        (extra: Extra) =>
          extra.extra_category_id.extra_category_id === categoryId
      )
      .map((extra: Extra) => extra.extra_name);
  };

  const filterExtraByCategoryIdSugar = (extras: Extra[]): string[][] => {
    return extras
      .filter(
        (extra: Extra) =>
          extra.extra_category_id.extra_category_id === 2
      )
      .map((extra: Extra): string[] => {
        const [label, percentage] = extra.extra_name.split(" ");
        return [label, percentage];
      });
  };

  const toppings075: [string, number][] = (extras || [])
    .filter(
      (extra: Extra) =>
        extra.extra_category_id.extra_category_id === 3 &&
        extra.extra_price === 0.75
    )
    .map((extra: Extra): [string, number] => [extra.extra_name, extra.extra_price])
    .sort((a, b) => a[1] - b[1]);

  const toppings100: [string, number][] = (extras || [])
    .filter(
      (extra: Extra) =>
        extra.extra_category_id.extra_category_id === 3 &&
        extra.extra_price === 1.0
    )
    .map((extra: Extra): [string, number] => [extra.extra_name, extra.extra_price])
    .sort((a, b) => a[1] - b[1]);

  const iceLevels: string[] = filterExtraByCategoryIdIce(extras || [], 1);
  const sugarLevels: string[][] = filterExtraByCategoryIdSugar(extras || []);

  return (
    <main className="flex flex-col px-16 pb-8">
      <div className="flex items-start gap-4">
        <div className="w-2/3 grid grid-cols-2 gap-2">
          {categories.map((category, index: number) => {
            const drinksInCategory = drinks.filter(
              (drink: Drink) =>
                drink?.drink_category_id?.drink_category_name ===
                category.drink_category_name
            );
            return (
              <div
                key={index}
                className="border border-[#6F403A] p-4 rounded-xl"
              >
                <p className="font-semibold">
                  {category.drink_category_name}
                </p>
                <div className="flex flex-col gap-1 mt-1">
                  {drinksInCategory.map((drink: Drink, idx: number) => (
                    <div key={idx} className="flex justify-between">
                      <p className="text-sm">{drink.drink_name}</p>
                      <p className="text-sm text-gray-400">
                        ${Number(drink.drink_price).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <div className="border border-[#6F403A] p-4 w-1/3 rounded-xl bg-[#FAEED3]">
          <div>
            <p className="text-[#6F403A] font-semibold">Ice Levels</p>
            <div className="flex flex-col gap-1">
              {iceLevels.map((level: string, idx: number) => (
                <p key={idx} className="text-sm">
                  {level}
                </p>
              ))}
            </div>
            <p className="text-[#6F403A] font-semibold mt-4">Sugar Levels</p>
            <div className="flex gap-4 justify-between">
              {sugarLevels.map((option: string[], idx: number) => (
                <div key={idx} className="flex flex-col items-center">
                  <p className="font-semibold">{option[0]}</p>
                  <p className="text-sm">{option[1]}</p>
                </div>
              ))}
            </div>
            <p className="text-[#6F403A] font-semibold mt-4">
              Toppings
            </p>
            <div className="flex gap-2 mt-1">
              <div className="border border-[#6F403A] w-16 h-16 rounded-full flex flex-col items-center justify-center">
                <p>+</p>
                <p className="font-semibold">$0.75</p>
              </div>
              <div className="grid grid-cols-2 gap-1 gap-x-4 text-sm">
                {toppings075.map((topping: [string, number], idx: number) => (
                  <p key={idx}>{topping[0]}</p>
                ))}
              </div>
            </div>
            <div className="flex gap-2 mt-1 items-center">
              <div className="border border-[#6F403A] w-16 h-16 rounded-full flex flex-col items-center justify-center">
                <p>+</p>
                <p className="font-semibold">$1.00</p>
              </div>
              <div className="grid grid-cols-2 gap-1 text-sm">
                {toppings100.map((topping: [string, number], idx: number) => (
                  <p key={idx}>{topping[0]}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}


"use client";
import { useState, useEffect, ChangeEvent } from "react";
import { InventoryCard } from "@/components/inventoryCard";
import { Input } from "@/components/ui/input";
import { RiSearchLine } from "react-icons/ri";
import { DatePicker } from "@/components/datePicker";

import { useGetInventory, useGetInventoryUsage } from "@/app/hooks/useInventory";
import { Inventory, InventoryItem, InventoryUsageItem } from "@/app/service/types";

const LOW_INVENTORY_THRESHOLD = 10; //also dfined in the backend InventoryRepo.java

export default function ViewInventory() {
  //Datepicker states
  const [startDate, setStartDate] = useState<Date>(new Date(1));
  const [endDate, setEndDate] = useState<Date>(new Date());
  
  //Hook calls to get inventory data from the backend
  const { 
    inventory: inventory, 
    loading: getInventoryLoading, 
    error: getInventoryError, 
    fetchInventory 
  } = useGetInventory();

  //Inventory usage data
  const {
    usage: inventoryUsage, 
    loading: getInventoryUsageLoading, 
    error: getInventoryUsageError, 
    fetchInventoryUsage 
  } = useGetInventoryUsage();

  useEffect(() => {
    fetchInventory();
    console.log(inventory);
  }, [fetchInventory]);

  useEffect(() => {
    if (startDate && endDate) {
      //convert start and end dates to PSQL-compatible format (YYYY-MM-DD)
      const formattedStartDate = startDate.toISOString().slice(0, 10);
      const formattedEndDate = endDate.toISOString().slice(0, 10);
      fetchInventoryUsage(formattedStartDate, formattedEndDate);
      console.log("Fetching inventory usage for dates:", startDate, endDate);
    }
  }, [startDate, endDate, fetchInventoryUsage]);




  //Used for search bar
  const [searchTerm, setSearchTerm] = useState("");//first one
  const [searchTerm2, setSearchTerm2] = useState("");//second one

  //Return early if error.
  if(getInventoryError) {
    return <div>Error: {getInventoryError}</div>;
  }

  if(getInventoryUsageError) {
    return <div>Error: {getInventoryUsageError}</div>;
  }

  
  const filteredInventory = getInventoryLoading ? [] : //empty array if loading
  inventory?.items?.filter((item) => {
    //big ol debugging just to find out that it works properly and I forgot to use filteredInventory >:(
    //console.log("Filterring with search term:", searchTerm, "against item:", item?.itemName, "Result:",item?.itemName?.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (!searchTerm) return true; // If no search term, show all inventory items

    const term = searchTerm.toLowerCase();
    return (
      item?.itemName?.toLowerCase().includes(term)
    );
  });

  const filterredInventoryUsage = getInventoryUsageLoading ? [] : //empty array if loading
  inventoryUsage?.filter((item) => {
    if (!searchTerm2) return true; // If no search term, show all inventory items

    const term = searchTerm2.toLowerCase();
    console.log("Filtering with search term:", searchTerm2, "against item:", item);
    return (
      item.itemName.toLowerCase().includes(term)
    );
  });
  //console.log("Filtered inventory usage:", filterredInventoryUsage);

  //Sort inventory items alphabetically by item name
  const sortedInventory = getInventoryLoading ? [] : //empty array if loading
  filteredInventory?.sort((a, b) => {
    return a.itemName.localeCompare(b.itemName);
  });

  return (
    <main className="flex flex-col px-16 pb-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Inventory</h1>
        <div className="relative w-80">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-primary h-10 rounded-3xl pr-12"
            placeholder="Search for an Inventory Item"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary w-7 h-7 rounded-full flex items-center justify-center">
            <RiSearchLine className="text-white" size={15} />
          </div>
        </div>
      </div>
      <div className="mt-4 gap-2 grid grid-cols-2">
      {getInventoryLoading ? (
        <div>Loading inventory...</div>
      ) : (
        sortedInventory?.length === 0 ? (
          <div>No inventory items match your search.</div>
        ) : (
          sortedInventory?.map((item) => (
          <InventoryCard
            key={item.itemId}
            name={item.itemName}
            amount={`${item.quantity} ${item.itemMetric}`}
            badgeText={
              item.quantity <= 0
                ? "Out of Stock"
                : item.quantity < LOW_INVENTORY_THRESHOLD
                ? "Low Stock"
                : "Good"
            }
            itemId={item.itemId.toString()}
          />
        ))
      ))}
      </div>
      <div className="flex flex-col mt-8">
        <h1 className="text-xl font-semibold">Inventory Use</h1>
        <div className="flex justify-between mt-2 items-center">
          <div className=" flex gap-4">
            <div className="flex gap-2 items-center">
              <p>From</p>
              <DatePicker 
                onChange={(newDate) => {
                  setStartDate(newDate ? newDate : new Date());
                  console.log("Selected start date:", newDate);
                }} 
              />
            </div>
            <div className="flex gap-2 items-center">
              <p>To</p>
              <DatePicker 
                onChange={(newDate) => {
                  setEndDate(newDate ? newDate : new Date());
                  console.log("Selected end date:", newDate);
                }} 
              />
            </div>
          </div>
          <div className="relative w-80">
            <Input
              value={searchTerm2}
              onChange={(e) => setSearchTerm2(e.target.value)}
              className="border-primary h-10 rounded-3xl pr-12"
              placeholder="Search for an Inventory Item"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary w-7 h-7 rounded-full flex items-center justify-center">
              <RiSearchLine className="text-white" size={15} />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 gap-2 grid grid-cols-2">
        {getInventoryUsageLoading ? (
          <div>Loading inventory usage...</div>
        ) : (
          filterredInventoryUsage?.map((item) => (
            <InventoryCard
              key={item.itemId}
              name={item.itemName}
              amount={`${parseFloat(item.total_quantity_used.toFixed(5))} ${item.itemMetric} Used`}
              badgeText={""}
              itemId={item.itemId.toString()}
            />
          ))
        )}
      </div>
    </main>
  );
}

/*
{inventory?.items.map((item) => (
          <InventoryCard
            key={item.itemId}
            name={item.itemName}
            amount={`${item.quantity} ${item.itemMetric}`}
            badgeText={"Sigma"}
            itemId={item.itemId.toString()}
          />
        ))}
*/

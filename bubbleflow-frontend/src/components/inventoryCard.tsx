"use client";

import { Badge } from "@/components/ui/badge";
import { RiDeleteBin5Line, RiPencilLine } from "react-icons/ri";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "./ui/select";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState, useEffect, ChangeEvent } from "react";

import { useUpdateInventoryItem, useDeleteInventoryItem } from "@/app/hooks/useInventory";
import { InventoryItem } from "@/app/service/types";

interface InventoryCardProps {
  name: string;
  metric: string;
  amount: number;
  badgeText: string;
  itemId: number;
}

const categoryOptions = [
  { id: "1", label: "UrMom" },
  { id: "2", label: "Sigma" },
  { id: "1", label: "GMI" },
  { id: "2", label: "NGMI" },
];

// Displays manager side inventory item info cards
export function InventoryCard({
  name,
  amount,
  metric,
  badgeText, //currently used to show stock status (Good, Low Stock, Out of Stock)
  itemId,
}: InventoryCardProps) {
  const [quantity, setQuantity] = useState<number>(amount);
  const [metricValue, setMetricValue] = useState<string>(metric);
  const [itemName, setItemName] = useState<string>(name);

  const [quantityDisplay, setQuantityDisplay] = useState<string>(amount.toString());
  const [nameDisplay, setNameDisplay] = useState<string>(name);
  const [metricDisplay, setMetricDisplay] = useState<string>(metric);

  const {
    loading: updateLoading,
    error: updateError,
    updateItem,
  } = useUpdateInventoryItem();

  const {
    loading: deleteLoading,
    error: deleteError,
    deleteItem,
  } = useDeleteInventoryItem();

  function handleUpdate(): void {
    const updatedItem: InventoryItem = {
      itemId: itemId,
      itemName: itemName,
      itemMetric: metricValue,
      quantity: quantity,
    };
    setNameDisplay(itemName);
    setMetricDisplay(metricValue);
    setQuantityDisplay(quantity.toString());
    console.log("Updating inventory item with id:", itemId, "Data:", updatedItem);
    updateItem(updatedItem);
  }

  function handleDelete(): void {
    console.log("Deleting inventory item with id:", itemId);
    deleteItem(itemId);
  }


  return (
    <div className="flex flex-col gap-1 border border-primary p-4 rounded-xl">
      <div className="flex justify-between">
        <p className="font-semibold text-primary">{nameDisplay}</p>
        <p className="font-semibold">{quantityDisplay} {metricDisplay}</p>
      </div>
      <div className="flex gap-2 justify-between items-center">
        <div className="flex gap-4 items-center">
          <Badge className="bg-[#f0dece] text-[#6F403A] font-normal px-3 rounded-3xl">
            {badgeText}
          </Badge>
          <p className="text-sm text-gray-500">ID: {itemId}</p>
        </div>
        <div className="flex gap-2 justify-end items-center">
          <div className="bg-primary w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted hover:-translate-y-1 duration-300">
            <Dialog>
              <DialogTrigger>
                <RiPencilLine className="text-white" size={20} />
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit Inventory Item</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-8 py-4">
                  <div className="items-center gap-4">
                    <Label className="mb-2">Name</Label>
                    <Input placeholder="Item Name" defaultValue={name} onChange={(e) => setItemName(e.target.value)} />
                  </div>
                  <div className="items-center gap-4">
                    <Label className="mb-2">Metric</Label>
                    <Input placeholder="Item Metric (ex: kilograms)" defaultValue={metric} onChange={(e) => setMetricValue(e.target.value)} />
                  </div>
                  <div className="items-center gap-4">
                    <Label className="mb-2">Current Quantity</Label>
                    <Input placeholder="Item Quantity" defaultValue={quantity} onChange={(e) => setQuantity(parseFloat(e.target.value))} />
                  </div>
                </div>
                <Button type="submit" className=" bg-primary hover:bg-muted" onClick={handleUpdate}>
                  Edit Inventory Item
                </Button>
              </DialogContent>
            </Dialog>
          </div>
          <div className="bg-primary w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted hover:-translate-y-1 duration-300" onClick={handleDelete}>
            <RiDeleteBin5Line className="text-white" size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}

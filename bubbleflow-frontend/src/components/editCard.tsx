import {
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { useExtras } from "@/app/hooks/useExtras";
import { useState, useEffect } from "react";
import { Extra } from "@/app/service/types";

/*
    The following module describes the popup when the edit option is selected on an order card
*/

interface OrderItem {
    drinkName: string;
    drinkCategory: string;
    sugarLevel: string;
    iceLevel: string;
    toppings: string[];
    toppingIds: number[];
    price: number;
    imageSrc?: string;
    drinkId: number;
    itemId: number;
  }

interface DrinkCardProps {
    drinkPrice: number
    topPrice: number
    totalPrice: number
    iceOption: string;
    sugarOption: string;
    drinkName: string;
    itemId: number;
    currToppings: string[];
  }
  
  // Separate component for the dialog contents
  export default function DrinkEditDialog({
    drinkPrice,
    topPrice,
    totalPrice,
    sugarOption,
    iceOption,
    drinkName,
    isOpen,
    currToppings,
    itemId,
    setIsOpen
  }: DrinkCardProps & { isOpen: boolean; setIsOpen: (open: boolean) => void }) {
    const {
      extras,
      loading: extrasLoading,
      fetchExtras
    } = useExtras();
    
    // Fetch extras when the dialog opens
    useEffect(() => {
      if (isOpen) {
        fetchExtras();
      }
    }, [isOpen, fetchExtras]);
    
    const filterExtraByCategoryId = (extras: Extra[], categoryId: number): Extra[] => {
      return extras.filter(extra => extra.extra_category_id.extra_category_id === categoryId);
    }
  
    const sugarOptions: Extra[] = filterExtraByCategoryId(extras || [], 2);
    const iceOptions: Extra[] = filterExtraByCategoryId(extras || [], 1);
    const toppings: Extra[] = filterExtraByCategoryId(extras || [], 3);
  
    // store the full Extra objects
    const [selectedSugarObj, setSelectedSugarObj] = useState<Extra | null>(null);
    const [selectedIceObj, setSelectedIceObj] = useState<Extra | null>(null);
    const [selectedToppings, setSelectedToppings] = useState<Extra[]>([]);
  
    // initialize defaults when extras data is available
    useEffect(() => {
      if (sugarOptions.length > 0 && !selectedSugarObj) {
        setSelectedSugarObj(extras.filter(extra => extra.extra_name === sugarOption)[0]);
      }
      if (iceOptions.length > 0 && !selectedIceObj) {
        setSelectedIceObj(extras.filter(extra => extra.extra_name === iceOption)[0]);
      }
    }, [sugarOptions, iceOptions]);
    
    
    // handle sugar selection
    const handleSugarChange = (value: string) => {
      const sugar = sugarOptions.find(option => option.extra_name === value);
      if (sugar) {
        setSelectedSugarObj(sugar);
      }
    };
    
    // handle ice selection
    const handleIceChange = (value: string) => {
      const ice = iceOptions.find(option => option.extra_name === value);
      if (ice) {
        setSelectedIceObj(ice);
      }
    };
    
    // handle topping selection
    const handleToppingSelection = (topping: Extra) => {
  
      setSelectedToppings(prev => {
        const exists = prev.some(t => t.extra_id === topping.extra_id);
        if (exists) {
          return prev.filter(t => t.extra_id !== topping.extra_id);
        } else {
          return [...prev, topping];
        }
      });
    };
    
    //Load initial topping selections
    useEffect(() => {
      if(!extrasLoading){
        setSelectedToppings(toppings.filter(extra => currToppings.includes(extra.extra_name)));
      }
    }, [extrasLoading]);
  
  
  
    const handleEditConf = () => {
      const orderItem = {
        drinkName,
        drinkPrice,
        topPrice,
        totalPrice,
        sugarLevel: selectedSugarObj?.extra_name || "No Sugar",
        iceLevel: selectedIceObj?.extra_name || "No Ice",
        toppings: selectedToppings.length === 0 ? ["None"] : selectedToppings.map(t => t.extra_name),
        toppingIds: selectedToppings.map(t => t.extra_id),
        itemId,
      };
      
      // Edit the price total Local Variable
      const newToppingPrice = selectedToppings.reduce((acc, topping) => acc + topping.extra_price, 0);
      const currentTotal = parseFloat(localStorage.getItem("orderprice") || "0");
      const newTotal = currentTotal - topPrice + newToppingPrice;
      localStorage.setItem("orderprice", newTotal.toString());
  
      
      orderItem.drinkPrice = drinkPrice + newToppingPrice;
  
      let existingOrders = JSON.parse(localStorage.getItem("orderItems") || "[]");
      existingOrders.filter((item: OrderItem) => item.itemId === itemId)[0].topPrice = newToppingPrice;
      existingOrders.filter((item: OrderItem) => item.itemId === itemId)[0].totalPrice = totalPrice - topPrice + newToppingPrice;
      existingOrders.filter((item: OrderItem) => item.itemId === itemId)[0].iceLevel = orderItem.iceLevel;
      existingOrders.filter((item: OrderItem) => item.itemId === itemId)[0].sugarLevel = orderItem.sugarLevel;
      existingOrders.filter((item: OrderItem) => item.itemId === itemId)[0].toppings = orderItem.toppings;
      localStorage.setItem("orderItems", JSON.stringify(existingOrders));
      
      
      setIsOpen(false);
      window.location.reload();
    };
  
    return (
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{drinkName}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-8 py-4">
          <div className="items-center gap-4">
            <Label className="mb-2">
              Sugar
            </Label>
            <Select onValueChange={handleSugarChange} value={selectedSugarObj?.extra_name}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={extrasLoading ? "Loading options..." : "Select an Option"} />
              </SelectTrigger>
              <SelectContent>
                {sugarOptions.length > 0 ? (
                  sugarOptions.map((option) => (
                    <SelectItem key={option.extra_id} value={option.extra_name}>
                      {option.extra_name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem disabled value="loading">
                    {extrasLoading ? "Loading options..." : "No options available"}
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="items-center gap-4">
            <Label className="mb-2">
              Ice
            </Label>
            <Select onValueChange={handleIceChange} value={selectedIceObj?.extra_name}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={extrasLoading ? "Loading options..." : "Select an Option"} />
              </SelectTrigger>
              <SelectContent>
                {iceOptions.length > 0 ? (
                  iceOptions.map((option) => (
                    <SelectItem key={option.extra_id} value={option.extra_name}>
                      {option.extra_name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem disabled value="loading">
                    {extrasLoading ? "Loading options..." : "No options available"}
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="mb-2">
              Toppings
            </Label>
            <div className="flex flex-wrap gap-2">
              {toppings.length > 0 ? (
                toppings.map((topping) => {
                  let isSelected = selectedToppings.some(t => t.extra_id === topping.extra_id);
                  return (
                    <Badge
                      key={topping.extra_id}
                      className="rounded-4xl px-2 bg-white text-black border-gray-200 flex items-center"
                      variant={isSelected ? "default" : "outline"}
                      onClick={() => handleToppingSelection(topping)}
                    >
                      <div className={isSelected ? "w-4 h-4 rounded-full border mr-1 bg-black border-black" : "w-4 h-4 rounded-full border mr-1"}></div>
                      <p className="text-sm font-normal">{topping.extra_name}</p>
                    </Badge>
                  );
                })
              ) : (
                <div>{extrasLoading ? "Loading toppings..." : "No toppings available"}</div>
              )}
            </div>
          </div>
        </div>
        <Button 
          type="submit" 
          className="bg-[#6F403A] hover:bg-[#4E2D26]" 
          onClick={handleEditConf}
          disabled={extrasLoading}
        >
          Confirm Edit
        </Button>
      </DialogContent>
    );
  }
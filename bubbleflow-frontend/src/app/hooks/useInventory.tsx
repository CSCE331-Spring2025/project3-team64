import { useState, useCallback } from "react";
import { inventoryService } from "@/app/service/inventoryService";
import { Inventory, InventoryItem } from "@/app/service/types";

export const useGetInventory = () => {
    const [inventory, setInventory] = useState<Inventory>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchInventory = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await inventoryService.getInventory();
            setInventory(data);
        }
        catch(err) {
            setError('failed to fetch drinks');
            console.error(err);
        }
        finally {
            setLoading(false);
        }
    }, []);

    return {
        inventory,
        loading,
        error,
        fetchInventory
    };
};
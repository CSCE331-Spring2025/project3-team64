import { useState, useCallback } from "react";
import { inventoryService } from "@/app/service/inventoryService";
import { Inventory, InventoryItem, InventoryUsageItem } from "@/app/service/types";

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

export const useGetInventoryUsage = () => {
    const [usage, setUsage] = useState<InventoryUsageItem[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchInventoryUsage = useCallback(async (startDate: string, endDate: string) => {
        setLoading(true);
        setError(null);
        try {
            const data = await inventoryService.getInventoryUsage(startDate, endDate);
            //need to convert the array of arrays to an array of InventoryUsageItems
            const formattedData = data.map(([itemId, itemName, itemMetric, total_quantity_used]) => ({
                itemId,
                itemName,
                itemMetric,
                total_quantity_used
            }));
            setUsage(formattedData);
        }
        catch(err) {
            setError('failed to fetch inventory usage');
            console.error(err);
        }
        finally {
            setLoading(false);
        }
    }, []);

    return {
        usage,
        loading,
        error,
        fetchInventoryUsage
    };
};
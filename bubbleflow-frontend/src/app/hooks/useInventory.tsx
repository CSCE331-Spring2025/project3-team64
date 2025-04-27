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
            //console.log("Fetched inventory data:", data);
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

export const useUpdateInventoryItem = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateItem = useCallback(async (updatedItem: InventoryItem) => {
        setLoading(true);
        setError(null);
        try {
            //console.log("Sending updated item to backend:", updatedItem);
            await inventoryService.updateItem(updatedItem);
        }
        catch(err) {
            setError('failed to update item');
            console.error(err);
        }
        finally {
            setLoading(false);
        }
    }, []);

    return {
        loading,
        error,
        updateItem
    };
};

export const useAddInventoryItem = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const addItem = useCallback(async (newItem: InventoryItem) => {
        setLoading(true);
        setError(null);
        try {
            await inventoryService.addItem(newItem);
        }
        catch(err) {
            setError('failed to add item');
            console.error(err);
        }
        finally {
            setLoading(false);
        }
    }, []);

    return {
        loading,
        error,
        addItem
    };
};

export const useDeleteInventoryItem = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deleteItem = useCallback(async (itemId: number) => {
        setLoading(true);
        setError(null);
        try {
            await inventoryService.deleteItem(itemId);
        }
        catch(err) {
            setError('failed to delete item');
            console.error(err);
        }
        finally {
            setLoading(false);
        }
    }, []);

    return {
        loading,
        error,
        deleteItem
    };
};
import api from './api';
import { Inventory, InventoryItem, InventoryUsageItem } from './types';

export const inventoryService = {
    // inventory endpoints
    getInventory: () => {
        return api.get<Inventory>('/inventory').then(res => res.data);
    },

    updateInventory: (itemId: number, quantity: number) => {
        return api.put(`/inventory/${itemId}`, { quantity }).then(res => res.data);
    },

    deleteInventoryItem: (itemId: number) => {
        return api.delete(`/inventory/${itemId}`).then(res => res.data);
    },

    addInventoryItem: (item: InventoryItem) => {
        return api.post('/inventory', item).then(res => res.data);
    },

    getInventoryUsage: (startDate: string, endDate: string) => {
        //returns an array of objects with the following template:
        // [itemId, itemName, itemMetric, quantityUsed]
        //ex: [35, 'Water', 'liters', 11.2]
        return api.get<[number, string, string, number][]>('/inventory/usage', { params: { startDate, endDate } }).then(res => res.data);
    }
};
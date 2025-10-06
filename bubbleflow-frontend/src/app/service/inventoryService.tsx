import api from './api';
import { Inventory, InventoryItem, InventoryUsageItem } from './types';

export const inventoryService = {
    // inventory endpoints
    getInventory: () => {
        return api.get<Inventory>('/inventory').then(res => res.data);
    },

    updateItem: (updatedItem: InventoryItem) => {
        api.post('/inventory/updateItem', updatedItem).then(res => res.data);
    },

    addItem: (newItem: InventoryItem) => {
        api.post('/inventory/addItem', newItem).then(res => res.data);
    },

    deleteItem: (itemId: number) => {
        api.delete('/inventory/deleteItem', { params: { itemId } }).then(res => res.data);
    },

    getInventoryUsage: (startDate: string, endDate: string) => {
        //returns an array of objects with the following template:
        // [itemId, itemName, itemMetric, quantityUsed]
        //ex: [35, 'Water', 'liters', 11.2]
        return api.get<[number, string, string, number][]>('/inventory/usage', { params: { startDate, endDate } }).then(res => res.data);
    }
};
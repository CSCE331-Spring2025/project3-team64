import api from './api';
import { Inventory, InventoryItem } from './types';

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
    }
};
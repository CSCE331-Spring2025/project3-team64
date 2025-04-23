package com.team64.BubbleFlowBackend.service;

import com.team64.BubbleFlowBackend.model.Inventory;
import com.team64.BubbleFlowBackend.repository.InventoryRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.ArrayList;

// @Service
// public class InventoryService {
//     @Autowired
//     private InventoryRepo inventoryRepo;

//     public Inventory getInventory() {
//         Inventory inventory = new Inventory();
        
//         // Get all inventory items
//         List<Object[]> allInventoryItems = inventoryRepo.getAllInventoryItems();
//         List<Inventory.Item> items = new ArrayList<>();
//         for (Object[] row : allInventoryItems) {
//             Inventory.Item item = new Inventory.Item();
//             item.setItemId(((Number) row[0]).intValue());
//             item.setItemName((String) row[1]);
//             item.setItemMetric((String) row[2]);
//             item.setQuantity(((Number) row[3]).intValue());
//             items.add(item);
//         }
//         inventory.setItems(items);

//         // Get low inventory items
//         List<Object[]> lowInventoryItems = inventoryRepo.getLowInventoryItems();
//         List<Inventory.Item> lowStockItems = new ArrayList<>();
//         for (Object[] row : lowInventoryItems) {
//             Inventory.Item item = new Inventory.Item();
//             item.setItemId(((Number) row[0]).intValue());
//             item.setItemName((String) row[1]);
//             item.setItemMetric((String) row[2]);
//             item.setQuantity(((Number) row[3]).intValue());
//             lowStockItems.add(item);
//         }
//         inventory.setLowStockItems(lowStockItems);

//         // Get out of stock items
//         List<Object[]> outOfStockItems = inventoryRepo.getOutOfStockItems();
//         List<Inventory.Item> outOfStockItemsList = new ArrayList<>();
//         for (Object[] row : outOfStockItems) {
//             Inventory.Item item = new Inventory.Item();
//             item.setItemId(((Number) row[0]).intValue());
//             item.setItemName((String) row[1]);
//             item.setItemMetric((String) row[2]);
//             item.setQuantity(((Number) row[3]).intValue());
//             outOfStockItemsList.add(item);
//         }
//         inventory.setOutOfStockItems(outOfStockItemsList);

//         // Get the total number of items in the inventory
//         // int totalItems = inventoryRepo.getTotalInventoryQuantity().get(0).get(0).intValue();
//         //int totalItems = ((Number) inventoryRepo.getTotalInventoryQuantity().get(0)[0]).intValue();
//         int totalItems = inventoryRepo.getTotalInventoryQuantity().get(0).intValue();
//         inventory.setTotalItems(totalItems);

//         return inventory;
//     }
// }

@Service
public class InventoryService {

    @Autowired
    private InventoryRepo inventoryRepo;

    public Inventory getInventory() {
        Inventory inventory = new Inventory();

        // Get all inventory items
        inventory.setItems(mapInventoryItems(inventoryRepo.getAllInventoryItems()));
        
        // Get low inventory items
        inventory.setLowStockItems(mapInventoryItems(inventoryRepo.getLowInventoryItems()));
        
        // Get out of stock items
        inventory.setOutOfStockItems(mapInventoryItems(inventoryRepo.getOutOfStockItems()));
        
        // Get the total number of items
        inventory.setTotalItems(getTotalInventoryQuantity());

        return inventory;
    }

    private List<Inventory.Item> mapInventoryItems(List<Object[]> queryResults) {
        List<Inventory.Item> items = new ArrayList<>();
        for (Object[] row : queryResults) {
            Inventory.Item item = new Inventory.Item();
            item.setItemId(((Number) row[0]).intValue());
            item.setItemName((String) row[1]);
            item.setItemMetric((String) row[2]);
            item.setQuantity(((Number) row[3]).intValue());
            items.add(item);
        }
        return items;
    }

    private int getTotalInventoryQuantity() {
        return inventoryRepo.getTotalInventoryQuantity().get(0).intValue();
    }
}

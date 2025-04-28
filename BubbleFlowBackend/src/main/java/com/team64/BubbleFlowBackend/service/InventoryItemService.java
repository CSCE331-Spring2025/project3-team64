package com.team64.BubbleFlowBackend.service;
import com.team64.BubbleFlowBackend.model.*;
import com.team64.BubbleFlowBackend.repository.InventoryItemRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryItemService {
    private final InventoryItemRepo inventoryItemRepo;

    @Autowired
    public InventoryItemService(InventoryItemRepo inventoryItemRepo) {
        this.inventoryItemRepo = inventoryItemRepo;
    }
    
    public void addItem(InventoryItem item) {
        inventoryItemRepo.save(item);
    }
    public void updateItem(InventoryItem item) {
        inventoryItemRepo.save(item);
    }
    public void deleteItem(int itemId) {
        inventoryItemRepo.deleteById(itemId);
    }
}

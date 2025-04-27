package com.team64.BubbleFlowBackend.controller;

import com.team64.BubbleFlowBackend.model.Inventory;
import com.team64.BubbleFlowBackend.model.InventoryItem;
import com.team64.BubbleFlowBackend.service.InventoryItemService;
import com.team64.BubbleFlowBackend.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
// import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/inventory")
public class InventoryController {
    @Autowired
    private InventoryService inventoryService;
    @Autowired
    private InventoryItemService inventoryItemService;

    @GetMapping
    public Inventory getInventory() {
        return inventoryService.getInventory();
    }

    @GetMapping("/usage")
    public List<Object[]> getInventoryUsage(@RequestParam String startDate, @RequestParam String endDate) {
        return inventoryService.getInventoryUsage(startDate, endDate);
    }

    @PostMapping("/addItem")
    public void addItem(@RequestBody InventoryItem item) {
        inventoryItemService.addItem(item);
    }

    @PostMapping("/updateItem")
    public void updateItem(@RequestBody InventoryItem item) {
        //System.out.println("Updating item: " + item.getItemId() + " with name: " + item.getItemName() + " and quantity: " + item.getItemQuantity());
        inventoryItemService.updateItem(item);
    }
    
    @DeleteMapping("/deleteItem")
    public void deleteItem(@RequestParam int itemId) {
        inventoryItemService.deleteItem(itemId);
    }
}

// done unless inventory trends are added
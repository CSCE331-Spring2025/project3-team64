package com.team64.BubbleFlowBackend.controller;

import com.team64.BubbleFlowBackend.model.Inventory;
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
    private InventoryItemService inventoryItemService;

    @GetMapping
    public Inventory getInventory() {
        return inventoryService.getInventory();
    }



    /*@PostMapping("/addItem")
    public void addItem(@RequestBody Inventory.Item item) {
        inventoryItemService.addItem(item);
    }*/

    @GetMapping("/usage")
    public List<Object[]> getInventoryUsage(@RequestParam String startDate, @RequestParam String endDate) {
        return inventoryService.getInventoryUsage(startDate, endDate);
    }
}

// done unless inventory trends are added
// package com.team64.BubbleFlowBackend.repository;

// import com.team64.BubbleFlowBackend.model.Inventory;
// import com.team64.BubbleFlowBackend.service.InventoryService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import java.util.List;

// @RestController
// @RequestMapping("/inventory")
// public class InventoryController {
//     @Autowired
//     private InventoryService inventoryService;

//     @GetMapping
//     public List<Inventory> getAllInventory() {
//         return inventoryService.getAllInventory();
//     }
// }

// done unless inventory trends are added
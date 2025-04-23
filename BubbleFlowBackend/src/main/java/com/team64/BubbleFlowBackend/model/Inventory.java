package com.team64.BubbleFlowBackend.model;

// import jakarta.persistence.*;
import java.util.List;

// @Entity
// @Table(name = "inventory")
public class Inventory {
    // Defining the private variables - each query from InventoryRepo.java
    private List<Item> items;
    private List<Item> lowStockItems;
    private List<Item> outOfStockItems;
    private int totalItems;

    // inner class for listing inventory items
    public static class Item {
        private int itemId;
        private String itemName;
        private String itemMetric;
        private int quantity;

        public int getItemId() {
            return itemId;
        }

        public void setItemId(int itemId) {
            this.itemId = itemId;
        }

        public String getItemName() {
            return itemName;
        }

        public void setItemName(String itemName) {
            this.itemName = itemName;
        }

        public String getItemMetric() {
            return itemMetric;
        }

        public void setItemMetric(String itemMetric) {
            this.itemMetric = itemMetric;
        }

        public int getQuantity() {
            return quantity;
        }

        public void setQuantity(int quantity) {
            this.quantity = quantity;
        }
    }

    // Getters and Setters for the private variables
    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }

    public List<Item> getLowStockItems() {
        return lowStockItems;
    }

    public void setLowStockItems(List<Item> lowStockItems) {
        this.lowStockItems = lowStockItems;
    }

    public List<Item> getOutOfStockItems() {
        return outOfStockItems;
    }

    public void setOutOfStockItems(List<Item> outOfStockItems) {
        this.outOfStockItems = outOfStockItems;
    }

    public int getTotalItems() {
        return totalItems;
    }

    public void setTotalItems(int totalItems) {
        this.totalItems = totalItems;
    }
}

// fixed?
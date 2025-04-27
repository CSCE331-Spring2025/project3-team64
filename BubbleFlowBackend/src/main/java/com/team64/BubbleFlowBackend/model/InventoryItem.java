package com.team64.BubbleFlowBackend.model;
import jakarta.persistence.*;


@Entity
@Table(name = "Inventory")
public class InventoryItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Item_ID")
    private Long itemId;

    @Column(name = "Item_Name", nullable = false)
    private String itemName;

    @Column(name = "Item_Metric", nullable = false)
    private String itemMetric;

    @Column(name = "Item_Quantity", nullable = false)
    private double quantity;

    public InventoryItem() {
    }

    public InventoryItem(String itemName, String itemMetric, double quantity) {
        this.itemName = itemName;
        this.itemMetric = itemMetric;
        this.quantity = quantity;
    }

    // Getters and Setters
    public Long getItemId() {
        return itemId;
    }

    public void setItemId(Long itemId) {
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

    public double getItemQuantity() {
        return quantity;
    }

    public void setQuantity(double itemQuantity) {
        this.quantity = itemQuantity;
    }
}

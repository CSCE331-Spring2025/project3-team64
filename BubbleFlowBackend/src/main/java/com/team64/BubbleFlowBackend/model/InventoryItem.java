package com.team64.BubbleFlowBackend.model;
import jakarta.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "inventory")
public class InventoryItem {
    @Id
    @SequenceGenerator(name = "seq", sequenceName = "seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq")
    @Column(name = "Item_ID")
    private int itemId;

    @Column(name = "Item_Name")
    private String itemName;

    @Column(name = "Item_Metric")
    private String itemMetric;

    @Column(name = "Item_Quantity")
    private int quantity;

    public InventoryItem() {
        // Default constructor
    }

    public InventoryItem(int itemId, String itemName, String itemMetric, int quantity) {
        this.itemId = itemId;
        this.itemName = itemName;
        this.itemMetric = itemMetric;
        this.quantity = quantity;
    }

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

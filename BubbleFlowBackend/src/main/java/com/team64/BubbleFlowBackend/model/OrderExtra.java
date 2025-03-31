package com.team64.BubbleFlowBackend.model;

import jakarta.persistence.*;
//import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "Order_Extra")
public class OrderExtra{
    @Id
    @Column(name = "Order_Item_ID", nullable = false)
    private int order_item_id;

    @Column(name = "Extras_ID", nullable = false)
    private int extras_id;

    public int getOrder_item_id() {
        return order_item_id;
    }

    public void setOrder_item_id(int order_item_id) {
        this.order_item_id = order_item_id;
    }

    public int getExtras_id() {
        return extras_id;
    }

    public void setExtras_id(int extras_id) {
        this.extras_id = extras_id;
    }
}
package com.team64.BubbleFlowBackend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "order_items")
public class OrderItemRaw {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_item_id", nullable = true)
    private int order_item_id;

    @Column(name = "order_id")
    private int order_id;

    @Column(name = "drink_id")
    private int drink_id;

    public OrderItemRaw() {
        order_item_id = 1;
    }

    public int getOrder_item_id() {
        return order_item_id;
    }

    public void setOrder_item_id(int order_item_id) {
        this.order_item_id = order_item_id;
    }

    public int getOrder_id() {
        return order_id;
    }

    public void setOrder_id(int order_id) {
        this.order_id = order_id;
    }

    public int getDrink_id() {
        return drink_id;
    }

    public void setDrink_id(int drink_id) {
        this.drink_id = drink_id;
    }
}
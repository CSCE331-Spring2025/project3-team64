package com.team64.BubbleFlowBackend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class OrderExtraId implements Serializable {
    @Column(name = "order_item_id")
    private int order_item_id;

    @Column(name = "extras_id")
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
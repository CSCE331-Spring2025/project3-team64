package com.team64.BubbleFlowBackend.model;

import jakarta.persistence.Column;

import java.io.Serializable;

public class OrderExtraId implements Serializable {
    @Column(name = "order_item_id")
    private Integer order_item_id;

    @Column(name = "extras_id")
    private Integer extras_id;

    public Integer getOrder_item_id() {
        return order_item_id;
    }

    public void setOrder_item_id(Integer order_item_id) {
        this.order_item_id = order_item_id;
    }

    public Integer getExtras_id() {
        return extras_id;
    }

    public void setExtras_id(Integer extras_id) {
        this.extras_id = extras_id;
    }
}

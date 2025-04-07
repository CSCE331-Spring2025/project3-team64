package com.team64.BubbleFlowBackend.model;

import jakarta.persistence.Column;

import java.io.Serializable;

public class OrderExtraId implements Serializable {
    @Column(name = "order_item_id")
    private Integer orderItemId;

    @Column(name = "extras_id")
    private Integer extrasId;

    public Integer getOrderItemId() {
        return orderItemId;
    }

    public void setOrderItemId(Integer orderItemId) {
        this.orderItemId = orderItemId;
    }

    public Integer getExtrasId() {
        return extrasId;
    }

    public void setExtrasId(Integer extrasId) {
        this.extrasId = extrasId;
    }
}

package com.team64.BubbleFlowBackend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class OrderExtraId implements Serializable {
    @Column(name = "order_item_id")
    private int orderItemId;

    @Column(name = "extras_id")
    private int extrasId;

    public int getOrderItemId() {
        return orderItemId;
    }

    public void setOrderItemId(int orderItemId) {
        this.orderItemId = orderItemId;
    }

    public int getExtrasId() {
        return extrasId;
    }

    public void setExtrasId(int extrasId) {
        this.extrasId = extrasId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OrderExtraId that = (OrderExtraId) o;
        return orderItemId == that.orderItemId && extrasId == that.extrasId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(orderItemId, extrasId);
    }
}
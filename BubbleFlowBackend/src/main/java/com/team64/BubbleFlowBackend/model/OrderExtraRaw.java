package com.team64.BubbleFlowBackend.model;

import jakarta.persistence.*;

@Entity
@IdClass(OrderExtraRawId.class)
@Table(name = "Order_Extra")
public class OrderExtraRaw{
    @Id
    @Column(name = "order_item_id")
    private int order_item_id;

    @Id
    @Column(name = "extras_id")
    private int extras_id;

    public OrderExtraRaw() {
        order_item_id = 0;
        extras_id = 0;
    }

    public void setOrder_item_id(int _order_item_id) {
        this.order_item_id = _order_item_id;
    }

    public int getOrder_item_id() {
        return order_item_id;
    }

    public void setExtras_id(int _extras_id) {
        this.extras_id = _extras_id;
    }

    public int getExtras_id() {
        return extras_id;
    }
}

class OrderExtraRawId implements java.io.Serializable {
    private int order_item_id;
    private int extras_id;

    public OrderExtraRawId() {
        order_item_id = 0;
        extras_id = 0;
    }

    public OrderExtraRawId(int order_item_id, int extras_id) {
        this.order_item_id = order_item_id;
        this.extras_id = extras_id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof OrderExtraRawId)) return false;
        OrderExtraRawId that = (OrderExtraRawId) o;
        return order_item_id == that.order_item_id && extras_id == that.extras_id;
    }
}
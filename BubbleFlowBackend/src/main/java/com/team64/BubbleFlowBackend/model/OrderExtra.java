package com.team64.BubbleFlowBackend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "order_extra")
public class OrderExtra{

    @EmbeddedId
    private OrderExtraId id;

    @ManyToOne
    @MapsId("Order_Item_ID")
    @JoinColumn(name = "Order_Item_ID")
    private OrderItem orderItem;

    @ManyToOne
    @MapsId("Extras_ID")
    @JoinColumn(name = "Extras_ID")
    private Extra extra;


    public OrderExtraId getId() {
        return id;
    }

    public void setId(OrderExtraId id) {
        this.id = id;
    }

    public OrderItem getOrderItem() {
        return orderItem;
    }

    public void setOrderItem(OrderItem orderItem) {
        this.orderItem = orderItem;
    }

    public Extra getExtra() {
        return extra;
    }

    public void setExtra(Extra extra) {
        this.extra = extra;
    }
}
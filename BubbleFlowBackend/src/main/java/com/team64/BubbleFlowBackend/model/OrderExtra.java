package com.team64.BubbleFlowBackend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "order_extra")
public class OrderExtra{

    @EmbeddedId
    private OrderExtraId id;

    @ManyToOne
    @MapsId("order_item_id")
    @JoinColumn(name = "order_item_id")
    private OrderItem order_item;

    @ManyToOne
    @MapsId("extras_id")
    @JoinColumn(name = "extras_id")
    private Extra extra;


    public OrderExtraId getId() {
        return id;
    }

    public void setId(OrderExtraId id) {
        this.id = id;
    }

    public OrderItem getOrder_item() {
        return order_item;
    }

    public void setOrder_item(OrderItem order_item) {
        this.order_item = order_item;
    }

    public Extra getExtra() {
        return extra;
    }

    public void setExtra(Extra extra) {
        this.extra = extra;
    }
}
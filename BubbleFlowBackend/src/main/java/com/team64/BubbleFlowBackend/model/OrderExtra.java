package com.team64.BubbleFlowBackend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Order_Extra")
public class OrderExtra{

    @EmbeddedId
    private OrderExtraId id;

    //@Column(name = "order_item_id")
    //private int order_item_id;

    @ManyToOne
    @MapsId("order_item_id")
    @JoinColumn(name = "order_item_id")
    private OrderItem order_item;

    //@Column(name = "extras_id")
    //private int extras_id;

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

    /*public void setOrder_item_id(int _order_item_id) {
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
    }*/
}
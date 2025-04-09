package com.team64.BubbleFlowBackend.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;

@Entity
@Table(name = "order_items")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_item_id")
    private int order_item_id;

    @Column(name = "order_id", insertable = false, updatable = false)
    private int order_id;

    @Column(name = "drink_id", insertable = false, updatable = false)
    private int drink_id;

    @ManyToOne
    @JoinColumn(name = "drink_id")
    private Drink drink;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    @OneToMany(mappedBy = "order_item", cascade = CascadeType.ALL)
    private List<OrderExtra> extras;

    public OrderItem() {}

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

    public Drink getDrink() {
        return drink;
    }

    public void setDrink(Drink drink) {
        this.drink = drink;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public List<OrderExtra> getExtras() {
        return extras;
    }

    public void setExtras(List<OrderExtra> extras) {
        this.extras = extras;
    }
}
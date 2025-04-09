package com.team64.BubbleFlowBackend.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "extras_and_toppings")
public class Extra {
    @Id
    @Column(name = "extra_id")
    private int extra_id;

    @Column(name = "extra_category_id")
    private int extra_category_id;

    @Column(name = "extra_name")
    private String extra_name;

    @Column(name = "extra_price")
    private Double extra_price;

    @OneToMany(mappedBy = "extra")
    private List<OrderExtra> order_items;


    public int getExtra_id() {
        return extra_id;
    }

    public void setExtra_id(int extra_id) {
        this.extra_id = extra_id;
    }

    public int getExtra_category_id() {
        return extra_category_id;
    }

    public void setExtra_category_id(int extra_category_id) {
        this.extra_category_id = extra_category_id;
    }

    public String getExtra_name() {
        return extra_name;
    }

    public void setExtra_name(String extra_name) {
        this.extra_name = extra_name;
    }

    public Double getExtra_price() {
        return extra_price;
    }

    public void setExtra_price(Double extra_price) {
        this.extra_price = extra_price;
    }

    public List<OrderExtra> getOrder_items() {
        return order_items;
    }

    public void setOrder_items(List<OrderExtra> order_items) {
        this.order_items = order_items;
    }
}
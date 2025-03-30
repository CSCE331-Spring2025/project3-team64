package com.team64.BubbleFlowBackend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "extras_and_toppings")
public class Extras {
    @Id
    private int extra_id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "extra_category_id")
    private ExtrasCategory extra_category_id;

    private String extra_name;
    private double extra_price;

    public Extras(){};

    public int getExtra_id() {
        return extra_id;
    }

    public void setExtra_id(int extra_id) {
        this.extra_id = extra_id;
    }

    public ExtrasCategory getExtra_category_id() {
        return extra_category_id;
    }

    public void setExtra_category_id(ExtrasCategory extra_category_id) {
        this.extra_category_id = extra_category_id;
    }

    public String getExtra_name() {
        return extra_name;
    }

    public void setExtra_name(String extra_name) {
        this.extra_name = extra_name;
    }

    public double getExtra_price() {
        return extra_price;
    }

    public void setExtra_price(double extra_price) {
        this.extra_price = extra_price;
    }
}
package com.team64.BubbleFlowBackend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Drinks")
public class Drink {
    @Id
    private int drink_id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "drink_category_id")
    private DrinkCategory drink_category_id;

    private String drink_name;
    private double drink_price;
    private String active_months;

    public Drink(){};

    public int getDrink_id() {
        return drink_id;
    }

    public void setDrink_id(int drink_id) {
        this.drink_id = drink_id;
    }

    public DrinkCategory getDrink_category_id() {
        return drink_category_id;
    }

    public void setDrink_category_id(DrinkCategory drink_category_id) {
        this.drink_category_id = drink_category_id;
    }

    public String getDrink_name() {
        return drink_name;
    }

    public void setDrink_name(String drink_name) {
        this.drink_name = drink_name;
    }

    public double getDrink_price() {
        return drink_price;
    }

    public void setDrink_price(double drink_price) {
        this.drink_price = drink_price;
    }

    public String getActive_months() {
        return active_months;
    }

    public void setActive_months(String active_months) {
        this.active_months = active_months;
    }
}

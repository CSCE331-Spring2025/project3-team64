package com.team64.BubbleFlowBackend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Drinks")
public class Drink {
    @Id
    @Column(name = "drink_id")
    private int drinkId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "drink_category_id")
    private DrinkCategory drinkCategory;

    @Column(name = "drink_name")
    private String drinkName;

    @Column(name = "drink_price")
    private double drinkPrice;

    @Column(name = "active_months")
    private String activeMonths;

    public Drink() {}

    public int getDrinkId() {
        return drinkId;
    }

    public void setDrinkId(int drinkId) {
        this.drinkId = drinkId;
    }

    public DrinkCategory getDrinkCategory() {
        return drinkCategory;
    }

    public void setDrinkCategory(DrinkCategory drinkCategory) {
        this.drinkCategory = drinkCategory;
    }

    public String getDrinkName() {
        return drinkName;
    }

    public void setDrinkName(String drinkName) {
        this.drinkName = drinkName;
    }

    public double getDrinkPrice() {
        return drinkPrice;
    }

    public void setDrinkPrice(double drinkPrice) {
        this.drinkPrice = drinkPrice;
    }

    public String getActiveMonths() {
        return activeMonths;
    }

    public void setActiveMonths(String activeMonths) {
        this.activeMonths = activeMonths;
    }
}
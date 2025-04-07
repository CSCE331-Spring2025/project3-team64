package com.team64.BubbleFlowBackend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "drink_categories")
public class DrinkCategory {

    @Id
    @Column(name = "drink_category_id")
    private int drinkCategoryId;

    @Column(name = "drink_category_name")
    private String drinkCategoryName;

    public DrinkCategory() {}

    public int getDrinkCategoryId() {
        return drinkCategoryId;
    }

    public void setDrinkCategoryId(int drinkCategoryId) {
        this.drinkCategoryId = drinkCategoryId;
    }

    public String getDrinkCategoryName() {
        return drinkCategoryName;
    }

    public void setDrinkCategoryName(String drinkCategoryName) {
        this.drinkCategoryName = drinkCategoryName;
    }
}
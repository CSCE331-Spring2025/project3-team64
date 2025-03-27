package com.team64.BubbleFlowBackend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "drink_categories")
public class DrinkCategory {

    @Id
    private int drink_category_id;

    private String drink_category_name;

    public DrinkCategory () {};

    public int getDrink_category_id() {
        return drink_category_id;
    }

    public void setDrink_category_id(int drink_category_id) {
        this.drink_category_id = drink_category_id;
    }

    public String getDrink_category_name() {
        return drink_category_name;
    }

    public void setDrink_category_name(String drink_category_name) {
        this.drink_category_name = drink_category_name;
    }
}

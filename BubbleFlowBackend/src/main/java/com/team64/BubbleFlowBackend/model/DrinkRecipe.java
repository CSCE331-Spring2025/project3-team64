package com.team64.BubbleFlowBackend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "drink_recipe")
public class DrinkRecipe {
    @Id
    @SequenceGenerator(name = "seq", sequenceName = "seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq")

    @Column(name = "item_id")
    private int item_id;

    @Column(name = "drink_id")
    private int drink_id;

    @Column(name = "quanity_used")
    private int quantity_used;

    public DrinkRecipe() {}

    public int getItem_id() {
        return item_id;
    }

    public void setItem_id(int item_id) {
        this.item_id = item_id;
    }

    public int getDrink_id() {
        return drink_id;
    }

    public void setDrink_id(int drink_id) {
        this.drink_id = drink_id;
    }

    public int getQuantity_used() {
        return quantity_used;
    }

    public void setQuantity_used(int quantity_used) {
        this.quantity_used = quantity_used;
    }
}
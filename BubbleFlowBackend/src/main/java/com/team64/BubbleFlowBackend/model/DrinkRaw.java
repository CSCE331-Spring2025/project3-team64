package com.team64.BubbleFlowBackend.model;
import jakarta.persistence.*;

//This is the same as Drink.java but without the foreign key relationship to DrinkCategory.

@Entity
@Table(name = "Drinks")
public class DrinkRaw {
    @Id
    @Column(name = "drink_id")
    private int drink_id;
    @Column(name = "drink_category_id")
    private int drink_category;
    @Column(name = "drink_name")
    private String drink_name;
    @Column(name = "drink_price")
    private double drink_price;
    @Column(name = "active_months")
    private String active_months;

    @Transient //this is not in the database, but we need it to send the category name to the front-end
    private String drink_category_name; //front-end sends this instead of ID

    //default constructor
    public DrinkRaw() {}
    
    //getters and setters (thanks copilot)
    public int getDrink_id() {
        return drink_id;
    }

    public void setDrink_id(int drink_id) {
        this.drink_id = drink_id;
    }
    
    public int getDrink_category() {
        return drink_category;
    }

    public void setDrink_category(int drink_category) {
        this.drink_category = drink_category;
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

    public void setDrink_category_name(String drink_category_name) {
        this.drink_category_name = drink_category_name;
    }

    public String getDrink_category_name() {
        return drink_category_name;
    }
}

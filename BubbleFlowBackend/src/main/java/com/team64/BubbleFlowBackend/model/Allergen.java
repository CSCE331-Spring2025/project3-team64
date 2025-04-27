package com.team64.BubbleFlowBackend.model;

import jakarta.persistence.*;
import java.util.List;
import java.util.ArrayList;

public class Allergen {
    private String drinkName;
    private String allergenAlerts;

    public Allergen() {}

    public Allergen(String drinkName, String allergenAlerts) {
        this.drinkName = drinkName;
        this.allergenAlerts = allergenAlerts;
    }

    public String getDrinkName() {
        return drinkName;
    }

    public void setDrinkName(String drinkName) {
        this.drinkName = drinkName;
    }

    public String getAllergenAlerts() {
        return allergenAlerts;
    }

    public void setAllergenAlerts(String allergenAlerts) {
        this.allergenAlerts = allergenAlerts;
    }

}
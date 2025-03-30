package com.team64.BubbleFlowBackend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "extras_categories")
public class ExtrasCategory {
    @Id
    private int extra_category_id;

    private String extra_category_name;

    public ExtrasCategory(){};

    public int getExtra_category_id() {
        return extra_category_id;
    }

    public void setExtra_category_id(int extra_category_id) {
        this.extra_category_id = extra_category_id;
    }

    public String getExtra_category_name() {
        return extra_category_name;
    }

    public void setExtra_category_name(String extra_category_name) {
        this.extra_category_name = extra_category_name;
    }
}
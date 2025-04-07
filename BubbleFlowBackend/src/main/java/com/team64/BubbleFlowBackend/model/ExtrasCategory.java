package com.team64.BubbleFlowBackend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "extras_categories")
public class ExtrasCategory {
    @Id
    @Column(name = "extra_category_id")
    private int extraCategoryId;

    @Column(name = "extra_category_name")
    private String extraCategoryName;

    public ExtrasCategory() {}

    public int getExtraCategoryId() {
        return extraCategoryId;
    }

    public void setExtraCategoryId(int extraCategoryId) {
        this.extraCategoryId = extraCategoryId;
    }

    public String getExtraCategoryName() {
        return extraCategoryName;
    }

    public void setExtraCategoryName(String extraCategoryName) {
        this.extraCategoryName = extraCategoryName;
    }
}
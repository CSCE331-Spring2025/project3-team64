package com.team64.BubbleFlowBackend.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "extras_and_toppings")
public class Extra {
    @Id
    @Column(name = "extra_id")
    private Integer extraId;

    @Column(name = "extra_category_id")
    private Integer extraCategoryId;

    @Column(name = "extra_name")
    private String extraName;

    @Column(name = "extra_price")
    private Double extraPrice;

    @OneToMany(mappedBy = "extra")
    private List<OrderExtra> orderItems;

    public Integer getExtraId() {
        return extraId;
    }

    public void setExtraId(Integer extraId) {
        this.extraId = extraId;
    }

    public Integer getExtraCategoryId() {
        return extraCategoryId;
    }

    public void setExtraCategoryId(Integer extraCategoryId) {
        this.extraCategoryId = extraCategoryId;
    }

    public String getExtraName() {
        return extraName;
    }

    public void setExtraName(String extraName) {
        this.extraName = extraName;
    }

    public Double getExtraPrice() {
        return extraPrice;
    }

    public void setExtraPrice(Double extraPrice) {
        this.extraPrice = extraPrice;
    }

    public List<OrderExtra> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderExtra> orderItems) {
        this.orderItems = orderItems;
    }
}




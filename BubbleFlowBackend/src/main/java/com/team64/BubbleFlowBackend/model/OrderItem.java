package com.team64.BubbleFlowBackend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Order_Items")
public class OrderItem {

    @Id
    private int id;
}
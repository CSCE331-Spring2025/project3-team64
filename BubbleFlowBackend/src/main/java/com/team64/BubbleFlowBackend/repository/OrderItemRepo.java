package com.team64.BubbleFlowBackend.repository;

import com.team64.BubbleFlowBackend.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepo extends JpaRepository<OrderItem, Integer>{
}
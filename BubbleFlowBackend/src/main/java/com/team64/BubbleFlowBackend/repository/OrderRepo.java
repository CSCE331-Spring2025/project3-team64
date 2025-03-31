package com.team64.BubbleFlowBackend.repository;

import com.team64.BubbleFlowBackend.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepo extends JpaRepository<Order, Integer>{
}

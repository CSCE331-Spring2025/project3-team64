package com.team64.BubbleFlowBackend.repository;

import com.team64.BubbleFlowBackend.model.OrderExtra;
import com.team64.BubbleFlowBackend.model.OrderExtraId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderExtraRepo extends JpaRepository<OrderExtra, OrderExtraId> {
    List<OrderExtra> findByIdOrderItemId(int orderItemId);

    default List<OrderExtra> findByOrderItemId(int orderItemId) {
        return findByIdOrderItemId(orderItemId);
    }

}
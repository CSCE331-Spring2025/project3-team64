package com.team64.BubbleFlowBackend.service;

import com.team64.BubbleFlowBackend.model.Order;
import com.team64.BubbleFlowBackend.model.OrderItem;
import com.team64.BubbleFlowBackend.model.OrderExtra;
import com.team64.BubbleFlowBackend.model.OrderSubmissionObject;
import com.team64.BubbleFlowBackend.model.OrderSubmissionObject.DrinkWithToppings;
import com.team64.BubbleFlowBackend.repository.OrderRepo;
import com.team64.BubbleFlowBackend.repository.OrderItemRepo;
import com.team64.BubbleFlowBackend.repository.OrderExtraRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.sql.Timestamp;

import java.util.List;

@Service
public class OrderService {
    private final OrderRepo orderRepo;
    private final OrderItemRepo orderItemRepo;
    private final OrderExtraRepo orderExtraRepo;

    @Autowired
    public OrderService(OrderRepo orderRepo, OrderItemRepo orderItemRepo, OrderExtraRepo orderExtraRepo) {
        this.orderRepo = orderRepo;
        this.orderItemRepo = orderItemRepo;
        this.orderExtraRepo = orderExtraRepo;
    }

    public List<Order> getAllOrders(){
        return orderRepo.findAll();
    }

    public Order createOrder(Order order) {
        return orderRepo.save(order);
    }

    public Order submitOrder(OrderSubmissionObject orderSubmissionObject) {
        // Create and populate the order
        System.out.println(orderSubmissionObject);

        Order order = new Order();
        order.setOrder_total_price(orderSubmissionObject.getTotalPrice());
        order.setCustomer(orderSubmissionObject.getCustomerName());
        order.setEmployee_id(orderSubmissionObject.getEmployeeId());
        order.setPayment_method(orderSubmissionObject.getPaymentMethod());
        order.setOrder_date(new Timestamp(System.currentTimeMillis()));

        // Save the order first to get its ID
        order = orderRepo.save(order);

        // Process drinks and add them to the order
        List<DrinkWithToppings> drinks = orderSubmissionObject.getDrinks();
        if (drinks != null) {
            for (DrinkWithToppings item : drinks) {
                OrderItem orderItem = new OrderItem();
                orderItem.setDrink_id(item.getDrink_id());
                orderItem.setOrder(order);
                orderItem = orderItemRepo.save(orderItem);

                // Process toppings
                for (int toppingID : item.getToppings()) {
                    OrderExtra orderExtra = new OrderExtra();
                    orderExtra.setExtras_id(toppingID);
                    orderExtra.setOrder_item_id(orderItem.getOrder_item_id());
                    orderExtraRepo.save(orderExtra);
                }
            }
        }

        return order;
    }
}
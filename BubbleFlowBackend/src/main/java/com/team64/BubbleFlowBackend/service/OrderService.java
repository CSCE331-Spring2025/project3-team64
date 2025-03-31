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

/*Order object attributes (Many of these aren't available from the front-end and need to be found in the database):
 * @Id
    private int order_id;                                                                   needs to be generated

    private String customer;                                                                from front-end
    private double order_total_price;                                                       from front-end
    private Timestamp order_date;                                                           needs to be generated
    private int employee_id;                                                                from front-end but not implemented yet. Need one for self-service kiosk
    private String payment_method;                                                          from front-end

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> items = new ArrayList<>();                                      from front-end, but we only have drink names. Also need to submit topping paired with drinks which this doesn't support.
 */

public class OrderService {
    @Autowired
    private OrderRepo orderRepo;
    @Autowired
    private OrderItemRepo orderItemRepo;
    @Autowired
    private OrderExtraRepo orderExtraRepo;

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

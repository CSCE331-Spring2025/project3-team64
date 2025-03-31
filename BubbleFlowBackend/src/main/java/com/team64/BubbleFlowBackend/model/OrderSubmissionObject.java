package com.team64.BubbleFlowBackend.model;

import java.util.List;

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

public class OrderSubmissionObject {
    private double totalPrice;
    private String customerName;
    private String paymentMethod;
    private int employeeId;
    
    private List<DrinkWithToppings> order_items;
    
    public static class DrinkWithToppings {
        private int drink_id;
        private List<Integer> toppings;

        public int getDrink_id() {
            return drink_id;
        }

        public void setDrink_id(int drink_id) {
            this.drink_id = drink_id;
        }

        public List<Integer> getToppings() {
            return toppings;
        }

        public void setToppings(List<Integer> newToppings) {
            this.toppings = newToppings;
        }
    }

    

    public List<DrinkWithToppings> getDrinks() {
        return order_items;
    }

    public void setDrinks(List<DrinkWithToppings> drinks) {
        this.order_items = drinks;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public int getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(int employeeId) {
        this.employeeId = employeeId;
    }

    public static class DrinkOrder {
        private String drinkName;
        private List<String> toppings;
        public String getDrinkName() {
            return drinkName;
        }

        public void setDrinkName(String drinkName) {
            this.drinkName = drinkName;
        }

        public List<String> getToppings() {
            return toppings;
        }

        public void setToppings(List<String> toppings) {
            this.toppings = toppings;
        }
    }
}

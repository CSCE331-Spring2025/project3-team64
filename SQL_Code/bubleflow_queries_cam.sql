-- Special Query #1: "Weekly Sales History"
-- pseudocode: select count of orders grouped by week
-- about: given a specific week, how many orders were placed?
-- example: "week 1 has 98765 orders"
SELECT
    EXTRACT(WEEK FROM order_date) as week_number,
    COUNT(*) as order_count,
    SUM(order_total_price) as total_sales
FROM orders
GROUP BY
    EXTRACT(WEEK FROM order_date)
ORDER BY
    week_number;

-- Query 8
-- drinks that generate the most revenue
-- order drinks from most revenue to least revenue

SELECT 
    d.drink_name as drink_name,
    COUNT(*) as times_ordered,
    SUM(o.order_total_price) as total_revenue
FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
JOIN drinks d ON oi.drink_id = d.drink_id
GROUP BY d.drink_name
ORDER BY total_revenue DESC;


-- Query #7
-- most popular drinks
-- order drinks descending by count

SELECT
    d.drink_name as drink_name,
    COUNT(*) as times_ordered
FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
JOIN drinks d ON oi.drink_id = d.drink_id
GROUP BY d.drink_name
ORDER BY times_ordered DESC;

-- Query #2
-- orders processed by employee X
-- how many orders are processed by said employee?

SELECT 
    e.employee_name as employee_name,
    COUNT(*) as number_orders,
    SUM(o.order_total_price) as total_revenue
FROM orders o
JOIN employees e ON o.employee_id = e.employee_id
GROUP BY e.employee_name
ORDER BY number_orders DESC;


-- Query 9
-- group orders by hour
-- sort descending to show which hours have least orders/revenue
-- useful to set store hours for only good hours

SELECT 
    EXTRACT(HOUR FROM order_date) as hour_number,
    SUM(o.order_total_price) as total_revenue
FROM orders o
GROUP BY hour_number
ORDER BY total_revenue DESC;


-- Query 10
-- find total sales revenue

SELECT
    SUM(o.order_total_price) as total_revenue
FROM orders o

-- Query 14
-- Most Loyal Customer
-- List customers descending by how many drinks they have ordered

SELECT
    customer as customer_name,
    COUNT(*) as times_visited
FROM orders o
GROUP BY customer_name
ORDER BY times_visited DESC;

-- Query 15
-- Most Extra Drinks
-- List the drinks that most often have toppings / extras added to them

SELECT 
    d.drink_name,
    COUNT(*) as total_extras_count
FROM drinks d
JOIN order_items oi ON d.drink_id = oi.drink_id
JOIN order_extra oe ON oi.order_id = oe.order_id
GROUP BY d.drink_name
ORDER BY total_extras_count DESC;

/*Special Query 2
Special Query #2: "Realistic Sales History"

    pseudocode: select count of orders, sum of order total grouped by hour
    about: given a specific hour of the day, how many orders were placed and what was the total sum of the orders?
    example: e.g., "12pm has 12345 orders totaling $86753"*/

SELECT
    EXTRACT(HOUR FROM order_date) as hour_num,    --Hour extraction
    COUNT(*) as order_count,                      --Total the number of orders
    SUM(order_total_price) as total_sales         --Sum the cost of the orders
FROM orders
GROUP BY
    EXTRACT(HOUR FROM order_date)                --Group by hour
ORDER BY
    hour_num;                                    --Go hour by hour

/*Special Query 3
Special Query #3: "Peak Sales Day"

    pseudocode: select top 10 sums of order total grouped by day in descending order by order total
    about: given a specific day, what was the sum of the top 10 order totals?
    example: "30 August has $12345 of top sales"
*/
SELECT
    EXTRACT(YEAR FROM order_date) as order_year,      --Order year
    EXTRACT(MONTH FROM order_date) as order_month,    --Order month
    EXTRACT(DAY FROM order_date) as order_day,        --Order day 
    SUM(order_total_price) as total_sales             --Sum the sales
FROM orders
GROUP BY
    order_year, order_month, order_day                --Group to find individual days
ORDER BY
    total_sales DESC                                  --Order by sales to get highest sales, make sure DESC to have the higest 10 first
LIMIT 10;                                             --Limit to top 10



--Query 5; gets the top ten most expensive drinks on the menu
SELECT drink_name,drink_price FROM drinks ORDER BY drink_price DESC LIMIT 10;

--Query 6; get total revenue plus tax
SELECT
    SUM(order_total_price * 1.0825) as total_rev_with_tax            --this works apparently
FROM
    orders;
--Query 11; Average Drink Price for each drink category
SELECT
    drink_category_id as category,       --Get category id
    AVG(drink_cost) as avg_cost          --average the cost of each category
FROM drinks
GROUP BY
    drink_category_id                    --Group by the id
ORDER BY
    drink_category_id;                   --Order by groups

--Query 12; Most popular toppings, returns extras ID and price sorted by most expensive
SELECT
    order_extra.extras_id as extras_id,
    SUM(order_extra.extras_id) as total_extras
FROM order_extra
GROUP BY
    extras_id
ORDER BY
    total_extras DESC;

--Query 13; List employee names and emails for communication
SELECT employee_name as name, employee_email as email FROM employees;

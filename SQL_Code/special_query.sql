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
    SUM(order_total_price) as total_money             --Sum the sales
FROM orders
GROUP BY
    order_year, order_month, order_day                --Group to find individual days
ORDER BY
    total_money DESC                                  --Order by sales to get highest sales, make sure DESC to have the higest 10 first
LIMIT 10;                                             --Limit to top 10



-- Special Query #4: "Menu Item Inventory"
-- select count of inventory items from inventory and menu grouped by menu item
-- given a specific menu item, how many items from the inventory does that menu item use?
-- DESCENDING ORDER WITH DRINKS THAT USE THE MOST ITEMS AT THE TOP
select 
	Drinks.Drink_ID, 
    Drinks.Drink_Name, 
    count(Drink_Recipe.Ingredient_ID) as Ingredients_Used 
from Drinks 
join Drink_Recipe 
	on Drinks.Drink_ID = Drink_Recipe.Drink_ID
group by Drinks.Drink_ID, Drinks.Drink_Name
-- order by Drinks.Drink_ID asc;
order by Ingredients_Used desc;

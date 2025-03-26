--List of normal Queries, ordered by number on UML diagram

-- Query #1: "Core Ingredients"
-- From each ingredient category, find the ingredient that is used in the most drinks?
with drink_per_ingredient as (
	-- connect between the ingredients table and the drink_recipes table using Ingredient_ID
    -- then, group by the Ingredient_Category_ID
	select 
		Ingredients.Ingredient_ID,
        Ingredients.Ingredient_Category_ID,
        Ingredients.Item_ID,
        count(Drink_Recipe.Drink_ID) as Used_by_Number_of_Drinks
   --  Drink_Recipe.Drink_ID as dr_d_id
   --  count(Drink_ID) as drink_usage
   from Ingredients
   -- join Inventory
--         on Ingredients.Item_ID = Inventory.Item_ID
   join Drink_Recipe 
		on Ingredients.Ingredient_ID = Drink_Recipe.Ingredient_ID
   group by Ingredients.Ingredient_ID, Ingredients.Ingredient_Category_ID
)

select 
	dpi.Ingredient_Category_ID, 
    ic.Ingredient_Category_NAME, 
    dpi.Ingredient_ID, 
    inv.Item_Name,
    dpi.Used_by_Number_of_Drinks
from drink_per_ingredient dpi -- retrive data from the "function" above
	join (
		select 
			Ingredient_Category_ID,
            max(Used_by_Number_of_Drinks) as max_u 
		from drink_per_ingredient
        group by Ingredient_Category_ID 
        -- only select the ingredient that is used by most drinks from each ingredient category
        ) max_used
	on dpi.Ingredient_Category_ID = max_used.Ingredient_Category_ID
	and dpi.Used_by_Number_of_Drinks = max_used.max_u
    -- below lets u create a column with the ingredient category name
	join Ingredient_Categories ic
		on ic.Ingredient_Category_ID = dpi.Ingredient_Category_ID 
	-- below lets u create a column with the ingredient name
    -- note that the name of the ingredient had to be retrieved from invetory via Item_ID tag
	join Inventory inv
		on dpi.Ingredient_ID = inv.Item_ID
	-- order by ic.Ingredient_Category_Name;
	order by dpi.Ingredient_Category_ID asc;


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


-- Query #3: "Low Stock in Inventory"
-- Identify which ingredients are running low in inventory (less than 10 units) & order by Item_ID
select 
	Item_ID, 
    Item_Name as Item_Running_Low, 
    Item_Quantity as Units_Left 
from Inventory 
where Item_Quantity < 10.0 
order by Item_ID asc;


-- Query #4: "Free extra & toppings"
select 
	ec.Extra_Category_ID,
    ec.Extra_Category_NAME,
    -- for each category there is a sum (intially set to 0), everytime a price = 0.00 (free), the sum increments by 1
    -- the sum for each category is return at the end
    sum(case when et.Extra_Price = 0.00 then 1 when et.Extra_Price != 0.00 then 0 end) as Free_items
    -- et.Extra_Price
    from Extras_Categories ec
    left join Extras_and_Toppings et
                on ec.Extra_Category_ID = et.Extra_Category_ID
    -- where et.Extra_Price = 0.00
    group by ec.Extra_Category_ID, ec.Extra_Category_NAME
	order by ec.Extra_Category_ID asc;


--Query 5; gets the top ten most expensive drinks on the menu
SELECT drink_name,drink_price FROM drinks ORDER BY drink_price DESC LIMIT 10;



--Query 6; get total revenue plus tax
SELECT
    SUM(order_total_price * 1.0825) as total_rev_with_tax            --this works apparently
FROM
    orders;


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
    SUM(orders.order_total_price) as total_revenue
FROM orders;


--Query 11; Average Drink Price for each drink category
SELECT
    drink_category_id as category,       --Get category id
    AVG(Drink_Price) as avg_cost          --average the cost of each category
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

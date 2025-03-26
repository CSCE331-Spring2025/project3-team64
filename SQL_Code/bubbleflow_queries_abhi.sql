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
    
-- select * from Drinks;
-- select * from Drink_Categories;
-- select * from Extras_Categories;
-- select * from Extras_and_Toppings;
-- select * from Employees;
-- select * from Ingredient_Categories;
-- select * from Inventory;
-- select * from Ingredients;
-- select * from Drink_Recipe;

insert into Extras_Categories(Extra_Category_ID, Extra_Category_NAME) values
(1, 'Ice Level'),
(2, 'Sweetness Level'),
(3, 'Toppings');

insert into Extras_and_Toppings(Extra_ID, Extra_Category_ID, Extra_Name, Extra_Price) values 
(001, 1, 'Regular Ice', 0.00),
(002, 1, 'Less Ice', 0.00),
(003, 1, 'No Ice', 0.00),
(004, 2, 'Extra Sweet 120%', 0.00),
(005, 2, 'Normal 100%', 0.00),
(006, 2, 'Less 80%', 0.00),
(007, 2, 'Half 50%', 0.00),
(008, 2, 'Light 0%', 0.00),
(009, 2, 'No Sugar 0%', 0.00),
(010, 3, 'Pearl', 0.75),
(011, 3, 'Mini Pearl', 0.75),
(012, 3, 'Ice Cream', 0.75),
(013, 3, 'Pudding', 0.75),
(014, 3, 'Aloe Vera', 0.75),
(015, 3, 'Red Beans', 0.75),
(016, 3, 'Herb Jelly', 0.75),
(017, 3, 'Aiyu Jelly', 0.75),
(018, 3, 'Lychee Jelly', 0.75),
(019, 3, 'Creama', 1.00);

-- select * from Extras_Categories;
-- select * from Extras_and_Toppings;
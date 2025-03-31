create table if not exists Drink_Categories(
	Drink_Category_ID int NOT NULL, 
    Drink_Category_NAME varchar(255) NOT NULL, 
    primary key (Drink_Category_ID)
);

create table if not exists Drinks(
	Drink_ID int NOT NULL, 
    Drink_Category_ID int NOT NULL, 
    Drink_Name varchar(255) NOT NULL, 
    Drink_Price decimal(12,2) NOT NULL,
    active_months varchar(100),
    primary key (Drink_ID),  
    foreign key(Drink_Category_ID) 
	references Drink_Categories(Drink_Category_ID)
	ON DELETE CASCADE
);

create table if not exists Extras_Categories (
    Extra_Category_ID int NOT NULL,
    Extra_Category_NAME varchar(255) NOT NULL,
    PRIMARY KEY (Extra_Category_ID)
);

create table if not exists Extras_and_Toppings(
	Extra_ID int NOT NULL, 
    Extra_Category_ID int NOT NULL, 
    Extra_Name varchar(255) NOT NULL, 
    Extra_Price decimal(12,2) NOT NULL, 
    primary key (Extra_ID),  
    foreign key(Extra_Category_ID) 
	references Extras_Categories(Extra_Category_ID)
	ON DELETE CASCADE
);

/* Unused
create table if not exists Ingredient_Categories (
    Ingredient_Category_ID int NOT NULL,
    Ingredient_Category_NAME varchar(255) NOT NULL,
    PRIMARY KEY (Ingredient_Category_ID)
);
*/

create table if not exists Inventory (
    Item_ID int NOT NULL,
    Item_Name varchar(255) NOT NULL,
    Item_Metric varchar(255) NOT NULL,
    Item_Quantity decimal NOT NULL,
    PRIMARY KEY (Item_ID)
);

/*Unused
create table if not exists Ingredients (
    Ingredient_ID int NOT NULL,
    Item_ID int NOT NULL,
    Ingredient_Category_ID int NOT NULL,
    Ingredient_Quantity decimal NOT NULL,
    Ingredient_Metric varchar(255) NOT NULL,
    PRIMARY KEY (Ingredient_ID),
    FOREIGN KEY (Item_ID) 
        REFERENCES Inventory (Item_ID)
	ON DELETE CASCADE,
    FOREIGN KEY (Ingredient_Category_ID) 
        REFERENCES Ingredient_Categories (Ingredient_Category_ID)
	ON DELETE CASCADE
);
*/

create table if not exists Drink_Recipe (
    Item_ID INT NOT NULL,
    Drink_ID INT NOT NULL,
    Quantity_Used DECIMAL NOT NULL,
    FOREIGN KEY (Item_ID)
        REFERENCES Inventory (Item_ID)
	    ON DELETE CASCADE, 
    FOREIGN KEY (Drink_ID) 
        REFERENCES Drinks (Drink_ID)
	    ON DELETE CASCADE
);

create table if not exists Employees(
    Employee_ID int NOT NULL, 
	Employee_Name varchar(100) NOT NULL, 
    Employee_Email varchar(100) NOT NULL, 
    Employee_Phone varchar(100) NOT NULL, 
    Employee_Position varchar(100) NOT NULL, 
    PRIMARY KEY (Employee_ID)
);

create table if not exists Orders(
    Order_ID int NOT NULL,
    Customer varchar(100) NOT NULL,
    Order_total_price decimal NOT NULL,
    Order_date TIMESTAMP NOT NULL,
    Employee_ID int NOT NULL,
    Payment_method varchar(100) NOT NULL,
    FOREIGN KEY (Employee_ID)
        REFERENCES Employees (Employee_ID)
	ON DELETE SET NULL,
    PRIMARY KEY (Order_ID)
);

create table if not exists Order_Items(
    Order_Item_ID int NOT NULL,
    Order_ID int NOT NULL,
    Drink_ID int NOT NULL,
    PRIMARY KEY (Order_Item_ID),
    FOREIGN KEY (Order_Item_ID)
        REFERENCES Orders (Order_ID)
	ON DELETE CASCADE,
    FOREIGN KEY (Drink_ID)
        REFERENCES Drinks (Drink_ID)
	ON DELETE CASCADE
);

create table if not exists Order_Extra(
    Order_Item_ID int NOT NULL,
    Extras_ID int NOT NULL,
    FOREIGN KEY (Order_Item_ID)
        REFERENCES Order_Items (Order_Item_ID)
	    ON DELETE CASCADE,
    FOREIGN KEY (Extras_ID)
        REFERENCES Extras_and_Toppings (Extra_ID)
        ON DELETE CASCADE
);

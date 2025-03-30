#Outdated
#Run script: python3 scriptname.py <password> <execute commands (y/n)>
#password is the database password (pinned in discord)

#To install dependencies: python3 -m pip install psycopg2-binary pandas numpy

#Don't modify this file directly, copy it to a new script used for a specific task and modify from there

import psycopg2
import psycopg2.extras
import pandas as pd
import sys
import time
import datetime
import math
import random
import numpy as np

#Generation Configuration
ORDERS_NEEDED = 1000000 #million
NUM_WEEKS = 52
FUTURE_WEEKS = 2
START_HOUR = 8
CLOSE_HOUR = 20 #24 hour fomat
RUSH_DAY_MULTIPLIER = 10 #orders take on average <RUSH_DAY_MULTIPLIER>x less time to come in


if len(sys.argv) < 2:
    print("Arguments not recognized. \nUsage: python3 python_template.py <password>")
    sys.exit()

execute = False
if(len(sys.argv) > 2 and sys.argv[2] == "y"):
    execute = True

password = sys.argv[1]

# Open output file
f = open("pythonGen.sql", "w")

# Connect to an existing database
with psycopg2.connect("dbname=team_64_db user=team_64 password="+password+" host=csce-315-db.engr.tamu.edu") as conn:
    # Open a cursor to perform database operations
    with conn.cursor() as cur:
        column_names_dict = {}
        
        #Helper functions
        
        #Ex: insert_row("Employees", (69, "Josh Colborn", "jcolborn@tamu.edu", "2147483647", "Drink Wizard"))
        def insert_row(table, values):
            column_names = column_names_dict[table]
            values = [str(x) for x in values]
            #print("Column names: {}\n".format(column_names))
            try:
                insert_command_txt = "INSERT INTO " + table + " (" + ', '.join(column_names) + ") VALUES (" + ', '.join(values) + ");\n"
                f.write(insert_command_txt)
                if execute:
                    cur.execute(
                        "INSERT INTO " + table + " (" + ', '.join(column_names) + ") VALUES (" + ', '.join(['%s' for i in range(len(column_names))]) + ")",
                        values
                    )
            except Exception as e:
                print("Error inserting: ", e)
                print("All changes made before this will be discarded.")
                conn.rollback()
        
        def insert_row_start(table):
            column_names = column_names_dict[table]
            insert_command_txt = "INSERT INTO " + table + " (" + ', '.join(column_names) + ") VALUES \n"
            f.write(insert_command_txt)
        
        def insert_row_value(values):
            values = [str(x) for x in values]
            insert_command_txt = "(" + ', '.join(values) + ")\n"
            f.write(insert_command_txt)
        
        def insert_row_end():
            f.write("\n")
        
        #Ex: print_col_names("Employees")
        def print_col_info(table):
            print("Column names and types for table " + table + ":") 
            
            #Code from khampson's answer to https://stackoverflow.com/questions/27832289/postgresql-how-do-you-get-the-column-formats
            cur2 = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
            cur2.execute("""select *
                           from information_schema.columns
                           where table_schema NOT IN ('information_schema', 'pg_catalog')
                           order by table_name""")
            
            typeDict={}
            for row in cur2:
                if(row['table_name'] == table.lower()):
                    typeDict[row['column_name']] = row['data_type']
            
            for col in column_names_dict[table]: #in correct order
                print(col + ":   " + typeDict[col])
            print('\n')
        
        
        def get_dataframe(table):
            cur.execute("SELECT * FROM " + table)
            column_names = column_names_dict[table.lower()]
            table = cur.fetchall()
            
            df = pd.DataFrame(table, columns=column_names)
            df.set_index(column_names[0], inplace=True)
            return(df)

        def get_dataframe_indexed(table):
            cur.execute("SELECT * FROM " + table)
            column_names = column_names_dict[table.lower()]
            table = cur.fetchall()
            
            df = pd.DataFrame(table, columns=column_names)
            #df.set_index(column_names[0], inplace=True)
            return(df)
        
        def print_table(table):
            print("Printing table " + table + ":")
            df = get_dataframe(table)
            if df.empty:
                print('Table is empty.')
            else:
                print(df)
            print('\n')
            return(df)
        
        #Wipes all the data from a table
        def wipe_table(table):
            print("Wiping table " + table)
            cur.execute("DELETE FROM " + table)
        
        #Returns a list of tables in the database
        def get_tables():
            cur.execute("""SELECT table_name FROM information_schema.tables
               WHERE table_schema = 'public'""")
            return list(x[0] for x in cur.fetchall())
        
        #Print list of tables in database
        def print_tables():
            for table in get_tables():
                print(table)
        
        
        #Returns strings containing values for drink, extras, and order.
        def get_random_order_vals(order_id, order_date, final=False):
            #num_drinks = max(int(np.random.normal(loc=1.5, scale=2)),1)
            customer = customer_names[random.randint(0, len(customer_names)-1)]
            employee_id = random.randint(0, 4)+1 #hard-coded cus it was messing up for some reason
            total_price = 0
            drinks_string = ""
            extras_string = ""
            order_string = ""
            
            drink = drink_dt_indexed.iloc[random.randint(0, num_drinks-1)]
            total_price += drink['drink_price']
            paymentMethodIndex = random.randint(0, 10)
            paymentMethod=""
            if(paymentMethodIndex == 0):
                paymentMethod = "'Apple Pay'"
            elif(paymentMethodIndex == 1):
                paymentMethod = "'Gift Card'"
            else:
                paymentMethod = "'Credit Card'"
            
            
            if(final):
                rand_index = random.randint(0, num_extras-1)
                extra = extras_dt_indexed.iloc[rand_index]
                total_price += extra['extra_price']
                extras_string += "(" + str(order_id) + ", " + str(extra['extra_id']) + ");\n\n"
            else:
                num_extras_purchased = max(int(np.random.normal(loc=1.5, scale=1)),0)
                indexes_chosen = []
                for i in range(num_extras_purchased):
                    rand_index = random.randint(0, num_extras-1)
                    if(rand_index not in indexes_chosen):
                        indexes_chosen.append(rand_index)
                        extra = extras_dt_indexed.iloc[rand_index]
                        total_price += extra['extra_price']
                        extras_string += "(" + str(order_id) + ", " + str(extra['extra_id']) + "),\n"
            
            if(final):
                drinks_string += "(" + str(order_id) + ", " + str(drink['drink_id']) + ");\n\n"
                order_string += "(" + str(order_id) + ", '" + customer + "', " + str(total_price) + ", '" + order_date.strftime('%Y-%m-%d %H:%M:%S') + "', " + str(employee_id) + ", " + paymentMethod + ");\n\n"
            else:
                drinks_string += "(" + str(order_id) + ", " + str(drink['drink_id']) + "),\n"
                order_string += "(" + str(order_id) + ", '" + customer + "', " + str(total_price) + ", '" + order_date.strftime('%Y-%m-%d %H:%M:%S') + "', " + str(employee_id) + ", " + paymentMethod + "),\n"
            return((drinks_string, extras_string, order_string))
        
        #returns of the datetime is a rush day
        def isRushDay(day):
            #August 19th for start of Fall (referencing Fall 2024)
            FallStart = day.month == 8 and day.day == 19
            
            #January 13th for start of Spring (referencing Spring 2025)
            SpringStart = day.month == 1 and day.day == 13
            return(FallStart or SpringStart)
        
        #Get a list of column names for all tables so it doesn't need to be queried every time there's an insertion (way faster)
        for table in get_tables():
            cur.execute("SELECT * FROM " + table)
            column_names_dict[table] = [desc[0] for desc in cur.description]
            #print_col_info(table)
            #print_table(table)
        
        """
        Quick Reference:
        print_table(table)
        print_col_info(table)
        insert_row(table, values)   ex: insert_row("Employees", (69, "Josh Colborn", "jcolborn@tamu.edu", "2147483647", "Drink Wizard"))
        wipe_table(table)
        print_tables()
        get_tables()
        """
        #Your code here. Use helper functions to interact with the database.
        
        #To randomly select customer names
        customer_names = [
            "Emma", "Liam", "Olivia", "Noah", "Ava", "Elijah", "Sophia", "James", 
            "Isabella", "Benjamin", "Mia", "Lucas", "Charlotte", "Mason", "Amelia", 
            "Ethan", "Harper", "Alexander", "Evelyn", "Henry", "Jack", "Ella", 
            "Daniel", "Scarlett", "Michael", "Grace", "Sebastian", "Lily", "Matthew", 
            "Aria", "Samuel", "Chloe", "David", "Mila", "Joseph", "Nora", "Carter", 
            "Hazel", "Owen", "Zoey", "Wyatt", "Riley", "John", "Victoria", "Luke", 
            "Penelope", "Gabriel", "Lillian", "Anthony", "Addison", "Dylan", "Layla", 
            "Isaac", "Natalie", "Grayson", "Hannah", "Leo", "Brooklyn", "Lincoln", 
            "Zoe", "Hudson", "Leah", "Hunter", "Audrey", "Nathan", "Savannah", 
            "Caleb", "Bella", "Eli", "Claire", "Connor", "Skylar", "Aaron", "Lucy", 
            "Landon", "Paisley", "Adrian", "Anna", "Jonathan", "Caroline", "Nolan", 
            "Genesis", "Jeremiah", "Aaliyah", "Easton", "Kennedy", "Elias", "Kinsley", 
            "Colton", "Aubrey", "Cameron", "Autumn", "Asher", "Sadie", "Dominic", 
            "Gabriella", "Axel", "Madelyn", "Jaxon", "Ariana", "Robert", "Stella", 
            "Maverick", "Allison", "Jose", "Ivy", "Everett", "Violet", "Parker", 
            "Lydia", "Xavier", "Elena", "Adam", "Naomi", "Jace", "Ruby"
        ]
        drink_dt = get_dataframe("drinks")
        drink_dt_indexed = get_dataframe_indexed("drinks")
        num_drinks = drink_dt.shape[0]
        #print(num_drinks)
        #print(drink_dt)
        
        extras_dt = get_dataframe("extras_and_toppings")
        extras_dt_indexed = get_dataframe_indexed("extras_and_toppings")
        num_extras= extras_dt.shape[0]
        #print(num_extras)
        #print(extras_dt)
        
        employees_dt = get_dataframe("employees")
        employees_dt_indexed = get_dataframe_indexed("employees")
        num_employees= employees_dt.shape[0]
        
        
        
        # Get start time for first day of business (52 weeks ago)
        start_datetime = datetime.datetime.now() - datetime.timedelta(weeks=(NUM_WEEKS))
        start_datetime = start_datetime.replace(hour=START_HOUR, minute=0, second=0)

        order_id_global = 1

        num_days = NUM_WEEKS*7 + FUTURE_WEEKS*7
        orders_per_day = math.ceil(ORDERS_NEEDED/num_days)
        avg_time_between_orders = datetime.timedelta(hours = CLOSE_HOUR - START_HOUR)/orders_per_day
        
        
        for currDay in range(num_days):
            f.write("\n\n\n\n-- Day "+str(currDay)+'\n')
            print("Day "+str(currDay))
            order_insertions_string = "INSERT INTO Orders(Order_ID, Customer, Order_total_price, Order_date, Employee_ID, Payment_method) VALUES\n"
            order_items_insertions_string = "INSERT INTO Order_Items(Order_ID, Drink_ID) VALUES\n"
            order_extra_insertions_string = "INSERT INTO Order_Extra(Order_ID, Extras_ID) VALUES\n"
            
            curr_time = start_datetime + datetime.timedelta(days=currDay)
            
            baseTimestep = avg_time_between_orders
            if isRushDay(curr_time):
                f.write("-- RUSH DAY!!!\n")
                print("RUSH DAY!!!")
                baseTimestep = baseTimestep/RUSH_DAY_MULTIPLIER
            
            while(curr_time.hour < CLOSE_HOUR):
                #Returns strings containing values for drink, extras, and order.
                orderVals = get_random_order_vals(order_id_global, curr_time)
                order_items_insertions_string += orderVals[0]
                order_extra_insertions_string += orderVals[1]
                order_insertions_string += orderVals[2]
                order_id_global+=1
                
                curr_time += baseTimestep*random.random()*2
            
            orderVals = get_random_order_vals(order_id_global, curr_time, final=True)
            order_items_insertions_string += orderVals[0]
            order_extra_insertions_string += orderVals[1]
            order_insertions_string += orderVals[2]
            order_id_global+=1
            
            f.write(order_insertions_string + order_items_insertions_string + order_extra_insertions_string)
            
                
                
            
        
        
        print("Orders per day requested: "+str(orders_per_day))
        print("Orders per day actual:    "+str((order_id_global-1)/num_days))
        

        #print_table('orders')
        #Decide whether to make changes or discard them
        #saveChanges = input("Commit changes? (y/n): ")
        #if saveChanges == "y":
        #    conn.commit()
        #else:
        #    conn.rollback()
        conn.rollback()
f.close()
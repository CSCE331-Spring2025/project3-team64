def generate_drink_recipes(output_file):
    boba_recipe_items = {
        "Green Tea Base": 1,
        "Oolong Tea Base": 2,
        "Black Tea Base": 3,
        "Thai Tea Base": 4,
        "Milk Powder": 5,
        "Fresh Milk": 6,
        "Lime Juice": 7,
        "Brown Sugar Syrup": 8,
        "Mango Syrup": 9,
        "Strawberry Syrup": 10,
        "Wintermelon Syrup": 11,
        "Peach Syrup": 12,
        "Kiwi Syrup": 13,
        "Passion Fruit Syrup": 14,
        "Ginger Syrup": 15,
        "Honey": 16,
        "Sugar": 17,
        "Matcha Powder": 18,
        "Cofee Powder": 19,
        "Coco Powder": 20,
        "Taro Powder": 21,
        "Oreos": 22,
        "Mint Leaves": 23,
        "Pearl": 24,
        "Mini Pearl": 25,
        "Ice Cream": 26,
        "Pudding": 27,
        "Aloe Vera": 28,
        "Red Beans": 29,
        "Herb Jelly": 30,
        "Aiyu Jelly": 31,
        "Lychee Jelly": 32,
        "Creama": 33,
        "Ice": 34,
        "Water": 35
    }
    
    drinks_list = [
        (1, 'Classic Milk Tea'),
        (2, 'Honey Milk Tea'),
        (3, 'Classic Coffee'),
        (4, 'Ginger Milk Tea'),
        (5, 'Thai Pearl Milk Tea'),
        (6, 'Taro Pearl Milk Tea'),
        (7, 'Classic Tea'),
        (8, 'Wintermelon Tea'),
        (9, 'Honey Tea'),
        (10, 'Ginger Tea'),
        (11, 'Mango Green Tea'),
        (12, 'Wintermelon Lemonade'),
        (13, 'Strawberry Tea'),
        (14, 'Peach Tea with Aiyu Jelly'),
        (15, 'Kiwi Fruit Tea with Aiyu Jelly'),
        (16, 'Mango & Passion Fruit Tea'),
        (17, 'Cocoa Lover with Fresh Milk'),
        (18, 'Homemade Taro with Fresh Milk'),
        (19, 'Matcha with Fresh Milk'),
        (20, 'Oreo Ice Blended with Pearl'),
        (21, 'Matcha Red Bean Ice Blended with Ice Cream'),
        (22, 'Coffee Ice Blended with Ice Cream'),
        (23, 'Mango Ice Blended with Ice Cream'),
        (24, 'Strawberry Ice Blended with Lychee Jelly & Ice Cream'),
        (25, 'Lime Mojito'),
        (26, 'Mango Mojito'),
        (27, 'Peach Mojito'),
        (28, 'Strawberry Mojito'),
        (29, 'Creama Tea'),
        (30, 'Match Creama'),
        (31, 'Coffee Creama'),
        (32, 'Cocoa Creama')
    ]

    #map drink id to its ingredients
    drink_to_ingredients = {
        1:  ["Black Tea Base", "Milk Powder", "Sugar", "Water"],                     # Classic Milk Tea
        2:  ["Black Tea Base", "Milk Powder", "Honey", "Water"],                     # Honey Milk Tea
        3:  ["Cofee Powder", "Milk Powder", "Sugar", "Water"],                       # Classic Coffee
        4:  ["Black Tea Base", "Milk Powder", "Ginger Syrup", "Water"],             # Ginger Milk Tea
        5:  ["Thai Tea Base", "Milk Powder", "Pearl", "Water"],                      # Thai Pearl Milk Tea
        6:  ["Taro Powder", "Milk Powder", "Pearl", "Water"],                        # Taro Pearl Milk Tea
        7:  ["Black Tea Base", "Water"],                                            # Classic Tea
        8:  ["Wintermelon Syrup", "Water"],                                         # Wintermelon Tea
        9:  ["Black Tea Base", "Honey", "Water"],                                   # Honey Tea
        10: ["Black Tea Base", "Ginger Syrup", "Water"],                            # Ginger Tea
        11: ["Green Tea Base", "Mango Syrup", "Water",],                             # Mango Green Tea
        12: ["Wintermelon Syrup", "Lime Juice", "Water"],                  # Wintermelon Lemonade
        13: ["Black Tea Base", "Strawberry Syrup", "Water"],                        # Strawberry Tea
        14: ["Black Tea Base", "Peach Syrup", "Aiyu Jelly", "Water"],               # Peach Tea with Aiyu Jelly
        15: ["Black Tea Base", "Kiwi Syrup", "Aiyu Jelly", "Water"],                # Kiwi Fruit Tea with Aiyu Jelly
        16: ["Black Tea Base", "Mango Syrup", "Passion Fruit Syrup", "Water"],      # Mango & Passion Fruit Tea
        17: ["Coco Powder", "Fresh Milk", "Sugar", "Water"],                        # Cocoa Lover with Fresh Milk
        18: ["Taro Powder", "Fresh Milk", "Sugar", "Water"],                        # Homemade Taro with Fresh Milk
        19: ["Matcha Powder", "Fresh Milk", "Sugar"],                      # Matcha with Fresh Milk
        20: ["Oreos", "Pearl", "Ice Cream"],                               # Oreo Ice Blended with Pearl
        21: ["Matcha Powder", "Red Beans", "Ice Cream", "Ice"],                   # Matcha Red Bean Ice Blended with Ice Cream
        22: ["Cofee Powder", "Ice Cream","Ice"],                                 # Coffee Ice Blended with Ice Cream
        23: ["Mango Syrup", "Ice Cream","Ice"],                                  # Mango Ice Blended with Ice Cream
        24: ["Strawberry Syrup", "Lychee Jelly", "Ice Cream", "Ice"],             # Strawberry Ice Blended with Lychee Jelly & Ice Cream
        25: ["Lime Juice", "Mint Leaves", "Water"],                        # Lime Mojito
        26: ["Mango Syrup", "Mint Leaves", "Water"],                       # Mango Mojito
        27: ["Peach Syrup", "Mint Leaves", "Water"],                       # Peach Mojito
        28: ["Strawberry Syrup", "Mint Leaves", "Water"],                  # Strawberry Mojito
        29: ["Black Tea Base", "Creama", "Water"],                                  # Creama Tea
        30: ["Matcha Powder", "Creama", "Water"],                                   # Match Creama
        31: ["Cofee Powder", "Creama", "Water"],                                    # Coffee Creama
        32: ["Coco Powder", "Creama", "Water"]                                      # Cocoa Creama
    }

    with open(output_file, "w") as sql_file:
        sql_file.write("-- Insert statements for Drink_Recipe\n")

        for (drink_id, drink_name) in drinks_list:
            if drink_id in drink_to_ingredients:
                for ing_name in drink_to_ingredients[drink_id]:
                    if ing_name in boba_recipe_items:
                        ingredient_id = boba_recipe_items[ing_name]
                        insert_stmt = (
                            f"INSERT INTO Drink_Recipe (Drink_ID, Ingredient_ID) "
                            f"VALUES ({drink_id}, {ingredient_id});\n"
                        )
                        sql_file.write(insert_stmt)
                    else:
                        # If the ingredient isn't found, you can decide to skip or raise an error
                        sql_file.write(f"-- WARNING: Ingredient '{ing_name}' not found for Drink ID {drink_id}\n")

output_filename = "bubbleflow_recipes.sql"
generate_drink_recipes(output_filename)

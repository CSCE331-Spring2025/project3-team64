export interface DrinkCategory {
    drink_category_id: number;
    drink_category_name: string;
}

export interface Drink {
    drink_id: number;
    drink_category_id: DrinkCategory;
    drink_name: string;
    drink_price: number;
    active_months: string | null;
}
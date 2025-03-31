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

export interface ExtraCategory {
    extra_category_id: number;
    extra_category_name: string;
}

export interface Extra {
    extra_id: number;
    extra_category_id: ExtraCategory;
    extra_name: string;
    extra_price: number;
}

export interface OrderSubmission {
    order_id: number;
    customer: string;
    order_date: Date;
    employee_id: number;
    payment_method: string;
    order_items: {
        drink_id: number;
        topping_ids: number[];
    }[];
}
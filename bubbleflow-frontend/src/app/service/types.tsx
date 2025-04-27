export interface DrinkCategory {
    drink_category_id: number;
    drink_category_name: string;
}

export interface Drink {
    drink_id: number;
    drink_category: DrinkCategory;
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
    extra_category_id: number;
    extra_name: string;
    extra_price: number;
}

export interface OrderSubmission {
    totalPrice: number;
    customerName: string;
    employeeId: number;
    paymentMethod: string;
    drinks: Array<{
      drink_id: number;
      toppings: number[];
    }>;
}

export interface Report {
    reportType: string;
    generatedAt: string;
    reportDate: string;

    // fields for sales report
    itemSales?: ItemSale[];
    startReportDate: string;
    endReportDate: string;
    
    // fields for X Report
    hourlySales?: HourlySale[];
    totalSales?: number;
    totalTransactions?: number;
    
    // fields for Z Report
    gross_SALES?: string;
    tax?: string;
    total_NET_SALES?: string;
    salesCategories?: SalesCategory[];
    sales_CATEGORY_TOTAL?: string;
    paymentMethods?: PaymentMethod[];
    total_PAYMENTS?: string;
}

export interface HourlySale {
    hour: number;
    transactionCount: number;
    totalSales: number;
}

export interface SalesCategory {
    category: string;
    quantity: number;
    sales: number;
}

export interface PaymentMethod {
    paymentMethod: string;
    amount: number;
}

export interface ItemSale {
    itemName: string;
    quantitySold: number;
    totalSales: number;
    category: string;
    type: string;
}

// to create a new drink
export interface DrinkRequest  {
    drink_name: string;
    drink_price: number;
    active_months: string;
    drink_category_id: number;
}

//Names copied directly from database.
export interface Employee {
    employee_id: number;
    employee_name: string;
    employee_email: string;
    employee_phone: string;
    employee_position: string;
};


//The following interfaces are used to receive order data from the backend:
//ExtraID, OrderExtra, OrderItemWithExtras, Order
export interface ExtraID{
    order_item_id: number;
    extras_id: number;
}

export interface OrderExtra{
    id: ExtraID;
    extra: Extra;
}

export interface OrderItemWithExtras {
    order_item_id: number;
    order_id: number;
    drink_id: number;
    drink: Drink;
    extras: OrderExtra[];
}

export interface Order {
  orderId: number,
  customer: string,
  order_total_price: number,
  order_date: string,
  employee_id: number,
  payment_method: string,
  items: OrderItemWithExtras[],
}

//used for inventory
export interface InventoryItem {
    itemId: number;
    itemName: string;
    itemMetric: string;
    quantity: number;
}

export interface Inventory{
    items: InventoryItem[];
    outOfStockItems: InventoryItem[];
    totalItems: number;
}

export interface inventoryUsageItem {
    itemId: number;
    itemName: string;
    itemMetric: string;
    total_quantity_used: number;
}
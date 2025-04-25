import api from './api';
import { OrderSubmission, Order } from './types';

export const orderService = {
    // orders endpoints
    
    getOrders: () => {
        return api.get<Order[]>('/orders').then(res => res.data);
    },

    submitOrder: (order: OrderSubmission) => {
        return api.post<OrderSubmission>('/orders/submit', order).then(res => res.data);
    }
};
import api from './api';
import { OrderSubmission } from './types';

export const orderService = {
    // orders endpoints
    
    //getOrders: () => {
    //    return api.get<OrderSubmission[]>('/orders').then(res => res.data);
    //},

    submitOrder: (order: OrderSubmission) => {
        return api.post<OrderSubmission>('/orders', order).then(res => res.data);
    }
};
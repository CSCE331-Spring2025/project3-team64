import { OrderSubmission, Order } from "../service/types";
import { orderService } from "../service/orderService";
import { useState, useCallback } from "react";

export const useOrders = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submitOrder = async (order: OrderSubmission) => {
        setLoading(true);
        setError(null);
        try {
            await orderService.submitOrder(order);
        } catch (err) {
            setError('Failed to submit order');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        submitOrder
    };
}

export const useOrdersFetch = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchOrders = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await orderService.getOrders();
            setOrders(data);
        } catch (err) {
            setError('Failed to fetch orders');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        orders,
        loading,
        error,
        fetchOrders
    };
};
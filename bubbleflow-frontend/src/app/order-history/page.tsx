"use client";
import { useState, useEffect, ChangeEvent } from "react";
import { useOrdersFetch } from "@/app/hooks/useOrders";
import { DatePicker } from "@/components/datePicker";
import {
  OrderHistoryCard,
  OrderHistoryCardProps,
} from "@/components/orderHistoryCard";

// Order History page, manager side
export default function OrderHistory() {
  //Load order data
  const {
    orders, 
    loading, 
    error, 
    fetchOrders 
  } = useOrdersFetch();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  console.log(orders);

  const [startDate, setStartDate] = useState<Date>(new Date(1));
  const [endDate, setEndDate] = useState<Date>(new Date());
  console.log("Start date:", startDate, "End date:", endDate);
  
  const dateNow = new Date();
  dateNow.setHours(0, 0, 0, 0);

  //Filter by time and then sort by orderId
  const ordersFilterredSorted = orders
  .filter((order) => {
    const orderDate = new Date(order.order_date.split("T")[0]);
    return orderDate >= startDate && orderDate <= endDate;
  })
  .sort((a, b) => b.orderId - a.orderId)

  if(loading) { //Copied from normal return statement, but instead of displaying orders it says "Loading orders...""
    return (
      <main className="flex flex-col px-16 pb-4">
        <div className="">
          <p className=" text-xl font-semibold">Order history</p>
          <div className=" flex gap-4 mt-2">
              <div className="flex gap-2 items-center">
                <p>From</p>
                <DatePicker 
                  //value={dateNow}//first date in orders
                  onChange={(newDate) => {
                    setStartDate(newDate ? newDate : new Date());
                    console.log("Selected start date:", newDate);
                  }} 
                />
              </div>
              <div className="flex gap-2 items-center">
                <p>To</p>
                <DatePicker 
                  //value={new Date()}//now
                  onChange={(newDate) => {
                    setEndDate(newDate ? newDate : new Date());
                    console.log("Selected start date:", newDate);
                  }} 
                />
              </div>
            </div>
          <div className="mt-4 flex flex-col gap-4">
            Loading orders...
          </div>
        </div>
      </main>
    );
  }

  if(error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main className="flex flex-col px-16 pb-4">
      <div className="">
        <p className=" text-xl font-semibold">Order history</p>
        <div className=" flex gap-4 mt-2">
            <div className="flex gap-2 items-center">
              <p>From</p>
              <DatePicker 
                //value={dateNow}//first date in orders
                onChange={(newDate) => {
                  setStartDate(newDate ? newDate : new Date());
                  console.log("Selected start date:", newDate);
                }} 
              />
            </div>
            <div className="flex gap-2 items-center">
              <p>To</p>
              <DatePicker 
                //value={new Date()}//now
                onChange={(newDate) => {
                  setEndDate(newDate ? newDate : new Date());
                  console.log("Selected start date:", newDate);
                }} 
              />
            </div>
          </div>
        <div className="mt-4 flex flex-col gap-4">
          {orders
            .filter((order) => {
                const orderDate = new Date(order.order_date);
                orderDate.setHours(0, 0, 0, 0);
              return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
            })
            .sort((a, b) => b.orderId - a.orderId)
            .map((order) => (
              <OrderHistoryCard
                key={order.orderId}
                orderNumber={order.orderId}
                paymentMethod={order.payment_method}
                total={order.order_total_price.toFixed(2)}
                date={order.order_date.split("T")[0]}
                time={order.order_date.split("T")[1]}
                orderedBy={order.customer}
                items={order.items}
              />
            ))}
        </div>
      </div>
    </main>
  );
}

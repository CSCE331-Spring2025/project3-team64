"use client";
import SalesCard from "./salesCard";
interface Sales {
  id: number;
  name: string;
  type: string;
  price: string;
  revenue: string;
}
export default function SalesReport() {
  const sales: Sales[] = [
    {
      id: 1,
      name: "Classic Pearl Milk Tea",
      type: "Milk Tea",
      price: "$5.99",
      revenue: "$25023",
    },
    {
      id: 2,
      name: "Taro Milk Tea",
      type: "Milk Tea",
      price: "$6.49",
      revenue: "$21045",
    },
    {
      id: 3,
      name: "Matcha Latte",
      type: "Latte",
      price: "$4.99",
      revenue: "$18976",
    },
  ];
  return (
    <main className="flex px-2 gap-4 mt-4">
      <div className=" grid grid-cols-2 gap-2 w-full">
        {sales.map((sale) => (
          <SalesCard
            key={sale.id}
            id={sale.id}
            name={sale.name}
            type={sale.type}
            price={sale.price}
            revenue={sale.revenue}
          />
        ))}
      </div>
    </main>
  );
}

import React from 'react';
import { Badge } from './ui/badge';

interface SalesCardProps {
  id: number;
  name: string;
  type: string;
  price: string;
  revenue: string;
}

export default function SalesCard({ id, name, type, price, revenue }: SalesCardProps){
  return (
    <div className="flex border border-[#6F403A] p-4 rounded-xl w-full justify-between">
      <div className="flex flex-col gap-1">
        <p className="font-semibold">{name}</p>
        <div className="flex gap-6">
          <Badge className="bg-[#ead2a2] text-[#6F403A] font-normal px-3 rounded-3xl">
            {type}
          </Badge>
          <p className="text-sm text-gray-500">{price}</p>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-semibold text-right">{revenue}</p>
        <p className="text-sm text-gray-500 text-right">Count: {id}</p>
      </div>
    </div>
  );
};


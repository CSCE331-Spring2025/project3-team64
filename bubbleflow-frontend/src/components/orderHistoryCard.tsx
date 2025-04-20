import Image from "next/image";

export interface OrderItem {
  imageSrc: string;
  imageAlt: string;
  name: string;
  iceLevel: string;
  sugarLevel: string;
  toppings: string[];
  price: string;
}

export interface OrderHistoryCardProps {
  orderNumber: number | string;
  total: string;
  date: string;
  time: string;
  orderedBy: string;
  items: OrderItem[];
}

export function OrderHistoryCard({
  orderNumber,
  total,
  date,
  time,
  orderedBy,
  items,
}: OrderHistoryCardProps) {
  return (
    <div className="border border-[#6F403A] p-4 rounded-xl">
      <div className="flex justify-between">
        <p className="font-semibold">Order #{orderNumber}</p>
        <p className="font-semibold">Total: {total}</p>
      </div>
      <div className="flex justify-between text-sm mt-1">
        <div className="flex gap-4">
          <p>{date}</p>
          <p>{time}</p>
        </div>
        <div className="flex gap-2">
          <p>Ordered by</p>
          <p className="text-gray-500">{orderedBy}</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-2">
        {items.map((item, idx) => {
          return (
            <div key={idx} className="flex gap-6">
              <div className="bg-[#ead2a2] rounded-xl flex justify-center py-4 w-1/6">
                <div className="transition-transform duration-300 hover:scale-110">
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    width={60}
                    height={60}
                  />
                </div>
              </div>
              <div className="flex flex-1">
                <div className="flex flex-1 justify-between">
                  <div>
                    <p className="text-[#6F403A] font-semibold">{item.name}</p>
                    <div className="text-sm text-gray-400">
                      {<p>{item.iceLevel}</p>}
                      {<p>{item.sugarLevel}</p>}
                      {item.toppings.length > 0 && (
                        <p>{item.toppings.join(", ")}</p>
                      )}
                    </div>
                  </div>
                  <p className="font-semibold">{item.price}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
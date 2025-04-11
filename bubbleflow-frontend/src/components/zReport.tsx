"use client";

export default function ZReport() {
  return (
    <main className="flex px-2 gap-4">
      <div className="mt-4 w-[450px] border border-[#6F403A] p-4 rounded-xl flex flex-col gap-4">
        <div>
          <p className=" text-lg font-semibold">Sales and Taxes Summary</p>
          <hr className="border-t-2 border-[#6F403A] my-2" />
          <div className=" flex flex-col gap-1">
            <div className=" flex justify-between text-sm">
              <p>Gross Sales</p>
              <p>$16,278.50</p>
            </div>
            <div className=" flex justify-between text-sm text-gray-500">
              <p>Taxes (10%)</p>
              <p>$3255.70</p>
            </div>
          </div>
          <hr className="border-t border-[#6F403A] my-2" />
          <div className=" flex justify-between font-semibold">
            <p>Total Net Sales</p>
            <p>$13,022.80</p>
          </div>
        </div>
        <div>
          <p className=" text-lg font-semibold">Sales Categories</p>
          <div className="grid grid-cols-[1fr_auto_auto] gap-8 text-sm">
            <p>Category</p>
            <p>Quantity</p>
            <p>Sales</p>
          </div>
          <hr className="border-t-2 border-[#6F403A] my-2" />
          <div className="grid gap-1">
            {[
              ["Brewed Teas", "404", "$1,423.35"],
              ["Creama", "339", "$1,911.40"],
              ["Fresh Milk", "339", "$1,911.40"],
              ["Fruit Teas", "339", "$1,911.40"],
              ["Ice Blended", "339", "$1,911.40"],
              ["Milk Teas", "339", "$1,911.40"],
              ["Tea Mojito", "339", "$1,911.40"],
            ].map(([name, count, price], idx) => (
              <div
                key={idx}
                className="grid grid-cols-[1fr_auto_auto] gap-6 text-sm"
              >
                <p>{name}</p>
                <p>{count}</p>
                <p>{price}</p>
              </div>
            ))}
          </div>
          <hr className="border-t border-[#6F403A] my-2" />
          <div className=" flex justify-between font-semibold">
            <p>Total Payments</p>
            <p>$16,278.50</p>
          </div>
        </div>
        <div>
          <p className=" text-lg font-semibold">Payment Details</p>
          <hr className="border-t-2 border-[#6F403A] my-2" />
          <div className=" flex flex-col gap-1">
            <div className=" flex justify-between text-sm">
              <p>Apple Pay</p>
              <p>$1,423.35</p>
            </div>
            <div className=" flex justify-between text-sm">
              <p>Gift Card</p>
              <p>$1,911.40</p>
            </div>
            <div className=" flex justify-between text-sm">
              <p>Credit Card</p>
              <p>$1,911.40</p>
            </div>
          </div>
          <hr className="border-t border-[#6F403A] my-2" />
          <div className=" flex justify-between font-semibold">
            <p>Total Payments</p>
            <p>$16,278.50</p>
          </div>
        </div>
      </div>
      <div className=" flex flex-col mt-4 border border-[#6F403A] items-center text-center p-4 rounded-xl self-start">
        <p className=" text-lg font-semibold">Report Generation Details</p>
        <div className=" mt-2 flex flex-col">
          <p className=" font-semibold">Z-Report</p>
          <p className=" font-semibold">Bubbleflow</p>
          <p>789 Rue de Fleurs</p>
          <p>55555 Belgueux, France</p>
          <p>Owned by XYZ Sigma Inc.</p>
        </div>
        <div className="flex flex-col mt-2">
          <p className=" font-semibold">Generated On</p>
          <p>March 5, 2025 19:20:06</p>
        </div>
      </div>
    </main>
  );
}

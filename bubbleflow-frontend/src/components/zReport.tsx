"use client";

export default function ZReport() {
  return (
    <main className="flex flex-col px-2">
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
    </main>
  );
}
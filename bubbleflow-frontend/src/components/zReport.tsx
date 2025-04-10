"use client";

export default function ZReport() {
  return (
    <main className="flex flex-col px-2">
      <div className="mt-4 w-[450px] border border-[#6F403A] p-2 px-4">
        <div>
          <p className=" text-lg font-semibold mb-2">Sales and Taxes Summary</p>
          <div className=" flex justify-between text-sm">
            <p>Gross Sales</p>
            <p>$16,278.50</p>
          </div>
          <div className=" flex justify-between text-sm">
            <p>Taxes (10%)</p>
            <p>$3255.70</p>
          </div>
        </div>
      </div>
    </main>
  );
}
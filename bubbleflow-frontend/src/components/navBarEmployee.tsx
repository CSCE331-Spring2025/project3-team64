import Image from "next/image";
export default function NavBarEmp(){
    return (
      <div className="flex px-16 py-6 justify-between">
        <Image
          src="/bubbleflow-logo.png" 
          alt="BubbleFlow Logo"
          width={125} 
          height={125} 
        />
        <div className="flex gap-6 items-center">
            <button className="px-4 py-2  text-black rounded hover:bg-gray-200 active:bg-gray-300">
                Create Order
            </button>
            <button className="px-4 py-2 text-black rounded hover:bg-gray-200 active:bg-gray-300">
                Order History
            </button>
        </div>
      </div>
    );
}
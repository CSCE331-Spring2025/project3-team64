import Image from "next/image";
export default function NavBar(){
    return (
      <div className="flex px-16 py-6 justify-between">
        <Image
          src="/bubbleflow-logo.png" 
          alt="BubbleFlow Logo"
          width={125} 
          height={125} 
        />
      </div>
    );
}
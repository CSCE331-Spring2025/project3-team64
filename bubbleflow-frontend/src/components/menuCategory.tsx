import { RiCupLine, RiLeafLine, RiAppleLine, RiCake3Line, RiBook3Line, RiSnowflakeLine, RiGobletLine, RiDropLine } from "react-icons/ri";

interface MenuCategoryProps {
  categoryName?: string;
  itemCount: number;
}

const iconMapping: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  "Milk Teas": RiCupLine,
  "Brewed Tea": RiLeafLine,
  "Fruit Tea": RiAppleLine,
  "Fresh Milk": RiDropLine, 
  "Ice Blended": RiSnowflakeLine,
  "Tea Mojito": RiGobletLine, 
  "Creama": RiCake3Line,
  default: RiBook3Line,
};

export default function MenuCategory({
  categoryName,
  itemCount,
}: MenuCategoryProps) {
  const Icon =
    (categoryName && iconMapping[categoryName]) || iconMapping.default;

  return (
    <div className="outline outline-[#6F403A] p-4 rounded-md h-30 w-30 hover:-translate-y-2 duration-300">
      <div className="bg-[#6F403A] w-10 h-10 rounded-full flex items-center justify-center mb-2">
        <Icon className="text-white" size={20} />
      </div>
      <p className="text-sm font-semibold">{categoryName}</p>
      <p className="text-xs text-gray-500">{itemCount} Items</p>
    </div>
  );
}

import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import Link from "next/link";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"

export default function NavBar(){
    return (
      <div className="flex px-16 py-6 justify-between">
        <Image
          src="/bubbleflow-logo.png" 
          alt="BubbleFlow Logo"
          width={125} 
          height={125} 
        />
        <NavigationMenu>
          <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/employee" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Create Order
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/view-order" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                View Order
              </NavigationMenuLink>
            </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    );
}
"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { GoogleTranslate } from "@/components/GoogleTranslate";
import UserInfoButton from "@/components/userInfoButton";

export default function NavBar() {
  //const prefLangCookie = getPrefLangCookie();
  const pathname = usePathname();
  const showCustomerLinks = pathname == "/create-order" || pathname == "/view-order" ;
  const showManagerLinks = pathname == "/manage-employees" || pathname == "/edit-menu" || pathname == "/reports" ;
  return (
    <div className="flex items-center justify-between px-16 py-6">
      <div className="flex items-center gap-6">
        <Link href ="/create-order">
          <Image
            src="/bubbleflow-logo.png"
            alt="BubbleFlow Logo"
            width={125}
            height={125}
          />
        </Link>
      </div>
      {showCustomerLinks && (
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/create-order" legacyBehavior passHref>
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
      )}
      {showManagerLinks && (
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/edit-menu" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Edit Menu
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/reports" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  View Reports
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/manage-employees" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Manage Employees
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )}
      {(!showCustomerLinks && !showManagerLinks) && (
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/menu-board" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Menu Board
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )}
      <GoogleTranslate />
      <UserInfoButton />
      </div>
  );
}

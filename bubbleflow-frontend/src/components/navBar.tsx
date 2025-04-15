"use client";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import React from "react";
import { GoogleTranslate } from "@/components/GoogleTranslate";
import UserInfoButton from "@/components/userInfoButton";
const managerRoutes: { title: string; href: string; description: string }[] = [
  {
    title: "View Order History",
    href: "/order-history",
    description: "View past orders and track order performance.",
  },
  {
    title: "View Inventory",
    href: "/view-inventory",
    description: "Check current inventory levels and update stock information.",
  },
  {
    title: "View Reports",
    href: "/reports",
    description: "Access detailed sales and performance reports.",
  },
];
export default function NavBar() {
  //const prefLangCookie = getPrefLangCookie();
  const pathname = usePathname();
  const showCustomerLinks =
    pathname == "/create-order" || pathname == "/view-order";
  const showManagerLinks =
    pathname == "/manage-employees" ||
    pathname == "/edit-menu" ||
    pathname == "/reports" ||
    pathname == "/view-inventory" ||
    pathname == "/order-history";
  return (
    <div className="flex items-center justify-between px-16 py-4">
      <div className="flex items-center gap-6">
        <Link href="/select-role">
          <Image
            src="/bubbleflow-logo.png"
            alt="BubbleFlow Logo"
            width={125}
            height={125}
          />
        </Link>
      </div>
      <div className=" flex gap-6 items-center">
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
                <Link href="/manage-employees" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Manage Employees
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Analytics</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-2 w-fit min-w-max">
                    {managerRoutes.map((route) => (
                      <ListItem
                        key={route.title}
                        title={route.title}
                        href={route.href}
                      >
                        {route.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        )}
        {!showCustomerLinks && !showManagerLinks && (
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
        <UserInfoButton />
        <div className=" hidden">
          <GoogleTranslate />
        </div>
      </div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

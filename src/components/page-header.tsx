import "server-only";
import Link from "next/link";
import { getCurrentUser } from "@/data/server/user";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import AccountNavDropdown from "./account-nav";

export async function PageHeader() {
  const data = await getCurrentUser();
  
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="flex items-center justify-between h-16 px-6">
        <Link href="/" className="font-bold text-lg">
          SKYWAY
        </Link>
        {!data && (
          <Link href="/login">
            <Button className="cursor-pointer">LOG IN</Button>
          </Link>
        )}
        {data && (
          <NavigationMenu className="z-0">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/dashboard/search" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Book Flights
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/dashboard/profile" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  My Profile
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/dashboard/my-bookings" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  My bookings
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        )}
        {data && (
        <div>
            <span className="mr-2">Hey {data?.user_metadata?.first_name}</span>
            <AccountNavDropdown firstName={data?.user_metadata?.first_name}/>
          </div>
        )}
      </div>
    </header>
  );
}

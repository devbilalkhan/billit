import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

import Link from "next/link";
import { CreditCard, DoorClosed, Home, Settings } from "lucide-react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";

export const sidebarLinks = [
  {
    id: "1",
    label: "Home",
    href: "/dashboard",
    icon: Home,
  },
  {
    id: "2",
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    id: "3",
    label: "Billing",
    href: "/dashboard/billing",
    icon: CreditCard,
  },
];
type UserNavProps = {
  // Define your props here
  name: string;
  email: string;
  image: string;
};

function UserNav({ name, email, image }: UserNavProps) {
  return (
    <section>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="w-10 h-10 rounded-full">
              <AvatarImage src={image} alt="profile photo" />
              <AvatarFallback>Bk</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <div className="flex flex-col space-y-2 p-2">
            <p className="text-sm font-medium leading-none">{name}</p>
            <p className="text-xs font-medium leading-none text-muted-foreground">
              {email}
            </p>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {sidebarLinks.map((item) => (
              <DropdownMenuItem
                asChild
                key={item.id}
                className="group cursor-pointer hover:text-accent-foreground hover:bg-accent rounded-md"
              >
                <Link
                  className="flex items-center justify-between"
                  href={item.href}
                >
                  <p>{item.label}</p>
                  <item.icon className="h-5 w-5 text-primary" />
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            asChild
            className="group cursor-pointer hover:text-accent-foreground hover:bg-accent rounded-md"
          >
            <div className="flex justify-between items-center ">
              <LogoutLink>Logout</LogoutLink>
              <DoorClosed className="h-5 w-5 text-primary" />
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  );
}

export default UserNav;

"use client";
import { cn } from "@/lib/utils";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "./user-nav";

type SidebarProps = {
  // Define your props here
};

function Sidebar({}: SidebarProps) {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <section>
      <nav className="grid items-start gap-4 ">
        {sidebarLinks.map((link) => (
          <Link href={link.href} key={link.id}>
            <div
              className={cn(
                "group flex items-center bg-transparent rounded-md px-3 py-2 hover:text-accent-foreground hover:bg-accent font-medium",
                {
                  "bg-accent border-r-[4px] border-primary":
                    pathname === link.href,
                }
              )}
            >
              <link.icon className="mr-2 h-4 w-4 text-primary" />
              <span className="text-md">{link.label}</span>
            </div>
          </Link>
        ))}
      </nav>
    </section>
  );
}

export default Sidebar;

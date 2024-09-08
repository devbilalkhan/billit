"use client";
import { ModeToggle } from "@/components/mode-toggle";

import Link from "next/link";

import UserNav from "./user-nav";
import AuthButton from "./auth-button";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";

type NavbarProps = {
  accessGranted: boolean;
  user: KindeUser<Record<string, unknown>>;
};

export function Navbar({ accessGranted, user }: NavbarProps) {
  return (
    <header className="flex items-center bg-background h-[10vh] border-b dark:border-slate-900 px-10">
      <nav className="container  flex items-center justify-between mx-auto px-10">
        <div>
          <Link href="/">
            <h1 className="text-3xl font-bold ">
              En
              <span className="text-primary">voice.</span>
            </h1>
          </Link>
        </div>
        <div className="flex items-center-justify-between gap-x-3">
          <ModeToggle />
          <div className="flex items-center gap-x-5">
            {!accessGranted && <AuthButton />}
          </div>
          {accessGranted ? (
            <UserNav
              name={user.given_name as string}
              email={user.email as string}
              image={user.picture as string}
            />
          ) : (
            ""
          )}
        </div>
      </nav>
    </header>
  );
}

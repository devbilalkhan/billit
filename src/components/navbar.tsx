import { ModeToggle } from "@/components/mode-toggle";

import Link from "next/link";
import AuthButton from "./auth-button";

type NavbarProps = {
  isLoggedIn: boolean;
};

export function Navbar({ isLoggedIn }: NavbarProps) {
  return (
    <header className="flex items-center bg-background h-[10vh] border-b dark:border-slate-900">
      <nav className="container  flex items-center justify-between mx-auto px-10">
        <div>
          <Link href="/">
            <h1 className="text-3xl font-bold">Envoice</h1>
          </Link>
        </div>
        <div className="flex items-center-justify-between gap-x-5">
          <ModeToggle />
          <div className="flex items-center gap-x-5">
            <AuthButton isLoggedIn={isLoggedIn} />
          </div>
        </div>
      </nav>
    </header>
  );
}

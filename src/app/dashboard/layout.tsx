import Sidebar from "@/components/sidebar";
import { serverSideAuth } from "@/lib/server-utils";
import { redirect } from "next/navigation";
import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

async function Layout({ children }: LayoutProps) {
  const [accessGranted] = await serverSideAuth();
  if (!accessGranted) {
    return redirect("/");
  }
  return (
    <div className="flex flex-col space-y-6 mt-10">
      <div className="container  flex-1 grid md:grid-cols-[250px_1fr]">
        <aside className="hidden w-[250px] flex-col md:flex">
          <Sidebar />
        </aside>
        <main className="">{children}</main>
      </div>
    </div>
  );
}

export default Layout;

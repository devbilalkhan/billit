import Sidebar from "@/components/sidebar";
import prisma from "@/lib/db";
import { serverSideAuth } from "@/lib/server-utils";
import { redirect } from "next/navigation";
import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

async function getData({
  email,
  id,
  firstName,
  lastName,
  profileImage,
}: {
  email: string;
  id: string;
  firstName: string | undefined | null;
  lastName: string | undefined | null;
  profileImage: string | undefined | null;
}) {
  const name = `${firstName ?? "1"} ${lastName ?? ""}`;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        stripCustomerId: true,
      },
    });

    if (!user) {
      const user = await prisma.user.create({
        data: {
          id: id,
          email: email,
          name: name,
        },
      });
      return {
        success: true,
        data: user,
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
}

async function Layout({ children }: LayoutProps) {
  const [accessGranted] = await serverSideAuth();
  if (!accessGranted) {
    return redirect("/");
  }

  return (
    <div className="flex flex-col space-y-6 h-[calc(100vh-10vh)]">
      <div className="container  flex-1 grid md:grid-cols-[250px_1fr]">
        <aside className="hidden w-[250px] flex-col md:flex  h-full">
          <Sidebar />
        </aside>
        <main className="px-10">{children}</main>
      </div>
    </div>
  );
}

export default Layout;

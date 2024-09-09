import Sidebar from "@/components/sidebar";
import prisma from "@/lib/db";
import { serverSideAuth } from "@/lib/server-utils";
import { redirect } from "next/navigation";
import React from "react";
import { stripe } from "../api/stripe";

type LayoutProps = {
  children: React.ReactNode;
};

export async function getData({
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
  "use server";
  const name = `${firstName ?? "1"} ${lastName ?? ""}`;
  try {
    let user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        stripCustomerId: true,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          id: id,
          email: email,
          name: name,
        },
      });
    }
    if (!user.stripCustomerId) {
      const data = await stripe.customers.create({
        email: email,
      });
      await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          stripCustomerId: data.id,
        },
      });
    }

    return {
      success: true,
      data: user,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
}

async function Layout({ children }: LayoutProps) {
  const [accessGranted, user] = await serverSideAuth();
  if (!accessGranted) {
    return redirect("/");
  }
  await getData({
    email: user.email as string,
    id: user.id,
    firstName: user.given_name,
    lastName: user.family_name,
    profileImage: user.picture,
  });

  return (
    <div className="flex flex-col space-y-6 h-[calc(100vh-10vh)]">
      <div className="container  flex-1 grid md:grid-cols-[250px_1fr]">
        <aside className="hidden w-[250px] flex-col md:flex  h-full py-5">
          <Sidebar />
        </aside>
        <main className="px-10 py-5">{children}</main>
      </div>
    </div>
  );
}

export default Layout;

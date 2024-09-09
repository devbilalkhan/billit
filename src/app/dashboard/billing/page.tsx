import { getStripeSession } from "@/app/api/stripe";
import { LoadingButton } from "@/components/submit-button";

import { Card, CardContent } from "@/components/ui/card";
import prisma from "@/lib/db";
import { serverSideAuth } from "@/lib/server-utils";
import { UserSchema } from "@/validations/validations";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import { CheckCircle2 } from "lucide-react";
import { redirect } from "next/navigation";

const featureItems = [
  { name: "Lorem Ipsum something" },
  { name: "Lorem Ipsum something" },
  { name: "Lorem Ipsum something" },
  { name: "Lorem Ipsum something" },
  { name: "Lorem Ipsum something" },
  { name: "Lorem Ipsum something" },
];

async function getData(id: KindeUser<string>["id"]) {
  "use server";
  const validatedId = UserSchema.pick({ id: true }).safeParse({ id });

  if (!validatedId.success) {
    return {
      success: false,
      message: "User ID is required.",
    };
  }

  try {
    const data = await prisma.subscription.findUnique({
      where: {
        userId: id,
      },
      select: {
        status: true,
        user: {
          select: {
            stripCustomerId: true,
          },
        },
      },
    });

    if (!data) {
      return {
        success: false,
        message: "Subscription not found.",
      };
    }

    return {
      success: true,
      data: data,
      message: "Data retrieved successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while retrieving the data.",
      error: error,
    };
  }
}
type PageProps = {
  // Define your props here
};

async function Page({}: PageProps) {
  const [, user] = await serverSideAuth();
  const response = await getData(user.id);

  async function createSubscription() {
    "use server";
    try {
      const response = await prisma.user.findUnique({
        where: {
          id: user.id, 
        },
        select: {
          stripCustomerId: true
        }
      })
    } catch (error) {
      
    }
    if (!response.data?.user.stripCustomerId) {
      throw new Error("Unable to create subscription");
    }

    const subscriptionUrl = await getStripeSession({
      customerId: response.data?.user.stripCustomerId,
      domainUrl: "https://localhost:3000",
      priceId: process.env.STRIPE_PRICE_ID as string,
    });
    return redirect(subscriptionUrl);
  }

  return (
    <>
      <div className="max-w-md mx-auto space-y-4">
        <Card className="flex flex-col">
          <CardContent className="py-8">
            <div>
              <h3 className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-primary/10 text-primary">
                Monthly
              </h3>
            </div>
            <div className="mt-4 flex items-baseline text-5xl font-bold">
              $30{" "}
              <span className="ml-1 text-2xl text-muted-foreground"> /mo</span>
            </div>
            <p className="mt-5 text-lg text-muted-foreground">
              Generate unlimited invoices in a month
            </p>
          </CardContent>
          <div className="flex-1 flex flex-col justify-between px-6 pt-6 pb-8 bg-secondary rounded-lg m-1 space-y-6 sm:p-10 sm:pt-6">
            <ul className="space-y-4">
              {featureItems.map((feature, idx) => (
                <li key={idx} className="flex items-center">
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  </div>
                  <p className="ml-3 text-base text-muted-foreground">
                    {feature.name}
                  </p>
                </li>
              ))}
            </ul>
            <form className="w-full mt-2" action={createSubscription}>
              <LoadingButton className="w-full">Buy now</LoadingButton>
            </form>
          </div>
        </Card>
      </div>
    </>
  );
}

export default Page;

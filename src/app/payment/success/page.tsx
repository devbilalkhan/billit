import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// Updated import statement
import Link from "next/link";
import GreenTick from "@/components/green-tick";

export default function StripeSuccessCard() {
  return (
    <div className="flex items-center justify-center p-4 min-h-[80vh] bg-muted">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Payment Successful
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6">
          <div className="w-24 h-24">
            <GreenTick />
          </div>
          <p className="text-center text-muted-foreground">
            Thank you for your purchase! Your payment has been processed
            successfully.
          </p>
          <div className=" p-4 rounded-lg w-full bg-muted text-muted-foreground">
            <p className="text-sm  mb-2">Transaction Details:</p>
            <p className="text-sm ">Order ID: #123456</p>
            <p className="text-sm ">Amount: $99.99</p>
            <p className="text-sm ">Date: {new Date().toLocaleDateString()}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Button asChild variant="outline">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
          <Button asChild>
            <Link href="/orders">View Orders</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

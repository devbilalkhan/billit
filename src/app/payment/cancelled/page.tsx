import FailIcon from "@/components/fail-icon";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

type CancelProps = {
  // Define your props here
};

function Cancel({}: CancelProps) {
  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center">
      <Card>
        <div className="w-[350px]">
          <div className="p-6">
            <div className="w-full flex justify-center">
              <FailIcon />
            </div>
            <div className="mt-3 text-center sm:mt-5 w-full">
              <h3 className="text-lg leading-6 font-medium ">Payment Failed</h3>
              <div className="mt-2">
                <p className="text-sm text-muted-foreground">
                  No worries, you wont be charged.
                  <br /> Please try again!
                </p>
              </div>
              <div className="mt-5 sm:mt-6 w-full">
                <Button asChild className="w-full">
                  <Link href="/dashboard">Go back to dashboard </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Cancel;

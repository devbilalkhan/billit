import { Button } from "@/components/ui/button";
import { serverSideAuth } from "@/lib/server-utils";
import { redirect } from "next/navigation";

export default async function Home() {
  const [accessGranted] = await serverSideAuth();
  if (accessGranted) {
    return redirect("/dashboard");
  }
  return (
    <section className="flex items-center justify-center bg-background h-[90vh]">
      <Hero />
    </section>
  );
}

// React and Next.js imports
import Link from "next/link";

// Third-party library imports
import Balancer from "react-wrap-balancer";
import { Camera } from "lucide-react";

// Local component imports

const Hero = () => {
  return (
    <section className="py-8 md:py-12">
      <div className="flex flex-col items-center text-center">
        {/* <Image
          src=""
          width={172}
          height={72}
          alt="Company Logo"
          className="not-prose mb-6 dark:invert md:mb-8"
        /> */}
        <h1 className="!mb-0">
          <Balancer>
            <p className="text-7xl font-bold mb- text-accent">
              <span className="text-primary">En</span>
              voice
              <span className="text-primary">.</span>
            </p>
          </Balancer>
        </h1>
        <h3 className="text-muted-foreground">
          <Balancer>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </Balancer>
        </h3>
        <div className="not-prose mt-6 flex gap-2 md:mt-12">
          <Button asChild>
            <Link href="/">
              <Camera className="mr-2" />
              Lorem Ipsum
            </Link>
          </Button>
          <Button variant={"ghost"} asChild>
            <Link href="/posts">Dolor Sit Amet -{">"}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

import { getUserData } from "@/actions/actions";
import { LoadingButton } from "@/components/submit-button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import prisma from "@/lib/db";
import { serverSideAuth } from "@/lib/server-utils";
import { sleep } from "@/lib/utils";
import { UserSchema } from "@/validations/validations";
import { revalidatePath } from "next/cache";

const themeOptions = [
  { id: 1, value: "theme-green", label: "Green" },
  { id: 2, value: "theme-blue", label: "Blue" },
  { id: 3, value: "theme-violet", label: "Violet" },
  { id: 4, value: "theme-yellow", label: "Yellow" },
  { id: 5, value: "theme-orange", label: "Orange" },
  { id: 6, value: "theme-red", label: "Red" },
  { id: 8, value: "theme-rose", label: "Rose" },
  { id: 9, value: "theme-slate", label: "Slate" },
  { id: 10, value: "theme-stone", label: "Stone" },
  { id: 11, value: "theme-neutral", label: "Neutral" },
  { id: 12, value: "theme-gray", label: "Gray" },
];

async function Page() {
  const [, user] = await serverSideAuth();
  const { data } = await getUserData(user.id);

  async function postData(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const colorScheme = formData.get("color") as string;
    const validatedData = UserSchema.pick({
      name: true,
      colorScheme: true,
    }).safeParse({
      name,
      colorScheme,
    });

    if (!validatedData.success) {
      return {
        success: false,
        error: validatedData.error,
      };
    }
    try {
      await sleep();
      const updatedData = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          name: name,
          colorScheme: colorScheme,
        },
      });
      return {
        success: true,
        data: updatedData,
      };
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    } finally {
      revalidatePath("/", "layout");
    }
  }

  return (
    <section className="grid items-start gap-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-3xl md:text-4xl">Settings</h1>
          <p className="text-lg text-muted-foreground">Your Profile settings</p>
        </div>
      </div>
      <Card>
        <form action={postData}>
          <CardHeader>
            <CardTitle>General Data</CardTitle>
            <CardDescription>
              Please provide general information about yourself.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  name="name"
                  id="name"
                  type="text"
                  placeholder="Your name"
                  defaultValue={data?.name ?? ""}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>

                <Input
                  name="email"
                  id="email"
                  type="email"
                  defaultValue={data?.email ?? ""}
                  placeholder="Your email"
                  disabled
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Color Scheme</Label>
                <Select name="color" defaultValue={data?.colorScheme}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Color</SelectLabel>
                      {themeOptions.map((select) => (
                        <SelectItem key={select.id} value={select.value}>
                          {select.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <LoadingButton type="submit">Save now</LoadingButton>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
}

export default Page;

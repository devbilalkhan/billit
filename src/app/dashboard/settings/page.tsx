import {
  Card,
  CardContent,
  CardDescription,
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

type PageProps = {
  // Define your props here
};

function Page({}: PageProps) {
  return (
    <section className="grid items-start gap-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-3xl md:text-4xl">Settings</h1>
          <p className="text-lg text-muted-foreground">Your Profile settings</p>
        </div>
      </div>
      <Card>
        <form>
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
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Your Name</Label>
                <Input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="Your email"
                  disabled
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Color Scheme</Label>
                <Select name="color">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Color</SelectLabel>
                      <SelectItem value="green-theme">Green</SelectItem>
                      <SelectItem value="blue-theme">Blue</SelectItem>
                      <SelectItem value="violet-theme">Violet</SelectItem>
                      <SelectItem value="yellow-theme">Yellow</SelectItem>
                      <SelectItem value="orange-theme">Orange</SelectItem>
                      <SelectItem value="Red-theme">Red</SelectItem>
                      <SelectItem value="Rose-theme">Rose</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </form>
      </Card>
    </section>
  );
}

export default Page;

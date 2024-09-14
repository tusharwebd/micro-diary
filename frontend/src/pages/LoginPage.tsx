import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import httpClient from "../httpClient";

function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const logInUser = async () => {
    console.log(email, password);
    const resp = await httpClient.post("//localhost:5000/login", {
      email,
      password,
    });
    console.log(resp.data);
    window.location.href = "/diary";
  };

  const registerUser = async () => {
    console.log(email, password);
    const resp = await httpClient.post("//localhost:5000/register", {
      email,
      password,
    });
    console.log(resp.data);
    window.location.reload();
  };

  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-stone-500">
      <div className="grid w-full max-w-5xl grid-cols-3 rounded-xl bg-card shadow-xl">
        <div className="col-span-2 hidden rounded-l-xl bg-muted lg:block">
          <img
            src="./diary.webp"
            width={800}
            height={600}
            alt="Diary"
            className="h-full w-full object-cover object-center"
            style={{ aspectRatio: "800/600", objectFit: "cover" }}
          />
        </div>
        <div className="col-span-1 flex flex-col items-center justify-center gap-8 p-8 lg:p-12">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button className="w-full" onClick={() => logInUser()}>
                  Login
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="register">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" required />
                </div>
                <Button className="w-full" onClick={() => registerUser()}>
                  Register
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

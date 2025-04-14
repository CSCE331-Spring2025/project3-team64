"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Home() {
const router = useRouter();

  const handleLogin = () => {
    // Perform login logic here
    // After successful login, navigate to the dashboard
    // (it just makes the button switch pages for rn)
    router.push("/select-role");
  };

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/select-role" });
  };

  return (
    <main className="flex flex-col items-center  px-16">
      <div className="mt-16 flex flex-col items-center">
        <p className=" text-3xl font-bold mb-8 text-center">Login to Your Account</p>
        <div className=" flex flex-col gap-4 w-96">
          <div>
            <Label className=" mb-2">Email</Label>
            <Input placeholder="Email" />
          </div>
          <div>
            <Label className=" mb-2">Password</Label>
            <Input placeholder="Password" />
          </div>
        </div>
        <div className=" mt-8 flex gap-6 w-96">
          <Button className=" bg-[#6F403A] flex-1 hover:bg-[#4E2D26]" onClick={handleLogin}>Login</Button>
          <Button className=" bg-[#6F403A] flex-1 hover:bg-[#4E2D26]" onClick={handleGoogleLogin}>Login with Google</Button>
        </div>
      </div>
    </main>
  );
}
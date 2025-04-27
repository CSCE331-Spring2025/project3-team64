"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";


export default function Home() {
const router = useRouter();
const searchParams = useSearchParams();
const error = searchParams.get("error");

  const handleLogin = async () => {
    // the illusion,,,, of choice....
    const result = await signIn("google", { callbackUrl: "/select-role", redirect: false });
    if(result?.error){
      console.error("google login error", result.error);
    } else {
      router.push("/select-role");
    }
  };

  const handleGoogleLogin = async () => {
    const result = await signIn("google", { callbackUrl: "/select-role", redirect: false });
    if(result?.error){
      console.error("google login error", result.error);
    } else {
      router.push("/select-role");
    }
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
          <Button className=" bg-primary flex-1 hover:bg-muted" onClick={handleLogin}>Login</Button>
          <Button className=" bg-primary flex-1 hover:bg-muted" onClick={handleGoogleLogin}>Login with Google</Button>
        </div>
        {error === "AccessDenied" && (
          <p className="mt-4 text-red-600 font-semibold">
            Access Denied: Please use your organization account
          </p>
        )}
      </div>
    </main>
  );
}
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex items-center justify-center">
      <div className="w-96">
        <p className=" text-3xl font-bold mb-6 text-center">Login to Your Account</p>
        <div className=" flex flex-col gap-4">
          <div>
            <Label className=" mb-2">Employee ID</Label>
            <Input placeholder="Employee ID" />
          </div>
          <div>
            <Label className=" mb-2">Password</Label>
            <Input placeholder="Password" />
          </div>
        </div>
        <div className=" mt-8 flex gap-6">
          <Button className=" bg-[#6F403A] flex-1">Login</Button>
          <Button className=" bg-[#6F403A] flex-1">Login with Google</Button>
        </div>
      </div>
    </main>
  );
}

"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { GoogleTranslate } from "./GoogleTranslate";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  RiUserLine,
  RiLogoutBoxLine,
  RiLoginBoxLine,
  RiSettingsLine,
} from "react-icons/ri";

export default function UserInfoButton() {
  const { data: session } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="relative w-12 h-12 rounded-full overflow-hidden cursor-pointer">
          {session?.user?.image ? (
            <Image
              src={session.user.image}
              alt={`${session.user.name}'s profile picture`}
              fill
              style={{ objectFit: "cover" }}
              className="cursor-pointer"
            />
          ) : (
            <div className="w-full h-full bg-gray-400 flex items-center justify-center">
              <RiUserLine className="text-white w-6 h-6" />
            </div>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end">
        {session?.user ? (
          <>
            <DropdownMenuItem
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center justify-center gap-2"
            >
              <RiLogoutBoxLine className="w-5 h-5" />
              Sign Out
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        ) : (
          <>
            <DropdownMenuItem
              onClick={() => signIn("google", { callbackUrl: "/select-role" })}
              className="flex items-center justify-center gap-2"
            >
              <RiLoginBoxLine className="w-5 h-5" />
              Sign In
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem
          className="flex items-center justify-center gap-2"
          onSelect={(e) => e.preventDefault()}
        >
          <Dialog>
            <DialogTrigger className="flex items-center justify-center gap-2">
              <RiSettingsLine className="w-5 h-5" />
              <span>Settings</span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Settings</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-8 py-4">
              <div className="items-center gap-4">
                <Label className="mb-2">Language</Label>
                <GoogleTranslate/>
              </div>
              <div className="items-center gap-4">
                <Label className="mb-2">Contrast</Label>
                <Input placeholder="None" />
              </div>
            </div>
            <Button type="submit" className=" bg-[#6F403A] hover:bg-[#4E2D26]" onClick={() => window.location.reload()}>
              Apply Settings
            </Button>
          </DialogContent>
          </Dialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

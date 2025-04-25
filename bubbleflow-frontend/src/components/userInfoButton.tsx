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
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import {
  RiUserLine,
  RiLogoutBoxLine,
  RiLoginBoxLine,
  RiSettingsLine,
  RiZoomInLine,
} from "react-icons/ri";
import { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";

export default function UserInfoButton() {
  const { data: session } = useSession();

  const [highContrast, setHighContrast] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [zoomEnabled, setZoomEnabled] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    initializeSettings();
  }, []);

  const initializeSettings = () => {
    // Load high contrast setting
    const storedContrast = localStorage.getItem("high-contrast");
    const contrastEnabled = storedContrast === "true";
    setHighContrast(contrastEnabled);
    document.documentElement.classList.toggle("high-contrast", contrastEnabled);
    
    // Load zoom settings
    const storedZoom = localStorage.getItem("zoom-level");
    const storedZoomEnabled = localStorage.getItem("zoom-enabled");
    
    if(storedZoom){
      const parsedZoom = parseInt(storedZoom);
      setZoomLevel(parsedZoom);
    }
    
    if (storedZoomEnabled === "true") {
      setZoomEnabled(true);
      
      // apply the zoom if it's enabled
      const level = storedZoom ? parseInt(storedZoom) : 100;
      applyZoom(level);
    }
  };

  const toggleHighContrast = (value: boolean) => {
    setHighContrast(value);
    localStorage.setItem("high-contrast", value.toString());
    document.documentElement.classList.toggle("high-contrast", value);
  };

  const handleZoomChange = (value: number[]) => {
    const newZoom = value[0];
    setZoomLevel(newZoom);
  };

  const applyZoom = (level: number) => {
    document.documentElement.setAttribute('data-zoom-level', level.toString());
    
    document.documentElement.classList.toggle("zoomed", level !== 100);
    
    document.documentElement.style.setProperty('--zoom-scale', (level / 100).toString());
    
    const zoomStyleId = 'zoom-style';
    let zoomStyle = document.getElementById(zoomStyleId);
    
    if(!zoomStyle){
      zoomStyle = document.createElement('style');
      zoomStyle.id = zoomStyleId;
      document.head.appendChild(zoomStyle);
    }

    zoomStyle.innerHTML = `
      html {
        font-size: ${level}%;
      }
      
      .zoomed .dropdown-content,
      .zoomed .dialog-content {
        transform: scale(1) !important;
        transform-origin: top right;
        position: fixed;
      }
    `;
    
    localStorage.setItem("zoom-level", level.toString());
  };

  const handleApplySettings = () => {
    localStorage.setItem("zoom-level", zoomLevel.toString());
    
    const shouldEnableZoom = zoomLevel !== 100;
    setZoomEnabled(shouldEnableZoom);
    localStorage.setItem("zoom-enabled", shouldEnableZoom.toString());
    
    if(shouldEnableZoom){
      applyZoom(zoomLevel);
    }
    else{
      applyZoom(100);
    }
    
    setDialogOpen(false);
  };

  return (
    <div className="relative">
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
        <DropdownMenuContent 
          side="bottom" 
          align="start" 
          className="dropdown-content" 
          style={{ zIndex: 9999 }}
          sideOffset={5}
        >
          {session?.user ? (
            <>
              <DropdownMenuItem
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center justify-center gap-2"
              >
                <RiLogoutBoxLine className="w-5 h-5 text-gray-400" />
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
                <RiLoginBoxLine className="w-5 h-5 text-gray-400" />
                Sign In
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem
            className="flex items-center justify-center gap-2"
            onSelect={(e) => e.preventDefault()}
          >
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <div className="flex items-center justify-center gap-2 w-full cursor-pointer">
                  <RiSettingsLine className="w-5 h-5 text-gray-400" />
                  <span>Settings</span>
                </div>
              </DialogTrigger>
              <DialogContent 
                className="dialog-content" 
                style={{ zIndex: 9999 }}
              >
                <DialogHeader>
                  <DialogTitle>Settings</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-8 py-4">
                  <div className="items-center gap-4">
                    <Label className="mb-2">Language</Label>
                    <GoogleTranslate />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="zoom-setting" className="flex items-center gap-2">
                        <RiZoomInLine className="w-5 h-5" />
                        Zoom
                      </Label>
                      <Switch
                        id="zoom-setting"
                        checked={zoomEnabled || zoomLevel !== 100}
                        onCheckedChange={(checked) => {
                          setZoomEnabled(checked);
                          if (!checked) setZoomLevel(100);
                        }}
                      />
                    </div>
                    
                    <div className="bg-secondary rounded p-2 flex flex-col gap-2">
                      <Slider
                        id="zoom-slider"
                        defaultValue={[zoomLevel]}
                        value={[zoomLevel]}
                        min={50}
                        max={150}
                        step={10}
                        disabled={!zoomEnabled && zoomLevel === 100}
                        onValueChange={handleZoomChange}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-xs text-secondary-foreground">
                        <span className="font-medium text-primary">{zoomLevel}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="contrast-toggle">High Contrast Mode</Label>
                    <Switch
                      id="contrast-toggle"
                      checked={highContrast}
                      onCheckedChange={toggleHighContrast}
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="bg-primary hover:bg-muted"
                  onClick={handleApplySettings}
                >
                  Apply Settings
                </Button>
              </DialogContent>
            </Dialog>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
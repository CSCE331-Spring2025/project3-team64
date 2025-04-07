import React from "react";
import { RiPencilLine, RiDeleteBin5Line } from "react-icons/ri";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface EmployeeCardProps {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}

export default function EmployeeCard({
  id,
  name,
  email,
  phone,
  role,
}: EmployeeCardProps) {
  function handleEdit(): void {
    console.log("Editing employee with id:", id);
  }

  function handleDelete(): void {
    console.log("Deleting employee with id:", id);
  }
  const categoryOptions = ["Employee", "Manager"];

  return (
    <div className="flex justify-between border p-4 border-[#6F403A] rounded-xl">
      <div>
        <p className="font-semibold">{name}</p>
        <div className="flex gap-4 text-sm text-gray-400">
          <p>{email}</p>
          <p>{phone}</p>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <div className="flex flex-col text-right">
          <p className="font-semibold">{role}</p>
          <div className="text-sm text-gray-400">
            <p>ID: {id}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger>
              <div
                onClick={handleEdit}
                className="bg-[#6F403A] w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#4E2D26] cursor-pointer hover:-translate-y-1 duration-300"
              >
                <RiPencilLine className="text-white" size={20} />
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Employee</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-8 py-4">
                <div className="items-center gap-4">
                  <Label className="mb-2">Name</Label>
                  <Input placeholder="Name" />
                </div>
                <div className="items-center gap-4">
                  <Label className="mb-2">Email</Label>
                  <Input placeholder="Email" />
                </div>
                <div className="items-center gap-4">
                  <Label className="mb-2">Phone Number</Label>
                  <Input placeholder="Phone Number" />
                </div>
                <div className="items-center gap-4">
                  <Label className="mb-2">Position</Label>
                  <Select>
                    <SelectTrigger className=" w-full">
                      <SelectValue placeholder="Select a Position" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((option, idx) => (
                        <SelectItem key={idx} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button
                type="submit"
                className=" bg-[#6F403A] hover:bg-[#4E2D26]"
              >
                Edit Employee
              </Button>
            </DialogContent>
          </Dialog>
          <div
            onClick={handleDelete}
            className="bg-[#6F403A] w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#4E2D26] cursor-pointer hover:-translate-y-1 duration-300"
          >
            <RiDeleteBin5Line className="text-white" size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}
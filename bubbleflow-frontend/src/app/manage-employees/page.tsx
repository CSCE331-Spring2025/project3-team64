"use client";
import { Input } from "@/components/ui/input";
import EmployeeCard from "@/components/employeeCard";
import { RiSearchLine, RiAddLine } from "react-icons/ri";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
export default function ManageEmployees() {
  const employees = [
    {
      id: "123456789",
      name: "Sophia Phu",
      email: "sophiatiffphu@gmail.com",
      phone: "(832) 886 7189",
      role: "Employee",
    },
    {
      id: "987654321",
      name: "Ur Mom",
      email: "urmomsigma69@ligma.com",
      phone: "(555) 123 4567",
      role: "Manager",
    },
    {
      id: "987654321",
      name: "Ur Mom",
      email: "urmomsigma69@ligma.com",
      phone: "(555) 123 4567",
      role: "Manager",
    },
    {
      id: "987654321",
      name: "Ur Mom",
      email: "urmomsigma69@ligma.com",
      phone: "(555) 123 4567",
      role: "Manager",
    },
    {
      id: "987654321",
      name: "Ur Mom",
      email: "urmomsigma69@ligma.com",
      phone: "(555) 123 4567",
      role: "Manager",
    },
    {
      id: "987654321",
      name: "Ur Mom",
      email: "urmomsigma69@ligma.com",
      phone: "(555) 123 4567",
      role: "Manager",
    },
    {
      id: "987654321",
      name: "Ur Mom",
      email: "urmomsigma69@ligma.com",
      phone: "(555) 123 4567",
      role: "Manager",
    },
    {
      id: "987654321",
      name: "Ur Mom",
      email: "urmomsigma69@ligma.com",
      phone: "(555) 123 4567",
      role: "Manager",
    },
    {
      id: "987654321",
      name: "Ur Mom",
      email: "urmomsigma69@ligma.com",
      phone: "(555) 123 4567",
      role: "Manager",
    },
  ];
  const categoryOptions = ["Employee", "Manager"];
  return (
    <main className="flex flex-col px-16 pb-4 ">
      <div className="flex items-center justify-between -mt-4">
        <p className=" text-xl font-semibold">Employee List</p>
        <div className=" flex items-center gap-2">
          <div className="mt-2 relative w-80">
            <Input
              className="border-[#6F403A] h-10 rounded-3xl pr-12"
              placeholder="Search for an Employee"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[#6F403A] w-7 h-7 rounded-full flex items-center justify-center">
              <RiSearchLine className="text-white" size={15} />
            </div>
          </div>
          <Dialog>
            <DialogTrigger>
              <div className="bg-[#6F403A] w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#4E2D26] mt-2">
                <RiAddLine className="text-white" size={18} />
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Employee</DialogTitle>
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
                Add Employee
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className=" mt-4 flex flex-col gap-2">
        {employees.map((employee) => (
          <EmployeeCard key={employee.id} {...employee} />
        ))}
      </div>
    </main>
  );
}

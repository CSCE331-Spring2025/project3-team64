"use client";
import { useState, useEffect, ChangeEvent } from "react";
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

import { useEmployees, useDeleteEmployee } from "../hooks/useEmployees";
import { Employee } from "@/app/service/types";

export default function ManageEmployees() {

  const {
    employees: employeesData,
    loading: employeesLoading,
    error: employeesError,
    fetchEmployees
  } = useEmployees();

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  useEffect(() => {
    console.log(employeesData);
  }, [employeesData]);

  const categoryOptions = ["Employee", "Manager"];
  const [position, setPosition] = useState("Employee");

  const [searchTerm, setSearchTerm] = useState("");

  if (employeesLoading) {
    return <div className="px-16">Loading...</div>;
  }
  if (employeesError) {
    return (
      <div className="px-16">Error: {employeesError}</div>
    );
  }

  const filteredEmployees = employeesData.filter((employee) => {
    console.log("Employee data: ",employee.employee_name, employee.employee_email, employee.employee_position);
    if (!searchTerm) return true; // If no search term, show all employees
    
    const term = searchTerm.toLowerCase();
    return (
      employee?.employee_name?.toLowerCase().includes(term) ||
      employee?.employee_email?.toLowerCase().includes(term)
    );
  });
  
  return (
    <main className="flex flex-col px-16 pb-4 ">
      <div className="flex items-center justify-between -mt-4">
        <p className=" text-xl font-semibold">Employee List</p>
        <div className=" flex items-center gap-2">
          <div className="mt-2 relative w-80">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-[#6F403A] h-10 rounded-3xl pr-12"
              placeholder="Search for an Employee"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#6F403A] w-7 h-7 rounded-full flex items-center justify-center">
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
                  <Select value={position} onValueChange={setPosition}>
                    <SelectTrigger className=" w-full">
                      <SelectValue placeholder="Employee" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((option, idx) => (
                        <SelectItem key={idx} value={option}>
                          <span>
                            {option}
                          </span>
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
      <div className="mt-4 flex flex-col gap-2">
        {filteredEmployees.length > 0 ? (
          filteredEmployees.map((employee) => (
            <EmployeeCard key={employee.employee_id} {...employee} />
          ))
        ) : (
          <p className=" text-gray-500">
            No employees match your search.
          </p>
        )}
      </div>
    </main>
  );
}

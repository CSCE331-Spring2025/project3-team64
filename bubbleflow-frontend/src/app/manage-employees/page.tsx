"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import EmployeeCard from "@/components/employeeCard";

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
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "(555) 123 4567",
      role: "Manager",
    },
  ];
  return (
    <main className="flex flex-col px-16">
      <div className=" text-xl font-semibold">
        <p>Employee List</p>
      </div>
      <div className=" mt-4 flex flex-col gap-2">
        {employees.map((employee) => (
          <EmployeeCard key={employee.id} {...employee} />
        ))}
      </div>
    </main>
  );
}
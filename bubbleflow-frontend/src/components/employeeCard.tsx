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
import { useState } from "react";
import { Employee } from "@/app/service/types";
import { useDeleteEmployee, useUpdateEmployee } from "@/app/hooks/useEmployees";

//props copied from 
interface EmployeeCardProps {
  employee_id: number;
  employee_name: string;
  employee_email: string;
  employee_phone: string;
  employee_position: string;
}

export default function EmployeeCard({
  employee_id,
  employee_name,
  employee_email,
  employee_phone,
  employee_position,
}: EmployeeCardProps) {
  const {deleteEmployee } = useDeleteEmployee();
  const {updateEmployee} = useUpdateEmployee();


  function handleEdit(): void {
    console.log("Editing employee with id:", employee_id);
  }

  function handleUpdate(): void {
    const employee = {
      employee_id: employee_id,
      employee_name: employee_name,
      employee_email: employee_email,
      employee_phone: employee_phone,
      employee_position: employee_position,
    };
    updateEmployee(employee);
  }



  function handleDelete(): void {
    console.log("Deleting employee with id:", employee_id);
    deleteEmployee(employee_id);
  }
  const categoryOptions = [
    { id: "1", label: "Employee" },
    { id: "2", label: "Manager" },
  ];
  
  console.log("Employee data (received by employeeCard): ",employee_id, employee_name, employee_email, employee_phone, employee_position);
  const [position, setPosition] = useState(employee_position);
  const [id, setID] = useState(employee_id);
  const [name, setName] = useState(employee_name);
  const [email, setEmail] = useState(employee_email);
  const [phone, setPhone] = useState(employee_phone);
  
  return (
    <div className="flex justify-between border p-4 border-[#6F403A] rounded-xl">
      <div>
        <p className="font-semibold">{employee_name}</p>
        <div className="flex gap-4 text-sm text-gray-400">
          <p>{employee_email}</p>
          <p>{employee_phone}</p>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <div className="flex flex-col text-right">
          <p className="font-semibold">{employee_position}</p>
          <div className="text-sm text-gray-400">
            <p>ID: {employee_id}</p>
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
                  <Input defaultValue={employee_name}/>
                </div>
                <div className="items-center gap-4">
                  <Label className="mb-2">Email</Label>
                  <Input defaultValue={employee_email} />
                </div>
                <div className="items-center gap-4">
                  <Label className="mb-2">Phone Number</Label>
                  <Input defaultValue={employee_phone} />
                </div>
                <div className="items-center gap-4">
                  <Label className="mb-2">Position</Label>
                  <Select value={position} onValueChange={setPosition}>
                    <SelectTrigger className=" w-full">
                    <SelectValue defaultValue={employee_position} />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((option) => (
                        <SelectItem key={option.id} value={option.label}>
                          <span>
                            {option.label}
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
                onClick={handleUpdate}
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
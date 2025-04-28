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

import { useEmployees, useAddEmployee } from "@/app/hooks/useEmployees";
import { Employee } from "@/app/service/types";

// Employee management page, manager side
export default function ManageEmployees() {

  const {
    employees: employeesData,
    loading: employeesLoading,
    error: employeesError,
    fetchEmployees
  } = useEmployees();

  const {addEmployee} = useAddEmployee();

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  useEffect(() => {
    console.log(employeesData);
  }, [employeesData]);

  const [new_employee_position, setPosition] = useState("Employee");
  const [new_employee_name, setName] = useState("");
  const [new_employee_email, setEmail] = useState("");
  const [new_employee_phone, setPhone] = useState("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setName(newName);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPhone = event.target.value;
    setPhone(newPhone);
  };

  function handleAdd() {
    const new_employee = {
      employee_id: 0,
      employee_name: new_employee_name,
      employee_email: new_employee_email,
      employee_phone: new_employee_phone,
      employee_position: new_employee_position
    };
    console.log("Adding new employee:", new_employee);
    addEmployee(new_employee);
    fetchEmployees(); // Refresh the employee list after adding a new employee
  }

  const categoryOptions = [
    { id: "1", label: "Employee" },
    { id: "2", label: "Manager" },
  ];

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
    //console.log("Employee data: ",employee.employee_name, employee.employee_email, employee.employee_position);
    if (!searchTerm) return true; // If no search term, show all employees
    
    const term = searchTerm.toLowerCase();
    return (
      employee?.employee_name?.toLowerCase().includes(term) ||
      employee?.employee_email?.toLowerCase().includes(term)
    );
  });

  const sortedEmployees = filteredEmployees.sort((a, b) => {
    if(a.employee_id < b.employee_id) return -1;
    return 1;
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
              className="border-primary h-10 rounded-3xl pr-12"
              placeholder="Search for an Employee"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary w-7 h-7 rounded-full flex items-center justify-center">
              <RiSearchLine className="text-white bg-primary" size={15} />
            </div>
          </div>
          <Dialog>
            <DialogTrigger>
              <div className="bg-primary w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted mt-2">
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
                  <Input
                    placeholder="Employee Name"
                    defaultValue={""}
                    onChange={handleNameChange}
                  />
                </div>
                <div className="items-center gap-4">
                  <Label className="mb-2">Email</Label>
                  <Input
                    placeholder="Employee Email"
                    defaultValue={""}
                    onChange={handleEmailChange}
                  />
                </div>
                <div className="items-center gap-4">
                  <Label className="mb-2">Phone Number</Label>
                  <Input
                    placeholder={"(###) ###-####"}
                    defaultValue={"(###) ###-####"}
                    onChange={handlePhoneChange}
                  />
                </div>
                <div className="items-center gap-4">
                  <Label className="mb-2">Position</Label>
                  <Select value={new_employee_position} onValueChange={setPosition}>
                    <SelectTrigger className=" w-full">
                    <SelectValue defaultValue={new_employee_position} />
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
                className=" bg-primary hover:bg-muted"
                onClick={handleAdd}
              >
                Add Employee
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        {sortedEmployees.length > 0 ? (
          sortedEmployees.map((employee) => (
            <EmployeeCard key={employee.employee_id} {...employee} />
          ))
        ) : (
          <p className=" text-sidebar-ring">
            No employees match your search.
          </p>
        )}
      </div>
    </main>
  );
}

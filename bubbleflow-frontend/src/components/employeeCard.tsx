import React from "react";
import { RiPencilLine, RiDeleteBin5Line } from "react-icons/ri";

interface EmployeeCardProps {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}

export default function EmployeeCard({ id, name, email, phone, role }: EmployeeCardProps){
  function handleEdit(): void {
    console.log("Editing employee with id:", id);
  }

  function handleDelete(): void {
    console.log("Deleting employee with id:", id);
  }

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
          <div
            onClick={handleEdit}
            className="bg-[#6F403A] w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#4E2D26] cursor-pointer"
          >
            <RiPencilLine className="text-white" size={20} />
          </div>
          <div
            onClick={handleDelete}
            className="bg-[#6F403A] w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#4E2D26] cursor-pointer"
          >
            <RiDeleteBin5Line className="text-white" size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}

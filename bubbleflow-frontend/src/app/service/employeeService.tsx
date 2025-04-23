import api from './api';
import { Employee } from './types';

export const employeeService = {
    // employee endpoints
    getEmployees: () => {
        return api.get<Employee[]>('/employees').then(res => res.data);
    },

    deleteEmployee: (employeeId: number) => {
        return api.post(`/employees/deleteEmployee`, employeeId).then(res => res.data);
    },

    addEmployee: (employee: Employee) => {
        return api.post('/employees/addEmployee', employee).then(res => res.data);
    },

    updateEmployee: (employeeId: number, employee: Employee) => {
        console.log("Updating employee with ID:", employeeId, "Data:", employee);
        return api.post(`/employees/updateEmployee`, employee).then(res => res.data);
    },
};
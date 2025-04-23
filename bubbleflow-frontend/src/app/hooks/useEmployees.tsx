import { useState, useCallback } from "react";
import { employeeService } from "../service/employeeService";
import { Employee } from "../service/types";

export const useEmployees = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchEmployees = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await employeeService.getEmployees();
            setEmployees(data);
        } catch (err) {
            setError('failed to fetch employees');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        employees,
        loading,
        error,
        fetchEmployees
    };
};

export const useDeleteEmployee = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deleteEmployee = useCallback(async (employeeId: number) => {
        setLoading(true);
        setError(null);
        try {
            await employeeService.deleteEmployee(employeeId);
        } catch (err) {
            setError('failed to delete employee');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        loading,
        error,
        deleteEmployee
    };
}

export const useAddEmployee = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const addEmployee = useCallback(async (employee: Employee) => {
        setLoading(true);
        setError(null);
        try {
            await employeeService.addEmployee(employee);
        } catch (err) {
            setError('failed to add employee');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        loading,
        error,
        addEmployee
    };
}

export const useUpdateEmployee = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateEmployee = useCallback(async (employee: Employee) => {
        setLoading(true);
        setError(null);
        try {
            await employeeService.updateEmployee(employee.employee_id, employee);
        } catch (err) {
            setError('failed to update employee');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        loading,
        error,
        updateEmployee
    };
}
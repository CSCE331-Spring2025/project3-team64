package com.team64.BubbleFlowBackend.service;

import com.team64.BubbleFlowBackend.model.Employee;
import com.team64.BubbleFlowBackend.repository.EmployeeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepo employeeRepo;

    public List<Employee> getAllEmployees() {
        return employeeRepo.findAll();
    }

    public Employee getEmployeeById(Integer id) {
        return employeeRepo.findById(id).orElse(null);
    }

    public Employee saveEmployee(Employee employee) {
        return employeeRepo.save(employee);
    }

    public void deleteEmployeeById(int id) {
        System.out.println("Deleting employee with ID: " + id);
        employeeRepo.deleteById(id);
    }

    public void updateEmployee(Employee employee) {
        Employee existingEmployee = employeeRepo.findById(employee.getEmployee_id()).orElse(null);
        if (existingEmployee != null) {
            System.out.println("Updating employee " + employee.getEmployee_name() + " with ID: " + employee.getEmployee_id());
            existingEmployee.setEmployee_name(employee.getEmployee_name());
            existingEmployee.setEmployee_phone(employee.getEmployee_phone());
            existingEmployee.setEmployee_email(employee.getEmployee_email());
            existingEmployee.setEmployee_position(employee.getEmployee_position());
            employeeRepo.save(existingEmployee);
        } else {
            System.out.println("Employee with ID " + employee.getEmployee_id() + " not found.");
        }
    }
}
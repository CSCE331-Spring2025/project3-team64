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

    // public Employee saveEmployee(Employee employee) {
    //     return employeeRepo.save(employee);
    // }

    // public void deleteEmployee(Long id) {
    //     employeeRepo.deleteById(id);
    // }
}
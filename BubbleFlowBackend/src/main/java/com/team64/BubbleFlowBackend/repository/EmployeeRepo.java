package com.team64.BubbleFlowBackend.repository;

import com.team64.BubbleFlowBackend.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepo extends JpaRepository<Employee, Integer> {}

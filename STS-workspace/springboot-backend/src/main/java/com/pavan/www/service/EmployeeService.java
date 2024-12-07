package com.pavan.www.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.pavan.www.exception.ResourceNotFoundException;
import com.pavan.www.model.Employee;
import com.pavan.www.repo.EmployeeRepository;

@Service
public class EmployeeService
{
	@Autowired
	EmployeeRepository employeeRepository;
	
	public List<Employee> getAllEmployees()
	{
		return employeeRepository.findAll();
	}
	
	public Employee addEmployee(Employee employee)
	{
		return employeeRepository.save(employee);
	}
	public Employee getEmployeeById(long id)
	{
		return employeeRepository.findById(id)
				.orElseThrow(()->new ResourceNotFoundException("Id Not Found"));
	}
	public ResponseEntity<Employee> updateEmployeeById(long id,Employee employee)
	{
		System.out.println(employee);
		Employee oldEmp=employeeRepository.findById(id).orElseThrow(()->
		new ResourceNotFoundException("Id Not Found"));
		
		oldEmp.setFirst_name(employee.getFirst_name());
		oldEmp.setLast_name(employee.getLast_name());
		oldEmp.setEmail(employee.getEmail());
		
		Employee updateEmp=employeeRepository.save(oldEmp);
		
		return ResponseEntity.ok(updateEmp);
	}
	
		public ResponseEntity<HttpStatus> deleteEmployee(long id)
		{
			Employee employee=employeeRepository.findById(id).orElseThrow(()->
			new ResourceNotFoundException("Employee Does not Exist"));
			
			employeeRepository.delete(employee);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
	
	
}
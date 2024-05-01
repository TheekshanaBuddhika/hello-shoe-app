package lk.ijse.helloshoebackend.service;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface EmployeeService {
    Integer saveEmployee(EmployeeDTO employeeDTO);
    Integer updateEmployee(EmployeeDTO employeeDTO);
    Integer disable(String id);
    Integer enable(String id);
    EmployeeDTO searchEmployee(String id);
    List<EmployeeDTO> getAllEmployees();
}

package lk.ijse.helloshoebackend.controller;

import lk.ijse.helloshoebackend.dto.ResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RequestMapping("/api/v1/employee")
@RestController
@CrossOrigin(origins = "*")
public class EmployeeController {
    private final PasswordEncoder passwordEncoder;
    private final EmployeeService employeeService;

    @Autowired
    public EmployeeController(PasswordEncoder passwordEncoder, EmployeeService employeeService) {
        this.passwordEncoder = passwordEncoder;
        this.employeeService = employeeService;
    }
    @PostMapping
    public ResponseDTO saveOrUpdateEmployee(@RequestBody EmployeeDTO employeeDTO){
        try {
            if (employeeDTO.getId() == null) {
                employeeDTO.setPassword(passwordEncoder.encode(employeeDTO.getPassword()));
                return new ResponseDTO("success", employeeService.saveEmployee(employeeDTO));
            } else {
                return new ResponseDTO("success", employeeService.updateEmployee(employeeDTO));
            }
        }catch (Exception e){
            return new ResponseDTO(e.getMessage(), 500);
        }
    }

    @PutMapping("/dis/{id}")
    public ResponseDTO disabledEmployee(@PathVariable String id) {
        try {
            return new ResponseDTO("success", employeeService.disable(id));
        } catch (Exception e) {
            return new ResponseDTO(e.getMessage(), 500);
        }
    }

    @PutMapping("/enb/{id}")
    public ResponseDTO enabledEmployee(@PathVariable String id) {
        try {
            return new ResponseDTO("success", employeeService.enable(id));
        } catch (Exception e) {
            return new ResponseDTO(e.getMessage(), 500);
        }
    }

    @GetMapping("/{id}")
    public ResponseDTO getSelectedEmployee(@PathVariable String id) {
        try {
            HashMap<String, Object> map = new HashMap<>();
            map.put("employee", employeeService.searchEmployee(id));
            return new ResponseDTO("Employee found successfully",200, map);
        } catch (Exception e) {
            return new ResponseDTO(e.getMessage(), 500);
        }
    }

    @GetMapping
    public ResponseDTO getAllEmployees() {
        try {
            HashMap<String, Object> map = new HashMap<>();
            map.put("employees", employeeService.getAllEmployees());
            return new ResponseDTO("Employees found successfully",200, map);
        } catch (Exception e) {
            return new ResponseDTO(e.getMessage(), 500);
        }
    }
}

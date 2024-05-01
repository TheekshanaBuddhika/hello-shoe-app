package lk.ijse.helloshoebackend.util;

import jakarta.annotation.PostConstruct;
import lk.ijse.helloshoebackend.entity.EmployeeEntity;
import lk.ijse.helloshoebackend.entity.UserEntity;
import lk.ijse.helloshoebackend.entity.embedded.Address;
import lk.ijse.helloshoebackend.repository.EmployeeRepository;
import lk.ijse.helloshoebackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InitService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @PostConstruct
    public void init() {
        EmployeeEntity employeeEntity=addDefuelEmployee();
        if (userRepository.count() == 0) {
            userRepository.save(
                    UserEntity.builder()
                            .id(IdService.generateID(Constants.USER_ID))
                            .password("$2a$12$LO2YSeo9irJxjVGxyPX50uycBslOSfWdMDI8/2Aa0Ff5dbPtMaA5e") //Admin@123
                            .email("admin@gmail.com")
                            .role(Constants.ADMIN_USER)
                            .createBy("System")
                            .modifyBy("System")
                            .isActive(Constants.ACTIVE)
                            .employeeEntity(employeeEntity)
                            .build()
            );
        }
    }

    private EmployeeEntity addDefuelEmployee() {
        if (employeeRepository.count() == 0) {
            EmployeeEntity employeeEntity = EmployeeEntity.builder()
                    .dateJoined(null)
                    .dob(null)
                    .address(new Address())
                    .attachedBranch(Constants.COLOMBO)
                    .contact(null)
                    .createBy("System")
                    .modifyBy("System")
                    .designation("Branch Manager")
                    .email("admin@gmail.com")
                    .emergencyContact(null)
                    .id(IdService.generateID(Constants.EMPLOYEE_ID))
                    .name(null)
                    .infoEmergency(null)
                    .proPic(null)
                    .accessRole(Constants.ADMIN_USER)
                    .gender(null)
                    .isActive(Constants.ACTIVE)
                    .status(null)
                    .build();

            return employeeRepository.save(employeeEntity);

        }
        return null;
    }
}

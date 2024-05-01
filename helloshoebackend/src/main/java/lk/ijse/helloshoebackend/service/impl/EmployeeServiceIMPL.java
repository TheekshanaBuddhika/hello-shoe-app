package lk.ijse.helloshoebackend.service.impl;

import lk.ijse.helloshoebackend.dto.EmployeeDTO;
import lk.ijse.helloshoebackend.entity.EmployeeEntity;
import lk.ijse.helloshoebackend.entity.UserEntity;
import lk.ijse.helloshoebackend.entity.embedded.Address;
import lk.ijse.helloshoebackend.repository.EmployeeRepository;
import lk.ijse.helloshoebackend.repository.UserRepository;
import lk.ijse.helloshoebackend.service.EmployeeService;
import lk.ijse.helloshoebackend.util.CommonUtils;
import lk.ijse.helloshoebackend.util.Constants;
import lk.ijse.helloshoebackend.util.IdService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeServiceIMPL implements EmployeeService {
    private final EmployeeRepository employeeRepository;

    private final UserRepository userRepository;

    private final ModelMapper modelMapper;

    @Autowired
    public EmployeeServiceIMPL(EmployeeRepository employeeRepository, UserRepository userRepository, ModelMapper modelMapper) {
        this.employeeRepository = employeeRepository;
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public Integer saveEmployee(EmployeeDTO employeeDTO) {
        if (! employeeRepository.existsByEmailAndContact(employeeDTO.getEmail(), employeeDTO.getContact())) {
            EmployeeEntity map = modelMapper.map(employeeDTO, EmployeeEntity.class);
            map.setCreateBy(CommonUtils.getUser().getUsername());
            map.setId(IdService.generateID(Constants.EMPLOYEE_ID));
            commonSaveUpdate(employeeDTO, map);

            saveUsr(employeeDTO, map);

            return 200;
        }
        return 500;
    }

    @Override
    public Integer updateEmployee(EmployeeDTO employeeDTO) {
        if (! employeeRepository.existsByEmailAndContact(employeeDTO.getEmail(), employeeDTO.getContact())) {
            EmployeeEntity map = modelMapper.map(employeeDTO, EmployeeEntity.class);
            commonSaveUpdate(employeeDTO, map);

            UserEntity userEntity = userRepository.findByEmployeeEntity(map);
            userEntity.setEmail(employeeDTO.getEmail());
            userEntity.setModifyBy(CommonUtils.getUser().getUsername());
            userRepository.save(userEntity);

            return 200;
        }
        return 500;
    }


    private void commonSaveUpdate(EmployeeDTO employeeDTO, EmployeeEntity map) {
        map.setModifyBy(CommonUtils.getUser().getUsername());
        map.setIsActive(Constants.ACTIVE);
        map.setAddress(new Address(employeeDTO.getLane1(), employeeDTO.getLane2(), employeeDTO.getLane3(), employeeDTO.getLane4(), employeeDTO.getLane5()));

        map.setDob(CommonUtils.convertStringToDate(employeeDTO.getDob()));
        map.setDateJoined(CommonUtils.convertStringToDate(employeeDTO.getDateJoined()));

        if (employeeDTO.getGender().equals("MAN")) {
            map.setGender(Constants.MAN);
        } else {
            map.setGender(Constants.WOMAN);
        }

        if (employeeDTO.getAccessRole().equals("REGULAR_USER")) {
            map.setAccessRole(Constants.REGULAR_USER);
        } else {
            map.setAccessRole(Constants.ADMIN_USER);
        }

        if (employeeDTO.getAttachedBranch().equals("COLOMBO")) {
            map.setAttachedBranch(Constants.COLOMBO);
        }

        if (employeeDTO.getStatus().equals("MARRIED")) {
            map.setStatus(Constants.MARRIED);
        } else {
            map.setStatus(Constants.SINGLE);
        }

        employeeRepository.save(map);
    }

    private void saveUsr(EmployeeDTO employeeDTO, EmployeeEntity employeeEntity) {
        userRepository.save(UserEntity
                .builder()
                .id(IdService.generateID(Constants.USER_ID))
                .email(employeeDTO.getEmail())
                .employeeEntity(employeeEntity)
                .createBy(CommonUtils.getUser().getUsername())
                .modifyBy(CommonUtils.getUser().getUsername())
                .password(employeeDTO.getPassword())
                .role(Constants.REGULAR_USER)
                .isActive(Constants.ACTIVE)
                .build()
        );
    }


    @Override
    public Integer disable(String id) {
        return activation(id, Constants.INACTIVE);
    }

    @Override
    public Integer enable(String id) {
        return activation(id, Constants.ACTIVE);
    }

    public Integer activation(String id , Constants constants){
        if (employeeRepository.existsById(id)) {
            EmployeeEntity employeeEntity = employeeRepository.findById(id).orElse(null);
            if (employeeEntity != null) {
                employeeEntity.setIsActive(constants);
                employeeEntity.setModifyBy(CommonUtils.getUser().getUsername());
                employeeRepository.save(employeeEntity);

                UserEntity userEntity = userRepository.findByEmployeeEntity(employeeEntity);
                userEntity.setIsActive(constants);
                userEntity.setModifyBy(CommonUtils.getUser().getUsername());
                userRepository.save(userEntity);

                return 200;
            }
        }
        return 500;
    }

    @Override
    public EmployeeDTO searchEmployee(String id) {
        EmployeeEntity employeeEntity = employeeRepository.findById(id).orElse(null);
        if (employeeEntity != null) {
            return getEmployeeDTO(employeeEntity);
        }
        return null;
    }

    @Override
    public List<EmployeeDTO> getAllEmployees() {
        return employeeRepository.findAll()
                .stream()
                .map(this::getEmployeeDTO)
                .collect(Collectors.toList());
    }

    private EmployeeDTO getEmployeeDTO(EmployeeEntity employeeEntity) {
        EmployeeDTO employeeDTO = modelMapper.map(employeeEntity, EmployeeDTO.class);
        employeeDTO.setPassword("ENCRYPTED");
        employeeDTO.setLane1(employeeEntity.getAddress().getLine1());
        employeeDTO.setLane2(employeeEntity.getAddress().getLine2());
        employeeDTO.setLane3(employeeEntity.getAddress().getLine3());
        employeeDTO.setLane4(employeeEntity.getAddress().getLine4());
        employeeDTO.setLane5(employeeEntity.getAddress().getLine5());
        employeeDTO.setDob(CommonUtils.convertDateToString(employeeEntity.getDob()));
        employeeDTO.setDateJoined(CommonUtils.convertDateToString(employeeEntity.getDateJoined()));
        return employeeDTO;
    }
}

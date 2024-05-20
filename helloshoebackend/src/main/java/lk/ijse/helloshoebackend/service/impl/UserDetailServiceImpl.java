package lk.ijse.helloshoebackend.service.impl;

import lk.ijse.helloshoebackend.dto.UserDTO;
import lk.ijse.helloshoebackend.entity.Employee;
import lk.ijse.helloshoebackend.entity.User;
import lk.ijse.helloshoebackend.repository.EmployeeRepo;
import lk.ijse.helloshoebackend.repository.UserRepo;
import lk.ijse.helloshoebackend.service.UserDetailService;
import lk.ijse.helloshoebackend.util.Role;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserDetailServiceImpl implements UserDetailService, UserDetailsService {

    private final UserRepo userRepo;

    private final ModelMapper mapper;

    private final EmployeeRepo employeeRepo;

    public UserDetailServiceImpl(UserRepo userRepo, ModelMapper mapper, EmployeeRepo employeeRepo) {
        this.userRepo = userRepo;
        this.mapper = mapper;
        this.employeeRepo = employeeRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findById(username).get();
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), new ArrayList<>());
    }

    @Override
    public UserDTO loginUser(String userName) {
        User user = userRepo.findById(userName).get();
        if (user.getRole() == Role.SUPER_ADMIN){
            return new UserDTO(user.getUsername(),"1ai2SKEeXSLhr0XQbI1vKyV35gUwfvCvZ",user.getRole());
        }
        Employee employee = employeeRepo.findById(user.getEmployee().getEmpId()).get();
        return new UserDTO(user.getUsername(),employee.getProfilePic(),user.getRole());
    }
}

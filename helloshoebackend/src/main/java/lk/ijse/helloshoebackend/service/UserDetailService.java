package lk.ijse.helloshoebackend.service;

import lk.ijse.helloshoebackend.dto.UserDTO;
import org.springframework.stereotype.Service;
public interface UserDetailService {
    UserDTO loginUser(String userName);
}

package lk.ijse.helloshoebackend.service;

import lk.ijse.helloshoebackend.dto.UserDTO;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    Integer updateUsr(UserDTO userDTO);
}

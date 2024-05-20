package lk.ijse.helloshoebackend.dto;

import lk.ijse.helloshoebackend.util.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO implements Serializable {
    private String userName;
    private String profilePic;
    private Role role;
}

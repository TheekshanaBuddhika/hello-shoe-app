package lk.ijse.helloshoebackend.authentication;


import lk.ijse.helloshoebackend.util.Role;

import java.io.Serializable;

public record AuthenticationResponse(String jwt, String username, String profilePic, Role role) implements Serializable {
}

package lk.ijse.helloshoebackend.controller;

import lk.ijse.helloshoebackend.authentication.AuthenticationRequest;
import lk.ijse.helloshoebackend.authentication.AuthenticationResponse;
import lk.ijse.helloshoebackend.dto.UserDTO;
import lk.ijse.helloshoebackend.dto.UserDataDTO;
import lk.ijse.helloshoebackend.security.jwt.JwtUtil;
import lk.ijse.helloshoebackend.service.UserDetailService;
import lk.ijse.helloshoebackend.util.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthenticationProvider authenticationManager;
    private final JwtUtil jwtTokenUtil;
    private final UserDetailsService userDetailsService;

    private final UserDetailService userDetailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public AuthController(AuthenticationProvider authenticationManager, JwtUtil jwtTokenUtil, UserDetailsService userDetailsService, UserDetailService userDetailService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
        this.userDetailsService = userDetailsService;
        this.userDetailService = userDetailService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        UserDTO userDto = null;
        String profilePic = null;
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authenticationRequest.getUsername(),
                            authenticationRequest.getPassword())
            );
            final UserDetails userDetails = userDetailsService
                    .loadUserByUsername(authenticationRequest.getUsername());
            final String jwt = jwtTokenUtil.generateToken(userDetails.getUsername());
            userDto = userDetailService.loginUser(userDetails.getUsername());
            if (userDto.getRole().equals(Role.SUPER_ADMIN)) {
                profilePic = "1piBoC1dcyCqe-b4wIV2QF_9CGtm2e2ND";
            } else {
                profilePic = userDto.getProfilePic();
            }
            return ResponseEntity.ok(new AuthenticationResponse(jwt, userDto.getUserName(), profilePic, userDto.getRole()));
        } catch (BadCredentialsException e) {
            throw new Exception("Incorrect username or password", e);
        }
    }

    @PostMapping("/verification")
    public ResponseEntity<?> verifyAdminPassword(@RequestBody UserDataDTO userDataDTO) {
        UserDTO userdto = null;
        try {
            UserDetails userDetails = userDetailsService.loadUserByUsername(userDataDTO.getUsername());
            boolean passwordMatches = passwordEncoder.matches(userDataDTO.getPassword(), userDetails.getPassword());
            userdto = userDetailService.loginUser(userDetails.getUsername());
            if (passwordMatches && (userdto.getRole().equals(Role.SUPER_ADMIN)|| userdto.getRole().equals(Role.ADMIN))){
                return ResponseEntity.ok().body("Password verified successfully");
            } else {
                return ResponseEntity.status(401).body("Incorrect password");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error verifying password");
        }
    }

}

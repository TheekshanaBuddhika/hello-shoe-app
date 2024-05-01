package lk.ijse.helloshoebackend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class EmployeeDTO {
    private String id;
    private String name;
    private String proPic;
    private String gender;
    private String status;
    private String designation;
    private String accessRole;
    private Date dob;
    private Date dateJoined;
    private String attachedBranch;
    private String lane1;
    private String lane2;
    private String lane3;
    private String lane4;
    private String lane5;
    private String contact;
    private String email;
    private String infoEmergency;
    private String emergencyContact;
    private String password;
}

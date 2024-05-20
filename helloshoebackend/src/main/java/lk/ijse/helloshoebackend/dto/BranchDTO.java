package lk.ijse.helloshoebackend.dto;

import lk.ijse.helloshoebackend.entity.embedded.Address;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BranchDTO {
    private String branchId;
    private String branchName;
    private String branchContact;
    private Address address;
    private Integer noOfEmployees;
    private String branchManager;
    private Timestamp createdDate;
}
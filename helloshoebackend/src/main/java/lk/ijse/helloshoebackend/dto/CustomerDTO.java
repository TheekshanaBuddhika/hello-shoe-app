package lk.ijse.helloshoebackend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class CustomerDTO implements Serializable {
    private String id;
    private String name;
    private String email;
    private String contact;
    private String gender;
    private Integer level;
    private Date resetPurchases;
    private Integer ttlPoints;
    private Date dob;
    private Date joinedDate;
    private String line1;
    private String line2;
    private String line3;
    private String line4;
    private String line5;
    private String userId;
}

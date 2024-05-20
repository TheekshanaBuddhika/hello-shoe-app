package lk.ijse.helloshoebackend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lk.ijse.helloshoebackend.entity.embedded.Address;
import lk.ijse.helloshoebackend.util.Gender;
import lk.ijse.helloshoebackend.util.Level;
import lombok.*;

import java.io.Serializable;
import java.sql.Date;
import java.sql.Timestamp;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CustomerDTO {
    private String userEmail;
    private String customerId;
    private String customerName;
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Gender gender;
    private Integer totalPoints;
    private String contact;
    private String email;
    private java.sql.Date recentPurchaseDate;
    private Address address;
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Level level;
    private Date dob;
    private Timestamp registeredDate;
}

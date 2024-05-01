package lk.ijse.helloshoebackend.entity;

import jakarta.persistence.*;
import lk.ijse.helloshoebackend.entity.embedded.Address;
import lk.ijse.helloshoebackend.util.Constants;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "employee")
@Entity
public class EmployeeEntity {

    @Id
    @Column(name = "emp_id")
    private String id;

    @Column(name = "emp_name")
    private String name;

    @Column(name = "pro-pic")
    private String proPic;

    @Column(name = "gender")
    @Enumerated(EnumType.STRING)
    private Constants gender;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private Constants status;

    @Column(name = "designation")
    private String designation;

    @Column(name = "access_role")
    @Enumerated(EnumType.STRING)
    private Constants accessRole;

    @Column(name = "dob")
    private LocalDate dob;

    @Column(name = "date_joined")
    private LocalDate dateJoined;

    @Column(name = "attached_branch")
    @Enumerated(EnumType.STRING)
    private Constants attachedBranch;

    @Column(name = "address")
    private Address address;

    @Column(name = "contact")
    private String contact;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "info_emergency")
    private String infoEmergency;

    @Column(name = "emergency_contact")
    private String emergencyContact;

    @OneToOne(mappedBy = "employeeEntity", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private UserEntity user;



    @CreationTimestamp
    @Column(name = "create_date", updatable = false, nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createDate;

    @Column(name = "create_by")
    private String createBy;

    @UpdateTimestamp
    @Column(name = "modify_date")
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime modifyDate;

    @Column(name = "modify_by")
    private String modifyBy;

    @Column(name = "is_active")
    @Enumerated(EnumType.STRING)
    private Constants isActive;


}

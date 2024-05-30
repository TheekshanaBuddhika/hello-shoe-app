package lk.ijse.helloshoebackend.entity;

import jakarta.persistence.*;
import lk.ijse.helloshoebackend.entity.embedded.Address;
import lk.ijse.helloshoebackend.util.Gender;
import lk.ijse.helloshoebackend.util.Level;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Customer {
    @Id
    private String customerId;
    private String customerName;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    @CreationTimestamp
    private Timestamp registeredDate;
    private Integer totalPoints;
    @Column(unique = true)
    private String contact;
    private String email;
    private Date recentPurchaseDate;
    private Address address;
    @Enumerated(EnumType.STRING)
    private Level level;
    private Date dob;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private List<Sale> sales;
}

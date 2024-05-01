package lk.ijse.helloshoebackend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lk.ijse.helloshoebackend.entity.embedded.Address;
import lk.ijse.helloshoebackend.util.Constants;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "customer")
@Entity
public class CustomerEntity {
    @Id
    @Column(name = "cus_id")
    private String id;

    @Column(name = "cus_name")
    private String name;

    @Column(name = "gender")
    private Constants gender;

    @Column(name = "joined_date")
    private Date joinedDate;

    @Column(name = "level")
    private Constants level;

    @Column(name = "ttl_points")
    private Integer ttlPoints;

    @Column(name = "dob")
    private Date dob;

    @Column(name = "address")
    private Address address;

    @Column(name = "contact", unique = true)
    private String contact;

    @Column(name = "email")
    private String email;

    @Column(name = "recent_purchases")
    private String recentPurchases;

    @ManyToOne
    @JoinColumn(name = "usr_id", nullable = false)
    private UserEntity userEntity;

    @JsonIgnore
    @OneToMany(mappedBy = "customerEntity", fetch = FetchType.LAZY, cascade = CascadeType.ALL, targetEntity = SaleEntity.class)
    List<SaleEntity> saleEntities;



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

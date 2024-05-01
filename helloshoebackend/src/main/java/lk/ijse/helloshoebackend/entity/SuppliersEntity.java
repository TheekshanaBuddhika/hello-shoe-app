package lk.ijse.helloshoebackend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lk.ijse.helloshoebackend.entity.embedded.Address;
import lk.ijse.helloshoebackend.entity.embedded.Contact;
import lk.ijse.helloshoebackend.util.Constants;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "suppliers")
public class SuppliersEntity {

    @Id
    @Column(name = "sup_id")
    private String id;

    @Column(name = "sup_name")
    private String name;

    @Column(name = "category")
    @Enumerated(EnumType.STRING)
    private Constants category;

    @Column(name = "address")
    private Address address;

    @Column(name = "contact")
    private Contact contact;

    @Column(name = "email")
    private String email;

    @JsonIgnore
    @OneToMany(mappedBy = "suppliersEntity", fetch = FetchType.LAZY, cascade = CascadeType.ALL, targetEntity = InventoryEntity.class)
    List<InventoryEntity> inventoryEntities;

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

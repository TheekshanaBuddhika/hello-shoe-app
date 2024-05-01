package lk.ijse.helloshoebackend.entity;

import jakarta.persistence.*;
import lk.ijse.helloshoebackend.util.Constants;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "inventory")
@Entity
public class InventoryEntity {

    @Id
    @Column(name = "itm_id")
    private String id;

    @Column(name = "itm_desc")
    private String description;

    @Column(name = "itm_pic")
    private String picture;

    @Column(name = "category")
    private String category;

    @Column(name = "size")
    private String size;

    @Column(name = "unit_price_sale")
    private double unitPriceSale;

    @Column(name = "unit_price_purchase")
    private double unitPricePurchase;

    @Column(name = "qty_on_hand")
    private int qtyOnHand;

    @Column(name = "expected_profit")
    private double expectedProfit;

    @Column(name = "profit_margin")
    private double profitMargin;

    @Column(name = "status")
    private String status;

    @ManyToOne
    @JoinColumn(name = "sup_id")
    private SuppliersEntity suppliersEntity;


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

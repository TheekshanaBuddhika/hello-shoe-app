package lk.ijse.helloshoebackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "sale_inventory_details")
public class SaleInventoryDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "itm_id", insertable = false, updatable = false)
    private InventoryEntity inventoryEntity;

    @ManyToOne
    @JoinColumn(name = "sale_id", insertable = false, updatable = false)
    private SaleEntity saleEntity;
}

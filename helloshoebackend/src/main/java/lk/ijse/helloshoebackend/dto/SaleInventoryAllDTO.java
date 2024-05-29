package lk.ijse.helloshoebackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaleInventoryAllDTO {
    private String saleId;
    private String inventoryId;
    private int qty;
}

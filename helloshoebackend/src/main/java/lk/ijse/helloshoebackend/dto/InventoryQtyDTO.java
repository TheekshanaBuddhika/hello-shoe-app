package lk.ijse.helloshoebackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InventoryQtyDTO {
    private String inventory_id;
    private int qty;
}

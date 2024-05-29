package lk.ijse.helloshoebackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class saleInventoryDTO {
    private String saleId;
    private List<InventoryQtyDTO> inventoryDetails;
}

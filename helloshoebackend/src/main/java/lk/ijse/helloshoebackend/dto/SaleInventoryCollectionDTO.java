package lk.ijse.helloshoebackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaleInventoryCollectionDTO {
    private SaleDTO saleDTO;
    private saleInventoryDTO saleInventoryDTO;
    private List<InventoryDTO> inventoryDTOList;
}

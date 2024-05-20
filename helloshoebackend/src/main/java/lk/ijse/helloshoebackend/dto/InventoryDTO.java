package lk.ijse.helloshoebackend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lk.ijse.helloshoebackend.util.ItemGender;
import lk.ijse.helloshoebackend.util.ItemStatus;
import lk.ijse.helloshoebackend.util.ItemType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InventoryDTO {
    private String itemCode;
    private String supplierId;
    private String itemDescription;
    private String itemPicture;
    private Integer qtyOnHand;
    private Integer size;
    private Double buyingPrice;
    private Integer getqty;
    private String brand;
    private Double sellingPrice;
    private Double expectedProfit;
    private Integer itemSoldCount;
    private Integer getStockTotal;
    private Double profitMargin;
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private ItemStatus itemStatus;
    private Integer discount;
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private ItemType itemType;
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private ItemGender itemGender;
    private SupplierDTO supplier;
}

package lk.ijse.helloshoebackend.service;

import lk.ijse.helloshoebackend.dto.SaleDTO;
import lk.ijse.helloshoebackend.dto.SaleInventoryCollectionDTO;
import lk.ijse.helloshoebackend.entity.Inventory;

import java.util.List;

public interface SaleService {
    boolean saveSale(SaleDTO saleDTO);
    boolean updateSale(SaleInventoryCollectionDTO saleInventoryCollectionDTO);
    List<SaleDTO> getAllSales();
}

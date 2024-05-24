package lk.ijse.helloshoebackend.service;

import lk.ijse.helloshoebackend.dto.SaleDTO;
import lk.ijse.helloshoebackend.dto.SupplierDTO;

import java.util.List;

public interface SaleService {
    boolean saveSale(SaleDTO saleDTO);
    List<SaleDTO> getAllSales();
}

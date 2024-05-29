package lk.ijse.helloshoebackend.service.impl;

import lk.ijse.helloshoebackend.dto.InventoryQtyDTO;
import lk.ijse.helloshoebackend.dto.saleInventoryDTO;
import lk.ijse.helloshoebackend.repository.SaleInventoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SaleInventoryServiceImpl {
    @Autowired
    private SaleInventoryRepo saleInventoryRepository;

    public saleInventoryDTO getSaleInventoryDataBySaleId(String saleId) {
        List<Object[]> results = saleInventoryRepository.findInventoryQtyBySaleId(saleId);
        List<InventoryQtyDTO> inventoryQtyList = results.stream()
                .map(result -> new InventoryQtyDTO((String) result[0], (Integer) result[1]))
                .collect(Collectors.toList());
        return new saleInventoryDTO(saleId, inventoryQtyList);
    }



}

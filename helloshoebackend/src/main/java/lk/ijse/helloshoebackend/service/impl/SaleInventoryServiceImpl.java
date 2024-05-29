package lk.ijse.helloshoebackend.service.impl;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lk.ijse.helloshoebackend.dto.InventoryQtyDTO;
import lk.ijse.helloshoebackend.dto.SaleDTO;
import lk.ijse.helloshoebackend.dto.SaleInventoryAllDTO;
import lk.ijse.helloshoebackend.dto.saleInventoryDTO;
import lk.ijse.helloshoebackend.repository.SaleInventoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    @PersistenceContext
    private EntityManager entityManager;

    public List<SaleInventoryAllDTO> getAllSales() {
        List<Object[]> results = entityManager.createNativeQuery("SELECT sale_id, inventory_id, qty FROM sale_inventory").getResultList();
        return results.stream()
                .map(result -> new SaleInventoryAllDTO((String) result[0], (String) result[1], (int) result[2]))
                .collect(Collectors.toList());
    }

}

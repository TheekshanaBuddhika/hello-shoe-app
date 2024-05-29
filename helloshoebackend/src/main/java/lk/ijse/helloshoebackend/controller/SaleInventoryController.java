package lk.ijse.helloshoebackend.controller;

import lk.ijse.helloshoebackend.dto.saleInventoryDTO;
import lk.ijse.helloshoebackend.service.impl.SaleInventoryServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/api/v1/sale-inventory")
public class SaleInventoryController {

    @Autowired
    private SaleInventoryServiceImpl saleInventoryService;

    @GetMapping("/{saleId}")
    public saleInventoryDTO getSaleInventoryDataBySaleId(@PathVariable String saleId) {
        return saleInventoryService.getSaleInventoryDataBySaleId(saleId);
    }
}


package lk.ijse.helloshoebackend.service;

import lk.ijse.helloshoebackend.dto.SupplierDTO;

import java.util.List;

public interface SupplierService {
    Integer saveSupplier(SupplierDTO supplierDTO);
    Integer updateSupplier(SupplierDTO supplierDTO);
    Integer disable(String id);
    Integer enable(String id);
    SupplierDTO searchSupplier(String id);
    List<SupplierDTO> getAllSuppliers();
}

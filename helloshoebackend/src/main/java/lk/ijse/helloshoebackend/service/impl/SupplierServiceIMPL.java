package lk.ijse.helloshoebackend.service.impl;

import lk.ijse.helloshoebackend.dto.SupplierDTO;
import lk.ijse.helloshoebackend.entity.SuppliersEntity;
import lk.ijse.helloshoebackend.entity.embedded.Address;
import lk.ijse.helloshoebackend.entity.embedded.Contact;
import lk.ijse.helloshoebackend.repository.SupplierRepository;
import lk.ijse.helloshoebackend.service.SupplierService;
import lk.ijse.helloshoebackend.util.CommonUtils;
import lk.ijse.helloshoebackend.util.Constants;
import lk.ijse.helloshoebackend.util.IdService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupplierServiceIMPL implements SupplierService {
    private final SupplierRepository supplierRepository;

    private final ModelMapper modelMapper;

    @Autowired
    public SupplierServiceIMPL(SupplierRepository supplierRepository, ModelMapper modelMapper) {
        this.supplierRepository = supplierRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public Integer saveSupplier(SupplierDTO supplierDTO) {
        if (!supplierRepository.existsByContactAndEmail(
                new Contact(supplierDTO.getMobileContact(), supplierDTO.getLandContact()), supplierDTO.getEmail())) {
            SuppliersEntity map = modelMapper.map(supplierDTO, SuppliersEntity.class);
            map.setCreateBy(CommonUtils.getUser().getUsername());
            map.setId(IdService.generateID(Constants.SUPPLIER_ID));
            return saveOrUpdate(supplierDTO, map);
        }
        return 500;
    }

    @Override
    public Integer updateSupplier(SupplierDTO supplierDTO) {
        if (!supplierRepository.existsByContactAndEmail(
                new Contact(supplierDTO.getMobileContact(), supplierDTO.getLandContact()), supplierDTO.getEmail())) {
            SuppliersEntity map = modelMapper.map(supplierDTO, SuppliersEntity.class);
            return saveOrUpdate(supplierDTO, map);
        }
        return 500;
    }

    private Integer saveOrUpdate(SupplierDTO supplierDTO, SuppliersEntity map) {
        map.setAddress(Address
                .builder()
                .line1(supplierDTO.getLine1())
                .line2(supplierDTO.getLine2())
                .line3(supplierDTO.getLine3())
                .line4(supplierDTO.getLine4())
                .line5(supplierDTO.getLine5())
                .line6(supplierDTO.getLine6())
                .build());
        map.setContact(Contact
                .builder()
                .land(supplierDTO.getLandContact())
                .mobile(supplierDTO.getMobileContact())
                .build());
        map.setIsActive(Constants.ACTIVE);

        map.setModifyBy(CommonUtils.getUser().getUsername());
        supplierRepository.save(map);
        return 200;
    }

    @Override
    public Integer disable(String id) {
        return activation(id, Constants.INACTIVE);
    }

    @Override
    public Integer enable(String id) {
        return activation(id, Constants.ACTIVE);
    }

    public Integer activation(String id , Constants constants){
        if (supplierRepository.existsById(id)) {
            SuppliersEntity suppliersEntity = supplierRepository.findById(id).orElse(null);
            if (suppliersEntity != null) {
                suppliersEntity.setIsActive(constants);
                suppliersEntity.setModifyBy(CommonUtils.getUser().getUsername());
                supplierRepository.save(suppliersEntity);
                return 200;
            }
        }
        return 500;
    }

    @Override
    public SupplierDTO searchSupplier(String id) {
        SuppliersEntity suppliersEntity = supplierRepository.findById(id).orElse(null);
        if (suppliersEntity != null) {
            return getSupplierDTO(suppliersEntity);
        }
        return null;
    }

    @Override
    public List<SupplierDTO> getAllSuppliers() {
        return supplierRepository.findAll()
                .stream()
                .map(this::getSupplierDTO)
                .toList();
    }

    private SupplierDTO getSupplierDTO(SuppliersEntity suppliersEntity) {
        SupplierDTO supplierDTO = modelMapper.map(suppliersEntity, SupplierDTO.class);
        supplierDTO.setLine1(suppliersEntity.getAddress().getLine1());
        supplierDTO.setLine2(suppliersEntity.getAddress().getLine2());
        supplierDTO.setLine3(suppliersEntity.getAddress().getLine3());
        supplierDTO.setLine4(suppliersEntity.getAddress().getLine4());
        supplierDTO.setLine5(suppliersEntity.getAddress().getLine5());
        supplierDTO.setLine6(suppliersEntity.getAddress().getLine6());
        supplierDTO.setMobileContact(suppliersEntity.getContact().getMobile());
        supplierDTO.setLandContact(suppliersEntity.getContact().getLand());
        return supplierDTO;
    }
}

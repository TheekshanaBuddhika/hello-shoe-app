package lk.ijse.helloshoebackend.service.impl;

import lk.ijse.helloshoebackend.dto.CustomerDTO;
import lk.ijse.helloshoebackend.entity.CustomerEntity;
import lk.ijse.helloshoebackend.entity.embedded.Address;
import lk.ijse.helloshoebackend.repository.CustomerRepository;
import lk.ijse.helloshoebackend.service.CustomerService;
import lk.ijse.helloshoebackend.util.CommonUtils;
import lk.ijse.helloshoebackend.util.Constants;
import lk.ijse.helloshoebackend.util.IdService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerServiceIMPL implements CustomerService {
    private final CustomerRepository customerRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public CustomerServiceIMPL(CustomerRepository customerRepository, ModelMapper modelMapper) {
        this.customerRepository = customerRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public Boolean existsByEmailAndContact(String email, String contact) {
        return null;
    }

    @Override
    public Integer saveCustomer(CustomerDTO customerDTO) {
        if (!customerRepository.existsByEmailAndContact(customerDTO.getEmail(), customerDTO.getContact())) {
            CustomerEntity map = modelMapper.map(customerDTO, CustomerEntity.class);
            map.setId(IdService.generateID(Constants.CUSTOMER_ID));
            map.setTtlPoints(0);
            map.setLevel(Constants.NEW);
            map.setJoinedDate(CommonUtils.getCurrentDate());
            map.setAddress(Address
                    .builder()
                    .line1(customerDTO.getLine1())
                    .line2(customerDTO.getLine2())
                    .line3(customerDTO.getLine3())
                    .line4(customerDTO.getLine4())
                    .line5(customerDTO.getLine5())
                    .build());
        }
        return null;
    }

    @Override
    public Integer updateCustomer(CustomerDTO customerDTO) {
        return 0;
    }

    @Override
    public Integer disableCustomer(String id) {
        return 0;
    }

    @Override
    public Integer enableCustomer(String id) {
        return 0;
    }

    @Override
    public CustomerDTO searchCustomer(String id) {
        return null;
    }

    @Override
    public List<CustomerDTO> getAllCustomers() {
        return List.of();
    }
}

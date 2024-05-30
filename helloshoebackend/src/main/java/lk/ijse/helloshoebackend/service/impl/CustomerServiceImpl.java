package lk.ijse.helloshoebackend.service.impl;

import lk.ijse.helloshoebackend.dto.CustomerDTO;
import lk.ijse.helloshoebackend.entity.Customer;
import lk.ijse.helloshoebackend.entity.User;

import lk.ijse.helloshoebackend.repository.CustomerRepo;

import lk.ijse.helloshoebackend.repository.UserRepo;
import lk.ijse.helloshoebackend.service.CustomerService;
import lk.ijse.helloshoebackend.util.IDGenerator;
import lk.ijse.helloshoebackend.util.Level;
import org.modelmapper.ModelMapper;

import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepo customerRepo;

    private final ModelMapper mapper;

    private final UserRepo userRepo;

    public CustomerServiceImpl(CustomerRepo customerRepo, ModelMapper mapper,UserRepo userRepo) {
        this.customerRepo = customerRepo;
        this.mapper = mapper;
        this.userRepo = userRepo;
    }

    @Override
    public boolean saveCustomer(CustomerDTO customerDTO) {
        Customer map = mapper.map(customerDTO, Customer.class);
        User user = userRepo.findById(customerDTO.getUserEmail()).get();
        map.setUser(user);
        map.setCustomerId(IDGenerator.generateCustomerId());
        map.setLevel(Level.NEW);
        customerRepo.save(map);
        return true;
    }

    @Override
    public List<CustomerDTO> getAllCustomers() {
        return customerRepo.findAll().stream().map(customer -> mapper.map(customer,CustomerDTO.class)).toList();
    }

    @Override
    public boolean updateCustomer(CustomerDTO customerDTO) {
        Customer customer = customerRepo.findById(customerDTO.getCustomerId()).get();
        customer.setCustomerName(customerDTO.getCustomerName());
        customer.setGender(customerDTO.getGender());
        customer.setContact(customerDTO.getContact());
        customer.setEmail(customerDTO.getEmail());
        customer.setAddress(customerDTO.getAddress());
        customer.setDob(customerDTO.getDob());
        customerRepo.save(customer);
        return true;
    }

    @Override
    public CustomerDTO getCustomer(String id) {
        return mapper.map(customerRepo.findById(id).get(),CustomerDTO.class);
    }

    @Override
    public String deleteCustomer(String id) {
        customerRepo.deleteById(id);
        return "Customer Deleted !";
    }

    @Override
    public List<String> getContactList() {
        return customerRepo.findAllByContact();
    }

    @Override
    public CustomerDTO getCustomerByContact(String id) {
        return mapper.map(customerRepo.findCustomerByContact(id),CustomerDTO.class);
    }
}

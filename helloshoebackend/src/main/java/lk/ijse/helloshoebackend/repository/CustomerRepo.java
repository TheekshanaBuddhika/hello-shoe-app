package lk.ijse.helloshoebackend.repository;

import lk.ijse.helloshoebackend.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepo extends JpaRepository<Customer,String> {
    @Query("SELECT c.contact FROM Customer c")
    List<String> findAllByContact();

    Customer findCustomerByContact(String contact);
}

package lk.ijse.helloshoebackend.repository;

import lk.ijse.helloshoebackend.entity.CustomerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<CustomerEntity, String> {
    Boolean existsByEmailAndContact(String email, String contact);
}

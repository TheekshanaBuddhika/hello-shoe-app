package lk.ijse.helloshoebackend.repository;

import lk.ijse.helloshoebackend.entity.Supplier;
import lk.ijse.helloshoebackend.entity.embedded.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SupplierRepo extends JpaRepository<Supplier, String> {
    List<Supplier> findAllByIsActive(boolean isActive);
}

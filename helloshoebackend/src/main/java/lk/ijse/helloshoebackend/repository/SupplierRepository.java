package lk.ijse.helloshoebackend.repository;

import lk.ijse.helloshoebackend.entity.SuppliersEntity;
import lk.ijse.helloshoebackend.entity.embedded.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SupplierRepository extends JpaRepository<SuppliersEntity, String> {
    Boolean existsByContactAndEmail(Contact contact, String email);
}

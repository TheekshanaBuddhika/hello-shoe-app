package lk.ijse.helloshoebackend.repository;

import lk.ijse.helloshoebackend.entity.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SaleRepo extends JpaRepository<Sale,String> {
}

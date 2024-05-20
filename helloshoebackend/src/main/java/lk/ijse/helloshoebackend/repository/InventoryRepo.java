package lk.ijse.helloshoebackend.repository;

import lk.ijse.helloshoebackend.entity.Inventory;
import lk.ijse.helloshoebackend.util.ItemStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InventoryRepo extends JpaRepository<Inventory, String> {
    List<Inventory> findAllByItemStatusNot(ItemStatus itemStatus);

    @Query(value = "SELECT DISTINCT brand FROM inventory" ,nativeQuery = true)
    List<String> getBrands();

    List<Inventory> findAllByBrandAndItemStatusNot(String brand, ItemStatus itemStatus);
}

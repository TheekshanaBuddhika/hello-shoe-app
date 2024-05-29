package lk.ijse.helloshoebackend.repository;

import lk.ijse.helloshoebackend.entity.Inventory;
import lk.ijse.helloshoebackend.util.ItemStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InventoryRepo extends JpaRepository<Inventory, String> {
    List<Inventory> findAllByItemStatusNot(ItemStatus itemStatus);

    @Query(value = "SELECT DISTINCT brand FROM inventory" ,nativeQuery = true)
    List<String> getBrands();

    List<Inventory> findAllByBrandAndItemStatusNot(String brand, ItemStatus itemStatus);

    @Modifying
    @Query(value = "UPDATE Inventory SET item_sold_count = :itemSoldCount, qty_on_hand = :qtyOnHand WHERE item_code = :itemCode", nativeQuery = true)
    void updateInventory(@Param("itemCode") String itemCode, @Param("itemSoldCount") Integer itemSoldCount, @Param("qtyOnHand") Integer qtyOnHand);
}

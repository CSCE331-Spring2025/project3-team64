package com.team64.BubbleFlowBackend.repository;
// Keep track of the inventory in the database
// String sql = "SELECT * FROM inventory ORDER BY item_id";

// updateQuantity endpts - used after an order is made to update item quantity in inventory
// String sql = "UPDATE inventory SET item_quantity = " + item_quantity + " WHERE item_id = " + item_id;
// String sql = "UPDATE inventory SET item_name = \'" + item_name + "\' WHERE item_id = " + item_id;
// String sql = "UPDATE inventory SET item_metric = \'" + item_unit + "\' WHERE item_id = " + item_id;

// addItem endpts - used to add a new item to our inventory
//  String sql = "INSERT INTO inventory (item_id, item_name, item_metric, item_quantity) "
//                + "VALUES (" + item.getItem_id() + ", \'" + item.getItem_name() + "\', \'" + item.getItem_metric() + "\', " + item.getItem_quantity() + ")";

// get item 
// String sql = "SELECT * FROM inventory WHERE item_id = " + item_id;

// fix

import com.team64.BubbleFlowBackend.model.Inventory;
import com.team64.BubbleFlowBackend.model.DummyEntity;
import com.team64.BubbleFlowBackend.model.OrderExtraRaw;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface InventoryRepo extends JpaRepository<DummyEntity, Integer>{
    // Basic Inventory Overview: View all items in inventory
    @Query(value = "SELECT * FROM inventory ORDER BY item_id", nativeQuery = true)
    List<Object[]> getAllInventoryItems();

    // Low Inventory Alert: View items with low inventory (less than 10)
    @Query(value = """
        SELECT * FROM inventory
        WHERE item_quantity < 10
        ORDER BY item_quantity ASC;
    """, nativeQuery = true)
    List<Object[]> getLowInventoryItems();

    // Out of Stock Alert: View items that are out of stock (quantity = 0)
    @Query(value ="SELECT * FROM inventory WHERE item_quantity = 0", nativeQuery = true)
    List<Object[]> getOutOfStockItems();

    // Total Inventory Quantity: Get the total quantity of all items in inventory
    @Query(value = "SELECT SUM(item_quantity) AS total_inventory_quantity FROM inventory", nativeQuery = true)
    List<Number> getTotalInventoryQuantity();

    // @Query(value = "SELECT * FROM inventory WHERE item_name LIKE %:item_name%", nativeQuery = true)

    // @Query(value = "UPDATE inventory SET item_quantity = :item_quantity WHERE item_id = :item_id", nativeQuery = true)
    // void updateItemQuantity(@Param("item_quantity") int item_quantity, @Param("item_id") int item_id);

    // @Query(value = "INSERT INTO inventory (item_id, item_name, item_metric, item_quantity) " +
    //         "VALUES (:item_id, :item_name, :item_metric, :item_quantity)", nativeQuery = true)
    // void addItem(@Param("item_id") int item_id, @Param("item_name") String item_name,
    //              @Param("item_metric") String item_metric, @Param("item_quantity") int item_quantity);

    // @Query(value = "SELECT * FROM inventory WHERE item_id = :item_id", nativeQuery = true)
    // Inventory getItemById(@Param("item_id") int item_id);
}
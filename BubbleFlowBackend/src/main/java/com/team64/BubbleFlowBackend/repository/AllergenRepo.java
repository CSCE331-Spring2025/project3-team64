package com.team64.BubbleFlowBackend.repository;

import com.team64.BubbleFlowBackend.model.Allergen;
import com.team64.BubbleFlowBackend.model.DrinkRecipe;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;

import java.util.List;

@Component

public interface AllergenRepo extends Repository<DrinkRecipe, Integer> {
    @Query(value = """
        SELECT 
            d.drink_name,
            COALESCE(
                STRING_AGG(DISTINCT 
                    CASE
                        WHEN i.item_name ILIKE '%milk%' 
                            OR i.item_name ILIKE '%cream%'
                            OR i.item_name ILIKE '%creama%' 
                            OR i.item_name ILIKE '%pudding%'
                            OR i.item_name ILIKE '%taro%'
                            OR i.item_name ILIKE '%coco%' THEN 'Dairy'
                        WHEN i.item_name ILIKE '%oreos%'    
                            OR i.item_name ILIKE '%pearl%' THEN 'Gluten'
                        ELSE NULL
                    END
                , ', '),
                'None'
            ) AS allergen_alerts
        FROM 
            drink_recipe dr
        JOIN 
            drinks d ON dr.drink_id = d.drink_id
        JOIN 
            inventory i ON dr.item_id = i.item_id
        GROUP BY 
            d.drink_name
        ORDER BY 
            d.drink_name;""", nativeQuery = true)
    List<Object[]> finsdAllergens();
}
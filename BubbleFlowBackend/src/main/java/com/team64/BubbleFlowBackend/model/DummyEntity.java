//Used for defining custom repositories that don't have an actual link to the database.
package com.team64.BubbleFlowBackend.model;
import jakarta.persistence.*;

@Entity
public class DummyEntity {
    @Id
    private Integer id;
}
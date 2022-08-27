package com.project.backend.Repo;

import com.project.backend.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    Item findByUserId(Long user_id);
    Boolean existsByUserId(Long user_id);
//    Item getById(Long id);

    @Query("SELECT h FROM Item h WHERE h.id=?1")
    public Item getById(Long id);
}

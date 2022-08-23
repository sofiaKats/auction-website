package com.project.backend.Repo;

import com.project.backend.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    Item findByUserId(Long user_id);
    Boolean existsByUserId(Long user_id);
}

package com.project.backend.Repo;

import com.project.backend.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
   // notice that the FROM table has exactly the same name as our spring boot class
   // and that the data member we are searching by has exactly the same name as our spring boot
   // data member and not the sql row (e.g SPRING BOOT: userId   SQL: user_id
   //                                      SPRING BOOT: isActive SQL: is_active)
    @Query("SELECT h FROM Item h WHERE h.id=?1")
    public Item getById(Long id);

    @Query("SELECT record FROM Item record WHERE record.userId=?1")
    public List<Item> findByUserId(Long user_id);

    @Query("SELECT record FROM Item record WHERE record.isActive=true")
    public List<Item> findAllActiveItems();
}

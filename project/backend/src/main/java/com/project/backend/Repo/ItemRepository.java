package com.project.backend.Repo;

import com.project.backend.model.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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

    @Override
//    @Query("SELECT record FROM Item record WHERE record.isActive=true")
    Page<Item> findAll(Pageable pageable);
    public Page<Item> findByLocation(String location, Pageable pageable);
    public Page<Item> findByCategories(String categories, Pageable pageable);

    // leaving name as is bc JPA won't "understand" and query will not work
    @Query(value = "SELECT * FROM Item WHERE Description LIKE %:keyword% or Location LIKE %:keyword% or categories LIKE %:keyword% or Buy_Price LIKE %:keyword%", nativeQuery = true)
    public Page<Item> findByDescription(@Param("keyword") String description, Pageable pageable);

    @Query("SELECT record FROM Item record WHERE record.Buy_Price=?1")
    public Page<Item> findByBuyPrice(Double Buy_Price, Pageable pageable);

}

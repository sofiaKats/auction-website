package com.project.backend.Repo;

import com.project.backend.model.Bid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BidRepository extends JpaRepository<Bid, Long> {

    @Query("SELECT h FROM bid h WHERE h.item_id=?1")
    List<Bid> getAllByUserId(Long item_id);
}

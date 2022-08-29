package com.project.backend.model;

import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;

@Data @Setter @Getter @NoArgsConstructor @Table(name = "bid") @Entity
public class Bid {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    Long item_id; // what item the bid belongs to
    Long user_id; // who placed the bid
    Timestamp Time;
    Double Amount;
//    @OneToOne(cascade = CascadeType.ALL)
//    private Bidder bidder;

    public Bid(Long id, Long item_id, Long user_id, Timestamp time, Double amount) {
        this.id = id;
        this.item_id = item_id;
        this.user_id = user_id;
        this.Time = time;
        this.Amount = amount;
    }
}

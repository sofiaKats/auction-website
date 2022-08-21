package com.project.backend.model;

import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;

@Data @Setter @Getter @AllArgsConstructor @NoArgsConstructor @Table(name = "bid") @Entity
public class Bid {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    Timestamp Time;
    Double Amount;
    @ManyToOne
    private Item item;
    @OneToOne(cascade = CascadeType.ALL)
    private Bidder bidder;
}

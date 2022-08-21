package com.project.backend.model;

import lombok.*;

import javax.persistence.*;

@Data @Setter @Getter @Entity @AllArgsConstructor @NoArgsConstructor @Table(name = "bidder")
public class Bidder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    Float Rating;
    String Country;
    String Location;
    @OneToOne(mappedBy = "bidder")
    Bid bid;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
}

package com.project.backend.model;

import lombok.*;

import javax.persistence.*;

@Data @Setter @Getter @Entity @AllArgsConstructor @NoArgsConstructor @Table(name = "seller")
public class Seller {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    Float Rating;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
}

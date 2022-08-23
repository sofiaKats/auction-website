package com.project.backend.model;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Data @Setter @Getter @Entity @NoArgsConstructor
@Table(name = "item")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
//    @ManyToOne //now item entity has user_id in sql
//    private User user;
    Long userId;
    String Name;
    @ElementCollection
    @CollectionTable(name = "category")
    private List<String> Category;
    Double Currently;
    Double Buy_Price;
    Double First_Bid;
    Integer Number_of_Bids;
    @LazyCollection(LazyCollectionOption.FALSE)
    @OneToMany
    List<Bid> Bids = new ArrayList<Bid>();
    String Location;
    Double Longitude;
    Double Latitude;
    String Country;
    Timestamp Started;
    Timestamp Ends;
    String Description;

    public Item(String name, Double buy_Price, String location, String country, String description, Long user_id) {
        Name = name;
        this.Currently = 0.01;
        this.First_Bid = 0.01;
        Buy_Price = buy_Price;
        Location = location;
        Country = country;
        Description = description;
        this.userId = user_id;
        this.Number_of_Bids = 0;

    }
}

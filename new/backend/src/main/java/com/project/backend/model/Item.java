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
    @ManyToOne //now item entity has user_id in sql
    private User user;
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

    public Item(String name, Double currently, Double buy_Price, Double first_Bid, Integer number_of_Bids, String location, String country, Timestamp started, Timestamp ends, String description) {
        Name = name;
        Currently = currently;
        Buy_Price = buy_Price;
        First_Bid = first_Bid;
        Number_of_Bids = number_of_Bids;
        Location = location;
        Country = country;
        Started = started;
        Ends = ends;
        Description = description;
    }
}
